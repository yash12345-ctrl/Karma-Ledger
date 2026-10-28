import { useEffect, useState } from 'react'
import naradaImg from '../assets/3nf.jpg'
import bcnfHeroImg from '../assets/bcnf.jpg'
import vyasaImg from '../assets/4nf.jpg'
import courtBg from '../assets/yamraj_court.jpg'
import {
  BCNF_SCENES,
  COURT_ASSIGNMENT_DATA,
  DELETION_ANOMALY_DEMO,
  DECOMPOSED_JUDGE_DATA,
  DECOMPOSED_SOUL_JUDGE_DATA,
  FOUR_NF_PREVIEW_DATA,
  type BCNFSceneNumber,
} from '../data/bcnfData'
import { playChime, playSlice, playStamp, playVictoryChord } from '../utils/soundEffects'
import { ArrowRight } from './Icons'
import './BCNFPage.css'

interface BCNFPageProps {
  onBackToHome: () => void
  onOpen3NF?: () => void
}

export default function BCNFPage({ onBackToHome, onOpen3NF }: BCNFPageProps) {
  const [currentScene, setCurrentScene] = useState<BCNFSceneNumber>(1)

  // Scene 1: Divine gossip bubbles
  const [showGossipBubbles, setShowGossipBubbles] = useState(false)

  // Scene 2: Determinant investigation
  const [activeStep, setActiveStep] = useState<1 | 2 | 3 | 4>(1)
  const [highlightJudge, setHighlightJudge] = useState<string | null>(null)

  // Scene 4: Deletion anomaly state
  const [isRowDeleted, setIsRowDeleted] = useState(false)

  // Scene 5: Table split animation
  const [splitActive, setSplitActive] = useState(false)

  // Scene 6: Interactive 2-part Investigator Quiz
  const [quiz1Answer, setQuiz1Answer] = useState<string | null>(null)
  const [quiz2Answer, setQuiz2Answer] = useState<string | null>(null)
  const [quiz1Error, setQuiz1Error] = useState(false)
  const [quiz2Error, setQuiz2Error] = useState(false)
  const [mysterySolved, setMysterySolved] = useState(false)

  useEffect(() => {
    if (currentScene === 1) {
      setShowGossipBubbles(true)
      const t = setTimeout(() => playStamp(), 400)
      return () => clearTimeout(t)
    } else if (currentScene === 5) {
      setSplitActive(true)
      setTimeout(() => playSlice(), 500)
    }
  }, [currentScene])

  const nextScene = () => {
    if (currentScene < 7) {
      playChime()
      setCurrentScene((prev) => (prev + 1) as BCNFSceneNumber)
    }
  }

  const prevScene = () => {
    if (currentScene > 1) {
      playChime()
      setCurrentScene((prev) => (prev - 1) as BCNFSceneNumber)
    }
  }

  const goToScene = (num: BCNFSceneNumber) => {
    playChime()
    setCurrentScene(num)
  }

  // Quiz evaluation
  const handleSelectQuiz1 = (ans: string) => {
    setQuiz1Answer(ans)
    if (ans === 'B') {
      playSlice()
      setQuiz1Error(false)
    } else {
      setQuiz1Error(true)
      setTimeout(() => setQuiz1Error(false), 800)
    }
  }

  const handleSelectQuiz2 = (ans: string) => {
    setQuiz2Answer(ans)
    if (ans === 'A') {
      playSlice()
      setQuiz2Error(false)
      if (quiz1Answer === 'B') {
        setMysterySolved(true)
        playVictoryChord()
      }
    } else {
      setQuiz2Error(true)
      setTimeout(() => setQuiz2Error(false), 800)
    }
  }

  const handleResetQuiz = () => {
    setQuiz1Answer(null)
    setQuiz2Answer(null)
    setMysterySolved(false)
  }

  const currentMeta = BCNF_SCENES.find((s) => s.number === currentScene)!

  return (
    <div className="bcnf-page">
      {/* Celestial Administration Hall Ambient Backdrop */}
      <div
        className="admin-bg"
        style={{ backgroundImage: `url(${courtBg})` }}
        aria-hidden="true"
      />
      <div className="admin-vignette" aria-hidden="true" />
      <div className="admin-light-beams" aria-hidden="true" />

      {/* Floating Veena Music Strings */}
      <div className="veena-wave veena-wave--1" aria-hidden="true" />
      <div className="veena-wave veena-wave--2" aria-hidden="true" />

      {/* Top Navigation */}
      <header className="bcnf-nav">
        <button
          type="button"
          className="btn-back"
          onClick={onBackToHome}
          id="btn-bcnf-back-home"
        >
          ← Return to Yamaloka
        </button>

        <div className="bcnf-nav__title">
          <span className="gold-badge">CHAPTER 4 • BOYCE-CODD NORMAL FORM</span>
          <h1>Sage Narada & The Unqualified Judge</h1>
        </div>

        <div className="bcnf-nav__actions">
          {onOpen3NF && (
            <button
              type="button"
              className="btn-chapter-jump"
              onClick={onOpen3NF}
              title="Review Chapter 3"
            >
              ← 3NF Observatory
            </button>
          )}
          <span className="bcnf-status-tag">🪕 BCNF Chamber</span>
        </div>
      </header>

      {/* Timeline Stepper */}
      <nav className="bcnf-stepper" aria-label="Scene progress">
        {BCNF_SCENES.map((s) => (
          <button
            type="button"
            key={s.number}
            className={`step-btn ${currentScene === s.number ? 'is-active' : ''} ${currentScene > s.number ? 'is-passed' : ''}`}
            onClick={() => goToScene(s.number)}
            id={`step-bcnf-scene-${s.number}`}
          >
            <span className="step-num">{s.number}</span>
            <span className="step-label">{s.name}</span>
          </button>
        ))}
      </nav>

      {/* Main Stage */}
      <main className="bcnf-stage">
        {/* Sage Narada Speech Balloon */}
        <div className="dialogue-banner" role="region" aria-live="polite">
          <div className="dialogue-avatar">
            <img src={naradaImg} alt="Sage Narada" />
          </div>
          <div className="dialogue-content">
            <span className="dialogue-speaker">Sage Narada proclaims:</span>
            <p className="dialogue-text">"{currentMeta.dialogue}"</p>
          </div>
          <div className="scene-indicator">
            Scene {currentScene} of 7
          </div>
        </div>

        {/* =========================================================
            SCENE 1: Narada Arrives with Divine Gossip
           ========================================================= */}
        {currentScene === 1 && (
          <section className="scene-view scene-1">
            <div className="admin-hero-grid">
              <div className="narada-hero-card">
                <div className="narada-card-frame">
                  <img
                    src={bcnfHeroImg}
                    alt="Sage Narada with Veena in Courtroom"
                    className="narada-card-img"
                  />
                  <div className="narada-card-overlay">
                    <span className="narada-title-badge">🪕 Divine Messenger & Normalizer</span>
                  </div>
                </div>
              </div>

              <div className="admin-welcome-panel">
                <span className="scene-eyebrow">Celestial Administration Hall</span>
                <h2>The Mystery of the Unqualified Judge</h2>
                <p>
                  As Sage Bhrigu's 3NF tables ascend into the cosmos, a mystical portal opens to the
                  <strong> Celestial Court Administration Office</strong>. Sage Narada steps through, playing his
                  divine veena with an intrigued smile!
                </p>

                <div className="info-box info-box--gossip">
                  <strong>Divine Gossip:</strong> "Table B (<code>COURT_ASSIGNMENT</code>) passed 3NF with flying colors!
                  Yet the administrators cannot register judges independently, and records keep vanishing! Why?"
                </div>

                {/* Floating Gossip Speech Bubbles */}
                {showGossipBubbles && (
                  <div className="gossip-bubbles-container" aria-label="Gossip ripples">
                    <span className="gossip-bubble bubble--1">"Did you hear about Table B?"</span>
                    <span className="gossip-bubble bubble--2">"Judge determines Court, but who determines Judge?"</span>
                    <span className="gossip-bubble bubble--3">"Narayan, Narayan! 3NF is not enough!"</span>
                  </div>
                )}

                <div className="scene-actions">
                  <button
                    type="button"
                    className="btn btn--gold btn--lg"
                    onClick={() => {
                      setShowGossipBubbles(true)
                      playStamp()
                    }}
                    id="btn-strum-veena"
                  >
                    Strum Divine Veena 🪕
                  </button>
                  <button
                    type="button"
                    className="btn btn--outline btn--lg"
                    onClick={nextScene}
                  >
                    Investigate Table B Mystery →
                  </button>
                </div>
              </div>
            </div>

            {/* Glowing Scroll Preview */}
            <div className="shaking-scroll-card">
              <div className="scroll-title-bar">
                <span>📜 Celestial Register: COURT_ASSIGNMENT</span>
                <span className="thread-indicator">⚡ Golden Thread Connected: Judge ➔ Court</span>
              </div>
              <p className="scroll-note">
                Under cosmic court rules: A judge serves in <strong>only one court</strong>, but a soul can appear before multiple courts.
                Watch how this harmless-looking rule creates a profound anomaly!
              </p>
            </div>
          </section>
        )}

        {/* =========================================================
            SCENE 2: Investigate the Court Assignment Mystery
           ========================================================= */}
        {currentScene === 2 && (
          <section className="scene-view scene-2">
            <div className="scene-head">
              <span className="scene-eyebrow">Functional Dependency Investigation</span>
              <h2>Investigating the Court Assignment Mystery</h2>
              <p>
                Examine <code>COURT_ASSIGNMENT</code>. The candidate keys are <strong>(SoulID, Court)</strong> and <strong>(SoulID, Judge)</strong>.
                Notice the functional dependency: <code>Judge ➔ Court</code>.
              </p>
            </div>

            {/* Step Controls */}
            <div className="investigation-steps-bar">
              <button
                type="button"
                className={`step-tab ${activeStep === 1 ? 'is-active' : ''}`}
                onClick={() => {
                  setActiveStep(1)
                  playChime()
                }}
              >
                1. Highlight Candidate Keys
              </button>
              <button
                type="button"
                className={`step-tab ${activeStep === 2 ? 'is-active' : ''}`}
                onClick={() => {
                  setActiveStep(2)
                  playSlice()
                }}
              >
                2. Reveal Judge ➔ Court Beam
              </button>
              <button
                type="button"
                className={`step-tab ${activeStep === 3 ? 'is-active' : ''}`}
                onClick={() => {
                  setActiveStep(3)
                  playStamp()
                }}
              >
                3. Test Determinant: Is Judge a Superkey?
              </button>
              <button
                type="button"
                className={`step-tab ${activeStep === 4 ? 'is-active' : ''}`}
                onClick={() => {
                  setActiveStep(4)
                  playStamp()
                }}
              >
                4. Reveal BCNF Violation
              </button>
            </div>

            {/* Table Display with Interactive Highlights */}
            <div className="table-scroll-container">
              <table className="admin-table">
                <thead>
                  <tr>
                    <th className={activeStep >= 1 ? 'th-key-highlight' : ''}>
                      SoulID
                      {activeStep >= 1 && <span className="key-subtext">Part of both Candidate Keys</span>}
                    </th>
                    <th className={activeStep === 1 ? 'th-key-highlight' : activeStep >= 2 ? 'th-target-beam' : ''}>
                      Court
                      {activeStep === 1 && <span className="key-subtext">Candidate Key 1 Part</span>}
                      {activeStep >= 2 && <span className="beam-subtext">Target of Judge ➔ Court</span>}
                    </th>
                    <th
                      className={`th-clickable ${activeStep === 1 ? 'th-key-highlight' : ''} ${activeStep >= 2 ? 'th-determinant-beam' : ''}`}
                      onClick={() => {
                        setHighlightJudge(highlightJudge === 'Ila' ? null : 'Ila')
                        playSlice()
                      }}
                      title="Click to highlight rows sharing this judge!"
                    >
                      Judge (Click to Inspect) 🔍
                      {activeStep === 1 && <span className="key-subtext">Candidate Key 2 Part</span>}
                      {activeStep >= 2 && <span className="determinant-subtext">Determinant of Court</span>}
                    </th>
                  </tr>
                </thead>
                <tbody>
                  {COURT_ASSIGNMENT_DATA.map((row, i) => {
                    const isJudgeMatch = highlightJudge && row.judge === highlightJudge
                    return (
                      <tr
                        key={i}
                        className={isJudgeMatch ? 'row--judge-highlight' : ''}
                      >
                        <td className="font-bold">{row.soulId}</td>
                        <td>
                          <span className={`court-pill ${activeStep >= 2 ? 'pill--target' : ''}`}>
                            {row.court}
                          </span>
                        </td>
                        <td>
                          <button
                            type="button"
                            className={`judge-chip ${isJudgeMatch ? 'chip--active' : ''} ${activeStep >= 2 ? 'chip--determinant' : ''}`}
                            onClick={() => {
                              setHighlightJudge(highlightJudge === row.judge ? null : row.judge)
                              playSlice()
                            }}
                          >
                            <b>{row.judge}</b>
                            {isJudgeMatch && <span className="match-tag">Repeated!</span>}
                          </button>
                        </td>
                      </tr>
                    )
                  })}
                </tbody>
              </table>
            </div>

            {/* Step 3 & 4 Highlights */}
            {activeStep >= 3 && (
              <div className={`determinant-verdict-box ${activeStep === 4 ? 'is-violation' : ''}`}>
                <div className="verdict-icon">
                  {activeStep === 4 ? '🚨' : '🔍'}
                </div>
                <div className="verdict-content">
                  <h4>
                    {activeStep === 4
                      ? 'DETERMINANT IS NOT A SUPERKEY! (BCNF VIOLATED)'
                      : 'Testing Determinant: Does Judge uniquely identify a row?'}
                  </h4>
                  <p>
                    Judge <strong>Ila</strong> determines <strong>Dana Court</strong>, but Ila appears for multiple souls (S101 & S102).
                    Therefore, <code>Judge</code> by itself is <strong>NOT a superkey</strong>!
                  </p>
                </div>
              </div>
            )}

            <div className="scene-actions text-center">
              <button
                type="button"
                className="btn btn--gold btn--lg"
                onClick={nextScene}
              >
                Why 3NF Isn't Enough: The Balance Scale ⚖️ →
              </button>
            </div>
          </section>
        )}

        {/* =========================================================
            SCENE 3: The BCNF Mystery — Why 3NF Isn't Enough
           ========================================================= */}
        {currentScene === 3 && (
          <section className="scene-view scene-3">
            <div className="scene-head">
              <span className="scene-eyebrow">The Deepest Nuance of Normalization</span>
              <h2>Why 3NF Isn't Enough: The Prime Attribute Loophole</h2>
              <p>
                This table satisfies 3NF! Why? Because in 3NF, a dependency <code>X ➔ Y</code> is allowed if <strong>Y is a prime attribute</strong> (part of a candidate key).
                Since <code>Court</code> is part of <code>(SoulID, Court)</code>, 3NF is satisfied!
              </p>
            </div>

            {/* Magical Balance Scale */}
            <div className="balance-scale-stage">
              <div className="balance-beam">
                {/* LEFT: 3NF Seal */}
                <div className="scale-pan scale-pan--left">
                  <div className="seal-disk seal--3nf-pass">
                    <span className="seal-status-tag">3NF STATUS</span>
                    <h3>SATISFIED ✓</h3>
                    <p>Allowed because <code>Court</code> is a <strong>Prime Attribute</strong>!</p>
                  </div>
                </div>

                {/* Center Pivot: Functional Dependency */}
                <div className="scale-pivot">
                  <div className="pivot-fd-box">
                    <span className="fd-title">Functional Dependency</span>
                    <div className="fd-formula">Judge ➔ Court</div>
                    <span className="fd-sub">Right side is prime!</span>
                  </div>
                </div>

                {/* RIGHT: BCNF Seal */}
                <div className="scale-pan scale-pan--right">
                  <div className="seal-disk seal--bcnf-fail">
                    <span className="seal-status-tag">BCNF STATUS</span>
                    <h3>VIOLATION ✕</h3>
                    <p>BCNF removes the loophole! Every determinant must be a <strong>Superkey</strong>!</p>
                  </div>
                </div>
              </div>

              {/* Teaching Card */}
              <div className="teaching-card">
                <h4>The Strict Difference Between 3NF and BCNF:</h4>
                <div className="comparison-grid">
                  <div className="comparison-col col--3nf">
                    <strong>Third Normal Form (3NF)</strong>
                    <p>For every functional dependency <code>X ➔ Y</code>, either:</p>
                    <ul>
                      <li>1. <code>X</code> is a Superkey, OR</li>
                      <li>2. <code>Y</code> is a Prime Attribute (member of a candidate key)</li>
                    </ul>
                    <span className="col-verdict pass">PASSED (Court is prime)</span>
                  </div>
                  <div className="comparison-col col--bcnf">
                    <strong>Boyce-Codd Normal Form (BCNF)</strong>
                    <p>For every non-trivial functional dependency <code>X ➔ Y</code>:</p>
                    <ul>
                      <li>1. <code>X</code> MUST be a Superkey, with <strong>NO EXCEPTIONS</strong>!</li>
                    </ul>
                    <span className="col-verdict fail">FAILED (Judge is not a superkey)</span>
                  </div>
                </div>
              </div>
            </div>

            <div className="scene-actions text-center">
              <button
                type="button"
                className="btn btn--gold btn--lg"
                onClick={nextScene}
              >
                Witness The Deletion Anomaly 💥 →
              </button>
            </div>
          </section>
        )}

        {/* =========================================================
            SCENE 4: The Deletion Anomaly — A Court's Secret Disappears
           ========================================================= */}
        {currentScene === 4 && (
          <section className="scene-view scene-4">
            <div className="scene-head">
              <span className="scene-eyebrow">Database Integrity Anomaly</span>
              <h2>The Deletion Anomaly: A Court's Secret Disappears</h2>
              <p>
                Suppose soul <strong>S101</strong>'s case is cleared and deleted from the court ledger.
                Because Dana Court's assignment is only recorded inside S101's row, deleting S101 wipes out all knowledge of Dana Court and Judge Ila!
              </p>
            </div>

            <div className="anomaly-workbench">
              <div className="anomaly-controls">
                <button
                  type="button"
                  className={`btn ${isRowDeleted ? 'btn--outline' : 'btn--warn btn--lg'}`}
                  onClick={() => {
                    setIsRowDeleted(!isRowDeleted)
                    if (!isRowDeleted) {
                      playSlice()
                    } else {
                      playStamp()
                    }
                  }}
                  id="btn-delete-soul"
                >
                  {isRowDeleted ? 'Restore S101 Record ↺' : 'Delete Soul S101 Assignment 💥'}
                </button>
              </div>

              {/* Table with Disappearing Row Animation */}
              <div className="table-scroll-container">
                <table className="admin-table">
                  <thead>
                    <tr>
                      <th>SoulID</th>
                      <th>Court</th>
                      <th>Judge</th>
                      <th>Status</th>
                    </tr>
                  </thead>
                  <tbody>
                    {DELETION_ANOMALY_DEMO.map((row) => {
                      if (row.isCrucialTarget && isRowDeleted) {
                        return (
                          <tr key={row.soulId} className="row--dissolving">
                            <td colSpan={4} className="dissolved-cell">
                              <span className="dissolve-particles">✨ ✨ ✨</span>
                              <span className="dissolved-text">
                                [Row S101 Deleted — Dana Court & Judge Ila Information Completely Lost!]
                              </span>
                            </td>
                          </tr>
                        )
                      }
                      return (
                        <tr
                          key={row.soulId}
                          className={row.isCrucialTarget ? 'row--target-soul' : ''}
                        >
                          <td><b>{row.soulId}</b></td>
                          <td><span className="court-pill">{row.court}</span></td>
                          <td><b>{row.judge}</b></td>
                          <td>
                            {row.isCrucialTarget ? (
                              <span className="tag-sole">Only occurrence of Dana Court!</span>
                            ) : (
                              <span className="tag-safe">Active</span>
                            )}
                          </td>
                        </tr>
                      )
                    })}
                  </tbody>
                </table>
              </div>

              {/* Anomaly Alarm Card */}
              {isRowDeleted && (
                <div className="anomaly-alarm-banner">
                  <div className="alarm-badge">🚨 ANOMALY TRIGGERED</div>
                  <h3>JUDGE–COURT INFORMATION LOST!</h3>
                  <p>
                    By clearing a single soul (S101), the celestial registry completely forgot that <strong>Dana Court</strong> exists
                    and that <strong>Judge Ila</strong> is appointed to it!
                  </p>
                </div>
              )}
            </div>

            <div className="scene-actions text-center">
              <button
                type="button"
                className="btn btn--gold btn--lg"
                onClick={nextScene}
              >
                Watch Narada Split the Table ⚡ →
              </button>
            </div>
          </section>
        )}

        {/* =========================================================
            SCENE 5: The Magical BCNF Transformation
           ========================================================= */}
        {currentScene === 5 && (
          <section className="scene-view scene-5">
            <div className="scene-head">
              <span className="scene-eyebrow">The Signature BCNF Transformation</span>
              <h2>Decomposing into Boyce-Codd Normal Form</h2>
              <p>
                Sage Narada raises his veena! The judge-court relationship is extracted into <strong>JUDGE</strong> where <code>Judge</code> is a primary superkey.
                The soul assignments remain in <strong>SOUL_JUDGE</strong>, referencing <code>Judge</code>!
              </p>
            </div>

            <div className="bcnf-decomposition-stage">
              <div className={`table-split-grid ${splitActive ? 'is-split-active' : ''}`}>
                {/* TABLE 1: JUDGE */}
                <div className="stone-tablet tablet-judge">
                  <div className="tablet-header">
                    <span className="tablet-tag">TABLE 1: REGISTRY</span>
                    <h3>JUDGE (Judge ➔ Court)</h3>
                    <span className="tablet-pk">Primary Superkey: Judge 🔑</span>
                  </div>
                  <div className="tablet-content">
                    <table className="admin-table compact-table">
                      <thead>
                        <tr>
                          <th className="th-key">Judge 🔑</th>
                          <th>Court</th>
                        </tr>
                      </thead>
                      <tbody>
                        {DECOMPOSED_JUDGE_DATA.map((r) => (
                          <tr key={r.judge}>
                            <td className="td-key"><b>{r.judge}</b></td>
                            <td><span className="court-pill">{r.court}</span></td>
                          </tr>
                        ))}
                      </tbody>
                    </table>
                  </div>
                </div>

                {/* Golden Foreign Key Connector */}
                <div className="fk-connection-link" aria-label="Foreign Key thread">
                  <div className="fk-thread" />
                  <span className="fk-badge">Foreign Key: SOUL_JUDGE.Judge ➔ JUDGE.Judge</span>
                </div>

                {/* TABLE 2: SOUL_JUDGE */}
                <div className="stone-tablet tablet-soul-judge">
                  <div className="tablet-header">
                    <span className="tablet-tag">TABLE 2: ASSIGNMENTS</span>
                    <h3>SOUL_JUDGE (Soul Assignments)</h3>
                    <span className="tablet-pk">Composite Key: (SoulID 🔑, Judge 🔗)</span>
                  </div>
                  <div className="tablet-content">
                    <table className="admin-table compact-table">
                      <thead>
                        <tr>
                          <th className="th-key">SoulID 🔑</th>
                          <th className="th-fk">Judge 🔗</th>
                        </tr>
                      </thead>
                      <tbody>
                        {DECOMPOSED_SOUL_JUDGE_DATA.map((r, i) => (
                          <tr key={i}>
                            <td className="td-key"><b>{r.soulId}</b></td>
                            <td className="td-fk"><b>{r.judge}</b></td>
                          </tr>
                        ))}
                      </tbody>
                    </table>
                  </div>
                </div>
              </div>

              {/* Victory Seal Banner */}
              <div className="bcnf-victory-card">
                <div className="seal-badge">BOYCE-CODD NORMAL FORM ACHIEVED 🌟</div>
                <h3>Every Determinant is Now a Superkey!</h3>
                <p>
                  In <code>JUDGE</code>, the determinant <code>Judge</code> is the superkey.
                  Deleting soul records in <code>SOUL_JUDGE</code> no longer erases the court-to-judge registry!
                </p>
              </div>
            </div>

            <div className="scene-actions text-center">
              <button
                type="button"
                className="btn btn--gold btn--lg"
                onClick={nextScene}
              >
                Become the Investigator: Solve the Quiz 🎮 →
              </button>
            </div>
          </section>
        )}

        {/* =========================================================
            SCENE 6: The Audience Becomes the Investigator
           ========================================================= */}
        {currentScene === 6 && (
          <section className="scene-view scene-6">
            <div className="scene-head">
              <span className="scene-eyebrow">Interactive Mastery Investigation</span>
              <h2>The Audience Becomes the Investigator</h2>
              <p>
                Sage Narada presents the divine judicial case to you. Test your normalization wisdom!
              </p>
            </div>

            <div className="investigator-challenge-grid">
              {/* Question 1 */}
              <div className={`quiz-panel ${quiz1Answer === 'B' ? 'is-correct' : quiz1Error ? 'is-error' : ''}`}>
                <div className="quiz-head">
                  <span className="quiz-step-tag">Question 1</span>
                  <h4>Can you identify the dependency that breaks BCNF?</h4>
                </div>
                <div className="quiz-options">
                  <button
                    type="button"
                    className={`quiz-option-btn ${quiz1Answer === 'A' ? 'option-wrong' : ''}`}
                    onClick={() => handleSelectQuiz1('A')}
                  >
                    <b>A.</b> SoulID ➔ Judge
                  </button>
                  <button
                    type="button"
                    className={`quiz-option-btn ${quiz1Answer === 'B' ? 'option-correct' : ''}`}
                    onClick={() => handleSelectQuiz1('B')}
                  >
                    <b>B.</b> Judge ➔ Court ✓
                  </button>
                  <button
                    type="button"
                    className={`quiz-option-btn ${quiz1Answer === 'C' ? 'option-wrong' : ''}`}
                    onClick={() => handleSelectQuiz1('C')}
                  >
                    <b>C.</b> Court ➔ SoulID
                  </button>
                </div>
                {quiz1Answer === 'B' && (
                  <p className="quiz-feedback-good">✓ Correct! Each judge serves in only one court, so Judge determines Court.</p>
                )}
                {quiz1Error && (
                  <p className="quiz-feedback-bad">✕ Try again! Look for the rule where one attribute dictates another.</p>
                )}
              </div>

              {/* Question 2 */}
              <div className={`quiz-panel ${quiz2Answer === 'A' ? 'is-correct' : quiz2Error ? 'is-error' : ''}`}>
                <div className="quiz-head">
                  <span className="quiz-step-tag">Question 2</span>
                  <h4>Why does this dependency violate BCNF?</h4>
                </div>
                <div className="quiz-options">
                  <button
                    type="button"
                    className={`quiz-option-btn ${quiz2Answer === 'A' ? 'option-correct' : ''}`}
                    onClick={() => handleSelectQuiz2('A')}
                  >
                    <b>A.</b> Judge is not a superkey ✓
                  </button>
                  <button
                    type="button"
                    className={`quiz-option-btn ${quiz2Answer === 'B' ? 'option-wrong' : ''}`}
                    onClick={() => handleSelectQuiz2('B')}
                  >
                    <b>B.</b> Court contains multiple words
                  </button>
                  <button
                    type="button"
                    className={`quiz-option-btn ${quiz2Answer === 'C' ? 'option-wrong' : ''}`}
                    onClick={() => handleSelectQuiz2('C')}
                  >
                    <b>C.</b> SoulID is a number
                  </button>
                </div>
                {quiz2Answer === 'A' && (
                  <p className="quiz-feedback-good">✓ Correct! In BCNF, every determinant must be a superkey without exception.</p>
                )}
                {quiz2Error && (
                  <p className="quiz-feedback-bad">✕ Try again! Remember the golden rule of BCNF determinants.</p>
                )}
              </div>
            </div>

            {/* Victory Certificate */}
            {mysterySolved && (
              <div className="mystery-solved-banner">
                <div className="victory-icon">🪕</div>
                <h3>MYSTERY SOLVED! BCNF ACHIEVED!</h3>
                <p>
                  Sage Narada plays a triumphant chord on his veena! You have mastered Boyce-Codd Normal Form.
                </p>
                <div className="victory-actions">
                  <button
                    type="button"
                    className="btn btn--outline"
                    onClick={handleResetQuiz}
                  >
                    Replay Investigation ↺
                  </button>
                  <button
                    type="button"
                    className="btn btn--gold"
                    onClick={nextScene}
                  >
                    Gaze into Fourth Normal Form (4NF) 🌌 →
                  </button>
                </div>
              </div>
            )}
          </section>
        )}

        {/* =========================================================
            SCENE 7: Transition to Fourth Normal Form
           ========================================================= */}
        {currentScene === 7 && (
          <section className="scene-view scene-7">
            <div className="scene-head">
              <span className="scene-eyebrow">The Next Horizon of Normalization</span>
              <h2>Toward Sage Vyasa's Chamber: Fourth Normal Form (4NF)</h2>
              <p>
                The BCNF tables float gracefully into the celestial sphere. But wait! A new scroll appears:
                <strong> SOUL_ATTRIBUTES</strong>, containing independent multi-valued facts!
              </p>
            </div>

            <div className="vyasa-preview-grid">
              <div className="vyasa-card">
                <div className="vyasa-img-wrap">
                  <img src={vyasaImg} alt="Sage Vyasa" className="vyasa-img" />
                </div>
                <div className="vyasa-info">
                  <span className="guide-tag">GUIDE OF 4NF</span>
                  <h3>Sage Vyasa</h3>
                  <p>"Sage Vyasa, do you have anything left for Table C?"</p>
                </div>
              </div>

              <div className="fournf-preview-panel">
                <h4>Preview: The Cartesian Multiplication of 4NF</h4>
                <p>
                  Look at soul <strong>S101</strong> with 2 languages (Sanskrit, Tamil) and 2 skills (Astral Projection, Karmic Divination).
                  Because they are independent multi-valued facts, storing them in one table forces a <strong>2 × 2 = 4 row explosion</strong>!
                </p>

                <div className="table-scroll-container">
                  <table className="admin-table preview-table">
                    <thead>
                      <tr>
                        <th>SoulID</th>
                        <th>Language (MVD 1)</th>
                        <th>Skill (MVD 2)</th>
                      </tr>
                    </thead>
                    <tbody>
                      {FOUR_NF_PREVIEW_DATA.map((r, i) => (
                        <tr key={i}>
                          <td><b>{r.soulId}</b></td>
                          <td><span className="court-pill">{r.language}</span></td>
                          <td><span className="realm-pill">{r.skill}</span></td>
                        </tr>
                      ))}
                    </tbody>
                  </table>
                </div>

                <div className="mvd-note-box">
                  <strong>Multi-Valued Dependency (MVD):</strong> <code>SoulID ↠ Language</code> and <code>SoulID ↠ Skill</code>.
                  Fourth Normal Form resolves this by separating independent multi-valued facts into distinct tables!
                </div>
              </div>
            </div>

            <div className="scene-actions text-center">
              <button
                type="button"
                className="btn btn--gold btn--lg"
                onClick={onBackToHome}
              >
                Return to Yamaloka Normalization Journey 🌟
              </button>
            </div>
          </section>
        )}

        {/* Bottom Stepper & Scene Controls */}
        <footer className="bcnf-footer">
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

          {currentScene < 7 ? (
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
              Finish BCNF Chapter ✓
            </button>
          )}
        </footer>
      </main>
    </div>
  )
}
