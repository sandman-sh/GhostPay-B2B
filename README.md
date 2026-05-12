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

## 🔒 The Problem: Public Leaks in B2B Finance
Public blockchains offer unparalleled settlement speeds and minimal fees, but their transparent nature is a "deal-breaker" for businesses. Every on-chain invoice, payroll run, and treasury move is a public record, exposing sensitive business strategies, vendor costs, and internal financials to competitors and front-runners.

**GhostPay B2B** is built for:
- **Web3 Native Startups:** Who need to manage payroll and vendor payments privately.
- **DAOs & Treasury Managers:** Who want to move capital without signaling to the market.
- **Traditional Enterprises:** Requiring the speed of Solana with the privacy of a traditional bank.

<br />

## 🧠 The Engine: Powered by Cloak
The **Cloak SDK (@cloak_ag)** is the central core of GhostPay B2B. We don't just use it for simple transfers; it is the fundamental privacy engine that makes load-bearing enterprise finance possible on Solana.

### Why Cloak is Central:
- **ZK-Shielded Pool:** GhostPay leverages Cloak's shielded pool architecture to convert public SOL/USDC into private UTXOs, mathematically severing the link between the sender's public identity and the transaction.
- **Local Proof Generation:** Using the Cloak SDK, we generate **Groth16 ZK-SNARKs** directly in the user's browser. This ensures that sensitive transaction data never leaves the client, and the blockchain only sees a valid proof of transfer.
- **Selective Disclosure:** Cloak's viewing key system is what makes GhostPay "enterprise-ready." It allows us to build an Audit Portal where businesses can provide scoped transparency to auditors without d-oxing their entire history.

<br />

## ✨ Platform Features

### 🧾 Enterprise Invoice Engine
Create professional, branded invoices. Our system maps complex wallet addresses to clean business profiles while keeping the metadata encrypted off-chain.

### 🔍 Selective Compliance Auditability
Distribute **Viewing Keys** to stakeholders. They can reconstruct specific ledger entries in our Audit Portal to verify payments for tax and compliance purposes.

### ⚡ Hybrid Architecture
GhostPay leverages **Supabase** to store non-financial metadata (invoice descriptions, counterparty names) in an encrypted environment, while the public blockchain handles blinded value settlement.

<br />

## 🚀 Getting Started

### Prerequisites
- **Node.js**: v18.17.0 or higher
- **Wallet**: A Solana Wallet extension (e.g., Phantom, Backpack) configured to **Devnet**
- **Database**: A Supabase Project for off-chain metadata storage

### Installation

**1. Clone the Repository**  
```bash
git clone https://github.com/sandman-sh/GhostPay-B2B.git
cd GhostPay-B2B
```

**2. Install Dependencies**  
```bash
npm install
```

**3. Configure Infrastructure**  
Duplicate the template and add your credentials:
```bash
cp .env.example .env.local
```
```env
NEXT_PUBLIC_SOLANA_RPC_URL="https://api.devnet.solana.com"
NEXT_PUBLIC_SUPABASE_URL="https://your-project.supabase.co"
NEXT_PUBLIC_SUPABASE_ANON_KEY="your-anon-key"
```

**4. Launch Development Environment**  
```bash
npm run dev
```
Navigate to `http://localhost:3000`.

<br />

## 🌐 Deployment & Program IDs

- **Frontend URL:** [https://ghostpay-b2b.vercel.app](https://ghostpay-b2b.vercel.app) (Demo Link)
- **Cloak Program ID:** `Cloak11111111111111111111111111111111111111` (Solana Devnet)
- **Network:** Solana Devnet

<br />

<div align="center">
  <i>Built with 🖤 for the Cloak x Solana Ecosystem. Powered by <a href="https://x.com/cloak_ag">@cloak_ag</a>.</i>
</div>
