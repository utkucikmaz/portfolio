import { useEffect, useState } from 'react'
import HeroSection from './components/HeroSection'
import Navbar from './components/Navbar'
import AboutSection from './components/AboutSection'
import Experience from './components/Experience'
import ProjectsSection from './components/ProjectsSection'
import EmailSection from './components/EmailSection'
import Footer from './components/Footer'
import './App.css'

function App() {
  const [isDarkMode, setIsDarkMode] = useState(false)

  useEffect(() => {
    const savedTheme = localStorage.getItem('theme')
    if (savedTheme) {
      setIsDarkMode(savedTheme === 'dark')
    } else {
      setIsDarkMode(true)
    }
  }, [])

  useEffect(() => {
    document.body.classList.toggle('dark-mode', isDarkMode)

    localStorage.setItem('theme', isDarkMode ? 'dark' : 'light')
  }, [isDarkMode])

  return (
    <>
      <Navbar />
      <div className='container mt-24 mx-auto px-12 py-4'>
        <HeroSection />
        <AboutSection />
        <Experience />
        <ProjectsSection />
        <EmailSection />
      </div>
      <Footer />
    </>
  )
}

export default App
