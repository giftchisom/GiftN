import { Experience, Project, Education, Certification, SkillCategory } from './types';

export const EXPERIENCES: Experience[] = [
  {
    id: 'pycon-togo',
    role: 'Volunteer Frontend Engineer & Web Development Lead',
    company: 'PyCon Togo Africa & Tech Savvy Summit',
    location: 'Lomé, Togo',
    duration: '11/2025 - 02/2026',
    points: [
      'Led frontend architecture and design for PyCon Togo Africa official website and live event dashboard.',
      'Designed and shipped responsive web interface managing real-time event data, speaker schedules, and attendee engagement.',
      'Collaborated with event organizers to translate business requirements into technical specifications; acted as communication liaison.',
      'Demonstrated strategic thinking in prioritizing features; applied user empathy to optimize attendee experience.',
      'Awarded Certificate of Recognition for outstanding volunteer work, showcasing leadership and professionalism under pressure from TSS.'
    ],
    website: 'https://pycontg.pytogo.org'
  },
  {
    id: 'code-alpha',
    role: 'Software Engineer & Full Stack Developer',
    company: 'Code Alpha Software Development Bootcamp',
    location: 'Remote (Internship)',
    duration: '05/2026 - 07/2026',
    points: [
      'Built real-time video conferencing platform using WebSockets and Socket.io for live multi-user communication.',
      'Designed and developed full e-commerce platform: frontend (React, responsive design) to back-end (Node.js APIs) to database (Postgres) with integrated security.',
      'Applied technical fluency in system design, architecting scalable solutions handling concurrent user sessions.',
      'Demonstrated data-driven development by analyzing user flows and optimizing performance bottlenecks.',
      'Collaborated cross-functionally with UI/UX and backend teams; managed project timelines and deliverables.'
    ]
  }
];

export const PROJECTS: Project[] = [
  {
    id: 'santeflow',
    title: 'SantéFlow',
    role: 'Founder & Full Stack Developer',
    duration: '01/2026 - Present',
    description: [
      'Building an AI-powered health management platform leveraging Google Gemini API for intelligent, personalized health recommendations.',
      'Implementing sophisticated, user-centric product features: real-time health tracking, color-coded health analytics, and personalized AI-driven insights.',
      'Applied strategic product roadmapping and prioritization to launch the MVP, conducting user research and iterating based on direct feedback.',
      'Designed and built the complete backend architecture (Supabase, PostgreSQL) and interactive frontend (React) with deep focus on user empathy and engagement.',
      'Demonstrating an entrepreneurial mindset: identifying market opportunities, validating product-market fit, and driving active user growth.'
    ],
    tags: ['React', 'FastAPI', 'Google Gemini API', 'Supabase', 'PostgreSQL', 'Tailwind CSS'],
    liveUrl: 'https://santeflow-xi.vercel.app/',
    demoMockupType: 'santeflow'
  },
  {
    id: 'iun-network',
    title: 'IUN Centralized Communication & Resource Network',
    role: 'Sole Developer & Product Owner',
    duration: '2025 - 2026',
    description: [
      'Designed and built an internal collaboration platform enabling university staff and students of Institut Universitaire Nobel to interact exclusively and share resources.',
      'Owned the entire end-to-end product lifecycle: ideation, feature prioritization, UI/UX design, API integration, and Supabase database architecture.',
      'Demonstrated strategic thinking and user empathy in designing specialized academic features addressing actual institutional needs.',
      'Approved and highly commended as BSc Final Year Project, validating full-lifecycle product ownership, architecture design, and technical excellence.'
    ],
    tags: ['React', 'Vite', 'Supabase', 'PostgreSQL', 'Tailwind CSS', 'API Integration'],
    githubUrl: 'https://github.com/giftchisom/IUN-NETWORK#',
    demoMockupType: 'iun'
  },
  {
    id: 'ai-voice-agent',
    title: 'AI Voice Agent (Multilingual)',
    role: 'Personal Project',
    duration: '2025 - 2026',
    description: [
      'Built an advanced, highly responsive AI voice agent integrating Google Gemini LLM and LiveKit for real-time, low-latency audio/video interactions.',
      'Implemented full multilingual support featuring dynamic voice profiles and context-aware, language-agnostic responses.',
      'Explored and tested next-generation integration patterns beyond traditional CRUD architectures, enabling natural conversational UX.'
    ],
    tags: ['React', 'Node.js', 'Google Gemini API', 'LiveKit', 'WebSockets', 'TypeScript'],
    githubUrl: 'https://github.com/giftchisom/AI-VOICE-AGENT-MULTI-LINGUAL-',
    demoMockupType: 'voiceagent'
  },
  {
    id: 'interactive-portfolio',
    title: 'Interactive Developer Portfolio',
    role: 'Sole Developer & Designer',
    duration: '2026',
    description: [
      'Designed and engineered this highly responsive, custom-animated developer portfolio to present my professional career trajectory and engineering projects.',
      'Integrated an ambient music engine, dynamic scroll-linked tree navigation node states, and lightweight interactive CSS/SVG mockups for product showcases.',
      'Optimized layouts, typeface scaling, and asset rendering to establish a high-contrast, eye-safe dark-ambient visual system.'
    ],
    tags: ['React', 'Vite', 'TypeScript', 'Tailwind CSS', 'motion/react', 'Lucide React'],
    liveUrl: 'https://ais-pre-opcthlpnk5wfemjsaufgrq-271160816421.europe-west2.run.app',
    githubUrl: 'https://github.com/giftchisom',
    demoMockupType: 'portfolio'
  }
];

export const EDUCATION: Education[] = [
  {
    id: 'bachelors',
    degree: "Bachelor's Degree: Computer Science",
    institution: "L'Institut Africain D'administration Et D'études Commerciale (I.A.E.C.)",
    duration: '2023 - 2026',
    location: 'Lomé, Togo',
    details: 'Validated with technical excellence. Approved BSc Final Year Project on internal collaboration networks.'
  }
];

export const CERTIFICATIONS: Certification[] = [
  {
    id: 'cert-1',
    name: 'Certificate of Recognition for Outstanding Volunteer Work',
    issuer: 'Tech Savvy Summit (TSS) / PyCon Togo Africa',
    date: '02/2026'
  },
  {
    id: 'cert-2',
    name: 'Python Development Certification',
    issuer: 'Udemy',
    date: '2025',
    link: 'https://udemy-certificate.s3.amazonaws.com/image/UC-48e86166-2153-4f79-add2-ef2bc5a42574.jpg?v=1764500560000'
  },
  {
    id: 'cert-3',
    name: 'Certificate on Completion of CodeAlpha Bootcamp - Full Stack Developer',
    issuer: 'CodeAlpha',
    date: '2026',
    link: 'https://www.codealpha.tech/#/verification?id=CA%2FDF1%2F91356'
  }
];

export const TECHNICAL_SKILLS: SkillCategory[] = [
  {
    category: 'Languages',
    skills: ['Python', 'SQL', 'JavaScript', 'TypeScript', 'Bash']
  },
  {
    category: 'Backend & APIs',
    skills: ['FastAPI', 'Node.js', 'Next.js', 'WebSockets', 'Socket.io']
  },
  {
    category: 'Data, AI & ML',
    skills: ['Supabase', 'PostgreSQL', 'Google Gemini APIs', 'OpenAI APIs']
  },
  {
    category: 'Frontend & UI/UX',
    skills: ['React', 'Vite', 'HTML/CSS', 'Responsive Web Design', 'UI/UX Design']
  },
  {
    category: 'Tools & DevOps',
    skills: ['Git', 'Vercel', 'Docker', 'API Integration', 'Real-time Communication']
  }
];

export const PRODUCT_SKILLS: SkillCategory[] = [
  {
    category: 'Product Strategy',
    skills: ['Roadmapping', 'User Empathy', 'Market Research', 'Strategic Thinking', 'Prioritization']
  },
  {
    category: 'Data-Driven Choices',
    skills: ['Data Analytics', 'User Behavior Analysis', 'Metrics & Forecasting', 'Performance Measurement']
  },
  {
    category: 'Collaboration',
    skills: ['Stakeholder Communication', 'Team Collaboration', 'Project Management', 'Agile Methodologies']
  },
  {
    category: 'Technical Leadership',
    skills: ['System Design', 'Technical Fluency', 'Architecture Analysis', 'Full-Lifecycle Product Ownership']
  }
];

export const LANGUAGES = [
  { name: 'English', proficiency: 'Native / Bilingual' },
  { name: 'French', proficiency: 'Professional Working Proficiency' }
];
