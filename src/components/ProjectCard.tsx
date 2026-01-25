import { useTranslation } from 'react-i18next'
import { trackEvent } from '../utils/rybbit'
import { motion } from 'framer-motion'
import { ArrowTopRightOnSquareIcon } from '@heroicons/react/24/outline'
import type { ProjectCardProps } from '../types'

const ProjectCard = ({
  title,
  description,
  gitUrl,
  previewUrl,
  isDarkMode = true,
}: ProjectCardProps & { isDarkMode?: boolean }): JSX.Element => {
  const { t } = useTranslation()
  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true }}
      transition={{ duration: 0.5 }}
      className='group relative gap-4 p-4 rounded-lg bg-neutral-200 dark:bg-neutral-800 hover:bg-neutral-300 dark:hover:bg-neutral-700 transition-colors'
    >
      <a
        href={previewUrl}
        target='_blank'
        rel='noopener noreferrer'
        onClick={() => {
          trackEvent('project_view_live_click', { title })
        }}
        className='block mb-2 hover:cursor-pointer'
        aria-label={t('accessibility.viewLive')}
      >
        <h3 className='peer text-lg font-semibold text-neutral-900 dark:text-neutral-50 hover:text-primary-600 dark:hover:text-primary-400 inline-flex items-start gap-1 transition-colors duration-200'>
          {title}
          <ArrowTopRightOnSquareIcon className='h-3 w-3 text-neutral-500 dark:text-neutral-400 opacity-0 group-hover:opacity-100 peer-hover:text-primary-600 dark:peer-hover:text-primary-400 transition-all duration-200' />
        </h3>
      </a>
      <p className='text-neutral-600 dark:text-neutral-400 text-sm leading-relaxed mb-12'>
        {description}
      </p>
      <a
        href={gitUrl}
        onClick={() => {
          trackEvent('project_view_code_click', { title })
        }}
        target='_blank'
        rel='noopener noreferrer'
        className='absolute bottom-4 left-4 flex items-center gap-2 px-4 py-2 bg-neutral-400 dark:bg-neutral-600 text-neutral-100 dark:text-neutral-100 hover:bg-primary-600 dark:hover:bg-primary-600 hover:text-white dark:hover:text-white transition-all rounded-md font-medium text-sm'
        aria-label={t('accessibility.viewCode')}
      >
        <img
          src='/svg/github-icon.svg'
          alt='GitHub'
          className='h-4 w-4 opacity-70'
          style={{
            filter: isDarkMode ? 'brightness(0) invert(1)' : 'invert',
          }}
          loading='lazy'
        />
        <span>GitHub</span>
      </a>
    </motion.div>
  )
}

export default ProjectCard
