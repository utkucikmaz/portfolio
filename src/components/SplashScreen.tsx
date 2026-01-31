import { motion } from 'framer-motion'

interface SplashScreenProps {
  isVisible: boolean
  isDarkMode: boolean
}

export default function SplashScreen({
  isVisible,
  isDarkMode,
}: SplashScreenProps): JSX.Element | null {
  if (!isVisible) return null

  return (
    <motion.div
      initial={{ opacity: 1 }}
      exit={{ opacity: 0 }}
      transition={{ duration: 0.5 }}
      className='fixed inset-0 z-[9999] flex items-center justify-center'
      style={{
        backgroundColor: isDarkMode
          ? 'rgba(10, 10, 10, 1)'
          : 'rgba(255, 255, 255, 1)',
      }}
    >
      <div className='relative w-full h-full flex flex-col items-center justify-center'>
        {/* logo Image */}
        <motion.img
          src='/images/logo.png'
          alt='logo'
          className='w-32 h-32 sm:w-40 sm:h-40 md:w-48 md:h-48 z-10'
          initial={{ scale: 0.8, opacity: 0 }}
          animate={{ scale: 1, opacity: 1 }}
          transition={{
            duration: 0.6,
            ease: 'easeOut',
          }}
        />

        {/* Text under the logo */}
        <motion.div
          className='mt-6 text-center'
          initial={{ y: 20, opacity: 0 }}
          animate={{ y: 0, opacity: 1 }}
          transition={{
            duration: 0.8,
            delay: 0.3,
            ease: 'easeOut',
          }}
        >
          <motion.div
            className='text-2xl sm:text-3xl md:text-4xl lg:text-5xl font-thin'
            style={{
              color: isDarkMode ? '#f5f5f5' : '#1a1a1a',
              textShadow: isDarkMode
                ? '0 2px 8px rgba(0, 0, 0, 0.4)'
                : '0 2px 8px rgba(0, 0, 0, 0.15)',
              lineHeight: '1',
              letterSpacing: '0.075em',
            }}
            initial='hidden'
            animate='visible'
            variants={{
              visible: {
                transition: {
                  staggerChildren: 0.125,
                  delayChildren: 0.125,
                },
              },
            }}
          >
            {'utkucikmaz'.split('').map((char, index) => (
              <motion.span
                key={index}
                variants={{
                  hidden: { opacity: 0, y: 5, scale: 0.95 },
                  visible: {
                    opacity: 1,
                    y: 0,
                    scale: 1,
                    transition: {
                      duration: 0.5,
                      ease: [0.4, 0, 0.2, 1],
                    },
                  },
                }}
                style={{ display: 'inline-block' }}
              >
                {char === ' ' ? '\u00A0' : char}
              </motion.span>
            ))}
          </motion.div>
        </motion.div>
      </div>
    </motion.div>
  )
}
