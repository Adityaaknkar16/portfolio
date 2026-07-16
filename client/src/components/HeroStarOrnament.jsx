import { useRef } from 'react';
import {
  motion,
  useMotionValue,
  useSpring,
  useTransform,
  useScroll,
  useTransform as useScrollTransform,
} from 'framer-motion';

function StarShape({ className = '', size = 120 }) {
  return (
    <svg
      viewBox="0 0 100 100"
      width={size}
      height={size}
      className={className}
      aria-hidden
    >
      <defs>
        <linearGradient id="starGold" x1="0%" y1="0%" x2="100%" y2="100%">
          <stop offset="0%" stopColor="#E8C96A" />
          <stop offset="50%" stopColor="#C9A84C" />
          <stop offset="100%" stopColor="#8B7340" />
        </linearGradient>
        <filter id="starGlow">
          <feGaussianBlur stdDeviation="2" result="blur" />
          <feMerge>
            <feMergeNode in="blur" />
            <feMergeNode in="SourceGraphic" />
          </feMerge>
        </filter>
      </defs>
      <polygon
        points="50,4 61,38 98,38 68,58 79,94 50,72 21,94 32,58 2,38 39,38"
        fill="url(#starGold)"
        filter="url(#starGlow)"
        opacity="0.95"
      />
      <polygon
        points="50,18 57,40 80,40 62,54 69,76 50,62 31,76 38,54 20,40 43,40"
        fill="#0D0D0D"
        opacity="0.85"
      />
      <circle cx="50" cy="48" r="6" fill="#C9A84C" />
    </svg>
  );
}

function OrbitDot({ radius, duration, delay, size = 4 }) {
  return (
    <motion.div
      className="absolute left-1/2 top-1/2"
      style={{ width: radius * 2, height: radius * 2, marginLeft: -radius, marginTop: -radius }}
      animate={{ rotate: 360 }}
      transition={{ duration, repeat: Infinity, ease: 'linear', delay }}
    >
      <span
        className="absolute left-1/2 top-0 -translate-x-1/2 rounded-full bg-gold-light shadow-[0_0_8px_#C9A84C]"
        style={{ width: size, height: size }}
      />
    </motion.div>
  );
}

export default function HeroStarOrnament() {
  const containerRef = useRef(null);
  const mouseX = useMotionValue(0);
  const mouseY = useMotionValue(0);

  const { scrollY } = useScroll();
  const scrollRotate = useScrollTransform(scrollY, [0, 600], [0, 18]);
  const scrollYShift = useScrollTransform(scrollY, [0, 600], [0, 40]);

  const springConfig = { stiffness: 120, damping: 22 };
  const rotateX = useSpring(useTransform(mouseY, [-0.5, 0.5], [14, -14]), springConfig);
  const rotateY = useSpring(useTransform(mouseX, [-0.5, 0.5], [-18, 18]), springConfig);
  const handleMouseMove = (e) => {
    if (!containerRef.current) return;
    const rect = containerRef.current.getBoundingClientRect();
    const cx = rect.left + rect.width / 2;
    const cy = rect.top + rect.height / 2;
    mouseX.set((e.clientX - cx) / rect.width);
    mouseY.set((e.clientY - cy) / rect.height);
  };

  const handleMouseLeave = () => {
    mouseX.set(0);
    mouseY.set(0);
  };

  return (
    <div
      ref={containerRef}
      className="pointer-events-auto absolute right-[5%] top-[22%] z-[5] hidden h-[min(42vw,320px)] w-[min(42vw,320px)] max-[900px]:hidden lg:right-[8%] lg:block"
      onMouseMove={handleMouseMove}
      onMouseLeave={handleMouseLeave}
      aria-hidden
    >
      {/* Effect 1: depth glow */}
      <motion.div
        className="absolute inset-0 rounded-full bg-gold/10 blur-3xl"
        animate={{ scale: [1, 1.15, 1], opacity: [0.25, 0.45, 0.25] }}
        transition={{ duration: 4, repeat: Infinity, ease: 'easeInOut' }}
      />

      {/* Effect 2: scroll parallax layer */}
      <motion.div className="absolute inset-0" style={{ y: scrollYShift, rotate: scrollRotate }}>
        <div className="absolute inset-0 rounded-full border border-gold/15" />
        <motion.div
          className="absolute inset-6 rounded-full border border-dashed border-gold/20"
          animate={{ rotate: 360 }}
          transition={{ duration: 48, repeat: Infinity, ease: 'linear' }}
        />
        <motion.div
          className="absolute inset-12 rounded-full border border-gold/10"
          animate={{ rotate: -360 }}
          transition={{ duration: 32, repeat: Infinity, ease: 'linear' }}
        />
      </motion.div>

      {/* Effect 3: 3D star + mouse tilt + float */}
      <motion.div
        className="absolute inset-0 flex items-center justify-center"
        style={{
          perspective: 1200,
          rotateX,
          rotateY,
          transformStyle: 'preserve-3d',
        }}
        animate={{ y: [0, -14, 0] }}
        transition={{ duration: 5.5, repeat: Infinity, ease: 'easeInOut' }}
      >
        <motion.div
          style={{ transformStyle: 'preserve-3d', translateZ: 40 }}
          animate={{ rotateZ: [0, 6, 0, -6, 0] }}
          transition={{ duration: 12, repeat: Infinity, ease: 'easeInOut' }}
        >
          <StarShape size={140} className="drop-shadow-[0_0_28px_rgba(201,168,76,0.45)]" />
        </motion.div>

        <OrbitDot radius={95} duration={14} delay={0} size={5} />
        <OrbitDot radius={115} duration={20} delay={2} size={3} />
        <OrbitDot radius={75} duration={10} delay={1} size={4} />
      </motion.div>

      {/* Sparkle particles */}
      {[...Array(6)].map((_, i) => (
        <motion.span
          key={i}
          className="absolute h-1 w-1 rounded-full bg-gold-light"
          style={{
            left: `${20 + i * 12}%`,
            top: `${15 + (i % 3) * 25}%`,
          }}
          animate={{
            opacity: [0.2, 1, 0.2],
            scale: [0.8, 1.4, 0.8],
          }}
          transition={{
            duration: 2 + i * 0.4,
            repeat: Infinity,
            delay: i * 0.35,
          }}
        />
      ))}
    </div>
  );
}
