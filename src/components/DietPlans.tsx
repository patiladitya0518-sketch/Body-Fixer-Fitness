import { Apple, CheckCircle2 } from 'lucide-react';
import { usePlanViews } from '../hooks/usePlanViews';

const plans = [
  { id: 1, title: 'Lean & Clean', goal: 'Fat loss', calories: '1,800–2,000', meals: ['Oats, fruit and Greek yogurt', 'Grilled paneer or chicken with rice', 'Fruit and nuts', 'Dal, vegetables and roti'] },
  { id: 2, title: 'Muscle Builder', goal: 'Muscle gain', calories: '2,400–2,800', meals: ['Eggs or tofu with toast', 'Rice, dal and a protein source', 'Banana smoothie', 'Paneer, chicken or beans with potatoes'] },
  { id: 3, title: 'Balanced Everyday', goal: 'Healthy habits', calories: 'Personalized', meals: ['Whole-grain breakfast', 'Balanced lunch with protein', 'Fruit or nuts', 'Vegetables, whole grains and protein'] },
];

export function DietPlans() {
  const { recordView } = usePlanViews();
  return <section id="diet" className="px-5 py-20">
    <div className="mx-auto max-w-6xl">
      <p className="mb-3 text-sm font-bold uppercase tracking-[0.25em] text-neon-green">Fuel your progress</p><h2 className="mb-10 font-oswald text-4xl font-bold uppercase md:text-6xl">Nutrition <span className="text-neon-green">Plans</span></h2>
      <div className="grid gap-6 md:grid-cols-3">{plans.map(plan => <article key={plan.id} onMouseEnter={() => void recordView('diet', plan.id, plan.title)} className="rounded-2xl border border-zinc-800 bg-zinc-950 p-6 transition hover:border-neon-green/70"><div className="mb-5 flex h-12 w-12 items-center justify-center rounded-xl bg-neon-green/10 text-neon-green"><Apple /></div><p className="text-xs font-bold uppercase tracking-widest text-neon-green">{plan.goal}</p><h3 className="my-2 font-oswald text-2xl font-bold">{plan.title}</h3><p className="mb-5 text-sm text-zinc-400">Daily guideline: {plan.calories} kcal</p><ul className="space-y-3">{plan.meals.map(meal => <li key={meal} className="flex gap-2 text-sm text-zinc-300"><CheckCircle2 className="shrink-0 text-neon-green" size={18} />{meal}</li>)}</ul><p className="mt-5 text-xs text-zinc-500">Adjust portions to your individual needs.</p></article>)}</div>
    </div>
  </section>;
}
