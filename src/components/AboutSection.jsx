import { useTransition, useState } from 'react'
import TabButton from './TabButton'

const TAB_DATA = [
  {
    title: 'Skills',
    id: 'skills',
    content: (
      <div className='flex'>
        <ul className='pl-4'>
          <li className='pb-1'>
            <img
              className='relative inline-block pr-2'
              src='/svg/tailwind.svg'
              alt='Tailwind Logo'
              width={35}
              height={35}
            />
            Tailwind
          </li>
          <li className='pb-1'>
            <img
              className='relative inline-block pr-2'
              src='/svg/javascript.svg'
              alt='javascript Logo'
              width={35}
              height={35}
            />
            JavaScript
          </li>
          <li className='pb-1'>
            <img
              className='relative inline-block pr-2'
              src='/svg/typescript.svg'
              alt='typescript Logo'
              width={35}
              height={35}
            />
            Typescript
          </li>
          <li className='pb-1'>
            <img
              className='relative inline-block pr-2'
              src='/svg/react.svg'
              alt='react Logo'
              width={35}
              height={35}
            />
            React
          </li>
          <li className='pb-1'>
            <img
              className='relative inline-block pr-2'
              src='/svg/next.svg'
              alt='Next.js Logo'
              width={35}
              height={35}
            />
            Next.js
          </li>
        </ul>
        <ul className='pl-14'>
          <li className='pb-1'>
            <img
              className='relative inline-block pr-2'
              src='/svg/nodejs.svg'
              alt='nodejs Logo'
              width={35}
              height={35}
            />
            Node.js
          </li>
          <li className='pb-1'>
            <img
              className='relative inline-block pr-2'
              src='/svg/expressjs.svg'
              alt='expressjs Logo'
              width={35}
              height={35}
            />
            Express
          </li>
          <li className='pb-1'>
            <img
              className='relative inline-block pr-2'
              src='/svg/postgresql.svg'
              alt='postgresql Logo'
              width={35}
              height={35}
            />
            PostgreSQL
          </li>
          <li className='pb-1'>
            <img
              className='relative inline-block pr-2'
              src='/svg/nestjs.svg'
              alt='nestjs Logo'
              width={35}
              height={35}
            />
            NestJS
          </li>
          <li className='pb-1'>
            <img
              className='relative inline-block pr-2'
              src='/svg/mongodb.svg'
              alt='mongodb Logo'
              width={35}
              height={35}
            />
            MongoDB
          </li>
        </ul>
        <ul className='pl-14'>
          <li className='pb-1'>
            <img
              className='relative inline-block pr-2'
              src='/svg/git.svg'
              alt='git Logo'
              width={35}
              height={35}
            />
            Git
          </li>
          <li className='pb-1'>
            <img
              className='relative inline-block pr-2'
              src='/svg/redux.svg'
              alt='redux Logo'
              width={35}
              height={35}
            />
            Redux
          </li>
          <li className='pb-1'>
            <img
              className='relative inline-block pr-2'
              src='/svg/html.svg'
              alt='Html Logo'
              width={35}
              height={35}
            />
            HTML
          </li>
          <li className='pb-1'>
            <img
              className='relative inline-block pr-2'
              src='/svg/css.svg'
              alt='CSS Logo'
              width={35}
              height={35}
            />
            CSS
          </li>
          <li className='pb-1'>
            <img
              className='relative inline-block pr-2'
              src='/svg/bootstrap.svg'
              alt='bootstrap Logo'
              width={35}
              height={35}
            />
            Bootstrap
          </li>
        </ul>
      </div>
    ),
  },
  {
    title: 'Certifications',
    id: 'certifications',
    content: (
      <div>
        <ul className='pl-2'>
          <li>
            <img
              className='relative inline-block pr-2'
              src='/logo/ironhack.png'
              alt='ironhack Logo'
              width={35}
              height={35}
            />
            Ironhack
          </li>
          <li className='pl-9'>Full Stack Web Development Bootcamp</li>
          <li className='pl-9'>400 Hours</li>
        </ul>
        <br />
        <ul className='pl-2'>
          <li>
            <img
              className='relative inline-block pr-2'
              src='/logo/digihome.png'
              alt='digihome Logo'
              width={35}
              height={35}
            />
            Digihome Schooling
          </li>
          <li className='pl-9'>Full Stack Web Development Bootcamp</li>
          <li className='pl-9'>400 Hours</li>
        </ul>
        <br />
      </div>
    ),
  },
]

const AboutSection = () => {
  const [tab, setTab] = useState('skills')

  const [isPending, startTransition] = useTransition()
  const [imagePosition, setImagePosition] = useState(0)

  const handleTabChange = (id) => {
    startTransition(() => {
      setTab(id)
      const newPosition = TAB_DATA.lastIndexOf((t) => t.id === id)
      setImagePosition(newPosition)
    })
  }

  return (
    <section className='text-white' id='about'>
      <div className='md:grid md:grid-cols-2 gap-8 mt-18 py-8 px-4 xl:gap-16 sm:py-16 xl:px-16'>
        <img
          className='relative rounded-lg mt-8 transition-transform duration-500 transition-move hover:ring-4 hover:ring-purple-500'
          id='about-image'
          src='/images/about.png'
          alt='Personal Image'
          width={450}
          height={450}
          style={{
            transitionProperty: 'transform',
            transform: `translateY(-${imagePosition * 1}%)`,
          }}
        />

        <div className='mt-4 md:mt-0 text-left flex flex-col h-full'>
          <h2 className='text-4xl font-bold text-white pt-4 pb-1 mt-3'>
            About Me
          </h2>
          <p className='text-base lg:text-lg'>
            I am a full stack web developer with a passion for creating
            interactive and responsive web applications. I have experience
            working with HTML, CSS, JavaScript, Typescript, React, Next.js,
            Redux, Node.js, Express, Nest.js, PostgreSQL, MongoDB and Git. I am
            a quick learner and I am always looking to expand my knowledge and
            skill set. I am a team player and I am excited to work with others
            to create amazing applications.
          </p>
          <div className='flex flex-row justify-between mt-8'>
            <TabButton
              selectTab={() => handleTabChange('skills')}
              active={tab === 'skills'}
            >
              {' '}
              Skills{' '}
            </TabButton>
            <TabButton
              selectTab={() => handleTabChange('certifications')}
              active={tab === 'certifications'}
            >
              {' '}
              Certifications{' '}
            </TabButton>
          </div>
          <div className={`mt-8 ${isPending ? 'opacity-50' : ''}`}>
            {TAB_DATA.find((t) => t.id === tab).content}
          </div>
        </div>
      </div>
    </section>
  )
}

export default AboutSection
