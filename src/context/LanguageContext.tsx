import React, { createContext, useContext, useState, useEffect } from 'react';

export type Language = 'en' | 'fr';

interface Translations {
  [key: string]: {
    en: string;
    fr: string;
  };
}

export const TRANSLATIONS: Translations = {
  // Navigation
  'nav.intro': { en: 'Intro', fr: 'Présentation' },
  'nav.about': { en: 'About & Skills', fr: 'À Propos & Compétences' },
  'nav.experience': { en: 'Experience', fr: 'Expérience' },
  'nav.projects': { en: 'Featured Projects', fr: 'Projets Phares' },
  'nav.contact': { en: 'Contact & Booking', fr: 'Contact & Réservation' },

  // Sidebar
  'sidebar.role': { en: 'FULL STACK DEVELOPER', fr: 'DÉVELOPPEUR FULL STACK' },
  'sidebar.tagline': { 
    en: 'Product-minded engineer crafting secure, real-time, and AI-enabled digital ecosystems.', 
    fr: 'Ingénieur axé produit créant des écosystèmes numériques sécurisés, temps réel et propulsés par l\'IA.' 
  },
  'sidebar.open': { en: 'Open to New Projects', fr: 'Disponible pour projets' },
  'sidebar.location': { en: 'Lomé, Togo', fr: 'Lomé, Togo' },

  // Hero
  'hero.status': { en: 'Open to New Projects', fr: 'Disponible pour de nouveaux projets' },
  'hero.greeting': { en: "Hi, I'm", fr: 'Bonjour, je suis' },
  'hero.viewWork': { en: 'View My Work', fr: 'Voir mes projets' },
  'hero.contactBtn': { en: 'Contact & Book Call', fr: 'Contact & Rendez-vous' },
  'hero.scroll': { en: 'Scroll', fr: 'Défiler' },

  // Experience
  'exp.badge': { en: '02. Career Timeline', fr: '02. Parcours Professionnel' },
  'exp.title': { en: 'Professional Experience', fr: 'Expérience Professionnelle' },
  'exp.visitSite': { en: 'Visit Site', fr: 'Visiter le site' },
  'exp.coreCompetencies': { en: 'Core Competencies', fr: 'Compétences clés' },

  // Projects
  'proj.badge': { en: '03. Portfolios of Work', fr: '03. Portefeuille de Travaux' },
  'proj.title': { en: 'Featured Projects', fr: 'Projets Phares' },
  'proj.role': { en: 'Role', fr: 'Rôle' },
  'proj.github': { en: 'GitHub', fr: 'GitHub' },
  'proj.live': { en: 'Live Demo', fr: 'Démo en direct' },
  'proj.viewFull': { en: 'View Full Photo', fr: 'Agrandir la photo' },

  // About
  'about.badge': { en: '01. Identity & Skills', fr: '01. Identité & Compétences' },
  'about.title': { en: 'About & Skills', fr: 'À Propos & Compétences' },
  'about.techTitle': { en: 'Technical Stack', fr: 'Stack Technique' },
  'about.techBadge': { en: 'Interactive Stack', fr: 'Stack Interactive' },
  'about.techHoverHint': { en: 'Hover over each domain to reveal its relative stack', fr: 'Survolez chaque domaine pour afficher sa stack relative' },

  // Contact
  'contact.badge': { en: 'Get In Touch & Book', fr: 'Prendre Contact & Rendez-vous' },
  'contact.title1': { en: "Let's Build Something", fr: 'Construisons Quelque Chose' },
  'contact.title2': { en: 'Exceptional', fr: "D'Exceptionnel" },
  'contact.subtitle': { 
    en: 'Have a project in mind, an engineering role to fill, or want to discuss full-stack AI architecture?', 
    fr: "Un projet en tête, une opportunité d'ingénierie ou envie d'échanger sur l'architecture IA full-stack ?" 
  },
  'contact.tabMessage': { en: 'Send Message on Website', fr: 'Envoyer un message sur le site' },
  'contact.tabCalendar': { en: 'Book 15-Min Call', fr: 'Réserver un appel (15 min)' },
  'contact.sendBtn': { en: 'Send Message Directly', fr: 'Envoyer le message directement' },
  'contact.sending': { en: 'Sending directly...', fr: 'Envoi en cours...' }
};

interface LanguageContextType {
  language: Language;
  setLanguage: (lang: Language) => void;
  toggleLanguage: () => void;
  t: (key: string) => string;
}

const LanguageContext = createContext<LanguageContextType | undefined>(undefined);

const STORAGE_KEY = 'portfolio_language_preference';

export const LanguageProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const [language, setLanguageState] = useState<Language>(() => {
    try {
      const saved = localStorage.getItem(STORAGE_KEY);
      if (saved === 'en' || saved === 'fr') {
        return saved;
      }
    } catch (e) {
      // ignore
    }
    return 'en';
  });

  const setLanguage = (lang: Language) => {
    setLanguageState(lang);
    try {
      localStorage.setItem(STORAGE_KEY, lang);
    } catch (e) {
      // ignore
    }
  };

  const toggleLanguage = () => {
    setLanguage(language === 'en' ? 'fr' : 'en');
  };

  const t = (key: string): string => {
    const item = TRANSLATIONS[key];
    if (!item) return key;
    return item[language] || item['en'] || key;
  };

  return (
    <LanguageContext.Provider value={{ language, setLanguage, toggleLanguage, t }}>
      {children}
    </LanguageContext.Provider>
  );
};

export const useLanguage = (): LanguageContextType => {
  const context = useContext(LanguageContext);
  if (!context) {
    throw new Error('useLanguage must be used within a LanguageProvider');
  }
  return context;
};
