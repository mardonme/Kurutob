import FadeIn from './FadeIn';

const GALLERY_COLORS = [
  'linear-gradient(135deg,#3d2c10,#1a1505)',
  'linear-gradient(135deg,#0d1a14,#1a2e20)',
  'linear-gradient(135deg,#1a1205,#2d2010)',
  'linear-gradient(135deg,#0e1520,#1a2535)',
  'linear-gradient(135deg,#1e1408,#2a1c0c)',
  'linear-gradient(135deg,#141a0e,#1e2a12)'
];

const GALLERY_EMOJIS = ['🌿', '🫖', '🥗', '🍞', '🧅', '🌾'];

const GallerySection = () => {
  return (
    <section id="gallery" className="gallery-section">
      <FadeIn>
        <h2 className="gallery-title">Gallery</h2>
      </FadeIn>

      <div className="gallery-grid">
        {GALLERY_COLORS.map((color, index) => (
          <FadeIn key={index} delay={index * 60}>
            <div
              className="gallery-cell"
              style={{ background: color }}
            >
              <span className="gallery-emoji">{GALLERY_EMOJIS[index]}</span>
            </div>
          </FadeIn>
        ))}
      </div>

      <style jsx>{`
        .gallery-section {
          padding: 100px 48px;
          max-width: 1200px;
          margin: 0 auto;
        }

        .gallery-title {
          text-align: center;
          margin-bottom: 48px;
          font-family: 'Playfair Display', serif;
          font-size: clamp(28px, 4vw, 40px);
          color: #f0e6cc;
        }

        .gallery-grid {
          display: grid;
          grid-template-columns: repeat(3, 1fr);
          grid-template-rows: 240px 240px;
          gap: 12px;
        }

        .gallery-cell {
          border: 1px solid rgba(212, 160, 23, 0.15);
          display: flex;
          align-items: center;
          justify-content: center;
        }

        .gallery-cell:hover {
          transform: scale(1.03);
          filter: brightness(1.15);
          transition: all 0.4s ease;
        }

        .gallery-emoji {
          font-size: 64px;
        }

        @media (max-width: 640px) {
          .gallery-section {
            padding: 80px 24px;
          }

          .gallery-grid {
            grid-template-columns: repeat(2, 1fr);
            grid-template-rows: repeat(3, 160px);
            gap: 8px;
          }

          .gallery-emoji {
            font-size: 48px;
          }
        }

        @media (max-width: 400px) {
          .gallery-grid {
            grid-template-columns: 1fr;
            grid-template-rows: repeat(6, 160px);
          }
        }
      `}</style>
    </section>
  );
};

export default GallerySection;
