import { useCallback, useEffect, useState } from 'react';
import { supabase } from '../lib/supabase';
import { useAuth } from '../context/AuthContext';

export type SavedPlan = {
  id: string;
  plan_type: 'workout' | 'diet' | 'remedy';
  plan_id: number;
  title: string;
  created_at: string;
};

export function useSavedPlans() {
  const { user } = useAuth();
  const [savedPlans, setSavedPlans] = useState<SavedPlan[]>([]);
  const [loading, setLoading] = useState(false);

  const refresh = useCallback(async () => {
    if (!user) {
      setSavedPlans([]);
      return;
    }
    setLoading(true);
    const { data } = await supabase.from('saved_plans').select('*').order('created_at', { ascending: false });
    setSavedPlans((data ?? []) as SavedPlan[]);
    setLoading(false);
  }, [user]);

  useEffect(() => {
    refresh();
  }, [refresh]);

  const savePlan = useCallback(async (plan: Omit<SavedPlan, 'id' | 'created_at'>) => {
    if (!user) return;
    const { error } = await supabase.from('saved_plans').upsert({
      user_id: user.id, ...plan,
    }, { onConflict: 'user_id,plan_type,plan_id' });
    if (!error) await refresh();
  }, [user, refresh]);

  const removePlan = useCallback(async (id: string) => {
    if (!user) return;
    await supabase.from('saved_plans').delete().eq('id', id);
    await refresh();
  }, [user, refresh]);

  return { savedPlans, loading, refresh, savePlan, removePlan };
}
