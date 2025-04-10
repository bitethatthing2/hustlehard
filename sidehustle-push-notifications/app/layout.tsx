import type { Metadata, Viewport } from "next";
import { Inter } from "next/font/google";
import "./globals.css";
import { Toaster } from "@/components/ui/toaster";
import Script from "next/script";
import MainMenuButton from "@/components/navigation/MainMenuButton";
import QuickNav from "@/components/navigation/QuickNav";
import Image from "next/image";
import { ThemeProvider } from "@/app/providers";
import { LocationProvider } from "@/contexts/LocationContext";
import DynamicFooter from "@/components/layout/DynamicFooter";
import { cn } from "@/lib/utils";

const inter = Inter({ subsets: ["latin"] });

export const viewport: Viewport = {
  width: "device-width",
  initialScale: 1,
  maximumScale: 1,
  themeColor: "#000000",
};

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
      { url: "/only_these/ios/apple-icon-180x180.png", sizes: "180x180", type: "image/png" },
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
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en" className="overflow-x-hidden" suppressHydrationWarning>
      <head>
        {/* Load environment variables before any other scripts */}
        <Script src="/env-config.js" strategy="beforeInteractive" />
        {/* Load tracking fix script early */}
        <Script src="/tracking-fix.js" strategy="beforeInteractive" />
        
        {/* Enhanced Elfsight Widget handling - using async for faster loading as recommended by Elfsight */}
        <Script 
          src="https://static.elfsight.com/platform/platform.js" 
          async
          strategy="beforeInteractive" 
          crossOrigin="anonymous"
        />
        
        {/* Load Android notification icon helper */}
        <Script src="/notification-icon.js" strategy="afterInteractive" />
        {/* Load PWA installation fix */}
        <Script src="/pwa-fix.js" strategy="afterInteractive" />
        
        {/* Script to handle Elfsight errors and loading globally */}
        <Script id="elfsight-error-handler" strategy="afterInteractive">
          {`
            // Global flag to track Elfsight platform loading
            window.elfsightLoaded = false;
            
            // Set up Elfsight loading handler
            window.addEventListener('load', function() {
              if (typeof window.eapps !== 'undefined') {
                window.elfsightLoaded = true;
                console.log('Elfsight platform loaded at page load');
              } else {
                console.warn('Elfsight platform not available at page load, will try init later');
              }
            });
            
            // Handle Elfsight platform script loading errors
            window.addEventListener('error', function(event) {
              if (event.target && event.target.src && event.target.src.includes('static.elfsight.com/platform/platform.js')) {
                console.warn('Elfsight platform script failed to load');
                window.elfsightLoadFailed = true;
              }
              
              // Handle Elfsight widget errors
              if (event.message && 
                  (event.message.includes('eapps.Platform') || 
                   event.message.includes('WIDGET_NOT_FOUND'))) {
                console.warn('Caught Elfsight error:', event.message);
                // Prevent the error from showing in console
                event.preventDefault();
              }
            });
          `}
        </Script>
        
        {/* Preconnect to external domains to improve performance */}
        <link rel="preconnect" href="https://static.elfsight.com" crossOrigin="anonymous" />
        <link rel="preconnect" href="https://core.service.elfsight.com" crossOrigin="anonymous" />
        <link rel="preconnect" href="https://universe-static.elfsightcdn.com" crossOrigin="anonymous" />
        <link rel="preconnect" href="https://widget-data.service.elfsight.com" crossOrigin="anonymous" />
        <link rel="preconnect" href="https://lh3.googleusercontent.com" crossOrigin="anonymous" />
        <link rel="preconnect" href="https://scontent.cdninstagram.com" crossOrigin="anonymous" />
        <link rel="preconnect" href="https://www.google.com" crossOrigin="anonymous" />
        <link rel="preconnect" href="https://maps.googleapis.com" crossOrigin="anonymous" />
        <link rel="preconnect" href="https://maps.gstatic.com" crossOrigin="anonymous" />
        
        {/* Preload critical assets with correct 'as' attribute */}
        <link 
          rel="preload" 
          href="/only_these/logos/logo.png" 
          as="image" 
          type="image/png"
        />
        
        {/* Add referrer policy to enable third-party content loading */}
        <meta name="referrer" content="no-referrer-when-downgrade" />
      </head>
      <body className={`${inter.className} bg-black min-h-screen overflow-x-hidden`}>
        <ThemeProvider>
          <LocationProvider>
            <header className="fixed top-0 left-0 right-0 z-50 bg-black/90 backdrop-blur-md border-b border-white/10">
              <div className="w-full max-w-7xl mx-auto px-4 py-3 sm:py-4 flex justify-between items-center">
                <div className="h-10 sm:h-12 w-auto flex items-center justify-center">
                  <Image
                    src="/only_these/logos/logo.png"
                    alt="Side Hustle Bar Logo"
                    width={80}
                    height={80}
                    className="object-contain h-full w-auto"
                    priority
                    unoptimized
                  />
                </div>
                {/* Display QuickNav on medium and larger screens */}
                <div className="hidden md:flex items-center justify-center">
                  <QuickNav />
                </div>
                {/* Keep MainMenuButton for mobile */}
                <div className="md:hidden flex items-center justify-center">
                  <MainMenuButton />
                </div>
              </div>
            </header>
            
            <main className="pt-16 sm:pt-20 w-full flex flex-col items-center overflow-hidden">
              <Toaster />
              {children}
            </main>
            
            {/* Dynamic Footer - works for all screen sizes */}
            <DynamicFooter />
          </LocationProvider>
        </ThemeProvider>
      </body>
    </html>
  );
}
