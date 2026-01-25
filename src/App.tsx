import { useEffect, useState, lazy, Suspense } from 'react'
import { useTranslation } from 'react-i18next'
import { AnimatePresence } from 'framer-motion'
import { Toaster } from 'react-hot-toast'
import i18n from './i18n/config'
import SEO from './components/SEO'
import { initScrollTracking } from './utils/rybbit-scroll'
import HeroSection from './components/HeroSection'
import Navbar from './components/Navbar'
import CraftSection from './components/CraftSection'
import Experience from './components/Experience'
import ProjectsSection from './components/ProjectsSection'
import PersonalSection from './components/PersonalSection'
import EmailSection from './components/EmailSection'
import Footer from './components/Footer'
import ScrollToTopButton from './components/ScrollToTopButton'
import ThemeCelestial from './components/ThemeCelestial'
import SplashScreen from './components/SplashScreen'
import type { NavbarProps } from './types'
import './App.css'
import './index.css'

const BackgroundThree = lazy(() => import('./components/BackgroundThree'))

function App(): JSX.Element {
  const { t } = useTranslation()
  const [isDarkMode, setIsDarkMode] = useState<boolean>(true)
  const [showSplash, setShowSplash] = useState<boolean>(true)
  const [isLargeScreen, setIsLargeScreen] = useState<boolean>(false)

  useEffect(() => {
    const savedTheme = localStorage.getItem('theme')
    if (savedTheme) {
      setIsDarkMode(savedTheme === 'dark')
    } else {
      setIsDarkMode(true)
    }
  }, [])

  // Initialize scroll tracking for rybbit analytics
  useEffect(() => {
    const cleanup = initScrollTracking()
    return cleanup
  }, [])

  useEffect(() => {
    const startTime = Date.now()
    const minDisplayTime = 2000

    const checkI18nReady = (): Promise<void> => {
      return new Promise((resolve) => {
        if (i18n.isInitialized) {
          resolve()
        } else {
          const checkInterval = setInterval(() => {
            if (i18n.isInitialized) {
              clearInterval(checkInterval)
              resolve()
            }
          }, 50)
        }
      })
    }

    void Promise.all([
      checkI18nReady(),
      new Promise<void>((resolve) => {
        const elapsed = Date.now() - startTime
        const remainingTime = Math.max(0, minDisplayTime - elapsed)
        setTimeout(resolve, remainingTime)
      }),
    ]).then(() => {
      setShowSplash(false)
    })
  }, [])

  useEffect(() => {
    const root = document.documentElement
    root.style.transition =
      'background-color 2s ease-in-out, color 2s ease-in-out'

    if (isDarkMode) {
      root.classList.add('dark')
    } else {
      root.classList.remove('dark')
    }
    localStorage.setItem('theme', isDarkMode ? 'dark' : 'light')

    const timer = setTimeout(() => {
      root.style.transition = ''
    }, 2000)

    return () => clearTimeout(timer)
  }, [isDarkMode])

  useEffect(() => {
    const checkScreenSize = () => {
      setIsLargeScreen(window.innerWidth > 768)
    }

    checkScreenSize()
    window.addEventListener('resize', checkScreenSize)

    return () => window.removeEventListener('resize', checkScreenSize)
  }, [])

  const handleSetIsDarkMode: NavbarProps['setIsDarkMode'] = (
    value: boolean
  ) => {
    setIsDarkMode(value)
  }

  return (
    <>
      <SEO />
      <AnimatePresence>
        {showSplash && (
          <SplashScreen isVisible={showSplash} isDarkMode={isDarkMode} />
        )}
      </AnimatePresence>
      {isLargeScreen && (
        <Suspense fallback={null}>
          <BackgroundThree isDarkMode={isDarkMode} />
        </Suspense>
      )}
      <ThemeCelestial isDarkMode={isDarkMode} />
      <a href='#main-content' tabIndex={-1} className='skip-to-main'>
        {t('nav.skipToMain')}
      </a>
      <Navbar isDarkMode={isDarkMode} setIsDarkMode={handleSetIsDarkMode} />
      <main
        className='container mx-auto px-4 sm:px-6 lg:px-8'
        id='main-content'
      >
        <HeroSection isDarkMode={isDarkMode} />
        <CraftSection />
        <Experience />
        <ProjectsSection isDarkMode={isDarkMode} />
        <PersonalSection />
        <EmailSection />
      </main>
      <Footer />
      <ScrollToTopButton />
      <Toaster
        position='bottom-right'
        toastOptions={{
          duration: 4000,
          style: {
            background: 'var(--toast-bg)',
            color: 'var(--toast-text)',
            border: '1px solid var(--toast-border)',
            marginBottom: '20px',
            marginRight: '20px',
          },
        }}
      />
    </>
  )
}

export default App
