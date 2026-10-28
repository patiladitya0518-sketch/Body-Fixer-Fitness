import { motion } from 'framer-motion';
import { ArrowDown, ArrowRight, Play, Dumbbell } from 'lucide-react';
import { AnimatedAvatar } from './AnimatedAvatar';
import { FallingDumbbells } from './FallingDumbbells';

export function Hero() {
  return <section id="home" className="relative isolate flex min-h-[90vh] items-center overflow-hidden px-5 py-24">
    <div className="absolute inset-0 -z-10 bg-[radial-gradient(ellipse_at_70%_40%,rgba(0,255,65,0.12),transparent_55%)]" /><FallingDumbbells />
    <div className="mx-auto grid w-full max-w-6xl items-center gap-12 md:grid-cols-[1.2fr_.8fr]">
      <div>
        <motion.p initial={{ opacity: 0, y: 18 }} animate={{ opacity: 1, y: 0 }} className="mb-5 flex items-center gap-2 text-xs font-bold uppercase tracking-[0.3em] text-neon-green"><Dumbbell size={18} /> Your next level starts now</motion.p>
        <motion.h1 initial={{ opacity: 0, y: 24 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: .1 }} className="font-oswald text-5xl font-bold uppercase leading-[.98] sm:text-7xl lg:text-8xl">Fix Your Body.<br /><span className="text-neon-green">Fix Your Life.</span></motion.h1>
        <p className="mt-7 max-w-xl leading-7 text-zinc-400">Build a stronger routine with workout ideas, practical nutrition plans, daily hydration tracking, and fitness tools—all in one place.</p>
        <div className="mt-8 flex flex-wrap gap-4"><a href="#workouts" className="inline-flex items-center gap-2 rounded-lg bg-neon-green px-6 py-3 font-bold text-black">Explore workouts <ArrowRight size={18} /></a><a href="#diet" className="inline-flex items-center gap-2 rounded-lg border border-zinc-700 px-6 py-3 font-bold"><Play size={18} /> Nutrition plans</a></div>
        <a href="#calculator" className="mt-10 inline-flex items-center gap-2 text-sm text-zinc-400 hover:text-neon-green">Calculate your daily target <ArrowDown size={16} /></a>
      </div>
      <div className="flex flex-col items-center gap-6"><AnimatedAvatar /><div className="max-w-sm text-center"><p className="font-oswald text-2xl font-bold uppercase">Train with purpose</p><p className="mt-2 text-sm leading-6 text-zinc-400">Small, consistent actions beat extreme routines. Start where you are and progress safely.</p></div></div>
    </div>
  </section>;
}
