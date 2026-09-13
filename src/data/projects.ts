/**
 * Featured projects in the specified showcase order.
 * Case-study fields use "Details not provided." where information is unavailable —
 * nothing is fabricated. Demo/prototype/simulation context is always preserved.
 */

export type ProjectKind = 'Prototype' | 'Personal Project' | 'Job Simulation' | 'Experiment';

export interface CaseStudy {
  problem: string;
  concept: string;
  solution: string;
  architecture: string;
  challenges: string;
  implementation: string;
  deployment: string;
  future: string;
}

export interface Project {
  id: string;
  index: string;
  name: string;
  category: string;
  kind: ProjectKind;
  demoDataNotice?: string;
  description: string;
  stack: string[];
  features: string[];
  githubUrl?: string;
  liveUrl?: string;
  accent: string;
  caseStudy: CaseStudy;
}

const NA = 'Details not provided.';
const GH = 'https://github.com/hemanthhemanth1834-bit';

export const PROJECTS: Project[] = [
  {
    id: 'drishti-x-command',
    index: '01',
    name: 'DRISHTI-X — AI Disaster Intelligence Command Center',
    category: 'FLAGSHIP · AI + GIS + 3D',
    kind: 'Prototype',
    description:
      'Flagship project: a real-time disaster intelligence command center combining AI, ML, GIS, citizen safety, emergency response, drone search and rescue, hospitals, shelters, 3D digital twins, simulation and recovery workflows. A project / prototype decision-support platform — not an officially deployed emergency-response system.',
    stack: ['Next.js 14', 'React 18', 'TypeScript', 'Three.js', 'Leaflet', 'OpenStreetMap', 'FastAPI', 'Python', 'WebSockets', 'PWA', 'Tailwind CSS', 'Web Speech API'],
    features: [
      'Citizen Safety Dashboard', 'Risk Intelligence', 'Multi-Hazard Alerts', 'Evacuation Optimization',
      'Location Intelligence', 'Drone SAR', '3D Digital Twin', 'Hospital Intelligence', 'Shelter Intelligence',
      'What-if Simulation', 'Mission Replay', 'System Health', 'Recovery/Audit Ledger', 'Citizen Reporting',
      'Family Safety', 'Disaster Education', 'Voice Assistant', 'Offline/PWA', 'English', 'Telugu', 'Hindi',
    ],
    githubUrl: `${GH}/drishti-ai-command-center`,
    liveUrl: 'https://drishti-ai-command-center.vercel.app/',
    accent: '#2f7bff',
    caseStudy: {
      problem: 'Disaster response involves scattered information — citizens, hospitals, shelters, drones and recovery workflows rarely share one operational picture.',
      concept: 'A unified command center that fuses AI decision support, GIS location intelligence and a 3D digital twin into one interface.',
      solution: 'A Next.js command-center web app with a FastAPI/Python backend, live GIS layers, 3D twin visualization and voice-assisted workflows.',
      architecture: 'Next.js 14 frontend (React 18 + TypeScript) → FastAPI application layer → Python AI/ML services → database → Vercel deployment, with WebSocket channels for live updates.',
      challenges: NA,
      implementation: 'Repository-reported engineering: 28 verified routes, TypeScript checks, 9/9 backend tests passing, production builds, PWA/offline support and accessibility work.',
      deployment: 'Live on Vercel with PWA/offline support.',
      future: NA,
    },
  },
  {
    id: 'drishti-x',
    index: '02',
    name: 'DRISHTI-X (GIS + 3D Twin Implementation)',
    category: 'AI + GIS + SIMULATION',
    kind: 'Prototype',
    demoDataNotice: 'DEMO DATA / PROTOTYPE — demo data is used throughout and is never live disaster data.',
    description:
      'Second DRISHTI-X implementation with 2D GIS, a 3D digital twin, flood monitoring, a prototype flood-ML model, risk scoring (DSI), what-if simulation, an A* safest-route optimizer, shelters, hospitals, resource optimization, citizen classification, drone scanning, a rule-based copilot with optional Ollama integration, incident management, resource dispatch, audit logging and recovery workflows — operating offline in demo mode.',
    stack: ['2D GIS', '3D Digital Twin', 'Flood ML Prototype', 'A* Pathfinding', 'Rule-based Copilot', 'Ollama (optional)'],
    features: [
      '2D GIS', '3D Digital Twin', 'Flood Monitoring', 'Prototype Flood ML', 'Risk Score / DSI',
      'What-if Simulation', 'A* Safest Route Optimizer', 'Shelters', 'Hospitals', 'Resource Optimization',
      'Citizen Classification', 'Drone Scanning', 'Rule-based Copilot', 'Optional Ollama Integration',
      'Incident Management', 'Resource Dispatch', 'Audit Logging', 'Recovery Workflows', 'Offline/Demo Operation',
    ],
    githubUrl: `${GH}/drishti-x`,
    liveUrl: 'https://hemanthhemanth1834-bit.github.io/drishti-x/',
    accent: '#22d3ee',
    caseStudy: {
      problem: 'Exploring disaster decision-support concepts requires a safe, offline sandbox with realistic workflows.',
      concept: 'A fully client-side prototype that simulates detection, analysis, prediction, optimization, response and recovery.',
      solution: 'GIS visualization plus a 3D digital twin, prototype ML scoring, A* evacuation routing and a rule-based copilot (Ollama optional).',
      architecture: NA,
      challenges: NA,
      implementation: NA,
      deployment: 'Published demo on GitHub Pages; runs offline in demo operation mode.',
      future: NA,
    },
  },
  {
    id: 'nexusflow',
    index: '03',
    name: 'NexusFlow — Premium Full-Stack CRUD Application',
    category: 'FULL-STACK CRUD',
    kind: 'Personal Project',
    description:
      'Type-safe full-stack CRUD system modelling a USER → PROJECT → RECORD hierarchy, with server-side validation, search, filtering, sorting, pagination, toast notifications and a glassmorphic 3D-styled interface over a persistent PostgreSQL database.',
    stack: ['React 19', 'TypeScript', 'Vite', 'Tailwind CSS', 'Framer Motion', 'TanStack React Query', 'Node.js', 'Express', 'Prisma', 'PostgreSQL', 'Zod'],
    features: ['Create', 'Read', 'Update', 'Delete', 'Search', 'Filtering', 'Sorting', 'Pagination', 'Persistent database', 'Server-side validation', 'Error handling', 'Toast notifications', 'Responsive UI', 'Accessibility', 'Glassmorphism', '3D effects'],
    githubUrl: 'https://github.com/hemanthhemanth1834-bit/nexusflow-crud.git',
    liveUrl: 'https://crud-app-sable-alpha.vercel.app/',
    accent: '#38bdf8',
    caseStudy: {
      problem: 'CRUD applications often skip validation, error handling and accessibility — NexusFlow treats them as first-class requirements.',
      concept: 'A premium, production-shaped CRUD app: User → Project → Record, with every mutation validated and confirmed.',
      solution: 'React 19 + TanStack Query frontend, Express + Prisma + PostgreSQL backend, Zod validation on the server.',
      architecture: 'USER → PROJECT → RECORD. React frontend → Express REST API → Prisma ORM → PostgreSQL, deployed with the frontend on Vercel.',
      challenges: NA,
      implementation: 'Search, filtering, sorting and pagination over relational data; toast feedback for async mutations; responsive accessible UI.',
      deployment: 'Live on Vercel with a persistent database.',
      future: NA,
    },
  },
  {
    id: 'neuralverse',
    index: '04',
    name: 'NeuralVerse — Interactive AI Universe',
    category: '3D / CREATIVE TECHNOLOGY',
    kind: 'Personal Project',
    description:
      'A strong creative-technology piece: an interactive AI universe with a NeuralCore, brain visualization, AI knowledge universe, future-technology scene and skills constellation — GLSL shaders, particle systems and holographic effects with scroll-driven storytelling, adaptive performance, WebGL fallback and reduced-motion support.',
    stack: ['React', 'TypeScript', 'Vite', 'Three.js', 'React Three Fiber', 'Drei', 'GSAP', 'ScrollTrigger', 'Lenis', 'Framer Motion', 'Tailwind CSS', 'WebGL', 'GLSL'],
    features: ['NeuralCore', 'Brain Visualization', 'AI Knowledge Universe', 'Future Technology Scene', 'Skills Constellation', 'Particle Systems', 'GLSL Shaders', 'Holographic Effects', 'Interactive 3D Scenes', 'Scroll-driven storytelling', 'Adaptive device performance', 'WebGL fallback', 'Reduced-motion support'],
    githubUrl: `${GH}/neuralverse`,
    liveUrl: 'https://hemanthhemanth1834-bit.github.io/neuralverse/',
    accent: '#8b5cf6',
    caseStudy: {
      problem: 'A static portfolio cannot convey 3D/WebGL capability — NeuralVerse demonstrates it directly in the browser.',
      concept: 'A scroll-driven voyage through an AI universe: core, brain, knowledge systems and future-tech scenes.',
      solution: 'React Three Fiber scenes with custom GLSL shaders, GSAP ScrollTrigger choreography and Lenis smooth scrolling.',
      architecture: NA,
      challenges: 'Keeping heavy shader scenes smooth across devices — solved with adaptive device performance tiers and a 2D fallback.',
      implementation: 'Particle systems, holographic materials, constellation layouts; WebGL fallback and reduced-motion support included.',
      deployment: 'Published demo on GitHub Pages.',
      future: NA,
    },
  },
  {
    id: 'nexus-ecommerce',
    index: '05',
    name: 'NEXUS — Premium Full-Stack E-Commerce Platform',
    category: 'FULL-STACK E-COMMERCE',
    kind: 'Personal Project',
    description:
      'A complete e-commerce platform: product discovery with search/filter/sort, product details, cart, checkout, wishlist, JWT authentication, order history, reviews, admin analytics, product/order/user/category management, a 3D hero scene and dark/light mode — on a SQLite database with PostgreSQL-ready architecture.',
    stack: ['React', 'TypeScript', 'Vite', 'Tailwind', 'Framer Motion', 'Three.js', 'React Three Fiber', 'Node.js', 'Express', 'TypeScript', 'Prisma', 'SQLite', 'PostgreSQL-ready'],
    features: ['Product discovery', 'Search', 'Filtering', 'Sorting', 'Product details', 'Shopping cart', 'Checkout', 'Wishlist', 'Authentication', 'JWT sessions', 'Order history', 'Product reviews', 'Admin analytics', 'Product CRUD', 'Order management', 'User management', 'Category management', '3D hero scene', 'Dark/light mode', 'Responsive design', 'Accessibility'],
    githubUrl: `${GH}/nexus-ecommerce`,
    liveUrl: 'https://ecommerce-orpin-xi.vercel.app/',
    accent: '#2f7bff',
    caseStudy: {
      problem: 'A convincing storefront needs the full commerce loop — catalog, cart, auth, orders and admin — not just product cards.',
      concept: 'A premium dark/light storefront with a 3D hero, backed by a real database and admin console.',
      solution: 'React + Vite storefront, Express + Prisma API, JWT sessions, admin CRUD for products, orders, users and categories.',
      architecture: 'React frontend → Express/TypeScript REST API → Prisma → SQLite (PostgreSQL-ready architecture).',
      challenges: NA,
      implementation: NA,
      deployment: 'Live on Vercel.',
      future: NA,
    },
  },
  {
    id: 'weatherflow',
    index: '06',
    name: 'WeatherFlow — Real-Time 3D Weather Dashboard',
    category: 'DATA + 3D DASHBOARD',
    kind: 'Personal Project',
    description:
      'A real-time weather dashboard on the keyless Open-Meteo and Geocoding APIs: live weather, city search with autocomplete, geolocation, current conditions, hourly and 7-day forecasts, weather metrics, an animated atmosphere (rain, snow, fog, thunder), dark/light themes and reduced-motion support.',
    stack: ['HTML5', 'CSS3', 'JavaScript ES6+', 'Three.js', 'Open-Meteo API', 'Geocoding API', 'localStorage'],
    features: ['Live weather', 'City search', 'City autocomplete', 'Geolocation', 'Current weather', 'Hourly forecast', '7-day forecast', 'Weather metrics', 'Animated atmosphere', 'Rain', 'Snow', 'Fog', 'Thunder', 'Dark/light themes', 'Responsive design', 'Accessibility', 'Reduced-motion support'],
    githubUrl: `${GH}/weatherflow`,
    liveUrl: 'https://hemanthhemanth1834-bit.github.io/weatherflow/',
    accent: '#38bdf8',
    caseStudy: {
      problem: 'Weather dashboards are often static tables — WeatherFlow makes conditions visible as a living 3D atmosphere.',
      concept: 'Search any city (or use geolocation) and watch the sky react: rain, snow, fog or thunder rendered in WebGL.',
      solution: 'Vanilla ES6+ app on keyless Open-Meteo APIs with a Three.js atmosphere layer and localStorage preferences.',
      architecture: 'Browser app → Open-Meteo + Geocoding REST APIs; preferences persisted in localStorage; no API key required.',
      challenges: NA,
      implementation: 'Async fetch flows, autocomplete, metric cards, theme + reduced-motion support.',
      deployment: 'Published demo on GitHub Pages.',
      future: NA,
    },
  },
  {
    id: 'faq-chatbot',
    index: '07',
    name: 'FAQ Chatbot',
    category: 'NLP EXPERIMENT',
    kind: 'Experiment',
    description:
      'A JavaScript FAQ chatbot exploring NLP-style matching: query preprocessing, cosine similarity and predefined FAQ matching inside an interactive chat interface.',
    stack: ['HTML', 'CSS', 'JavaScript'],
    features: ['Query preprocessing', 'Cosine similarity', 'Predefined FAQ matching', 'Interactive chat interface', 'NLP-style matching'],
    githubUrl: `${GH}/Chatbot-for-FAQs`,
    liveUrl: 'https://hemanthhemanth1834-bit.github.io/Chatbot-for-FAQs/',
    accent: '#34d399',
    caseStudy: {
      problem: 'Answering repeated questions by hand does not scale — even a small FAQ bot demonstrates retrieval thinking.',
      concept: 'Match free-text queries against a predefined FAQ set using cosine similarity over preprocessed text.',
      solution: 'Client-side JavaScript pipeline: preprocessing → similarity scoring → best-match response in a chat UI.',
      architecture: NA,
      challenges: NA,
      implementation: NA,
      deployment: 'Published demo on GitHub Pages.',
      future: NA,
    },
  },
  {
    id: 'ai-chatbot',
    index: '08',
    name: 'AI Enhanced Chatbot',
    category: 'AI CHAT EXPERIMENT',
    kind: 'Experiment',
    description:
      'An AI chatbot experiment / AI-powered conversational web application. Presented strictly as an experiment — no capabilities are claimed beyond the verified project.',
    stack: ['HTML', 'CSS', 'JavaScript'],
    features: ['AI-powered conversational interface', 'Experiment build'],
    githubUrl: `${GH}/AI-Enhanced-Chatbot`,
    liveUrl: 'https://hemanthhemanth1834-bit.github.io/AI-Enhanced-Chatbot/',
    accent: '#a78bfa',
    caseStudy: {
      problem: NA, concept: 'An AI chatbot experiment exploring conversational web interfaces.',
      solution: NA, architecture: NA, challenges: NA, implementation: NA,
      deployment: 'Published demo on GitHub Pages.', future: NA,
    },
  },
  {
    id: 'snake-game',
    index: '09',
    name: 'AI-Generated Snake Game',
    category: 'AI-ASSISTED GAME',
    kind: 'Experiment',
    description:
      'A React-based Snake game developed through an AI-assisted workflow (Gemini API / AI Studio workflow). Presented as AI-assisted development — no claim is made about how much code the AI generated.',
    stack: ['React', 'Node.js', 'Gemini API / AI Studio workflow'],
    features: ['AI-assisted development', 'Interactive gameplay', 'React-based implementation'],
    githubUrl: `${GH}/AI-generated-Snake-game-with-React.`,
    accent: '#34d399',
    caseStudy: {
      problem: NA, concept: 'Build a classic game while exploring AI-assisted development workflows.',
      solution: 'React implementation of Snake, developed with AI assistance.',
      architecture: NA, challenges: NA, implementation: NA, deployment: NA, future: NA,
    },
  },
  {
    id: 'thiranex-portfolio',
    index: '10',
    name: 'THIRANEX Portfolio',
    category: 'PORTFOLIO BUILD',
    kind: 'Personal Project',
    description:
      'A cinematic portfolio implementation with a cinematic hero, interactive neural particles, magnetic cursor, 3D tilt, project case studies, architecture diagrams, experience timeline, SEO metadata, Schema.org markup and accessibility work.',
    stack: ['HTML', 'CSS', 'JavaScript', 'Canvas', 'CSS Animation', 'Glassmorphism'],
    features: ['Cinematic hero', 'Interactive neural particles', 'Magnetic cursor', '3D tilt', 'Project case studies', 'Architecture diagrams', 'Experience timeline', 'SEO metadata', 'Schema.org', 'Accessibility'],
    githubUrl: `${GH}/THIRANEX_PORTPOLIO`,
    liveUrl: 'https://hemanthhemanth1834-bit.github.io/THIRANEX_PORTPOLIO/',
    accent: '#22d3ee',
    caseStudy: {
      problem: NA, concept: 'A cinematic, single-file-style portfolio with neural-particle identity.',
      solution: 'Canvas particle field, magnetic cursor, 3D tilt cards and case-study pages with Schema.org metadata.',
      architecture: NA, challenges: NA, implementation: NA,
      deployment: 'Published demo on GitHub Pages.', future: NA,
    },
  },
  {
    id: 'codeorbit-portfolio',
    index: '11',
    name: 'CodeOrbit Portfolio',
    category: '3D PORTFOLIO BUILD',
    kind: 'Personal Project',
    description:
      'An immersive cinematic 3D career portfolio (React 19, Vite, Three.js, R3F, Drei, Framer Motion, custom CSS) covering the professional record, education, internships, job simulations, certifications and technical skills. Project-reported Lighthouse results: Accessibility 100, Best Practices 100, SEO 100.',
    stack: ['React 19', 'Vite', 'Three.js', 'React Three Fiber', 'Drei', 'Framer Motion', 'Custom CSS'],
    features: ['Professional record', 'Education', 'Internships', 'Job simulations', 'Certifications', 'Technical skills', 'Cinematic 3D scenes'],
    githubUrl: `${GH}/codeOrbit_portpolio`,
    accent: '#8b5cf6',
    caseStudy: {
      problem: NA, concept: 'An immersive cinematic 3D career portfolio.',
      solution: 'React 19 + R3F + Drei scenes with Framer Motion choreography and custom CSS.',
      architecture: NA, challenges: NA, implementation: NA, deployment: NA,
      future: NA,
    },
  },
  {
    id: 'nexus-and-more',
    index: '12',
    name: 'NEXUS Systems & Other Builds',
    category: 'GAMES · MINI APPS · EXPERIMENTS',
    kind: 'Experiment',
    description:
      'The NEXUS-related project ecosystem — FSM-based NPC/enemy AI, A* pathfinding, utility AI, procedural missions, procedural city generation, local analytics, autonomous-city concepts and 3D browser-game systems (clearly game/experimental systems, distinct from DRISHTI-X) — plus mini builds: Language Translator and Password Generator (both live), 3D Calculator, Calculator, Landing Page, Mini Project, Module-2-AI-Python, PORTPOLIO and LANDING-PAGE.',
    stack: ['FSM AI', 'A* Pathfinding', 'Utility AI', 'Procedural Generation', 'HTML', 'CSS', 'JavaScript', 'Python'],
    features: [
      'FSM-based NPC/enemy AI', 'A* Pathfinding', 'Utility AI', 'Procedural Missions',
      'Procedural City Generation', 'Local Analytics', 'Autonomous-city concepts', '3D browser-game systems',
      'Language Translator (live)', 'Password Generator (live)',
    ],
    githubUrl: `${GH}/nexus`,
    liveUrl: 'https://hemanthhemanth1834-bit.github.io/languagetranslator/',
    accent: '#f472b6',
    caseStudy: {
      problem: NA,
      concept: 'Experimental game AI and city-simulation systems alongside small utility builds.',
      solution: 'Browser-based FSM/utility AI, A* routing and procedural generation experiments; standalone mini apps for translation, passwords and calculation.',
      architecture: NA, challenges: NA, implementation: NA,
      deployment: 'Language Translator and Password Generator demos on GitHub Pages (translator linked; password demo at the verified Password-Generator URL).',
      future: NA,
    },
  },
];
