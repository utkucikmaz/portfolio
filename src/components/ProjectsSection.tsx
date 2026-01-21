import { useTranslation } from 'react-i18next'
import ProjectCard from './ProjectCard'
import type { ProjectData } from '../types'

const ProjectsSection = ({
  isDarkMode,
}: { isDarkMode?: boolean } = {}): JSX.Element => {
  const { t } = useTranslation()

  const projectsData: ProjectData[] = [
    {
      id: 1,
      title: 'Memoria',
      description: t('projects.memoria.description'),
      gitUrl: 'https://github.com/Drunk-Aunties/Memoria-client',
      previewUrl: 'https://memoriapp.netlify.app/',
    },
    {
      id: 2,
      title: 'PlantIQ',
      description: t('projects.plantiq.description'),
      gitUrl: 'https://github.com/Drunk-Aunties/PlantIQ',
      previewUrl: 'https://plantiq.fly.dev/',
    },
    {
      id: 3,
      title: 'Hotel Middle Earth',
      description: t('projects.hotelmiddleearth.description'),
      gitUrl: 'https://github.com/utkucikmaz/Hotel-Middle-Earth',
      previewUrl: 'https://utkucikmaz.github.io/Hotel-Middle-Earth/',
    },
    {
      id: 4,
      title: 'React Movie App',
      description: t('projects.reactmovieapp.description'),
      gitUrl: 'https://github.com/utkucikmaz/React-Movie-App',
      previewUrl: 'https://utkucikmazmovieapp.vercel.app/',
    },
  ]

  return (
    <section id='projects' className='lg:mb-20'>
      <div className='text-center mb-16'>
        <h2 className='text-4xl lg:text-5xl font-bold text-neutral-900 dark:text-neutral-50 mb-4'>
          {t('projects.title')}
        </h2>
        <p className='text-neutral-600 dark:text-neutral-400 max-w-2xl mx-auto text-lg'>
          {t('projects.subtitle')}
        </p>
      </div>

      <div className='grid md:grid-cols-2 lg:grid-cols-2 gap-8 max-w-5xl mx-auto'>
        {projectsData.map((project) => (
          <ProjectCard
            key={project.id}
            title={project.title}
            description={project.description}
            gitUrl={project.gitUrl}
            previewUrl={project.previewUrl}
            isDarkMode={isDarkMode}
          />
        ))}
      </div>
    </section>
  )
}

export default ProjectsSection
