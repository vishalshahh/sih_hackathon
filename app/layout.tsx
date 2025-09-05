import type { Metadata } from "next";
import localFont from "next/font/local";
import "./globals.css";

const geistSans = localFont({
  src: "./fonts/GeistVF.woff",
  variable: "--font-geist-sans",
  weight: "100 900",
});
const geistMono = localFont({
  src: "./fonts/GeistMonoVF.woff",
  variable: "--font-geist-mono",
  weight: "100 900",
});

export const metadata: Metadata = {
  title: "HealthBot - AI-Powered Healthcare Assistant",
  description: "Professional healthcare assistance powered by AI. Get real-time health information, drug data, and connect with healthcare providers.",
  keywords: ["healthcare", "AI", "medical assistant", "drug information", "health data"],
  authors: [{ name: "SIH Hackathon Team" }],
  creator: "SIH Hackathon Team",
  publisher: "HealthBot",
  formatDetection: {
    email: false,
    address: false,
    telephone: false,
  },
  metadataBase: new URL("https://healthbot-sih.vercel.app"),
  openGraph: {
    title: "HealthBot - AI-Powered Healthcare Assistant",
    description: "Professional healthcare assistance powered by AI",
    url: "https://healthbot-sih.vercel.app",
    siteName: "HealthBot",
    locale: "en_US",
    type: "website",
  },
  twitter: {
    card: "summary_large_image",
    title: "HealthBot - AI-Powered Healthcare Assistant",
    description: "Professional healthcare assistance powered by AI",
  },
  robots: {
    index: true,
    follow: true,
    googleBot: {
      index: true,
      follow: true,
      "max-video-preview": -1,
      "max-image-preview": "large",
      "max-snippet": -1,
    },
  },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en" suppressHydrationWarning className="scroll-smooth">
      <body
        className={`${geistSans.variable} ${geistMono.variable} antialiased`}
        suppressHydrationWarning
      >
        {children}
      </body>
    </html>
  );
}
