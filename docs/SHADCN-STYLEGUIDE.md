# Shadcn UI Style Guide

This document outlines our project's UI component standards, based on Shadcn UI principles.

## Core Design Principles

- **Single Source of Truth**: All UI components should follow Shadcn UI styling principles
- **Consistency**: Use the same styling patterns throughout the application
- **Minimalism**: Prefer clean, minimal designs over decorative or ornate elements
- **Accessibility**: Ensure all components meet WCAG standards

## Component Standards

### Buttons

All buttons should use the Shadcn UI `<Button>` component with proper variants:

```tsx
import { Button } from "@/components/ui/button";

// Primary action button (default)
<Button>Primary Action</Button>

// Secondary action button
<Button variant="secondary">Secondary Action</Button>

// Outline button for less emphasis
<Button variant="outline">Outline Button</Button>

// Ghost button for the least emphasis
<Button variant="ghost">Ghost Button</Button>

// Destructive action button
<Button variant="destructive">Delete</Button>

// Link styled as a button
<Button variant="link">Link Button</Button>
```

Button sizes:
- Default: For most buttons
- Small (`size="sm"`): For compact UIs or inline buttons
- Large (`size="lg"`): For emphasized buttons
- Icon (`size="icon"`): For square icon buttons

### Typography

Use consistent typography by applying the typography variants from `lib/utils.ts`:

```tsx
import { typographyVariants } from "@/lib/utils";

<h1 className={typographyVariants.h1}>Page Title</h1>
<h2 className={typographyVariants.h2}>Section Title</h2>
<h3 className={typographyVariants.h3}>Subsection Title</h3>
<p className={typographyVariants.p}>Regular paragraph text</p>
<p className={typographyVariants.lead}>Leading paragraph</p>
<p className={typographyVariants.muted}>Muted auxiliary text</p>
```

### Cards

Use the Card component for content containers:

```tsx
import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";

<Card>
  <CardHeader>
    <CardTitle>Card Title</CardTitle>
    <CardDescription>Card description</CardDescription>
  </CardHeader>
  <CardContent>
    <p>Card content</p>
  </CardContent>
  <CardFooter>
    <Button>Action</Button>
  </CardFooter>
</Card>
```

### Forms

Use Shadcn UI form components with consistent styling:

```tsx
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";

<div className="space-y-2">
  <Label htmlFor="email">Email</Label>
  <Input id="email" placeholder="Enter your email" />
</div>
```

### Spacing & Layout

Use Tailwind's consistent spacing utilities:

- Padding: `p-2`, `p-4`, `p-6`, `p-8`
- Margin: `m-2`, `m-4`, `m-6`, `m-8`
- Gaps: `gap-2`, `gap-4`, `gap-6`

For complex layouts, use Flexbox or Grid with consistent gap values:

```tsx
<div className="flex gap-4">
  {/* Flex children */}
</div>

<div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
  {/* Grid children */}
</div>
```

### Colors

Use the Shadcn UI semantic color variables:

- `bg-background` / `text-foreground`: Base application background/text
- `bg-primary` / `text-primary-foreground`: Primary accent color
- `bg-secondary` / `text-secondary-foreground`: Secondary accent color
- `bg-muted` / `text-muted-foreground`: Subdued background/text
- `bg-accent` / `text-accent-foreground`: Subtle accent background/text
- `bg-card` / `text-card-foreground`: Card background/text
- `bg-destructive` / `text-destructive-foreground`: Error/warning/destructive action color

## Class Name Merging

Always use the `cn()` utility for conditional class names:

```tsx
import { cn } from "@/lib/utils";

<div className={cn(
  "base-class-always-applied",
  condition && "class-applied-conditionally",
  className // Allow component consumers to extend styling
)}>
  Content
</div>
```

## Code Review Guidelines

When reviewing code, ensure:

1. All new UI components use Shadcn UI principles
2. Custom components are built on Radix UI primitives where appropriate
3. The `cn()` utility is used for class composition
4. No holographic, futuristic, or overly ornate styles are present
5. Typography follows the defined variants
6. Color usage follows the Shadcn UI semantic variables

## Reference Resources

- [Shadcn UI Documentation](https://ui.shadcn.com/docs)
- View the visual style guide at `/style-guide` in the development environment
- Refer to code examples in `components/ui/shadcn-style-guide.tsx` 