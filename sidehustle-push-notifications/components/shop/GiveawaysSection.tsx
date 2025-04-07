export default function GiveawaysSection() {
  return (
    <div className="max-w-6xl mx-auto mt-16">
      <div className="relative p-8 sm:p-10 bg-black/80 rounded-xl overflow-hidden border border-white/10 shadow-lg holographic-card">
        {/* Animated border effect */}
        <div className="absolute inset-0 bg-gradient-to-r from-bar-accent/5 via-transparent to-bar-accent/5 animate-gradient-x"></div>
        <div className="absolute inset-0 bg-[radial-gradient(circle_at_50%_50%,rgba(255,255,255,0.1),transparent_50%)] animate-pulse-slow"></div>
        <div className="absolute top-0 left-0 w-full h-[1px] bg-gradient-to-r from-transparent via-bar-accent to-transparent"></div>
        <div className="absolute bottom-0 left-0 w-full h-[1px] bg-gradient-to-r from-transparent via-bar-accent to-transparent"></div>
        
        <div className="relative">
          {/* Header section with glowing effect */}
          <div className="text-center mb-8">
            <h2 className="text-4xl font-extrabold tracking-tight relative inline-block">
              <span className="absolute -inset-1 bg-bar-accent/20 blur-sm rounded-lg"></span>
              <span className="relative text-bar-accent">SIDE HUSTLE DROPPDX</span>
            </h2>
            <div className="w-24 h-1 bg-gradient-to-r from-bar-accent to-transparent rounded-full mx-auto mt-4"></div>
          </div>
          
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 mb-6">
            {giveawayItems.map((item, index) => (
              <div key={index} className="flex items-start gap-3 bg-black/40 p-3 rounded-lg border border-white/10 hover:bg-gradient-to-r hover:from-bar-accent/10 hover:to-transparent transition-all duration-300 transform hover:scale-[1.03] holographic-mini">
                <span className="text-bar-accent mt-1 bg-black/30 p-1.5 rounded-lg shadow-inner">{item.icon}</span>
                <div>
                  <p className="text-sm font-bold text-white">{item.title}</p>
                  <p className="text-xs text-white/70">{item.description}</p>
                </div>
              </div>
            ))}
          </div>
          
          {/* Consistent CTA button */}
          <button 
            className="w-full bg-gradient-to-r from-bar-accent via-bar-accent/90 to-bar-accent px-8 py-4 rounded-lg font-bold text-lg text-black hover:brightness-110 transition-all duration-300 flex items-center justify-center gap-3 shadow-xl transform hover:scale-[1.03] animate-pulse-subtle"
          >
            <span>SHOP NOW</span>
            <svg className="w-5 h-5 animate-bounce-subtle" fill="none" viewBox="0 0 24 24" stroke="currentColor">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17 8l4 4m0 0l-4 4m4-4H3" />
            </svg>
          </button>
        </div>
      </div>
    </div>
  );
}

const giveawayItems = [
  {
    icon: "🎭",
    title: "Artist Meet & Greets",
    description: "VIP backstage access"
  },
  {
    icon: "🍽️",
    title: "VIP Dining",
    description: "Premium dining experience"
  },
  {
    icon: "🎟️",
    title: "Event Access",
    description: "Exclusive VIP seating"
  },
  {
    icon: "🎧",
    title: "Nightclub Experience",
    description: "VIP nightclub access"
  },
  {
    icon: "🥊",
    title: "UFC Fight Nights",
    description: "Premium boxing & UFC viewing"
  },
  {
    icon: "🌟",
    title: "Big Events",
    description: "Priority tickets to major events"
  }
]; 