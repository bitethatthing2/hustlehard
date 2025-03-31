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
        "w-auto px-4 py-2 rounded-md font-medium flex items-center gap-2 bg-transparent text-white border border-white hover:bg-white/10",
        className
      )}
      aria-label={theme === "dark" ? "Switch to light theme" : "Switch to dark theme"}
    >
      <div className="relative w-8 h-8 flex items-center justify-center">
        <Image 
          src="/only_these/logos/welcome_to_pack.png"
          alt="Wolf Icon"
          width={32}
          height={32}
          className="w-8 h-8"
        />
      </div>
      <span className="text-white">
        {theme === "dark" ? "Portland" : "Salem"}
      </span>
    </Button>
  )
} 