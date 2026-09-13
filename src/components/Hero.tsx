import { motion } from 'framer-motion';
import { ArrowDown, Mail, MapPin } from 'lucide-react';
import { lazy, Suspense } from 'react';
import { PROFILE } from '../data/profile';
import { SOCIAL } from '../data/social';
import { usePrefersReducedMotion } from '../hooks';
import { SceneErrorBoundary } from './ErrorBoundary';
import { GithubIcon, LinkedinIcon } from './icons';
import { MagneticButton } from './ui';

const AIOrb = lazy(() =>
  import('./AIOrb').then((m) => ({ default: m.AIOrb })),
);

const fadeUp = (delay: number) => ({
  initial: { opacity: 0, y: 26 },
  animate: { opacity: 1, y: 0 },
  transition: { duration: 0.7, delay, ease: 'easeOut' as const },
});

export function Hero() {
  const reduced = usePrefersReducedMotion();

  return (
    <section id="home" aria-label="Home" className="relative flex min-h-svh items-center overflow-hidden">
      {/* 3D AI core backdrop */}
      {!reduced ? (
        <SceneErrorBoundary>
          <Suspense fallback={null}>
            <AIOrb />
          </Suspense>
        </SceneErrorBoundary>
      ) : (
        <div
          aria-hidden
          className="absolute inset-0"
          style={{
            background:
              'radial-gradient(560px circle at 50% 42%, rgba(47,123,255,0.22), transparent 65%)',
          }}
        />
      )}
      <div aria-hidden className="grid-bg absolute inset-0" />
      <div
        aria-hidden
        className="pointer-events-none absolute inset-x-0 bottom-0 h-40 bg-gradient-to-t from-[#04070f] to-transparent"
      />

      {/* HUD corner ticks */}
      <div aria-hidden className="pointer-events-none absolute inset-4 hidden font-mono text-[10px] tracking-[0.3em] text-cyan-200/40 sm:block">
        <span className="absolute left-2 top-20 border-l border-t border-cyan-300/30 pl-2 pt-1">SYS.ONLINE</span>
        <span className="absolute right-2 top-20 border-r border-t border-cyan-300/30 pr-2 pt-1">NEURAL.CORE v3.0</span>
        <span className="absolute bottom-6 left-2 border-b border-l border-cyan-300/30 pb-1 pl-2">AI · FULL-STACK · 3D</span>
        <span className="absolute bottom-6 right-2 border-b border-r border-cyan-300/30 pb-1 pr-2">SCROLL ↓</span>
      </div>

      <div className="section-shell relative z-10 pb-24 pt-32 text-center sm:pt-36">
        <motion.div {...(reduced ? {} : fadeUp(0.1))}>
          <span className="glass inline-flex items-center gap-2.5 rounded-full px-4 py-2 font-mono text-[10px] tracking-[0.28em] text-emerald-200 sm:text-[11px]">
            <span className="status-dot inline-block h-2 w-2 rounded-full bg-emerald-400" aria-hidden />
            {PROFILE.status}
          </span>
        </motion.div>

        <motion.h1
          {...(reduced ? {} : fadeUp(0.22))}
          className="font-display mx-auto mt-7 max-w-5xl text-[2.6rem] font-bold leading-[1.02] tracking-tight text-white sm:text-6xl lg:text-7xl"
        >
          {PROFILE.firstName}
          <br />
          <span className="text-gradient">{PROFILE.lastName}</span>
        </motion.h1>

        <motion.p
          {...(reduced ? {} : fadeUp(0.32))}
          className="mt-5 font-display text-sm font-semibold tracking-[0.22em] text-white sm:text-lg"
        >
          {PROFILE.positioning.toUpperCase()}
        </motion.p>

        <motion.p
          {...(reduced ? {} : fadeUp(0.42))}
          className="mx-auto mt-5 max-w-2xl text-sm leading-relaxed text-slate-400 sm:text-base"
        >
          “{PROFILE.heroSupporting}”
        </motion.p>

        <motion.p
          {...(reduced ? {} : fadeUp(0.48))}
          className="mt-4 inline-flex items-center gap-2 font-mono text-[11px] tracking-[0.25em] text-slate-500"
        >
          <MapPin className="h-3.5 w-3.5 text-cyan-300/70" aria-hidden />
          {PROFILE.location.toUpperCase()}
        </motion.p>

        <motion.div
          {...(reduced ? {} : fadeUp(0.58))}
          className="mt-8 flex flex-col items-center justify-center gap-4 sm:flex-row"
        >
          <MagneticButton href="#projects">EXPLORE MY WORK</MagneticButton>
          <MagneticButton href="#contact" variant="ghost">
            CONTACT ME
          </MagneticButton>
        </motion.div>

        <motion.div
          {...(reduced ? {} : fadeUp(0.68))}
          className="mt-9 flex items-center justify-center gap-3"
        >
          {[
            { icon: GithubIcon, href: SOCIAL.github, label: 'GitHub profile' },
            { icon: LinkedinIcon, href: SOCIAL.linkedin, label: 'LinkedIn profile' },
            { icon: Mail, href: `mailto:${PROFILE.email}`, label: 'Send email' },
          ].map(({ icon: Icon, href, label }) => (
            <a
              key={label}
              href={href}
              target={href.startsWith('mailto') ? undefined : '_blank'}
              rel={href.startsWith('mailto') ? undefined : 'noreferrer'}
              aria-label={label}
              className="glass grid h-11 w-11 place-items-center rounded-full text-slate-300 transition hover:-translate-y-1 hover:border-cyan-300/50 hover:text-cyan-200"
            >
              <Icon className="h-[18px] w-[18px]" aria-hidden />
            </a>
          ))}
        </motion.div>

        {/* first-5-seconds strip: who / what / tech / proof / contact */}
        <motion.dl
          {...(reduced ? {} : fadeUp(0.76))}
          className="glass mx-auto mt-10 grid max-w-3xl grid-cols-2 gap-px overflow-hidden rounded-2xl text-left sm:grid-cols-4"
        >
          {[
            ['WHO I AM', 'AI/ML Engineer & Full-Stack Developer'],
            ['WHAT I BUILD', 'AI apps · 3D/WebGL · Full-stack systems'],
            ['PROOF', 'DRISHTI-X · 11+ deployed apps'],
            ['CONTACT', PROFILE.email],
          ].map(([k, v]) => (
            <div key={k} className="bg-[#04070f]/40 px-4 py-3">
              <dt className="font-mono text-[9px] tracking-[0.3em] text-cyan-300/80">{k}</dt>
              <dd className="mt-1 truncate text-xs text-slate-200" title={v}>{v}</dd>
            </div>
          ))}
        </motion.dl>

        <motion.a
          href="#about"
          aria-label="Scroll to about section"
          {...(reduced ? {} : { animate: { y: [0, 8, 0] }, transition: { duration: 2, repeat: Infinity } })}
          className="mx-auto mt-10 grid h-11 w-11 place-items-center rounded-full border border-white/10 text-slate-400 hover:text-cyan-200"
        >
          <ArrowDown className="h-4 w-4" aria-hidden />
        </motion.a>
      </div>
    </section>
  );
}
