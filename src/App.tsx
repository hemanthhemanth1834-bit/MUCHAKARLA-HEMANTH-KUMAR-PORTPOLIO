import { lazy, Suspense, useCallback, useState } from 'react';
import { About } from './components/About';
import { Architecture } from './components/Architecture';
import { CareerFocus } from './components/CareerFocus';
import { Certifications } from './components/Certifications';
import { Contact } from './components/Contact';
import { CursorGlow } from './components/CursorGlow';
import { Education } from './components/Education';
import { Experience } from './components/Experience';
import { Footer } from './components/Footer';
import { GitHubSection } from './components/GitHubSection';
import { Hero } from './components/Hero';
import { IntroLoader } from './components/IntroLoader';
import { Journey } from './components/Journey';
import { Navbar } from './components/Navbar';
import { ParticleBackground } from './components/ParticleBackground';
import { Projects } from './components/Projects';

// Heavy interactive scenes load only when needed.
const SkillUniverse = lazy(() =>
  import('./components/SkillUniverse').then((m) => ({ default: m.SkillUniverse })),
);

function App() {
  const [introDone, setIntroDone] = useState(
    () =>
      typeof window !== 'undefined' &&
      window.matchMedia('(prefers-reduced-motion: reduce)').matches,
  );
  const finishIntro = useCallback(() => setIntroDone(true), []);

  return (
    <div className="relative min-h-svh bg-[#04070f] text-slate-200">
      <a href="#home" className="skip-link">
        Skip to content
      </a>

      {/* ambient layers */}
      <ParticleBackground />
      <CursorGlow />
      <div
        aria-hidden
        className="pointer-events-none fixed inset-0 z-0"
        style={{
          background:
            'radial-gradient(1000px 500px at 50% -5%, rgba(47,123,255,0.12), transparent 60%), radial-gradient(800px 500px at 85% 60%, rgba(139,92,246,0.07), transparent 60%)',
        }}
      />

      {!introDone && <IntroLoader onDone={finishIntro} />}

      <Navbar />

      <main className="relative z-10">
        <Hero />
        <div aria-hidden className="mx-auto h-px max-w-6xl bg-gradient-to-r from-transparent via-cyan-300/25 to-transparent" />
        <About />
        <Suspense fallback={<div className="py-24" aria-hidden />}>
          <SkillUniverse />
        </Suspense>
        <Experience />
        <Projects />
        <Architecture />
        <Education />
        <Certifications />
        <Journey />
        <GitHubSection />
        <CareerFocus />
        <Contact />
      </main>

      <div className="relative z-10">
        <Footer />
      </div>
    </div>
  );
}

export default App;
