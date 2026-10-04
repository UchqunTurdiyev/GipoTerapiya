import MetaPixel from "@/components/MetaPixel";

/** Pixel faqat mijozlar ko'radigan sahifalarda (admin purchase sahifasida emas) */
export default function SiteLayout({ children }: { children: React.ReactNode }) {
  return (
    <>
      <MetaPixel />
      {children}
    </>
  );
}
