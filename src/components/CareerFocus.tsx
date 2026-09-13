import { Briefcase, MapPin, Target } from 'lucide-react';
import { PROFILE, TARGET_ROLES, JOB_PREFERENCES } from '../data/profile';
import { PROJECTS } from '../data/projects';
import { SOCIAL } from '../data/social';
import { Reveal, SectionHeading } from './ui';

/**
 * Career focus: target roles, honest highlights derived from page data,
 * and quietly-kept job preferences. No inflated numbers anywhere.
 */
export function CareerFocus() {
  const internships = 8; // verified entries on the Experience timeline
  const simulations = 2; // verified Forage simulations
  const liveDemos = PROJECTS.filter((p) => p.liveUrl).length + 1; // + verified Password Generator demo

  return (
    <section id="career" aria-label="Career focus" className="relative scroll-mt-24 py-24 sm:py-32">
      <div className="section-shell">
        <SectionHeading
          index="12"
          eyebrow="Career Focus"
          title={<>WHERE I'M <span className="text-gradient">HEADED</span></>}
          lede="Roles I am preparing for through internships, simulations and shipped work — plus the honest record behind the ambition."
        />

        {/* honest highlights */}
        <div className="grid gap-5 sm:grid-cols-2 lg:grid-cols-4">
          {[
            { v: String(internships), l: 'INTERNSHIPS', n: 'AI/ML · web · full-stack' },
            { v: String(simulations), l: 'JOB SIMULATIONS', n: 'Tata · Deloitte (Forage)' },
            { v: `${liveDemos}`, l: 'VERIFIED LIVE DEMOS', n: 'Production URLs on this page' },
            { v: '24', l: 'PUBLIC REPOSITORIES', n: 'Per supplied GitHub analysis' },
          ].map((h, i) => (
            <Reveal key={h.l} delay={i * 80}>
              <div className="holo-border rounded-2xl p-6 text-center">
                <p className="font-display text-4xl font-bold text-white sm:text-5xl">{h.v}</p>
                <p className="font-display mt-2 text-[11px] font-semibold tracking-[0.22em] text-cyan-200">{h.l}</p>
                <p className="mt-1 text-xs text-slate-500">{h.n}</p>
              </div>
            </Reveal>
          ))}
        </div>

        <div className="mt-8 grid gap-6 lg:grid-cols-[1.4fr_1fr]">
          <Reveal>
            <article className="glass h-full rounded-2xl p-6 sm:p-8">
              <h3 className="font-display flex items-center gap-2.5 text-sm font-bold tracking-[0.22em] text-white">
                <Target className="h-4 w-4 text-cyan-300" aria-hidden /> TARGET ROLES
              </h3>
              <ul aria-label="Target roles" className="mt-5 flex flex-wrap gap-2">
                {TARGET_ROLES.map((r) => (
                  <li
                    key={r}
                    className="rounded-full border border-white/10 bg-white/[0.03] px-3.5 py-1.5 text-xs text-slate-200 transition hover:-translate-y-0.5 hover:border-cyan-300/50 hover:text-white"
                  >
                    {r}
                  </li>
                ))}
              </ul>
            </article>
          </Reveal>
          <Reveal delay={120}>
            <article className="glass h-full rounded-2xl p-6 sm:p-8">
              <h3 className="font-display flex items-center gap-2.5 text-sm font-bold tracking-[0.22em] text-white">
                <Briefcase className="h-4 w-4 text-cyan-300" aria-hidden /> OPEN TO
              </h3>
              <p className="mt-4 inline-flex items-center gap-2 text-sm text-slate-300">
                <MapPin className="h-4 w-4 text-cyan-300/70" aria-hidden /> {PROFILE.location}
              </p>
              <p className="mt-3 text-xs leading-relaxed text-slate-500">
                {JOB_PREFERENCES.geography.join(' · ')}
              </p>
              <p className="mt-4 border-t border-white/10 pt-4 text-xs leading-relaxed text-slate-500">
                {JOB_PREFERENCES.interestedIn.join(' · ')}
              </p>
              <a
                href={SOCIAL.linkedin}
                target="_blank"
                rel="noreferrer"
                className="mt-5 inline-flex items-center gap-2 font-mono text-[11px] tracking-[0.25em] text-cyan-300 transition hover:text-white"
              >
                CONNECT ON LINKEDIN →
              </a>
            </article>
          </Reveal>
        </div>
      </div>
    </section>
  );
}
