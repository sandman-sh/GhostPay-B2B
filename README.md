<div align="center">
  <h1>GhostPay B2B</h1>
  <p><strong>Enterprise-Grade Private Invoicing & Payroll on Solana</strong></p>
  
  <p>
    <a href="https://solana.com"><img src="https://img.shields.io/badge/Network-Solana-14F195?style=flat-square&logo=solana&logoColor=white" alt="Solana" /></a>
    <a href="https://nextjs.org"><img src="https://img.shields.io/badge/Frontend-Next.js-000000?style=flat-square&logo=next.js" alt="Next.js" /></a>
    <a href="https://supabase.com"><img src="https://img.shields.io/badge/Database-Supabase-3ECF8E?style=flat-square&logo=supabase&logoColor=white" alt="Supabase" /></a>
    <img src="https://img.shields.io/badge/Zero_Knowledge-Groth16-blue?style=flat-square" alt="Zero Knowledge" />
  </p>
</div>

<br />

## 🔒 The Privacy Standard for On-Chain Business

Public blockchains offer unparalleled settlement speeds and minimal fees. However, their transparent nature forces enterprises to broadcast highly sensitive data—supplier networks, payroll volumes, and acquisition strategies—to the entire world, including competitors.

**GhostPay** solves this. Designed for the modern enterprise, GhostPay routes payments through a Zero-Knowledge Shielded Pool. This cryptographic layer fully conceals the sender, recipient, and transaction amount, giving you the speed of Solana with the privacy of a traditional bank vault.

<br />

## ✨ Platform Features

### 🛡️ Absolute Financial Secrecy
Powered by the robust `Cloak SDK`, all funds are routed via Groth16 ZK-SNARKs. Your treasury movements remain mathematically unobservable to outside analytics.

### 🧾 Enterprise Invoice Engine
Create professional, branded invoices in seconds. A real-time preview interface adapts to your company’s logo, automatically mapping complex wallet addresses to clean business profiles.

### 🔍 Selective Compliance Auditability
Privacy doesn't mean non-compliance. GhostPay generates secure **Viewing Keys** for every transaction. Distribute these keys to auditors, enabling them to mathematically reconstruct specific ledger entries in our dedicated Audit Portal without exposing your broader treasury.

### ⚡ Hybrid Architecture
GhostPay leverages **Supabase** (PostgreSQL) to store sensitive metadata (invoice descriptions, counterparties) in an encrypted off-chain environment. The public blockchain is used strictly for blinded value settlement.

<br />

## 🚀 Getting Started

### Prerequisites
- **Node.js**: v18.17.0 or higher
- **Wallet**: A Solana Wallet extension (e.g., Phantom, Backpack) configured to Devnet
- **Database**: A Supabase Project for off-chain metadata storage

### Installation

**1. Clone the Repository**  
Pull the latest source code from the `main` branch:
```bash
git clone https://github.com/sandman-sh/GhostPay-B2B.git
cd GhostPay-B2B
```

**2. Install Core Dependencies**  
We recommend using `pnpm` or `yarn` for deterministic dependency resolution, though `npm` works perfectly:
```bash
npm install
# or
yarn install
```

**3. Configure Infrastructure**  
GhostPay requires a secure connection to your Supabase instance and a Solana RPC endpoint. Duplicate the template configuration file:
```bash
cp .env.example .env.local
```
Populate `.env.local` with your secure credentials:
```env
NEXT_PUBLIC_SOLANA_RPC_URL="https://api.devnet.solana.com"
NEXT_PUBLIC_SUPABASE_URL="https://<your-project>.supabase.co"
NEXT_PUBLIC_SUPABASE_ANON_KEY="<your-anon-key>"
```

**4. Launch Development Environment**  
Initialize the Next.js Turbopack compiler and start the runtime:
```bash
npm run dev
```
Navigate to `http://localhost:3000` in your browser to access the GhostPay B2B interface.

<br />

## 💼 Core Workflow

1. **Treasury Connection:** Connect your enterprise wallet and initialize your Cloak privacy profile.
2. **Invoice Generation:** Draft a new B2B invoice with your brand identity.
3. **Shielded Settlement:** Execute the transaction. Proofs are computed locally; funds are transferred anonymously.
4. **Compliance Delivery:** Provide the generated `viewing_key` to necessary stakeholders for the Audit Portal.

<br />

<div align="center">
  <i>Built to redefine enterprise confidentiality on the blockchain.</i>
</div>
