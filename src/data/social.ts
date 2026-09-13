/** Verified professional profiles only. Never invent social accounts. */

export const SOCIAL = {
  github: 'https://github.com/hemanthhemanth1834-bit',
  githubUser: 'hemanthhemanth1834-bit',
  githubProfileName: 'hemanth_muchakarla___',
  linkedin: 'https://www.linkedin.com/in/hemanth-kumar-muchakarla-7974002a7/',
} as const;

export const DIGITAL_PRESENCE = [
  {
    id: 'github',
    name: 'GitHub',
    handle: '@hemanthhemanth1834-bit',
    description: '24 public repositories (per supplied profile analysis) — AI/ML, full-stack, 3D/WebGL, GIS and more.',
    url: SOCIAL.github,
  },
  {
    id: 'linkedin',
    name: 'LinkedIn',
    handle: 'Hemanth Kumar Muchakarla',
    description: 'Official professional destination — connect for internships and collaboration.',
    url: SOCIAL.linkedin,
  },
  {
    id: 'email',
    name: 'Email',
    handle: 'hemanthhemanth1834@gmail.com',
    description: 'Direct line for opportunities, questions and feedback.',
    url: 'mailto:hemanthhemanth1834@gmail.com',
  },
] as const;
