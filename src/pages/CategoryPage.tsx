import { useState } from "react"
import { useNavigate } from "react-router-dom"

import { Button } from "@/components/ui/button"
import { cn } from "@/lib/utils"
import {
  CATEGORIES,
  generateAmount,
  writeStarfallState,
  type StarfallCategorySlug,
} from "@/lib/starfall"

export default function CategoryPage() {
  const navigate = useNavigate()
  const [selected, setSelected] = useState<StarfallCategorySlug | null>(null)
  const [error, setError] = useState<string | null>(null)

  function handleSelect(slug: StarfallCategorySlug) {
    setSelected(slug)
    setError(null)
  }

  function handleSubmit() {
    if (!selected) {
      setError("Выберите категорию")
      return
    }

    const amount = generateAmount()
    writeStarfallState(selected, amount)
    navigate("/game")
  }

  return (
    <div className="mx-auto flex w-full max-w-2xl flex-col items-center px-4 py-12 text-center">
      <h1 className='leading-normal'>Твой бонус до 5000 ₽ в любимой категории</h1>
      <p className="text-muted-foreground max-w-xl">
        Подбери категорию (техника, одежда, путешествия или мебель) и узнай
        размер своего персонального купона. Оформить карту «Тест» и
        потратить бонус — проще, чем кажется.
      </p>

      <div className="mt-10 grid w-full grid-cols-2 gap-3 sm:grid-cols-3">
        {CATEGORIES.map(({ slug, label, icon: Icon }) => {
          const isSelected = selected === slug
          return (
            <button
              key={slug}
              type="button"
              aria-pressed={isSelected}
              onClick={() => handleSelect(slug)}
              className={cn(
                "flex flex-col items-center gap-2 rounded-2xl border bg-card p-4 text-center text-sm font-medium text-card-foreground transition-colors",
                "hover:border-primary/50 hover:bg-primary/5",
                isSelected
                  ? "border-primary bg-primary/10 ring-2 ring-primary/40"
                  : "border-border"
              )}
            >
              <Icon
                className={cn(
                  "size-6",
                  isSelected ? "text-primary" : "text-muted-foreground"
                )}
              />
              {label}
            </button>
          )
        })}
      </div>

      {error && (
        <p role="alert" className="mt-4 text-sm font-medium text-destructive">
          {error}
        </p>
      )}

      <Button size="lg" className="mt-8 w-full sm:w-auto" onClick={handleSubmit}>
        Получить размер бонуса
      </Button>
    </div>
  )
}
