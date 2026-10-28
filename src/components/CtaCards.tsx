import type { CSSProperties } from 'react'
import { ArrowRight, DatabaseIcon, GamepadIcon, PlayCircle } from './Icons'

const items = [
  {
    id: 'database',
    title: 'Interactive Examples',
    text: 'See real data before and after normalization',
    accent: '#3d94ff',
    icon: <DatabaseIcon size={26} />,
  },
  {
    id: 'story',
    title: 'Animated Story',
    text: 'Watch the full roleplay come to life',
    accent: '#a35cff',
    icon: <PlayCircle size={26} />,
  },
  {
    id: 'play',
    title: 'Play & Learn',
    text: 'Solve challenges and fix the Karma-DB',
    accent: '#2fd98a',
    icon: <GamepadIcon size={26} />,
  },
]

export default function CtaCards() {
  return (
    <section className="cta" aria-label="Explore Karma DB">
      {items.map((it) => (
        <a
          key={it.id}
          href={`#${it.id}`}
          id={`cta-${it.id}`}
          className="cta-card"
          style={{ '--accent': it.accent } as CSSProperties}
        >
          <span className="cta-card__icon">{it.icon}</span>
          <span className="cta-card__copy">
            <strong>{it.title}</strong>
            <small>{it.text}</small>
          </span>
          <ArrowRight size={20} className="cta-card__arrow" />
        </a>
      ))}
    </section>
  )
}
