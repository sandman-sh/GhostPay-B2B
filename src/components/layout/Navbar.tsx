"use client";

import React from "react";
import dynamic from "next/dynamic";

const WalletMultiButtonDynamic = dynamic(
  async () => (await import("@solana/wallet-adapter-react-ui")).WalletMultiButton,
  { ssr: false }
);
import { Shield, Ghost, Menu, X } from "lucide-react";
import Link from "next/link";

export function Navbar() {
  return (
    <nav className="border-b-4 border-black bg-white sticky top-0 z-50">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex justify-between h-20 items-center">
          <div className="flex items-center gap-2">
            <Link href="/" className="flex items-center gap-2 group">
              <div className="bg-primary p-2 border-2 border-black shadow-brutal transition-transform group-hover:-rotate-6">
                <Ghost className="text-white w-6 h-6" />
              </div>
              <span className="text-2xl font-black tracking-tighter uppercase italic">
                GhostPay <span className="text-primary italic">B2B</span>
              </span>
            </Link>
          </div>

          <div className="hidden md:flex items-center gap-8 font-black uppercase text-sm tracking-widest">
            <Link href="/dashboard" className="hover:text-primary transition-colors">Dashboard</Link>
            <Link href="/invoices" className="hover:text-primary transition-colors">Invoices</Link>
            <Link href="/audit" className="hover:text-primary transition-colors">Audit</Link>
          </div>

          <div className="flex items-center gap-4">
            <div className="hidden sm:block">
               <WalletMultiButtonDynamic />
            </div>
            <button className="md:hidden p-2 border-2 border-black bg-accent shadow-brutal active:shadow-none active:translate-x-1 active:translate-y-1">
              <Menu className="w-6 h-6" />
            </button>
          </div>
        </div>
      </div>
    </nav>
  );
}
