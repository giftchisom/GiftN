export interface Experience {
  id: string;
  role: string;
  roleFr?: string;
  company: string;
  location: string;
  locationFr?: string;
  duration: string;
  durationFr?: string;
  points: string[];
  pointsFr?: string[];
  website?: string;
  tags?: string[];
}

export interface ProjectResearch {
  badge?: string;
  badgeFr?: string;
  problem: string;
  problemFr?: string;
  methodology: string;
  methodologyFr?: string;
  solution: string;
  solutionFr?: string;
}

export interface Project {
  id: string;
  title: string;
  role: string;
  roleFr?: string;
  duration: string;
  durationFr?: string;
  description: string[];
  descriptionFr?: string[];
  tags: string[];
  githubUrl?: string;
  liveUrl?: string;
  demoMockupType?: 'santeflow' | 'voiceagent' | 'iun' | 'pycon' | 'ecommerce' | 'portfolio';
  researchDetails?: ProjectResearch;
}

export interface Education {
  id: string;
  degree: string;
  institution: string;
  duration: string;
  location: string;
  details?: string;
}

export interface Certification {
  id: string;
  name: string;
  issuer: string;
  date: string;
  link?: string;
  image?: string;
}

export interface SkillCategory {
  category: string;
  skills: string[];
}
