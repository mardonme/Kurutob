import { useState, useRef, useEffect } from 'react';
import Icon from './ui/Icon';

// TODO: replace href placeholders with the brand's real social profile URLs.
const SOCIALS = [
  { name: 'facebook', label: 'Kurutob on Facebook', href: '#' },
  { name: 'instagram', label: 'Kurutob on Instagram', href: '#' },
  { name: 'telegram', label: 'Kurutob on Telegram', href: '#' },
  { name: 'youtube', label: 'Kurutob on YouTube', href: '#' },
];

const HOURS = [
  { days: 'Monday–Friday', time: '09:00–23:00' },
  { days: 'Saturday–Sunday', time: '09:00–00:00' },
];

const Footer = () => {
  const [email, setEmail] = useState('');
  const [subscribed, setSubscribed] = useState(false);
  const resetTimer = useRef(null);

  useEffect(() => () => clearTimeout(resetTimer.current), []);

  const handleSubmit = (e) => {
    e.preventDefault();
    console.log('Newsletter subscription:', email);
    setEmail('');
    setSubscribed(true);
    clearTimeout(resetTimer.current);
    resetTimer.current = setTimeout(() => setSubscribed(false), 4000);
  };

  return (
    <footer className="footer">
      <span className="footer-glow glow-accent" aria-hidden="true" />

      <div className="footer-grid">
        {/* COLUMN 1 — Brand */}
        <div className="footer-column footer-column--brand">
          <img
            src="/logo-mark.png"
            className="footer-logo"
            alt="Kurutob"
            width="438"
            height="93"
            loading="lazy"
            decoding="async"
          />

          <p className="footer-tagline">
            Preserving the rich Tajik culinary heritage since 2010. The authentic
            taste of Central Asia in the heart of Tashkent.
          </p>

          <div className="footer-socials">
            {SOCIALS.map((s) => (
              <a
                key={s.name}
                href={s.href}
                className="footer-social"
                aria-label={s.label}
              >
                <Icon name={s.name} size={18} />
              </a>
            ))}
          </div>
        </div>

        {/* COLUMN 2 — Opening Hours */}
        <div className="footer-column">
          <h2 className="footer-section-title">
            <Icon name="clock" size={15} />
            Opening Hours
          </h2>
          <dl className="footer-hours">
            {HOURS.map((h) => (
              <div className="footer-hours-row" key={h.days}>
                <dt className="footer-hours-days">{h.days}</dt>
                <dd className="footer-hours-time">{h.time}</dd>
              </div>
            ))}
          </dl>
        </div>

        {/* COLUMN 3 — Contact Us */}
        <div className="footer-column">
          <h2 className="footer-section-title">Contact Us</h2>
          <ul className="footer-contact">
            <li className="footer-contact-row">
              <span className="footer-contact-icon" aria-hidden="true">
                <Icon name="mapPin" size={17} />
              </span>
              <span className="footer-contact-text">
                Main Office: Shota Rustaveli 50, Tashkent, Uzbekistan
              </span>
            </li>
            <li className="footer-contact-row">
              <span className="footer-contact-icon" aria-hidden="true">
                <Icon name="mail" size={17} />
              </span>
              <a className="footer-contact-link" href="mailto:hello@kurutob.uz">
                hello@kurutob.uz
              </a>
            </li>
            <li className="footer-contact-row">
              <span className="footer-contact-icon" aria-hidden="true">
                <Icon name="phone" size={17} />
              </span>
              <a className="footer-contact-link" href="tel:+998712340400">
                +998 71 234 04 00
              </a>
            </li>
          </ul>
        </div>

        {/* COLUMN 4 — Newsletter */}
        <div className="footer-column">
          <h2 className="footer-section-title">Newsletter</h2>
          <p className="footer-newsletter-text">
            Subscribe to get exclusive offers and seasonal menus.
          </p>

          <form className="footer-newsletter-form" onSubmit={handleSubmit}>
            <label htmlFor="footer-email" className="sr-only">
              Email address for newsletter
            </label>
            <div className="footer-newsletter-field">
              <input
                id="footer-email"
                type="email"
                placeholder="Enter your email"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                required
                className="footer-newsletter-input"
                autoComplete="email"
              />
              <button
                type="submit"
                className="footer-newsletter-submit"
                aria-label="Subscribe to newsletter"
              >
                <Icon name="arrowRight" size={18} />
              </button>
            </div>
          </form>

          <p
            className={`footer-newsletter-success${subscribed ? ' is-visible' : ''}`}
            role="status"
            aria-live="polite"
          >
            {subscribed && (
              <>
                <Icon name="checkCircle" size={16} />
                You&rsquo;re subscribed
              </>
            )}
          </p>
        </div>
      </div>

      <div className="footer-bottom">
        <p className="footer-copyright">
          © {new Date().getFullYear()} Kurutob. All rights reserved.
        </p>
      </div>

      <style jsx>{`
        .footer {
          position: relative;
          overflow: hidden;
          border-top: 1px solid var(--c-border);
          padding: var(--space-8) var(--container-pad) var(--space-7);
          background: var(--c-bg);
        }

        .footer-glow {
          width: 600px;
          height: 600px;
          top: -340px;
          left: 50%;
          transform: translateX(-50%);
        }

        .footer-grid {
          position: relative;
          z-index: 1;
          display: grid;
          grid-template-columns: 1.6fr 1fr 1.2fr 1.1fr;
          gap: var(--space-7);
          margin: 0 auto var(--space-7);
          max-width: var(--container);
        }

        .footer-column {
          display: flex;
          flex-direction: column;
          min-width: 0;
        }

        /* COLUMN 1 — Brand */
        .footer-logo {
          height: 46px;
          width: auto;
          margin-bottom: var(--space-4);
        }

        .footer-tagline {
          font-family: var(--font-sans);
          font-size: var(--fs-sm);
          color: var(--c-text-2);
          line-height: 1.75;
          max-width: 34ch;
          margin-bottom: var(--space-5);
        }

        .footer-socials {
          display: flex;
          gap: var(--space-2);
        }

        .footer-social {
          display: inline-flex;
          align-items: center;
          justify-content: center;
          width: 40px;
          height: 40px;
          color: var(--c-text-2);
          background: var(--c-gold-soft);
          border: 1px solid var(--c-gold-line);
          border-radius: var(--radius-md);
          transition: color var(--dur) var(--ease),
            background var(--dur) var(--ease),
            border-color var(--dur) var(--ease),
            transform var(--dur) var(--ease);
        }

        .footer-social:hover {
          color: var(--c-on-gold);
          background: var(--c-gold);
          border-color: var(--c-gold);
          transform: translateY(-2px);
        }

        /* Section titles — Jost, uppercase, gold */
        .footer-section-title {
          display: inline-flex;
          align-items: center;
          gap: var(--space-2);
          font-family: var(--font-sans);
          font-weight: 600;
          font-size: var(--fs-xs);
          letter-spacing: 0.18em;
          text-transform: uppercase;
          color: var(--c-gold);
          margin-bottom: var(--space-5);
        }

        /* COLUMN 2 — Opening Hours */
        .footer-hours {
          display: flex;
          flex-direction: column;
          gap: var(--space-3);
        }

        .footer-hours-row {
          display: flex;
          justify-content: space-between;
          align-items: baseline;
          gap: var(--space-3);
        }

        .footer-hours-days {
          font-family: var(--font-sans);
          font-size: var(--fs-sm);
          color: var(--c-text-3);
        }

        .footer-hours-time {
          font-family: var(--font-sans);
          font-size: var(--fs-sm);
          font-weight: 500;
          color: var(--c-text);
          font-variant-numeric: tabular-nums;
        }

        /* COLUMN 3 — Contact Us */
        .footer-contact {
          display: flex;
          flex-direction: column;
          gap: var(--space-4);
        }

        .footer-contact-row {
          display: flex;
          align-items: flex-start;
          gap: var(--space-3);
        }

        .footer-contact-icon {
          flex-shrink: 0;
          display: inline-flex;
          color: var(--c-gold);
          margin-top: 2px;
        }

        .footer-contact-text {
          font-family: var(--font-sans);
          font-size: var(--fs-sm);
          color: var(--c-text-2);
          line-height: 1.55;
        }

        .footer-contact-link {
          font-family: var(--font-sans);
          font-size: var(--fs-sm);
          color: var(--c-text-2);
          line-height: 1.55;
          transition: color var(--dur) var(--ease);
        }

        .footer-contact-link:hover {
          color: var(--c-gold);
        }

        /* COLUMN 4 — Newsletter */
        .footer-newsletter-text {
          font-family: var(--font-sans);
          font-size: var(--fs-sm);
          color: var(--c-text-2);
          line-height: 1.6;
          margin-bottom: var(--space-4);
        }

        .footer-newsletter-field {
          display: flex;
          align-items: stretch;
          background: var(--c-surface-2);
          border: 1px solid var(--c-border);
          border-radius: var(--radius-md);
          transition: border-color var(--dur) var(--ease),
            box-shadow var(--dur) var(--ease);
        }

        .footer-newsletter-field:focus-within {
          border-color: var(--c-gold);
          box-shadow: 0 0 0 3px var(--c-gold-soft);
        }

        .footer-newsletter-input {
          flex: 1;
          min-width: 0;
          min-height: 44px;
          padding: var(--space-3) var(--space-4);
          background: transparent;
          border: none;
          border-radius: var(--radius-md) 0 0 var(--radius-md);
          color: var(--c-text);
          font-family: var(--font-sans);
          font-size: var(--fs-sm);
          outline: none;
        }

        .footer-newsletter-input::placeholder {
          color: var(--c-text-3);
        }

        .footer-newsletter-submit {
          display: inline-flex;
          align-items: center;
          justify-content: center;
          flex-shrink: 0;
          width: 48px;
          min-height: 44px;
          background: var(--c-gold);
          color: var(--c-on-gold);
          border: none;
          border-radius: 0 var(--radius-md) var(--radius-md) 0;
          cursor: pointer;
          transition: background var(--dur) var(--ease);
        }

        .footer-newsletter-submit:hover {
          background: var(--c-gold-hover);
        }

        .footer-newsletter-success {
          display: inline-flex;
          align-items: center;
          gap: var(--space-2);
          min-height: 22px;
          margin-top: var(--space-3);
          font-family: var(--font-sans);
          font-size: var(--fs-sm);
          font-weight: 500;
          color: var(--c-success);
          opacity: 0;
          transition: opacity var(--dur) var(--ease);
        }

        .footer-newsletter-success.is-visible {
          opacity: 1;
        }

        /* Footer bottom */
        .footer-bottom {
          position: relative;
          z-index: 1;
          text-align: center;
          padding-top: var(--space-5);
          border-top: 1px solid var(--c-border);
          max-width: var(--container);
          margin-inline: auto;
        }

        .footer-copyright {
          font-family: var(--font-sans);
          font-size: var(--fs-xs);
          color: var(--c-text-3);
          letter-spacing: 0.06em;
        }

        /* Responsive */
        @media (max-width: 1024px) {
          .footer-grid {
            grid-template-columns: repeat(2, 1fr);
            gap: var(--space-6);
          }
          .footer-column--brand {
            grid-column: 1 / -1;
          }
        }

        @media (max-width: 640px) {
          .footer {
            padding: var(--space-7) var(--container-pad) var(--space-6);
          }
          .footer-grid {
            grid-template-columns: 1fr;
            gap: var(--space-6);
          }
          .footer-column--brand {
            grid-column: auto;
          }
        }
      `}</style>
    </footer>
  );
};

export default Footer;
