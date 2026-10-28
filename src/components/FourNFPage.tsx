import { useEffect, useState } from 'react'
import vyasaImg from '../assets/4nf.jpg'
import chitraScrollImg from '../assets/chitra_scroll.jpg'
import agastyaImg from '../assets/1nf.jpg'
import yamaImg from '../assets/2nf.jpg'
import bhriguImg from '../assets/3nf.jpg'
import naradaImg from '../assets/bcnf.jpg'
import libraryBg from '../assets/patal_lok.jpg'
import {
  CHALLENGE_CARDS_4NF,
  FOUR_NF_SCENES,
  SOUL_LANGUAGE_DATA,
  SOUL_SKILL_DATA,
  TABLE_C_EXPLOSION_12,
  TABLE_C_INITIAL,
  TABLE_C_WITH_HINDI,
  type ChallengeCard4NF,
  type FourNFSceneNumber,
} from '../data/fourNFData'
import { playChime, playSlice, playStamp, playVictoryChord } from '../utils/soundEffects'
import { ArrowRight } from './Icons'
import './FourNFPage.css'

interface FourNFPageProps {
  onBackToHome: () => void
  onOpenBCNF?: () => void
}

export default function FourNFPage({ onBackToHome, onOpenBCNF }: FourNFPageProps) {
  const [currentScene, setCurrentScene] = useState<FourNFSceneNumber>(1)

  // Scene 1: Floating manuscripts & golden particle wave
  const [expandingScroll, setExpandingScroll] = useState(false)

  // Scene 2: Selected language or skill connector
  const [activeLang, setActiveLang] = useState<string | null>(null)
  const [activeSkill, setActiveSkill] = useState<string | null>(null)

  // Scene 3: Combinatorial explosion toggle
  const [explosionMode, setExplosionMode] = useState<'initial' | 'hindi' | 'twelve'>('initial')

  // Scene 4: Separation animation state
  const [isSeparated, setIsSeparated] = useState(false)

  // Scene 5: Interactive card sorting game
  const [placedLangCards, setPlacedLangCards] = useState<string[]>([])
  const [placedSkillCards, setPlacedSkillCards] = useState<string[]>([])
  const [selectedCard, setSelectedCard] = useState<ChallengeCard4NF | null>(null)
  const [challengeShake, setChallengeShake] = useState(false)
  const [challengeComplete, setChallengeComplete] = useState(false)

  useEffect(() => {
    if (currentScene === 1) {
      setExpandingScroll(true)
      const t = setTimeout(() => {
        playStamp()
        setExpandingScroll(false)
      }, 1600)
      return () => clearTimeout(t)
    } else if (currentScene === 4) {
      setIsSeparated(true)
      setTimeout(() => playSlice(), 500)
    }
  }, [currentScene])

  const nextScene = () => {
    if (currentScene < 6) {
      playChime()
      setCurrentScene((prev) => (prev + 1) as FourNFSceneNumber)
    }
  }

  const prevScene = () => {
    if (currentScene > 1) {
      playChime()
      setCurrentScene((prev) => (prev - 1) as FourNFSceneNumber)
    }
  }

  const goToScene = (num: FourNFSceneNumber) => {
    playChime()
    setCurrentScene(num)
  }

  // Mini-game placement
  const handleAssignCard = (target: 'language' | 'skill') => {
    if (!selectedCard) return

    const card = selectedCard
    if (card.type === target) {
      playSlice()
      if (target === 'language') {
        if (!placedLangCards.includes(card.id)) {
          setPlacedLangCards((prev) => [...prev, card.id])
        }
      } else {
        if (!placedSkillCards.includes(card.id)) {
          setPlacedSkillCards((prev) => [...prev, card.id])
        }
      }
      setSelectedCard(null)
    } else {
      setChallengeShake(true)
      setTimeout(() => setChallengeShake(false), 600)
    }
  }

  // Check game completion
  useEffect(() => {
    const allLangs = ['tamil', 'english', 'hindi']
    const allSkills = ['singing', 'painting', 'dancing']

    const langDone = allLangs.every((id) => placedLangCards.includes(id))
    const skillDone = allSkills.every((id) => placedSkillCards.includes(id))

    if (langDone && skillDone && !challengeComplete) {
      setChallengeComplete(true)
      playVictoryChord()
    }
  }, [placedLangCards, placedSkillCards, challengeComplete])

  const handleResetChallenge = () => {
    setPlacedLangCards([])
    setPlacedSkillCards([])
    setSelectedCard(null)
    setChallengeComplete(false)
  }

  const currentMeta = FOUR_NF_SCENES.find((s) => s.number === currentScene)!

  return (
    <div className="fournf-page">
      {/* Ancient Library Ambient Backdrop */}
      <div
        className="vyasa-bg"
        style={{ backgroundImage: `url(${libraryBg})` }}
        aria-hidden="true"
      />
      <div className="vyasa-vignette" aria-hidden="true" />
      <div className="vyasa-mystic-smoke" aria-hidden="true" />

      {/* Floating Vedic Manuscripts */}
      <div className="floating-manuscript ms--1" aria-hidden="true" />
      <div className="floating-manuscript ms--2" aria-hidden="true" />
      <div className="floating-manuscript ms--3" aria-hidden="true" />

      {/* Top Navigation */}
      <header className="fournf-nav">
        <button
          type="button"
          className="btn-back"
          onClick={onBackToHome}
          id="btn-4nf-back-home"
        >
          ← Return to Yamaloka
        </button>

        <div className="fournf-nav__title">
          <span className="gold-badge">CHAPTER 5 • FOURTH NORMAL FORM (4NF)</span>
          <h1>Sage Vyasa & Infinite Combinations</h1>
        </div>

        <div className="fournf-nav__actions">
          {onOpenBCNF && (
            <button
              type="button"
              className="btn-chapter-jump"
              onClick={onOpenBCNF}
              title="Review Chapter 4"
            >
              ← BCNF Chamber
            </button>
          )}
          <span className="fournf-status-tag">📜 4NF Chamber</span>
        </div>
      </header>

      {/* Timeline Stepper */}
      <nav className="fournf-stepper" aria-label="Scene progress">
        {FOUR_NF_SCENES.map((s) => (
          <button
            type="button"
            key={s.number}
            className={`step-btn ${currentScene === s.number ? 'is-active' : ''} ${currentScene > s.number ? 'is-passed' : ''}`}
            onClick={() => goToScene(s.number)}
            id={`step-4nf-scene-${s.number}`}
          >
            <span className="step-num">{s.number}</span>
            <span className="step-label">{s.name}</span>
          </button>
        ))}
      </nav>

      {/* Main Stage */}
      <main className="fournf-stage">
        {/* Sage Dialogue Balloon */}
        <div className="dialogue-banner" role="region" aria-live="polite">
          <div className="dialogue-avatar">
            <img
              src={currentScene === 6 ? chitraScrollImg : vyasaImg}
              alt={currentScene === 6 ? 'Chitragupta' : 'Sage Vyasa'}
            />
          </div>
          <div className="dialogue-content">
            <span className="dialogue-speaker">
              {currentScene === 6 ? 'Chitragupta rejoices:' : 'Sage Vyasa proclaims:'}
            </span>
            <p className="dialogue-text">"{currentMeta.dialogue}"</p>
          </div>
          <div className="scene-indicator">
            Scene {currentScene} of 6
          </div>
        </div>

        {/* =========================================================
            SCENE 1: Enter Sage Vyasa's Chamber
           ========================================================= */}
        {currentScene === 1 && (
          <section className="scene-view scene-1">
            <div className="vyasa-hero-grid">
              <div className="vyasa-hero-card">
                <div className="vyasa-card-frame">
                  <img
                    src={vyasaImg}
                    alt="Sage Vyasa in Ancient Library"
                    className="vyasa-card-img"
                  />
                  <div className="vyasa-card-overlay">
                    <span className="vyasa-title-badge">📜 Master of Ancient Manuscripts</span>
                  </div>
                </div>
              </div>

              <div className="vyasa-welcome-panel">
                <span className="scene-eyebrow">The Ancient Library of Multi-Valued Facts</span>
                <h2>The Curse of the Infinite Combinations</h2>
                <p>
                  You step through the cosmic threshold into the grand library of <strong>Sage Vyasa</strong>.
                  Floating manuscripts hover between illuminated golden pillars.
                  Vyasa opens the ancient scroll <strong>TABLE C</strong> — and rows suddenly multiply in every direction!
                </p>

                <div className="info-box info-box--vyasa">
                  <strong>The 4NF Problem:</strong> A soul can know multiple languages, and a soul can have multiple skills.
                  These two collections of facts are <strong>completely independent</strong> of each other!
                  Yet storing them in a single table forces a massive Cartesian cross-product!
                </div>

                <div className="scene-actions">
                  <button
                    type="button"
                    className="btn btn--gold btn--lg"
                    onClick={() => {
                      setExpandingScroll(true)
                      playStamp()
                      setTimeout(() => setExpandingScroll(false), 1600)
                    }}
                    id="btn-expand-scroll"
                  >
                    Unroll Ancient Scroll 📜
                  </button>
                  <button
                    type="button"
                    className="btn btn--outline btn--lg"
                    onClick={nextScene}
                  >
                    Examine Combinations →
                  </button>
                </div>
              </div>
            </div>

            {/* Expanding Scroll Preview */}
            <div className={`expanding-scroll-card ${expandingScroll ? 'is-expanding' : ''}`}>
              <div className="scroll-title-bar">
                <span>📜 Ancient Ledger: TABLE C (Languages & Skills)</span>
                <span className="mvd-indicator">⚡ Independent Multivalued Facts</span>
              </div>
              <p className="scroll-note">
                Soul <code>S101</code> knows 2 languages (Tamil, English) and 2 skills (Singing, Painting).
                Because the table combines them, it forces <strong>2 × 2 = 4 rows</strong> just to record this simple truth!
              </p>
            </div>
          </section>
        )}

        {/* =========================================================
            SCENE 2: Discover the Multivalued Dependency
           ========================================================= */}
        {currentScene === 2 && (
          <section className="scene-view scene-2">
            <div className="scene-head">
              <span className="scene-eyebrow">Cartesian Cross-Product Discovery</span>
              <h2>Discovering the Multivalued Dependency (MVD)</h2>
              <p>
                Click any language (gold) or skill (blue) below to trace how every language is forcefully tied to every skill!
              </p>
            </div>

            {/* Interactive Selector Controls */}
            <div className="cross-product-workbench">
              <div className="workbench-controls">
                <div className="selector-group">
                  <span className="group-label">Languages (Independent Multivalue 1):</span>
                  <div className="chip-buttons">
                    {['Tamil', 'English'].map((lang) => (
                      <button
                        type="button"
                        key={lang}
                        className={`chip-btn chip-btn--gold ${activeLang === lang ? 'is-active' : ''}`}
                        onClick={() => {
                          setActiveLang(activeLang === lang ? null : lang)
                          setActiveSkill(null)
                          playSlice()
                        }}
                      >
                        {lang} 🌐
                      </button>
                    ))}
                  </div>
                </div>

                <div className="selector-group">
                  <span className="group-label">Skills (Independent Multivalue 2):</span>
                  <div className="chip-buttons">
                    {['Singing', 'Painting'].map((skill) => (
                      <button
                        type="button"
                        key={skill}
                        className={`chip-btn chip-btn--blue ${activeSkill === skill ? 'is-active' : ''}`}
                        onClick={() => {
                          setActiveSkill(activeSkill === skill ? null : skill)
                          setActiveLang(null)
                          playSlice()
                        }}
                      >
                        {skill} 🎨
                      </button>
                    ))}
                  </div>
                </div>
              </div>

              {/* Table C Display */}
              <div className="table-scroll-container">
                <table className="vyasa-table">
                  <thead>
                    <tr>
                      <th>SoulID</th>
                      <th className="th-lang">Language (Gold)</th>
                      <th className="th-skill">Skill (Blue)</th>
                      <th>Combination Link</th>
                    </tr>
                  </thead>
                  <tbody>
                    {TABLE_C_INITIAL.map((row, i) => {
                      const isLangMatch = activeLang === row.language
                      const isSkillMatch = activeSkill === row.skill
                      const isHighlighted = isLangMatch || isSkillMatch

                      return (
                        <tr
                          key={i}
                          className={isHighlighted ? 'row--mvd-highlight' : ''}
                        >
                          <td className="font-bold">{row.soulId}</td>
                          <td>
                            <span className={`pill pill--lang ${isLangMatch ? 'pill--lang-active' : ''}`}>
                              {row.language}
                            </span>
                          </td>
                          <td>
                            <span className={`pill pill--skill ${isSkillMatch ? 'pill--skill-active' : ''}`}>
                              {row.skill}
                            </span>
                          </td>
                          <td>
                            <span className="combo-tag">
                              {row.language} + {row.skill}
                            </span>
                          </td>
                        </tr>
                      )
                    })}
                  </tbody>
                </table>
              </div>

              {/* MVD Formula Banner */}
              <div className="mvd-alert-card">
                <div className="mvd-header">
                  <span className="mvd-badge">MULTIVALUED DEPENDENCY DETECTED</span>
                  <h4>SoulID ↠ Language &nbsp;&nbsp;|&nbsp;&nbsp; SoulID ↠ Skill</h4>
                </div>
                <p>
                  Because a soul’s language does NOT determine their skill (and vice-versa), they are independent.
                  A table containing two independent multivalued dependencies must store the full Cartesian cross-product!
                </p>
              </div>
            </div>

            <div className="scene-actions text-center">
              <button
                type="button"
                className="btn btn--gold btn--lg"
                onClick={nextScene}
              >
                Witness The Multiplying Rows 💥 →
              </button>
            </div>
          </section>
        )}

        {/* =========================================================
            SCENE 3: The Curse of the Multiplying Rows
           ========================================================= */}
        {currentScene === 3 && (
          <section className="scene-view scene-3">
            <div className="scene-head">
              <span className="scene-eyebrow">Combinatorial Explosion</span>
              <h2>The Curse of the Multiplying Rows</h2>
              <p>
                Watch what happens to table size when soul <code>S101</code> learns new languages or skills!
              </p>
            </div>

            {/* Sub-modes bar */}
            <div className="explosion-modes-bar">
              <button
                type="button"
                className={`mode-tab ${explosionMode === 'initial' ? 'is-active' : ''}`}
                onClick={() => {
                  setExplosionMode('initial')
                  playChime()
                }}
              >
                1. Initial (2 Languages × 2 Skills = 4 Rows)
              </button>
              <button
                type="button"
                className={`mode-tab ${explosionMode === 'hindi' ? 'is-active' : ''}`}
                onClick={() => {
                  setExplosionMode('hindi')
                  playSlice()
                }}
              >
                2. Add Hindi (3 Languages × 2 Skills = 6 Rows)
              </button>
              <button
                type="button"
                className={`mode-tab ${explosionMode === 'twelve' ? 'is-active' : ''}`}
                onClick={() => {
                  setExplosionMode('twelve')
                  playStamp()
                }}
              >
                3. The Explosion (3 Languages × 4 Skills = 12 Rows!)
              </button>
            </div>

            {/* Dynamic Table Display */}
            <div className="table-scroll-container">
              <table className="vyasa-table table--explosion">
                <thead>
                  <tr>
                    <th>Row #</th>
                    <th>SoulID</th>
                    <th className="th-lang">Language</th>
                    <th className="th-skill">Skill</th>
                  </tr>
                </thead>
                <tbody>
                  {(explosionMode === 'initial'
                    ? TABLE_C_INITIAL
                    : explosionMode === 'hindi'
                      ? TABLE_C_WITH_HINDI
                      : TABLE_C_EXPLOSION_12
                  ).map((r, i) => (
                    <tr
                      key={i}
                      className={
                        explosionMode === 'hindi' && r.language === 'Hindi'
                          ? 'row--new-highlight'
                          : ''
                      }
                    >
                      <td className="row-num">#{i + 1}</td>
                      <td className="font-bold">{r.soulId}</td>
                      <td>
                        <span className="pill pill--lang">{r.language}</span>
                      </td>
                      <td>
                        <span className="pill pill--skill">{r.skill}</span>
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>

            {/* Anomaly Callout Box */}
            <div className="explosion-callout-card">
              <div className="callout-badge">
                {explosionMode === 'twelve' ? '🚨 MASSIVE REDUNDANCY' : '⚠️ UNNECESSARY ROW DUPLICATION'}
              </div>
              <h3>
                {explosionMode === 'initial' && '4 Rows for 2 Languages & 2 Skills'}
                {explosionMode === 'hindi' && 'Add 1 Language (Hindi) ➔ Must Add 2 Extra Rows!'}
                {explosionMode === 'twelve' && '3 Languages × 4 Skills = 12 Rows!'}
              </h3>
              <p>
                {explosionMode === 'twelve'
                  ? 'If a soul learns 10 languages and 10 skills, you would need 10 × 10 = 100 ROWS just to store 20 pieces of information! 4NF exists to eliminate this Cartesian madness.'
                  : 'Whenever you add a new language, you are forced to replicate it for every existing skill. Storing independent multivalued facts together is a colossal waste of celestial storage!'}
              </p>
            </div>

            <div className="scene-actions text-center">
              <button
                type="button"
                className="btn btn--gold btn--lg"
                onClick={nextScene}
              >
                Watch Vyasa Separate The Lists ⚡ →
              </button>
            </div>
          </section>
        )}

        {/* =========================================================
            SCENE 4: Sage Vyasa Separates the Independent Lists
           ========================================================= */}
        {currentScene === 4 && (
          <section className="scene-view scene-4">
            <div className="scene-head">
              <span className="scene-eyebrow">The Signature 4NF Transformation</span>
              <h2>Sage Vyasa Separates the Independent Lists</h2>
              <p>
                Sage Vyasa raises his sacred manuscript. Time freezes! The cross-product connections dissolve into golden particles.
                The table splits into two clean, independent tables!
              </p>
            </div>

            <div className="transformation-split-stage">
              <div className={`table-split-grid ${isSeparated ? 'is-separated-active' : ''}`}>
                {/* TABLE 1: SOUL_LANGUAGE */}
                <div className="stone-tablet tablet-language">
                  <div className="tablet-header">
                    <span className="tablet-tag">TABLE 1: INDEPENDENT MVD 1</span>
                    <h3>SOUL_LANGUAGE</h3>
                    <span className="tablet-pk">Composite Key: (SoulID 🔑, Language 🔑)</span>
                  </div>
                  <div className="tablet-content">
                    <table className="vyasa-table compact-table">
                      <thead>
                        <tr>
                          <th>SoulID 🔑</th>
                          <th className="th-lang">Language 🔑</th>
                        </tr>
                      </thead>
                      <tbody>
                        {SOUL_LANGUAGE_DATA.map((r, i) => (
                          <tr key={i}>
                            <td className="font-bold">{r.soulId}</td>
                            <td><span className="pill pill--lang">{r.language}</span></td>
                          </tr>
                        ))}
                      </tbody>
                    </table>
                  </div>
                  <div className="table-row-count">Only 3 Rows!</div>
                </div>

                {/* Separation Divide */}
                <div className="separation-divider" aria-label="Separation divider">
                  <span className="divider-icon">⚡</span>
                  <span className="divider-label">Independent Storage</span>
                </div>

                {/* TABLE 2: SOUL_SKILL */}
                <div className="stone-tablet tablet-skill">
                  <div className="tablet-header">
                    <span className="tablet-tag">TABLE 2: INDEPENDENT MVD 2</span>
                    <h3>SOUL_SKILL</h3>
                    <span className="tablet-pk">Composite Key: (SoulID 🔑, Skill 🔑)</span>
                  </div>
                  <div className="tablet-content">
                    <table className="vyasa-table compact-table">
                      <thead>
                        <tr>
                          <th>SoulID 🔑</th>
                          <th className="th-skill">Skill 🔑</th>
                        </tr>
                      </thead>
                      <tbody>
                        {SOUL_SKILL_DATA.map((r, i) => (
                          <tr key={i}>
                            <td className="font-bold">{r.soulId}</td>
                            <td><span className="pill pill--skill">{r.skill}</span></td>
                          </tr>
                        ))}
                      </tbody>
                    </table>
                  </div>
                  <div className="table-row-count">Only 4 Rows!</div>
                </div>
              </div>

              {/* Victory Seal Card */}
              <div className="fournf-victory-card">
                <div className="seal-badge">FOURTH NORMAL FORM ACHIEVED 🌟</div>
                <h3>From 12 Rows Down to 7 Rows! (3 + 4 = 7)</h3>
                <p>
                  No more Cartesian product multiplication. Adding a language requires <strong>1 new row</strong> in <code>SOUL_LANGUAGE</code>.
                  Adding a skill requires <strong>1 new row</strong> in <code>SOUL_SKILL</code>.
                </p>
              </div>
            </div>

            <div className="scene-actions text-center">
              <button
                type="button"
                className="btn btn--gold btn--lg"
                onClick={nextScene}
              >
                Become the Sage: Solve the Challenge 🎮 →
              </button>
            </div>
          </section>
        )}

        {/* =========================================================
            SCENE 5: The Audience Becomes the Sage
           ========================================================= */}
        {currentScene === 5 && (
          <section className="scene-view scene-5">
            <div className="scene-head">
              <span className="scene-eyebrow">Interactive 4NF Challenge</span>
              <h2>The Audience Becomes the Sage</h2>
              <p>
                Can you free the languages and skills from the curse of combinations?
                Click a card below, then assign it into <strong>SOUL_LANGUAGE</strong> or <strong>SOUL_SKILL</strong>!
              </p>
            </div>

            {/* Cards Pool */}
            <div className="cards-pool-panel">
              <span className="pool-label">Unassigned Attributes:</span>
              <div className="pool-cards">
                {CHALLENGE_CARDS_4NF.map((card) => {
                  const isPlaced =
                    placedLangCards.includes(card.id) || placedSkillCards.includes(card.id)
                  const isSelected = selectedCard?.id === card.id

                  return (
                    <button
                      type="button"
                      key={card.id}
                      className={`challenge-card-btn ${isSelected ? 'is-selected' : ''} ${isPlaced ? 'is-placed' : ''}`}
                      onClick={() => {
                        if (!isPlaced) {
                          setSelectedCard(card)
                          playChime()
                        }
                      }}
                      disabled={isPlaced}
                    >
                      <b>{card.name}</b>
                      {isPlaced && <span className="placed-check">✓</span>}
                    </button>
                  )
                })}
              </div>
              {selectedCard && (
                <div className="selected-card-hint">
                  Selected: <strong>{selectedCard.name}</strong> — Click the correct destination table below!
                </div>
              )}
            </div>

            {/* Drop Target Arena */}
            <div className={`challenge-arena-grid ${challengeShake ? 'shake-anim' : ''}`}>
              {/* Target 1: SOUL_LANGUAGE */}
              <div
                className={`arena-target-box target--lang ${selectedCard ? 'is-listening' : ''}`}
                onClick={() => handleAssignCard('language')}
                role="button"
                tabIndex={0}
              >
                <div className="target-head">
                  <h4>TABLE: SOUL_LANGUAGE</h4>
                  <span>Drop all language values here</span>
                </div>
                <div className="target-slots">
                  {['tamil', 'english', 'hindi'].map((id) => (
                    <div key={id} className="slot-pill">
                      {placedLangCards.includes(id) ? (
                        <span className="pill pill--lang pill--placed">
                          {id.charAt(0).toUpperCase() + id.slice(1)} ✓
                        </span>
                      ) : (
                        <span className="slot-empty">Drop Language</span>
                      )}
                    </div>
                  ))}
                </div>
              </div>

              {/* Target 2: SOUL_SKILL */}
              <div
                className={`arena-target-box target--skill ${selectedCard ? 'is-listening' : ''}`}
                onClick={() => handleAssignCard('skill')}
                role="button"
                tabIndex={0}
              >
                <div className="target-head">
                  <h4>TABLE: SOUL_SKILL</h4>
                  <span>Drop all skill values here</span>
                </div>
                <div className="target-slots">
                  {['singing', 'painting', 'dancing'].map((id) => (
                    <div key={id} className="slot-pill">
                      {placedSkillCards.includes(id) ? (
                        <span className="pill pill--skill pill--placed">
                          {id.charAt(0).toUpperCase() + id.slice(1)} ✓
                        </span>
                      ) : (
                        <span className="slot-empty">Drop Skill</span>
                      )}
                    </div>
                  ))}
                </div>
              </div>
            </div>

            {/* Victory Certificate */}
            {challengeComplete && (
              <div className="fournf-complete-banner">
                <div className="victory-icon">🌟</div>
                <h3>WISDOM ACHIEVED — 4NF!</h3>
                <p>
                  You have liberated the database from the curse of multi-valued combinations!
                  Languages and skills are now stored in clean, independent relations.
                </p>
                <div className="victory-actions">
                  <button
                    type="button"
                    className="btn btn--outline"
                    onClick={handleResetChallenge}
                  >
                    Play Again ↺
                  </button>
                  <button
                    type="button"
                    className="btn btn--gold"
                    onClick={nextScene}
                  >
                    The Final Ledger: All Normal Forms Complete 🌟 →
                  </button>
                </div>
              </div>
            )}
          </section>
        )}

        {/* =========================================================
            SCENE 6: The Final Ledger — All Normal Forms Complete
           ========================================================= */}
        {currentScene === 6 && (
          <section className="scene-view scene-6">
            <div className="grand-finale-stage">
              <span className="finale-eyebrow">Cosmic Normalization Reckoning</span>
              <h2>The Great Normalization Journey — Complete!</h2>
              <p className="finale-desc">
                From a messy unnormalized spreadsheet to an immortal, pure, and anomaly-free relational cosmos!
              </p>

              {/* Five Sages Gallery */}
              <div className="sages-pantheon-gallery">
                <div className="sage-badge-card">
                  <img src={agastyaImg} alt="Sage Agastya" />
                  <span className="sage-name">Sage Agastya</span>
                  <span className="nf-seal seal--done">1NF ✓</span>
                </div>
                <div className="sage-badge-card">
                  <img src={yamaImg} alt="Lord Yamraj" />
                  <span className="sage-name">Lord Yamraj</span>
                  <span className="nf-seal seal--done">2NF ✓</span>
                </div>
                <div className="sage-badge-card">
                  <img src={bhriguImg} alt="Sage Bhrigu" />
                  <span className="sage-name">Sage Bhrigu</span>
                  <span className="nf-seal seal--done">3NF ✓</span>
                </div>
                <div className="sage-badge-card">
                  <img src={naradaImg} alt="Sage Narada" />
                  <span className="sage-name">Sage Narada</span>
                  <span className="nf-seal seal--done">BCNF ✓</span>
                </div>
                <div className="sage-badge-card">
                  <img src={vyasaImg} alt="Sage Vyasa" />
                  <span className="sage-name">Sage Vyasa</span>
                  <span className="nf-seal seal--done">4NF ✓</span>
                </div>
              </div>

              {/* Chitragupta's Divine Transformed Ledger */}
              <div className="chitragupta-rejoice-card">
                <div className="ledger-img-wrap">
                  <img src={chitraScrollImg} alt="Purified Divine Ledger" />
                </div>
                <div className="ledger-content">
                  <span className="divine-tag">PURIFIED RELATIONAL ENGINE</span>
                  <h3>"Finally, my scroll is clean! Dhanyavaad, sages. Even Yamraj has no complaints!"</h3>
                  <div className="nf-badges-row">
                    <span className="gold-check-pill">1NF: Atomic Cells</span>
                    <span className="gold-check-pill">2NF: No Partial Dependencies</span>
                    <span className="gold-check-pill">3NF: No Transitive Dependencies</span>
                    <span className="gold-check-pill">BCNF: Superkey Determinants</span>
                    <span className="gold-check-pill">4NF: No Multivalued Dependencies</span>
                  </div>
                </div>
              </div>

              <div className="scene-actions text-center">
                <button
                  type="button"
                  className="btn btn--gold btn--lg"
                  onClick={onBackToHome}
                  id="btn-revisit-ledger"
                >
                  REVISIT THE LEDGER 🌟
                </button>
              </div>
            </div>
          </section>
        )}

        {/* Bottom Stepper & Scene Controls */}
        <footer className="fournf-footer">
          <button
            type="button"
            className="btn btn--outline"
            onClick={prevScene}
            disabled={currentScene === 1}
          >
            ← Previous Scene
          </button>

          <span className="footer-scene-title">
            Scene {currentScene}: {currentMeta.name} — {currentMeta.subtitle}
          </span>

          {currentScene < 6 ? (
            <button
              type="button"
              className="btn btn--gold"
              onClick={nextScene}
            >
              Next Scene <ArrowRight size={14} />
            </button>
          ) : (
            <button
              type="button"
              className="btn btn--gold"
              onClick={onBackToHome}
            >
              Return Home ✓
            </button>
          )}
        </footer>
      </main>
    </div>
  )
}
