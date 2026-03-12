import { useInView } from '../hooks/useInView';

const FadeIn = ({ children, delay = 0, className = '' }) => {
  const [ref, isVisible] = useInView();

  const style = {
    opacity: isVisible ? 1 : 0,
    transform: isVisible ? 'translateY(0)' : 'translateY(32px)',
    transition: `opacity 0.75s ease ${delay}ms, transform 0.75s ease ${delay}ms`
  };

  return (
    <div ref={ref} style={style} className={className}>
      {children}
    </div>
  );
};

export default FadeIn;
