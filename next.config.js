/** @type {import('next').NextConfig} */
const nextConfig = {
  // Add allowedDevOrigins configuration for future Next.js compatibility
  allowedDevOrigins: ['127.0.0.1', '10.0.0.243'],
  
  async headers() {
    return [
      {
        source: '/:path*',
        headers: [
          {
            key: 'Content-Security-Policy',
            value: `
              default-src 'self';
              script-src 'self' 'unsafe-inline' 'unsafe-eval' *.elfsight.com *.elfsightcdn.com *.service.elfsight.com static.elfsight.com apps.elfsight.com universe-static.elfsightcdn.com *.googleapis.com www.google.com maps.googleapis.com;
              style-src 'self' 'unsafe-inline' fonts.googleapis.com *.elfsight.com *.elfsightcdn.com *.service.elfsight.com;
              img-src 'self' data: blob: *.elfsight.com *.elfsightcdn.com *.cdninstagram.com phosphor.utils.elfsightcdn.com *.service.elfsight.com *.instagram.com maps.googleapis.com *.google.com *.gstatic.com lh3.googleusercontent.com *.ggpht.com *.googleusercontent.com localhost:3000 localhost:3001 localhost:3002 localhost:* http://localhost:*;
              font-src 'self' data: fonts.gstatic.com *.elfsight.com *.elfsightcdn.com;
              frame-src 'self' www.google.com accounts.google.com *.elfsight.com apps.elfsight.com core.service.elfsight.com widget-data.service.elfsight.com *.doubleclick.net;
              media-src 'self' blob: *.cdninstagram.com *.elfsight.com *.elfsightcdn.com;
              connect-src 'self' wss: ws: *.googleapis.com *.google.com core.service.elfsight.com search.service.elfsight.com widget-data.service.elfsight.com *.service.elfsight.com service-reviews-ultimate.elfsight.com facade.service.elfsight.com facade-api.service.elfsight.com facade-cdn.service.elfsight.com api.instagram.com graph.instagram.com scontent.cdninstagram.com maps.googleapis.com firestore.googleapis.com fcmregistrations.googleapis.com places.googleapis.com localhost:3000 localhost:3001 localhost:3002 localhost:* http://localhost:*;
              worker-src 'self' blob:;
            `.replace(/\s+/g, ' ').trim()
          }
        ]
      }
    ];
  }
};

module.exports = nextConfig;
