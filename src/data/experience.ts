/**
 * Experience — every organization shown independently, in supplied-date order.
 * Internships and job simulations are strictly separated.
 * Dates are reproduced verbatim; nothing is merged or exaggerated.
 */

export type ExperienceKind = 'internship' | 'simulation';

export interface Experience {
  org: string;
  role: string;
  period: string;
  kind: ExperienceKind;
  meta?: string[];
  points: string[];
  tools?: string[];
}

export const EXPERIENCES: Experience[] = [
  {
    org: 'InAmigos Foundation',
    role: 'Artificial Intelligence (AI) Intern',
    period: 'Selected · September 9, 2026',
    kind: 'internship',
    meta: [
      'Selected through Internshala',
      'Credential: Certificate of Selection',
      'Certificate No: alnq69krsu0',
    ],
    points: [
      'Selected as an Artificial Intelligence (AI) Intern through Internshala.',
      'Awarded a Certificate of Selection dated September 9, 2026.',
    ],
  },
  {
    org: 'InAmigos Foundation',
    role: 'AI Web Development Intern',
    period: 'Selected · September 9, 2026',
    kind: 'internship',
    meta: [
      'Selected through Internshala',
      'Credential: Certificate of Selection',
      'Certificate No: jfhg9ctlf5m',
    ],
    points: [
      'Selected as an AI Web Development Intern through Internshala — a separate opportunity from the AI Intern selection.',
      'Awarded a Certificate of Selection dated September 9, 2026.',
    ],
  },
  {
    org: 'CodeOrbit Tech',
    role: 'Web Development Intern — Virtual Internship Program, Batch 7',
    period: 'September 1, 2026 – September 30, 2026',
    kind: 'internship',
    meta: ['1-month program', 'Offer date: August 19, 2026', 'Offer ID: COT/PRE7/8849'],
    points: [
      'Assignment-driven practical web development internship.',
      'Hands-on web development, learning and skill development through practical assignments.',
      'Building real web development experience in a structured virtual program.',
    ],
  },
  {
    org: 'Thiranex',
    role: 'Web Development Intern',
    period: 'August 2026 – Present (as represented in the supplied profile material)',
    kind: 'internship',
    points: [
      'Front-end development with HTML, CSS and JavaScript.',
      'Real-world project work with industry mentorship.',
      'Debugging, API integration and UI design with regular progress reviews.',
    ],
  },
  {
    org: 'CodSoft',
    role: 'Web Development Virtual Intern & Campus Ambassador',
    period: 'August 2026 – September 2026',
    kind: 'internship',
    points: [
      'Web development and frontend development.',
      'Campus awareness and brand representation as a campus ambassador.',
      'Communication alongside continued technical development.',
    ],
  },
  {
    org: 'AgenticX AI Labs',
    role: 'Full Stack Web Development Intern',
    period: 'August 2026 – September 2026',
    kind: 'internship',
    meta: ['4-week remote internship'],
    points: [
      'Full-stack application development: a CRUD application over a real database.',
      'Secure authentication with responsive, accessible interfaces.',
      'React, Next.js, Node.js, PostgreSQL and Tailwind CSS with deployment workflows.',
    ],
    tools: ['React', 'Next.js', 'Node.js', 'PostgreSQL', 'Tailwind CSS'],
  },
  {
    org: 'CodeAlpha',
    role: 'Artificial Intelligence Intern',
    period: 'August 2026 – September 2026',
    kind: 'internship',
    points: [
      'End-to-end AI/ML models in Python against industry-style project briefs.',
      'Data preprocessing, feature engineering, model training and evaluation.',
      'Supervised learning workflows from brief to evaluated model.',
    ],
  },
  {
    org: 'Codomax Digital Solutions',
    role: 'Machine Learning Intern',
    period: 'August 2026',
    kind: 'internship',
    meta: ['1-month structured internship program'],
    points: [
      'AI/ML tasks and machine-learning application development.',
      'Practical ML exposure inside a structured internship program.',
      'Received an internship offer based on participation and performance.',
    ],
  },
  {
    org: 'Tata — Forage',
    role: 'Data Specialist / Data Visualisation — Job Simulation',
    period: 'June 2026',
    kind: 'simulation',
    meta: ['JOB SIMULATION — FORAGE', '1 month'],
    points: [
      'Worked with business datasets: data cleaning and analysis.',
      'Built executive dashboards answering pricing/risk questions.',
      'Practiced data visualization, BI storytelling and insight communication for non-technical stakeholders.',
    ],
    tools: ['Excel', 'Data Visualization', 'Business Intelligence'],
  },
  {
    org: 'Deloitte — Forage',
    role: 'Data Specialist / Data Analytics — Job Simulation',
    period: 'May 2026',
    kind: 'simulation',
    meta: ['JOB SIMULATION — FORAGE', '1 month'],
    points: [
      'Exploratory data analysis on business/consulting-style problems.',
      'Data cleaning, visualization and trend identification.',
      'Produced data-driven recommendations and communicated insights.',
    ],
    tools: ['Excel', 'Python', 'Data Analysis', 'Data Cleaning', 'Visualization'],
  },
];
