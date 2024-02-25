const Footer = () => {
  const currentYear = new Date().getFullYear()
  return (
    <footer className='footer border border-t-[#33353F] border-l-transparent border-r-transparent text-white rounded-lg'>
      <div className='container py-6 flex justify-between'>
        <img
          className='relative rounded-full transition duration-300 hover:ring-4 hover:ring-purple-500 ml-24'
          src='/images/navbar.gif'
          alt='Personal Logo'
          width={60}
          height={60}
        />
        <p className='text-[#ADB7BE] text-xs pt-5'>
          &copy;{currentYear} All Rights Reserved.
        </p>
      </div>
    </footer>
  )
}

export default Footer
