'use client';

import React, { useState } from 'react';
import Link from 'next/link';

export default function ShopPage() {
  const [isModelLoaded, setIsModelLoaded] = useState(false);
  const [showTooltip, setShowTooltip] = useState(true);

  const handleModelLoad = () => {
    setIsModelLoaded(true);
    setTimeout(() => setShowTooltip(false), 5000);
  };

  const handleModelError = () => {
    console.error('3D model failed to load');
    setIsModelLoaded(true);
  };

  return (
    <div className="min-h-screen bg-black text-white">
      {/* Background effects */}
      <div className="fixed inset-0 bg-black z-0 overflow-hidden">
        {/* Animated light beams */}
        <div className="absolute inset-0 opacity-15">
          <div className="absolute top-0 left-1/4 w-[1px] h-full bg-bar-accent/30 animate-pulse-slow"></div>
          <div className="absolute top-0 left-2/4 w-[1px] h-full bg-bar-accent/30 animate-pulse-slow delay-300"></div>
          <div className="absolute top-0 left-3/4 w-[1px] h-full bg-bar-accent/30 animate-pulse-slow delay-700"></div>
        </div>
      </div>

      <div className="relative z-10 container mx-auto px-4 pt-20 pb-12">
        {/* Header with back button */}
        <div className="flex flex-col items-center gap-4 mb-12">
          <Link 
            href="/"
            className="self-start text-bar-accent hover:text-bar-accent/80 transition-colors"
          >
            <svg className="w-6 h-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M10 19l-7-7m0 0l7-7m-7 7h18" />
            </svg>
          </Link>
          <div className="text-center mb-4">
            <h1 className="text-5xl sm:text-6xl font-bold tracking-tight mb-2 animate-fade-in">
              <span className="text-bar-accent">SIDE HUSTLE</span>
              <span className="text-white"> SHOP</span>
            </h1>
            <p className="text-white/60 max-w-2xl mx-auto animate-fade-in-delay">Exclusive merchandise for Side Hustle members. Premium quality, limited editions.</p>
          </div>
          <div className="w-24 h-1 bg-gradient-to-r from-bar-accent to-transparent rounded-full"></div>
        </div>

        {/* Main info section with holographic border like in HeroSection */}
        <div className="w-full max-w-2xl mx-auto mb-12">
          <div className="text-lg md:text-xl lg:text-2xl text-white font-medium mb-8 md:mb-10 mx-auto rounded-lg backdrop-blur-lg p-5 border border-white/10 bg-black/70 holographic-card shadow-lg">
            <p className="mb-3">Premium Merchandise • Limited Releases • Exclusive Designs</p>
            <p className="text-bar-accent font-semibold mb-1 relative inline-block">
              <span className="absolute -inset-1 bg-bar-accent/20 blur-sm rounded-lg"></span>
              <span className="relative">SIDE HUSTLE DROPPDX Collection</span>
            </p>
            <p className="text-sm md:text-base italic mb-6">Hand-numbered with Certificate of Authenticity</p>
            
            {/* Price display */}
            <div className="flex items-center justify-center gap-2 my-6 text-2xl md:text-3xl font-bold">
              <span className="text-white">$79.99</span>
              <span className="text-bar-accent/80 text-sm font-medium">USD</span>
            </div>
            
            {/* BE A WOLF button - new prominent styling */}
            <div className="mb-6">
              <button 
                className="w-full bg-gradient-to-r from-bar-accent via-bar-accent/90 to-bar-accent px-8 py-5 rounded-lg font-extrabold text-2xl text-black hover:brightness-110 transition-all duration-300 flex items-center justify-center gap-3 shadow-xl transform hover:scale-[1.03] animate-pulse-subtle"
              >
                <span className="text-xl md:text-3xl">🐺</span>
                <span>BE A WOLF</span>
                <svg className="w-6 h-6 animate-bounce-subtle" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17 8l4 4m0 0l-4 4m4-4H3" />
                </svg>
              </button>
              
              <div className="flex items-center justify-center gap-2 text-sm text-white/60 mt-3">
                <svg className="w-4 h-4" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 15v2m-6 4h12a2 2 0 002-2v-6a2 2 0 00-2-2H6a2 2 0 00-2 2v6a2 2 0 002 2zm10-10V7a4 4 0 00-8 0v4h8z" />
                </svg>
                <span>Secure checkout</span>
              </div>
            </div>
            
            {/* Quick actions */}
            <div className="flex flex-col sm:flex-row gap-4 mt-6">
              <button 
                className="flex-1 group bg-black/50 border border-white/10 px-6 py-3 rounded-lg font-bold text-white hover:bg-bar-accent/10 transition-all duration-300 flex items-center justify-center gap-2 holographic-mini"
              >
                <span>Add to Cart</span>
                <svg 
                  className="w-5 h-5" 
                  fill="none" 
                  viewBox="0 0 24 24" 
                  stroke="currentColor"
                >
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M16 11V7a4 4 0 00-8 0v4M5 9h14l1 12H4L5 9z" />
                </svg>
              </button>
              <button 
                className="flex-1 bg-black/50 border border-white/10 px-6 py-3 rounded-lg font-bold text-white hover:bg-bar-accent/10 transition-all duration-300 flex items-center justify-center gap-2 holographic-mini"
              >
                <span>Add to Wishlist</span>
                <svg className="w-5 h-5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4.318 6.318a4.5 4.5 0 000 6.364L12 20.364l7.682-7.682a4.5 4.5 0 00-6.364-6.364L12 7.636l-1.318-1.318a4.5 4.5 0 00-6.364 0z" />
                </svg>
              </button>
            </div>
            
            {/* Shopping Options */}
            <div className="mt-6 pt-6 border-t border-white/20">
              <div className="flex flex-col gap-4">
                {/* Size Selection */}
                <div className="bg-bar-accent/10 rounded-lg p-3 border border-white/10 holographic-mini">
                  <p className="text-base font-medium text-center mb-2">Choose Size</p>
                  <div className="grid grid-cols-4 gap-2">
                    <button className="px-4 py-2 border border-white/30 rounded hover:bg-bar-accent/10 hover:border-bar-accent/50 transition-colors">S</button>
                    <button className="px-4 py-2 border border-white/30 rounded hover:bg-bar-accent/10 hover:border-bar-accent/50 transition-colors">M</button>
                    <button className="px-4 py-2 bg-bar-accent/10 border border-bar-accent/50 rounded font-semibold">L</button>
                    <button className="px-4 py-2 border border-white/30 rounded hover:bg-bar-accent/10 hover:border-bar-accent/50 transition-colors">XL</button>
                  </div>
                </div>
                
                {/* Quantity */}
                <div className="flex items-center justify-between p-4 rounded-lg bg-gradient-to-r from-black/60 to-bar-accent/5 border border-white/10 holographic-mini">
                  <p className="text-white font-medium">Quantity:</p>
                  <div className="flex items-center border border-white/10 rounded bg-black/50">
                    <button className="px-3 py-1 text-xl hover:bg-bar-accent/10 transition-colors text-bar-accent">-</button>
                    <span className="w-10 text-center">1</span>
                    <button className="px-3 py-1 text-xl hover:bg-bar-accent/10 transition-colors text-bar-accent">+</button>
                  </div>
                </div>
              </div>
            </div>
            
            {/* Menu button hint */}
            <div className="flex items-center justify-center mt-6 text-base md:text-lg bg-bar-accent/10 rounded-lg p-3 border border-white/10 holographic-mini">
              <svg 
                className="w-6 h-6 mr-2 text-bar-accent animate-pulse-subtle"
                fill="none"
                viewBox="0 0 24 24"
                stroke="currentColor"
              >
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 6h16M4 12h16M4 18h16" />
              </svg>
              <span>Access all features via the menu button</span>
            </div>
          </div>
        </div>

        {/* Product Display - update to match VIP Merch Section in HeroSection */}
        <div className="max-w-6xl mx-auto">
          <div className="relative p-8 sm:p-10 bg-black/80 rounded-xl overflow-hidden border border-white/10 shadow-lg holographic-card">
            {/* Animated border effect */}
            <div className="absolute inset-0 bg-gradient-to-r from-bar-accent/5 via-transparent to-bar-accent/5 animate-gradient-x"></div>
            <div className="absolute inset-0 bg-[radial-gradient(circle_at_50%_50%,rgba(255,255,255,0.1),transparent_50%)] animate-pulse-slow"></div>
            <div className="absolute top-0 left-0 w-full h-[1px] bg-gradient-to-r from-transparent via-bar-accent to-transparent"></div>
            <div className="absolute bottom-0 left-0 w-full h-[1px] bg-gradient-to-r from-transparent via-bar-accent to-transparent"></div>
            
            <div className="relative grid grid-cols-1 lg:grid-cols-2 gap-12">
              {/* 3D Model Viewer */}
              <div className="relative group">
                <div className="aspect-square relative bg-gradient-to-br from-black/90 to-bar-accent/5 rounded-xl overflow-hidden backdrop-blur-sm transition-transform duration-300 group-hover:scale-[1.02] border border-bar-accent/10">
                  {!isModelLoaded && (
                    <div className="absolute inset-0 flex flex-col items-center justify-center bg-black/90 gap-2">
                      <div className="animate-spin rounded-full h-8 w-8 border-2 border-bar-accent border-t-transparent"></div>
                      <p className="text-white/70 text-sm">Loading Preview...</p>
                    </div>
                  )}
                  <spline-viewer 
                    url="https://prod.spline.design/Mh91AUmppB4ru-9h/scene.splinecode"
                    className="w-full h-full"
                    onLoad={handleModelLoad}
                    onError={handleModelError}
                    loading="lazy"
                    events-target="global"
                    cross-origin="anonymous"
                  />
                  {showTooltip && (
                    <div className="absolute top-4 right-4 bg-black/95 text-white px-4 py-2 rounded-lg text-sm backdrop-blur-sm border border-bar-accent/20">
                      <p className="flex items-center gap-2">
                        <span className="text-bar-accent">👆</span>
                        Rotate to preview
                      </p>
                    </div>
                  )}
                </div>
              </div>

              {/* Product Details */}
              <div className="flex flex-col justify-between space-y-8">
                <div>
                  <div className="mb-8">
                    <div className="inline-block bg-bar-accent/10 px-3 py-1 rounded-full border border-bar-accent/20 mb-4">
                      <span className="text-bar-accent text-sm font-medium tracking-wide animate-pulse">EXCLUSIVE COLLECTION</span>
                    </div>
                    <h2 className="text-3xl font-extrabold tracking-tight relative inline-block">
                      <span className="absolute -inset-1 bg-bar-accent/20 blur-sm rounded-lg"></span>
                      <span className="relative text-bar-accent">SIDE HUSTLE DROPPDX</span>
                    </h2>
                  </div>

                  {/* BE A WOLF button - large prominent version in the detailed section */}
                  <div className="mb-8">
                    <button 
                      className="w-full bg-gradient-to-r from-bar-accent via-bar-accent/90 to-bar-accent px-8 py-5 rounded-lg font-extrabold text-2xl text-black hover:brightness-110 transition-all duration-300 flex items-center justify-center gap-3 shadow-xl transform hover:scale-[1.03] animate-pulse-subtle"
                    >
                      <span className="text-xl md:text-3xl">🐺</span>
                      <span>BE A WOLF</span>
                      <svg className="w-6 h-6 animate-bounce-subtle" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17 8l4 4m0 0l-4 4m4-4H3" />
                      </svg>
                    </button>
                  </div>

                  {/* Features */}
                  <div className="space-y-4">
                    <div className="flex items-center gap-4 bg-gradient-to-r from-black/60 to-bar-accent/5 p-4 rounded-xl border border-white/10 hover:bg-black/60 transition-colors duration-300 transform hover:scale-[1.02] holographic-card">
                      <span className="text-bar-accent text-xl bg-black/40 p-2 rounded-lg shadow-inner">✨</span>
                      <div>
                        <p className="text-white font-bold">Lone Wolf Series</p>
                        <p className="text-white/60 text-sm">Only 100 pieces available worldwide</p>
                      </div>
                    </div>
                    <div className="flex items-center gap-4 bg-gradient-to-r from-black/60 to-bar-accent/5 p-4 rounded-xl border border-white/10 hover:bg-black/60 transition-colors duration-300 transform hover:scale-[1.02] holographic-card">
                      <span className="text-bar-accent text-xl bg-black/40 p-2 rounded-lg shadow-inner">🎨</span>
                      <div>
                        <p className="text-white font-bold">Exclusive DROPPDX Design</p>
                        <p className="text-white/60 text-sm">Iconic Portland-inspired streetwear</p>
                      </div>
                    </div>
                  </div>

                  {/* Side Hustle Shop */}
                  <div className="mt-8 bg-gradient-to-r from-bar-accent/20 via-bar-accent/10 to-transparent p-6 rounded-xl border border-white/10 shadow-lg holographic-card">
                    <div className="flex items-center gap-3 mb-4">
                      <span className="text-bar-accent text-xl bg-black/40 p-2 rounded-lg shadow-inner">🔥</span>
                      <div>
                        <h3 className="text-white font-bold text-xl tracking-wide">HUSTLE GIVEAWAYS</h3>
                        <p className="text-white/80 text-sm font-medium">Each purchase enters you a chance to win</p>
                      </div>
                    </div>
                    <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-3">
                      <div className="flex items-start gap-3 bg-black/40 p-3 rounded-lg border border-white/10 hover:bg-gradient-to-r hover:from-bar-accent/10 hover:to-transparent transition-all duration-300 transform hover:scale-[1.03] holographic-mini">
                        <span className="text-bar-accent mt-1 bg-black/30 p-1.5 rounded-lg">🎭</span>
                        <div>
                          <p className="text-sm font-bold text-white">Artist Meet & Greets</p>
                          <p className="text-xs text-white/70">VIP backstage access</p>
                        </div>
                      </div>
                      <div className="flex items-start gap-3 bg-black/40 p-3 rounded-lg border border-white/10 hover:bg-gradient-to-r hover:from-bar-accent/10 hover:to-transparent transition-all duration-300 transform hover:scale-[1.03] holographic-mini">
                        <span className="text-bar-accent mt-1 bg-black/30 p-1.5 rounded-lg">🍽️</span>
                        <div>
                          <p className="text-sm font-bold text-white">VIP Dining</p>
                          <p className="text-xs text-white/70">Premium dining experience</p>
                        </div>
                      </div>
                      <div className="flex items-start gap-3 bg-black/40 p-3 rounded-lg border border-white/10 hover:bg-gradient-to-r hover:from-bar-accent/10 hover:to-transparent transition-all duration-300 transform hover:scale-[1.03] holographic-mini">
                        <span className="text-bar-accent mt-1 bg-black/30 p-1.5 rounded-lg">🎟️</span>
                        <div>
                          <p className="text-sm font-bold text-white">Event Access</p>
                          <p className="text-xs text-white/70">Exclusive VIP seating</p>
                        </div>
                      </div>
                      <div className="flex items-start gap-3 bg-black/40 p-3 rounded-lg border border-white/10 hover:bg-gradient-to-r hover:from-bar-accent/10 hover:to-transparent transition-all duration-300 transform hover:scale-[1.03] holographic-mini">
                        <span className="text-bar-accent mt-1 bg-black/30 p-1.5 rounded-lg">🎧</span>
                        <div>
                          <p className="text-sm font-bold text-white">Nightclub Experience</p>
                          <p className="text-xs text-white/70">VIP nightclub access</p>
                        </div>
                      </div>
                      <div className="flex items-start gap-3 bg-black/40 p-3 rounded-lg border border-white/10 hover:bg-gradient-to-r hover:from-bar-accent/10 hover:to-transparent transition-all duration-300 transform hover:scale-[1.03] holographic-mini">
                        <span className="text-bar-accent mt-1 bg-black/30 p-1.5 rounded-lg">🥊</span>
                        <div>
                          <p className="text-sm font-bold text-white">UFC Fight Nights</p>
                          <p className="text-xs text-white/70">Premium boxing & UFC viewing</p>
                        </div>
                      </div>
                      <div className="flex items-start gap-3 bg-black/40 p-3 rounded-lg border border-white/10 hover:bg-gradient-to-r hover:from-bar-accent/10 hover:to-transparent transition-all duration-300 transform hover:scale-[1.03] holographic-mini">
                        <span className="text-bar-accent mt-1 bg-black/30 p-1.5 rounded-lg">🌟</span>
                        <div>
                          <p className="text-sm font-bold text-white">Big Events</p>
                          <p className="text-xs text-white/70">Priority tickets to major events</p>
                        </div>
                      </div>
                    </div>
                  </div>
                </div>

                {/* Shopping Options */}
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
              </div>
            </div>
          </div>
        </div>

        {/* SIDE HUSTLE DROPPDX Giveaways Section */}
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
              
              <div className="grid grid-cols-1 lg:grid-cols-2 gap-12">
                {/* DROPPDX Details with enhanced styling */}
                <div className="flex flex-col justify-between space-y-8">
                  <div>
                    <div className="mb-8">
                      <div className="inline-block bg-bar-accent/10 px-3 py-1 rounded-full border border-bar-accent/20 mb-4">
                        <span className="text-bar-accent text-sm font-medium tracking-wide animate-pulse">EXCLUSIVE COLLECTION</span>
                      </div>
                      
                      <div className="flex items-center gap-3 mb-4 mt-3">
                        <span className="text-2xl font-bold text-white">$79.99</span>
                        <span className="text-white/60 text-sm">USD</span>
                      </div>
                      <p className="text-white/70 text-sm">Hand-numbered limited edition with Certificate of Authenticity</p>
                    </div>

                    {/* Features with improved styling */}
                    <div className="space-y-4 mb-8">
                      <div className="flex items-center gap-4 bg-gradient-to-r from-black/60 to-bar-accent/5 p-4 rounded-xl border border-white/10 hover:bg-black/60 transition-all duration-300 transform hover:scale-[1.02] holographic-mini">
                        <span className="text-bar-accent text-xl bg-black/40 p-2 rounded-lg shadow-inner">✨</span>
                        <div>
                          <p className="text-white font-bold">Lone Wolf Series</p>
                          <p className="text-white/60 text-sm">Limited edition collection - Only 100 pieces available</p>
                        </div>
                      </div>
                      <div className="flex items-center gap-4 bg-gradient-to-r from-black/60 to-bar-accent/5 p-4 rounded-xl border border-white/10 hover:bg-black/60 transition-all duration-300 transform hover:scale-[1.02] holographic-mini">
                        <span className="text-bar-accent text-xl bg-black/40 p-2 rounded-lg shadow-inner">🎨</span>
                        <div>
                          <p className="text-white font-bold">Exclusive DROPPDX Design</p>
                          <p className="text-white/60 text-sm">Iconic Portland-inspired premium streetwear</p>
                        </div>
                      </div>
                      <div className="flex items-center gap-4 bg-gradient-to-r from-black/60 to-bar-accent/5 p-4 rounded-xl border border-white/10 hover:bg-black/60 transition-all duration-300 transform hover:scale-[1.02] holographic-mini">
                        <span className="text-bar-accent text-xl bg-black/40 p-2 rounded-lg shadow-inner">🏷️</span>
                        <div>
                          <p className="text-white font-bold">Members-Only Access</p>
                          <p className="text-white/60 text-sm">Exclusive to Side Hustle VIP members</p>
                        </div>
                      </div>
                    </div>

                    {/* Wolf Buy Button with consistent styling */}
                    <button 
                      className="w-full bg-gradient-to-r from-bar-accent via-bar-accent/90 to-bar-accent px-8 py-5 rounded-lg font-extrabold text-2xl text-black hover:brightness-110 transition-all duration-300 flex items-center justify-center gap-3 shadow-xl transform hover:scale-[1.03] animate-pulse-subtle mb-6"
                    >
                      <span className="text-xl md:text-3xl">🐺</span>
                      <span>BE A WOLF</span>
                      <svg className="w-6 h-6 animate-bounce-subtle" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17 8l4 4m0 0l-4 4m4-4H3" />
                      </svg>
                    </button>
                  </div>
                </div>

                {/* Giveaway Details with updated design */}
                <div className="flex flex-col">
                  <div className="bg-gradient-to-r from-bar-accent/20 via-bar-accent/10 to-transparent p-6 rounded-xl border border-white/10 shadow-lg holographic-card backdrop-blur-sm">
                    <div className="flex items-center gap-3 mb-6">
                      <span className="text-bar-accent text-2xl bg-black/40 p-2 rounded-lg shadow-inner">🔥</span>
                      <div>
                        <h3 className="text-white font-bold text-2xl tracking-wide">HUSTLE GIVEAWAYS</h3>
                        <div className="flex items-center gap-2 mt-1">
                          <span className="text-white/80 text-sm font-medium">AUTO ENTRY</span>
                          <span className="text-white/80 text-xs px-2 py-0.5 rounded-full border border-bar-accent/30 bg-bar-accent/10 animate-pulse-subtle">MEMBERS ONLY</span>
                        </div>
                        <p className="text-white/70 text-sm mt-1">Each purchase enters you for a chance to win:</p>
                      </div>
                    </div>
                    
                    <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 mb-6">
                      <div className="flex items-start gap-3 bg-black/40 p-3 rounded-lg border border-white/10 hover:bg-gradient-to-r hover:from-bar-accent/10 hover:to-transparent transition-all duration-300 transform hover:scale-[1.03] holographic-mini">
                        <span className="text-bar-accent mt-1 bg-black/30 p-1.5 rounded-lg shadow-inner">🎭</span>
                        <div>
                          <p className="text-sm font-bold text-white">Artist Meet & Greets</p>
                          <p className="text-xs text-white/70">VIP backstage access</p>
                        </div>
                      </div>
                      <div className="flex items-start gap-3 bg-black/40 p-3 rounded-lg border border-white/10 hover:bg-gradient-to-r hover:from-bar-accent/10 hover:to-transparent transition-all duration-300 transform hover:scale-[1.03] holographic-mini">
                        <span className="text-bar-accent mt-1 bg-black/30 p-1.5 rounded-lg shadow-inner">🍽️</span>
                        <div>
                          <p className="text-sm font-bold text-white">VIP Dining</p>
                          <p className="text-xs text-white/70">Premium dining experience</p>
                        </div>
                      </div>
                      <div className="flex items-start gap-3 bg-black/40 p-3 rounded-lg border border-white/10 hover:bg-gradient-to-r hover:from-bar-accent/10 hover:to-transparent transition-all duration-300 transform hover:scale-[1.03] holographic-mini">
                        <span className="text-bar-accent mt-1 bg-black/30 p-1.5 rounded-lg shadow-inner">🎟️</span>
                        <div>
                          <p className="text-sm font-bold text-white">Event Access</p>
                          <p className="text-xs text-white/70">Exclusive VIP seating</p>
                        </div>
                      </div>
                      <div className="flex items-start gap-3 bg-black/40 p-3 rounded-lg border border-white/10 hover:bg-gradient-to-r hover:from-bar-accent/10 hover:to-transparent transition-all duration-300 transform hover:scale-[1.03] holographic-mini">
                        <span className="text-bar-accent mt-1 bg-black/30 p-1.5 rounded-lg shadow-inner">🎧</span>
                        <div>
                          <p className="text-sm font-bold text-white">Nightclub Experience</p>
                          <p className="text-xs text-white/70">VIP nightclub access</p>
                        </div>
                      </div>
                      <div className="flex items-start gap-3 bg-black/40 p-3 rounded-lg border border-white/10 hover:bg-gradient-to-r hover:from-bar-accent/10 hover:to-transparent transition-all duration-300 transform hover:scale-[1.03] holographic-mini">
                        <span className="text-bar-accent mt-1 bg-black/30 p-1.5 rounded-lg shadow-inner">🥊</span>
                        <div>
                          <p className="text-sm font-bold text-white">UFC Fight Nights</p>
                          <p className="text-xs text-white/70">Premium boxing & UFC viewing</p>
                        </div>
                      </div>
                      <div className="flex items-start gap-3 bg-black/40 p-3 rounded-lg border border-white/10 hover:bg-gradient-to-r hover:from-bar-accent/10 hover:to-transparent transition-all duration-300 transform hover:scale-[1.03] holographic-mini">
                        <span className="text-bar-accent mt-1 bg-black/30 p-1.5 rounded-lg shadow-inner">🌟</span>
                        <div>
                          <p className="text-sm font-bold text-white">Big Events</p>
                          <p className="text-xs text-white/70">Priority tickets to major events</p>
                        </div>
                      </div>
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
            </div>
          </div>
        </div>
      </div>
    </div>
  );
} 