import { useState } from 'react';
import { Menu, X, Dumbbell, LogIn, LogOut } from 'lucide-react';
import { useAuth } from '../context/AuthContext';

type Props = { onLogin: () => void };
const links = [['Home', '#home'], ['Workouts', '#workouts'], ['Diet', '#diet'], ['Remedies', '#remedies'], ['Calculator', '#calculator'], ['Water', '#water'], ['Contact', '#contact']];

export function Navigation({ onLogin }: Props) {
  const [open, setOpen] = useState(false);
  const { user, signOut } = useAuth();
  return <header className="sticky top-0 z-50 border-b border-white/10 bg-black/85 backdrop-blur-xl">
    <nav className="mx-auto flex max-w-7xl items-center justify-between px-5 py-4">
      <a href="#home" className="flex items-center gap-2 font-oswald text-2xl font-bold uppercase"><span className="text-neon-green"><Dumbbell /></span> Body<span className="text-neon-green">Fixer</span></a>
      <div className="hidden items-center gap-6 lg:flex">{links.map(([label, href]) => <a key={href} href={href} className="text-xs font-bold uppercase tracking-wider text-zinc-300 transition hover:text-neon-green">{label}</a>)}</div>
      <div className="hidden lg:block">{user ? <button onClick={() => void signOut()} className="inline-flex items-center gap-2 rounded-lg border border-zinc-700 px-4 py-2 text-sm"><LogOut size={16} /> Sign out</button> : <button onClick={onLogin} className="inline-flex items-center gap-2 rounded-lg bg-neon-green px-4 py-2 text-sm font-bold text-black"><LogIn size={16} /> Sign in</button>}</div>
      <button aria-label="Toggle menu" onClick={() => setOpen(!open)} className="lg:hidden">{open ? <X /> : <Menu />}</button>
    </nav>
    {open && <div className="border-t border-zinc-800 bg-black p-5 lg:hidden">{links.map(([label, href]) => <a key={href} href={href} onClick={() => setOpen(false)} className="block py-3 text-sm uppercase text-zinc-200">{label}</a>)}{user ? <button onClick={() => void signOut()} className="py-3 text-sm text-neon-green">Sign out</button> : <button onClick={onLogin} className="py-3 text-sm text-neon-green">Sign in</button>}</div>}
  </header>;
}
