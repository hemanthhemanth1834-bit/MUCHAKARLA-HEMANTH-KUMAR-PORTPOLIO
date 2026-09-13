/**
 * Verified certifications / training only.
 * Organization, title, date and certificate number shown only when verified.
 */

export interface Certification {
  title: string;
  org?: string;
  date?: string;
  certNo?: string;
  kind: 'course' | 'simulation' | 'selection' | 'event';
}

export const CERTIFICATIONS: Certification[] = [
  { title: 'InAmigos Foundation AI Internship — Certificate of Selection', org: 'InAmigos Foundation · via Internshala', date: 'September 9, 2026', certNo: 'alnq69krsu0', kind: 'selection' },
  { title: 'InAmigos Foundation AI Web Development Internship — Certificate of Selection', org: 'InAmigos Foundation · via Internshala', date: 'September 9, 2026', certNo: 'jfhg9ctlf5m', kind: 'selection' },
  { title: 'Python Essentials 1', kind: 'course' },
  { title: 'AI Tools Workshop', kind: 'course' },
  { title: 'Introduction to Cybersecurity', kind: 'course' },
  { title: 'AWS Cloud Practitioner Essentials', kind: 'course' },
  { title: 'Generative AI — NASSCOM', kind: 'course' },
  { title: 'Exploratory Data Analysis — FutureSkills Prime', kind: 'course' },
  { title: 'Tata — Data Visualisation: Empowering Business with Effective Insights (Job Simulation)', kind: 'simulation' },
  { title: 'Deloitte Data Analytics — Forage', kind: 'simulation' },
  { title: 'Certificate of Participation in Round 1 — Online Assessment (MCQ Coding), Adobe University Hackathon 2026', kind: 'event' },
];
