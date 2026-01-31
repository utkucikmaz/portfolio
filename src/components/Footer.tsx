import { useTranslation } from 'react-i18next'
import { trackEvent } from '../utils/rybbit'

const Footer = (): JSX.Element => {
  const { t } = useTranslation()
  const currentYear = new Date().getFullYear()
  return (
    <footer className='border-t border-neutral-200 dark:border-neutral-800 bg-white dark:bg-neutral-950 pb-6 lg:pb-2'>
      <div className='container mx-auto px-4 sm:px-6 lg:px-8 py-8'>
        <div className='flex flex-row sm:flex-row items-center justify-between gap-4 m-6'>
          <div className='flex items-center gap-3'>
            <span className='text-sm font-medium text-neutral-700 dark:text-neutral-300'>
              utku
            </span>
            <img
              className='w-10 h-10'
              src='/images/logo.png'
              alt='Utku Cikmaz'
              width={40}
              height={40}
              loading='lazy'
            />
            <span className='text-sm font-medium text-neutral-700 dark:text-neutral-300'>
              cikmaz
            </span>
          </div>

          <div className='flex items-center gap-6 md:absolute md:left-1/2 md:transform md:-translate-x-1/2 lg:static lg:transform-none'>
            <a
              href='https://www.linkedin.com/in/utkucikmaz/'
              target='_blank'
              rel='noopener noreferrer'
              className='text-neutral-600 dark:text-neutral-400 hover:text-primary-600 dark:hover:text-primary-400 transition-colors'
              aria-label={t('footer.linkedin')}
              tabIndex={-1}
              onClick={() =>
                trackEvent('footer_link_click', { platform: 'LinkedIn' })
              }
            >
              <img
                src='/svg/linkedin-icon.svg'
                alt='LinkedIn'
                className='w-5 h-5 brightness-0 dark:invert'
                loading='lazy'
              />
            </a>
            <a
              href='https://github.com/utkucikmaz'
              target='_blank'
              rel='noopener noreferrer'
              className='text-neutral-600 dark:text-neutral-400 hover:text-primary-600 dark:hover:text-primary-400 transition-colors'
              aria-label={t('footer.github')}
              tabIndex={-1}
              onClick={() =>
                trackEvent('footer_link_click', { platform: 'GitHub' })
              }
            >
              <img
                src='/svg/github-icon.svg'
                alt='GitHub'
                className='w-5 h-5 brightness-0 dark:invert'
                loading='lazy'
              />
            </a>
          </div>
          <div className='hidden md:block md:pr-10 lg:pr-12'>
            {/* Privacy lines side-by-side on lg+ screens, column on md screens */}
            <p className='text-xs text-right text-neutral-500 dark:text-neutral-500 mt-1'>
              &copy; {currentYear}. {t('footer.copyright')}
            </p>
          </div>
        </div>
        <div className='flex flex-col md:flex-row lg:gap-1 justify-center lg:mb-6'>
          <p className='text-xs text-center text-neutral-500 dark:text-neutral-500'>
            {t('footer.privacyLine1')}
          </p>
          <p className='text-xs text-center text-neutral-500 dark:text-neutral-500'>
            {t('footer.privacyLine2')}
          </p>
        </div>
        <div className='md:hidden lg:hidden'>
          {/* Privacy lines side-by-side on lg+ screens, column on md screens */}
          <p className='text-xs text-center text-neutral-500 dark:text-neutral-500 mt-3'>
            &copy; {currentYear}. {t('footer.copyright')}
          </p>
        </div>
      </div>
    </footer>
  )
}

export default Footer
