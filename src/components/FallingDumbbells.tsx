import { motion } from 'framer-motion';
import { Dumbbell } from 'lucide-react';

export function FallingDumbbells() {
  return <div aria-hidden="true" className="pointer-events-none absolute inset-0 overflow-hidden">{Array.from({ length: 8 }, (_, i) => <motion.div key={i} initial={{ y: -100, opacity: 0 }} animate={{ y: [ -100, 500 ], opacity: [0, .55, 0], rotate: [0, 180] }} transition={{ duration: 5 + i % 4, delay: i * .4, repeat: Infinity, ease: 'linear' }} style={{ left: `${8 + i * 12}%` }} className="absolute top-0 text-neon-green/30"><Dumbbell size={22 + i % 3 * 8} /></motion.div>)}</div>;
}
