import { SOCIAL } from '../data/social';

export interface RepoInfo {
  name: string;
  description: string | null;
  url: string;
  language: string | null;
  stars: number;
}

interface GhApiRepo {
  name: string;
  description: string | null;
  html_url: string;
  language: string | null;
  stargazers_count: number;
  fork: boolean;
}

interface GhUser {
  public_repos: number;
}

/** Verified repository names from the supplied profile — descriptions never invented. */
const KNOWN_REPOS: { name: string; description: string | null; language: string | null }[] = [
  { name: 'drishti-ai-command-center', description: 'AI disaster intelligence command center (prototype decision-support platform).', language: 'TypeScript' },
  { name: 'drishti-x', description: 'DRISHTI-X GIS + 3D digital-twin prototype (demo data).', language: 'TypeScript' },
  { name: 'nexusflow-crud', description: 'Premium full-stack CRUD application — React, TypeScript, Express, Prisma, PostgreSQL.', language: 'TypeScript' },
  { name: 'neuralverse', description: 'Interactive AI universe — Three.js / WebGL creative-technology project.', language: 'TypeScript' },
  { name: 'nexus-ecommerce', description: 'Premium full-stack e-commerce platform.', language: 'TypeScript' },
  { name: 'weatherflow', description: 'Real-time 3D weather dashboard on keyless Open-Meteo APIs.', language: 'JavaScript' },
  { name: 'Chatbot-for-FAQs', description: 'FAQ chatbot exploring NLP-style matching (cosine similarity).', language: 'JavaScript' },
  { name: 'AI-Enhanced-Chatbot', description: 'AI chatbot experiment / conversational web application.', language: null },
];

const FALLBACK_REPOS: RepoInfo[] = KNOWN_REPOS.map((r) => ({
  ...r,
  url: `${SOCIAL.github}/${r.name}`,
  stars: 0,
}));

/**
 * Fetch public repos + verified repo count (no token). Never throws —
 * returns static, profile-derived fallback data on any failure
 * (rate limit, offline…). Never exposes secrets.
 */
export async function fetchPublicRepos(signal: AbortSignal): Promise<{
  repos: RepoInfo[];
  live: boolean;
  totalCount: number | null;
}> {
  const user = import.meta.env.VITE_GITHUB_USER?.trim() || SOCIAL.githubUser;
  const none = { repos: FALLBACK_REPOS, live: false, totalCount: null };
  try {
    const [reposRes, userRes] = await Promise.all([
      fetch(`https://api.github.com/users/${encodeURIComponent(user)}/repos?per_page=12&sort=updated`, {
        signal,
        headers: { Accept: 'application/vnd.github+json' },
      }),
      fetch(`https://api.github.com/users/${encodeURIComponent(user)}`, {
        signal,
        headers: { Accept: 'application/vnd.github+json' },
      }),
    ]);
    let totalCount: number | null = null;
    if (userRes.ok) {
      const u = (await userRes.json()) as GhUser;
      if (typeof u.public_repos === 'number') totalCount = u.public_repos;
    }
    if (!reposRes.ok) return none;
    const data = (await reposRes.json()) as GhApiRepo[];
    if (!Array.isArray(data) || data.length === 0) return { ...none, totalCount };
    return {
      live: true,
      totalCount,
      repos: data.slice(0, 8).map((r) => ({
        name: r.name,
        description: r.description,
        url: r.html_url,
        language: r.language,
        stars: r.stargazers_count ?? 0,
      })),
    };
  } catch {
    return none;
  }
}
