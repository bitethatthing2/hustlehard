import type { NextConfig } from "next";
import withPWAInit from "@ducanh2912/next-pwa";

// Prepare Firebase config from environment variables available at build time
const firebaseConfig = JSON.stringify({
  apiKey: process.env.NEXT_PUBLIC_FIREBASE_API_KEY,
  authDomain: process.env.NEXT_PUBLIC_FIREBASE_AUTH_DOMAIN,
  projectId: process.env.NEXT_PUBLIC_FIREBASE_PROJECT_ID,
  storageBucket: process.env.NEXT_PUBLIC_FIREBASE_STORAGE_BUCKET,
  messagingSenderId: process.env.NEXT_PUBLIC_FIREBASE_MESSAGING_SENDER_ID,
  appId: process.env.NEXT_PUBLIC_FIREBASE_APP_ID,
  measurementId: process.env.NEXT_PUBLIC_FIREBASE_MEASUREMENT_ID,
}).replace(/"/g, '\"'); // Escape quotes for injection

const withPWA = withPWAInit({
  dest: "public",
  // disable: process.env.NODE_ENV === "development",
  cacheOnFrontEndNav: true,
  aggressiveFrontEndNavCaching: true,
  reloadOnOnline: true,
  workboxOptions: {
    disableDevLogs: true,
    // Import the Firebase messaging SW and inject config
    importScripts: [ '/firebase-messaging-sw.js' ],
    // Define a global variable within the SW scope with the Firebase config
    // Note: Workbox recipes might offer cleaner ways, but this is explicit
    additionalManifestEntries: [
      { url: '/firebase-config', revision: null } // Dummy entry sometimes needed
    ],
    // Directly inject code to define the config
    // This assumes workbox-webpack-plugin v6+ structure
    // Might need adjustment based on the exact version used by next-pwa
    // A safer way might be to modify the generated sw.js post-build if this fails
    swDest: 'public/sw.js',
    // Modify the generated sw.js to include the config
    // We use runtimeCaching to inject code via a handler (a bit hacky but works)
    runtimeCaching: [
      {
        // Inject the config at the top of the SW
        urlPattern: ({ url }) => url.pathname === '/__inject_firebase_config__',
        handler: 'NetworkOnly', // This handler won't actually be used
        options: {
          precacheFallback: {
            fallbackURL: '/', // Needed for the plugin structure
          },
          // Inject the config string here
          plugins: [
            {
              handlerWillStart: async () => {
                // This code gets injected into the service worker
                // Define the global variable __FIREBASE_CONFIG__
                // Use (self as any) to bypass TypeScript check in this context
                (self as any).__FIREBASE_CONFIG__ = JSON.parse("${firebaseConfig}");
                console.log('[SW Config Injector] Injected __FIREBASE_CONFIG__');
                return null; // Return null to indicate no response modification
              }
            }
          ]
        }
      },
      // Add other runtime caching rules as needed here
      // Example: Cache Google Fonts
      {
        urlPattern: /^https:\/\/fonts\.googleapis\.com\/.*/i,
        handler: 'CacheFirst',
        options: {
          cacheName: 'google-fonts-stylesheets',
          expiration: {
            maxEntries: 10,
            maxAgeSeconds: 60 * 60 * 24 * 30, // 30 days
          },
        },
      },
      {
        urlPattern: /^https:\/\/fonts\.gstatic\.com\/.*/i,
        handler: 'CacheFirst',
        options: {
          cacheName: 'google-fonts-webfonts',
          expiration: {
            maxEntries: 10,
            maxAgeSeconds: 60 * 60 * 24 * 365, // 1 year
          },
        },
      },
    ]
  },
});

const nextConfig: NextConfig = {
  reactStrictMode: true,
  swcMinify: true,
  images: {
    remotePatterns: [
      {
        protocol: 'https',
        hostname: 'lh3.googleusercontent.com',
      },
      {
        protocol: 'https',
        hostname: 'maps.googleapis.com',
      },
      {
        protocol: 'https',
        hostname: 'scontent.cdninstagram.com',
      },
    ],
    dangerouslyAllowSVG: true,
    // Consider if unoptimized: true is really needed. It disables Next.js image optimization.
    // Generally, it's better to keep optimization enabled unless there's a specific reason.
    // unoptimized: true,
  },
  async headers() {
    return [
      {
        source: '/(.*)',
        headers: [
          {
            key: 'Content-Security-Policy',
            // Combined and cleaned CSP from next.config.mjs
            value: `
              default-src 'self'; 
              script-src 'self' 'unsafe-inline' 'unsafe-eval' https://static.elfsight.com https://unpkg.com https://apps.elfsight.com https://cdnjs.cloudflare.com https://apis.google.com https://www.googletagmanager.com https://www.google-analytics.com https://ssl.google-analytics.com https://*.firebaseio.com https://*.googleapis.com https://cdn.jsdelivr.net https://universe-static.elfsightcdn.com https://*.elfsightcdn.com https://*.service.elfsight.com; 
              style-src 'self' 'unsafe-inline' https://fonts.googleapis.com https://apps.elfsight.com https://*.elfsightcdn.com; 
              img-src 'self' blob: data: https://lh3.googleusercontent.com https://maps.googleapis.com https://maps.gstatic.com https://scontent.cdninstagram.com https://www.google-analytics.com https://www.googletagmanager.com https://*.googleapis.com https://*.gstatic.com https://*.google.com https://*.cdninstagram.com https://*.fbcdn.net; 
              font-src 'self' https://fonts.gstatic.com https://apps.elfsight.com https://*.elfsightcdn.com; 
              connect-src 'self' https://fcmregistrations.googleapis.com https://firestore.googleapis.com https://identitytoolkit.googleapis.com https://*.firebaseio.com https://securetoken.googleapis.com https://www.googleapis.com https://maps.googleapis.com https://api.instagram.com https://graph.instagram.com https://*.google-analytics.com https://*.analytics.google.com https://*.googleapis.com https://*.supabase.co https://*.service.elfsight.com https://widget-data.service.elfsight.com https://core.service.elfsight.com https://scontent.cdninstagram.com; 
              media-src 'self'; 
              frame-src 'self' https://apps.elfsight.com https://shop.sidehustlebar.com https://www.google.com/maps/ https://*.google.com; 
              worker-src 'self' blob:; 
              manifest-src 'self';
            `.replace(/\s{2,}/g, ' ').trim(),
          },
          {
            key: 'Referrer-Policy',
            value: 'origin-when-cross-origin',
          },
          {
            key: 'X-Frame-Options',
            value: 'DENY',
          },
          {
            key: 'X-Content-Type-Options',
            value: 'nosniff',
          },
          {
            key: 'X-DNS-Prefetch-Control',
            value: 'on',
          },
          {
            key: 'Strict-Transport-Security',
            value: 'max-age=31536000; includeSubDomains',
          },
          {
            key: 'Permissions-Policy',
            value: 'camera=(), microphone=(), geolocation=(self), interest-cohort=()',
          },
        ],
      },
    ];
  },
  webpack: (config, { isServer }) => {
    // Fix for commonjs modules needing fs/path on client-side build
    if (!isServer) {
        config.resolve.fallback = { fs: false, path: false };
    }
    return config;
  },
};

export default withPWA(nextConfig);
