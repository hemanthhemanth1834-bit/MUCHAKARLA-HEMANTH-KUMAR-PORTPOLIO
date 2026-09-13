import { AnimatePresence, motion } from 'framer-motion';
import { ExternalLink, FlaskConical, X } from 'lucide-react';
import { useState } from 'react';
import { PROJECTS, type Project } from '../data/projects';
import { SOCIAL } from '../data/social';
import { usePrefersReducedMotion } from '../hooks';
import { GithubIcon } from './icons';
import { Reveal, SectionHeading } from './ui';

/** Cinematic CSS/SVG visual per project + HUD frame. */
function ProjectVisual({ project, tall }: { project: Project; tall?: boolean }) {
  return (
    <div
      aria-hidden
      className={`relative overflow-hidden border-b border-white/10 ${tall ? 'h-52 sm:h-64' : 'h-44 sm:h-52'}`}
      style={{ background: `linear-gradient(135deg, #070d1d 0%, ${project.accent}26 60%, #070d1d 100%)` }}
    >
      <div className="grid-bg absolute inset-0 opacity-70" />

      {project.id === 'drishti-x-command' && (
        <div className="absolute inset-0 flex">
          {/* mini map */}
          <div className="relative m-4 hidden flex-1 rounded-lg border border-cyan-300/30 bg-[#04070f]/60 sm:block">
            <div className="absolute left-[18%] top-[24%] h-8 w-14 rounded-full bg-red-500/25 blur-[1px]" />
            <div className="absolute left-[55%] top-[55%] h-10 w-20 rounded-full bg-amber-400/20 blur-[1px]" />
            <div className="absolute left-[30%] top-[60%] h-2 w-2 rounded-full bg-cyan-300" style={{ boxShadow: '0 0 8px #22d3ee' }} />
            <div className="absolute left-[62%] top-[30%] h-2 w-2 rounded-full bg-emerald-300" style={{ boxShadow: '0 0 8px #34d399' }} />
            <div className="absolute left-[70%] top-[62%] h-2 w-2 rounded-full bg-violet-300" style={{ boxShadow: '0 0 8px #a78bfa' }} />
            <svg className="absolute inset-0 h-full w-full" preserveAspectRatio="none" viewBox="0 0 100 100">
              <path d="M10,80 Q35,60 55,62 T92,30" fill="none" stroke="#22d3ee" strokeWidth="1" strokeDasharray="3 2" opacity="0.8" />
            </svg>
            <span className="absolute bottom-1.5 left-2 font-mono text-[9px] tracking-[0.25em] text-cyan-200/70">GIS.LIVE // DEMO GRID</span>
          </div>
          {/* pipeline */}
          <div className="flex flex-1 flex-col items-center justify-center gap-1.5 p-4 font-mono text-[9px] tracking-[0.2em]">
            {['DETECT', 'ANALYZE', 'PREDICT', 'OPTIMIZE', 'RESPOND', 'RECOVER'].map((s, i) => (
              <span
                key={s}
                className="rounded border bg-[#04070f]/70 px-3 py-1 text-cyan-100"
                style={{ borderColor: `${project.accent}${i === 0 ? 'cc' : '55'}`, opacity: 1 - i * 0.11 }}
              >
                {s}
              </span>
            ))}
          </div>
        </div>
      )}

      {project.id === 'drishti-x' && (
        <div className="absolute inset-0 flex items-center justify-center gap-6 p-4">
          <div className="flex items-end gap-1.5" aria-hidden>
            {[35, 60, 45, 80, 55, 70, 40].map((hh, i) => (
              <div
                key={i}
                className="w-5 rounded-t border border-cyan-300/40 bg-gradient-to-t from-[#2f7bff]/40 to-cyan-300/20 sm:w-7"
                style={{ height: `${hh * 0.9}px` }}
              />
            ))}
          </div>
          <div className="font-mono text-[9px] tracking-[0.2em]">
            <p className="rounded border border-red-400/50 bg-red-500/15 px-2 py-1 text-red-200">DSI: HIGH</p>
            <p className="mt-1.5 rounded border border-cyan-300/50 bg-cyan-400/10 px-2 py-1 text-cyan-100">A* ROUTE ✓</p>
            <p className="mt-1.5 rounded border border-white/15 bg-white/5 px-2 py-1 text-slate-300">DEMO DATA</p>
          </div>
        </div>
      )}

      {project.id === 'nexusflow' && (
        <div className="absolute inset-0 flex flex-col items-center justify-center gap-0 font-mono text-[10px] tracking-[0.25em]">
          {['USER', 'PROJECT', 'RECORD'].map((n, i) => (
            <div key={n} className="flex flex-col items-center">
              <span
                className="rounded-md border bg-[#04070f]/70 px-4 py-1.5 text-cyan-100"
                style={{ borderColor: `${project.accent}77`, boxShadow: `0 0 18px ${project.accent}33` }}
              >
                {n}
              </span>
              {i < 2 && <span className="my-0.5 text-cyan-300/70">↓</span>}
            </div>
          ))}
        </div>
      )}

      {project.id === 'neuralverse' && (
        <div className="absolute inset-0 flex items-center justify-center">
          <div className="relative h-28 w-28">
            <div className="absolute inset-6 rounded-full bg-gradient-to-br from-violet-500 to-cyan-400" style={{ boxShadow: '0 0 44px rgba(139,92,246,0.55)' }} />
            {[0, 1, 2, 3, 4, 5].map((i) => (
              <span
                key={i}
                className="absolute h-1.5 w-1.5 rounded-full bg-cyan-200"
                style={{
                  left: `${50 + 44 * Math.cos((i / 6) * Math.PI * 2)}%`,
                  top: `${50 + 44 * Math.sin((i / 6) * Math.PI * 2)}%`,
                  boxShadow: '0 0 8px #22d3ee',
                }}
              />
            ))}
            <span className="absolute inset-0 rounded-full border border-dashed border-violet-300/50" />
          </div>
        </div>
      )}

      {project.id === 'nexus-ecommerce' && (
        <div className="absolute inset-0 flex items-center justify-center gap-3">
          {[0, 1, 2].map((i) => (
            <div
              key={i}
              className="h-16 w-12 rounded-lg border sm:h-20 sm:w-16"
              style={{
                borderColor: `${project.accent}88`,
                background: 'rgba(255,255,255,0.03)',
                transform: `translateY(${i % 2 === 0 ? '-8px' : '8px'}) rotate(${(i - 1) * 4}deg)`,
                boxShadow: `0 0 24px ${project.accent}33`,
              }}
            >
              <div className="mx-2 mt-2 h-6 rounded sm:h-8" style={{ background: `${project.accent}44` }} />
              <div className="mx-2 mt-2 h-1.5 rounded-full bg-white/20" />
              <div className="mx-2 mt-1 h-1.5 w-2/3 rounded-full bg-white/10" />
            </div>
          ))}
        </div>
      )}

      {project.id === 'weatherflow' && (
        <div className="absolute inset-0 flex items-center justify-center">
          <div className="relative">
            <div
              className="h-20 w-20 rounded-full"
              style={{ background: 'radial-gradient(circle at 35% 35%, #ffe9a8, #f59e0b 60%, transparent 75%)', boxShadow: '0 0 50px rgba(245,158,11,0.4)' }}
            />
            <div className="absolute -bottom-4 -right-10 h-10 w-28 rounded-full bg-slate-400/25 blur-[2px]" />
            <div className="absolute -bottom-1 -right-6 h-8 w-20 rounded-full bg-slate-300/20 blur-[2px]" />
          </div>
          <div className="absolute bottom-4 left-1/2 flex -translate-x-1/2 gap-2">
            {['LIVE', '7-DAY', '3D SKY'].map((t) => (
              <span key={t} className="rounded border border-white/15 bg-[#04070f]/70 px-2 py-0.5 font-mono text-[10px] text-cyan-100">
                {t}
              </span>
            ))}
          </div>
        </div>
      )}

      {(project.id === 'faq-chatbot' || project.id === 'ai-chatbot') && (
        <div className="absolute inset-0 flex items-center justify-center">
          <div className="w-56 rounded-xl border border-white/15 bg-[#04070f]/70 p-3 backdrop-blur sm:w-64" style={{ borderColor: `${project.accent}66`, boxShadow: `0 0 30px ${project.accent}33` }}>
            <div className="mb-2 flex justify-start"><span className="rounded-lg rounded-tl-none bg-white/10 px-2.5 py-1 text-[11px] text-slate-100">How does matching work?</span></div>
            <div className="mb-2 flex justify-end"><span className="rounded-lg rounded-tr-none px-2.5 py-1 text-[11px] text-white" style={{ background: `${project.accent}55` }}>{project.id === 'faq-chatbot' ? 'Cosine similarity: 0.94' : 'AI-assisted reply ✓'}</span></div>
            <div className="flex items-center gap-1 px-1">
              {[0, 1, 2].map((i) => <span key={i} className="status-dot h-1.5 w-1.5 rounded-full bg-cyan-300" style={{ animationDelay: `${i * 0.3}s` }} />)}
            </div>
          </div>
        </div>
      )}

      {project.id === 'snake-game' && (
        <div className="absolute inset-0 flex items-center justify-center">
          <div className="grid grid-cols-8 gap-1 rounded-lg border border-emerald-300/30 bg-[#04070f]/70 p-2" style={{ boxShadow: '0 0 30px rgba(52,211,153,0.2)' }}>
            {Array.from({ length: 32 }).map((_, i) => {
              const snake = [19, 20, 21, 22].includes(i);
              const food = i === 11;
              return (
                <span
                  key={i}
                  className="h-3 w-3 rounded-[3px] sm:h-3.5 sm:w-3.5"
                  style={{
                    background: snake ? '#34d399' : food ? '#f87171' : 'rgba(255,255,255,0.06)',
                    boxShadow: snake ? '0 0 8px rgba(52,211,153,0.8)' : food ? '0 0 8px rgba(248,113,113,0.8)' : 'none',
                  }}
                />
              );
            })}
          </div>
        </div>
      )}

      {project.id === 'thiranex-portfolio' && (
        <div className="absolute inset-0 flex items-center justify-center p-6">
          <div className="w-full max-w-xs rounded-xl border border-cyan-300/30 bg-[#04070f]/70">
            <div className="flex gap-1.5 border-b border-white/10 p-2.5">
              {['#f87171', '#fbbf24', '#34d399'].map((c) => <span key={c} className="h-2 w-2 rounded-full" style={{ background: c }} />)}
            </div>
            <div className="space-y-1.5 p-3">
              <div className="h-2.5 w-3/4 rounded-full bg-gradient-to-r from-cyan-400/60 to-violet-400/60" />
              <div className="h-2 w-full rounded-full bg-white/10" />
              <div className="h-2 w-5/6 rounded-full bg-white/10" />
              <div className="flex gap-1.5 pt-1">
                <span className="rounded-full bg-cyan-400/25 px-2 py-0.5 font-mono text-[9px] text-cyan-100">SEO ✓</span>
                <span className="rounded-full bg-violet-400/25 px-2 py-0.5 font-mono text-[9px] text-violet-100">A11Y ✓</span>
              </div>
            </div>
          </div>
        </div>
      )}

      {project.id === 'codeorbit-portfolio' && (
        <div className="absolute inset-0 flex items-center justify-center gap-4 p-4">
          <div aria-hidden style={{ perspective: '400px' }}>
            <div
              className="h-20 w-20 border border-violet-300/60 bg-gradient-to-br from-violet-500/30 to-cyan-400/20"
              style={{ transform: 'rotateX(-18deg) rotateY(24deg)', boxShadow: '0 0 34px rgba(139,92,246,0.35)' }}
            />
          </div>
          <div className="font-mono text-[9px] tracking-[0.15em]">
            <p className="text-slate-400">PROJECT-REPORTED LIGHTHOUSE</p>
            {['A11Y 100', 'BEST 100', 'SEO 100'].map((s) => (
              <p key={s} className="mt-1 inline-block rounded border border-emerald-300/40 bg-emerald-400/10 px-2 py-0.5 text-emerald-200">{s}</p>
            ))}
          </div>
        </div>
      )}

      {project.id === 'nexus-and-more' && (
        <div className="absolute inset-0 flex items-center justify-center gap-5 p-4">
          <div className="flex items-center gap-2 font-mono text-[9px] tracking-[0.15em]">
            {['IDLE', 'CHASE', 'ATTACK'].map((s, i) => (
              <span key={s} className="flex items-center gap-2">
                <span className="rounded-md border border-pink-300/50 bg-pink-400/10 px-2 py-1 text-pink-100">{s}</span>
                {i < 2 && <span className="text-pink-300/70">→</span>}
              </span>
            ))}
          </div>
          <div className="hidden flex-col gap-1.5 sm:flex">
            {['TRANSLATOR ● LIVE', 'PASSWORD GEN ● LIVE', '+ MINIS'].map((s) => (
              <span key={s} className="rounded border border-white/15 bg-[#04070f]/70 px-2 py-1 font-mono text-[9px] text-cyan-100">{s}</span>
            ))}
          </div>
        </div>
      )}

      {/* HUD frame */}
      <span className="absolute left-3 top-3 font-mono text-[10px] tracking-[0.3em] text-white/40">
        PRJ_{project.index}
      </span>
      <span className="absolute right-3 top-3 font-mono text-[10px] tracking-[0.25em] text-cyan-200/70">
        {project.kind.toUpperCase()}
      </span>
    </div>
  );
}

function LinkButtons({ project, large }: { project: Project; large?: boolean }) {
  const pad = large ? 'px-5 py-2.5' : 'px-4 py-2';
  return (
    <>
      {project.githubUrl && (
        <a
          href={project.githubUrl}
          target="_blank"
          rel="noreferrer"
          onClick={(e) => e.stopPropagation()}
          className={`inline-flex items-center gap-2 rounded-full border border-white/15 ${pad} text-xs font-semibold text-slate-200 transition hover:border-cyan-300/60 hover:text-white`}
          aria-label={`${project.name} source code on GitHub`}
        >
          <GithubIcon className="h-3.5 w-3.5" /> GITHUB
        </a>
      )}
      {project.liveUrl && (
        <a
          href={project.liveUrl}
          target="_blank"
          rel="noreferrer"
          onClick={(e) => e.stopPropagation()}
          className={`glow-btn inline-flex items-center gap-2 rounded-full bg-gradient-to-r from-[#2f7bff] to-[#22d3ee] ${pad} text-xs font-semibold text-white transition hover:brightness-110`}
          aria-label={`${project.name} live demo`}
        >
          <ExternalLink className="h-3.5 w-3.5" /> LIVE DEMO
        </a>
      )}
    </>
  );
}

function ProjectCard({ project, onOpen, featured }: { project: Project; onOpen: () => void; featured?: boolean }) {
  const shown = project.stack.slice(0, featured ? 12 : 8);
  return (
    <Reveal className={`h-full ${featured ? 'md:col-span-2' : ''}`}>
      <article
        className={`glass group relative flex h-full flex-col overflow-hidden rounded-2xl transition-all duration-300 hover:-translate-y-1.5 hover:border-white/25 hover:shadow-[0_20px_60px_rgba(47,123,255,0.22)] ${
          featured ? 'md:grid md:grid-cols-2' : ''
        }`}
      >
        <span aria-hidden className="animated-holo absolute inset-x-0 top-0 z-10 h-[2px] opacity-0 transition-opacity group-hover:opacity-100" />
        <ProjectVisual project={project} tall={featured} />
        <div className="flex flex-1 flex-col p-6 sm:p-7">
          <div className="flex flex-wrap items-center gap-2">
            <span className="rounded-full border border-cyan-300/40 bg-cyan-400/10 px-3 py-1 font-mono text-[10px] tracking-[0.2em] text-cyan-200">
              {project.category}
            </span>
            {project.kind !== 'Personal Project' && (
              <span className="inline-flex items-center gap-1.5 rounded-full border border-white/15 px-3 py-1 font-mono text-[10px] tracking-[0.2em] text-slate-300">
                <FlaskConical className="h-3 w-3" aria-hidden /> {project.kind.toUpperCase()}
              </span>
            )}
          </div>
          <div className="mt-3 flex items-baseline gap-3">
            <span className="font-display text-4xl font-bold text-white/10 transition-colors group-hover:text-white/20">
              {project.index}
            </span>
            <h3 className="font-display text-lg font-bold leading-snug tracking-wide text-white">{project.name}</h3>
          </div>
          {project.demoDataNotice && (
            <p role="note" className="mt-3 rounded-lg border border-amber-200/30 bg-amber-300/[0.08] px-3 py-2 font-mono text-[10px] leading-relaxed tracking-wider text-amber-100/90">
              {project.demoDataNotice}
            </p>
          )}
          <p className={`mt-3 text-sm leading-relaxed text-slate-400 ${featured ? '' : 'line-clamp-3'}`}>
            {project.description}
          </p>
          <ul aria-label={`${project.name} technology stack`} className="mt-4 flex flex-wrap gap-1.5">
            {shown.map((s) => (
              <li key={s} className="rounded-md border border-white/10 bg-white/[0.04] px-2 py-1 font-mono text-[10px] tracking-wide text-slate-300">
                {s}
              </li>
            ))}
            {project.stack.length > shown.length && (
              <li className="rounded-md px-2 py-1 font-mono text-[10px] text-slate-500">
                +{project.stack.length - shown.length} more
              </li>
            )}
          </ul>
          <div className="mt-5 flex flex-wrap items-center gap-3 border-t border-white/10 pt-5">
            <LinkButtons project={project} />
            <button
              type="button"
              onClick={onOpen}
              className="ml-auto text-xs font-semibold tracking-wider text-cyan-300/90 transition hover:text-white"
              aria-label={`Open ${project.name} case study`}
            >
              CASE STUDY →
            </button>
          </div>
        </div>
      </article>
    </Reveal>
  );
}

const CASE_FIELDS: { key: keyof Project['caseStudy']; label: string }[] = [
  { key: 'problem', label: 'PROBLEM' },
  { key: 'concept', label: 'CONCEPT' },
  { key: 'solution', label: 'SOLUTION' },
  { key: 'architecture', label: 'ARCHITECTURE' },
  { key: 'challenges', label: 'ENGINEERING CHALLENGES' },
  { key: 'implementation', label: 'IMPLEMENTATION' },
  { key: 'deployment', label: 'DEPLOYMENT' },
  { key: 'future', label: 'FUTURE IMPROVEMENTS' },
];

function ProjectModal({ project, onClose }: { project: Project | null; onClose: () => void }) {
  const reduced = usePrefersReducedMotion();
  return (
    <AnimatePresence>
      {project && (
        <motion.div
          className="fixed inset-0 z-[80] flex items-end justify-center p-0 sm:items-center sm:p-6"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          role="dialog"
          aria-modal="true"
          aria-label={`${project.name} case study`}
        >
          <div className="absolute inset-0 bg-black/75 backdrop-blur-sm" onClick={onClose} aria-hidden />
          <motion.div
            initial={reduced ? { opacity: 0 } : { opacity: 0, y: 60, scale: 0.97 }}
            animate={reduced ? { opacity: 1 } : { opacity: 1, y: 0, scale: 1 }}
            exit={reduced ? { opacity: 0 } : { opacity: 0, y: 40, scale: 0.98 }}
            transition={{ duration: 0.35, ease: 'easeOut' }}
            className="glass relative max-h-[88vh] w-full max-w-2xl overflow-y-auto rounded-t-3xl p-6 sm:rounded-3xl sm:p-8"
          >
            <button
              type="button"
              onClick={onClose}
              aria-label="Close case study"
              className="absolute right-4 top-4 grid h-9 w-9 place-items-center rounded-full border border-white/15 text-slate-300 hover:text-white"
            >
              <X className="h-4 w-4" aria-hidden />
            </button>
            <p className="font-mono text-[11px] tracking-[0.35em] text-cyan-300">
              PROJECT {project.index} · {project.category}
            </p>
            <h3 className="font-display mt-2 pr-10 text-2xl font-bold text-white">{project.name}</h3>
            {project.demoDataNotice && (
              <p role="note" className="mt-3 rounded-lg border border-amber-200/30 bg-amber-300/[0.08] px-3 py-2 font-mono text-[10px] tracking-wider text-amber-100/90">
                {project.demoDataNotice}
              </p>
            )}
            <dl className="mt-5 space-y-4">
              {CASE_FIELDS.map(({ key, label }) => (
                <div key={key} className="rounded-xl border border-white/10 bg-white/[0.02] p-4">
                  <dt className="font-display text-[11px] font-semibold tracking-[0.25em] text-cyan-200">{label}</dt>
                  <dd className="mt-1.5 text-sm leading-relaxed text-slate-300">{project.caseStudy[key]}</dd>
                </div>
              ))}
            </dl>
            <h4 className="font-display mt-6 text-xs font-semibold tracking-[0.25em] text-white">KEY CAPABILITIES</h4>
            <ul className="mt-3 grid grid-cols-1 gap-2 sm:grid-cols-2">
              {project.features.map((f) => (
                <li key={f} className="flex gap-2.5 rounded-lg border border-white/10 bg-white/[0.03] px-3 py-2 text-[13px] text-slate-300">
                  <span aria-hidden className="mt-[7px] h-1.5 w-1.5 shrink-0 rounded-full" style={{ background: project.accent }} />
                  {f}
                </li>
              ))}
            </ul>
            <h4 className="font-display mt-6 text-xs font-semibold tracking-[0.25em] text-white">TECHNOLOGY</h4>
            <ul className="mt-3 flex flex-wrap gap-1.5">
              {project.stack.map((s) => (
                <li key={s} className="rounded-md border border-white/10 bg-white/[0.04] px-2.5 py-1 font-mono text-[11px] text-slate-200">
                  {s}
                </li>
              ))}
            </ul>
            <div className="mt-6 flex flex-wrap gap-3">
              <LinkButtons project={project} large />
            </div>
          </motion.div>
        </motion.div>
      )}
    </AnimatePresence>
  );
}

export function Projects() {
  const [openId, setOpenId] = useState<string | null>(null);
  const open = PROJECTS.find((p) => p.id === openId) ?? null;
  const [flagship, ...rest] = PROJECTS;

  return (
    <section id="projects" aria-label="Projects" className="relative scroll-mt-24 py-24 sm:py-32">
      <div className="section-shell">
        <SectionHeading
          index="06"
          eyebrow="Projects"
          title={<>PROJECT <span className="text-gradient">COMMAND CENTER</span></>}
          lede="Twelve builds in showcase order — flagship DRISHTI-X systems, full-stack platforms, 3D/WebGL experiences and honest experiments. Every card states its context (prototype, experiment, demo data); open any case study for the full breakdown."
        />
        <div className="grid gap-6 md:grid-cols-2">
          {flagship && <ProjectCard project={flagship} onOpen={() => setOpenId(flagship.id)} featured />}
          {rest.map((p) => (
            <ProjectCard key={p.id} project={p} onOpen={() => setOpenId(p.id)} />
          ))}
          {/* GitHub CTA tile */}
          <Reveal className="h-full">
            <a
              href={SOCIAL.github}
              target="_blank"
              rel="noreferrer"
              className="holo-border group flex h-full min-h-[280px] flex-col items-center justify-center rounded-2xl p-8 text-center transition-transform duration-300 hover:-translate-y-1.5"
              aria-label="Explore all repositories on GitHub"
            >
              <span className="grid h-14 w-14 place-items-center rounded-full border border-white/15 bg-white/5 transition group-hover:border-cyan-300/50">
                <GithubIcon className="h-6 w-6 text-cyan-200" />
              </span>
              <span className="font-display mt-5 text-lg font-bold tracking-wide text-white">
                EXPLORE GITHUB
              </span>
              <span className="mt-2 max-w-xs text-sm text-slate-400">
                24 public repositories per the supplied profile analysis — AI/ML, full-stack, 3D/WebGL, GIS and experiments.
              </span>
              <span className="mt-4 inline-flex items-center gap-2 font-mono text-[11px] tracking-[0.25em] text-cyan-300">
                OPEN PROFILE <ExternalLink className="h-3.5 w-3.5" aria-hidden />
              </span>
            </a>
          </Reveal>
        </div>
      </div>
      <ProjectModal project={open} onClose={() => setOpenId(null)} />
    </section>
  );
}
