import crypto from "node:crypto";

/** Mijoz lead ma'lumotlari — Telegramdagi linkga shifrlangan holda joylanadi */
export type LeadPayload = {
  id: string; // lead / event ID (Pixel + CAPI deduplikatsiya uchun)
  name: string;
  phone: string;
  address: string;
  fbp?: string;
  fbc?: string;
  ip?: string;
  ua?: string;
  url?: string; // event_source_url
  ts: number; // lead vaqti (unix sekund)
};

function key(): Buffer {
  const secret = process.env.LINK_SECRET;
  if (!secret || secret.length < 16) {
    throw new Error("LINK_SECRET .env da o'rnatilmagan (kamida 32 belgi tavsiya etiladi)");
  }
  return crypto.createHash("sha256").update(secret).digest();
}

/** AES-256-GCM: shifrlaydi va imzolaydi — linkni o'zgartirib bo'lmaydi va ichini o'qib bo'lmaydi */
export function encryptLead(data: LeadPayload): string {
  const iv = crypto.randomBytes(12);
  const cipher = crypto.createCipheriv("aes-256-gcm", key(), iv);
  const enc = Buffer.concat([cipher.update(JSON.stringify(data), "utf8"), cipher.final()]);
  const tag = cipher.getAuthTag();
  return Buffer.concat([iv, tag, enc]).toString("base64url");
}

export function decryptLead(token: string): LeadPayload | null {
  try {
    const buf = Buffer.from(token, "base64url");
    const iv = buf.subarray(0, 12);
    const tag = buf.subarray(12, 28);
    const enc = buf.subarray(28);
    const decipher = crypto.createDecipheriv("aes-256-gcm", key(), iv);
    decipher.setAuthTag(tag);
    const dec = Buffer.concat([decipher.update(enc), decipher.final()]).toString("utf8");
    return JSON.parse(dec) as LeadPayload;
  } catch {
    return null;
  }
}

export function sha256(value: string): string {
  return crypto.createHash("sha256").update(value).digest("hex");
}

export function safeEqual(a: string, b: string): boolean {
  const ab = Buffer.from(a);
  const bb = Buffer.from(b);
  return ab.length === bb.length && crypto.timingSafeEqual(ab, bb);
}
