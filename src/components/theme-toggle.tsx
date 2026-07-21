import { Moon, Sun } from "lucide-react"

import { Button } from "@/components/ui/button"
import { useTheme } from "@/hooks/use-theme"

export function ThemeToggle() {
  const { theme, toggleTheme } = useTheme()

  return (
    <Button
      variant="ghost"
      size="icon"
      aria-label="Переключить тему"
      onClick={toggleTheme}
    >
      {theme === "dark" ? <Sun /> : <Moon />}
    </Button>
  )
}
