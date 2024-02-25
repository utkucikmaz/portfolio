import { TypeAnimation } from 'react-type-animation'
import { motion } from 'framer-motion'
import axios from 'axios'

const HeroSection = () => {
  const downloadCV = async () => {
    try {
      const response = await axios.get('/cv.pdf', { responseType: 'blob' })
      const blob = new Blob([response.data], { type: 'application/pdf' })
      const link = document.createElement('a')
      link.href = URL.createObjectURL(blob)
      link.download = 'Cv.pdf'
      link.click()
    } catch (error) {
      console.error('Error downloading CV:', error)
    }
  }

  return (
    <section className='lg:py-16'>
      <div className='grid grid-cols-1 sm:grid-cols-12 mt-20'>
        <motion.div
          initial={{ opacity: 0, scale: 0.5 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ duration: 0.5 }}
          className='col-span-8 place-self-center text-center sm:text-left justify-self-start'
        >
          <h1 className='text-white mb-4 text-4xl sm:text-5xl lg:text-8xl lg:leading-normal font-extrabold'>
            <span className='text-transparent bg-clip-text bg-gradient-to-r from-primary-400 to-secondary-600'>
              Hi, I&apos;m{' '}
            </span>
            <br></br>
            <TypeAnimation
              sequence={['Utku', 1000, 'Web Developer', 1000]}
              wrapper='span'
              speed={50}
              repeat={Infinity}
            />
          </h1>
          <div className='pl-2'>
            <img
              className='relative inline-block'
              src='/src/assets/svg/html.svg'
              alt='Html Logo'
              width={35}
              height={35}
            />
            <img
              className='relative inline-block pl-2'
              src='/src/assets/svg/css.svg'
              alt='CSS Logo'
              width={35}
              height={35}
            />
            <img
              className='relative inline-block pl-2'
              src='/src/assets/svg/bootstrap.svg'
              alt='bootstrap Logo'
              width={35}
              height={35}
            />
            <img
              className='relative inline-block pl-2'
              src='/src/assets/svg/tailwind.svg'
              alt='Tailwind Logo'
              width={35}
              height={35}
            />
            <img
              className='relative inline-block pl-2'
              src='/src/assets/svg/javascript.svg'
              alt='javascript Logo'
              width={35}
              height={35}
            />
            <img
              className='relative inline-block pl-2'
              src='/src/assets/svg/typescript.svg'
              alt='typescript Logo'
              width={35}
              height={35}
            />
            <img
              className='relative inline-block pl-2'
              src='/src/assets/svg/react.svg'
              alt='react Logo'
              width={35}
              height={35}
            />
            <img
              className='relative inline-block pl-2'
              src='/src/assets/svg/redux.svg'
              alt='redux Logo'
              width={35}
              height={35}
            />
            <img
              className='relative inline-block pl-2'
              src='/src/assets/svg/next.svg'
              alt='Next.js Logo'
              width={35}
              height={35}
            />
          </div>
          <br />
          <div className='pl-2'>
            <img
              className='relative inline-block pl-2'
              src='/src/assets/svg/nodejs.svg'
              alt='nodejs Logo'
              width={35}
              height={35}
            />
            <img
              className='relative inline-block pl-2'
              src='/src/assets/svg/expressjs.svg'
              alt='expressjs Logo'
              width={35}
              height={35}
            />
            <img
              className='relative inline-block pl-2'
              src='/src/assets/svg/nestjs.svg'
              alt='nestjs Logo'
              width={35}
              height={35}
            />
            <img
              className='relative inline-block pl-2'
              src='/src/assets/svg/mongodb.svg'
              alt='mongodb Logo'
              width={35}
              height={35}
            />
            <img
              className='relative inline-block pl-2'
              src='/src/assets/svg/postgresql.svg'
              alt='postgresql Logo'
              width={35}
              height={35}
            />
            <img
              className='relative inline-block pl-2'
              src='/src/assets/svg/git.svg'
              alt='git Logo'
              width={35}
              height={35}
            />
          </div>
          <br />
          <div>
            <button
              className='px-6 inline-block py-3 w-full sm:w-fit rounded-lg mr-4 bg-gradient-to-br from-primary-500 to-secondary-500 hover:bg-slate-200 text-white'
              onClick={() => {
                const contactElement = document.getElementById('contact')
                if (contactElement) {
                  contactElement.scrollIntoView({ behavior: 'smooth' })
                }
              }}
            >
              Hire Me
            </button>
            <button
              onClick={downloadCV}
              className='px-1 inline-block py-1 w-full sm:w-fit rounded-lg bg-gradient-to-br from-primary-500 to-secondary-500 hover:bg-slate-800 text-white mt-3'
            >
              <span className='block bg-[#121212] hover:bg-slate-800 rounded-lg px-5 py-2'>
                Download CV
              </span>
            </button>
          </div>
        </motion.div>
        <div className='home_img'></div>
      </div>
    </section>
  )
}

export default HeroSection
