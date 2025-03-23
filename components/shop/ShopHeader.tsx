import Link from 'next/link';

export default function ShopHeader() {
  return (
    <div className="w-full max-w-4xl mx-auto mb-12">
      <Link 
        href="/"
        className="inline-flex items-center gap-2 px-4 py-2 rounded-lg bg-black/60 backdrop-blur-sm border border-white/10 text-bar-accent hover:text-bar-accent/80 hover:bg-bar-accent/10 hover:border-bar-accent/50 transition-all duration-300 mb-6"
      >
        <svg className="w-5 h-5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M10 19l-7-7m0 0l7-7m-7 7h18" />
        </svg>
        <span>Back to Home</span>
      </Link>
      
      <div className="text-center backdrop-blur-lg p-8 rounded-lg border border-white/10 bg-black/70 relative">
        <div className="absolute inset-0 bg-gradient-to-r from-bar-accent/5 via-transparent to-bar-accent/5 animate-gradient-x"></div>
        <div className="absolute inset-0 bg-[radial-gradient(circle_at_50%_50%,rgba(255,255,255,0.1),transparent_50%)] animate-pulse-slow"></div>
        
        <div className="relative z-10">
          <h1 className="text-4xl sm:text-5xl md:text-6xl font-extrabold tracking-tight mb-4">
            <span className="relative">
              <span className="absolute -inset-2 bg-bar-accent/20 blur-xl rounded-lg"></span>
              <span className="relative text-bar-accent bg-clip-text text-transparent bg-gradient-to-r from-bar-accent to-bar-accent/80">
                SIDE HUSTLE SHOP
              </span>
            </span>
          </h1>
          
          <div className="space-y-3 text-lg md:text-xl text-white/90">
            <p className="font-medium">Premium Streetwear • Limited Editions • Exclusive Designs</p>
            <p className="text-bar-accent font-bold">Featuring DROPPDX Collection</p>
            <p className="text-white/60 text-base italic">Hand-numbered with Certificate of Authenticity</p>
          </div>

          <div className="mt-8 flex items-center justify-center gap-2 text-base text-white/80">
            <svg className="w-5 h-5 text-bar-accent" fill="none" viewBox="0 0 24 24" stroke="currentColor">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 6h16M4 12h16M4 18h16" />
            </svg>
            <span>Access all features via the menu button</span>
          </div>
        </div>
      </div>
    </div>
  );
} 