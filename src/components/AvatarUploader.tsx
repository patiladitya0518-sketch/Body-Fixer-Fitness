import { useRef, useState } from 'react';
import { Camera, LoaderCircle } from 'lucide-react';
import { supabase } from '../lib/supabase';
import { useAuth } from '../context/AuthContext';

type Props = { onUploaded?: (url: string) => void };

export function AvatarUploader({ onUploaded }: Props) {
  const input = useRef<HTMLInputElement>(null);
  const { user } = useAuth();
  const [busy, setBusy] = useState(false);
  const [error, setError] = useState('');

  async function upload(file?: File) {
    if (!file || !user) return;
    if (!file.type.startsWith('image/')) { setError('Choose an image file.'); return; }
    if (file.size > 5 * 1024 * 1024) { setError('Image must be 5 MB or smaller.'); return; }
    setBusy(true); setError('');
    const ext = file.name.split('.').pop() || 'jpg';
    const path = `${user.id}/avatar-${Date.now()}.${ext}`;
    const { error: uploadError } = await supabase.storage.from('avatars').upload(path, file, { upsert: true });
    if (uploadError) setError(uploadError.message);
    else {
      const { data } = supabase.storage.from('avatars').getPublicUrl(path);
      await supabase.from('profiles').update({ avatar_url: data.publicUrl }).eq('id', user.id);
      onUploaded?.(data.publicUrl);
    }
    setBusy(false);
  }

  return <div>
    <input ref={input} type="file" accept="image/*" className="hidden" onChange={e => upload(e.target.files?.[0])} />
    <button onClick={() => input.current?.click()} disabled={busy || !user} className="inline-flex items-center gap-2 rounded-lg border border-neon-green px-4 py-2 text-neon-green disabled:opacity-50">
      {busy ? <LoaderCircle size={18} className="animate-spin" /> : <Camera size={18} />} Upload avatar
    </button>
    {error && <p className="mt-2 text-sm text-red-400">{error}</p>}
  </div>;
}
