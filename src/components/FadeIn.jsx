import { useInView } from '../hooks/useInView';

/**
 * Scroll-reveal wrapper. Respects prefers-reduced-motion:
 * users who opt out see content immediately with no transform.
 */
const prefersReducedMotion =
  typeof window !== 'undefined' &&
  window.matchMedia &&
  window.matchMedia('(prefers-reduced-motion: reduce)').matches;

const FadeIn = ({ children, delay = 0, y = 28, className = '', as: Tag = 'div' }) => {
  const [ref, isVisible] = useInView();

  const shown = prefersReducedMotion || isVisible;

  const style = prefersReducedMotion
    ? undefined
    : {
        opacity: shown ? 1 : 0,
        transform: shown ? 'translateY(0)' : `translateY(${y}px)`,
        transition: `opacity 0.7s cubic-bezier(0.16,1,0.3,1) ${delay}ms, transform 0.7s cubic-bezier(0.16,1,0.3,1) ${delay}ms`,
        willChange: 'opacity, transform',
      };

  return (
    <Tag ref={ref} style={style} className={className}>
      {children}
    </Tag>
  );
};

export default FadeIn;
