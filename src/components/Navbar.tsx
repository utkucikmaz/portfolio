import { useState, useEffect } from 'react'
import { useTranslation } from 'react-i18next'
import { trackEvent } from '../utils/rybbit'
import { AnimatePresence, motion, useScroll, useTransform } from 'framer-motion'
import NavLink from './NavLink'
import LanguageSwitcher from './LanguageSwitcher'
import {
  Bars3Icon,
  XMarkIcon,
  MoonIcon,
  SunIcon,
} from '@heroicons/react/24/outline'
import type { NavbarProps, NavLink as NavLinkType } from '../types'

const navLinks: NavLinkType[] = [
  {
    key: 'nav.craft',
    path: '#craft',
  },
  {
    key: 'nav.journey',
    path: '#journey',
  },
  {
    key: 'nav.projects',
    path: '#projects',
  },
  {
    key: 'nav.personal',
    path: '#personal',
  },
  {
    key: 'nav.contact',
    path: '#contact',
  },
]

const sectionIds = navLinks.map((link) => link.path.replace('#', ''))

const Navbar = ({ isDarkMode, setIsDarkMode }: NavbarProps): JSX.Element => {
  const { t } = useTranslation()
  const [navbarOpen, setNavbarOpen] = useState<boolean>(false)
  const [isWide, setIsWide] = useState<boolean>(() => {
    if (typeof window === 'undefined') return true
    return window.innerWidth >= 900
  })
  const [scrolled, setScrolled] = useState<boolean>(false)
  const [activeSection, setActiveSection] = useState<string>('')

  const { scrollY } = useScroll()
  const bgOpacity = useTransform(scrollY, [0, 200], [0.65, 0.95])

  useEffect(() => {
    trackEvent('navbar_impression', { section: 'navbar' })
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [])

  useEffect(() => {
    let scrollRaf: number | null = null
    const SCROLL_TRIGGER = 200
    const SCROLL_TOP_OFFSET = 100
    const handleScroll = (): void => {
      if (scrollRaf !== null) return
      scrollRaf = window.requestAnimationFrame(() => {
        const nextScrolled = window.scrollY > SCROLL_TRIGGER
        setScrolled((prev) => (prev === nextScrolled ? prev : nextScrolled))

        const scrollPosition = window.scrollY + SCROLL_TOP_OFFSET

        const heroElement = document.getElementById('hero')
        if (heroElement) {
          const heroRect = heroElement.getBoundingClientRect()
          const heroBottom =
            heroRect.bottom + window.scrollY - SCROLL_TOP_OFFSET

          if (scrollPosition < heroBottom) {
            setActiveSection((prev) => (prev === '' ? prev : ''))
            scrollRaf = null
            return
          }
        }

        let currentSection = ''
        let minDistance = Infinity

        sectionIds.forEach((sectionId) => {
          const element = document.getElementById(sectionId)
          if (element) {
            const rect = element.getBoundingClientRect()
            const elementTop = rect.top + window.scrollY
            const distance = Math.abs(scrollPosition - elementTop)

            if (distance < minDistance) {
              minDistance = distance
              currentSection = sectionId
            }
          }
        })

        setActiveSection((prev) =>
          prev === currentSection ? prev : currentSection
        )
        scrollRaf = null
      })
    }

    window.addEventListener('scroll', handleScroll, { passive: true })
    handleScroll()

    return () => {
      if (scrollRaf !== null) window.cancelAnimationFrame(scrollRaf)
      window.removeEventListener('scroll', handleScroll)
    }
  }, [])

  useEffect(() => {
    const onResize = (): void => {
      setIsWide(window.innerWidth >= 900)
    }
    window.addEventListener('resize', onResize)
    onResize()
    return () => window.removeEventListener('resize', onResize)
  }, [])

  useEffect(() => {
    const handleClickOutside = (event: MouseEvent): void => {
      if (navbarOpen) {
        const target = event.target as Element
        const navbar = document.querySelector('nav')
        if (navbar && !navbar.contains(target)) {
          setNavbarOpen(false)
        }
      }
    }

    document.addEventListener('mousedown', handleClickOutside)
    return () => {
      document.removeEventListener('mousedown', handleClickOutside)
    }
  }, [navbarOpen])

  const toggleTheme = (): void => {
    const newIsDarkMode = !isDarkMode
    setIsDarkMode(newIsDarkMode)
  }

  return (
    <nav
      className={`fixed top-0 left-0 right-0 z-50 transition-all duration-300 ease-in-out ${
        scrolled
          ? 'bg-white/60 lg:bg-white/70 dark:bg-neutral-950/60 md:dark:bg-neutral-950/80 backdrop-blur lg:backdrop-blur-md'
          : 'bg-white/0 dark:bg-neutral-950/0'
      }`}
      role='navigation'
      aria-label='Main navigation'
    >
      <div className='container mx-auto px-4 sm:px-6 lg:px-8'>
        <div className='flex items-center justify-between h-20'>
          <a
            href='/#'
            tabIndex={-1}
            onClick={(e) => {
              e.preventDefault()
              window.scrollTo({ top: 0, behavior: 'smooth' })
            }}
            className='flex items-center space-x-3 group'
            aria-label='Home'
          >
            <img
              className='w-10 h-10 transition-transform duration-100 group-hover:scale-105'
              src='/images/logo.png'
              alt='Utku Cikmaz'
              width={40}
              height={40}
            />
            <span className='text-lg font-semibold text-neutral-900 dark:text-neutral-50 hidden sm:block'>
              utku cikmaz
            </span>
          </a>

          {/* Desktop Navigation (visible >= 900px) */}
          <div className={isWide ? 'flex items-center space-x-1' : 'hidden'}>
            <ul className='flex items-center space-x-1'>
              {navLinks.map((link, index) => (
                <li key={index}>
                  <NavLink
                    to={link.path}
                    titleKey={link.key}
                    setNavbarOpen={setNavbarOpen}
                    isActive={activeSection === link.path.replace('#', '')}
                  />
                </li>
              ))}
            </ul>
            <LanguageSwitcher onOpen={() => setNavbarOpen(false)} />
            <button
              onClick={() => {
                trackEvent('navbar_theme_toggle', {
                  section: 'navbar',
                  toDark: !isDarkMode,
                })
                toggleTheme()
              }}
              className='p-2 rounded-lg text-neutral-900 dark:text-neutral-300 hover:bg-neutral-100 dark:hover:bg-neutral-800 transition-colors'
              aria-label={
                isDarkMode ? t('theme.toggleLight') : t('theme.toggleDark')
              }
            >
              {isDarkMode ? (
                <SunIcon className='h-5 w-5' />
              ) : (
                <MoonIcon className='h-5 w-5' />
              )}
            </button>
          </div>

          {/* Mobile / Burger group (visible < 900px) */}
          <div className={isWide ? 'hidden' : 'flex'}>
            <LanguageSwitcher onOpen={() => setNavbarOpen(false)} />
            <button
              onClick={toggleTheme}
              className='p-2 rounded-lg text-neutral-900 dark:text-neutral-300 hover:bg-neutral-100 dark:hover:bg-neutral-800 transition-colors'
              aria-label={
                isDarkMode ? t('theme.toggleLight') : t('theme.toggleDark')
              }
            >
              {isDarkMode ? (
                <SunIcon className='h-5 w-5' />
              ) : (
                <MoonIcon className='h-5 w-5' />
              )}
            </button>
            <button
              onClick={() => {
                trackEvent('navbar_mobile_toggle', {
                  section: 'navbar',
                  open: !navbarOpen,
                })
                setNavbarOpen(!navbarOpen)
              }}
              className='p-2 rounded-lg text-neutral-900 dark:text-neutral-300 hover:bg-neutral-100 dark:hover:bg-neutral-800 transition-colors'
              aria-label={
                navbarOpen
                  ? t('accessibility.menuClose')
                  : t('accessibility.menuOpen')
              }
              aria-expanded={navbarOpen}
            >
              {navbarOpen ? (
                <XMarkIcon className='h-6 w-6' />
              ) : (
                <Bars3Icon className='h-6 w-6' />
              )}
            </button>
          </div>
        </div>
      </div>

      {/* Mobile Menu */}
      <AnimatePresence>
        {navbarOpen && (
          <motion.div
            initial={{ opacity: 0, height: 0 }}
            style={{ '--tw-bg-opacity': bgOpacity } as React.CSSProperties}
            animate={{ opacity: 1, height: 'auto' }}
            exit={{ opacity: 0, height: 0 }}
            transition={{ duration: 0.5, ease: [0.4, 0, 0.2, 1] }}
            className='fixed inset-x-0 top-18 mx-auto w-[92vw] max-w-[440px] sm:absolute sm:inset-x-auto sm:right-0 sm:mx-0 rounded-2xl border bg-white dark:bg-neutral-950 backdrop-blur-sm shadow-xl border-neutral-200/50 dark:border-neutral-800/50 overflow-hidden z-50'
          >
            <div className='px-4 sm:px-6'>
              <motion.ul
                initial={{ y: -20 }}
                animate={{ y: 0 }}
                exit={{ y: -20 }}
                transition={{ duration: 0.3, ease: 'easeOut' }}
                className='flex flex-col py-6 space-y-2 items-end'
              >
                {navLinks.map((link, index) => (
                  <motion.li
                    key={index}
                    initial={{ opacity: 0, x: 20 }}
                    animate={{ opacity: 1, x: 0 }}
                    transition={{ delay: index * 0.05, duration: 0.2 }}
                    className='w-full'
                  >
                    <NavLink
                      to={link.path}
                      titleKey={link.key}
                      setNavbarOpen={setNavbarOpen}
                      isActive={activeSection === link.path.replace('#', '')}
                    />
                  </motion.li>
                ))}
              </motion.ul>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </nav>
  )
}

export default Navbar
