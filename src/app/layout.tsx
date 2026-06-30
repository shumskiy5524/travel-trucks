import type { Metadata } from "next";
import { Inter } from "next/font/google";
import Link from "next/link";
import QueryProvider from "@/providers/QueryProvider";
import "./globals.css";

const inter = Inter({ subsets: ["latin"] });

export const metadata: Metadata = {
  title: "TravelTrucks - Camper Rental",
  description: "Find your dream camper van for rent",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body className={`${inter.className} bg-white text-[#101828] antialiased`}>
        <QueryProvider>
          <header className="border-b border-[#E4E7EC] bg-[#F7F9FC]">
            <div className="mx-auto flex max-w-7xl h-16 items-center justify-between px-4 sm:px-6 lg:px-8">
              <Link href="/" className="text-xl font-bold tracking-tight text-[#101828]">
                Travel<span className="text-[#E44848]">Trucks</span>
              </Link>
              <nav className="flex space-x-8">
                <Link href="/" className="text-sm font-medium text-[#101828] hover:text-[#E44848] transition-colors">
                  Home
                </Link>
                <Link href="/catalog" className="text-sm font-medium text-[#101828] hover:text-[#E44848] transition-colors">
                  Catalog
                </Link>
              </nav>
              <div className="w-20"></div>
            </div>
          </header>
          <main>{children}</main>
        </QueryProvider>
      </body>
    </html>
  );
}