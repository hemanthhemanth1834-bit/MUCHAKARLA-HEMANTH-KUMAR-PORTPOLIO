import { Award, BadgeCheck, Medal } from 'lucide-react';
import { CERTIFICATIONS, type Certification } from '../data/certifications';
import { Reveal, SectionHeading } from './ui';

const KIND_META: Record<Certification['kind'], { label: string; icon: typeof Award }> = {
  selection: { label: 'CERTIFICATE OF SELECTION', icon: Medal },
  simulation: { label: 'JOB SIMULATION', icon: BadgeCheck },
  course: { label: 'COURSE / TRAINING', icon: Award },
  event: { label: 'EVENT', icon: Award },
};

export function Certifications() {
  return (
    <section id="certifications" aria-label="Certifications" className="relative scroll-mt-24 py-24 sm:py-32">
      <div className="section-shell">
        <SectionHeading
          index="09"
          eyebrow="Certifications"
          title={<>VERIFIED <span className="text-gradient">CREDENTIALS</span></>}
          lede="Every verified certification and training entry. Organization, date and certificate number appear only where verified — nothing is claimed beyond documentation."
        />
        <div className="grid gap-5 sm:grid-cols-2">
          {CERTIFICATIONS.map((c, i) => {
            const meta = KIND_META[c.kind];
            return (
              <Reveal key={c.title} delay={(i % 2) * 100}>
                <article className="glass group flex h-full items-start gap-4 rounded-2xl p-6 transition-all hover:-translate-y-1 hover:border-amber-200/40">
                  <span className="grid h-11 w-11 shrink-0 place-items-center rounded-xl border border-amber-200/30 bg-amber-300/10 transition group-hover:scale-105">
                    <meta.icon className="h-5 w-5 text-amber-200" aria-hidden />
                  </span>
                  <div className="min-w-0">
                    <p className="font-mono text-[10px] tracking-[0.28em] text-amber-200/80">{meta.label}</p>
                    <h3 className="font-display mt-1.5 text-sm font-semibold leading-snug tracking-wide text-white">
                      {c.title}
                    </h3>
                    {c.org && <p className="mt-1.5 text-xs text-slate-400">{c.org}</p>}
                    <p className="mt-2 font-mono text-[10px] tracking-[0.2em] text-slate-500">
                      CERT_{String(i + 1).padStart(2, '0')} // EARNED
                      {c.date ? ` · ${c.date.toUpperCase()}` : ''}
                      {c.certNo ? ` · NO: ${c.certNo.toUpperCase()}` : ''}
                    </p>
                  </div>
                </article>
              </Reveal>
            );
          })}
        </div>
      </div>
    </section>
  );
}
