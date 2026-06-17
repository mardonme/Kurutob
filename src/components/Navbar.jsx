import { useState, useEffect, useRef } from 'react';
import { useScrolled } from '../hooks/useScrolled';
import { useActiveSection } from '../hooks/useActiveSection';
import Button from './ui/Button';
import Icon from './ui/Icon';

const NAV_LINKS = ['Story', 'Menu', 'Locations', 'Gallery'];
const SECTION_IDS = NAV_LINKS.map((l) => l.toLowerCase());

const Navbar = ({ onOpenReservation }) => {
  const isScrolled = useScrolled();
  const activeSection = useActiveSection(SECTION_IDS);
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const drawerRef = useRef(null);
  const toggleRef = useRef(null);

  const closeMenu = () => setMobileMenuOpen(false);

  // Lock body scroll + Escape to close + modal focus management
  // (move focus into the drawer on open, restore to the toggle on close)
  // while the drawer is open.
  useEffect(() => {
    if (!mobileMenuOpen) return;

    const prevOverflow = document.body.style.overflow;
    document.body.style.overflow = 'hidden';

    // Move focus into the dialog so keyboard users land inside the modal.
    const firstLink = drawerRef.current?.querySelector('a, button');
    firstLink?.focus();

    const onKeyDown = (e) => {
      if (e.key !== 'Tab') {
        if (e.key === 'Escape') {
          setMobileMenuOpen(false);
          toggleRef.current?.focus();
        }
        return;
      }

      // Simple focus trap: keep Tab cycling within the drawer.
      const focusables = drawerRef.current?.querySelectorAll(
        'a[href], button:not([disabled])'
      );
      if (!focusables || focusables.length === 0) return;

      const first = focusables[0];
      const last = focusables[focusables.length - 1];
      const active = document.activeElement;

      if (e.shiftKey && active === first) {
        e.preventDefault();
        last.focus();
      } else if (!e.shiftKey && active === last) {
        e.preventDefault();
        first.focus();
      } else if (!drawerRef.current.contains(active)) {
        e.preventDefault();
        first.focus();
      }
    };
    document.addEventListener('keydown', onKeyDown);

    return () => {
      document.body.style.overflow = prevOverflow;
      document.removeEventListener('keydown', onKeyDown);
    };
  }, [mobileMenuOpen]);

  const handleBookDesktop = () => {
    onOpenReservation?.();
  };

  const handleBookMobile = () => {
    setMobileMenuOpen(false);
    onOpenReservation?.();
  };

  return (
    <header className={`navbar ${isScrolled ? 'navbar--scrolled' : ''}`}>
      <nav className="navbar-inner" aria-label="Primary">
        <a href="#" className="navbar-logo" aria-label="Kurutob — home">
          <img
            src="/logo-mark.png"
            alt="Kurutob — Tajik & Central Asian restaurant"
            width="438"
            height="93"
            loading="eager"
            decoding="async"
          />
        </a>

        <ul className="navbar-links">
          {NAV_LINKS.map((link) => {
            const id = link.toLowerCase();
            const isActive = activeSection === id;
            return (
              <li key={link}>
                <a
                  href={`#${id}`}
                  className={`navbar-link ${isActive ? 'is-active' : ''}`.trim()}
                  aria-current={isActive ? 'true' : undefined}
                >
                  {link}
                </a>
              </li>
            );
          })}
        </ul>

        <div className="navbar-right">
          <span className="navbar-cta-desktop">
            <Button variant="primary" size="sm" onClick={handleBookDesktop}>
              Book a Table
              <Icon name="arrowRight" size={15} />
            </Button>
          </span>

          <button
            ref={toggleRef}
            type="button"
            className={`navbar-burger ${mobileMenuOpen ? 'is-open' : ''}`}
            onClick={() => setMobileMenuOpen((open) => !open)}
            aria-label={mobileMenuOpen ? 'Close menu' : 'Open menu'}
            aria-expanded={mobileMenuOpen}
            aria-controls="navbar-drawer"
          >
            <span className="navbar-burger-bars" aria-hidden="true">
              <span></span>
              <span></span>
              <span></span>
            </span>
          </button>
        </div>
      </nav>

      {/* Mobile overlay */}
      <div
        className={`navbar-overlay ${mobileMenuOpen ? 'is-open' : ''}`}
        onClick={closeMenu}
        aria-hidden="true"
      />

      {/* Mobile drawer */}
      <div
        id="navbar-drawer"
        ref={drawerRef}
        className={`navbar-drawer ${mobileMenuOpen ? 'is-open' : ''}`}
        role="dialog"
        aria-modal="true"
        aria-label="Site menu"
        aria-hidden={!mobileMenuOpen}
      >
        <ul className="navbar-drawer-links">
          {NAV_LINKS.map((link) => {
            const id = link.toLowerCase();
            return (
              <li key={link}>
                <a
                  href={`#${id}`}
                  className="navbar-drawer-link"
                  onClick={closeMenu}
                  tabIndex={mobileMenuOpen ? 0 : -1}
                  aria-current={activeSection === id ? 'true' : undefined}
                >
                  <span>{link}</span>
                  <Icon name="arrowUpRight" size={18} />
                </a>
              </li>
            );
          })}
        </ul>

        <Button
          variant="primary"
          size="lg"
          block
          onClick={handleBookMobile}
          tabIndex={mobileMenuOpen ? 0 : -1}
        >
          Book a Table
          <Icon name="arrowRight" size={16} />
        </Button>
      </div>

      <style jsx>{`
        .navbar {
          position: fixed;
          inset: 0 0 auto 0;
          z-index: 100;
          height: var(--nav-h);
          background: transparent;
          border-bottom: 1px solid transparent;
          transition: background var(--dur) var(--ease),
            border-color var(--dur) var(--ease),
            backdrop-filter var(--dur) var(--ease);
        }

        .navbar--scrolled {
          background: color-mix(in srgb, var(--c-bg) 82%, transparent);
          -webkit-backdrop-filter: blur(14px) saturate(160%);
          backdrop-filter: blur(14px) saturate(160%);
          border-bottom-color: var(--c-border);
        }

        .navbar-inner {
          height: 100%;
          max-width: var(--container-wide);
          margin-inline: auto;
          padding-inline: var(--container-pad);
          display: flex;
          align-items: center;
          justify-content: space-between;
          gap: var(--space-5);
        }

        /* ---------- Logo ---------- */
        .navbar-logo {
          display: inline-flex;
          align-items: center;
          flex-shrink: 0;
        }

        .navbar-logo img {
          height: 34px;
          width: auto;
          display: block;
        }

        /* ---------- Desktop links ---------- */
        .navbar-links {
          display: flex;
          align-items: center;
          gap: var(--space-7);
          list-style: none;
        }

        .navbar-link {
          position: relative;
          font-family: var(--font-sans);
          font-size: var(--fs-sm);
          font-weight: 500;
          letter-spacing: 0.08em;
          text-transform: uppercase;
          color: var(--c-text-2);
          padding-block: var(--space-1);
          transition: color var(--dur) var(--ease);
        }

        .navbar-link::after {
          content: '';
          position: absolute;
          left: 0;
          bottom: -2px;
          width: 100%;
          height: 1px;
          background: var(--c-gold);
          transform: scaleX(0);
          transform-origin: left center;
          transition: transform var(--dur) var(--ease-out);
        }

        .navbar-link:hover,
        .navbar-link:focus-visible,
        .navbar-link.is-active {
          color: var(--c-gold);
        }

        .navbar-link:hover::after,
        .navbar-link:focus-visible::after,
        .navbar-link.is-active::after {
          transform: scaleX(1);
        }

        /* ---------- Right cluster ---------- */
        .navbar-right {
          display: flex;
          align-items: center;
          gap: var(--space-4);
          flex-shrink: 0;
        }

        .navbar-cta-desktop {
          display: inline-flex;
        }

        /* ---------- Hamburger ---------- */
        .navbar-burger {
          display: none;
          width: 44px;
          height: 44px;
          align-items: center;
          justify-content: center;
          border-radius: var(--radius-md);
          border: 1px solid var(--c-border);
          background: color-mix(in srgb, var(--c-surface-2) 60%, transparent);
          transition: border-color var(--dur) var(--ease),
            background var(--dur) var(--ease);
        }

        .navbar-burger:hover {
          border-color: var(--c-border-strong);
        }

        .navbar-burger-bars {
          position: relative;
          width: 20px;
          height: 14px;
        }

        .navbar-burger-bars span {
          position: absolute;
          left: 0;
          width: 100%;
          height: 2px;
          border-radius: var(--radius-pill);
          background: var(--c-gold);
          transition: transform var(--dur) var(--ease-out),
            opacity var(--dur-fast) var(--ease);
        }

        .navbar-burger-bars span:nth-child(1) {
          top: 0;
        }
        .navbar-burger-bars span:nth-child(2) {
          top: 50%;
          transform: translateY(-50%);
        }
        .navbar-burger-bars span:nth-child(3) {
          bottom: 0;
        }

        .navbar-burger.is-open .navbar-burger-bars span:nth-child(1) {
          top: 50%;
          transform: translateY(-50%) rotate(45deg);
        }
        .navbar-burger.is-open .navbar-burger-bars span:nth-child(2) {
          opacity: 0;
        }
        .navbar-burger.is-open .navbar-burger-bars span:nth-child(3) {
          bottom: auto;
          top: 50%;
          transform: translateY(-50%) rotate(-45deg);
        }

        /* ---------- Mobile overlay ---------- */
        .navbar-overlay {
          position: fixed;
          inset: 0;
          z-index: 90;
          background: color-mix(in srgb, var(--c-bg) 72%, transparent);
          opacity: 0;
          visibility: hidden;
          transition: opacity var(--dur) var(--ease),
            visibility var(--dur) var(--ease);
        }

        .navbar-overlay.is-open {
          opacity: 1;
          visibility: visible;
        }

        /* ---------- Mobile drawer ---------- */
        .navbar-drawer {
          position: fixed;
          top: 0;
          right: 0;
          z-index: 95;
          width: min(86vw, 360px);
          height: 100dvh;
          display: flex;
          flex-direction: column;
          gap: var(--space-6);
          padding: calc(var(--nav-h) + var(--space-5)) var(--space-6)
            var(--space-7);
          background: var(--c-surface-1);
          border-left: 1px solid var(--c-border);
          box-shadow: var(--shadow-lg);
          transform: translateX(100%);
          visibility: hidden;
          transition: transform var(--dur-slow) var(--ease-out),
            visibility var(--dur-slow) var(--ease-out);
          overflow-y: auto;
          overscroll-behavior: contain;
        }

        .navbar-drawer.is-open {
          transform: translateX(0);
          visibility: visible;
        }

        .navbar-drawer-links {
          display: flex;
          flex-direction: column;
          list-style: none;
        }

        .navbar-drawer-link {
          display: flex;
          align-items: center;
          justify-content: space-between;
          padding-block: var(--space-4);
          border-bottom: 1px solid var(--c-border);
          font-family: var(--font-sans);
          font-size: var(--fs-lg);
          font-weight: 500;
          color: var(--c-text);
          transition: color var(--dur) var(--ease),
            padding-left var(--dur) var(--ease);
        }

        .navbar-drawer-link svg {
          color: var(--c-text-3);
          transition: color var(--dur) var(--ease),
            transform var(--dur) var(--ease-out);
        }

        .navbar-drawer-link:hover,
        .navbar-drawer-link:focus-visible {
          color: var(--c-gold);
          padding-left: var(--space-2);
        }

        .navbar-drawer-link:hover svg,
        .navbar-drawer-link:focus-visible svg {
          color: var(--c-gold);
          transform: translate(2px, -2px);
        }

        /* ---------- Responsive ---------- */
        @media (max-width: 860px) {
          .navbar-links,
          .navbar-cta-desktop {
            display: none;
          }

          .navbar-burger {
            display: inline-flex;
          }
        }

        @media (min-width: 861px) {
          .navbar-overlay,
          .navbar-drawer {
            display: none;
          }
        }
      `}</style>
    </header>
  );
};

export default Navbar;
