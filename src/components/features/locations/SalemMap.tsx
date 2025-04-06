"use client";

import React from 'react';
import GoogleMapEmbed from './GoogleMapEmbed';

interface SalemMapProps {
  embedUrl: string;
  title: string;
}

const SalemMap: React.FC<SalemMapProps> = ({ embedUrl, title }) => {
  return (
    <GoogleMapEmbed
      src={embedUrl}
      title={title}
    />
  );
};

export default SalemMap;
