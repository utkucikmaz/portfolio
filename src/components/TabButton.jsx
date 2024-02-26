import { motion } from 'framer-motion'
import PropTypes from 'prop-types'

const variants = {
  default: { width: 0 },
  active: { width: 'calc(100% - 0.75rem)' },
}

const TabButton = ({ active, selectTab, children }) => {
  const textStyles = {
    color: active ? '#9370DB' : 'rgba(255, 255, 255, 0.5)', // Purple when active, 50% opacity when not active
    fontSize: active ? '1.3rem' : '1rem', // Adjust font size based on the state
  }

  return (
    <button onClick={selectTab}>
      <p
        className={`mr-3 font-semibold transition-all duration-100 hover:text-purple-500`}
        style={textStyles}
      >
        {children}
      </p>
      <motion.div
        animate={active ? 'active' : 'default'}
        variants={variants}
        className='h-1 mt-2 mr-3'
      ></motion.div>
    </button>
  )
}

TabButton.propTypes = {
  children: PropTypes.arrayOf(PropTypes.string).isRequired,
  active: PropTypes.bool,
  selectTab: PropTypes.func,
}

export default TabButton
