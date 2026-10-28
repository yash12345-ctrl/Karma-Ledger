import { useCallback, useEffect, useMemo, useRef, useState } from 'react'
import type { CSSProperties } from 'react'
import hall from '../assets/intro/hall.jpg'
import shock from '../assets/intro/shock.jpg'
import yama from '../assets/intro/yama.jpg'
import heroImg from '../assets/hero.jpg'
import { journey } from '../data/journey'
import { captions, queryText, soulRows, tables, TOTAL_ROWS } from '../data/introScript'
import type { Caption } from '../data/introScript'
import { ArrowRight, ScrollLogo } from './Icons'
import './Intro.css'

type Scene = 'title' | 'hall' | 'laptop' | 'shock' | 'yama' | 'quest'
type DbPhase = 'idle' | 'running' | 'dead'
type PointerState = 'hidden' | 'move' | 'click'

type IntroProps = {
  /** Fired the moment the exit flash starts (mount the home page underneath). */
  onReveal: () => void
  /** Fired once the intro has fully faded out (unmount the intro). */
  onDone: () => void
}

const formatIN = (n: number) => n.toLocaleString('en-IN')

const otherCounts: Record<string, string> = {
  souls: '2,81,904',
  deeds: '1,02,44,517',
  soul_queue: '5,80,548',
  lookup_sins: '148',
}

/** Deterministic embers so they don't jump between renders */
const embers = Array.from({ length: 28 }, (_, i) => {
  const r = (n: number) => {
    const x = Math.sin((i + 3) * 7919 + n * 104729) * 10000
    return x - Math.floor(x)
  }
  return {
    left: `${r(1) * 100}%`,
    size: 2 + r(2) * 4,
    duration: `${7 + r(3) * 9}s`,
    delay: `${-r(4) * 14}s`,
    drift: `${(r(5) - 0.5) * 120}px`,
  }
})

const KEYWORDS = /^(DELETE|FROM|WHERE)$/

function Highlight({ line }: { line: string }) {
  if (line.startsWith('--')) return <span className="tok-c">{line}</span>
  return (
    <>
      {line.split(/(\bDELETE\b|\bFROM\b|\bWHERE\b|\bkarma_ledger\b|;)/).map((t, i) => {
        if (t === '') return null
        if (KEYWORDS.test(t)) return <span key={i} className="tok-k">{t}</span>
        if (t === 'karma_ledger') return <span key={i} className="tok-i">{t}</span>
        if (t === ';') return <span key={i} className="tok-p">{t}</span>
        return <span key={i}>{t}</span>
      })}
    </>
  )
}

export default function Intro({ onReveal, onDone }: IntroProps) {
  const [scene, setScene] = useState<Scene>('title')
  const [caption, setCaption] = useState<Caption | null>(null)
  const [typed, setTyped] = useState('')
  const [warn, setWarn] = useState(false)
  const [pointer, setPointer] = useState<PointerState>('hidden')
  const [phase, setPhase] = useState<DbPhase>('idle')
  const [deleted, setDeleted] = useState(0)
  const [count, setCount] = useState(TOTAL_ROWS)
  const [hallPlay, setHallPlay] = useState(false)
  const [progress, setProgress] = useState(0)
  const [exiting, setExiting] = useState(false)
  const [questStep, setQuestStep] = useState(0)

  const finished = useRef(false)
  const cancelRun = useRef<() => void>(() => {})

  /* ---------- leaving the intro (end of story OR user skip) ---------- */
  const finish = useCallback(() => {
    if (finished.current) return
    finished.current = true
    cancelRun.current()
    setExiting(true)
    onReveal()
    window.setTimeout(() => {
      window.scrollTo(0, 0)
      onDone()
    }, 1000)
  }, [onReveal, onDone])

  const finishRef = useRef(finish)
  useEffect(() => {
    finishRef.current = finish
  }, [finish])

  /* ---------- lock page scroll + keyboard + preload home art ---------- */
  useEffect(() => {
    const html = document.documentElement
    const prev = html.style.overflow
    html.style.overflow = 'hidden'

    const onKey = (e: KeyboardEvent) => {
      if (e.key === 'Escape' || e.key === 'Enter') finishRef.current()
    }
    window.addEventListener('keydown', onKey)

    // warm the cache so the home page appears instantly after the intro
    ;[heroImg, ...journey.map((j) => j.image)].forEach((src) => {
      const img = new Image()
      img.src = src
    })

    return () => {
      html.style.overflow = prev
      window.removeEventListener('keydown', onKey)
    }
  }, [])

  /* ---------- the director: runs the fast punchy cinematic story ---------- */
  useEffect(() => {
    const timers = new Set<number>()
    cancelRun.current = () => {
      timers.forEach((t) => window.clearTimeout(t))
      timers.clear()
    }

    const wait = (ms: number) =>
      new Promise<void>((resolve) => {
        const id = window.setTimeout(() => {
          timers.delete(id)
          resolve()
        }, ms)
        timers.add(id)
      })

    const typeOut = async (text: string, prefix: string, base: number, jitter: number) => {
      for (let i = 1; i <= text.length; i++) {
        setTyped(prefix + text.slice(0, i))
        const ch = text[i - 1]
        await wait(base + Math.random() * jitter + (ch === ';' ? 80 : 0))
      }
    }

    const wipeDatabase = async () => {
      setPhase('running')
      const rows = (async () => {
        for (let i = 1; i <= soulRows.length; i++) {
          await wait(110)
          setDeleted(i)
        }
      })()
      const counter = (async () => {
        const steps = 26
        for (let s = 1; s <= steps; s++) {
          await wait(32)
          const p = s / steps
          setCount(Math.round(TOTAL_ROWS * (1 - p * p)))
        }
        setCount(0)
      })()
      await Promise.all([rows, counter])
      setPhase('dead')
    }

    const play = async () => {
      setScene('title')
      setCaption(null)
      setTyped('')
      setWarn(false)
      setPointer('hidden')
      setPhase('idle')
      setDeleted(0)
      setCount(TOTAL_ROWS)
      setHallPlay(false)
      setQuestStep(0)
      setProgress(5)

      /* SCENE 1 · title card */
      await wait(1400)

      /* SCENE 2 · the hall */
      setScene('hall')
      setHallPlay(true)
      setProgress(16)
      setCaption(captions.narrator1)
      await wait(1800)
      setCaption(captions.chitra1)
      await wait(1600)
      setCaption(null)
      await wait(250)

      /* SCENE 3 · the laptop */
      setScene('laptop')
      setProgress(32)
      await wait(500)
      await typeOut(queryText.comment, '', 14, 16)
      setTyped(queryText.comment + '\n')
      await wait(180)
      await typeOut(queryText.statement, queryText.comment + '\n', 22, 28)
      await wait(250)
      setWarn(true)
      setCaption(captions.narrator2)
      await wait(600)
      setPointer('move')
      await wait(600)
      setPointer('click')
      await wait(220)
      setCaption(null)
      setProgress(56)
      await wipeDatabase()
      setProgress(74)
      await wait(1100)

      /* SCENE 4 · the reaction */
      setScene('shock')
      setCaption(captions.chitra2)
      setProgress(82)
      await wait(1800)

      /* SCENE 5 · the wrath */
      setScene('yama')
      setCaption(captions.yama)
      setProgress(90)
      await wait(1900)

      /* SCENE 6 · the quest */
      setCaption(null)
      setScene('quest')
      setProgress(95)
      await wait(300)
      setQuestStep(1)
      await wait(1200)
      setQuestStep(2)
      await wait(1400)
      setQuestStep(3)
      await wait(1200)
      setProgress(100)
      finishRef.current()
    }

    play()
    return () => cancelRun.current()
  }, [])

  const sparks = useMemo(
    () =>
      embers.map((e, i) => (
        <span
          key={i}
          className="ember"
          style={
            {
              left: e.left,
              width: e.size,
              height: e.size,
              animationDuration: e.duration,
              animationDelay: e.delay,
              '--drift': e.drift,
            } as CSSProperties
          }
        />
      )),
    [],
  )

  const lines = typed.split('\n')
  const on = (s: Scene) => (scene === s ? 'is-on' : '')

  return (
    <div
      className={`intro intro--${scene} ${phase === 'dead' ? 'is-dead' : ''} ${exiting ? 'is-exiting' : ''}`}
      role="dialog"
      aria-label="Opening story: Chitragupta deletes the Karma-DB"
    >
      <div className="stage">
        {/* ── Scene 1 · Title ───────────────────────────── */}
        <section className={`layer layer--title ${on('title')}`} aria-hidden={scene !== 'title'}>
          <div className="title-card">
            <p className="title-card__eyebrow">Yamaloka</p>
            <h2 className="title-card__title">Hall of Records</h2>
            <span className="title-card__rule" />
            <p className="title-card__time">3:47 AM · Cosmic Standard Time</p>
          </div>
        </section>

        {/* ── Scene 2 · The hall ────────────────────────── */}
        <section className={`layer layer--hall ${on('hall')} ${hallPlay ? 'hall--play' : ''}`}>
          <div className="hall__bg" style={{ backgroundImage: `url(${hall})` }} />
          <div className="hall__lamp" />
          <div className="hall__screenglow" />
        </section>

        {/* ── Scene 3 · The laptop ──────────────────────── */}
        <section className={`layer layer--laptop ${on('laptop')}`}>
          <div className="laptop__bg" style={{ backgroundImage: `url(${hall})` }} />
          <div className={`device ${phase === 'dead' ? 'is-dead' : ''}`}>
            <div className="device__screen">
              <div className={`console console--${phase}`}>
                <div className="console__titlebar">
                  <span className="dots" aria-hidden="true">
                    <i />
                    <i />
                    <i />
                  </span>
                  <span className="console__title">KarmaSQL Console — yamaloka-prod-01</span>
                  <span className={`conn conn--${phase}`}>
                    <b />
                    {phase === 'dead' ? 'CRITICAL' : 'connected · production'}
                  </span>
                </div>

                <div className="console__body">
                  <aside className="sidebar">
                    <p className="sidebar__h">Tables</p>
                    <ul>
                      {tables.map((t) => (
                        <li key={t} className={t === 'karma_ledger' ? 'is-sel' : ''}>
                          <span>{t}</span>
                          <em>{t === 'karma_ledger' ? formatIN(count) : otherCounts[t]}</em>
                        </li>
                      ))}
                    </ul>
                  </aside>

                  <div className="main">
                    <div className="tabs">
                      <span className="tab">query-1.sql</span>
                      <div className="runwrap">
                        <button
                          type="button"
                          tabIndex={-1}
                          className={`run run--${phase} ${pointer === 'click' ? 'is-pressed' : ''}`}
                        >
                          {phase === 'running' ? <i className="run__spin" /> : '▶'}
                          {phase === 'running' ? 'Running…' : 'Run'}
                        </button>
                        <svg
                          className={`pointer pointer--${pointer}`}
                          viewBox="0 0 24 24"
                          aria-hidden="true"
                        >
                          <path
                            d="M4 2l15 9-6.5 1.6L16 20l-3 1.4-3.4-7.6L5 17z"
                            fill="#fff"
                            stroke="#111"
                            strokeWidth="1.4"
                            strokeLinejoin="round"
                          />
                        </svg>
                      </div>
                    </div>

                    <div className="editor">
                      {lines.map((line, i) => (
                        <div
                          key={i}
                          className={`line ${warn && i === 1 ? 'line--warn' : ''}`}
                        >
                          <span className="ln">{i + 1}</span>
                          <code>
                            <Highlight line={line} />
                            {i === lines.length - 1 && phase === 'idle' && <span className="caret" />}
                          </code>
                          {warn && i === 1 && phase === 'idle' && (
                            <span className="hint">
                              ⚠ DELETE without a WHERE clause will affect <b>all rows</b>
                            </span>
                          )}
                        </div>
                      ))}
                    </div>

                    <div className="results">
                      <div className="results__head">
                        <span>soul_id</span>
                        <span>name</span>
                        <span className="hide-sm">punya</span>
                        <span className="hide-sm">paap</span>
                        <span>destination</span>
                      </div>
                      <div className="results__rows">
                        {soulRows.map((r, i) => (
                          <div key={r.id} className={`row ${i < deleted ? 'is-gone' : ''}`}>
                            <span>{r.id}</span>
                            <span>{r.name}</span>
                            <span className="hide-sm">{r.punya}</span>
                            <span className="hide-sm">{r.paap}</span>
                            <span>
                              <b className={`tag tag--${r.destination.toLowerCase()}`}>{r.destination}</b>
                            </span>
                          </div>
                        ))}
                        {phase === 'dead' && (
                          <div className="results__empty">
                            <strong>0 rows</strong>
                            <span>Table “karma_ledger” is empty</span>
                          </div>
                        )}
                      </div>
                    </div>
                  </div>
                </div>

                <div className="statusbar">
                  <span>
                    {phase === 'idle' && 'Ready'}
                    {phase === 'running' && 'Executing statement…'}
                    {phase === 'dead' && (
                      <b className="status-err">
                        Query OK, {formatIN(TOTAL_ROWS)} rows affected (0.002 sec)
                      </b>
                    )}
                  </span>
                  <span className={phase === 'dead' ? 'status-err' : ''}>
                    karma_ledger · {formatIN(count)} rows
                  </span>
                </div>

                {phase === 'dead' && (
                  <div className="alarm" role="alert">
                    ⚠ CRITICAL — KARMA-DB IS EMPTY
                  </div>
                )}
              </div>
            </div>
            <div className="device__base" aria-hidden="true" />
          </div>
        </section>

        {/* ── Scene 4 · Chitragupta reacts ──────────────── */}
        <section className={`layer layer--shock ${on('shock')}`}>
          <div className="fullimg" style={{ backgroundImage: `url(${shock})` }} />
          <div className="redpulse" />
        </section>

        {/* ── Scene 5 · Yamaraj ─────────────────────────── */}
        <section className={`layer layer--yama ${on('yama')}`}>
          <div className="fullimg" style={{ backgroundImage: `url(${yama})` }} />
          <div className="lightning" />
        </section>

        {/* ── Scene 6 · The quest ───────────────────────── */}
        <section className={`layer layer--quest ${on('quest')}`}>
          <div className="quest">
            <p className={`quest__a ${questStep >= 1 ? 'is-in' : ''}`}>Heaven and Hell are in chaos.</p>
            <p className={`quest__c ${questStep >= 2 ? 'is-in' : ''}`}>
              Only the Sages of Normalization can restore the Karma-DB.
            </p>
            <div className={`quest__logo ${questStep >= 3 ? 'is-in' : ''}`}>
              <ScrollLogo size={54} />
              <span>KARMA DB</span>
            </div>
          </div>
        </section>

        {/* ── Global cinematic overlays ─────────────────── */}
        <div className="embers" aria-hidden="true">
          {sparks}
        </div>
        <div className="vignette" aria-hidden="true" />
        <div className="grain" aria-hidden="true" />
        <div className="bar bar--top" aria-hidden="true" />
        <div className="bar bar--bottom" aria-hidden="true">
          <span className="progress" style={{ width: `${progress}%` }} />
        </div>

        {caption && (
          <p
            key={caption.text}
            className={`caption caption--${caption.tone}`}
            aria-live="polite"
          >
            <span className="caption__who">{caption.speaker}</span>
            <span className="caption__text">{caption.text}</span>
          </p>
        )}

        <div className="hud">
          <button type="button" className="hud__btn" id="intro-skip" onClick={finish}>
            Skip Intro <ArrowRight size={14} />
          </button>
        </div>
      </div>

      <div className="flash" aria-hidden="true" />
    </div>
  )
}
