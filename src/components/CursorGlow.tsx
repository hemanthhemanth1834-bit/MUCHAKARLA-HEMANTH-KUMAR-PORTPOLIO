import { useEffect, useRef } from 'react';
import { usePrefersReducedMotion } from '../hooks';

/** Soft cursor spotlight that follows the pointer (desktop only). */
export function CursorGlow() {
  const ref = useRef<HTMLDivElement>(null);
  const reduced = usePrefersReducedMotion();

  useEffect(() => {
    if (reduced) return;
    if (window.matchMedia('(pointer: coarse)').matches) return;
    const el = ref.current;
    if (!el) return;
    let raf = 0;
    let x = -500;
    let y = -500;
    let cx = x;
    let cy = y;
    const onMove = (e: PointerEvent) => {
      x = e.clientX;
      y = e.clientY;
    };
    const tick = () => {
      cx += (x - cx) * 0.12;
      cy += (y - cy) * 0.12;
      el.style.transform = `translate(${cx - 260}px, ${cy - 260}px)`;
      raf = requestAnimationFrame(tick);
    };
    window.addEventListener('pointermove', onMove, { passive: true });
    raf = requestAnimationFrame(tick);
    return () => {
      window.removeEventListener('pointermove', onMove);
      cancelAnimationFrame(raf);
    };
  }, [reduced]);

  if (reduced) return null;
  return (
    <div
      ref={ref}
      aria-hidden
      className="pointer-events-none fixed left-0 top-0 z-[5] hidden h-[520px] w-[520px] rounded-full md:block"
      style={{
        background: 'radial-gradient(circle, rgba(47,123,255,0.09), rgba(34,211,238,0.04) 45%, transparent 70%)',
      }}
    />
  );
}
