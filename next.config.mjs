/** @type {import('next').NextConfig} */
const nextConfig = {
  reactStrictMode: true,
  images: {
    domains: ['lh3.googleusercontent.com', 'maps.googleapis.com', 'scontent.cdninstagram.com'],
    unoptimized: true,
  },
  // Explicitly set experimental options
  experimental: {
    // Optimize for RSC
    appDir: true,
    serverComponents: true,
    serverActions: true,
    optimizeCss: true,
    optimizePackageImports: ['react-icons'],
  },
  // Add custom headers for performance
  async headers() {
    return [
      {
        source: '/(.*)',
        headers: [
          {
            key: 'Cache-Control',
            value: 'public, max-age=3600, stale-while-revalidate=86400',
          },
        ],
      },
      {
        source: '/only_these/(.*)',
        headers: [
          {
            key: 'Cache-Control',
            value: 'public, max-age=31536000, immutable',
          },
        ],
      },
    ];
  },
  webpack: (config, { isServer }) => {
    // Fix for commonjs modules
    config.resolve.fallback = { fs: false, path: false };
    
    // Add resolvers to help with RSC
    config.resolve.alias = {
      ...config.resolve.alias,
    };
    
    // Handle RSC URL scheme issues
    if (!isServer) {
      config.module.rules.push({
        test: /\.js$/,
        loader: 'string-replace-loader',
        options: {
          search: 'rsc://',
          replace: '/',
          flags: 'g',
        },
      });
    }
    
    return config;
  },
};

export default nextConfig; 