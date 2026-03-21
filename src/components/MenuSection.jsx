import FadeIn from './FadeIn';
import { MENU_ITEMS } from '../data/menuItems';

const MenuSection = () => {
  return (
    <section id="menu" className="menu-section">
      <FadeIn>
        <div className="menu-header">
          <h2 className="menu-title">Signature Creations</h2>
          <div className="menu-underline"></div>
          <p className="menu-subtitle">
            Experience the authentic flavors of Uzbek cuisine
          </p>
        </div>
      </FadeIn>

      <div className="menu-grid">
        {MENU_ITEMS.map((item, index) => (
          <FadeIn key={index} delay={index * 100}>
            <div className="menu-card">
              <div className="menu-image-container">
                <img
                  src={item.image}
                  alt={item.name}
                  className="menu-image"
                />
                <div className="menu-image-overlay"></div>
                <span className="menu-category-badge">{item.badge}</span>
              </div>
              <div className="menu-card-content">
                <h3 className="menu-item-name">{item.name}</h3>
                <p className="menu-item-desc">{item.desc}</p>
                <div className="menu-footer">
                  <span className="menu-price">{item.price}</span>
                  <button className="menu-order-btn">Order Now</button>
                </div>
              </div>
            </div>
          </FadeIn>
        ))}
      </div>

      <style jsx>{`
        .menu-section {
          padding: 100px 48px;
          max-width: 1400px;
          margin: 0 auto;
          background: linear-gradient(180deg, #000000 0%, #0a0a0a 50%, #000000 100%);
        }

        .menu-header {
          text-align: center;
          margin-bottom: 80px;
        }

        .menu-title {
          font-family: 'Playfair Display', serif;
          font-size: clamp(36px, 6vw, 56px);
          margin-bottom: 16px;
          color: #ffffff;
          font-weight: 400;
          letter-spacing: 2px;
        }

        .menu-underline {
          width: 80px;
          height: 3px;
          background: linear-gradient(90deg, transparent, #d4af37, transparent);
          margin: 0 auto 24px;
        }

        .menu-subtitle {
          font-family: 'Jost', sans-serif;
          font-size: 16px;
          color: #888888;
          letter-spacing: 1px;
          text-transform: uppercase;
        }

        .menu-grid {
          display: grid;
          grid-template-columns: repeat(auto-fit, minmax(280px, 1fr));
          gap: 32px;
        }

        .menu-card {
          background: linear-gradient(145deg, #0f0f0f, #080808);
          border-radius: 16px;
          overflow: hidden;
          border: 1px solid rgba(212, 175, 55, 0.1);
          transition: all 0.4s cubic-bezier(0.4, 0, 0.2, 1);
        }

        .menu-card:hover {
          transform: translateY(-8px);
          border-color: rgba(212, 175, 55, 0.4);
          box-shadow:
            0 20px 60px rgba(0, 0, 0, 0.6),
            0 0 40px rgba(212, 175, 55, 0.1);
        }

        .menu-image-container {
          position: relative;
          height: 220px;
          overflow: hidden;
        }

        .menu-image {
          width: 100%;
          height: 100%;
          object-fit: cover;
          transition: transform 0.5s ease;
        }

        .menu-card:hover .menu-image {
          transform: scale(1.08);
        }

        .menu-image-overlay {
          position: absolute;
          inset: 0;
          background: linear-gradient(
            180deg,
            transparent 0%,
            transparent 60%,
            rgba(0, 0, 0, 0.8) 100%
          );
        }

        .menu-category-badge {
          position: absolute;
          top: 16px;
          left: 16px;
          padding: 6px 16px;
          background: rgba(0, 0, 0, 0.7);
          backdrop-filter: blur(10px);
          border: 1px solid rgba(212, 175, 55, 0.4);
          color: #d4af37;
          font-family: 'Jost', sans-serif;
          font-size: 11px;
          font-weight: 600;
          letter-spacing: 1.5px;
          text-transform: uppercase;
          border-radius: 4px;
        }

        .menu-card-content {
          padding: 24px;
        }

        .menu-item-name {
          font-family: 'Playfair Display', serif;
          font-size: 22px;
          margin-bottom: 12px;
          color: #ffffff;
          font-weight: 400;
        }

        .menu-item-desc {
          font-family: 'Cormorant Garamond', serif;
          font-size: 16px;
          color: #a0a0a0;
          line-height: 1.7;
          margin-bottom: 20px;
        }

        .menu-footer {
          display: flex;
          align-items: center;
          justify-content: space-between;
          padding-top: 16px;
          border-top: 1px solid rgba(212, 175, 55, 0.15);
        }

        .menu-price {
          font-family: 'Playfair Display', serif;
          font-size: 24px;
          color: #d4af37;
          font-weight: 400;
        }

        .menu-order-btn {
          padding: 10px 24px;
          background: linear-gradient(135deg, #d4af37, #c9a227);
          color: #000000;
          font-family: 'Jost', sans-serif;
          font-size: 13px;
          font-weight: 600;
          letter-spacing: 0.5px;
          border: none;
          border-radius: 8px;
          cursor: pointer;
          transition: all 0.3s ease;
        }

        .menu-order-btn:hover {
          background: linear-gradient(135deg, #e5c347, #d4af37);
          transform: translateY(-2px);
          box-shadow: 0 8px 20px rgba(212, 175, 55, 0.3);
        }

        .menu-order-btn:active {
          transform: translateY(0);
        }

        @media (max-width: 768px) {
          .menu-section {
            padding: 60px 20px;
          }

          .menu-header {
            margin-bottom: 48px;
          }

          .menu-grid {
            grid-template-columns: 1fr;
            gap: 24px;
          }

          .menu-image-container {
            height: 200px;
          }

          .menu-card-content {
            padding: 20px;
          }

          .menu-item-name {
            font-size: 20px;
          }

          .menu-item-desc {
            font-size: 15px;
          }

          .menu-price {
            font-size: 20px;
          }

          .menu-order-btn {
            padding: 8px 18px;
            font-size: 12px;
          }
        }

        @media (max-width: 480px) {
          .menu-footer {
            flex-direction: column;
            gap: 12px;
            align-items: flex-start;
          }

          .menu-order-btn {
            width: 100%;
          }
        }
      `}</style>
    </section>
  );
};

export default MenuSection;
