import { useTranslation } from 'react-i18next'
import { trackEvent } from '../utils/rybbit'
import type { NavLinkProps } from '../types'

const NavLink = ({
  to,
  titleKey,
  setNavbarOpen,
  isActive = false,
}: NavLinkProps): JSX.Element => {
  const { t } = useTranslation()

  const handleLinkClick = (e: React.MouseEvent<HTMLAnchorElement>): void => {
    e.preventDefault()

    trackEvent('nav_link_click', { target: to })
    const sectionId = to.replace('#', '')
    const element = document.getElementById(sectionId)

    if (setNavbarOpen) {
      setNavbarOpen(false)
    }

    const isMobile = typeof window !== 'undefined' && window.innerWidth < 768
    const delay = isMobile ? 350 : 0

    setTimeout(() => {
      if (element) {
        const offset = 80
        const elementPosition = element.getBoundingClientRect().top
        const offsetPosition = elementPosition + window.pageYOffset - offset

        window.scrollTo({
          top: offsetPosition,
          behavior: 'smooth',
        })
      }
    }, delay)
  }

  return (
    <a
      href={to}
      onClick={handleLinkClick}
      className={`relative block px-4 py-3 text-base font-medium transition-all duration-200 rounded-xl md:rounded-lg text-right md:text-left ${
        isActive
          ? 'text-primary-600 dark:text-primary-400 bg-primary-50 dark:bg-primary-950/40 shadow-sm md:shadow-none'
          : 'text-neutral-700 dark:text-neutral-300 hover:text-primary-600 dark:hover:text-primary-400 hover:bg-neutral-100 dark:hover:bg-neutral-800/50 active:bg-neutral-200 dark:active:bg-neutral-700/50'
      }`}
      aria-current={isActive ? 'page' : undefined}
    >
      {t(titleKey)}
    </a>
  )
}

export default NavLink
