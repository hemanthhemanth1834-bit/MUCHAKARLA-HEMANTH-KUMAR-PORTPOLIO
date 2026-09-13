import { AnimatePresence, motion } from 'framer-motion';
import { useEffect, useState } from 'react';

const BOOT_LINES = [
  'BOOTING DIGITAL IDENTITY...',
  'INITIALIZING AI CORE...',
  'LOADING PROJECTS...',
  'CONNECTING ENGINEERING SYSTEMS...',
  'SYSTEM ONLINE',
];

/**
 * Cinematic boot-sequence intro: dark screen → AI pulse →
 * expanding rings → orbiting nodes → boot log → interface
 * materializes. ~2s, skippable, instantly skipped when
 * prefers-reduced-motion.
 */
export function IntroLoader({ onDone }: { onDone: () => void }) {
  const [visible, setVisible] = useState(true);
  const [line, setLine] = useState(0);
  const reduced = window.matchMedia('(prefers-reduced-motion: reduce)').matches;

  useEffect(() => {
    if (reduced) {
      setVisible(false);
      onDone();
      return;
    }
    const timers: number[] = [];
    BOOT_LINES.forEach((_, i) => {
      timers.push(window.setTimeout(() => setLine(i), 250 + i * 320));
    });
    timers.push(
      window.setTimeout(() => {
        setVisible(false);
        window.setTimeout(onDone, 450);
      }, 250 + BOOT_LINES.length * 320 + 250),
    );
    return () => timers.forEach((t) => window.clearTimeout(t));
  }, [onDone, reduced]);

  const skip = () => {
    setVisible(false);
    onDone();
  };

  if (reduced) return null;

  return (
    <AnimatePresence>
      {visible && (
        <motion.div
          role="status"
          aria-label="Loading portfolio experience"
          className="fixed inset-0 z-[90] flex flex-col items-center justify-center bg-[#04070f]"
          exit={{ opacity: 0, scale: 1.06, filter: 'blur(6px)' }}
          transition={{ duration: 0.45, ease: 'easeInOut' }}
        >
          <div className="relative flex h-40 w-40 items-center justify-center" aria-hidden>
            {/* pulse core */}
            <motion.div
              className="absolute h-8 w-8 rounded-full bg-cyan-300"
              style={{ boxShadow: '0 0 40px rgba(34,211,238,0.9)' }}
              initial={{ scale: 0.4, opacity: 0 }}
              animate={{ scale: [0.4, 1.15, 1], opacity: [0, 1, 1] }}
              transition={{ duration: 0.7, times: [0, 0.6, 1] }}
            />
            {/* expanding rings */}
            {[0, 1, 2].map((i) => (
              <motion.div
                key={i}
                className="absolute rounded-full border border-cyan-400/60"
                style={{ width: 56, height: 56 }}
                initial={{ scale: 0.4, opacity: 0 }}
                animate={{ scale: [0.4, 1.6 + i * 0.55], opacity: [0, 0.9, 0] }}
                transition={{ duration: 1.3, delay: 0.35 + i * 0.18, ease: 'easeOut' }}
              />
            ))}
            {/* orbiting nodes */}
            {[0, 1, 2, 3].map((i) => (
              <motion.div
                key={`n-${i}`}
                className="absolute h-full w-full"
                initial={{ rotate: i * 90, opacity: 0 }}
                animate={{ rotate: i * 90 + 120, opacity: 1 }}
                transition={{ duration: 1.6, delay: 0.5, ease: 'easeOut' }}
              >
                <div
                  className="absolute left-1/2 top-0 h-1.5 w-1.5 -translate-x-1/2 rounded-full bg-[#8b5cf6]"
                  style={{ boxShadow: '0 0 10px rgba(139,92,246,0.9)' }}
                />
              </motion.div>
            ))}
          </div>
          {/* boot log */}
          <div className="mt-6 h-28 w-72 font-mono text-[10px] leading-5 tracking-[0.2em] text-cyan-200/80" aria-hidden>
            {BOOT_LINES.slice(0, line + 1).map((l, i) => (
              <motion.p key={l} initial={{ opacity: 0, x: -8 }} animate={{ opacity: 1, x: 0 }}>
                <span className={i === BOOT_LINES.length - 1 ? 'text-emerald-300' : 'text-cyan-300/60'}>
                  {i === BOOT_LINES.length - 1 ? '●' : '▸'}
                </span>{' '}
                {l}
              </motion.p>
            ))}
          </div>
          <span className="sr-only">{BOOT_LINES[line]}</span>
          <button
            type="button"
            onClick={skip}
            className="mt-4 rounded-full border border-white/15 px-6 py-2 font-mono text-[11px] tracking-[0.3em] text-slate-400 transition hover:border-cyan-300/60 hover:text-white"
          >
            SKIP INTRO
          </button>
        </motion.div>
      )}
    </AnimatePresence>
  );
}
