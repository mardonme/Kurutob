import FadeIn from './FadeIn';
import Container from './ui/Container';
import SectionHeader from './ui/SectionHeader';
import Button from './ui/Button';
import Icon from './ui/Icon';
import { MENU_ITEMS } from '../data/menuItems';

const MenuSection = ({ onOpenReservation }) => {
  return (
    <section id="menu" className="menu-section section">
      <span className="menu-glow glow-accent" aria-hidden="true" />

      <Container size="wide">
        <FadeIn>
          <SectionHeader
            eyebrow="OUR MENU"
            title={<>Signature <em>Creations</em></>}
            subtitle="Experience the authentic flavors of Tajik & Central Asian cuisine."
          />
        </FadeIn>

        <ul className="menu-grid">
          {MENU_ITEMS.map((item, index) => (
            <FadeIn as="li" key={item.name} delay={index * 100} className="menu-grid-item">
              <article className="menu-card">
                <div className="menu-image-container">
                  <img
                    src={item.image}
                    alt={`${item.name} — ${item.desc}`}
                    className="menu-image"
                    width="800"
                    height="600"
                    loading="lazy"
                    decoding="async"
                  />
                  <span className="menu-category-badge">{item.badge}</span>
                </div>
                <div className="menu-card-content">
                  <h3 className="menu-item-name">{item.name}</h3>
                  <p className="menu-item-desc">{item.desc}</p>
                  <span className="menu-price">{item.price}</span>
                </div>
              </article>
            </FadeIn>
          ))}
        </ul>

        <FadeIn className="menu-cta" delay={120}>
          <Button variant="primary" size="lg" onClick={onOpenReservation}>
            Reserve a Table
            <Icon name="arrowRight" size={18} />
          </Button>
        </FadeIn>
      </Container>

      <style jsx>{`
        .menu-section {
          position: relative;
          background: var(--c-bg);
          overflow: hidden;
        }

        .menu-glow {
          width: 620px;
          height: 620px;
          top: -160px;
          left: 50%;
          transform: translateX(-50%);
          opacity: 0.7;
        }

        .menu-grid {
          display: grid;
          grid-template-columns: repeat(auto-fill, minmax(260px, 1fr));
          gap: var(--space-5);
          position: relative;
          z-index: 1;
        }

        .menu-grid-item {
          display: flex;
        }

        .menu-card {
          display: flex;
          flex-direction: column;
          width: 100%;
          background: var(--c-surface-2);
          border: 1px solid var(--c-border);
          border-radius: var(--radius-lg);
          overflow: hidden;
          transition: transform var(--dur) var(--ease),
                      border-color var(--dur) var(--ease),
                      box-shadow var(--dur) var(--ease);
        }

        .menu-card:hover {
          transform: translateY(-4px);
          border-color: var(--c-border-strong);
          box-shadow: var(--shadow-lg);
        }

        .menu-image-container {
          position: relative;
          aspect-ratio: 4 / 3;
          overflow: hidden;
        }

        .menu-image {
          width: 100%;
          height: 100%;
          object-fit: cover;
          transition: transform var(--dur-slow) var(--ease);
        }

        .menu-card:hover .menu-image {
          transform: scale(1.05);
        }

        .menu-category-badge {
          position: absolute;
          top: var(--space-3);
          left: var(--space-3);
          padding: 6px 14px;
          background: color-mix(in srgb, var(--c-bg) 72%, transparent);
          backdrop-filter: blur(8px);
          border: 1px solid var(--c-gold-line);
          color: var(--c-gold);
          font-family: var(--font-sans);
          font-size: var(--fs-xs);
          font-weight: 600;
          letter-spacing: 0.14em;
          text-transform: uppercase;
          border-radius: var(--radius-pill);
        }

        .menu-card-content {
          display: flex;
          flex-direction: column;
          gap: var(--space-2);
          padding: var(--space-5);
          flex: 1;
        }

        .menu-item-name {
          font-family: var(--font-display);
          font-size: var(--fs-h3);
          color: var(--c-text);
        }

        .menu-item-desc {
          font-family: var(--font-sans);
          font-size: var(--fs-base);
          color: var(--c-text-2);
          line-height: 1.65;
          flex: 1;
        }

        .menu-price {
          margin-top: var(--space-2);
          font-family: var(--font-sans);
          font-size: var(--fs-lg);
          font-weight: 600;
          letter-spacing: 0.01em;
          color: var(--c-gold);
        }

        .menu-cta {
          display: flex;
          justify-content: center;
          margin-top: clamp(40px, 6vw, 64px);
          position: relative;
          z-index: 1;
        }

        @media (max-width: 560px) {
          .menu-grid {
            grid-template-columns: 1fr;
          }
        }
      `}</style>
    </section>
  );
};

export default MenuSection;
