"use client"

import { Moon, Sun } from "lucide-react"
import { useTheme } from "next-themes"
import { Button } from "@/components/ui/button"
import Image from "next/image"
import { cn } from "@/lib/utils"

interface ThemeToggleProps {
  onToggle?: (theme: string) => void;
  className?: string;
}

export function ThemeToggle({ onToggle, className }: ThemeToggleProps) {
  const { theme, setTheme } = useTheme()
  
  // Toggle between 'light' (Salem) and 'dark' (Portland)
  const toggleTheme = () => {
    const newTheme = theme === "dark" ? "light" : "dark"
    setTheme(newTheme)
    if (onToggle) {
      onToggle(newTheme)
    }
  }

  return (
    <Button
      variant="outline"
      size="lg"
      onClick={toggleTheme}
      className={cn(
        "rounded-full p-2 bg-transparent text-white border border-white hover:bg-white/10 flex items-center justify-center",
        className
      )}
      aria-label={theme === "dark" ? "Switch to light theme" : "Switch to dark theme"}
    >
      <div className="flex items-center justify-center">
        <Image
          src="/icon-192x192.png"
          alt="Location Icon"
          width={48}
          height={48}
          className="w-12 h-12 object-contain"
        />
      </div>
      <span className="ml-2 text-white">
        {theme === "dark" ? "Portland" : "Salem"}
      </span>
    </Button>
  )
} 