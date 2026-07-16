export interface Experience {
  id: string;
  role: string;
  company: string;
  location: string;
  duration: string;
  points: string[];
  website?: string;
}

export interface Project {
  id: string;
  title: string;
  role: string;
  duration: string;
  description: string[];
  tags: string[];
  githubUrl?: string;
  liveUrl?: string;
  demoMockupType?: 'santeflow' | 'voiceagent' | 'iun' | 'pycon' | 'ecommerce' | 'portfolio';
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
}

export interface SkillCategory {
  category: string;
  skills: string[];
}
