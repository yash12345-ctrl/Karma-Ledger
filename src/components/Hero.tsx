import { useMemo } from 'react'
import type { CSSProperties } from 'react'
import heroImg from '../assets/hero.jpg'
import { ArrowRight, Ornament, PlayCircle } from './Icons'

/** Deterministic pseudo-random so sparkles don't jump between renders */
const sparkles = Array.from({ length: 26 }, (_, i) => {
  const r = (n: number) => {
    const x = Math.sin((i + 1) * 9301 + n * 49297) * 233280
    return x - Math.floor(x)
  }
  return {
    left: `${r(1) * 100}%`,
    top: `${r(2) * 80}%`,
    size: 2 + r(3) * 3,
    delay: `${r(4) * 5}s`,
    duration: `${2.5 + r(5) * 3}s`,
  }
})

export default function Hero() {
  const stars = useMemo(
    () =>
      sparkles.map((s, i) => (
        <span
          key={i}
          className="spark"
          style={
            {
              left: s.left,
              top: s.top,
              width: s.size,
              height: s.size,
              animationDelay: s.delay,
              animationDuration: s.duration,
            } as CSSProperties
          }
        />
      )),
    [],
  )

  return (
    <section className="hero" id="home" aria-labelledby="hero-title">
      <div className="hero__art" style={{ backgroundImage: `url(${heroImg})` }} role="img" aria-label="Chitragupta stressed at his laptop between the gates of Heaven and Hell while Yamaraj glares" />
      <div className="hero__shade" />
      <div className="hero__sparks" aria-hidden="true">
        {stars}
      </div>

      {/* Story overlays */}
      <span className="gate-label gate-label--heaven" aria-hidden="true">HEAVEN</span>
      <span className="gate-label gate-label--hell" aria-hidden="true">HELL</span>

      <div className="queue-sign queue-sign--heaven" aria-label="Souls in queue for Heaven: 2,34,567">
        <small>Souls in Queue</small>
        <strong>2,34,567</strong>
      </div>
      <div className="queue-sign queue-sign--hell" aria-label="Souls in queue for Hell: 3,45,981">
        <small>Souls in Queue</small>
        <strong>3,45,981</strong>
      </div>

      <div className="speech" role="note">
        <b>Chitragupta!</b>
        <span>If this query takes more than 2 seconds, I'll throw you into the boiling oil!</span>
      </div>

      <div className="hero__content">
        <div className="hero__kicker" aria-hidden="true">
          <Ornament />
          <span className="hero__kicker-text">Chitragupta's</span>
        </div>
        <h1 className="hero__title" id="hero-title">
          Karma Ledger
        </h1>
        <p className="hero__lead">From Chaos to Normalization: Fixing the Ultimate Cosmic Database</p>
        <p className="hero__text">
          Join Chitragupta and the Sages on a mission to normalize the Karma-DB and clear the soul
          queues at the gates of Heaven and Hell.
        </p>
        <div className="hero__actions">
          <a href="#journey" className="btn btn--gold" id="cta-start-journey">
            Start the Journey <ArrowRight size={16} />
          </a>
          <a href="#story" className="btn btn--dark" id="cta-watch-story">
            <PlayCircle size={18} /> Watch Story
          </a>
        </div>
      </div>

      <a href="#journey" className="hero__scroll-cue" aria-label="Scroll to Normalization Journey">
        <span className="scroll-cue__text">Scroll to explore</span>
        <span className="scroll-cue__mouse">
          <span className="scroll-cue__wheel" />
        </span>
      </a>
    </section>
  )
}
