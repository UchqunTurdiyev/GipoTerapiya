import { NextRequest, NextResponse } from "next/server";
import { decryptLead, safeEqual } from "@/lib/crypto";
import { sendCapiEvent } from "@/lib/meta";
import { sendTelegram, escapeHtml } from "@/lib/telegram";

export const runtime = "nodejs";

export async function POST(req: NextRequest) {
  let body: { token?: string; amount?: number | string; pin?: string };
  try {
    body = await req.json();
  } catch {
    return NextResponse.json({ ok: false, error: "Noto'g'ri so'rov" }, { status: 400 });
  }

  const lead = decryptLead(String(body.token ?? ""));
  if (!lead) return NextResponse.json({ ok: false, error: "Link yaroqsiz" }, { status: 400 });

  const adminPin = process.env.ADMIN_PIN;
  if (adminPin && !safeEqual(String(body.pin ?? ""), adminPin)) {
    return NextResponse.json({ ok: false, error: "PIN noto'g'ri" }, { status: 401 });
  }

  const amountUzs = Number(String(body.amount ?? "").replace(/[^\d.]/g, ""));
  if (!Number.isFinite(amountUzs) || amountUzs <= 0) {
    return NextResponse.json({ ok: false, error: "Summani to'g'ri kiriting" }, { status: 400 });
  }

  const currency = (process.env.META_CURRENCY || "USD").toUpperCase();
  const rate = Number(process.env.USD_RATE || 12600);
  const value = currency === "UZS" ? Math.round(amountUzs) : Math.round((amountUzs / rate) * 100) / 100;

  const result = await sendCapiEvent({
    event_name: "Purchase",
    // Bitta lead uchun bitta Purchase: qayta bosilsa Meta dublikat sifatida olib tashlaydi
    event_id: `purchase_${lead.id}`,
    lead,
    custom_data: {
      value,
      currency,
      content_name: "Gipnoterapiya 6 kunlik offline kurs",
      content_type: "product",
      order_id: lead.id,
    },
  });

  if (!result.ok) {
    return NextResponse.json(
      { ok: false, error: "Meta'ga yuborilmadi", details: result.response ?? "CAPI sozlanmagan" },
      { status: 502 }
    );
  }

  await sendTelegram(
    `✅ <b>Purchase Meta'ga yuborildi</b>\n\n` +
      `👤 ${escapeHtml(lead.name)}\n📞 ${escapeHtml(lead.phone)}\n` +
      `💰 ${amountUzs.toLocaleString("ru-RU")} so'm` +
      (currency === "UZS" ? "" : ` (≈ ${value} ${currency})`)
  ).catch(() => {});

  return NextResponse.json({ ok: true, value, currency, meta: result.response });
}
