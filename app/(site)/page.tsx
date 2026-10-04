import Image from "next/image";
import LeadForm from "@/components/LeadForm";

const TG_CHANNEL = "https://t.me/hayotqonunikomolaok";
const TG_ADMIN = "https://t.me/komolaningadmini";

const Icon = {
  calendar: (
    <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.6"><rect x="3" y="5" width="18" height="16" rx="2" /><path d="M3 10h18M8 3v4M16 3v4" /><circle cx="12" cy="15" r="1.4" fill="currentColor" /></svg>
  ),
  pie: (
    <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.6"><path d="M12 3a9 9 0 1 0 9 9h-9z" /><path d="M15 3.5A9 9 0 0 1 20.5 9H15z" /></svg>
  ),
  cert: (
    <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.6"><rect x="3" y="4" width="18" height="13" rx="1.5" /><path d="M7 9h10M7 12h6" /><circle cx="17" cy="17" r="2.5" /><path d="M15.5 19l-1 3 2.5-1 2.5 1-1-3" /></svg>
  ),
  people: (
    <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.6"><circle cx="8" cy="7" r="3" /><circle cx="16" cy="7" r="3" /><path d="M2 21v-2a5 5 0 0 1 10 0v2M12 21v-2a5 5 0 0 1 10 0v2" /></svg>
  ),
  brain: (
    <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.6"><path d="M9 3a3 3 0 0 0-3 3 3 3 0 0 0-2 5 3 3 0 0 0 1 5 3 3 0 0 0 4 4V3zM15 3a3 3 0 0 1 3 3 3 3 0 0 1 2 5 3 3 0 0 1-1 5 3 3 0 0 1-4 4V3z" /><path d="M9 9h2M13 13h2M9 15h2" /></svg>
  ),
  shield: (
    <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.6"><path d="M12 3l8 3v6c0 5-3.5 8-8 9-4.5-1-8-4-8-9V6z" /><path d="M8.5 12l2.5 2.5 4.5-5" /></svg>
  ),
  book: (
    <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.6"><path d="M4 4h6a3 3 0 0 1 3 3v13a2 2 0 0 0-2-2H4zM20 4h-6a3 3 0 0 0-3 3v13a2 2 0 0 1 2-2h7z" /></svg>
  ),
  pen: (
    <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.6"><rect x="4" y="3" width="12" height="18" rx="1.5" /><path d="M8 3v18M19 4l1.5 1.5L20 17l-1 2-1-2V5z" /></svg>
  ),
  home: (
    <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.6"><path d="M3 11l9-7 9 7v9a1 1 0 0 1-1 1h-5v-6h-6v6H4a1 1 0 0 1-1-1z" /></svg>
  ),
  check: (
    <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2"><path d="M5 12.5l4.5 4.5L19 7.5" /></svg>
  ),
  tg: (
    <svg viewBox="0 0 24 24" fill="currentColor"><path d="M21.5 3.6L2.9 10.8c-1.3.5-1.3 1.2-.2 1.6l4.8 1.5 1.8 5.6c.2.6.4.8.9.8.4 0 .6-.2.9-.4l2.3-2.2 4.7 3.5c.9.5 1.5.2 1.7-.8l3.1-14.6c.3-1.3-.5-1.9-1.4-1.5zM8.6 13.6l9-5.7c.4-.3.8-.1.5.2l-7.4 6.7-.3 3.2z" /></svg>
  ),
};

const modules = [
  {
    n: "01",
    title: "Gipnozning verbal va noverbal texnikalari",
    points: [
      "So‘z, ovoz ohangi va pauza orqali trans holatiga kiritish",
      "Tana tili, nigoh va nafas ritmi bilan ishlash",
      "Mijoz bilan ishonchli aloqa (rapport) o‘rnatish",
      "Induksiya va transdan xavfsiz chiqarish usullari",
    ],
  },
  {
    n: "02",
    title: "Regressiv gipnoz va proregressiv gipnoterapiya",
    points: [
      "Muammoning ildizini o‘tmish xotiralaridan topish",
      "Bolalikdagi “blok” va ichki cheklovlar bilan ishlash",
      "Kelajak obrazini ongga joylash (progressiya)",
      "Sessiyani bosqichma-bosqich olib borish tartibi",
    ],
  },
  {
    n: "03",
    title: "Klinik gipnoterapiya",
    points: [
      "Qo‘rquv, xavotir va stress holatlari bilan ishlash",
      "Odatlar va xulq-atvorni o‘zgartirish texnikalari",
      "Ong ostini qayta dasturlash va affirmatsiyalar",
      "Etika, chegaralar va xavfsiz professional yondashuv",
    ],
  },
];

const audience = [
  { t: "Psixolog va mutaxassislar", d: "Amaliyotingizga kuchli, natijali gipnoterapiya vositalarini qo‘shmoqchi bo‘lsangiz." },
  { t: "Yangi kasb izlayotganlar", d: "Odamlarga yordam beradigan, talab yuqori bo‘lgan yo‘nalishni noldan o‘rganmoqchi bo‘lsangiz." },
  { t: "O‘zini anglashni istaganlar", d: "O‘zingizdagi ichki bloklar, qo‘rquv va cheklovlarning sababini tushunmoqchi bo‘lsangiz." },
  { t: "Ong osti bilan qiziquvchilar", d: "Ongni dasturlash qanday ishlashini amaliyotda, ustoz nazorati ostida ko‘rmoqchi bo‘lsangiz." },
];

const faqs = [
  {
    q: "Kurs qayerda va qancha davom etadi?",
    a: "Kurs Toshkentda, 6 kun davomida offline — jonli formatda o‘tadi. Aniq manzil va yaqin guruh sanasini ariza qoldirganingizdan so‘ng menejer aytib beradi.",
  },
  {
    q: "Oldindan tajriba yoki psixologik ma’lumot kerakmi?",
    a: "Yo‘q. Dastur asoslardan boshlanadi va bosqichma-bosqich chuqurlashadi. Darslarning 80% qismi amaliyotdan iborat.",
  },
  {
    q: "Men viloyatdanman. Turar joy masalasi qanday?",
    a: "Agar viloyatdan bo‘lsangiz va Toshkentda turish uchun joyingiz bo‘lmasa, kurs davomida joy ham beriladi.",
  },
  {
    q: "Kurs yakunida nima beriladi?",
    a: "Kursni muvaffaqiyatli tamomlaganlar sertifikat bilan taqdirlanadi. Bundan tashqari o‘zbek tilidagi “Gipnoterapiya” kitobi, blaknot va ruchka sovg‘a qilinadi.",
  },
  {
    q: "Kurs narxi qancha?",
    a: "Narx, to‘lov shartlari va mavjud joylar haqida ma’lumot olish uchun ariza qoldiring — menejer siz bilan bog‘lanadi.",
  },
];

export default function Home() {
  return (
    <main>
      {/* ===== TOPBAR ===== */}
      <header className="topbar">
        <div className="container topbar-in">
          <a href="#" className="logo">
            Hayot qonuni<span>✦</span>
          </a>
          <a href="#ariza" className="btn btn-outline btn-sm">
            Ariza qoldirish
          </a>
        </div>
      </header>

      {/* ===== HERO ===== */}
      <section className="hero">
        <div className="hero-glow" aria-hidden />
        <div className="container hero-grid">
          <div className="hero-text">
            <p className="eyebrow">6 kunlik offline kurs · Toshkent</p>
            <h1>
              <span className="gold-text">Gipnoterapiyani</span>
              <br />
              to‘liq o‘rganing
            </h1>
            <div className="ornament" aria-hidden>
              <i />◆<i />
            </div>
            <p className="lead">
              Ong osti bilan ishlash san’atini nazariyada emas, <b>amaliyotda</b> o‘rganing. Verbal va noverbal
              texnikalardan klinik gipnoterapiyagacha — ustoz nazorati ostida.
            </p>

            <div className="hero-stats">
              <div className="stat">
                <span className="stat-ic">{Icon.calendar}</span>
                <div>
                  <b>6 kun</b>
                  <small>offline, jonli</small>
                </div>
              </div>
              <div className="stat">
                <span className="stat-ic">{Icon.pie}</span>
                <div>
                  <b>80% amaliy</b>
                  <small>20% nazariy</small>
                </div>
              </div>
              <div className="stat">
                <span className="stat-ic">{Icon.cert}</span>
                <div>
                  <b>Sertifikat</b>
                  <small>kurs yakunida</small>
                </div>
              </div>
            </div>

            <div className="hero-cta">
              <a href="#ariza" className="btn btn-gold">
                Kursga yozilish
              </a>
              <a href="#dastur" className="btn btn-ghost">
                Dasturni ko‘rish ↓
              </a>
            </div>
          </div>

          <div className="hero-photo">
            <div className="photo-frame">
              <Image
                src="/komola.jpg"
                alt="Komola — gipnoterapevt, kurs muallifi"
                width={1400}
                height={2100}
                priority
                sizes="(max-width: 900px) 90vw, 460px"
              />
            </div>
            <div className="photo-badge">
              <b>Komola</b>
              <span>Gipnoterapevt · “Hayot qonuni” muallifi</span>
            </div>
          </div>
        </div>
      </section>

      {/* ===== KIMLAR UCHUN ===== */}
      <section className="section">
        <div className="container">
          <h2 className="title">
            Bu kurs <span className="gold-text">kimlar uchun?</span>
          </h2>
          <div className="grid-4">
            {audience.map((a) => (
              <div className="card" key={a.t}>
                <span className="card-check">{Icon.check}</span>
                <h3>{a.t}</h3>
                <p>{a.d}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* ===== DASTUR ===== */}
      <section className="section section-dark" id="dastur">
        <div className="container">
          <h2 className="title">
            Dars <span className="gold-text">mavzulari</span>
          </h2>
          <p className="subtitle">3 modul · 6 kun · har bir mavzu amaliy mashg‘ulot bilan mustahkamlanadi</p>
          <div className="modules">
            {modules.map((m) => (
              <article className="module" key={m.n}>
                <div className="module-num">{m.n}</div>
                <div>
                  <p className="module-tag">{Number(m.n)}-modul</p>
                  <h3>{m.title}</h3>
                  <ul>
                    {m.points.map((p) => (
                      <li key={p}>
                        <span>{Icon.check}</span>
                        {p}
                      </li>
                    ))}
                  </ul>
                </div>
              </article>
            ))}
          </div>

          <div className="ratio">
            <div className="ratio-head">
              <span>Nazariya — 20%</span>
              <span>Amaliyot — 80%</span>
            </div>
            <div className="ratio-bar">
              <i style={{ width: "20%" }} />
              <b style={{ width: "80%" }} />
            </div>
            <p>Har kuni qisqa nazariyadan so‘ng juftlikda va guruhda real sessiyalar o‘tkaziladi.</p>
          </div>
        </div>
      </section>

      {/* ===== BONUSLAR ===== */}
      <section className="section">
        <div className="container">
          <h2 className="title">
            Sizga beriladigan <span className="gold-text">bonuslar</span>
          </h2>
          <div className="grid-3">
            <div className="bonus">
              <span className="bonus-ic">{Icon.book}</span>
              <h3>“Gipnoterapiya” kitobi</h3>
              <p>Nazariya va amaliyot jamlangan qo‘llanma — o‘zbek tilida.</p>
            </div>
            <div className="bonus">
              <span className="bonus-ic">{Icon.pen}</span>
              <h3>Blaknot va ruchka</h3>
              <p>Darslar davomida eslatmalar va amaliy mashqlar uchun.</p>
            </div>
            <div className="bonus">
              <span className="bonus-ic">{Icon.home}</span>
              <h3>Turar joy</h3>
              <p>Viloyatdan bo‘lsangiz va Toshkentda turish uchun joyingiz bo‘lmasa — joy ham beriladi.</p>
            </div>
          </div>

          <div className="features">
            <div className="feature">
              <span>{Icon.cert}</span>Sertifikat bilan taqdirlanadi
            </div>
            <div className="feature">
              <span>{Icon.people}</span>Amaliy ishlar
            </div>
            <div className="feature">
              <span>{Icon.brain}</span>Ong osti bilan ishlash san’ati
            </div>
            <div className="feature">
              <span>{Icon.shield}</span>Xavfsiz va professional yondashuv
            </div>
          </div>
        </div>
      </section>

      {/* ===== USTOZ ===== */}
      <section className="section section-dark">
        <div className="container about">
          <div className="about-photo">
            <Image src="/komola.jpg" alt="Komola" width={1400} height={2100} sizes="(max-width: 900px) 80vw, 380px" />
          </div>
          <div>
            <p className="eyebrow">Kurs ustozi</p>
            <h2 className="title left">
              <span className="gold-text">Komola</span>
            </h2>
            <p className="about-role">Gipnoterapevt · ongni dasturlash bo‘yicha amaliyotchi</p>
            <p>
              Komola — “Hayot qonuni” Telegram kanalining muallifi. U gipnoz va ongni dasturlash orqali insonlarga
              salbiy holatlardan ijobiy holatga o‘tishda yordam beradi: ichki bloklarni yechish, pul bilan bog‘liq
              cheklovchi ishonchlar, qo‘rquv va emotsional og‘irliklar bilan ishlaydi.
            </p>
            <p>
              Kanalda muntazam jonli darslar, gipnoterapiya namoyishlari va shogirdlarining natijalari bilan
              bo‘lishib boradi. Ushbu 6 kunlik kursda esa o‘z amaliyotidagi usullarni bosqichma-bosqich o‘rgatadi.
            </p>
            <a href={TG_CHANNEL} target="_blank" rel="noopener noreferrer" className="btn btn-outline">
              <span className="btn-ic">{Icon.tg}</span> Telegram kanalni ko‘rish
            </a>
          </div>
        </div>
      </section>

      {/* ===== FAQ ===== */}
      <section className="section">
        <div className="container narrow">
          <h2 className="title">
            Ko‘p beriladigan <span className="gold-text">savollar</span>
          </h2>
          <div className="faq">
            {faqs.map((f) => (
              <details key={f.q}>
                <summary>{f.q}</summary>
                <p>{f.a}</p>
              </details>
            ))}
          </div>
        </div>
      </section>

      {/* ===== FORMA ===== */}
      <section className="section section-form" id="ariza">
        <div className="hero-glow" aria-hidden />
        <div className="container form-wrap">
          <div className="form-text">
            <p className="eyebrow">Joylar soni cheklangan</p>
            <h2 className="title left">
              Kursga <span className="gold-text">ariza qoldiring</span>
            </h2>
            <p>
              Ma’lumotlaringizni qoldiring — menejerimiz siz bilan bog‘lanib, yaqin guruh sanasi, narx va to‘lov
              shartlari haqida batafsil aytib beradi.
            </p>
            <ul className="form-bullets">
              <li>
                <span>{Icon.check}</span>6 kun offline, Toshkentda
              </li>
              <li>
                <span>{Icon.check}</span>80% amaliyot, sertifikat bilan
              </li>
              <li>
                <span>{Icon.check}</span>Kitob, blaknot va turar joy bonuslari
              </li>
            </ul>
          </div>
          <div className="form-card">
            <h3>Ro‘yxatdan o‘tish</h3>
            <LeadForm />
          </div>
        </div>
      </section>

      {/* ===== FOOTER ===== */}
      <footer className="footer">
        <div className="container footer-in">
          <div>
            <a href="#" className="logo">
              Hayot qonuni<span>✦</span>
            </a>
            <p>Gipnoterapiyani to‘liq o‘rganish — 6 kunlik offline kurs</p>
          </div>
          <div className="footer-links">
            <a href={TG_CHANNEL} target="_blank" rel="noopener noreferrer">
              {Icon.tg} @hayotqonunikomolaok
            </a>
            <a href={TG_ADMIN} target="_blank" rel="noopener noreferrer">
              {Icon.tg} @komolaningadmini
            </a>
          </div>
        </div>
        <p className="container disclaimer">
          Kurs ta’limiy xarakterga ega va shifokor yoki psixiatr ko‘rigi hamda tibbiy davolanish o‘rnini bosmaydi.
        </p>
      </footer>

      {/* Mobil uchun doimiy tugma */}
      <a href="#ariza" className="sticky-cta">
        Kursga yozilish
      </a>
    </main>
  );
}
