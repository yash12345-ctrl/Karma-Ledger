import { useEffect, useState } from 'react'
import chitraScroll from '../assets/chitra_scroll.jpg'
import agastyaImg from '../assets/1nf.jpg'
import PatalLokAtmosphere from './PatalLokAtmosphere'
import {
  MESSY_DEEDS_DATA,
  MINI_GAME_CHALLENGE,
  SCENES,
  type SceneNumber,
} from '../data/oneNFData'
import { playChime, playSlice, playStamp, playVictoryChord } from '../utils/soundEffects'
import { ArrowRight } from './Icons'
import './OneNFPage.css'

interface OneNFPageProps {
  onBackToHome: () => void
  onOpen2NF?: () => void
}

export default function OneNFPage({ onBackToHome, onOpen2NF }: OneNFPageProps) {
  const [currentScene, setCurrentScene] = useState<SceneNumber>(1)
  const [isComparing, setIsComparing] = useState(false)
  const [tableCAtomized, setTableCAtomized] = useState(false)
  const [querySimState, setQuerySimState] = useState<'idle' | 'searching' | 'failed' | 'success'>('idle')

  // Scene 5 Mini-game state
  const [atomizedDeeds, setAtomizedDeeds] = useState<string[]>([])
  const [activeDragItem, setActiveDragItem] = useState<string | null>(null)
  const [gameCompleted, setGameCompleted] = useState(false)

  // Play special sound effects per scene
  useEffect(() => {
    if (currentScene === 3) {
      setTimeout(() => playSlice(), 500)
    } else if (currentScene === 6) {
      setTimeout(() => playStamp(), 600)
    }
  }, [currentScene])

  const nextScene = () => {
    if (currentScene < 6) {
      playChime()
      setCurrentScene((prev) => (prev + 1) as SceneNumber)
    }
  }

  const prevScene = () => {
    if (currentScene > 1) {
      playChime()
      setCurrentScene((prev) => (prev - 1) as SceneNumber)
    }
  }

  const goToScene = (num: SceneNumber) => {
    playChime()
    setCurrentScene(num)
  }

  // Mini-game actions
  const handleAtomizeDeed = (deed: string) => {
    if (!atomizedDeeds.includes(deed)) {
      playSlice()
      const updated = [...atomizedDeeds, deed]
      setAtomizedDeeds(updated)
      if (updated.length === MINI_GAME_CHALLENGE.deedList.length) {
        setGameCompleted(true)
        setTimeout(() => playVictoryChord(), 400)
      }
    }
  }

  const handleResetGame = () => {
    setAtomizedDeeds([])
    setGameCompleted(false)
  }

  const currentMeta = SCENES.find((s) => s.number === currentScene)!

  return (
    <div className="onenf-page">
      {/* Live Patal Lok Subterranean Atmospheric Engine */}
      <PatalLokAtmosphere />

      {/* Top Navigation Bar */}
      <header className="onenf-nav">
        <button
          type="button"
          className="btn-back"
          onClick={onBackToHome}
          id="btn-1nf-back-home"
        >
          ← Return to Yamaloka
        </button>

        <div className="onenf-nav__title">
          <span className="gold-badge">CHAPTER 1 • ATOMICITY</span>
          <h1>Sage Agastya's Realm</h1>
        </div>

        <div className="onenf-nav__controls" />
      </header>

      {/* Timeline Stepper */}
      <nav className="onenf-stepper" aria-label="Scene progress">
        {SCENES.map((s) => (
          <button
            type="button"
            key={s.number}
            className={`step-btn ${currentScene === s.number ? 'is-active' : ''} ${currentScene > s.number ? 'is-passed' : ''}`}
            onClick={() => goToScene(s.number)}
            id={`step-scene-${s.number}`}
          >
            <span className="step-num">{s.number}</span>
            <span className="step-label">{s.name}</span>
          </button>
        ))}
      </nav>

      {/* Main Interactive Stage Container */}
      <main className="onenf-stage">
        {/* Dialogue Balloon Banner */}
        <div className="dialogue-banner" role="region" aria-live="polite">
          <div className="dialogue-avatar">
            <img src={chitraScroll} alt="Chitragupta" />
          </div>
          <div className="dialogue-content">
            <span className="dialogue-speaker">Chitragupta says:</span>
            <p className="dialogue-text">"{currentMeta.dialogue}"</p>
          </div>
          <div className="scene-indicator">
            Scene {currentScene} of 6
          </div>
        </div>

        {/* =========================================================
            SCENE 1: Chitragupta's Record Room
           ========================================================= */}
        {currentScene === 1 && (
          <section className="scene-view scene-1">
            <div className="scene-1__grid">
              <div className="chitra-hero-card">
                <div className="chitra-hero-card__glow" />
                <img
                  src={chitraScroll}
                  alt="Chitragupta with sacred scroll"
                  className="chitra-hero-img"
                />
                <div className="chitra-hero-badge">
                  <span>Grand Divine Scribe</span>
                </div>
              </div>

              <div className="scene-1__content">
                <span className="scene-eyebrow">Cosmic Library of Yamaloka</span>
                <h2>The Sacred Scrolls are in Disarray!</h2>
                <p>
                  For eons, Chitragupta recorded human deeds using traditional scrolls. But as the cosmic population swelled to billions, multiple deeds were written into single cramped parchment boxes!
                </p>
                <div className="info-box info-box--warning">
                  <strong>The Crisis:</strong> Comma-separated deeds and nested arrays have turned Yamaloka's judgment queries into an unbearable bottleneck!
                </div>

                <div className="scene-actions">
                  <button
                    type="button"
                    className="btn btn--gold btn--lg"
                    onClick={nextScene}
                    id="btn-inspect-scroll"
                  >
                    Unroll the Messy Scroll <ArrowRight size={18} />
                  </button>
                </div>
              </div>
            </div>
          </section>
        )}

        {/* =========================================================
            SCENE 2: The Messy Database (UNF)
           ========================================================= */}
        {currentScene === 2 && (
          <section className="scene-view scene-2">
            <div className="scene-head">
              <span className="scene-eyebrow">Table: karma_ledger (Unnormalized Form - UNF)</span>
              <h2>Crammed Records in a Single Parchment Cell</h2>
              <p>Look at soul <strong>S102 (Meera Bai)</strong>. Notice how three separate karma deeds are crammed into a single cell!</p>
            </div>

            <div className="scroll-wrapper">
              <div className="scroll-roller scroll-roller--top" />
              <div className="parchment-table-container">
                <table className="parchment-table">
                  <thead>
                    <tr>
                      <th>Soul ID</th>
                      <th>Devotee Name</th>
                      <th>Karma Deeds Done (Multi-Valued!)</th>
                      <th>Destination</th>
                    </tr>
                  </thead>
                  <tbody>
                    {MESSY_DEEDS_DATA.map((row) => {
                      const isMulti = row.deeds.length > 1
                      return (
                        <tr key={row.soulId} className={isMulti ? 'row-hazard' : ''}>
                          <td className="cell-id"><strong>{row.soulId}</strong></td>
                          <td className="cell-name">{row.name}</td>
                          <td className={`cell-deeds ${isMulti ? 'cell-non-atomic' : 'cell-atomic'}`}>
                            {isMulti ? (
                              <div className="non-atomic-container">
                                <span className="danger-chip">⚠️ VIOLATION: 3 VALUES IN 1 CELL</span>
                                <div className="crammed-pills">
                                  {row.deeds.map((d, idx) => (
                                    <span key={idx} className="crammed-pill">{d}</span>
                                  ))}
                                </div>
                              </div>
                            ) : (
                              <div className="atomic-single">
                                <span className="check-badge">✓</span> {row.deeds[0]}
                              </div>
                            )}
                          </td>
                          <td className="cell-dest"><span className="dest-tag dest-heaven">{row.destination}</span></td>
                        </tr>
                      )
                    })}
                  </tbody>
                </table>
              </div>
              <div className="scroll-roller scroll-roller--bottom" />
            </div>

            {/* Why it fails explanation */}
            <div className="analysis-card">
              <h3>Why is this a Relational Database Violation?</h3>
              <ul>
                <li><strong>No Atomicity:</strong> Relational fields must contain indivisible scalar data, never lists or sets.</li>
                <li><strong>Query Failure:</strong> A query for <code>WHERE deed = 'Fed hungry orphan children'</code> fails or requires costly regex full-table scans.</li>
                <li><strong>Indexing Impossible:</strong> Standard B-Tree indices cannot index individual comma items reliably.</li>
              </ul>
            </div>

            <div className="scene-actions">
              <button type="button" className="btn btn--outline" onClick={prevScene}>
                ← Back
              </button>
              <button
                type="button"
                className="btn btn--gold btn--lg"
                onClick={nextScene}
                id="btn-invoke-1nf"
              >
                Invoke 1NF Rule & Atomize <ArrowRight size={18} />
              </button>
            </div>
          </section>
        )}

        {/* =========================================================
            SCENE 3: Magical 1NF Transformation
           ========================================================= */}
        {currentScene === 3 && (
          <section className="scene-view scene-3">
            <div className="scene-head">
              <span className="scene-eyebrow">Sage Agastya's Divine Principle</span>
              <h2>The Miracle of 1NF: Splitting Into Atomic Rows</h2>
              <p>Every individual deed now commands its own row, with composite primary key: <code>(Soul_ID + Deed)</code>.</p>
            </div>

            <div className="toggle-compare-bar">
              <span>View Mode:</span>
              <button
                type="button"
                className={`btn-toggle ${!isComparing ? 'is-active' : ''}`}
                onClick={() => setIsComparing(false)}
              >
                ✨ 1NF Normalized Form
              </button>
              <button
                type="button"
                className={`btn-toggle ${isComparing ? 'is-active' : ''}`}
                onClick={() => setIsComparing(true)}
              >
                ⚠️ Original UNF (Before)
              </button>
            </div>

            <div className="scroll-wrapper">
              <div className="parchment-table-container">
                <table className="parchment-table table-transformed">
                  <thead>
                    <tr>
                      <th>Soul ID (PK Part 1)</th>
                      <th>Devotee Name</th>
                      <th>Atomic Karma Deed (PK Part 2)</th>
                      <th>Destination</th>
                      <th>Atomicity Status</th>
                    </tr>
                  </thead>
                  <tbody>
                    {!isComparing ? (
                      <>
                        <tr className="row-atomic">
                          <td><strong>S101</strong></td>
                          <td>Ramesh Kumar</td>
                          <td>Donated food to 1,000 pilgrims</td>
                          <td><span className="dest-tag dest-heaven">HEAVEN</span></td>
                          <td><span className="tag-ok">✓ 1 Value</span></td>
                        </tr>

                        {/* Meera Bai's 3 atomic rows */}
                        <tr className="row-split row-split--1 animate-slide-in">
                          <td className="key-highlight"><strong>S102</strong></td>
                          <td>Meera Bai</td>
                          <td className="deed-highlight">Saved wounded deer in forest</td>
                          <td><span className="dest-tag dest-heaven">HEAVEN</span></td>
                          <td><span className="tag-ok tag-gold">✓ Atomized 1/3</span></td>
                        </tr>
                        <tr className="row-split row-split--2 animate-slide-in">
                          <td className="key-highlight"><strong>S102</strong></td>
                          <td>Meera Bai</td>
                          <td className="deed-highlight">Fed hungry orphan children</td>
                          <td><span className="dest-tag dest-heaven">HEAVEN</span></td>
                          <td><span className="tag-ok tag-gold">✓ Atomized 2/3</span></td>
                        </tr>
                        <tr className="row-split row-split--3 animate-slide-in">
                          <td className="key-highlight"><strong>S102</strong></td>
                          <td>Meera Bai</td>
                          <td className="deed-highlight">Dug freshwater village pond</td>
                          <td><span className="dest-tag dest-heaven">HEAVEN</span></td>
                          <td><span className="tag-ok tag-gold">✓ Atomized 3/3</span></td>
                        </tr>

                        <tr className="row-atomic">
                          <td><strong>S103</strong></td>
                          <td>Harish Verma</td>
                          <td>Planted sacred banyan grove</td>
                          <td><span className="dest-tag dest-heaven">HEAVEN</span></td>
                          <td><span className="tag-ok">✓ 1 Value</span></td>
                        </tr>
                      </>
                    ) : (
                      // UNF View
                      MESSY_DEEDS_DATA.map((row) => (
                        <tr key={row.soulId} className={row.deeds.length > 1 ? 'row-hazard' : ''}>
                          <td><strong>{row.soulId}</strong></td>
                          <td>{row.name}</td>
                          <td>{row.deeds.join(' | ')}</td>
                          <td><span className="dest-tag dest-heaven">{row.destination}</span></td>
                          <td>{row.deeds.length > 1 ? <span className="tag-bad">✕ Not Atomic</span> : <span className="tag-ok">✓ 1 Value</span>}</td>
                        </tr>
                      ))
                    )}
                  </tbody>
                </table>
              </div>
            </div>

            <div className="agastya-quote-card">
              <img src={agastyaImg} alt="Sage Agastya" className="agastya-thumb" />
              <div>
                <h4>Sage Agastya's 1NF Law:</h4>
                <p>
                  "A relation is in First Normal Form if and only if every attribute domain contains only atomic (indivisible) values, and no repeating groups exist."
                </p>
              </div>
            </div>

            <div className="scene-actions">
              <button type="button" className="btn btn--outline" onClick={prevScene}>
                ← Back
              </button>
              <button
                type="button"
                className="btn btn--gold btn--lg"
                onClick={nextScene}
                id="btn-goto-scene-4"
              >
                Inspect Table C: Languages <ArrowRight size={18} />
              </button>
            </div>
          </section>
        )}

        {/* =========================================================
            SCENE 4: The Language Problem
           ========================================================= */}
        {currentScene === 4 && (
          <section className="scene-view scene-4">
            <div className="scene-head">
              <span className="scene-eyebrow">Table C: Soul Devotee Languages</span>
              <h2>The Comma-Separated String Dilemma</h2>
              <p>Soul <strong>S105 (Ananya)</strong> has <code>"Tamil, English, Sanskrit"</code> stored as a single string.</p>
            </div>

            <div className="query-demo-box">
              <div className="query-demo-box__header">
                <span>SQL Query Terminal</span>
                <span className="conn-status">Connected: yamaloka_db</span>
              </div>
              <div className="query-demo-box__body">
                <code>
                  SELECT * FROM soul_languages WHERE language = 'English';
                </code>
                <div className="query-actions">
                  <button
                    type="button"
                    className="btn btn--sm btn--gold"
                    onClick={() => {
                      setQuerySimState('searching')
                      setTimeout(() => {
                        setQuerySimState(!tableCAtomized ? 'failed' : 'success')
                        if (tableCAtomized) playVictoryChord()
                      }, 800)
                    }}
                  >
                    ▶ Execute Query
                  </button>
                  <button
                    type="button"
                    className="btn btn--sm btn--outline"
                    onClick={() => {
                      playSlice()
                      setTableCAtomized(!tableCAtomized)
                      setQuerySimState('idle')
                    }}
                  >
                    ⚡ {tableCAtomized ? 'Revert to Comma String' : 'Split into Atomic Rows'}
                  </button>
                </div>

                {querySimState === 'searching' && (
                  <p className="query-msg query-msg--searching">Searching Yamaloka database...</p>
                )}
                {querySimState === 'failed' && (
                  <div className="query-msg query-msg--err">
                    <strong>⚠️ 0 Rows Returned (Query Mismatched):</strong>
                    <span>The database looked for exact match "English", but found string blob "Tamil, English, Sanskrit". To match it, you'd need a slow <code>LIKE '%English%'</code> scan!</span>
                  </div>
                )}
                {querySimState === 'success' && (
                  <div className="query-msg query-msg--ok">
                    <strong>✓ 1 Row Returned in 0.001s:</strong>
                    <span>Found exact index match: <code>S105 | Ananya Sharma | English</code>. 1NF allows high-speed indexing!</span>
                  </div>
                )}
              </div>
            </div>

            {/* Table C Display */}
            <div className="scroll-wrapper">
              <div className="parchment-table-container">
                <table className="parchment-table">
                  <thead>
                    <tr>
                      <th>Soul ID</th>
                      <th>Name</th>
                      <th>Language Attribute</th>
                      <th>Indexable Status</th>
                    </tr>
                  </thead>
                  <tbody>
                    {!tableCAtomized ? (
                      <tr className="row-hazard">
                        <td><strong>S105</strong></td>
                        <td>Ananya Sharma</td>
                        <td>
                          <span className="danger-chip">"Tamil, English, Sanskrit"</span>
                        </td>
                        <td><span className="tag-bad">✕ Full-table Scan Required</span></td>
                      </tr>
                    ) : (
                      <>
                        <tr className="row-split animate-slide-in">
                          <td><strong>S105</strong></td>
                          <td>Ananya Sharma</td>
                          <td><span className="tag-ok">Tamil</span></td>
                          <td><span className="tag-ok">✓ B-Tree Indexed</span></td>
                        </tr>
                        <tr className="row-split animate-slide-in">
                          <td><strong>S105</strong></td>
                          <td>Ananya Sharma</td>
                          <td><span className="tag-ok">English</span></td>
                          <td><span className="tag-ok">✓ B-Tree Indexed</span></td>
                        </tr>
                        <tr className="row-split animate-slide-in">
                          <td><strong>S105</strong></td>
                          <td>Ananya Sharma</td>
                          <td><span className="tag-ok">Sanskrit</span></td>
                          <td><span className="tag-ok">✓ B-Tree Indexed</span></td>
                        </tr>
                      </>
                    )}
                  </tbody>
                </table>
              </div>
            </div>

            <div className="scene-actions">
              <button type="button" className="btn btn--outline" onClick={prevScene}>
                ← Back
              </button>
              <button
                type="button"
                className="btn btn--gold btn--lg"
                onClick={nextScene}
                id="btn-goto-repair-game"
              >
                Help Repair the Scroll (Challenge) <ArrowRight size={18} />
              </button>
            </div>
          </section>
        )}

        {/* =========================================================
            SCENE 5: Repair the Scroll (Interactive Drag-and-Drop)
           ========================================================= */}
        {currentScene === 5 && (
          <section className="scene-view scene-5">
            <div className="scene-head">
              <span className="scene-eyebrow">Interactive 1NF Mini-Game</span>
              <h2>Repair Devendra's Broken Scroll</h2>
              <p>
                Soul <strong>S108 (Devendra Nath)</strong> has three noble deeds trapped inside a single comma cell. Drag or click each deed below to separate it into its own atomic row!
              </p>
            </div>

            <div className="game-board">
              {/* Source multi-valued pool */}
              <div className="game-pool">
                <div className="game-pool__header">
                  <span>Non-Atomic Source Cell: <code>Soul S108</code></span>
                  <small>{MINI_GAME_CHALLENGE.deedList.length - atomizedDeeds.length} deeds remaining</small>
                </div>
                <div className="game-pool__items">
                  {MINI_GAME_CHALLENGE.deedList.map((deed) => {
                    const isDone = atomizedDeeds.includes(deed)
                    return (
                      <div
                        key={deed}
                        className={`deed-chip-draggable ${isDone ? 'is-done' : ''}`}
                        draggable={!isDone}
                        onDragStart={() => setActiveDragItem(deed)}
                        onClick={() => handleAtomizeDeed(deed)}
                        title="Click or drag to atomize"
                      >
                        <span className="grip">⋮⋮</span>
                        <span className="text">{deed}</span>
                        <button type="button" className="btn-atomize">
                          {isDone ? '✓ Atomized' : '+ Slice into Row'}
                        </button>
                      </div>
                    )
                  })}
                </div>
              </div>

              {/* Target Atomic Ledger Drop Zone */}
              <div
                className={`game-ledger ${gameCompleted ? 'game-ledger--completed' : ''}`}
                onDragOver={(e) => e.preventDefault()}
                onDrop={() => {
                  if (activeDragItem) {
                    handleAtomizeDeed(activeDragItem)
                    setActiveDragItem(null)
                  }
                }}
              >
                <div className="game-ledger__header">
                  <span>1NF Atomic Target Table</span>
                  <span className="score-badge">
                    {atomizedDeeds.length} / {MINI_GAME_CHALLENGE.deedList.length} Atomic Rows
                  </span>
                </div>

                <div className="game-ledger__table-wrap">
                  <table className="parchment-table">
                    <thead>
                      <tr>
                        <th>Soul ID</th>
                        <th>Name</th>
                        <th>Individual Atomic Deed</th>
                        <th>Status</th>
                      </tr>
                    </thead>
                    <tbody>
                      {atomizedDeeds.length === 0 ? (
                        <tr>
                          <td colSpan={4} className="empty-drop-zone">
                            <span>Drop or click deeds from above to populate atomic rows...</span>
                          </td>
                        </tr>
                      ) : (
                        atomizedDeeds.map((deed, i) => (
                          <tr key={i} className="row-atomic animate-slide-in">
                            <td><strong>S108</strong></td>
                            <td>Devendra Nath</td>
                            <td className="deed-text-highlight">{deed}</td>
                            <td><span className="tag-ok">✓ Atomic Row {i + 1}</span></td>
                          </tr>
                        ))
                      )}
                    </tbody>
                  </table>
                </div>

                {gameCompleted && (
                  <div className="game-success-banner animate-fade-in">
                    <div className="sparkle-icon">✨</div>
                    <div>
                      <strong>Sacred Scroll Repaired!</strong>
                      <p>All three deeds are now atomic rows with zero multi-valued groups.</p>
                    </div>
                  </div>
                )}
              </div>
            </div>

            <div className="game-footer-actions">
              <button type="button" className="btn btn--outline" onClick={handleResetGame}>
                ↺ Reset Challenge
              </button>
              <button
                type="button"
                className={`btn btn--gold btn--lg ${!gameCompleted ? 'btn--disabled' : 'animate-pulse'}`}
                disabled={!gameCompleted}
                onClick={nextScene}
                id="btn-submit-scroll"
              >
                Sanctify & Claim 1NF Seal <ArrowRight size={18} />
              </button>
            </div>
          </section>
        )}

        {/* =========================================================
            SCENE 6: The Divine Victory & 1NF Seal
           ========================================================= */}
        {currentScene === 6 && (
          <section className="scene-view scene-6">
            <div className="victory-celebration">
              <div className="celestial-burst" aria-hidden="true" />

              {/* Grand Divine Seal Stamp */}
              <div className="divine-seal animate-stamp-down">
                <div className="seal-outer-ring">
                  <div className="seal-inner-circle">
                    <span className="seal-om">ॐ</span>
                    <h3 className="seal-title">1NF ACHIEVED</h3>
                    <span className="seal-sub">FIRST NORMAL FORM</span>
                    <span className="seal-verified">ATOMICITY VERIFIED</span>
                  </div>
                </div>
              </div>

              <div className="victory-announcement">
                <span className="badge-victory">YAMALOKA RECKONING COMPLETED</span>
                <h2>Chitragupta's Karma Ledger is 100% Atomic!</h2>
                <p>
                  "My records are atomic now, so please judge them!" The soul queues at the gates of Heaven and Hell have dropped from hours of lagging to sub-millisecond lookups.
                </p>
              </div>

              <div className="key-rules-grid">
                <div className="rule-card">
                  <div className="rule-icon">1</div>
                  <h4>Atomic Values Only</h4>
                  <p>Every column holds exactly one value per row. No arrays, lists, or comma delimiters.</p>
                </div>

                <div className="rule-card">
                  <div className="rule-icon">2</div>
                  <h4>No Repeating Groups</h4>
                  <p>Never create Deed_1, Deed_2, Deed_3 columns. Store them as separate rows instead.</p>
                </div>

                <div className="rule-card">
                  <div className="rule-icon">3</div>
                  <h4>Unique Identification</h4>
                  <p>Every atomic record is uniquely identifiable by a Primary Key or Composite Key.</p>
                </div>
              </div>

              <div className="victory-actions">
                <button
                  type="button"
                  className="btn btn--outline"
                  onClick={() => goToScene(1)}
                  id="btn-replay-1nf"
                >
                  ↺ Replay 1NF
                </button>
                {onOpen2NF && (
                  <button
                    type="button"
                    className="btn btn--gold btn--lg"
                    onClick={onOpen2NF}
                    id="btn-proceed-2nf"
                  >
                    Proceed to 2NF Court ⚖️ <ArrowRight size={18} />
                  </button>
                )}
                <button
                  type="button"
                  className="btn btn--outline"
                  onClick={onBackToHome}
                  id="btn-victory-home"
                >
                  Return to Home
                </button>
              </div>
            </div>
          </section>
        )}
      </main>

      {/* Bottom Scene Quick Navigator */}
      <footer className="onenf-footer">
        <div className="onenf-footer__inner">
          <button
            type="button"
            className="btn-nav-prev"
            onClick={prevScene}
            disabled={currentScene === 1}
          >
            ← Previous Scene
          </button>

          <span className="footer-status">
            {currentMeta.name} — <em>{currentMeta.subtitle}</em>
          </span>

          <button
            type="button"
            className="btn-nav-next"
            onClick={nextScene}
            disabled={currentScene === 6}
          >
            Next Scene →
          </button>
        </div>
      </footer>
    </div>
  )
}
