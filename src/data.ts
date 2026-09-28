import { Experience, Project, Education, Certification, SkillCategory } from './types';

export const EXPERIENCES: Experience[] = [
  {
    id: 'pycon-togo',
    role: 'Frontend Engineer & Web Lead',
    roleFr: 'Ingénieur Frontend & Lead Web',
    company: 'PyCon Togo Africa',
    location: 'Lomé, Togo',
    locationFr: 'Lomé, Togo',
    duration: '11/2025 - 02/2026',
    durationFr: '11/2025 - 02/2026',
    points: [
      'Architected the official responsive web application and live conference schedule dashboard for 500+ attendees.',
      'Coordinated with event organizers to deliver real-time agenda updates, honored with a Certificate of Recognition.'
    ],
    pointsFr: [
      'Direction de l\'architecture frontend et de l\'interface réactive de la conférence officielle accueillant plus de 500 participants.',
      'Gestion en direct des agendas et de l\'interactivité des intervenants, récompensé par un Certificat de Reconnaissance.'
    ],
    website: 'https://pycontg.pytogo.org',
    tags: ['React', 'TypeScript', 'UI/UX Architecture', 'Real-Time Schedules']
  },
  {
    id: 'code-alpha',
    role: 'Full Stack Software Engineer Intern',
    roleFr: 'Ingénieur Full Stack (Stagiaire)',
    company: 'Code Alpha Bootcamp',
    location: 'Remote',
    locationFr: 'À distance',
    duration: '05/2026 - 07/2026',
    durationFr: '05/2026 - 07/2026',
    points: [
      'Engineered a real-time multi-user video conferencing platform using WebSockets and Socket.io for low-latency collaboration.',
      'Built secure e-commerce REST APIs with Node.js and PostgreSQL, optimizing database queries for high-volume transactions.'
    ],
    pointsFr: [
      'Développement d\'une plateforme de visioconférence multi-utilisateurs en temps réel avec WebSockets et Socket.io.',
      'Conception d\'APIs REST e-commerce sécurisées avec Node.js et PostgreSQL, optimisées pour les requêtes à fort trafic.'
    ],
    tags: ['React', 'Node.js', 'Socket.io', 'PostgreSQL']
  }
];

export const PROJECTS: Project[] = [
  {
    id: 'santeflow',
    title: 'SantéFlow',
    role: 'Founder & Full Stack Developer',
    roleFr: 'Fondateur & Développeur Full Stack',
    duration: '01/2026 - Present',
    durationFr: '01/2026 - Présent',
    description: [
      'AI-powered health management platform utilizing Google Gemini API for personalized health insights and real-time biometric wellness tracking.'
    ],
    descriptionFr: [
      'Plateforme de santé alimentée par l\'IA utilisant l\'API Google Gemini pour des bilans personnalisés et un suivi biométrique en temps réel.'
    ],
    tags: ['React', 'FastAPI', 'Google Gemini AI', 'PostgreSQL'],
    liveUrl: 'https://santeflow-xi.vercel.app/',
    demoMockupType: 'santeflow'
  },
  {
    id: 'iun-network',
    title: 'IUN Communication & Resource Network',
    role: 'Lead Systems Researcher & Full-Stack Architect (BSc Capstone)',
    roleFr: 'Chercheur Systèmes & Architecte Full-Stack (Projet BSc)',
    duration: '2025 - 2026',
    durationFr: '2025 - 2026',
    description: [
      'An applied research and engineering initiative addressing campus communication bottlenecks at Institut Universitaire Nobel (IUN).',
      'Investigated operational friction across academic departments, where reliance on fragmented instant messaging apps caused lost courseware, information asymmetry, and missed deadlines for 500+ students and faculty.',
      'Architected a centralized, role-based platform (RBAC) featuring secure syllabus repositories, audited departmental announcement feeds, and real-time communication channels.'
    ],
    descriptionFr: [
      'Initiative de recherche appliquée et d\'ingénierie logicielle résolvant les goulots d\'étranglement de communication au sein de l\'Institut Universitaire Nobel (IUN).',
      'Analyse des frictions opérationnelles entre départements académiques, où l\'usage dispersé des messageries éphémères provoquait des pertes de cours, une asymétrie d\'information et des retards pour plus de 500 étudiants et professeurs.',
      'Conception d\'une plateforme centralisée avec contrôle d\'accès par rôles (RBAC), répertoires académiques sécurisés, flux d\'annonces institutionnelles vérifiées et messagerie en temps réel.'
    ],
    tags: ['Applied Research', 'React', 'Supabase', 'PostgreSQL', 'RBAC Security'],
    githubUrl: 'https://github.com/giftchisom/IUN-NETWORK#',
    demoMockupType: 'iun'
  },
  {
    id: 'ai-voice-agent',
    title: 'AI Voice Agent (Multilingual)',
    role: 'Personal Project',
    roleFr: 'Projet Personnel',
    duration: '2025 - 2026',
    durationFr: '2025 - 2026',
    description: [
      'Low-latency conversational voice assistant integrating Google Gemini Multimodal API with LiveKit WebRTC audio streaming for dynamic, multi-language speech.'
    ],
    descriptionFr: [
      'Assistant vocal conversationnel ultra-rapide combinant l\'API multimodale Google Gemini et le streaming audio WebRTC LiveKit.'
    ],
    tags: ['TypeScript', 'Google Gemini AI', 'LiveKit', 'WebSockets'],
    githubUrl: 'https://github.com/giftchisom/AI-VOICE-AGENT-MULTI-LINGUAL-',
    demoMockupType: 'voiceagent'
  },
  {
    id: 'interactive-portfolio',
    title: 'Interactive Developer Portfolio',
    role: 'Sole Developer & Designer',
    roleFr: 'Développeur & Designer',
    duration: '2026',
    durationFr: '2026',
    description: [
      'Minimalist, dark-ambient personal portfolio built with React and Tailwind, featuring dynamic starfield physics, custom audio ambiance, and smooth navigation.'
    ],
    descriptionFr: [
      'Portfolio personnel sobre et immersif sous React et Tailwind, intégrant physique stellaire dynamique, ambiance audio et navigation arborescente.'
    ],
    tags: ['React', 'TypeScript', 'Tailwind CSS', 'motion/react'],
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
    date: '02/2026',
    image: '/tech-savvy-certificate.svg'
  },
  {
    id: 'cert-2',
    name: 'Python Development Certification',
    issuer: 'Udemy',
    date: '2025',
    link: 'https://udemy-certificate.s3.amazonaws.com/image/UC-48e86166-2153-4f79-add2-ef2bc5a42574.jpg?v=1764500560000',
    image: 'https://udemy-certificate.s3.amazonaws.com/image/UC-48e86166-2153-4f79-add2-ef2bc5a42574.jpg?v=1764500560000'
  },
  {
    id: 'cert-3',
    name: 'Certificate on Completion of CodeAlpha Bootcamp - Full Stack Developer',
    issuer: 'CodeAlpha',
    date: '2026',
    link: 'https://www.codealpha.tech/#/verification?id=CA%2FDF1%2F91356',
    image: '/codealpha-bootcamp.svg'
  }
];

export const TECHNICAL_SKILLS: SkillCategory[] = [
  {
    category: 'Frontend',
    skills: ['React', 'TypeScript', 'Tailwind CSS']
  },
  {
    category: 'Backend',
    skills: ['Node.js', 'Express', 'Python', 'FastAPI']
  },
  {
    category: 'Database',
    skills: ['PostgreSQL', 'Supabase']
  },
  {
    category: 'AI',
    skills: ['OpenAI API', 'Gemini API', 'LLM APIs', 'RAG', 'AI agents / tool calling']
  },
  {
    category: 'Cloud & DevOps',
    skills: ['Vercel', 'Git/GitHub', 'AWS basics']
  },
  {
    category: 'APIs & Architecture',
    skills: ['REST APIs', 'WebSockets', 'Authentication / OAuth', 'API integration', 'SQL', 'System design fundamentals']
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
