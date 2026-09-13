import { LinkedinIcon, GithubIcon } from './icons';
import { Check, Copy, Mail, MapPin, Phone, Send } from 'lucide-react';
import { useState, type FormEvent } from 'react';
import { PROFILE } from '../data/profile';
import { SOCIAL } from '../data/social';
import { MagneticButton, Reveal, SectionHeading } from './ui';

interface Errors {
  name?: string;
  email?: string;
  message?: string;
}

export function Contact() {
  const [name, setName] = useState('');
  const [email, setEmail] = useState('');
  const [message, setMessage] = useState('');
  const [errors, setErrors] = useState<Errors>({});
  const [sent, setSent] = useState(false);
  const [copied, setCopied] = useState(false);

  const copyEmail = async () => {
    try {
      await navigator.clipboard.writeText(PROFILE.email);
      setCopied(true);
      window.setTimeout(() => setCopied(false), 2000);
    } catch {
      // clipboard unavailable — the address is visible to copy manually
    }
  };

  const validate = (): boolean => {
    const e: Errors = {};
    if (name.trim().length < 2) e.name = 'Please enter your name (at least 2 characters).';
    if (!/^[^\s@]+@[^\s@]+\.[^\s@]{2,}$/.test(email.trim()))
      e.email = 'Please enter a valid email address.';
    if (message.trim().length < 10)
      e.message = 'Please write a message of at least 10 characters.';
    setErrors(e);
    return Object.keys(e).length === 0;
  };

  const onSubmit = (ev: FormEvent) => {
    ev.preventDefault();
    setSent(false);
    if (!validate()) return;
    // No backend: hand off to the visitor's email client. Never fake a delivery.
    const subject = encodeURIComponent(`Portfolio contact from ${name.trim()}`);
    const body = encodeURIComponent(`${message.trim()}\n\n— ${name.trim()} (${email.trim()})`);
    window.location.href = `mailto:${PROFILE.email}?subject=${subject}&body=${body}`;
    setSent(true);
  };

  const inputCls = (bad?: string) =>
    `w-full rounded-xl border bg-white/[0.03] px-4 py-3.5 text-sm text-white placeholder:text-slate-500 transition focus:border-cyan-300/70 focus:outline-none ${
      bad ? 'border-red-400/70' : 'border-white/10'
    }`;

  return (
    <section id="contact" aria-label="Contact" className="relative scroll-mt-24 py-24 sm:py-32">
      <div className="section-shell">
        <SectionHeading
          index="13"
          eyebrow="Contact"
          title={<>LET'S BUILD SOMETHING <span className="text-gradient">INTELLIGENT.</span></>}
          lede="Questions, collaboration ideas, internships or feedback — my inbox is open."
        />
        <div className="grid gap-6 lg:grid-cols-[1fr_1.2fr]">
          {/* direct channels */}
          <Reveal>
            <div className="glass flex h-full flex-col gap-3 rounded-2xl p-6 sm:p-8">
              {[
                { icon: Mail, label: 'Email', value: PROFILE.email, href: `mailto:${PROFILE.email}` },
                { icon: Phone, label: 'Phone', value: PROFILE.phone, href: `tel:${PROFILE.phone}` },
                { icon: GithubIcon, label: 'GitHub', value: SOCIAL.github.replace('https://', ''), href: SOCIAL.github },
                { icon: LinkedinIcon, label: 'LinkedIn', value: 'Connect on LinkedIn', href: SOCIAL.linkedin },
              ].map((c) => (
                <a
                  key={c.label}
                  href={c.href}
                  target={c.href.startsWith('http') ? '_blank' : undefined}
                  rel={c.href.startsWith('http') ? 'noreferrer' : undefined}
                  className="group flex items-center gap-4 rounded-xl border border-white/10 bg-white/[0.02] p-4 transition hover:border-cyan-300/40"
                >
                  <span className="grid h-10 w-10 shrink-0 place-items-center rounded-lg border border-white/10 bg-white/5 transition group-hover:border-cyan-300/40">
                    <c.icon className="h-[18px] w-[18px] text-cyan-300" aria-hidden />
                  </span>
                  <span className="min-w-0">
                    <span className="block font-mono text-[10px] tracking-[0.3em] text-slate-500">
                      {c.label.toUpperCase()}
                    </span>
                    <span className="block truncate text-sm font-medium text-slate-200 group-hover:text-white">
                      {c.value}
                    </span>
                  </span>
                </a>
              ))}
              <div className="flex flex-wrap items-center gap-2">
                <button
                  type="button"
                  onClick={copyEmail}
                  className="inline-flex flex-1 items-center justify-center gap-2 rounded-xl border border-cyan-300/40 bg-cyan-400/10 px-4 py-2.5 font-mono text-[11px] tracking-[0.2em] text-cyan-100 transition hover:bg-cyan-400/20"
                  aria-live="polite"
                >
                  {copied ? <Check className="h-3.5 w-3.5" aria-hidden /> : <Copy className="h-3.5 w-3.5" aria-hidden />}
                  {copied ? 'EMAIL COPIED' : 'COPY EMAIL'}
                </button>
                <a
                  href={SOCIAL.linkedin}
                  target="_blank"
                  rel="noreferrer"
                  className="inline-flex flex-1 items-center justify-center gap-2 rounded-xl border border-white/15 px-4 py-2.5 font-mono text-[11px] tracking-[0.2em] text-slate-200 transition hover:border-cyan-300/50 hover:text-white"
                >
                  OPEN LINKEDIN
                </a>
              </div>
              <p className="inline-flex items-center gap-2 text-xs text-slate-500">
                <MapPin className="h-3.5 w-3.5" aria-hidden /> {PROFILE.location}
              </p>
              <p className="mt-2 font-mono text-[10px] leading-relaxed tracking-wider text-slate-500">
                RESPONSE.TIME // USUALLY WITHIN 1–2 DAYS
              </p>
            </div>
          </Reveal>

          {/* form (mailto handoff) */}
          <Reveal delay={120}>
            <form onSubmit={onSubmit} noValidate className="glass h-full rounded-2xl p-6 sm:p-8" aria-label="Contact form">
              <div className="grid gap-5 sm:grid-cols-2">
                <div>
                  <label htmlFor="contact-name" className="mb-2 block font-mono text-[11px] tracking-[0.25em] text-slate-300">
                    NAME *
                  </label>
                  <input
                    id="contact-name"
                    name="name"
                    type="text"
                    autoComplete="name"
                    value={name}
                    onChange={(e) => setName(e.target.value)}
                    placeholder="Your name"
                    aria-invalid={!!errors.name}
                    aria-describedby={errors.name ? 'err-name' : undefined}
                    className={inputCls(errors.name)}
                  />
                  {errors.name && <p id="err-name" role="alert" className="mt-1.5 text-xs text-red-300">{errors.name}</p>}
                </div>
                <div>
                  <label htmlFor="contact-email" className="mb-2 block font-mono text-[11px] tracking-[0.25em] text-slate-300">
                    EMAIL *
                  </label>
                  <input
                    id="contact-email"
                    name="email"
                    type="email"
                    autoComplete="email"
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                    placeholder="you@example.com"
                    aria-invalid={!!errors.email}
                    aria-describedby={errors.email ? 'err-email' : undefined}
                    className={inputCls(errors.email)}
                  />
                  {errors.email && <p id="err-email" role="alert" className="mt-1.5 text-xs text-red-300">{errors.email}</p>}
                </div>
              </div>
              <div className="mt-5">
                <label htmlFor="contact-message" className="mb-2 block font-mono text-[11px] tracking-[0.25em] text-slate-300">
                  MESSAGE *
                </label>
                <textarea
                  id="contact-message"
                  name="message"
                  rows={5}
                  value={message}
                  onChange={(e) => setMessage(e.target.value)}
                  placeholder="Tell me about your idea, opportunity or question…"
                  aria-invalid={!!errors.message}
                  aria-describedby={errors.message ? 'err-message' : undefined}
                  className={`${inputCls(errors.message)} resize-y`}
                />
                {errors.message && <p id="err-message" role="alert" className="mt-1.5 text-xs text-red-300">{errors.message}</p>}
              </div>
              <div className="mt-6 flex flex-col items-start gap-4 sm:flex-row sm:items-center">
                <MagneticButton type="submit" ariaLabel="Send message via email">
                  <span className="inline-flex items-center gap-2">
                    <Send className="h-4 w-4" aria-hidden /> SEND MESSAGE
                  </span>
                </MagneticButton>
                <p className="text-xs leading-relaxed text-slate-500">
                  No backend here — submitting opens your email app addressed to me. Nothing is
                  sent silently.
                </p>
              </div>
              {sent && (
                <p role="status" className="mt-4 rounded-xl border border-emerald-300/30 bg-emerald-400/10 p-3 text-xs leading-relaxed text-emerald-200">
                  Your email app should now be open with the message addressed to {PROFILE.email}.
                  If nothing opened, email me directly at {PROFILE.email}.
                </p>
              )}
            </form>
          </Reveal>
        </div>
      </div>
    </section>
  );
}
