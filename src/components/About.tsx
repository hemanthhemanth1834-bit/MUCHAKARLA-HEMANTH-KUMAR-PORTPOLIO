import { BarChart3, Boxes, BrainCircuit, Code2 } from 'lucide-react';
import { PROFILE } from '../data/profile';
import { Reveal, SectionHeading, TiltCard } from './ui';

const CARDS = [
  {
    icon: BrainCircuit,
    title: 'AI / MACHINE LEARNING',
    text: 'Artificial Intelligence, Machine Learning, Generative AI, NLP and AI assistants — from Python ML models to AI-powered applications.',
    glow: 'rgba(139,92,246,0.28)',
  },
  {
    icon: Code2,
    title: 'FULL-STACK ENGINEERING',
    text: 'Python, Java, JavaScript, TypeScript, React, Next.js, Node.js, Express, FastAPI, PostgreSQL and REST APIs — deployed to production.',
    glow: 'rgba(47,123,255,0.28)',
  },
  {
    icon: BarChart3,
    title: 'DATA & ANALYTICS',
    text: 'Data cleaning, exploratory analysis, visualization, executive dashboards and BI storytelling with Excel, Python, Tableau and Power BI.',
    glow: 'rgba(34,211,238,0.25)',
  },
  {
    icon: Boxes,
    title: '3D / WEBGL & GIS',
    text: 'Immersive Three.js / WebGL scenes, digital twins, particle systems, holographic UI and Leaflet/OpenStreetMap location intelligence.',
    glow: 'rgba(52,211,153,0.22)',
  },
];

export function About() {
  return (
    <section id="about" aria-label="About" className="relative scroll-mt-24 py-24 sm:py-32">
      <div className="section-shell">
        <SectionHeading
          index="03"
          eyebrow="About"
          title={<>ENGINEERING INTELLIGENCE FOR THE REAL WORLD.</>}
          lede="I am a B.Tech Artificial Intelligence student at SRK Institute of Technology (2024–2028) building practical software and AI systems — with hands-on internships across AI/ML, AI web development and full-stack engineering, data-specialist job simulations, and multiple applications deployed to production URLs. I work across AI/ML, Generative AI, Python, full-stack development, data analytics and 3D/WebGL — and I keep learning in the open."
        />
        <Reveal>
          <blockquote className="glass mb-8 rounded-2xl border-l-2 border-l-cyan-300 p-6 sm:p-7">
            <p className="font-display text-base font-medium leading-relaxed text-white sm:text-lg">
              “{PROFILE.brandStatement}”
            </p>
            <footer className="mt-3 font-mono text-[10px] tracking-[0.3em] text-slate-500">
              {PROFILE.philosophy.toUpperCase()}
            </footer>
          </blockquote>
        </Reveal>
        <div className="grid gap-5 sm:grid-cols-2 xl:grid-cols-4">
          {CARDS.map((c, i) => (
            <Reveal key={c.title} delay={(i % 4) * 90}>
              <TiltCard glow={c.glow} className="h-full p-7">
                <div className="relative">
                  <div
                    className="mb-5 inline-grid h-12 w-12 place-items-center rounded-xl border border-white/10 bg-white/5"
                    aria-hidden
                  >
                    <c.icon className="h-6 w-6 text-cyan-300" />
                  </div>
                  <h3 className="font-display text-[13px] font-semibold tracking-[0.16em] text-white">
                    {c.title}
                  </h3>
                  <p className="mt-3 text-sm leading-relaxed text-slate-400">{c.text}</p>
                  <span
                    aria-hidden
                    className="mt-6 block h-px w-full bg-gradient-to-r from-transparent via-cyan-300/40 to-transparent"
                  />
                  <p className="mt-4 font-mono text-[10px] tracking-[0.3em] text-slate-500">
                    MODULE 0{i + 1} // ACTIVE
                  </p>
                </div>
              </TiltCard>
            </Reveal>
          ))}
        </div>
        <Reveal delay={120}>
          <ul aria-label="Career focus areas" className="mt-8 flex flex-wrap justify-center gap-2">
            {PROFILE.careerFocus.map((f) => (
              <li
                key={f}
                className="rounded-full border border-white/10 bg-white/[0.03] px-4 py-1.5 text-xs text-slate-300"
              >
                {f}
              </li>
            ))}
          </ul>
        </Reveal>
      </div>
    </section>
  );
}
