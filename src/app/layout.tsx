import type { Metadata } from "next";
import { Geist, Geist_Mono } from "next/font/google";
import { Playfair_Display } from "next/font/google";
import "./globals.css";
import { Toaster } from "@/components/ui/toaster";

const geistSans = Geist({
  variable: "--font-geist-sans",
  subsets: ["latin"],
});

const geistMono = Geist_Mono({
  variable: "--font-geist-mono",
  subsets: ["latin"],
});

const playfairDisplay = Playfair_Display({
  variable: "--font-playfair",
  subsets: ["latin"],
  style: ["italic"],
});

export const metadata: Metadata = {
  title: "Enginest — Engineering Innovation Platform",
  description: "Find problems worth solving. Enginest curates real-world engineering challenges and matches them to your skills using AI.",
  keywords: ["Enginest", "engineering", "innovation", "problem solving", "AI", "challenges"],
  authors: [{ name: "Enginest" }],
  icons: {
    icon: "https://z-cdn.chatglm.cn/z-ai/static/logo.svg",
  },
  openGraph: {
    title: "Enginest — Engineering Innovation Platform",
    description: "Find problems worth solving with curated challenges and AI matching.",
    url: "https://enginest.dev",
    siteName: "Enginest",
    type: "website",
  },
  twitter: {
    card: "summary_large_image",
    title: "Enginest — Engineering Innovation Platform",
    description: "Find problems worth solving with curated challenges and AI matching.",
  },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en" suppressHydrationWarning>
      <body
        className={`${geistSans.variable} ${geistMono.variable} ${playfairDisplay.variable} antialiased bg-background text-foreground`}
      >
        {children}
        <Toaster />
      </body>
    </html>
  );
}
