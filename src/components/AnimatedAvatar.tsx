import { motion } from 'framer-motion';
import { Dumbbell } from 'lucide-react';

export function AnimatedAvatar() {
  return (
    <motion.div
      animate={{ y: [0, -10, 0], rotate: [0, 3, -3, 0] }}
      transition={{ duration: 4, repeat: Infinity, ease: 'easeInOut' }}
      className="flex h-28 w-28 items-center justify-center rounded-full border-2 border-neon-green bg-black/70 text-neon-green shadow-[0_0_35px_rgba(0,255,65,0.25)]"
      aria-label="Animated fitness avatar"
    >
      <Dumbbell size={54} />
    </motion.div>
  );
}
