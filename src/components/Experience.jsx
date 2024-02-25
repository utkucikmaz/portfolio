import { useState } from 'react'

const Experience = () => {
  const [toggleState, setToggleState] = useState(1)

  const toggleTab = (index) => {
    setToggleState(index)
  }

  const educationContent = (
    <div>
      <div className='qualification__data'>
        <div>
          <h3 className='qualification__title'>
            Full Stack Web Development Bootcamp
          </h3>
          <span className='qualification__subtitle'>Ironhack</span>
          <br />
          <span className='qualification__calendar'>
            <img
              className='w-6 h-6 mr-2 inline-block'
              src='/src/assets/svg/calendar.svg'
              alt='Tailwind Logo'
              width={35}
              height={35}
            />
            2023
          </span>
          <div>
            <img
              className='w-6 h-6 mr-1 inline-block'
              src='/src/assets/svg/location.svg'
              alt='location Logo'
              width={35}
              height={35}
            />{' '}
            Remote
          </div>
        </div>
        <div>
          <span className='qualification__rounder'></span>
          <span className='qualification__line'></span>
        </div>
      </div>
      <div className='qualification__data'>
        <div></div>
        <div>
          <span className='qualification__rounder'></span>
          <span className='qualification__line'></span>
        </div>
        <div>
          <h3 className='qualification__title'>
            Full Stack Web Development Bootcamp
          </h3>
          <span className='qualification__subtitle'>Digi-Homeschooling</span>
          <br />
          <span className='qualification__calendar'>
            <img
              className='w-6 h-6 mr-2 inline-block'
              src='/src/assets/svg/calendar.svg'
              alt='Tailwind Logo'
              width={35}
              height={35}
            />
            2022
          </span>
          <div>
            <img
              className='w-6 h-6 mr-1 inline-block'
              src='/src/assets/svg/location.svg'
              alt='location Logo'
              width={35}
              height={35}
            />{' '}
            Remote
          </div>
        </div>
      </div>
      <div className='qualification__data'>
        <div>
          <h3 className='qualification__title'>
            Chinese Language and Literature
          </h3>
          <span className='qualification__subtitle'>Istanbul University</span>
          <br />
          <span className='qualification__calendar'>
            <img
              className='w-6 h-6 mr-2 inline-block'
              src='/src/assets/svg/calendar.svg'
              alt='Tailwind Logo'
              width={35}
              height={35}
            />
            2016 - 2020
          </span>
          <div>
            <img
              className='w-6 h-6 mr-1 inline-block'
              src='/src/assets/svg/location.svg'
              alt='location Logo'
              width={35}
              height={35}
            />{' '}
            Istanbul
          </div>
        </div>
        <div>
          <span className='qualification__rounder'></span>
          <span className='qualification__line'></span>
        </div>
      </div>
      <div className='qualification__data'>
        <div></div>
        <div>
          <span className='qualification__rounder'></span>
          <span className='qualification__line'></span>
        </div>
        <div>
          <h3 className='qualification__title'>Sociology</h3>
          <span className='qualification__subtitle'>
            Turkish Military Academy
          </span>
          <br />
          <span className='qualification__calendar'>
            <img
              className='w-6 h-6 mr-2 inline-block'
              src='/src/assets/svg/calendar.svg'
              alt='Tailwind Logo'
              width={35}
              height={35}
            />
            2012 - 2015
          </span>
          <div>
            <img
              className='w-6 h-6 mr-1 inline-block'
              src='/src/assets/svg/location.svg'
              alt='location Logo'
              width={35}
              height={35}
            />{' '}
            Ankara
          </div>
        </div>
      </div>
    </div>
  )

  const experienceContent = (
    <div>
      <div className='qualification__data'>
        <div>
          <h3 className='qualification__title'>Front-End Developer</h3>
          <span className='qualification__subtitle'>Arbithub</span>
          <br />
          <span className='qualification__calendar'>
            <img
              className='w-6 h-6 mr-2 inline-block'
              src='/src/assets/svg/calendar.svg'
              alt='Tailwind Logo'
              width={35}
              height={35}
            />
            01.2024 - Present
          </span>
          <div>
            <img
              className='w-6 h-6 mr-1 inline-block'
              src='/src/assets/svg/location.svg'
              alt='location Logo'
              width={35}
              height={35}
            />{' '}
            Chicago, USA (Remote)
          </div>
        </div>
        <div>
          <span className='qualification__rounder'></span>
          <span className='qualification__line'></span>
        </div>
      </div>
      <div className='qualification__data'>
        <div></div>
        <div>
          <span className='qualification__rounder'></span>
          <span className='qualification__line'></span>
        </div>
        <div>
          <h3 className='qualification__title'>Full Stack Developer Trainee</h3>
          <span className='qualification__subtitle'>LightUp Digital</span>
          <br />
          <span className='qualification__calendar'>
            <img
              className='w-6 h-6 mr-2 inline-block'
              src='/src/assets/svg/calendar.svg'
              alt='Tailwind Logo'
              width={35}
              height={35}
            />
            10.2023 - 01.2024
          </span>
          <div>
            <img
              className='w-6 h-6 mr-1 inline-block'
              src='/src/assets/svg/location.svg'
              alt='location Logo'
              width={35}
              height={35}
            />{' '}
            Berlin
          </div>
        </div>
      </div>
      <div className='qualification__data'>
        <div>
          <h3 className='qualification__title'>
            Integrated Operation Control Officer
          </h3>
          <span className='qualification__subtitle'>Turkish Airlines</span>
          <br />
          <span className='qualification__calendar'>
            <img
              className='w-6 h-6 mr-2 inline-block'
              src='/src/assets/svg/calendar.svg'
              alt='Tailwind Logo'
              width={35}
              height={35}
            />
            03.2019 - 05.2020
          </span>
          <div>
            <img
              className='w-6 h-6 mr-1 inline-block'
              src='/src/assets/svg/location.svg'
              alt='location Logo'
              width={35}
              height={35}
            />{' '}
            Istanbul
          </div>
        </div>
        <div>
          <span className='qualification__rounder'></span>
          <span className='qualification__line'></span>
        </div>
      </div>
    </div>
  )

  return (
    <section className='section px-4 mb-20' id='journey'>
      <div className='grid justify-items-center items-center'>
        <h2 className='text-center text-4xl font-bold text-white mt-12 mb-8 md:mb-4 pt-24'>
          Journey
        </h2>

        <div className='flex justify-center mb-12 mt-10'>
          <div
            className={` mr-12 flex  items-center cursor-pointer ${
              toggleState === 2
                ? 'text-purple-500 text-2xl'
                : 'text-white-700 text-base'
            }`}
            onClick={() => toggleTab(2)}
          >
            <img
              className='w-6 h-6 mr-2'
              src='/src/assets/svg/laptop.svg'
              alt='Tailwind Logo'
              width={35}
              height={35}
            />
            Experience
          </div>
          <div
            className={`flex items-center cursor-pointer ${
              toggleState === 1
                ? 'text-purple-500 text-2xl'
                : 'text-white-700 text-base'
            }`}
            onClick={() => toggleTab(1)}
          >
            <img
              className='w-6 h-6 mr-2'
              src='/src/assets/svg/graduation.svg'
              alt='Tailwind Logo'
              width={35}
              height={35}
            />
            Education
          </div>
        </div>

        <div>
          {toggleState === 1 ? educationContent : null}
          {toggleState === 2 ? experienceContent : null}
        </div>
      </div>
    </section>
  )
}

export default Experience
