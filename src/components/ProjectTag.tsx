import type { ProjectTagProps } from '../types'

const ProjectTag = ({
  name,
  onClick,
  isSelected,
}: ProjectTagProps): JSX.Element => {
  return (
    <button
      className={`px-4 py-2 rounded-lg text-sm font-medium transition-colors duration-200 ${
        isSelected
          ? 'bg-primary-600 text-white dark:bg-primary-500'
          : 'bg-neutral-100 dark:bg-neutral-800 text-neutral-700 dark:text-neutral-300 hover:bg-neutral-200 dark:hover:bg-neutral-700'
      }`}
      onClick={() => onClick(name)}
      aria-pressed={isSelected}
    >
      {name}
    </button>
  )
}

export default ProjectTag
