import React from 'react';
import Link from 'next/link';

export default function Logo() {
  return (
    <Link href="/" className="inline-flex items-center">
      <div className="bg-black/80 backdrop-blur-sm px-3 py-1.5 rounded-lg transform -skew-x-12">
        <span className="text-white font-bold text-sm sm:text-base md:text-lg tracking-wide transform skew-x-12 inline-block">
          SIDE HUSTLE
        </span>
      </div>
    </Link>
  );
} 