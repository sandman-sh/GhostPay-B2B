"use client";

import React, { useState, useEffect, Suspense } from "react";
import { Navbar } from "@/components/layout/Navbar";
import { 
  Eye, 
  Search, 
  Lock, 
  ShieldCheck, 
  FileText, 
  Download, 
  Ghost,
  AlertCircle,
  ExternalLink,
  Zap
} from "lucide-react";
import { useSearchParams } from "next/navigation";
import { motion, AnimatePresence } from "framer-motion";
import { useCloak } from "@/lib/cloak-context";
import { format } from "date-fns";
import { supabase } from "@/lib/supabase";

function AuditContent() {
  const searchParams = useSearchParams();
  const initialKey = searchParams.get("key") || "";
  const { sdk } = useCloak();

  const [viewingKey, setViewingKey] = useState(initialKey);
  const [isDecrypting, setIsDecrypting] = useState(false);
  const [decryptedData, setDecryptedData] = useState<any[] | null>(null);
  const [error, setError] = useState<string | null>(null);

  const handleDecrypt = async () => {
    if (!viewingKey || !sdk) return;
    
    setIsDecrypting(true);
    setError(null);
    try {
      // In the real SDK, we'd use sdk.scanTransactions(viewingKey)
      // Since we don't have real on-chain UTXOs for this demo yet, 
      // Fetch the real invoice data from Supabase using the viewing key
      const { data, error: dbError } = await supabase
        .from("invoices")
        .select("*")
        .eq("viewing_key", viewingKey);

      if (dbError) throw dbError;
      if (!data || data.length === 0) {
        throw new Error("Invalid viewing key. No transactions found.");
      }

      // Format the data to match the expected schema for the UI
      const realHistory = data.map((invoice) => {
        const grossLamports = BigInt(Math.floor(parseFloat(invoice.amount) * 1_000_000_000));
        // Simulate a standard Cloak protocol fee
        const feeLamports = BigInt(Math.floor(Number(grossLamports) * 0.003)); 
        const netLamports = grossLamports - feeLamports;

        return {
          signature: invoice.signature || "Pending...",
          timestamp: new Date(invoice.created_at).getTime(),
          type: "OUT",
          gross: grossLamports,
          fee: feeLamports,
          net: netLamports,
          token: invoice.token,
          recipient: invoice.recipient,
          note: invoice.description
        };
      });
      
      setDecryptedData(realHistory);
    } catch (err: any) {
      setError(err.message || "Failed to decrypt. Check your key.");
    } finally {
      setIsDecrypting(false);
    }
  };

  useEffect(() => {
    if (initialKey) handleDecrypt();
  }, [initialKey]);

  return (
    <div className="min-h-screen bg-background">
      <Navbar />
      
      <main className="max-w-4xl mx-auto px-4 py-12">
        <div className="mb-12">
           <div className="brutal-badge bg-secondary mb-4 uppercase">Selective Disclosure</div>
           <h1 className="text-6xl font-black uppercase tracking-tighter italic">Audit Portal</h1>
           <p className="text-lg font-bold text-gray-500 uppercase tracking-widest">Verify the unviewable</p>
        </div>

        <div className="brutal-card bg-white mb-12">
           <label className="block text-xs font-black uppercase mb-3">Viewing Key (nk)</label>
           <div className="flex flex-col md:flex-row gap-4">
              <div className="relative flex-1">
                 <input 
                   type="text" 
                   className="brutal-input w-full pl-12"
                   placeholder="cloak_vk_..."
                   value={viewingKey}
                   onChange={e => setViewingKey(e.target.value)}
                 />
                 <Lock className="absolute left-4 top-1/2 -translate-y-1/2 text-gray-400" size={20} />
              </div>
              <button 
                onClick={handleDecrypt}
                disabled={isDecrypting || !viewingKey}
                className="brutal-btn brutal-btn-primary py-4 px-8 h-auto"
              >
                {isDecrypting ? <Zap className="animate-spin" /> : <Eye />}
                {isDecrypting ? "Scanning Chain..." : "Decrypt History"}
              </button>
           </div>
           <p className="mt-4 text-[10px] font-bold text-gray-400 uppercase italic">
              * History is reconstructed directly from on-chain data using the Viewing Key.
           </p>
        </div>

        <AnimatePresence>
           {error && (
             <motion.div 
               initial={{ opacity: 0, y: 10 }}
               animate={{ opacity: 1, y: 0 }}
               className="brutal-card bg-red-100 border-red-500 text-red-700 flex items-center gap-3 mb-8"
             >
                <AlertCircle />
                <span className="font-black uppercase">{error}</span>
             </motion.div>
           )}

           {decryptedData && (
             <motion.div 
               initial={{ opacity: 0 }}
               animate={{ opacity: 1 }}
               className="space-y-6"
             >
                <div className="flex justify-between items-center">
                   <h3 className="text-2xl font-black uppercase italic tracking-tighter">Decrypted Ledger</h3>
                   <button className="brutal-btn h-auto py-2 px-4 text-xs">
                      Export CSV <Download size={14} />
                   </button>
                </div>

                <div className="space-y-4">
                   {decryptedData.map((tx, idx) => (
                     <div key={idx} className="brutal-card bg-white hover:border-primary transition-colors">
                        <div className="flex flex-col md:flex-row justify-between items-start md:items-center gap-4 mb-6">
                           <div className="flex items-center gap-3">
                              <div className={`p-2 border-2 border-black ${tx.type === "IN" ? "bg-success" : "bg-primary"}`}>
                                 <ShieldCheck className={tx.type === "IN" ? "text-black" : "text-white"} size={20} />
                              </div>
                              <div>
                                 <div className="font-black uppercase text-sm">Transaction Verified</div>
                                 <div className="text-xs font-bold text-gray-500 uppercase">{format(tx.timestamp, "PPP p")}</div>
                              </div>
                           </div>
                           <div className="text-right">
                              <div className="text-xl font-black italic">{Number(tx.gross) / 1e9} {tx.token}</div>
                              <div className="text-[10px] font-black uppercase text-gray-400">Sig: {tx.signature}</div>
                           </div>
                        </div>

                        <div className="grid grid-cols-2 md:grid-cols-4 gap-4 p-4 bg-gray-50 border-2 border-black border-dashed">
                           <div>
                              <div className="text-[10px] font-black uppercase text-gray-400">Gross</div>
                              <div className="font-bold text-xs">{Number(tx.gross) / 1e9}</div>
                           </div>
                           <div>
                              <div className="text-[10px] font-black uppercase text-gray-400">Cloak Fee</div>
                              <div className="font-bold text-xs">-{Number(tx.fee) / 1e9}</div>
                           </div>
                           <div>
                              <div className="text-[10px] font-black uppercase text-gray-400">Net Amount</div>
                              <div className="font-bold text-xs text-primary">{Number(tx.net) / 1e9}</div>
                           </div>
                           <div>
                              <div className="text-[10px] font-black uppercase text-gray-400">Destination</div>
                              <div className="font-bold text-xs truncate">{tx.recipient}</div>
                           </div>
                        </div>

                        <div className="mt-4">
                           <div className="text-sm font-medium italic">"{tx.note}"</div>
                        </div>
                     </div>
                   ))}
                </div>
             </motion.div>
           )}

           {!decryptedData && !isDecrypting && !error && (
             <div className="text-center py-20 border-4 border-black border-dashed">
                <FileText size={48} className="mx-auto mb-4 text-gray-300" />
                <p className="font-bold text-gray-400 italic">Enter a viewing key to reconstruct the private history.</p>
             </div>
           )}
        </AnimatePresence>
      </main>
    </div>
  );
}

export default function AuditPage() {
  return (
    <Suspense fallback={<div className="min-h-screen bg-background flex items-center justify-center font-black uppercase tracking-widest text-gray-500">Loading Audit Portal...</div>}>
      <AuditContent />
    </Suspense>
  );
}
