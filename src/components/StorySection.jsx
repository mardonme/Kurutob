import FadeIn from './FadeIn';
import Container from './ui/Container';
import Button from './ui/Button';
import Icon from './ui/Icon';

const FEATURES = [
  { icon: 'clock', label: 'Est. 2010' },
  { icon: 'utensils', label: 'Hand-torn fatir' },
  { icon: 'leaf', label: 'Mountain herbs' },
];

const StorySection = () => {
  return (
    <section id="story" className="story-section" aria-labelledby="story-heading">
      <span className="glow-accent story-glow" aria-hidden="true" />

      <Container size="wide">
        <div className="story-grid">
          <FadeIn className="story-media-col">
            <figure className="story-figure">
              <img
                className="story-image"
                src="/picture1.jpg"
                alt="Hand-torn fatir bread layered for a plate of Kurutob"
                width="800"
                height="1000"
                loading="lazy"
                decoding="async"
              />
            </figure>
          </FadeIn>

          <FadeIn delay={150} className="story-content-col">
            <div className="story-content">
              <span className="eyebrow">Our Heritage</span>

              <h2 id="story-heading" className="story-heading">
                The Soul of <em>Tajik Cuisine</em>
              </h2>

              <p className="story-text">
                Kurutob is more than just a dish; it&apos;s a centuries-old ritual.
                Rooted in the mountain villages of Tajikistan, our recipe honours the
                traditional method of hand-tearing fresh fatir bread and layering it
                with tangy katyk yogurt, crisp cucumbers, and garden-fresh herbs.
              </p>
              <p className="story-text">
                Every plate at Kurutob tells a story of heritage — from the mountains
                to your table, we preserve the authentic Central Asian flavours passed
                down through generations.
              </p>

              <ul className="story-features">
                {FEATURES.map((feature) => (
                  <li key={feature.label} className="story-chip">
                    <Icon name={feature.icon} size={16} />
                    <span>{feature.label}</span>
                  </li>
                ))}
              </ul>

              <div className="story-actions">
                <Button as="a" href="#menu" variant="secondary">
                  Explore the Menu
                  <Icon name="arrowRight" size={16} />
                </Button>
              </div>
            </div>
          </FadeIn>
        </div>
      </Container>

      <style jsx>{`
        .story-section {
          position: relative;
          padding-block: clamp(64px, 10vw, 128px);
          overflow: hidden;
        }

        .story-glow {
          top: 10%;
          left: -8%;
          width: 420px;
          height: 420px;
          opacity: 0.7;
        }

        .story-grid {
          position: relative;
          z-index: 1;
          display: grid;
          grid-template-columns: 0.9fr 1.1fr;
          gap: clamp(var(--space-6), 6vw, var(--space-9));
          align-items: center;
        }

        .story-figure {
          position: relative;
          margin: 0;
          border-radius: var(--radius-lg);
          padding: var(--space-2);
          background: linear-gradient(
            145deg,
            var(--c-gold-soft),
            transparent 60%
          );
          border: 1px solid var(--c-gold-line);
        }

        .story-figure::after {
          content: '';
          position: absolute;
          inset: var(--space-2);
          border-radius: calc(var(--radius-lg) - var(--space-2));
          box-shadow: inset 0 0 0 1px var(--c-gold-soft);
          pointer-events: none;
        }

        .story-image {
          width: 100%;
          height: 100%;
          aspect-ratio: 4 / 5;
          object-fit: cover;
          border-radius: calc(var(--radius-lg) - var(--space-2));
          box-shadow: var(--shadow-lg);
        }

        .story-content {
          display: flex;
          flex-direction: column;
          gap: var(--space-4);
          max-width: 56ch;
        }

        .story-heading {
          font-family: var(--font-display);
          font-size: var(--fs-h2);
          line-height: 1.1;
          color: var(--c-text);
          margin-top: var(--space-1);
        }

        .story-heading em {
          font-style: italic;
          color: var(--c-gold);
        }

        .story-text {
          font-family: var(--font-sans);
          font-size: var(--fs-lg);
          color: var(--c-text-2);
          line-height: 1.7;
        }

        .story-features {
          display: flex;
          flex-wrap: wrap;
          gap: var(--space-3);
          margin-top: var(--space-2);
        }

        .story-chip {
          display: inline-flex;
          align-items: center;
          gap: var(--space-2);
          padding: var(--space-2) var(--space-4);
          border-radius: var(--radius-pill);
          background: var(--c-surface-2);
          border: 1px solid var(--c-border);
          color: var(--c-text);
          font-family: var(--font-sans);
          font-size: var(--fs-sm);
          font-weight: 500;
          letter-spacing: 0.01em;
        }

        .story-chip svg {
          color: var(--c-gold);
          flex-shrink: 0;
        }

        .story-actions {
          margin-top: var(--space-3);
        }

        @media (max-width: 860px) {
          .story-grid {
            grid-template-columns: 1fr;
            gap: clamp(var(--space-6), 7vw, var(--space-7));
          }

          .story-content {
            max-width: 62ch;
          }

          .story-image {
            aspect-ratio: 16 / 10;
          }
        }
      `}</style>
    </section>
  );
};

export default StorySection;
