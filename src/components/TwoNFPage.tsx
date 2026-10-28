import { useEffect, useState } from 'react'
import courtBg from '../assets/yamraj_court.jpg'
import yamaImg from '../assets/intro/yama.jpg'
import bhriguImg from '../assets/2nf.jpg'
import {
  CHALLENGE_ATTRIBUTES,
  DEED_TABLE_DATA,
  ORIGINAL_LEDGER,
  SCENES,
  SOUL_TABLE_DATA,
  TRANSITIVE_3NF_PREVIEW,
  type MiniGameCard,
  type SceneNumber,
} from '../data/twoNFData'
import { playChime, playSlice, playStamp, playVictoryChord } from '../utils/soundEffects'
import { ArrowRight } from './Icons'
import './TwoNFPage.css'

interface TwoNFPageProps {
  onBackToHome: () => void
  onOpen1NF?: () => void
  onOpen3NF?: () => void
}

export default function TwoNFPage({ onBackToHome, onOpen1NF, onOpen3NF }: TwoNFPageProps) {
  const [currentScene, setCurrentScene] = useState<SceneNumber>(1)

  // Scene 1: Staff shockwave effect
  const [staffStriking, setStaffStriking] = useState(false)

  // Scene 2: Partial dependency beam tracing
  const [beamActive, setBeamActive] = useState(false)

  // Scene 3: Anomaly simulation state
  const [anomalyTab, setAnomalyTab] = useState<'deletion' | 'insertion'>('deletion')
  const [deletionState, setDeletionState] = useState<'idle' | 'disintegrated'>('idle')
  const [insertionState, setInsertionState] = useState<'idle' | 'rejected'>('idle')

  // Scene 4: Tablet split state
  const [tableSplit, setTableSplit] = useState(false)

  // Scene 5: Interactive Judge Challenge
  const [placedSoulAttributes, setPlacedSoulAttributes] = useState<string[]>([])
  const [placedDeedAttributes, setPlacedDeedAttributes] = useState<string[]>([])
  const [selectedAttribute, setSelectedAttribute] = useState<MiniGameCard | null>(null)
  const [challengeComplete, setChallengeComplete] = useState(false)
  const [challengeShake, setChallengeShake] = useState(false)

  // Play sound on scene changes
  useEffect(() => {
    if (currentScene === 1) {
      setStaffStriking(true)
      setTimeout(() => playStamp(), 400)
      const t = setTimeout(() => setStaffStriking(false), 2000)
      return () => clearTimeout(t)
    } else if (currentScene === 4) {
      setTableSplit(true)
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

  const handleStaffStrike = () => {
    setStaffStriking(true)
    playStamp()
    setTimeout(() => setStaffStriking(false), 2000)
  }

  // Mini-game actions
  const handleAssignToTable = (target: 'soul' | 'deed') => {
    if (!selectedAttribute) return

    const card = selectedAttribute
    let isCorrect = false

    if (target === 'soul') {
      if (card.type === 'soul' || card.type === 'both') {
        isCorrect = true
        if (!placedSoulAttributes.includes(card.id)) {
          setPlacedSoulAttributes((prev) => [...prev, card.id])
          playSlice()
        }
      }
    } else if (target === 'deed') {
      if (card.type === 'deed' || card.type === 'both') {
        isCorrect = true
        if (!placedDeedAttributes.includes(card.id)) {
          setPlacedDeedAttributes((prev) => [...prev, card.id])
          playSlice()
        }
      }
    }

    if (!isCorrect) {
      setChallengeShake(true)
      setTimeout(() => setChallengeShake(false), 600)
    } else {
      setSelectedAttribute(null)
    }
  }

  // Check game completion
  useEffect(() => {
    const requiredSoul = ['SoulID', 'SoulName', 'BirthCity']
    const requiredDeed = ['SoulID', 'DeedNo', 'KarmaType']

    const soulDone = requiredSoul.every((id) => placedSoulAttributes.includes(id))
    const deedDone = requiredDeed.every((id) => placedDeedAttributes.includes(id))

    if (soulDone && deedDone && !challengeComplete) {
      setChallengeComplete(true)
      playVictoryChord()
      setStaffStriking(true)
      setTimeout(() => setStaffStriking(false), 2000)
    }
  }, [placedSoulAttributes, placedDeedAttributes, challengeComplete])

  const handleResetChallenge = () => {
    setPlacedSoulAttributes([])
    setPlacedDeedAttributes([])
    setSelectedAttribute(null)
    setChallengeComplete(false)
  }

  const currentMeta = SCENES.find((s) => s.number === currentScene)!

  return (
    <div className="twonf-page">
      {/* Courtroom Ambient Background & Fog */}
      <div
        className="court-bg"
        style={{ backgroundImage: `url(${courtBg})` }}
        aria-hidden="true"
      />
      <div className="court-vignette" aria-hidden="true" />
      <div className="court-fog" aria-hidden="true" />

      {/* Staff Energy Shockwave Effect */}
      {staffStriking && <div className="staff-shockwave-ring" aria-hidden="true" />}

      {/* Top Navigation */}
      <header className="twonf-nav">
        <button
          type="button"
          className="btn-back"
          onClick={onBackToHome}
          id="btn-2nf-back-home"
        >
          ← Return to Yamaloka
        </button>

        <div className="twonf-nav__title">
          <span className="gold-badge">CHAPTER 2 • PARTIAL DEPENDENCIES</span>
          <h1>Yamraj's Court of 2NF</h1>
        </div>

        <div className="twonf-nav__actions">
          {onOpen1NF && (
            <button
              type="button"
              className="btn-chapter-jump"
              onClick={onOpen1NF}
              title="Review Chapter 1"
            >
              ← 1NF
            </button>
          )}
          {onOpen3NF && (
            <button
              type="button"
              className="btn-chapter-jump"
              onClick={onOpen3NF}
              title="Enter Chapter 3"
            >
              3NF Observatory →
            </button>
          )}
          <span className="court-status-tag">⚖️ Grand Court</span>
        </div>
      </header>

      {/* Timeline Stepper */}
      <nav className="twonf-stepper" aria-label="Scene progress">
        {SCENES.map((s) => (
          <button
            type="button"
            key={s.number}
            className={`step-btn ${currentScene === s.number ? 'is-active' : ''} ${currentScene > s.number ? 'is-passed' : ''}`}
            onClick={() => goToScene(s.number)}
            id={`step-2nf-scene-${s.number}`}
          >
            <span className="step-num">{s.number}</span>
            <span className="step-label">{s.name}</span>
          </button>
        ))}
      </nav>

      {/* Main Stage */}
      <main className="twonf-stage">
        {/* Yamraj Speech Card */}
        <div className="dialogue-banner" role="region" aria-live="polite">
          <div className="dialogue-avatar">
            <img src={yamaImg} alt="Lord Yamraj" />
          </div>
          <div className="dialogue-content">
            <span className="dialogue-speaker">Lord Yamaraj speaks:</span>
            <p className="dialogue-text">"{currentMeta.dialogue}"</p>
          </div>
          <div className="scene-indicator">
            Scene {currentScene} of 6
          </div>
        </div>

        {/* =========================================================
            SCENE 1: Welcome to Yamraj's Court
           ========================================================= */}
        {currentScene === 1 && (
          <section className="scene-view scene-1">
            <div className="court-hero-grid">
              <div className="court-art-showcase">
                <div className="court-art-frame">
                  <img
                    src={courtBg}
                    alt="Yamraj sitting on the throne in his divine courtroom"
                    className="court-art-img"
                  />
                  <div className="court-art-overlay">
                    <span className="golden-scales-badge">⚖️ Divine Scales of Justice</span>
                  </div>
                </div>
              </div>

              <div className="court-welcome-panel">
                <span className="scene-eyebrow">Cosmic Court of Judgment</span>
                <h2>The Throne of Cosmic Justice</h2>
                <p>
                  Chitragupta has presented his atomic 1NF scroll to Lord Yamaraj. But in this supreme courtroom,
                  tables must withstand absolute logical scrutiny!
                </p>

                <div className="info-box info-box--gold">
                  <strong>The Composite Key Mandate:</strong> In this table, a soul can commit multiple deeds.
                  Therefore, neither <code>SoulID</code> nor <code>DeedNo</code> alone is unique — together they form the
                  <strong> Composite Primary Key (SoulID, DeedNo)</strong>!
                </div>

                <div className="scene-actions">
                  <button
                    type="button"
                    className="btn btn--gold btn--lg"
                    onClick={handleStaffStrike}
                    id="btn-strike-staff"
                  >
                    Strike Divine Staff ⚡
                  </button>
                  <button
                    type="button"
                    className="btn btn--outline btn--lg"
                    onClick={nextScene}
                  >
                    Examine Composite Key →
                  </button>
                </div>
              </div>
            </div>

            {/* Materialized Ledger Table */}
            <div className="table-materialize-box">
              <div className="table-header-callout">
                <span>Karma Ledger Table materialized before Yamraj</span>
                <span className="key-legend">
                  <i className="key-dot gold" /> Composite Primary Key: <b>(SoulID, DeedNo)</b>
                </span>
              </div>

              <div className="table-scroll-container">
                <table className="court-table">
                  <thead>
                    <tr>
                      <th className="th-key">SoulID 🔑</th>
                      <th className="th-key">DeedNo 🔑</th>
                      <th>SoulName</th>
                      <th>BirthCity</th>
                      <th>KarmaType</th>
                    </tr>
                  </thead>
                  <tbody>
                    {ORIGINAL_LEDGER.map((row, i) => (
                      <tr key={i}>
                        <td className="td-key"><b>{row.soulId}</b></td>
                        <td className="td-key"><b>{row.deedNo}</b></td>
                        <td>{row.soulName}</td>
                        <td>{row.birthCity}</td>
                        <td><span className="tag-deed">{row.karmaType}</span></td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>
            </div>
          </section>
        )}

        {/* =========================================================
            SCENE 2: Discover the Partial Dependency
           ========================================================= */}
        {currentScene === 2 && (
          <section className="scene-view scene-2">
            <div className="scene-head">
              <span className="scene-eyebrow">Relational Analysis</span>
              <h2>Unmasking the Partial Dependency</h2>
              <p>
                A <strong>Partial Dependency</strong> occurs when a non-key attribute depends on
                <strong> only part</strong> of a composite candidate key, rather than the complete key!
              </p>
            </div>

            <div className="dependency-workbench">
              <div className="dependency-controls">
                <button
                  type="button"
                  className={`btn ${beamActive ? 'btn--warn' : 'btn--gold'}`}
                  onClick={() => {
                    setBeamActive(!beamActive)
                    if (!beamActive) playSlice()
                  }}
                  id="btn-trace-dependency"
                >
                  {beamActive ? 'Reset Ray Analysis' : '⚡ Trace Partial Dependency Ray'}
                </button>
                <span className="dependency-formula">
                  {beamActive ? (
                    <strong className="text-danger">SoulID → SoulName, BirthCity (PARTIAL!)</strong>
                  ) : (
                    <span>Composite Candidate Key: (SoulID, DeedNo)</span>
                  )}
                </span>
              </div>

              <div className={`table-scroll-container ${beamActive ? 'is-beam-active' : ''}`}>
                <table className="court-table table--dependency">
                  <thead>
                    <tr>
                      <th className="col-soulid is-primary-part">
                        SoulID 🔑
                        {beamActive && <span className="beam-origin-badge">Primary Driver</span>}
                      </th>
                      <th className={`col-deedno ${beamActive ? 'is-dimmed' : ''}`}>
                        DeedNo 🔑
                        {beamActive && <span className="dimmed-badge">Ignored Part</span>}
                      </th>
                      <th className={`col-dependent ${beamActive ? 'is-targeted' : ''}`}>
                        SoulName
                        {beamActive && <span className="target-badge">Depends only on SoulID</span>}
                      </th>
                      <th className={`col-dependent ${beamActive ? 'is-targeted' : ''}`}>
                        BirthCity
                        {beamActive && <span className="target-badge">Depends only on SoulID</span>}
                      </th>
                      <th className="col-full">
                        KarmaType
                        {beamActive && <span className="full-badge">Requires Full Key</span>}
                      </th>
                    </tr>
                  </thead>
                  <tbody>
                    {ORIGINAL_LEDGER.map((row, i) => (
                      <tr key={i}>
                        <td className="col-soulid font-bold">{row.soulId}</td>
                        <td className={`col-deedno ${beamActive ? 'is-dimmed' : ''}`}>{row.deedNo}</td>
                        <td className={`col-dependent ${beamActive ? 'is-targeted' : ''}`}>{row.soulName}</td>
                        <td className={`col-dependent ${beamActive ? 'is-targeted' : ''}`}>{row.birthCity}</td>
                        <td><span className="tag-deed">{row.karmaType}</span></td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>

              {beamActive && (
                <div className="alert-box alert-box--hazard" role="alert">
                  <div className="alert-icon">⚠</div>
                  <div className="alert-text">
                    <h4>PARTIAL DEPENDENCY DETECTED!</h4>
                    <p>
                      <code>SoulName</code> and <code>BirthCity</code> are determined solely by <code>SoulID</code>.
                      They have <strong>no relationship with DeedNo</strong>, causing redundant repetition and severe data anomalies!
                    </p>
                  </div>
                </div>
              )}
            </div>

            <div className="scene-actions text-center">
              <button
                type="button"
                className="btn btn--gold btn--lg"
                onClick={nextScene}
              >
                Witness the Curse of Anomalies →
              </button>
            </div>
          </section>
        )}

        {/* =========================================================
            SCENE 3: The Curse of Data Anomalies
           ========================================================= */}
        {currentScene === 3 && (
          <section className="scene-view scene-3">
            <div className="scene-head">
              <span className="scene-eyebrow">Database Integrity Crisis</span>
              <h2>The Curse of Data Anomalies</h2>
              <p>
                Why is partial dependency dangerous in Yamaloka? Because it breeds
                <strong> Deletion</strong> and <strong>Insertion</strong> anomalies that corrupt souls' destinies!
              </p>
            </div>

            {/* Sub-Tabs for Anomalies */}
            <div className="anomaly-tab-bar">
              <button
                type="button"
                className={`anomaly-tab ${anomalyTab === 'deletion' ? 'is-active' : ''}`}
                onClick={() => setAnomalyTab('deletion')}
              >
                💥 Deletion Anomaly (Rohan's Oblivion)
              </button>
              <button
                type="button"
                className={`anomaly-tab ${anomalyTab === 'insertion' ? 'is-active' : ''}`}
                onClick={() => setAnomalyTab('insertion')}
              >
                🚫 Insertion Anomaly (Arjun's Rejection)
              </button>
            </div>

            {/* TAB A: Deletion Anomaly */}
            {anomalyTab === 'deletion' && (
              <div className="anomaly-showcase">
                <div className="anomaly-explainer">
                  <p>
                    Suppose Rohan (<code>S101</code>) only has <strong>one deed</strong> on record: <em>Theft</em>.
                    If Yamraj pardons or deletes this single deed, what happens to Rohan's personal soul identity?
                  </p>
                </div>

                <div className="table-scroll-container">
                  <table className="court-table">
                    <thead>
                      <tr>
                        <th>SoulID</th>
                        <th>DeedNo</th>
                        <th>SoulName</th>
                        <th>BirthCity</th>
                        <th>KarmaType</th>
                        <th>Action</th>
                      </tr>
                    </thead>
                    <tbody>
                      <tr className={deletionState === 'disintegrated' ? 'row-disintegrated' : ''}>
                        <td>S101</td>
                        <td>1</td>
                        <td>{deletionState === 'disintegrated' ? '???' : 'Rohan'}</td>
                        <td>{deletionState === 'disintegrated' ? '???' : 'Delhi'}</td>
                        <td><span className="tag-deed">Theft</span></td>
                        <td>
                          {deletionState === 'idle' ? (
                            <button
                              type="button"
                              className="btn btn--danger btn--sm"
                              onClick={() => {
                                setDeletionState('disintegrated')
                                playSlice()
                              }}
                            >
                              Delete Deed
                            </button>
                          ) : (
                            <button
                              type="button"
                              className="btn btn--outline btn--sm"
                              onClick={() => setDeletionState('idle')}
                            >
                              Restore
                            </button>
                          )}
                        </td>
                      </tr>
                    </tbody>
                  </table>
                </div>

                {deletionState === 'disintegrated' && (
                  <div className="anomaly-alert-card danger-card">
                    <h4>💥 SOUL INFORMATION LOST FOREVER!</h4>
                    <p>
                      Because <code>SoulName (Rohan)</code> and <code>BirthCity (Delhi)</code> were stored in the deed row,
                      deleting the deed erased Rohan completely from Yamaloka's registry!
                    </p>
                  </div>
                )}
              </div>
            )}

            {/* TAB B: Insertion Anomaly */}
            {anomalyTab === 'insertion' && (
              <div className="anomaly-showcase">
                <div className="anomaly-explainer">
                  <p>
                    A new soul named <strong>Arjun</strong> from <strong>Varanasi</strong> arrives in Yamaloka.
                    He has not committed any deed yet. Can we register him in this table?
                  </p>
                </div>

                <div className="insertion-simulator">
                  <div className="query-box">
                    <code>
                      INSERT INTO karma_ledger (SoulID, DeedNo, SoulName, BirthCity)<br />
                      VALUES ('S103', <strong>NULL</strong>, 'Arjun', 'Varanasi');
                    </code>
                  </div>

                  <div className="simulator-actions">
                    <button
                      type="button"
                      className="btn btn--gold"
                      onClick={() => {
                        setInsertionState('rejected')
                        playStamp()
                      }}
                    >
                      Execute Insert Query
                    </button>
                    {insertionState === 'rejected' && (
                      <button
                        type="button"
                        className="btn btn--outline"
                        onClick={() => setInsertionState('idle')}
                      >
                        Reset
                      </button>
                    )}
                  </div>

                  {insertionState === 'rejected' && (
                    <div className="anomaly-alert-card error-card">
                      <h4>🚫 CANNOT REGISTER SOUL WITHOUT A DEED!</h4>
                      <p>
                        <strong>SQL Constraint Error 1048:</strong> Column <code>DeedNo</code> cannot be NULL!
                        Since <code>DeedNo</code> is part of the composite primary key, we cannot record a soul without inventing a fake deed.
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
                Watch Yamraj Split the Database ⚡ →
              </button>
            </div>
          </section>
        )}

        {/* =========================================================
            SCENE 4: Yamraj Splits the Database
           ========================================================= */}
        {currentScene === 4 && (
          <section className="scene-view scene-4">
            <div className="scene-head">
              <span className="scene-eyebrow">Divine 2NF Resolution</span>
              <h2>Separating the Celestial Tablets</h2>
              <p>
                Yamraj invokes Second Normal Form! The personal soul details are split into table <strong>SOUL</strong>,
                while the deed records remain in table <strong>DEED</strong>, connected by a golden foreign-key thread.
              </p>
            </div>

            <div className="table-split-workbench">
              <div className={`floating-table-stage ${tableSplit ? 'is-split-active' : ''}`}>
                {/* TABLE 1: SOUL */}
                <div className="stone-tablet tablet-soul">
                  <div className="tablet-header">
                    <span className="tablet-tag">TABLE 1</span>
                    <h3>SOUL (Personal Records)</h3>
                    <span className="tablet-pk">Primary Key: SoulID</span>
                  </div>
                  <div className="tablet-content">
                    <table className="court-table compact-table">
                      <thead>
                        <tr>
                          <th className="th-key">SoulID 🔑</th>
                          <th>SoulName</th>
                          <th>BirthCity</th>
                        </tr>
                      </thead>
                      <tbody>
                        {SOUL_TABLE_DATA.map((r) => (
                          <tr key={r.soulId}>
                            <td className="td-key"><b>{r.soulId}</b></td>
                            <td>{r.soulName}</td>
                            <td>{r.birthCity}</td>
                          </tr>
                        ))}
                      </tbody>
                    </table>
                  </div>
                </div>

                {/* Golden Foreign Key Line Connector */}
                <div className="fk-connection-link" aria-label="Foreign Key link">
                  <div className="fk-thread" />
                  <span className="fk-badge">Foreign Key: DEED.SoulID ➔ SOUL.SoulID</span>
                </div>

                {/* TABLE 2: DEED */}
                <div className="stone-tablet tablet-deed">
                  <div className="tablet-header">
                    <span className="tablet-tag">TABLE 2</span>
                    <h3>DEED (Karma Ledger)</h3>
                    <span className="tablet-pk">Composite Key: (SoulID, DeedNo)</span>
                  </div>
                  <div className="tablet-content">
                    <table className="court-table compact-table">
                      <thead>
                        <tr>
                          <th className="th-key">SoulID 🔗</th>
                          <th className="th-key">DeedNo 🔑</th>
                          <th>KarmaType</th>
                        </tr>
                      </thead>
                      <tbody>
                        {DEED_TABLE_DATA.map((r, i) => (
                          <tr key={i}>
                            <td className="td-key"><b>{r.soulId}</b></td>
                            <td className="td-key"><b>{r.deedNo}</b></td>
                            <td><span className="tag-deed">{r.karmaType}</span></td>
                          </tr>
                        ))}
                      </tbody>
                    </table>
                  </div>
                </div>
              </div>

              {/* Victory Seal */}
              <div className="resolution-seal-card">
                <div className="seal-badge">2NF ACHIEVED ⚖️</div>
                <h3>Partial Dependency Completely Eliminated!</h3>
                <p>
                  Every non-key attribute in <strong>SOUL</strong> depends on the whole key (<code>SoulID</code>).
                  Every non-key attribute in <strong>DEED</strong> depends on the whole key (<code>SoulID, DeedNo</code>).
                </p>
              </div>
            </div>

            <div className="scene-actions text-center">
              <button
                type="button"
                className="btn btn--gold btn--lg"
                onClick={nextScene}
              >
                Test Your Skills: Become the Judge 🎮 →
              </button>
            </div>
          </section>
        )}

        {/* =========================================================
            SCENE 5: The Audience Becomes the Judge
           ========================================================= */}
        {currentScene === 5 && (
          <section className="scene-view scene-5">
            <div className="scene-head">
              <span className="scene-eyebrow">Interactive Trial</span>
              <h2>The Audience Becomes the Judge</h2>
              <p>
                Can you help Yamraj separate the soul attributes into their rightful tables?
                Click an attribute below, then click the correct table to assign it!
              </p>
            </div>

            {/* Draggable / Clickable Card Pool */}
            <div className="attribute-pool">
              <div className="pool-title">Unassigned Attributes:</div>
              <div className="pool-chips">
                {CHALLENGE_ATTRIBUTES.map((attr) => {
                  const inSoul = placedSoulAttributes.includes(attr.id)
                  const inDeed = placedDeedAttributes.includes(attr.id)
                  const fullyPlaced = attr.type === 'both' ? (inSoul && inDeed) : (inSoul || inDeed)

                  return (
                    <button
                      type="button"
                      key={attr.id}
                      className={`attr-chip ${selectedAttribute?.id === attr.id ? 'is-selected' : ''} ${fullyPlaced ? 'is-assigned' : ''}`}
                      onClick={() => {
                        if (!fullyPlaced) {
                          setSelectedAttribute(attr)
                          playChime()
                        }
                      }}
                      disabled={fullyPlaced}
                      title={attr.description}
                    >
                      <span className="attr-name">{attr.label}</span>
                      {fullyPlaced && <span className="attr-check">✓</span>}
                    </button>
                  )
                })}
              </div>
              {selectedAttribute && (
                <div className="selected-hint">
                  Selected: <strong>{selectedAttribute.label}</strong> — Click <strong>SOUL</strong> or <strong>DEED</strong> below!
                </div>
              )}
            </div>

            {/* Drop Target Tables */}
            <div className={`judge-drop-arena ${challengeShake ? 'shake-anim' : ''}`}>
              {/* Target 1: SOUL */}
              <div
                className={`drop-table-target ${selectedAttribute ? 'is-listening' : ''}`}
                onClick={() => handleAssignToTable('soul')}
                role="button"
                tabIndex={0}
              >
                <div className="target-head">
                  <h4>TABLE: SOUL</h4>
                  <span>Drop personal details here</span>
                </div>
                <div className="target-slots">
                  <div className="slot-item">
                    <span className="slot-label">SoulID (PK):</span>
                    {placedSoulAttributes.includes('SoulID') ? (
                      <span className="placed-pill">SoulID 🔑</span>
                    ) : (
                      <span className="empty-pill">Drop Primary Key</span>
                    )}
                  </div>
                  <div className="slot-item">
                    <span className="slot-label">SoulName:</span>
                    {placedSoulAttributes.includes('SoulName') ? (
                      <span className="placed-pill">SoulName</span>
                    ) : (
                      <span className="empty-pill">Drop Attribute</span>
                    )}
                  </div>
                  <div className="slot-item">
                    <span className="slot-label">BirthCity:</span>
                    {placedSoulAttributes.includes('BirthCity') ? (
                      <span className="placed-pill">BirthCity</span>
                    ) : (
                      <span className="empty-pill">Drop Attribute</span>
                    )}
                  </div>
                </div>
              </div>

              {/* Target 2: DEED */}
              <div
                className={`drop-table-target ${selectedAttribute ? 'is-listening' : ''}`}
                onClick={() => handleAssignToTable('deed')}
                role="button"
                tabIndex={0}
              >
                <div className="target-head">
                  <h4>TABLE: DEED</h4>
                  <span>Drop deed details here</span>
                </div>
                <div className="target-slots">
                  <div className="slot-item">
                    <span className="slot-label">SoulID (FK):</span>
                    {placedDeedAttributes.includes('SoulID') ? (
                      <span className="placed-pill">SoulID 🔗</span>
                    ) : (
                      <span className="empty-pill">Drop Foreign Key</span>
                    )}
                  </div>
                  <div className="slot-item">
                    <span className="slot-label">DeedNo (PK Part):</span>
                    {placedDeedAttributes.includes('DeedNo') ? (
                      <span className="placed-pill">DeedNo 🔑</span>
                    ) : (
                      <span className="empty-pill">Drop Attribute</span>
                    )}
                  </div>
                  <div className="slot-item">
                    <span className="slot-label">KarmaType:</span>
                    {placedDeedAttributes.includes('KarmaType') ? (
                      <span className="placed-pill">KarmaType</span>
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
                <div className="victory-icon">⚖️</div>
                <h3>JUDGMENT PASSED!</h3>
                <p>
                  You have correctly eradicated the partial dependency!
                  Personal soul attributes belong in <strong>SOUL</strong>, and deed consequences belong in <strong>DEED</strong>.
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
                    Proceed to 3NF Preview →
                  </button>
                </div>
              </div>
            )}
          </section>
        )}

        {/* =========================================================
            SCENE 6: Transition to Third Normal Form
           ========================================================= */}
        {currentScene === 6 && (
          <section className="scene-view scene-6">
            <div className="scene-head">
              <span className="scene-eyebrow">The Next Realm of Normalization</span>
              <h2>Gazing into the 3NF Transitive Abyss</h2>
              <p>
                The 2NF tables float upward into harmony. But Lord Yamaraj notices another lurking curse:
                What happens when an attribute depends on another <em>non-key</em> attribute?
              </p>
            </div>

            <div className="transition-preview-grid">
              <div className="bhrigu-card">
                <div className="bhrigu-img-wrap">
                  <img src={bhriguImg} alt="Sage Bhrigu" className="bhrigu-img" />
                </div>
                <div className="bhrigu-info">
                  <span className="guide-tag">GUIDE OF 2NF & 3NF</span>
                  <h3>Sage Bhrigu</h3>
                  <p>"Beware, O King of Justice! A new problem looms: Transitive Dependency!"</p>
                </div>
              </div>

              <div className="transitive-preview-panel">
                <h4>Preview: The Karma Consequence Mystery</h4>
                <p>Look at how <code>KarmaType</code> leads to <code>Consequence</code>, and <code>Consequence</code> determines <code>Realm</code>:</p>

                <div className="table-scroll-container">
                  <table className="court-table preview-table">
                    <thead>
                      <tr>
                        <th>KarmaType (Key)</th>
                        <th>Consequence (Non-Key)</th>
                        <th>Realm (Non-Key)</th>
                      </tr>
                    </thead>
                    <tbody>
                      {TRANSITIVE_3NF_PREVIEW.map((r, i) => (
                        <tr key={i}>
                          <td><b>{r.karmaType}</b></td>
                          <td>{r.consequence}</td>
                          <td><span className="realm-tag">{r.realm}</span></td>
                        </tr>
                      ))}
                    </tbody>
                  </table>
                </div>

                <div className="transitive-chain">
                  <span className="chain-node">KarmaType</span>
                  <span className="chain-arrow">➔</span>
                  <span className="chain-node">Consequence</span>
                  <span className="chain-arrow">➔</span>
                  <span className="chain-node node--hazard">Realm (Transitive!)</span>
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
              {onOpen3NF && (
                <button
                  type="button"
                  className="btn btn--gold btn--lg"
                  onClick={onOpen3NF}
                >
                  Enter Sage Bhrigu's Observatory (3NF) 🔭 →
                </button>
              )}
            </div>
          </section>
        )}

        {/* Bottom Scene Stepper & Controls */}
        <footer className="twonf-footer">
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
              Finish Chapter 2 ✓
            </button>
          )}
        </footer>
      </main>
    </div>
  )
}
