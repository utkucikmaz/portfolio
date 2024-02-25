import { useState, useRef } from 'react'
import ProjectCard from './ProjectCard'
import ProjectTag from './ProjectTag'
import { motion, useInView } from 'framer-motion'

const projectsData = [
  {
    id: 1,
    title: 'Memoria',
    description:
      'Social media web app to connect with loved ones. Create private groups, enjoy posts enhanced by OpenAI and make accessibility a priority with story narration.',
    image: '/src/assets/images/projects/1.png',
    tag: ['Web'],
    gitUrl: 'https://github.com/Drunk-Aunties/Memoria-client',
    previewUrl: 'https://memoriapp.netlify.app/',
  },
  {
    id: 2,
    title: 'PlantIQ',
    description:
      'Go-to website for intelligent plant care and identification. Harnesses the power of Image Recognition AI to recognize your plants and offers expert advice on their well-being through the responses of the GPT API.',
    image: '/src/assets/images/projects/2.png',
    tag: ['Web'],
    gitUrl: 'https://github.com/Drunk-Aunties/PlantIQ',
    previewUrl: 'https://plantiq.fly.dev/',
  },
  {
    id: 3,
    title: 'Hotel Middle Earth',
    description:
      'A game that is designed to challenge your decision-making skills, focus and reflexes while immersing you in the fantasy world of Middle Earth.',
    image: '/src/assets/images/projects/3.png',
    tag: ['Web'],
    gitUrl: 'https://github.com/utkucikmaz/Hotel-Middle-Earth',
    previewUrl: 'https://utkucikmaz.github.io/Hotel-Middle-Earth/',
  },
  {
    id: 4,
    title: 'React Movie App',
    description:
      "Structured the app with components for a clean and organized design. Created custom hooks for efficient data fetching. Centralized local state management using useReducer when it's suitable. Test the app with Cypress to ensure its functionality and reliability.",
    image: '/src/assets/images/projects/4.png',
    tag: ['Web'],
    gitUrl: 'https://github.com/utkucikmaz/React-Movie-App',
    previewUrl: 'https://utkucikmazmovieapp.vercel.app/',
  },
]

const ProjectsSection = () => {
  const [tag, setTag] = useState('Web')
  const ref = useRef(null)
  const isInView = useInView(ref, { once: true })

  const handleTagChange = (newTag) => {
    setTag(newTag)
  }

  const filteredProjects = projectsData.filter((project) =>
    project.tag.includes(tag)
  )

  const cardVariants = {
    initial: { y: 50, opacity: 0 },
    animate: { y: 0, opacity: 1 },
  }

  return (
    <section id='projects'>
      <h2 className='text-center text-4xl font-bold text-white mt-12 mb-8 md:mb-4 pt-24'>
        Projects
      </h2>
      <div className='text-white flex flex-row justify-center items-center gap-2 py-6'>
        <ProjectTag
          onClick={handleTagChange}
          name='Web'
          isSelected={tag === 'Web'}
        />
      </div>
      <ul ref={ref} className='grid md:grid-cols-2 gap-8 md:gap-12'>
        {filteredProjects.map((project, index) => (
          <motion.li
            key={index}
            variants={cardVariants}
            initial='initial'
            animate={isInView ? 'animate' : 'initial'}
            transition={{ duration: 0.3, delay: index * 0.4 }}
          >
            <ProjectCard
              key={project.id}
              title={project.title}
              description={project.description}
              imgUrl={project.image}
              gitUrl={project.gitUrl}
              previewUrl={project.previewUrl}
            />
          </motion.li>
        ))}
      </ul>
    </section>
  )
}

export default ProjectsSection
