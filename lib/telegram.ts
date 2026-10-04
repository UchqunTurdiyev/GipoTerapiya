export function escapeHtml(s: string): string {
  return s.replace(/&/g, "&amp;").replace(/</g, "&lt;").replace(/>/g, "&gt;");
}

type Button = { text: string; url: string };

export async function sendTelegram(html: string, button?: Button) {
  const token = process.env.TELEGRAM_BOT_TOKEN;
  const chatId = process.env.TELEGRAM_CHAT_ID;
  if (!token || !chatId) {
    console.warn("[Telegram] TELEGRAM_BOT_TOKEN yoki TELEGRAM_CHAT_ID yo'q");
    return { ok: false };
  }

  const payload: Record<string, unknown> = {
    chat_id: chatId,
    text: html,
    parse_mode: "HTML",
    link_preview_options: { is_disabled: true },
  };
  // Telegram inline tugmasi faqat haqiqiy https domen bilan ishlaydi (localhost emas)
  if (button && button.url.startsWith("https://")) {
    payload.reply_markup = { inline_keyboard: [[{ text: button.text, url: button.url }]] };
  }

  const res = await fetch(`https://api.telegram.org/bot${token}/sendMessage`, {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify(payload),
  });
  const json = await res.json().catch(() => ({}));
  if (!res.ok) console.error("[Telegram] Xato:", JSON.stringify(json));
  return { ok: res.ok };
}
