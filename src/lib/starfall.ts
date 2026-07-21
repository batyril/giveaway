import {
  Car,
  Plane,
  Shirt,
  Smartphone,
  Sofa,
  Sparkles,
  type LucideIcon,
} from "lucide-react"

export const STARFALL_STORAGE_KEY = "starfall_state"

export type StarfallCategorySlug =
  | "clothing"
  | "electronics"
  | "furniture"
  | "travel"
  | "auto"
  | "beauty"

export type StarfallCategory = {
  slug: StarfallCategorySlug
  label: string
  icon: LucideIcon
}

export const CATEGORIES: StarfallCategory[] = [
  { slug: "clothing", label: "Одежда и аксессуары", icon: Shirt },
  { slug: "electronics", label: "Электроника", icon: Smartphone },
  { slug: "furniture", label: "Мебель и товары для дома", icon: Sofa },
  { slug: "travel", label: "Путешествия", icon: Plane },
  { slug: "auto", label: "Авто", icon: Car },
  { slug: "beauty", label: "Красота и здоровье", icon: Sparkles },
]

export type StarfallState = {
  played: boolean
  category: StarfallCategorySlug
  amount: number
  ts: number
}

export function readStarfallState(): StarfallState | null {
  try {
    const raw = localStorage.getItem(STARFALL_STORAGE_KEY)
    if (!raw) return null
    const parsed = JSON.parse(raw) as StarfallState
    return parsed.played ? parsed : null
  } catch {
    return null
  }
}

export function writeStarfallState(
  category: StarfallCategorySlug,
  amount: number
): StarfallState {
  const state: StarfallState = {
    played: true,
    category,
    amount,
    ts: Date.now(),
  }
  localStorage.setItem(STARFALL_STORAGE_KEY, JSON.stringify(state))
  return state
}

export const AMOUNT_MIN = 1000
export const AMOUNT_MAX = 5000
export const AMOUNT_STEP = 1000

export function generateAmount(): number {
  const steps = (AMOUNT_MAX - AMOUNT_MIN) / AMOUNT_STEP
  const index = Math.floor(Math.random() * (steps + 1))
  return AMOUNT_MIN + index * AMOUNT_STEP
}
