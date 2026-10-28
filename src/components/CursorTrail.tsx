import { useEffect, useState } from 'react';

export function CursorTrail() {
  const [point, setPoint] = useState({ x: -100, y: -100 });
  useEffect(() => {
    const move = (e: MouseEvent) => setPoint({ x: e.clientX, y: e.clientY });
    window.addEventListener('mousemove', move);
    return () => window.removeEventListener('mousemove', move);
  }, []);
  return <div aria-hidden="true" className="pointer-events-none fixed z-[200] hidden h-4 w-4 rounded-full border border-neon-green/70 md:block" style={{ left: point.x - 8, top: point.y - 8, transition: 'left 80ms linear, top 80ms linear' }} />;
}
