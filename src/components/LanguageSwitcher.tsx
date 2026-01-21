import { useState, useEffect, useRef } from 'react'
import { useTranslation } from 'react-i18next'
import toast from 'react-hot-toast'

interface Language {
  code: string
  name: string
  flag: string
}

const languages: Language[] = [
  { code: 'en', name: 'English', flag: '🇬🇧' },
  { code: 'de', name: 'Deutsch', flag: '🇩🇪' },
  { code: 'tr', name: 'Türkçe', flag: '🇹🇷' },
  { code: 'nl', name: 'Nederlands', flag: '🇳🇱' },
  { code: 'zh', name: '中文', flag: '🇨🇳' },
  { code: 'fr', name: 'Français', flag: '🇫🇷' },
  { code: 'ja', name: '日本語', flag: '🇯🇵' },
  { code: 'es', name: 'Español', flag: '🇪🇸' },
  { code: 'pt', name: 'Português', flag: '🇵🇹' },
  { code: 'ko', name: '한국어', flag: '🇰🇷' },
  { code: 'ar', name: 'العربية', flag: '🇸🇦' },
  { code: 'ru', name: 'Русский', flag: '🇷🇺' },
]

const LanguageSwitcher = (): JSX.Element => {
  const { i18n, t } = useTranslation()
  const [isOpen, setIsOpen] = useState<boolean>(false)
  const dropdownRef = useRef<HTMLDivElement>(null)

  const foundLanguage = languages.find((lang) => lang.code === i18n.language)
  const currentLanguage = (foundLanguage ?? languages[0]) as Language

  const changeLanguage = (languageCode: string): void => {
    i18n
      .changeLanguage(languageCode)
      .then(() => {
        toast.success(t('toast.language.success'))
      })
      .catch((error) => {
        console.error('Failed to change language:', error)
        toast.error('Failed to change language')
      })
    setIsOpen(false)
  }

  useEffect(() => {
    const handleClickOutside = (event: MouseEvent | TouchEvent): void => {
      if (
        dropdownRef.current &&
        event.target instanceof Node &&
        !dropdownRef.current.contains(event.target)
      ) {
        setIsOpen(false)
      }
    }

    if (isOpen) {
      document.addEventListener('mousedown', handleClickOutside)
      document.addEventListener('touchstart', handleClickOutside)
    }

    return () => {
      document.removeEventListener('mousedown', handleClickOutside)
      document.removeEventListener('touchstart', handleClickOutside)
    }
  }, [isOpen])

  return (
    <div className='relative' ref={dropdownRef}>
      <button
        onClick={() => setIsOpen(!isOpen)}
        className={`relative px-4 py-2 text-sm font-medium transition-colors duration-200 rounded-lg ${
          isOpen
            ? 'text-primary-600 dark:text-primary-400 bg-primary-50 dark:bg-primary-950/30'
            : 'text-neutral-700 dark:text-neutral-300 hover:text-primary-600 dark:hover:text-primary-400 hover:bg-neutral-100 dark:hover:bg-neutral-800/50'
        }`}
        aria-label={t('accessibility.changeLanguage')}
        aria-expanded={isOpen}
      >
        <span className='text-sm font-medium'>{currentLanguage.flag}</span>
      </button>

      {isOpen && (
        <div className='absolute right-0 mt-2 w-48 bg-white dark:bg-neutral-800 rounded-lg shadow-lg border border-neutral-200 dark:border-neutral-700 z-50'>
          {languages.map((language) => (
            <button
              key={language.code}
              onClick={() => changeLanguage(language.code)}
              className={`w-full flex items-center gap-3 px-4 py-3 text-left hover:bg-neutral-50 dark:hover:bg-neutral-700 transition-colors ${
                i18n.language === language.code
                  ? 'bg-primary-50 dark:bg-primary-950 text-primary-700 dark:text-primary-300'
                  : 'text-neutral-700 dark:text-neutral-300'
              }`}
            >
              <span className='text-lg'>{language.flag}</span>
              <span className='text-sm font-medium'>{language.name}</span>
            </button>
          ))}
        </div>
      )}
    </div>
  )
}

export default LanguageSwitcher
