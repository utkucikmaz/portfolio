import { useEffect } from 'react'
import { useTranslation } from 'react-i18next'

const BASE_URL = 'https://utkucikmaz.com'
const LANGUAGES = [
  { code: 'en', name: 'English', locale: 'en-US' },
  { code: 'de', name: 'Deutsch', locale: 'de-DE' },
  { code: 'tr', name: 'Türkçe', locale: 'tr-TR' },
  { code: 'zh', name: '中文', locale: 'zh-CN' },
  { code: 'ja', name: '日本語', locale: 'ja-JP' },
  { code: 'ar', name: 'العربية', locale: 'ar-SA' },
  { code: 'ru', name: 'Русский', locale: 'ru-RU' },
  { code: 'es', name: 'Español', locale: 'es-ES' },
  { code: 'pt', name: 'Português', locale: 'pt-PT' },
  { code: 'fr', name: 'Français', locale: 'fr-FR' },
  { code: 'ko', name: '한국어', locale: 'ko-KR' },
  { code: 'nl', name: 'Nederlands', locale: 'nl-NL' },
]

const SEO = (): null => {
  const { t, i18n: i18nInstance } = useTranslation()
  const currentLang = i18nInstance.language || 'en'
  const langInfo = (LANGUAGES.find((l) => l.code === currentLang) ??
    LANGUAGES[0]) as (typeof LANGUAGES)[0]

  useEffect(() => {
    document.documentElement.lang = langInfo.locale

    const title = t('seo.title', { defaultValue: 'utku cikmaz' })
    const description = t('seo.description', {
      defaultValue:
        'Full stack web developer specializing in React, TypeScript, Node.js, and modern web technologies. Building scalable applications with a focus on clean code and user experience.',
    })
    const keywords = t('seo.keywords', {
      defaultValue:
        'full stack developer, web developer, React, TypeScript, Node.js, JavaScript, frontend developer, backend developer',
    })

    const updateMetaTag = (
      name: string,
      content: string,
      isProperty = false
    ): void => {
      const attribute = isProperty ? 'property' : 'name'
      let meta = document.querySelector(
        `meta[${attribute}="${name}"]`
      ) as HTMLMetaElement

      if (!meta) {
        meta = document.createElement('meta')
        meta.setAttribute(attribute, name)
        document.head.appendChild(meta)
      }
      meta.setAttribute('content', content)
    }

    document.title = title

    updateMetaTag('title', title)
    updateMetaTag('description', description)
    updateMetaTag('keywords', keywords)
    updateMetaTag('author', 'Utku Cikmaz')
    updateMetaTag(
      'robots',
      'index, follow, max-image-preview:large, max-snippet:-1, max-video-preview:-1'
    )
    updateMetaTag('language', langInfo.name)
    updateMetaTag('revisit-after', '7 days')
    updateMetaTag('rating', 'general')
    updateMetaTag('distribution', 'global')
    updateMetaTag('theme-color', '#0ea5e9')
    updateMetaTag('msapplication-TileColor', '#0ea5e9')
    updateMetaTag('apple-mobile-web-app-capable', 'yes')
    updateMetaTag('apple-mobile-web-app-status-bar-style', 'black-translucent')
    updateMetaTag('apple-mobile-web-app-title', 'Utku Cikmaz')

    updateMetaTag('og:type', 'website', true)
    updateMetaTag('og:url', `${BASE_URL}`, true)
    updateMetaTag('og:title', title, true)
    updateMetaTag('og:description', description, true)
    updateMetaTag('og:image', `${BASE_URL}/images/hero.jpg`, true)
    updateMetaTag('og:image:width', '1200', true)
    updateMetaTag('og:image:height', '630', true)
    updateMetaTag('og:image:alt', title, true)
    updateMetaTag('og:site_name', 'Utku Cikmaz - Portfolio', true)
    updateMetaTag('og:locale', langInfo.locale, true)

    const existingAlternates = document.querySelectorAll(
      'meta[property^="og:locale:alternate"]'
    )
    existingAlternates.forEach((tag) => tag.remove())

    LANGUAGES.forEach((lang) => {
      if (lang.code !== currentLang) {
        const alternateMeta = document.createElement('meta')
        alternateMeta.setAttribute('property', 'og:locale:alternate')
        alternateMeta.setAttribute('content', lang.locale)
        document.head.appendChild(alternateMeta)
      }
    })

    const updateTwitterTag = (name: string, content: string): void => {
      let meta = document.querySelector(
        `meta[name="${name}"]`
      ) as HTMLMetaElement
      if (!meta) {
        meta = document.createElement('meta')
        meta.setAttribute('name', name)
        document.head.appendChild(meta)
      }
      meta.setAttribute('content', content)
    }

    updateTwitterTag('twitter:card', 'summary_large_image')
    updateTwitterTag('twitter:url', `${BASE_URL}`)
    updateTwitterTag('twitter:title', title)
    updateTwitterTag('twitter:description', description)
    updateTwitterTag('twitter:image', `${BASE_URL}/images/hero.jpg`)
    updateTwitterTag('twitter:image:alt', title)
    updateTwitterTag('twitter:creator', '@utkucikmaz')
    updateTwitterTag('twitter:site', '@utkucikmaz')

    let canonical = document.querySelector(
      'link[rel="canonical"]'
    ) as HTMLLinkElement
    if (!canonical) {
      canonical = document.createElement('link')
      canonical.setAttribute('rel', 'canonical')
      document.head.appendChild(canonical)
    }
    canonical.setAttribute('href', `${BASE_URL}`)

    const existingHreflangs = document.querySelectorAll(
      'link[rel="alternate"][hreflang]'
    )
    existingHreflangs.forEach((tag) => tag.remove())

    LANGUAGES.forEach((lang) => {
      const hreflang = document.createElement('link')
      hreflang.setAttribute('rel', 'alternate')
      hreflang.setAttribute('hreflang', lang.code)
      hreflang.setAttribute('href', `${BASE_URL}?lang=${lang.code}`)
      document.head.appendChild(hreflang)
    })

    const defaultHreflang = document.createElement('link')
    defaultHreflang.setAttribute('rel', 'alternate')
    defaultHreflang.setAttribute('hreflang', 'x-default')
    defaultHreflang.setAttribute('href', `${BASE_URL}?lang=en`)
    document.head.appendChild(defaultHreflang)

    const structuredData = {
      '@context': 'https://schema.org',
      '@type': 'Person',
      name: 'Utku Cikmaz',
      jobTitle: 'Full Stack Web Developer',
      url: BASE_URL,
      image: `${BASE_URL}/images/hero.jpg`,
      sameAs: [
        'https://github.com/utkucikmaz',
        'https://www.linkedin.com/in/utkucikmaz/',
      ],
      knowsAbout: [
        'Web Development',
        'React',
        'TypeScript',
        'Node.js',
        'JavaScript',
        'Full Stack Development',
        'Frontend Development',
        'Backend Development',
        'Software Engineering',
      ],
      alumniOf: [
        {
          '@type': 'EducationalOrganization',
          name: 'Ironhack',
          description: 'Full Stack Web Development Bootcamp',
        },
        {
          '@type': 'EducationalOrganization',
          name: 'Digi-Homeschooling',
          description: 'Full Stack Web Development Bootcamp',
        },
        {
          '@type': 'EducationalOrganization',
          name: 'Istanbul University',
          description: 'Chinese Language and Literature',
        },
      ],
      worksFor: [
        {
          '@type': 'Organization',
          name: 'AIlon/Erason',
          jobTitle: 'Full Stack Developer',
          address: {
            '@type': 'PostalAddress',
            addressLocality: 'Lüneburg',
            addressCountry: 'DE',
          },
        },
        {
          '@type': 'Organization',
          name: 'Arbithub',
          jobTitle: 'Front-End Developer',
          address: {
            '@type': 'PostalAddress',
            addressLocality: 'Chicago',
            addressRegion: 'IL',
            addressCountry: 'US',
          },
        },
      ],
      address: {
        '@type': 'PostalAddress',
        addressLocality: 'Hamburg',
        addressCountry: 'DE',
      },
      description: description,
      inLanguage: langInfo.locale,
    }

    const existingScripts = document.querySelectorAll(
      'script[type="application/ld+json"]'
    )
    existingScripts.forEach((script) => script.remove())

    const script = document.createElement('script')
    script.type = 'application/ld+json'
    script.textContent = JSON.stringify(structuredData, null, 2)
    document.head.appendChild(script)

    const websiteStructuredData = {
      '@context': 'https://schema.org',
      '@type': 'WebSite',
      name: 'Utku Cikmaz - Portfolio',
      url: BASE_URL,
      description: description,
      inLanguage: LANGUAGES.map((l) => l.locale),
      potentialAction: {
        '@type': 'SearchAction',
        target: {
          '@type': 'EntryPoint',
          urlTemplate: `${BASE_URL}?search={search_term_string}`,
        },
        'query-input': 'required name=search_term_string',
      },
    }

    const websiteScript = document.createElement('script')
    websiteScript.type = 'application/ld+json'
    websiteScript.textContent = JSON.stringify(websiteStructuredData, null, 2)
    document.head.appendChild(websiteScript)
    
    const serviceStructuredData = {
      '@context': 'https://schema.org',
      '@type': 'ProfessionalService',
      name: 'Utku Cikmaz - Web Development Services',
      description: description,
      url: BASE_URL,
      provider: {
        '@type': 'Person',
        name: 'Utku Cikmaz',
      },
      areaServed: 'Worldwide',
      serviceType: [
        'Web Development',
        'Full Stack Development',
        'Frontend Development',
        'Backend Development',
        'React Development',
        'TypeScript Development',
      ],
    }

    const serviceScript = document.createElement('script')
    serviceScript.type = 'application/ld+json'
    serviceScript.textContent = JSON.stringify(serviceStructuredData, null, 2)
    document.head.appendChild(serviceScript)
  }, [currentLang, t, langInfo])

  return null
}

export default SEO
