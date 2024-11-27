import React from 'react';
import type { Metadata } from "next";
import { Inter } from "next/font/google";
import { getServerSession } from "next-auth";
import "./globals.css";
import AuthProvider from "@/components/auth/AuthProvider";
import { CartProvider } from '@/context/CartContext';
import LoadingBar from '@/components/ui/LoadingBar';
import { LoadingProvider } from '@/context/LoadingContext';
import { FirebaseProvider } from '@/context/FirebaseContext';

const inter = Inter({ subsets: ["latin"] });

export const metadata: Metadata = {
  title: "Next.js App",
  description: "Created with Next.js",
};

export default async function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  const session = await getServerSession();

  return (
    <html lang="en">
      <body className={inter.className}>
        <AuthProvider session={session}>
          <CartProvider>
            <FirebaseProvider>
              <LoadingProvider>
                <LoadingBar />
                {children}
              </LoadingProvider>
            </FirebaseProvider>
          </CartProvider>
        </AuthProvider>
      </body>
    </html>
  );
}
