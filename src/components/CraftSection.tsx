import { useTransition, useState } from 'react'
import { useTranslation } from 'react-i18next'
import { trackEvent } from '../utils/rybbit'
import { motion } from 'framer-motion'
import {
  CodeBracketIcon,
  TrophyIcon,
  ChatBubbleLeftRightIcon,
} from '@heroicons/react/24/outline'

interface Skill {
  name: string
  icon: string
  category: string
}

interface Certification {
  name: string
  logo: string
  title: string
  duration: string
  year: string
}

interface TabData {
  titleKey: string
  id: string
  content: JSX.Element
}

const skills: Skill[] = [
  { name: 'Vue', icon: '/svg/vue.svg', category: 'Frontend' },
  { name: 'React', icon: '/svg/react.svg', category: 'Frontend' },
  { name: 'TypeScript', icon: '/svg/typescript.svg', category: 'Language' },
  { name: 'JavaScript', icon: '/svg/javascript.svg', category: 'Language' },
  { name: 'Python', icon: '/svg/python.svg', category: 'Language' },
  { name: 'Node.js', icon: '/svg/nodejs.svg', category: 'Backend' },
  { name: 'Next.js', icon: '/svg/next.svg', category: 'Frontend' },
  { name: 'NestJS', icon: '/svg/nestjs.svg', category: 'Backend' },
  {
    name: 'Django REST Framework',
    icon: '/svg/django.svg',
    category: 'Backend',
  },
  { name: 'Express', icon: '/svg/expressjs.svg', category: 'Backend' },
  { name: 'PostgreSQL', icon: '/svg/postgresql.svg', category: 'Database' },
  { name: 'MongoDB', icon: '/svg/mongodb.svg', category: 'Database' },
  { name: 'Redux', icon: '/svg/redux.svg', category: 'State Management' },
  { name: 'Tailwind CSS', icon: '/svg/tailwind.svg', category: 'Styling' },
  { name: 'Git', icon: '/svg/git.svg', category: 'Tools' },
]

const CraftSection = (): JSX.Element => {
  const { t } = useTranslation()
  const [tab, setTab] = useState<string>('skills')
  const [isPending, startTransition] = useTransition()

  const positions = [
    t('craft.positions.item1'),
    t('craft.positions.item2'),
    t('craft.positions.item3'),
  ]

  const certifications: Certification[] = [
    {
      name: t('craft.certifications.ironhack.name'),
      logo: t('craft.certifications.ironhack.logo'),
      title: t('craft.certifications.ironhack.title'),
      duration: t('craft.certifications.ironhack.duration'),
      year: t('craft.certifications.ironhack.year'),
    },
    {
      name: t('craft.certifications.digihome.name'),
      logo: t('craft.certifications.digihome.logo'),
      title: t('craft.certifications.digihome.title'),
      duration: t('craft.certifications.digihome.duration'),
      year: t('craft.certifications.digihome.year'),
    },
  ]

  const TAB_DATA: TabData[] = [
    {
      titleKey: 'craft.skills',
      id: 'skills',
      content: (
        <div className='grid grid-cols-2 sm:grid-cols-3 gap-4'>
          {skills.map((skill, index) => (
            <motion.div
              key={index}
              initial={{ opacity: 0, y: 10 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: index * 0.05 }}
              className={`flex items-center gap-3 p-3 rounded-lg bg-neutral-200 dark:bg-neutral-800 hover:bg-neutral-300 dark:hover:bg-neutral-700 transition-colors ${
                skill.name === 'Git' ? 'hidden md:flex' : ''
              }`}
            >
              <img
                src={skill.icon}
                alt={skill.name}
                className='w-6 h-6 flex-shrink-0'
                loading='lazy'
              />
              <span className='text-sm font-medium text-neutral-700 dark:text-neutral-300'>
                {skill.name}
              </span>
            </motion.div>
          ))}
        </div>
      ),
    },
    {
      titleKey: 'craft.certifications.title',
      id: 'certifications',
      content: (
        <div className='space-y-6'>
          {certifications.map((cert, index) => (
            <motion.div
              key={index}
              initial={{ opacity: 0, x: -20 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ delay: index * 0.1 }}
              className='flex items-start gap-4 p-4 rounded-lg bg-neutral-200 dark:bg-neutral-800 hover:bg-neutral-300 dark:hover:bg-neutral-700 transition-colors'
            >
              <img
                src={cert.logo}
                alt={cert.name}
                className='w-12 h-12 rounded-lg object-contain flex-shrink-0'
                loading='lazy'
              />
              <div className='flex-1'>
                <h4 className='font-semibold text-neutral-900 dark:text-neutral-50 mb-1'>
                  {cert.title}
                </h4>
                <p className='text-sm text-neutral-600 dark:text-neutral-400 mb-1'>
                  {cert.name}
                </p>
                <div className='flex items-center gap-4 text-xs text-neutral-500 dark:text-neutral-500'>
                  <span>{cert.duration}</span>
                  <span>•</span>
                  <span>{cert.year}</span>
                </div>
              </div>
            </motion.div>
          ))}
        </div>
      ),
    },
    {
      titleKey: 'craft.positions.title',
      id: 'positions',
      content: (
        <div className='space-y-4'>
          {positions.map((position, index) => (
            <motion.div
              key={index}
              initial={{ opacity: 0, x: -20 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ delay: index * 0.1 }}
              className='flex items-start gap-3 p-4 rounded-lg bg-neutral-200 dark:bg-neutral-800 hover:bg-neutral-300 dark:hover:bg-neutral-700 transition-colors'
            >
              <div className='w-2 h-2 bg-primary-600 dark:bg-primary-400 rounded-full mt-2 flex-shrink-0'></div>
              <p className='text-sm text-neutral-700 dark:text-neutral-300 leading-relaxed'>
                {position}
              </p>
            </motion.div>
          ))}
        </div>
      ),
    },
  ]

  const handleTabChange = (id: string): void => {
    startTransition(() => {
      setTab(id)
    })
  }

  return (
    <section id='craft'>
      <div className='text-center mb-12'>
        <h2 className='text-4xl lg:text-5xl font-bold text-neutral-900 dark:text-neutral-50 mb-4'>
          {t('craft.title')}
        </h2>
        <p className='text-neutral-600 dark:text-neutral-400 max-w-2xl mx-auto text-lg'>
          {t('craft.subtitle')}
        </p>
      </div>

      <div className='grid lg:grid-cols-2 gap-12 lg:gap-16 max-w-6xl mx-auto'>
        <motion.div
          initial={{ opacity: 0, x: -20 }}
          whileInView={{ opacity: 1, x: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6 }}
          className='space-y-6'
        >
          <div className='space-y-4 px-4 md:px-0 lg:pt-4 text-neutral-600 dark:text-neutral-400 leading-relaxed'>
            <p>{t('craft.description1')}</p>
            <p>{t('craft.description2')}</p>
            <p>{t('craft.description3')}</p>
          </div>
        </motion.div>

        <motion.div
          initial={{ opacity: 0, x: 20 }}
          whileInView={{ opacity: 1, x: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6 }}
          className='space-y-6'
        >
          <div className='pt-4'>
            <div className='flex flex-nowrap gap-3 mb-6 overflow-x-visible justify-center lg:justify-start'>
              <motion.button
                onClick={() => {
                  handleTabChange('skills')
                  trackEvent('craft_tab_click', { tab: 'skills' })
                }}
                layout
                className={`flex items-center justify-center gap-2 px-3 py-2 sm:px-6 sm:py-3 rounded-lg font-medium transition-colors whitespace-nowrap ${
                  tab === 'skills'
                    ? 'bg-primary-600 text-white dark:bg-primary-500'
                    : 'bg-neutral-200 dark:bg-neutral-800 text-neutral-700 dark:text-neutral-300 hover:bg-neutral-300 dark:hover:bg-neutral-700'
                }`}
                aria-pressed={tab === 'skills'}
              >
                <CodeBracketIcon className='w-5 h-5 flex-shrink-0' />
                <span className='hidden sm:inline'>{t('craft.skills')}</span>
                <motion.div
                  className='sm:hidden overflow-hidden'
                  initial={false}
                  animate={{
                    maxWidth: tab === 'skills' ? 120 : 0,
                    opacity: tab === 'skills' ? 1 : 0,
                  }}
                  transition={{ duration: 0.3, ease: [0.4, 0, 0.2, 1] }}
                >
                  <motion.span
                    animate={{
                      x: tab === 'skills' ? 0 : -8,
                    }}
                    transition={{ duration: 0.3, ease: [0.4, 0, 0.2, 1] }}
                    className='inline-block whitespace-nowrap'
                  >
                    {t('craft.skills')}
                  </motion.span>
                </motion.div>
              </motion.button>
              <motion.button
                onClick={() => {
                  handleTabChange('positions')
                  trackEvent('craft_tab_click', { tab: 'positions' })
                }}
                layout
                className={`flex items-center justify-center gap-2 px-3 py-2 sm:px-6 sm:py-3 rounded-lg font-medium transition-colors whitespace-nowrap ${
                  tab === 'positions'
                    ? 'bg-primary-600 text-white dark:bg-primary-500'
                    : 'bg-neutral-200 dark:bg-neutral-800 text-neutral-700 dark:text-neutral-300 hover:bg-neutral-300 dark:hover:bg-neutral-700'
                }`}
                aria-pressed={tab === 'positions'}
              >
                <ChatBubbleLeftRightIcon className='w-5 h-5 flex-shrink-0' />
                <span className='hidden sm:inline'>
                  {t('craft.positions.title')}
                </span>
                <motion.div
                  className='sm:hidden overflow-hidden'
                  initial={false}
                  animate={{
                    maxWidth: tab === 'positions' ? 150 : 0,
                    opacity: tab === 'positions' ? 1 : 0,
                  }}
                  transition={{ duration: 0.3, ease: [0.4, 0, 0.2, 1] }}
                >
                  <motion.span
                    animate={{
                      x: tab === 'positions' ? 0 : -8,
                    }}
                    transition={{ duration: 0.3, ease: [0.4, 0, 0.2, 1] }}
                    className='inline-block whitespace-nowrap'
                  >
                    {t('craft.positions.title')}
                  </motion.span>
                </motion.div>
              </motion.button>
              <motion.button
                onClick={() => {
                  handleTabChange('certifications')
                  trackEvent('craft_tab_click', { tab: 'certifications' })
                }}
                layout
                className={`flex items-center justify-center gap-2 px-3 py-2 sm:px-6 sm:py-3 rounded-lg font-medium transition-colors whitespace-nowrap ${
                  tab === 'certifications'
                    ? 'bg-primary-600 text-white dark:bg-primary-500'
                    : 'bg-neutral-200 dark:bg-neutral-800 text-neutral-700 dark:text-neutral-300 hover:bg-neutral-300 dark:hover:bg-neutral-700'
                }`}
                aria-pressed={tab === 'certifications'}
              >
                <TrophyIcon className='w-5 h-5 flex-shrink-0' />
                <span className='hidden sm:inline'>
                  {t('craft.certifications.title')}
                </span>
                <motion.div
                  className='sm:hidden overflow-hidden'
                  initial={false}
                  animate={{
                    maxWidth: tab === 'certifications' ? 150 : 0,
                    opacity: tab === 'certifications' ? 1 : 0,
                  }}
                  transition={{ duration: 0.3, ease: [0.4, 0, 0.2, 1] }}
                >
                  <motion.span
                    animate={{
                      x: tab === 'certifications' ? 0 : -8,
                    }}
                    transition={{ duration: 0.3, ease: [0.4, 0, 0.2, 1] }}
                    className='inline-block whitespace-nowrap'
                  >
                    {t('craft.certifications.title')}
                  </motion.span>
                </motion.div>
              </motion.button>
            </div>
            <div className='w-full h-px bg-neutral-200 dark:bg-neutral-800 mb-6'></div>
            <div className={`min-h-[450px] ${isPending ? 'opacity-50' : ''}`}>
              {TAB_DATA.find((t) => t.id === tab)?.content}
            </div>
          </div>
        </motion.div>
      </div>
    </section>
  )
}

export default CraftSection
