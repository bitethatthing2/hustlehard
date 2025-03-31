import { ClassValue, clsx } from "clsx"
import { twMerge } from "tailwind-merge"

export function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs))
}

// Standard button styles matching Shadcn UI standards
export const buttonVariants = {
  default: "inline-flex items-center justify-center rounded-md text-sm font-medium transition-colors focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 disabled:opacity-50 disabled:pointer-events-none ring-offset-background bg-white text-black border border-input shadow-sm hover:bg-gray-50/80",
  primary: "bg-white text-black border-input hover:bg-gray-50/80",
  secondary: "bg-white text-black border-input hover:bg-gray-50/80",
  outline: "bg-white text-black border border-input hover:bg-gray-50/80",
  ghost: "bg-white text-black hover:bg-gray-50/80 border-transparent",
  destructive: "bg-white text-black border-destructive hover:bg-destructive/10 hover:text-destructive"
}

// Standard sizes for buttons
export const buttonSizes = {
  default: "h-10 py-2 px-4",
  sm: "h-9 px-3 rounded-md",
  lg: "h-11 px-8 rounded-md",
  icon: "h-10 w-10"
}

// Typography variants for consistent text styling
export const typographyVariants = {
  h1: "scroll-m-20 text-4xl font-extrabold tracking-tight lg:text-5xl",
  h2: "scroll-m-20 border-b pb-2 text-3xl font-semibold tracking-tight transition-colors first:mt-0",
  h3: "scroll-m-20 text-2xl font-semibold tracking-tight",
  h4: "scroll-m-20 text-xl font-semibold tracking-tight",
  p: "leading-7 [&:not(:first-child)]:mt-6",
  lead: "text-xl text-muted-foreground",
  large: "text-lg font-semibold",
  small: "text-sm font-medium leading-none",
  muted: "text-sm text-muted-foreground"
}

// Card styling variants
export const cardVariants = {
  default: "rounded-lg border bg-card text-card-foreground shadow-sm",
  outline: "rounded-lg border shadow-sm"
}
