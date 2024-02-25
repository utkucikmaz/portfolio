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
    // Check if user has previously set a theme preference in local storage
    const savedTheme = localStorage.getItem('theme')

    // If user has a saved theme preference, use that
    if (savedTheme) {
      setIsDarkMode(savedTheme === 'dark')
    } else {
      // If not, set the initial theme based on your preference
      setIsDarkMode(true) // You can set it to false if you want light mode by default
    }
  }, [])

  useEffect(() => {
    // Apply the current theme to the whole app
    document.body.classList.toggle('dark-mode', isDarkMode)

    // Save the current theme preference to local storage
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
