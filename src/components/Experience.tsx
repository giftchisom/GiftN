import React from 'react';
import { Calendar, MapPin, ExternalLink } from 'lucide-react';
import { motion, AnimatePresence } from 'motion/react';
import { EXPERIENCES } from '../data';
import { useLanguage } from '../context/LanguageContext';
import HiddenGift from './HiddenGift';

export default function Experience() {
  const { language, t } = useLanguage();
  const [activeTab, setActiveTab] = React.useState(EXPERIENCES[0].id);

  const activeExp = EXPERIENCES.find((exp) => exp.id === activeTab) || EXPERIENCES[0];
  const role = (language === 'fr' && activeExp.roleFr) ? activeExp.roleFr : activeExp.role;
  const duration = (language === 'fr' && activeExp.durationFr) ? activeExp.durationFr : activeExp.duration;
  const location = (language === 'fr' && activeExp.locationFr) ? activeExp.locationFr : activeExp.location;
  const points = (language === 'fr' && activeExp.pointsFr) ? activeExp.pointsFr : activeExp.points;

  return (
    <section
      id="experience"
      className="py-24 px-6 md:px-16 lg:px-24 xl:px-32 bg-transparent border-t border-purple-950/15"
    >
      <div className="max-w-5xl flex flex-col gap-10">
        
        {/* Section Heading */}
        <div className="flex flex-col gap-3">
          <span className="font-mono text-xs text-purple-400 uppercase tracking-widest font-medium">
            {t('exp.badge')}
          </span>
          <h2 className="font-display text-3xl sm:text-4xl font-bold tracking-tight text-white">
            {t('exp.title')}
          </h2>
          <div className="h-[2px] w-16 bg-purple-500 rounded" />
        </div>

        {/* Tabbed Board Layout */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-start">
          
          {/* Tabs Column */}
          <div className="lg:col-span-4 flex lg:flex-col overflow-x-auto lg:overflow-x-visible pb-2 lg:pb-0 scrollbar-none border-b lg:border-b-0 lg:border-l border-purple-950/20 gap-1 select-none">
            {EXPERIENCES.map((exp) => {
              const isActive = exp.id === activeTab;
              const expDuration = (language === 'fr' && exp.durationFr) ? exp.durationFr : exp.duration;

              return (
                <button
                  key={exp.id}
                  onClick={() => setActiveTab(exp.id)}
                  className={`text-left py-3 px-4 lg:py-4 lg:px-6 font-display text-xs sm:text-sm tracking-wider font-medium uppercase transition-all duration-300 relative whitespace-nowrap lg:whitespace-normal flex-shrink-0 cursor-pointer ${
                    isActive
                      ? 'text-purple-300'
                      : 'text-gray-500 hover:text-gray-300 hover:bg-purple-950/10'
                  }`}
                >
                  {/* Left Highlight Bar (Desktop Only) */}
                  {isActive && (
                    <motion.div
                      layoutId="activeTabIndicatorDesktop"
                      className="hidden lg:block absolute left-0 top-0 bottom-0 w-[2px] bg-purple-500 shadow-[0_0_8px_rgba(168,85,247,0.5)]"
                      transition={{ type: 'spring', stiffness: 380, damping: 30 }}
                    />
                  )}

                  {/* Bottom Highlight Bar (Mobile Only) */}
                  {isActive && (
                    <motion.div
                      layoutId="activeTabIndicatorMobile"
                      className="block lg:hidden absolute bottom-0 left-0 right-0 h-[2px] bg-purple-500 shadow-[0_0_8px_rgba(168,85,247,0.5)]"
                      transition={{ type: 'spring', stiffness: 380, damping: 30 }}
                    />
                  )}

                  <div className="flex flex-col gap-0.5">
                    <span className="font-semibold block">{exp.company}</span>
                    <span className="text-[10px] text-gray-500 capitalize tracking-normal font-mono block mt-0.5 lg:mt-1">
                      {expDuration}
                    </span>
                  </div>
                </button>
              );
            })}
          </div>

          {/* Details Column */}
          <div className="lg:col-span-8 bg-zinc-950/40 border border-purple-950/20 p-6 sm:p-7 rounded-xl relative overflow-hidden">
            <AnimatePresence mode="wait">
              <motion.div
                key={activeTab}
                initial={{ opacity: 0, y: 10 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, y: -10 }}
                transition={{ duration: 0.25 }}
                className="flex flex-col gap-6"
              >
                {/* Header info */}
                <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3 pb-4 border-b border-purple-950/40">
                  <div className="flex flex-col gap-1">
                    <h3 className="font-display font-bold text-lg text-white">
                      {role}
                    </h3>
                    <div className="flex items-center gap-2 text-sm text-purple-400 font-medium">
                      <span>{activeExp.company}</span>
                      {activeExp.website && (
                        <a
                          href={activeExp.website}
                          target="_blank"
                          rel="noreferrer"
                          className="hover:text-purple-300 transition-colors inline-flex items-center gap-1 text-xs font-mono"
                        >
                          <ExternalLink size={12} />
                          {t('exp.visitSite')}
                        </a>
                      )}
                    </div>
                  </div>

                  {/* Date & Location Badges */}
                  <div className="flex flex-wrap items-center gap-2">
                    <div className="flex items-center gap-1.5 font-mono text-[10px] text-gray-400 px-2.5 py-1 bg-purple-950/20 border border-purple-900/25 rounded-md">
                      <Calendar size={12} className="text-purple-400/80" />
                      {duration}
                    </div>
                    <div className="flex items-center gap-1.5 font-mono text-[10px] text-gray-400 px-2.5 py-1 bg-black/40 border border-purple-950/30 rounded-md">
                      <MapPin size={12} className="text-purple-400/80" />
                      {location}
                    </div>
                  </div>
                </div>

                {/* Achievements points - Simplified & Crisp */}
                <ul className="flex flex-col gap-3">
                  {points.map((point, index) => (
                    <li key={index} className="flex gap-3 text-sm text-gray-300 leading-relaxed">
                      <span className="flex-shrink-0 mt-2 w-1.5 h-1.5 rounded-full bg-purple-500" />
                      <span>{point}</span>
                    </li>
                  ))}
                </ul>

                {/* Clean Competencies Tags */}
                {activeExp.tags && activeExp.tags.length > 0 && (
                  <div className="pt-2 flex flex-wrap items-center gap-2">
                    <span className="font-mono text-[10px] text-gray-500 uppercase tracking-wider mr-1">
                      {t('exp.coreCompetencies')}:
                    </span>
                    {activeExp.tags.map((tag) => (
                      <span
                        key={tag}
                        className="font-mono text-[10px] px-2.5 py-0.5 bg-[#090514] border border-purple-950 text-gray-400 rounded-md"
                      >
                        {tag}
                      </span>
                    ))}
                    <HiddenGift id={3} tooltipSide="top" />
                  </div>
                )}

              </motion.div>
            </AnimatePresence>
          </div>

        </div>

      </div>
    </section>
  );
}
