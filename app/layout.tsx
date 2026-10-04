import type { Metadata, Viewport } from "next";
import { Montserrat, Playfair_Display } from "next/font/google";
import "./globals.css";

const sans = Montserrat({ subsets: ["latin", "cyrillic"], variable: "--font-sans", display: "swap" });
const serif = Playfair_Display({ subsets: ["latin", "cyrillic"], variable: "--font-serif", display: "swap" });

export const metadata: Metadata = {
  metadataBase: new URL(process.env.NEXT_PUBLIC_SITE_URL || "http://localhost:3000"),
  title: "Gipnoterapiyani to‘liq o‘rganish — 6 kunlik offline kurs | Komola",
  description:
    "6 kunlik offline gipnoterapiya kursi: 20% nazariya, 80% amaliyot. Verbal va noverbal texnikalar, regressiv gipnoz, klinik gipnoterapiya. Sertifikat bilan.",
  openGraph: {
    title: "Gipnoterapiyani to‘liq o‘rganish — 6 kun offline",
    description: "20% nazariya, 80% amaliyot. Sertifikat, kitob va bonuslar bilan.",
    images: ["/komola.jpg"],
    locale: "uz_UZ",
    type: "website",
  },
};

export const viewport: Viewport = { themeColor: "#0a0806" };

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="uz" className={`${sans.variable} ${serif.variable}`}>
      <body>{children}</body>
    </html>
  );
}
