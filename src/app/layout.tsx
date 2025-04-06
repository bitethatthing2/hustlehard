import type { Metadata } from "next";
import { Inter as FontSans } from "next/font/google";
import Script from "next/script"; // Import Script component
import "./globals.css";
import { cn } from "@/lib/utils";
import { ThemeProvider } from "@/contexts/theme-context"; // Corrected import path
import { LocationProvider } from "@/contexts/LocationContext"; // Import LocationProvider

const fontSans = FontSans({
  subsets: ["latin"],
  variable: "--font-sans",
});

export const metadata: Metadata = {
  title: "Hustle Hard",
  description: "High-Energy Sports Bar • Restaurant • Nightclub",
  // Add manifest and theme color to metadata for better integration if desired,
  // but explicitly putting them in <head> is crucial for PWA detection.
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en" suppressHydrationWarning>
      <head>
        <link rel="manifest" href="/manifest.json" />
        <meta name="theme-color" content="#000000" />
        <meta name="apple-mobile-web-app-capable" content="yes" />
        <meta name="apple-mobile-web-app-status-bar-style" content="default" />
        <meta name="apple-mobile-web-app-title" content="Hustle Hard" />
        <link rel="apple-touch-icon" href="/icons/icons/icon-192x192.png" />
        <link rel="icon" href="/favicon.ico" sizes="any" />
      </head>
      <body
        className={cn(
          "min-h-screen bg-background font-sans antialiased",
          fontSans.variable
        )}
      >
        <ThemeProvider
          attribute="class"
          defaultTheme="dark" 
          enableSystem={false} // Disable system theme detection
          disableTransitionOnChange
        >
          {/* Wrap children with LocationProvider */}
          <LocationProvider>
            {children} 
          </LocationProvider>
        </ThemeProvider>
        {/* Add Elfsight Platform Script */}
        <Script src="https://static.elfsight.com/platform/platform.js" strategy="lazyOnload" />
      </body>
    </html>
  );
}
