/*
  # Add avatar, water-intake tracking, and avatar storage policies
*/
ALTER TABLE profiles ADD COLUMN IF NOT EXISTS avatar_url text;

CREATE TABLE IF NOT EXISTS water_intake (
  id uuid PRIMARY KEY DEFAULT gen_random_uuid(),
  user_id uuid NOT NULL DEFAULT auth.uid() REFERENCES auth.users(id) ON DELETE CASCADE,
  amount_ml integer NOT NULL CHECK (amount_ml > 0),
  logged_at date NOT NULL DEFAULT CURRENT_DATE,
  created_at timestamptz DEFAULT now()
);
ALTER TABLE water_intake ENABLE ROW LEVEL SECURITY;
GRANT SELECT, INSERT, UPDATE, DELETE ON water_intake TO authenticated;
DROP POLICY IF EXISTS "select_own_water_intake" ON water_intake;
CREATE POLICY "select_own_water_intake" ON water_intake FOR SELECT TO authenticated USING (auth.uid() = user_id);
DROP POLICY IF EXISTS "insert_own_water_intake" ON water_intake;
CREATE POLICY "insert_own_water_intake" ON water_intake FOR INSERT TO authenticated WITH CHECK (auth.uid() = user_id);
DROP POLICY IF EXISTS "update_own_water_intake" ON water_intake;
CREATE POLICY "update_own_water_intake" ON water_intake FOR UPDATE TO authenticated USING (auth.uid() = user_id) WITH CHECK (auth.uid() = user_id);
DROP POLICY IF EXISTS "delete_own_water_intake" ON water_intake;
CREATE POLICY "delete_own_water_intake" ON water_intake FOR DELETE TO authenticated USING (auth.uid() = user_id);

INSERT INTO storage.buckets (id, name, public, file_size_limit, allowed_mime_types)
VALUES ('avatars', 'avatars', true, 5242880, ARRAY['image/jpeg', 'image/png', 'image/webp', 'image/gif'])
ON CONFLICT (id) DO NOTHING;
DROP POLICY IF EXISTS "public_read_avatars" ON storage.objects;
CREATE POLICY "public_read_avatars" ON storage.objects FOR SELECT TO anon, authenticated USING (bucket_id = 'avatars');
DROP POLICY IF EXISTS "auth_insert_own_avatars" ON storage.objects;
CREATE POLICY "auth_insert_own_avatars" ON storage.objects FOR INSERT TO authenticated WITH CHECK (bucket_id = 'avatars' AND (storage.foldername(name))[1] = auth.uid()::text);
DROP POLICY IF EXISTS "auth_update_own_avatars" ON storage.objects;
CREATE POLICY "auth_update_own_avatars" ON storage.objects FOR UPDATE TO authenticated USING (bucket_id = 'avatars' AND (storage.foldername(name))[1] = auth.uid()::text) WITH CHECK (bucket_id = 'avatars' AND (storage.foldername(name))[1] = auth.uid()::text);
DROP POLICY IF EXISTS "auth_delete_own_avatars" ON storage.objects;
CREATE POLICY "auth_delete_own_avatars" ON storage.objects FOR DELETE TO authenticated USING (bucket_id = 'avatars' AND (storage.foldername(name))[1] = auth.uid()::text);
