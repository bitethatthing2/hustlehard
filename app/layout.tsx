import type { Metadata } from "next";
import { Inter } from "next/font/google";
import "./globals.css";
import { Toaster } from "@/components/ui/sonner";
import Script from "next/script";

const inter = Inter({ subsets: ["latin"] });

export const metadata: Metadata = {
  title: "The Side Hustle Bar",
  description: "Get notified about the latest side hustle opportunities",
  manifest: "/manifest.json",
  icons: {
    icon: [
      { url: "/only_these/favicon-16x16.png", sizes: "16x16", type: "image/png" },
      { url: "/only_these/favicon-32x32.png", sizes: "32x32", type: "image/png" },
      { url: "/only_these/android-icon-192x192.png", sizes: "192x192", type: "image/png" },
      { url: "/only_these/ms-icon-310x310.png", sizes: "310x310", type: "image/png" },
    ],
    apple: [
      { url: "/only_these/apple-icon-180x180.png", sizes: "180x180", type: "image/png" },
      { url: "/only_these/apple-icon.png", sizes: "180x180", type: "image/png" },
    ],
    other: [
      {
        rel: "apple-touch-icon-precomposed",
        url: "/only_these/apple-icon-precomposed.png",
      },
    ],
  },
  appleWebApp: {
    capable: true,
    statusBarStyle: "default",
    title: "Side Hustle",
  },
  viewport: {
    width: "device-width",
    initialScale: 1,
    maximumScale: 1,
  },
  themeColor: "#000000",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <head>
        {/* Load environment variables before any other scripts */}
        <Script src="/env-config.js" strategy="beforeInteractive" />
      </head>
      <body className={inter.className}>
        <Toaster />

        {children}
      </body>
    </html>
  );
}
