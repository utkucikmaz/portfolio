import i18n from 'i18next'
import { initReactI18next } from 'react-i18next'
import LanguageDetector from 'i18next-browser-languagedetector'

import enTranslations from './locales/en.json'
import deTranslations from './locales/de.json'
import trTranslations from './locales/tr.json'
import zhTranslations from './locales/zh.json'
import jaTranslations from './locales/ja.json'
import arTranslations from './locales/ar.json'
import ruTranslations from './locales/ru.json'
import esTranslations from './locales/es.json'
import ptTranslations from './locales/pt.json'
import frTranslations from './locales/fr.json'
import koTranslations from './locales/ko.json'
import nlTranslations from './locales/nl.json'

const resources = {
  en: {
    translation: enTranslations,
  },
  de: {
    translation: deTranslations,
  },
  tr: {
    translation: trTranslations,
  },
  zh: {
    translation: zhTranslations,
  },
  ja: {
    translation: jaTranslations,
  },
  ar: {
    translation: arTranslations,
  },
  ru: {
    translation: ruTranslations,
  },
  es: {
    translation: esTranslations,
  },
  pt: {
    translation: ptTranslations,
  },
  fr: {
    translation: frTranslations,
  },
  ko: {
    translation: koTranslations,
  },
  nl: {
    translation: nlTranslations,
  },
}

i18n
  .use(LanguageDetector)
  .use(initReactI18next)
  .init({
    resources,
    fallbackLng: 'en',
    debug: false,

    interpolation: {
      escapeValue: false,
    },

    detection: {
      order: ['localStorage', 'navigator', 'htmlTag'],
      caches: ['localStorage'],
    },
  })
  .catch((error) => {
    console.error('Failed to initialize i18n:', error)
  })

export default i18n
