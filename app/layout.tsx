import type { ReactNode } from "react";
import { Cormorant_Garamond, Manrope } from "next/font/google";

import { CursorTrail } from "@/components/CursorTrail";
import { HeartBackground } from "@/components/HeartBackground";
import { MusicPlayer } from "@/components/MusicPlayer";
import { siteMetadata, siteViewport } from "@/lib/metadata";

import "./globals.css";

const displayFont = Cormorant_Garamond({
  subsets: ["latin"],
  variable: "--font-display",
  weight: ["500", "600", "700"]
});

const bodyFont = Manrope({
  subsets: ["latin"],
  variable: "--font-body",
  weight: ["400", "500", "600", "700"]
});

export const metadata = siteMetadata;
export const viewport = siteViewport;

type RootLayoutProps = {
  children: ReactNode;
};

export default function RootLayout({ children }: RootLayoutProps) {
  return (
    <html
      lang="en"
      suppressHydrationWarning
      className={`${displayFont.variable} ${bodyFont.variable}`}
    >
      <body className="min-h-screen overflow-x-hidden bg-[var(--background)] font-[family-name:var(--font-body)] text-[var(--foreground)] antialiased">
        <div className="fixed inset-0 -z-10">
          <HeartBackground />
        </div>

        <CursorTrail />
        <MusicPlayer />
        {children}
      </body>
    </html>
  );
}
