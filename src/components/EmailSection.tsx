import { useState, useRef } from 'react'
import { useTranslation } from 'react-i18next'
import emailjs from '@emailjs/browser'
import { motion } from 'framer-motion'
import {
  ExclamationCircleIcon,
  CheckCircleIcon,
} from '@heroicons/react/24/outline'
import * as Tooltip from '@radix-ui/react-tooltip'

const EmailSection = (): JSX.Element => {
  const { t } = useTranslation()
  const [isSubmitting, setIsSubmitting] = useState<boolean>(false)
  const [error, setError] = useState<string | null>(null)
  const [success, setSuccess] = useState<boolean>(false)
  const form = useRef<HTMLFormElement>(null)

  const sendEmail = (e: React.FormEvent<HTMLFormElement>): void => {
    e.preventDefault()
    if (!form.current) return

    // Manual validation to prevent browser's default tooltip
    const formData = new FormData(form.current)
    const name = formData.get('name') as string
    const email = formData.get('email') as string
    const subject = formData.get('subject') as string
    const message = formData.get('message') as string

    if (!name || !name.trim()) {
      setError(t('contact.error.invalidData'))
      return
    }

    if (!email || !email.trim() || !email.includes('@')) {
      setError(t('contact.error.invalidData'))
      return
    }

    if (!subject || !subject.trim()) {
      setError(t('contact.error.invalidData'))
      return
    }

    if (!message || !message.trim()) {
      setError(t('contact.error.invalidData'))
      return
    }

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

            <Tooltip.Provider>
              <Tooltip.Root>
                <Tooltip.Trigger asChild>
                  <a
                    href='https://www.linkedin.com/in/utkucikmaz/'
                    target='_blank'
                    rel='noopener noreferrer'
                    className='transition-opacity hover:opacity-70 cursor-pointer'
                    aria-label='LinkedIn profile'
                  >
                    <img
                      src='/svg/linkedin-icon.svg'
                      alt='LinkedIn'
                      className='w-9 h-9 brightness-0 dark:invert'
                      loading='lazy'
                    />
                  </a>
                </Tooltip.Trigger>
                <Tooltip.Portal>
                  <Tooltip.Content
                    className='bg-neutral-200 dark:bg-neutral-800 text-neutral-900 dark:text-neutral-100 px-3 py-1.5 rounded-md text-sm font-medium shadow-lg z-50 border border-neutral-300 dark:border-neutral-700'
                    side='bottom'
                    sideOffset={5}
                  >
                    {t('contact.tooltip.linkedin')}
                    <Tooltip.Arrow className='fill-neutral-200 dark:fill-neutral-800' />
                  </Tooltip.Content>
                </Tooltip.Portal>
              </Tooltip.Root>
            </Tooltip.Provider>
                        <Tooltip.Provider>
              <Tooltip.Root>
                <Tooltip.Trigger asChild>
                  <a
                    href='https://github.com/utkucikmaz'
                    target='_blank'
                    rel='noopener noreferrer'
                    className='transition-opacity hover:opacity-70 cursor-pointer'
                    aria-label='GitHub profile'
                  >
                    <img
                      src='/svg/github-icon.svg'
                      alt='GitHub'
                      className='w-9 h-9 brightness-0 dark:invert'
                      loading='lazy'
                    />
                  </a>
                </Tooltip.Trigger>
                <Tooltip.Portal>
                  <Tooltip.Content
                    className='bg-neutral-200 dark:bg-neutral-800 text-neutral-900 dark:text-neutral-100 px-3 py-1.5 rounded-md text-sm font-medium shadow-lg z-50 border border-neutral-300 dark:border-neutral-700'
                    side='bottom'
                    sideOffset={5}
                  >
                    {t('contact.tooltip.github')}
                    <Tooltip.Arrow className='fill-neutral-200 dark:fill-neutral-800' />
                  </Tooltip.Content>
                </Tooltip.Portal>
              </Tooltip.Root>
            </Tooltip.Provider>
          </div>
        </motion.div>

        <motion.div
          initial={{ opacity: 0, x: 20 }}
          whileInView={{ opacity: 1, x: 0 }}
          viewport={{ once: true }}
        >
          <form className='space-y-6' ref={form} onSubmit={sendEmail} noValidate>
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
              <Tooltip.Provider>
                <Tooltip.Root>
                  <Tooltip.Trigger asChild>
                    <label
                      htmlFor='name'
                      className='block text-sm font-medium text-neutral-700 dark:text-neutral-300 mb-2 cursor-help'
                    >
                      {t('contact.name')}
                    </label>
                  </Tooltip.Trigger>
                  <Tooltip.Portal>
                    <Tooltip.Content
                      className='bg-neutral-200 dark:bg-neutral-800 text-neutral-900 dark:text-neutral-100 px-3 py-1.5 rounded-md text-sm font-medium shadow-lg z-50 border border-neutral-300 dark:border-neutral-700'
                      sideOffset={5}
                    >
                      {t('contact.tooltip.name')}
                      <Tooltip.Arrow className='fill-neutral-200 dark:fill-neutral-800' />
                    </Tooltip.Content>
                  </Tooltip.Portal>
                </Tooltip.Root>
              </Tooltip.Provider>
              <Tooltip.Provider>
                <Tooltip.Root>
                  <Tooltip.Trigger asChild>
                    <input
                      name='name'
                      type='text'
                      id='name'
                      className='w-full px-3 py-2 border-0 border-b border-neutral-300 dark:border-neutral-700 bg-transparent text-neutral-900 dark:text-neutral-50 placeholder-neutral-400 dark:placeholder-neutral-500 focus:outline-none focus:border-primary-500 focus:ring-0 transition-colors cursor-text'
                      placeholder={t('contact.placeholder.name')}
                    />
                  </Tooltip.Trigger>
                  <Tooltip.Portal>
                    <Tooltip.Content
                      className='bg-neutral-200 dark:bg-neutral-800 text-neutral-900 dark:text-neutral-100 px-3 py-1.5 rounded-md text-sm font-medium shadow-lg z-50 border border-neutral-300 dark:border-neutral-700'
                      sideOffset={5}
                    >
                      {t('contact.tooltip.name')}
                      <Tooltip.Arrow className='fill-neutral-200 dark:fill-neutral-800' />
                    </Tooltip.Content>
                  </Tooltip.Portal>
                </Tooltip.Root>
              </Tooltip.Provider>
            </div>

            <div>
              <Tooltip.Provider>
                <Tooltip.Root>
                  <Tooltip.Trigger asChild>
                    <label
                      htmlFor='email'
                      className='block text-sm font-medium text-neutral-700 dark:text-neutral-300 mb-2 cursor-help'
                    >
                      {t('contact.email')}
                    </label>
                  </Tooltip.Trigger>
                  <Tooltip.Portal>
                    <Tooltip.Content
                      className='bg-neutral-200 dark:bg-neutral-800 text-neutral-900 dark:text-neutral-100 px-3 py-1.5 rounded-md text-sm font-medium shadow-lg z-50 border border-neutral-300 dark:border-neutral-700'
                      sideOffset={5}
                    >
                      {t('contact.tooltip.email')}
                      <Tooltip.Arrow className='fill-neutral-200 dark:fill-neutral-800' />
                    </Tooltip.Content>
                  </Tooltip.Portal>
                </Tooltip.Root>
              </Tooltip.Provider>
              <Tooltip.Provider>
                <Tooltip.Root>
                  <Tooltip.Trigger asChild>
                    <input
                      name='email'
                      type='email'
                      id='email'
                      className='w-full px-3 py-2 border-0 border-b border-neutral-300 dark:border-neutral-700 bg-transparent text-neutral-900 dark:text-neutral-50 placeholder-neutral-400 dark:placeholder-neutral-500 focus:outline-none focus:border-primary-500 focus:ring-0 transition-colors cursor-text'
                      placeholder={t('contact.placeholder.email')}
                    />
                  </Tooltip.Trigger>
                  <Tooltip.Portal>
                    <Tooltip.Content
                      className='bg-neutral-200 dark:bg-neutral-800 text-neutral-900 dark:text-neutral-100 px-3 py-1.5 rounded-md text-sm font-medium shadow-lg z-50 border border-neutral-300 dark:border-neutral-700'
                      sideOffset={5}
                    >
                      {t('contact.tooltip.email')}
                      <Tooltip.Arrow className='fill-neutral-200 dark:fill-neutral-800' />
                    </Tooltip.Content>
                  </Tooltip.Portal>
                </Tooltip.Root>
              </Tooltip.Provider>
            </div>

            <div>
              <Tooltip.Provider>
                <Tooltip.Root>
                  <Tooltip.Trigger asChild>
                    <label
                      htmlFor='subject'
                      className='block text-sm font-medium text-neutral-700 dark:text-neutral-300 mb-2 cursor-help'
                    >
                      {t('contact.subject')}
                    </label>
                  </Tooltip.Trigger>
                  <Tooltip.Portal>
                    <Tooltip.Content
                      className='bg-neutral-200 dark:bg-neutral-800 text-neutral-900 dark:text-neutral-100 px-3 py-1.5 rounded-md text-sm font-medium shadow-lg z-50 border border-neutral-300 dark:border-neutral-700'
                      sideOffset={5}
                    >
                      {t('contact.tooltip.subject')}
                      <Tooltip.Arrow className='fill-neutral-200 dark:fill-neutral-800' />
                    </Tooltip.Content>
                  </Tooltip.Portal>
                </Tooltip.Root>
              </Tooltip.Provider>
              <Tooltip.Provider>
                <Tooltip.Root>
                  <Tooltip.Trigger asChild>
                    <input
                      name='subject'
                      type='text'
                      id='subject'
                      className='w-full px-3 py-2 border-0 border-b border-neutral-300 dark:border-neutral-700 bg-transparent text-neutral-900 dark:text-neutral-50 placeholder-neutral-400 dark:placeholder-neutral-500 focus:outline-none focus:border-primary-500 focus:ring-0 transition-colors cursor-text'
                      placeholder={t('contact.placeholder.subject')}
                    />
                  </Tooltip.Trigger>
                  <Tooltip.Portal>
                    <Tooltip.Content
                      className='bg-neutral-200 dark:bg-neutral-800 text-neutral-900 dark:text-neutral-100 px-3 py-1.5 rounded-md text-sm font-medium shadow-lg z-50 border border-neutral-300 dark:border-neutral-700'
                      sideOffset={5}
                    >
                      {t('contact.tooltip.subject')}
                      <Tooltip.Arrow className='fill-neutral-200 dark:fill-neutral-800' />
                    </Tooltip.Content>
                  </Tooltip.Portal>
                </Tooltip.Root>
              </Tooltip.Provider>
            </div>

            <div>
              <Tooltip.Provider>
                <Tooltip.Root>
                  <Tooltip.Trigger asChild>
                    <label
                      htmlFor='message'
                      className='block text-sm font-medium text-neutral-700 dark:text-neutral-300 mb-2 cursor-help'
                    >
                      {t('contact.message')}
                    </label>
                  </Tooltip.Trigger>
                  <Tooltip.Portal>
                    <Tooltip.Content
                      className='bg-neutral-200 dark:bg-neutral-800 text-neutral-900 dark:text-neutral-100 px-3 py-1.5 rounded-md text-sm font-medium shadow-lg z-50 border border-neutral-300 dark:border-neutral-700'
                      sideOffset={5}
                    >
                      {t('contact.tooltip.message')}
                      <Tooltip.Arrow className='fill-neutral-200 dark:fill-neutral-800' />
                    </Tooltip.Content>
                  </Tooltip.Portal>
                </Tooltip.Root>
              </Tooltip.Provider>
              <Tooltip.Provider>
                <Tooltip.Root>
                  <Tooltip.Trigger asChild>
                    <textarea
                      name='message'
                      id='message'
                      rows={4}
                      className='w-full px-3 py-2 border-0 border-b border-neutral-300 dark:border-neutral-700 bg-transparent text-neutral-900 dark:text-neutral-50 placeholder-neutral-400 dark:placeholder-neutral-500 focus:outline-none focus:border-primary-500 focus:ring-0 transition-colors resize-none cursor-text'
                      placeholder={t('contact.placeholder.message')}
                    />
                  </Tooltip.Trigger>
                  <Tooltip.Portal>
                    <Tooltip.Content
                      className='bg-neutral-200 dark:bg-neutral-800 text-neutral-900 dark:text-neutral-100 px-3 py-1.5 rounded-md text-sm font-medium shadow-lg z-50 border border-neutral-300 dark:border-neutral-700'
                      sideOffset={5}
                    >
                      {t('contact.tooltip.message')}
                      <Tooltip.Arrow className='fill-neutral-200 dark:fill-neutral-800' />
                    </Tooltip.Content>
                  </Tooltip.Portal>
                </Tooltip.Root>
              </Tooltip.Provider>
            </div>

            <div className='flex justify-center'>
              <button
                type='submit'
                disabled={isSubmitting}
                className='send-message-button px-4 py-2 text-neutral-700 dark:text-neutral-300 rounded-lg font-medium hover:bg-neutral-300 dark:hover:bg-neutral-700 transition-colors duration-200 disabled:cursor-not-allowed'
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
