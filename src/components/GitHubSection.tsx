import { ExternalLink, FolderGit2, Mail, Star } from 'lucide-react';
import { useEffect, useState } from 'react';
import { DIGITAL_PRESENCE, SOCIAL } from '../data/social';
import { fetchPublicRepos, type RepoInfo } from '../lib/github';
import { GithubIcon, LinkedinIcon } from './icons';
import { Reveal, SectionHeading } from './ui';

const PRESENCE_ICONS = { github: GithubIcon, linkedin: LinkedinIcon, email: Mail } as const;

export function GitHubSection() {
  const [repos, setRepos] = useState<RepoInfo[]>([]);
  const [live, setLive] = useState(false);
  const [totalCount, setTotalCount] = useState<number | null>(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const ctrl = new AbortController();
    fetchPublicRepos(ctrl.signal).then(({ repos, live, totalCount }) => {
      setRepos(repos);
      setLive(live);
      setTotalCount(totalCount);
      setLoading(false);
    });
    return () => ctrl.abort();
  }, []);

  const countLabel =
    live && totalCount !== null
      ? `${totalCount} public repositories (live verified count)`
      : '24 public repositories (per supplied profile analysis)';

  return (
    <section id="github" aria-label="GitHub and digital presence" className="relative scroll-mt-24 py-24 sm:py-32">
      <div className="section-shell">
        <SectionHeading
          index="11"
          eyebrow="GitHub · Digital Presence"
          title={<>OPEN WORK, <span className="text-gradient">OPEN PROOF</span></>}
          lede={`Public work on GitHub — ${countLabel}. ${live ? 'Showing the live feed.' : 'Offline snapshot shown; connect to refresh live data.'} No token required, nothing private exposed.`}
        />
        {loading ? (
          <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-4" aria-hidden>
            {Array.from({ length: 4 }).map((_, i) => (
              <div key={i} className="glass h-40 animate-pulse rounded-2xl" />
            ))}
          </div>
        ) : (
          <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-4">
            {repos.slice(0, 8).map((r, i) => (
              <Reveal key={r.name + i} delay={Math.min(i, 4) * 70} className="h-full">
                <a
                  href={r.url}
                  target="_blank"
                  rel="noreferrer"
                  className="glass group flex h-full flex-col rounded-2xl p-5 transition-all hover:-translate-y-1 hover:border-cyan-300/40"
                  aria-label={`${r.name} on GitHub${r.description ? ` — ${r.description}` : ''}`}
                >
                  <span className="flex items-center justify-between">
                    <FolderGit2 className="h-5 w-5 text-cyan-300" aria-hidden />
                    <ExternalLink className="h-3.5 w-3.5 text-slate-500 transition group-hover:text-cyan-200" aria-hidden />
                  </span>
                  <span className="font-display mt-3 truncate text-sm font-semibold text-white" title={r.name}>
                    {r.name}
                  </span>
                  <span className="mt-1.5 line-clamp-2 flex-1 text-xs leading-relaxed text-slate-400">
                    {r.description ?? 'Public repository — see GitHub for details.'}
                  </span>
                  <span className="mt-3 flex items-center gap-3 font-mono text-[10px] tracking-wider text-slate-500">
                    {r.language && <span className="text-cyan-200/80">{r.language}</span>}
                    {r.stars > 0 && (
                      <span className="inline-flex items-center gap-1">
                        <Star className="h-3 w-3" aria-hidden /> {r.stars}
                      </span>
                    )}
                  </span>
                </a>
              </Reveal>
            ))}
          </div>
        )}

        {/* Digital presence hub — verified profiles only */}
        <div className="mt-10 grid gap-4 md:grid-cols-3">
          {DIGITAL_PRESENCE.map((d, i) => {
            const Icon = PRESENCE_ICONS[d.id as keyof typeof PRESENCE_ICONS];
            const external = d.url.startsWith('http');
            return (
              <Reveal key={d.id} delay={i * 90} className="h-full">
                <a
                  href={d.url}
                  target={external ? '_blank' : undefined}
                  rel={external ? 'noreferrer' : undefined}
                  className="glass group flex h-full items-start gap-4 rounded-2xl p-6 transition-all hover:-translate-y-1 hover:border-cyan-300/40"
                  aria-label={`${d.name} — ${d.handle}`}
                >
                  <span className="grid h-11 w-11 shrink-0 place-items-center rounded-xl border border-white/10 bg-white/5 transition group-hover:border-cyan-300/40">
                    <Icon className="h-5 w-5 text-cyan-300" />
                  </span>
                  <span>
                    <span className="font-mono text-[10px] tracking-[0.3em] text-slate-500">
                      {d.name.toUpperCase()}
                    </span>
                    <span className="font-display mt-1 block truncate text-sm font-semibold text-white" title={d.handle}>
                      {d.handle}
                    </span>
                    <span className="mt-1 block text-xs leading-relaxed text-slate-400">{d.description}</span>
                  </span>
                </a>
              </Reveal>
            );
          })}
        </div>

        <Reveal delay={120}>
          <div className="mt-8 text-center">
            <a
              href={SOCIAL.github}
              target="_blank"
              rel="noreferrer"
              className="glow-btn inline-flex items-center gap-2 rounded-full bg-gradient-to-r from-[#2f7bff] to-[#22d3ee] px-8 py-3.5 font-display text-xs font-semibold tracking-[0.22em] text-white transition hover:brightness-110"
            >
              <GithubIcon className="h-4 w-4" /> EXPLORE GITHUB
            </a>
          </div>
        </Reveal>
      </div>
    </section>
  );
}
