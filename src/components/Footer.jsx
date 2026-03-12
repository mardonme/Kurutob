import { useState } from 'react';

const Footer = () => {
  const [email, setEmail] = useState('');

  const handleSubmit = (e) => {
    e.preventDefault();
    console.log('Newsletter subscription:', email);
    setEmail('');
  };

  return (
    <footer className="footer">
      <div className="footer-grid">
        {/* COLUMN 1 — Brand */}
        <div className="footer-column">
          <div className="footer-logo">
            🍽 KURUTOB
          </div>
          <p className="footer-tagline">
            Preserving the rich Tajik culinary heritage since 2010. The authentic taste of our homeland in the heart of Tashkent.
          </p>
          <div className="social-icons">
            <button className="social-icon">📘</button>
            <button className="social-icon">📸</button>
            <button className="social-icon">🎵</button>
            <button className="social-icon">▶️</button>
          </div>
        </div>

        {/* COLUMN 2 — Opening Hours */}
        <div className="footer-column">
          <h4 className="footer-section-title">OPENING HOURS</h4>
          <div className="hours-row">
            <span className="hours-days">Monday–Friday</span>
            <span className="hours-time">09:00–23:00</span>
          </div>
          <div className="hours-row">
            <span className="hours-days">Saturday–Sunday</span>
            <span className="hours-time">09:00–00:00</span>
          </div>
        </div>

        {/* COLUMN 3 — Contact Us */}
        <div className="footer-column">
          <h4 className="footer-section-title">CONTACT US</h4>
          <div className="contact-row">
            <span className="contact-icon">📍</span>
            <span className="contact-text">Main Office: Shota Rustaveli 50, Tashkent, Uzbekistan</span>
          </div>
          <div className="contact-row">
            <span className="contact-icon">✉️</span>
            <span className="contact-text">hello@kurutob.uz</span>
          </div>
          <div className="contact-row">
            <span className="contact-icon">📞</span>
            <span className="contact-text">+998 71 234 04 00</span>
          </div>
        </div>

        {/* COLUMN 4 — Newsletter */}
        <div className="footer-column">
          <h4 className="footer-section-title">NEWSLETTER</h4>
          <p className="newsletter-subtext">
            Subscribe to get exclusive offers and seasonal menus.
          </p>
          <form className="newsletter-form" onSubmit={handleSubmit}>
            <input
              type="email"
              placeholder="Enter your email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              required
              className="newsletter-input"
            />
            <button type="submit" className="newsletter-submit">
              →
            </button>
          </form>
        </div>
      </div>

      <div className="footer-bottom">
        <p className="footer-copyright">© 2025 Kurutob. All rights reserved.</p>
      </div>

      <style jsx>{`
        .footer {
          border-top: 1px solid rgba(212, 160, 23, 0.15);
          padding: 64px 48px 40px;
          background: transparent;
        }

        .footer-grid {
          display: grid;
          grid-template-columns: 1.5fr 1fr 1fr 1fr;
          gap: 48px;
          margin-bottom: 48px;
          max-width: 1200px;
          margin-left: auto;
          margin-right: auto;
        }

        .footer-column {
          display: flex;
          flex-direction: column;
        }

        /* COLUMN 1 — Brand */
        .footer-logo {
          font-family: 'Playfair Display', serif;
          font-weight: 700;
          font-size: 18px;
          letter-spacing: 2px;
          color: #d4a017;
          margin-bottom: 16px;
        }

        .footer-tagline {
          font-family: 'Cormorant Garamond', serif;
          font-size: 15px;
          color: rgba(232, 223, 200, 0.45);
          line-height: 1.8;
          margin-bottom: 20px;
        }

        .social-icons {
          display: flex;
          gap: 12px;
        }

        .social-icon {
          background: rgba(212, 160, 23, 0.1);
          border: 1px solid rgba(212, 160, 23, 0.2);
          width: 36px;
          height: 36px;
          display: flex;
          align-items: center;
          justify-content: center;
          font-size: 14px;
          cursor: pointer;
          border-radius: 4px;
          transition: all 0.3s ease;
        }

        .social-icon:hover {
          background: rgba(212, 160, 23, 0.2);
          border-color: rgba(212, 160, 23, 0.4);
        }

        /* COLUMN 2 — Opening Hours */
        .footer-section-title {
          font-family: 'Jost', sans-serif;
          font-weight: 600;
          font-size: 12px;
          letter-spacing: 2px;
          text-transform: uppercase;
          color: #d4a017;
          margin-bottom: 20px;
        }

        .hours-row {
          display: flex;
          justify-content: space-between;
          align-items: center;
          margin-bottom: 12px;
        }

        .hours-days {
          font-family: 'Jost', sans-serif;
          font-size: 12px;
          color: rgba(232, 223, 200, 0.5);
        }

        .hours-time {
          font-family: 'Cormorant Garamond', serif;
          font-size: 16px;
          color: rgba(232, 223, 200, 0.8);
        }

        /* COLUMN 3 — Contact Us */
        .contact-row {
          display: flex;
          gap: 10px;
          margin-bottom: 14px;
        }

        .contact-icon {
          flex-shrink: 0;
        }

        .contact-text {
          font-family: 'Cormorant Garamond', serif;
          font-size: 15px;
          color: rgba(232, 223, 200, 0.5);
          line-height: 1.5;
        }

        /* COLUMN 4 — Newsletter */
        .newsletter-subtext {
          font-family: 'Cormorant Garamond', serif;
          font-size: 15px;
          color: rgba(232, 223, 200, 0.5);
          margin-bottom: 16px;
        }

        .newsletter-form {
          display: flex;
          align-items: center;
        }

        .newsletter-input {
          flex: 1;
          padding: 11px 14px;
          background: rgba(255, 255, 255, 0.04);
          border: 1px solid rgba(212, 160, 23, 0.2);
          border-right: none;
          border-radius: 4px 0 0 4px;
          color: #e8dfc8;
          font-family: 'Jost', sans-serif;
          font-size: 13px;
          outline: none;
          transition: border-color 0.3s ease;
        }

        .newsletter-input:focus {
          border-color: #d4a017;
        }

        .newsletter-input::placeholder {
          color: rgba(232, 223, 200, 0.4);
        }

        .newsletter-submit {
          background: #d4a017;
          color: #0e0d08;
          border: 1px solid rgba(212, 160, 23, 0.2);
          border-left: none;
          padding: 11px 16px;
          font-family: 'Jost', sans-serif;
          font-size: 14px;
          cursor: pointer;
          border-radius: 0 4px 4px 0;
          transition: background 0.3s ease;
        }

        .newsletter-submit:hover {
          background: #e8b42a;
        }

        /* Footer bottom */
        .footer-bottom {
          text-align: center;
          padding-top: 24px;
          border-top: 1px solid rgba(212, 160, 23, 0.1);
          max-width: 1200px;
          margin-left: auto;
          margin-right: auto;
        }

        .footer-copyright {
          font-family: 'Jost', sans-serif;
          font-size: 12px;
          color: rgba(232, 223, 200, 0.4);
          letter-spacing: 1px;
        }

        /* Responsive */
        @media (max-width: 1024px) {
          .footer-grid {
            grid-template-columns: repeat(2, 1fr);
            gap: 32px;
          }
        }

        @media (max-width: 640px) {
          .footer {
            padding: 48px 24px 32px;
          }

          .footer-grid {
            grid-template-columns: 1fr;
            gap: 32px;
          }

          .newsletter-form {
            flex-direction: column;
            align-items: stretch;
          }

          .newsletter-input {
            border-right: 1px solid rgba(212, 160, 23, 0.2);
            border-radius: 4px;
            margin-bottom: 8px;
          }

          .newsletter-submit {
            border-left: 1px solid rgba(212, 160, 23, 0.2);
            border-radius: 4px;
            padding: 11px 20px;
          }
        }
      `}</style>
    </footer>
  );
};

export default Footer;
