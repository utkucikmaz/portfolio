import { useState, useRef } from 'react'
import emailjs from '@emailjs/browser'

const EmailSection = () => {
  const [emailSubmitted, setEmailSubmitted] = useState(false)
  const form = useRef()

  const sendEmail = (e) => {
    e.preventDefault()

    emailjs
      .sendForm('service_z11wfjn', 'template_cizd2xe', form.current, {
        publicKey: 'rdJkokg-CDSSZCUf3',
      })
      .then(
        () => {
          setEmailSubmitted(true)
          console.log('SUCCESS!')
        },
        (error) => {
          console.log('FAILED...', error.text)
        }
      )
    setTimeout(() => {
      setEmailSubmitted(false)
    }, 7000)
  }
  return (
    <section
      id='contact'
      className='grid md:grid-cols-2 my-12 md:my-12 py-24 gap-4 relative'
    >
      <div className='bg-[radial-gradient(ellipse_at_center,_var(--tw-gradient-stops))] from-primary-900 to-transparent rounded-full h-80 w-80 z-0 blur-lg absolute top-3/4 -left-4 transform -translate-x-1/2 -translate-1/2'></div>
      <div>
        <h5 className='text-xl font-bold text-white my-2'>
          Let&apos;s Connect
        </h5>
        <p className='text-[#ADB7BE] mb-4 max-w-md'>
          {' '}
          I&apos;m currently looking for new opportunities, my inbox is always
          open. Whether you have a question or just want to say hi, I&apos;ll
          try my best to get back to you!
        </p>
        <div className='socials flex flex-row gap-2'>
          <a
            href='https://github.com/utkucikmaz'
            target='_blank'
            rel='noopener noreferrer'
          >
            <img src='/src/assets/svg/github-icon.svg' alt='Github Icon' />
          </a>
          <a
            href='https://www.linkedin.com/in/utkucikmaz/'
            target='_blank'
            rel='noopener noreferrer'
          >
            <img src='/src/assets/svg/linkedin-icon.svg' alt='Linkedin Icon' />
          </a>
        </div>
      </div>
      <div>
        {emailSubmitted ? (
          <div>
            <p className='text-green-500 text-md mt-2 pl-10'>
              Email sent successfully!
            </p>
            <p className='text-white-500 text-lg mt-10 pl-10'>
              Thank you for reaching me out. I will get into touch with you
              shortly!
            </p>
          </div>
        ) : (
          <form className='flex flex-col' ref={form} onSubmit={sendEmail}>
            <div className='mb-4'>
              <label
                htmlFor='subject'
                className='text-white block text-sm mb-2 font-medium'
              >
                Your Name
              </label>
              <input
                name='name'
                type='text'
                id='name'
                required
                className='bg-[#18191E] border border-[#33353F] placeholder-[#9CA2A9] text-gray-100 text-sm rounded-lg block w-full p-2.5'
                placeholder='Jacob'
              />
            </div>
            <div className='mb-4'>
              <label
                htmlFor='email'
                className='text-white block mb-2 text-sm font-medium'
              >
                Your Email
              </label>
              <input
                name='email'
                type='email'
                id='email'
                required
                className='bg-[#18191E] border border-[#33353F] placeholder-[#9CA2A9] text-gray-100 text-sm rounded-lg block w-full p-2.5'
                placeholder='jacob@google.com'
              />
            </div>
            <div className='mb-4'>
              <label
                htmlFor='subject'
                className='text-white block text-sm mb-2 font-medium'
              >
                Subject
              </label>
              <input
                name='subject'
                type='text'
                id='subject'
                required
                className='bg-[#18191E] border border-[#33353F] placeholder-[#9CA2A9] text-gray-100 text-sm rounded-lg block w-full p-2.5'
                placeholder='Just saying hi'
              />
            </div>
            <div className='mb-6'>
              <label
                htmlFor='message'
                className='text-white block text-sm mb-2 font-medium'
              >
                Message
              </label>
              <textarea
                name='message'
                id='message'
                rows='3'
                className='bg-[#18191E] border border-[#33353F] placeholder-[#9CA2A9] text-gray-100 text-sm rounded-lg block w-full p-2.5'
                placeholder="Let's talk about..."
              />
            </div>
            <button
              type='submit'
              className='bg-primary-500 hover:bg-primary-600 text-white font-medium py-2.5 px-5 rounded-lg w-full'
            >
              Send Message
            </button>
          </form>
        )}
      </div>
    </section>
  )
}

export default EmailSection
