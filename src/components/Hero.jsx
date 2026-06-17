import { useState, useEffect } from 'react';
import Button from './ui/Button';
import Icon from './ui/Icon';

const Hero = ({ onOpenReservation }) => {
  const [heroReady, setHeroReady] = useState(false);

  useEffect(() => {
    const timer = setTimeout(() => setHeroReady(true), 100);
    return () => clearTimeout(timer);
  }, []);

  return (
    <section className="hero" aria-label="Welcome to KURUTOB">
      <div className="hero-bg" aria-hidden="true" />
      <div className="hero-scrim" aria-hidden="true" />
      <span className="hero-glow glow-accent" aria-hidden="true" />

      <div className={`hero-content ${heroReady ? 'is-ready' : ''}`}>
        <span className="hero-eyebrow">
          <Icon name="sparkle" size={14} />
          Authentic Tajik Cuisine
        </span>

        <h1 className="hero-title">KURUTOB</h1>

        <p className="hero-subheading">
          A taste of Tajik and Central Asian traditions, served with modern
          elegance in the heart of Tashkent.
        </p>

        <div className="hero-actions">
          <Button variant="primary" size="lg" onClick={onOpenReservation}>
            Book a Table
            <Icon name="arrowRight" size={18} />
          </Button>
          <Button variant="secondary" size="lg" as="a" href="#menu">
            View Menu
          </Button>
        </div>

        <p className="hero-trust">
          Since 2010
          <span className="hero-trust-dot" aria-hidden="true">·</span>
          3 locations across Tashkent
        </p>
      </div>

      <a className="hero-scroll" href="#menu" aria-label="Scroll to explore the menu">
        <span className="hero-scroll-label" aria-hidden="true">Explore</span>
        <span className="hero-scroll-line" aria-hidden="true" />
      </a>

      <style jsx>{`
        .hero {
          position: relative;
          min-height: 100vh;
          min-height: 100svh;
          display: flex;
          flex-direction: column;
          align-items: center;
          justify-content: center;
          text-align: center;
          padding: calc(var(--nav-h) + var(--space-7)) var(--container-pad)
            var(--space-9);
          background: var(--c-bg);
          overflow: hidden;
        }

        .hero-bg {
          position: absolute;
          inset: 0;
          background-color: var(--c-bg);
          background-image: url('/image.png');
          background-repeat: no-repeat;
          background-position: center center;
          background-size: cover;
          z-index: 0;
        }

        /* Refined dark gradient scrim — guarantees text contrast.
           Derived from --c-bg via color-mix so it tracks the theme. */
        .hero-scrim {
          position: absolute;
          inset: 0;
          background:
            linear-gradient(
              180deg,
              color-mix(in srgb, var(--c-bg) 55%, transparent) 0%,
              color-mix(in srgb, var(--c-bg) 40%, transparent) 38%,
              color-mix(in srgb, var(--c-bg) 70%, transparent) 78%,
              color-mix(in srgb, var(--c-bg) 95%, transparent) 100%
            ),
            radial-gradient(
              130% 90% at 50% 42%,
              color-mix(in srgb, var(--c-bg) 25%, transparent) 0%,
              color-mix(in srgb, var(--c-bg) 78%, transparent) 100%
            );
          z-index: 1;
        }

        /* Ambient gold glow for depth (replaces the emoji pot focal) */
        .hero-glow {
          width: clamp(360px, 60vw, 720px);
          height: clamp(360px, 60vw, 720px);
          left: 50%;
          bottom: -22%;
          transform: translateX(-50%);
          opacity: 0.7;
          z-index: 1;
        }

        .hero-content {
          position: relative;
          z-index: 2;
          display: flex;
          flex-direction: column;
          align-items: center;
          max-width: 640px;
          opacity: 0;
          transform: translateY(24px);
          transition:
            opacity var(--dur-slow) var(--ease-out),
            transform var(--dur-slow) var(--ease-out);
        }
        .hero-content.is-ready {
          opacity: 1;
          transform: translateY(0);
        }

        .hero-eyebrow {
          display: inline-flex;
          align-items: center;
          gap: var(--space-2);
          font-family: var(--font-sans);
          font-size: var(--fs-xs);
          font-weight: 600;
          letter-spacing: 0.22em;
          text-transform: uppercase;
          color: var(--c-gold);
          background: var(--c-gold-soft);
          border: 1px solid var(--c-gold-line);
          border-radius: var(--radius-pill);
          padding: var(--space-2) var(--space-4);
          margin-bottom: var(--space-5);
          backdrop-filter: blur(6px);
        }

        .hero-title {
          font-family: var(--font-display);
          font-weight: 800;
          font-size: var(--fs-display);
          line-height: 0.95;
          letter-spacing: 0.01em;
          color: var(--c-text);
          margin-bottom: var(--space-5);
          text-shadow: var(--shadow-lg);
        }

        .hero-subheading {
          font-family: var(--font-sans);
          font-size: var(--fs-lg);
          color: var(--c-text-2);
          max-width: 30ch;
          line-height: 1.6;
          margin-bottom: var(--space-7);
        }

        .hero-actions {
          display: flex;
          flex-direction: row;
          gap: var(--space-4);
          justify-content: center;
          flex-wrap: wrap;
        }

        .hero-trust {
          display: inline-flex;
          align-items: center;
          gap: var(--space-2);
          flex-wrap: wrap;
          justify-content: center;
          margin-top: var(--space-6);
          font-family: var(--font-sans);
          font-size: var(--fs-sm);
          color: var(--c-text-3);
          letter-spacing: 0.02em;
        }
        .hero-trust-dot {
          color: var(--c-gold);
        }

        .hero-scroll {
          position: absolute;
          bottom: var(--space-5);
          left: 50%;
          transform: translateX(-50%);
          z-index: 2;
          display: inline-flex;
          flex-direction: column;
          align-items: center;
          gap: var(--space-2);
          opacity: 0;
          transition:
            opacity var(--dur-slow) var(--ease-out) 400ms,
            color var(--dur) var(--ease);
          color: var(--c-text-3);
        }
        .hero-content.is-ready ~ .hero-scroll {
          opacity: 1;
        }
        .hero-scroll:hover {
          color: var(--c-gold);
        }
        .hero-scroll-label {
          font-family: var(--font-sans);
          font-size: var(--fs-xs);
          font-weight: 600;
          letter-spacing: 0.22em;
          text-transform: uppercase;
        }
        .hero-scroll-line {
          position: relative;
          width: 1px;
          height: 40px;
          background: linear-gradient(180deg, transparent 0%, var(--c-gold) 100%);
        }
        .hero-scroll-line::after {
          content: '';
          position: absolute;
          left: 50%;
          width: 4px;
          height: 4px;
          margin-left: -2px;
          border-radius: 50%;
          background: var(--c-gold);
          animation: hero-scroll-dot 2s var(--ease-out) infinite;
        }
        @keyframes hero-scroll-dot {
          0% {
            opacity: 0;
            transform: translateY(0);
          }
          25% {
            opacity: 1;
          }
          75% {
            opacity: 1;
          }
          100% {
            opacity: 0;
            transform: translateY(36px);
          }
        }

        @media (max-width: 640px) {
          .hero {
            padding: calc(var(--nav-h) + var(--space-6)) var(--container-pad)
              var(--space-8);
          }
          .hero-actions {
            flex-direction: column;
            align-items: stretch;
            width: 100%;
            max-width: 320px;
          }
        }

        @media (prefers-reduced-motion: reduce) {
          .hero-scroll-line::after {
            animation: none;
            opacity: 1;
          }
        }
      `}</style>
    </section>
  );
};

export default Hero;
