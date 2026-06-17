import { useState, useEffect } from 'react';

/**
 * Scroll-spy: returns the id of the section currently crossing the viewport
 * midpoint. Used to drive the active nav link + aria-current.
 */
export const useActiveSection = (ids = []) => {
  const [active, setActive] = useState(null);
  const key = ids.join(',');

  useEffect(() => {
    const els = ids
      .map((id) => document.getElementById(id))
      .filter(Boolean);
    if (els.length === 0) return;

    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) setActive(entry.target.id);
        });
      },
      // A zero-height band at the vertical center of the viewport:
      // the section under the midpoint becomes "active".
      { rootMargin: '-50% 0px -50% 0px', threshold: 0 }
    );

    els.forEach((el) => observer.observe(el));
    return () => observer.disconnect();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [key]);

  return active;
};
