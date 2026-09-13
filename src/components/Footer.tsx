import { ArrowUp, Mail } from 'lucide-react';
import { PROFILE } from '../data/profile';
import { SOCIAL } from '../data/social';
import { GithubIcon, LinkedinIcon } from './icons';

export function Footer() {
  return (
    <footer className="relative border-t border-white/10 pb-10 pt-14" aria-label="Footer">
      <div
        aria-hidden
        className="pointer-events-none absolute inset-x-0 top-0 h-px bg-gradient-to-r from-transparent via-cyan-300/60 to-transparent"
      />
      <div className="section-shell text-center">
        <p className="font-display text-sm font-bold tracking-[0.2em] text-white">
          {PROFILE.name}
        </p>
        <p className="mt-2 text-xs text-slate-300">{PROFILE.positioning}</p>
        <p className="mt-1 font-mono text-[11px] tracking-[0.2em] text-slate-500">
          AI • ML • GENERATIVE AI • FULL STACK • 3D/WEBGL
        </p>
        <div className="mt-6 flex items-center justify-center gap-3">
          {[
            { icon: GithubIcon, href: SOCIAL.github, label: 'GitHub' },
            { icon: LinkedinIcon, href: SOCIAL.linkedin, label: 'LinkedIn' },
            { icon: Mail, href: `mailto:${PROFILE.email}`, label: 'Email' },
          ].map(({ icon: Icon, href, label }) => (
            <a
              key={label}
              href={href}
              target={href.startsWith('mailto') ? undefined : '_blank'}
              rel={href.startsWith('mailto') ? undefined : 'noreferrer'}
              aria-label={label}
              className="glass grid h-10 w-10 place-items-center rounded-full text-slate-300 transition hover:-translate-y-1 hover:text-cyan-200"
            >
              <Icon className="h-4 w-4" aria-hidden />
            </a>
          ))}
        </div>
        <p className="mx-auto mt-6 max-w-md text-xs italic leading-relaxed text-slate-500">
          “{PROFILE.philosophy}”
        </p>
        <div className="mt-8 flex flex-col items-center justify-between gap-4 border-t border-white/5 pt-6 sm:flex-row">
          <p className="font-mono text-[11px] tracking-wider text-slate-500">
            © 2026{' '}
            {PROFILE.name
              .split(' ')
              .map((w) => w.charAt(0) + w.slice(1).toLowerCase())
              .join(' ')}
          </p>
          <a
            href="#home"
            className="inline-flex items-center gap-2 font-mono text-[11px] tracking-[0.25em] text-slate-400 transition hover:text-cyan-200"
            aria-label="Back to top"
          >
            BACK TO TOP <ArrowUp className="h-3.5 w-3.5" aria-hidden />
          </a>
        </div>
      </div>
    </footer>
  );
}
