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
      variant="default"
      size="lg"
      onClick={toggleTheme}
      className={cn(
        "rounded-full p-2 bg-white text-black font-bold border border-white hover:bg-white hover:text-black focus:bg-white focus:text-black active:bg-white active:text-black flex items-center justify-center",
        className
      )}
      aria-label={theme === "dark" ? "Switch to light theme" : "Switch to dark theme"}
    >
      <div className="flex items-center justify-center">
        <div className="w-12 h-12 flex items-center justify-center rounded-full bg-black">
          <Image
            src="/only_these/logos/salem_portland_toggle_icon.png"
            alt="Location Toggle Icon"
            width={55}
            height={55}
            className="w-11 h-11 object-contain scale-110"
          />
        </div>
      </div>
      <span className="ml-2 font-bold text-black">
        {theme === "dark" ? "Portland" : "Salem"}
      </span>
    </Button>
  )
} 