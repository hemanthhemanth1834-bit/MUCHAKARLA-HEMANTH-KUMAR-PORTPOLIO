import { AnimatePresence, motion } from 'framer-motion';
import { Hexagon, Menu, X } from 'lucide-react';
import { useEffect, useState } from 'react';
import { NAV_LINKS } from '../data/profile';
import { useActiveSection } from '../hooks';

export function Navbar() {
  const [open, setOpen] = useState(false);
  const [scrolled, setScrolled] = useState(false);
  const active = useActiveSection(NAV_LINKS.map((l) => l.id));

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 24);
    onScroll();
    window.addEventListener('scroll', onScroll, { passive: true });
    return () => window.removeEventListener('scroll', onScroll);
  }, []);

  useEffect(() => {
    document.body.style.overflow = open ? 'hidden' : '';
    return () => {
      document.body.style.overflow = '';
    };
  }, [open ]);

  return (
    <>
      <motion.header
        initial={{ y: -70, opacity: 0 }}
        animate={{ y: 0, opacity: 1 }}
        transition={{ duration: 0.6, delay: 0.15 }}
        className={`fixed inset-x-0 top-0 z-[70] transition-all duration-300 ${
          scrolled ? 'py-2' : 'py-4'
        }`}
      >
        <nav
          aria-label="Primary"
          className={`glass mx-auto flex max-w-6xl items-center justify-between rounded-2xl px-4 py-3 sm:px-6 ${
            scrolled ? 'shadow-[0_8px_40px_rgba(47,123,255,0.18)]' : ''
          }`}
        >
          <a href="#home" className="flex items-center gap-2.5" aria-label="Back to home">
            <span className="relative grid h-9 w-9 place-items-center">
              <Hexagon className="h-9 w-9 text-cyan-300" strokeWidth={1.4} aria-hidden />
              <span className="absolute text-base leading-none" role="img" aria-label="Artificial intelligence">🧠</span>
            </span>
            <span className="hidden whitespace-nowrap font-display text-[11px] font-semibold tracking-[0.18em] text-white sm:block">
              MUCHAKARLA HEMANTH KUMAR
            </span>
          </a>

          <ul className="hidden items-center gap-0.5 xl:flex">
            {NAV_LINKS.map((l) => (
              <li key={l.id}>
                <a
                  href={`#${l.id}`}
                  aria-current={active === l.id ? 'true' : undefined}
                  className={`relative rounded-full px-2.5 py-2 font-mono text-[10px] tracking-[0.16em] transition-colors ${
                    active === l.id ? 'text-white' : 'text-slate-400 hover:text-cyan-200'
                  }`}
                >
                  {active === l.id && (
                    <motion.span
                      layoutId="nav-pill"
                      className="absolute inset-0 rounded-full border border-cyan-300/40 bg-cyan-400/10"
                      transition={{ type: 'spring', stiffness: 400, damping: 32 }}
                    />
                  )}
                  <span className="relative">{l.label}</span>
                </a>
              </li>
            ))}
          </ul>

          <div className="flex items-center gap-3">
            <a
              href="#contact"
              className="glow-btn hidden rounded-full bg-gradient-to-r from-[#2f7bff] to-[#22d3ee] px-5 py-2.5 font-display text-[11px] font-semibold tracking-[0.22em] text-white transition hover:brightness-110 xl:inline-flex"
            >
              CONTACT ME
            </a>
            <button
              type="button"
              onClick={() => setOpen((v) => !v)}
              aria-expanded={open}
              aria-label={open ? 'Close menu' : 'Open menu'}
              className="grid h-10 w-10 place-items-center rounded-xl border border-white/10 text-slate-200 xl:hidden"
            >
              {open ? <X className="h-5 w-5" /> : <Menu className="h-5 w-5" />}
            </button>
          </div>
        </nav>
      </motion.header>

      {/* mobile menu */}
      <AnimatePresence>
        {open && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.25 }}
            className="fixed inset-0 z-[65] flex flex-col overflow-y-auto pt-28 backdrop-blur-2xl xl:hidden"
            style={{ background: 'rgba(4,7,15,0.94)' }}
          >
            <nav aria-label="Mobile">
              <ul className="flex flex-col items-center gap-1 px-8 pb-16">
                {NAV_LINKS.map((l, i) => (
                  <motion.li
                    key={l.id}
                    initial={{ opacity: 0, y: 18 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ delay: 0.05 + i * 0.05 }}
                    className="w-full"
                  >
                    <a
                      href={`#${l.id}`}
                      onClick={() => setOpen(false)}
                      className={`flex items-center justify-between rounded-xl border px-5 py-3.5 font-display text-sm tracking-[0.25em] transition ${
                        active === l.id
                          ? 'border-cyan-300/50 bg-cyan-400/10 text-white'
                          : 'border-white/5 text-slate-300 hover:border-white/15'
                      }`}
                    >
                      {l.label}
                      <span className="font-mono text-[10px] text-cyan-300/60">
                        {String(i + 1).padStart(2, '0')}
                      </span>
                    </a>
                  </motion.li>
                ))}
              </ul>
            </nav>
          </motion.div>
        )}
      </AnimatePresence>
    </>
  );
}
