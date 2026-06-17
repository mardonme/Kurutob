import { useState, useEffect, useRef } from 'react';
import Container from './ui/Container';
import SectionHeader from './ui/SectionHeader';
import Icon from './ui/Icon';
import FadeIn from './FadeIn';
import { GALLERY_IMAGES, CATEGORIES } from '../data/galleryImages';

const GallerySection = () => {
  const [activeCategory, setActiveCategory] = useState('all');
  const [lightboxImage, setLightboxImage] = useState(null);

  const dialogRef = useRef(null);
  const lastFocusedRef = useRef(null);

  const filteredImages =
    activeCategory === 'all'
      ? GALLERY_IMAGES
      : GALLERY_IMAGES.filter((img) => img.category === activeCategory);

  const openLightbox = (image) => {
    lastFocusedRef.current = document.activeElement;
    setLightboxImage(image);
    document.body.style.overflow = 'hidden';
  };

  const closeLightbox = () => {
    setLightboxImage(null);
    document.body.style.overflow = '';
  };

  const getNextImage = () => {
    const currentIndex = filteredImages.findIndex((img) => img.id === lightboxImage.id);
    const nextIndex = (currentIndex + 1) % filteredImages.length;
    setLightboxImage(filteredImages[nextIndex]);
  };

  const getPrevImage = () => {
    const currentIndex = filteredImages.findIndex((img) => img.id === lightboxImage.id);
    const prevIndex = (currentIndex - 1 + filteredImages.length) % filteredImages.length;
    setLightboxImage(filteredImages[prevIndex]);
  };

  // Keyboard support + focus management while the lightbox is open.
  useEffect(() => {
    if (!lightboxImage) return;

    const handleKeyDown = (e) => {
      if (e.key === 'Escape') {
        e.preventDefault();
        closeLightbox();
      } else if (e.key === 'ArrowLeft') {
        e.preventDefault();
        getPrevImage();
      } else if (e.key === 'ArrowRight') {
        e.preventDefault();
        getNextImage();
      } else if (e.key === 'Tab') {
        // Trap focus within the dialog (required for aria-modal).
        const dialog = dialogRef.current;
        if (!dialog) return;
        const focusable = dialog.querySelectorAll(
          'button, a[href], [tabindex]:not([tabindex="-1"])'
        );
        if (focusable.length === 0) {
          e.preventDefault();
          return;
        }
        const first = focusable[0];
        const last = focusable[focusable.length - 1];
        const active = document.activeElement;
        if (e.shiftKey) {
          if (active === first || active === dialog) {
            e.preventDefault();
            last.focus();
          }
        } else if (active === last) {
          e.preventDefault();
          first.focus();
        }
      }
    };

    document.addEventListener('keydown', handleKeyDown);

    // Move focus into the dialog when it opens.
    if (dialogRef.current) {
      dialogRef.current.focus();
    }

    return () => {
      document.removeEventListener('keydown', handleKeyDown);
    };
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [lightboxImage]);

  // Restore focus to the trigger when the lightbox fully closes.
  useEffect(() => {
    if (!lightboxImage && lastFocusedRef.current) {
      lastFocusedRef.current.focus?.();
      lastFocusedRef.current = null;
    }
  }, [lightboxImage]);

  const activeLabel = CATEGORIES.find((c) => c.id === lightboxImage?.category)?.label;

  return (
    <section id="gallery" className="gallery-section">
      <span className="glow-accent gallery-glow" aria-hidden="true" />

      <Container size="wide" className="gallery-inner">
        <FadeIn>
          <SectionHeader
            eyebrow="GALLERY"
            title={<>Our <em>Gallery</em></>}
            subtitle="Experience the art of Tajik and Central Asian cuisine — from sizzling kitchens to plated craft."
          />
        </FadeIn>

        <FadeIn>
          <div className="gallery-filters" role="group" aria-label="Filter gallery by category">
            {CATEGORIES.map((category) => {
              const isActive = activeCategory === category.id;
              return (
                <button
                  key={category.id}
                  type="button"
                  className={`gallery-filter ${isActive ? 'is-active' : ''}`.trim()}
                  aria-pressed={isActive}
                  onClick={() => setActiveCategory(category.id)}
                >
                  {category.label}
                </button>
              );
            })}
          </div>
        </FadeIn>

        {filteredImages.length === 0 ? (
          <FadeIn>
            <div className="gallery-empty" role="status">
              <Icon name="utensils" size={28} className="gallery-empty-icon" />
              <p className="gallery-empty-text">
                No images in this category yet. Please check back soon.
              </p>
            </div>
          </FadeIn>
        ) : (
          <div className="gallery-grid">
            {filteredImages.map((image, index) => (
              <FadeIn
                key={image.id}
                delay={index * 50}
                className={`gallery-cell gallery-cell--${image.span}`}
              >
                <button
                  type="button"
                  className="gallery-item"
                  onClick={() => openLightbox(image)}
                  aria-label={`View ${image.title}`}
                >
                  <img
                    src={image.src}
                    alt={image.title}
                    className="gallery-image"
                    width={image.span === 'large' ? 800 : 600}
                    height={image.span === 'large' ? 600 : 450}
                    loading="lazy"
                    decoding="async"
                  />
                  <span className="gallery-overlay">
                    <span className="gallery-item-title">{image.title}</span>
                    <span className="gallery-view">
                      View
                      <Icon name="arrowUpRight" size={14} />
                    </span>
                  </span>
                </button>
              </FadeIn>
            ))}
          </div>
        )}
      </Container>

      {lightboxImage && (
        <div
          className="gallery-lightbox"
          onClick={closeLightbox}
          role="dialog"
          aria-modal="true"
          aria-label={`Gallery image: ${lightboxImage.title}`}
          ref={dialogRef}
          tabIndex={-1}
        >
          <button
            type="button"
            className="gallery-lb-close"
            onClick={closeLightbox}
            aria-label="Close gallery"
          >
            <Icon name="close" size={22} />
          </button>

          <button
            type="button"
            className="gallery-lb-nav gallery-lb-nav--prev"
            onClick={(e) => {
              e.stopPropagation();
              getPrevImage();
            }}
            aria-label="Previous image"
          >
            <Icon name="chevronLeft" size={28} />
          </button>

          <figure className="gallery-lb-content" onClick={(e) => e.stopPropagation()}>
            <img
              src={lightboxImage.src}
              alt={lightboxImage.title}
              className="gallery-lb-image"
              width={1200}
              height={800}
              decoding="async"
            />
            <figcaption className="gallery-lb-caption">
              <h3 className="gallery-lb-title">{lightboxImage.title}</h3>
              {activeLabel && <span className="gallery-lb-category">{activeLabel}</span>}
            </figcaption>
          </figure>

          <button
            type="button"
            className="gallery-lb-nav gallery-lb-nav--next"
            onClick={(e) => {
              e.stopPropagation();
              getNextImage();
            }}
            aria-label="Next image"
          >
            <Icon name="chevronRight" size={28} />
          </button>
        </div>
      )}

      <style jsx>{`
        .gallery-section {
          position: relative;
          background: var(--c-bg);
          padding-block: clamp(64px, 10vw, 128px);
          overflow: hidden;
        }

        .gallery-inner {
          position: relative;
          z-index: 1;
        }

        .gallery-glow {
          top: -10%;
          left: 50%;
          transform: translateX(-50%);
          width: clamp(320px, 60vw, 760px);
          height: clamp(320px, 60vw, 760px);
          opacity: 0.6;
        }

        /* ---------- Filters ---------- */
        .gallery-filters {
          display: flex;
          justify-content: center;
          flex-wrap: wrap;
          gap: var(--space-3);
          margin-bottom: clamp(var(--space-6), 5vw, var(--space-7));
        }

        .gallery-filter {
          display: inline-flex;
          align-items: center;
          justify-content: center;
          min-height: 44px;
          padding: 10px 22px;
          border-radius: var(--radius-pill);
          border: 1px solid var(--c-border);
          background: var(--c-surface-1);
          color: var(--c-text-2);
          font-family: var(--font-sans);
          font-size: var(--fs-sm);
          font-weight: 600;
          letter-spacing: 0.04em;
          cursor: pointer;
          transition: color var(--dur) var(--ease),
            background var(--dur) var(--ease),
            border-color var(--dur) var(--ease),
            transform var(--dur) var(--ease);
        }

        .gallery-filter:hover {
          color: var(--c-gold);
          border-color: var(--c-gold-line);
          background: var(--c-gold-soft);
        }

        .gallery-filter.is-active {
          background: var(--c-gold);
          border-color: var(--c-gold);
          color: var(--c-on-gold);
        }

        .gallery-filter.is-active:hover {
          background: var(--c-gold-hover);
          border-color: var(--c-gold-hover);
        }

        /* ---------- Empty state ---------- */
        .gallery-empty {
          display: flex;
          flex-direction: column;
          align-items: center;
          gap: var(--space-3);
          text-align: center;
          padding: clamp(var(--space-7), 8vw, var(--space-9)) var(--space-5);
          border: 1px dashed var(--c-border-strong);
          border-radius: var(--radius-lg);
          background: var(--c-surface-1);
        }

        .gallery-empty-icon {
          color: var(--c-gold);
        }

        .gallery-empty-text {
          color: var(--c-text-2);
          font-size: var(--fs-lg);
          max-width: 40ch;
        }

        /* ---------- Bento grid ---------- */
        .gallery-grid {
          display: grid;
          grid-template-columns: repeat(4, 1fr);
          grid-auto-rows: 280px;
          gap: var(--space-4);
        }

        .gallery-cell {
          min-width: 0;
        }

        .gallery-cell--large {
          grid-column: span 2;
          grid-row: span 2;
        }

        .gallery-cell--medium {
          grid-column: span 1;
          grid-row: span 1;
        }

        .gallery-item {
          position: relative;
          display: block;
          width: 100%;
          height: 100%;
          padding: 0;
          overflow: hidden;
          border-radius: var(--radius-lg);
          border: 1px solid var(--c-border);
          background: var(--c-surface-2);
          cursor: pointer;
          transition: transform var(--dur) var(--ease),
            border-color var(--dur) var(--ease),
            box-shadow var(--dur) var(--ease);
        }

        .gallery-item:hover {
          transform: translateY(-4px);
          border-color: var(--c-border-strong);
          box-shadow: var(--shadow-lg), var(--shadow-glow);
        }

        .gallery-image {
          width: 100%;
          height: 100%;
          object-fit: cover;
          transition: transform var(--dur-slow) var(--ease);
        }

        .gallery-item:hover .gallery-image {
          transform: scale(1.06);
        }

        .gallery-overlay {
          position: absolute;
          inset: 0;
          display: flex;
          flex-direction: column;
          justify-content: flex-end;
          gap: var(--space-2);
          padding: var(--space-5);
          background: linear-gradient(
            180deg,
            transparent 0%,
            rgba(11, 10, 7, 0.2) 45%,
            rgba(11, 10, 7, 0.88) 100%
          );
          opacity: 0;
          transition: opacity var(--dur) var(--ease);
        }

        .gallery-item:hover .gallery-overlay,
        .gallery-item:focus-visible .gallery-overlay {
          opacity: 1;
        }

        .gallery-item-title {
          font-family: var(--font-display);
          font-size: var(--fs-h3);
          font-weight: 700;
          color: var(--c-text);
          line-height: 1.15;
        }

        .gallery-view {
          display: inline-flex;
          align-items: center;
          gap: var(--space-1);
          font-family: var(--font-sans);
          font-size: var(--fs-xs);
          font-weight: 600;
          letter-spacing: 0.12em;
          text-transform: uppercase;
          color: var(--c-gold);
        }

        /* ---------- Lightbox ---------- */
        .gallery-lightbox {
          position: fixed;
          inset: 0;
          z-index: 1000;
          display: flex;
          align-items: center;
          justify-content: center;
          padding: clamp(var(--space-4), 4vw, var(--space-7));
          background: var(--c-scrim);
          backdrop-filter: blur(10px);
          animation: gallery-fade var(--dur) var(--ease);
        }

        @keyframes gallery-fade {
          from {
            opacity: 0;
          }
          to {
            opacity: 1;
          }
        }

        .gallery-lb-close {
          position: absolute;
          top: clamp(var(--space-3), 3vw, var(--space-6));
          right: clamp(var(--space-3), 3vw, var(--space-6));
          width: 48px;
          height: 48px;
          display: flex;
          align-items: center;
          justify-content: center;
          border-radius: var(--radius-pill);
          border: 1px solid var(--c-border-strong);
          background: var(--c-surface-2);
          color: var(--c-gold);
          cursor: pointer;
          transition: background var(--dur) var(--ease),
            border-color var(--dur) var(--ease),
            color var(--dur) var(--ease);
        }

        .gallery-lb-close:hover {
          background: var(--c-gold-soft);
          border-color: var(--c-gold);
          color: var(--c-gold-hover);
        }

        .gallery-lb-nav {
          position: absolute;
          top: 50%;
          transform: translateY(-50%);
          width: 56px;
          height: 56px;
          display: flex;
          align-items: center;
          justify-content: center;
          border-radius: var(--radius-pill);
          border: 1px solid var(--c-border-strong);
          background: var(--c-surface-2);
          color: var(--c-gold);
          cursor: pointer;
          transition: background var(--dur) var(--ease),
            border-color var(--dur) var(--ease),
            color var(--dur) var(--ease);
        }

        .gallery-lb-nav:hover {
          background: var(--c-gold-soft);
          border-color: var(--c-gold);
          color: var(--c-gold-hover);
        }

        .gallery-lb-nav--prev {
          left: clamp(var(--space-2), 3vw, var(--space-6));
        }

        .gallery-lb-nav--next {
          right: clamp(var(--space-2), 3vw, var(--space-6));
        }

        .gallery-lb-content {
          position: relative;
          max-width: min(90vw, 1100px);
          display: flex;
          flex-direction: column;
          align-items: center;
          gap: var(--space-4);
          margin: 0;
          animation: gallery-rise var(--dur-slow) var(--ease-out);
        }

        @keyframes gallery-rise {
          from {
            opacity: 0;
            transform: translateY(24px);
          }
          to {
            opacity: 1;
            transform: translateY(0);
          }
        }

        .gallery-lb-image {
          width: auto;
          height: auto;
          max-width: 100%;
          max-height: 76vh;
          object-fit: contain;
          border-radius: var(--radius-md);
          border: 1px solid var(--c-border);
          box-shadow: var(--shadow-lg);
        }

        .gallery-lb-caption {
          text-align: center;
        }

        .gallery-lb-title {
          font-family: var(--font-display);
          font-size: var(--fs-h3);
          color: var(--c-text);
          margin-bottom: var(--space-1);
        }

        .gallery-lb-category {
          font-family: var(--font-sans);
          font-size: var(--fs-sm);
          font-weight: 600;
          letter-spacing: 0.12em;
          text-transform: uppercase;
          color: var(--c-gold);
        }

        /* ---------- Responsive ---------- */
        @media (max-width: 1024px) {
          .gallery-grid {
            grid-template-columns: repeat(3, 1fr);
            grid-auto-rows: 240px;
          }
        }

        @media (max-width: 768px) {
          .gallery-grid {
            grid-template-columns: repeat(2, 1fr);
            grid-auto-rows: 200px;
            gap: var(--space-3);
          }

          .gallery-cell--large {
            grid-column: span 2;
          }

          .gallery-lb-nav {
            width: 44px;
            height: 44px;
          }
        }

        @media (max-width: 480px) {
          .gallery-grid {
            grid-template-columns: 1fr;
            grid-auto-rows: 240px;
          }

          .gallery-cell--large {
            grid-column: span 1;
            grid-row: span 2;
          }

          .gallery-cell--medium {
            grid-column: span 1;
          }
        }
      `}</style>
    </section>
  );
};

export default GallerySection;
