# Implementing Shadcn UI Standards

This guide walks you through the process of implementing Shadcn UI styling standards throughout our application.

## Table of Contents

1. [Introduction](#introduction)
2. [Getting Started](#getting-started)
3. [Component Transformation Process](#component-transformation-process)
4. [Example Transformations](#example-transformations)
5. [Theme Configuration](#theme-configuration)
6. [Review Process](#review-process)
7. [Troubleshooting](#troubleshooting)

## Introduction

Our application is adopting Shadcn UI as the single source of truth for UI component styling. This ensures a consistent, clean, and professional aesthetic across the entire application while improving maintainability and development speed.

## Getting Started

1. **Familiarize yourself with the Shadcn UI style guide**:
   - Review `/docs/SHADCN-STYLEGUIDE.md`
   - Browse the visual style guide at `/style-guide` in development

2. **Review core utility functions**:
   - Examine `/lib/utils.ts` for available helper functions and style variants
   - Use the `cn()` function for class name composition

3. **Understand the component library**:
   - Available Shadcn UI components are located in `/components/ui/`
   - Use these components as building blocks for new features

## Component Transformation Process

When converting existing components to follow Shadcn UI standards, follow this process:

1. **Analysis**: Identify the current styling approach and component structure
2. **Simplify**: Remove any holographic, futuristic, or extraneous styling
3. **Map**: Determine which Shadcn UI components should replace custom elements
4. **Transform**: Implement the conversion using Shadcn UI components and utilities
5. **Test**: Verify functionality and appearance across different viewport sizes and themes

### Example Component Mapping

| Custom Component           | Shadcn UI Replacement          |
|---------------------------|-------------------------------|
| Custom button              | `<Button>` with appropriate variant |
| Card-like container        | `<Card>` with subcomponents    |
| Custom form elements       | Shadcn UI form components     |
| Custom dropdown            | `<Select>` or `<DropdownMenu>` |
| Modal dialogs              | `<Dialog>` component          |

## Example Transformations

### Before/After Button Example

**Before**:
```tsx
<button 
  className="min-w-[180px] text-lg py-6 px-10 rounded-xl bg-black/40 border border-gray-700 text-white hover:bg-white/10 hover:text-white hover:border-white/50 hover:shadow-[0_0_15px_rgba(255,255,255,0.1)]"
  onClick={handleClick}
>
  Click Me
</button>
```

**After**:
```tsx
<Button 
  variant="outline" 
  size="lg"
  onClick={handleClick}
>
  Click Me
</Button>
```

### Custom Card Transformation

**Before**:
```tsx
<div className="border border-gray-800 rounded-xl p-5 bg-gradient-to-b from-black/60 to-black/30 hover:from-black/70 hover:to-black/40 shadow-lg">
  <h3 className="font-semibold text-white text-base">{title}</h3>
  <p className="text-gray-300">{content}</p>
  <button className="w-full inline-flex items-center justify-center bg-black border border-white/20 text-white hover:bg-white hover:text-black rounded-lg py-2.5 px-4">
    Action
  </button>
</div>
```

**After**:
```tsx
<Card>
  <CardHeader>
    <CardTitle>{title}</CardTitle>
  </CardHeader>
  <CardContent>
    <p className="text-muted-foreground">{content}</p>
  </CardContent>
  <CardFooter>
    <Button className="w-full">Action</Button>
  </CardFooter>
</Card>
```

## Theme Configuration

Our application supports both light and dark themes using Shadcn UI's theming capabilities.

### Theme Variables

Shadcn UI uses CSS variables for theming which are defined in `app/globals.css`. Key color variables:

- `--background` / `--foreground`: Base application colors
- `--card` / `--card-foreground`: Card component colors
- `--popover` / `--popover-foreground`: Popover component colors
- `--primary` / `--primary-foreground`: Primary action colors
- `--secondary` / `--secondary-foreground`: Secondary action colors
- `--muted` / `--muted-foreground`: Subdued element colors
- `--accent` / `--accent-foreground`: Accent element colors
- `--destructive` / `--destructive-foreground`: Destructive action colors
- `--border`: Border color
- `--input`: Input element color
- `--ring`: Focus ring color

### Theme Toggle

For testing both themes during development, use the `<ThemeToggle />` component which allows switching between light and dark modes.

## Review Process

When reviewing PRs for Shadcn UI compliance, check for:

1. **Component usage**: Shadcn UI components should be used wherever possible
2. **Class composition**: `cn()` utility should be used for class composition
3. **Custom styles**: Custom styles should be minimized and follow Shadcn UI patterns
4. **Accessibility**: Ensure components maintain keyboard accessibility and proper ARIA attributes
5. **Responsiveness**: Verify the design works across different viewport sizes
6. **Consistency**: Check that typography, spacing, and color choices match other parts of the application

## Troubleshooting

### Common Issues

1. **Missing exports in component files**: 
   - Solution: Run `npx shadcn add [component-name] --overwrite` to refresh the component

2. **Styling conflicts**:
   - Solution: Check for competing Tailwind classes or global styles that might override Shadcn UI defaults

3. **Unexpected appearance**:
   - Solution: Verify that the component is being used as documented, particularly checking variant and size props

4. **Component doesn't exist**:
   - Solution: Make sure you've installed all required components with `npx shadcn add [component-name]`

5. **Radix UI version conflicts**:
   - Solution: Ensure all Radix UI packages are at compatible versions in package.json

### Getting Help

For additional help with Shadcn UI implementation:
- Consult the [Shadcn UI documentation](https://ui.shadcn.com/docs)
- Review the example components in this repository
- Refer to `/docs/SHADCN-STYLEGUIDE.md` for project-specific guidelines 