import type { Metadata } from "next";
import { Inter } from "next/font/google";
import "./globals.css";
import { Toaster } from "@/components/ui/sonner";

const inter = Inter({ subsets: ["latin"] });

export const metadata: Metadata = {
  title: "Firebase Cloud Messaging Demo",
  description: "A demo application for Firebase Cloud Messaging with Next.js",
  manifest: "/manifest.json",
  icons: {
    icon: [
      { url: "/icons_folder/icon16.png", sizes: "16x16", type: "image/png" },
      { url: "/icons_folder/icon32.png", sizes: "32x32", type: "image/png" },
      { url: "/icons_folder/icon-192.png", sizes: "192x192", type: "image/png" },
      { url: "/icons_folder/icon-512.png", sizes: "512x512", type: "image/png" },
    ],
    apple: [
      { url: "/icons_folder/icon-180.png", sizes: "180x180", type: "image/png" },
      { url: "/icons_folder/touch-icon-iphone.png", sizes: "180x180", type: "image/png" },
    ],
    other: [
      {
        rel: "apple-touch-icon-precomposed",
        url: "/icons_folder/touch-icon-iphone.png",
      },
    ],
  },
  appleWebApp: {
    capable: true,
    statusBarStyle: "default",
    title: "FCM Demo",
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
      <body className={inter.className}>
        <Toaster />

        {children}
      </body>
    </html>
  );
}
