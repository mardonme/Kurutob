import { BRANCHES } from '../data/branches';
import Container from './ui/Container';
import SectionHeader from './ui/SectionHeader';
import Button from './ui/Button';
import Icon from './ui/Icon';
import FadeIn from './FadeIn';

const BranchCard = ({ branch }) => {
  const telHref = `tel:${branch.phone.replace(/\s/g, '')}`;

  return (
    <article className={`branch-card ${branch.isMain ? 'branch-card--main' : ''}`}>
      {branch.isMain && (
        <span className="branch-badge">
          <Icon name="star" size={13} />
          MAIN BRANCH
        </span>
      )}

      <header className="branch-head">
        <span className="branch-icon" aria-hidden="true">
          <Icon name="building" size={22} />
        </span>
        <div className="branch-titles">
          <span className="branch-label">{branch.label}</span>
          <h3 className="branch-name">{branch.name}</h3>
        </div>
      </header>

      <div className="branch-body">
        <p className="branch-row">
          <span className="branch-row-icon" aria-hidden="true">
            <Icon name="mapPin" size={18} />
          </span>
          <span className="branch-row-text">{branch.address}</span>
        </p>

        <p className="branch-row">
          <span className="branch-row-icon" aria-hidden="true">
            <Icon name="phone" size={18} />
          </span>
          <a href={telHref} className="branch-phone">
            {branch.phone}
          </a>
        </p>

        <p className="branch-desc">{branch.description}</p>
      </div>

      <Button
        as="a"
        href={branch.mapLink}
        target="_blank"
        rel="noopener noreferrer"
        variant="secondary"
        block
        className="branch-directions"
        aria-label={`Get directions to ${branch.name} (opens in a new tab)`}
      >
        <Icon name="externalLink" size={16} />
        Get Directions
        <Icon name="arrowRight" size={16} className="branch-directions-arrow" />
      </Button>
    </article>
  );
};

const BranchesSection = () => {
  return (
    <section id="locations" className="branches-section section">
      <span className="glow-accent branch-glow" aria-hidden="true" />

      <Container>
        <SectionHeader
          eyebrow="FIND US"
          title={<>Our <em>Locations</em></>}
          subtitle="Visit us at any of our carefully selected locations and experience authentic Tajik hospitality, Central Asian flavor, and warm service."
        />

        <div className="branches-grid">
          {BRANCHES.map((branch, i) => (
            <FadeIn key={branch.id} delay={i * 120}>
              <BranchCard branch={branch} />
            </FadeIn>
          ))}
        </div>
      </Container>

      <style jsx>{`
        .branches-section {
          position: relative;
          background: var(--c-bg);
          overflow: hidden;
        }

        .branch-glow {
          top: -120px;
          left: 50%;
          transform: translateX(-50%);
          width: 540px;
          height: 540px;
        }

        .branches-grid {
          display: grid;
          grid-template-columns: repeat(3, 1fr);
          gap: var(--space-5);
          position: relative;
          z-index: 1;
        }

        .branches-grid > div {
          display: flex;
        }

        .branch-card {
          position: relative;
          display: flex;
          flex-direction: column;
          width: 100%;
          gap: var(--space-5);
          padding: var(--space-6);
          background: var(--c-surface-2);
          border: 1px solid var(--c-border);
          border-radius: var(--radius-lg);
          overflow: hidden;
          transition: transform var(--dur) var(--ease),
                      border-color var(--dur) var(--ease),
                      box-shadow var(--dur) var(--ease);
        }

        .branch-card:hover {
          transform: translateY(-4px);
          border-color: var(--c-border-strong);
          box-shadow: var(--shadow-lg);
        }

        .branch-card--main {
          border-color: var(--c-gold-line);
        }

        .branch-card--main::before {
          content: '';
          position: absolute;
          inset: 0 0 auto 0;
          height: 2px;
          background: linear-gradient(90deg, transparent, var(--c-gold), transparent);
        }

        .branch-badge {
          position: absolute;
          top: var(--space-4);
          right: var(--space-4);
          z-index: 2;
          display: inline-flex;
          align-items: center;
          gap: var(--space-1);
          padding: var(--space-1) var(--space-3);
          font-family: var(--font-sans);
          font-size: var(--fs-xs);
          font-weight: 600;
          letter-spacing: 0.12em;
          line-height: 1.2;
          white-space: nowrap;
          color: var(--c-gold);
          background: var(--c-gold-soft);
          border: 1px solid var(--c-gold-line);
          border-radius: var(--radius-pill);
        }

        .branch-head {
          display: flex;
          align-items: flex-start;
          gap: var(--space-4);
          padding-bottom: var(--space-5);
          border-bottom: 1px solid var(--c-border);
        }

        /* On the main card, reserve space so the badge never overlaps the title */
        .branch-card--main .branch-head {
          padding-top: var(--space-5);
        }

        .branch-icon {
          display: inline-flex;
          align-items: center;
          justify-content: center;
          width: 48px;
          height: 48px;
          flex-shrink: 0;
          color: var(--c-gold);
          background: var(--c-gold-soft);
          border: 1px solid var(--c-gold-line);
          border-radius: var(--radius-md);
          transition: background var(--dur) var(--ease),
                      border-color var(--dur) var(--ease);
        }

        .branch-card:hover .branch-icon {
          background: var(--c-gold-glow);
          border-color: var(--c-gold);
        }

        .branch-titles {
          flex: 1;
          min-width: 0;
        }

        .branch-label {
          display: block;
          font-family: var(--font-sans);
          font-size: var(--fs-xs);
          font-weight: 600;
          letter-spacing: 0.18em;
          text-transform: uppercase;
          color: var(--c-text-3);
          margin-bottom: var(--space-2);
        }

        .branch-name {
          font-family: var(--font-display);
          font-size: var(--fs-h3);
          color: var(--c-text);
          margin: 0;
          line-height: 1.15;
        }

        .branch-body {
          display: flex;
          flex-direction: column;
          gap: var(--space-3);
          flex: 1;
        }

        .branch-row {
          display: flex;
          align-items: flex-start;
          gap: var(--space-3);
          margin: 0;
        }

        .branch-row-icon {
          display: inline-flex;
          flex-shrink: 0;
          margin-top: 2px;
          color: var(--c-gold);
        }

        .branch-row-text {
          font-family: var(--font-sans);
          font-size: var(--fs-sm);
          color: var(--c-text-2);
          line-height: 1.5;
        }

        .branch-phone {
          font-family: var(--font-sans);
          font-size: var(--fs-sm);
          font-weight: 500;
          color: var(--c-text);
          transition: color var(--dur) var(--ease);
        }

        .branch-phone:hover {
          color: var(--c-gold);
        }

        .branch-desc {
          font-family: var(--font-sans);
          font-size: var(--fs-sm);
          color: var(--c-text-3);
          line-height: 1.65;
          margin: var(--space-1) 0 0;
        }

        .branch-directions {
          margin-top: auto;
        }

        .branch-directions .branch-directions-arrow {
          transition: transform var(--dur) var(--ease);
        }

        .branch-directions:hover .branch-directions-arrow {
          transform: translateX(4px);
        }

        @media (max-width: 1024px) {
          .branches-grid {
            grid-template-columns: repeat(2, 1fr);
          }
        }

        @media (max-width: 640px) {
          .branches-grid {
            grid-template-columns: 1fr;
          }

          .branch-card {
            padding: var(--space-5);
          }
        }
      `}</style>
    </section>
  );
};

export default BranchesSection;
