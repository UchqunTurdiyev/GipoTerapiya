import { NextRequest, NextResponse } from "next/server";
import crypto from "node:crypto";
import { encryptLead, type LeadPayload } from "@/lib/crypto";
import { sendCapiEvent, normalizePhone } from "@/lib/meta";
import { sendTelegram, escapeHtml } from "@/lib/telegram";

export const runtime = "nodejs";

function clientIp(req: NextRequest): string | undefined {
  const xff = req.headers.get("x-forwarded-for");
  if (xff) return xff.split(",")[0].trim();
  return req.headers.get("x-real-ip") ?? undefined;
}

export async function POST(req: NextRequest) {
  let body: Record<string, string>;
  try {
    body = await req.json();
  } catch {
    return NextResponse.json({ ok: false, error: "Noto'g'ri so'rov" }, { status: 400 });
  }

  const name = String(body.name ?? "").trim().slice(0, 80);
  const address = String(body.address ?? "").trim().slice(0, 120);
  const phoneDigits = normalizePhone(String(body.phone ?? ""));

  if (name.length < 2) return NextResponse.json({ ok: false, error: "Ismingizni kiriting" }, { status: 400 });
  if (!/^998\d{9}$/.test(phoneDigits))
    return NextResponse.json({ ok: false, error: "Telefon raqamni to'liq kiriting" }, { status: 400 });
  if (address.length < 2) return NextResponse.json({ ok: false, error: "Manzilni tanlang" }, { status: 400 });

  // Brauzer Pixel bilan bir xil event_id — Meta dublikatni olib tashlaydi
  const eventId =
    typeof body.eventId === "string" && /^[\w-]{8,64}$/.test(body.eventId) ? body.eventId : crypto.randomUUID();

  // Meta cookie'lari
  const fbp = req.cookies.get("_fbp")?.value;
  let fbc = req.cookies.get("_fbc")?.value;
  if (!fbc && body.fbclid && /^[\w-]+$/.test(body.fbclid)) {
    fbc = `fb.1.${Date.now()}.${body.fbclid}`;
  }

  const lead: LeadPayload = {
    id: eventId,
    name,
    phone: "+" + phoneDigits,
    address,
    fbp,
    fbc,
    ip: clientIp(req),
    ua: req.headers.get("user-agent") ?? undefined,
    url: typeof body.url === "string" ? body.url.slice(0, 500) : undefined,
    ts: Math.floor(Date.now() / 1000),
  };

  const siteUrl = (process.env.NEXT_PUBLIC_SITE_URL || req.nextUrl.origin).replace(/\/$/, "");
  const purchaseLink = `${siteUrl}/p/${encryptLead(lead)}`;
  const time = new Date().toLocaleString("uz-UZ", { timeZone: "Asia/Tashkent" });

  const msg =
    `🆕 <b>Yangi ariza — Gipnoterapiya kursi</b>\n\n` +
    `👤 <b>Ism:</b> ${escapeHtml(name)}\n` +
    `📞 <b>Telefon:</b> ${escapeHtml(lead.phone)}\n` +
    `📍 <b>Manzil:</b> ${escapeHtml(address)}\n` +
    `🕒 <b>Vaqt:</b> ${escapeHtml(time)}\n\n` +
    `<b>Mijoz texnik ma'lumotlari:</b>\n` +
    `• fbp: <code>${escapeHtml(fbp ?? "—")}</code>\n` +
    `• fbc: <code>${escapeHtml(fbc ?? "—")}</code>\n` +
    `• IP: <code>${escapeHtml(lead.ip ?? "—")}</code>\n` +
    `• ID: <code>${escapeHtml(eventId)}</code>\n\n` +
    `💰 To'lov qilganda summani kiritish uchun linkni bosing:\n` +
    `<a href="${purchaseLink}">🔐 Sotuvni tasdiqlash (Purchase)</a>`;

  const [tg] = await Promise.all([
    sendTelegram(msg, { text: "💰 Summa kiritish → Purchase", url: purchaseLink }),
    sendCapiEvent({
      event_name: "Lead",
      event_id: eventId,
      lead,
      custom_data: { content_name: "Gipnoterapiya 6 kunlik offline kurs" },
    }).catch((e) => console.error("[CAPI] Lead xato", e)),
  ]);

  if (!tg.ok) {
    return NextResponse.json({ ok: false, error: "Ariza yuborilmadi, qayta urinib ko'ring" }, { status: 502 });
  }
  return NextResponse.json({ ok: true, eventId });
}
