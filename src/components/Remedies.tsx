import { HeartPulse, CheckCircle2 } from 'lucide-react';
import { usePlanViews } from '../hooks/usePlanViews';

const remedies = [
  { id: 1, title: 'Recovery & Sleep', intro: 'Support your body between sessions.', tips: ['Keep a consistent sleep and wake time.', 'Allow recovery between hard workouts.', 'Reduce screens and caffeine near bedtime.'] },
  { id: 2, title: 'Everyday Mobility', intro: 'Build comfortable, controlled movement.', tips: ['Warm up before training.', 'Use gentle range-of-motion drills.', 'Stop any movement that causes sharp pain.'] },
  { id: 3, title: 'Stress Reset', intro: 'Make room for mental recovery.', tips: ['Try slow breathing for a few minutes.', 'Take a relaxed walk outdoors.', 'Break large goals into smaller actions.'] },
];

export function Remedies() {
  const { recordView } = usePlanViews();
  return <section id="remedies" className="bg-zinc-950 px-5 py-20"><div className="mx-auto max-w-6xl"><p className="mb-3 text-sm font-bold uppercase tracking-[.25em] text-neon-green">Recovery matters</p><h2 className="mb-10 font-oswald text-4xl font-bold uppercase md:text-6xl">Wellness <span className="text-neon-green">Remedies</span></h2><div className="grid gap-6 md:grid-cols-3">{remedies.map(plan => <article key={plan.id} onMouseEnter={() => void recordView('remedy', plan.id, plan.title)} className="rounded-2xl border border-zinc-800 bg-black p-6 hover:border-neon-green/60"><HeartPulse size={34} className="mb-5 text-neon-green" /><h3 className="font-oswald text-2xl font-bold">{plan.title}</h3><p className="my-3 text-sm text-zinc-400">{plan.intro}</p><ul className="space-y-3">{plan.tips.map(t => <li key={t} className="flex gap-2 text-sm text-zinc-300"><CheckCircle2 size={18} className="shrink-0 text-neon-green" />{t}</li>)}</ul></article>)}</div></div></section>;
}
