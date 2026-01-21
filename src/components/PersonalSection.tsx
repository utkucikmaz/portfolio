import { useState, useRef, useEffect, useMemo } from 'react'
import { useTranslation } from 'react-i18next'
import { motion } from 'framer-motion'
import HawkingRadiation from './HawkingRadiation'
import ScrambleWords from './ScrambleWords'

function calculateTotalDuration(
  text: string,
  wordsPerMinute: number = 800,
  baseWordDurationMs: number = 80
): number {
  const tokens = text.split(/(\s+)/)
  const msPerWord = Math.max(60, Math.min(150, Math.round(60000 / wordsPerMinute)))
  
  let cumulativeDelay = 0
  let lastWordStartDelay = 0
  let lastWordDuration = 0
  
  for (const token of tokens) {
    if (/^\s+$/.test(token)) continue
    
    const word = token
    const durationMs = Math.max(100, Math.min(250, baseWordDurationMs + word.length * 3))
    
    lastWordStartDelay = cumulativeDelay
    lastWordDuration = durationMs
    
    let pause = 0
    if (/[.!?]$/.test(word)) pause = 80
    else if (/[,;:]$/.test(word)) pause = 40
    
    cumulativeDelay += Math.max(50, Math.min(150, msPerWord + word.length * 2)) + pause
  }
  
  return lastWordStartDelay + lastWordDuration
}

const PersonalSection = (): JSX.Element => {
  const { t } = useTranslation()
  const [isUnformal, setIsUnformal] = useState(false)
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
      setIsUnformal(true)
    }, 500)
  }

  const handleMouseLeave = () => {
    if (hoverTimeoutRef.current) {
      window.clearTimeout(hoverTimeoutRef.current)
      hoverTimeoutRef.current = null
    }
    setIsUnformal(false)
  }

  const handleFocus = () => {
    if (hoverTimeoutRef.current) {
      window.clearTimeout(hoverTimeoutRef.current)
    }
    hoverTimeoutRef.current = window.setTimeout(() => {
      setIsUnformal(true)
    }, 500)
  }

  const handleBlur = () => {
    if (hoverTimeoutRef.current) {
      window.clearTimeout(hoverTimeoutRef.current)
      hoverTimeoutRef.current = null
    }
    setIsUnformal(false)
  }

  const speedAdjustments = useMemo(() => {
    const defaultWordsPerMinute = 800
    const defaultBaseWordDurationMs = 80
    
    const texts = [
      t(isUnformal ? 'personal.unformal1' : 'personal.formal1'),
      t(isUnformal ? 'personal.unformal2' : 'personal.formal2'),
      t(isUnformal ? 'personal.unformal3' : 'personal.formal3'),
    ]
    
    const durations = texts.map(text => 
      calculateTotalDuration(text, defaultWordsPerMinute, defaultBaseWordDurationMs)
    )
    
    const maxDuration = Math.max(...durations)
    
    if (maxDuration === 0) {
      return [defaultWordsPerMinute, defaultWordsPerMinute, defaultWordsPerMinute]
    }

    const wordsPerMinuteValues = durations.map((duration) => {
      if (duration === 0) return defaultWordsPerMinute
      
      const durationRatio = duration / maxDuration
      
      let targetWordsPerMinute = defaultWordsPerMinute * durationRatio
      
      const lengthBoost = 1 + (durationRatio * 0.1)
      targetWordsPerMinute = targetWordsPerMinute * lengthBoost
      
      return Math.max(400, Math.min(1200, Math.round(targetWordsPerMinute)))
    })
    
    return wordsPerMinuteValues
  }, [t, isUnformal])

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
          <HawkingRadiation />
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
              {/* Reserve space with both versions invisibly */}
              <span className='invisible block whitespace-pre-wrap' aria-hidden='true'>
                {t('personal.formal1')}
              </span>
              <span className='invisible block absolute top-0 left-0 w-full whitespace-pre-wrap' aria-hidden='true'>
                {t('personal.unformal1')}
              </span>
              {/* Visible animated content */}
              <span className='absolute top-0 left-0 w-full block text-justify'>
                <ScrambleWords
                  text={t(isUnformal ? 'personal.unformal1' : 'personal.formal1')}
                  wordsPerMinute={speedAdjustments[0]}
                />
              </span>
            </p>
            <p className='text-justify relative'>
              <span className='invisible block whitespace-pre-wrap' aria-hidden='true'>
                {t('personal.formal2')}
              </span>
              <span className='invisible block absolute top-0 left-0 w-full whitespace-pre-wrap' aria-hidden='true'>
                {t('personal.unformal2')}
              </span>
              <span className='absolute top-0 left-0 w-full block text-justify'>
                <ScrambleWords
                  text={t(isUnformal ? 'personal.unformal2' : 'personal.formal2')}
                  wordsPerMinute={speedAdjustments[1]}
                />
              </span>
            </p>
            <p className='text-justify relative'>
              <span className='invisible block whitespace-pre-wrap' aria-hidden='true'>
                {t('personal.formal3')}
              </span>
              <span className='invisible block absolute top-0 left-0 w-full whitespace-pre-wrap' aria-hidden='true'>
                {t('personal.unformal3')}
              </span>
              <span className='absolute top-0 left-0 w-full block text-justify'>
                <ScrambleWords
                  text={t(isUnformal ? 'personal.unformal3' : 'personal.formal3')}
                  wordsPerMinute={speedAdjustments[2]}
                />
              </span>
            </p>
          </div>
        </motion.div>
      </div>
    </section>
  )
}

export default PersonalSection
