import { motion, useInView } from 'framer-motion';
import { useRef } from 'react';
import { useInView as useIOInView } from 'react-intersection-observer';

const EASE = [0.16, 1, 0.3, 1];
const DURATION = 0.8;

const variants = {
  left: {
    hidden: { opacity: 0, rotateY: 15, x: -60 },
    visible: { opacity: 1, rotateY: 0, x: 0 },
  },
  right: {
    hidden: { opacity: 0, rotateY: -15, x: 60 },
    visible: { opacity: 1, rotateY: 0, x: 0 },
  },
  depth: {
    hidden: { opacity: 0, rotateX: 12, y: 50 },
    visible: { opacity: 1, rotateX: 0, y: 0 },
  },
  fade: {
    hidden: { opacity: 0, y: 24 },
    visible: { opacity: 1, y: 0 },
  },
};

export default function ScrollReveal({
  children,
  direction = 'depth',
  delay = 0,
  className = '',
  as: Component = motion.div,
}) {
  const ref = useRef(null);
  const isInView = useInView(ref, { once: true, margin: '-80px' });
  const { ref: ioRef, inView: ioInView } = useIOInView({
    triggerOnce: true,
    threshold: 0.12,
    rootMargin: '-80px 0px',
  });

  const setRefs = (node) => {
    ref.current = node;
    ioRef(node);
  };

  const active = isInView || ioInView;
  const v = variants[direction] || variants.depth;

  return (
    <Component
      ref={setRefs}
      className={className}
      initial="hidden"
      animate={active ? 'visible' : 'hidden'}
      variants={v}
      transition={{ duration: DURATION, ease: EASE, delay }}
      style={{ perspective: 1000, transformStyle: 'preserve-3d' }}
    >
      {children}
    </Component>
  );
}
