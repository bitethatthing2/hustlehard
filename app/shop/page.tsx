/** @jsxImportSource react */
"use client";

import React, { Suspense } from 'react';
import Link from 'next/link';
import { ArrowLeft } from 'lucide-react';
import dynamic from 'next/dynamic';

// Import components dynamically to avoid hydration issues
const HeroSection = dynamic(() => import('@/components/HeroSection'), {
  ssr: false,
  loading: () => <div className="min-h-[80vh] flex items-center justify-center bg-black">Loading...</div>
});

export default function ShopPage(): React.ReactElement {
  return (
    <main className="flex min-h-screen flex-col items-center justify-between bg-black">
      <Suspense fallback={<div className="min-h-[80vh] flex items-center justify-center bg-black">Loading...</div>}>
        <HeroSection />
      </Suspense>
    </main>
  );
} 