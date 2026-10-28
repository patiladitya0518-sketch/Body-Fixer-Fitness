/*
  # Add water goal and viewed-plan history
*/
ALTER TABLE profiles ADD COLUMN IF NOT EXISTS water_goal_ml integer NOT NULL DEFAULT 2500 CHECK (water_goal_ml > 0);
CREATE TABLE IF NOT EXISTS plan_views (
  id uuid PRIMARY KEY DEFAULT gen_random_uuid(),
  user_id uuid NOT NULL DEFAULT auth.uid() REFERENCES auth.users(id) ON DELETE CASCADE,
  plan_type text NOT NULL CHECK (plan_type IN ('workout', 'diet', 'remedy')),
  plan_id integer NOT NULL,
  title text NOT NULL,
  viewed_at timestamptz DEFAULT now(),
  UNIQUE (user_id, plan_type, plan_id)
);
ALTER TABLE plan_views ENABLE ROW LEVEL SECURITY;
GRANT SELECT, INSERT, UPDATE, DELETE ON plan_views TO authenticated;
DROP POLICY IF EXISTS "select_own_plan_views" ON plan_views;
CREATE POLICY "select_own_plan_views" ON plan_views FOR SELECT TO authenticated USING (auth.uid() = user_id);
DROP POLICY IF EXISTS "insert_own_plan_views" ON plan_views;
CREATE POLICY "insert_own_plan_views" ON plan_views FOR INSERT TO authenticated WITH CHECK (auth.uid() = user_id);
DROP POLICY IF EXISTS "update_own_plan_views" ON plan_views;
CREATE POLICY "update_own_plan_views" ON plan_views FOR UPDATE TO authenticated USING (auth.uid() = user_id) WITH CHECK (auth.uid() = user_id);
DROP POLICY IF EXISTS "delete_own_plan_views" ON plan_views;
CREATE POLICY "delete_own_plan_views" ON plan_views FOR DELETE TO authenticated USING (auth.uid() = user_id);
