import PropTypes from 'prop-types'

const ProjectTag = ({ name, onClick, isSelected }) => {
  const buttonStyles = isSelected
    ? 'text-white border-primary-500'
    : 'text-[#ADB7BE] border-slate-600 hover:border-white'
  return (
    <button
      className={`${buttonStyles} rounded-lg border-2 px-6 py-3 text-xl cursor-pointer`}
      onClick={() => onClick(name)}
    >
      {name}
    </button>
  )
}

ProjectTag.propTypes = {
  name: PropTypes.string.isRequired,
  onClick: PropTypes.func,
  isSelected: PropTypes.bool,
}

export default ProjectTag
