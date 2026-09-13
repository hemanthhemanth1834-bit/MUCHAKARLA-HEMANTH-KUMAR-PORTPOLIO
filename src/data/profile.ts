/** Core identity — single source of truth. Nothing here is invented. */

export const PROFILE = {
  name: 'MUCHAKARLA HEMANTH KUMAR',
  firstName: 'MUCHAKARLA',
  lastName: 'HEMANTH KUMAR',
  positioning: 'AI/ML Engineer & Full-Stack Developer',
  headline: 'B.Tech Artificial Intelligence Student',
  brandStatement:
    'AI/ML Engineer & Full-Stack Developer building intelligent, immersive and real-world applications with AI, machine learning, 3D/WebGL and modern web technologies.',
  supportingMessage:
    'Building practical AI-powered solutions by combining Artificial Intelligence, Machine Learning, Generative AI, Python, modern web development, full-stack engineering, data analytics and immersive 3D experiences.',
  heroSupporting:
    'Building intelligent, immersive and real-world applications with AI, machine learning, Generative AI, full-stack engineering and 3D/Web technologies.',
  philosophy: 'Always learning. Always building. Turning ideas into practical AI-powered solutions.',
  status: 'OPEN TO LEARNING & COLLABORATION',
  phone: '8688267309',
  email: 'hemanthhemanth1834@gmail.com',
  location: 'Rajahmundry, Andhra Pradesh, India',
  careerFocus: [
    'Artificial Intelligence',
    'Machine Learning',
    'Generative AI',
    'Python',
    'Web Development',
    'Full-Stack Development',
    'Data Analytics',
    '3D/WebGL',
    'Real-world AI applications',
  ],
} as const;

export const TARGET_ROLES = [
  'AI/ML Engineer',
  'Machine Learning Engineer',
  'AI Engineer',
  'Generative AI Engineer',
  'Python Developer',
  'Full-Stack Developer',
  'Frontend Developer',
  'Backend Developer',
  'Web Developer',
  'Software Engineer',
  'AI Application Developer',
  '3D Web / Creative Technology Developer',
  'Computer Vision / Spatial AI-oriented roles',
] as const;

/** Kept subtle — surfaced only in the Career section, never as a banner. */
export const JOB_PREFERENCES = {
  geography: ['India', 'Remote', 'Bengaluru', 'Hyderabad', 'Other suitable locations in India'],
  interestedIn: [
    'Top technology companies',
    'High-quality startups',
    'AI companies',
    'Software companies',
  ],
} as const;

export const NAV_LINKS = [
  { id: 'home', label: 'HOME' },
  { id: 'about', label: 'ABOUT' },
  { id: 'skills', label: 'SKILLS' },
  { id: 'experience', label: 'EXPERIENCE' },
  { id: 'projects', label: 'PROJECTS' },
  { id: 'education', label: 'EDUCATION' },
  { id: 'certifications', label: 'CERTIFICATIONS' },
  { id: 'journey', label: 'JOURNEY' },
  { id: 'github', label: 'GITHUB' },
  { id: 'contact', label: 'CONTACT' },
] as const;
