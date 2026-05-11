"use client";

import React, { createContext, useContext, useMemo, useState, useEffect } from "react";
import { CloakSDK, CLOAK_PROGRAM_ID } from "@cloak.dev/sdk";
import { useWallet, useConnection } from "@solana/wallet-adapter-react";
import { PublicKey } from "@solana/web3.js";

interface CloakContextType {
  sdk: CloakSDK | null;
  isRegistered: boolean;
  isRegistering: boolean;
  register: () => Promise<void>;
  error: string | null;
}

const CloakContext = createContext<CloakContextType | null>(null);

export function CloakProvider({ children }: { children: React.ReactNode }) {
  const { publicKey, signTransaction, sendTransaction, signMessage } = useWallet();
  const { connection } = useConnection();
  
  const [isRegistered, setIsRegistered] = useState(false);
  const [isRegistering, setIsRegistering] = useState(false);
  const [error, setError] = useState<string | null>(null);

  const sdk = useMemo(() => {
    if (!publicKey || !signTransaction || !sendTransaction) return null;
    
    return new CloakSDK({
      wallet: { 
        publicKey, 
        signTransaction, 
        sendTransaction,
        signMessage 
      },
      network: "devnet",
      programId: CLOAK_PROGRAM_ID,
      connection,
    });
  }, [publicKey, signTransaction, sendTransaction, signMessage, connection]);

  const register = async () => {
    if (!sdk || !publicKey) return;
    
    setIsRegistering(true);
    setError(null);
    try {
      // In a real app, we'd check if already registered on-chain
      // For this demo, we'll simulate registration success
      // The SDK usually handles this internally during transact if not registered
      console.log("Registering Cloak viewing key...");
      // Simulate registration lag
      await new Promise(r => setTimeout(r, 1500));
      setIsRegistered(true);
    } catch (err: any) {
      setError(err.message || "Failed to register");
    } finally {
      setIsRegistering(false);
    }
  };

  return (
    <CloakContext.Provider value={{ sdk, isRegistered, isRegistering, register, error }}>
      {children}
    </CloakContext.Provider>
  );
}

export const useCloak = () => {
  const context = useContext(CloakContext);
  if (!context) {
    throw new Error("useCloak must be used within a CloakProvider");
  }
  return context;
};
