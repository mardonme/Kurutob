import { useState } from 'react';
import FadeIn from './FadeIn';
import { GALLERY_IMAGES, CATEGORIES } from '../data/galleryImages';

const GallerySection = () => {
  const [activeCategory, setActiveCategory] = useState('all');
  const [lightboxImage, setLightboxImage] = useState(null);

  const filteredImages =
    activeCategory === 'all'
      ? GALLERY_IMAGES
      : GALLERY_IMAGES.filter(img => img.category === activeCategory);

  const openLightbox = (image) => {
    setLightboxImage(image);
    document.body.style.overflow = 'hidden';
  };

  const closeLightbox = () => {
    setLightboxImage(null);
    document.body.style.overflow = '';
  };

  const getNextImage = () => {
    const currentIndex = filteredImages.findIndex(img => img.id === lightboxImage.id);
    const nextIndex = (currentIndex + 1) % filteredImages.length;
    setLightboxImage(filteredImages[nextIndex]);
  };

  const getPrevImage = () => {
    const currentIndex = filteredImages.findIndex(img => img.id === lightboxImage.id);
    const prevIndex = (currentIndex - 1 + filteredImages.length) % filteredImages.length;
    setLightboxImage(filteredImages[prevIndex]);
  };

  const getGridSpan = (span) => {
    return span === 'large' ? 'span 2' : 'span 1';
  };

  return (
    <section id="gallery" className="gallery-section">
      <FadeIn>
        <div className="gallery-header">
          <h2 className="gallery-title">Our Gallery</h2>
          <div className="gallery-underline"></div>
          <p className="gallery-subtitle">
            Experience the art of Uzbek cuisine
          </p>
        </div>
      </FadeIn>

      <FadeIn>
        <div className="category-filters">
          {CATEGORIES.map((category) => (
            <button
              key={category.id}
              className={`filter-btn ${activeCategory === category.id ? 'active' : ''}`}
              onClick={() => setActiveCategory(category.id)}
            >
              {category.label}
            </button>
          ))}
        </div>
      </FadeIn>

      <div className="gallery-grid">
        {filteredImages.map((image, index) => (
          <FadeIn key={image.id} delay={index * 50}>
            <div
              className={`gallery-item gallery-item--${image.span}`}
              onClick={() => openLightbox(image)}
            >
              <img
                src={image.src}
                alt={image.title}
                className="gallery-image"
              />
              <div className="gallery-overlay">
                <span className="gallery-item-title">{image.title}</span>
                <span className="gallery-view-btn">View</span>
              </div>
            </div>
          </FadeIn>
        ))}
      </div>

      {lightboxImage && (
        <div className="lightbox" onClick={closeLightbox}>
          <button className="lightbox-close" onClick={closeLightbox}>
            <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
              <path d="M18 6L6 18M6 6l12 12" />
            </svg>
          </button>
          <button className="lightbox-nav lightbox-nav--prev" onClick={(e) => { e.stopPropagation(); getPrevImage(); }}>
            <svg width="32" height="32" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
              <path d="M15 18l-6-6 6-6" />
            </svg>
          </button>
          <div className="lightbox-content" onClick={(e) => e.stopPropagation()}>
            <img
              src={lightboxImage.src}
              alt={lightboxImage.title}
              className="lightbox-image"
            />
            <div className="lightbox-caption">
              <h3 className="lightbox-title">{lightboxImage.title}</h3>
              <span className="lightbox-category">
                {CATEGORIES.find(c => c.id === lightboxImage.category)?.label}
              </span>
            </div>
          </div>
          <button className="lightbox-nav lightbox-nav--next" onClick={(e) => { e.stopPropagation(); getNextImage(); }}>
            <svg width="32" height="32" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
              <path d="M9 18l6-6-6-6" />
            </svg>
          </button>
        </div>
      )}

      <style jsx>{`
        .gallery-section {
          padding: 100px 48px;
          max-width: 1400px;
          margin: 0 auto;
          background: linear-gradient(180deg, #000000 0%, #0a0a0a 50%, #000000 100%);
        }

        .gallery-header {
          text-align: center;
          margin-bottom: 60px;
        }

        .gallery-title {
          font-family: 'Playfair Display', serif;
          font-size: clamp(36px, 6vw, 56px);
          margin-bottom: 16px;
          color: #ffffff;
          font-weight: 400;
          letter-spacing: 2px;
        }

        .gallery-underline {
          width: 80px;
          height: 3px;
          background: linear-gradient(90deg, transparent, #d4af37, transparent);
          margin: 0 auto 24px;
        }

        .gallery-subtitle {
          font-family: 'Jost', sans-serif;
          font-size: 16px;
          color: #888888;
          letter-spacing: 1px;
          text-transform: uppercase;
        }

        .category-filters {
          display: flex;
          justify-content: center;
          gap: 12px;
          margin-bottom: 48px;
          flex-wrap: wrap;
        }

        .filter-btn {
          padding: 12px 28px;
          background: rgba(255, 255, 255, 0.05);
          border: 1px solid rgba(212, 175, 55, 0.2);
          color: #a0a0a0;
          font-family: 'Jost', sans-serif;
          font-size: 14px;
          font-weight: 500;
          letter-spacing: 1px;
          text-transform: uppercase;
          cursor: pointer;
          transition: all 0.3s ease;
          border-radius: 30px;
        }

        .filter-btn:hover {
          background: rgba(212, 175, 55, 0.1);
          border-color: rgba(212, 175, 55, 0.5);
          color: #d4af37;
        }

        .filter-btn.active {
          background: linear-gradient(135deg, #d4af37, #c9a227);
          border-color: #d4af37;
          color: #000000;
          font-weight: 600;
        }

        .gallery-grid {
          display: grid;
          grid-template-columns: repeat(4, 1fr);
          grid-auto-rows: 280px;
          gap: 16px;
        }

        .gallery-item {
          position: relative;
          overflow: hidden;
          border-radius: 12px;
          cursor: pointer;
          border: 1px solid rgba(212, 175, 55, 0.1);
          transition: all 0.4s cubic-bezier(0.4, 0, 0.2, 1);
        }

        .gallery-item--large {
          grid-column: span 2;
          grid-row: span 2;
        }

        .gallery-item--medium {
          grid-column: span 1;
          grid-row: span 1;
        }

        .gallery-item:hover {
          transform: translateY(-4px);
          border-color: rgba(212, 175, 55, 0.4);
          box-shadow:
            0 20px 40px rgba(0, 0, 0, 0.5),
            0 0 30px rgba(212, 175, 55, 0.15);
        }

        .gallery-image {
          width: 100%;
          height: 100%;
          object-fit: cover;
          transition: transform 0.6s cubic-bezier(0.4, 0, 0.2, 1);
        }

        .gallery-item:hover .gallery-image {
          transform: scale(1.08);
        }

        .gallery-overlay {
          position: absolute;
          inset: 0;
          background: linear-gradient(
            180deg,
            transparent 0%,
            rgba(0, 0, 0, 0.3) 50%,
            rgba(0, 0, 0, 0.85) 100%
          );
          display: flex;
          flex-direction: column;
          justify-content: flex-end;
          padding: 24px;
          opacity: 0;
          transition: all 0.4s ease;
        }

        .gallery-item:hover .gallery-overlay {
          opacity: 1;
        }

        .gallery-item-title {
          font-family: 'Playfair Display', serif;
          font-size: 18px;
          color: #ffffff;
          margin-bottom: 8px;
          transform: translateY(20px);
          transition: transform 0.4s ease 0.1s;
        }

        .gallery-view-btn {
          font-family: 'Jost', sans-serif;
          font-size: 12px;
          font-weight: 600;
          letter-spacing: 1.5px;
          text-transform: uppercase;
          color: #d4af37;
          transform: translateY(20px);
          transition: transform 0.4s ease 0.2s;
        }

        .gallery-item:hover .gallery-item-title,
        .gallery-item:hover .gallery-view-btn {
          transform: translateY(0);
        }

        /* Lightbox */
        .lightbox {
          position: fixed;
          inset: 0;
          z-index: 1000;
          background: rgba(0, 0, 0, 0.95);
          backdrop-filter: blur(10px);
          display: flex;
          align-items: center;
          justify-content: center;
          padding: 40px;
          animation: fadeIn 0.3s ease;
        }

        @keyframes fadeIn {
          from {
            opacity: 0;
          }
          to {
            opacity: 1;
          }
        }

        .lightbox-close {
          position: absolute;
          top: 30px;
          right: 30px;
          width: 50px;
          height: 50px;
          background: rgba(255, 255, 255, 0.1);
          border: 1px solid rgba(212, 175, 55, 0.3);
          border-radius: 50%;
          display: flex;
          align-items: center;
          justify-content: center;
          color: #d4af37;
          cursor: pointer;
          transition: all 0.3s ease;
        }

        .lightbox-close:hover {
          background: rgba(212, 175, 55, 0.2);
          transform: rotate(90deg);
        }

        .lightbox-nav {
          position: absolute;
          top: 50%;
          transform: translateY(-50%);
          width: 60px;
          height: 60px;
          background: rgba(255, 255, 255, 0.1);
          border: 1px solid rgba(212, 175, 55, 0.3);
          border-radius: 50%;
          display: flex;
          align-items: center;
          justify-content: center;
          color: #d4af37;
          cursor: pointer;
          transition: all 0.3s ease;
        }

        .lightbox-nav--prev {
          left: 30px;
        }

        .lightbox-nav--next {
          right: 30px;
        }

        .lightbox-nav:hover {
          background: rgba(212, 175, 55, 0.2);
          transform: translateY(-50%) scale(1.1);
        }

        .lightbox-content {
          max-width: 90vw;
          max-height: 80vh;
          position: relative;
          animation: slideUp 0.4s ease;
        }

        @keyframes slideUp {
          from {
            opacity: 0;
            transform: translateY(30px);
          }
          to {
            opacity: 1;
            transform: translateY(0);
          }
        }

        .lightbox-image {
          max-width: 100%;
          max-height: calc(80vh - 80px);
          object-fit: contain;
          border-radius: 8px;
          box-shadow: 0 20px 60px rgba(0, 0, 0, 0.8);
        }

        .lightbox-caption {
          position: absolute;
          bottom: -60px;
          left: 0;
          right: 0;
          text-align: center;
        }

        .lightbox-title {
          font-family: 'Playfair Display', serif;
          font-size: 24px;
          color: #ffffff;
          margin-bottom: 4px;
        }

        .lightbox-category {
          font-family: 'Jost', sans-serif;
          font-size: 14px;
          color: #d4af37;
          letter-spacing: 1px;
          text-transform: uppercase;
        }

        /* Responsive */
        @media (max-width: 1024px) {
          .gallery-grid {
            grid-template-columns: repeat(3, 1fr);
            grid-auto-rows: 240px;
          }
        }

        @media (max-width: 768px) {
          .gallery-section {
            padding: 60px 20px;
          }

          .gallery-grid {
            grid-template-columns: repeat(2, 1fr);
            grid-auto-rows: 200px;
            gap: 12px;
          }

          .gallery-item--large {
            grid-column: span 2;
          }

          .category-filters {
            gap: 8px;
          }

          .filter-btn {
            padding: 10px 20px;
            font-size: 12px;
          }

          .lightbox {
            padding: 20px;
          }

          .lightbox-close,
          .lightbox-nav {
            width: 44px;
            height: 44px;
          }

          .lightbox-nav--prev {
            left: 10px;
          }

          .lightbox-nav--next {
            right: 10px;
          }

          .lightbox-close {
            top: 10px;
            right: 10px;
          }
        }

        @media (max-width: 480px) {
          .gallery-grid {
            grid-template-columns: 1fr;
            grid-auto-rows: 240px;
          }

          .gallery-item--large {
            grid-column: span 1;
            grid-row: span 2;
          }

          .gallery-item--medium {
            grid-column: span 1;
          }

          .category-filters {
            gap: 6px;
          }

          .filter-btn {
            padding: 8px 16px;
            font-size: 11px;
          }
        }
      `}</style>
    </section>
  );
};

export default GallerySection;
