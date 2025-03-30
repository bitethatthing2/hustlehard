import { NextResponse } from 'next/server'
import type { NextRequest } from 'next/server'

export function middleware(request: NextRequest) {
  // Get the existing response headers
  const response = NextResponse.next()

  // Add CSP header
  const cspHeader = `
    default-src 'self';
    script-src 'self' 'unsafe-inline' 'unsafe-eval' https://static.elfsight.com https://core.service.elfsight.com;
    style-src 'self' 'unsafe-inline' https://fonts.googleapis.com;
    img-src 'self' data: https://lh3.googleusercontent.com https://scontent.cdninstagram.com;
    font-src 'self' https://fonts.gstatic.com;
    media-src 'self' https://video.wixstatic.com;
    connect-src 'self' https://static.elfsight.com https://lh3.googleusercontent.com https://scontent.cdninstagram.com https://core.service.elfsight.com;
    frame-src 'self' https://static.elfsight.com https://core.service.elfsight.com;
    object-src 'none';
    base-uri 'self';
  `.replace(/\s+/g, ' ').trim()

  // Set security headers
  response.headers.set('Content-Security-Policy', cspHeader)
  response.headers.set('X-Content-Type-Options', 'nosniff')
  response.headers.set('X-Frame-Options', 'DENY')
  response.headers.set('X-XSS-Protection', '1; mode=block')
  response.headers.set('Referrer-Policy', 'no-referrer-when-downgrade')

  return response
}

// Specify which paths this middleware will run on
export const config = {
  matcher: [
    /*
     * Match all request paths except:
     * 1. /api/ (API routes)
     * 2. /_next/ (Next.js internals)
     * 3. /_static (inside /public)
     * 4. /_vercel (Vercel internals)
     * 5. /favicon.ico, /sitemap.xml (static files)
     */
    '/((?!api|_next|_static|_vercel|favicon.ico|sitemap.xml).*)',
  ],
} 