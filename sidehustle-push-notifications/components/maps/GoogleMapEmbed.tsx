"use client";

import React from 'react';
import { cn } from '@/lib/utils';

interface GoogleMapEmbedProps {
  src: string;
  title: string;
  className?: string;
  width?: string | number;
  height?: string | number;
}

const GoogleMapEmbed: React.FC<GoogleMapEmbedProps> = ({
  src,
  title,
  className,
  width = "100%",
  height = "100%"
}) => {
  return (
    <div className="w-full rounded-lg overflow-hidden border border-white/10 shadow-md">
      <div className="aspect-video w-full">
        <iframe
          src={src}
          title={title}
          width={width}
          height={height}
          allowFullScreen={true}
          referrerPolicy="no-referrer-when-downgrade"
          className={cn("w-full h-full border-none", className)}
        />
      </div>
    </div>
  );
};

export default GoogleMapEmbed; 