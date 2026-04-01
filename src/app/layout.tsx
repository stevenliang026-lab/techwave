import type { Metadata } from "next";
import { Inter } from "next/font/google";
import "./globals.css";

const inter = Inter({ subsets: ["latin"] });

export const metadata: Metadata = {
  title: "TechWave - AI-Powered Business Solutions",
  description: "Transform your business with cutting-edge AI and cloud solutions.",
};

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="en" className={`${inter.className} scroll-smooth`}>
      <body className="bg-[#fafaf8] text-[#111] antialiased">{children}</body>
    </html>
  );
}
