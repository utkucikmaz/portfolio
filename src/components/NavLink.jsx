import PropTypes from 'prop-types'

const NavLink = ({ title, setNavbarOpen }) => {
  const handleLinkClick = (sectionId) => {
    const element = document.getElementById(sectionId)
    if (element) {
      element.scrollIntoView({ behavior: 'smooth' })
    }
    setNavbarOpen(false)
  }

  return (
    <a
      onClick={() => handleLinkClick(title.toLowerCase())}
      className='text-base md:text-base text-white font-medium hover:text-purple-500'
    >
      {title}
    </a>
  )
}

NavLink.propTypes = {
  to: PropTypes.string.isRequired,
  title: PropTypes.string.isRequired,
  setNavbarOpen: PropTypes.func,
}

export default NavLink
