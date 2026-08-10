import type { Metadata, Viewport } from "next";

const title = "Will You Go on a Date With Me?";
const description =
  "A playful romantic website with floating hearts, confetti, smooth animations, and a sweet WhatsApp call to action.";

export const siteMetadata: Metadata = {
  metadataBase: new URL("https://example.com"),
  title,
  description,
  applicationName: "Romantic Date Website",
  keywords: [
    "romantic website",
    "date invitation",
    "next.js",
    "interactive love page",
    "cute website"
  ],
  openGraph: {
    title,
    description,
    type: "website",
    locale: "en_US",
    siteName: "Romantic Date Website"
  },
  twitter: {
    card: "summary_large_image",
    title,
    description
  }
};

export const siteViewport: Viewport = {
  themeColor: [
    { media: "(prefers-color-scheme: light)", color: "#fff6fb" },
    { media: "(prefers-color-scheme: dark)", color: "#140d1c" }
  ],
  colorScheme: "light dark"
};
