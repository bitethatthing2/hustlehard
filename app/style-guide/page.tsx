import React from 'react';
import { ShadcnStyleGuide } from "@/components/ui/shadcn-style-guide";
import HeroButtonExamples from '@/components/ui/examples/hero-button-example';

export default function StyleGuidePage() {
  return (
    <div className="container mx-auto py-12 space-y-16">
      <div>
        <h1 className="text-4xl font-bold mb-4">Hustler Style Guide</h1>
        <p className="text-lg text-muted-foreground">
          A comprehensive guide to our design system and UI components
        </p>
      </div>

      <ShadcnStyleGuide />

      <div className="space-y-6">
        <h2 className="text-3xl font-bold">Button Migration Examples</h2>
        <p className="text-lg text-muted-foreground mb-8">
          Examples of transforming custom buttons to use our standardized Shadcn UI components
        </p>
        
        <HeroButtonExamples />
      </div>
    </div>
  );
} 