import { useState } from 'react';
import { Dumbbell, Clock, Flame, ChevronDown } from 'lucide-react';
import { SaveButton } from './SaveButton';
import { usePlanViews } from '../hooks/usePlanViews';

const workouts = [
  { id: 1, title: 'Full Body Starter', level: 'Beginner', duration: '25 min', focus: 'Full body', steps: ['Bodyweight squats — 3 × 10', 'Wall or knee push-ups — 3 × 8', 'Glute bridges — 3 × 12', 'March in place — 3 × 45 sec'] },
  { id: 2, title: 'Strength Builder', level: 'Intermediate', duration: '40 min', focus: 'Strength', steps: ['Warm up for 5 minutes', 'Squat variation — 3 × 8–12', 'Push movement — 3 × 8–12', 'Row movement — 3 × 8–12', 'Cool down gently'] },
  { id: 3, title: 'Quick Cardio', level: 'All levels', duration: '20 min', focus: 'Cardio', steps: ['Warm up for 3 minutes', 'Alternate brisk movement with easy recovery', 'Keep a pace that allows controlled breathing', 'Cool down for 3 minutes'] },
];

export function Workouts() {
  const [expanded, setExpanded] = useState<number | null>(1);
  const { recordView } = usePlanViews();
  return <section id="workouts" className="bg-zinc-950 px-5 py-20"><div className="mx-auto max-w-6xl"><p className="mb-3 text-sm font-bold uppercase tracking-[.25em] text-neon-green">Put in the work</p><h2 className="mb-10 font-oswald text-4xl font-bold uppercase md:text-6xl">Workout <span className="text-neon-green">Programs</span></h2><div className="grid gap-5 md:grid-cols-3">{workouts.map(plan => <article key={plan.id} className="rounded-2xl border border-zinc-800 bg-black p-6 transition hover:border-neon-green/60" onMouseEnter={() => void recordView('workout', plan.id, plan.title)}><div className="mb-5 flex items-center justify-between"><span className="rounded-full bg-neon-green/10 px-3 py-1 text-xs font-bold text-neon-green">{plan.level}</span><Dumbbell className="text-neon-green" /></div><h3 className="font-oswald text-2xl font-bold">{plan.title}</h3><div className="my-4 flex gap-4 text-xs text-zinc-400"><span><Clock className="mr-1 inline" size={14} />{plan.duration}</span><span><Flame className="mr-1 inline" size={14} />{plan.focus}</span></div><button onClick={() => setExpanded(expanded === plan.id ? null : plan.id)} className="flex w-full items-center justify-between border-t border-zinc-800 py-4 text-sm font-bold">Workout details <ChevronDown size={18} className={expanded === plan.id ? 'rotate-180' : ''} /></button>{expanded === plan.id && <ul className="space-y-2 pb-4 text-sm text-zinc-300">{plan.steps.map(step => <li key={step}>• {step}</li>)}</ul>}<SaveButton plan={{ plan_type: 'workout', plan_id: plan.id, title: plan.title }} /></article>)}</div><p className="mt-6 text-xs text-zinc-500">Choose movements appropriate for your level. Stop if you experience sharp pain, dizziness, or unusual shortness of breath.</p></div></section>;
}
