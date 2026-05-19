import { motion, useScroll, useTransform } from 'framer-motion';
import Laptop3D from './Laptop3D';

/* Vertical zones — one visual “chapter” per scroll region (all sections) */
const SCROLL_ZONES = [
  { top: '2%', side: 'right', type: 'laptop', scale: 1 },
  { top: '22%', side: 'left', type: 'terminal', title: 'about.tsx' },
  { top: '38%', side: 'right', type: 'laptop', scale: 0.75 },
  { top: '52%', side: 'left', type: 'server' },
  { top: '66%', side: 'right', type: 'ai' },
  { top: '80%', side: 'left', type: 'terminal', title: 'deploy.sh' },
  { top: '92%', side: 'right', type: 'laptop', scale: 0.65 },
];

const LEFT_TECH = [
  'React.js', 'Node.js', 'MongoDB', 'FastAPI', 'RAG / LLM', 'Docker',
  'WebRTC', 'TypeScript', 'PostgreSQL', 'Redis', 'GraphQL', 'Kubernetes',
  'Next.js', 'Express', 'Gemini', 'Qdrant', 'Stripe', 'Firebase',
];

const RIGHT_TECH = [
  '{ API }', 'git push', '99.9%', 'Socket.io', 'Qdrant', 'JWT',
  'WebRTC', 'BM25', 'Ollama', 'CI/CD', 'REST', 'Docker',
  'HD Video', '<100ms', 'MERN', 'GenAI', 'RAG',
];

function CircuitSVG({ className, style }) {
  return (
    <motion.svg className={className} style={style} viewBox="0 0 200 800" fill="none" aria-hidden>
      <motion.path
        d="M20 40 L80 40 L100 80 L140 80 L160 120 L100 120 L80 160 L40 160 L20 220 L100 220 L120 280 L180 280"
        stroke="rgba(201,168,76,0.18)"
        strokeWidth="1.2"
        animate={{ pathLength: [0.3, 1, 0.3] }}
        transition={{ duration: 5, repeat: Infinity }}
      />
      <motion.path
        d="M180 320 L120 320 L100 380 L40 380 L20 440 L120 440 L140 500 L180 500"
        stroke="rgba(42,95,79,0.25)"
        strokeWidth="1.2"
        animate={{ pathLength: [0.2, 0.9, 0.2] }}
        transition={{ duration: 6, repeat: Infinity, delay: 1 }}
      />
      <motion.path
        d="M30 560 L90 560 L110 600 L160 600 L180 640 L90 640 L70 700 L30 700"
        stroke="rgba(201,168,76,0.14)"
        strokeWidth="1"
        animate={{ pathLength: [0.4, 1, 0.4] }}
        transition={{ duration: 7, repeat: Infinity, delay: 2 }}
      />
      {[40, 160, 320, 480, 640, 720].map((y, i) => (
        <motion.circle
          key={y}
          cx={i % 2 === 0 ? 30 : 170}
          cy={y}
          r="4"
          fill="#C9A84C"
          animate={{ opacity: [0.15, 0.85, 0.15], scale: [1, 1.3, 1] }}
          transition={{ duration: 2.5, delay: i * 0.4, repeat: Infinity }}
        />
      ))}
    </motion.svg>
  );
}

function TerminalPanel({ title = 'dev-environment' }) {
  return (
    <div className="tech-terminal glass w-[min(240px,18vw)]">
      <motion.div className="mb-2 flex gap-1.5" animate={{ opacity: [0.6, 1, 0.6] }} transition={{ duration: 2, repeat: Infinity }}>
        <span className="h-2 w-2 rounded-full bg-red-500/70" />
        <span className="h-2 w-2 rounded-full bg-gold/70" />
        <span className="h-2 w-2 rounded-full bg-accent-green/70" />
      </motion.div>
      <p className="font-mono text-[9px] text-cream/40">{title}</p>
      <p className="mt-2 font-mono text-[11px] text-gold">$ whoami</p>
      <p className="font-mono text-[11px] text-cream/70">aditya — full_stack_dev</p>
      <p className="mt-2 font-mono text-[11px] text-gold">$ stack --list</p>
      <p className="font-mono text-[11px] text-accent-green">MERN · GenAI · RAG</p>
      <motion.p
        className="mt-2 font-mono text-[10px] text-gold/60"
        animate={{ opacity: [0.3, 1, 0.3] }}
        transition={{ duration: 1.5, repeat: Infinity }}
      >
        ▸ building...
      </motion.p>
    </div>
  );
}

function ServerRack() {
  return (
    <div className="server-rack">
      {[0, 1, 2, 3].map((i) => (
        <motion.div
          key={i}
          className="server-unit"
          animate={{ opacity: [0.5, 1, 0.5] }}
          transition={{ duration: 2, delay: i * 0.3, repeat: Infinity }}
        >
          <span className="server-led" />
          <span className="font-mono text-[8px] text-gold/60">srv_0{i + 1}</span>
        </motion.div>
      ))}
    </div>
  );
}

function AINodeCluster() {
  return (
    <div className="ai-cluster">
      <motion.div className="ai-core" animate={{ scale: [1, 1.08, 1] }} transition={{ duration: 3, repeat: Infinity }}>
        <span className="font-mono text-xs text-gold">RAG</span>
      </motion.div>
      {['LLM', 'Vector', 'BM25'].map((label, i) => (
        <motion.div
          key={label}
          className="ai-node"
          style={{ top: `${10 + i * 30}%`, left: i % 2 === 0 ? '-20%' : '80%' }}
          animate={{ opacity: [0.4, 1, 0.4] }}
          transition={{ duration: 2.5, delay: i * 0.5, repeat: Infinity }}
        >
          <span className="font-mono text-[9px] text-cream/60">{label}</span>
        </motion.div>
      ))}
    </div>
  );
}

function ZoneVisual({ zone, scrollRotate }) {
  const isRight = zone.side === 'right';
  const baseClass = `absolute w-[min(340px,24vw)] ${isRight ? 'right-[3%]' : 'left-[2%]'}`;

  if (zone.type === 'laptop') {
    return (
      <motion.div
        className={baseClass}
        style={{
          top: zone.top,
          scale: zone.scale || 1,
          rotateY: scrollRotate,
          perspective: 1400,
          transformStyle: 'preserve-3d',
        }}
      >
        <Laptop3D />
        <div className="absolute -inset-8 -z-10 rounded-full bg-gold/15 blur-3xl" />
      </motion.div>
    );
  }

  if (zone.type === 'terminal') {
    return (
      <motion.div
        className={baseClass}
        style={{ top: zone.top, rotateY: scrollRotate, transformStyle: 'preserve-3d' }}
      >
        <TerminalPanel title={zone.title} />
      </motion.div>
    );
  }

  if (zone.type === 'server') {
    return (
      <motion.div className={`${baseClass} max-w-[200px]`} style={{ top: zone.top }}>
        <ServerRack />
      </motion.div>
    );
  }

  if (zone.type === 'ai') {
    return (
      <motion.div className={`${baseClass} max-w-[220px]`} style={{ top: zone.top }}>
        <AINodeCluster />
      </motion.div>
    );
  }

  return null;
}

export default function TechScrollScene() {
  const { scrollYProgress } = useScroll();

  /* Master parallax — scrolls tall scene through viewport */
  const sceneY = useTransform(scrollYProgress, [0, 1], ['0%', '-72%']);
  const gridY = useTransform(scrollYProgress, [0, 1], ['0%', '25%']);
  const gridOpacity = useTransform(scrollYProgress, [0, 0.5, 1], [0.65, 0.5, 0.4]);

  /* Layer speeds */
  const layer1Y = useTransform(scrollYProgress, [0, 1], [0, -150]);
  const layer2Y = useTransform(scrollYProgress, [0, 1], [0, -400]);
  const layer3Y = useTransform(scrollYProgress, [0, 1], [0, -700]);
  const layer4Y = useTransform(scrollYProgress, [0, 1], [0, -950]);

  const globalRotateY = useTransform(scrollYProgress, [0, 0.25, 0.5, 0.75, 1], [-8, 6, -4, 8, -6]);
  const globalRotateX = useTransform(scrollYProgress, [0, 0.5, 1], [6, 0, -5]);

  return (
    <motion.div
      className="pointer-events-none fixed inset-0 z-[1] hidden overflow-hidden md:block"
      aria-hidden
      style={{ perspective: 1200 }}
    >
      {/* Layer 0 — ambient */}
      <motion.div className="absolute inset-0 grid-overlay" style={{ y: gridY, opacity: gridOpacity }} />
      <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_20%_30%,rgba(201,168,76,0.06),transparent_50%)]" />
      <motion.div
        className="absolute inset-0 bg-[radial-gradient(ellipse_at_85%_70%,rgba(42,95,79,0.08),transparent_45%)]"
        style={{ y: layer1Y }}
      />

      {/* Tall scrolling world */}
      <motion.div className="absolute inset-x-0 top-0 h-[420vh]" style={{ y: sceneY }}>
        {/* Layer 1 — circuits (slow) */}
        <motion.div className="absolute left-0 top-0 h-full w-[18%]" style={{ y: layer1Y }}>
          <CircuitSVG className="h-full w-full" />
          <CircuitSVG className="absolute right-0 top-0 h-full w-full scale-x-[-1] opacity-60" />
        </motion.div>

        {/* Layer 2 — zone visuals (medium) */}
        <motion.div
          className="absolute inset-0"
          style={{ y: layer2Y, rotateX: globalRotateX, rotateY: globalRotateY }}
        >
          {SCROLL_ZONES.map((zone) => (
            <ZoneVisual key={`${zone.top}-${zone.type}`} zone={zone} scrollRotate={globalRotateY} />
          ))}
        </motion.div>

        {/* Layer 3 — tech chips left (fast) */}
        <motion.div className="absolute left-0 top-0 h-full w-[22%]" style={{ y: layer3Y }}>
          {LEFT_TECH.map((label, i) => (
            <motion.div
              key={label}
              className="tech-chip absolute"
              style={{ left: `${4 + (i % 4) * 4}%`, top: `${4 + i * 5.2}%` }}
              animate={{ y: [0, -8, 0], opacity: [0.55, 0.95, 0.55] }}
              transition={{ duration: 3.5 + (i % 3), repeat: Infinity, delay: i * 0.15 }}
            >
              <span className="font-mono text-[10px] font-medium uppercase tracking-wider text-gold">
                {label}
              </span>
            </motion.div>
          ))}
        </motion.div>

        {/* Layer 3 — tech chips right (fast) */}
        <motion.div className="absolute right-0 top-0 h-full w-[18%]" style={{ y: layer3Y }}>
          {RIGHT_TECH.map((label, i) => (
            <motion.div
              key={label}
              className="tech-chip absolute right-[4%]"
              style={{ top: `${5 + i * 5.5}%` }}
              animate={{ x: [0, 5, 0], opacity: [0.45, 0.9, 0.45] }}
              transition={{ duration: 3 + (i % 4) * 0.5, repeat: Infinity, delay: i * 0.12 }}
            >
              <span className="font-mono text-[10px] text-cream/70">{label}</span>
            </motion.div>
          ))}
        </motion.div>

        {/* Layer 4 — particles & streams (fastest) */}
        <motion.div className="absolute inset-0" style={{ y: layer4Y }}>
          {[...Array(20)].map((_, i) => (
            <motion.span
              key={i}
              className="absolute font-mono text-[10px] font-medium text-gold/35"
              style={{
                left: i % 2 === 0 ? `${2 + (i % 6) * 3}%` : 'auto',
                right: i % 2 === 1 ? `${2 + (i % 5) * 3}%` : 'auto',
                top: `${3 + i * 4.8}%`,
              }}
              animate={{ y: [0, -80, 0], opacity: [0.15, 0.5, 0.15] }}
              transition={{ duration: 6 + i * 0.3, repeat: Infinity, delay: i * 0.25 }}
            >
              {i % 3 === 0 ? '0xC9A84C' : i % 3 === 1 ? '{ }' : '01'}
            </motion.span>
          ))}

          <motion.div
            className="absolute left-[6%] top-0 h-full w-px bg-gradient-to-b from-transparent via-gold/30 to-transparent"
            animate={{ opacity: [0.3, 0.7, 0.3] }}
            transition={{ duration: 4, repeat: Infinity }}
          />
          <motion.div
            className="absolute right-[28%] top-0 h-full w-px bg-gradient-to-b from-transparent via-accent-green/35 to-transparent"
            animate={{ opacity: [0.25, 0.65, 0.25] }}
            transition={{ duration: 5, repeat: Infinity, delay: 1 }}
          />

          {/* Scan lines */}
          <motion.div
            className="absolute inset-x-0 h-px bg-gradient-to-r from-transparent via-gold/25 to-transparent"
            animate={{ top: ['0%', '100%'] }}
            transition={{ duration: 12, repeat: Infinity, ease: 'linear' }}
          />
        </motion.div>

        {/* Corner rings */}
        <motion.div
          className="absolute left-[1%] top-[8%] h-24 w-24 rounded-full border border-gold/20"
          animate={{ rotate: 360, scale: [1, 1.05, 1] }}
          transition={{ rotate: { duration: 20, repeat: Infinity, ease: 'linear' }, scale: { duration: 4, repeat: Infinity } }}
        />
        <motion.div
          className="absolute right-[1%] bottom-[12%] h-32 w-32 rounded-full border border-dashed border-accent-green/25"
          animate={{ rotate: -360 }}
          transition={{ duration: 30, repeat: Infinity, ease: 'linear' }}
        />
      </motion.div>

      {/* Viewport edge vignette — keeps center readable */}
      <motion.div className="absolute inset-0 bg-gradient-to-r from-dark/30 via-transparent to-dark/30" />
      <div className="absolute inset-0 bg-gradient-to-b from-dark/40 via-transparent to-dark/60" />
    </motion.div>
  );
}
