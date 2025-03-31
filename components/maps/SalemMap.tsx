"use client";

import React from 'react';
import GoogleMapEmbed from './GoogleMapEmbed';

const SalemMap: React.FC = () => {
  return (
    <GoogleMapEmbed
      src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d2824.155837503885!2d-123.04139512405341!3d44.94049986822883!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x54bfff43800426c7%3A0xe32b22509988966e!2sSide%20Hustle%20Bar!5e0!3m2!1sen!2sus!4v1743394931645!5m2!1sen!2sus"
      title="Side Hustle Bar Salem Location Map"
    />
  );
};

export default SalemMap; 