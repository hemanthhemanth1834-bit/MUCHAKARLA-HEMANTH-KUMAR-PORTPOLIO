import { motion } from 'framer-motion';
import { useRef, type CSSProperties, type ReactNode } from 'react';
import { usePrefersReducedMotion, useReveal } from '../hooks';

/* ---------- Section heading ---------- */
export function SectionHeading({
  index,
  eyebrow,
  title,
  lede,
}: {
  index: string;
  eyebrow: string;
  title: ReactNode;
  lede?: string;
}) {
  const { setRef, visible } = useReveal<HTMLDivElement>();
  return (
    <div
      ref={setRef}
      className={`mb-10 transition-all duration-700 sm:mb-14 ${
        visible ? 'translate-y-0 opacity-100' : 'translate-y-6 opacity-0'
      }`}
    >
      <p className="eyebrow mb-3">
        <span className="mr-3 text-white/30">{index}</span>
        {eyebrow}
      </p>
      <h2 className="font-display text-3xl font-bold leading-tight text-white sm:text-4xl lg:text-5xl">
        {title}
      </h2>
      {lede ? <p className="mt-4 max-w-2xl text-sm leading-relaxed text-slate-400 sm:text-base">{lede}</p> : null}
    </div>
  );
}

/* ---------- Scroll reveal wrapper ---------- */
export function Reveal({
  children,
  delay = 0,
  className = '',
}: {
  children: ReactNode;
  delay?: number;
  className?: string;
}) {
  const { setRef, visible } = useReveal<HTMLDivElement>();
  return (
    <div
      ref={setRef}
      style={{ transitionDelay: `${delay}ms` }}
      className={`transition-all duration-700 ${visible ? 'translate-y-0 opacity-100' : 'translate-y-8 opacity-0'} ${className}`}
    >
      {children}
    </div>
  );
}

/* ---------- Glass card with 3D tilt + hover lighting ---------- */
export function TiltCard({
  children,
  className = '',
  glow = 'rgba(47,123,255,0.25)',
}: {
  children: ReactNode;
  className?: string;
  glow?: string;
}) {
  const ref = useRef<HTMLDivElement>(null);
  const reduced = usePrefersReducedMotion();

  const onMove = (e: React.MouseEvent) => {
    const el = ref.current;
    if (!el || reduced) return;
    const r = el.getBoundingClientRect();
    const px = (e.clientX - r.left) / r.width - 0.5;
    const py = (e.clientY - r.top) / r.height - 0.5;
    el.style.transform = `perspective(900px) rotateX(${(-py * 7).toFixed(2)}deg) rotateY(${(px * 9).toFixed(2)}deg) translateZ(0)`;
    el.style.setProperty('--mx', `${((px + 0.5) * 100).toFixed(1)}%`);
    el.style.setProperty('--my', `${((py + 0.5) * 100).toFixed(1)}%`);
  };
  const onLeave = () => {
    const el = ref.current;
    if (!el) return;
    el.style.transform = 'perspective(900px) rotateX(0deg) rotateY(0deg)';
  };

  return (
    <div
      ref={ref}
      onMouseMove={onMove}
      onMouseLeave={onLeave}
      style={{ '--glow': glow } as CSSProperties}
      className={`glass group relative overflow-hidden rounded-2xl transition-transform duration-300 ease-out will-change-transform ${className}`}
    >
      <div
        aria-hidden
        className="pointer-events-none absolute inset-0 opacity-0 transition-opacity duration-300 group-hover:opacity-100"
        style={{
          background: `radial-gradient(420px circle at var(--mx, 50%) var(--my, 50%), var(--glow), transparent 65%)`,
        }}
      />
      {children}
    </div>
  );
}

/* ---------- Magnetic button ---------- */
export function MagneticButton({
  children,
  href,
  onClick,
  type = 'button',
  variant = 'primary',
  className = '',
  ariaLabel,
}: {
  children: ReactNode;
  href?: string;
  onClick?: () => void;
  type?: 'button' | 'submit';
  variant?: 'primary' | 'ghost';
  className?: string;
  ariaLabel?: string;
}) {
  const ref = useRef<HTMLAnchorElement | HTMLButtonElement | null>(null);
  const reduced = usePrefersReducedMotion();

  const onMove = (e: React.MouseEvent) => {
    const el = ref.current as HTMLElement | null;
    if (!el || reduced) return;
    const r = el.getBoundingClientRect();
    const x = e.clientX - (r.left + r.width / 2);
    const y = e.clientY - (r.top + r.height / 2);
    el.style.transform = `translate(${(x * 0.12).toFixed(1)}px, ${(y * 0.18).toFixed(1)}px)`;
  };
  const reset = () => {
    const el = ref.current as HTMLElement | null;
    if (el) el.style.transform = 'translate(0,0)';
  };

  const styles =
    variant === 'primary'
      ? 'glow-btn bg-gradient-to-r from-[#2f7bff] to-[#22d3ee] text-white hover:brightness-110'
      : 'glass text-slate-200 hover:border-cyan-300/50 hover:text-white';

  const cls = `inline-flex items-center justify-center gap-2 rounded-full px-7 py-3.5 font-display text-xs font-semibold tracking-[0.22em] transition-all duration-300 ${styles} ${className}`;

  if (href) {
    return (
      <motion.a
        // @ts-expect-error polymorphic ref
        ref={ref}
        href={href}
        aria-label={ariaLabel}
        onMouseMove={onMove}
        onMouseLeave={reset}
        whileTap={reduced ? undefined : { scale: 0.97 }}
        className={cls}
      >
        {children}
      </motion.a>
    );
  }
  return (
    <motion.button
      // @ts-expect-error polymorphic ref
      ref={ref}
      type={type}
      onClick={onClick}
      aria-label={ariaLabel}
      onMouseMove={onMove}
      onMouseLeave={reset}
      whileTap={reduced ? undefined : { scale: 0.97 }}
      className={cls}
    >
      {children}
    </motion.button>
  );
}
