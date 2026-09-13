/** Education history — both entries preserved exactly as supplied. */

export interface EducationEntry {
  institution: string;
  program: string;
  detail: string;
  period: string;
  status: string;
}

export const EDUCATION: EducationEntry[] = [
  {
    institution: 'SRK Institute of Technology',
    program: 'Bachelor of Technology (B.Tech) — Artificial Intelligence',
    detail:
      'Branch: Computer Science / Artificial Intelligence & Machine Learning. Undergraduate specialization in AI: software development, machine learning, full-stack web development and data analytics — applied through internships, job simulations and shipped projects.',
    period: '2024–2028',
    status: 'IN PROGRESS · EXPECTED GRADUATION 2028',
  },
  {
    institution: 'Aditya Educational Institutions',
    program: 'Intermediate / Class XII',
    detail: 'Higher-secondary education completed before beginning the B.Tech journey.',
    period: 'June 2022 – March 2024',
    status: 'COMPLETED',
  },
];

/** Personal development journey — exact verified dates only. */
export interface JourneyMilestone {
  period: string;
  title: string;
  points: string[];
}

export const JOURNEY: JourneyMilestone[] = [
  {
    period: '2022–2024',
    title: 'Intermediate / Class XII',
    points: ['Completed Intermediate education at Aditya Educational Institutions.'],
  },
  {
    period: '2024',
    title: 'Started B.Tech journey',
    points: ['Began Bachelor of Technology at SRK Institute of Technology.'],
  },
  {
    period: '2024–2028',
    title: 'B.Tech Artificial Intelligence',
    points: [
      'Undergraduate specialization in Artificial Intelligence / AI & Machine Learning.',
      'Coursework across AI/ML, software development, full-stack web development and data analytics.',
    ],
  },
  {
    period: '2026',
    title: 'Internships, simulations & shipped projects',
    points: [
      'Multiple internships across AI/ML, AI web development and full-stack engineering.',
      'Data specialist job simulations (Tata, Deloitte — Forage).',
      'AI/ML, full-stack, 3D/WebGL and data projects — several deployed to production URLs.',
    ],
  },
  {
    period: 'September 2026',
    title: 'Selections & internship period',
    points: [
      'Selected for two InAmigos Foundation internships (AI Intern; AI Web Development Intern) via Internshala.',
      'CodeOrbit Tech Virtual Internship Program (Batch 7) period: September 1–30, 2026.',
    ],
  },
];
