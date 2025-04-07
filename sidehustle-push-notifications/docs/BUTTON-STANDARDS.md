# Button Styling Standards

This guide outlines our standardized approach to button styling across the application, ensuring consistency, accessibility, and maintainability.

## Core Principles

- **White Interior**: All buttons have a white background for consistent appearance
- **Flat Design**: No holographic effects, gradients, or excessive shadows 
- **Black Text**: All buttons use black text for optimal readability
- **Consistent Borders**: Simple, consistent border treatment
- **Hover States**: Subtle hover states that give feedback without distracting animations

## Implementation

### Using the Shadcn UI Button Component

Always use the Shadcn UI Button component for buttons throughout the application:

```tsx
import { Button } from "@/components/ui/button"

// Default button (white bg, black text)
<Button>Click Me</Button>

// Button variants (all maintain white bg)
<Button variant="default">Default</Button>
<Button variant="secondary">Secondary</Button>
<Button variant="outline">Outline</Button>
<Button variant="ghost">Ghost</Button>
<Button variant="link">Link</Button>
<Button variant="destructive">Destructive</Button>

// Button sizes
<Button size="default">Default Size</Button>
<Button size="sm">Small</Button>
<Button size="lg">Large</Button>
<Button size="icon"><Icon /></Button>
```

### Styling Guide

1. **Do not** add additional gradient/holographic effects to buttons
2. **Do not** use custom button classes like `button-primary`, `holographic-btn`, or `pulsing-shadow`
3. **Do** use the `className` prop to add spacing, positioning, or responsive behavior
4. **Do** ensure proper contrast and focus states for accessibility

## Migration

When updating existing buttons:

1. Replace custom button elements with the Shadcn UI `<Button>` component
2. Choose the appropriate variant based on the button's purpose
3. Remove any classes that previously added holographic effects
4. Adjust size and spacing as needed to match layout

### Before:

```tsx
<button className="button-primary holographic-btn pulsing-shadow">
  Click Me
</button>
```

### After:

```tsx
<Button>Click Me</Button>
```

## Accessibility Considerations

- The standardized buttons ensure sufficient color contrast for text
- Focus states are clearly visible when navigating with keyboard
- Hover states provide visual feedback without relying on animations
- Touch targets are appropriately sized for mobile users

## Why These Changes?

- **Consistency**: Unified button appearance across the application
- **Maintainability**: Easier to update the design system from a central location
- **Accessibility**: Improved readability and compatibility with assistive technologies
- **Modern Aesthetic**: Clean, flat design that aligns with contemporary UI trends
- **Performance**: Removed unnecessary animations for improved rendering performance 