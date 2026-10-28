import { useEffect } from 'react';
import { Bookmark, Trash2 } from 'lucide-react';
import { useSavedPlans } from '../hooks/useSavedPlans';

export function MyPlans() {
  const { savedPlans, loading, refresh, removePlan } = useSavedPlans();
  useEffect(() => { void refresh(); }, [refresh]);
  return <section id="my-plans" className="bg-zinc-950 px-5 py-20"><div className="mx-auto max-w-6xl"><h2 className="mb-8 flex items-center gap-3 font-oswald text-4xl font-bold uppercase"><Bookmark className="text-neon-green" /> My Saved Plans</h2>{loading ? <p className="text-zinc-400">Loading your plans…</p> : savedPlans.length === 0 ? <p className="text-zinc-400">You haven't saved a plan yet. Sign in and save a workout or diet plan to find it here.</p> : <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-3">{savedPlans.map(plan => <article key={plan.id} className="rounded-xl border border-zinc-800 p-5"><p className="text-xs uppercase tracking-widest text-neon-green">{plan.plan_type}</p><h3 className="my-2 font-oswald text-xl">{plan.title}</h3><button onClick={() => void removePlan(plan.id)} className="mt-3 inline-flex items-center gap-2 text-sm text-red-400"><Trash2 size={16} /> Remove</button></article>)}</div>}</div></section>;
}
