import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "Arizangiz qabul qilindi — Gipnoterapiya kursi",
  robots: { index: false },
};

export default function Rahmat() {
  return (
    <main className="center-page">
      <div className="hero-glow" aria-hidden />
      <div className="thanks-card">
        <div className="thanks-ic">✓</div>
        <h1>
          Rahmat! <span className="gold-text">Arizangiz qabul qilindi</span>
        </h1>
        <p>Menejerimiz tez orada siz bilan bog‘lanadi. Iltimos, telefoningiz yoqiq bo‘lsin.</p>
        <p>Shu vaqt ichida Telegram kanalimizdagi jonli darslar va natijalar bilan tanishib chiqing:</p>
        <a className="btn btn-gold" href="https://t.me/hayotqonunikomolaok" target="_blank" rel="noopener noreferrer">
          Telegram kanalga o‘tish
        </a>
        <a className="back-link" href="/">
          ← Bosh sahifaga qaytish
        </a>
      </div>
    </main>
  );
}
