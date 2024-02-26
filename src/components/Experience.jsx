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
          <h3 className='qualification__title text-xl'>
            Full Stack Web Development Bootcamp
          </h3>
          <span className='qualification__subtitle'>
            <img
              className='w-6 h-6 mr-2 inline-block'
              src='/svg/school.svg'
              alt='school Logo'
              width={35}
              height={35}
            />
            Ironhack
          </span>
          <br />
          <span className='qualification__calendar'>
            <img
              className='w-6 h-6 mr-2 inline-block'
              src='/svg/calendar.svg'
              alt='Calendar Logo'
              width={35}
              height={35}
            />
            2023
          </span>
          <div className='qualification__calendar'>
            <img
              className='w-6 h-6 mr-1 inline-block'
              src='/svg/location.svg'
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
          <h3 className='qualification__title text-xl'>
            Full Stack Web Development Bootcamp
          </h3>
          <span className='qualification__subtitle'>
            <img
              className='w-6 h-6 mr-2 inline-block'
              src='/svg/school.svg'
              alt='school Logo'
              width={35}
              height={35}
            />
            Digi-Homeschooling
          </span>
          <br />
          <span className='qualification__calendar'>
            <img
              className='w-6 h-6 mr-2 inline-block'
              src='/svg/calendar.svg'
              alt='calendar Logo'
              width={35}
              height={35}
            />
            2022
          </span>
          <div className='qualification__calendar'>
            <img
              className='w-6 h-6 mr-1 inline-block'
              src='/svg/location.svg'
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
          <h3 className='qualification__title text-xl'>
            Chinese Language and Literature
          </h3>
          <span className='qualification__subtitle'>
            <img
              className='w-6 h-6 mr-2 inline-block'
              src='/svg/school.svg'
              alt='school Logo'
              width={35}
              height={35}
            />
            Istanbul University
          </span>
          <br />
          <span className='qualification__calendar'>
            <img
              className='w-6 h-6 mr-2 inline-block'
              src='/svg/calendar.svg'
              alt='calendar Logo'
              width={35}
              height={35}
            />
            2016 - 2020
          </span>
          <div className='qualification__calendar'>
            <img
              className='w-6 h-6 mr-1 inline-block'
              src='/svg/location.svg'
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
          <h3 className='qualification__title text-xl'>Sociology</h3>
          <span className='qualification__subtitle'>
            <img
              className='w-6 h-6 mr-2 inline-block'
              src='/svg/school.svg'
              alt='school Logo'
              width={35}
              height={35}
            />
            Turkish Military Academy
          </span>
          <br />
          <span className='qualification__calendar'>
            <img
              className='w-6 h-6 mr-2 inline-block'
              src='/svg/calendar.svg'
              alt='calendar Logo'
              width={35}
              height={35}
            />
            2012 - 2015
          </span>
          <div className='qualification__calendar'>
            <img
              className='w-6 h-6 mr-1 inline-block'
              src='/svg/location.svg'
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
          <h3 className='qualification__title text-xl'>Front-End Developer</h3>
          <span className='qualification__subtitle'>
            <img
              className='w-6 h-6 mr-2 inline-block'
              src='/svg/company.svg'
              alt='company Logo'
              width={35}
              height={35}
            />
            Arbithub
          </span>
          <br />
          <span className='qualification__calendar'>
            <img
              className='w-6 h-6 mr-2 inline-block'
              src='/svg/calendar.svg'
              alt='calendar Logo'
              width={35}
              height={35}
            />
            01.2024 - Present
          </span>
          <div className='qualification__calendar'>
            <img
              className='w-6 h-6 mr-1 inline-block'
              src='/svg/location.svg'
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
          <h3 className='qualification__title text-xl'>
            Full Stack Developer Trainee
          </h3>
          <span className='qualification__subtitle'>
            <img
              className='w-6 h-6 mr-2 inline-block'
              src='/svg/company.svg'
              alt='company Logo'
              width={35}
              height={35}
            />
            LightUp Digital
          </span>
          <br />
          <span className='qualification__calendar'>
            <img
              className='w-6 h-6 mr-2 inline-block'
              src='/svg/calendar.svg'
              alt='calendar Logo'
              width={35}
              height={35}
            />
            10.2023 - 01.2024
          </span>
          <div className='qualification__calendar'>
            <img
              className='w-6 h-6 mr-1 inline-block'
              src='/svg/location.svg'
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
          <h3 className='qualification__title text-xl'>
            Integrated Operation Control Officer
          </h3>
          <span className='qualification__subtitle'>
            <img
              className='w-6 h-6 mr-2 inline-block'
              src='/svg/company.svg'
              alt='company Logo'
              width={35}
              height={35}
            />
            Turkish Airlines
          </span>
          <br />
          <span className='qualification__calendar'>
            <img
              className='w-6 h-6 mr-2 inline-block'
              src='/svg/calendar.svg'
              alt='calendar Logo'
              width={35}
              height={35}
            />
            03.2019 - 05.2020
          </span>
          <div className='qualification__calendar'>
            <img
              className='w-6 h-6 mr-1 inline-block'
              src='/svg/location.svg'
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
            className={` mr-12 flex  items-center cursor-pointer transition-all duration-100 ${
              toggleState === 1
                ? 'text-purple-500 text-2xl'
                : 'text-white-700 text-base opacity-50'
            }`}
            onClick={() => toggleTab(1)}
          >
            <img
              className='w-6 h-6 mr-2'
              src='/svg/laptop.svg'
              alt='laptop Logo'
              width={35}
              height={35}
            />
            Experience
          </div>
          <div
            className={`flex items-center cursor-pointer transition-all duration-100 ${
              toggleState === 2
                ? 'text-purple-500 text-2xl'
                : 'text-white-700 text-base opacity-50'
            }`}
            onClick={() => toggleTab(2)}
          >
            <img
              className='w-6 h-6 mr-2'
              src='/svg/graduation.svg'
              alt='graduation cap Logo'
              width={35}
              height={35}
            />
            Education
          </div>
        </div>

        <div>
          {toggleState === 1 ? experienceContent : null}
          {toggleState === 2 ? educationContent : null}
        </div>
      </div>
    </section>
  )
}

export default Experience
