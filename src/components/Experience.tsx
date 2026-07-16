import React from 'react';
import { Briefcase, Calendar, MapPin, ExternalLink, Globe } from 'lucide-react';
import { motion, AnimatePresence } from 'motion/react';
import { EXPERIENCES } from '../data';

export default function Experience() {
  const [activeTab, setActiveTab] = React.useState(EXPERIENCES[0].id);

  const activeExp = EXPERIENCES.find((exp) => exp.id === activeTab) || EXPERIENCES[0];

  return (
    <section
      id="experience"
      className="py-24 px-6 md:px-16 lg:px-24 xl:px-32 bg-[#03000a] border-t border-purple-950/10"
    >
      <div className="max-w-5xl flex flex-col gap-12">
        
        {/* Section Heading */}
        <div className="flex flex-col gap-3">
          <span className="font-mono text-xs text-purple-400 uppercase tracking-widest font-medium">02. Career Timeline</span>
          <h2 className="font-display text-3xl sm:text-4xl font-bold tracking-tight text-white">Professional Experience</h2>
          <div className="h-[2px] w-16 bg-gradient-to-r from-purple-500 to-violet-600 rounded" />
        </div>

        {/* Tabbed Board Layout */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-start mt-4">
          
          {/* Tabs Column */}
          <div className="lg:col-span-4 flex lg:flex-col overflow-x-auto lg:overflow-x-visible pb-2 lg:pb-0 scrollbar-none border-b lg:border-b-0 lg:border-l border-purple-950/20 gap-1 select-none">
            {EXPERIENCES.map((exp) => {
              const isActive = exp.id === activeTab;
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
                      {exp.duration}
                    </span>
                  </div>
                </button>
              );
            })}
          </div>

          {/* Details Column */}
          <div className="lg:col-span-8 min-h-[360px] bg-zinc-950/40 border border-purple-950/20 p-6 sm:p-8 rounded-xl relative overflow-hidden">
            <AnimatePresence mode="wait">
              <motion.div
                key={activeTab}
                initial={{ opacity: 0, y: 15 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, y: -15 }}
                transition={{ duration: 0.3 }}
                className="flex flex-col gap-6"
              >
                {/* Header info */}
                <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3 pb-5 border-b border-purple-950/40">
                  <div className="flex flex-col gap-1">
                    <h3 className="font-display font-bold text-lg sm:text-xl text-white">
                      {activeExp.role}
                    </h3>
                    <div className="flex items-center gap-2 text-sm text-purple-400 font-medium">
                      <span>{activeExp.company}</span>
                      {activeExp.website && (
                        <a
                          href={activeExp.website}
                          target="_blank"
                          rel="noreferrer"
                          className="hover:text-purple-300 transition-colors inline-flex items-center gap-0.5 text-xs font-mono"
                        >
                          <ExternalLink size={12} />
                          Visit Site
                        </a>
                      )}
                    </div>
                  </div>

                  {/* Date & Location Badges */}
                  <div className="flex flex-wrap items-center gap-2.5">
                    <div className="flex items-center gap-1.5 font-mono text-[10px] text-gray-400 px-2.5 py-1 bg-purple-950/20 border border-purple-900/25 rounded-md">
                      <Calendar size={12} className="text-purple-400/80" />
                      {activeExp.duration}
                    </div>
                    <div className="flex items-center gap-1.5 font-mono text-[10px] text-gray-400 px-2.5 py-1 bg-black/40 border border-purple-950/30 rounded-md">
                      <MapPin size={12} className="text-purple-400/80" />
                      {activeExp.location}
                    </div>
                  </div>
                </div>

                {/* Achievements points */}
                <ul className="flex flex-col gap-4">
                  {activeExp.points.map((point, index) => (
                    <li key={index} className="flex gap-3 text-sm text-gray-300 leading-relaxed">
                      {/* Interactive bullet */}
                      <span className="flex-shrink-0 mt-1.5 w-1.5 h-1.5 rounded-full bg-purple-500" />
                      <span>{point}</span>
                    </li>
                  ))}
                </ul>

                {/* Micro tech used on this role */}
                <div className="pt-4 flex flex-col gap-2">
                  <span className="font-mono text-[10px] text-gray-500 uppercase tracking-wider">Key Area of Competence</span>
                  <div className="flex flex-wrap gap-2">
                    {activeExp.id === 'pycon-togo' ? (
                      ['Frontend Architecture', 'Event Dashboards', 'UI/UX Design', 'Stakeholder Communication', 'Real-Time Schedules'].map((tag) => (
                        <span key={tag} className="font-mono text-[10px] px-2.5 py-1 bg-[#090514] border border-purple-950 text-gray-400 rounded-md">
                          {tag}
                        </span>
                      ))
                    ) : (
                      ['Full-Stack Development', 'Real-Time Communication', 'System Design', 'Performance Optimization', 'E-commerce Architecture'].map((tag) => (
                        <span key={tag} className="font-mono text-[10px] px-2.5 py-1 bg-[#090514] border border-purple-950 text-gray-400 rounded-md">
                          {tag}
                        </span>
                      ))
                    )}
                  </div>
                </div>

              </motion.div>
            </AnimatePresence>
          </div>

        </div>

      </div>
    </section>
  );
}
