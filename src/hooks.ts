import { useEffect, useState, useSyncExternalStore } from 'react';

/** True when the user prefers reduced motion (also SSR-safe). */
export function usePrefersReducedMotion(): boolean {
  const subscribe = (cb: () => void) => {
    const mq = window.matchMedia('(prefers-reduced-motion: reduce)');
    mq.addEventListener('change', cb);
    return () => mq.removeEventListener('change', cb);
  };
  const getSnapshot = () => window.matchMedia('(prefers-reduced-motion: reduce)').matches;
  const getServerSnapshot = () => false;
  return useSyncExternalStore(subscribe, getSnapshot, getServerSnapshot);
}

export type Quality = 'high' | 'medium' | 'low';

/**
 * Adaptive visual quality:
 * - low: small screens / save-data / weak hardware
 * - medium: tablets
 * - high: desktop
 */
export function useAdaptiveQuality(): Quality {
  const [quality, setQuality] = useState<Quality>('high');

  useEffect(() => {
    const compute = (): Quality => {
      const w = window.innerWidth;
      const saveData =
        (navigator as Navigator & { connection?: { saveData?: boolean } }).connection?.saveData ===
        true;
      const cores = navigator.hardwareConcurrency ?? 8;
      if (w < 640 || saveData || cores <= 4) return 'low';
      if (w < 1024) return 'medium';
      return 'high';
    };
    setQuality(compute());
    let t: number | undefined;
    const onResize = () => {
      window.clearTimeout(t);
      t = window.setTimeout(() => setQuality(compute()), 200);
    };
    window.addEventListener('resize', onResize);
    return () => window.removeEventListener('resize', onResize);
  }, []);

  return quality;
}

/** Tracks which section id is currently in view for nav active-state. */
export function useActiveSection(ids: readonly string[]): string {
  const [active, setActive] = useState<string>(ids[0] ?? '');

  useEffect(() => {
    const observer = new IntersectionObserver(
      (entries) => {
        for (const e of entries) {
          if (e.isIntersecting) setActive(e.target.id);
        }
      },
      { rootMargin: '-40% 0px -55% 0px', threshold: 0 },
    );
    ids.forEach((id) => {
      const el = document.getElementById(id);
      if (el) observer.observe(el);
    });
    return () => observer.disconnect();
  }, [ids]);

  return active;
}

/** One-shot reveal-on-scroll hook (disabled animations when reduced motion). */
export function useReveal<T extends HTMLElement>() {
  const [ref, setRef] = useState<T | null>(null);
  const [visible, setVisible] = useState(false);

  useEffect(() => {
    if (!ref) return;
    if (window.matchMedia('(prefers-reduced-motion: reduce)').matches) {
      setVisible(true);
      return;
    }
    const observer = new IntersectionObserver(
      (entries) => {
        if (entries[0]?.isIntersecting) {
          setVisible(true);
          observer.disconnect();
        }
      },
      { threshold: 0.12 },
    );
    observer.observe(ref);
    return () => observer.disconnect();
  }, [ref]);

  return { setRef, visible } as const;
}
