import { useEffect, useRef, useState } from "react"
import { ChevronDown, ChevronLeft, ChevronRight, ChevronUp } from "lucide-react"
import gsap from "gsap"

import { cn } from "@/lib/utils"
import {
  REEL_CENTER_INDEX,
  REEL_TILE_SIZE,
  REEL_VISIBLE_COUNT,
  buildReelStrip,
} from "@/lib/reel"

const CROSS_AXIS_SIZE = REEL_TILE_SIZE * 2
const ARROW_GUTTER = 40
const DESKTOP_TILE_WIDTH = 160
const DESKTOP_TILE_HEIGHT = 140

// Root font-size bumps up (see index.css) past this width, so the gap grows
// to match — kept in sync with Tailwind's `lg` breakpoint (1024px).
const LARGE_FONT_QUERY = "(min-width: 1024px)"
const GAP_DEFAULT = 25
const GAP_LARGE = 35

type ReelProps = {
  amount: number
  start: boolean
  onComplete: () => void
}

export function Reel({ amount, start, onComplete }: ReelProps) {
  const stripRef = useRef<HTMLDivElement>(null)
  const [{ values, targetIndex }] = useState(() => buildReelStrip(amount))
  const [isDesktop, setIsDesktop] = useState(
    () => window.matchMedia("(min-width: 768px)").matches
  )
  const [isLargeFont, setIsLargeFont] = useState(
    () => window.matchMedia(LARGE_FONT_QUERY).matches
  )
  const gap = isLargeFont ? GAP_LARGE : GAP_DEFAULT

  useEffect(() => {
    const mql = window.matchMedia("(min-width: 768px)")
    const onChange = () => setIsDesktop(mql.matches)
    mql.addEventListener("change", onChange)
    return () => mql.removeEventListener("change", onChange)
  }, [])

  useEffect(() => {
    const mql = window.matchMedia(LARGE_FONT_QUERY)
    const onChange = () => setIsLargeFont(mql.matches)
    mql.addEventListener("change", onChange)
    return () => mql.removeEventListener("change", onChange)
  }, [])

  useEffect(() => {
    if (!start) return
    const strip = stripRef.current
    const firstTile = strip?.children[0] as HTMLElement | undefined
    if (!strip || !firstTile) return

    const axis = isDesktop ? "x" : "y"
    // Desktop tiles are fluid-width, so the per-tile step is measured from
    // the rendered DOM rather than assumed from a fixed constant.
    const tileRect = firstTile.getBoundingClientRect()
    const tileSize = (isDesktop ? tileRect.width : tileRect.height) + gap
    const offset = -(targetIndex - REEL_CENTER_INDEX) * tileSize
    const tween = gsap.to(strip, {
      [axis]: offset,
      duration: 12,
      ease: "power4.out",
      onComplete,
    })

    return () => {
      tween.kill()
    }
    // Axis/gap/onComplete are frozen to whatever was current when `start`
    // flips to true — re-running this on later re-renders would restart or
    // break the already-playing tween.
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [start])

  const mobileViewportHeight =
    REEL_VISIBLE_COUNT * REEL_TILE_SIZE + (REEL_VISIBLE_COUNT - 1) * gap
  const desktopViewportWidth =
    REEL_VISIBLE_COUNT * DESKTOP_TILE_WIDTH + (REEL_VISIBLE_COUNT - 1) * gap

  const viewportStyle = isDesktop
    ? { width: desktopViewportWidth, height: DESKTOP_TILE_HEIGHT }
    : { width: CROSS_AXIS_SIZE, height: mobileViewportHeight }

  const tileStyle = isDesktop
    ? { width: DESKTOP_TILE_WIDTH, height: DESKTOP_TILE_HEIGHT }
    : { width: CROSS_AXIS_SIZE, height: REEL_TILE_SIZE }

  const wrapperStyle = isDesktop
    ? { width: desktopViewportWidth, height: DESKTOP_TILE_HEIGHT + ARROW_GUTTER * 2 }
    : { width: CROSS_AXIS_SIZE + ARROW_GUTTER * 2, height: mobileViewportHeight }

  return (
    <div className="relative mx-auto flex items-center justify-center" style={wrapperStyle}>
      <div className="relative overflow-hidden" style={viewportStyle}>
        <div
          ref={stripRef}
          className={cn("flex", isDesktop ? "flex-row" : "flex-col")}
          style={{ gap }}
        >
          {values.map((value, index) => (
            <div
              key={index}
              className={cn(
                "border-border bg-card text-card-foreground flex shrink-0 items-center justify-center rounded-2xl border font-bold",
                isDesktop ? "text-4xl" : "text-2xl"
              )}
              style={tileStyle}
            >
              {value.toLocaleString("ru-RU")}
            </div>
          ))}
        </div>
      </div>

      {isDesktop ? (
        <>
          <ChevronDown className="text-primary pointer-events-none absolute top-0 left-1/2 size-8 -translate-x-1/2" />
          <ChevronUp className="text-primary pointer-events-none absolute bottom-0 left-1/2 size-8 -translate-x-1/2" />
        </>
      ) : (
        <>
          <ChevronRight className="text-primary pointer-events-none absolute top-1/2 left-0 size-8 -translate-y-1/2" />
          <ChevronLeft className="text-primary pointer-events-none absolute top-1/2 right-0 size-8 -translate-y-1/2" />
        </>
      )}
    </div>
  )
}
