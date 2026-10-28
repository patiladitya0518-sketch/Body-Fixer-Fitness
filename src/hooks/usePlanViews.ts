import { useCallback } from 'react';
import { supabase } from '../lib/supabase';
import { useAuth } from '../context/AuthContext';

export function usePlanViews() {
  const { user } = useAuth();

  const recordView = useCallback(async (planType: 'workout' | 'diet' | 'remedy', planId: number, title: string) => {
    if (!user) return;
    await supabase.from('plan_views').upsert({
      user_id: user.id,
      plan_type: planType,
      plan_id: planId,
      title,
      viewed_at: new Date().toISOString(),
    }, { onConflict: 'user_id,plan_type,plan_id' });
  }, [user]);

  return { recordView };
}
