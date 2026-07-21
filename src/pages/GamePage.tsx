import { useEffect, useState } from "react"
import { useNavigate } from "react-router-dom"

import { Button } from "@/components/ui/button"
import { Reel } from "@/components/starfall/reel"
import { readStarfallState } from "@/lib/starfall"

export default function GamePage() {
  const navigate = useNavigate()
  const [amount, setAmount] = useState<number | null>(null)
  const [started, setStarted] = useState(false)

  useEffect(() => {
    const state = readStarfallState()
    if (!state) {
      navigate("/", { replace: true })
      return
    }
    setAmount(state.amount)
  }, [navigate])

  function handleComplete() {
    window.setTimeout(() => navigate("/result"), 1200)
  }

  if (amount === null) return null

  return (
    <div className="mx-auto flex w-full max-w-5xl flex-col items-center gap-10 px-4 py-16 text-center">
      <div>
        <h1 className='leading-normal'>{started ? "Крутим барабан…" : "Готов узнать свой бонус?"}</h1>
        <p className="text-muted-foreground">
          {started
            ? "Определяем размер твоего бонуса в баллах"
            : "Нажми на кнопку и поймай свой приз"}
        </p>
      </div>

      <Reel amount={amount} start={started} onComplete={handleComplete} />

      {!started && (
        <Button size="lg" onClick={() => setStarted(true)}>
          Поймать приз
        </Button>
      )}
    </div>
  )
}
