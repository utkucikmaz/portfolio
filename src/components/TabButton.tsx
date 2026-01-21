import { motion } from 'framer-motion'
import type { TabButtonProps } from '../types'

const TabButton = ({
  active,
  selectTab,
  children,
}: TabButtonProps): JSX.Element => {
  return (
    <button
      onClick={selectTab}
      className='relative px-4 py-2 text-sm font-medium transition-colors duration-200'
      aria-selected={active}
      role='tab'
    >
      <span
        className={`transition-colors duration-200 ${
          active
            ? 'text-primary-600 dark:text-primary-400'
            : 'text-neutral-500 dark:text-neutral-400 hover:text-neutral-700 dark:hover:text-neutral-300'
        }`}
      >
        {children}
      </span>
      {active && (
        <motion.div
          layoutId='activeTab'
          className='absolute bottom-0 left-0 right-0 h-0.5 bg-primary-600 dark:bg-primary-400'
          initial={false}
          transition={{ type: 'spring', stiffness: 500, damping: 30 }}
        />
      )}
    </button>
  )
}

export default TabButton
