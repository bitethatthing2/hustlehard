'use client'

import React from 'react'
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { cn } from "@/lib/utils"

export function ShadcnStyleGuide() {
  return (
    <div className="flex flex-col gap-10 w-full max-w-5xl mx-auto p-8">
      {/* Typography Section */}
      <section>
        <h2 className="text-3xl font-bold mb-6 border-b pb-2">Typography</h2>
        
        <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
          <div>
            <h3 className="text-lg font-semibold mb-4">Headings</h3>
            <div className="space-y-4">
              <div>
                <h1 className="scroll-m-20 text-4xl font-extrabold tracking-tight lg:text-5xl">
                  Heading 1
                </h1>
                <p className="text-sm text-muted-foreground">text-4xl / text-5xl font-extrabold</p>
              </div>
              <div>
                <h2 className="scroll-m-20 border-b pb-2 text-3xl font-semibold tracking-tight transition-colors first:mt-0">
                  Heading 2
                </h2>
                <p className="text-sm text-muted-foreground">text-3xl font-semibold + border</p>
              </div>
              <div>
                <h3 className="scroll-m-20 text-2xl font-semibold tracking-tight">
                  Heading 3
                </h3>
                <p className="text-sm text-muted-foreground">text-2xl font-semibold</p>
              </div>
              <div>
                <h4 className="scroll-m-20 text-xl font-semibold tracking-tight">
                  Heading 4
                </h4>
                <p className="text-sm text-muted-foreground">text-xl font-semibold</p>
              </div>
            </div>
          </div>
          
          <div>
            <h3 className="text-lg font-semibold mb-4">Paragraphs & Text</h3>
            <div className="space-y-4">
              <div>
                <p className="leading-7 [&:not(:first-child)]:mt-6">
                  The quick brown fox jumps over the lazy dog.
                </p>
                <p className="text-sm text-muted-foreground">Default paragraph</p>
              </div>
              <div>
                <p className="text-xl text-muted-foreground">
                  The quick brown fox jumps over the lazy dog.
                </p>
                <p className="text-sm text-muted-foreground">Lead text - text-xl text-muted-foreground</p>
              </div>
              <div>
                <p className="text-sm text-muted-foreground">
                  The quick brown fox jumps over the lazy dog.
                </p>
                <p className="text-sm text-muted-foreground">Small muted text</p>
              </div>
              <div>
                <p className="text-sm font-medium leading-none">
                  The quick brown fox jumps over the lazy dog.
                </p>
                <p className="text-sm text-muted-foreground">Small medium text</p>
              </div>
            </div>
          </div>
        </div>
      </section>
      
      {/* Buttons Section */}
      <section>
        <h2 className="text-3xl font-bold mb-6 border-b pb-2">Buttons</h2>
        
        <div className="grid grid-cols-1 gap-8">
          <div>
            <h3 className="text-lg font-semibold mb-4">Button Variants</h3>
            <div className="flex flex-wrap gap-4">
              <Button variant="default">Default</Button>
              <Button variant="secondary">Secondary</Button>
              <Button variant="outline">Outline</Button>
              <Button variant="ghost">Ghost</Button>
              <Button variant="link">Link</Button>
              <Button variant="destructive">Destructive</Button>
            </div>
          </div>
          
          <div>
            <h3 className="text-lg font-semibold mb-4">Button Sizes</h3>
            <div className="flex flex-wrap gap-4 items-center">
              <Button size="default">Default</Button>
              <Button size="sm">Small</Button>
              <Button size="lg">Large</Button>
              <Button size="icon" className="rounded-full w-10 h-10 p-0 flex items-center justify-center">
                <span className="sr-only">Icon button</span>
                <svg className="h-4 w-4" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 12h14M12 5l7 7-7 7" />
                </svg>
              </Button>
            </div>
          </div>
          
          <div>
            <h3 className="text-lg font-semibold mb-4">Button States</h3>
            <div className="flex flex-wrap gap-4">
              <Button>Default</Button>
              <Button disabled>Disabled</Button>
              <Button className="bg-primary/80 hover:bg-primary/70">Hover State</Button>
              <Button className="opacity-80">Loading State</Button>
            </div>
          </div>
        </div>
      </section>
      
      {/* Cards Section */}
      <section>
        <h2 className="text-3xl font-bold mb-6 border-b pb-2">Cards</h2>
        
        <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
          <Card>
            <CardHeader>
              <CardTitle>Default Card</CardTitle>
            </CardHeader>
            <CardContent>
              <p>This is a default card with a header and content.</p>
              <div className="mt-4">
                <Button>Card Action</Button>
              </div>
            </CardContent>
          </Card>
          
          <Card className="border border-primary/30">
            <CardHeader className="bg-primary/5">
              <CardTitle>Custom Styled Card</CardTitle>
            </CardHeader>
            <CardContent>
              <p>This card has custom border and header styling.</p>
              <div className="mt-4">
                <Button variant="outline">Secondary Action</Button>
              </div>
            </CardContent>
          </Card>
        </div>
      </section>
      
      {/* Spacing & Layout Section */}
      <section>
        <h2 className="text-3xl font-bold mb-6 border-b pb-2">Spacing & Layout</h2>
        
        <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
          <div>
            <h3 className="text-lg font-semibold mb-4">Spacing Scale</h3>
            <div className="space-y-4">
              <div className="flex items-center gap-4">
                <div className="w-16 h-4 bg-primary"></div>
                <p className="text-sm">4px (0.25rem) - space-1</p>
              </div>
              <div className="flex items-center gap-4">
                <div className="w-16 h-8 bg-primary"></div>
                <p className="text-sm">8px (0.5rem) - space-2</p>
              </div>
              <div className="flex items-center gap-4">
                <div className="w-16 h-12 bg-primary"></div>
                <p className="text-sm">12px (0.75rem) - space-3</p>
              </div>
              <div className="flex items-center gap-4">
                <div className="w-16 h-16 bg-primary"></div>
                <p className="text-sm">16px (1rem) - space-4</p>
              </div>
            </div>
          </div>
          
          <div>
            <h3 className="text-lg font-semibold mb-4">Container & Responsive</h3>
            <div className="space-y-4">
              <div className="p-4 border rounded-lg">
                <p className="text-sm">Container with padding</p>
                <p className="text-xs text-muted-foreground">p-4 (1rem / 16px padding)</p>
              </div>
              <div className="grid grid-cols-2 gap-4">
                <div className="p-2 border rounded-lg">
                  <p className="text-sm">Col 1</p>
                </div>
                <div className="p-2 border rounded-lg">
                  <p className="text-sm">Col 2</p>
                </div>
              </div>
              <div className="text-xs text-muted-foreground">grid grid-cols-2 gap-4</div>
            </div>
          </div>
        </div>
      </section>
      
      {/* Color Usage Section */}
      <section>
        <h2 className="text-3xl font-bold mb-6 border-b pb-2">Color Usage</h2>
        
        <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
          <div>
            <h3 className="text-lg font-semibold mb-4">Primary Colors</h3>
            <div className="space-y-2">
              <div className="h-16 bg-primary rounded-lg flex items-end">
                <div className="bg-black/30 w-full p-2 rounded-b-lg">
                  <p className="text-primary-foreground text-sm">Primary</p>
                </div>
              </div>
              <div className="h-16 bg-secondary rounded-lg flex items-end">
                <div className="bg-black/30 w-full p-2 rounded-b-lg">
                  <p className="text-secondary-foreground text-sm">Secondary</p>
                </div>
              </div>
              <div className="h-16 bg-accent rounded-lg flex items-end">
                <div className="bg-black/30 w-full p-2 rounded-b-lg">
                  <p className="text-accent-foreground text-sm">Accent</p>
                </div>
              </div>
            </div>
          </div>
          
          <div>
            <h3 className="text-lg font-semibold mb-4">UI Element Colors</h3>
            <div className="space-y-2">
              <div className="h-10 bg-card rounded-lg border flex items-center px-4">
                <p className="text-card-foreground text-sm">Card</p>
              </div>
              <div className="h-10 bg-popover rounded-lg border flex items-center px-4">
                <p className="text-popover-foreground text-sm">Popover</p>
              </div>
              <div className="h-10 bg-muted rounded-lg flex items-center px-4">
                <p className="text-muted-foreground text-sm">Muted</p>
              </div>
              <div className="h-10 bg-destructive rounded-lg flex items-center px-4">
                <p className="text-destructive-foreground text-sm">Destructive</p>
              </div>
            </div>
          </div>
        </div>
      </section>
    </div>
  )
} 