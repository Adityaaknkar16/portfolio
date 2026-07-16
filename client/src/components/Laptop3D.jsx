import { motion } from 'framer-motion';

const codeLines = [
  'const dev = { stack: "MERN" };',
  'await ragPipeline.query(ctx);',
  'io.emit("sync", { ms: 42 });',
  'docker compose up -d',
  'return res.json({ ok: true });',
];

export default function Laptop3D({ style, className = '' }) {
  return (
    <motion.div
      className={`laptop-scene ${className}`}
      style={{ ...style, transformStyle: 'preserve-3d' }}
    >
      <motion.div
        className="laptop-hinge"
        style={{ transformStyle: 'preserve-3d' }}
        animate={{ rotateX: [-22, -18, -22] }}
        transition={{ duration: 6, repeat: Infinity, ease: 'easeInOut' }}
      >
        {/* Screen */}
        <motion.div className="laptop-screen">
          <motion.div className="laptop-bezel">
            <div className="laptop-camera" />
            <div className="laptop-display">
              <div className="laptop-titlebar">
                <span className="laptop-dot bg-red-500/80" />
                <span className="laptop-dot bg-gold/80" />
                <span className="laptop-dot bg-accent-green/80" />
                <span className="ml-2 font-mono text-[8px] text-cream/40">dev-environment</span>
              </div>
              <div className="laptop-code">
                {codeLines.map((line, i) => (
                  <motion.div
                    key={line}
                    className="font-mono text-[9px] leading-relaxed text-gold/70 md:text-[10px]"
                    initial={{ opacity: 0, x: -8 }}
                    animate={{ opacity: 1, x: 0 }}
                    transition={{ delay: 0.8 + i * 0.35, duration: 0.4 }}
                  >
                    <span className="text-accent-green/80">{String(i + 1).padStart(2, '0')}</span>{' '}
                    {line}
                  </motion.div>
                ))}
                <motion.span
                  className="mt-1 inline-block h-3 w-1.5 bg-gold"
                  animate={{ opacity: [1, 0, 1] }}
                  transition={{ duration: 0.9, repeat: Infinity }}
                />
              </div>
            </div>
          </motion.div>
        </motion.div>

        {/* Keyboard base */}
        <div className="laptop-base">
          <motion.div
            className="laptop-trackpad"
            animate={{ boxShadow: ['0 0 0px rgba(201,168,76,0)', '0 0 12px rgba(201,168,76,0.2)', '0 0 0px rgba(201,168,76,0)'] }}
            transition={{ duration: 3, repeat: Infinity }}
          />
          <motion.div
            className="absolute -bottom-3 left-1/2 h-3 w-[88%] -translate-x-1/2 rounded-[50%] bg-black/60 blur-md"
            animate={{ opacity: [0.4, 0.7, 0.4] }}
            transition={{ duration: 4, repeat: Infinity }}
          />
        </div>
      </motion.div>
    </motion.div>
  );
}
