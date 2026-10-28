import { useState } from 'react';
import { Bookmark, Check } from 'lucide-react';
import { useSavedPlans, type SavedPlan } from '../hooks/useSavedPlans';
import { useAuth } from '../context/AuthContext';

type Props = { plan: Pick<SavedPlan, 'plan_type' | 'plan_id' | 'title'> };
export function SaveButton({ plan }: Props) {
  const { user } = useAuth();
  const { savePlan } = useSavedPlans();
  const [saved, setSaved] = useState(false);
  const [message, setMessage] = useState('');
  async function click() {
    if (!user) { setMessage('Sign in to save a plan.'); return; }
    await savePlan(plan); setSaved(true); setMessage('Plan saved.');
  }
  return <div><button onClick={() => void click()} className="inline-flex items-center gap-2 rounded-lg border border-neon-green/60 px-3 py-2 text-sm text-neon-green">{saved ? <Check size={16} /> : <Bookmark size={16} />}{saved ? 'Saved' : 'Save plan'}</button>{message && <p className="mt-1 text-xs text-zinc-400">{message}</p>}</div>;
}
