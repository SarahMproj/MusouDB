import type { Metadata } from "next";
import { Cormorant_Garamond, DM_Sans } from "next/font/google";
import "./globals.css";

const display = Cormorant_Garamond({ variable: "--font-display", subsets: ["latin"], weight: ["500", "600", "700"] });
const sans = DM_Sans({ variable: "--font-sans", subsets: ["latin"], weight: ["400", "500", "600", "700"] });

export const metadata: Metadata = {
  title: "MusouDB — The Open Musou Archive",
  description: "Explore the characters, games, weapons, and battlefields of the Warriors universe in a fan-built open archive.",
  keywords: ["Dynasty Warriors database", "Musou archive", "Three Kingdoms games", "Warriors characters"],
  robots: { index: true, follow: true },
  openGraph: { title: "MusouDB — The Open Musou Archive", description: "Every officer. Every battle. One chronicle.", type: "website" },
};

export default function RootLayout({ children }: Readonly<{ children: React.ReactNode }>) {
  return <html lang="en" suppressHydrationWarning><body className={`${display.variable} ${sans.variable}`}>{children}</body></html>;
}
