import { useEffect, useMemo, useRef, useState } from 'react'

type ScrambleTextProps = {
  text: string
  className?: string
  /**
   * Delay before scrambling starts (ms). Useful for subtle staggering.
   */
  delayMs?: number
  /**
   * Approximate animation duration (ms).
   */
  durationMs?: number
  /**
   * Characters used during scrambling.
   */
  scrambleChars?: string
  /**
   * Probability to refresh the random character each frame.
   * Lower = smoother/less noisy.
   */
  scrambleRefreshChance?: number
}

type QueueItem = {
  from: string
  to: string
  start: number
  end: number
  char?: string
}

const DEFAULT_SCRAMBLE_CHARS = 'etaoinshrdlucm'
const DEFAULT_FADE_FROM_OPACITY = 0.5

function isAsciiLetter(char: string): boolean {
  return /^[A-Za-z]$/.test(char)
}

function usePrefersReducedMotion(): boolean {
  const [reduced, setReduced] = useState(false)

  useEffect(() => {
    const media = window.matchMedia?.('(prefers-reduced-motion: reduce)')
    if (!media) return

    const update = () => setReduced(media.matches)
    update()

    if (typeof media.addEventListener === 'function') {
      media.addEventListener('change', update)
      return () => media.removeEventListener('change', update)
    }
    media.addListener(update)
    return () => media.removeListener(update)
  }, [])

  return reduced
}

export default function ScrambleText({
  text,
  className,
  delayMs = 0,
  durationMs = 450,
  scrambleChars = DEFAULT_SCRAMBLE_CHARS,
  scrambleRefreshChance = 0.15,
}: ScrambleTextProps): JSX.Element {
  const prefersReducedMotion = usePrefersReducedMotion()
  const scrambleCharsArr = useMemo(() => scrambleChars.split(''), [scrambleChars])

  const [render, setRender] = useState<{ text: string; opacity: number }>({
    text,
    opacity: 1,
  })

  const prevTextRef = useRef(text)
  const rafRef = useRef<number | null>(null)
  const timeoutRef = useRef<number | null>(null)
  const containerRef = useRef<HTMLSpanElement>(null)

  useEffect(() => {
    if (prefersReducedMotion) {
      prevTextRef.current = text
      setRender({ text, opacity: 1 })
      return
    }

    if (text === prevTextRef.current) return

    const from = prevTextRef.current
    const to = text
    prevTextRef.current = text

    const fps = 60
    const totalFrames = Math.max(1, Math.round((durationMs / 1000) * fps))
    const maxLen = Math.max(from.length, to.length)

    const randomInt = (min: number, max: number) =>
      Math.floor(Math.random() * (max - min + 1)) + min

    const randomCharForTarget = (target: string) => {
      const base = scrambleCharsArr[Math.floor(Math.random() * scrambleCharsArr.length)] ?? ''
      if (!target) return base
      return target.toUpperCase() === target ? base.toUpperCase() : base.toLowerCase()
    }

    const queue: QueueItem[] = Array.from({ length: maxLen }, (_, i) => {
      const start = randomInt(0, Math.floor(totalFrames * 0.25))
      const end = randomInt(start + 1, totalFrames)
      const toChar = to[i] ?? ''
      const fromChar = from[i] ?? ''

      if (!isAsciiLetter(toChar)) {
        return {
          from: fromChar,
          to: toChar,
          start: 0,
          end: 0,
        }
      }

      return {
        from: fromChar,
        to: toChar,
        start,
        end,
      }
    })

    const startAnimation = () => {
      let frame = 0

      const tick = () => {
        let output = ''
        let complete = 0
        const progress = Math.min(1, frame / totalFrames)
        const opacity =
          DEFAULT_FADE_FROM_OPACITY + (1 - DEFAULT_FADE_FROM_OPACITY) * progress

        for (let i = 0; i < queue.length; i++) {
          const item = queue[i]
          if (!item) continue

          if (frame >= item.end) {
            complete++
            output += item.to
            continue
          }

          if (frame >= item.start) {
            if (!item.char || Math.random() < scrambleRefreshChance) {
              item.char = randomCharForTarget(item.to)
            }
            output += item.char
            continue
          }

          output += item.from
        }

        setRender({ text: output, opacity })

        if (complete === queue.length) {
          if (rafRef.current) cancelAnimationFrame(rafRef.current)
          rafRef.current = null
          setRender({ text: to, opacity: 1 })
          return
        }

        frame++
        rafRef.current = requestAnimationFrame(tick)
      }

      if (rafRef.current) cancelAnimationFrame(rafRef.current)
      rafRef.current = requestAnimationFrame(tick)
    }

    if (timeoutRef.current) window.clearTimeout(timeoutRef.current)
    timeoutRef.current = window.setTimeout(() => {
      setRender({ text: from, opacity: DEFAULT_FADE_FROM_OPACITY })
      startAnimation()
    }, Math.max(0, delayMs))

    return () => {
      if (timeoutRef.current) window.clearTimeout(timeoutRef.current)
      timeoutRef.current = null
      if (rafRef.current) cancelAnimationFrame(rafRef.current)
      rafRef.current = null
    }
  }, [
    delayMs,
    durationMs,
    prefersReducedMotion,
    scrambleCharsArr,
    scrambleRefreshChance,
    text,
  ])

  return (
    <span
      ref={containerRef}
      className={className}
      aria-label={text}
      style={{
        display: 'inline',
        whiteSpace: 'pre-wrap',
      }}
    >
      <span
        aria-hidden='true'
        style={{
          opacity: render.opacity,
          transition: 'opacity 0.1s ease-out',
        }}
      >
        {render.text}
      </span>
      <span className='sr-only'>{text}</span>
    </span>
  )
}

