import FadeIn from './FadeIn';

const StorySection = () => {
  return (
    <section id="story" className="story-section">
      <div className="story-grid">
        <FadeIn>
          <div className="story-image">
            <img src="./picture1.jpg" alt="" />
            <div className="story-overlay"></div>
          </div>
        </FadeIn>

        <FadeIn delay={150}>
          <div className="story-content">
            <h2 className="story-heading">
              The Soul of <span className="story-italic">Tajik Cuisine</span>
            </h2>
            <p className="story-text">
              Kurutob is more than just a dish; it's a centuries-old ritual. Rooted in the mountain villages of Tajikistan, our recipe honours the traditional method of hand-tearing fresh fatir bread and layering it with tangy katyk yogurt, crisp cucumbers, and garden-fresh herbs.
            </p>
            <p className="story-text">
              Every plate at Kurutob tells a story of heritage — from the mountains to your table, we preserve the authentic flavours passed down through generations.
            </p>
            <button className="story-button">Discover Our Heritage</button>
          </div>
        </FadeIn>
      </div>

      <style jsx>{`
        .story-section {
          padding: 100px 48px;
          max-width: 1200px;
          margin: 0 auto;
        }

        .story-grid {
          display: grid;
          grid-template-columns: 1fr 1.2fr;
          gap: 80px;
          align-items: center;
        }

        .story-image {
          position: relative;
          aspect-ratio: 4/5;
          background: linear-gradient(145deg, #1e1a0e, #2a2010);
          border: 1px solid rgba(212, 160, 23, 0.2);
          display: flex;
          align-items: center;
          justify-content: center;
        }

        .chef-emoji {
          font-size: 80px;
        }

        .story-overlay {
          position: absolute;
          inset: 0;
          background: linear-gradient(135deg, rgba(212, 160, 23, 0.05) 0%, transparent 100%);
          pointer-events: none;
        }

        .story-heading {
          font-family: 'Playfair Display', serif;
          font-size: clamp(36px, 5vw, 52px);
          line-height: 1.1;
          margin-bottom: 24px;
          color: #f0e6cc;
        }

        .story-italic {
          font-style: italic;
          color: #d4a017;
        }

        .story-text {
          font-family: 'Cormorant Garamond', serif;
          font-size: clamp(16px, 2vw, 20px);
          color: rgba(232, 223, 200, 0.7);
          line-height: 1.7;
          margin-bottom: 20px;
        }

        .story-button {
          margin-top: 32px;
          background: #d4a017;
          color: #0e0d08;
          border: none;
          padding: 14px 32px;
          font-family: 'Jost', sans-serif;
          font-weight: 600;
          font-size: 13px;
          letter-spacing: 1.5px;
          text-transform: uppercase;
          cursor: pointer;
          transition: background 0.3s ease;
        }

        .story-button:hover {
          background: #e8b42a;
        }

        @media (max-width: 900px) {
          .story-section {
            padding: 80px 24px;
          }

          .story-grid {
            grid-template-columns: 1fr;
            gap: 48px;
          }
        }

        @media (max-width: 640px) {
          .story-section {
            padding: 60px 20px;
          }

          .story-grid {
            gap: 32px;
          }

          .story-image {
            height: 300px;
            aspect-ratio: auto;
          }

          .chef-emoji {
            font-size: 60px;
          }

          .story-heading {
            font-size: clamp(28px, 6vw, 36px);
          }

          .story-button {
            width: 100%;
            padding: 12px 24px;
          }
        }
      `}</style>
    </section>
  );
};

export default StorySection;
