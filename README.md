# MUCHAKARLA HEMANTH KUMAR — AI/ML Engineer & Full-Stack Developer Portfolio

Premium, cinematic, production-ready personal portfolio. React + TypeScript + Vite +
Tailwind CSS + Three.js / React Three Fiber + Framer Motion. Free and open-source only.

## Run locally

```bash
npm install
npm run dev      # http://localhost:5173
```

## Production build

```bash
npm run build    # type-checks (tsc -b) then emits dist/
npm run preview  # serve the production build locally
```

## Deploy

The site is a static Vite build (`dist/`) — deployable anywhere:

- **Vercel:** import the repo, framework preset “Vite”, build command `npm run build`,
  output directory `dist`. No environment variables required.
- **Netlify:** build command `npm run build`, publish directory `dist`.
- **GitHub Pages:** run `npm run build`, publish `dist/` (e.g. via the official
  `actions/upload-pages-artifact` workflow).

Optional configuration (all safe for client-side use, none required):

```bash
cp .env.example .env
# VITE_GITHUB_USER — GitHub username for the live repository feed.
# The site works fully offline without it (verified static fallback data).
```

## Content model

All portfolio content lives in typed data files — update these, not components:

| File | Contents |
| --- | --- |
| `src/data/profile.ts` | Identity, brand, target roles, job prefs, nav |
| `src/data/social.ts` | Verified GitHub / LinkedIn / email |
| `src/data/education.ts` | Education entries + journey milestones |
| `src/data/experience.ts` | 8 internships + 2 Forage simulations |
| `src/data/projects.ts` | 12 showcased projects + case studies |
| `src/data/skills.ts` | 11 skill categories |
| `src/data/certifications.ts` | Verified credentials only |

Content rules enforced in code: demo/prototype/simulation context is always
labelled, unknown case-study fields render “Details not provided.”, and no
metrics, clients, awards or credentials are invented.

## Notes

- 3D scenes lazy-load, adapt to HIGH / MEDIUM / LOW device tiers, and degrade to
  premium 2D fallbacks when WebGL is unavailable or reduced motion is preferred.
- Contact form uses a validated `mailto:` handoff — no backend, no fake delivery.
- GitHub feed uses the public API with no token and a static verified fallback.
