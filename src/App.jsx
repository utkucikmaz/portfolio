import HeroSection from './components/HeroSection'
import Navbar from './components/Navbar'
import AboutSection from './components/AboutSection'
import Experience from './components/Experience'
import ProjectsSection from './components/ProjectsSection'
import EmailSection from './components/EmailSection'
import Footer from './components/Footer'
import './App.css'

function App() {
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
