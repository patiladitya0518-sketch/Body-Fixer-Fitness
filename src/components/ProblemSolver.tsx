import { useMemo, useState } from 'react';
import { Search, Sparkles } from 'lucide-react';

const suggestions = [
  { issue: 'low-energy', title: 'Low energy', tips: ['Aim for a consistent sleep schedule.', 'Include a mix of carbohydrates, protein and healthy fats.', 'Start with a short walk and build up gradually.'] },
  { issue: 'soreness', title: 'Muscle soreness', tips: ['Take a rest day or choose gentle movement.', 'Stay hydrated and eat balanced meals.', 'Seek medical advice for severe or persistent pain.'] },
  { issue: 'weight-loss', title: 'Weight management', tips: ['Choose sustainable habits instead of crash diets.', 'Combine regular movement with balanced meals.', 'Track trends over time rather than daily changes.'] },
  { issue: 'strength', title: 'Building strength', tips: ['Practice good technique before increasing load.', 'Train major muscle groups consistently.', 'Allow recovery between hard sessions.'] },
];

export function ProblemSolver() {
  const [query, setQuery] = useState('');
  const [selected, setSelected] = useState('low-energy');
  const result = useMemo(() => suggestions.find(x => x.issue === selected), [selected]);
  const search = () => {
    const q = query.toLowerCase();
    const found = suggestions.find(x => q.includes(x.title.toLowerCase().split(' ')[0]) || q.includes(x.issue));
    if (found) setSelected(found.issue);
  };
  return <section className="px-5 py-16"><div className="mx-auto max-w-5xl rounded-2xl border border-neon-green/30 bg-zinc-950 p-6 md:p-10"><div className="flex items-center gap-3 text-neon-green"><Sparkles /><p className="text-xs font-bold uppercase tracking-[.25em]">Find a starting point</p></div><h2 className="my-4 font-oswald text-3xl font-bold uppercase md:text-5xl">Fitness <span className="text-neon-green">Problem Solver</span></h2><div className="flex gap-2"><input value={query} onChange={e => setQuery(e.target.value)} onKeyDown={e => e.key === 'Enter' && search()} placeholder="e.g. soreness, energy, strength" className="min-w-0 flex-1 rounded-lg border border-zinc-700 bg-black px-4 py-3" /><button onClick={search} className="rounded-lg bg-neon-green px-4 text-black"><Search /></button></div><div className="mt-4 flex flex-wrap gap-2">{suggestions.map(s => <button key={s.issue} onClick={() => setSelected(s.issue)} className={`rounded-full border px-3 py-2 text-xs ${selected === s.issue ? 'border-neon-green text-neon-green' : 'border-zinc-700 text-zinc-400'}`}>{s.title}</button>)}</div>{result && <div className="mt-6 rounded-xl bg-black p-5"><h3 className="font-oswald text-2xl">{result.title}</h3><ul className="mt-3 list-inside list-disc space-y-2 text-sm leading-6 text-zinc-300">{result.tips.map(t => <li key={t}>{t}</li>)}</ul><p className="mt-4 text-xs text-zinc-500">General wellness information only, not a medical diagnosis.</p></div>}</div></section>;
}
