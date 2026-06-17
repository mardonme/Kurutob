import FadeIn from './FadeIn';
import Container from './ui/Container';
import Button from './ui/Button';
import Icon from './ui/Icon';

const FEATURES = [
  { icon: 'truck', label: 'Fast Delivery' },
  { icon: 'package', label: 'Fresh Packaging' },
  { icon: 'thermometer', label: 'Temperature Control' },
];

const CtaBanner = () => {
  return (
    <FadeIn as="section" className="cta-section" aria-labelledby="cta-heading">
      <Container size="default">
        <div className="cta-banner">
          <span className="glow-accent cta-glow" aria-hidden="true" />

          <div className="cta-content">
            <span className="eyebrow cta-eyebrow">
              <Icon name="truck" size={14} /> Delivery
            </span>
            <h2 id="cta-heading" className="cta-heading">
              Bringing Traditions to Your{' '}
              <em className="cta-accent">Doorstep</em>
            </h2>
            <p className="cta-subtext">
              Sharing the warmth of Tajik hospitality. Our lightning-fast
              delivery service covers all of Tashkent, ensuring your Kurutob
              arrives fresh, warm, and authentic.
            </p>
            <ul className="cta-features">
              {FEATURES.map((feature) => (
                <li key={feature.label} className="cta-feature">
                  <span className="cta-feature-icon" aria-hidden="true">
                    <Icon name={feature.icon} size={18} />
                  </span>
                  <span className="cta-feature-label">{feature.label}</span>
                </li>
              ))}
            </ul>
          </div>

          <div className="cta-action">
            <Button
              as="a"
              href="tel:+998900940400"
              variant="primary"
              size="lg"
              className="cta-order-btn"
            >
              <Icon name="phone" size={16} /> Order Delivery
            </Button>
            <p className="cta-phone">
              or call us at{' '}
              <a href="tel:+998900940400" className="cta-phone-link">
                +998 90 094 04 00
              </a>
            </p>
          </div>
        </div>
      </Container>

      <style jsx>{`
        .cta-section {
          padding-block: clamp(48px, 7vw, 88px);
          position: relative;
        }

        .cta-banner {
          position: relative;
          overflow: hidden;
          display: flex;
          align-items: center;
          justify-content: space-between;
          flex-wrap: wrap;
          gap: var(--space-7);
          padding: clamp(var(--space-6), 5vw, var(--space-9));
          background: linear-gradient(
            135deg,
            var(--c-surface-2),
            var(--c-surface-1)
          );
          border: 1px solid var(--c-gold-line);
          border-radius: var(--radius-xl);
          box-shadow: var(--shadow-lg);
        }

        .cta-glow {
          width: 420px;
          height: 420px;
          top: -160px;
          right: -120px;
        }

        .cta-content {
          position: relative;
          z-index: 1;
          flex: 1 1 320px;
          min-width: 280px;
        }

        .cta-eyebrow {
          margin-bottom: var(--space-4);
        }

        .cta-heading {
          font-family: var(--font-display);
          font-size: var(--fs-h2);
          line-height: 1.12;
          color: var(--c-text);
        }

        .cta-accent {
          font-style: italic;
          color: var(--c-gold);
        }

        .cta-subtext {
          font-family: var(--font-sans);
          font-size: var(--fs-lg);
          color: var(--c-text-2);
          line-height: 1.6;
          margin-top: var(--space-4);
          max-width: 52ch;
        }

        .cta-features {
          display: flex;
          flex-wrap: wrap;
          gap: var(--space-3);
          margin-top: var(--space-6);
        }

        .cta-feature {
          display: inline-flex;
          align-items: center;
          gap: var(--space-2);
          padding: var(--space-2) var(--space-4);
          background: var(--c-gold-soft);
          border: 1px solid var(--c-gold-line);
          border-radius: var(--radius-pill);
        }

        .cta-feature-icon {
          display: inline-flex;
          color: var(--c-gold);
        }

        .cta-feature-label {
          font-family: var(--font-sans);
          font-size: var(--fs-xs);
          font-weight: 600;
          letter-spacing: 0.08em;
          text-transform: uppercase;
          color: var(--c-text-2);
        }

        .cta-action {
          position: relative;
          z-index: 1;
          display: flex;
          flex-direction: column;
          align-items: center;
          gap: var(--space-3);
          flex: 0 0 auto;
        }

        .cta-phone {
          font-family: var(--font-sans);
          font-size: var(--fs-sm);
          color: var(--c-text-3);
          text-align: center;
        }

        .cta-phone-link {
          color: var(--c-gold);
          font-weight: 600;
        }

        .cta-phone-link:hover {
          color: var(--c-gold-hover);
        }

        @media (max-width: 900px) {
          .cta-banner {
            flex-direction: column;
            align-items: stretch;
            text-align: center;
          }

          .cta-subtext {
            margin-inline: auto;
          }

          .cta-eyebrow,
          .cta-features {
            justify-content: center;
          }

          .cta-action {
            width: 100%;
          }
        }

        @media (max-width: 560px) {
          .cta-features {
            flex-direction: column;
            align-items: center;
          }

          .cta-feature {
            width: fit-content;
          }

          .cta-order-btn {
            width: 100%;
          }
        }
      `}</style>
    </FadeIn>
  );
};

export default CtaBanner;
