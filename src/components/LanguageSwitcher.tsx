import { useEffect, useMemo, useRef, useState } from 'react'
import { trackEvent } from '../utils/rybbit'
import { useTranslation } from 'react-i18next'
import { AnimatePresence, motion, useScroll, useTransform } from 'framer-motion'
import toast from 'react-hot-toast'

interface Language {
  code: string
  name: string
  flag: string
}

const LANGUAGE_COLUMNS: readonly [Language[], Language[]] = [
  [
    { code: 'en', name: 'English', flag: '🇬🇧' },
    { code: 'fr', name: 'Français', flag: '🇫🇷' },
    { code: 'zh', name: '中文', flag: '🇨🇳' },
    { code: 'ar', name: 'العربية', flag: '🇸🇦' },
    { code: 'es', name: 'Español', flag: '🇪🇸' },
    { code: 'nl', name: 'Nederlands', flag: '🇳🇱' },
  ],
  [
    { code: 'de', name: 'Deutsch', flag: '🇩🇪' },
    { code: 'tr', name: 'Türkçe', flag: '🇹🇷' },
    { code: 'ja', name: '日本語', flag: '🇯🇵' },
    { code: 'ko', name: '한국어', flag: '🇰🇷' },
    { code: 'ru', name: 'Русский', flag: '🇷🇺' },
    { code: 'pt', name: 'Português', flag: '🇵🇹' },
  ],
] as const

const dropdownVariants = {
  hidden: { opacity: 0, y: -8, scale: 0.96 },
  visible: { opacity: 1, y: 0, scale: 1 },
  exit: { opacity: 0, y: -8, scale: 0.96 },
}

const buttonBase =
  'w-full flex items-center gap-3 px-4 py-3 text-sm font-medium rounded-xl transition-all duration-200'

const activeStyles =
  'text-primary-600 dark:text-primary-400 bg-primary-50 dark:bg-primary-950/40 shadow-sm'

const idleStyles =
  'text-neutral-700 dark:text-neutral-300 hover:bg-neutral-100 dark:hover:bg-neutral-800/50'

export interface LanguageSwitcherProps {
  onOpen?: () => void
}

export default function LanguageSwitcher({
  onOpen,
}: LanguageSwitcherProps): JSX.Element {
  const { i18n, t } = useTranslation()
  const [isOpen, setIsOpen] = useState(false)
  const dropdownRef = useRef<HTMLDivElement>(null)

  const allLanguages = useMemo(() => LANGUAGE_COLUMNS.flat(), [])

  const FALLBACK_LANGUAGE: Language = {
    code: 'en',
    name: 'English',
    flag: '🇬🇧',
  }

  const currentLanguage = useMemo<Language>(() => {
    return (
      allLanguages.find((l) => l.code === i18n.language) ?? FALLBACK_LANGUAGE
    )
  }, [i18n.language, allLanguages])

  const { scrollY } = useScroll()
  const bgOpacity = useTransform(scrollY, [0, 200], [0.65, 0.95])

  useEffect(() => {
    if (!isOpen) return

    const handleClickOutside = (event: MouseEvent) => {
      if (
        dropdownRef.current &&
        !dropdownRef.current.contains(event.target as Node)
      ) {
        setIsOpen(false)
      }
    }

    document.addEventListener('mousedown', handleClickOutside)
    return () => document.removeEventListener('mousedown', handleClickOutside)
  }, [isOpen])

  const changeLanguage = async (code: string) => {
    try {
      await i18n.changeLanguage(code)
      toast.success(t('toast.language.success'))
      trackEvent('language_change', {
        section: 'language_switcher',
        lang: code,
      })
    } catch {
      toast.error('Failed to change language')
    } finally {
      setIsOpen(false)
    }
  }

  const handleLanguageClick = (code: string) => {
    void changeLanguage(code)
  }

  const [leftLanguages, rightLanguages] = LANGUAGE_COLUMNS

  const renderColumn = (languages: readonly Language[], alignRight = false) => (
    <div className='space-y-1'>
      {languages.map((language) => {
        const isActive = language.code === i18n.language

        return (
          <button
            key={language.code}
            onClick={() => handleLanguageClick(language.code)}
            className={`${buttonBase} ${
              isActive ? activeStyles : idleStyles
            } ${alignRight ? 'justify-end text-right' : ''}`}
          >
            {!alignRight && (
              <span className='text-lg flex-shrink-0'>{language.flag}</span>
            )}
            <span className='truncate'>{language.name}</span>
            {alignRight && (
              <span className='text-lg flex-shrink-0'>{language.flag}</span>
            )}
          </button>
        )
      })}
    </div>
  )

  return (
    <div ref={dropdownRef} className='relative'>
      <button
        onClick={() => {
          trackEvent('language_switcher_open', {
            section: 'language_switcher',
            open: !isOpen,
          })
          setIsOpen((o) => !o)
          onOpen?.()
        }}
        className='px-4 py-2 rounded-lg text-sm font-medium transition-colors
          text-neutral-700 dark:text-neutral-300
          hover:bg-neutral-100 dark:hover:bg-neutral-800/50'
      >
        {currentLanguage.flag}
      </button>

      <AnimatePresence>
        {isOpen && (
          <motion.div
            variants={dropdownVariants}
            initial='hidden'
            animate='visible'
            exit='exit'
            style={{ '--tw-bg-opacity': bgOpacity } as React.CSSProperties}
            className='
  fixed inset-x-0 top-18
  mx-auto w-[92vw] max-w-[440px]
  sm:absolute sm:inset-x-auto sm:right-0
  sm:mx-0
  rounded-2xl border
  bg-white dark:bg-neutral-950 backdrop-blur-xl shadow-xl
  border-neutral-200/50 dark:border-neutral-800/50
  overflow-hidden z-50
'
          >
            <div className='grid grid-cols-2 gap-3 p-4 max-h-[70vh] overflow-y-auto'>
              {renderColumn(leftLanguages)}
              {renderColumn(rightLanguages, true)}
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  )
}
