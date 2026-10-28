import type { CSSProperties } from 'react'
import { Fragment } from 'react'
import { journey } from '../data/journey'
import type { JourneyChip } from '../data/journey'
import { ArrowRight, CardIcon, ChatIcon, LineageIcon, Ornament, StarIcon, UserIcon } from './Icons'

const chipIcon = (icon?: JourneyChip['icon']) => {
  switch (icon) {
    case 'card':
      return <CardIcon size={14} />
    case 'user':
      return <UserIcon size={14} />
    case 'lineage':
      return <LineageIcon size={14} />
    case 'chat':
      return <ChatIcon size={14} />
    case 'star':
      return <StarIcon size={14} />
    default:
      return null
  }
}

interface JourneyProps {
  onSelect1NF?: () => void
  onSelect2NF?: () => void
  onSelect3NF?: () => void
  onSelectBCNF?: () => void
}

export default function Journey({ onSelect1NF, onSelect2NF, onSelect3NF, onSelectBCNF }: JourneyProps) {
  return (
    <section className="journey" id="journey" aria-labelledby="journey-title">
      <div className="journey__head">
        <h2 id="journey-title" className="journey__title">
          <Ornament /> <span>The Normalization Journey</span> <Ornament flip />
        </h2>
        <p>From a messy spreadsheet to a perfectly normalized Karma-DB</p>
      </div>

      <ol className="journey__track">
        {journey.map((step, i) => {
          const isClickable =
            (step.id === '1nf' && onSelect1NF) ||
            (step.id === '2nf' && onSelect2NF) ||
            (step.id === '3nf' && onSelect3NF) ||
            (step.id === 'bcnf' && onSelectBCNF)
          const handleClick =
            step.id === '1nf'
              ? onSelect1NF
              : step.id === '2nf'
                ? onSelect2NF
                : step.id === '3nf'
                  ? onSelect3NF
                  : step.id === 'bcnf'
                    ? onSelectBCNF
                    : undefined

          return (
            <Fragment key={step.id}>
              <li className="nf-wrap">
                <article
                  className={`nf-card ${isClickable ? 'nf-card--clickable' : ''}`}
                  id={`card-${step.id}`}
                  style={{ '--accent': step.accent } as CSSProperties}
                  onClick={handleClick}
                  role={isClickable ? 'button' : undefined}
                  tabIndex={isClickable ? 0 : undefined}
                  title={isClickable ? `Click to open ${step.form} Interactive Chapter` : undefined}
                >
                  <header className="nf-card__head">
                    <h3>{step.form}</h3>
                    <p>{step.guide}</p>
                  </header>

                  <div className="nf-card__media">
                    <img
                      src={step.image}
                      alt={`${step.guide} – ${step.form}`}
                      loading="lazy"
                      style={{ objectPosition: step.imagePosition }}
                    />
                    {step.id === '1nf' && (
                      <div className="nf-card__play-badge">
                        <span>▶ PLAY 1NF CHAPTER</span>
                      </div>
                    )}
                    {step.id === '2nf' && (
                      <div className="nf-card__play-badge">
                        <span>⚖️ PLAY 2NF COURT</span>
                      </div>
                    )}
                    {step.id === '3nf' && (
                      <div className="nf-card__play-badge">
                        <span>🔭 PLAY 3NF CHAPTER</span>
                      </div>
                    )}
                    {step.id === 'bcnf' && (
                      <div className="nf-card__play-badge">
                        <span>🪕 PLAY BCNF CHAPTER</span>
                      </div>
                    )}
                    {step.chips && (
                      <div className={`chips chips--${step.chipLayout}`}>
                        {step.chips.map((c, ci) => (
                          <Fragment key={c.label}>
                            <span className="chip">
                              {chipIcon(c.icon)}
                              {c.label}
                            </span>
                            {step.chipLayout === 'flow' && ci < step.chips!.length - 1 && (
                              <span className="chip-link" aria-hidden="true" />
                            )}
                          </Fragment>
                        ))}
                      </div>
                    )}
                  </div>

                  <p className="nf-card__desc">{step.description}</p>
                  {step.id === '1nf' && (
                    <div className="nf-card__cta-btn">
                      <span>Enter 1NF Story & Game →</span>
                    </div>
                  )}
                  {step.id === '2nf' && (
                    <div className="nf-card__cta-btn">
                      <span>Enter Yamraj's Court →</span>
                    </div>
                  )}
                  {step.id === '3nf' && (
                    <div className="nf-card__cta-btn">
                      <span>Enter Sage Bhrigu's Observatory →</span>
                    </div>
                  )}
                  {step.id === 'bcnf' && (
                    <div className="nf-card__cta-btn">
                      <span>Enter Sage Narada's Court →</span>
                    </div>
                  )}
                </article>
              </li>
              {i < journey.length - 1 && (
                <li className="nf-arrow" aria-hidden="true">
                  <ArrowRight size={18} />
                </li>
              )}
            </Fragment>
          )
        })}
      </ol>
    </section>
  )
}
