"use client"

import { Moon, Sun } from "lucide-react"
import { useTheme } from "next-themes"
import { Button } from "@/components/ui/button"
import Image from "next/image"

interface ThemeToggleProps {
  onToggle?: (theme: string) => void;
}

export function ThemeToggle({ onToggle }: ThemeToggleProps) {
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
      className="w-auto px-4 py-2 rounded-md font-medium flex items-center gap-2 bg-transparent text-white border border-white hover:bg-white/10"
    >
      {theme === "dark" ? (
        <>
          <Image 
            src="/only_these/logos/SHB_Logo_WhiteonBlackBG.png"
            alt="Portland"
            width={32}
            height={32}
            className="w-8 h-8"
          />
          <span>Portland</span>
        </>
      ) : (
        <>
          <div className="relative">
            <Image 
              src="/salem_location.png"
              alt="Salem"
              width={32}
              height={32}
              className="w-8 h-8"
            />
            <Image 
              src="/only_these/logos/welcome_to_pack.png"
              alt="Wolf Icon"
              width={20}
              height={20}
              className="absolute -right-1 -bottom-1 w-5 h-5"
            />
          </div>
          <span>Salem</span>
        </>
      )}
    </Button>
  )
} 