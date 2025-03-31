import { ShadcnStyleGuide } from "@/components/ui/shadcn-style-guide";

export default function StyleGuidePage() {
  return (
    <div className="container mx-auto py-8">
      <h1 className="text-4xl font-bold mb-8 pb-4 border-b">Shadcn UI Style Guide</h1>
      <p className="mb-8 text-muted-foreground text-lg">
        This page demonstrates the Shadcn UI component styles and design patterns to be used consistently throughout the application.
      </p>
      <ShadcnStyleGuide />
    </div>
  );
} 