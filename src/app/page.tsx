"use client";

import { Navbar } from "@/components/layout/Navbar";
import { ArrowRight, ShieldCheck, Lock, Eye, Zap, Ghost } from "lucide-react";
import Link from "next/link";
import { motion } from "framer-motion";

export default function Home() {
  return (
    <main className="min-h-screen bg-background">
      <Navbar />
      
      {/* Hero Section */}
      <section className="max-w-7xl mx-auto px-4 pt-20 pb-32">
        <div className="grid lg:grid-cols-2 gap-16 items-center">
          <motion.div 
            initial={{ opacity: 0, x: -50 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.5 }}
          >
            <div className="brutal-badge bg-accent mb-6 uppercase">Load-Bearing Privacy</div>
            <h1 className="text-7xl md:text-8xl font-black uppercase tracking-tighter leading-none mb-8">
              B2B Payments <br />
              <span className="text-primary italic">In the Shadows.</span>
            </h1>
            <p className="text-xl font-bold mb-10 max-w-xl leading-relaxed">
              Every on-chain invoice is a public leak. GhostPay uses <span className="underline decoration-4 decoration-primary">Cloak ZK-proofs</span> to hide your treasury flows, payroll, and vendor costs while keeping your auditor happy.
            </p>
            <div className="flex flex-wrap gap-6">
              <Link href="/dashboard" className="brutal-btn brutal-btn-primary text-xl py-4 h-auto group">
                Enter Dashboard <ArrowRight className="group-hover:translate-x-2 transition-transform" />
              </Link>
              <Link href="/audit" className="brutal-btn brutal-btn-secondary text-xl py-4 h-auto">
                Audit Flow
              </Link>
            </div>
          </motion.div>

          <motion.div 
             initial={{ opacity: 0, scale: 0.8 }}
             animate={{ opacity: 1, scale: 1 }}
             transition={{ duration: 0.5, delay: 0.2 }}
             className="relative"
          >
            <div className="border-4 border-black bg-white p-8 shadow-brutal-lg -rotate-2 hover:rotate-0 transition-transform">
              <div className="flex justify-between items-start mb-8">
                 <div className="bg-black text-white p-3 border-2 border-black">
                   <Ghost size={32} />
                 </div>
                 <div className="text-right">
                    <div className="font-black uppercase italic">INV-2024-001</div>
                    <div className="text-gray-500 font-bold">MAY 11, 2026</div>
                 </div>
              </div>
              
              <div className="space-y-4 mb-8">
                 <div className="border-b-2 border-black pb-4 flex justify-between items-end">
                    <div>
                       <div className="text-xs font-black uppercase text-gray-500">Recipient</div>
                       <div className="text-lg font-bold">acme_corp.sol</div>
                    </div>
                    <div className="text-right">
                       <div className="text-xs font-black uppercase text-gray-500">Amount</div>
                       <div className="text-2xl font-black">50.00 SOL</div>
                    </div>
                 </div>
                 <div className="text-sm font-medium italic">
                    "Payment for Q2 Infrastructure and Stealth Cloud Services"
                 </div>
              </div>

              <div className="bg-primary text-white p-4 border-2 border-black flex items-center justify-between font-black uppercase italic">
                 <span>Status: Shielded</span>
                 <Lock size={18} />
              </div>

              {/* Floaties */}
              <div className="absolute -top-10 -right-10 bg-accent p-4 border-4 border-black shadow-brutal rotate-12 hidden md:block">
                 <Zap className="text-black" />
              </div>
              <div className="absolute -bottom-10 -left-10 bg-secondary p-4 border-4 border-black shadow-brutal -rotate-12 hidden md:block">
                 <Eye className="text-black" />
              </div>
            </div>
          </motion.div>
        </div>
      </section>

      {/* Features */}
      <section className="bg-black py-24 text-white overflow-hidden">
        <div className="max-w-7xl mx-auto px-4">
           <div className="grid md:grid-cols-3 gap-12">
              <div className="p-8 border-4 border-white hover:bg-primary transition-colors group">
                 <ShieldCheck className="w-12 h-12 mb-6 group-hover:scale-110 transition-transform" />
                 <h3 className="text-2xl font-black uppercase mb-4 italic">Zero Knowledge</h3>
                 <p className="font-bold text-gray-400 group-hover:text-white transition-colors">
                    Amounts and addresses never hit the public ledger. Your business strategy stays your business.
                 </p>
              </div>
              <div className="p-8 border-4 border-white hover:bg-secondary transition-colors group text-white">
                 <Eye className="w-12 h-12 mb-6 group-hover:scale-110 transition-transform text-secondary group-hover:text-black" />
                 <h3 className="text-2xl font-black uppercase mb-4 italic group-hover:text-black">Scoped Audits</h3>
                 <p className="font-bold text-gray-400 group-hover:text-black transition-colors">
                    Share viewing keys with auditors for selective transparency without d-oxing your entire history.
                 </p>
              </div>
              <div className="p-8 border-4 border-white hover:bg-accent transition-colors group text-white">
                 <Zap className="w-12 h-12 mb-6 group-hover:scale-110 transition-transform text-accent group-hover:text-black" />
                 <h3 className="text-2xl font-black uppercase mb-4 italic group-hover:text-black">Instant Proofs</h3>
                 <p className="font-bold text-gray-400 group-hover:text-black transition-colors">
                    Generate Groth16 proofs in seconds directly in your browser. No server needed.
                 </p>
              </div>
           </div>
        </div>
      </section>

      {/* How it Works */}
      <section className="py-24 bg-accent relative border-b-4 border-black overflow-hidden">
        <div className="max-w-7xl mx-auto px-4 relative z-10">
          <div className="text-center mb-16">
            <h2 className="text-5xl md:text-6xl font-black uppercase tracking-tighter italic mb-4">How It Works</h2>
            <p className="text-xl font-bold max-w-2xl mx-auto">End-to-end privacy for B2B transactions powered by Solana and ZK-SNARKs.</p>
          </div>
          
          <div className="grid md:grid-cols-4 gap-8">
            <div className="brutal-card bg-white relative">
               <div className="absolute -top-4 -left-4 w-12 h-12 bg-primary border-4 border-black text-white flex items-center justify-center font-black text-xl z-20 shadow-brutal">1</div>
               <h4 className="text-xl font-black uppercase italic mb-2 mt-4">Invoice Creation</h4>
               <p className="font-bold text-sm text-gray-600">Draft invoices normally. Data is encrypted and stored in Supabase, keeping the metadata off-chain and fully private.</p>
            </div>
            <div className="brutal-card bg-white relative">
               <div className="absolute -top-4 -left-4 w-12 h-12 bg-secondary border-4 border-black text-black flex items-center justify-center font-black text-xl z-20 shadow-brutal">2</div>
               <h4 className="text-xl font-black uppercase italic mb-2 mt-4">Shielding Funds</h4>
               <p className="font-bold text-sm text-gray-600">Solana SOL or USDC is converted into UTXOs within the Cloak Shielded Pool. No link to your public address.</p>
            </div>
            <div className="brutal-card bg-white relative">
               <div className="absolute -top-4 -left-4 w-12 h-12 bg-accent border-4 border-black text-black flex items-center justify-center font-black text-xl z-20 shadow-brutal">3</div>
               <h4 className="text-xl font-black uppercase italic mb-2 mt-4">ZK Proof Generation</h4>
               <p className="font-bold text-sm text-gray-600">Groth16 proofs are generated locally in your browser. Transaction validity is proven without revealing amounts or parties.</p>
            </div>
            <div className="brutal-card bg-white relative">
               <div className="absolute -top-4 -left-4 w-12 h-12 bg-primary border-4 border-black text-white flex items-center justify-center font-black text-xl z-20 shadow-brutal">4</div>
               <h4 className="text-xl font-black uppercase italic mb-2 mt-4">Selective Audit</h4>
               <p className="font-bold text-sm text-gray-600">Generate a unique Viewing Key specific to a transaction to prove compliance to an auditor without leaking all history.</p>
            </div>
          </div>
        </div>
      </section>

      {/* Technical Details */}
      <section className="py-24 bg-white relative">
        <div className="max-w-7xl mx-auto px-4 grid lg:grid-cols-2 gap-16 items-center">
          <div>
            <h2 className="text-5xl font-black uppercase tracking-tighter italic mb-8">Technical Architecture</h2>
            <div className="space-y-6">
              <div className="flex gap-4 items-start">
                 <div className="bg-black p-2 mt-1"><Lock className="text-white w-5 h-5" /></div>
                 <div>
                   <h5 className="font-black uppercase text-lg">Next.js & Turbopack</h5>
                   <p className="font-bold text-gray-600">High performance frontend delivering instantaneous interactions with Neo-Brutalist aesthetics.</p>
                 </div>
              </div>
              <div className="flex gap-4 items-start">
                 <div className="bg-primary p-2 mt-1 border-2 border-black"><ShieldCheck className="text-white w-5 h-5" /></div>
                 <div>
                   <h5 className="font-black uppercase text-lg">Cloak SDK Integration</h5>
                   <p className="font-bold text-gray-600">Under the hood, @cloak.dev/sdk manages the UTXO set and merkle tree syncing with the Solana Devnet.</p>
                 </div>
              </div>
              <div className="flex gap-4 items-start">
                 <div className="bg-secondary p-2 mt-1 border-2 border-black"><Zap className="text-black w-5 h-5" /></div>
                 <div>
                   <h5 className="font-black uppercase text-lg">Supabase Backend</h5>
                   <p className="font-bold text-gray-600">Realtime database layer powering live invoice updates with row-level security ensuring strict data access controls.</p>
                 </div>
              </div>
            </div>
          </div>
          
          <div className="brutal-card bg-black text-green-400 font-mono text-sm p-6 overflow-hidden">
            <div className="flex items-center gap-2 mb-4 border-b border-gray-800 pb-4">
              <div className="w-3 h-3 bg-red-500 rounded-full"></div>
              <div className="w-3 h-3 bg-yellow-500 rounded-full"></div>
              <div className="w-3 h-3 bg-green-500 rounded-full"></div>
            </div>
            <pre className="whitespace-pre-wrap">
{`// Generating a UTXO for payment
const amountLamports = BigInt(invoice.amount * 1e9);
const owner = await generateUtxoKeypair();
const output = await createUtxo(amountLamports, owner);

// Depositing to the Shielded Pool
const deposited = await transact({
  inputUtxos: [await createZeroUtxo()],
  outputUtxos: [output],
  externalAmount: amountLamports,
  depositor: publicKey,
}, { programId: CLOAK_PROGRAM_ID });

// Private Transfer via Full Withdraw
await fullWithdraw(deposited.outputUtxos, recipient);`}
            </pre>
          </div>
        </div>
      </section>

      {/* Footer */}
      <footer className="border-t-4 border-black py-12 bg-white">
         <div className="max-w-7xl mx-auto px-4 flex flex-col md:flex-row justify-between items-center gap-8">
            <div className="flex items-center gap-2">
              <Ghost className="text-primary w-6 h-6" />
              <span className="font-black uppercase italic tracking-tighter">GhostPay B2B</span>
            </div>
            <div className="text-sm font-bold uppercase tracking-widest text-gray-500">
               Powered by the Cloak Protocol SDK on Solana
            </div>
            <div className="flex gap-6 font-black uppercase text-xs">
               <a href="#" className="hover:text-primary">Docs</a>
               <a href="#" className="hover:text-primary">Twitter</a>
               <a href="#" className="hover:text-primary">Github</a>
            </div>
         </div>
      </footer>
    </main>
  );
}
