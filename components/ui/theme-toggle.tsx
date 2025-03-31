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
          <div className="relative w-8 h-8 flex items-center justify-center">
            <Image 
              src="/only_these/logos/welcome_to_pack.png"
              alt="Wolf Icon"
              width={24}
              height={24}
              className="w-6 h-6"
            />
          </div>
          <span>Portland</span>
        </>
      ) : (
        <>
          <div className="relative w-8 h-8 flex items-center justify-center">
            <Image 
              src="/only_these/logos/welcome_to_pack.png"
              alt="Wolf Icon"
              width={24}
              height={24}
              className="w-6 h-6"
            />
          </div>
          <span>Salem</span>
        </>
      )}
    </Button>
  )
} 