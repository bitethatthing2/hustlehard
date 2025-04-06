"use client"

import * as React from "react"
import { Slot } from "@radix-ui/react-slot"
import { cva, type VariantProps } from "class-variance-authority"

import { cn } from "@/lib/utils"

const buttonVariants = cva(
  "inline-flex items-center justify-center gap-2 rounded-full text-sm font-medium transition-colors focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 disabled:pointer-events-none disabled:opacity-50 [&_svg]:shrink-0 [&_svg]:transition-colors [&_svg]:rounded-full",
  {
    variants: {
      variant: {
        default: "bg-black text-white hover:bg-black/90 dark:bg-white dark:text-black dark:hover:bg-white/90 [&_svg]:bg-white [&_svg]:text-black dark:[&_svg]:bg-black dark:[&_svg]:text-white [&_svg]:p-0.5",
        destructive:
          "bg-black text-white hover:bg-black/90 dark:bg-white dark:text-black dark:hover:bg-white/90 [&_svg]:bg-white [&_svg]:text-black dark:[&_svg]:bg-black dark:[&_svg]:text-white [&_svg]:p-0.5",
        outline:
          "bg-black text-white hover:bg-black/90 dark:bg-white dark:text-black dark:hover:bg-white/90 [&_svg]:bg-white [&_svg]:text-black dark:[&_svg]:bg-black dark:[&_svg]:text-white [&_svg]:p-0.5",
        secondary:
          "bg-black text-white hover:bg-black/90 dark:bg-white dark:text-black dark:hover:bg-white/90 [&_svg]:bg-white [&_svg]:text-black dark:[&_svg]:bg-black dark:[&_svg]:text-white [&_svg]:p-0.5",
        ghost: "bg-black text-white hover:bg-black/90 dark:bg-white dark:text-black dark:hover:bg-white/90 [&_svg]:bg-white [&_svg]:text-black dark:[&_svg]:bg-black dark:[&_svg]:text-white [&_svg]:p-0.5",
        link: "bg-black text-white hover:bg-black/90 dark:bg-white dark:text-black dark:hover:bg-white/90 [&_svg]:bg-white [&_svg]:text-black dark:[&_svg]:bg-black dark:[&_svg]:text-white [&_svg]:p-0.5",
        hustle: "bg-black text-white hover:bg-black/90 dark:bg-white dark:text-black dark:hover:bg-white/90 [&_svg]:bg-white [&_svg]:text-black dark:[&_svg]:bg-black dark:[&_svg]:text-white [&_svg]:p-0.5",
      },
      size: {
        default: "h-16 px-8 [&_svg]:h-8 [&_svg]:w-8",
        sm: "h-14 px-6 [&_svg]:h-8 [&_svg]:w-8",
        lg: "h-18 px-10 [&_svg]:h-8 [&_svg]:w-8",
        icon: "h-10 w-10 [&_svg]:h-7 [&_svg]:w-7",
        "icon-lg": "h-14 w-14 [&_svg]:h-10 [&_svg]:w-10",
      },
    },
    defaultVariants: {
      variant: "default",
      size: "default",
    },
  }
)

export interface ButtonProps
  extends React.ButtonHTMLAttributes<HTMLButtonElement>,
    VariantProps<typeof buttonVariants> {
  asChild?: boolean
}

const Button = React.forwardRef<HTMLButtonElement, ButtonProps>(
  ({ className, variant, size, asChild = false, ...props }, ref) => {
    const Comp = asChild ? Slot : "button"
    return (
      <Comp
        className={cn(buttonVariants({ variant, size, className }))}
        ref={ref}
        {...props}
      />
    )
  }
)
Button.displayName = "Button"

export { Button, buttonVariants }
