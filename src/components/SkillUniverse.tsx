import { useEffect, useMemo, useRef, useState } from 'react';
import { SKILL_GROUPS } from '../data/skills';
import { useAdaptiveQuality, usePrefersReducedMotion } from '../hooks';
import { Reveal, SectionHeading } from './ui';

interface Node {
  label: string;
  group: number;
  x: number;
  y: number;
  z: number; // pseudo-depth 0..1
  r: number;
  vx: number;
  vy: number;
}

const GROUP_COLORS = [
  '#a78bfa', '#5cc8ff', '#22d3ee', '#2f7bff', '#38bdf8', '#34d399',
  '#f472b6', '#fbbf24', '#f97316', '#94a3b8', '#e879f9',
];

/**
 * Interactive "technology universe": pseudo-3D neural network on 2D canvas.
 * Hover/focus a node → it glows, links animate, info panel updates.
 * Keyboard accessible via the grouped skill lists below the canvas.
 */
export function SkillUniverse() {
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const wrapRef = useRef<HTMLDivElement>(null);
  const [hovered, setHovered] = useState<Node | null>(null);
  const [selected, setSelected] = useState<Node | null>(null);
  const [activeGroup, setActiveGroup] = useState<number | null>(null);
  const quality = useAdaptiveQuality();
  const reduced = usePrefersReducedMotion();
  const nodesRef = useRef<Node[]>([]);

  const flatSkills = useMemo(
    () => SKILL_GROUPS.flatMap((g, gi) => g.skills.map((s) => ({ label: s, group: gi }))),
    [],
  );

  useEffect(() => {
    const canvas = canvasRef.current;
    const wrap = wrapRef.current;
    if (!canvas || !wrap) return;
    const ctx = canvas.getContext('2d');
    if (!ctx) return;

    const dpr = Math.min(window.devicePixelRatio || 1, 2);
    let w = 0;
    let h = 0;
    let raf = 0;
    const rand = (a: number, b: number) => a + Math.random() * (b - a);

    const layout = () => {
      const rect = wrap.getBoundingClientRect();
      w = rect.width;
      h = quality === 'low' ? 300 : 420;
      canvas.width = w * dpr;
      canvas.height = h * dpr;
      canvas.style.width = `${w}px`;
      canvas.style.height = `${h}px`;
      ctx.setTransform(dpr, 0, 0, dpr, 0, 0);
    };

    const seed = () => {
      nodesRef.current = flatSkills.map((s) => ({
        ...s,
        x: rand(w * 0.08, w * 0.92),
        y: rand(h * 0.1, h * 0.9),
        z: rand(0.35, 1),
        r: rand(3, 6),
        vx: rand(-0.25, 0.25),
        vy: rand(-0.2, 0.2),
      }));
    };

    const mouse = { x: -9999, y: -9999 };

    const draw = (t: number) => {
      ctx.clearRect(0, 0, w, h);
      const nodes = nodesRef.current;
      const cx = w / 2;
      const cy = h / 2;

      // central core
      const pulse = reduced ? 0 : Math.sin(t * 0.0012) * 4;
      const coreGrad = ctx.createRadialGradient(cx, cy, 0, cx, cy, 60 + pulse);
      coreGrad.addColorStop(0, 'rgba(34,211,238,0.85)');
      coreGrad.addColorStop(0.35, 'rgba(47,123,255,0.35)');
      coreGrad.addColorStop(1, 'rgba(47,123,255,0)');
      ctx.fillStyle = coreGrad;
      ctx.beginPath();
      ctx.arc(cx, cy, 60 + pulse, 0, Math.PI * 2);
      ctx.fill();
      ctx.fillStyle = '#dff6ff';
      ctx.font = '600 10px "JetBrains Mono", monospace';
      ctx.textAlign = 'center';
      ctx.fillText('TECH', cx, cy - 2);
      ctx.fillText('STACK', cx, cy + 11);

      // links to core + between near nodes
      for (const n of nodes) {
        const dCore = Math.hypot(n.x - cx, n.y - cy);
        if (dCore < w * 0.42) {
          ctx.strokeStyle = `rgba(90,160,255,${(0.16 * n.z).toFixed(3)})`;
          ctx.lineWidth = 0.7;
          ctx.beginPath();
          ctx.moveTo(cx, cy);
          ctx.lineTo(n.x, n.y);
          ctx.stroke();
        }
      }
      const LINK = 110;
      for (let i = 0; i < nodes.length; i++) {
        for (let j = i + 1; j < nodes.length; j++) {
          const a = nodes[i]!;
          const b = nodes[j]!;
          const d = Math.hypot(a.x - b.x, a.y - b.y);
          if (d < LINK && a.group === b.group) {
            ctx.strokeStyle = `rgba(139,92,246,${((1 - d / LINK) * 0.3).toFixed(3)})`;
            ctx.lineWidth = 0.6;
            ctx.beginPath();
            ctx.moveTo(a.x, a.y);
            ctx.lineTo(b.x, b.y);
            ctx.stroke();
          }
        }
      }

      // nodes
      for (const n of nodes) {
        const isHot = hovered?.label === n.label && hovered?.group === n.group;
        const dimmed = activeGroup !== null && n.group !== activeGroup;
        const dm = Math.hypot(n.x - mouse.x, n.y - mouse.y);
        const near = dm < 90;
        const color = GROUP_COLORS[n.group % GROUP_COLORS.length]!;
        const r = n.r * n.z * (isHot ? 1.9 : near ? 1.35 : 1);
        if ((isHot || near) && !dimmed) {
          const g = ctx.createRadialGradient(n.x, n.y, 0, n.x, n.y, r * 5);
          g.addColorStop(0, `${color}55`);
          g.addColorStop(1, 'transparent');
          ctx.fillStyle = g;
          ctx.beginPath();
          ctx.arc(n.x, n.y, r * 5, 0, Math.PI * 2);
          ctx.fill();
        }
        ctx.fillStyle = isHot ? '#ffffff' : color;
        ctx.globalAlpha = dimmed ? 0.1 : 0.55 + n.z * 0.45;
        ctx.beginPath();
        ctx.arc(n.x, n.y, r, 0, Math.PI * 2);
        ctx.fill();
        ctx.globalAlpha = 1;
        if (isHot) {
          ctx.fillStyle = '#e6f6ff';
          ctx.font = '500 11px Inter, sans-serif';
          ctx.fillText(n.label, n.x, n.y - r - 8);
        }
      }
    };

    const step = (t: number) => {
      if (!reduced) {
        for (const n of nodesRef.current) {
          n.x += n.vx * n.z;
          n.y += n.vy * n.z;
          if (n.x < 10 || n.x > w - 10) n.vx *= -1;
          if (n.y < 10 || n.y > h - 10) n.vy *= -1;
        }
      }
      draw(t);
      if (!reduced) raf = requestAnimationFrame(step);
    };

    layout();
    seed();
    if (reduced) draw(0);
    else raf = requestAnimationFrame(step);

    const onResize = () => {
      layout();
      seed();
      if (reduced) draw(0);
    };
    const onMove = (e: PointerEvent) => {
      const rect = canvas.getBoundingClientRect();
      mouse.x = e.clientX - rect.left;
      mouse.y = e.clientY - rect.top;
      // hit test
      let best: Node | null = null;
      let bestD = 22;
      for (const n of nodesRef.current) {
        const d = Math.hypot(n.x - mouse.x, n.y - mouse.y);
        if (d < bestD) {
          bestD = d;
          best = n;
        }
      }
      setHovered(best);
      canvas.style.cursor = best ? 'pointer' : 'default';
    };
    const onLeave = () => {
      mouse.x = -9999;
      mouse.y = -9999;
      setHovered(null);
    };
    const onClick = () => {
      if (hovered) setSelected(hovered);
    };

    let t: number | undefined;
    const onR = () => {
      window.clearTimeout(t);
      t = window.setTimeout(onResize, 200);
    };
    window.addEventListener('resize', onR);
    canvas.addEventListener('pointermove', onMove);
    canvas.addEventListener('pointerleave', onLeave);
    canvas.addEventListener('click', onClick);
    return () => {
      cancelAnimationFrame(raf);
      window.removeEventListener('resize', onR);
      canvas.removeEventListener('pointermove', onMove);
      canvas.removeEventListener('pointerleave', onLeave);
      canvas.removeEventListener('click', onClick);
      window.clearTimeout(t);
    };
  }, [flatSkills, quality, reduced, hovered?.label, hovered?.group, activeGroup]);

  const focusNode = hovered ?? selected;
  const activeCategory = activeGroup !== null ? SKILL_GROUPS[activeGroup] : null;
  const focusGroup = focusNode ? SKILL_GROUPS[focusNode.group] : activeCategory ?? null;

  const pickSkill = (label: string, group: number) => {
    const found = nodesRef.current.find((n) => n.label === label && n.group === group);
    setSelected(found ?? { label, group, x: 0, y: 0, z: 1, r: 5, vx: 0, vy: 0 });
  };

  const toggleGroup = (gi: number) => {
    setActiveGroup((prev) => (prev === gi ? null : gi));
    setSelected(null);
  };

  return (
    <section id="skills" aria-label="Skills" className="relative scroll-mt-24 py-24 sm:py-32">
      <div className="section-shell">
        <SectionHeading
          index="04"
          eyebrow="Skills"
          title={<>TECHNOLOGY <span className="text-gradient">UNIVERSE</span></>}
          lede="A central AI core with technology nodes orbiting around it. Click a category to isolate it in the network, hover any node to inspect it — or browse the full accessible lists below. Proficiency is shown by real project usage, not percentages."
        />

        <Reveal>
          <div ref={wrapRef} className="glass relative overflow-hidden rounded-2xl">
            <canvas ref={canvasRef} aria-hidden className="block w-full" />
            {/* info panel */}
            <div
              aria-live="polite"
              className="pointer-events-none absolute left-4 top-4 max-w-[240px] rounded-xl border border-white/10 bg-[#04070f]/80 p-4 backdrop-blur-md sm:left-6 sm:top-6"
            >
              {focusGroup ? (
                <>
                  <p className="font-mono text-[10px] tracking-[0.3em] text-cyan-300">
                    {focusGroup.category}
                  </p>
                  <p className="font-display mt-1 text-sm font-semibold text-white">
                    {focusNode?.label ?? `${focusGroup.skills.length} SKILLS IN ORBIT`}
                  </p>
                  <p className="mt-1 text-xs leading-relaxed text-slate-400">{focusGroup.blurb}</p>
                </>
              ) : (
                <>
                  <p className="font-mono text-[10px] tracking-[0.3em] text-cyan-300">TECH STACK</p>
                  <p className="mt-1 text-xs leading-relaxed text-slate-400">
                    {flatSkills.length} technologies across {SKILL_GROUPS.length} domains. Hover any
                    node to inspect it.
                  </p>
                </>
              )}
            </div>
            <p className="absolute bottom-3 right-4 font-mono text-[10px] tracking-[0.3em] text-slate-500">
              DRAG-FREE // HOVER TO INSPECT
            </p>
          </div>
        </Reveal>

        {/* accessible grouped lists — category headers toggle the 3D filter */}
        <div className="mt-8 grid gap-5 sm:grid-cols-2 lg:grid-cols-3">
          {SKILL_GROUPS.map((g, gi) => {
            const isActive = activeGroup === gi;
            return (
            <Reveal key={g.category} delay={(gi % 3) * 100}>
              <article
                className={`glass h-full rounded-2xl p-6 transition-colors ${
                  isActive ? 'border-cyan-300/60 shadow-[0_0_30px_rgba(34,211,238,0.15)]' : 'hover:border-cyan-300/40'
                }`}
              >
                <button
                  type="button"
                  onClick={() => toggleGroup(gi)}
                  aria-expanded={isActive}
                  aria-label={`${isActive ? 'Show all categories' : `Isolate ${g.category} in the network`}`}
                  className="flex w-full items-center gap-3 text-left"
                >
                  <span
                    aria-hidden
                    className="h-2.5 w-2.5 shrink-0 rounded-full"
                    style={{ background: GROUP_COLORS[gi % GROUP_COLORS.length], boxShadow: `0 0 10px ${GROUP_COLORS[gi % GROUP_COLORS.length]}` }}
                  />
                  <span className="font-display flex-1 text-xs font-semibold tracking-[0.22em] text-white">
                    {g.category}
                  </span>
                  <span className="font-mono text-[10px] text-slate-500">
                    {g.skills.length} · {isActive ? 'ON' : 'ISOLATE'}
                  </span>
                </button>
                <p className="mt-2 text-xs text-slate-500">{g.blurb}</p>
                <ul className="mt-4 flex flex-wrap gap-2" aria-label={`${g.category} skills`}>
                  {g.skills.map((s) => (
                    <li key={s}>
                      <button
                        type="button"
                        onClick={() => pickSkill(s, gi)}
                        onMouseEnter={() => pickSkill(s, gi)}
                        onFocus={() => pickSkill(s, gi)}
                        className="rounded-full border border-white/10 bg-white/[0.03] px-3 py-1.5 text-xs text-slate-300 transition hover:-translate-y-0.5 hover:border-cyan-300/50 hover:text-white"
                      >
                        {s}
                      </button>
                    </li>
                  ))}
                </ul>
              </article>
            </Reveal>
            );
          })}
          {/* summary cell */}
          <Reveal delay={100}>
            <article className="holo-border flex h-full flex-col justify-center rounded-2xl p-6">
              <p className="font-mono text-[10px] tracking-[0.3em] text-cyan-300">HOW I LEARN</p>
              <p className="mt-2 text-sm leading-relaxed text-slate-300">
                Every technology here is backed by coursework, internships or shipped projects
                elsewhere on this page — no filler, no percentage bars.
              </p>
            </article>
          </Reveal>
        </div>
      </div>
    </section>
  );
}
