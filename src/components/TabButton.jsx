import { motion } from 'framer-motion'
import PropTypes from 'prop-types'

const variants = {
  default: { width: 0 },
  active: { width: 'calc(100% - 0.75rem)' },
}

const TabButton = ({ active, selectTab, children }) => {
  const buttonClasses = active ? 'text-blue' : 'text-[#ADB7BE]'

  return (
    <button onClick={selectTab}>
      <p className={`mr-3 font-semibold hover:text-white ${buttonClasses}`}>
        {children}
      </p>
      <motion.div
        animate={active ? 'active' : 'default'}
        variants={variants}
        className='h-1 bg-primary-500 mt-2 mr-3'
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
