interface FlagIconProps {
  code: string
  className?: string
}

const svgClassName = 'h-4 w-6 rounded-[2px] shadow-sm ring-1 ring-black/10'

export default function FlagIcon({
  code,
  className = svgClassName,
}: FlagIconProps): JSX.Element {
  switch (code) {
    case 'en':
      return (
        <svg viewBox='0 0 24 16' className={className} aria-hidden='true'>
          <rect width='24' height='16' fill='#012169' />
          <path d='M0 0l24 16M24 0L0 16' stroke='#fff' strokeWidth='4' />
          <path d='M0 0l24 16M24 0L0 16' stroke='#C8102E' strokeWidth='2' />
          <path d='M12 0v16M0 8h24' stroke='#fff' strokeWidth='6' />
          <path d='M12 0v16M0 8h24' stroke='#C8102E' strokeWidth='4' />
        </svg>
      )
    case 'fr':
      return (
        <svg viewBox='0 0 24 16' className={className} aria-hidden='true'>
          <rect width='8' height='16' fill='#0055A4' />
          <rect x='8' width='8' height='16' fill='#fff' />
          <rect x='16' width='8' height='16' fill='#EF4135' />
        </svg>
      )
    case 'zh':
      return (
        <svg viewBox='0 0 24 16' className={className} aria-hidden='true'>
          <rect width='24' height='16' fill='#DE2910' />
          <polygon points='5,2 5.7,4 7.8,4 6.1,5.2 6.8,7.1 5,5.9 3.2,7.1 3.9,5.2 2.2,4 4.3,4' fill='#FFDE00' />
          <polygon points='9,2.4 9.3,3.1 10.1,3.2 9.5,3.7 9.7,4.5 9,4.1 8.3,4.5 8.5,3.7 7.9,3.2 8.7,3.1' fill='#FFDE00' />
          <polygon points='10.4,4.4 10.7,5.1 11.5,5.2 10.9,5.7 11.1,6.5 10.4,6.1 9.7,6.5 9.9,5.7 9.3,5.2 10.1,5.1' fill='#FFDE00' />
          <polygon points='10.4,7.2 10.7,7.9 11.5,8 10.9,8.5 11.1,9.3 10.4,8.9 9.7,9.3 9.9,8.5 9.3,8 10.1,7.9' fill='#FFDE00' />
          <polygon points='9,9.2 9.3,9.9 10.1,10 9.5,10.5 9.7,11.3 9,10.9 8.3,11.3 8.5,10.5 7.9,10 8.7,9.9' fill='#FFDE00' />
        </svg>
      )
    case 'ar':
      return (
        <svg viewBox='0 0 24 16' className={className} aria-hidden='true'>
          <rect width='24' height='16' fill='#006C35' />
          <rect x='6' y='7.2' width='12' height='1.2' rx='0.6' fill='#fff' />
          <rect x='16.5' y='6.8' width='2.5' height='0.5' rx='0.25' fill='#fff' />
        </svg>
      )
    case 'es':
      return (
        <svg viewBox='0 0 24 16' className={className} aria-hidden='true'>
          <rect width='24' height='16' fill='#AA151B' />
          <rect y='4' width='24' height='8' fill='#F1BF00' />
        </svg>
      )
    case 'nl':
      return (
        <svg viewBox='0 0 24 16' className={className} aria-hidden='true'>
          <rect width='24' height='5.34' fill='#AE1C28' />
          <rect y='5.33' width='24' height='5.34' fill='#fff' />
          <rect y='10.66' width='24' height='5.34' fill='#21468B' />
        </svg>
      )
    case 'de':
      return (
        <svg viewBox='0 0 24 16' className={className} aria-hidden='true'>
          <rect width='24' height='5.34' fill='#000' />
          <rect y='5.33' width='24' height='5.34' fill='#DD0000' />
          <rect y='10.66' width='24' height='5.34' fill='#FFCE00' />
        </svg>
      )
    case 'tr':
      return (
        <svg viewBox='0 0 24 16' className={className} aria-hidden='true'>
          <rect width='24' height='16' fill='#E30A17' />
          <circle cx='9' cy='8' r='3.3' fill='#fff' />
          <circle cx='10' cy='8' r='2.6' fill='#E30A17' />
          <polygon points='13.8,8 14.7,8.6 14.4,7.6 15.3,7 14.2,7 13.8,6 13.5,7 12.4,7 13.2,7.6 12.9,8.6' fill='#fff' />
        </svg>
      )
    case 'ja':
      return (
        <svg viewBox='0 0 24 16' className={className} aria-hidden='true'>
          <rect width='24' height='16' fill='#fff' />
          <circle cx='12' cy='8' r='4' fill='#BC002D' />
        </svg>
      )
    case 'ko':
      return (
        <svg viewBox='0 0 24 16' className={className} aria-hidden='true'>
          <rect width='24' height='16' fill='#fff' />
          <path d='M12 4a4 4 0 0 1 0 8a2 2 0 0 0 0-4a2 2 0 0 1 0-4z' fill='#CD2E3A' />
          <path d='M12 12a4 4 0 0 1 0-8a2 2 0 0 0 0 4a2 2 0 0 1 0 4z' fill='#0047A0' />
          <g stroke='#000' strokeWidth='0.7'>
            <path d='M4 4h3M4 5h3M4 6h3' />
            <path d='M17 10h3M17 11h3M17 12h3' />
            <path d='M17 4h3M17 5h3M17 6h3' />
            <path d='M4 10h3M4 11h3M4 12h3' />
          </g>
        </svg>
      )
    case 'ru':
      return (
        <svg viewBox='0 0 24 16' className={className} aria-hidden='true'>
          <rect width='24' height='5.34' fill='#fff' />
          <rect y='5.33' width='24' height='5.34' fill='#0039A6' />
          <rect y='10.66' width='24' height='5.34' fill='#D52B1E' />
        </svg>
      )
    case 'pt':
      return (
        <svg viewBox='0 0 24 16' className={className} aria-hidden='true'>
          <rect width='9.6' height='16' fill='#006600' />
          <rect x='9.6' width='14.4' height='16' fill='#FF0000' />
          <circle cx='9.6' cy='8' r='2.6' fill='#FFCC00' />
        </svg>
      )
    default:
      return (
        <svg viewBox='0 0 24 16' className={className} aria-hidden='true'>
          <rect width='24' height='16' fill='#D4D4D8' />
        </svg>
      )
  }
}
