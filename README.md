# MyPoRtoFoLio — Muhammad Fikri Al Haidar

Portfolio premium untuk web developer freelance (UMKM, startup, bisnis lokal, personal brand).
Dibangun dengan **React + TypeScript + Tailwind CSS**, backend form kontak dengan **Cloudflare Pages Functions + D1**.

## Pembaruan terbaru
- **Galeri project yang bisa digeser**: klik **View Project** pada LegalCraft / Nook Coffee Boutique, lalu geser gambar (swipe di HP, drag mouse di desktop, tombol panah, titik indikator, atau keyboard ← →). Komponen: `src/components/Gallery.tsx`; data slide lewat field `gallery` di `src/data/site.ts`
- **Project baru: Nook Coffee Boutique** (https://nookcoffeeboutique-my-id.pages.dev/) dengan 3 screenshot (`public/projects/nook-*.webp`) + tombol Live Preview. LegalCraft kini punya 3 gambar (`legalcraft*.webp`)
- **Foto profil tanpa background & tanpa frame**: `public/profile.webp` kini PNG-cutout (transparan). `PhotoFrame.tsx` dibuat ulang: foto berdiri sendiri, memudar halus ke halaman, dikelilingi chip tech melayang dengan efek parallax mengikuti kursor
- **Perapihan layout** (tidak ada lagi elemen yang saling tabrak): chip melayang di Hero dipindah ke tepi mockup dan dikecilkan di mobile, border putus-putus yang memotong chip dihapus, ukuran judul hero disesuaikan agar tidak terlalu padat, badge placeholder dipindah ke pojok kanan bawah dan diganti "Coming soon", rasio gambar kartu project disamakan dengan screenshot (1024x465)
- Form kontak: browser memanggil `/api/contact` (server-side delivery), opsi "Let's Collabs"

> **Agar email pasti masuk (sekali saja):** pilih salah satu
> 1. **Resend (disarankan)**: buat API key di resend.com, lalu `npx wrangler pages secret put RESEND_API_KEY --project-name <nama-project>` (opsional `NOTIFY_EMAIL`, `FROM_EMAIL`).
> 2. **FormSubmit**: kirim 1 pesan dari website live, buka email fikrialhaidar17@gmail.com, klik **Activate** (cek Spam).
> Tanpa keduanya, pesan tetap tersimpan di D1 bila binding `DB` terpasang.

## Fitur yang sudah selesai
- Navbar sticky, menu hamburger di mobile, penanda section aktif, tombol "Let's Talk"
- Light / Dark mode (tersimpan di `localStorage`, tanpa flash saat load, transisi halus)
- Hero, About, Services (5 kartu), Selected Works (5 proyek, kartu pertama tampil besar), Work Process (timeline horizontal/vertikal), Contact, Footer
- Modal detail proyek (focus trap, Esc, kunci scroll, navigasi proyek sebelumnya/berikutnya)
- Animasi fade-in saat scroll, hover card, mendukung `prefers-reduced-motion`
- Form kontak **fungsional**: validasi client + server, honeypot anti-spam, rate limit 5/jam/IP (IP di-hash), disimpan ke D1. Tidak ada simulasi sukses palsu: bila backend gagal, error ditampilkan.
- Tombol WhatsApp (di Contact + tombol melayang)
- Tipografi: Epilogue (heading) dan Poppins (teks)

## Mengedit konten
Semua teks yang perlu diganti ada di **`src/data/site.ts`**:
- `SITE`: nama, nomor WhatsApp (format `62812...`), email, link sosial media
- `PROJECTS`: 5 proyek (nama, kategori, deskripsi, teknologi, `image`, `liveUrl`, `isPlaceholder`)
  - Taruh screenshot di `public/projects/` lalu isi `image: '/projects/project-one.webp'`
  - Set `isPlaceholder: false` untuk menghapus badge "Placeholder"
  - Isi `liveUrl` agar tombol "Live Preview" muncul
- Foto profil: ganti `public/profile.webp` (gunakan PNG/WebP transparan)
  - Galeri swipe: isi `gallery: [{ src, alt, caption }, ...]` pada project (minimal 2 gambar)

## Struktur
```
src/
  data/site.ts          # semua konten & konfigurasi
  components/           # Navbar, Hero, About, Services, Projects, ProjectCard, ProjectModal, Process, Contact, Footer, ...
  hooks/                # useTheme, useActiveSection
functions/api/contact.ts  # POST /api/contact (Cloudflare Pages Function)
migrations/0001_contact_messages.sql
```

## Endpoint
| Method | Path | Fungsi |
|---|---|---|
| POST | `/api/contact` | Simpan inquiry ke D1. Body JSON: `name, email, business?, projectType, message` |

## Data
- **D1** tabel `contact_messages` (id, name, email, business, project_type, message, ip_hash, created_at)
- Notifikasi email opsional via Resend: set secret `RESEND_API_KEY`, `NOTIFY_EMAIL` (dan `FROM_EMAIL`)

## Pengembangan lokal
```bash
npm install
npm run build
npm run db:migrate:local
npx wrangler pages dev dist --local --ip 0.0.0.0 --port 3000   # atau: pm2 start ecosystem.config.cjs
npm run dev    # Vite saja (tanpa API)
```

## Deploy (Cloudflare Pages)
```bash
npx wrangler d1 create portowebsite-production      # salin database_id ke wrangler.jsonc
npm run db:migrate:prod
npm run deploy
```
Status: **belum di-deploy**. `database_id` di `wrangler.jsonc` masih placeholder.

## Belum dikerjakan / saran lanjutan
- Ganti data placeholder (nama, WhatsApp, email, sosial media, foto profil, 5 proyek asli + screenshot)
- Buat database D1 produksi dan deploy
- Opsional: halaman admin untuk membaca inquiry, notifikasi email, analytics
