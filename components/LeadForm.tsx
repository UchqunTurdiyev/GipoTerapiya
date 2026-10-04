"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";

const REGIONS = [
  "Toshkent shahri",
  "Toshkent viloyati",
  "Samarqand",
  "Buxoro",
  "Andijon",
  "Farg‘ona",
  "Namangan",
  "Qashqadaryo",
  "Surxondaryo",
  "Jizzax",
  "Sirdaryo",
  "Navoiy",
  "Xorazm",
  "Qoraqalpog‘iston",
  "Xorijda",
];

/** +998 (90) 123-45-67 formatlash */
function formatPhone(raw: string): string {
  let d = raw.replace(/\D/g, "");
  if (d.startsWith("998")) d = d.slice(3);
  d = d.slice(0, 9);
  let out = "+998";
  if (d.length > 0) out += " (" + d.slice(0, 2);
  if (d.length >= 2) out += ")";
  if (d.length > 2) out += " " + d.slice(2, 5);
  if (d.length > 5) out += "-" + d.slice(5, 7);
  if (d.length > 7) out += "-" + d.slice(7, 9);
  return out;
}

function uuid() {
  if (typeof crypto !== "undefined" && "randomUUID" in crypto) return crypto.randomUUID();
  return "id-" + Date.now().toString(36) + Math.random().toString(36).slice(2, 10);
}

export default function LeadForm({ id }: { id?: string }) {
  const router = useRouter();
  const [name, setName] = useState("");
  const [phone, setPhone] = useState("+998");
  const [address, setAddress] = useState("");
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");

  async function onSubmit(e: React.FormEvent) {
    e.preventDefault();
    setError("");
    const digits = phone.replace(/\D/g, "");
    if (name.trim().length < 2) return setError("Ismingizni kiriting");
    if (digits.length !== 12) return setError("Telefon raqamni to‘liq kiriting");
    if (!address) return setError("Manzilingizni tanlang");

    setLoading(true);
    const eventId = uuid();
    const fbclid = new URLSearchParams(window.location.search).get("fbclid") ?? undefined;

    try {
      const res = await fetch("/api/lead", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ name, phone, address, eventId, fbclid, url: window.location.href }),
      });
      const data = await res.json();
      if (!res.ok || !data.ok) throw new Error(data.error || "Xatolik");

      // Brauzer Pixel Lead — CAPI bilan bir xil eventID (deduplikatsiya)
      window.fbq?.(
        "track",
        "Lead",
        { content_name: "Gipnoterapiya 6 kunlik offline kurs" },
        { eventID: eventId }
      );
      router.push("/rahmat");
    } catch (err) {
      setError(err instanceof Error ? err.message : "Xatolik yuz berdi, qayta urinib ko‘ring");
      setLoading(false);
    }
  }

  return (
    <form className="lead-form" onSubmit={onSubmit} id={id} noValidate>
      <label>
        <span>Ismingiz</span>
        <input
          type="text"
          autoComplete="name"
          placeholder="Masalan: Dilnoza"
          value={name}
          onChange={(e) => setName(e.target.value)}
          required
        />
      </label>
      <label>
        <span>Telefon raqamingiz</span>
        <input
          type="tel"
          inputMode="tel"
          autoComplete="tel"
          placeholder="+998 (90) 123-45-67"
          value={phone}
          onChange={(e) => setPhone(formatPhone(e.target.value))}
          required
        />
      </label>
      <label>
        <span>Manzilingiz</span>
        <select value={address} onChange={(e) => setAddress(e.target.value)} required>
          <option value="" disabled>
            Viloyatingizni tanlang
          </option>
          {REGIONS.map((r) => (
            <option key={r} value={r}>
              {r}
            </option>
          ))}
        </select>
      </label>
      {error && <p className="form-error">{error}</p>}
      <button type="submit" className="btn btn-gold btn-block" disabled={loading}>
        {loading ? "Yuborilmoqda..." : "Yuborish"}
      </button>
      <p className="form-note">Ma’lumotlaringiz faqat siz bilan bog‘lanish uchun ishlatiladi.</p>
    </form>
  );
}
