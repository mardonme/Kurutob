import { useState, useEffect } from 'react';
import { BRANCHES } from '../data/branches';

const BranchCard = ({ branch, index }) => {
  const [isHovered, setIsHovered] = useState(false);

  return (
    <div
      className={`branch-card ${branch.isMain ? 'main-branch' : ''}`}
      style={{
        '--card-delay': `${index * 150}ms`
      }}
      onMouseEnter={() => setIsHovered(true)}
      onMouseLeave={() => setIsHovered(false)}
    >
      {branch.isMain && (
        <div className="main-badge">
          <span className="main-badge-icon">★</span>
          <span>MAIN BRANCH</span>
        </div>
      )}

      <div className="card-header">
        <div className="branch-icon-wrapper">
          <svg
            className="branch-icon"
            viewBox="0 0 24 24"
            fill="none"
            stroke="currentColor"
            strokeWidth="1.5"
          >
            <path d="M12 2C8.13 2 5 5.13 5 9c0 5.25 7 13 7 13s7-7.75 7-13c0-3.87-3.13-7-7-7z" />
            <circle cx="12" cy="9" r="2.5" />
          </svg>
        </div>
        <div className="branch-info">
          <span className="branch-label">{branch.label}</span>
          <h3 className="branch-name">{branch.name}</h3>
        </div>
      </div>

      <div className="card-body">
        <div className="info-row">
          <svg className="info-icon" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5">
            <path d="M3 21h18M5 21V7l8-4 8 4v14M8 21v-9h8v9" />
          </svg>
          <span className="info-text">{branch.address}</span>
        </div>

        <div className="info-row">
          <svg className="info-icon" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5">
            <path d="M22 16.92v3a2 2 0 0 1-2.18 2 19.79 19.79 0 0 1-8.63-3.07 19.5 19.5 0 0 1-6-6 19.79 19.79 0 0 1-3.07-8.67A2 2 0 0 1 4.11 2h3a2 2 0 0 1 2 1.72 12.84 12.84 0 0 0 .7 2.81 2 2 0 0 1-.45 2.11L8.09 9.91a16 16 0 0 0 6 6l1.27-1.27a2 2 0 0 1 2.11-.45 12.84 12.84 0 0 0 2.81.7A2 2 0 0 1 22 16.92z" />
          </svg>
          <a href={`tel:${branch.phone.replace(/\s/g, '')}`} className="info-link">
            {branch.phone}
          </a>
        </div>

        <p className="branch-description">{branch.description}</p>
      </div>

      <div className="map-preview">
        <div className="map-placeholder">
          <svg className="map-pattern" viewBox="0 0 100 100">
            <pattern id="grid" width="10" height="10" patternUnits="userSpaceOnUse">
              <path d="M 10 0 L 0 0 0 10" fill="none" stroke="currentColor" strokeWidth="0.5" opacity="0.1"/>
            </pattern>
            <rect width="100" height="100" fill="url(#grid)" />
          </svg>
          <svg className="map-marker" viewBox="0 0 24 24" fill="currentColor">
            <path d="M12 2C8.13 2 5 5.13 5 9c0 5.25 7 13 7 13s7-7.75 7-13c0-3.87-3.13-7-7-7z" />
          </svg>
        </div>
      </div>

      <a
        href={branch.mapLink}
        target="_blank"
        rel="noopener noreferrer"
        className="directions-btn"
      >
        <svg className="btn-icon" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
          <path d="M18 13v6a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2V8a2 2 0 0 1 2-2h6" />
          <polyline points="15 3 21 3 21 9" />
          <line x1="10" y1="14" x2="21" y2="3" />
        </svg>
        <span>Get Directions</span>
        <svg className="arrow-icon" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
          <line x1="5" y1="12" x2="19" y2="12" />
          <polyline points="12 5 19 12 12 19" />
        </svg>
      </a>

      <style jsx>{`
        .branch-card {
          position: relative;
          background: linear-gradient(145deg, rgba(15, 15, 15, 0.95) 0%, rgba(10, 10, 10, 0.98) 100%);
          border: 1px solid rgba(201, 169, 110, 0.15);
          border-radius: 16px;
          padding: 28px 24px 24px;
          display: flex;
          flex-direction: column;
          opacity: 0;
          transform: translateY(30px);
          animation: cardFadeIn 0.8s ease var(--card-delay) forwards;
          transition: all 0.4s cubic-bezier(0.4, 0, 0.2, 1);
          overflow: hidden;
        }

        @keyframes cardFadeIn {
          to {
            opacity: 1;
            transform: translateY(0);
          }
        }

        .branch-card:hover {
          transform: translateY(-8px) scale(1.02);
          border-color: rgba(201, 169, 110, 0.5);
          box-shadow:
            0 20px 40px rgba(0, 0, 0, 0.4),
            0 0 60px rgba(201, 169, 110, 0.08),
            inset 0 1px 0 rgba(255, 255, 255, 0.05);
        }

        .branch-card.main-branch {
          border: 1px solid rgba(201, 169, 110, 0.4);
        }

        .branch-card.main-branch::before {
          content: '';
          position: absolute;
          top: 0;
          left: 0;
          right: 0;
          height: 2px;
          background: linear-gradient(90deg, transparent, #C9A96E, transparent);
        }

        .main-badge {
          position: absolute;
          top: 16px;
          right: 16px;
          display: flex;
          align-items: center;
          gap: 6px;
          background: linear-gradient(135deg, rgba(201, 169, 110, 0.2) 0%, rgba(201, 169, 110, 0.1) 100%);
          border: 1px solid rgba(201, 169, 110, 0.3);
          border-radius: 20px;
          padding: 6px 12px;
          font-size: 10px;
          font-weight: 600;
          letter-spacing: 1px;
          color: #C9A96E;
        }

        .main-badge-icon {
          font-size: 12px;
          filter: drop-shadow(0 0 6px rgba(201, 169, 110, 0.5));
        }

        .card-header {
          display: flex;
          align-items: flex-start;
          gap: 16px;
          margin-bottom: 24px;
          padding-bottom: 24px;
          border-bottom: 1px solid rgba(201, 169, 110, 0.1);
        }

        .branch-icon-wrapper {
          width: 48px;
          height: 48px;
          background: linear-gradient(135deg, rgba(201, 169, 110, 0.15) 0%, rgba(201, 169, 110, 0.05) 100%);
          border: 1px solid rgba(201, 169, 110, 0.2);
          border-radius: 12px;
          display: flex;
          align-items: center;
          justify-content: center;
          flex-shrink: 0;
          transition: all 0.3s ease;
        }

        .branch-card:hover .branch-icon-wrapper {
          background: linear-gradient(135deg, rgba(201, 169, 110, 0.25) 0%, rgba(201, 169, 110, 0.1) 100%);
          border-color: rgba(201, 169, 110, 0.4);
        }

        .branch-icon {
          width: 24px;
          height: 24px;
          color: #C9A96E;
        }

        .branch-info {
          flex: 1;
        }

        .branch-label {
          display: block;
          font-family: 'Jost', sans-serif;
          font-size: 10px;
          font-weight: 600;
          letter-spacing: 2.5px;
          text-transform: uppercase;
          color: rgba(201, 169, 110, 0.7);
          margin-bottom: 6px;
        }

        .branch-name {
          font-family: 'Playfair Display', serif;
          font-size: 22px;
          font-weight: 600;
          color: #f0e6cc;
          margin: 0;
          line-height: 1.2;
        }

        .card-body {
          flex: 1;
          display: flex;
          flex-direction: column;
          gap: 14px;
          margin-bottom: 20px;
        }

        .info-row {
          display: flex;
          align-items: center;
          gap: 12px;
        }

        .info-icon {
          width: 18px;
          height: 18px;
          color: rgba(201, 169, 110, 0.6);
          flex-shrink: 0;
        }

        .info-text {
          font-family: 'Jost', sans-serif;
          font-size: 13px;
          color: rgba(232, 223, 200, 0.7);
          line-height: 1.5;
        }

        .info-link {
          font-family: 'Jost', sans-serif;
          font-size: 13px;
          color: #C9A96E;
          text-decoration: none;
          transition: color 0.3s ease;
        }

        .info-link:hover {
          color: #e0c085;
          text-decoration: underline;
        }

        .branch-description {
          font-family: 'Cormorant Garamond', serif;
          font-size: 15px;
          font-style: italic;
          color: rgba(232, 223, 200, 0.5);
          line-height: 1.6;
          margin: 4px 0;
        }

        .map-preview {
          position: relative;
          height: 80px;
          border-radius: 10px;
          overflow: hidden;
          margin-bottom: 20px;
          background: linear-gradient(180deg, rgba(20, 20, 20, 0.8) 0%, rgba(15, 15, 15, 0.9) 100%);
          border: 1px solid rgba(201, 169, 110, 0.1);
        }

        .map-placeholder {
          position: relative;
          width: 100%;
          height: 100%;
          display: flex;
          align-items: center;
          justify-content: center;
          color: rgba(201, 169, 110, 0.3);
        }

        .map-pattern {
          position: absolute;
          inset: 0;
          width: 100%;
          height: 100%;
        }

        .map-marker {
          width: 28px;
          height: 28px;
          color: #C9A96E;
          filter: drop-shadow(0 4px 8px rgba(0, 0, 0, 0.3));
          z-index: 1;
        }

        .directions-btn {
          display: flex;
          align-items: center;
          justify-content: center;
          gap: 10px;
          background: linear-gradient(135deg, #C9A96E 0%, #b89556 100%);
          border: none;
          border-radius: 10px;
          padding: 14px 24px;
          font-family: 'Jost', sans-serif;
          font-size: 13px;
          font-weight: 600;
          letter-spacing: 1px;
          text-transform: uppercase;
          color: #0a0905;
          text-decoration: none;
          cursor: pointer;
          transition: all 0.3s ease;
          position: relative;
          overflow: hidden;
        }

        .directions-btn::before {
          content: '';
          position: absolute;
          inset: 0;
          background: linear-gradient(135deg, #e0c085 0%, #d4b370 100%);
          opacity: 0;
          transition: opacity 0.3s ease;
        }

        .directions-btn:hover {
          transform: translateY(-2px);
          box-shadow: 0 8px 20px rgba(201, 169, 110, 0.3);
        }

        .directions-btn:hover::before {
          opacity: 1;
        }

        .directions-btn > * {
          position: relative;
          z-index: 1;
        }

        .btn-icon {
          width: 18px;
          height: 18px;
        }

        .arrow-icon {
          width: 16px;
          height: 16px;
          transition: transform 0.3s ease;
        }

        .directions-btn:hover .arrow-icon {
          transform: translateX(3px);
        }

        @media (max-width: 768px) {
          .branch-card {
            padding: 24px 20px 20px;
          }

          .branch-icon-wrapper {
            width: 42px;
            height: 42px;
          }

          .branch-icon {
            width: 20px;
            height: 20px;
          }

          .branch-name {
            font-size: 18px;
          }

          .info-text,
          .info-link {
            font-size: 12px;
          }

          .branch-description {
            font-size: 14px;
          }

          .map-preview {
            height: 70px;
          }

          .directions-btn {
            padding: 12px 20px;
            font-size: 12px;
          }
        }
      `}</style>
    </div>
  );
};

const BranchesSection = () => {
  const [sectionReady, setSectionReady] = useState(false);

  useEffect(() => {
    const timer = setTimeout(() => setSectionReady(true), 100);
    return () => clearTimeout(timer);
  }, []);

  return (
    <section id="locations" className="branches-section">
      <div className={`section-header ${sectionReady ? 'ready' : ''}`}>
        <span className="section-eyebrow">FIND US</span>
        <h2 className="section-title">Our Locations</h2>
        <p className="section-subtitle">
          Visit us at any of our carefully selected locations and experience authentic Tajik hospitality
        </p>
      </div>

      <div className="branches-grid">
        {BRANCHES.map((branch, index) => (
          <BranchCard key={branch.id} branch={branch} index={index} />
        ))}
      </div>

      <style jsx global>{`
        .branches-section {
          position: relative;
          min-height: 100vh;
          padding: 100px 32px 80px;
          background: linear-gradient(180deg, #0a0905 0%, #000000 50%, #050503 100%);
          overflow: hidden;
        }

        .branches-section::before {
          content: '';
          position: absolute;
          top: 0;
          left: 50%;
          transform: translateX(-50%);
          width: 1px;
          height: 120px;
          background: linear-gradient(180deg, #C9A96E 0%, transparent 100%);
        }

        .section-header {
          text-align: center;
          max-width: 600px;
          margin: 0 auto 60px;
          opacity: 0;
          transform: translateY(20px);
          transition: opacity 0.8s ease, transform 0.8s ease;
        }

        .section-header.ready {
          opacity: 1;
          transform: translateY(0);
        }

        .section-eyebrow {
          display: inline-block;
          font-family: 'Jost', sans-serif;
          font-size: 11px;
          font-weight: 600;
          letter-spacing: 4px;
          text-transform: uppercase;
          color: #C9A96E;
          border: 1px solid rgba(201, 169, 110, 0.25);
          border-radius: 24px;
          padding: 8px 20px;
          margin-bottom: 20px;
        }

        .section-title {
          font-family: 'Playfair Display', serif;
          font-size: clamp(36px, 5vw, 52px);
          font-weight: 700;
          color: #f0e6cc;
          margin: 0 0 20px;
          letter-spacing: -0.02em;
        }

        .section-subtitle {
          font-family: 'Cormorant Garamond', serif;
          font-size: clamp(16px, 2vw, 18px);
          font-style: italic;
          color: rgba(232, 223, 200, 0.5);
          line-height: 1.7;
          margin: 0;
        }

        .branches-grid {
          display: grid;
          grid-template-columns: repeat(3, 1fr);
          gap: 28px;
          max-width: 1200px;
          margin: 0 auto;
        }

        @media (max-width: 1024px) {
          .branches-grid {
            grid-template-columns: repeat(2, 1fr);
            max-width: 700px;
          }
        }

        @media (max-width: 640px) {
          .branches-section {
            padding: 80px 20px 60px;
          }

          .branches-grid {
            grid-template-columns: 1fr;
            gap: 20px;
          }

          .section-header {
            margin-bottom: 40px;
          }

          .section-eyebrow {
            font-size: 10px;
            padding: 6px 16px;
            letter-spacing: 3px;
          }
        }
      `}</style>
    </section>
  );
};

export default BranchesSection;
