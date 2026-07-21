import { AMOUNT_MAX, AMOUNT_MIN, AMOUNT_STEP } from "@/lib/starfall"

/** px per tile, along the scroll axis — matches Tailwind's `24` spacing scale (6rem) */
export const REEL_TILE_SIZE = 96
export const REEL_VISIBLE_COUNT = 5
export const REEL_CENTER_INDEX = Math.floor(REEL_VISIBLE_COUNT / 2)

const REEL_FILLER_BEFORE = 24
const REEL_FILLER_AFTER = REEL_CENTER_INDEX

const REEL_VALUES: number[] = []
for (let v = AMOUNT_MIN; v <= AMOUNT_MAX; v += AMOUNT_STEP) {
  REEL_VALUES.push(v)
}

// Lower amounts are weighted to appear far more often than the 5000 ceiling,
// so the spinning strip *feels* like the big prize is rare — purely visual,
// unrelated to the already-generated (uniform-random) awarded amount.
const REEL_WEIGHTS = REEL_VALUES.map(
  (v) => (AMOUNT_MAX - v) / AMOUNT_STEP + 1
)
const REEL_TOTAL_WEIGHT = REEL_WEIGHTS.reduce((sum, w) => sum + w, 0)

function pickWeightedAmount(): number {
  let threshold = Math.random() * REEL_TOTAL_WEIGHT
  for (let i = 0; i < REEL_VALUES.length; i++) {
    threshold -= REEL_WEIGHTS[i]
    if (threshold <= 0) return REEL_VALUES[i]
  }
  return REEL_VALUES[REEL_VALUES.length - 1]
}

export type ReelStrip = {
  values: number[]
  targetIndex: number
}

/** Builds a filler strip with `target` placed so it lands centered once scrolled. */
export function buildReelStrip(target: number): ReelStrip {
  const before = Array.from({ length: REEL_FILLER_BEFORE }, pickWeightedAmount)
  const after = Array.from({ length: REEL_FILLER_AFTER }, pickWeightedAmount)
  return {
    values: [...before, target, ...after],
    targetIndex: before.length,
  }
}
