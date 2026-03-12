import FadeIn from './FadeIn';
import { BRANCHES } from '../data/branches';

const BranchesSection = () => {
  return (
    <section id="branches" className="branches-section">
      <div className="branches-container">
        <FadeIn>
          <h2 className="branches-title">Visit Our Branches</h2>
        </FadeIn>

        <div className="branches-grid">
          {BRANCHES.map((branch, index) => (
            <FadeIn key={index} delay={index * 120}>
              <div className="branch-card">
                <span className="branch-label">{branch.label}</span>
                <h3 className="branch-name">{branch.name}</h3>
                <p className="branch-desc">{branch.desc}</p>
                <a href={`tel:${branch.phone}`} className="branch-phone">
                  {branch.phone}
                </a>
              </div>
            </FadeIn>
          ))}
        </div>
      </div>

      <style jsx>{`
        .branches-section {
          padding: 80px 48px;
          background: rgba(212, 160, 23, 0.04);
          border-top: 1px solid rgba(212, 160, 23, 0.1);
          border-bottom: 1px solid rgba(212, 160, 23, 0.1);
        }

        .branches-container {
          max-width: 1200px;
          margin: 0 auto;
        }

        .branches-title {
          text-align: center;
          margin-bottom: 48px;
          font-family: 'Playfair Display', serif;
          font-size: clamp(28px, 4vw, 40px);
          color: #f0e6cc;
        }

        .branches-grid {
          display: grid;
          grid-template-columns: 1fr 1fr;
          gap: 24px;
          max-width: 800px;
          margin: 0 auto;
        }

        .branch-card {
          border: 1px solid rgba(212, 160, 23, 0.2);
          padding: 32px;
          background: rgba(255, 255, 255, 0.02);
        }

        .branch-card:hover {
          border-color: #d4a017;
          transition: all 0.3s ease;
        }

        .branch-label {
          display: block;
          font-family: 'Jost', sans-serif;
          font-size: 10px;
          letter-spacing: 2px;
          color: #d4a017;
          text-transform: uppercase;
          margin-bottom: 12px;
        }

        .branch-name {
          font-family: 'Playfair Display', serif;
          font-size: 22px;
          margin-bottom: 12px;
          color: #f0e6cc;
        }

        .branch-desc {
          font-family: 'Cormorant Garamond', serif;
          font-size: 16px;
          color: rgba(232, 223, 200, 0.6);
          line-height: 1.7;
          margin-bottom: 20px;
        }

        .branch-phone {
          display: inline-block;
          font-family: 'Jost', sans-serif;
          font-size: 14px;
          color: #d4a017;
          letter-spacing: 1px;
        }

        @media (max-width: 640px) {
          .branches-section {
            padding: 60px 20px;
          }

          .branches-grid {
            grid-template-columns: 1fr;
          }

          .branch-card {
            padding: 24px;
          }

          .branches-title {
            font-size: clamp(24px, 5vw, 32px);
          }

          .branch-name {
            font-size: 18px;
          }
        }
      `}</style>
    </section>
  );
};

export default BranchesSection;
