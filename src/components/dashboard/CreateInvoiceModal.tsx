"use client";

import React, { useState } from "react";
import { X, Plus, Ghost, Info, Image as ImageIcon } from "lucide-react";
import { useInvoiceStore } from "@/store/use-invoice-store";
import { useWallet } from "@solana/wallet-adapter-react";
import { format } from "date-fns";

export function CreateInvoiceModal({ isOpen, onClose }: { isOpen: boolean; onClose: () => void }) {
  const { publicKey } = useWallet();
  const addInvoice = useInvoiceStore((state) => state.addInvoice);
  
  const [formData, setFormData] = useState({
    amount: "",
    token: "SOL" as "SOL" | "USDC",
    recipient: "",
    description: "",
    logo_url: "",
  });

  if (!isOpen) return null;

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!publicKey) return;
    
    // eslint-disable-next-line @typescript-eslint/no-unused-vars
    const { logo_url, ...rest } = formData;
    
    addInvoice({
      ...rest,
      sender: publicKey.toBase58(),
    });
    onClose();
    setFormData({ amount: "", token: "SOL", recipient: "", description: "", logo_url: "" });
  };

  return (
    <div className="fixed inset-0 z-[100] flex items-center justify-center bg-black/50 backdrop-blur-sm p-4 overflow-y-auto">
      <div className="brutal-card w-full max-w-5xl relative bg-white overflow-hidden my-8 flex flex-col md:flex-row gap-8">
        <div className="absolute top-0 right-0 p-4 z-10">
          <button onClick={onClose} className="p-2 border-2 border-black bg-white hover:bg-red-500 hover:text-white transition-colors">
            <X size={20} />
          </button>
        </div>

        {/* Left Side: Form */}
        <div className="flex-1 space-y-6">
          <div className="mb-8 flex items-center gap-3">
            <div className="bg-primary p-2 border-2 border-black">
               <Ghost className="text-white" />
            </div>
            <h2 className="text-3xl font-black uppercase italic tracking-tighter">New Invoice</h2>
          </div>

          <form onSubmit={handleSubmit} className="space-y-6">
            <div className="grid grid-cols-3 gap-4">
              <div className="col-span-2">
                <label className="block text-xs font-black uppercase mb-2">Amount</label>
                <input 
                  type="number" 
                  step="0.0001"
                  required
                  className="brutal-input w-full" 
                  placeholder="0.00"
                  value={formData.amount}
                  onChange={e => setFormData({...formData, amount: e.target.value})}
                />
              </div>
              <div>
                <label className="block text-xs font-black uppercase mb-2">Token</label>
                <select 
                  className="brutal-input w-full bg-white"
                  value={formData.token}
                  onChange={e => setFormData({...formData, token: e.target.value as any})}
                >
                  <option value="SOL">SOL</option>
                  <option value="USDC">USDC</option>
                </select>
              </div>
            </div>

            <div>
              <label className="block text-xs font-black uppercase mb-2">Wallet Address (Recipient)</label>
              <input 
                type="text" 
                required
                className="brutal-input w-full" 
                placeholder="Vendor's Solana Wallet Address..."
                value={formData.recipient}
                onChange={e => setFormData({...formData, recipient: e.target.value})}
              />
            </div>

            <div>
              <label className="block text-xs font-black uppercase mb-2">Logo URL (Optional)</label>
              <input 
                type="url" 
                className="brutal-input w-full" 
                placeholder="https://example.com/logo.png"
                value={formData.logo_url}
                onChange={e => setFormData({...formData, logo_url: e.target.value})}
              />
            </div>

            <div>
              <label className="block text-xs font-black uppercase mb-2">Description</label>
              <textarea 
                className="brutal-input w-full h-24 resize-none" 
                placeholder="What is this for?"
                required
                value={formData.description}
                onChange={e => setFormData({...formData, description: e.target.value})}
              />
            </div>

            <div className="p-4 bg-accent/20 border-2 border-black border-dashed flex gap-3 items-start">
               <Info className="shrink-0 mt-1" size={16} />
               <p className="text-xs font-bold leading-tight">
                 Payments will be processed via <span className="underline italic">Cloak Shielded Pool</span>. Amounts and addresses will be hidden on-chain.
               </p>
            </div>

            <button type="submit" className="brutal-btn brutal-btn-primary w-full py-4 text-xl h-auto">
              Create & Shield <Plus className="ml-2" />
            </button>
          </form>
        </div>

        {/* Right Side: Preview */}
        <div className="flex-1 bg-gray-50 border-2 border-black p-6 flex flex-col justify-center relative">
           <div className="absolute top-0 left-0 bg-secondary border-b-2 border-r-2 border-black px-4 py-1 text-xs font-black uppercase italic">
              Live Preview
           </div>
           
           <div className="brutal-card bg-white shadow-brutal-lg max-w-sm w-full mx-auto p-8 mt-6">
              <div className="flex justify-between items-start mb-8">
                 {formData.logo_url ? (
                   // eslint-disable-next-line @next/next/no-img-element
                   <img src={formData.logo_url} alt="Company Logo" className="h-12 w-12 object-contain border-2 border-black bg-white p-1" />
                 ) : (
                   <div className="h-12 w-12 border-2 border-black bg-gray-100 flex items-center justify-center">
                     <ImageIcon className="text-gray-400" />
                   </div>
                 )}
                 <div className="text-right">
                    <div className="font-black uppercase italic text-xl">INVOICE</div>
                    <div className="text-gray-500 font-bold text-xs">{format(new Date(), "MMM dd, yyyy")}</div>
                 </div>
              </div>
              
              <div className="space-y-6 mb-8">
                 <div className="border-b-2 border-black pb-4">
                    <div className="text-[10px] font-black uppercase text-gray-500 mb-1">Billed To</div>
                    <div className="font-bold text-sm truncate bg-accent/20 p-2 border-2 border-black border-dashed">
                      {formData.recipient || "Wallet Address..."}
                    </div>
                 </div>

                 <div>
                    <div className="text-[10px] font-black uppercase text-gray-500 mb-1">Description</div>
                    <div className="font-bold text-sm min-h-[40px]">
                      {formData.description || "Enter item description..."}
                    </div>
                 </div>
              </div>

              <div className="bg-primary text-white p-4 border-2 border-black flex items-end justify-between">
                 <span className="font-black uppercase text-xs">Total Due</span>
                 <div className="text-right">
                   <div className="text-3xl font-black italic tracking-tighter">
                     {formData.amount || "0.00"}
                   </div>
                   <div className="text-xs font-bold">{formData.token}</div>
                 </div>
              </div>

              <div className="mt-4 text-center">
                <div className="inline-flex items-center gap-1 text-[10px] font-black text-gray-400 uppercase">
                  <Ghost size={12} /> Powered by GhostPay
                </div>
              </div>
           </div>
        </div>
      </div>
    </div>
  );
}
