import { Award, Briefcase, CalendarDays, FlaskConical } from 'lucide-react';
import { EXPERIENCES, type Experience as Exp } from '../data/experience';
import { Reveal, SectionHeading } from './ui';

function TimelineList({ items, startIndex }: { items: Exp[]; startIndex: number }) {
  return (
    <ol className="relative ml-2 border-l border-cyan-300/20 pl-0 sm:ml-4">
      {items.map((e, i) => (
        <li key={`${e.org}-${e.role}-${i}`} className="relative pb-10 pl-8 last:pb-0 sm:pl-12">
          <span aria-hidden className="absolute -left-[7px] top-1 flex items-center justify-center">
            <span
              className={`h-3.5 w-3.5 rounded-full border-2 bg-[#04070f] ${
                e.kind === 'internship' ? 'border-cyan-300' : 'border-violet-300'
              }`}
              style={{
                boxShadow:
                  e.kind === 'internship'
                    ? '0 0 14px rgba(34,211,238,0.7)'
                    : '0 0 14px rgba(167,139,250,0.7)',
              }}
            />
          </span>
          {i < items.length - 1 && (
            <span
              aria-hidden
              className="absolute -left-px top-6 h-[calc(100%-1rem)] w-px bg-gradient-to-b from-cyan-300/50 to-transparent"
            />
          )}
          <Reveal delay={Math.min(i, 3) * 70}>
            <article className="glass group rounded-2xl p-6 transition-colors hover:border-cyan-300/40 sm:p-7">
              <div className="flex flex-wrap items-center gap-2">
                <span
                  className={`rounded-full border px-3 py-1 font-mono text-[10px] tracking-[0.25em] ${
                    e.kind === 'internship'
                      ? 'border-cyan-300/40 bg-cyan-400/10 text-cyan-200'
                      : 'border-violet-400/40 bg-violet-500/10 text-violet-200'
                  }`}
                >
                  {e.kind === 'internship' ? 'INTERNSHIP' : 'JOB SIMULATION — FORAGE'}
                </span>
                <span className="inline-flex items-center gap-1.5 font-mono text-[11px] tracking-wider text-slate-400">
                  <CalendarDays className="h-3.5 w-3.5 text-cyan-300/70" aria-hidden />
                  {e.period}
                </span>
              </div>
              <h3 className="font-display mt-3 text-lg font-bold tracking-wide text-white sm:text-xl">
                {e.org}
              </h3>
              <p className="mt-1 inline-flex items-center gap-2 text-sm font-medium text-cyan-200">
                <Briefcase className="h-4 w-4" aria-hidden />
                {e.role}
              </p>
              {e.meta && (
                <ul aria-label="Credentials" className="mt-3 flex flex-wrap gap-2">
                  {e.meta.map((m) => (
                    <li
                      key={m}
                      className="inline-flex items-center gap-1.5 rounded-md border border-amber-200/25 bg-amber-300/[0.07] px-2.5 py-1 font-mono text-[10px] tracking-wider text-amber-100/90"
                    >
                      <Award className="h-3 w-3" aria-hidden />
                      {m}
                    </li>
                  ))}
                </ul>
              )}
              <ul className="mt-4 space-y-2.5">
                {e.points.map((p) => (
                  <li key={p} className="flex gap-3 text-sm leading-relaxed text-slate-400">
                    <span aria-hidden className="mt-[7px] h-1.5 w-1.5 shrink-0 rounded-full bg-cyan-300/80" />
                    {p}
                  </li>
                ))}
              </ul>
              {e.tools && (
                <p className="mt-4 font-mono text-[11px] tracking-wider text-slate-500">
                  TOOLS: <span className="text-slate-300">{e.tools.join(' · ')}</span>
                </p>
              )}
              <p className="mt-3 font-mono text-[10px] tracking-[0.3em] text-slate-600">
                ENTRY {String(startIndex + i + 1).padStart(2, '0')} // VERIFIED
              </p>
            </article>
          </Reveal>
        </li>
      ))}
    </ol>
  );
}

export function Experience() {
  const internships = EXPERIENCES.filter((e) => e.kind === 'internship');
  const simulations = EXPERIENCES.filter((e) => e.kind === 'simulation');

  return (
    <section id="experience" aria-label="Experience" className="relative scroll-mt-24 py-24 sm:py-32">
      <div className="section-shell">
        <SectionHeading
          index="05"
          eyebrow="Experience"
          title={<>MISSION <span className="text-gradient">LOG</span></>}
          lede="Every organization shown independently, in supplied-date order. Internships and Forage job simulations are strictly separated — real programs, honestly described, never exaggerated."
        />

        <div className="mb-6 flex items-center gap-3">
          <Briefcase className="h-5 w-5 text-cyan-300" aria-hidden />
          <h3 className="font-display text-sm font-bold tracking-[0.25em] text-white">
            INTERNSHIPS <span className="text-slate-500">({internships.length})</span>
          </h3>
        </div>
        <TimelineList items={internships} startIndex={0} />

        <div className="mb-6 mt-14 flex items-center gap-3">
          <FlaskConical className="h-5 w-5 text-violet-300" aria-hidden />
          <h3 className="font-display text-sm font-bold tracking-[0.25em] text-white">
            JOB SIMULATIONS <span className="text-slate-500">({simulations.length})</span>
          </h3>
        </div>
        <TimelineList items={simulations} startIndex={internships.length} />
      </div>
    </section>
  );
}
