import FadeIn from './FadeIn';

const CtaBanner = () => {
  return (
    <FadeIn>
      <div className="cta-container">
        <div className="cta-content">
          <h2 className="cta-heading">
            Bringing Traditions to Your<br />
            <em className="cta-italic">Doorstep</em>
          </h2>
          <p className="cta-subtext">
            Sharing the warmth of Tajik hospitality! Our lightning-fast delivery service covers all of Tashkent, ensuring your Kurutob arrives fresh, warm, and authentic.
          </p>
          <div className="cta-badges">
            <div className="cta-badge">
              <span className="badge-emoji">🚀</span>
              <span className="badge-text">Fast Delivery</span>
            </div>
            <div className="cta-badge">
              <span className="badge-emoji">📦</span>
              <span className="badge-text">Fresh Packaging</span>
            </div>
            <div className="cta-badge">
              <span className="badge-emoji">❄️</span>
              <span className="badge-text">Temperature Control</span>
            </div>
          </div>
        </div>

        <div className="cta-action">
          <button className="cta-button">Order Delivery</button>
          <p className="cta-phone">
            or call us at <a href="tel:+998900940400">+998 90 094 04 00</a>
          </p>
        </div>
      </div>

      <style jsx>{`
        .cta-container {
          margin: 0 auto;
          max-width: 1200px;
          margin-bottom: 100px;
          padding: 72px 64px;
          background: linear-gradient(135deg, #1a1508, #0e0d08);
          border: 1px solid rgba(212, 160, 23, 0.25);
          display: flex;
          align-items: center;
          justify-content: space-between;
          flex-wrap: wrap;
          gap: 32px;
        }

        .cta-content {
          flex: 1;
          min-width: 280px;
        }

        .cta-heading {
          font-family: 'Playfair Display', serif;
          font-size: clamp(28px, 4vw, 42px);
          line-height: 1.2;
          margin-bottom: 8px;
          color: #f0e6cc;
        }

        .cta-italic {
          font-style: italic;
          color: #d4a017;
        }

        .cta-subtext {
          font-family: 'Cormorant Garamond', serif;
          font-size: 17px;
          color: rgba(232, 223, 200, 0.55);
          margin-top: 16px;
          max-width: 480px;
          line-height: 1.7;
        }

        .cta-badges {
          display: flex;
          flex-direction: row;
          gap: 24px;
          margin-top: 24px;
          flex-wrap: wrap;
        }

        .cta-badge {
          display: flex;
          align-items: center;
          gap: 8px;
          background: rgba(212, 160, 23, 0.1);
          border: 1px solid rgba(212, 160, 23, 0.2);
          padding: 8px 16px;
          border-radius: 20px;
        }

        .badge-emoji {
          font-size: 18px;
        }

        .badge-text {
          font-family: 'Jost', sans-serif;
          font-size: 12px;
          font-weight: 500;
          letter-spacing: 1px;
          text-transform: uppercase;
          color: rgba(232, 223, 200, 0.8);
        }

        .cta-action {
          display: flex;
          flex-direction: column;
          align-items: center;
          gap: 12px;
        }

        .cta-button {
          background: #d4a017;
          color: #0e0d08;
          border: none;
          padding: 16px 36px;
          font-family: 'Jost', sans-serif;
          font-weight: 600;
          font-size: 14px;
          letter-spacing: 1.5px;
          text-transform: uppercase;
          cursor: pointer;
          transition: background 0.3s ease;
          white-space: nowrap;
        }

        .cta-button:hover {
          background: #e8b42a;
        }

        .cta-phone {
          font-family: 'Cormorant Garamond', serif;
          font-size: 16px;
          color: rgba(232, 223, 200, 0.6);
        }

        .cta-phone a {
          color: #d4a017;
          text-decoration: none;
          transition: color 0.3s ease;
        }

        .cta-phone a:hover {
          color: #e8b42a;
        }

        @media (max-width: 900px) {
          .cta-container {
            flex-direction: column;
            text-align: center;
            padding: 48px 32px;
          }

          .cta-subtext {
            margin-left: auto;
            margin-right: auto;
          }

          .cta-badges {
            justify-content: center;
          }
        }

        @media (max-width: 640px) {
          .cta-container {
            padding: 32px 24px;
            margin-bottom: 60px;
          }

          .cta-badges {
            flex-direction: column;
            align-items: center;
            gap: 12px;
          }

          .cta-badge {
            width: fit-content;
          }

          .cta-button {
            width: 100%;
            padding: 14px 24px;
          }
        }
      `}</style>
    </FadeIn>
  );
};

export default CtaBanner;
