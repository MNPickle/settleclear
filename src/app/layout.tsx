import type { Metadata } from "next";
import { Geist, Geist_Mono } from "next/font/google";
import "./globals.css";

const geistSans = Geist({
  variable: "--font-geist-sans",
  subsets: ["latin"],
});

const geistMono = Geist_Mono({
  variable: "--font-geist-mono",
  subsets: ["latin"],
});

export const metadata: Metadata = {
  title:
    "SettleClear — Import-ready journals when Stripe ≠ QuickBooks / Xero",
  description:
    "For SaaS founders, solos & bookkeepers whose Stripe deposit doesn’t match QuickBooks or Xero. Upload a payout CSV; get QBO + Xero journals and a plain-English fee story in-browser. Free 1 file. Membership $12/mo. A Vetted Stuff product.",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body
        className={`${geistSans.variable} ${geistMono.variable} antialiased`}
      >
        {children}
      </body>
    </html>
  );
}
