import { motion, useReducedMotion } from 'framer-motion';

/**
 * AnimatedSection
 *
 * Drop-in wrapper that fades + slides its children into view on scroll.
 *
 * Props:
 *  - children      React nodes
 *  - className     Extra classes on the <motion.section>
 *  - id            Optional id for anchor links
 *  - direction     'up' | 'down' | 'left' | 'right' | 'none'   (default: 'up')
 *  - delay         Seconds before the animation starts          (default: 0)
 *  - duration      Seconds the animation runs                   (default: 0.6)
 *  - distance      Pixels of travel                             (default: 40)
 *  - once          Animate only the first time                  (default: true)
 *  - margin        IntersectionObserver root margin             (default: '-100px')
 *  - as            Wrapper element                              (default: 'section')
 */
const AnimatedSection = ({
  children,
  className = '',
  id,
  direction = 'up',
  delay = 0,
  duration = 0.6,
  distance = 40,
  once = true,
  margin = '-100px',
  as = 'section',
}) => {
  const prefersReducedMotion = useReducedMotion();

  const offsets = {
    up: { y: distance },
    down: { y: -distance },
    left: { x: distance },
    right: { x: -distance },
    none: {},
  };

  const initial = prefersReducedMotion
    ? { opacity: 0 }
    : { opacity: 0, ...offsets[direction] };

  const animate = prefersReducedMotion
    ? { opacity: 1 }
    : { opacity: 1, x: 0, y: 0 };

  const MotionTag = motion[as];

  return (
    <MotionTag
      id={id}
      initial={initial}
      whileInView={animate}
      viewport={{ once, margin }}
      transition={{ duration, delay, ease: [0.22, 1, 0.36, 1] }}
      className={className}
    >
      {children}
    </MotionTag>
  );
};

export default AnimatedSection;