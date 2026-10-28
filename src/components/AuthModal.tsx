import { useState } from 'react';
import { X, Mail, Lock, LoaderCircle } from 'lucide-react';
import { supabase } from '../lib/supabase';

type Props = { isOpen: boolean; onClose: () => void };

export function AuthModal({ isOpen, onClose }: Props) {
  const [mode, setMode] = useState<'signin' | 'signup'>('signin');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [busy, setBusy] = useState(false);
  const [message, setMessage] = useState('');

  if (!isOpen) return null;

  async function submit(e: React.FormEvent) {
    e.preventDefault();
    setBusy(true);
    setMessage('');
    const result = mode === 'signin'
      ? await supabase.auth.signInWithPassword({ email, password })
      : await supabase.auth.signUp({ email, password });
    setBusy(false);
    setMessage(result.error?.message ?? (mode === 'signin' ? 'Signed in successfully.' : 'Check your email to confirm your account.'));
    if (!result.error && mode === 'signin') onClose();
  }

  return (
    <div className="fixed inset-0 z-[100] flex items-center justify-center bg-black/80 p-4 backdrop-blur-sm">
      <div className="relative w-full max-w-md rounded-2xl border border-neon-green/40 bg-zinc-950 p-8">
        <button aria-label="Close" onClick={onClose} className="absolute right-4 top-4 text-zinc-400 hover:text-white"><X /></button>
        <h2 className="mb-2 font-oswald text-3xl font-bold uppercase text-neon-green">{mode === 'signin' ? 'Welcome Back' : 'Create Account'}</h2>
        <p className="mb-6 text-sm text-zinc-400">Save plans and track your fitness progress.</p>
        <form onSubmit={submit} className="space-y-4">
          <label className="block text-sm">Email
            <span className="mt-1 flex items-center gap-2 rounded-lg border border-zinc-700 px-3"><Mail size={18} className="text-zinc-400" /><input className="w-full bg-transparent py-3 outline-none" type="email" value={email} onChange={e => setEmail(e.target.value)} required autoComplete="email" /></span>
          </label>
          <label className="block text-sm">Password
            <span className="mt-1 flex items-center gap-2 rounded-lg border border-zinc-700 px-3"><Lock size={18} className="text-zinc-400" /><input className="w-full bg-transparent py-3 outline-none" type="password" value={password} onChange={e => setPassword(e.target.value)} required minLength={6} autoComplete={mode === 'signin' ? 'current-password' : 'new-password'} /></span>
          </label>
          <button disabled={busy} className="flex w-full items-center justify-center gap-2 rounded-lg bg-neon-green py-3 font-bold text-black disabled:opacity-60">{busy && <LoaderCircle className="animate-spin" size={18} />}{mode === 'signin' ? 'Sign In' : 'Sign Up'}</button>
        </form>
        {message && <p role="status" className="mt-4 text-sm text-zinc-300">{message}</p>}
        <button className="mt-5 text-sm text-neon-green underline" onClick={() => { setMode(mode === 'signin' ? 'signup' : 'signin'); setMessage(''); }}>{mode === 'signin' ? 'Need an account? Sign up' : 'Already registered? Sign in'}</button>
      </div>
    </div>
  );
}
