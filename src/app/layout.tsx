import "./globals.css";

import type { Metadata } from "next";
import { Geist, Geist_Mono } from "next/font/google";
import { SessionProvider } from "next-auth/react";
import { ReactNode } from "react";

import { Footer, Navbar } from "@/components/layout";
import { Toaster } from "@/components/ui";
import { ReactQueryProvider } from "@/providers";

const geistSans = Geist({
  variable: "--font-geist-sans",
  subsets: ["latin"],
});

const geistMono = Geist_Mono({
  variable: "--font-geist-mono",
  subsets: ["latin"],
});

export const metadata: Metadata = {
  title: "Tienda UCN",
  description: "Tienda oficial de la Universidad Católica del Norte",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: ReactNode;
}>) {
  return (
    <html lang="es">
      <body
        className={`${geistSans.variable} ${geistMono.variable} antialiased`}
      >
        <SessionProvider>
          <ReactQueryProvider>
            <Toaster position="top-right" closeButton />
            <Navbar />
            <main className="min-h-screen">{children}</main>
            <Footer />
          </ReactQueryProvider>
        </SessionProvider>
      </body>
    </html>
  );
}
