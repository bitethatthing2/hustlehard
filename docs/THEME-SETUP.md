# Setting Up Dark Mode with the ThemeToggle Component

This guide provides step-by-step instructions for implementing dark mode support in the application using the Shadcn UI theming approach.

## Prerequisites

- Shadcn UI components installed
- `next-themes` package installed (if not already installed, run `npm install next-themes`)

## Step 1: Set Up ThemeProvider

1. Open or create `app/providers.tsx`:

```tsx
'use client'

import { ThemeProvider as NextThemesProvider } from 'next-themes'
import { type ThemeProviderProps } from 'next-themes/dist/types'

export function ThemeProvider({ children, ...props }: ThemeProviderProps) {
  return (
    <NextThemesProvider
      attribute="class"
      defaultTheme="system"
      enableSystem
      {...props}
    >
      {children}
    </NextThemesProvider>
  )
}
```

## Step 2: Add ThemeProvider to Layout

2. Update your `app/layout.tsx` file to include the ThemeProvider:

```tsx
import { ThemeProvider } from '@/app/providers'

export default function RootLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return (
    <html lang="en" suppressHydrationWarning>
      <head />
      <body>
        <ThemeProvider>
          {children}
        </ThemeProvider>
      </body>
    </html>
  )
}
```

## Step 3: Add the ThemeToggle Component

3. Use the `ThemeToggle` component in your navigation or other appropriate location:

```tsx
import { ThemeToggle } from "@/components/ui/theme-toggle"

export function Navbar() {
  return (
    <nav className="flex items-center justify-between p-4">
      <div className="flex items-center gap-4">
        {/* Your navigation items */}
      </div>
      <ThemeToggle />
    </nav>
  )
}
```

## Step 4: Update Global CSS for Dark Mode

4. Ensure your `app/globals.css` includes dark mode variables:

```css
@tailwind base;
@tailwind components;
@tailwind utilities;

@layer base {
  :root {
    --background: 0 0% 100%;
    --foreground: 240 10% 3.9%;
    --card: 0 0% 100%;
    --card-foreground: 240 10% 3.9%;
    --popover: 0 0% 100%;
    --popover-foreground: 240 10% 3.9%;
    --primary: 240 5.9% 10%;
    --primary-foreground: 0 0% 98%;
    --secondary: 240 4.8% 95.9%;
    --secondary-foreground: 240 5.9% 10%;
    --muted: 240 4.8% 95.9%;
    --muted-foreground: 240 3.8% 46.1%;
    --accent: 240 4.8% 95.9%;
    --accent-foreground: 240 5.9% 10%;
    --destructive: 0 84.2% 60.2%;
    --destructive-foreground: 0 0% 98%;
    --border: 240 5.9% 90%;
    --input: 240 5.9% 90%;
    --ring: 240 5.9% 10%;
    --radius: 0.5rem;
  }

  .dark {
    --background: 240 10% 3.9%;
    --foreground: 0 0% 98%;
    --card: 240 10% 3.9%;
    --card-foreground: 0 0% 98%;
    --popover: 240 10% 3.9%;
    --popover-foreground: 0 0% 98%;
    --primary: 0 0% 98%;
    --primary-foreground: 240 5.9% 10%;
    --secondary: 240 3.7% 15.9%;
    --secondary-foreground: 0 0% 98%;
    --muted: 240 3.7% 15.9%;
    --muted-foreground: 240 5% 64.9%;
    --accent: 240 3.7% 15.9%;
    --accent-foreground: 0 0% 98%;
    --destructive: 0 62.8% 30.6%;
    --destructive-foreground: 0 0% 98%;
    --border: 240 3.7% 15.9%;
    --input: 240 3.7% 15.9%;
    --ring: 240 4.9% 83.9%;
  }
}

@layer base {
  * {
    @apply border-border;
  }
  body {
    @apply bg-background text-foreground;
  }
}
```

## Step 5: Update Tailwind Config

5. Ensure your `tailwind.config.ts` is properly configured for theme support:

```ts
import type { Config } from "tailwindcss"

const config: Config = {
  darkMode: ["class"],
  content: [
    './pages/**/*.{ts,tsx}',
    './components/**/*.{ts,tsx}',
    './app/**/*.{ts,tsx}',
    './src/**/*.{ts,tsx}',
  ],
  theme: {
    container: {
      center: true,
      padding: "2rem",
      screens: {
        "2xl": "1400px",
      },
    },
    extend: {
      colors: {
        border: "hsl(var(--border))",
        input: "hsl(var(--input))",
        ring: "hsl(var(--ring))",
        background: "hsl(var(--background))",
        foreground: "hsl(var(--foreground))",
        primary: {
          DEFAULT: "hsl(var(--primary))",
          foreground: "hsl(var(--primary-foreground))",
        },
        secondary: {
          DEFAULT: "hsl(var(--secondary))",
          foreground: "hsl(var(--secondary-foreground))",
        },
        destructive: {
          DEFAULT: "hsl(var(--destructive))",
          foreground: "hsl(var(--destructive-foreground))",
        },
        muted: {
          DEFAULT: "hsl(var(--muted))",
          foreground: "hsl(var(--muted-foreground))",
        },
        accent: {
          DEFAULT: "hsl(var(--accent))",
          foreground: "hsl(var(--accent-foreground))",
        },
        popover: {
          DEFAULT: "hsl(var(--popover))",
          foreground: "hsl(var(--popover-foreground))",
        },
        card: {
          DEFAULT: "hsl(var(--card))",
          foreground: "hsl(var(--card-foreground))",
        },
      },
      borderRadius: {
        lg: "var(--radius)",
        md: "calc(var(--radius) - 2px)",
        sm: "calc(var(--radius) - 4px)",
      },
      keyframes: {
        "accordion-down": {
          from: { height: "0" },
          to: { height: "var(--radix-accordion-content-height)" },
        },
        "accordion-up": {
          from: { height: "var(--radix-accordion-content-height)" },
          to: { height: "0" },
        },
      },
      animation: {
        "accordion-down": "accordion-down 0.2s ease-out",
        "accordion-up": "accordion-up 0.2s ease-out",
      },
    },
  },
  plugins: [require("tailwindcss-animate")],
}

export default config
```

## Step 6: Testing Dark Mode

1. Run your development server and navigate to a page where the ThemeToggle is visible
2. Click the ThemeToggle to switch between light and dark modes
3. Verify that all components correctly update their styling based on the theme
4. Test with "system" theme by changing your OS preferences and refreshing the page

## Troubleshooting

### Theme not applying immediately

If the theme isn't applying immediately, you might be experiencing hydration issues. Make sure:
- The `suppressHydrationWarning` attribute is added to the `html` tag
- You're using the 'use client' directive in your ThemeProvider component

### Components not changing with theme

If components aren't responding to theme changes, check:
- The component is using theme-aware CSS variables (like `bg-background` instead of `bg-white`)
- The component is a child of the ThemeProvider
- Your global CSS includes both light and dark theme variables

### Custom components not reflecting theme changes

For custom components to work with the theme system:
1. Use CSS variables defined in your globals.css
2. Avoid hardcoded colors
3. Use semantic class names like `bg-card` and `text-card-foreground`

## Best Practices

1. **Prefer Semantic Color Names**: Use `bg-primary` instead of `bg-blue-500`
2. **Test Both Themes**: Always test your components in both light and dark mode
3. **Consider User Preferences**: Default to system theme when possible
4. **Provide Visual Feedback**: Ensure the ThemeToggle clearly indicates the current theme
5. **Subtle Transitions**: Add subtle transitions when changing themes for a better user experience:

```css
/* Add to your globals.css */
html {
  transition: background-color 0.3s ease;
}
``` 