import { sha256, type LeadPayload } from "./crypto";

const GRAPH_VERSION = "v21.0";

/** Telefon: faqat raqamlar, 998 kodi bilan (Meta talabi) */
export function normalizePhone(phone: string): string {
  let d = phone.replace(/\D/g, "");
  if (d.length === 9) d = "998" + d;
  return d;
}

/** Matnni Meta formatiga keltirish: kichik harf, bo'shliq va belgilarsiz */
function norm(v: string): string {
  return v
    .toLowerCase()
    .normalize("NFKD")
    .replace(/[̀-ͯ]/g, "")
    .replace(/[^a-z0-9Ѐ-ӿ]/g, "");
}

/** Lead ma'lumotlaridan CAPI user_data obyektini yig'ish (shaxsiy ma'lumotlar SHA-256 bilan heshlanadi) */
export function buildUserData(lead: LeadPayload) {
  const parts = lead.name.trim().split(/\s+/);
  const fn = parts[0] ?? "";
  const ln = parts.length > 1 ? parts[parts.length - 1] : "";

  const ud: Record<string, unknown> = {
    ph: [sha256(normalizePhone(lead.phone))],
    country: [sha256("uz")],
    external_id: [sha256(lead.id)],
  };
  if (fn) ud.fn = [sha256(norm(fn))];
  if (ln) ud.ln = [sha256(norm(ln))];
  if (lead.address) ud.ct = [sha256(norm(lead.address))];
  if (lead.ip) ud.client_ip_address = lead.ip;
  if (lead.ua) ud.client_user_agent = lead.ua;
  if (lead.fbp) ud.fbp = lead.fbp;
  if (lead.fbc) ud.fbc = lead.fbc;
  return ud;
}

type CapiEvent = {
  event_name: "Lead" | "Purchase" | string;
  event_id: string;
  event_time?: number;
  lead: LeadPayload;
  custom_data?: Record<string, unknown>;
};

export async function sendCapiEvent(ev: CapiEvent) {
  const pixelId = process.env.NEXT_PUBLIC_META_PIXEL_ID;
  const token = process.env.META_CAPI_ACCESS_TOKEN;
  if (!pixelId || !token) {
    console.warn("[CAPI] Pixel ID yoki access token yo'q — event yuborilmadi");
    return { ok: false, skipped: true };
  }

  const body: Record<string, unknown> = {
    data: [
      {
        event_name: ev.event_name,
        event_time: ev.event_time ?? Math.floor(Date.now() / 1000),
        event_id: ev.event_id,
        action_source: "website",
        event_source_url: ev.lead.url || process.env.NEXT_PUBLIC_SITE_URL,
        user_data: buildUserData(ev.lead),
        custom_data: ev.custom_data ?? {},
      },
    ],
  };
  if (process.env.META_TEST_EVENT_CODE) body.test_event_code = process.env.META_TEST_EVENT_CODE;

  const res = await fetch(
    `https://graph.facebook.com/${GRAPH_VERSION}/${pixelId}/events?access_token=${encodeURIComponent(token)}`,
    { method: "POST", headers: { "Content-Type": "application/json" }, body: JSON.stringify(body) }
  );
  const json = await res.json().catch(() => ({}));
  if (!res.ok) console.error("[CAPI] Xato:", JSON.stringify(json));
  return { ok: res.ok, response: json };
}
