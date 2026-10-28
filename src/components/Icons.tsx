import type { ReactNode, SVGProps } from 'react'

type IconProps = SVGProps<SVGSVGElement> & { size?: number }

const Svg = ({ size = 18, children, ...rest }: IconProps & { children: ReactNode }) => (
  <svg
    width={size}
    height={size}
    viewBox="0 0 24 24"
    fill="none"
    stroke="currentColor"
    strokeWidth="2"
    strokeLinecap="round"
    strokeLinejoin="round"
    aria-hidden="true"
    {...rest}
  >
    {children}
  </svg>
)

export const ArrowRight = (p: IconProps) => (
  <Svg {...p}>
    <line x1="5" y1="12" x2="19" y2="12" />
    <polyline points="12 5 19 12 12 19" />
  </Svg>
)

export const PlayCircle = (p: IconProps) => (
  <Svg {...p}>
    <circle cx="12" cy="12" r="10" />
    <polygon points="10 8 16 12 10 16 10 8" fill="currentColor" />
  </Svg>
)

export const DatabaseIcon = (p: IconProps) => (
  <Svg {...p}>
    <ellipse cx="12" cy="5" rx="9" ry="3" />
    <path d="M21 12c0 1.66-4 3-9 3s-9-1.34-9-3" />
    <path d="M3 5v14c0 1.66 4 3 9 3s9-1.34 9-3V5" />
  </Svg>
)

export const GamepadIcon = (p: IconProps) => (
  <Svg {...p}>
    <line x1="6" y1="12" x2="10" y2="12" />
    <line x1="8" y1="10" x2="8" y2="14" />
    <line x1="15" y1="13" x2="15.01" y2="13" />
    <line x1="18" y1="11" x2="18.01" y2="11" />
    <rect x="2" y="6" width="20" height="12" rx="2" />
  </Svg>
)

export const ChatIcon = (p: IconProps) => (
  <Svg {...p}>
    <path d="M21 15a2 2 0 0 1-2 2H7l-4 4V5a2 2 0 0 1 2-2h14a2 2 0 0 1 2 2z" />
  </Svg>
)

export const UserIcon = (p: IconProps) => (
  <Svg {...p}>
    <path d="M20 21v-2a4 4 0 0 0-4-4H8a4 4 0 0 0-4 4v2" />
    <circle cx="12" cy="7" r="4" />
  </Svg>
)

export const CardIcon = (p: IconProps) => (
  <Svg {...p}>
    <rect x="1" y="4" width="22" height="16" rx="2" />
    <line x1="1" y1="10" x2="23" y2="10" />
  </Svg>
)

export const LineageIcon = (p: IconProps) => (
  <Svg {...p}>
    <circle cx="18" cy="5" r="3" />
    <circle cx="6" cy="12" r="3" />
    <circle cx="18" cy="19" r="3" />
    <line x1="8.59" y1="13.51" x2="15.42" y2="17.49" />
    <line x1="15.41" y1="6.51" x2="8.59" y2="10.49" />
  </Svg>
)

export const StarIcon = (p: IconProps) => (
  <Svg {...p}>
    <polygon points="12 2 15.09 8.26 22 9.27 17 14.14 18.18 21.02 12 17.77 5.82 21.02 7 14.14 2 9.27 8.91 8.26 12 2" />
  </Svg>
)

export const MenuIcon = (p: IconProps) => (
  <Svg {...p}>
    <line x1="3" y1="6" x2="21" y2="6" />
    <line x1="3" y1="12" x2="21" y2="12" />
    <line x1="3" y1="18" x2="21" y2="18" />
  </Svg>
)

export const CloseIcon = (p: IconProps) => (
  <Svg {...p}>
    <line x1="18" y1="6" x2="6" y2="18" />
    <line x1="6" y1="6" x2="18" y2="18" />
  </Svg>
)

export const VolumeOn = (p: IconProps) => (
  <Svg {...p}>
    <polygon points="11 5 6 9 2 9 2 15 6 15 11 19 11 5" />
    <path d="M15.54 8.46a5 5 0 0 1 0 7.07" />
    <path d="M19.07 4.93a10 10 0 0 1 0 14.14" />
  </Svg>
)

export const VolumeOff = (p: IconProps) => (
  <Svg {...p}>
    <polygon points="11 5 6 9 2 9 2 15 6 15 11 19 11 5" />
    <line x1="23" y1="9" x2="17" y2="15" />
    <line x1="17" y1="9" x2="23" y2="15" />
  </Svg>
)

/** Golden rolled-scroll logo mark */
export const ScrollLogo = ({ size = 40 }: { size?: number }) => (
  <svg width={size} height={size} viewBox="0 0 48 48" fill="none" aria-hidden="true">
    <defs>
      <linearGradient id="scrollGold" x1="0" y1="0" x2="1" y2="1">
        <stop offset="0" stopColor="#ffe3a0" />
        <stop offset="1" stopColor="#c98a1e" />
      </linearGradient>
    </defs>
    <path d="M12 9h25a3 3 0 0 1 3 3v22a5 5 0 0 1-5 5H12" stroke="url(#scrollGold)" strokeWidth="2.4" />
    <rect x="6" y="6" width="9" height="36" rx="4.5" fill="url(#scrollGold)" />
    <rect x="9" y="6" width="3" height="36" rx="1.5" fill="#6b4208" opacity="0.35" />
    <path d="M19 18h16M19 24h16M19 30h10" stroke="url(#scrollGold)" strokeWidth="2.2" strokeLinecap="round" />
  </svg>
)

/** Decorative gold ornament that flanks headings */
export const Ornament = ({ flip = false }: { flip?: boolean }) => (
  <svg
    width="46"
    height="16"
    viewBox="0 0 46 16"
    fill="none"
    aria-hidden="true"
    style={flip ? { transform: 'scaleX(-1)' } : undefined}
  >
    <path
      d="M1 8h22c4 0 5-5 9-5 3 0 3 3 1 3.5s-3-2-1-3M23 8c3 0 4 5 8 5 3 0 3-3 1-3.5s-3 2-1 3"
      stroke="#f7c566"
      strokeWidth="1.4"
      strokeLinecap="round"
    />
    <circle cx="40" cy="8" r="2" fill="#f7c566" />
    <path d="M44 8h2" stroke="#f7c566" strokeWidth="1.4" strokeLinecap="round" />
  </svg>
)
