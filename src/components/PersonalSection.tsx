import { useState, useRef, useEffect, useMemo, lazy, Suspense } from 'react'
import { useTranslation } from 'react-i18next'
import { motion } from 'framer-motion'
import ScrambleWords from './ScrambleWords'

const HawkingRadiation = lazy(() => import('./HawkingRadiation'))

const FADE_DURATION = 250

function calculateParagraphDuration(
  text: string,
  wordsPerMinute: number = 2500,
  baseWordDurationMs: number = 30
): number {
  const tokens = text.split(/(\s+)/)
  const msPerWord = Math.max(
    40,
    Math.min(120, Math.round(60000 / wordsPerMinute))
  )

  let cumulativeDelay = 0
  let lastWordStartDelay = 0
  let lastWordDuration = 0

  for (const token of tokens) {
    if (/^\s+$/.test(token)) continue

    const word = token
    const durationMs = Math.max(
      80,
      Math.min(200, baseWordDurationMs + word.length * 3)
    )

    lastWordStartDelay = cumulativeDelay
    lastWordDuration = durationMs

    let pause = 0
    if (/[.!?]$/.test(word)) pause = 60
    else if (/[,;:]$/.test(word)) pause = 30

    cumulativeDelay +=
      Math.max(40, Math.min(120, msPerWord + word.length * 2)) + pause
  }

  return lastWordStartDelay + lastWordDuration + FADE_DURATION
}

const PersonalSection = (): JSX.Element => {
  const { t } = useTranslation()
  const [isUnformal, setIsUnformal] = useState(false)
  const [useScrambleAnimation, setUseScrambleAnimation] = useState(false)
  const hoverTimeoutRef = useRef<number | null>(null)

  useEffect(() => {
    return () => {
      if (hoverTimeoutRef.current) {
        window.clearTimeout(hoverTimeoutRef.current)
      }
    }
  }, [])

  const handleMouseEnter = () => {
    if (hoverTimeoutRef.current) {
      window.clearTimeout(hoverTimeoutRef.current)
    }
    hoverTimeoutRef.current = window.setTimeout(() => {
      setUseScrambleAnimation(true)
      setIsUnformal(true)
    }, 500)
  }

  const handleMouseLeave = () => {
    if (hoverTimeoutRef.current) {
      window.clearTimeout(hoverTimeoutRef.current)
      hoverTimeoutRef.current = null
    }
    setUseScrambleAnimation(false)
    setIsUnformal(false)
  }

  const handleFocus = () => {
    if (hoverTimeoutRef.current) {
      window.clearTimeout(hoverTimeoutRef.current)
    }
    hoverTimeoutRef.current = window.setTimeout(() => {
      setUseScrambleAnimation(true)
      setIsUnformal(true)
    }, 500)
  }

  const handleBlur = () => {
    if (hoverTimeoutRef.current) {
      window.clearTimeout(hoverTimeoutRef.current)
      hoverTimeoutRef.current = null
    }
    setUseScrambleAnimation(false)
    setIsUnformal(false)
  }

  const paragraphDelays = useMemo(() => {
    if (!useScrambleAnimation) {
      return [0, 0, 0]
    }

    const wordsPerMinute = 2500
    const baseWordDurationMs = 30

    const texts = [
      t(isUnformal ? 'personal.unformal1' : 'personal.formal1'),
      t(isUnformal ? 'personal.unformal2' : 'personal.formal2'),
      t(isUnformal ? 'personal.unformal3' : 'personal.formal3'),
    ]

    const durations = texts.map((text) =>
      calculateParagraphDuration(text, wordsPerMinute, baseWordDurationMs)
    )

    const delays: number[] = [0]
    for (let i = 1; i < durations.length; i++) {
      const prevDelay = delays[i - 1] ?? 0
      const prevDuration = durations[i - 1] ?? 0
      delays.push(prevDelay + prevDuration)
    }

    return delays
  }, [t, isUnformal, useScrambleAnimation])

  return (
    <section id='personal'>
      <div className='text-center mb-12'>
        <h2 className='text-4xl lg:text-5xl font-bold text-neutral-900 dark:text-neutral-50 mb-4'>
          {t('personal.title')}
        </h2>
        <p className='text-neutral-600 dark:text-neutral-400 max-w-2xl mx-auto text-lg'>
          {t('personal.subtitle')}
        </p>
      </div>

      <div className='grid lg:grid-cols-2 gap-4 md:gap-8 lg:gap-16 max-w-6xl mx-auto'>
        <motion.div
          initial={{ opacity: 0, x: -20 }}
          whileInView={{ opacity: 1, x: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6 }}
          className='flex items-center justify-center w-full h-full max-h-[300px] md:max-h-none lg:min-h-[500px] lg:min-w-[600px] rounded-lg overflow-hidden'
        >
          <Suspense
            fallback={
              <div className='w-full h-full bg-neutral-100 dark:bg-neutral-900 animate-pulse' />
            }
          >
            <HawkingRadiation />
          </Suspense>
        </motion.div>

        <motion.div
          initial={{ opacity: 0, x: 20 }}
          whileInView={{ opacity: 1, x: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6 }}
          className='space-y-6'
        >
          <div
            className='space-y-8 px-4 md:px-0 md:pt-4 lg:pt-8 text-neutral-600 dark:text-neutral-400 leading-relaxed transition-colors'
            onMouseEnter={handleMouseEnter}
            onMouseLeave={handleMouseLeave}
            onFocusCapture={handleFocus}
            onBlurCapture={handleBlur}
            tabIndex={0}
          >
            <p className='text-justify relative'>
              <span
                className='invisible block whitespace-pre-wrap'
                aria-hidden='true'
              >
                {t('personal.formal1')}
              </span>
              <span
                className='invisible block absolute top-0 left-0 w-full whitespace-pre-wrap'
                aria-hidden='true'
              >
                {t('personal.unformal1')}
              </span>
              <span className='absolute top-0 left-0 w-full block text-justify'>
                <span
                  className={`absolute top-0 left-0 w-full transition-opacity duration-1000 ease-in ${
                    useScrambleAnimation
                      ? 'opacity-100'
                      : 'opacity-0 pointer-events-none'
                  }`}
                >
                  <ScrambleWords
                    text={t(
                      isUnformal ? 'personal.unformal1' : 'personal.formal1'
                    )}
                    paragraphDelayMs={paragraphDelays[0]}
                  />
                </span>
                <span
                  className={`transition-opacity duration-1000 ease-out ${
                    useScrambleAnimation
                      ? 'opacity-0 pointer-events-none'
                      : 'opacity-100'
                  }`}
                >
                  {t(isUnformal ? 'personal.unformal1' : 'personal.formal1')}
                </span>
              </span>
            </p>
            <p className='text-justify relative'>
              <span
                className='invisible block whitespace-pre-wrap'
                aria-hidden='true'
              >
                {t('personal.formal2')}
              </span>
              <span
                className='invisible block absolute top-0 left-0 w-full whitespace-pre-wrap'
                aria-hidden='true'
              >
                {t('personal.unformal2')}
              </span>
              <span className='absolute top-0 left-0 w-full block text-justify'>
                <span
                  className={`absolute top-0 left-0 w-full transition-opacity duration-1000 ease-out ${
                    useScrambleAnimation
                      ? 'opacity-100'
                      : 'opacity-0 pointer-events-none'
                  }`}
                >
                  <ScrambleWords
                    text={t(
                      isUnformal ? 'personal.unformal2' : 'personal.formal2'
                    )}
                    paragraphDelayMs={paragraphDelays[1]}
                  />
                </span>
                <span
                  className={`transition-opacity duration-1000 ease-out ${
                    useScrambleAnimation
                      ? 'opacity-0 pointer-events-none'
                      : 'opacity-100'
                  }`}
                >
                  {t(isUnformal ? 'personal.unformal2' : 'personal.formal2')}
                </span>
              </span>
            </p>
            <p className='text-justify relative'>
              <span
                className='invisible block whitespace-pre-wrap'
                aria-hidden='true'
              >
                {t('personal.formal3')}
              </span>
              <span
                className='invisible block absolute top-0 left-0 w-full whitespace-pre-wrap'
                aria-hidden='true'
              >
                {t('personal.unformal3')}
              </span>
              <span className='absolute top-0 left-0 w-full block text-justify'>
                <span
                  className={`absolute top-0 left-0 w-full transition-opacity duration-1000 ease-out ${
                    useScrambleAnimation
                      ? 'opacity-100'
                      : 'opacity-0 pointer-events-none'
                  }`}
                >
                  <ScrambleWords
                    text={t(
                      isUnformal ? 'personal.unformal3' : 'personal.formal3'
                    )}
                    paragraphDelayMs={paragraphDelays[2]}
                  />
                </span>
                <span
                  className={`transition-opacity duration-1000 ease-out ${
                    useScrambleAnimation
                      ? 'opacity-0 pointer-events-none'
                      : 'opacity-100'
                  }`}
                >
                  {t(isUnformal ? 'personal.unformal3' : 'personal.formal3')}
                </span>
              </span>
            </p>
          </div>
        </motion.div>
      </div>
    </section>
  )
}

export default PersonalSection
