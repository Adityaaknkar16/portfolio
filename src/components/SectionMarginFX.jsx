import { motion, useInView } from 'framer-motion';
import { useRef } from 'react';

const SIDE_ITEMS = {
  left: [
    { icon: '⟨/⟩', label: 'Frontend' },
    { icon: '⚡', label: 'API' },
    { icon: '◈', label: 'Data' },
  ],
  right: [
    { icon: '⬡', label: 'Cloud' },
    { icon: '◉', label: 'AI/RAG' },
    { icon: '⇄', label: 'Realtime' },
  ],
};

function FloatingCard({ item, side, index, inView }) {
  const fromLeft = side === 'left';

  return (
    <motion.div
      className="tech-chip absolute hidden lg:block border border-border bg-panel px-3 py-1.5"
      style={{
        [side]: '2%',
        top: `${18 + index * 28}%`,
      }}
      initial={{
        opacity: 0,
        rotateY: fromLeft ? 25 : -25,
        x: fromLeft ? -50 : 50,
        z: -80,
      }}
      animate={
        inView
          ? { opacity: 1, rotateY: fromLeft ? 8 : -8, x: 0, z: 0 }
          : { opacity: 0, rotateY: fromLeft ? 25 : -25, x: fromLeft ? -50 : 50, z: -80 }
      }
      transition={{ duration: 0.8, delay: index * 0.12, ease: [0.16, 1, 0.3, 1] }}
    >
      <span className="text-sm text-accent font-bold">{item.icon}</span>
      <span className="mt-1 block font-mono text-[9px] uppercase tracking-widest text-zinc-500">
        {item.label}
      </span>
    </motion.div>
  );
}

export default function SectionMarginFX({ tag }) {
  const ref = useRef(null);
  const inView = useInView(ref, { once: false, margin: '-10% 0px' });

  return (
    <div ref={ref} className="pointer-events-none absolute inset-0 overflow-hidden" aria-hidden>
      {tag && (
        <motion.span
          className="absolute left-[3%] top-6 font-mono text-[10px] uppercase tracking-[0.4em] text-accent/30 lg:left-[2%]"
          initial={{ opacity: 0, x: -20 }}
          animate={inView ? { opacity: 1, x: 0 } : { opacity: 0, x: -20 }}
        >
          {tag}
        </motion.span>
      )}
      {SIDE_ITEMS.left.map((item, i) => (
        <FloatingCard key={`l-${item.label}`} item={item} side="left" index={i} inView={inView} />
      ))}
      {SIDE_ITEMS.right.map((item, i) => (
        <FloatingCard key={`r-${item.label}`} item={item} side="right" index={i} inView={inView} />
      ))}
      <motion.div
        className="absolute bottom-8 left-[4%] h-px w-[min(120px,12vw)] bg-gradient-to-r from-accent/30 to-transparent lg:block hidden"
        animate={inView ? { scaleX: 1, opacity: 1 } : { scaleX: 0, opacity: 0 }}
        style={{ transformOrigin: 'left' }}
      />
      <motion.div
        className="absolute bottom-8 right-[4%] h-px w-[min(120px,12vw)] bg-gradient-to-l from-accent/30 to-transparent lg:block hidden"
        animate={inView ? { scaleX: 1, opacity: 1 } : { scaleX: 0, opacity: 0 }}
        style={{ transformOrigin: 'right' }}
      />
    </div>
  );
}
