import FadeIn from './FadeIn';
import { MENU_ITEMS } from '../data/menuItems';

const MENU_EMOJIS = ['🥘', '🥟', '🍚', '🥟'];

const MenuSection = () => {
  return (
    <section id="menu" className="menu-section">
      <FadeIn>
        <div className="menu-header">
          <h2 className="menu-title">Signature Creations</h2>
          <div className="menu-underline"></div>
        </div>
      </FadeIn>

      <div className="menu-grid">
        {MENU_ITEMS.map((item, index) => (
          <FadeIn key={index} delay={index * 100}>
            <div
              className="menu-card"
              style={{ background: item.bg }}
            >
              <div
                className="menu-image-area"
                style={{ background: `linear-gradient(160deg, ${item.bg}, #1a1408)` }}
              >
                <span className="menu-emoji">{MENU_EMOJIS[index]}</span>
                <span
                  className="price-badge"
                  style={{ background: item.accent }}
                >
                  {item.price}
                </span>
              </div>
              <div className="menu-card-content">
                <span
                  className="menu-item-badge"
                  style={{ borderColor: item.accent }}
                >
                  {item.badge}
                </span>
                <h3
                  className="menu-item-name"
                  style={{ color: item.accent }}
                >
                  {item.name}
                </h3>
                <p className="menu-item-desc">{item.desc}</p>
              </div>
            </div>
          </FadeIn>
        ))}
      </div>

      <style jsx>{`
        .menu-section {
          padding: 100px 48px;
          max-width: 1200px;
          margin: 0 auto;
        }

        .menu-header {
          text-align: center;
          margin-bottom: 60px;
        }

        .menu-title {
          font-family: 'Playfair Display', serif;
          font-size: clamp(32px, 5vw, 48px);
          margin-bottom: 12px;
          color: #f0e6cc;
        }

        .menu-underline {
          width: 60px;
          height: 2px;
          background: #d4a017;
          margin: 0 auto;
        }

        .menu-grid {
          display: grid;
          grid-template-columns: repeat(auto-fit, minmax(240px, 1fr));
          gap: 24px;
        }

        .menu-card {
          border: 1px solid rgba(212, 160, 23, 0.15);
          overflow: hidden;
        }

        .menu-card:hover {
          transform: translateY(-6px);
          box-shadow: 0 20px 40px rgba(0, 0, 0, 0.5);
          transition: all 0.3s ease;
        }

        .menu-image-area {
          position: relative;
          height: 200px;
          display: flex;
          align-items: center;
          justify-content: center;
        }

        .menu-emoji {
          font-size: 64px;
        }

        .price-badge {
          position: absolute;
          top: 12px;
          right: 12px;
          padding: 6px 14px;
          color: #0e0d08;
          font-family: 'Jost', sans-serif;
          font-weight: 600;
          font-size: 14px;
          letter-spacing: 0.5px;
        }

        .menu-card-content {
          padding: 20px;
        }

        .menu-item-badge {
          display: inline-block;
          padding: 4px 12px;
          margin-bottom: 12px;
          font-family: 'Jost', sans-serif;
          font-size: 11px;
          font-weight: 500;
          letter-spacing: 1.5px;
          text-transform: uppercase;
          border: 1px solid;
          color: rgba(232, 223, 200, 0.6);
        }

        .menu-item-name {
          font-family: 'Playfair Display', serif;
          font-size: 20px;
          margin-bottom: 8px;
        }

        .menu-item-desc {
          font-family: 'Cormorant Garamond', serif;
          font-size: 15px;
          color: rgba(232, 223, 200, 0.6);
          line-height: 1.6;
        }

        @media (max-width: 640px) {
          .menu-section {
            padding: 60px 20px;
          }

          .menu-grid {
            grid-template-columns: 1fr;
            gap: 16px;
          }

          .menu-image-area {
            height: 160px;
          }

          .menu-emoji {
            font-size: 48px;
          }

          .price-badge {
            font-size: 12px;
            padding: 4px 10px;
          }

          .menu-card-content {
            padding: 16px;
          }

          .menu-item-name {
            font-size: 18px;
          }

          .menu-item-desc {
            font-size: 14px;
          }
        }
      `}</style>
    </section>
  );
};

export default MenuSection;
