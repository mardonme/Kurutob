import FadeIn from './FadeIn';

const StorySection = () => {
  return (
    <section id="story" className="story-section">
      <div className="story-container">
        <FadeIn>
          <div className="story-image">
            <img src="./picture1.jpg" alt="Kurutob preparation" />
            <div className="story-image-overlay"></div>
          </div>
        </FadeIn>

        <FadeIn delay={150}>
          <div className="story-content">
            <span className="story-eyebrow">Our Heritage</span>
            <h2 className="story-heading">
              The Soul of <span className="story-highlight">Tajik Cuisine</span>
            </h2>
            <div className="story-underline"></div>
            <p className="story-text">
              Kurutob is more than just a dish; it's a centuries-old ritual. Rooted in the mountain villages of Tajikistan, our recipe honours the traditional method of hand-tearing fresh fatir bread and layering it with tangy katyk yogurt, crisp cucumbers, and garden-fresh herbs.
            </p>
            <p className="story-text">
              Every plate at Kurutob tells a story of heritage — from the mountains to your table, we preserve the authentic flavours passed down through generations.
            </p>
            <button className="kurutob-btn-primary">Discover Our Heritage</button>
          </div>
        </FadeIn>
      </div>

      <style jsx>{`
        .story-section {
          padding: 100px 48px;
          max-width: 1400px;
          margin: 0 auto;
        }

        .story-container {
          display: grid;
          grid-template-columns: 1fr 1.2fr;
          gap: 80px;
          align-items: center;
        }

        .story-image {
          position: relative;
          aspect-ratio: 4/5;
          background: linear-gradient(145deg, #1a1508, #0e0d08);
          border: 1px solid rgba(212, 160, 23, 0.2);
          overflow: hidden;
        }

        .story-image img {
          width: 100%;
          height: 100%;
          object-fit: cover;
        }

        .story-image-overlay {
          position: absolute;
          inset: 0;
          background: linear-gradient(135deg, rgba(212, 160, 23, 0.08) 0%, transparent 100%);
          pointer-events: none;
        }

        .story-content {
          display: flex;
          flex-direction: column;
        }

        .story-eyebrow {
          font-family: 'Jost', sans-serif;
          font-size: 11px;
          letter-spacing: 3px;
          text-transform: uppercase;
          color: #d4a017;
          margin-bottom: 16px;
          display: block;
        }

        .story-heading {
          font-family: 'Playfair Display', serif;
          font-size: clamp(32px, 5vw, 48px);
          line-height: 1.15;
          margin-bottom: 16px;
          color: #f0e6cc;
          font-weight: 400;
        }

        .story-highlight {
          font-style: italic;
          color: #d4a017;
        }

        .story-underline {
          width: 60px;
          height: 2px;
          background: linear-gradient(90deg, #d4a017, transparent);
          margin-bottom: 32px;
        }

        .story-text {
          font-family: 'Cormorant Garamond', serif;
          font-size: clamp(16px, 1.8vw, 20px);
          color: rgba(232, 223, 200, 0.75);
          line-height: 1.8;
          margin-bottom: 24px;
        }

        .story-text:last-of-type {
          margin-bottom: 32px;
        }

        @media (max-width: 900px) {
          .story-section {
            padding: 80px 24px;
          }

          .story-container {
            grid-template-columns: 1fr;
            gap: 48px;
          }

          .story-image {
            aspect-ratio: 16/9;
          }
        }

        @media (max-width: 640px) {
          .story-section {
            padding: 60px 20px;
          }

          .story-container {
            gap: 32px;
          }

          .story-image {
            display: none;
          }

          .story-heading {
            font-size: clamp(28px, 6vw, 36px);
          }

          .story-text {
            font-size: 16px;
          }
        }
      `}</style>
    </section>
  );
};

export default StorySection;
