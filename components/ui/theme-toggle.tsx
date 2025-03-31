import * as React from "react"
import { useTheme } from "next-themes"
import { Button } from "@/components/ui/button"
import { Moon, Sun } from "lucide-react"

export function ThemeToggle({ onToggle }: { onToggle?: (theme: string) => void }) {
  const { theme, setTheme } = useTheme()

  const handleToggle = () => {
    const newTheme = theme === "dark" ? "light" : "dark";
    setTheme(newTheme);
    if (onToggle) {
      onToggle(newTheme);
    }
  }

  return (
    <div className="flex items-center gap-2">
      <Button
        variant="outline"
        onClick={handleToggle}
        className="rounded-full bg-white text-black border border-gray-300 hover:bg-gray-100 shadow-md px-4 py-2 h-10"
        aria-label="Toggle location image"
      >
        {theme === 'dark' ? (
          <div className="flex items-center gap-2">
            <Moon className="h-5 w-5" />
            <span className="font-medium">Portland</span>
          </div>
        ) : (
          <div className="flex items-center gap-2">
            <Sun className="h-5 w-5" />
            <span className="font-medium">Salem</span>
          </div>
        )}
      </Button>
    </div>
  )
} 