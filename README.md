# Gipnoterapiya kursi — sotuv sayti (Next.js App Router)

## Ishga tushirish
```bash
npm install
cp .env.example .env.local   # qiymatlarni to'ldiring
npm run dev                  # http://localhost:3000
```
Deploy: Vercel → Environment Variables ga `.env.example` dagi barcha qiymatlarni kiriting.

## Qanday ishlaydi
1. **Forma** (ism, telefon, manzil) → `POST /api/lead`
   - Brauzerda Pixel `Lead` + serverda CAPI `Lead` (bir xil `event_id` → dublikat bo'lmaydi)
   - `_fbp`, `_fbc` (yoki `fbclid` dan yasalgan fbc), IP, User-Agent, sahifa URL yig'iladi
   - Barcha ma'lumot **AES-256-GCM bilan shifrlanib** link ichiga joylanadi (bazasiz ishlaydi)
   - Telegram botga xabar: mijoz ma'lumotlari + **🔐 shifrlangan link** + tugma
2. Mijoz to'lov qilgach, admin Telegramdagi linkni bosadi → `/p/[token]` sahifasi
   - Mijoz ma'lumotlari va Meta signallari (fbp/fbc/IP/UA) ko'rinadi
   - Summa (so'm) kiritiladi → **Yuborish** → CAPI `Purchase` mijozning o'z cookie/IP/UA/heshlangan telefoni bilan yuboriladi
   - Bitta mijozga bitta Purchase (`event_id = purchase_<id>`), qayta bosilsa Meta dublikatni o'chiradi
   - Telegramga "✅ Purchase yuborildi" tasdig'i keladi

## Muhim
- Telegram inline tugmasi faqat `https://` domen bilan chiqadi (localhost'da xabar ichidagi link ishlaydi).
- `META_CURRENCY=USD` bo'lsa so'm `USD_RATE` kursi bo'yicha dollarga aylantiriladi. `UZS` qo'yib ham ishlatish mumkin.
- Avval `META_TEST_EVENT_CODE` bilan Events Manager → Test events da tekshiring, keyin bo'sh qoldiring.
- Purchase ariza qoldirilgandan keyin **7 kun ichida** yuborilsa eng yaxshi moslashadi (website event cheklovi).
- `ADMIN_PIN` qo'yilsa, link kimgadir tushib qolsa ham PINsiz Purchase yuborib bo'lmaydi.
- Pixel faqat mijoz sahifalarida (`/`, `/rahmat`) ishlaydi — admin sahifasi Pixel ma'lumotlarini buzmaydi.

## Fayllar
```
app/(site)/page.tsx        — sotuv sahifasi
app/(site)/rahmat/page.tsx — "rahmat" sahifasi (Lead konversiyasi uchun)
app/p/[token]/page.tsx     — admin Purchase sahifasi
app/api/lead/route.ts      — forma → Telegram + CAPI Lead
app/api/purchase/route.ts  — summa → CAPI Purchase
lib/crypto.ts | lib/meta.ts | lib/telegram.ts
components/LeadForm.tsx | PurchaseForm.tsx | MetaPixel.tsx
```
# GipoTerapiya
