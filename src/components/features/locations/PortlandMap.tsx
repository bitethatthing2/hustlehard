"use client";

import React from 'react';
import GoogleMapEmbed from './GoogleMapEmbed';

interface PortlandMapProps {
  embedUrl: string;
  title: string;
}

const PortlandMap: React.FC<PortlandMapProps> = ({ embedUrl, title }) => {
  return (
    <GoogleMapEmbed
      src={embedUrl}
      title={title}
    />
  );
};

export default PortlandMap;
