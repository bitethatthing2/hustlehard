"use client";

import React from 'react';
import GoogleMapEmbed from './GoogleMapEmbed';

const PortlandMap: React.FC = () => {
  return (
    <GoogleMapEmbed
      src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d359640.0992522873!2d-123.1637501704348!3d45.233873097998526!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x54950bbb77279f67%3A0xfb5a916203b1c05a!2sSide%20Hustle!5e0!3m2!1sen!2sus!4v1743394983254!5m2!1sen!2sus"
      title="Side Hustle Portland Location Map"
    />
  );
};

export default PortlandMap; 