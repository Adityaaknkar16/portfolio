import { motion } from 'framer-motion';

export default function Divider() {
  return (
    <div className="flex items-center justify-center py-10">
      <motion.div
        className="h-2 w-2 rotate-45 bg-gold"
        initial={{ scale: 0, opacity: 0 }}
        whileInView={{ scale: 1, opacity: 1 }}
        viewport={{ once: true }}
        transition={{ duration: 0.5, ease: [0.16, 1, 0.3, 1] }}
      />
    </div>
  );
}
