# Software Design Document (SDD)
# SerenitySpa / Serenity & Soul — Progressive Web App

## Platform Katalog, Reservasi, Wallet, Loyalty, CRM & WhatsApp Expert System untuk Bisnis Spa

| Item | Keterangan |
|---|---|
| **Nama Proyek** | SerenitySpa / Serenity & Soul PWA |
| **Jenis Dokumen** | Software Design Document (SDD) |
| **Versi Dokumen** | 1.0 |
| **Tanggal** | 2026-08-12 |
| **Status** | Draft Implementasi |
| **Acuan Utama** | SRS SerenitySpa PWA, Analisis Fitur Unggulan, Laporan Penambahan Fitur |
| **Target Pembaca** | Tim Developer, AI Coding Agent, QA Engineer, DevOps, Product Owner |
| **Platform** | Progressive Web App, Mobile-first, Multi-cabang, Multi-bahasa |

## Daftar Isi
---
1. [Pendahuluan](#1-pendahuluan)
2. [Tujuan Desain Sistem](#2-tujuan-desain-sistem)
3. [Ringkasan Arsitektur](#3-ringkasan-arsitektur)
4. [Desain Teknologi](#4-desain-teknologi)
5. [Desain Modul Sistem](#5-desain-modul-sistem)
6. [Desain Frontend PWA](#6-desain-frontend-pwa)
7. [Desain Backend & Service Layer](#7-desain-backend--service-layer)
8. [Desain Database](#8-desain-database)
9. [Desain API](#9-desain-api)
10. [Desain Alur Booking](#10-desain-alur-booking)
11. [Desain Wallet, Deposit & Ledger](#11-desain-wallet-deposit--ledger)
12. [Desain Payment Gateway](#12-desain-payment-gateway)
13. [Desain WhatsApp Expert System](#13-desain-whatsapp-expert-system)
14. [Desain Admin Portal & CRM](#14-desain-admin-portal--crm)
15. [Desain Loyalty, Review & Gift Card](#15-desain-loyalty-review--gift-card)
16. [Desain Notifikasi](#16-desain-notifikasi)
17. [Desain Keamanan](#17-desain-keamanan)
18. [Desain PWA, Offline & Caching](#18-desain-pwa-offline--caching)
19. [Desain Observability & Logging](#19-desain-observability--logging)
20. [Desain Deployment](#20-desain-deployment)
21. [Strategi Testing](#21-strategi-testing)
22. [Skenario Kritis Sistem](#22-skenario-kritis-sistem)
23. [Risiko Teknis & Mitigasi](#23-risiko-teknis--mitigasi)
24. [Lampiran](#24-lampiran)

---

# 1. Pendahuluan

## 1.1 Tujuan Dokumen

Dokumen ini menjelaskan rancangan teknis untuk pengembangan aplikasi **SerenitySpa / Serenity & Soul PWA**, yaitu platform digital spa yang mencakup katalog layanan, reservasi real-time, pemilihan terapis, wallet/deposit, loyalty, review, CRM admin, dan WhatsApp Expert System.

Berbeda dari SRS yang menjelaskan *apa yang harus dibuat*, dokumen SDD ini menjelaskan **bagaimana sistem akan dirancang dan diimplementasikan**.

## 1.2 Ruang Lingkup Desain

Desain sistem mencakup:

- Public website untuk katalog, profil spa, blog, awards, kontak, dan booking.
- Customer portal untuk akun pelanggan, wallet, riwayat booking, review, loyalty, dan gift card.
- Admin portal untuk manajemen layanan, terapis, booking, customer CRM, wallet, laporan, konten, dan konfigurasi WhatsApp Expert System.
- Backend API untuk autentikasi, booking, pembayaran, wallet, notifikasi, CMS, dan integrasi eksternal.
- WhatsApp bot berbasis rule engine untuk rekomendasi layanan dan deep link booking.
- PWA dengan offline capability terbatas, push notification, installability, dan caching strategy.

## 1.3 Prinsip Desain

Sistem dirancang dengan prinsip berikut:

1. **Mobile-first**
   - Karena mayoritas pengguna spa diperkirakan mengakses melalui smartphone.

2. **Real-time booking integrity**
   - Tidak boleh ada double-booking pada slot, terapis, atau ruangan yang sama.

3. **Security by design**
   - Wallet, payment, admin portal, dan data pelanggan harus aman sejak level desain.

4. **Modular service architecture**
   - Setiap domain bisnis dipisahkan dalam service layer.

5. **Multi-tenant ready**
   - Semua data utama harus dapat di-scope berdasarkan cabang.

6. **Progressive enhancement**
   - Website tetap dapat digunakan meskipun fitur PWA atau push belum aktif.

7. **Automation-first**
   - WhatsApp tidak hanya sebagai chat manual, tetapi menjadi sales funnel otomatis.

---

# 2. Tujuan Desain Sistem

## 2.1 Tujuan Fungsional

Sistem harus mampu:

- Menampilkan katalog layanan spa multi-bahasa.
- Mengelola layanan, kategori, terapis, jadwal, booking, wallet, loyalty, review, blog, awards, dan kontak.
- Memproses booking dengan slot real-time dan locking transaksional.
- Menerapkan deposit 50% atau nilai deposit configurable untuk mengurangi no-show.
- Mengirim konfirmasi dan reminder melalui email, push notification, dan WhatsApp.
- Memberikan rekomendasi layanan via WhatsApp Expert System.
- Melacak funnel WhatsApp dari chat hingga booking selesai.
- Memberikan dashboard admin dan CRM pelanggan.

## 2.2 Tujuan Non-Fungsional

Sistem dirancang untuk memenuhi:

| Aspek | Target Desain |
|---|---|
| **Performance** | API p95 < 500 ms, slot check < 300 ms |
| **Availability** | Uptime production 99.5% |
| **Scalability** | Minimal 5 cabang dan 50.000 pengunjung/bulan |
| **Security** | OWASP Top 10 protection, RBAC, secure wallet ledger |
| **Maintainability** | Modular TypeScript, test coverage business logic ≥ 70% |
| **PWA** | Installable, offline katalog, push notification |
| **SEO** | SSR/SSG untuk halaman publik |
| **Compliance** | UU PDP Indonesia / PDPA readiness |

---

# 3. Ringkasan Arsitektur

## 3.1 Arsitektur Tingkat Tinggi

Sistem menggunakan pendekatan **modular monolith dengan service layer** pada fase awal. Desain ini dipilih karena:

- Lebih cepat dikembangkan untuk MVP.
- Lebih mudah diuji.
- Tetap dapat dipecah menjadi microservices di masa depan.
- Cocok untuk domain bisnis yang masih berkembang.

```text
+-------------------------------------------------------------+
|                         PWA Client                          |
|  Public Site | Customer Portal | Admin Portal | WA Deep Link |
+-----------------------------+-------------------------------+
                              |
                              | HTTPS / REST API
                              |
+-------------------------------------------------------------+
|                         API Layer                           |
|  Auth | Catalog | Booking | Wallet | Payment | Notification |
|  CMS  | Review  | Loyalty | CRM     | WA Bot  | Reporting    |
+-----------------------------+-------------------------------+
                              |
        +---------------------+---------------------+
        |                                           |
+---------------+                         +------------------+
| PostgreSQL DB |                         | Redis Cache/Hold |
+---------------+                         +------------------+
        |
+---------------+
| Object Storage|
+---------------+

External Integrations:
- Payment Gateway: Midtrans / Xendit / Stripe
- WhatsApp Business Cloud API
- Transactional Email Provider
- Web Push Service / VAPID
- Google Maps Embed
```

## 3.2 Pola Arsitektur

| Area | Pola Desain |
|---|---|
| Frontend | Component-based architecture |
| Backend | Controller → Service → Repository |
| Booking | Transactional locking + temporary hold |
| Wallet | Append-only ledger |
| Payment | Webhook-driven state synchronization |
| WhatsApp Bot | Rule-based state machine |
| Admin | RBAC protected dashboard |
| PWA | Service worker + selective caching |

## 3.3 Pembagian Layer

```text
Presentation Layer
├── Public Pages
├── Customer Pages
├── Admin Pages
└── PWA Shell

Application Layer
├── API Controllers
├── Validation Middleware
├── Auth Middleware
└── Response Formatter

Domain Service Layer
├── BookingService
├── WalletService
├── PaymentService
├── CatalogService
├── WAExpertService
├── NotificationService
├── LoyaltyService
├── CRMService
└── CMSService

Persistence Layer
├── PostgreSQL
├── Redis
├── Object Storage
└── Audit Log

External Adapter Layer
├── PaymentGatewayAdapter
├── WhatsAppAdapter
├── EmailAdapter
├── PushAdapter
└── Maps Embed
```

---

# 4. Desain Teknologi

## 4.1 Stack Rekomendasi

| Layer | Teknologi Utama | Catatan |
|---|---|---|
| Frontend | Next.js App Router + TypeScript | Mendukung SSR/SSG dan PWA |
| UI | Tailwind CSS + shadcn/ui | Konsisten dan cepat dikembangkan |
| State Management | Zustand / React Context | Untuk booking wizard, user session, cart |
| Form | React Hook Form + Zod | Validasi client-side |
| Backend | Next.js Route Handler atau NestJS | NestJS disarankan jika backend kompleks |
| ORM | Prisma | Produktif dan type-safe |
| Database | PostgreSQL | Mendukung transaksi dan row lock |
| Cache / Slot Hold | Redis | TTL hold slot checkout |
| Auth | JWT + HttpOnly Cookie | Secure session |
| Payment | Midtrans / Xendit | Mendukung QRIS dan e-wallet Indonesia |
| WA Bot | WhatsApp Business Cloud API | Bot dan template message |
| Email | Resend / Amazon SES | Email transaksional |
| Push | Web Push VAPID | PWA notification |
| Storage | S3-compatible Object Storage | Foto layanan, terapis, awards, blog |
| Monitoring | Sentry + OpenTelemetry | Error tracking dan tracing |
| Deployment | Vercel / Docker + Managed DB | Disesuaikan skala |

## 4.2 Struktur Repository

```text
serenityspa/
├── apps/
│   ├── web/
│   │   ├── app/
│   │   ├── components/
│   │   ├── features/
│   │   ├── hooks/
│   │   ├── lib/
│   │   ├── messages/
│   │   ├── public/
│   │   └── styles/
│   │
│   └── admin/
│       ├── app/
│       ├── components/
│       ├── features/
│       └── lib/
│
├── packages/
│   ├── api/
│   │   ├── controllers/
│   │   ├── services/
│   │   ├── repositories/
│   │   ├── middlewares/
│   │   ├── validators/
│   │   └── adapters/
│   │
│   ├── database/
│   │   ├── prisma/
│   │   ├── migrations/
│   │   └── seed/
│   │
│   ├── shared/
│   │   ├── constants/
│   │   ├── types/
│   │   ├── utils/
│   │   └── errors/
│   │
│   └── config/
│
├── tests/
│   ├── unit/
│   ├── integration/
│   ├── e2e/
│   └── load/
│
├── docs/
│   ├── SRS-SpaApp.md
│   ├── SDD-SerenitySpa-PWA.md
│   └── API.md
│
├── docker-compose.yml
├── package.json
├── tsconfig.json
└── README.md
```

---

# 5. Desain Modul Sistem

## 5.1 Daftar Modul Utama

| Modul | Fungsi |
|---|---|
| Auth Module | Login, register, session, RBAC |
| Catalog Module | Layanan, kategori, harga, multi-bahasa |
| Branch Module | Multi-cabang, lokasi, jam operasional |
| Therapist Module | Profil, jadwal, spesialisasi, rating |
| Booking Module | Slot, hold, checkout, status booking |
| Payment Module | Gateway charge, webhook, invoice |
| Wallet Module | Saldo, deposit, ledger, refund |
| Loyalty Module | Points, tier, reward |
| Review Module | Rating, testimoni, moderasi |
| CMS Module | Blog, awards, halaman statis, banner |
| Contact Module | Form kontak, inbox admin |
| WA Expert Module | Bot, rule engine, deep link, tracking |
| Notification Module | Email, push, WhatsApp template |
| Admin Module | Dashboard, laporan, konfigurasi |
| CRM Module | Customer insight, treatment history, notes |
| Audit Module | Log aksi sensitif |

---

# 6. Desain Frontend PWA

## 6.1 Struktur Halaman Public Site

```text
/
├── Landing page
├── Services
│   ├── /services
│   └── /services/[slug]
├── Therapists
│   └── /therapists/[id]
├── Booking
│   └── /booking
├── About
├── Awards
├── Blog
│   ├── /blog
│   └── /blog/[slug]
├── Contact
├── Privacy Policy
└── Terms & Conditions
```

## 6.2 Struktur Halaman Customer Portal

```text
/account
├── Dashboard
├── Profile
├── My Bookings
├── Booking Detail
├── Wallet
├── Wallet Ledger
├── Loyalty / Serenity Rewards
├── Gift Card
├── Reviews
└── Notification Preferences
```

## 6.3 Struktur Halaman Admin Portal

```text
/admin
├── Login
├── Dashboard
├── Bookings
├── Calendar
├── Customers / CRM
├── Services
├── Categories
├── Therapists
├── Branches
├── Wallet
├── Payments
├── Reviews
├── Blog
├── Awards
├── Contact Inbox
├── WA Expert Rules
├── Reports
├── Settings
└── Audit Logs
```

## 6.4 Desain Komponen Frontend

### 6.4.1 Komponen Umum

| Komponen | Deskripsi |
|---|---|
| `AppHeader` | Header navigasi public site |
| `AppFooter` | Footer dengan maps, kontak, link |
| `LanguageSwitcher` | Switch ID/EN |
| `BranchSelector` | Pilih cabang aktif |
| `FloatingWhatsAppButton` | Tombol WA global |
| `ServiceCard` | Card layanan spa |
| `TherapistCard` | Card terapis dengan foto dan rating |
| `PriceDisplay` | Format harga sesuai currency |
| `RatingStars` | Tampilan rating |
| `InstallPWABanner` | Prompt install aplikasi |
| `OfflineBanner` | Indikator offline |
| `ProtectedRoute` | Proteksi halaman customer/admin |

### 6.4.2 Komponen Booking

```text
BookingWizard
├── StepServiceSelection
├── StepTherapistSelection
├── StepDateSlotSelection
├── StepCheckoutSummary
├── StepPayment
└── StepConfirmation
```

### 6.4.3 Komponen Modal Prototype

Berdasarkan laporan penambahan fitur, modal berikut perlu dipertahankan atau dikembangkan:

| Modal | Fungsi |
|---|---|
| `blog-detail-modal` | Membaca artikel tanpa pindah halaman |
| `therapist-bio-modal` | Melihat biodata terapis |
| `leave-review-modal` | Memberikan review setelah treatment |
| `cancel-booking-modal` | Membatalkan booking dengan info denda |
| `send-giftcard-modal` | Mengirim e-gift card |
| `wallet-topup-modal` | Top-up saldo wallet |
| `booking-detail-modal` | Detail booking |
| `customer-note-modal` | Catatan pelanggan di admin CRM |

---

# 7. Desain Backend & Service Layer

## 7.1 Pola Controller-Service-Repository

Setiap request API harus melewati pola berikut:

```text
Request
  ↓
Route Handler / Controller
  ↓
Validation Middleware
  ↓
Auth / RBAC Middleware
  ↓
Service Layer
  ↓
Repository Layer
  ↓
Database / External Adapter
  ↓
Response Formatter
```

## 7.2 Contoh Struktur Service

```text
BookingController
├── createBooking()
├── holdSlot()
├── confirmBooking()
├── cancelBooking()
├── rescheduleBooking()
└── getAvailability()

BookingService
├── validateBookingInput()
├── checkSlotAvailability()
├── holdSlotWithTTL()
├── createPendingBooking()
├── confirmBookingAfterPayment()
├── releaseExpiredHold()
├── applyCancellationPolicy()
└── preventDoubleBooking()

BookingRepository
├── findAvailableSlots()
├── lockSlotForBooking()
├── createBooking()
├── updateBookingStatus()
└── findBookingById()
```

## 7.3 Error Handling

Semua error API harus menggunakan format standar:

```json
{
  "success": false,
  "error": {
    "code": "SLOT_ALREADY_BOOKED",
    "message": "Slot sudah tidak tersedia.",
    "details": {}
  }
}
```

## 7.4 Success Response

```json
{
  "success": true,
  "data": {},
  "meta": {}
}
```

---

# 8. Desain Database

## 8.1 Database Utama

Database utama menggunakan **PostgreSQL** karena membutuhkan:

- Transaksi ACID.
- Row-level locking.
- Foreign key constraints.
- Indexing yang kuat.
- Cocok untuk wallet ledger.
- Cocok untuk booking dengan konsistensi tinggi.

## 8.2 Entitas Utama

### 8.2.1 Branch

```sql
branches
- id UUID PK
- name VARCHAR
- slug VARCHAR UNIQUE
- address TEXT
- phone VARCHAR
- email VARCHAR
- timezone VARCHAR
- map_lat DECIMAL
- map_lng DECIMAL
- operating_hours JSONB
- status VARCHAR
- created_at TIMESTAMP
- updated_at TIMESTAMP
```

### 8.2.2 User

```sql
users
- id UUID PK
- role VARCHAR
- name VARCHAR
- email VARCHAR UNIQUE
- phone_wa VARCHAR UNIQUE
- password_hash TEXT
- email_verified BOOLEAN
- preferred_lang VARCHAR
- consent_at TIMESTAMP
- status VARCHAR
- created_at TIMESTAMP
- updated_at TIMESTAMP
```

Role yang digunakan:

```text
guest
customer
therapist
branch_admin
super_admin
```

### 8.2.3 Service Category

```sql
service_categories
- id UUID PK
- name_id VARCHAR
- name_en VARCHAR
- slug VARCHAR UNIQUE
- sort_order INT
- status VARCHAR
- created_at TIMESTAMP
- updated_at TIMESTAMP
```

### 8.2.4 Service

```sql
services
- id UUID PK
- branch_id UUID FK -> branches.id
- category_id UUID FK -> service_categories.id
- slug VARCHAR
- name_id VARCHAR
- name_en VARCHAR
- description_id TEXT
- description_en TEXT
- duration_min INT
- price DECIMAL
- currency VARCHAR
- photos JSONB
- status VARCHAR
- created_at TIMESTAMP
- updated_at TIMESTAMP

UNIQUE(branch_id, slug)
```

### 8.2.5 Therapist

```sql
therapists
- id UUID PK
- user_id UUID NULL FK -> users.id
- branch_id UUID FK -> branches.id
- display_name VARCHAR
- photo_url TEXT
- bio_id TEXT
- bio_en TEXT
- specializations JSONB
- experience_years INT
- certifications JSONB
- rating_avg DECIMAL
- rating_count INT
- status VARCHAR
- created_at TIMESTAMP
- updated_at TIMESTAMP
```

### 8.2.6 Therapist Schedule

```sql
therapist_schedules
- id UUID PK
- therapist_id UUID FK -> therapists.id
- branch_id UUID FK -> branches.id
- day_of_week INT
- start_time TIME
- end_time TIME
- is_active BOOLEAN
- created_at TIMESTAMP
- updated_at TIMESTAMP
```

### 8.2.7 Blocked Date

```sql
therapist_blocked_dates
- id UUID PK
- therapist_id UUID FK
- branch_id UUID FK
- date DATE
- reason TEXT
- created_at TIMESTAMP
```

### 8.2.8 Room / Capacity

```sql
rooms
- id UUID PK
- branch_id UUID FK
- name VARCHAR
- status VARCHAR
- created_at TIMESTAMP
- updated_at TIMESTAMP
```

### 8.2.9 Booking

```sql
bookings
- id UUID PK
- booking_no VARCHAR UNIQUE
- customer_id UUID NULL FK -> users.id
- guest_name VARCHAR NULL
- guest_email VARCHAR NULL
- guest_phone_wa VARCHAR NULL
- branch_id UUID FK -> branches.id
- service_id UUID FK -> services.id
- therapist_id UUID NULL FK -> therapists.id
- room_id UUID NULL FK -> rooms.id
- start_at TIMESTAMP
- end_at TIMESTAMP
- status VARCHAR
- notes TEXT
- internal_notes TEXT
- source VARCHAR
- utm_source VARCHAR NULL
- utm_campaign VARCHAR NULL
- total_amount DECIMAL
- deposit_amount DECIMAL
- cancellation_fee DECIMAL
- payment_status VARCHAR
- created_at TIMESTAMP
- updated_at TIMESTAMP
```

Status booking:

```text
pending_payment
confirmed
rescheduled
cancelled
completed
no_show
expired
```

### 8.2.10 Slot Hold

```sql
slot_holds
- id UUID PK
- branch_id UUID FK
- service_id UUID FK
- therapist_id UUID NULL FK
- room_id UUID NULL FK
- customer_id UUID NULL FK
- session_id VARCHAR
- start_at TIMESTAMP
- end_at TIMESTAMP
- expires_at TIMESTAMP
- status VARCHAR
- created_at TIMESTAMP
```

Status hold:

```text
active
released
converted
expired
```

### 8.2.11 Payment

```sql
payments
- id UUID PK
- booking_id UUID NULL FK -> bookings.id
- wallet_topup_id UUID NULL
- invoice_no VARCHAR UNIQUE
- gateway VARCHAR
- gateway_ref VARCHAR
- payment_method VARCHAR
- amount DECIMAL
- currency VARCHAR
- status VARCHAR
- raw_payload JSONB
- paid_at TIMESTAMP NULL
- expired_at TIMESTAMP NULL
- created_at TIMESTAMP
- updated_at TIMESTAMP
```

Status payment:

```text
pending
paid
failed
expired
refunded
```

### 8.2.12 Wallet

```sql
wallets
- id UUID PK
- customer_id UUID UNIQUE FK -> users.id
- balance DECIMAL
- currency VARCHAR
- status VARCHAR
- created_at TIMESTAMP
- updated_at TIMESTAMP
```

### 8.2.13 Wallet Ledger

```sql
wallet_ledgers
- id UUID PK
- wallet_id UUID FK -> wallets.id
- type VARCHAR
- direction VARCHAR
- amount DECIMAL
- balance_before DECIMAL
- balance_after DECIMAL
- reference_type VARCHAR
- reference_id UUID
- description TEXT
- idempotency_key VARCHAR UNIQUE
- created_at TIMESTAMP
```

Tipe ledger:

```text
topup
booking_payment
deposit_hold
deposit_capture
refund
no_show_deduction
giftcard_send
giftcard_receive
manual_adjustment
```

### 8.2.14 Loyalty

```sql
memberships
- id UUID PK
- customer_id UUID UNIQUE FK -> users.id
- tier VARCHAR
- points INT
- lifetime_spend DECIMAL
- tier_progress DECIMAL
- created_at TIMESTAMP
- updated_at TIMESTAMP
```

Tier:

```text
silver
gold
platinum
```

### 8.2.15 Gift Card

```sql
gift_cards
- id UUID PK
- sender_id UUID FK -> users.id
- receiver_id UUID NULL FK -> users.id
- receiver_email VARCHAR NULL
- code VARCHAR UNIQUE
- amount DECIMAL
- message TEXT
- status VARCHAR
- redeemed_at TIMESTAMP NULL
- created_at TIMESTAMP
```

Status:

```text
active
redeemed
expired
cancelled
```

### 8.2.16 Review

```sql
reviews
- id UUID PK
- booking_id UUID UNIQUE FK -> bookings.id
- customer_id UUID FK -> users.id
- therapist_id UUID NULL FK -> therapists.id
- service_id UUID FK -> services.id
- rating_overall INT
- rating_therapist INT
- rating_cleanliness INT
- rating_friendliness INT
- text TEXT
- status VARCHAR
- is_featured BOOLEAN
- created_at TIMESTAMP
- updated_at TIMESTAMP
```

Status review:

```text
pending
approved
rejected
featured
```

### 8.2.17 Contact Message

```sql
contact_messages
- id UUID PK
- name VARCHAR
- email VARCHAR
- subject VARCHAR
- message TEXT
- status VARCHAR
- replied_at TIMESTAMP NULL
- created_at TIMESTAMP
```

Status:

```text
new
in_progress
replied
closed
```

### 8.2.18 WA Conversation

```sql
wa_conversations
- id UUID PK
- phone_wa VARCHAR
- user_id UUID NULL FK -> users.id
- language VARCHAR
- state VARCHAR
- complaint_code VARCHAR NULL
- recommended_service_id UUID NULL FK -> services.id
- deep_link_url TEXT NULL
- deep_link_clicked BOOLEAN
- booking_id UUID NULL FK -> bookings.id
- assigned_agent_id UUID NULL FK -> users.id
- started_at TIMESTAMP
- updated_at TIMESTAMP
```

### 8.2.19 WA Rule

```sql
wa_rules
- id UUID PK
- complaint_code VARCHAR UNIQUE
- complaint_label_id VARCHAR
- complaint_label_en VARCHAR
- recommended_service_id UUID FK -> services.id
- message_template_id TEXT
- message_template_en TEXT
- sort_order INT
- status VARCHAR
- created_at TIMESTAMP
- updated_at TIMESTAMP
```

### 8.2.20 Audit Log

```sql
audit_logs
- id UUID PK
- actor_id UUID NULL FK -> users.id
- actor_role VARCHAR
- action VARCHAR
- entity VARCHAR
- entity_id UUID
- before JSONB
- after JSONB
- ip_address VARCHAR
- user_agent TEXT
- created_at TIMESTAMP
```

## 8.3 Index Penting

```sql
CREATE INDEX idx_services_branch_slug ON services(branch_id, slug);
CREATE INDEX idx_bookings_branch_start ON bookings(branch_id, start_at);
CREATE INDEX idx_bookings_therapist_start ON bookings(therapist_id, start_at);
CREATE INDEX idx_bookings_customer ON bookings(customer_id);
CREATE INDEX idx_slot_holds_lookup ON slot_holds(branch_id, therapist_id, start_at, end_at, status);
CREATE INDEX idx_wallet_ledgers_wallet_created ON wallet_ledgers(wallet_id, created_at);
CREATE INDEX idx_payments_gateway_ref ON payments(gateway, gateway_ref);
CREATE INDEX idx_wa_conversations_phone ON wa_conversations(phone_wa);
```

---

# 9. Desain API

## 9.1 Standar API

Base URL:

```text
/api/v1
```

Header standar:

```http
Content-Type: application/json
Accept: application/json
Authorization: Bearer <token>
X-Request-Id: <uuid>
```

## 9.2 Auth API

| Method | Endpoint | Deskripsi |
|---|---|---|
| POST | `/auth/register` | Registrasi customer |
| POST | `/auth/login` | Login customer/admin |
| POST | `/auth/logout` | Logout |
| POST | `/auth/refresh` | Refresh token |
| POST | `/auth/forgot-password` | Request reset password |
| POST | `/auth/reset-password` | Reset password |
| POST | `/auth/verify-email` | Verifikasi email |
| GET | `/auth/me` | Ambil profil session aktif |

## 9.3 Catalog API

| Method | Endpoint | Deskripsi |
|---|---|---|
| GET | `/branches` | List cabang |
| GET | `/services` | List layanan dengan filter branch/category/lang |
| GET | `/services/:slug` | Detail layanan |
| GET | `/categories` | List kategori |
| GET | `/therapists` | List terapis |
| GET | `/therapists/:id` | Detail terapis |

## 9.4 Booking API

| Method | Endpoint | Deskripsi |
|---|---|---|
| GET | `/booking/availability` | Cek slot tersedia |
| POST | `/booking/hold` | Hold slot sementara |
| POST | `/booking` | Buat booking pending payment |
| GET | `/booking/:id` | Detail booking |
| POST | `/booking/:id/cancel` | Cancel booking |
| POST | `/booking/:id/reschedule` | Reschedule booking |
| POST | `/booking/:id/complete` | Tandai completed oleh admin |
| POST | `/booking/:id/no-show` | Tandai no-show oleh admin |

## 9.5 Payment API

| Method | Endpoint | Deskripsi |
|---|---|---|
| POST | `/payments/booking/:bookingId/charge` | Membuat pembayaran booking |
| POST | `/payments/wallet/topup` | Top-up wallet |
| GET | `/payments/:id` | Detail payment |
| POST | `/payments/webhook/:gateway` | Webhook payment gateway |

## 9.6 Wallet API

| Method | Endpoint | Deskripsi |
|---|---|---|
| GET | `/wallet` | Saldo wallet customer |
| GET | `/wallet/ledger` | Riwayat ledger |
| POST | `/wallet/pay-booking` | Bayar booking dengan wallet |
| POST | `/wallet/gift-card/send` | Kirim gift card |
| POST | `/wallet/gift-card/redeem` | Redeem gift card |

## 9.7 Review API

| Method | Endpoint | Deskripsi |
|---|---|---|
| POST | `/reviews` | Submit review setelah booking selesai |
| GET | `/reviews/public` | Review approved untuk publik |
| GET | `/reviews/my` | Review milik customer |

## 9.8 CMS API

| Method | Endpoint | Deskripsi |
|---|---|---|
| GET | `/blog` | List artikel |
| GET | `/blog/:slug` | Detail artikel |
| GET | `/awards` | List awards |
| GET | `/pages/:slug` | Halaman statis |

## 9.9 Contact API

| Method | Endpoint | Deskripsi |
|---|---|---|
| POST | `/contact` | Submit pesan kontak |
| GET | `/admin/contact-messages` | Admin lihat inbox |
| PATCH | `/admin/contact-messages/:id` | Update status pesan |

## 9.10 WhatsApp API

| Method | Endpoint | Deskripsi |
|---|---|---|
| GET | `/wa/webhook` | Verifikasi webhook Meta |
| POST | `/wa/webhook` | Terima inbound message |
| POST | `/wa/deep-link-click` | Tracking klik deep link |
| GET | `/admin/wa/rules` | List rules |
| POST | `/admin/wa/rules` | Tambah rule |
| PATCH | `/admin/wa/rules/:id` | Update rule |
| DELETE | `/admin/wa/rules/:id` | Hapus rule |

## 9.11 Admin API

| Method | Endpoint | Deskripsi |
|---|---|---|
| GET | `/admin/dashboard` | Summary dashboard |
| CRUD | `/admin/services` | Manajemen layanan |
| CRUD | `/admin/therapists` | Manajemen terapis |
| CRUD | `/admin/branches` | Manajemen cabang |
| GET | `/admin/bookings` | List booking |
| GET | `/admin/customers` | CRM customer |
| GET | `/admin/reports/revenue` | Laporan revenue |
| GET | `/admin/reports/occupancy` | Laporan occupancy |
| GET | `/admin/reports/no-show` | Laporan no-show |
| GET | `/admin/reports/wa-funnel` | Laporan funnel WA |
| GET | `/admin/audit-logs` | Audit log |

---

# 10. Desain Alur Booking

## 10.1 Booking Wizard

Alur booking terdiri dari 5 langkah:

```text
Step 1: Pilih Layanan
Step 2: Pilih Terapis
Step 3: Pilih Tanggal & Slot
Step 4: Checkout & Ringkasan
Step 5: Konfirmasi / Pembayaran
```

## 10.2 Deep Link Booking

Deep link dari WhatsApp atau halaman layanan:

```text
/booking?service=sleep-massage&branch=central&utm_source=wa_bot
```

Perilaku sistem:

1. Sistem membaca query parameter.
2. Sistem validasi service slug dan branch slug.
3. Jika valid, booking wizard langsung mengisi:
   - layanan
   - cabang
   - sumber traffic
4. User langsung diarahkan ke Step 3 jika:
   - service tersedia
   - branch valid
   - tidak perlu memilih terapis dulu atau default `Any Available Therapist`
5. Jika service tidak valid, user diarahkan ke Step 1 dengan pesan error ringan.

## 10.3 Slot Availability

Input:

```json
{
  "branchId": "uuid",
  "serviceId": "uuid",
  "therapistId": "uuid-or-null",
  "date": "2026-08-12"
}
```

Output:

```json
{
  "date": "2026-08-12",
  "slots": [
    {
      "startAt": "2026-08-12T10:00:00+07:00",
      "endAt": "2026-08-12T11:30:00+07:00",
      "available": true,
      "therapistId": "uuid",
      "roomId": "uuid"
    }
  ]
}
```

## 10.4 Algoritma Availability

```text
1. Ambil durasi service.
2. Ambil jam operasional cabang.
3. Ambil jadwal kerja terapis.
4. Exclude blocked dates.
5. Generate kandidat slot berdasarkan interval.
6. Exclude slot yang sudah confirmed/rescheduled aktif.
7. Exclude slot yang sedang held dan belum expired.
8. Exclude room yang tidak tersedia.
9. Return available slot.
```

## 10.5 Slot Hold

Saat user memilih slot dan lanjut checkout:

```text
1. Frontend memanggil POST /booking/hold.
2. Backend membuka transaksi.
3. Backend cek konflik booking confirmed.
4. Backend cek konflik hold aktif.
5. Backend membuat slot_holds dengan expires_at = now + 10 menit.
6. Backend menyimpan holdId.
7. Frontend menampilkan countdown.
```

## 10.6 Double Booking Prevention

Double booking dicegah di 3 lapisan:

1. **Application validation**
   - Cek availability sebelum hold.

2. **Database transaction**
   - Gunakan transaksi serializable atau row-level lock.

3. **Unique constraint / exclusion constraint**
   - Mencegah overlap waktu untuk terapis/room.

Rekomendasi PostgreSQL exclusion constraint:

```sql
CREATE EXTENSION IF NOT EXISTS btree_gist;

ALTER TABLE bookings
ADD CONSTRAINT no_overlap_therapist_booking
EXCLUDE USING gist (
  therapist_id WITH =,
  tstzrange(start_at, end_at) WITH &&
)
WHERE (status IN ('confirmed', 'pending_payment'));
```

## 10.7 Booking Status Transition

```text
pending_payment
  ├── confirmed
  ├── expired
  └── cancelled

confirmed
  ├── rescheduled
  ├── completed
  ├── no_show
  └── cancelled

rescheduled
  ├── completed
  ├── no_show
  └── cancelled
```

---

# 11. Desain Wallet, Deposit & Ledger

## 11.1 Prinsip Wallet

Wallet menggunakan model **ledger append-only**.

Artinya:

- Saldo tidak boleh diubah langsung tanpa ledger.
- Setiap mutasi saldo harus punya catatan.
- Ledger menjadi sumber kebenaran.
- Update wallet dan insert ledger harus berada dalam transaksi database yang sama.

## 11.2 Deposit Booking

Default deposit:

```text
50% dari total harga layanan
```

Namun nilai ini harus configurable oleh admin:

```text
- fixed amount
- percentage
- no deposit
- full payment
```

## 11.3 Alur Pembayaran Deposit dengan Wallet

```text
1. Customer memilih slot.
2. Sistem menghitung total dan deposit.
3. Customer memilih bayar dengan wallet.
4. WalletService membuka transaksi.
5. Sistem lock row wallet.
6. Sistem validasi saldo cukup.
7. Sistem insert ledger booking_payment.
8. Sistem update wallet.balance.
9. Sistem update booking payment_status.
10. Jika deposit terpenuhi, booking menjadi confirmed.
```

## 11.4 Pseudocode Wallet Transaction

```ts
async function debitWalletForBooking(customerId, bookingId, amount, idempotencyKey) {
  return db.transaction(async (tx) => {
    const wallet = await tx.wallet.findUnique({
      where: { customerId },
      lock: true
    });

    if (!wallet) throw new Error("WALLET_NOT_FOUND");
    if (wallet.balance < amount) throw new Error("INSUFFICIENT_BALANCE");

    const existing = await tx.walletLedger.findUnique({
      where: { idempotencyKey }
    });

    if (existing) return existing;

    const balanceBefore = wallet.balance;
    const balanceAfter = balanceBefore - amount;

    await tx.wallet.update({
      where: { id: wallet.id },
      data: { balance: balanceAfter }
    });

    return tx.walletLedger.create({
      data: {
        walletId: wallet.id,
        type: "booking_payment",
        direction: "debit",
        amount,
        balanceBefore,
        balanceAfter,
        referenceType: "booking",
        referenceId: bookingId,
        idempotencyKey
      }
    });
  });
}
```

## 11.5 No-Show Deduction

Saat admin menandai booking sebagai no-show:

```text
1. Admin klik "Mark as No-Show".
2. Sistem validasi booking status confirmed.
3. Sistem menghitung penalty sesuai policy.
4. WalletService mencatat no_show_deduction.
5. Booking status menjadi no_show.
6. Customer menerima notifikasi.
7. Audit log tercatat.
```

## 11.6 Rekonsiliasi Ledger

Job harian:

```text
1. Ambil semua wallet.
2. Hitung total ledger per wallet.
3. Bandingkan dengan wallet.balance.
4. Jika mismatch, buat alert.
5. Tidak melakukan auto-fix tanpa approval admin.
```

---

# 12. Desain Payment Gateway

## 12.1 Payment Provider

Provider utama yang direkomendasikan:

```text
Midtrans atau Xendit
```

Karena mendukung:

- QRIS
- Virtual Account
- E-wallet lokal
- Kartu
- Webhook
- Refund

## 12.2 Payment Flow Booking

```text
1. User checkout booking.
2. Sistem membuat booking pending_payment.
3. Sistem request charge ke gateway.
4. Gateway mengembalikan payment URL / token.
5. User menyelesaikan pembayaran.
6. Gateway mengirim webhook.
7. Backend validasi signature.
8. Backend cek idempotency.
9. Payment status menjadi paid.
10. Booking status menjadi confirmed.
11. Notification dikirim.
```

## 12.3 Webhook Idempotency

Webhook harus aman jika dikirim berkali-kali.

Strategi:

```text
- Simpan gateway_ref.
- Simpan event_id jika tersedia.
- Gunakan idempotency key.
- Jika event sudah diproses, return 200 tanpa proses ulang.
```

## 12.4 Payment Status Mapping

| Gateway Status | Internal Status |
|---|---|
| settlement / capture | paid |
| pending | pending |
| deny / cancel | failed |
| expire | expired |
| refund | refunded |

## 12.5 Keamanan Payment

- Validasi signature webhook.
- Jangan menyimpan data kartu.
- Gunakan token dari gateway.
- Semua payment endpoint wajib HTTPS.
- Log payload mentah dalam bentuk aman.
- Masking data sensitif.

---

# 13. Desain WhatsApp Expert System

## 13.1 Tujuan Modul

WhatsApp Expert System mengubah floating WA dari chat manual menjadi:

```text
consultation → recommendation → deep link → booking conversion
```

## 13.2 Komponen WA Expert System

```text
WAExpertService
├── WhatsAppWebhookController
├── ConversationStateManager
├── RuleEngine
├── DeepLinkGenerator
├── HumanHandoffService
├── WAAnalyticsTracker
└── WhatsAppAdapter
```

## 13.3 State Machine Percakapan

```text
START
  ↓
GREETING_SENT
  ↓
WAITING_COMPLAINT_SELECTION
  ↓
RECOMMENDATION_SENT
  ↓
DEEP_LINK_SENT
  ↓
BOOKING_CLICKED
  ↓
BOOKING_COMPLETED
```

Fallback state:

```text
HUMAN_HANDOFF
UNKNOWN_INPUT
SESSION_EXPIRED
```

## 13.4 Menu Keluhan Default

```text
1. Pegal & Nyeri Otot
2. Sulit Tidur / Insomnia
3. Relaksasi Total
4. Perawatan Kulit / Facial
5. Bicara dengan Admin
```

## 13.5 Rule Engine

Input:

```json
{
  "phone": "6281234567890",
  "message": "2",
  "language": "id"
}
```

Rule lookup:

```text
complaint_code = "2"
recommended_service = Aromatherapy Sleep Massage 90 Menit
```

Output message:

```text
Untuk membantu tidur lebih nyenyak, kami merekomendasikan Aromatherapy Sleep Massage 90 Menit. 
Klik link berikut untuk memilih jadwal:
https://domain.com/booking?service=sleep-massage&utm_source=wa_bot
```

## 13.6 Deep Link Generator

Format:

```text
https://domain.com/booking?service={serviceSlug}&branch={branchSlug}&utm_source=wa_bot&wa_conv={conversationId}
```

Catatan keamanan:

- Tidak boleh memuat nama user.
- Tidak boleh memuat nomor WA.
- Tidak boleh memuat data personal.
- `wa_conv` boleh berupa UUID random yang tidak mudah ditebak.

## 13.7 Tracking Funnel WA

Event yang dicatat:

| Event | Deskripsi |
|---|---|
| `chat_started` | User mulai chat |
| `menu_sent` | Bot mengirim menu keluhan |
| `complaint_selected` | User memilih keluhan |
| `recommendation_sent` | Bot mengirim rekomendasi |
| `deep_link_clicked` | User klik link |
| `booking_started` | User masuk alur booking |
| `booking_completed` | Booking selesai |
| `human_handoff` | User dialihkan ke admin |

## 13.8 Human Handoff

Trigger handoff:

```text
- User mengetik "admin"
- User memilih opsi 5
- User mengirim input tidak dikenal 3 kali
- Bot mendeteksi topik di luar layanan spa
```

Saat handoff:

```text
1. Conversation state menjadi HUMAN_HANDOFF.
2. Admin menerima notifikasi.
3. Riwayat percakapan ditampilkan di admin inbox.
4. Bot berhenti menjawab otomatis sementara.
```

## 13.9 Multi-bahasa WA Bot

Deteksi bahasa:

```text
- Berdasarkan pesan pertama.
- Jika mengandung "hi", "hello", gunakan EN.
- Jika mengandung "halo", "kak", gunakan ID.
- Jika tidak yakin, default ID.
```

---

# 14. Desain Admin Portal & CRM

## 14.1 Prinsip Admin Portal

Admin portal harus:

- Diproteksi RBAC.
- Tidak dapat diakses anonymous user.
- Memiliki audit log untuk aksi sensitif.
- Memisahkan data berdasarkan cabang untuk Branch Admin.
- Memberikan akses penuh untuk Super Admin.

## 14.2 Hak Akses Role

| Fitur | Branch Admin | Super Admin | Therapist |
|---|---|---|---|
| Lihat dashboard cabang | Ya | Ya | Tidak |
| Kelola layanan cabang | Ya | Ya | Tidak |
| Kelola semua cabang | Tidak | Ya | Tidak |
| Kelola booking | Ya, cabangnya | Ya, semua | Lihat jadwal sendiri |
| Kelola wallet | Terbatas | Ya | Tidak |
| Kelola role user | Tidak | Ya | Tidak |
| Lihat audit log | Terbatas | Ya | Tidak |
| CRM customer | Ya, cabangnya | Ya | Tidak |
| WA rules | Ya/Terbatas | Ya | Tidak |
| Reports | Ya, cabangnya | Ya, semua | Tidak |

## 14.3 CRM Customer

CRM menampilkan:

- Profil customer.
- Riwayat treatment.
- Total transaksi.
- Preferred therapist.
- Preferred service.
- Catatan alergi.
- Preferensi tekanan pijat.
- Preferensi aroma.
- No-show history.
- Loyalty tier.
- Wallet balance.
- Gift card history.
- Review history.

## 14.4 Dashboard Admin

Dashboard menampilkan:

```text
- Revenue today / month
- Booking today
- Upcoming booking
- Occupancy rate
- Top services
- Top therapists
- No-show rate
- Wallet top-up total
- WA funnel conversion
- Recent contact messages
```

## 14.5 Export Report

Format export:

```text
- CSV
- PDF
```

Report yang wajib:

```text
- Revenue per branch
- Revenue per service
- Revenue per therapist
- Occupancy rate
- No-show rate
- WA conversion funnel
- Customer retention
- Wallet transactions
```

---

# 15. Desain Loyalty, Review & Gift Card

## 15.1 Loyalty Program

Nama program:

```text
Serenity Rewards
```

## 15.2 Perhitungan Poin

Contoh aturan:

```text
Setiap Rp10.000 transaksi paid = 1 point
```

Poin diberikan saat:

```text
booking.status = completed
payment.status = paid
```

## 15.3 Tier Membership

| Tier | Syarat | Benefit |
|---|---|---|
| Silver | Default | Poin dasar |
| Gold | Lifetime spend tertentu | Bonus poin |
| Platinum | Lifetime spend tinggi | Prioritas booking / promo khusus |

## 15.4 Review

Review hanya dapat dibuat jika:

```text
booking.status = completed
customer_id = booking.customer_id
belum ada review untuk booking tersebut
```

Review harus dimoderasi sebelum tampil publik.

## 15.5 Gift Card

Alur kirim gift card:

```text
1. Customer membuka wallet.
2. Pilih Send Gift Card.
3. Input penerima, nominal, pesan.
4. Sistem validasi saldo.
5. Wallet sender didebit.
6. Gift card dibuat.
7. Penerima mendapat email/link kode.
8. Penerima redeem ke wallet.
```

Status gift card:

```text
active → redeemed
active → expired
active → cancelled
```

---

# 16. Desain Notifikasi

## 16.1 Kanal Notifikasi

| Kanal | Kegunaan |
|---|---|
| Email | Verifikasi, reset password, receipt, booking |
| Web Push | Reminder, promo, wallet update |
| WhatsApp Template | Reminder, konfirmasi, follow-up |
| In-app Notification | Dashboard customer/admin |

## 16.2 Notification Event

| Event | Email | Push | WA |
|---|---|---|---|
| Register | Ya | Tidak | Opsional |
| Booking created | Ya | Ya | Ya |
| Payment paid | Ya | Ya | Opsional |
| Booking reminder H-1 | Ya | Ya | Ya |
| Booking reminder H-3 jam | Opsional | Ya | Ya |
| Booking cancelled | Ya | Ya | Ya |
| No-show penalty | Ya | Ya | Opsional |
| Wallet changed | Opsional | Ya | Tidak |
| Gift card received | Ya | Ya | Opsional |

## 16.3 Reminder Job

Scheduler berjalan setiap 5 menit:

```text
1. Cari booking confirmed.
2. Cari booking yang start_at mendekati H-1 atau H-3 jam.
3. Cek apakah reminder sudah pernah dikirim.
4. Kirim notifikasi sesuai preferensi user.
5. Simpan notification_logs.
```

---

# 17. Desain Keamanan

## 17.1 Authentication

Customer dan admin menggunakan:

```text
- Email + password
- Password hash argon2 atau bcrypt
- HttpOnly secure cookie
- Refresh token rotation
```

## 17.2 Authorization

Setiap endpoint admin harus melalui:

```text
authenticate()
authorize(requiredRole)
scopeByBranch()
```

## 17.3 RBAC Middleware

Pseudocode:

```ts
function requireRole(roles: Role[]) {
  return async (req, res, next) => {
    const user = await getCurrentUser(req);

    if (!user) throw new UnauthorizedError();

    if (!roles.includes(user.role)) {
      throw new ForbiddenError();
    }

    req.user = user;
    next();
  };
}
```

## 17.4 Branch Scope

Branch Admin hanya boleh mengakses data cabangnya.

```text
WHERE branch_id = current_user.branch_id
```

Super Admin boleh mengakses semua cabang.

## 17.5 Proteksi IDOR

Semua query customer harus memvalidasi kepemilikan:

```text
booking.customer_id = current_user.id
wallet.customer_id = current_user.id
review.customer_id = current_user.id
```

## 17.6 Security Headers

Header yang wajib:

```http
Strict-Transport-Security: max-age=31536000; includeSubDomains
Content-Security-Policy: default-src 'self'
X-Frame-Options: DENY
X-Content-Type-Options: nosniff
Referrer-Policy: strict-origin-when-cross-origin
Permissions-Policy: geolocation=(), camera=(), microphone=()
```

## 17.7 Rate Limiting

Rate limit diterapkan pada:

| Endpoint | Limit |
|---|---|
| Login | 5 request / menit / IP |
| Forgot password | 3 request / jam |
| Booking hold | 20 request / 10 menit |
| Contact form | 5 request / 10 menit |
| WA webhook | Berdasarkan signature dan IP allowlist bila memungkinkan |

## 17.8 Audit Log

Aksi yang wajib diaudit:

```text
- Admin login
- Perubahan harga
- Perubahan role
- Pembatalan booking oleh admin
- Mark no-show
- Refund wallet
- Manual wallet adjustment
- Perubahan WA rule
- Perubahan deposit policy
```

---

# 18. Desain PWA, Offline & Caching

## 18.1 Web App Manifest

```json
{
  "name": "SerenitySpa",
  "short_name": "Serenity",
  "start_url": "/",
  "display": "standalone",
  "theme_color": "#8B6F47",
  "background_color": "#FFFFFF",
  "icons": [
    {
      "src": "/icons/icon-192.png",
      "sizes": "192x192",
      "type": "image/png"
    },
    {
      "src": "/icons/icon-512.png",
      "sizes": "512x512",
      "type": "image/png"
    }
  ],
  "shortcuts": [
    {
      "name": "Book Now",
      "url": "/booking"
    },
    {
      "name": "My Bookings",
      "url": "/account/bookings"
    }
  ]
}
```

## 18.2 Service Worker Strategy

| Resource | Strategy |
|---|---|
| App shell | Cache-first |
| Static assets | Cache-first |
| Service catalog | Stale-while-revalidate |
| Blog pages | Stale-while-revalidate |
| Awards page | Stale-while-revalidate |
| Slot availability | Network-only |
| Wallet | Network-only |
| Payment | Network-only |
| Admin API | Network-only |
| Auth session | Network-only |

## 18.3 Offline Support

Saat offline, user dapat mengakses:

```text
- Landing page terakhir
- Katalog layanan terakhir
- Blog/artikel yang sudah pernah dibuka
- Detail booking confirmed yang sudah tersimpan lokal secara aman
- Halaman offline fallback
```

Tidak boleh offline cache:

```text
- Saldo wallet
- Slot availability
- Payment status
- Admin data
- Data personal sensitif
```

## 18.4 Update Strategy

Saat service worker baru tersedia:

```text
1. Tampilkan banner "Update tersedia".
2. Jangan paksa refresh saat user sedang booking.
3. Setelah booking selesai atau user setuju, reload aplikasi.
```

---

# 19. Desain Observability & Logging

## 19.1 Logging

Gunakan structured logging:

```json
{
  "level": "info",
  "requestId": "uuid",
  "userId": "uuid",
  "module": "booking",
  "action": "hold_slot",
  "status": "success",
  "timestamp": "2026-08-12T06:50:00Z"
}
```

## 19.2 Error Tracking

Gunakan Sentry atau alternatif untuk:

```text
- Frontend runtime error
- API error
- Payment webhook failure
- WA webhook failure
- Background job failure
```

## 19.3 Metrics

Metric yang dipantau:

```text
- API latency p95
- Slot check latency
- Booking success rate
- Payment success rate
- Payment webhook error
- WA bot response time
- WA conversion rate
- No-show rate
- Wallet reconciliation mismatch
```

## 19.4 Alert

Alert wajib:

```text
- Payment webhook gagal
- Redis down
- DB connection error
- Wallet ledger mismatch
- Booking double conflict attempt
- WA webhook error rate tinggi
```

---

# 20. Desain Deployment

## 20.1 Environment

```text
development
staging
production
```

## 20.2 Environment Variable

```env
DATABASE_URL=
REDIS_URL=
JWT_SECRET=
JWT_REFRESH_SECRET=
PAYMENT_GATEWAY_SERVER_KEY=
PAYMENT_GATEWAY_CLIENT_KEY=
WA_VERIFY_TOKEN=
WA_ACCESS_TOKEN=
WA_PHONE_NUMBER_ID=
EMAIL_API_KEY=
VAPID_PUBLIC_KEY=
VAPID_PRIVATE_KEY=
OBJECT_STORAGE_ACCESS_KEY=
OBJECT_STORAGE_SECRET_KEY=
SENTRY_DSN=
APP_URL=
```

## 20.3 CI/CD Pipeline

```text
1. Install dependencies
2. Lint
3. Type check
4. Unit test
5. Integration test
6. Build
7. Migration check
8. Deploy staging
9. Smoke test
10. Manual approval
11. Deploy production
```

## 20.4 Database Migration

Aturan migration:

```text
- Migration harus versioned.
- Tidak boleh edit migration lama.
- Backup sebelum migration production.
- Migration destructive harus manual approval.
```

---

# 21. Strategi Testing

## 21.1 Unit Test

Prioritas unit test:

```text
- Booking slot availability
- Slot hold TTL
- Double booking prevention
- Wallet debit/credit
- Ledger balance calculation
- Payment webhook idempotency
- WA rule engine
- Cancellation policy
- Loyalty point calculation
```

## 21.2 Integration Test

Cakupan:

```text
- Booking + payment
- Booking + wallet
- Payment webhook
- WA bot + deep link
- Admin RBAC
- Review after completed booking
- Gift card send/redeem
```

## 21.3 E2E Test

Skenario utama:

```text
1. User melihat katalog.
2. User memilih layanan.
3. User memilih terapis.
4. User memilih slot.
5. User checkout.
6. User membayar deposit.
7. Booking confirmed.
8. Reminder terkirim.
9. Booking completed.
10. User memberikan review.
```

## 21.4 Load Test

Skenario load test:

```text
- 100 request bersamaan cek slot.
- 50 request bersamaan booking slot yang sama.
- 1.000 request/min katalog layanan.
- Payment webhook duplicate 10 kali.
```

Acceptance:

```text
- Hanya 1 booking berhasil untuk slot yang sama.
- Tidak ada wallet balance mismatch.
- API slot check tetap < 300 ms p95.
```

---

# 22. Skenario Kritis Sistem

## 22.1 Dua User Booking Slot Sama

```text
1. User A dan User B memilih slot 10:00.
2. Keduanya klik checkout hampir bersamaan.
3. Backend memproses hold dengan transaction lock.
4. Salah satu user berhasil hold.
5. User lain mendapat error SLOT_ALREADY_HELD.
6. Slot tidak double-booked.
```

## 22.2 User Meninggalkan Checkout

```text
1. User hold slot.
2. User tidak menyelesaikan pembayaran.
3. Setelah 10 menit, hold expired.
4. Background job menandai hold expired.
5. Slot muncul kembali.
```

## 22.3 Payment Webhook Terkirim Dua Kali

```text
1. Gateway mengirim webhook paid.
2. Sistem proses payment dan confirm booking.
3. Gateway mengirim webhook yang sama lagi.
4. Sistem mendeteksi idempotency key sudah diproses.
5. Sistem return 200 tanpa efek ganda.
```

## 22.4 No-Show

```text
1. Booking confirmed.
2. Customer tidak hadir.
3. Admin klik Mark No-Show.
4. Sistem potong deposit sesuai policy.
5. Wallet ledger tercatat.
6. Customer menerima notifikasi.
7. Audit log tersimpan.
```

## 22.5 WA Expert Conversion

```text
1. User klik floating WA.
2. Bot mengirim menu keluhan.
3. User membalas "2".
4. Rule engine memilih Sleep Massage.
5. Bot mengirim rekomendasi dan deep link.
6. User klik link.
7. Booking wizard terbuka di Step 3.
8. User menyelesaikan booking.
9. Funnel WA tercatat sebagai converted.
```

## 22.6 Customer Cancel Booking Setelah Cut-off

```text
1. Customer membuka booking detail.
2. Customer klik cancel.
3. Sistem mengecek cut-off H-24.
4. Jika melewati cut-off, sistem tampilkan penalty.
5. Customer konfirmasi.
6. Sistem potong deposit.
7. Booking status cancelled.
8. Ledger dan audit log tersimpan.
```

## 22.7 Admin Branch Mengakses Data Cabang Lain

```text
1. Branch Admin A request booking milik Branch B.
2. Middleware memeriksa branch scope.
3. Sistem menolak dengan 403 Forbidden.
4. Security log tersimpan.
```

---

# 23. Risiko Teknis & Mitigasi

| Risiko | Dampak | Mitigasi |
|---|---|---|
| Double booking | Sangat tinggi | DB transaction, row lock, exclusion constraint |
| Wallet mismatch | Sangat tinggi | Append-only ledger, reconciliation job |
| Webhook payment duplikat | Tinggi | Idempotency key |
| WA API approval lambat | Sedang | Fallback floating WA manual |
| Push notification iOS terbatas | Sedang | Email dan WA reminder tetap disediakan |
| Cache menampilkan data slot basi | Tinggi | Slot API network-only |
| Admin salah ubah saldo | Tinggi | RBAC, audit log, approval untuk adjustment |
| Data personal bocor | Sangat tinggi | no-store, encryption, access control |
| Bot salah rekomendasi | Sedang | Rule configurable, fallback admin |
| Lighthouse rendah | Sedang | SSR/SSG, image optimization, lazy loading |

---

# 24. Lampiran

## 24.1 Status Booking

```text
pending_payment
confirmed
rescheduled
cancelled
completed
no_show
expired
```

## 24.2 Status Payment

```text
pending
paid
failed
expired
refunded
```

## 24.3 Status Wallet Ledger Direction

```text
credit
debit
```

## 24.4 Status Review

```text
pending
approved
rejected
featured
```

## 24.5 Status Contact Message

```text
new
in_progress
replied
closed
```

## 24.6 Role User

```text
guest
customer
therapist
branch_admin
super_admin
```

## 24.7 Event WA Funnel

```text
chat_started
menu_sent
complaint_selected
recommendation_sent
deep_link_clicked
booking_started
booking_completed
human_handoff
```

## 24.8 Modul yang Harus Menjadi Prioritas Implementasi

### Fase 1 — Core MVP

```text
- Auth
- Catalog
- Therapist
- Booking
- Payment
- Wallet
- Contact
- Admin basic
- PWA basic
```

### Fase 2 — Trust & Automation

```text
- WA Expert System
- Review
- Awards
- Blog CMS
- Reminder
- Reports
- CRM
```

### Fase 3 — Growth

```text
- Loyalty
- Gift Card
- Newsletter
- Group booking
- Advanced analytics
```

### Fase 4 — Advanced Differentiation

```text
- AI conversational assistant
- Personalized recommendation
- Subscription package
```

---

# Penutup

Dokumen SDD ini menjadi panduan teknis utama untuk mengembangkan SerenitySpa / Serenity & Soul PWA. Fokus desain diarahkan pada konsistensi booking real-time, keamanan wallet, integrasi payment yang idempotent, PWA yang aman, serta WhatsApp Expert System sebagai fitur diferensiasi utama.

Dokumen ini harus diperbarui setiap kali terdapat perubahan signifikan pada arsitektur, model data, API, atau flow bisnis kritis.
```

---