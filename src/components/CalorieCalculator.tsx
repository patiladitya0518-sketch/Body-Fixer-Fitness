import { useMemo, useState } from 'react';
import { Calculator, Flame } from 'lucide-react';

export function CalorieCalculator() {
  const [age, setAge] = useState(25);
  const [weight, setWeight] = useState(70);
  const [height, setHeight] = useState(170);
  const [sex, setSex] = useState<'male' | 'female'>('male');
  const [activity, setActivity] = useState(1.375);
  const [goal, setGoal] = useState<'lose' | 'maintain' | 'gain'>('maintain');
  const calories = useMemo(() => {
    const bmr = 10 * weight + 6.25 * height - 5 * age + (sex === 'male' ? 5 : -161);
    const maintenance = bmr * activity;
    return Math.round(maintenance + (goal === 'lose' ? -400 : goal === 'gain' ? 300 : 0));
  }, [age, weight, height, sex, activity, goal]);

  return <section id="calculator" className="bg-zinc-950 px-5 py-20">
    <div className="mx-auto max-w-5xl">
      <p className="mb-3 text-sm font-bold uppercase tracking-[0.25em] text-neon-green">Know your numbers</p>
      <h2 className="mb-10 font-oswald text-4xl font-bold uppercase md:text-6xl">Calorie <span className="text-neon-green">Calculator</span></h2>
      <div className="grid gap-8 rounded-2xl border border-zinc-800 bg-black p-6 md:grid-cols-2 md:p-10">
        <div className="grid grid-cols-2 gap-4">
          <label className="text-sm text-zinc-400">Age
            <input type="number" min="15" max="100" value={age} onChange={e => setAge(+e.target.value)} className="mt-2 w-full rounded-lg border border-zinc-700 bg-zinc-900 p-3 text-white" />
          </label>
          <label className="text-sm text-zinc-400">Sex
            <select value={sex} onChange={e => setSex(e.target.value as 'male' | 'female')} className="mt-2 w-full rounded-lg border border-zinc-700 bg-zinc-900 p-3 text-white"><option value="male">Male</option><option value="female">Female</option></select>
          </label>
          <label className="text-sm text-zinc-400">Weight (kg)
            <input type="number" min="25" max="300" value={weight} onChange={e => setWeight(+e.target.value)} className="mt-2 w-full rounded-lg border border-zinc-700 bg-zinc-900 p-3 text-white" />
          </label>
          <label className="text-sm text-zinc-400">Height (cm)
            <input type="number" min="100" max="250" value={height} onChange={e => setHeight(+e.target.value)} className="mt-2 w-full rounded-lg border border-zinc-700 bg-zinc-900 p-3 text-white" />
          </label>
          <label className="col-span-2 text-sm text-zinc-400">Activity level
            <select value={activity} onChange={e => setActivity(+e.target.value)} className="mt-2 w-full rounded-lg border border-zinc-700 bg-zinc-900 p-3 text-white">
              <option value={1.2}>Sedentary</option><option value={1.375}>Lightly active</option><option value={1.55}>Moderately active</option><option value={1.725}>Very active</option><option value={1.9}>Extra active</option>
            </select>
          </label>
          <label className="col-span-2 text-sm text-zinc-400">Goal
            <select value={goal} onChange={e => setGoal(e.target.value as typeof goal)} className="mt-2 w-full rounded-lg border border-zinc-700 bg-zinc-900 p-3 text-white"><option value="lose">Lose weight</option><option value="maintain">Maintain weight</option><option value="gain">Gain weight</option></select>
          </label>
        </div>
        <div className="flex flex-col items-center justify-center rounded-xl bg-neon-green p-8 text-center text-black">
          <Calculator size={42} />
          <p className="mt-4 text-sm font-bold uppercase tracking-widest">Estimated daily target</p>
          <p className="my-2 font-oswald text-6xl font-bold">{calories.toLocaleString()}</p>
          <p className="font-semibold">calories / day</p>
          <p className="mt-4 text-xs">Estimate only; individual needs vary.</p>
          <div className="mt-6 flex items-center gap-2 text-sm"><Flame size={18} /> Review progress and adjust gradually.</div>
        </div>
      </div>
    </div>
  </section>;
}
