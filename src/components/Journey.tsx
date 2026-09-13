import { Milestone } from 'lucide-react';
import { JOURNEY } from '../data/education';
import { Reveal, SectionHeading } from './ui';

export function Journey() {
  return (
    <section id="journey" aria-label="Personal development journey" className="relative scroll-mt-24 py-24 sm:py-32">
      <div className="section-shell">
        <SectionHeading
          index="10"
          eyebrow="Journey"
          title={<>ALWAYS LEARNING. <span className="text-gradient">ALWAYS BUILDING.</span></>}
          lede="The path so far — exact verified dates, no invented milestones."
        />
        <ol className="relative mx-auto max-w-3xl">
          <span aria-hidden className="absolute bottom-4 left-[19px] top-4 w-px bg-gradient-to-b from-cyan-300/60 via-violet-400/40 to-transparent" />
          {JOURNEY.map((m, i) => (
            <li key={m.period + m.title} className="relative pb-8 pl-14 last:pb-0">
              <span aria-hidden className="absolute left-[11px] top-1">
                <span className="grid h-[18px] w-[18px] place-items-center rounded-full border-2 border-cyan-300 bg-[#04070f]" style={{ boxShadow: '0 0 12px rgba(34,211,238,0.6)' }}>
                  <Milestone className="h-2 w-2 text-cyan-300" />
                </span>
              </span>
              <Reveal delay={Math.min(i, 3) * 70}>
                <article className="glass rounded-2xl p-5 transition-colors hover:border-cyan-300/40 sm:p-6">
                  <p className="font-mono text-[11px] tracking-[0.3em] text-cyan-300">{m.period.toUpperCase()}</p>
                  <h3 className="font-display mt-1.5 text-base font-bold text-white sm:text-lg">{m.title}</h3>
                  <ul className="mt-2.5 space-y-1.5">
                    {m.points.map((p) => (
                      <li key={p} className="flex gap-2.5 text-sm leading-relaxed text-slate-400">
                        <span aria-hidden className="mt-[7px] h-1.5 w-1.5 shrink-0 rounded-full bg-violet-300/80" />
                        {p}
                      </li>
                    ))}
                  </ul>
                </article>
              </Reveal>
            </li>
          ))}
        </ol>
      </div>
    </section>
  );
}
