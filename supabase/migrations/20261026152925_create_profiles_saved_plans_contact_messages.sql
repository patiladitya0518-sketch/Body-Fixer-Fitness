/*
  # Create profiles, saved plans, and contact messages

  Creates user profiles, saved-plan storage, and contact form messages.
*/
CREATE EXTENSION IF NOT EXISTS pgcrypto;

CREATE TABLE IF NOT EXISTS profiles (
  id uuid PRIMARY KEY REFERENCES auth.users(id) ON DELETE CASCADE,
  display_name text,
  avatar_url text,
  water_goal_ml integer NOT NULL DEFAULT 2500 CHECK (water_goal_ml > 0),
  created_at timestamptz DEFAULT now(),
  updated_at timestamptz DEFAULT now()
);
ALTER TABLE profiles ENABLE ROW LEVEL SECURITY;
GRANT SELECT, INSERT, UPDATE, DELETE ON profiles TO authenticated;
DROP POLICY IF EXISTS "profiles_select_own" ON profiles;
CREATE POLICY "profiles_select_own" ON profiles FOR SELECT TO authenticated USING (auth.uid() = id);
DROP POLICY IF EXISTS "profiles_insert_own" ON profiles;
CREATE POLICY "profiles_insert_own" ON profiles FOR INSERT TO authenticated WITH CHECK (auth.uid() = id);
DROP POLICY IF EXISTS "profiles_update_own" ON profiles;
CREATE POLICY "profiles_update_own" ON profiles FOR UPDATE TO authenticated USING (auth.uid() = id) WITH CHECK (auth.uid() = id);

CREATE TABLE IF NOT EXISTS saved_plans (
  id uuid PRIMARY KEY DEFAULT gen_random_uuid(),
  user_id uuid NOT NULL DEFAULT auth.uid() REFERENCES auth.users(id) ON DELETE CASCADE,
  plan_type text NOT NULL CHECK (plan_type IN ('workout', 'diet', 'remedy')),
  plan_id integer NOT NULL,
  title text NOT NULL,
  created_at timestamptz DEFAULT now(),
  UNIQUE (user_id, plan_type, plan_id)
);
ALTER TABLE saved_plans ENABLE ROW LEVEL SECURITY;
GRANT SELECT, INSERT, UPDATE, DELETE ON saved_plans TO authenticated;
DROP POLICY IF EXISTS "saved_plans_select_own" ON saved_plans;
CREATE POLICY "saved_plans_select_own" ON saved_plans FOR SELECT TO authenticated USING (auth.uid() = user_id);
DROP POLICY IF EXISTS "saved_plans_insert_own" ON saved_plans;
CREATE POLICY "saved_plans_insert_own" ON saved_plans FOR INSERT TO authenticated WITH CHECK (auth.uid() = user_id);
DROP POLICY IF EXISTS "saved_plans_update_own" ON saved_plans;
CREATE POLICY "saved_plans_update_own" ON saved_plans FOR UPDATE TO authenticated USING (auth.uid() = user_id) WITH CHECK (auth.uid() = user_id);
DROP POLICY IF EXISTS "saved_plans_delete_own" ON saved_plans;
CREATE POLICY "saved_plans_delete_own" ON saved_plans FOR DELETE TO authenticated USING (auth.uid() = user_id);

CREATE TABLE IF NOT EXISTS contact_messages (
  id uuid PRIMARY KEY DEFAULT gen_random_uuid(),
  name text NOT NULL,
  email text NOT NULL,
  message text NOT NULL,
  created_at timestamptz DEFAULT now()
);
ALTER TABLE contact_messages ENABLE ROW LEVEL SECURITY;
GRANT INSERT ON contact_messages TO anon, authenticated;
DROP POLICY IF EXISTS "contact_messages_insert" ON contact_messages;
CREATE POLICY "contact_messages_insert" ON contact_messages FOR INSERT TO anon, authenticated WITH CHECK (length(trim(name)) > 0 AND length(trim(email)) > 0 AND length(trim(message)) > 0);
