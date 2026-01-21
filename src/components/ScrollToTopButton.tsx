import { useEffect, useState } from 'react'
import { useTranslation } from 'react-i18next'
import { ArrowUpIcon } from '@heroicons/react/24/outline'

const ScrollToTopButton = (): JSX.Element => {
  const { t } = useTranslation()
  const [isVisible, setIsVisible] = useState<boolean>(false)

  const handleScroll = (): void => {
    const scrollTop = window.scrollY
    const next = scrollTop > 300
    setIsVisible((prev) => (prev === next ? prev : next))
  }

  const scrollToTop = (): void => {
    window.scrollTo({
      top: 0,
      behavior: 'smooth',
    })
  }

  useEffect(() => {
    window.addEventListener('scroll', handleScroll, { passive: true })
    return () => {
      window.removeEventListener('scroll', handleScroll)
    }
  }, [])

  return (
    <button
      className={`scroll-to-top ${isVisible ? 'visible' : ''}`}
      onClick={scrollToTop}
      aria-label={t('accessibility.scrollToTop')}
    >
      <ArrowUpIcon className='h-5 w-5' />
    </button>
  )
}

export default ScrollToTopButton
