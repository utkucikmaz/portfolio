import { useState, useRef } from 'react'
import { useTranslation } from 'react-i18next'
import emailjs from '@emailjs/browser'
import { motion } from 'framer-motion'
import {
  ExclamationCircleIcon,
  CheckCircleIcon,
} from '@heroicons/react/24/outline'

const EmailSection = (): JSX.Element => {
  const { t } = useTranslation()
  const [isSubmitting, setIsSubmitting] = useState<boolean>(false)
  const [error, setError] = useState<string | null>(null)
  const [success, setSuccess] = useState<boolean>(false)
  const form = useRef<HTMLFormElement>(null)

  const sendEmail = (e: React.FormEvent<HTMLFormElement>): void => {
    e.preventDefault()
    if (!form.current) return

    setIsSubmitting(true)
    setError(null)

    const serviceId: string = import.meta.env.VITE_EMAILJS_SERVICE_ID
    const templateId: string = import.meta.env.VITE_EMAILJS_TEMPLATE_ID
    const publicKey: string = import.meta.env.VITE_EMAILJS_PUBLIC_KEY

    emailjs
      .sendForm(serviceId, templateId, form.current, {
        publicKey: publicKey,
      })
      .then(
        () => {
          setSuccess(true)
          setIsSubmitting(false)
          setError(null)
          form.current?.reset()
          setTimeout(() => setSuccess(false), 5000)
        },
        (error: { status?: number; text?: string }) => {
          console.error('Email sending failed:', error)
          let errorMessage = t('contact.error.generic')

          if (error?.status === 429) {
            errorMessage = t('contact.error.rateLimit')
          } else if (error?.status === 400) {
            errorMessage = t('contact.error.invalidData')
          } else if (error?.status === 401) {
            errorMessage = t('contact.error.auth')
          } else if (error?.status === 403) {
            errorMessage = t('contact.error.serviceUnavailable')
          } else if (error?.text) {
            errorMessage = `Error: ${error.text}`
          }

          setError(errorMessage)
          setSuccess(false)
          setIsSubmitting(false)
        }
      )
  }

  return (
    <section id='contact'>
      <div className='grid lg:grid-cols-2 gap-12 lg:gap-16 max-w-6xl mx-auto'>
        <motion.div
          initial={{ opacity: 0, x: -20 }}
          whileInView={{ opacity: 1, x: 0 }}
          viewport={{ once: true }}
          className='space-y-6'
        >
          <div>
            <h2 className='text-4xl lg:text-5xl font-bold text-neutral-900 dark:text-neutral-50 mb-4'>
              {t('contact.title')}
            </h2>
            <p className='text-lg text-neutral-600 dark:text-neutral-400 leading-relaxed'>
              {t('contact.subtitle')}
            </p>
          </div>

          <div className='flex gap-6 pt-4'>
            <a
              href='https://github.com/utkucikmaz'
              target='_blank'
              rel='noopener noreferrer'
              className='transition-opacity hover:opacity-70'
              aria-label='GitHub profile'
            >
              <img
                src='/svg/github-icon.svg'
                alt='GitHub'
                className='w-9 h-9 brightness-0 dark:invert'
                loading='lazy'
              />
            </a>
            <a
              href='https://www.linkedin.com/in/utkucikmaz/'
              target='_blank'
              rel='noopener noreferrer'
              className='transition-opacity hover:opacity-70'
              aria-label='LinkedIn profile'
            >
              <img
                src='/svg/linkedin-icon.svg'
                alt='LinkedIn'
                className='w-9 h-9 brightness-0 dark:invert'
                loading='lazy'
              />
            </a>
          </div>
        </motion.div>

        <motion.div
          initial={{ opacity: 0, x: 20 }}
          whileInView={{ opacity: 1, x: 0 }}
          viewport={{ once: true }}
        >
          <form className='space-y-6' ref={form} onSubmit={sendEmail}>
            {success && (
              <div className='p-4 rounded-lg bg-green-50 dark:bg-green-950/20 border border-green-200 dark:border-green-900 flex items-start gap-3'>
                <CheckCircleIcon className='w-5 h-5 text-green-600 dark:text-green-400 flex-shrink-0 mt-0.5' />
                <div className='flex flex-col gap-1'>
                  <p className='text-sm font-medium text-green-700 dark:text-green-300'>
                    {t('contact.success')}
                  </p>
                  <p className='text-sm text-green-600 dark:text-green-400'>
                    {t('contact.successMessage')}
                  </p>
                </div>
              </div>
            )}

            {error && (
              <div className='p-4 rounded-lg bg-red-50 dark:bg-red-950/20 border border-red-200 dark:border-red-900 flex items-start gap-3'>
                <ExclamationCircleIcon className='w-5 h-5 text-red-600 dark:text-red-400 flex-shrink-0 mt-0.5' />
                <p className='text-sm text-red-700 dark:text-red-300'>
                  {error}
                </p>
              </div>
            )}

            <div>
              <label
                htmlFor='name'
                className='block text-sm font-medium text-neutral-700 dark:text-neutral-300 mb-2'
              >
                {t('contact.name')}
              </label>
              <input
                name='name'
                type='text'
                id='name'
                required
                className='w-full px-3 py-2 border-0 border-b border-neutral-300 dark:border-neutral-700 bg-transparent text-neutral-900 dark:text-neutral-50 placeholder-neutral-400 dark:placeholder-neutral-500 focus:outline-none focus:border-primary-500 focus:ring-0 transition-colors'
                placeholder={t('contact.placeholder.name')}
              />
            </div>

            <div>
              <label
                htmlFor='email'
                className='block text-sm font-medium text-neutral-700 dark:text-neutral-300 mb-2'
              >
                {t('contact.email')}
              </label>
              <input
                name='email'
                type='email'
                id='email'
                required
                className='w-full px-3 py-2 border-0 border-b border-neutral-300 dark:border-neutral-700 bg-transparent text-neutral-900 dark:text-neutral-50 placeholder-neutral-400 dark:placeholder-neutral-500 focus:outline-none focus:border-primary-500 focus:ring-0 transition-colors'
                placeholder={t('contact.placeholder.email')}
              />
            </div>

            <div>
              <label
                htmlFor='subject'
                className='block text-sm font-medium text-neutral-700 dark:text-neutral-300 mb-2'
              >
                {t('contact.subject')}
              </label>
              <input
                name='subject'
                type='text'
                id='subject'
                required
                className='w-full px-3 py-2 border-0 border-b border-neutral-300 dark:border-neutral-700 bg-transparent text-neutral-900 dark:text-neutral-50 placeholder-neutral-400 dark:placeholder-neutral-500 focus:outline-none focus:border-primary-500 focus:ring-0 transition-colors'
                placeholder={t('contact.placeholder.subject')}
              />
            </div>

            <div>
              <label
                htmlFor='message'
                className='block text-sm font-medium text-neutral-700 dark:text-neutral-300 mb-2'
              >
                {t('contact.message')}
              </label>
              <textarea
                name='message'
                id='message'
                rows={4}
                required
                className='w-full px-3 py-2 border-0 border-b border-neutral-300 dark:border-neutral-700 bg-transparent text-neutral-900 dark:text-neutral-50 placeholder-neutral-400 dark:placeholder-neutral-500 focus:outline-none focus:border-primary-500 focus:ring-0 transition-colors resize-none'
                placeholder={t('contact.placeholder.message')}
              />
            </div>

            <div className='flex justify-center'>
              <button
                type='submit'
                disabled={isSubmitting}
                className='send-message-button px-4 py-2 text-neutral-700 dark:text-neutral-300 rounded-lg font-medium hover:bg-neutral-300 dark:hover:bg-neutral-700 transition-colors duration-200'
              >
                {isSubmitting ? t('contact.sending') : t('contact.sendMessage')}
              </button>
            </div>
          </form>
        </motion.div>
      </div>
    </section>
  )
}

export default EmailSection
