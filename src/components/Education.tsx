import { GraduationCap, MapPin, School } from 'lucide-react';
import { EDUCATION } from '../data/education';
import { PROFILE } from '../data/profile';
import { Reveal, SectionHeading, TiltCard } from './ui';

export function Education() {
  const [degree, pre] = EDUCATION;
  return (
    <section id="education" aria-label="Education" className="relative scroll-mt-24 py-24 sm:py-32">
      <div className="section-shell">
        <SectionHeading
          index="08"
          eyebrow="Education"
          title={<>ACADEMIC <span className="text-gradient">CORE</span></>}
          lede="Both education entries, preserved exactly as supplied."
        />
        <div className="grid gap-6 lg:grid-cols-[1.5fr_1fr]">
          <Reveal>
            <TiltCard glow="rgba(47,123,255,0.3)" className="h-full overflow-hidden">
              <div className="grid h-full md:grid-cols-[1fr_220px]">
                <div className="p-7 sm:p-9">
                  <div className="flex flex-wrap items-center gap-3">
                    <span className="grid h-12 w-12 place-items-center rounded-xl border border-cyan-300/30 bg-cyan-400/10">
                      <GraduationCap className="h-6 w-6 text-cyan-300" aria-hidden />
                    </span>
                    <span className="rounded-full border border-emerald-300/40 bg-emerald-400/10 px-3 py-1 font-mono text-[10px] tracking-[0.25em] text-emerald-200">
                      {degree!.period} // IN PROGRESS
                    </span>
                  </div>
                  <h3 className="font-display mt-5 text-xl font-bold tracking-wide text-white sm:text-2xl">
                    {degree!.institution.toUpperCase()}
                  </h3>
                  <p className="mt-3 text-base font-semibold text-cyan-100">{degree!.program}</p>
                  <p className="mt-3 max-w-xl text-sm leading-relaxed text-slate-400">{degree!.detail}</p>
                  <p className="mt-3 font-mono text-[11px] tracking-[0.2em] text-slate-500">
                    {degree!.status}
                  </p>
                  <p className="mt-4 inline-flex items-center gap-2 text-xs text-slate-500">
                    <MapPin className="h-3.5 w-3.5" aria-hidden /> {PROFILE.location}
                  </p>
                </div>
                {/* holographic visual */}
                <div
                  aria-hidden
                  className="relative hidden min-h-[240px] items-center justify-center overflow-hidden border-l border-white/10 md:flex"
                  style={{ background: 'radial-gradient(circle at 50% 55%, rgba(47,123,255,0.2), transparent 70%)' }}
                >
                  <div className="grid-bg absolute inset-0" />
                  <div className="relative flex h-40 w-40 items-center justify-center">
                    <div className="absolute inset-0 rounded-full border border-dashed border-cyan-300/40" />
                    <div className="absolute inset-4 rounded-full border border-violet-400/40" />
                    <div className="absolute inset-9 rounded-full bg-gradient-to-br from-[#2f7bff] to-[#22d3ee]" style={{ boxShadow: '0 0 40px rgba(47,123,255,0.5)' }} />
                    <GraduationCap className="relative h-7 w-7 text-white" />
                  </div>
                  <span className="absolute bottom-4 font-mono text-[10px] tracking-[0.35em] text-cyan-200/60">
                    KNOWLEDGE.SYS
                  </span>
                </div>
              </div>
            </TiltCard>
          </Reveal>
          <Reveal delay={120}>
            <article className="glass flex h-full flex-col justify-center rounded-2xl p-7 transition-colors hover:border-cyan-300/40 sm:p-8">
              <span className="grid h-12 w-12 place-items-center rounded-xl border border-violet-300/30 bg-violet-400/10">
                <School className="h-6 w-6 text-violet-300" aria-hidden />
              </span>
              <p className="mt-5 font-mono text-[11px] tracking-[0.3em] text-violet-200">
                {pre!.period.toUpperCase()}
              </p>
              <h3 className="font-display mt-2 text-lg font-bold text-white">{pre!.institution}</h3>
              <p className="mt-1 text-sm font-medium text-slate-300">{pre!.program}</p>
              <p className="mt-3 text-sm leading-relaxed text-slate-400">{pre!.detail}</p>
              <p className="mt-3 font-mono text-[11px] tracking-[0.2em] text-slate-500">{pre!.status}</p>
            </article>
          </Reveal>
        </div>
      </div>
    </section>
  );
}
