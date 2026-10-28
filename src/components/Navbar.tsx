import { useEffect, useState } from 'react'
import { ArrowRight, CloseIcon, MenuIcon, ScrollLogo } from './Icons'

const links = [
  { label: 'Home', href: '#home' },
  { label: 'Story', href: '#story' },
  { label: 'Characters', href: '#characters' },
  { label: 'Normalization Journey', href: '#journey' },
  { label: 'Database', href: '#database' },
  { label: 'Play', href: '#play' },
  { label: 'About', href: '#about' },
]

interface NavbarProps {
  onOpen1NF?: () => void
}

export default function Navbar({ onOpen1NF }: NavbarProps) {
  const [open, setOpen] = useState(false)
  const [scrolled, setScrolled] = useState(false)

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 24)
    onScroll()
    window.addEventListener('scroll', onScroll, { passive: true })
    return () => window.removeEventListener('scroll', onScroll)
  }, [])

  return (
    <header className={`nav ${scrolled ? 'nav--scrolled' : ''} ${open ? 'nav--open' : ''}`}>
      <div className="nav__inner">
        <a href="#home" className="brand" id="nav-brand" aria-label="Karma DB home">
          <ScrollLogo size={42} />
          <span className="brand__text">
            <span className="brand__name">KARMA DB</span>
            <span className="brand__tag">Normalize the Universe</span>
          </span>
        </a>

        <nav className="nav__links" aria-label="Primary">
          {links.map((l, i) => (
            <a
              key={l.label}
              href={l.href}
              id={`nav-link-${l.label.toLowerCase().replace(/\s+/g, '-')}`}
              className={`nav__link ${i === 0 ? 'is-active' : ''}`}
              onClick={() => {
                setOpen(false)
                if (l.label === 'Play' && onOpen1NF) {
                  onOpen1NF()
                }
              }}
            >
              {l.label}
            </a>
          ))}
          <a
            href="#journey"
            className="btn btn--outline btn--sm nav__cta-mobile"
            id="nav-enter-mobile"
            onClick={() => setOpen(false)}
          >
            Enter Yamaloka <ArrowRight size={14} />
          </a>
        </nav>

        <a
          href="#journey"
          className="btn btn--outline btn--sm nav__cta"
          id="nav-enter-yamaloka"
        >
          Enter Yamaloka <ArrowRight size={14} />
        </a>

        <button
          className="nav__toggle"
          id="nav-toggle"
          aria-label={open ? 'Close menu' : 'Open menu'}
          aria-expanded={open}
          onClick={() => setOpen((v) => !v)}
        >
          {open ? <CloseIcon size={24} /> : <MenuIcon size={24} />}
        </button>
      </div>
    </header>
  )
}
