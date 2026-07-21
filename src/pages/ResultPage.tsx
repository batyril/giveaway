import { useEffect, useState } from "react"
import { useNavigate } from "react-router-dom"

import { Button } from "@/components/ui/button"
import { CATEGORIES, readStarfallState, type StarfallState } from "@/lib/starfall"

// TODO: replace with the real "тест" card application form URL.
const HALVA_APPLICATION_URL = "#"

const STEPS = [
  {
    title: "Оформите карту «тест»",
    description:
      "Это бесплатно и займет всего пару минут. Кликните кнопку ниже, чтобы начать.",
  },
  {
    title: "Дождитесь промокода",
    description:
      "Сразу после успешного оформления карты в вашем личном кабинете в приложении «тест» автоматически появится уникальный промокод на этот номинал.",
  },
]

export default function ResultPage() {
  const navigate = useNavigate()
  const [state, setState] = useState<StarfallState | null>(null)

  useEffect(() => {
    const saved = readStarfallState()
    if (!saved) {
      navigate("/", { replace: true })
      return
    }
    setState(saved)
  }, [navigate])

  if (!state) return null

  const category = CATEGORIES.find((c) => c.slug === state.category)
  const categoryLabel = category?.label ?? state.category

  function handleApply() {
    const params = new URLSearchParams({
      category: state!.category,
      amount: String(state!.amount),
      source: "starfall",
    })
    window.location.href = `${HALVA_APPLICATION_URL}?${params.toString()}`
  }

  return (
    <div className="mx-auto flex w-full max-w-2xl flex-col items-center gap-10 px-4 py-16 text-center">
      <h1>Поздравляем!</h1>

      <p className="text-primary text-6xl font-extrabold">
        {state.amount.toLocaleString("ru-RU")} ₽
      </p>

      <div className="border-border bg-card w-full rounded-2xl border p-6 text-left sm:p-8">
        <dl className="flex flex-col gap-3">
          <div className="flex items-center justify-between gap-4">
            <dt className="text-muted-foreground">На категорию</dt>
            <dd className="font-medium">{categoryLabel}</dd>
          </div>
          <div className="flex items-center justify-between gap-4">
            <dt className="text-muted-foreground">Статус</dt>
            <dd className="font-medium">⏳ Ожидает активации</dd>
          </div>
        </dl>
      </div>

      <div className="w-full text-left">
        <h2>Как активировать выгоду</h2>
        <p className="text-muted-foreground mb-4">
          Чтобы превратить этот бонус в реальные покупки, выполните следующие
          шаги:
        </p>

        <ol className="flex flex-col gap-4">
          {STEPS.map((step, index) => (
            <li key={step.title} className="flex gap-3">
              <span className="bg-primary text-primary-foreground flex size-7 shrink-0 items-center justify-center rounded-full text-sm font-bold">
                {index + 1}
              </span>
              <div>
                <p className="font-medium">{step.title}</p>
                <p className="text-muted-foreground text-sm">
                  {step.description}
                </p>
              </div>
            </li>
          ))}
          <li className="flex gap-3">
            <span className="bg-primary text-primary-foreground flex size-7 shrink-0 items-center justify-center rounded-full text-sm font-bold">
              {STEPS.length + 1}
            </span>
            <div>
              <p className="font-medium">Совершите первую покупку</p>
              <p className="text-muted-foreground text-sm">
                Сделайте покупку у любого партнера из категории{" "}
                {categoryLabel} на сумму от 1 000 ₽ и примените полученный
                промокод в корзине. Бонус будет списан автоматически!
              </p>
            </div>
          </li>
        </ol>
      </div>

      <div className="flex flex-col items-center gap-2">
        <Button size="lg" onClick={handleApply}>
          Оформить карту «Тест»
        </Button>
        <p className="text-muted-foreground text-xs">
          Промокод придет в приложение сразу после оформления
        </p>
      </div>
    </div>
  )
}
