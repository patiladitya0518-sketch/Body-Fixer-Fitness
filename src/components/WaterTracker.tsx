import { useEffect, useMemo, useState } from 'react';
import { Droplets, Plus, Minus, Target, LoaderCircle } from 'lucide-react';
import { supabase } from '../lib/supabase';
import { useAuth } from '../context/AuthContext';

type WaterRow = { id: string; amount_ml: number; logged_at: string };
const quickAmounts = [150, 250, 350, 500];

export function WaterTracker() {
  const { user } = useAuth();
  const [rows, setRows] = useState<WaterRow[]>([]);
  const [goal, setGoal] = useState(2500);
  const [busy, setBusy] = useState(false);
  const [custom, setCustom] = useState(250);
  const today = new Date().toISOString().slice(0, 10);
  const total = useMemo(() => rows.filter(r => r.logged_at === today).reduce((sum, r) => sum + r.amount_ml, 0), [rows, today]);

  async function load() {
    if (!user) { setRows([]); return; }
    const [{ data }, { data: profile }] = await Promise.all([
      supabase.from('water_intake').select('id,amount_ml,logged_at').eq('user_id', user.id).gte('logged_at', today).order('created_at', { ascending: false }),
      supabase.from('profiles').select('water_goal_ml').eq('id', user.id).maybeSingle(),
    ]);
    setRows((data ?? []) as WaterRow[]);
    if (profile?.water_goal_ml) setGoal(profile.water_goal_ml);
  }
  useEffect(() => { void load(); }, [user, today]);

  async function add(amount: number) {
    if (!user || amount <= 0) return;
    setBusy(true);
    const { error } = await supabase.from('water_intake').insert({ user_id: user.id, amount_ml: amount, logged_at: today });
    if (!error) await load();
    setBusy(false);
  }
  async function setDailyGoal(value: number) {
    if (!user || value <= 0) return;
    setGoal(value);
    await supabase.from('profiles').update({ water_goal_ml: value }).eq('id', user.id);
  }

  const percent = Math.min(100, Math.round(total / goal * 100));
  return <section id="water" className="px-5 py-20"><div className="mx-auto max-w-5xl"><p className="mb-3 text-sm font-bold uppercase tracking-[.25em] text-neon-green">Build daily consistency</p><h2 className="mb-10 font-oswald text-4xl font-bold uppercase md:text-6xl">Water <span className="text-neon-green">Tracker</span></h2><div className="grid gap-8 rounded-2xl border border-zinc-800 bg-zinc-950 p-6 md:grid-cols-2 md:p-10"><div className="flex flex-col items-center justify-center"><div className="relative flex h-52 w-52 items-center justify-center rounded-full border-[10px] border-zinc-800" style={{ background: `conic-gradient(#00ff41 ${percent}%, #27272a 0)` }}><div className="flex h-40 w-40 flex-col items-center justify-center rounded-full bg-zinc-950"><Droplets className="text-neon-green" size={28} /><p className="font-oswald text-3xl font-bold">{(total / 1000).toFixed(2)} L</p><p className="text-xs text-zinc-400">of {(goal / 1000).toFixed(2)} L</p></div></div><p className="mt-4 text-sm text-zinc-400">{percent}% of today's goal</p></div><div><h3 className="mb-4 flex items-center gap-2 font-oswald text-2xl"><Target className="text-neon-green" /> Daily goal</h3><div className="flex items-center gap-2"><input type="number" min="250" step="250" value={goal} onChange={e => setGoal(+e.target.value)} className="w-full rounded-lg border border-zinc-700 bg-black p-3" /><button onClick={() => void setDailyGoal(goal)} className="rounded-lg bg-neon-green px-4 py-3 font-bold text-black">Save</button></div><h3 className="mb-3 mt-7 font-oswald text-xl">Add water</h3><div className="grid grid-cols-2 gap-2">{quickAmounts.map(a => <button key={a} disabled={!user || busy} onClick={() => void add(a)} className="rounded-lg border border-zinc-700 p-3 hover:border-neon-green disabled:opacity-50"><Plus size={16} className="mr-1 inline text-neon-green" />{a} ml</button>)}</div><form className="mt-3 flex gap-2" onSubmit={e => { e.preventDefault(); void add(custom); }}><input type="number" min="1" value={custom} onChange={e => setCustom(+e.target.value)} className="min-w-0 flex-1 rounded-lg border border-zinc-700 bg-black p-3" /><button disabled={!user || busy} className="rounded-lg bg-neon-green px-4 font-bold text-black disabled:opacity-50">{busy ? <LoaderCircle className="animate-spin" /> : <Plus />}</button></form>{!user && <p className="mt-4 text-xs text-zinc-500">Sign in to save water intake between visits.</p>}</div></div></div></section>;
}
