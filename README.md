# 🛒 ELURC Market

<div align="center">

![ELURC Market Banner](https://img.shields.io/badge/ELURC-Market-blue?style=for-the-badge)
[![License](https://img.shields.io/badge/license-MIT-green?style=for-the-badge)](LICENSE)
[![PRD Complete](https://img.shields.io/badge/PRD-Complete-success?style=for-the-badge)](/_bmad-output/planning-artifacts/prd.md)
[![Status](https://img.shields.io/badge/Status-POC-yellow?style=for-the-badge)](#roadmap)

**Territorial Currency E-Commerce for Bretaigne's Economic Sovereignty**

*The first organic grocery marketplace exclusively powered by ELURC cryptocurrency*

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

### MVP (Phase 1) - *In Development*

- [x] Product catalog with categories (Fresh, Dry)
- [x] Shopping cart functionality
- [x] Phantom wallet integration
- [x] QR code payment generation
- [ ] Real-time payment monitoring (Solana blockchain)
- [ ] Transaction validation & confirmation
- [ ] Email notifications
- [ ] Order management dashboard
- [ ] Inventory tracking (PayloadCMS)

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

### Deployment
![Vercel](https://img.shields.io/badge/Vercel-000000?style=flat-square&logo=vercel&logoColor=white)
![PostgreSQL](https://img.shields.io/badge/PostgreSQL-4169E1?style=flat-square&logo=postgresql&logoColor=white)

---

## 📊 Roadmap

```mermaid
gantt
    title ELURC Market Development Timeline
    dateFormat YYYY-MM-DD
    section POC
    PayloadCMS Setup           :done, poc1, 2026-01-12, 1d
    Product Catalog            :active, poc2, 2026-01-12, 1d
    section MVP
    Core Purchase Flow         :mvp1, 2026-01-13, 2w
    Payment Integration        :mvp2, 2026-01-20, 1w
    Polish & Launch            :mvp3, 2026-01-27, 1w
    section Growth
    First 10 Users             :growth1, 2026-02-03, 1M
    Feature Enhancements       :growth2, 2026-03-03, 2M
    section Vision
    50+ Users & Expansion      :vision1, 2026-05-03, 6M
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
cd elurc-shop

# Install dependencies
yarn install

# Set up Prisma Postgres database
npx prisma init --datasource-provider postgresql

# Set up environment variables
cp .env.example .env.local
# Edit .env.local with your Prisma Postgres connection string

# Run Prisma migrations
npx prisma migrate dev

# Run Next.js development server
yarn dev
```

### Environment Variables

```env
# Database
DATABASE_URL=your_prisma_postgres_connection_string

# PayloadCMS
PAYLOAD_SECRET=your_secret_key

# Solana
NEXT_PUBLIC_SOLANA_RPC_URL=your_rpc_url
NEXT_PUBLIC_SHOP_WALLET=your_shop_wallet_address

# Email (Resend)
RESEND_API_KEY=your_resend_api_key
```

---

## 📖 Documentation

- **[Product Requirements Document](/_bmad-output/planning-artifacts/prd.md)** - Complete PRD with 50 FRs, 67 NFRs
- **[Architecture Document](/_bmad-output/planning-artifacts/architecture.md)** - Complete architecture decisions and patterns
- **[Brainstorming Session](/_bmad-output/analysis/brainstorming-session-2026-01-12.md)** - Initial ideation and vision
- **[Workflow Status](/_bmad-output/planning-artifacts/bmm-workflow-status.yaml)** - Project tracking

---

## ⏱️ Project Time Tracking

### Total Time Invested: **8 hours**

*Last Updated: 2026-01-12*

---

### Phase 0: Planning & Architecture
**Status:** ✅ Complete | **Time:** 8h

#### Epic 0.1: Project Discovery & Requirements
- **Story 0.1.1**: Brainstorming session and vision definition
  - Commits: `9e32130`
  - Time: 1h
  
- **Story 0.1.2**: Product Requirements Document (PRD)
  - Commits: `9e32130`
  - Time: 2h

#### Epic 0.2: UX/UI Design
- **Story 0.2.1**: UX design overview and principles
  - Commits: `9e32130`
  - Time: 1h
  
- **Story 0.2.2**: Information architecture
  - Commits: `9e32130`
  - Time: 0.5h
  
- **Story 0.2.3**: User flows and wireframes
  - Commits: `9e32130`
  - Time: 1h
  
- **Story 0.2.4**: Design system and accessibility specs
  - Commits: `9e32130`
  - Time: 0.5h

#### Epic 0.3: Architecture & Technical Design
- **Story 0.3.1**: Architecture decisions document
  - Commits: `9e32130`
  - Time: 1.5h
  
- **Story 0.3.2**: Technology stack selection
  - Commits: `9e32130`
  - Time: 0.5h

**Phase 0 Total: 8h**

---

### Phase 1: MVP Development
**Status:** 🔄 Not Started | **Time:** 0h

#### Epic 1.1: Project Foundation
- **Story 1.1.1**: Initialize Next.js project with create-next-app
  - Commits: *Pending*
  - Time: 0h
  
- **Story 1.1.2**: Set up Prisma Postgres database and Prisma ORM
  - Commits: *Pending*
  - Time: 0h
  
- **Story 1.1.3**: Configure PayloadCMS with Prisma adapter
  - Commits: *Pending*
  - Time: 0h
  
- **Story 1.1.4**: Install Shadcn/UI and configure Tailwind
  - Commits: *Pending*
  - Time: 0h

#### Epic 1.2: Product Catalog
- **Story 1.2.1**: Create Prisma schema for products
  - Commits: *Pending*
  - Time: 0h
  
- **Story 1.2.2**: Set up PayloadCMS collections (Products, Categories)
  - Commits: *Pending*
  - Time: 0h
  
- **Story 1.2.3**: Build product listing page
  - Commits: *Pending*
  - Time: 0h
  
- **Story 1.2.4**: Build product detail page
  - Commits: *Pending*
  - Time: 0h

#### Epic 1.3: Shopping Cart
- **Story 1.3.1**: Create Zustand cart store
  - Commits: *Pending*
  - Time: 0h
  
- **Story 1.3.2**: Build cart UI components
  - Commits: *Pending*
  - Time: 0h
  
- **Story 1.3.3**: Implement cart persistence (localStorage)
  - Commits: *Pending*
  - Time: 0h

#### Epic 1.4: Wallet Integration
- **Story 1.4.1**: Integrate Phantom wallet SDK
  - Commits: *Pending*
  - Time: 0h
  
- **Story 1.4.2**: Create Zustand wallet store
  - Commits: *Pending*
  - Time: 0h
  
- **Story 1.4.3**: Build wallet connection UI
  - Commits: *Pending*
  - Time: 0h

#### Epic 1.5: Checkout & Payment
- **Story 1.5.1**: Build checkout flow UI
  - Commits: *Pending*
  - Time: 0h
  
- **Story 1.5.2**: Implement QR code generation
  - Commits: *Pending*
  - Time: 0h
  
- **Story 1.5.3**: Create payment monitoring API route
  - Commits: *Pending*
  - Time: 0h
  
- **Story 1.5.4**: Implement client-side payment polling
  - Commits: *Pending*
  - Time: 0h
  
- **Story 1.5.5**: Build payment confirmation UI
  - Commits: *Pending*
  - Time: 0h

#### Epic 1.6: Order Management
- **Story 1.6.1**: Create Prisma schema for orders
  - Commits: *Pending*
  - Time: 0h
  
- **Story 1.6.2**: Build order creation API
  - Commits: *Pending*
  - Time: 0h
  
- **Story 1.6.3**: Build admin order dashboard
  - Commits: *Pending*
  - Time: 0h

#### Epic 1.7: Email Notifications
- **Story 1.7.1**: Set up Resend email service
  - Commits: *Pending*
  - Time: 0h
  
- **Story 1.7.2**: Create React Email templates
  - Commits: *Pending*
  - Time: 0h
  
- **Story 1.7.3**: Implement order confirmation emails
  - Commits: *Pending*
  - Time: 0h

#### Epic 1.8: Deployment
- **Story 1.8.1**: Configure Vercel deployment
  - Commits: *Pending*
  - Time: 0h
  
- **Story 1.8.2**: Set up environment variables
  - Commits: *Pending*
  - Time: 0h
  
- **Story 1.8.3**: Deploy to production
  - Commits: *Pending*
  - Time: 0h

**Phase 1 Total: 0h**

---

### Phase 2: Growth Features
**Status:** 📋 Planned | **Time:** 0h

#### Epic 2.1: Enhanced User Experience
- **Story 2.1.1**: Real-time inventory updates
  - Commits: *Planned*
  - Time: 0h
  
- **Story 2.1.2**: Advanced filtering and search
  - Commits: *Planned*
  - Time: 0h
  
- **Story 2.1.3**: Product reviews and ratings
  - Commits: *Planned*
  - Time: 0h

#### Epic 2.2: Analytics & Monitoring
- **Story 2.2.1**: Analytics dashboard for shop manager
  - Commits: *Planned*
  - Time: 0h
  
- **Story 2.2.2**: Transaction monitoring and alerts
  - Commits: *Planned*
  - Time: 0h

#### Epic 2.3: Community Integration
- **Story 2.3.1**: Telegram feed integration
  - Commits: *Planned*
  - Time: 0h
  
- **Story 2.3.2**: Customer order history
  - Commits: *Planned*
  - Time: 0h

**Phase 2 Total: 0h**

---

### Phase 3: Vision Features
**Status:** 💭 Future | **Time:** 0h

#### Epic 3.1: DAO Integration
- **Story 3.1.1**: NFT holder verification
  - Commits: *Future*
  - Time: 0h
  
- **Story 3.1.2**: Exclusive products for DAO members
  - Commits: *Future*
  - Time: 0h

#### Epic 3.2: Multi-Vendor Marketplace
- **Story 3.2.1**: Vendor onboarding system
  - Commits: *Future*
  - Time: 0h
  
- **Story 3.2.2**: Multi-vendor product catalog
  - Commits: *Future*
  - Time: 0h

#### Epic 3.3: Mobile App
- **Story 3.3.1**: React Native app development
  - Commits: *Future*
  - Time: 0h

**Phase 3 Total: 0h**

---

### 📝 How to Update This Tracking

When completing work, update the relevant story with:

1. **Commit hash(es)**: Add Git commit SHA(s)
2. **Time spent**: Estimate hours spent on the story
3. **Status**: Update epic/phase status as needed
4. **Total hours**: Update phase totals and grand total

**Example:**
```markdown
- **Story 1.1.1**: Initialize Next.js project with create-next-app
  - Commits: `a1b2c3d`, `e4f5g6h`
  - Time: 2h
```

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
