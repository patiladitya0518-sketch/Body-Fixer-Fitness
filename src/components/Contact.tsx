import { useState } from 'react';
import { Mail, Send, LoaderCircle } from 'lucide-react';
import { supabase } from '../lib/supabase';

export function Contact() {
  const [name, setName] = useState('');
  const [email, setEmail] = useState('');
  const [message, setMessage] = useState('');
  const [status, setStatus] = useState('');
  const [busy, setBusy] = useState(false);

  async function submit(e: React.FormEvent) {
    e.preventDefault(); setBusy(true); setStatus('');
    const { error } = await supabase.from('contact_messages').insert({ name, email, message });
    setBusy(false);
    if (error) setStatus('Message could not be saved. Check your Supabase setup.');
    else { setStatus('Thanks! Your message was submitted.'); setName(''); setEmail(''); setMessage(''); }
  }

  return <section id="contact" className="px-5 py-20">
    <div className="mx-auto grid max-w-6xl gap-10 md:grid-cols-2">
      <div><p className="mb-3 text-sm font-bold uppercase tracking-[0.25em] text-neon-green">Connect with us</p><h2 className="font-oswald text-4xl font-bold uppercase md:text-6xl">Let's <span className="text-neon-green">Talk</span></h2><p className="mt-5 max-w-lg leading-7 text-zinc-400">Questions, feedback, or ideas? Send us a message and keep building healthy habits.</p><p className="mt-8 flex items-center gap-3 text-zinc-300"><Mail className="text-neon-green" /> Contact form messages are saved to the project database.</p></div>
      <form onSubmit={submit} className="space-y-4 rounded-2xl border border-zinc-800 bg-zinc-950 p-6 md:p-8">
        <label className="block text-sm text-zinc-400">Your name<input required value={name} onChange={e => setName(e.target.value)} className="mt-2 w-full rounded-lg border border-zinc-700 bg-black p-3 text-white" /></label>
        <label className="block text-sm text-zinc-400">Email<input required type="email" value={email} onChange={e => setEmail(e.target.value)} className="mt-2 w-full rounded-lg border border-zinc-700 bg-black p-3 text-white" /></label>
        <label className="block text-sm text-zinc-400">Message<textarea required rows={5} value={message} onChange={e => setMessage(e.target.value)} className="mt-2 w-full rounded-lg border border-zinc-700 bg-black p-3 text-white" /></label>
        <button disabled={busy} className="flex w-full items-center justify-center gap-2 rounded-lg bg-neon-green py-3 font-bold text-black disabled:opacity-50">{busy ? <LoaderCircle className="animate-spin" /> : <Send size={18} />} Send message</button>
        {status && <p role="status" className="text-sm text-zinc-300">{status}</p>}
      </form>
    </div>
  </section>;
}
