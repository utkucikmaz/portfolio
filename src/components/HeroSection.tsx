import { useState, useEffect, useRef } from 'react'
import { TypeAnimation } from 'react-type-animation'
import { motion, AnimatePresence } from 'framer-motion'
import { useTranslation } from 'react-i18next'
import { trackEvent } from '../utils/rybbit'
import { ArrowDownIcon } from '@heroicons/react/24/outline'
import toast from 'react-hot-toast'
import axios from 'axios'
import Draggable from 'react-draggable'
import * as Tooltip from '@radix-ui/react-tooltip'
import heroImage from '/images/hero.jpg'
import heroHoverImage from '/images/hero-hover.png'

interface HeroSectionProps {
  isDarkMode?: boolean
}

const CV_LANGUAGE_MAP: Record<string, string> = {
  en: 'cv-english.pdf',
  de: 'cv-german.pdf',
  tr: 'cv-turkish.pdf',
  zh: 'cv-chinese.pdf',
  ja: 'cv-japanese.pdf',
  ar: 'cv-arabic.pdf',
  ru: 'cv-russian.pdf',
  es: 'cv-spanish.pdf',
  pt: 'cv-portuguese.pdf',
  fr: 'cv-french.pdf',
  ko: 'cv-korean.pdf',
  nl: 'cv-dutch.pdf',
}

interface TechStackItem {
  name: string
  icon: string
}

const HeroSection = ({ isDarkMode = true }: HeroSectionProps): JSX.Element => {
  const { t, i18n } = useTranslation()
  const [hasScrolled, setHasScrolled] = useState<boolean>(false)
  const [hovered, setHovered] = useState<number | null>(null)
  const [celestialPosition, setCelestialPosition] = useState({ x: 0, y: 0 })
  const [containerWidth, setContainerWidth] = useState(0)
  const [containerHeight, setContainerHeight] = useState(384) // Default to h-96
  const [celestialSize, setCelestialSize] = useState(128) // Default to lg size
  const [lightTarget, setLightTarget] = useState({ x: 0, y: 0 })
  const heroSectionRef = useRef<HTMLElement>(null)
  const dragContainerRef = useRef<HTMLDivElement>(null)
  const profileImageRef = useRef<HTMLDivElement>(null)
  const typeAnimationRef = useRef<HTMLHeadingElement>(null)
  const draggableRef = useRef<HTMLDivElement>(null)

  useEffect(() => {
    trackEvent('hero_impression', { section: 'hero' })
  }, [])

  const updateCelestialSize = () => {
    if (typeof window !== 'undefined') {
      const width = window.innerWidth
      let newSize = 128 // Default
      if (width < 640)
        newSize = 64 // Mobile: 64px (w-16)
      else if (width < 768)
        newSize = 80 // Small: 80px (w-20)
      else if (width < 1024)
        newSize = 96 // Medium: 96px (w-24)
      else newSize = 128 // Large+: 128px (w-32)
      setCelestialSize(newSize)
    }
  }

  useEffect(() => {
    const handleScroll = (): void => {
      setHasScrolled(window.scrollY > 10)
    }

    window.addEventListener('scroll', handleScroll, { passive: true })
    return () => window.removeEventListener('scroll', handleScroll)
  }, [])

  useEffect(() => {
    const updatePositions = (): void => {
      if (heroSectionRef.current) {
        const sectionWidth = heroSectionRef.current.offsetWidth
        setContainerWidth(sectionWidth)
      }
      if (dragContainerRef.current) {
        const currentContainerHeight = dragContainerRef.current.offsetHeight
        setContainerHeight(currentContainerHeight)
      }
      updateCelestialSize()
      if (heroSectionRef.current && dragContainerRef.current) {
        const sectionWidth = heroSectionRef.current.offsetWidth
        const currentContainerHeight = dragContainerRef.current.offsetHeight
        const isMobile =
          typeof window !== 'undefined' && window.innerWidth < 640
        setCelestialPosition((prev) => {
          if (prev.x === 0 && prev.y === 0) {
            if (isMobile) {
              return { x: (sectionWidth - celestialSize / 2) / 2, y: 0 }
            }
            return { x: sectionWidth * 0.55, y: 10 }
          }
          const maxY = currentContainerHeight - celestialSize
          return {
            x: Math.min(prev.x, Math.max(0, sectionWidth - celestialSize)),
            y: Math.min(prev.y, Math.max(0, maxY)),
          }
        })
      }
    }

    updatePositions()
    window.addEventListener('resize', updatePositions)
    return () => window.removeEventListener('resize', updatePositions)
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [celestialSize])

  useEffect(() => {
    const updateLightTarget = (): void => {
      const EPS = 0.5 // px threshold to avoid no-op re-renders
      if (
        typeAnimationRef.current &&
        dragContainerRef.current &&
        heroSectionRef.current
      ) {
        const animationRect = typeAnimationRef.current.getBoundingClientRect()
        const containerRect = dragContainerRef.current.getBoundingClientRect()

        const targetX =
          animationRect.left + animationRect.width / 2 - containerRect.left
        const targetY =
          animationRect.top + animationRect.height / 2 - containerRect.top
        setLightTarget((prev) => {
          if (
            Math.abs(prev.x - targetX) < EPS &&
            Math.abs(prev.y - targetY) < EPS
          ) {
            return prev
          }
          return { x: targetX, y: targetY }
        })
      } else {
        const targetX = containerWidth * 0.3
        const targetY = containerHeight * 0.4
        setLightTarget((prev) => {
          if (
            Math.abs(prev.x - targetX) < EPS &&
            Math.abs(prev.y - targetY) < EPS
          ) {
            return prev
          }
          return { x: targetX, y: targetY }
        })
      }
    }

    updateLightTarget()

    let updateRaf: number | null = null
    const throttledUpdate = () => {
      if (updateRaf !== null) return
      updateRaf = window.requestAnimationFrame(() => {
        updateLightTarget()
        updateRaf = null
      })
    }

    window.addEventListener('resize', throttledUpdate)
    window.addEventListener('scroll', throttledUpdate, { passive: true })

    const timeoutId = setTimeout(updateLightTarget, 100)

    const intervalId = setInterval(updateLightTarget, 1000)

    return () => {
      if (updateRaf !== null) window.cancelAnimationFrame(updateRaf)
      window.removeEventListener('resize', throttledUpdate)
      window.removeEventListener('scroll', throttledUpdate)
      clearTimeout(timeoutId)
      clearInterval(intervalId)
    }
  }, [containerWidth, containerHeight, celestialPosition, celestialSize])

  const getCVFileName = (language: string): string => {
    return CV_LANGUAGE_MAP[language] || 'cv-english.pdf'
  }

  const downloadCV = async (): Promise<void> => {
    try {
      const currentLanguage = i18n.language
      const cvFileName = getCVFileName(currentLanguage)

      toast.loading(t('toast.cv.downloading'))
      const response = await axios.get(`/${cvFileName}`, {
        responseType: 'blob',
      })
      const blob = new Blob([response.data], { type: 'application/pdf' })
      const link = document.createElement('a')
      link.href = URL.createObjectURL(blob)
      link.download = `Utku_Cikmaz_CV_${currentLanguage.toUpperCase()}.pdf`
      link.click()
      toast.dismiss()
      toast.success(t('toast.cv.success'))
    } catch (error) {
      console.error('Error downloading CV:', error)
      toast.dismiss()
      toast.error(t('toast.cv.error'))
    }
  }

  const scrollToContact = (): void => {
    const contactElement = document.getElementById('contact')
    if (contactElement) {
      const offset = 80
      const elementPosition = contactElement.getBoundingClientRect().top
      const offsetPosition = elementPosition + window.pageYOffset - offset
      window.scrollTo({
        top: offsetPosition,
        behavior: 'smooth',
      })
    }
  }

  const techStack: TechStackItem[] = [
    { name: 'Vue', icon: '/svg/vue.svg' },
    { name: 'React', icon: '/svg/react.svg' },
    { name: 'TypeScript ', icon: '/svg/ts.svg' },
    { name: 'Node.js', icon: '/svg/nodejs.svg' },
    { name: 'Python', icon: '/svg/python.svg' },
    { name: 'Django REST Framework', icon: '/svg/django.svg' },
  ]

  const handleCelestialDrag = (_e: unknown, data: { x: number; y: number }) => {
    const maxX =
      containerWidth > 0
        ? containerWidth - celestialSize
        : window.innerWidth - celestialSize
    const maxY = containerHeight - celestialSize
    const constrainedX = Math.max(0, Math.min(data.x, maxX))
    const constrainedY = Math.max(0, Math.min(data.y, maxY))
    setCelestialPosition({ x: constrainedX, y: constrainedY })
  }

  const getDragBounds = () => {
    const maxX =
      containerWidth > 0
        ? containerWidth - celestialSize
        : window.innerWidth - celestialSize
    const maxY = containerHeight - celestialSize
    return { left: 0, right: maxX, top: 0, bottom: maxY }
  }

  const celestialCenterX = celestialPosition.x + celestialSize / 2
  const celestialCenterY = celestialPosition.y + celestialSize / 2

  return (
    <section
      ref={heroSectionRef}
      id='hero'
      className='min-h-screen flex items-center justify-center relative'
    >
      {/* Draggable Moon and Sun Container */}
      <div
        ref={dragContainerRef}
        className='absolute top-24 left-0 right-0 w-full h-96 pointer-events-none z-10'
      >
        {/* Light Beam from Celestial Body */}
        <div
          className='absolute inset-0 w-full h-full pointer-events-none'
          style={{ zIndex: 1 }}
        >
          <svg className='absolute inset-0 w-full h-full'>
            <defs>
              {/* Moon light gradient - whiter, cool tone - much brighter at source */}
              <linearGradient
                id={`moonLightGradient-${celestialCenterX}-${celestialCenterY}`}
                x1={celestialCenterX}
                y1={celestialCenterY}
                x2={lightTarget.x}
                y2={lightTarget.y}
                gradientUnits='userSpaceOnUse'
              >
                <stop
                  offset='0%'
                  stopColor='rgba(255, 255, 255, 0.8)'
                  stopOpacity='0.8'
                />
                <stop
                  offset='15%'
                  stopColor='rgba(255, 255, 255, 0.5)'
                  stopOpacity='0.5'
                />
                <stop
                  offset='30%'
                  stopColor='rgba(255, 255, 255, 0.3)'
                  stopOpacity='0.3'
                />
                <stop
                  offset='50%'
                  stopColor='rgba(255, 255, 255, 0.15)'
                  stopOpacity='0.15'
                />
                <stop
                  offset='70%'
                  stopColor='rgba(255, 255, 255, 0.08)'
                  stopOpacity='0.08'
                />
                <stop
                  offset='85%'
                  stopColor='rgba(255, 255, 255, 0.03)'
                  stopOpacity='0.03'
                />
                <stop
                  offset='100%'
                  stopColor='rgba(255, 255, 255, 0)'
                  stopOpacity='0'
                />
              </linearGradient>
              {/* Sun light gradient - warmer, golden tone - much brighter at source */}
              <linearGradient
                id={`sunLightGradient-${celestialCenterX}-${celestialCenterY}`}
                x1={celestialCenterX}
                y1={celestialCenterY}
                x2={lightTarget.x}
                y2={lightTarget.y}
                gradientUnits='userSpaceOnUse'
              >
                <stop
                  offset='0%'
                  stopColor='rgba(255, 200, 100, 1.0)'
                  stopOpacity='1.0'
                />
                <stop
                  offset='10%'
                  stopColor='rgba(255, 210, 120, 0.8)'
                  stopOpacity='0.8'
                />
                <stop
                  offset='20%'
                  stopColor='rgba(255, 215, 130, 0.6)'
                  stopOpacity='0.6'
                />
                <stop
                  offset='35%'
                  stopColor='rgba(255, 220, 140, 0.4)'
                  stopOpacity='0.4'
                />
                <stop
                  offset='50%'
                  stopColor='rgba(255, 220, 150, 0.25)'
                  stopOpacity='0.25'
                />
                <stop
                  offset='70%'
                  stopColor='rgba(255, 220, 150, 0.12)'
                  stopOpacity='0.12'
                />
                <stop
                  offset='85%'
                  stopColor='rgba(255, 220, 150, 0.05)'
                  stopOpacity='0.05'
                />
                <stop
                  offset='100%'
                  stopColor='rgba(255, 220, 150, 0)'
                  stopOpacity='0'
                />
              </linearGradient>
            </defs>
            {/* Conical light beam - narrow at source, wide at end */}
            <AnimatePresence mode='wait'>
              {(() => {
                const startWidth = 40 // Narrow at source (40px)
                const endWidth = 640 // Much wider at end (40rem = 640px)
                const dx = lightTarget.x - celestialCenterX
                const dy = lightTarget.y - celestialCenterY
                const angle = Math.atan2(dy, dx)
                const perpAngle = angle + Math.PI / 2

                const startOffsetX = Math.cos(perpAngle) * (startWidth / 2)
                const startOffsetY = Math.sin(perpAngle) * (startWidth / 2)
                const endOffsetX = Math.cos(perpAngle) * (endWidth / 2)
                const endOffsetY = Math.sin(perpAngle) * (endWidth / 2)

                const pathData = `
                  M ${celestialCenterX - startOffsetX} ${celestialCenterY - startOffsetY}
                  L ${celestialCenterX + startOffsetX} ${celestialCenterY + startOffsetY}
                  L ${lightTarget.x + endOffsetX} ${lightTarget.y + endOffsetY}
                  L ${lightTarget.x - endOffsetX} ${lightTarget.y - endOffsetY}
                  Z
                `

                return (
                  <motion.g
                    key={`cone-light-${isDarkMode}`}
                    initial={{
                      opacity: 0,
                      scale: 0,
                    }}
                    animate={{
                      opacity: isDarkMode ? 0.7 : 0.9,
                      scale: 1,
                    }}
                    exit={{
                      opacity: 0,
                      scale: 0,
                      transition: { duration: 0.3, ease: 'easeIn' },
                    }}
                    transition={{
                      opacity: {
                        duration: 0.5,
                        delay: 0.8,
                        ease: 'easeOut',
                      },
                      scale: {
                        duration: 0.7,
                        delay: 0.8,
                        ease: [0.16, 1, 0.3, 1],
                      },
                    }}
                    style={{
                      transformOrigin: `${celestialCenterX}px ${celestialCenterY}px`,
                    }}
                  >
                    <path
                      d={pathData}
                      fill={
                        isDarkMode
                          ? `url(#moonLightGradient-${celestialCenterX}-${celestialCenterY})`
                          : `url(#sunLightGradient-${celestialCenterX}-${celestialCenterY})`
                      }
                      style={{
                        filter: 'blur(15px)',
                        mixBlendMode: isDarkMode ? 'screen' : 'normal',
                      }}
                    />
                  </motion.g>
                )
              })()}
            </AnimatePresence>
          </svg>
        </div>

        {/* Celestial Body - morphs between moon and sun */}
        <Draggable
          nodeRef={draggableRef}
          position={celestialPosition}
          onDrag={handleCelestialDrag}
          bounds={getDragBounds()}
        >
          <div
            ref={draggableRef}
            className='celestial-handle absolute cursor-grab active:cursor-grabbing pointer-events-auto'
            role='button'
            tabIndex={0}
            aria-label={`Move celestial: ${isDarkMode ? (t('hero.moon') ?? 'Moon') : (t('hero.sun') ?? 'Sun')}`}
            onKeyDown={(e) => {
              const step = 12
              let dx = 0
              let dy = 0
              switch (e.key) {
                case 'ArrowLeft':
                  dx = -step
                  break
                case 'ArrowRight':
                  dx = step
                  break
                case 'ArrowUp':
                  dy = -step
                  break
                case 'ArrowDown':
                  dy = step
                  break
                case 'PageUp':
                  dy = -step * 2
                  break
                case 'PageDown':
                  dy = step * 2
                  break
                default:
                  return
              }
              e.preventDefault()
              const maxX =
                containerWidth > 0
                  ? containerWidth - celestialSize
                  : window.innerWidth - celestialSize
              const maxY = containerHeight - celestialSize
              let newX = celestialPosition.x + dx
              let newY = celestialPosition.y + dy
              newX = Math.max(0, Math.min(newX, maxX))
              newY = Math.max(0, Math.min(newY, maxY))
              setCelestialPosition({ x: newX, y: newY })
            }}
            style={{ zIndex: 2 }}
          >
            <AnimatePresence mode='wait'>
              {isDarkMode ? (
                <motion.svg
                  key='moon'
                  initial={{ opacity: 0, scale: 0.8, rotate: -180 }}
                  animate={{ opacity: 1, scale: 1, rotate: 0 }}
                  exit={{ opacity: 0, scale: 0.8, rotate: 180 }}
                  transition={{
                    opacity: { duration: 0.6, ease: 'easeInOut' },
                    scale: { duration: 0.6, ease: 'easeInOut' },
                    rotate: { duration: 0.8, ease: 'easeInOut' },
                  }}
                  viewBox='0 0 120 120'
                  fill='none'
                  xmlns='http://www.w3.org/2000/svg'
                  className='w-16 h-16 sm:w-20 sm:h-20 md:w-24 md:h-24 lg:w-32 lg:h-32 drop-shadow-2xl pointer-events-none'
                  style={{ pointerEvents: 'none' }}
                >
                  {/* Moon glow */}
                  <circle
                    cx='60'
                    cy='60'
                    r='55'
                    fill='rgba(250, 250, 250, 0.1)'
                    className='animate-pulse'
                  />
                  {/* Moon body */}
                  <circle cx='60' cy='60' r='45' fill='#fafafa' />
                  {/* Moon craters */}
                  <circle
                    cx='45'
                    cy='50'
                    r='8'
                    fill='rgba(200, 200, 200, 0.3)'
                  />
                  <circle
                    cx='70'
                    cy='55'
                    r='6'
                    fill='rgba(200, 200, 200, 0.3)'
                  />
                  <circle
                    cx='55'
                    cy='70'
                    r='5'
                    fill='rgba(200, 200, 200, 0.3)'
                  />
                  <circle
                    cx='75'
                    cy='70'
                    r='7'
                    fill='rgba(200, 200, 200, 0.3)'
                  />
                </motion.svg>
              ) : (
                <motion.svg
                  key='sun'
                  initial={{ opacity: 0, scale: 0.8, rotate: 180 }}
                  animate={{ opacity: 1, scale: 1, rotate: 0 }}
                  exit={{ opacity: 0, scale: 0.8, rotate: -180 }}
                  transition={{
                    opacity: { duration: 0.6, ease: 'easeInOut' },
                    scale: { duration: 0.6, ease: 'easeInOut' },
                    rotate: { duration: 0.8, ease: 'easeInOut' },
                  }}
                  viewBox='0 0 120 120'
                  fill='none'
                  xmlns='http://www.w3.org/2000/svg'
                  className='w-16 h-16 sm:w-20 sm:h-20 md:w-24 md:h-24 lg:w-32 lg:h-32 drop-shadow-2xl pointer-events-none'
                  style={{ pointerEvents: 'none' }}
                >
                  {/* Sun rays */}
                  <g
                    className='animate-spin-slow'
                    style={{ transformOrigin: '60px 60px' }}
                  >
                    <line
                      x1='60'
                      y1='0'
                      x2='60'
                      y2='15'
                      stroke='#fbbf24'
                      strokeWidth='3'
                      strokeLinecap='round'
                    />
                    <line
                      x1='60'
                      y1='105'
                      x2='60'
                      y2='120'
                      stroke='#fbbf24'
                      strokeWidth='3'
                      strokeLinecap='round'
                    />
                    <line
                      x1='0'
                      y1='60'
                      x2='15'
                      y2='60'
                      stroke='#fbbf24'
                      strokeWidth='3'
                      strokeLinecap='round'
                    />
                    <line
                      x1='105'
                      y1='60'
                      x2='120'
                      y2='60'
                      stroke='#fbbf24'
                      strokeWidth='3'
                      strokeLinecap='round'
                    />
                    <line
                      x1='21.21'
                      y1='21.21'
                      x2='30.36'
                      y2='30.36'
                      stroke='#fbbf24'
                      strokeWidth='3'
                      strokeLinecap='round'
                    />
                    <line
                      x1='89.64'
                      y1='89.64'
                      x2='98.79'
                      y2='98.79'
                      stroke='#fbbf24'
                      strokeWidth='3'
                      strokeLinecap='round'
                    />
                    <line
                      x1='21.21'
                      y1='98.79'
                      x2='30.36'
                      y2='89.64'
                      stroke='#fbbf24'
                      strokeWidth='3'
                      strokeLinecap='round'
                    />
                    <line
                      x1='89.64'
                      y1='30.36'
                      x2='98.79'
                      y2='21.21'
                      stroke='#fbbf24'
                      strokeWidth='3'
                      strokeLinecap='round'
                    />
                  </g>
                  {/* Sun glow */}
                  <circle
                    cx='60'
                    cy='60'
                    r='50'
                    fill='rgba(251, 191, 36, 0.2)'
                    className='animate-pulse'
                  />
                  {/* Sun body */}
                  <circle cx='60' cy='60' r='40' fill='#fbbf24' />
                </motion.svg>
              )}
            </AnimatePresence>
          </div>
        </Draggable>
      </div>
      <div className='flex flex-col lg:flex-row items-center justify-between gap-12 w-full max-w-7xl mx-auto px-4'>
        <div className='flex flex-col items-center md:items-start justify-center space-y-8 flex-1 order-2 lg:order-1 lg:pt-20'>
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6 }}
            className='text-center md:text-left space-y-6 w-full'
          >
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ delay: 0.2, duration: 0.6 }}
              className='space-y-4'
            >
              <h1
                ref={typeAnimationRef}
                className='text-4xl sm:text-5xl lg:text-6xl xl:text-7xl font-bold text-neutral-900 dark:text-neutral-50 leading-tight text-center md:text-left'
              >
                <span className='block sm:inline'>{t('hero.greeting')}</span>{' '}
                <span className='block sm:inline text-primary-600 dark:text-primary-400'>
                  <TypeAnimation
                    key={i18n.language}
                    sequence={['Utku', 2000, t('hero.title'), 2000]}
                    wrapper='span'
                    speed={30}
                    repeat={Infinity}
                  />
                </span>
              </h1>
              <p className='text-base sm:text-lg lg:text-xl text-neutral-600 dark:text-neutral-400 max-w-2xl mx-auto lg:mx-0 text-center md:text-left leading-relaxed'>
                {t('hero.subtitle')}
              </p>
            </motion.div>

            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.4, duration: 0.6 }}
              className='flex flex-col sm:flex-row gap-3 sm:gap-4 justify-center md:justify-start'
            >
              <button
                onClick={(_e) => {
                  scrollToContact()
                  trackEvent('hero_getInTouch_click', {
                    section: 'hero',
                    label: t('hero.getInTouch'),
                  })
                }}
                className='px-6 py-3 bg-primary-600 hover:bg-primary-700 dark:bg-primary-500 dark:hover:bg-primary-600 text-white rounded-lg font-medium transition-colors duration-200 shadow-lg shadow-primary-500/25'
              >
                {t('hero.getInTouch')}
              </button>
              <Tooltip.Provider>
                <Tooltip.Root>
                  <Tooltip.Trigger asChild>
                    <button
                      onClick={() => {
                        void downloadCV()
                        trackEvent('hero_download_cv_click', {
                          section: 'hero',
                        })
                      }}
                      className='download-cv-button px-6 py-3 text-neutral-700 dark:text-neutral-300 rounded-lg font-medium hover:bg-neutral-300 dark:hover:bg-neutral-700 transition-colors duration-200'
                    >
                      {t('hero.downloadCV')}
                    </button>
                  </Tooltip.Trigger>
                  <Tooltip.Portal>
                    <Tooltip.Content
                      className='bg-neutral-200 dark:bg-neutral-800 text-neutral-900 dark:text-neutral-100 px-3 py-1.5 rounded-md text-sm font-medium shadow-lg z-50 border border-neutral-300 dark:border-neutral-700'
                      side='bottom'
                      sideOffset={5}
                    >
                      {t('hero.downloadCVTooltip')}
                      <Tooltip.Arrow className='fill-neutral-200 dark:fill-neutral-800' />
                    </Tooltip.Content>
                  </Tooltip.Portal>
                </Tooltip.Root>
              </Tooltip.Provider>
            </motion.div>
          </motion.div>

          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 0.6, duration: 0.6 }}
            className='pt-2 md:pt-8'
          >
            <p className='hidden md:block text-sm text-neutral-500 dark:text-neutral-400 mb-4'>
              {t('hero.technologies')}
            </p>
            <div className='flex gap-2 md:gap-4 justify-center lg:justify-start'>
              {techStack.map((tech, index) => {
                const isHover = hovered === index
                const isMobile =
                  typeof window !== 'undefined' && window.innerWidth < 768

                const closedWidth = 40
                const openWidth = Math.max(120, 12 * tech.name.length)

                return (
                  <motion.button
                    tabIndex={-1}
                    key={tech.name}
                    onMouseEnter={() => !isMobile && setHovered(index)}
                    onMouseLeave={() => !isMobile && setHovered(null)}
                    aria-expanded={isHover}
                    title={tech.name}
                    layout
                    transition={{ type: 'spring', stiffness: 350, damping: 30 }}
                    style={{
                      width: isHover && !isMobile ? openWidth : closedWidth,
                      backgroundColor: 'var(--color-bg-card)',
                      border: '1px solid var(--color-border)',
                    }}
                    className={
                      'relative flex items-center gap-3 overflow-hidden rounded-lg p-2 md:cursor-pointer'
                    }
                  >
                    {/* overlay that does the "wipe" — scales in X from 0 to 1 */}
                    <motion.span
                      className='absolute inset-0 pointer-events-none rounded-lg'
                      style={{ transformOrigin: 'left center', zIndex: 0 }}
                      initial={{ scaleX: 0 }}
                      animate={{ scaleX: isHover && !isMobile ? 1 : 0 }}
                      transition={{ duration: 0.28, ease: 'easeInOut' }}
                    >
                      {/* pick your overlay color here — uses Tailwind color tokens in inline style for compatibility */}
                      <span
                        style={{
                          display: 'block',
                          width: '100%',
                          height: '100%',
                          backgroundColor:
                            isHover && !isMobile
                              ? 'var(--color-bg-secondary)'
                              : 'transparent',
                          opacity: 1,
                          borderRadius: '0.5rem',
                        }}
                      />
                    </motion.span>

                    {/* content sits above overlay (zIndex 10) */}
                    <div className='relative z-10 flex items-center gap-3 whitespace-nowrap'>
                      <img
                        src={tech.icon}
                        alt={tech.name}
                        loading='lazy'
                        className='w-6 h-6 flex-shrink-0'
                        style={{
                          filter:
                            isHover && !isMobile
                              ? isDarkMode
                                ? 'brightness(0) invert(1)'
                                : 'brightness(0)'
                              : undefined,
                        }}
                      />

                      {/* label */}
                      <motion.span
                        className='text-sm font-medium select-none text-gray-600 dark:text-neutral-50'
                        initial={{ opacity: 0, x: -6 }}
                        animate={{
                          opacity: isHover && !isMobile ? 1 : 0,
                          x: isHover && !isMobile ? 0 : -6,
                        }}
                        transition={{ duration: 0.18 }}
                        style={{
                          color:
                            isHover && !isMobile
                              ? 'var(--color-text-primary)'
                              : 'var(--color-text-secondary)',
                        }}
                      >
                        {tech.name}
                      </motion.span>
                    </div>
                  </motion.button>
                )
              })}
            </div>
          </motion.div>
        </div>

        <motion.div
          ref={profileImageRef}
          className='flex-shrink-0 group cursor-default order-1 lg:order-2'
        >
          <div
            className='relative w-48 h-48 sm:w-56 sm:h-56 md:w-64 md:h-64 lg:w-72 lg:h-72'
            style={{
              WebkitTransform: 'translateZ(0)',
              transform: 'translateZ(0)',
              isolation: 'isolate',
            }}
          >
            <img
              src={heroImage}
              alt='Utku Cikmaz - Full Stack Developer'
              className='absolute inset-0 w-full h-full object-cover shadow-xl border-4 border-white/20 dark:border-neutral-700/50 transition-all duration-200 group-hover:opacity-50 group-hover:shadow-2xl animate-profile-animate'
              loading='eager'
              style={{
                willChange: 'border-radius',
                WebkitBackfaceVisibility: 'visible',
                backfaceVisibility: 'visible',
                WebkitTransform: 'translate3d(0, 0, 0)',
                transform: 'translate3d(0, 0, 0)',
                WebkitPerspective: '1000px',
                perspective: '1000px',
                zIndex: 1,
              }}
            />
            <img
              src={heroHoverImage}
              alt='Utku Cikmaz - Full Stack Developer Hover'
              className='absolute inset-0 w-full h-full object-cover shadow-xl border-4 border-white/20 dark:border-neutral-700/50 transition-all duration-200 opacity-0 group-hover:opacity-100 group-hover:shadow-2xl animate-profile-animate'
              loading='eager'
              style={{
                willChange: 'border-radius, opacity',
                WebkitBackfaceVisibility: 'visible',
                backfaceVisibility: 'visible',
                WebkitTransform: 'translate3d(0, 0, 0)',
                transform: 'translate3d(0, 0, 0)',
                WebkitPerspective: '1000px',
                perspective: '1000px',
                zIndex: 2,
              }}
            />
          </div>
        </motion.div>

        <AnimatePresence>
          {!hasScrolled && (
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              transition={{
                delay: 0.5,
                duration: 1,
                exit: { duration: 0.5 },
              }}
              className='absolute bottom-8 left-1/2 transform -translate-x-1/2 hidden lg:block'
            >
              <a
                href='#craft'
                tabIndex={-1}
                className='flex flex-col items-center text-neutral-500 dark:text-neutral-400 hover:text-primary-600 dark:hover:text-primary-400 transition-colors'
                aria-label='Scroll to skills section'
                onClick={() =>
                  trackEvent('hero_scroll_hint_click', { section: 'hero' })
                }
              >
                <span className='text-sm mb-2'>{t('hero.scroll')}</span>
                <ArrowDownIcon className='h-6 w-6 animate-bounce' />
              </a>
            </motion.div>
          )}
        </AnimatePresence>
      </div>
    </section>
  )
}

export default HeroSection
