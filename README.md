# MyPoRtoFoLio — Muhammad Fikri Al Haidar

Portfolio premium untuk web developer freelance (UMKM, startup, bisnis lokal, personal brand).
Dibangun dengan **React + TypeScript + Tailwind CSS**, backend form kontak dengan **Cloudflare Pages Functions + D1**.

## Pembaruan terbaru
- **About**: tabel statistik di bawah foto dihapus; foto profil baru (`public/profile.webp`, background diganti tema biru gelap) dalam **bingkai kreatif** (`PhotoFrame.tsx`: ring gradien berputar, sudut viewfinder, badge melayang, efek tilt 3D saat hover, garis scan)
- **Project**: proyek pertama kini **LegalCraft** (https://legalcraftid.online/) dengan screenshot asli + tombol Live Preview
- **Form kontak diperbaiki** ("Failed to fetch"): browser kini hanya memanggil endpoint se-domain `/api/contact`; server yang mengirim email (Resend jika `RESEND_API_KEY` diset, jika tidak FormSubmit server-to-server) + backup D1 opsional. Jika gagal, muncul tautan fallback `mailto:` dan WhatsApp
- Opsi **"Let's Collabs (kerja sama)"** di pilihan jenis project + tombol cepat "Let's Collabs" di form

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
- Foto profil: ganti blok placeholder di `src/components/About.tsx`

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
