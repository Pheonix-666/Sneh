# SNEH ENTERPRISES — Atelier of Sacred & Anime Woodcraft

> **Bespoke Handcrafted Wooden Gifts · 3D Layered Manga Dioramas · Sacred Temple Altars · Executive Desk Valets**

A production-ready Next.js 16 ecommerce application engineered with the robust architecture and system of **SOHARTH** (`D:\collegefp\SOHARTH`) and the ultra-premium Dark Brown, Warm Wood, Cream & Royal Gold aesthetic of **Minal Industries Catalog** (`E:\cat`).

---

## ✦ Key Architectural Features

- **Next.js 16 App Router & React 19:** Hybrid SSG and SSR with dynamic route handlers and metadata generation for optimal SEO.
- **Luxury Theme & Styling:**
  - **Color Palette:** Deep Obsidian & Espresso (`#140B07`, `#24130D`, `#381F14`), Warm Caramel & Teak (`#542F1D`, `#78462B`), Antique Gold (`#C9A84C`, `#E4C885`, `rgba(201,168,76,0.35)`), and Natural Parchment (`#FCF8F2`, `#F6EFE5`).
  - **Typography:** Cormorant Garamond (Classical Display Serif) + Inter (Clean Modern Sans-Serif).
  - **Craft Ornaments:** Gold geometric corner brackets, diamond divider rules, ambient wood radial glows, and subtle filigree borders.
- **Anime & Sacred Deities Catalog (24+ Curated Products):**
  - **Anime Woodcraft:** 7-layer 3D Roronoa Zoro Asura manga diorama, Demon Slayer Nichirin katana desk cradle, Gojo Satoru ambient acrylic/wood lamp, Attack on Titan Wings of Freedom walnut relief, Thousand Sunny helm keepsake.
  - **Sacred Deities:** Ayodhya Ram Mandir 9-tier architectural sanctum altar with indirect LED glow, Lord Shiva Nataraja cosmic dance frame with pure brass halo, Vighnaharta Ganesha minimalist geometric relief, Sri Yantra 12-layer sacred geometry mandala.
  - **Executive Desk Accessories:** Valet docking station with MagSafe routing, perpetual date slider calendar, multi-tier tablet butler (using original photography from `E:\cat`).
  - **Trophies & Awards:** Five-Star Royal Shield, Geometric Diamond Plaque, Star Performer Excellence Trophy.
- **Interactive Engraving Studio:**
  - Real-time wood simulator where patrons type their custom inscription (Sanskrit mantra, anime motto, name) and choose wood species (Dark Walnut, Burma Teak, Baltic Birch) and typography style with a live laser-burn preview!
- **Quote Shortlist Drawer:**
  - Allows customers to bookmark favorite artifacts and generate an instant pre-formatted WhatsApp message for bulk corporate pricing or bespoke consultation.
- **Global Search Modal (Cmd+K / Ctrl+K / /):**
  - Instant live keyword filtering across anime names, deity titles, wood species, and categories.
- **Bag & Checkout Engine:**
  - Multi-item management with live quantity updates, wood finish selection, complimentary engraving notes, and solid pine keepsake box upgrades.
  - Integrated shipping calculation (free over ₹1,500), GST calculation, and multi-gateway checkout (Instant UPI QR, Cash on Delivery, WhatsApp Direct).
- **Workshop Admin Console (`/admin`):**
  - Authenticated management dashboard (Default password: `snehadmin2026`).
  - Real-time order pipeline tracking (Confirmed → In Production → Dispatched → Delivered).
  - Catalog manager to add, edit, and retire creations.
  - Wood species consumption analytics and anime vs. deity demand metrics.
- **Database & Offline Resilience:**
  - Out-of-the-box local data fallback (`src/lib/data.ts`) with optional Supabase PostgreSQL sync when environment credentials are supplied.

---

## ✦ Directory Structure

```
SnehEnterprizes/
├── public/
│   └── catalog/                 # 29 high-res woodcraft photos (from E:\cat)
├── src/
│   ├── app/
│   │   ├── about/               # Atelier story & heritage
│   │   ├── admin/               # Administrative command console
│   │   ├── api/
│   │   │   ├── admin-login/     # Secure session authentication
│   │   │   ├── categories/      # Category taxonomy
│   │   │   ├── orders/          # Order pipeline CRUD
│   │   │   ├── products/        # Product catalog API
│   │   │   └── reviews/         # Verified collector reviews
│   │   ├── cart/                # Bag & checkout with UPI/COD
│   │   ├── contact/             # Concierge & custom commissions
│   │   ├── privacy-policy/      # Privacy policy
│   │   ├── products/            # Catalog with live filters
│   │   │   └── [id]/            # Product detail with live laser preview
│   │   ├── returns-exchange/    # Transit replacement warranty
│   │   ├── shipping-policy/     # Crated delivery policy
│   │   ├── terms/               # Terms of service
│   │   ├── globals.css          # Theme tokens & luxury styling
│   │   ├── layout.tsx           # Root layout with font imports & providers
│   │   ├── page.tsx             # Signature homepage
│   │   ├── robots.ts            # SEO robots
│   │   └── sitemap.ts           # Dynamic sitemap
│   ├── components/
│   │   ├── EngravingStudio.tsx  # Interactive live wood burning lab
│   │   ├── Footer.tsx           # Trust badges & luxury footer
│   │   ├── Navbar.tsx           # Sticky nav, search shortcut & badges
│   │   ├── ProductCard.tsx      # Card with zoom, badges & pricing
│   │   ├── QuickViewModal.tsx   # Instant modal view
│   │   ├── SearchModal.tsx      # Cmd+K live search
│   │   ├── ShortlistDrawer.tsx  # Quote shortlist with WhatsApp export
│   │   └── Toast.tsx            # Floating feedback notifications
│   ├── context/
│   │   ├── CartContext.tsx      # Cart & shortlist state with localStorage
│   │   └── ToastContext.tsx     # Toast notification manager
│   └── lib/
│       ├── auth.ts              # Deterministic SHA-256 session token
│       ├── data.ts              # 24+ curated wooden artifact catalog
│       ├── pricing.ts           # Rupee formatting & discount calculator
│       ├── supabase.ts          # Supabase client initialization
│       └── supabase-server.ts   # Service role database client
├── .env.example                 # Config template
├── .env.local                   # Active local environment
├── package.json
├── tailwind.config.ts           # Espresso, Teak, and Gold design tokens
└── tsconfig.json
```

---

## ✦ Getting Started

### 1. Run Development Server
```bash
npm run dev
```
Open [http://localhost:3000](http://localhost:3000) in your browser.

### 2. Build for Production
```bash
npm run build
npm run start
```

### 3. Workshop Admin Portal
Visit `/admin` and enter the administrative password: `snehadmin2026`.

