import { useEffect, useMemo, useRef } from 'react'

interface ThemeCelestialImprovedProps {
  isDarkMode: boolean
  cloudCount?: number
}

type Cloud = {
  id: number
  xPx: number
  yPx: number
  yPct: number
  scale: number
  opacity: number
  speed: number
  seed: number
  isNight: boolean
}

export default function ThemeCelestialImproved({
  isDarkMode,
  cloudCount = 28,
}: ThemeCelestialImprovedProps) {
  const containerRef = useRef<HTMLDivElement | null>(null)
  const cloudsRef = useRef<Record<number, SVGGElement | null>>({})
  const clouds = useMemo(() => {
    return Array.from({ length: cloudCount }).map((_, i) => {
      const layer = Math.random() < 0.5 ? 0.6 : 1 // deeper layer moves a bit slower
      return {
        id: i,
        xPx: 0,
        yPx: 0,
        yPct: Math.random() * 15 + 10, // 5% .. 20% from top
        scale: Math.random() * 0.9 + 0.5, // 0.5 .. 1.4
        opacity: Math.random() * 0.4 + 0.35, // 0.35 .. 0.75
        speed: (Math.random() * 25 + 5) * layer,
        seed: Math.random(),
        isNight: Math.random() < 0.35,
      } as Cloud
    })
  }, [cloudCount])

  // Memoize Milky Way stars to prevent regeneration and hydration mismatches
  const milkyWayStars = useMemo(() => {
    return Array.from({ length: 80 }).map((_, i) => {
      const angle = -35 * (Math.PI / 180)
      const t = (i / 80) * 2 - 1 // -1 to 1
      const centerX = 30 + t * 45
      const centerY = 25 + t * 12
      const spread = 12 * (1 - Math.abs(t) * 0.3)

      const offsetX = (Math.random() - 0.5) * spread
      const offsetY = (Math.random() - 0.5) * spread * 0.4

      const rotatedX =
        centerX + offsetX * Math.cos(angle) - offsetY * Math.sin(angle)
      const rotatedY =
        centerY + offsetX * Math.sin(angle) + offsetY * Math.cos(angle)

      return {
        id: i,
        cx: rotatedX,
        cy: rotatedY,
        r: Math.random() * 0.6 + 0.2,
        opacity: Math.random() * 0.5 + 0.3,
      }
    })
  }, [])

  // Memoize Background stars
  const backgroundStars = useMemo(() => {
    // Use a fixed count to avoid hydration mismatch (window.innerHeight on server vs client)
    // 200 is a reasonable default covering most screens
    const count = 200
    return Array.from({ length: count }).map((_, i) => {
      const x = Math.random() * 100
      const y = Math.random() * 65
      const baseR = Math.random() * 1.4 + 0.3
      const depth = Math.random()
      const opacity = 0.75 + depth * 0.5
      const drift = 90 + Math.random() * 120
      const durFadeIn = 12 + Math.random() * 20
      const beginFadeOut = drift * 0.8
      const transformDur = drift
      const scaleDur = 12 + Math.random() * 18
      const transformTo = `${(Math.random() - 0.5) * 0.6} ${(Math.random() - 0.5) * 0.6} ${(Math.random() - 0.5) * 2}`

      return {
        id: i,
        cx: x,
        cy: y,
        r: baseR + depth * 0.8,
        fill: Math.random() < 0.5 ? '#f8fafc' : '#e6f0ff',
        opacity,
        durFadeIn,
        beginFadeOut,
        transformTo,
        transformDur,
        scaleDur,
      }
    })
  }, [])

  useEffect(() => {
    const el = containerRef.current
    if (!el) return
    const rect = el.getBoundingClientRect()
    const width = rect.width
    clouds.forEach((c) => {
      const startPct = Math.random() * 140 - 20 // -20% .. 120%
      c.xPx = (startPct / 100) * width
      c.yPx = (c.yPct / 100) * rect.height
      const g = cloudsRef.current[c.id]
      if (g) {
        g.style.transform = `translate3d(${c.xPx}px, ${c.yPx}px, 0) scale(${c.scale})`
        g.style.opacity = String(c.opacity)
      }
    })
  }, [clouds])

  useEffect(() => {
    let raf = 0
    let last = performance.now()
    let mounted = true

    const loop = (now: number) => {
      if (!mounted) return
      const dt = Math.min(0.06, (now - last) / 1000)
      last = now

      const el = containerRef.current
      if (!el) return
      const rect = el.getBoundingClientRect()
      const width = rect.width
      clouds.forEach((c) => {
        c.xPx += c.speed * dt
        const wobble =
          Math.sin((now / 1000) * (0.2 + c.seed * 0.8) + c.seed * 10) * 6
        const y = c.yPx + wobble * c.scale

        if (c.xPx > width + 300) {
          c.xPx = -200 - Math.random() * 300
          c.yPx = (c.yPct / 100) * rect.height
        }

        const g = cloudsRef.current[c.id]
        if (g) {
          g.style.transform = `translate3d(${Math.round(c.xPx)}px, ${Math.round(y)}px, 0) scale(${c.scale})`
        }
      })

      raf = requestAnimationFrame(loop)
    }

    raf = requestAnimationFrame(loop)
    return () => {
      mounted = false
      cancelAnimationFrame(raf)
    }
  }, [clouds])

  useEffect(() => {
    const mq = window.matchMedia('(prefers-reduced-motion: reduce)')
    if (mq.matches) {
      clouds.forEach((c) => {
        const g = cloudsRef.current[c.id]
        if (g) {
          g.style.transform = `translate3d(${c.xPx}px, ${c.yPx}px, 0) scale(${c.scale})`
          g.style.transition = 'none'
        }
      })
    }
  }, [clouds])

  function CloudShape({
    seed = 0,
    isNight = false,
  }: {
    seed?: number
    isNight?: boolean
  }) {
    if (!isNight) {
      const offsets = [
        { x: 60 + seed * 30, y: 0, r: 18 + seed * 16 },
        { x: 55 - seed * 10, y: -6, r: 26 - seed * 12 },
        { x: 145 - seed * 20, y: 3, r: 18 + seed * 4 },
        { x: 95, y: 12, r: 14 },
        { x: 28, y: 12, r: 12 },
      ]

      return (
        <g>
          {offsets.map((o, i) => (
            <circle
              key={i}
              cx={o.x}
              cy={o.y}
              r={o.r}
              className='cloud-circle'
            />
          ))}
        </g>
      )
    }

    const blobs = Array.from({ length: 7 }).map((_) => ({
      x: (Math.random() - 0.125) * 100, // wider horizontal spread
      y: (Math.random() - 0.5) * 1, // small vertical spread
      rx: 100 + Math.random() * 50, // wider width
      ry: 15 + Math.random() * 1, // flatter height
      opacity: 0.05 + Math.random() * 0.1, // very subtle
    }))

    return (
      <g>
        {blobs.map((b, i) => (
          <ellipse
            key={i}
            cx={b.x}
            cy={b.y}
            rx={b.rx}
            ry={b.ry}
            opacity={b.opacity}
            fill='white'
          />
        ))}
      </g>
    )
  }

  return (
    <div
      ref={containerRef}
      className='w-full h-screen absolute inset-0 -z-10 overflow-hidden'
    >
      {/* Sky background */}
      <div
        className='absolute top-0 left-0 right-0'
        style={{
          height: '35%',
          background: isDarkMode
            ? 'linear-gradient(to bottom, #020205, #0f1724, transparent)'
            : 'linear-gradient(to bottom, #87ceeb, #bfe9ff, transparent)',
          transition: 'background 0.4s ease-in-out',
        }}
      >
        <svg
          className='absolute inset-0 w-full h-full'
          preserveAspectRatio='none'
        >
          <defs>
            {/* subtle blur to soften cloud edges */}
            <filter
              id='cloud-soft'
              x='-50%'
              y='-50%'
              width='200%'
              height='200%'
            >
              <feGaussianBlur stdDeviation='6' />
            </filter>

            <filter
              id='cloud-soft-night'
              x='-80%'
              y='-80%'
              width='260%'
              height='260%'
            >
              <feGaussianBlur stdDeviation='18' />
            </filter>

            {/* gentle inner gradient for clouds */}
            <linearGradient id='cloud-grad' x1='0' x2='1' y1='0' y2='1'>
              <stop offset='0%' stopColor='white' stopOpacity='0.95' />
              <stop offset='60%' stopColor='white' stopOpacity='0.8' />
              <stop offset='100%' stopColor='white' stopOpacity='0.55' />
            </linearGradient>
          </defs>

          {/* Milky Way galaxy band - Always rendered, opacity controlled by CSS */}
          <g
            aria-hidden
            style={{
              opacity: isDarkMode ? 1 : 0,
              transition: 'opacity 1.5s ease-in-out',
            }}
          >
            <defs>
              <radialGradient id='milky-way-core' cx='50%' cy='50%'>
                <stop offset='0%' stopColor='#e8f4ff' stopOpacity='0.15' />
                <stop offset='30%' stopColor='#b8d4f0' stopOpacity='0.08' />
                <stop offset='70%' stopColor='#7a9dc9' stopOpacity='0.03' />
                <stop offset='100%' stopColor='#4a6b8a' stopOpacity='0' />
              </radialGradient>
              <filter
                id='milky-way-glow'
                x='-50%'
                y='-50%'
                width='200%'
                height='200%'
              >
                <feGaussianBlur stdDeviation='40' />
              </filter>
            </defs>

            {/* Main Milky Way band - diagonal sweep across sky */}
            <ellipse
              cx='30%'
              cy='25%'
              rx='45%'
              ry='12%'
              fill='url(#milky-way-core)'
              filter='url(#milky-way-glow)'
              transform='rotate(-35 30 25)'
              opacity='0.7'
            />

            {/* Secondary glow for depth */}
            <ellipse
              cx='55%'
              cy='30%'
              rx='35%'
              ry='8%'
              fill='url(#milky-way-core)'
              filter='url(#milky-way-glow)'
              transform='rotate(-35 55 30)'
              opacity='0.5'
            />

            {/* Dense star cluster within Milky Way */}
            {milkyWayStars.map((star) => (
              <circle
                key={`mw-${star.id}`}
                cx={`${star.cx}%`}
                cy={`${star.cy}%`}
                r={star.r}
                fill='#f0f8ff'
                opacity={star.opacity}
              />
            ))}
          </g>

          {/* Stars for dark mode - Always rendered, opacity controlled by CSS */}
          <g
            aria-hidden
            style={{
              opacity: isDarkMode ? 1 : 0,
              transition: 'opacity 1.5s ease-in-out',
            }}
          >
            {backgroundStars.map((star) => (
              <circle
                key={star.id}
                cx={`${star.cx}%`}
                cy={`${star.cy}%`}
                r={star.r}
                fill={star.fill}
                opacity={star.opacity}
              >
                <animate
                  attributeName='opacity'
                  from='0'
                  to={star.opacity.toString()}
                  dur={`${star.durFadeIn}s`}
                  fill='freeze'
                />
                <animate
                  attributeName='opacity'
                  from={star.opacity.toString()}
                  to='0'
                  begin={`${star.beginFadeOut}s`}
                  dur='20s'
                  fill='freeze'
                />
                <animateTransform
                  attributeName='transform'
                  type='translate'
                  from='0 0'
                  to={star.transformTo}
                  dur={`${star.transformDur}s`}
                  repeatCount='indefinite'
                />
                <animateTransform
                  attributeName='transform'
                  additive='sum'
                  type='scale'
                  from='0.96'
                  to='1.04'
                  dur={`${star.scaleDur}s`}
                  repeatCount='indefinite'
                />
              </circle>
            ))}
          </g>

          {/* Clouds (rendered when not dark mode, or optionally even in dark mode) */}
          <g style={{ willChange: 'transform', pointerEvents: 'none' }}>
            {clouds
              .filter((c) => {
                if (!isDarkMode) return true
                return c.isNight
              })
              .slice(0, isDarkMode ? 5 : clouds.length)
              .map((c) => (
                <g
                  key={c.id}
                  ref={(el) => (cloudsRef.current[c.id] = el)}
                  style={{
                    transform: `translate3d(${c.xPx}px, ${c.yPx}px, 0) scaleX(${isDarkMode ? c.scale * 1000 : c.scale}) scaleY(${c.scale})`,
                    opacity: isDarkMode ? c.opacity * 0.35 : c.opacity,
                    filter: isDarkMode
                      ? 'url(#cloud-soft-night)'
                      : 'url(#cloud-soft)',
                    transformOrigin: '67% 73% 42%',
                  }}
                >
                  <g transform={`rotate(${(c.seed - 0.5) * 6})`}>
                    <CloudShape seed={c.seed} />

                    <ellipse cx='18' cy='24' rx='38' ry='10' opacity={0.06} />
                  </g>
                </g>
              ))}
          </g>

          {/* Accessibility: pause animation if user prefers reduced motion */}
          <style>{`
            @media (prefers-reduced-motion: reduce) {
              .cloud-circle { opacity: 1 !important; }
            }

            /* cloud circles use the gradient fill */
            .cloud-circle { fill: url(#cloud-grad); }
          `}</style>
        </svg>
      </div>
    </div>
  )
}
