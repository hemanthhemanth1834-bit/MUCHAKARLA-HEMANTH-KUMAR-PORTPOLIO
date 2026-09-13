import { ArrowDown, Database, Globe, Layers, Server, Sparkles, User } from 'lucide-react';
import { Reveal, SectionHeading } from './ui';

const LAYERS = [
  {
    icon: User,
    name: 'USER',
    desc: 'Citizens, recruiters, admins — any browser, any device, with PWA/offline where built.',
    tech: ['Responsive UI', 'Accessibility', 'PWA'],
  },
  {
    icon: Layers,
    name: 'FRONTEND',
    desc: 'Interfaces that carry the experience: from React apps to immersive 3D scenes.',
    tech: ['React', 'Next.js', 'TypeScript', 'Tailwind CSS', 'Three.js', 'Framer Motion'],
  },
  {
    icon: Server,
    name: 'API / APPLICATION LAYER',
    desc: 'Validated, authenticated services connecting interface to intelligence and data.',
    tech: ['Node.js', 'Express', 'FastAPI', 'REST APIs', 'WebSockets', 'Zod'],
  },
  {
    icon: Sparkles,
    name: 'AI / ML SERVICES',
    desc: 'Models and assistants: classification, matching, copilots and decision support.',
    tech: ['Python', 'Scikit-style ML', 'NLP', 'Cosine Similarity', 'Rule-based Copilots', 'Ollama (optional)'],
  },
  {
    icon: Database,
    name: 'DATABASE',
    desc: 'Relational persistence with type-safe access and server-side validation.',
    tech: ['PostgreSQL', 'SQLite', 'Prisma', 'Relational Design'],
  },
  {
    icon: Globe,
    name: 'DEPLOYMENT',
    desc: 'Production builds shipped to the web with preview and CI workflows.',
    tech: ['Vercel', 'Netlify', 'GitHub Pages', 'Render', 'CI/CD'],
  },
];

/**
 * Conceptual system architecture shared across the portfolio's builds —
 * animated flow, recruiter-readable, no fabricated per-project claims.
 */
export function Architecture() {
  return (
    <section id="architecture" aria-label="Technical architecture" className="relative scroll-mt-24 py-24 sm:py-32">
      <div className="section-shell">
        <SectionHeading
          index="07"
          eyebrow="Architecture"
          title={<>HOW THE SYSTEMS <span className="text-gradient">FIT TOGETHER</span></>}
          lede="The conceptual blueprint behind the projects on this page — from user to deployment. Simplified for recruiters; each case study carries the project-specific truth."
        />
        <ol className="mx-auto max-w-3xl">
          {LAYERS.map((l, i) => (
            <li key={l.name} className="relative">
              <Reveal delay={Math.min(i, 4) * 60}>
                <article className="glass flex gap-4 rounded-2xl p-5 transition-colors hover:border-cyan-300/40 sm:gap-5 sm:p-6">
                  <span className="grid h-11 w-11 shrink-0 place-items-center rounded-xl border border-cyan-300/30 bg-cyan-400/10">
                    <l.icon className="h-5 w-5 text-cyan-300" aria-hidden />
                  </span>
                  <div className="min-w-0 flex-1">
                    <div className="flex flex-wrap items-center gap-3">
                      <h3 className="font-display text-sm font-bold tracking-[0.2em] text-white">{l.name}</h3>
                      <span className="font-mono text-[10px] text-slate-500">LAYER 0{i + 1}</span>
                    </div>
                    <p className="mt-1.5 text-sm leading-relaxed text-slate-400">{l.desc}</p>
                    <ul aria-label={`${l.name} technologies`} className="mt-3 flex flex-wrap gap-1.5">
                      {l.tech.map((t) => (
                        <li key={t} className="rounded-md border border-white/10 bg-white/[0.04] px-2 py-1 font-mono text-[10px] text-slate-300">
                          {t}
                        </li>
                      ))}
                    </ul>
                  </div>
                </article>
              </Reveal>
              {i < LAYERS.length - 1 && (
                <div aria-hidden className="flex justify-center py-1.5">
                  <span className="grid h-8 w-8 place-items-center rounded-full border border-cyan-300/30 bg-[#04070f]">
                    <ArrowDown className="status-dot h-3.5 w-3.5 text-cyan-300" />
                  </span>
                </div>
              )}
            </li>
          ))}
        </ol>
      </div>
    </section>
  );
}
