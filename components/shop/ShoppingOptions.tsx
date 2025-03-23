export default function ShoppingOptions() {
  return (
    <div className="pt-6 border-t border-white/20">
      <div className="space-y-4">
        <button 
          className="w-full bg-gradient-to-r from-bar-accent via-bar-accent/90 to-bar-accent px-8 py-4 rounded-lg font-extrabold text-lg text-black hover:brightness-110 transition-all duration-300 flex items-center justify-center gap-3 shadow-xl transform hover:scale-[1.03] animate-pulse-subtle"
        >
          <span className="text-xl">🐺</span>
          <span>BE A WOLF</span>
          <svg className="w-5 h-5 animate-bounce-subtle" fill="none" viewBox="0 0 24 24" stroke="currentColor">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17 8l4 4m0 0l-4 4m4-4H3" />
          </svg>
        </button>
        
        <div className="flex items-center justify-between p-4 rounded-lg bg-gradient-to-r from-black/60 to-bar-accent/5 border border-white/10 holographic-mini">
          <p className="text-white font-medium">Quantity:</p>
          <div className="flex items-center border border-white/10 rounded bg-black/50">
            <button className="px-3 py-1 text-xl hover:bg-bar-accent/10 transition-colors text-bar-accent">-</button>
            <span className="w-10 text-center">1</span>
            <button className="px-3 py-1 text-xl hover:bg-bar-accent/10 transition-colors text-bar-accent">+</button>
          </div>
        </div>
        
        <div className="grid grid-cols-2 gap-3">
          <button 
            className="bg-black/50 border border-white/10 text-white px-4 py-3 rounded-lg font-bold hover:bg-bar-accent/10 transition-all duration-300 flex items-center justify-center gap-2 holographic-mini"
          >
            <span>Add to Cart</span>
            <svg className="w-5 h-5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M16 11V7a4 4 0 00-8 0v4M5 9h14l1 12H4L5 9z" />
            </svg>
          </button>
          
          <button 
            className="bg-black/50 border border-white/10 text-white px-4 py-3 rounded-lg font-bold hover:bg-bar-accent/10 transition-all duration-300 flex items-center justify-center gap-2 holographic-mini"
          >
            <span>Wishlist</span>
            <svg className="w-5 h-5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4.318 6.318a4.5 4.5 0 000 6.364L12 20.364l7.682-7.682a4.5 4.5 0 00-6.364-6.364L12 7.636l-1.318-1.318a4.5 4.5 0 00-6.364 0z" />
            </svg>
          </button>
        </div>
        
        <div className="flex items-center justify-center gap-2 text-sm text-white/60 mt-4">
          <svg className="w-4 h-4" fill="none" viewBox="0 0 24 24" stroke="currentColor">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 15v2m-6 4h12a2 2 0 002-2v-6a2 2 0 00-2-2H6a2 2 0 00-2 2v6a2 2 0 002 2zm10-10V7a4 4 0 00-8 0v4h8z" />
          </svg>
          <span>Secure checkout</span>
        </div>
      </div>
    </div>
  );
} 