# Software Requirements Specification (SRS)
# SerenitySpa — Progressive Web App
## Platform Katalog, Reservasi, Wallet & WhatsApp Expert System untuk Bisnis Spa

| Item | Keterangan |
|---|---|
| **Nama Proyek** | SerenitySpa PWA (nama kerja — dapat disesuaikan) |
| **Versi Dokumen** | 1.0 |
| **Tanggal** | 2026-08-01 |
| **Status** | Draft untuk Implementasi |
| **Standar Acuan** | IEEE 830-1998 / ISO/IEC/IEEE 29148 |
| **Sumber Analisis** | Laporan Pemetaan Fitur & Inovasi Bisnis Spa (benchmark 6 kompetitor: Pan Pacific, Ikeda Spa, Aramsa Spa, Taman Sari, Gaya Spa, Tirta Ayu) |

---

## Daftar Isi

1. [Pendahuluan](#1-pendahuluan)
2. [Deskripsi Umum Sistem](#2-deskripsi-umum-sistem)
3. [Kebutuhan Fungsional (Functional Requirements)](#3-kebutuhan-fungsional)
4. [Kebutuhan Non-Fungsional](#4-kebutuhan-non-fungsional)
5. [Kebutuhan PWA Spesifik](#5-kebutuhan-pwa-spesifik)
6. [Kebutuhan Keamanan & Compliance](#6-kebutuhan-keamanan--compliance)
7. [Arsitektur & Teknologi](#7-arsitektur--teknologi)
8. [Model Data](#8-model-data)
9. [Kebutuhan Antarmuka Eksternal](#9-kebutuhan-antarmuka-eksternal)
10. [Prioritas & Roadmap Rilis](#10-prioritas--roadmap-rilis)
11. [Acceptance Criteria](#11-acceptance-criteria)
12. [Asumsi, Batasan, dan Ketergantungan](#12-asumsi-batasan-dan-ketergantungan)
13. [Glosarium](#13-glosarium)

---

## 1. Pendahuluan

### 1.1 Tujuan Dokumen
Dokumen ini mendefinisikan kebutuhan perangkat lunak secara lengkap untuk pengembangan aplikasi bisnis spa sebagai **Progressive Web App (PWA)**. Dokumen ditujukan untuk:

- **AI Agent / Tim Pengembang** — sebagai spesifikasi implementasi.
- **Product Owner & Pemilik Bisnis Spa** — sebagai acuan scope dan prioritas.
- **QA / Tester** — sebagai dasar penyusunan test case dan acceptance criteria.

### 1.2 Ruang Lingkup Produk
Sistem adalah **platform digital spa end-to-end** yang menggabungkan:

1. **Katalog & Informasi** — daftar layanan, harga, kategori, profil spa, multi-bahasa, multi-cabang.
2. **Sistem Reservasi Canggih** — kalender slot real-time, **pemilihan terapis**, checkout & ringkasan.
3. **Pembayaran & Akun** — payment gateway, **wallet/deposit digital** (anti no-show), akun pelanggan, membership/loyalty.
4. **Trust Building** — testimoni/review, halaman penghargaan (awards), profil detail terapis.
5. **Komunikasi & Engagement** — form kontak/email, blog/artikel, dan inovasi utama: **WhatsApp Expert System** (bot konsultasi → rekomendasi layanan → deep link booking).
6. **Admin Portal** — pengelolaan layanan, jadwal, terapis, booking, wallet, konten, dan review.

### 1.3 Posisi Kompetitif (dari hasil analisis)
- **Fitur standar industri yang wajib ada:** katalog layanan & harga, kategori, profil spa, formulir booking, tombol WhatsApp, form kontak, halaman penghargaan.
- **Competitive advantage yang harus dipertahankan & diperkuat:** kalender slot real-time, pemilihan terapis, checkout & ringkasan, wallet/deposit, akun pelanggan.
- **Gap yang wajib ditutup:** form kontak/email (dimiliki 100% kompetitor), halaman penghargaan (dimiliki 4 dari 6 kompetitor), membership/loyalty, profil detail terapis (peluang diferensiasi — belum dimiliki satu pun kompetitor).
- **Inovasi pembeda:** elevasi tombol WA menjadi **Expert System Assistant** — automated sales funnel dengan diagnosis keluhan dan deep link ke booking step pemilihan tanggal dengan layanan terisi otomatis.

### 1.4 Referensi
- Analisis Aplikasi Spa.pdf (matrix checklist 6 kompetitor + prototype dev)
- Prototype tim pengembangan (UI katalog, booking, wallet, WA floating button)

---

## 2. Deskripsi Umum Sistem

### 2.1 Perspektif Produk
Satu PWA dengan tiga area yang dipisahkan Role-Based Access Control (RBAC):

| Area | Pengguna | Fungsi Utama |
|---|---|---|
| **Public Site** | Pengunjung anonim | Katalog, profil spa, awards, blog, kontak, booking sebagai guest |
| **Customer Portal** | Pelanggan terdaftar | Booking, riwayat, wallet, membership, review, profil |
| **Admin Portal** | Staf/manajemen spa | Layanan, terapis, jadwal, booking, wallet top-up approval, konten, review moderation, laporan |

### 2.2 Kelas Pengguna dan Peran (RBAC)

| Role | Deskripsi | Hak Akses |
|---|---|---|
| **Guest** | Pengunjung tanpa akun | Lihat katalog, blog, kontak; booking guest (opsional dengan pembatasan wallet) |
| **Customer** | Pelanggan terdaftar | Booking, wallet, riwayat, review, membership |
| **Therapist** | Terapis spa | Melihat jadwal sendiri, status appointment |
| **Branch Admin** | Admin per cabang (multi-tenant) | Kelola data cabangnya: layanan, jadwal, booking, terapis |
| **Super Admin** | Pengelola pusat | Seluruh cabang, user management, konfigurasi, laporan konsolidasi |

### 2.3 Lingkungan Operasi
- **Client-side:** Browser modern (Chrome, Safari, Firefox, Edge) — mobile-first, installable PWA, offline parsial untuk katalog.
- **Server-side:** Cloud hosting, HTTPS wajib.
- **Environment:** `staging` / `production` terpisah; data demo berlabel jelas.

### 2.4 Batasan Desain Umum
- Arsitektur **multi-tenant/multi-cabang**: setiap entitas utama (layanan, terapis, slot, booking) ter-scope per cabang.
- **Multi-bahasa (ID/EN)** wajib sejak awal — semua konten katalog dan UI mendukung dua bahasa.
- Slot booking harus **real-time** — mencegah double-booking dengan locking di sisi server.
- Wallet dirancang sebagai mekanisme **anti no-show** (deposit dipotong sesuai kebijakan pembatalan).

---

## 3. Kebutuhan Fungsional

> Format ID: `FR-<modul>-<nomor>`. Prioritas: **[C]** Kritis (MVP), **[H]** Tinggi, **[M]** Menengah, **[L]** Lanjutan.

### 3.1 Katalog & Informasi (CAT)

| ID | Requirement | Prioritas |
|---|---|---|
| FR-CAT-01 | Sistem menampilkan daftar layanan spa: nama, deskripsi, durasi, harga, foto, kategori. | C |
| FR-CAT-02 | Layanan dikelompokkan per kategori (mis. Massage, Facial, Body Treatment, Package) dengan navigasi filter. | C |
| FR-CAT-03 | Sistem mendukung **multi-bahasa ID/EN** dengan language switcher; seluruh konten layanan memiliki versi terjemahan. | C |
| FR-CAT-04 | Sistem mendukung **multi-cabang/lokasi (multi-tenant)**: pengunjung memilih cabang; katalog, harga, dan slot menyesuaikan cabang terpilih. | H |
| FR-CAT-05 | Halaman **Profil Spa / Sejarah**: cerita brand, filosofi, galeri foto, fasilitas. | C |
| FR-CAT-06 | Halaman **Penghargaan (Awards)**: daftar penghargaan, sertifikasi, dan liputan media dengan gambar dan tahun. | H |
| FR-CAT-07 | Halaman **Profil Detail Terapis**: foto, nama/nama panggilan, spesialisasi, pengalaman, sertifikasi, rating — *diferensiasi: belum dimiliki kompetitor mana pun*. | H |
| FR-CAT-08 | Setiap halaman layanan memiliki tombol CTA "Book Now" yang membawa konteks layanan ke alur booking. | C |
| FR-CAT-09 | Setiap layanan dapat diakses melalui **URL unik/slug** (mis. `/services/sleep-massage`) untuk kebutuhan deep link & SEO. | C |

### 3.2 Sistem Booking & Reservasi (BOOK)

| ID | Requirement | Prioritas |
|---|---|---|
| FR-BOOK-01 | Alur booking multi-step: (1) Pilih Layanan → (2) Pilih Terapis → (3) Pilih Tanggal & Slot → (4) Checkout & Ringkasan → (5) Konfirmasi. | C |
| FR-BOOK-02 | **Kalender slot real-time**: slot yang sudah dipesan/penuh langsung tidak dapat dipilih; ketersediaan divalidasi ulang di server saat submit (optimistic locking / row lock) untuk mencegah double-booking. | C |
| FR-BOOK-03 | **Pemilihan terapis**: user dapat memilih terapis spesifik (dengan foto & rating) atau opsi "Any Available Therapist". Slot menyesuaikan availability terapis terpilih. | C |
| FR-BOOK-04 | Slot yang sedang dalam proses checkout di-hold sementara (mis. 10 menit) lalu dilepas otomatis jika tidak diselesaikan. | H |
| FR-BOOK-05 | **Checkout & ringkasan**: detail layanan, terapis, cabang, tanggal/jam, durasi, harga, metode pembayaran, catatan khusus (keluhan/preferensi). | C |
| FR-BOOK-06 | **Deep link booking**: URL dengan query parameter (mis. `/booking?service=sleep-massage&branch=central`) langsung membuka alur booking pada **Step 3 (Pilih Tanggal)** dengan layanan sudah terisi otomatis — *kebutuhan inti integrasi WA Expert System*. | C |
| FR-BOOK-07 | Status booking: `Pending Payment`, `Confirmed`, `Rescheduled`, `Cancelled`, `Completed`, `No-Show`. | C |
| FR-BOOK-08 | Customer dapat reschedule/cancel dengan aturan cut-off (mis. H-24 jam); pembatalan melewati cut-off memotong deposit sesuai kebijakan. | H |
| FR-BOOK-09 | Konfirmasi booking dikirim via email dan/atau notifikasi WA (template message), berisi detail dan link kelola booking. | H |
| FR-BOOK-10 | Reminder otomatis H-1 dan H-3 jam sebelum jadwal (email/push/WA). | H |
| FR-BOOK-11 | Guest booking (tanpa akun) diperbolehkan dengan nama + nomor WA + email; sistem menawarkan pembuatan akun setelah booking. | M |
| FR-BOOK-12 | Booking untuk lebih dari satu orang (couple/group) dengan alokasi terapis & ruangan ganda. | M |

### 3.3 Pembayaran, Wallet & Akun (PAY / WAL / ACC)

| ID | Requirement | Prioritas |
|---|---|---|
| FR-PAY-01 | Integrasi **payment gateway resmi** (mis. Midtrans/Xendit/Stripe): kartu, VA bank, e-wallet (GoPay/OVO/DANA/GrabPay), QRIS. Tidak ada data kartu tersimpan di server sendiri (tokenization, PCI-DSS SAQ-A). | C |
| FR-PAY-02 | Status pembayaran: `Pending`, `Paid`, `Failed`, `Expired`, `Refunded`; sinkron via webhook gateway. | C |
| FR-PAY-03 | Invoice/receipt digital per transaksi, dapat diunduh (PDF) dan riwayatnya tersimpan di akun. | H |
| FR-WAL-01 | **Wallet/deposit digital** per customer: top-up via payment gateway, saldo dapat digunakan untuk membayar booking. | C |
| FR-WAL-02 | Kebijakan **anti no-show**: booking mensyaratkan deposit minimum (dikonfigurasi admin, mis. 50%); no-show atau pembatalan terlambat memotong deposit otomatis sesuai aturan. | C |
| FR-WAL-03 | Riwayat transaksi wallet lengkap: top-up, pembayaran, potongan, refund, dengan saldo berjalan. | H |
| FR-WAL-04 | Refund ke wallet (instan) atau ke metode asal (via gateway) sesuai kebijakan. | H |
| FR-WAL-05 | Semua mutasi wallet bersifat atomik (transaksi database) dan tercatat di ledger yang immutable. | C |
| FR-ACC-01 | Registrasi & login customer: email + password, dengan verifikasi email; opsional login via Google/OTP WhatsApp. | C |
| FR-ACC-02 | Forgot password dengan token reset ber-expiry. | C |
| FR-ACC-03 | Profil customer: data diri, nomor WA, preferensi (aroma, tekanan pijat, keluhan umum), riwayat booking. | H |
| FR-ACC-04 | **Membership/Loyalty**: tier keanggotaan (mis. Silver/Gold/Platinum) berdasarkan akumulasi transaksi; poin reward per transaksi yang dapat ditukar diskon/layanan. | M |
| FR-ACC-05 | Consent checkbox (privacy policy & terms) saat registrasi, dengan timestamp tersimpan. | C |

### 3.4 Trust Building (TRUST)

| ID | Requirement | Prioritas |
|---|---|---|
| FR-TRUST-01 | Customer dapat memberikan **rating bintang (1–5) dan testimoni** setelah booking berstatus `Completed` (review terverifikasi transaksi). | H |
| FR-TRUST-02 | Review melalui **moderasi admin** sebelum tampil publik. | H |
| FR-TRUST-03 | Review dapat menilai: layanan keseluruhan, terapis, kebersihan, keramahan. Rating terapis terakumulasi ke profil terapis. | M |
| FR-TRUST-04 | Halaman awards dikelola melalui admin CMS (tambah/edit/hapus penghargaan). | H |
| FR-TRUST-05 | Testimoni pilihan (featured) dapat ditampilkan di landing page. | M |

### 3.5 Komunikasi & Engagement (COM)

| ID | Requirement | Prioritas |
|---|---|---|
| FR-COM-01 | **Form kontak / email**: nama, email, subjek, pesan — terkirim ke email admin dan tersimpan di admin portal (menutup gap: 100% kompetitor memilikinya). | C |
| FR-COM-02 | Alamat email, telepon, alamat cabang (dengan embed peta) tampil di halaman kontak dan footer. | C |
| FR-COM-03 | **Floating WhatsApp button** tersedia di seluruh halaman publik. | C |
| FR-COM-04 | **Blog / artikel tips** (wellness, perawatan, promo) dengan kategori, pencarian, dan SEO metadata; dikelola via admin CMS. | H |
| FR-COM-05 | Newsletter subscription (opsional) untuk promo & artikel. | L |

### 3.6 WhatsApp Expert System — Fitur Inovasi Utama (WAX)

> Mengubah tombol WA dari chat manual menjadi **Automated Sales Funnel** berbasis sistem pakar.

| ID | Requirement | Prioritas |
|---|---|---|
| FR-WAX-01 | Klik tombol WA membuka percakapan dengan **bot WhatsApp** (via WhatsApp Business API / Cloud API) yang otomatis menyapa dan menanyakan keluhan: "Balas 1 untuk Pegal & Nyeri Otot, 2 untuk Sulit Tidur/Insomnia, 3 untuk Relaksasi Total" (menu dapat dikonfigurasi admin). | H |
| FR-WAX-02 | **Rule engine diagnosis**: sistem memetakan jawaban keluhan → rekomendasi layanan dari database (mis. keluhan "2" → "Aromatherapy Sleep Massage 90 Menit" + copywriting persuasif). Mapping keluhan-layanan dikelola admin (CRUD rules). | H |
| FR-WAX-03 | Bot mengirimkan **deep link booking** (mis. `https://<domain>/booking?service=sleep-massage&utm_source=wa_bot`) yang membuka alur booking langsung di Step 3 dengan layanan terisi otomatis (bergantung FR-BOOK-06). | H |
| FR-WAX-04 | Percakapan mendukung fallback: opsi "bicara dengan admin manusia" kapan pun; percakapan dialihkan ke agent dengan konteks tersimpan. | H |
| FR-WAX-05 | Bot mendukung multi-bahasa (ID/EN) mengikuti bahasa pesan pertama user. | M |
| FR-WAX-06 | **Conversion tracking**: sistem mencatat funnel WA (chat dimulai → rekomendasi terkirim → deep link diklik → booking selesai) dan menampilkannya di laporan admin. | M |
| FR-WAX-07 | Bot dapat mengirim konfirmasi & reminder booking via WA template message (terintegrasi FR-BOOK-09/10). | M |
| FR-WAX-08 | (Lanjutan) Upgrade rule-based bot menjadi **AI conversational assistant** (LLM) dengan guardrails: hanya menjawab topik layanan spa, eskalasi ke manusia untuk topik di luar cakupan. | L |

### 3.7 Admin Portal (ADM)

| ID | Requirement | Prioritas |
|---|---|---|
| FR-ADM-01 | Login admin dengan RBAC; seluruh route `/admin/**` diproteksi autentikasi + role check di server. | C |
| FR-ADM-02 | **Manajemen layanan**: CRUD layanan, kategori, harga, durasi, foto, terjemahan ID/EN, status aktif/nonaktif, slug. | C |
| FR-ADM-03 | **Manajemen terapis**: CRUD profil, spesialisasi, foto, jadwal kerja (shift), cuti/blocked dates, penugasan cabang. | C |
| FR-ADM-04 | **Manajemen booking**: kalender view per cabang/terapis, ubah status, reschedule, cancel, tandai no-show, catatan internal. | C |
| FR-ADM-05 | **Manajemen slot & kapasitas**: jam operasional per cabang, durasi slot, jumlah ruangan/kapasitas paralel. | C |
| FR-ADM-06 | **Manajemen wallet**: lihat saldo & ledger customer, proses refund, konfigurasi kebijakan deposit & pemotongan no-show. | H |
| FR-ADM-07 | **Moderasi review**: approve/reject/feature testimoni. | H |
| FR-ADM-08 | **CMS**: kelola profil spa, awards, blog, halaman statis (privacy, terms), banner promo. | H |
| FR-ADM-09 | **Konfigurasi WA Expert System**: CRUD menu keluhan, mapping rekomendasi, template pesan. | H |
| FR-ADM-10 | **Laporan & analytics**: revenue per cabang/layanan/terapis, occupancy rate, tingkat no-show, funnel WA, top services; export CSV/PDF. | H |
| FR-ADM-11 | **Multi-tenant management** (Super Admin): CRUD cabang, penugasan Branch Admin, laporan konsolidasi. | H |
| FR-ADM-12 | Audit log untuk aksi sensitif: perubahan harga, mutasi wallet manual, pembatalan booking, perubahan role. | H |
| FR-ADM-13 | Inbox form kontak: daftar pesan masuk, status (baru/dibalas/selesai). | H |

### 3.8 Notifikasi (NOTIF)

| ID | Requirement | Prioritas |
|---|---|---|
| FR-NOTIF-01 | Email transaksional: verifikasi akun, konfirmasi booking, reminder, receipt, reset password. | C |
| FR-NOTIF-02 | **Web Push Notification** (PWA): reminder booking, promo, saldo wallet berubah — dengan opt-in yang sopan. | H |
| FR-NOTIF-03 | Notifikasi WA (template message) untuk konfirmasi & reminder (bergantung integrasi WA API). | M |
| FR-NOTIF-04 | Preferensi notifikasi per user (opt-in/out per kanal). | M |

---

## 4. Kebutuhan Non-Fungsional

| ID | Kategori | Requirement |
|---|---|---|
| NFR-01 | **Performa** | First Contentful Paint < 2s pada 4G; Lighthouse Performance ≥ 85 (mobile). |
| NFR-02 | **Performa** | Respons API p95 < 500 ms; pengecekan ketersediaan slot < 300 ms. |
| NFR-03 | **Konsistensi** | Zero double-booking: pemesanan slot menggunakan locking transaksional di database. |
| NFR-04 | **Ketersediaan** | Uptime target 99.5% (production); booking & payment adalah critical path. |
| NFR-05 | **Skalabilitas** | Mendukung minimal 5 cabang dan 50.000 pengunjung/bulan tanpa perubahan arsitektur. |
| NFR-06 | **Usability** | Mobile-first, responsive 320px–1920px; alur booking maksimal 5 langkah; WCAG 2.1 AA. |
| NFR-07 | **i18n/l10n** | Bahasa ID & EN penuh (UI + konten); format mata uang IDR/SGD, zona waktu per cabang. |
| NFR-08 | **SEO** | SSR/SSG untuk halaman publik; structured data (LocalBusiness, Service, Review); sitemap; meta per bahasa (hreflang). |
| NFR-09 | **Maintainability** | Kode modular TypeScript, test coverage ≥ 70% pada business logic (khususnya slot & wallet), CI/CD. |
| NFR-10 | **Observability** | Structured logging, error tracking, monitoring, alert untuk kegagalan payment webhook. |
| NFR-11 | **Backup** | Backup DB harian, retensi 30 hari; ledger wallet tidak boleh kehilangan data (point-in-time recovery). |

---

## 5. Kebutuhan PWA Spesifik

| ID | Requirement |
|---|---|
| PWA-01 | **Web App Manifest** lengkap: name, short_name, icons (192/512, maskable), theme_color, `display: standalone`, start_url, shortcuts (Book Now, My Bookings). |
| PWA-02 | **Service Worker**: app shell cache-first; katalog layanan stale-while-revalidate (dapat dilihat offline); data slot & wallet **network-only** (real-time, tidak dicache). |
| PWA-03 | **Installable** — lulus kriteria install prompt; custom install banner in-app. |
| PWA-04 | **Offline fallback**: katalog terakhir, detail booking yang sudah dikonfirmasi, dan halaman offline informatif dapat diakses tanpa koneksi. |
| PWA-05 | **Web Push Notifications** (VAPID) untuk reminder booking dan promo. |
| PWA-06 | **Deep link handling**: URL `/booking?service=...` berfungsi baik saat dibuka dari WA (in-app browser) maupun dari PWA ter-install. |
| PWA-07 | **HTTPS wajib** di semua environment. |
| PWA-08 | Update strategy: service worker versioning + prompt "Update tersedia" tanpa mengganggu alur booking yang sedang berjalan. |
| PWA-09 | Data sensitif (saldo wallet, data pelanggan) diberi `Cache-Control: no-store`; tidak dicache service worker. |
| PWA-10 | Lulus Lighthouse PWA audit (installability & best practices). |

---

## 6. Kebutuhan Keamanan & Compliance

| ID | Requirement |
|---|---|
| SEC-01 | Seluruh route `/admin/**` dan API admin wajib autentikasi + role check di server; tidak ada endpoint anonim. |
| SEC-02 | Password hash bcrypt/argon2; rate limiting login & reset; account lockout progresif. |
| SEC-03 | Session/JWT: expiry, refresh rotation, revocation saat logout/ganti password; cookie httpOnly + SameSite. |
| SEC-04 | **Wallet security**: mutasi saldo hanya melalui service layer transaksional; ledger append-only; rekonsiliasi harian otomatis dengan data gateway; deteksi anomali (top-up/refund tidak wajar). |
| SEC-05 | Payment webhook divalidasi signature; idempotency key untuk mencegah double-processing. |
| SEC-06 | Proteksi OWASP Top 10: input validation, XSS encoding, parameterized query, CSRF token, security headers (CSP, HSTS), rate limiting API booking. |
| SEC-07 | Deep link booking hanya membawa parameter non-sensitif (slug layanan, cabang, UTM) — tanpa data personal. |
| SEC-08 | Kepatuhan **UU PDP (Indonesia)** / PDPA (jika beroperasi di SG): consent management, privacy policy, hak akses & hapus data, retention policy. |
| SEC-09 | Audit log: login admin, perubahan harga, mutasi wallet, pembatalan booking, perubahan konfigurasi WA bot. |
| SEC-10 | Secrets via environment variables/secret manager; tidak ada credential di repository. |
| SEC-11 | Upload file (foto layanan/terapis) divalidasi tipe & ukuran, disimpan di object storage dengan URL non-executable. |

---

## 7. Arsitektur & Teknologi

### 7.1 Arsitektur yang Direkomendasikan

```
[PWA Client (SSR/SPA)] ⇄ HTTPS ⇄ [API Layer (REST)]
                                    ├── Auth Service (JWT + RBAC)
                                    ├── Catalog Service (multi-tenant, i18n)
                                    ├── Booking Service (slot engine + locking)
                                    ├── Wallet Service (ledger transaksional)
                                    ├── Payment Adapter (gateway + webhook)
                                    ├── WA Bot Service (WhatsApp Cloud API + rule engine)
                                    ├── Notification Service (Email + Web Push + WA template)
                                    └── [PostgreSQL + Redis (slot hold/cache) + Object Storage]
```

### 7.2 Rekomendasi Stack (dapat disesuaikan oleh agent)

| Layer | Rekomendasi | Alternatif |
|---|---|---|
| Frontend PWA | Next.js (App Router) + TypeScript + Workbox | Nuxt, SvelteKit |
| UI | Tailwind CSS + shadcn/ui | MUI |
| i18n | next-intl / i18next | — |
| Backend | Next.js API routes / NestJS | Go, Laravel |
| Database | PostgreSQL (row-level locking untuk slot) | MySQL |
| Cache/Hold | Redis (slot hold TTL 10 menit) | — |
| ORM | Prisma | Drizzle |
| WA Bot | WhatsApp Business Cloud API (Meta) | Twilio, Wati |
| Payment | Midtrans / Xendit (IDR, QRIS, e-wallet) | Stripe |
| Push | Web Push (VAPID) | FCM |
| Email | Transactional email service (Resend/SES) | — |
| Deploy | Vercel / container + managed DB | Cloud VM |

---

## 8. Model Data

### 8.1 Entitas Utama (ringkasan)

| Entitas | Atribut Kunci |
|---|---|
| **Branch** | id, name, address, phone, timezone, map_coords, operating_hours, status |
| **User** | id, role, name, email, phone_wa, password_hash, email_verified, consent_at, preferred_lang |
| **Therapist** | id, branch_id, display_name, photo, specializations[], experience_years, certifications[], rating_avg, status |
| **TherapistSchedule** | therapist_id, day_of_week/shift, blocked_dates[] |
| **ServiceCategory** | id, name_id, name_en, sort_order |
| **Service** | id, branch_id, category_id, slug, name_id/en, description_id/en, duration_min, price, currency, photos[], status |
| **Slot/Availability** | branch_id, therapist_id, date, start_time, capacity, status (available/held/booked), hold_expires_at |
| **Booking** | id, customer_id/guest_info, branch_id, service_id, therapist_id, slot_ref, status, notes, deposit_amount, total, source (web/wa_bot), utm |
| **Payment** | booking_id/topup_id, amount, method, gateway_ref, status, invoice_no |
| **Wallet** | customer_id, balance |
| **WalletLedger** | wallet_id, type (topup/payment/deduction/refund), amount, balance_after, reference, created_at (append-only) |
| **Membership** | customer_id, tier, points, tier_progress |
| **Review** | booking_id, customer_id, therapist_id, rating, category_ratings{}, text, status (pending/approved/featured) |
| **Award** | id, title_id/en, year, image, description |
| **BlogPost** | id, slug, title_id/en, body_id/en, category, seo_meta, published_at |
| **ContactMessage** | id, name, email, subject, message, status |
| **WAConversation** | id, phone, state, complaint_code, recommended_service_id, deep_link_clicked, booking_id, timestamps |
| **WARule** | complaint_code, complaint_label_id/en, recommended_service_id, message_template_id/en |
| **AuditLog** | actor_id, action, entity, before, after, ip, timestamp |

---

## 9. Kebutuhan Antarmuka Eksternal

| ID | Interface | Deskripsi |
|---|---|---|
| EI-01 | Payment Gateway API | Charge (kartu/VA/e-wallet/QRIS), refund, webhook status. |
| EI-02 | WhatsApp Business Cloud API | Inbound message webhook, outbound reply, template message (konfirmasi/reminder). |
| EI-03 | Email Service | Verifikasi, konfirmasi booking, receipt, reset password. |
| EI-04 | Web Push Service | Notifikasi push browser (VAPID). |
| EI-05 | Maps Embed | Lokasi cabang di halaman kontak. |
| EI-06 | (Lanjutan) LLM API | AI conversational assistant untuk WA bot fase lanjutan. |

---

## 10. Prioritas & Roadmap Rilis

### Rilis 1 — MVP (Kritis)
- Katalog layanan + kategori + multi-bahasa ID/EN + profil spa
- Booking multi-step: layanan → terapis → kalender slot real-time → checkout & ringkasan
- Deep link booking (`/booking?service=...`) — fondasi WA Expert System
- Payment gateway + status pembayaran + akun pelanggan (register/login/verifikasi)
- Wallet/deposit dasar + kebijakan anti no-show + ledger
- **Form kontak/email** (menutup gap kompetitor) + floating WA button
- Admin portal inti: layanan, terapis, jadwal, booking, RBAC
- PWA installable + HTTPS + halaman privacy/terms

### Rilis 2 — Trust & Automation (Tinggi)
- **WhatsApp Expert System**: bot menu keluhan → rule engine rekomendasi → deep link → conversion tracking
- **Halaman penghargaan (Awards)** + profil detail terapis (diferensiasi)
- Review & testimoni terverifikasi + moderasi
- Reminder otomatis (email/push/WA template) + reschedule/cancel self-service
- Blog/CMS + laporan admin (revenue, occupancy, no-show)
- Multi-cabang penuh (Branch Admin + laporan konsolidasi)

### Rilis 3 — Growth (Menengah)
- Membership/loyalty (tier + poin)
- Group/couple booking, promo & voucher
- Funnel analytics WA lengkap + featured testimonials
- Newsletter + preferensi notifikasi

### Rilis 4 — Diferensiasi Lanjutan
- AI conversational assistant (LLM) menggantikan rule-based bot dengan guardrails
- Rekomendasi layanan personal berbasis riwayat & preferensi
- Gift card / paket langganan perawatan

---

## 11. Acceptance Criteria

Sistem dinyatakan lulus bila:

1. **Zero double-booking:** Dua request bersamaan ke slot yang sama → hanya satu berhasil (uji concurrent load test).
2. **Slot hold:** Slot yang ditinggalkan di tengah checkout kembali tersedia setelah TTL hold berakhir.
3. **Deep link:** Membuka `/booking?service=<slug>` dari chat WA langsung menampilkan Step Pilih Tanggal dengan layanan sudah terisi — baik di browser biasa, in-app browser WA, maupun PWA ter-install.
4. **WA Expert System:** Alur chat lengkap teruji: sapaan otomatis → balas "2" → rekomendasi layanan sesuai rule → deep link terkirim → klik → booking selesai → funnel tercatat di laporan admin.
5. **Wallet:** Ledger selalu balance (sum ledger = saldo); no-show memotong deposit sesuai konfigurasi; tidak ada mutasi saldo tanpa entri ledger.
6. **Payment:** Webhook gateway ter-handle idempotent; status booking berubah `Confirmed` hanya setelah `Paid`.
7. **Multi-bahasa:** Seluruh halaman publik tampil penuh dalam ID dan EN; switch bahasa tidak menghilangkan konteks halaman.
8. **Keamanan:** Akses `/admin/**` tanpa login → redirect/401; customer tidak dapat melihat booking/wallet milik orang lain (uji IDOR).
9. **PWA:** Lulus Lighthouse installability; katalog dapat dilihat offline; data slot & wallet tidak pernah tersaji dari cache basi.
10. **Gap tertutup:** Form kontak berfungsi (email terkirim + tersimpan di admin) dan halaman Awards tampil dengan konten dari CMS.
11. **Performa:** Lighthouse Performance ≥ 85 (mobile, halaman katalog); cek ketersediaan slot < 300 ms.

---

## 12. Asumsi, Batasan, dan Ketergantungan

### Asumsi
1. Prototype tim dev saat ini sebagian besar berupa UI; backend (slot engine, wallet, WA bot) dibangun sesuai SRS ini.
2. Bisnis memiliki/akan mendaftarkan **WhatsApp Business API** (nomor bisnis terverifikasi Meta).
3. Kebijakan deposit dan pemotongan no-show ditentukan pemilik bisnis dan dapat dikonfigurasi.
4. Konten dua bahasa (ID/EN) disediakan oleh pemilik konten.

### Batasan
1. WhatsApp Cloud API memiliki aturan template message dan window 24 jam untuk pesan bebas — reminder di luar window wajib memakai approved template.
2. Push notification iOS memerlukan iOS 16.4+ dan install ke home screen.
3. Metode pembayaran bergantung cakupan gateway yang dipilih per negara operasi.

### Ketergantungan
1. Akun & approval WhatsApp Business Cloud API (Meta).
2. Kontrak payment gateway (Midtrans/Xendit/dsb.) beserta API key.
3. Layanan email transaksional.

---

## 13. Glosarium

| Istilah | Definisi |
|---|---|
| **PWA** | Progressive Web App — aplikasi web installable dengan kemampuan offline dan push notification. |
| **Multi-Tenant** | Arsitektur satu sistem melayani banyak cabang/lokasi dengan data ter-scope. |
| **Slot Real-Time** | Ketersediaan jadwal yang tervalidasi langsung ke server, mencegah double-booking. |
| **Wallet/Deposit** | Saldo digital pelanggan untuk pembayaran & jaminan booking (anti no-show). |
| **No-Show** | Pelanggan tidak hadir pada jadwal booking tanpa pembatalan. |
| **Deep Link** | URL berparameter yang membuka aplikasi langsung pada langkah/konteks tertentu. |
| **Expert System** | Sistem berbasis aturan yang mendiagnosis keluhan dan memberi rekomendasi layaknya konsultan. |
| **Automated Sales Funnel** | Alur penjualan otomatis: konsultasi → rekomendasi → konversi booking tanpa admin manual. |
| **WhatsApp Cloud API** | API resmi Meta untuk bot dan template message WhatsApp Business. |
| **RBAC** | Role-Based Access Control — hak akses berdasarkan peran pengguna. |
| **Ledger** | Catatan transaksi append-only sebagai sumber kebenaran mutasi saldo. |
| **Idempotency** | Jaminan sebuah operasi (mis. webhook) aman diproses berulang tanpa efek ganda. |

---

*Dokumen ini disusun berdasarkan Laporan Pemetaan Fitur & Inovasi Bisnis Spa (benchmark 6 kompetitor) dan siap digunakan sebagai spesifikasi implementasi oleh AI agent atau tim pengembang.*
