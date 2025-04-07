/** @type {import('next').NextConfig} */
const nextConfig = {
  async headers() {
    return [
      {
        source: '/:path*',
        headers: [
          {
            key: 'Content-Security-Policy',
            value: `
              default-src 'self';
              script-src 'self' 'unsafe-inline' 'unsafe-eval' https://www.google.com https://maps.googleapis.com;
              style-src 'self' 'unsafe-inline';
              img-src 'self' data: https://maps.googleapis.com https://*.google.com https://*.gstatic.com;
              frame-src 'self' https://www.google.com;
              connect-src 'self' https://*.googleapis.com;
            `.replace(/\s+/g, ' ').trim()
          }
        ]
      }
    ];
  }
};

module.exports = nextConfig;
