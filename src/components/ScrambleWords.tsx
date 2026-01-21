import ScrambleText from './ScrambleText'

type ScrambleWordsProps = {
  text: string
  className?: string
  /**
   * Approximate reading speed. Higher = faster.
   */
  wordsPerMinute?: number
  /**
   * Base scramble duration per word (ms). Actual is adjusted by word length.
   */
  baseWordDurationMs?: number
  /**
   * Delay before the entire paragraph animation starts (ms).
   */
  paragraphDelayMs?: number
}

function clamp(n: number, min: number, max: number): number {
  return Math.max(min, Math.min(max, n))
}

function punctuationPauseMs(word: string): number {
  if (/[.!?]$/.test(word)) return 60
  if (/[,;:]$/.test(word)) return 30
  return 0
}

export default function ScrambleWords({
  text,
  className,
  wordsPerMinute = 2500,
  baseWordDurationMs = 30,
  paragraphDelayMs = 0,
}: ScrambleWordsProps): JSX.Element {
  const tokens = text.split(/(\s+)/)

  const msPerWord = clamp(Math.round(60000 / wordsPerMinute), 40, 120)

  let cumulativeDelay = paragraphDelayMs

  return (
    <span className={className} style={{ display: 'inline' }}>
      {tokens.map((token, i) => {
        if (/^\s+$/.test(token)) {
          return (
            <span key={`ws-${i}`} aria-hidden='true' style={{ display: 'inline' }}>
              {token}
            </span>
          )
        }

        const word = token
        const durationMs = clamp(baseWordDurationMs + word.length * 3, 80, 200)
        const delayMs = cumulativeDelay

        cumulativeDelay += clamp(msPerWord + word.length * 2, 40, 120) + punctuationPauseMs(word)

        return (
          <ScrambleText
            key={`w-${i}`}
            text={word}
            delayMs={delayMs}
            wordDurationMs={durationMs}
            animationKey={text}
          />
        )
      })}
    </span>
  )
}

