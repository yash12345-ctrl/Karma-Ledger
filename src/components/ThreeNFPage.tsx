import { useEffect, useState } from 'react'
import bhriguImg from '../assets/2nf.jpg'
import naradaImg from '../assets/3nf.jpg'
import courtBg from '../assets/yamraj_court.jpg'
import {
  BCNF_PREVIEW_DATA,
  CHALLENGE_CARDS,
  CLEAN_DEED_DATA,
  KARMA_RULE_DATA,
  SCENES,
  UNNORMALIZED_DEED_DATA,
  type ChallengeCard,
  type SceneNumber,
} from '../data/threeNFData'
import { playChime, playSlice, playStamp, playVictoryChord } from '../utils/soundEffects'
import { ArrowRight } from './Icons'
import './ThreeNFPage.css'

interface ThreeNFPageProps {
  onBackToHome: () => void
  onOpen2NF?: () => void
  onOpenBCNF?: () => void
}

export default function ThreeNFPage({ onBackToHome, onOpen2NF, onOpenBCNF }: ThreeNFPageProps) {
  const [currentScene, setCurrentScene] = useState<SceneNumber>(1)

  // Scene 1: Observatory constellation scan
  const [observatoryScanning, setObservatoryScanning] = useState(false)

  // Scene 2: Transitive ray tracing
  const [rayActive, setRayActive] = useState(false)

  // Scene 3: Anomaly simulation state
  const [anomalyTab, setAnomalyTab] = useState<'repetition' | 'insertion'>('repetition')
  const [isDuplicatesFrozen, setIsDuplicatesFrozen] = useState(false)
  const [insertionFailed, setInsertionFailed] = useState(false)

  // Scene 4: Extraction transformation state
  const [isChainBroken, setIsChainBroken] = useState(false)

  // Scene 5: Interactive Sage Challenge
  const [placedDeedCards, setPlacedDeedCards] = useState<string[]>([])
  const [placedRuleCards, setPlacedRuleCards] = useState<string[]>([])
  const [selectedCard, setSelectedCard] = useState<ChallengeCard | null>(null)
  const [challengeComplete, setChallengeComplete] = useState(false)
  const [shakeTarget, setShakeTarget] = useState(false)

  useEffect(() => {
    if (currentScene === 1) {
      setObservatoryScanning(true)
      setTimeout(() => playStamp(), 400)
      const t = setTimeout(() => setObservatoryScanning(false), 2400)
      return () => clearTimeout(t)
    } else if (currentScene === 4) {
      setIsChainBroken(true)
      setTimeout(() => playSlice(), 500)
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

  // Mini-game placement
  const handleAssignCard = (target: 'deed' | 'rule') => {
    if (!selectedCard) return

    const card = selectedCard
    let isCorrect = false

    if (target === 'deed') {
      if (card.target === 'deed' || card.target === 'both') {
        isCorrect = true
        if (!placedDeedCards.includes(card.id)) {
          setPlacedDeedCards((prev) => [...prev, card.id])
          playSlice()
        }
      }
    } else if (target === 'rule') {
      if (card.target === 'rule' || card.target === 'both') {
        isCorrect = true
        if (!placedRuleCards.includes(card.id)) {
          setPlacedRuleCards((prev) => [...prev, card.id])
          playSlice()
        }
      }
    }

    if (!isCorrect) {
      setShakeTarget(true)
      setTimeout(() => setShakeTarget(false), 600)
    } else {
      setSelectedCard(null)
    }
  }

  // Check game completion
  useEffect(() => {
    const reqDeed = ['SoulID', 'DeedNo', 'KarmaType']
    const reqRule = ['KarmaType', 'DeedNature', 'Consequence', 'Realm']

    const deedDone = reqDeed.every((id) => placedDeedCards.includes(id))
    const ruleDone = reqRule.every((id) => placedRuleCards.includes(id))

    if (deedDone && ruleDone && !challengeComplete) {
      setChallengeComplete(true)
      playVictoryChord()
    }
  }, [placedDeedCards, placedRuleCards, challengeComplete])

  const handleResetChallenge = () => {
    setPlacedDeedCards([])
    setPlacedRuleCards([])
    setSelectedCard(null)
    setChallengeComplete(false)
  }

  const currentMeta = SCENES.find((s) => s.number === currentScene)!

  return (
    <div className="threenf-page">
      {/* Celestial Observatory Backdrop */}
      <div
        className="observatory-bg"
        style={{ backgroundImage: `url(${courtBg})` }}
        aria-hidden="true"
      />
      <div className="observatory-vignette" aria-hidden="true" />
      <div className="observatory-nebula" aria-hidden="true" />

      {/* Floating Armillary Celestial Rings */}
      <div className="armillary-ring ring--1" aria-hidden="true" />
      <div className="armillary-ring ring--2" aria-hidden="true" />

      {/* Scan Pulse */}
      {observatoryScanning && <div className="constellation-pulse-wave" aria-hidden="true" />}

      {/* Top Navigation */}
      <header className="threenf-nav">
        <button
          type="button"
          className="btn-back"
          onClick={onBackToHome}
          id="btn-3nf-back-home"
        >
          ← Return to Yamaloka
        </button>

        <div className="threenf-nav__title">
          <span className="gold-badge">CHAPTER 3 • TRANSITIVE DEPENDENCIES</span>
          <h1>Sage Bhrigu's Observatory (3NF)</h1>
        </div>

        <div className="threenf-nav__actions">
          {onOpen2NF && (
            <button
              type="button"
              className="btn-chapter-jump"
              onClick={onOpen2NF}
              title="Review Chapter 2"
            >
              ← 2NF Court
            </button>
          )}
          {onOpenBCNF && (
            <button
              type="button"
              className="btn-chapter-jump"
              onClick={onOpenBCNF}
              title="Enter Chapter 4"
            >
              BCNF Chamber →
            </button>
          )}
          <span className="observatory-status-tag">🔭 3NF Realm</span>
        </div>
      </header>

      {/* Timeline Stepper */}
      <nav className="threenf-stepper" aria-label="Scene progress">
        {SCENES.map((s) => (
          <button
            type="button"
            key={s.number}
            className={`step-btn ${currentScene === s.number ? 'is-active' : ''} ${currentScene > s.number ? 'is-passed' : ''}`}
            onClick={() => goToScene(s.number)}
            id={`step-3nf-scene-${s.number}`}
          >
            <span className="step-num">{s.number}</span>
            <span className="step-label">{s.name}</span>
          </button>
        ))}
      </nav>

      {/* Main Stage */}
      <main className="threenf-stage">
        {/* Sage Bhrigu Speech Balloon */}
        <div className="dialogue-banner" role="region" aria-live="polite">
          <div className="dialogue-avatar">
            <img src={bhriguImg} alt="Sage Bhrigu" />
          </div>
          <div className="dialogue-content">
            <span className="dialogue-speaker">Sage Bhrigu proclaims:</span>
            <p className="dialogue-text">"{currentMeta.dialogue}"</p>
          </div>
          <div className="scene-indicator">
            Scene {currentScene} of 6
          </div>
        </div>

        {/* =========================================================
            SCENE 1: Welcome to Sage Bhrigu's Celestial Observatory
           ========================================================= */}
        {currentScene === 1 && (
          <section className="scene-view scene-1">
            <div className="observatory-hero-grid">
              <div className="bhrigu-hero-card">
                <div className="bhrigu-card-frame">
                  <img
                    src={bhriguImg}
                    alt="Sage Bhrigu in the celestial observatory"
                    className="bhrigu-card-img"
                  />
                  <div className="bhrigu-card-overlay">
                    <span className="sage-title-badge">🔭 Master of Celestial Dependencies</span>
                  </div>
                </div>
              </div>

              <div className="observatory-welcome-panel">
                <span className="scene-eyebrow">Cosmic Armillary Terrace</span>
                <h2>The Celestial Observatory of Dependencies</h2>
                <p>
                  You arrive in the high heavens above Yamaloka. Sage Bhrigu points his cosmic armillary sphere
                  at the deeds ledger. While Yamraj eliminated partial dependencies in 2NF, a new, subtle
                  curse lurks within the table: <strong>Transitive Dependencies</strong>!
                </p>

                <div className="info-box info-box--nebula">
                  <strong>The 3NF Requirement:</strong> A relation is in 3NF if it is already in 2NF, and
                  <strong> no non-prime attribute is transitively dependent on any candidate key</strong>!
                  Non-key attributes must never determine other non-key attributes!
                </div>

                <div className="scene-actions">
                  <button
                    type="button"
                    className="btn btn--gold btn--lg"
                    onClick={() => {
                      setObservatoryScanning(true)
                      playStamp()
                      setTimeout(() => setObservatoryScanning(false), 2000)
                    }}
                    id="btn-scan-constellations"
                  >
                    Scan Functional Constellations 🔭
                  </button>
                  <button
                    type="button"
                    className="btn btn--outline btn--lg"
                    onClick={nextScene}
                  >
                    Examine Transitive Chain →
                  </button>
                </div>
              </div>
            </div>

            {/* Current 2NF Table on Display */}
            <div className="table-observatory-box">
              <div className="table-top-bar">
                <span>Table: DEED (Current 2NF Structure)</span>
                <span className="key-indicator">
                  <i className="gold-dot" /> Composite Key: <b>(SoulID, DeedNo)</b>
                </span>
              </div>

              <div className="table-scroll-container">
                <table className="observatory-table">
                  <thead>
                    <tr>
                      <th className="th-key">SoulID 🔑</th>
                      <th className="th-key">DeedNo 🔑</th>
                      <th className="th-determinant">KarmaType</th>
                      <th>DeedNature</th>
                      <th>Consequence</th>
                      <th>Realm</th>
                    </tr>
                  </thead>
                  <tbody>
                    {UNNORMALIZED_DEED_DATA.map((row, i) => (
                      <tr key={i}>
                        <td className="td-key"><b>{row.soulId}</b></td>
                        <td className="td-key"><b>{row.deedNo}</b></td>
                        <td className="td-determinant"><b>{row.karmaType}</b></td>
                        <td>{row.deedNature}</td>
                        <td><span className="consequence-pill">{row.consequence}</span></td>
                        <td><span className="realm-pill">{row.realm}</span></td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>
            </div>
          </section>
        )}

        {/* =========================================================
            SCENE 2: Discover the Transitive Dependency
           ========================================================= */}
        {currentScene === 2 && (
          <section className="scene-view scene-2">
            <div className="scene-head">
              <span className="scene-eyebrow">Dependency Constellation</span>
              <h2>Tracing the Hidden Dependency Chain</h2>
              <p>
                In 3NF, non-key attributes must depend directly on the primary key, and nothing else.
                Notice how <code>KarmaType</code> (a non-key attribute) determines <code>DeedNature</code>,
                <code>Consequence</code>, and <code>Realm</code>!
              </p>
            </div>

            <div className="ray-workbench">
              <div className="ray-controls">
                <button
                  type="button"
                  className={`btn ${rayActive ? 'btn--warn' : 'btn--gold'}`}
                  onClick={() => {
                    setRayActive(!rayActive)
                    playSlice()
                  }}
                  id="btn-trace-transitive"
                >
                  {rayActive ? 'Reset Constellation Ray' : '⚡ Activate Transitive Ray'}
                </button>

                <div className="formula-display">
                  {rayActive ? (
                    <span className="text-danger">
                      (SoulID, DeedNo) ➔ <strong>KarmaType</strong> ➔ (DeedNature, Consequence, Realm)
                    </span>
                  ) : (
                    <span>A ➔ B and B ➔ C (Transitive Dependency!)</span>
                  )}
                </div>
              </div>

              {/* Table with Active Beam Highlights */}
              <div className={`table-scroll-container ${rayActive ? 'is-ray-active' : ''}`}>
                <table className="observatory-table table--transitive">
                  <thead>
                    <tr>
                      <th className="col-key">
                        SoulID 🔑
                        {rayActive && <span className="sub-badge">Candidate Key Part</span>}
                      </th>
                      <th className="col-key">
                        DeedNo 🔑
                        {rayActive && <span className="sub-badge">Candidate Key Part</span>}
                      </th>
                      <th className={`col-mediator ${rayActive ? 'is-mediator' : ''}`}>
                        KarmaType
                        {rayActive && <span className="mediator-badge">⚡ Non-Key Determinant!</span>}
                      </th>
                      <th className={`col-transitive ${rayActive ? 'is-transitive-target' : ''}`}>
                        DeedNature
                        {rayActive && <span className="target-badge">Depends on KarmaType</span>}
                      </th>
                      <th className={`col-transitive ${rayActive ? 'is-transitive-target' : ''}`}>
                        Consequence
                        {rayActive && <span className="target-badge">Depends on KarmaType</span>}
                      </th>
                      <th className={`col-transitive ${rayActive ? 'is-transitive-target' : ''}`}>
                        Realm
                        {rayActive && <span className="target-badge">Depends on KarmaType</span>}
                      </th>
                    </tr>
                  </thead>
                  <tbody>
                    {UNNORMALIZED_DEED_DATA.map((row, i) => (
                      <tr key={i}>
                        <td className="col-key font-bold">{row.soulId}</td>
                        <td className="col-key font-bold">{row.deedNo}</td>
                        <td className={`col-mediator font-bold ${rayActive ? 'is-mediator' : ''}`}>
                          {row.karmaType}
                        </td>
                        <td className={`col-transitive ${rayActive ? 'is-transitive-target' : ''}`}>
                          {row.deedNature}
                        </td>
                        <td className={`col-transitive ${rayActive ? 'is-transitive-target' : ''}`}>
                          <span className="consequence-pill">{row.consequence}</span>
                        </td>
                        <td className={`col-transitive ${rayActive ? 'is-transitive-target' : ''}`}>
                          <span className="realm-pill">{row.realm}</span>
                        </td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>

              {/* Functional Dependency Visual Flow */}
              <div className="transitive-flow-card">
                <div className="flow-step">
                  <span className="step-title">Primary Key</span>
                  <div className="step-box key-box">(SoulID, DeedNo)</div>
                </div>
                <div className="flow-connector">
                  <span className="arrow-line" />
                  <span className="arrow-tag">Determines</span>
                </div>
                <div className="flow-step">
                  <span className="step-title">Non-Key Attribute</span>
                  <div className="step-box mediator-box">KarmaType</div>
                </div>
                <div className="flow-connector">
                  <span className="arrow-line error-line" />
                  <span className="arrow-tag tag--error">Transitively Determines!</span>
                </div>
                <div className="flow-step">
                  <span className="step-title">Dependent Non-Keys</span>
                  <div className="step-box dependent-box">
                    DeedNature, Consequence, Realm
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
                Witness the Curse of Repeated Rules →
              </button>
            </div>
          </section>
        )}

        {/* =========================================================
            SCENE 3: The Curse of Repeated Karma Rules
           ========================================================= */}
        {currentScene === 3 && (
          <section className="scene-view scene-3">
            <div className="scene-head">
              <span className="scene-eyebrow">Database Integrity Crisis</span>
              <h2>The Curse of Repeated Karma Rules</h2>
              <p>
                Because karma rules are packed directly into deed rows, the same rule is repeated for every soul!
                Explore both the <strong>Update Anomaly</strong> and the <strong>Insertion Problem</strong>:
              </p>
            </div>

            {/* Sub-tabs */}
            <div className="anomaly-tab-bar">
              <button
                type="button"
                className={`anomaly-tab ${anomalyTab === 'repetition' ? 'is-active' : ''}`}
                onClick={() => setAnomalyTab('repetition')}
              >
                💥 Repetition Curse & Update Anomaly
              </button>
              <button
                type="button"
                className={`anomaly-tab ${anomalyTab === 'insertion' ? 'is-active' : ''}`}
                onClick={() => setAnomalyTab('insertion')}
              >
                🚫 Insertion Problem (Cruelty Rule)
              </button>
            </div>

            {/* TAB A: Repetition Curse & Update Anomaly */}
            {anomalyTab === 'repetition' && (
              <div className="anomaly-showcase">
                <div className="anomaly-explainer">
                  <p>
                    Notice how <code>Hot-sand walk, 7 days</code> is duplicated across multiple <code>Theft</code> records.
                    If Yamraj modifies the punishment rule for Theft to <em>14 days</em>, what happens?
                  </p>
                </div>

                <div className="interactive-update-box">
                  <button
                    type="button"
                    className="btn btn--gold"
                    onClick={() => {
                      setIsDuplicatesFrozen(!isDuplicatesFrozen)
                      playStamp()
                    }}
                  >
                    {isDuplicatesFrozen ? 'Reset Repetition View' : 'Highlight Duplicates & Freeze in Midair'}
                  </button>
                </div>

                <div className="table-scroll-container">
                  <table className="observatory-table">
                    <thead>
                      <tr>
                        <th>SoulID</th>
                        <th>DeedNo</th>
                        <th>KarmaType</th>
                        <th>DeedNature</th>
                        <th>Consequence (Duplicate!)</th>
                        <th>Realm</th>
                      </tr>
                    </thead>
                    <tbody>
                      {UNNORMALIZED_DEED_DATA.map((row, i) => (
                        <tr key={i} className={row.karmaType === 'Theft' && isDuplicatesFrozen ? 'row--duplicate-highlight' : ''}>
                          <td>{row.soulId}</td>
                          <td>{row.deedNo}</td>
                          <td><b>{row.karmaType}</b></td>
                          <td>{row.deedNature}</td>
                          <td>
                            <span className={`consequence-pill ${row.karmaType === 'Theft' ? 'pill--warning' : ''}`}>
                              {row.consequence}
                            </span>
                          </td>
                          <td>{row.realm}</td>
                        </tr>
                      ))}
                    </tbody>
                  </table>
                </div>

                {isDuplicatesFrozen && (
                  <div className="anomaly-alert-card update-alert">
                    <div className="alert-header">
                      <span className="alert-title">⚠ UPDATE ANOMALY DETECTED!</span>
                    </div>
                    <p>
                      <strong>Hot-sand walk, 7 days</strong> is repeated on every single Theft row!
                      If Yamaloka updates the consequence rule, it must edit <strong>millions of rows</strong>.
                      If even one row is missed, the cosmic database enters an <strong>inconsistent state</strong>!
                    </p>
                  </div>
                )}
              </div>
            )}

            {/* TAB B: Insertion Problem */}
            {anomalyTab === 'insertion' && (
              <div className="anomaly-showcase">
                <div className="anomaly-explainer">
                  <p>
                    A new cosmic rule for <strong>Cruelty</strong> (Causing suffering ➔ Iron chamber, 10 days) is codified by the Sages.
                    However, no soul in Yamaloka has committed this deed yet! Can we store this rule in DEED?
                  </p>
                </div>

                <div className="insertion-simulator">
                  <div className="query-code-panel">
                    <code>
                      INSERT INTO DEED (SoulID, DeedNo, KarmaType, DeedNature, Consequence, Realm)<br />
                      VALUES (<strong>NULL</strong>, <strong>NULL</strong>, 'Cruelty', 'Causing suffering', 'Iron chamber, 10 days', 'Naraka C');
                    </code>
                  </div>

                  <div className="simulator-actions">
                    <button
                      type="button"
                      className="btn btn--gold"
                      onClick={() => {
                        setInsertionFailed(true)
                        playStamp()
                      }}
                    >
                      Attempt To Store Karma Rule
                    </button>
                    {insertionFailed && (
                      <button
                        type="button"
                        className="btn btn--outline"
                        onClick={() => setInsertionFailed(false)}
                      >
                        Reset
                      </button>
                    )}
                  </div>

                  {insertionFailed && (
                    <div className="anomaly-alert-card insert-alert">
                      <div className="alert-header">
                        <span className="alert-title">🚫 CANNOT STORE KARMA RULE INDEPENDENTLY!</span>
                      </div>
                      <p>
                        <strong>Primary Key Violation:</strong> <code>SoulID</code> and <code>DeedNo</code> form the primary key of DEED.
                        Because neither can be NULL, you <strong>cannot register a new rule without inventing a fake deed by a fake soul</strong>!
                      </p>
                    </div>
                  )}
                </div>
              </div>
            )}

            <div className="scene-actions text-center">
              <button
                type="button"
                className="btn btn--gold btn--lg"
                onClick={nextScene}
              >
                Watch Sage Bhrigu Break the Chain ⚡ →
              </button>
            </div>
          </section>
        )}

        {/* =========================================================
            SCENE 4: Sage Bhrigu Breaks the Dependency Chain
           ========================================================= */}
        {currentScene === 4 && (
          <section className="scene-view scene-4">
            <div className="scene-head">
              <span className="scene-eyebrow">The Signature 3NF Transformation</span>
              <h2>Sage Bhrigu Breaks the Dependency Chain</h2>
              <p>
                Sage Bhrigu extracts the karma rules into an independent golden tablet: <strong>KARMA_RULE</strong>.
                The deed records in <strong>DEED</strong> now simply reference <code>KarmaType</code> as a foreign key!
              </p>
            </div>

            <div className="table-split-workbench">
              <div className={`floating-table-stage ${isChainBroken ? 'is-split-active' : ''}`}>
                {/* TABLE 1: DEED */}
                <div className="stone-tablet tablet-deed-clean">
                  <div className="tablet-header">
                    <span className="tablet-tag">TABLE 1</span>
                    <h3>DEED (Streamlined Deeds)</h3>
                    <span className="tablet-pk">Primary Key: (SoulID, DeedNo)</span>
                  </div>
                  <div className="tablet-content">
                    <table className="observatory-table compact-table">
                      <thead>
                        <tr>
                          <th className="th-key">SoulID 🔑</th>
                          <th className="th-key">DeedNo 🔑</th>
                          <th className="th-fk">KarmaType 🔗</th>
                        </tr>
                      </thead>
                      <tbody>
                        {CLEAN_DEED_DATA.map((r, i) => (
                          <tr key={i}>
                            <td className="td-key"><b>{r.soulId}</b></td>
                            <td className="td-key"><b>{r.deedNo}</b></td>
                            <td className="td-fk"><b>{r.karmaType}</b></td>
                          </tr>
                        ))}
                      </tbody>
                    </table>
                  </div>
                </div>

                {/* Golden Foreign Key Line */}
                <div className="fk-connection-link" aria-label="Foreign Key link">
                  <div className="fk-thread" />
                  <span className="fk-badge">Foreign Key: DEED.KarmaType ➔ KARMA_RULE.KarmaType</span>
                </div>

                {/* TABLE 2: KARMA_RULE */}
                <div className="stone-tablet tablet-karma-rule">
                  <div className="tablet-header">
                    <span className="tablet-tag">TABLE 2 (EXTRACTED)</span>
                    <h3>KARMA_RULE (Authoritative Rules)</h3>
                    <span className="tablet-pk">Primary Key: KarmaType</span>
                  </div>
                  <div className="tablet-content">
                    <table className="observatory-table compact-table">
                      <thead>
                        <tr>
                          <th className="th-key">KarmaType 🔑</th>
                          <th>DeedNature</th>
                          <th>Consequence</th>
                          <th>Realm</th>
                        </tr>
                      </thead>
                      <tbody>
                        {KARMA_RULE_DATA.map((r) => (
                          <tr key={r.karmaType}>
                            <td className="td-key"><b>{r.karmaType}</b></td>
                            <td>{r.deedNature}</td>
                            <td><span className="consequence-pill">{r.consequence}</span></td>
                            <td><span className="realm-pill">{r.realm}</span></td>
                          </tr>
                        ))}
                      </tbody>
                    </table>
                  </div>
                </div>
              </div>

              {/* Victory Seal Card */}
              <div className="resolution-seal-card">
                <div className="seal-badge">3NF ACHIEVED 🌟</div>
                <h3>Transitive Dependency Removed!</h3>
                <p>
                  Each rule exists <strong>exactly once</strong> in <code>KARMA_RULE</code>.
                  New rules like <em>Cruelty</em> can be registered independently, and consequences can be updated in a single place without modifying deed history!
                </p>
              </div>
            </div>

            <div className="scene-actions text-center">
              <button
                type="button"
                className="btn btn--gold btn--lg"
                onClick={nextScene}
              >
                Test Your Wisdom: Become the Sage 🎮 →
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
              <span className="scene-eyebrow">Interactive Mastery Challenge</span>
              <h2>The Audience Becomes the Sage</h2>
              <p>
                A new karma rule has arrived. Where should each attribute be stored?
                Click an attribute below, then assign it to table <strong>DEED</strong> or <strong>KARMA_RULE</strong>!
              </p>
            </div>

            {/* Attribute Card Pool */}
            <div className="attribute-pool">
              <div className="pool-title">Unassigned Schema Attributes:</div>
              <div className="pool-chips">
                {CHALLENGE_CARDS.map((card) => {
                  const inDeed = placedDeedCards.includes(card.id)
                  const inRule = placedRuleCards.includes(card.id)
                  const fullyPlaced = card.target === 'both' ? (inDeed && inRule) : (inDeed || inRule)

                  return (
                    <button
                      type="button"
                      key={card.id}
                      className={`attr-chip ${selectedCard?.id === card.id ? 'is-selected' : ''} ${fullyPlaced ? 'is-assigned' : ''}`}
                      onClick={() => {
                        if (!fullyPlaced) {
                          setSelectedCard(card)
                          playChime()
                        }
                      }}
                      disabled={fullyPlaced}
                      title={card.description}
                    >
                      <span className="attr-name">{card.label}</span>
                      {fullyPlaced && <span className="attr-check">✓</span>}
                    </button>
                  )
                })}
              </div>
              {selectedCard && (
                <div className="selected-hint">
                  Selected: <strong>{selectedCard.label}</strong> — Click <strong>DEED</strong> or <strong>KARMA_RULE</strong> below!
                </div>
              )}
            </div>

            {/* Drop Arena */}
            <div className={`judge-drop-arena ${shakeTarget ? 'shake-anim' : ''}`}>
              {/* Target 1: DEED */}
              <div
                className={`drop-table-target ${selectedCard ? 'is-listening' : ''}`}
                onClick={() => handleAssignCard('deed')}
                role="button"
                tabIndex={0}
              >
                <div className="target-head">
                  <h4>TABLE: DEED</h4>
                  <span>Drop deed event attributes here</span>
                </div>
                <div className="target-slots">
                  <div className="slot-item">
                    <span className="slot-label">SoulID (PK):</span>
                    {placedDeedCards.includes('SoulID') ? (
                      <span className="placed-pill">SoulID 🔑</span>
                    ) : (
                      <span className="empty-pill">Drop Attribute</span>
                    )}
                  </div>
                  <div className="slot-item">
                    <span className="slot-label">DeedNo (PK):</span>
                    {placedDeedCards.includes('DeedNo') ? (
                      <span className="placed-pill">DeedNo 🔑</span>
                    ) : (
                      <span className="empty-pill">Drop Attribute</span>
                    )}
                  </div>
                  <div className="slot-item">
                    <span className="slot-label">KarmaType (FK):</span>
                    {placedDeedCards.includes('KarmaType') ? (
                      <span className="placed-pill">KarmaType 🔗</span>
                    ) : (
                      <span className="empty-pill">Drop Attribute</span>
                    )}
                  </div>
                </div>
              </div>

              {/* Target 2: KARMA_RULE */}
              <div
                className={`drop-table-target ${selectedCard ? 'is-listening' : ''}`}
                onClick={() => handleAssignCard('rule')}
                role="button"
                tabIndex={0}
              >
                <div className="target-head">
                  <h4>TABLE: KARMA_RULE</h4>
                  <span>Drop universal rule attributes here</span>
                </div>
                <div className="target-slots">
                  <div className="slot-item">
                    <span className="slot-label">KarmaType (PK):</span>
                    {placedRuleCards.includes('KarmaType') ? (
                      <span className="placed-pill">KarmaType 🔑</span>
                    ) : (
                      <span className="empty-pill">Drop Attribute</span>
                    )}
                  </div>
                  <div className="slot-item">
                    <span className="slot-label">DeedNature:</span>
                    {placedRuleCards.includes('DeedNature') ? (
                      <span className="placed-pill">DeedNature</span>
                    ) : (
                      <span className="empty-pill">Drop Attribute</span>
                    )}
                  </div>
                  <div className="slot-item">
                    <span className="slot-label">Consequence:</span>
                    {placedRuleCards.includes('Consequence') ? (
                      <span className="placed-pill">Consequence</span>
                    ) : (
                      <span className="empty-pill">Drop Attribute</span>
                    )}
                  </div>
                  <div className="slot-item">
                    <span className="slot-label">Realm:</span>
                    {placedRuleCards.includes('Realm') ? (
                      <span className="placed-pill">Realm</span>
                    ) : (
                      <span className="empty-pill">Drop Attribute</span>
                    )}
                  </div>
                </div>
              </div>
            </div>

            {/* Victory Message */}
            {challengeComplete && (
              <div className="judge-victory-banner">
                <div className="victory-icon">🌟</div>
                <h3>WISDOM ACHIEVED — 3NF!</h3>
                <p>
                  You have successfully broken the transitive dependency chain!
                  <code>KarmaType</code> acts as the foreign key bridging the soul's deed to the universal rule registry.
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
                    Proceed to BCNF Preview →
                  </button>
                </div>
              </div>
            )}
          </section>
        )}

        {/* =========================================================
            SCENE 6: Transition to BCNF
           ========================================================= */}
        {currentScene === 6 && (
          <section className="scene-view scene-6">
            <div className="scene-head">
              <span className="scene-eyebrow">The Next Horizon of Normalization</span>
              <h2>Gazing Toward Sage Narada's BCNF Chamber</h2>
              <p>
                Sage Bhrigu's 3NF tablets float into the sky. A new cosmic scroll materializes:
                <strong> COURT_ASSIGNMENT</strong>. Sage Narada's voice echoes from the next chamber!
              </p>
            </div>

            <div className="transition-preview-grid">
              <div className="narada-card">
                <div className="narada-img-wrap">
                  <img src={naradaImg} alt="Sage Narada" className="narada-img" />
                </div>
                <div className="narada-info">
                  <span className="guide-tag">GUIDE OF BCNF</span>
                  <h3>Sage Narada</h3>
                  <p>"Narayan, Narayan! Sage Bhrigu, I hear gossip about Table B!"</p>
                </div>
              </div>

              <div className="bcnf-preview-panel">
                <h4>Preview: The COURT_ASSIGNMENT Dilemma</h4>
                <p>In BCNF, every determinant must be a candidate key without exception. Look at this courtroom assignment table:</p>

                <div className="table-scroll-container">
                  <table className="observatory-table preview-table">
                    <thead>
                      <tr>
                        <th>Judge</th>
                        <th>Court</th>
                        <th>CaseType</th>
                      </tr>
                    </thead>
                    <tbody>
                      {BCNF_PREVIEW_DATA.map((r, i) => (
                        <tr key={i}>
                          <td><b>{r.judge}</b></td>
                          <td><span className="realm-pill">{r.court}</span></td>
                          <td>{r.caseType}</td>
                        </tr>
                      ))}
                    </tbody>
                  </table>
                </div>

                <div className="bcnf-teaser-note">
                  If each court has multiple judges, but a judge belongs to only one court,
                  can a non-trivial dependency exist where the determinant is NOT a superkey?
                  Stay tuned for Boyce-Codd Normal Form!
                </div>
              </div>
            </div>

            <div className="scene-actions text-center">
              <button
                type="button"
                className="btn btn--outline btn--lg"
                onClick={onBackToHome}
              >
                Return to Yamaloka Normalization Journey 🌟
              </button>
              {onOpenBCNF && (
                <button
                  type="button"
                  className="btn btn--gold btn--lg"
                  onClick={onOpenBCNF}
                >
                  Enter Sage Narada's BCNF Chamber 🪕 →
                </button>
              )}
            </div>
          </section>
        )}

        {/* Bottom Stepper & Scene Controls */}
        <footer className="threenf-footer">
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
              Finish Chapter 3 ✓
            </button>
          )}
        </footer>
      </main>
    </div>
  )
}
