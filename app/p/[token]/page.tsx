import type { Metadata } from "next";
import { decryptLead } from "@/lib/crypto";
import PurchaseForm from "@/components/PurchaseForm";

export const metadata: Metadata = {
  title: "Sotuvni tasdiqlash",
  robots: { index: false, follow: false },
};

export const dynamic = "force-dynamic";

export default async function PurchasePage({ params }: { params: Promise<{ token: string }> }) {
  const { token } = await params;
  const lead = decryptLead(token);

  if (!lead) {
    return (
      <main className="center-page">
        <div className="thanks-card">
          <h1>Link yaroqsiz</h1>
          <p>Bu link buzilgan yoki noto‘g‘ri nusxalangan. Telegramdagi asl linkni oching.</p>
        </div>
      </main>
    );
  }

  const date = new Date(lead.ts * 1000).toLocaleString("uz-UZ", { timeZone: "Asia/Tashkent" });

  return (
    <main className="center-page">
      <div className="admin-card">
        <p className="eyebrow">Admin · Purchase</p>
        <h1>Sotuvni tasdiqlash</h1>

        <dl className="client">
          <div>
            <dt>Ism</dt>
            <dd>{lead.name}</dd>
          </div>
          <div>
            <dt>Telefon</dt>
            <dd>
              <a href={`tel:${lead.phone}`}>{lead.phone}</a>
            </dd>
          </div>
          <div>
            <dt>Manzil</dt>
            <dd>{lead.address}</dd>
          </div>
          <div>
            <dt>Ariza vaqti</dt>
            <dd>{date}</dd>
          </div>
          <div>
            <dt>Meta signal</dt>
            <dd className="signals">
              <span className={lead.fbp ? "ok" : "no"}>fbp</span>
              <span className={lead.fbc ? "ok" : "no"}>fbc</span>
              <span className={lead.ip ? "ok" : "no"}>IP</span>
              <span className={lead.ua ? "ok" : "no"}>User-Agent</span>
              <span className="ok">Telefon (hash)</span>
            </dd>
          </div>
        </dl>

        <PurchaseForm token={token} pinRequired={Boolean(process.env.ADMIN_PIN)} />
      </div>
    </main>
  );
}
