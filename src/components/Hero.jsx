import { useState, useEffect } from 'react';

const Hero = () => {
  const [heroReady, setHeroReady] = useState(false);

  useEffect(() => {
    const timer = setTimeout(() => setHeroReady(true), 100);
    return () => clearTimeout(timer);
  }, []);

  return (
    <section className="hero">
      <div className={`hero-content ${heroReady ? 'ready' : ''}`}>
        <span className="hero-eyebrow">Premium Dining Experience</span>
        <h1 className="hero-title">KURUTOB</h1>
        <p className="hero-subheading">
          Taste of Tajik Traditions — served with modern elegance in the heart of Tashkent.
        </p>
        <div className="hero-buttons">
          <button className="btn-primary">View Menu</button>
          <button className="btn-secondary">Order Delivery</button>
        </div>
      </div>

      <div className={`hero-pot-glow ${heroReady ? 'ready' : ''}`}>
        <span className="hero-pot">🫕</span>
      </div>

      <div className="scroll-indicator">
        <div className="scroll-line"></div>
      </div>

      <style jsx>{`
        .hero {
          position: relative;
          min-height: 100vh;
          height: 100vh;
          max-height: 900px;
          display: flex;
          flex-direction: column;
          align-items: center;
          justify-content: center;
          text-align: center;
          padding: 120px 24px 80px;
          background: url('/image.png') no-repeat center center / cover;
          overflow: hidden;
        }

        .hero::before {
          content: '';
          position: absolute;
          inset: 0;
          background: linear-gradient(
            135deg,
            rgba(14, 13, 8, 0.85) 0%,
            rgba(14, 13, 8, 0.65) 40%,
            rgba(14, 13, 8, 0.75) 70%,
            rgba(14, 13, 8, 0.9) 100%
          );
          z-index: 1;
        }

        .hero-content {
          opacity: 0;
          transform: translateY(20px);
          transition: opacity 1s ease, transform 1s ease;
          position: relative;
          z-index: 2;
        }

        .hero-content.ready {
          opacity: 1;
          transform: translateY(0);
        }

        .hero-eyebrow {
          font-family: 'Jost', sans-serif;
          font-size: 11px;
          letter-spacing: 4px;
          color: #d4a017;
          text-transform: uppercase;
          display: inline-block;
          border: 1px solid rgba(212, 160, 23, 0.3);
          padding: 5px 16px;
          margin-bottom: 20px;
        }

        .hero-title {
          font-family: 'Playfair Display', serif;
          font-weight: 900;
          font-size: clamp(72px, 14vw, 140px);
          line-height: 0.9;
          letter-spacing: 0.02em;
          color: #f0e6cc;
          margin-bottom: 24px;
        }

        .hero-subheading {
          font-family: 'Cormorant Garamond', serif;
          font-size: clamp(16px, 2.5vw, 22px);
          font-style: italic;
          color: rgba(232, 223, 200, 0.65);
          max-width: 480px;
          line-height: 1.6;
          margin-bottom: 44px;
        }

        .hero-buttons {
          display: flex;
          flex-direction: row;
          gap: 16px;
          justify-content: center;
          flex-wrap: wrap;
        }

        .btn-primary {
          background: #d4a017;
          color: #0e0d08;
          border: none;
          padding: 13px 28px;
          font-family: 'Jost', sans-serif;
          font-weight: bold;
          font-size: 13px;
          letter-spacing: 1.5px;
          text-transform: uppercase;
          cursor: pointer;
          transition: background 0.3s ease;
        }

        .btn-primary:hover {
          background: #e8b42a;
        }

        .btn-secondary {
          background: transparent;
          border: 1.5px solid rgba(232, 223, 200, 0.5);
          color: #e8dfc8;
          padding: 13px 28px;
          font-family: 'Jost', sans-serif;
          font-weight: bold;
          font-size: 13px;
          letter-spacing: 1.5px;
          text-transform: uppercase;
          cursor: pointer;
          transition: border-color 0.3s ease, color 0.3s ease;
        }

        .btn-secondary:hover {
          border-color: #d4a017;
          color: #d4a017;
        }

        .hero-pot-glow {
          position: absolute;
          bottom: -30px;
          left: 50%;
          transform: translateX(-50%);
          width: 320px;
          height: 180px;
          background: radial-gradient(ellipse at center, rgba(212, 160, 23, 0.4) 0%, transparent 70%);
          display: flex;
          align-items: center;
          justify-content: center;
          opacity: 0;
          transition: opacity 0.5s ease 0.5s;
          pointer-events: none;
        }

        .hero-pot-glow.ready {
          opacity: 0.35;
        }

        .hero-pot {
          font-size: 120px;
          filter: drop-shadow(0 10px 30px rgba(0, 0, 0, 0.3));
        }

        .scroll-indicator {
          position: absolute;
          bottom: 32px;
          left: 50%;
          transform: translateX(-50%);
          display: flex;
          align-items: center;
        }

        .scroll-line {
          width: 1px;
          height: 40px;
          background: linear-gradient(180deg, transparent 0%, #d4a017 100%);
        }

        /* Mobile responsiveness */
        @media (max-width: 640px) {
          .hero {
            padding: 100px 20px 60px;
          }

          .hero-title {
            font-size: clamp(56px, 18vw, 100px);
          }

          .hero-buttons {
            flex-direction: column;
            align-items: center;
          }

          .hero-pot {
            font-size: 80px;
          }

          .hero-pot-glow {
            width: 240px;
            height: 140px;
          }

          .btn-primary,
          .btn-secondary {
            width: 100%;
            max-width: 280px;
          }
        }
      `}</style>
    </section>
  );
};

export default Hero;
