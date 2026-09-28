import React, { useState, useRef } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import { 
  Layers, 
  Server, 
  Database, 
  Sparkles, 
  Cloud, 
  Network, 
  Code2,
  X
} from 'lucide-react';
import { useLanguage } from '../context/LanguageContext';

interface TechCategory {
  id: string;
  name: string;
  nameFr?: string;
  shortDesc: string;
  shortDescFr?: string;
  icon: React.ReactNode;
  color: string;
  gradient: string;
  glow: string;
  stacks: {
    name: string;
  }[];
}

const TECH_DOMAINS: TechCategory[] = [
  {
    id: 'frontend',
    name: 'Frontend',
    nameFr: 'Frontend',
    shortDesc: 'Responsive, accessible & high-performance UI engineering',
    shortDescFr: 'Interfaces réactives, performantes et accessibles',
    icon: <Layers size={18} className="text-cyan-400" />,
    color: '#38bdf8',
    gradient: 'from-cyan-500/20 to-blue-500/5',
    glow: 'rgba(56, 189, 248, 0.25)',
    stacks: [
      { name: 'React' },
      { name: 'TypeScript' },
      { name: 'Tailwind CSS' }
    ]
  },
  {
    id: 'backend',
    name: 'Backend',
    nameFr: 'Backend',
    shortDesc: 'Scalable services, event loops & async API runtimes',
    shortDescFr: 'Services évolutifs, boucles d\'événements et APIs asynchrones',
    icon: <Server size={18} className="text-emerald-400" />,
    color: '#34d399',
    gradient: 'from-emerald-500/20 to-teal-500/5',
    glow: 'rgba(52, 211, 153, 0.25)',
    stacks: [
      { name: 'Node.js' },
      { name: 'Express' },
      { name: 'Python' },
      { name: 'FastAPI' }
    ]
  },
  {
    id: 'database',
    name: 'Database',
    nameFr: 'Database',
    shortDesc: 'Relational data modeling, ACID transactions & real-time sync',
    shortDescFr: 'Modélisation relationnelle, transactions ACID & temps réel',
    icon: <Database size={18} className="text-violet-400" />,
    color: '#a78bfa',
    gradient: 'from-violet-500/20 to-purple-500/5',
    glow: 'rgba(167, 139, 250, 0.25)',
    stacks: [
      { name: 'PostgreSQL' },
      { name: 'Supabase' }
    ]
  },
  {
    id: 'ai',
    name: 'AI',
    nameFr: 'AI',
    shortDesc: 'LLM orchestrations, RAG pipelines & autonomous agent tooling',
    shortDescFr: 'Orchestration LLM, pipelines RAG & agents autonomes',
    icon: <Sparkles size={18} className="text-fuchsia-400" />,
    color: '#e879f9',
    gradient: 'from-fuchsia-500/20 to-pink-500/5',
    glow: 'rgba(232, 121, 249, 0.25)',
    stacks: [
      { name: 'OpenAI API' },
      { name: 'Gemini API' },
      { name: 'LLM APIs' },
      { name: 'RAG' },
      { name: 'AI agents / tool calling' }
    ]
  },
  {
    id: 'cloud-devops',
    name: 'Cloud & DevOps',
    nameFr: 'Cloud & DevOps',
    shortDesc: 'Automated CI/CD pipelines, edge deployments & cloud infra',
    shortDescFr: 'Pipelines CI/CD, déploiements Edge & cloud',
    icon: <Cloud size={18} className="text-amber-400" />,
    color: '#fbbf24',
    gradient: 'from-amber-500/20 to-orange-500/5',
    glow: 'rgba(251, 191, 36, 0.25)',
    stacks: [
      { name: 'Vercel' },
      { name: 'Git/GitHub' },
      { name: 'AWS basics' }
    ]
  },
  {
    id: 'apis-architecture',
    name: 'APIs & Architecture',
    nameFr: 'APIs & Architecture',
    shortDesc: 'Distributed systems, duplex WebSockets, security & OAuth',
    shortDescFr: 'Systèmes distribués, WebSockets duplex, sécurité & OAuth',
    icon: <Network size={18} className="text-indigo-400" />,
    color: '#818cf8',
    gradient: 'from-indigo-500/20 to-purple-500/5',
    glow: 'rgba(129, 140, 248, 0.25)',
    stacks: [
      { name: 'REST APIs' },
      { name: 'WebSockets' },
      { name: 'Authentication / OAuth' },
      { name: 'API integration' },
      { name: 'SQL' },
      { name: 'System design fundamentals' }
    ]
  }
];

export default function FloatingTechStack() {
  const { language, t } = useLanguage();
  // State for active domain (hovered on desktop or tapped on mobile)
  const [activeDomainId, setActiveDomainId] = useState<string | null>(null);
  const closeTimeoutRef = useRef<NodeJS.Timeout | null>(null);

  const activeCategory = TECH_DOMAINS.find((d) => d.id === activeDomainId);

  const handleMouseEnter = (id: string) => {
    if (closeTimeoutRef.current) {
      clearTimeout(closeTimeoutRef.current);
      closeTimeoutRef.current = null;
    }
    setActiveDomainId(id);
  };

  const handleMouseLeave = () => {
    closeTimeoutRef.current = setTimeout(() => {
      setActiveDomainId(null);
    }, 150);
  };

  const handleBoxMouseEnter = () => {
    if (closeTimeoutRef.current) {
      clearTimeout(closeTimeoutRef.current);
      closeTimeoutRef.current = null;
    }
  };

  const handleBoxMouseLeave = () => {
    closeTimeoutRef.current = setTimeout(() => {
      setActiveDomainId(null);
    }, 150);
  };

  const handleItemClick = (id: string) => {
    setActiveDomainId((prev) => (prev === id ? null : id));
  };

  return (
    <div className="flex flex-col gap-4" id="tech-stack">
      {/* Header */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-2">
        <div className="flex items-center gap-2.5">
          <Code2 size={18} className="text-purple-400" />
          <h3 className="font-display font-semibold text-base sm:text-lg text-white">
            {t('about.techTitle')}
          </h3>
        </div>

        {/* Hover Hint without points */}
        <div className="flex items-center text-xs text-gray-400 font-mono">
          <span className="text-purple-300/80">
            {language === 'fr' 
              ? 'Survolez une catégorie pour afficher sa stack' 
              : 'Hover over each stack to view technologies'}
          </span>
        </div>
      </div>

      {/* Stacks Categories Row - Boxless, Pure Clean Typography (No points, No numbers) */}
      <div 
        className="flex flex-wrap items-center gap-x-3 gap-y-2.5 pt-1 pb-1"
        onMouseLeave={handleMouseLeave}
      >
        {TECH_DOMAINS.map((domain, index) => {
          const isActive = activeDomainId === domain.id;

          return (
            <React.Fragment key={domain.id}>
              <button
                type="button"
                onMouseEnter={() => handleMouseEnter(domain.id)}
                onClick={() => handleItemClick(domain.id)}
                className={`group relative px-3 py-1.5 rounded-lg text-sm sm:text-base font-medium transition-all duration-200 cursor-pointer select-none ${
                  isActive
                    ? 'text-white'
                    : 'text-gray-400 hover:text-gray-100'
                }`}
                style={{
                  textShadow: isActive ? `0 0 12px ${domain.color}80` : 'none'
                }}
                aria-expanded={isActive}
              >
                {/* Subtle active indicator highlight */}
                {isActive && (
                  <motion.div
                    layoutId="active-domain-underline"
                    className="absolute inset-0 rounded-lg pointer-events-none"
                    style={{
                      backgroundColor: `${domain.color}15`,
                      borderBottom: `2px solid ${domain.color}`
                    }}
                    transition={{ type: 'spring', bounce: 0.2, duration: 0.3 }}
                  />
                )}

                {/* Domain Name (No dots, No numbers) */}
                <span className="relative z-10 font-display tracking-wide">
                  {domain.name}
                </span>
              </button>

              {/* Minimal Divider between categories */}
              {index < TECH_DOMAINS.length - 1 && (
                <span className="text-gray-700/60 select-none text-xs hidden sm:inline">•</span>
              )}
            </React.Fragment>
          );
        })}
      </div>

      {/* The Revealed Box - ONLY APPEARS WHEN HOVERING OVER THE STACKS */}
      <AnimatePresence>
        {activeCategory && (
          <motion.div
            key={activeCategory.id}
            initial={{ opacity: 0, y: -6, height: 0 }}
            animate={{ opacity: 1, y: 0, height: 'auto' }}
            exit={{ opacity: 0, y: -6, height: 0 }}
            transition={{ duration: 0.2, ease: 'easeOut' }}
            onMouseEnter={handleBoxMouseEnter}
            onMouseLeave={handleBoxMouseLeave}
            className="overflow-hidden"
          >
            <div 
              className="relative rounded-2xl border p-5 sm:p-6 backdrop-blur-xl shadow-2xl transition-all duration-300"
              style={{
                backgroundColor: 'rgba(12, 6, 28, 0.95)',
                borderColor: `${activeCategory.color}50`,
                boxShadow: `0 12px 35px -10px ${activeCategory.glow}`
              }}
            >
              {/* Ambient radial glow inside the box */}
              <div 
                className="absolute inset-0 pointer-events-none rounded-2xl opacity-30"
                style={{
                  background: `radial-gradient(ellipse at top left, ${activeCategory.color}25 0%, transparent 70%)`
                }}
              />

              <div className="relative z-10 flex flex-col gap-4">
                {/* Box Header: Icon, Domain Title, Description, and Close Button (No numbers, No points) */}
                <div className="flex items-start justify-between gap-3 border-b pb-3" style={{ borderColor: 'rgba(168, 85, 247, 0.15)' }}>
                  <div className="flex items-center gap-3">
                    <div 
                      className="w-9 h-9 rounded-xl flex items-center justify-center border shadow-sm"
                      style={{
                        backgroundColor: 'rgba(255, 255, 255, 0.05)',
                        borderColor: `${activeCategory.color}40`,
                        boxShadow: `0 0 12px -2px ${activeCategory.glow}`
                      }}
                    >
                      {activeCategory.icon}
                    </div>

                    <div>
                      <h4 className="font-display font-bold text-base sm:text-lg text-white">
                        {activeCategory.name}
                      </h4>

                      <p className="text-xs text-gray-400 mt-0.5">
                        {language === 'fr' && activeCategory.shortDescFr 
                          ? activeCategory.shortDescFr 
                          : activeCategory.shortDesc}
                      </p>
                    </div>
                  </div>

                  {/* Dismiss button for touch / convenience */}
                  <button
                    type="button"
                    onClick={() => setActiveDomainId(null)}
                    className="text-gray-400 hover:text-white p-1 rounded-md transition-colors"
                    title="Close"
                    aria-label="Close stack view"
                  >
                    <X size={16} />
                  </button>
                </div>

                {/* Stacks Chips: Clean typography badges (No colored dots beside them) */}
                <div className="flex flex-wrap gap-2 pt-1">
                  {activeCategory.stacks.map((stack) => (
                    <motion.div
                      key={stack.name}
                      initial={{ opacity: 0, scale: 0.95 }}
                      animate={{ opacity: 1, scale: 1 }}
                      transition={{ duration: 0.15 }}
                      className="font-mono text-xs sm:text-sm px-3.5 py-1.5 rounded-lg border text-gray-100 shadow-sm transition-all duration-200"
                      style={{
                        backgroundColor: 'rgba(20, 10, 38, 0.85)',
                        borderColor: `${activeCategory.color}40`
                      }}
                    >
                      <span className="font-medium tracking-tight">{stack.name}</span>
                    </motion.div>
                  ))}
                </div>
              </div>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
}
