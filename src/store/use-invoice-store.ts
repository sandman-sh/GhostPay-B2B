import { create } from "zustand";
import { supabase } from "@/lib/supabase";

export type InvoiceStatus = "pending" | "paid" | "overdue";

export interface Invoice {
  id: string;
  amount: string; // in SOL or USDC
  token: "SOL" | "USDC";
  recipient: string;
  sender: string;
  description: string;
  created_at: string;
  status: InvoiceStatus;
  viewing_key?: string;
  signature?: string;
  logo_url?: string;
}

interface InvoiceStore {
  invoices: Invoice[];
  fetchInvoices: () => Promise<void>;
  addInvoice: (invoice: Omit<Invoice, "id" | "created_at" | "status" | "signature" | "viewing_key">) => Promise<void>;
  updateInvoiceStatus: (id: string, status: InvoiceStatus, signature?: string, viewing_key?: string) => Promise<void>;
}

export const useInvoiceStore = create<InvoiceStore>((set) => ({
  invoices: [],
  fetchInvoices: async () => {
    const { data, error } = await supabase.from("invoices").select("*").order("created_at", { ascending: false });
    if (!error && data) {
      set({ invoices: data as Invoice[] });
    } else {
      console.error("Error fetching invoices:", error);
    }
  },
  addInvoice: async (invoice) => {
    const { data, error } = await supabase.from("invoices").insert([invoice]).select();
    if (!error && data) {
      set((state) => ({ invoices: [data[0] as Invoice, ...state.invoices] }));
    } else {
      console.error("Error adding invoice:", error);
    }
  },
  updateInvoiceStatus: async (id, status, signature, viewing_key) => {
    const { data, error } = await supabase
      .from("invoices")
      .update({ status, signature, viewing_key })
      .eq("id", id)
      .select();
    if (!error && data) {
      set((state) => ({
        invoices: state.invoices.map((inv) => (inv.id === id ? (data[0] as Invoice) : inv)),
      }));
    } else {
      console.error("Error updating invoice:", error);
    }
  },
}));
