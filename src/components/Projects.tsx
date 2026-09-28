import React, { useState, useEffect } from 'react';
import { 
  Github, 
  ExternalLink, 
  ZoomIn,
  X
} from 'lucide-react';
import { motion, AnimatePresence } from 'motion/react';
import { PROJECTS } from '../data';
import { useLanguage } from '../context/LanguageContext';
// @ts-ignore
import santeflowImg from '../assets/images/santeflow.png';
// @ts-ignore
import iunImg from '../assets/images/iun_centralized.png';
// @ts-ignore
import portfolioImg from '../assets/images/portfolio_mockup.svg';

interface SelectedImage {
  src: string;
  title: string;
  desc: string;
}

export default function Projects() {
  const { language, t } = useLanguage();
  const [selectedImage, setSelectedImage] = useState<SelectedImage | null>(null);

  // Prevent background scrolling when modal is open
  useEffect(() => {
    if (selectedImage) {
      document.body.style.overflow = 'hidden';
    } else {
      document.body.style.overflow = '';
    }
    return () => {
      document.body.style.overflow = '';
    };
  }, [selectedImage]);

  return (
    <section
      id="projects"
      className="py-24 px-6 md:px-16 lg:px-24 xl:px-32 bg-transparent border-t border-purple-950/15"
    >
      <div className="max-w-5xl flex flex-col gap-10">
        
        {/* Section Heading */}
        <div className="flex flex-col gap-3">
          <span className="font-mono text-xs text-purple-400 uppercase tracking-widest font-medium">
            {t('proj.badge')}
          </span>
          <h2 className="font-display text-3xl sm:text-4xl font-bold tracking-tight text-white">
            {t('proj.title')}
          </h2>
          <div className="h-[2px] w-16 bg-purple-500 rounded" />
        </div>

        {/* Projects Grid */}
        <div className="flex flex-col gap-8">
          {PROJECTS.map((project, idx) => {
            const isEven = idx % 2 === 0;
            const projectRole = (language === 'fr' && project.roleFr) ? project.roleFr : project.role;
            const projectDuration = (language === 'fr' && project.durationFr) ? project.durationFr : project.duration;
            const projectDescription = (language === 'fr' && project.descriptionFr) ? project.descriptionFr : project.description;

            return (
              <div 
                key={project.id}
                className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-center bg-[#070412]/40 border border-purple-950/20 hover:border-purple-800/30 p-6 sm:p-7 rounded-2xl transition-all duration-300"
              >
                
                {/* Visual Live Mockup Column */}
                <div className={`lg:col-span-5 ${isEven ? 'lg:order-1' : 'lg:order-2'} flex justify-center`}>
                  <div className={`w-full max-w-[340px] aspect-[4/3] bg-black/60 border border-purple-950/40 rounded-xl overflow-hidden relative shadow-lg flex flex-col justify-between group ${
                    (project.demoMockupType === 'santeflow' || project.demoMockupType === 'iun') ? 'p-0' : 'p-4'
                  }`}>
                    
                    {/* Header bar of mockup */}
                    {project.demoMockupType !== 'santeflow' && project.demoMockupType !== 'iun' && (
                      <div className="flex items-center justify-between border-b border-purple-950/30 pb-2 mb-2">
                        <div className="flex items-center gap-1.5">
                          <div className="w-2.5 h-2.5 rounded-full bg-red-500/80" />
                          <div className="w-2.5 h-2.5 rounded-full bg-yellow-500/80" />
                          <div className="w-2.5 h-2.5 rounded-full bg-green-500/80" />
                        </div>
                        <span className="font-mono text-[9px] text-gray-500 select-none">
                          {project.title.toLowerCase().replace(/\s+/g, '-')}.app
                        </span>
                        <div className="w-4" />
                      </div>
                    )}

                    {/* SantéFlow Mockup */}
                    {project.demoMockupType === 'santeflow' && (
                      <button 
                        onClick={() => setSelectedImage({
                          src: santeflowImg,
                          title: "SantéFlow - AI Health Platform",
                          desc: "AI-powered personalized health recommendation dashboard."
                        })}
                        className="w-full h-full relative overflow-hidden cursor-zoom-in group/img border-0 p-0 m-0 bg-transparent block"
                      >
                        <img 
                          src={santeflowImg} 
                          alt="SantéFlow App Showcase"
                          className="w-full h-full object-cover transition-transform duration-500 group-hover/img:scale-105"
                          referrerPolicy="no-referrer"
                        />
                        <div className="absolute inset-0 bg-purple-950/40 opacity-0 group-hover/img:opacity-100 transition-opacity duration-300 flex items-center justify-center backdrop-blur-[1px]">
                          <div className="bg-zinc-950/90 border border-purple-500/30 p-2 sm:p-2.5 rounded-full text-white shadow-xl flex items-center gap-1.5 transform scale-90 group-hover/img:scale-100 transition-transform duration-300">
                            <ZoomIn size={14} className="text-purple-400" />
                            <span className="text-[10px] font-mono uppercase tracking-wider pr-1">{t('proj.viewFull')}</span>
                          </div>
                        </div>
                      </button>
                    )}

                    {/* IUN University Network Mockup */}
                    {project.demoMockupType === 'iun' && (
                      <button 
                        onClick={() => setSelectedImage({
                          src: iunImg,
                          title: "IUN Centralized Communication & Resource Network (Applied Research)",
                          desc: "Applied systems research and full-stack engineering solving campus information bottlenecks, eliminating syllabus loss and connecting 500+ students and faculty."
                        })}
                        className="w-full h-full relative overflow-hidden cursor-zoom-in group/img border-0 p-0 m-0 bg-transparent block"
                      >
                        <img 
                          src={iunImg} 
                          alt="IUN Network Showcase"
                          className="w-full h-full object-cover transition-transform duration-500 group-hover/img:scale-105"
                          referrerPolicy="no-referrer"
                        />
                        <div className="absolute inset-0 bg-purple-950/40 opacity-0 group-hover/img:opacity-100 transition-opacity duration-300 flex items-center justify-center backdrop-blur-[1px]">
                          <div className="bg-zinc-950/90 border border-purple-500/30 p-2 sm:p-2.5 rounded-full text-white shadow-xl flex items-center gap-1.5 transform scale-90 group-hover/img:scale-100 transition-transform duration-300">
                            <ZoomIn size={14} className="text-purple-400" />
                            <span className="text-[10px] font-mono uppercase tracking-wider pr-1">{t('proj.viewFull')}</span>
                          </div>
                        </div>
                      </button>
                    )}

                    {/* Voice Agent Mockup */}
                    {project.demoMockupType === 'voiceagent' && (
                      <div className="flex-1 flex flex-col items-center justify-center gap-3 py-3">
                        <div className="w-14 h-14 rounded-full bg-purple-700 flex items-center justify-center text-white shadow-[0_0_25px_rgba(147,51,234,0.4)] animate-pulse">
                          <span className="font-mono text-xs font-bold">AI</span>
                        </div>
                        <div className="flex items-center gap-1">
                          <div className="w-1 h-3 bg-purple-400 animate-pulse rounded" />
                          <div className="w-1 h-5 bg-indigo-400 animate-pulse delay-75 rounded" />
                          <div className="w-1 h-2 bg-violet-400 animate-pulse delay-150 rounded" />
                          <div className="w-1 h-6 bg-purple-300 animate-pulse delay-200 rounded" />
                          <div className="w-1 h-3 bg-indigo-400 animate-pulse rounded" />
                        </div>
                        <span className="font-mono text-[8px] text-purple-300/80">WebRTC LiveKit Stream</span>
                      </div>
                    )}

                    {/* Portfolio Mockup on iPad Air 4 */}
                    {project.demoMockupType === 'portfolio' && (
                      <button 
                        onClick={() => setSelectedImage({
                          src: portfolioImg,
                          title: "Interactive Developer Portfolio on iPad",
                          desc: "Responsive personal portfolio featuring dark-ambient physics, live audio, and modular showcases."
                        })}
                        className="w-full h-full relative overflow-hidden cursor-zoom-in group/img border-0 p-0 m-0 bg-transparent block"
                      >
                        <img 
                          src={portfolioImg} 
                          alt="Interactive Developer Portfolio on iPad"
                          className="w-full h-full object-cover transition-transform duration-500 group-hover/img:scale-105"
                          referrerPolicy="no-referrer"
                        />
                        <div className="absolute inset-0 bg-purple-950/40 opacity-0 group-hover/img:opacity-100 transition-opacity duration-300 flex items-center justify-center backdrop-blur-[1px]">
                          <div className="bg-zinc-950/90 border border-purple-500/30 p-2 sm:p-2.5 rounded-full text-white shadow-xl flex items-center gap-1.5 transform scale-90 group-hover/img:scale-100 transition-transform duration-300">
                            <ZoomIn size={14} className="text-purple-400" />
                            <span className="text-[10px] font-mono uppercase tracking-wider pr-1">{t('proj.viewFull')}</span>
                          </div>
                        </div>
                      </button>
                    )}

                  </div>
                </div>

                {/* Project Description Column - Clean, Crisp & Uncluttered */}
                <div className={`lg:col-span-7 ${isEven ? 'lg:order-2' : 'lg:order-1'} flex flex-col gap-4`}>
                  
                  {/* Meta details */}
                  <div className="flex flex-col gap-1">
                    <div className="flex flex-wrap items-center gap-2">
                      <span className="font-mono text-[10px] text-purple-400 uppercase tracking-widest font-semibold bg-purple-950/20 border border-purple-900/25 px-2.5 py-0.5 rounded-md">
                        {projectDuration}
                      </span>
                      <span className="font-mono text-[10px] text-gray-500">
                        {t('proj.role')}: {projectRole}
                      </span>
                    </div>
                    <h3 className="font-display font-bold text-xl sm:text-2xl text-white tracking-tight mt-0.5">
                      {project.title}
                    </h3>
                  </div>

                  {/* Concise Description */}
                  <div className="flex flex-col gap-2">
                    {projectDescription.map((desc, i) => (
                      <p key={i} className="text-gray-300 text-xs sm:text-sm leading-relaxed">
                        {desc}
                      </p>
                    ))}
                  </div>

                  {/* Research & Problem-Solving Work Breakdown */}
                  {project.researchDetails && (
                    <div className="p-3.5 sm:p-4 rounded-xl bg-[#0a0518]/90 border border-purple-900/40 flex flex-col gap-2.5 text-xs my-0.5">
                      <div className="flex items-center gap-2">
                        <span className="w-1.5 h-1.5 rounded-full bg-cyan-400 animate-pulse" />
                        <span className="font-mono text-[10px] text-cyan-300 font-semibold tracking-wider uppercase">
                          {language === 'fr' ? (project.researchDetails.badgeFr || project.researchDetails.badge) : project.researchDetails.badge}
                        </span>
                      </div>

                      <div className="grid grid-cols-1 gap-2 pt-0.5">
                        {/* Problem */}
                        <div className="flex items-start gap-2.5 bg-[#05020d]/80 p-2.5 rounded-lg border border-red-950/40">
                          <span className="font-mono text-[9px] uppercase px-1.5 py-0.5 rounded bg-red-950/70 text-red-300 font-bold shrink-0 mt-0.5">
                            {language === 'fr' ? 'Problème Identifié' : 'Identified Problem'}
                          </span>
                          <p className="text-gray-300 text-[11px] sm:text-xs leading-relaxed">
                            {language === 'fr' ? (project.researchDetails.problemFr || project.researchDetails.problem) : project.researchDetails.problem}
                          </p>
                        </div>

                        {/* Methodology / Research */}
                        <div className="flex items-start gap-2.5 bg-[#05020d]/80 p-2.5 rounded-lg border border-purple-950/40">
                          <span className="font-mono text-[9px] uppercase px-1.5 py-0.5 rounded bg-purple-950/70 text-purple-300 font-bold shrink-0 mt-0.5">
                            {language === 'fr' ? 'Méthodologie & Recherche' : 'Field Research & Architecture'}
                          </span>
                          <p className="text-gray-300 text-[11px] sm:text-xs leading-relaxed">
                            {language === 'fr' ? (project.researchDetails.methodologyFr || project.researchDetails.methodology) : project.researchDetails.methodology}
                          </p>
                        </div>

                        {/* Solution & Impact */}
                        <div className="flex items-start gap-2.5 bg-[#05020d]/80 p-2.5 rounded-lg border border-emerald-950/40">
                          <span className="font-mono text-[9px] uppercase px-1.5 py-0.5 rounded bg-emerald-950/70 text-emerald-300 font-bold shrink-0 mt-0.5">
                            {language === 'fr' ? 'Solution & Impact' : 'Solved Outcome & Impact'}
                          </span>
                          <p className="text-gray-300 text-[11px] sm:text-xs leading-relaxed">
                            {language === 'fr' ? (project.researchDetails.solutionFr || project.researchDetails.solution) : project.researchDetails.solution}
                          </p>
                        </div>
                      </div>
                    </div>
                  )}

                  {/* Tech stack badges - 3-4 top badges */}
                  <div className="flex flex-wrap gap-1.5 pt-1">
                    {project.tags.map((tag) => (
                      <span 
                        key={tag}
                        className="font-mono text-[10px] text-gray-300 bg-[#090514] border border-purple-950/80 px-2 py-0.5 rounded-md"
                      >
                        {tag}
                      </span>
                    ))}
                  </div>

                  {/* Navigation Links */}
                  <div className="flex items-center gap-4 pt-2 text-sm">
                    {project.githubUrl && (
                      <a 
                        href={project.githubUrl}
                        target="_blank"
                        rel="noreferrer"
                        className="flex items-center gap-1.5 text-gray-400 hover:text-purple-400 transition-colors font-mono text-xs cursor-pointer"
                        title="View GitHub Repository"
                      >
                        <Github size={14} />
                        {t('proj.github')}
                      </a>
                    )}
                    
                    {project.liveUrl && project.liveUrl !== '#' && (
                      <a 
                        href={project.liveUrl}
                        target="_blank"
                        rel="noreferrer"
                        className="flex items-center gap-1.5 text-gray-400 hover:text-purple-400 transition-colors font-mono text-xs cursor-pointer"
                        title="View Live Application"
                      >
                        <ExternalLink size={14} />
                        {t('proj.live')}
                      </a>
                    )}
                  </div>

                </div>

              </div>
            );
          })}
        </div>

      </div>

      {/* Interactive Project Image Zoom Modal */}
      <AnimatePresence>
        {selectedImage && (
          <div className="fixed inset-0 z-50 flex items-center justify-center p-4 sm:p-6 md:p-10">
            {/* Backdrop */}
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              onClick={() => setSelectedImage(null)}
              className="absolute inset-0 bg-[#030108]/95 backdrop-blur-md"
            />

            {/* Modal Container */}
            <motion.div
              initial={{ opacity: 0, scale: 0.95, y: 15 }}
              animate={{ opacity: 1, scale: 1, y: 0 }}
              exit={{ opacity: 0, scale: 0.95, y: 15 }}
              transition={{ type: 'spring', duration: 0.4 }}
              className="relative w-full max-w-5xl bg-[#070412]/95 border border-purple-500/25 rounded-2xl overflow-hidden shadow-[0_0_60px_-10px_rgba(168,85,247,0.35)] z-10 flex flex-col"
            >
              {/* Close Button */}
              <button
                onClick={() => setSelectedImage(null)}
                className="absolute top-4 right-4 z-20 p-2 rounded-lg bg-zinc-900/80 border border-purple-950/30 text-gray-400 hover:text-white transition-colors cursor-pointer shadow-md"
                aria-label="Close image zoom"
              >
                <X size={18} />
              </button>

              {/* Image Area */}
              <div className="p-4 sm:p-6 flex items-center justify-center bg-black/40 overflow-hidden max-h-[70vh]">
                <img
                  src={selectedImage.src}
                  alt={selectedImage.title}
                  referrerPolicy="no-referrer"
                  className="max-w-full max-h-[60vh] object-contain rounded-lg shadow-2xl border border-purple-950/30"
                />
              </div>

              {/* Caption Area */}
              <div className="p-6 bg-[#090516] border-t border-purple-950/40 flex flex-col gap-1.5">
                <h3 className="font-display font-bold text-lg text-white leading-tight">
                  {selectedImage.title}
                </h3>
                <p className="text-sm text-gray-400">
                  {selectedImage.desc}
                </p>
              </div>
            </motion.div>
          </div>
        )}
      </AnimatePresence>
    </section>
  );
}
