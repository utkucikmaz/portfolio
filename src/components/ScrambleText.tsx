import { useEffect, useRef, useState } from 'react'

type ScrambleTextProps = {
  text: string
  className?: string
  /**
   * Delay before animation starts (ms). Useful for subtle staggering.
   */
  delayMs?: number
  /**
   * Duration for the fade transition (ms).
   */
  wordDurationMs?: number
  /**
   * Force a re-animation trigger (useful for synchronizing multiple components)
   */
  animationKey?: string | number
  /**
   * @deprecated No longer used - kept for backward compatibility
   */
  wordDelayMs?: number
  /**
   * @deprecated No longer used - kept for backward compatibility
   */
  durationMs?: number
  /**
   * @deprecated No longer used - kept for backward compatibility
   */
  scrambleChars?: string
  /**
   * @deprecated No longer used - kept for backward compatibility
   */
  scrambleRefreshChance?: number
}

const DEFAULT_FADE_FROM_OPACITY = 0.25
const DEFAULT_FADE_DURATION = 250

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
  wordDurationMs,
  animationKey,
  wordDelayMs: _wordDelayMs, // backward compatibility - ignored
  durationMs, // backward compatibility
  // eslint-disable-next-line @typescript-eslint/no-unused-vars
  scrambleChars, // backward compatibility - ignored
  // eslint-disable-next-line @typescript-eslint/no-unused-vars
  scrambleRefreshChance, // backward compatibility - ignored
}: ScrambleTextProps): JSX.Element {
  // Use durationMs if provided for backward compatibility, otherwise use default
  const fadeDuration = wordDurationMs ?? durationMs ?? DEFAULT_FADE_DURATION
  const prefersReducedMotion = usePrefersReducedMotion()
  const [opacity, setOpacity] = useState(DEFAULT_FADE_FROM_OPACITY)
  const prevTextRef = useRef(text)
  const timeoutRef = useRef<number | null>(null)
  const containerRef = useRef<HTMLSpanElement>(null)

  useEffect(() => {
    if (prefersReducedMotion) {
      prevTextRef.current = text
      setOpacity(1)
      return
    }

    if (timeoutRef.current) {
      window.clearTimeout(timeoutRef.current)
    }
    setOpacity(DEFAULT_FADE_FROM_OPACITY)
    prevTextRef.current = text

    timeoutRef.current = window.setTimeout(() => {
      setOpacity(1)
    }, delayMs)

    return () => {
      if (timeoutRef.current) {
        window.clearTimeout(timeoutRef.current)
        timeoutRef.current = null
      }
    }
  }, [text, delayMs, animationKey, prefersReducedMotion])

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
          opacity,
          transition: `opacity ${fadeDuration}ms cubic-bezier(0.4, 0, 0.2, 1)`,
        }}
      >
        {text}
      </span>
      <span className='sr-only'>{text}</span>
    </span>
  )
}

