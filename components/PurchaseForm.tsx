"use client";

import { useState } from "react";

function formatSum(v: string) {
  const d = v.replace(/\D/g, "").slice(0, 12);
  return d.replace(/\B(?=(\d{3})+(?!\d))/g, " ");
}

export default function PurchaseForm({ token, pinRequired }: { token: string; pinRequired: boolean }) {
  const [amount, setAmount] = useState("");
  const [pin, setPin] = useState("");
  const [status, setStatus] = useState<"idle" | "loading" | "done" | "error">("idle");
  const [msg, setMsg] = useState("");

  async function onSubmit(e: React.FormEvent) {
    e.preventDefault();
    const num = Number(amount.replace(/\D/g, ""));
    if (!num) {
      setStatus("error");
      setMsg("Summani kiriting");
      return;
    }
    setStatus("loading");
    setMsg("");
    try {
      const res = await fetch("/api/purchase", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ token, amount: num, pin }),
      });
      const data = await res.json();
      if (!res.ok || !data.ok) throw new Error(data.error || "Xatolik");
      setStatus("done");
      setMsg(
        `Purchase Meta’ga yuborildi: ${formatSum(String(num))} so‘m` +
          (data.currency !== "UZS" ? ` (≈ ${data.value} ${data.currency})` : "")
      );
    } catch (err) {
      setStatus("error");
      setMsg(err instanceof Error ? err.message : "Xatolik");
    }
  }

  if (status === "done") {
    return (
      <div className="purchase-done">
        <div className="thanks-ic">✓</div>
        <p>{msg}</p>
        <small>Meta endi shu va shunga o‘xshash insonlarga reklamani optimallashtiradi.</small>
      </div>
    );
  }

  return (
    <form className="lead-form" onSubmit={onSubmit}>
      <label>
        <span>To‘langan summa (so‘m)</span>
        <input
          type="text"
          inputMode="numeric"
          placeholder="Masalan: 3 000 000"
          value={amount}
          onChange={(e) => setAmount(formatSum(e.target.value))}
          autoFocus
        />
      </label>
      {pinRequired && (
        <label>
          <span>Admin PIN</span>
          <input type="password" inputMode="numeric" value={pin} onChange={(e) => setPin(e.target.value)} />
        </label>
      )}
      {status === "error" && <p className="form-error">{msg}</p>}
      <button className="btn btn-gold btn-block" disabled={status === "loading"}>
        {status === "loading" ? "Yuborilmoqda..." : "Yuborish → Meta Purchase"}
      </button>
    </form>
  );
}
