# 🛒 ELURC Market

<div align="center">

![ELURC Market Banner](https://img.shields.io/badge/ELURC-Market-blue?style=for-the-badge)
[![License](https://img.shields.io/badge/license-MIT-green?style=for-the-badge)](LICENSE)
[![PRD Complete](https://img.shields.io/badge/PRD-Complete-success?style=for-the-badge)](/_bmad-output/planning-artifacts/prd.md)
[![Status](https://img.shields.io/badge/Status-Deployed_on_Render-success?style=for-the-badge)](#roadmap)

**Territorial Currency E-Commerce for Bretaigne's Economic Sovereignty**

*The first organic grocery marketplace exclusively powered by ELURC cryptocurrency*

🚀 **[Live Demo on Render.com](https://elurc-shopping.onrender.com)** 🚀

[Features](#-features) • [Tech Stack](#-tech-stack) • [Roadmap](#-roadmap) • [Getting Started](#-getting-started)

</div>

---

## 🌟 Overview

ELURC Market is a groundbreaking e-commerce platform that proves cryptocurrency can power everyday commerce. Built for Bretaigne's ELURC community, this platform enables users to purchase organic groceries using only ELURC—no euros, no banks, no permission.

### 🎯 Vision

Building economic infrastructure for territorial sovereignty. ELURC Market demonstrates that local currencies can facilitate real commerce for essential goods, creating a closed-loop economy that keeps wealth within the community.

### ✨ Innovation

- **ELURC-Only Payments**: Exclusive territorial currency model
- **Wallet-Based Auth**: No traditional accounts—just connect your Phantom wallet
- **Blockchain-Native**: Built on Solana for fast, reliable transactions
- **Mobile-First**: QR code payments optimized for crypto-native UX

---

## 🚀 Features

### MVP (Phase 1) - *Complete - Ready for Deployment*

- [x] Product catalog with categories (Fresh, Dry)
- [x] Shopping cart functionality
- [x] Phantom wallet integration
- [x] QR code payment generation
- [x] Real-time payment monitoring (Solana blockchain)
- [x] Transaction validation & confirmation
- [x] Email notifications
- [x] Order management dashboard
- [x] Inventory tracking (PayloadCMS)
- [x] Admin panel with authentication
- [x] Overpayment/underpayment detection
- [x] **Deployment to Render.com (Epic 7 - Complete)**

### Growth (Phase 2) - *Planned*

- [ ] Real-time inventory updates
- [ ] Telegram feed integration
- [ ] Advanced filtering & search
- [ ] Analytics dashboard
- [ ] Product reviews & ratings
- [ ] Customer order history

### Vision (Phase 3) - *Future*

- [ ] DAO integration for NFT holders
- [ ] Multi-vendor marketplace
- [ ] Native mobile app (iOS/Android)
- [ ] Smart contract automation
- [ ] Cross-border ELURC commerce

---

## 🛠️ Tech Stack

### Frontend
![Next.js](https://img.shields.io/badge/Next.js-black?style=flat-square&logo=next.js)
![React](https://img.shields.io/badge/React-61DAFB?style=flat-square&logo=react&logoColor=black)
![TailwindCSS](https://img.shields.io/badge/Tailwind-38B2AC?style=flat-square&logo=tailwind-css&logoColor=white)
![TypeScript](https://img.shields.io/badge/TypeScript-3178C6?style=flat-square&logo=typescript&logoColor=white)

### Backend & CMS
![PayloadCMS](https://img.shields.io/badge/PayloadCMS-000000?style=flat-square&logo=payload&logoColor=white)
![Node.js](https://img.shields.io/badge/Node.js-339933?style=flat-square&logo=node.js&logoColor=white)

### Blockchain
![Solana](https://img.shields.io/badge/Solana-9945FF?style=flat-square&logo=solana&logoColor=white)
![Web3.js](https://img.shields.io/badge/Web3.js-F16822?style=flat-square&logo=web3.js&logoColor=white)
![Phantom](https://img.shields.io/badge/Phantom-AB9FF2?style=flat-square&logo=phantom&logoColor=white)

### Database & Deployment
![Supabase](https://img.shields.io/badge/Supabase-3ECF8E?style=flat-square&logo=supabase&logoColor=white)
![PostgreSQL](https://img.shields.io/badge/PostgreSQL-4169E1?style=flat-square&logo=postgresql&logoColor=white)
![Render](https://img.shields.io/badge/Render-46E3B7?style=flat-square&logo=render&logoColor=white)

---

## 📊 Roadmap

```mermaid
gantt
    title ELURC Market Development Timeline
    dateFormat YYYY-MM-DD
    section Foundation
    Epic 1 Foundation & Design    :done, epic1, 2026-01-12, 2d
    Epic 2 Product Catalog        :done, epic2, 2026-01-13, 2d
    section Core Features
    Epic 3 Cart & Wallet          :done, epic3, 2026-01-14, 2d
    Epic 4 Checkout & Payment     :done, epic4, 2026-01-15, 3d
    Epic 5 Admin Panel            :done, epic5, 2026-01-16, 2d
    Epic 6 Edge Cases & Polish    :done, epic6, 2026-01-17, 2d
    section Deployment
    Epic 7 Deploy to Render       :done, epic7, 2026-01-13, 1d
    section Growth
    First 10 Users                :growth1, 2026-01-20, 30d
    Feature Enhancements          :growth2, 2026-02-20, 60d
    section Vision
    50+ Users & Expansion         :vision1, 2026-04-20, 180d
```

### 🎯 Success Metrics

| Metric | 3 Months | 12 Months |
|--------|----------|-----------|
| Active Users | 10 | 50 |
| Transaction Volume | Growing | Established |
| Payment Detection | 100% | 100% |
| Cart Completion Rate | 25% | 35%+ |

---

## 🏁 Getting Started

### Prerequisites

- Node.js 18+ and Yarn
- Phantom wallet (for testing)
- Prisma account (for database)
- Solana RPC access

### Installation

```bash
# Clone the repository
git clone https://github.com/Huaoe/elurc-shop.git
cd elurc-shop/payload-test

# Install dependencies
yarn install

# Set up environment variables
cp .env.example .env.local
# Edit .env.local with your configuration

# Run Prisma migrations
npx prisma migrate dev

# Run Next.js development server
yarn dev
```

### Environment Variables

```env
# Database (Supabase)
DATABASE_URL=your_supabase_connection_string

# PayloadCMS
PAYLOAD_SECRET=your_secret_key

# Solana
NEXT_PUBLIC_SOLANA_RPC_URL=your_rpc_url
NEXT_PUBLIC_SHOP_WALLET=your_shop_wallet_address
NEXT_PUBLIC_ELURC_TOKEN_ADDRESS=your_elurc_token_address

# Email (Resend)
RESEND_API_KEY=your_resend_api_key
FROM_EMAIL=noreply@yourdomain.com

# Conversion Rate
NEXT_PUBLIC_ELURC_EUR_RATE=0.10
```

---

## 📖 Documentation

- **[Product Requirements Document](/_bmad-output/planning-artifacts/prd.md)** - Complete PRD with 50 FRs, 67 NFRs
- **[Architecture Document](/_bmad-output/planning-artifacts/architecture.md)** - Complete architecture decisions and patterns
- **[Epic Breakdown](/_bmad-output/planning-artifacts/epics.md)** - Complete epic and story breakdown
- **[Sprint Status](/_bmad-output/implementation-artifacts/sprint-status.yaml)** - Current development status
- **[Brainstorming Session](/_bmad-output/analysis/brainstorming-session-2026-01-12.md)** - Initial ideation and vision

---

## ⏱️ Project Time Tracking

**Total Time Invested:** ~124 hours | *Last Updated: 2026-01-13*

### Phase 0: Planning & Architecture (8h) ✅
- Epic 0.1: Discovery & Requirements (3h) - Brainstorming, PRD
- Epic 0.2: UX/UI Design (3h) - Design system, wireframes, accessibility
- Epic 0.3: Architecture (2h) - Tech stack, architecture decisions

### Phase 1: MVP Development (116h) ✅
- **Epic 1:** Foundation & Design System (16h) - Tailwind, Shadcn/UI, Prisma, PayloadCMS
- **Epic 2:** Product Catalog (18h) - Product schema, listing/detail pages, categories
- **Epic 3:** Cart & Wallet (16h) - Zustand state, cart UI, Phantom integration
- **Epic 4:** Checkout & Payment (28h) - Checkout flow, QR codes, payment monitoring, order tracking
- **Epic 5:** Admin Panel (16h) - Authentication, product/order management, fulfillment
- **Epic 6:** Edge Cases & Polish (18h) - Payment discrepancies, error handling, UX polish
- **Epic 7:** Deployment (4h) - Render.com setup, SSL, monitoring (Commit: `edcb5a1`)

### Phase 2: Growth Features (Planned)
- Real-time inventory, advanced search, product reviews
- Analytics dashboard, transaction monitoring
- Telegram integration, customer portal

### Phase 3: Vision Features (Future)
- DAO integration for NFT holders
- Multi-vendor marketplace
- Native mobile app (iOS/Android)

---

## 🤝 Contributing

We welcome contributions from the ELURC community! Please read our contributing guidelines before submitting PRs.

### Development Workflow

1. Fork the repository
2. Create a feature branch (`git checkout -b feature/amazing-feature`)
3. Commit your changes (`git commit -m 'Add amazing feature'`)
4. Push to the branch (`git push origin feature/amazing-feature`)
5. Open a Pull Request

---

## 🔒 Security

- All connections use HTTPS/TLS 1.3+
- Wallet private keys never exposed client-side
- 100% payment detection reliability
- Transaction validation on Solana blockchain
- WCAG 2.1 AA accessibility compliance

---

## 📝 License

This project is licensed under the MIT License - see the [LICENSE](LICENSE) file for details.

---

## 🌐 Community

- **Telegram**: [ELURC Community](https://t.me/elurc)
- **Twitter**: [@ELURC](https://twitter.com/elurc)
- **Website**: [elurc-market.bretaigne](https://elurc-market.bretaigne)

---

## 💡 About ELURC

ELURC is a territorial currency created on Solana blockchain, designed to support Bretaigne's economic sovereignty. By using ELURC for everyday commerce, we're building an alternative economic system based on local circulation, social trust, and community empowerment.

**Vision**: Platform becomes cornerstone of Bretaigne's responsible governance economy and a model for other territorial currencies worldwide.

---

<div align="center">

**Built with ❤️ by the ELURC Community**

*Proving crypto works for everyday commerce*

[![Star on GitHub](https://img.shields.io/github/stars/Huaoe/elurc-shop?style=social)](https://github.com/Huaoe/elurc-shop)

</div>
