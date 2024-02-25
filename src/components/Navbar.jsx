import { Link } from 'react-router-dom'
import { useState } from 'react'
import NavLink from './NavLink'
import { Bars3Icon, XMarkIcon } from '@heroicons/react/24/solid'

const navLinks = [
  {
    title: 'About',
    path: '#about',
  },
  {
    title: 'Journey',
    path: '#journey',
  },
  {
    title: 'Projects',
    path: '#projects',
  },
  {
    title: 'Contact',
    path: '#contact',
  },
]

const Navbar = () => {
  const [navbarOpen, setNavbarOpen] = useState(false)

  return (
    <nav className='fixed mx-auto border border-[#33353F] top-0 left-0 xl:px-8 right-0 z-10 bg-[#121212] bg-opacity-100 rounded-lg'>
      <div className='flex container lg:py-3 flex-wrap items-center justify-between mx-auto px-4 py-2'>
        <Link
          to={'/'}
          onClick={() => window.scrollTo({ top: 0, behavior: 'smooth' })}
          className='text-2xl md:text-4xl text-white font-semibold'
        >
          {/* LOGO IMAGE */}
          <img
            className='relative rounded-full transition duration-300 hover:ring-4 hover:ring-purple-500'
            src='/src/assets/images/navbar.gif'
            alt='Personal Logo'
            width={60}
            height={60}
          />
        </Link>
        <div className='mobile-menu block md:hidden'>
          {!navbarOpen ? (
            <button
              onClick={() => setNavbarOpen(true)}
              className='flex items-center px-3 py-2 border rounded border-slate-200 text-slate-200 hover:text-white hover:border-white'
            >
              <Bars3Icon className='h-5 w-5' />
            </button>
          ) : (
            <button
              onClick={() => setNavbarOpen(false)}
              className='flex items-center px-3 py-2 border rounded border-slate-200 text-slate-200 hover:text-white hover:border-white'
            >
              <XMarkIcon className='h-5 w-5' />
            </button>
          )}
        </div>
        <div
          className='menu hidden md:block md:w-auto cursor-pointer'
          id='navbar'
        >
          <ul className='flex p-4 md:p-0 md:flex-row md:space-x-8 mt-0'>
            {navLinks.map((link, index) => (
              <li key={index}>
                <NavLink
                  to={link.path}
                  title={link.title}
                  setNavbarOpen={setNavbarOpen}
                />
              </li>
            ))}
          </ul>
        </div>
      </div>
      {navbarOpen ? (
        <ul className='flex flex-col py-4 items-center mb-2'>
          {navLinks.map((link, index) => (
            <li key={index} className='mb-3'>
              <NavLink
                to={link.path}
                title={link.title}
                setNavbarOpen={setNavbarOpen}
              />
            </li>
          ))}
        </ul>
      ) : null}
    </nav>
  )
}

export default Navbar
