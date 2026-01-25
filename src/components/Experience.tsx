import { memo, useCallback, useEffect, useMemo, useRef, useState } from 'react'
import { useTranslation } from 'react-i18next'
import { AnimatePresence, motion } from 'framer-motion'
import { trackEvent } from '../utils/rybbit'
import { BriefcaseIcon, AcademicCapIcon } from '@heroicons/react/24/outline'
import * as Tooltip from '@radix-ui/react-tooltip'

interface ExperienceItem {
  id?: string
  title: string
  company?: string
  institution?: string
  logo?: string
  location: string
  period: string
  duration?: string
  highlights?: string[]
  type: 'experience' | 'education'
}

interface TimelineItemProps {
  item: ExperienceItem
  index: number
  isLast: boolean
  type: 'experience' | 'education'
}

const TimelineItem = memo(
  ({ item, index, isLast, type }: TimelineItemProps): JSX.Element => {
    const { t } = useTranslation()
    const [isExpanded, setIsExpanded] = useState(false)
    const panelRef = useRef<HTMLDivElement | null>(null)
    const isLeft = index % 2 === 0
    const isExperience = type === 'experience'
    const hasHighlights = Boolean(item.highlights && item.highlights.length > 0)
    const toggleLabel = isExpanded
      ? t('journey.experiences.hideDetails', { defaultValue: 'Hide details' })
      : t('journey.experiences.showDetails', { defaultValue: 'View details' })

    useEffect(() => {
      if (!isExpanded) {
        return
      }

      const handleClick = (event: MouseEvent) => {
        const target = event.target as Node
        if (panelRef.current && !panelRef.current.contains(target)) {
          setIsExpanded(false)
        }
      }

      document.addEventListener('mousedown', handleClick)

      return () => {
        document.removeEventListener('mousedown', handleClick)
      }
    }, [isExpanded])

    return (
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true }}
        transition={{ delay: index * 0.1 }}
        className='relative flex items-center mb-3'
      >
        <div
          className={`w-full md:max-w-md ${
            isLeft ? 'md:mr-auto md:pr-3' : 'md:ml-auto md:pl-3'
          }`}
        >
          <div ref={panelRef} className='relative'>
            <motion.div
              className='gap-4 p-4 rounded-lg bg-neutral-200 dark:bg-neutral-800 hover:bg-neutral-300 dark:hover:bg-neutral-700 transition-colors text-left cursor-pointer'
              onClick={(e) => {
                if (!(e.target as Element).closest('button[aria-expanded]')) {
                  setIsExpanded(false)
                }
              }}
            >
              <h3 className='flex flex-col gap-1 sm:flex-row sm:items-start sm:justify-between sm:gap-3 text-lg font-semibold text-neutral-900 dark:text-neutral-50 mb-2'>
                <span>{item.title}</span>
                {isExperience ? (
                  <span className='text-sm font-medium text-left sm:text-right text-neutral-600 dark:text-neutral-400'>
                    {item.company}
                  </span>
                ) : item.logo ? (
                  <>
                    <span className='text-sm font-medium text-left sm:text-right text-neutral-600 dark:text-neutral-400 md:hidden'>
                      {item.institution}
                    </span>
                    <Tooltip.Provider>
                      <Tooltip.Root>
                        <Tooltip.Trigger asChild>
                          <img
                            src={item.logo}
                            alt={item.institution}
                            className='hidden md:block h-8 w-auto object-contain max-w-[120px] sm:max-w-[150px] cursor-help'
                          />
                        </Tooltip.Trigger>
                        <Tooltip.Portal>
                          <Tooltip.Content
                            className='bg-neutral-200 dark:bg-neutral-800 text-neutral-900 dark:text-neutral-100 px-3 py-1.5 rounded-md text-sm font-medium shadow-lg z-50 border border-neutral-300 dark:border-neutral-700'
                            sideOffset={5}
                          >
                            {item.institution}
                            <Tooltip.Arrow className='fill-neutral-200 dark:fill-neutral-800' />
                          </Tooltip.Content>
                        </Tooltip.Portal>
                      </Tooltip.Root>
                    </Tooltip.Provider>
                  </>
                ) : (
                  <span className='text-sm font-medium text-left sm:text-right text-neutral-600 dark:text-neutral-400'>
                    {item.institution}
                  </span>
                )}
              </h3>
              <div className='flex flex-col gap-1 text-xs text-neutral-600 dark:text-neutral-400 pt-2'>
                <div className='flex flex-col gap-1 sm:flex-row sm:items-center'>
                  <span className='flex items-center gap-1'>
                    <svg
                      className='w-4 h-4 flex-shrink-0'
                      fill='none'
                      stroke='currentColor'
                      viewBox='0 0 24 24'
                    >
                      <path
                        strokeLinecap='round'
                        strokeLinejoin='round'
                        strokeWidth={2}
                        d='M8 7V3m8 4V3m-9 8h10M5 21h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v12a2 2 0 002 2z'
                      />
                    </svg>
                    <span>{item.period}</span>
                  </span>
                  <span className='hidden sm:inline mx-2'>•</span>
                  <span className='flex items-center gap-1'>
                    <svg
                      className='w-4 h-4 flex-shrink-0'
                      fill='none'
                      stroke='currentColor'
                      viewBox='0 0 24 24'
                    >
                      <path
                        strokeLinecap='round'
                        strokeLinejoin='round'
                        strokeWidth={2}
                        d='M17.657 16.657L13.414 20.9a1.998 1.998 0 01-2.827 0l-4.244-4.243a8 8 0 1111.314 0z'
                      />
                      <path
                        strokeLinecap='round'
                        strokeLinejoin='round'
                        strokeWidth={2}
                        d='M15 11a3 3 0 11-6 0 3 3 0 016 0z'
                      />
                    </svg>
                    <span>{item.location}</span>
                  </span>
                </div>
                {item.duration && (
                  <span className='text-neutral-500 dark:text-neutral-500'>
                    {item.duration}
                  </span>
                )}
              </div>
              {hasHighlights && (
                <button
                  type='button'
                  onClick={() => {
                    const next = !isExpanded
                    setIsExpanded(next)
                    trackEvent(
                      next
                        ? 'experience_item_expand'
                        : 'experience_item_collapse',
                      {
                        id: item.id ?? index,
                        title: item.title,
                        type,
                      }
                    )
                  }}
                  aria-expanded={isExpanded}
                  className='mt-3 inline-flex items-center gap-2 text-md font-semibold text-primary-600 dark:text-primary-400 hover:text-primary-700 dark:hover:text-primary-300 transition-colors'
                >
                  {toggleLabel}
                  <span
                    className={`transition-transform ${
                      isExpanded ? 'rotate-180' : 'rotate-0'
                    }`}
                  >
                    ▾
                  </span>
                </button>
              )}
              <AnimatePresence initial={false}>
                {hasHighlights && isExpanded && (
                  <motion.div
                    initial={{ opacity: 0, y: 8 }}
                    animate={{ opacity: 1, y: 0 }}
                    exit={{ opacity: 0, y: 8 }}
                    transition={{ duration: 0.2, ease: 'easeOut' }}
                    className='absolute left-0 right-0 top-full mt-2 z-20'
                  >
                    <div className='p-4 rounded-lg bg-neutral-100 dark:bg-neutral-900 border border-neutral-200 dark:border-neutral-700 shadow-lg'>
                      <ul className='space-y-2 text-sm text-neutral-600 dark:text-neutral-400 list-disc pl-5'>
                        {item.highlights?.map((highlight, highlightIndex) => (
                          <li key={`${item.title}-${highlightIndex}`}>
                            {highlight}
                          </li>
                        ))}
                      </ul>
                    </div>
                  </motion.div>
                )}
              </AnimatePresence>
            </motion.div>
          </div>
        </div>

        <div className='hidden lg:flex absolute left-1/2 transform -translate-x-1/2 flex-col items-center'>
          <div className='w-4 h-4 bg-primary-600 dark:bg-primary-400 rounded-full border-4 border-white dark:border-neutral-900 z-10'></div>
          {!isLast && (
            <div className='w-0.5 h-8 bg-neutral-300 dark:bg-neutral-600 mt-2'></div>
          )}
        </div>
      </motion.div>
    )
  },
  (prevProps, nextProps) =>
    prevProps.item === nextProps.item &&
    prevProps.index === nextProps.index &&
    prevProps.isLast === nextProps.isLast &&
    prevProps.type === nextProps.type
)

TimelineItem.displayName = 'TimelineItem'

const Experience = (): JSX.Element => {
  const { t } = useTranslation()

  const getHighlights = useCallback(
    (key: string): string[] => {
      const value = t(key, { returnObjects: true }) as unknown
      if (!Array.isArray(value)) {
        return []
      }

      return value.filter((item): item is string => typeof item === 'string')
    },
    [t]
  )

  const experiences: ExperienceItem[] = useMemo(
    () => [
      {
        id: 'ailon',
        title: t('journey.experiences.ailon.title'),
        company: t('journey.experiences.ailon.company'),
        location: t('journey.experiences.ailon.location'),
        period: t('journey.experiences.ailon.period'),
        highlights: getHighlights('journey.experiences.ailon.highlights'),
        type: 'experience',
      },
      {
        id: 'arbithub',
        title: t('journey.experiences.arbithub.title'),
        company: t('journey.experiences.arbithub.company'),
        location: t('journey.experiences.arbithub.location'),
        period: t('journey.experiences.arbithub.period'),
        highlights: getHighlights('journey.experiences.arbithub.highlights'),
        type: 'experience',
      },
      {
        id: 'lightup',
        title: t('journey.experiences.lightup.title'),
        company: t('journey.experiences.lightup.company'),
        location: t('journey.experiences.lightup.location'),
        period: t('journey.experiences.lightup.period'),
        highlights: getHighlights('journey.experiences.lightup.highlights'),
        type: 'experience',
      },
      {
        id: 'turkishairlines',
        title: t('journey.experiences.turkishairlines.title'),
        company: t('journey.experiences.turkishairlines.company'),
        location: t('journey.experiences.turkishairlines.location'),
        period: t('journey.experiences.turkishairlines.period'),
        highlights: getHighlights(
          'journey.experiences.turkishairlines.highlights'
        ),
        type: 'experience',
      },
    ],
    [getHighlights, t]
  )

  const educations: ExperienceItem[] = useMemo(
    () => [
      {
        title: t('journey.educations.ironhack.title'),
        institution: t('journey.educations.ironhack.institution'),
        logo: '/logo/ironhack.png',
        location: t('journey.educations.ironhack.location'),
        period: t('journey.educations.ironhack.period'),
        type: 'education',
      },
      {
        title: t('journey.educations.digihomeschooling.title'),
        institution: t('journey.educations.digihomeschooling.institution'),
        logo: '/logo/digihome.png',
        location: t('journey.educations.digihomeschooling.location'),
        period: t('journey.educations.digihomeschooling.period'),
        type: 'education',
      },
      {
        title: t('journey.educations.istanbuluni.title'),
        institution: t('journey.educations.istanbuluni.institution'),
        logo: '/logo/Istanbul.png',
        location: t('journey.educations.istanbuluni.location'),
        period: t('journey.educations.istanbuluni.period'),
        type: 'education',
      },
      {
        title: t('journey.educations.turkishmilitary.title'),
        institution: t('journey.educations.turkishmilitary.institution'),
        logo: '/logo/msu.png',
        location: t('journey.educations.turkishmilitary.location'),
        period: t('journey.educations.turkishmilitary.period'),
        type: 'education',
      },
    ],
    [t]
  )

  const [activeTab, setActiveTab] = useState<'experience' | 'education'>(
    'experience'
  )

  return (
    <section id='journey'>
      <div className='max-w-6xl mx-auto px-4 sm:px-6 lg:px-8'>
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          className='text-center mb-12'
        >
          <h2 className='text-4xl lg:text-5xl font-bold text-neutral-900 dark:text-neutral-50 mb-4'>
            {t('journey.title')}
          </h2>
          <p className='text-neutral-600 dark:text-neutral-400'>
            {t('journey.subtitle')}
          </p>
        </motion.div>

        <div className='flex justify-center gap-4 mb-12'>
          <button
            onClick={() => setActiveTab('experience')}
            className={`flex items-center gap-4 p-4 rounded-lg font-medium transition-colors ${
              activeTab === 'experience'
                ? 'bg-primary-600 text-white dark:bg-primary-500'
                : 'bg-neutral-200 dark:bg-neutral-800 hover:bg-neutral-300 dark:hover:bg-neutral-700 text-neutral-700 dark:text-neutral-300'
            }`}
            aria-pressed={activeTab === 'experience'}
          >
            <BriefcaseIcon className='w-5 h-5' />
            {t('journey.experience')}
          </button>
          <button
            onClick={() => setActiveTab('education')}
            className={`flex items-center gap-4 p-4 rounded-lg font-medium transition-colors ${
              activeTab === 'education'
                ? 'bg-primary-600 text-white dark:bg-primary-500'
                : 'bg-neutral-200 dark:bg-neutral-800 hover:bg-neutral-300 dark:hover:bg-neutral-700 text-neutral-700 dark:text-neutral-300'
            }`}
            aria-pressed={activeTab === 'education'}
          >
            <AcademicCapIcon className='w-5 h-5' />
            {t('journey.education')}
          </button>
        </div>

        <div className='relative'>
          {activeTab === 'experience' ? (
            <div className='timeline-container'>
              {experiences.map((item, index) => (
                <TimelineItem
                  key={item.id ?? index}
                  item={item}
                  index={index}
                  isLast={index === experiences.length - 1}
                  type='experience'
                />
              ))}
            </div>
          ) : (
            <div className='timeline-container'>
              {educations.map((item, index) => (
                <TimelineItem
                  key={index}
                  item={item}
                  index={index}
                  isLast={index === educations.length - 1}
                  type='education'
                />
              ))}
            </div>
          )}
        </div>
      </div>
    </section>
  )
}

export default Experience
