import React, { useState, useEffect } from 'react';
import { 
  Github, 
  ExternalLink, 
  Activity, 
  Users, 
  Mic, 
  Calendar, 
  Heart, 
  Shield, 
  CheckCircle,
  Clock,
  ZoomIn,
  X
} from 'lucide-react';
import { motion, AnimatePresence } from 'motion/react';
import { PROJECTS } from '../data';
// @ts-ignore
import santeflowImg from '../assets/images/santeflow.png';
// @ts-ignore
import iunImg from '../assets/images/iun_centralized.png';

interface SelectedImage {
  src: string;
  title: string;
  desc: string;
}

export default function Projects() {
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
      className="py-24 px-6 md:px-16 lg:px-24 xl:px-32 bg-[#04010b]/60 border-t border-purple-950/10"
    >
      <div className="max-w-5xl flex flex-col gap-12">
        
        {/* Section Heading */}
        <div className="flex flex-col gap-3">
          <span className="font-mono text-xs text-purple-400 uppercase tracking-widest font-medium">03. Portfolios of Work</span>
          <h2 className="font-display text-3xl sm:text-4xl font-bold tracking-tight text-white">Featured Projects</h2>
          <div className="h-[2px] w-16 bg-gradient-to-r from-purple-500 to-violet-600 rounded" />
        </div>

        {/* Projects Grid */}
        <div className="flex flex-col gap-16">
          {PROJECTS.map((project, idx) => {
            const isEven = idx % 2 === 0;

            return (
              <div 
                key={project.id}
                className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-center bg-[#070412]/40 border border-purple-950/20 hover:border-purple-800/20 p-6 sm:p-8 rounded-2xl transition-all duration-300"
              >
                
                {/* Visual Live CSS Mockup Column */}
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
                            <span className="text-[10px] font-mono uppercase tracking-wider pr-1">View Full Photo</span>
                          </div>
                        </div>
                      </button>
                    )}

                    {/* IUN University Network Mockup */}
                    {project.demoMockupType === 'iun' && (
                      <button 
                        onClick={() => setSelectedImage({
                          src: iunImg,
                          title: "IUN Centralized Communication & Resource Network",
                          desc: "Exclusively designed resource-sharing and collaborative network for staff and students."
                        })}
                        className="w-full h-full relative overflow-hidden cursor-zoom-in group/img border-0 p-0 m-0 bg-transparent block"
                      >
                        <img 
                          src={iunImg} 
                          alt="IUN Centralized Communication Network"
                          className="w-full h-full object-cover transition-transform duration-500 group-hover/img:scale-105"
                          referrerPolicy="no-referrer"
                        />
                        <div className="absolute inset-0 bg-purple-950/40 opacity-0 group-hover/img:opacity-100 transition-opacity duration-300 flex items-center justify-center backdrop-blur-[1px]">
                          <div className="bg-zinc-950/90 border border-purple-500/30 p-2 sm:p-2.5 rounded-full text-white shadow-xl flex items-center gap-1.5 transform scale-90 group-hover/img:scale-100 transition-transform duration-300">
                            <ZoomIn size={14} className="text-purple-400" />
                            <span className="text-[10px] font-mono uppercase tracking-wider pr-1">View Full Photo</span>
                          </div>
                        </div>
                      </button>
                    )}

                    {/* AI Voice Agent Mockup */}
                    {project.demoMockupType === 'voiceagent' && (
                      <div className="flex-1 flex flex-col gap-2.5 justify-center items-center">
                        <div className="relative w-14 h-14 rounded-full bg-purple-900/20 border-2 border-purple-500/40 flex items-center justify-center">
                          <Mic size={20} className="text-purple-300 animate-pulse" />
                          <div className="absolute inset-0 rounded-full border border-purple-400/20 animate-ping" />
                        </div>
                        
                        <div className="flex flex-col items-center gap-1 text-center">
                          <span className="font-display font-medium text-[10px] text-white">LiveKit Voice Stream</span>
                          <span className="font-mono text-[8px] text-green-400">LATENCY: 120ms • MULTILINGUAL</span>
                        </div>

                        {/* Audio wave simulation */}
                        <div className="flex items-center gap-1 h-5 pt-1">
                          <div className="w-[3px] bg-purple-500/60 rounded h-2 animate-[bounce_0.8s_infinite]" />
                          <div className="w-[3px] bg-purple-400 rounded h-4 animate-[bounce_0.5s_infinite_delay-100]" />
                          <div className="w-[3px] bg-purple-300 rounded h-3 animate-[bounce_0.6s_infinite_delay-200]" />
                          <div className="w-[3px] bg-violet-400 rounded h-5 animate-[bounce_0.7s_infinite_delay-300]" />
                          <div className="w-[3px] bg-indigo-500 rounded h-2 animate-[bounce_0.4s_infinite_delay-150]" />
                        </div>
                      </div>
                    )}

                    {/* Portfolio Mockup */}
                    {project.demoMockupType === 'portfolio' && (
                      <div className="flex-1 flex flex-col gap-2 justify-center items-center p-1.5 w-full">
                        {/* Mockup Sidebar/Main area */}
                        <div className="w-full flex gap-1.5 items-stretch flex-1 min-h-[100px]">
                          {/* Mini Sidebar representation */}
                          <div className="w-[28%] bg-purple-950/20 border border-purple-900/30 rounded-lg p-1.5 flex flex-col gap-2 justify-between">
                            <div className="flex flex-col gap-1">
                              <div className="w-6 h-1 bg-purple-400/80 rounded" />
                              <div className="w-4 h-0.5 bg-gray-700 rounded mt-1" />
                              <div className="w-5 h-0.5 bg-gray-700 rounded" />
                              <div className="w-3.5 h-0.5 bg-gray-700 rounded" />
                            </div>
                            <div className="flex gap-1 justify-center">
                              <div className="w-1.5 h-1.5 rounded-full bg-purple-500/55" />
                              <div className="w-1.5 h-1.5 rounded-full bg-purple-500/55" />
                              <div className="w-1.5 h-1.5 rounded-full bg-purple-500/55" />
                            </div>
                          </div>
                          {/* Mini Main content representation */}
                          <div className="flex-1 bg-zinc-950/50 border border-purple-950/30 rounded-lg p-2 flex flex-col justify-between">
                            <div className="flex flex-col gap-1">
                              <div className="w-12 h-1.5 bg-white/90 rounded" />
                              <div className="w-16 h-1 bg-purple-400/50 rounded" />
                              <div className="flex gap-1 mt-1">
                                <div className="w-3 h-1 bg-gray-800 rounded" />
                                <div className="w-4 h-1 bg-gray-800 rounded" />
                                <div className="w-2.5 h-1 bg-gray-800 rounded" />
                              </div>
                            </div>
                            {/* Rotating planet or orb in mockup */}
                            <div className="self-end relative w-8 h-8 rounded-full border border-dashed border-purple-500/25 flex items-center justify-center animate-[spin_8s_linear_infinite]">
                              <div className="w-2.5 h-2.5 rounded-full bg-gradient-to-r from-purple-500 to-indigo-500 shadow-[0_0_6px_rgba(168,85,247,0.4)]" />
                            </div>
                          </div>
                        </div>
                        <div className="text-center mt-0.5">
                          <span className="font-display font-medium text-[9px] text-white leading-none block">Gift Nneji Portfolio</span>
                          <span className="font-mono text-[7px] text-purple-400 uppercase tracking-wider block">Self-Reflective Application</span>
                        </div>
                      </div>
                    )}

                    {/* Bottom stats block */}
                    {project.demoMockupType !== 'santeflow' && project.demoMockupType !== 'iun' && (
                      <div className="flex items-center justify-between border-t border-purple-950/30 pt-1.5 mt-1">
                        <span className="font-mono text-[7px] text-purple-400/80 uppercase tracking-widest font-medium">
                          SYSTEM OK
                        </span>
                        <span className="font-mono text-[7px] text-gray-500">
                          LATENCY: 0ms
                        </span>
                      </div>
                    )}

                  </div>
                </div>

                {/* Project Description Column */}
                <div className={`lg:col-span-7 ${isEven ? 'lg:order-2' : 'lg:order-1'} flex flex-col gap-5`}>
                  
                  {/* Meta details */}
                  <div className="flex flex-col gap-1">
                    <div className="flex flex-wrap items-center gap-2">
                      <span className="font-mono text-[10px] text-purple-400 uppercase tracking-widest font-semibold bg-purple-950/20 border border-purple-900/25 px-2 py-0.5 rounded-md">
                        {project.duration}
                      </span>
                      <span className="font-mono text-[10px] text-gray-500">
                        Role: {project.role}
                      </span>
                    </div>
                    <h3 className="font-display font-bold text-xl sm:text-2xl text-white tracking-tight mt-1">
                      {project.title}
                    </h3>
                  </div>

                  {/* Bullet points mapping */}
                  <div className="flex flex-col gap-3">
                    {project.description.map((bullet, idx) => (
                      <p key={idx} className="text-gray-400 text-xs sm:text-sm leading-relaxed">
                        {bullet}
                      </p>
                    ))}
                  </div>

                  {/* Tech stack badges */}
                  <div className="flex flex-wrap gap-2 pt-2">
                    {project.tags.map((tag) => (
                      <span 
                        key={tag}
                        className="font-mono text-[10px] text-gray-300 bg-[#090514] border border-purple-950/80 px-2.5 py-1 rounded-md"
                      >
                        {tag}
                      </span>
                    ))}
                  </div>

                  {/* Navigation Links */}
                  <div className="flex items-center gap-4 pt-3 text-sm">
                    {project.githubUrl && (
                      <a 
                        href={project.githubUrl}
                        target="_blank"
                        rel="noreferrer"
                        className="flex items-center gap-1.5 text-gray-400 hover:text-purple-400 transition-colors font-mono text-xs cursor-pointer"
                        title="View GitHub Repository"
                      >
                        <Github size={14} />
                        GitHub
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
                        Live Link
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
