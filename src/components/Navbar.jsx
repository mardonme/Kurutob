import { useState } from 'react';
import { useScrolled } from '../hooks/useScrolled';

const Navbar = () => {
  const isScrolled = useScrolled();
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);

  const navLinks = ['Story', 'Menu', 'Locations', 'Gallery'];

  return (
    <nav className="navbar">
      <a href="#" className="navbar-logo">
        <img src="./logo.png" alt="KURUTOB Logo" />
      </a>
      

      <div className={`navbar-links ${mobileMenuOpen ? 'mobile-open' : ''}`}>
        {navLinks.map((link) => (
          <a
            key={link}
            href={`#${link.toLowerCase()}`}
            className="nav-link"
            onClick={() => setMobileMenuOpen(false)}
          >
            {link}
          </a>
        ))}
      </div>

      <div className="navbar-right">
        <button className="order-button">Order Now</button>
        <button
          className={`hamburger ${mobileMenuOpen ? 'open' : ''}`}
          onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
          aria-label="Toggle menu"
        >
          <span></span>
          <span></span>
          <span></span>
        </button>
      </div>

      {mobileMenuOpen && (
        <div
          className="mobile-overlay"
          onClick={() => setMobileMenuOpen(false)}
        ></div>
      )}

      <style jsx>{`
        .navbar {
          position: fixed;
          top: 0;
          left: 0;
          right: 0;
          z-index: 100;
          height: 64px;
          padding: 0 48px;
          display: flex;
          justify-content: space-between;
          align-items: center;
          background: ${isScrolled ? 'rgba(14, 13, 8, 0.95)' : 'transparent'};
          backdrop-filter: ${isScrolled ? 'blur(12px)' : 'none'};
          border-bottom: ${isScrolled ? '1px solid rgba(212, 160, 23, 0.15)' : 'none'};
          transition: background 0.4s, border-bottom 0.4s;
        }

        .navbar-logo {
          font-family: 'Playfair Display', serif;
          font-weight: 700;
          font-size: 18px;
          letter-spacing: 2px;
          color: #d4a017;
          text-decoration: none;
        }
          .navbar-logo img {
            height: 200px;
          }

        .navbar-right {
          display: flex;
          align-items: center;
          gap: 16px;
        }

        .navbar-links {
          display: flex;
          gap: 40px;
        }

        .nav-link {
          font-family: 'Jost', sans-serif;
          font-size: 13px;
          letter-spacing: 1.5px;
          text-transform: uppercase;
          color: rgba(232, 223, 200, 0.7);
          text-decoration: none;
          transition: color 0.3s ease;
        }

        .nav-link:hover {
          color: #d4a017;
        }

        .order-button {
          background: #d4a017;
          color: #0e0d08;
          border: none;
          padding: 10px 22px;
          font-family: 'Jost', sans-serif;
          font-weight: 500;
          font-size: 13px;
          letter-spacing: 1px;
          text-transform: uppercase;
          cursor: pointer;
          transition: background 0.3s ease;
        }

        .order-button:hover {
          background: #e8b42a;
        }

        .hamburger {
          display: none;
          flex-direction: column;
          gap: 5px;
          background: none;
          border: none;
          cursor: pointer;
          padding: 4px;
        }

        .hamburger span {
          width: 24px;
          height: 2px;
          background: #d4a017;
          transition: all 0.3s ease;
        }

        .hamburger.open span:nth-child(1) {
          transform: rotate(45deg) translate(5px, 5px);
        }

        .hamburger.open span:nth-child(2) {
          opacity: 0;
        }

        .hamburger.open span:nth-child(3) {
          transform: rotate(-45deg) translate(5px, -5px);
        }

        .mobile-overlay {
          display: none;
          position: fixed;
          inset: 0;
          background: rgba(14, 13, 8, 0.98);
          z-index: 101;
        }

        /* Mobile responsiveness */
        @media (max-width: 640px) {
          .navbar {
            padding: 0 20px;
          }

          .navbar-links {
            position: fixed;
            top: 64px;
            left: 0;
            right: 0;
            display: none;
            flex-direction: column;
            gap: 0;
            background: rgba(14, 13, 8, 0.98);
            padding: 20px;
            z-index: 102;
          }

          .navbar-links.mobile-open {
            display: flex;
          }

          .nav-link {
            padding: 16px 0;
            border-bottom: 1px solid rgba(212, 160, 23, 0.1);
            font-size: 15px;
          }

          .nav-link:last-child {
            border-bottom: none;
          }

          .hamburger {
            display: flex;
          }

          .mobile-overlay {
            display: block;
          }

          .order-button {
            display: none;
          }
        }
      `}</style>
    </nav>
  );
};

export default Navbar;
