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
}

function clamp(n: number, min: number, max: number): number {
  return Math.max(min, Math.min(max, n))
}

function punctuationPauseMs(word: string): number {
  if (/[.!?]$/.test(word)) return 80
  if (/[,;:]$/.test(word)) return 40
  return 0
}

export default function ScrambleWords({
  text,
  className,
  wordsPerMinute = 800,
  baseWordDurationMs = 80,
}: ScrambleWordsProps): JSX.Element {
  const tokens = text.split(/(\s+)/)

  const msPerWord = clamp(Math.round(60000 / wordsPerMinute), 60, 150)

  let cumulativeDelay = 0

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
        const durationMs = clamp(baseWordDurationMs + word.length * 3, 100, 250)
        const delayMs = cumulativeDelay

        cumulativeDelay += clamp(msPerWord + word.length * 2, 50, 150) + punctuationPauseMs(word)

        return (
          <ScrambleText
            key={`w-${i}`}
            text={word}
            delayMs={delayMs}
            durationMs={durationMs}
            scrambleChars='etaoinshrdlucm'
            scrambleRefreshChance={0.12}
          />
        )
      })}
    </span>
  )
}

