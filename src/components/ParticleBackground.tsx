import { useEffect, useRef } from 'react';
import { useAdaptiveQuality, usePrefersReducedMotion } from '../hooks';

interface P {
  x: number;
  y: number;
  vx: number;
  vy: number;
  r: number;
  hue: number;
  tw: number;
}

/**
 * Lightweight 2D canvas particle field (page background).
 * GPU-cheap, density adapts to device quality tier.
 */
export function ParticleBackground() {
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const quality = useAdaptiveQuality();
  const reduced = usePrefersReducedMotion();

  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;
    const ctx = canvas.getContext('2d');
    if (!ctx) return;

    const COUNT = quality === 'low' ? 28 : quality === 'medium' ? 55 : 90;
    let w = 0;
    let h = 0;
    let raf = 0;
    const dpr = Math.min(window.devicePixelRatio || 1, 2);
    const rand = (a: number, b: number) => a + Math.random() * (b - a);
    let parts: P[] = [];

    const resize = () => {
      w = window.innerWidth;
      h = window.innerHeight;
      canvas.width = Math.floor(w * dpr);
      canvas.height = Math.floor(h * dpr);
      canvas.style.width = `${w}px`;
      canvas.style.height = `${h}px`;
      ctx.setTransform(dpr, 0, 0, dpr, 0, 0);
    };

    const seed = () => {
      parts = Array.from({ length: COUNT }, () => ({
        x: rand(0, w),
        y: rand(0, h),
        vx: rand(-0.22, 0.22),
        vy: rand(-0.18, 0.18),
        r: rand(0.6, 2.1),
        hue: Math.random() < 0.6 ? 205 : Math.random() < 0.5 ? 190 : 258,
        tw: rand(0, Math.PI * 2),
      }));
    };

    const LINK = quality === 'low' ? 90 : 130;

    const draw = () => {
      ctx.clearRect(0, 0, w, h);
      // links
      ctx.lineWidth = 0.6;
      for (let i = 0; i < parts.length; i++) {
        const a = parts[i]!;
        for (let j = i + 1; j < parts.length; j++) {
          const b = parts[j]!;
          const dx = a.x - b.x;
          const dy = a.y - b.y;
          const d = Math.hypot(dx, dy);
          if (d < LINK) {
            ctx.strokeStyle = `rgba(80,140,255,${((1 - d / LINK) * 0.22).toFixed(3)})`;
            ctx.beginPath();
            ctx.moveTo(a.x, a.y);
            ctx.lineTo(b.x, b.y);
            ctx.stroke();
          }
        }
      }
      // nodes
      for (const p of parts) {
        const alpha = 0.45 + Math.sin(p.tw) * 0.3;
        ctx.fillStyle =
          p.hue === 258
            ? `rgba(139,92,246,${alpha.toFixed(3)})`
            : `rgba(90,200,255,${alpha.toFixed(3)})`;
        ctx.beginPath();
        ctx.arc(p.x, p.y, p.r, 0, Math.PI * 2);
        ctx.fill();
      }
    };

    const step = () => {
      for (const p of parts) {
        p.x += p.vx;
        p.y += p.vy;
        p.tw += 0.03;
        if (p.x < -10) p.x = w + 10;
        if (p.x > w + 10) p.x = -10;
        if (p.y < -10) p.y = h + 10;
        if (p.y > h + 10) p.y = -10;
      }
      draw();
      raf = requestAnimationFrame(step);
    };

    resize();
    seed();
    if (reduced) {
      draw(); // static single frame
    } else {
      raf = requestAnimationFrame(step);
    }

    let t: number | undefined;
    const onResize = () => {
      window.clearTimeout(t);
      t = window.setTimeout(() => {
        resize();
        seed();
        if (reduced) draw();
      }, 200);
    };
    window.addEventListener('resize', onResize);
    return () => {
      cancelAnimationFrame(raf);
      window.removeEventListener('resize', onResize);
      window.clearTimeout(t);
    };
  }, [quality, reduced]);

  return (
    <canvas
      ref={canvasRef}
      aria-hidden
      className="pointer-events-none fixed inset-0 z-[1]"
      style={{ opacity: 0.9 }}
    />
  );
}
