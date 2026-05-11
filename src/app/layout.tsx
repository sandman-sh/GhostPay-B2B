import type { Metadata } from "next";
import { Inter, Space_Grotesk } from "next/font/google";
import "./globals.css";
import { Providers } from "./providers";
import { CloakProvider } from "@/lib/cloak-context";

const inter = Inter({ subsets: ["latin"], variable: "--font-inter" });
const spaceGrotesk = Space_Grotesk({ subsets: ["latin"], variable: "--font-space" });

export const metadata: Metadata = {
  title: "GhostPay B2B | Private Invoicing",
  description: "Secure, private B2B invoicing on Solana using Cloak SDK.",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body className={`${inter.variable} ${spaceGrotesk.variable} font-sans antialiased bg-background text-foreground`}>
        <Providers>
          <CloakProvider>
            {children}
          </CloakProvider>
        </Providers>
      </body>
    </html>
  );
}
