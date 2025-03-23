export default function ProductInfo() {
  return (
    <div className="w-full max-w-2xl mx-auto mb-12">
      <div className="backdrop-blur-lg p-8 rounded-lg border border-white/10 bg-black/70 holographic-card">
        {/* Price display */}
        <div className="flex items-center justify-center gap-3 mb-8">
          <span className="text-4xl font-extrabold text-white">$79.99</span>
          <span className="text-bar-accent font-medium">USD</span>
        </div>
        
        {/* Size Selection */}
        <div className="mb-8">
          <p className="text-lg font-medium text-white/90 text-center mb-3">Select Size</p>
          <div className="grid grid-cols-4 gap-3">
            <button className="px-4 py-3 border-2 border-white/20 rounded-lg hover:border-bar-accent hover:bg-bar-accent/10 transition-all text-white/80 hover:text-white font-medium">S</button>
            <button className="px-4 py-3 border-2 border-white/20 rounded-lg hover:border-bar-accent hover:bg-bar-accent/10 transition-all text-white/80 hover:text-white font-medium">M</button>
            <button className="px-4 py-3 border-2 border-bar-accent bg-bar-accent/10 rounded-lg text-white font-bold">L</button>
            <button className="px-4 py-3 border-2 border-white/20 rounded-lg hover:border-bar-accent hover:bg-bar-accent/10 transition-all text-white/80 hover:text-white font-medium">XL</button>
          </div>
        </div>
        
        {/* BE A WOLF button */}
        <button 
          className="w-full bg-gradient-to-r from-bar-accent via-bar-accent/90 to-bar-accent px-8 py-5 rounded-lg font-extrabold text-2xl text-black hover:brightness-110 transition-all duration-300 flex items-center justify-center gap-3 shadow-xl transform hover:scale-[1.02]"
        >
          <span className="text-2xl">🐺</span>
          <span>BE A WOLF</span>
          <svg className="w-6 h-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17 8l4 4m0 0l-4 4m4-4H3" />
          </svg>
        </button>
        
        {/* Secure checkout indicator */}
        <div className="flex items-center justify-center gap-2 mt-4 text-white/60">
          <svg className="w-4 h-4" fill="none" viewBox="0 0 24 24" stroke="currentColor">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 15v2m-6 4h12a2 2 0 002-2v-6a2 2 0 00-2-2H6a2 2 0 00-2 2v6a2 2 0 002 2zm10-10V7a4 4 0 00-8 0v4h8z" />
          </svg>
          <span>Secure checkout</span>
        </div>
      </div>
    </div>
  );
} 