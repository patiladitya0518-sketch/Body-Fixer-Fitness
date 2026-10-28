import { useState } from 'react';
import { Bot, Send, UserRound, Sparkles } from 'lucide-react';
import { ProblemSolver } from './ProblemSolver';

type Message = { role: 'user' | 'assistant'; text: string };
function respond(input: string) {
  const q = input.toLowerCase();
  if (/diet|food|eat|meal|nutrition/.test(q)) return 'Build meals around vegetables or fruit, a protein source, whole grains, and healthy fats. Portions depend on your needs and goals.';
  if (/weight|fat|lose/.test(q)) return 'Focus on sustainable habits: balanced meals, regular movement, adequate sleep, and gradual progress. Avoid extreme restriction.';
  if (/water|hydrate/.test(q)) return 'Hydration needs vary with body size, activity, climate, and health. Drink regularly and increase fluids when you sweat more.';
  if (/workout|exercise|gym|muscle|strength/.test(q)) return 'Start with a manageable routine, learn good technique, and allow recovery. Increase difficulty gradually as movements become comfortable.';
  if (/sleep|recover|sore/.test(q)) return 'Recovery matters. Try consistent sleep, gentle movement, and rest between hard sessions. Severe or persistent pain should be assessed by a professional.';
  return 'Tell me your goal—strength, general fitness, nutrition, hydration, or recovery—and I will share a few general starting points. This demo assistant does not replace a qualified healthcare professional.';
}

export function FitBot() {
  const [messages, setMessages] = useState<Message[]>([{ role: 'assistant', text: 'Hi! I’m FitBot. Ask me about workout routines, nutrition, hydration, or recovery.' }]);
  const [input, setInput] = useState('');
  function send(e: React.FormEvent) {
    e.preventDefault();
    const text = input.trim();
    if (!text) return;
    setMessages(prev => [...prev, { role: 'user', text }, { role: 'assistant', text: respond(text) }]);
    setInput('');
  }
  return <section id="fitbot" className="px-5 py-20"><div className="mx-auto grid max-w-6xl gap-8 lg:grid-cols-2"><div><p className="mb-3 flex items-center gap-2 text-xs font-bold uppercase tracking-[.25em] text-neon-green"><Sparkles size={16} /> Your fitness companion</p><h2 className="font-oswald text-4xl font-bold uppercase md:text-6xl">Meet <span className="text-neon-green">FitBot</span></h2><p className="mt-5 leading-7 text-zinc-400">Ask simple questions and get general fitness starting points. This project demo uses local responses, not a remote AI service.</p><ProblemSolver /></div><div className="flex min-h-[470px] flex-col overflow-hidden rounded-2xl border border-zinc-800 bg-zinc-950"><div className="flex items-center gap-3 border-b border-zinc-800 p-5"><div className="rounded-xl bg-neon-green/10 p-3 text-neon-green"><Bot /></div><div><h3 className="font-bold">FitBot</h3><p className="text-xs text-zinc-500">Fitness helper · demo mode</p></div></div><div className="flex-1 space-y-4 overflow-y-auto p-5">{messages.map((message, i) => <div key={i} className={`flex gap-3 ${message.role === 'user' ? 'flex-row-reverse' : ''}`}><div className="flex h-8 w-8 shrink-0 items-center justify-center rounded-full bg-zinc-800">{message.role === 'user' ? <UserRound size={16} /> : <Bot size={16} className="text-neon-green" />}</div><p className={`max-w-[85%] rounded-xl p-3 text-sm leading-6 ${message.role === 'user' ? 'bg-neon-green text-black' : 'bg-black text-zinc-300'}`}>{message.text}</p></div>)}</div><form onSubmit={send} className="flex gap-2 border-t border-zinc-800 p-4"><input value={input} onChange={e => setInput(e.target.value)} placeholder="Ask about fitness…" className="min-w-0 flex-1 rounded-lg border border-zinc-700 bg-black px-3 py-3 text-sm outline-none focus:border-neon-green" /><button aria-label="Send message" className="rounded-lg bg-neon-green px-4 text-black"><Send size={18} /></button></form></div></div></section>;
}
