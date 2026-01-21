import { useMemo } from 'react'

interface ThemeCelestialProps {
  isDarkMode: boolean
}

function Star({
  x,
  y,
  size,
  delay,
  type,
  opacity,
}: {
  x: string
  y: string
  size: number
  delay: number
  type: number
  opacity: number
}) {
  switch (type) {
    case 0:
      // Simple white circle
      return (
        <circle
          cx={x}
          cy={y}
          r={size}
          fill='#fafafa'
          opacity={opacity}
          className='animate-twinkle'
          style={{ animationDelay: `${delay}s` }}
        />
      )
    case 1:
      // Blue-white star
      return (
        <circle
          cx={x}
          cy={y}
          r={size}
          fill='#e0f2fe'
          opacity={opacity}
          className='animate-twinkle'
          style={{ animationDelay: `${delay}s` }}
        />
      )
    case 2:
      // Yellow-white star
      return (
        <circle
          cx={x}
          cy={y}
          r={size}
          fill='#fef3c7'
          opacity={opacity}
          className='animate-twinkle'
          style={{ animationDelay: `${delay}s` }}
        />
      )
    case 3:
      // Bright white star with glow
      return (
        <g>
          <circle
            cx={x}
            cy={y}
            r={size * 1.5}
            fill='rgba(250, 250, 250, 0.2)'
            className='animate-pulse'
            style={{ animationDelay: `${delay}s` }}
          />
          <circle
            cx={x}
            cy={y}
            r={size}
            fill='#fafafa'
            opacity={opacity}
            className='animate-twinkle'
            style={{ animationDelay: `${delay}s` }}
          />
        </g>
      )
    case 4:
      // Small twinkling star
      return (
        <circle
          cx={x}
          cy={y}
          r={size}
          fill='#f8fafc'
          opacity={opacity}
          className='animate-twinkle'
          style={{ animationDelay: `${delay}s`, animationDuration: '1.5s' }}
        />
      )
    case 5: {
      // Cross-shaped star
      // Only parse numeric values when needed for line coordinates.
      const xNum = parseFloat(x)
      const yNum = parseFloat(y)
      return (
        <g className='animate-twinkle' style={{ animationDelay: `${delay}s` }}>
          <line
            x1={xNum - size}
            y1={yNum}
            x2={xNum + size}
            y2={yNum}
            stroke='#fafafa'
            strokeWidth={size * 0.3}
            opacity={opacity}
          />
          <line
            x1={xNum}
            y1={yNum - size}
            x2={xNum}
            y2={yNum + size}
            stroke='#fafafa'
            strokeWidth={size * 0.3}
            opacity={opacity}
          />
        </g>
      )
    }
    case 6: {
      // Diamond-shaped star
      // Only parse numeric values when needed for polygon coordinates.
      const xNum = parseFloat(x)
      const yNum = parseFloat(y)
      return (
        <polygon
          points={`${xNum},${yNum - size} ${xNum + size * 0.7},${yNum} ${xNum},${yNum + size} ${xNum - size * 0.7},${yNum}`}
          fill='#f1f5f9'
          opacity={opacity}
          className='animate-twinkle'
          style={{ animationDelay: `${delay}s` }}
        />
      )
    }
    default:
      return (
        <circle
          cx={x}
          cy={y}
          r={size}
          fill='#fafafa'
          opacity={opacity}
          className='animate-twinkle'
          style={{ animationDelay: `${delay}s` }}
        />
      )
  }
}

// Cloud component
function Cloud({ delay, scale }: { delay: number; scale: number }) {
  return (
    <g
      className='animate-cloud-drift'
      style={{
        animationDelay: `${delay}s`,
        transform: `scale(${scale})`,
      }}
    >
      <circle cx='0' cy='0' r='15' fill='rgba(255, 255, 255, 0.8)' />
      <circle cx='20' cy='-5' r='18' fill='rgba(255, 255, 255, 0.8)' />
      <circle cx='40' cy='0' r='15' fill='rgba(255, 255, 255, 0.8)' />
      <circle cx='15' cy='10' r='12' fill='rgba(255, 255, 255, 0.8)' />
      <circle cx='35' cy='10' r='12' fill='rgba(255, 255, 255, 0.8)' />
    </g>
  )
}

export default function ThemeCelestial({ isDarkMode }: ThemeCelestialProps) {
  const stars = useMemo(() => {
    const starsLayer1 = Array.from({ length: 120 }, (_, i) => ({
      id: `layer1-${i}`,
      x: `${Math.random() * 100}%`,
      y: `${Math.random() * 60}%`, // Upper 60% of screen
      size: Math.random() * 2.5 + 0.3,
      delay: Math.random() * 4,
      type: Math.floor(Math.random() * 7),
      opacity: 0.8,
    }))

    const starsLayer2 = Array.from({ length: 80 }, (_, i) => ({
      id: `layer2-${i}`,
      x: `${Math.random() * 100}%`,
      y: `${Math.random() * 70}%`, // Upper 70% of screen
      size: Math.random() * 1.8 + 0.2,
      delay: Math.random() * 3,
      type: Math.floor(Math.random() * 7),
      opacity: 0.6,
    }))

    const starsLayer3 = Array.from({ length: 50 }, (_, i) => ({
      id: `layer3-${i}`,
      x: `${Math.random() * 100}%`,
      y: `${Math.random() * 80}%`, // Upper 80% of screen
      size: Math.random() * 1.2 + 0.1,
      delay: Math.random() * 5,
      type: Math.floor(Math.random() * 7),
      opacity: 0.4,
    }))

    return [...starsLayer1, ...starsLayer2, ...starsLayer3]
  }, [])

  const clouds = useMemo(
    () =>
      Array.from({ length: 10 }, (_, i) => ({
        id: i,
        x: `${Math.random() * 120 - 10}%`, // Spread across screen width (-10% to 110%)
        y: `${Math.random() * 25 + 5}%`, // Upper 35% of screen
        delay: Math.random() * 8, // Longer delay range for more natural timing
        scale: Math.random() * 0.5 + 0.5, // Random size variation
      })),
    []
  )

  return (
    <div className='w-full h-screen absolute inset-0 -z-10 overflow-hidden'>
      {/* Sky background - upper 35% */}
      <div
        className='absolute top-0 left-0 right-0'
        style={{
          height: '35%',
          background: isDarkMode
            ? 'linear-gradient(to bottom, #0a0a0a, #171717, transparent)'
            : 'linear-gradient(to bottom, #87ceeb, #87ceeb, transparent)',
          transition: 'background 0.3s ease-in-out',
        }}
      >
        {/* Starry sky for dark mode */}
        {isDarkMode && (
          <svg className='absolute inset-0 w-full h-full'>
            {stars.map((star) => (
              <Star
                key={star.id}
                x={star.x}
                y={star.y}
                size={star.size}
                delay={star.delay}
                type={star.type}
                opacity={star.opacity}
              />
            ))}
          </svg>
        )}

        {/* Moving clouds for light mode */}
        {!isDarkMode && (
          <svg className='absolute inset-0 w-full h-full overflow-visible'>
            {clouds.map((cloud) => (
              <g
                key={cloud.id}
                style={{ transform: `translate(${cloud.x}, ${cloud.y})` }}
              >
                <Cloud delay={cloud.delay} scale={cloud.scale} />
              </g>
            ))}
          </svg>
        )}
      </div>
    </div>
  )
}
