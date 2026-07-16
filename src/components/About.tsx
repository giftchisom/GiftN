import React, { useState, useEffect } from 'react';
import { 
  GraduationCap, 
  Award, 
  Globe, 
  Terminal, 
  Cpu, 
  Database, 
  Layout, 
  Settings, 
  Workflow,
  ExternalLink,
  X,
  ShieldCheck,
  CheckCircle2,
  Calendar,
  Sparkles
} from 'lucide-react';
import { motion, AnimatePresence } from 'motion/react';
import { 
  TECHNICAL_SKILLS, 
  EDUCATION, 
  CERTIFICATIONS 
} from '../data';

export default function About() {
  const [selectedCert, setSelectedCert] = useState<any>(null);

  useEffect(() => {
    if (selectedCert) {
      document.body.style.overflow = 'hidden';
    } else {
      document.body.style.overflow = '';
    }
    return () => {
      document.body.style.overflow = '';
    };
  }, [selectedCert]);
  return (
    <section
      id="about"
      className="py-24 px-6 md:px-16 lg:px-24 xl:px-32 bg-[#04010b]/60 border-t border-purple-950/10"
    >
      <div className="max-w-5xl flex flex-col gap-12">
        
        {/* Section Heading */}
        <div className="flex flex-col gap-3">
          <span className="font-mono text-xs text-purple-400 uppercase tracking-widest font-medium">01. Identity & Skills</span>
          <h2 className="font-display text-3xl sm:text-4xl font-bold tracking-tight text-white">About & Skills</h2>
          <div className="h-[2px] w-16 bg-gradient-to-r from-purple-500 to-violet-600 rounded" />
        </div>

        {/* Identity & Background */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-start">
          <div className="lg:col-span-8 flex flex-col gap-6 text-gray-300 leading-relaxed text-sm sm:text-base">
            <p>
              I am a <strong className="text-purple-300">product-minded engineer</strong> with strong expertise in software design, development, and user-centered product strategy. I have a proven track record of building <strong className="text-purple-400">secure, real-time end-to-end solutions</strong>, from ideation and UI/UX design to scalable backend architecture.
            </p>
            <p>
              As a <strong className="text-purple-300">tech lifestyle creator</strong>, I focus on building a vibrant community of like-minded individuals, bridging the gap between technical innovation, lifestyle curation, and shared personal growth.
            </p>
          </div>

          <div className="lg:col-span-4 bg-[#090514]/60 p-6 rounded-xl border border-purple-950/30 flex flex-col gap-4 self-stretch justify-center">
            <span className="font-mono text-xs uppercase tracking-wider text-purple-400 font-semibold flex items-center gap-2">
              <Globe size={14} className="text-purple-400" /> Languages
            </span>
            <div className="flex flex-col gap-3 text-sm">
              <div className="flex justify-between items-center text-gray-200 border-b border-purple-950/10 pb-2">
                <span>English</span>
                <span className="text-purple-400 font-mono text-xs bg-purple-950/30 px-2 py-0.5 rounded border border-purple-900/20">Native</span>
              </div>
              <div className="flex justify-between items-center text-gray-200">
                <span>French</span>
                <span className="text-purple-400 font-mono text-xs bg-purple-950/30 px-2 py-0.5 rounded border border-purple-900/20">Professional</span>
              </div>
            </div>
          </div>
        </div>

        {/* Technical Tech Stack */}
        <div className="flex flex-col gap-6">
          <div className="flex items-center gap-2.5">
            <Terminal size={18} className="text-purple-400" />
            <h3 className="font-display font-semibold text-base sm:text-lg text-white">Technical Tech Stack</h3>
          </div>
          
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-5 gap-4">
            {TECHNICAL_SKILLS.map((cat) => {
              const getIcon = (category: string) => {
                if (category.includes('Languages')) return <Terminal size={14} className="text-purple-400" />;
                if (category.includes('Backend')) return <Cpu size={14} className="text-violet-400" />;
                if (category.includes('Data')) return <Database size={14} className="text-indigo-400" />;
                if (category.includes('Frontend')) return <Layout size={14} className="text-fuchsia-400" />;
                return <Settings size={14} className="text-purple-400" />;
              };

              return (
                <div 
                  key={cat.category}
                  className="bg-zinc-950/40 border border-purple-950/20 p-5 rounded-xl flex flex-col gap-4 hover:border-purple-800/30 hover:bg-[#070411]/20 transition-all duration-300 group"
                >
                  <div className="flex items-center gap-2 pb-2.5 border-b border-purple-950/20">
                    {getIcon(cat.category)}
                    <h4 className="font-display font-medium text-xs text-gray-200 uppercase tracking-wider truncate">
                      {cat.category}
                    </h4>
                  </div>
                  <div className="flex flex-wrap gap-1.5">
                    {cat.skills.map((skill) => (
                      <span
                        key={skill}
                        className="font-mono text-[10px] sm:text-xs text-gray-400 group-hover:text-gray-200 px-2 py-0.5 bg-[#090514]/40 border border-purple-950/30 rounded"
                      >
                        {skill}
                      </span>
                    ))}
                  </div>
                </div>
              );
            })}
          </div>
        </div>

        {/* Product & Leadership Mindset */}
        <div className="flex flex-col gap-6">
          <div className="flex items-center gap-2.5">
            <Workflow size={18} className="text-purple-400" />
            <h3 className="font-display font-semibold text-base sm:text-lg text-white">Product & Leadership</h3>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
            {[
              { title: "Product Strategy", desc: "Prioritizing MVPs from concept to successful launch." },
              { title: "UX & User Empathy", desc: "Translating feedback into intuitive, seamless flows." },
              { title: "Agile Collaboration", desc: "Bridging communication between engineering and business." },
              { title: "Growth & Optimization", desc: "Analyzing behavior and performance to increase engagement." }
            ].map((item, idx) => (
              <div 
                key={idx} 
                className="bg-zinc-950/40 border border-purple-950/20 p-5 rounded-xl hover:border-purple-800/30 hover:bg-[#070411]/20 transition-all duration-300 group"
              >
                <div className="flex items-center gap-2 mb-2 pb-2 border-b border-purple-950/10">
                  <span className="font-mono text-xs text-purple-400/80 font-bold">0{idx + 1}.</span>
                  <h4 className="font-display font-semibold text-xs sm:text-sm text-gray-200 group-hover:text-white transition-colors">
                    {item.title}
                  </h4>
                </div>
                <p className="text-xs sm:text-sm text-gray-400 leading-relaxed">{item.desc}</p>
              </div>
            ))}
          </div>
        </div>

        {/* Education & Certifications */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-8 pt-4">
          
          {/* Education */}
          <div className="flex flex-col gap-6">
            <div className="flex items-center gap-2.5">
              <GraduationCap size={18} className="text-purple-400" />
              <h3 className="font-display font-semibold text-base sm:text-lg text-white">Education</h3>
            </div>
            
            <div className="relative flex flex-col gap-6 pl-4 py-1">
              <div className="absolute left-0 top-1 bottom-1 w-[1px] bg-purple-950/40" />
              
              {EDUCATION.map((edu) => (
                <div key={edu.id} className="relative group">
                  <div className="absolute -left-6 top-1.5 w-2.5 h-2.5 rounded-full border border-purple-950 bg-[#04010b] group-hover:bg-purple-500 transition-colors" />
                  
                  <div className="flex flex-col gap-1">
                    <span className="font-mono text-xs text-purple-400 uppercase tracking-wider">{edu.duration}</span>
                    <h4 className="font-display font-semibold text-sm sm:text-base text-gray-200">{edu.degree}</h4>
                    <span className="text-gray-400 text-xs sm:text-sm">
                      {edu.institution} <span className="text-gray-600">•</span> {edu.location}
                    </span>
                  </div>
                </div>
              ))}
            </div>
          </div>

          {/* Certifications */}
          <div className="flex flex-col gap-6">
            <div className="flex items-center gap-2.5">
              <Award size={18} className="text-purple-400" />
              <h3 className="font-display font-semibold text-base sm:text-lg text-white">Certifications</h3>
            </div>

            <div className="flex flex-col gap-3">
              {CERTIFICATIONS.map((cert) => {
                return (
                  <button 
                    key={cert.id}
                    onClick={() => setSelectedCert(cert)}
                    className="w-full text-left bg-zinc-950/20 border border-purple-950/20 p-4 rounded-xl flex justify-between items-center text-xs sm:text-sm hover:border-purple-500/30 hover:bg-purple-950/15 hover:shadow-[0_0_15px_-3px_rgba(168,85,247,0.12)] transition-all duration-300 group/cert cursor-pointer"
                  >
                    <div className="flex flex-col gap-1 max-w-[75%]">
                      <h4 className="font-display font-semibold text-xs sm:text-sm text-gray-200 group-hover/cert:text-purple-400 transition-colors leading-tight flex items-center gap-1.5">
                        {cert.name}
                        <ExternalLink 
                          size={12} 
                          className="text-purple-500 opacity-40 group-hover/cert:opacity-100 group-hover/cert:translate-x-0.5 group-hover/cert:-translate-y-0.5 transition-all flex-shrink-0" 
                        />
                      </h4>
                      <span className="text-gray-500 text-[11px] sm:text-xs">{cert.issuer}</span>
                    </div>
                    <span className="font-mono text-xs text-purple-400/80 font-medium whitespace-nowrap ml-3">{cert.date}</span>
                  </button>
                );
              })}
            </div>
          </div>

        </div>

      </div>

      {/* Interactive Certificate Popup Modal */}
      <AnimatePresence>
        {selectedCert && (
          <div className="fixed inset-0 z-50 flex items-center justify-center p-4 sm:p-6 md:p-10">
            {/* Backdrop */}
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              onClick={() => setSelectedCert(null)}
              className="absolute inset-0 bg-[#030108]/90 backdrop-blur-md"
            />

            {/* Modal Box */}
            <motion.div
              initial={{ opacity: 0, scale: 0.95, y: 20 }}
              animate={{ opacity: 1, scale: 1, y: 0 }}
              exit={{ opacity: 0, scale: 0.95, y: 20 }}
              transition={{ type: 'spring', duration: 0.5 }}
              className="relative w-full max-w-4xl bg-zinc-950/95 border border-purple-500/20 rounded-2xl overflow-hidden shadow-[0_0_50px_-12px_rgba(168,85,247,0.3)] z-10 flex flex-col md:flex-row max-h-[90vh] md:max-h-[85vh]"
            >
              {/* Close Button */}
              <button
                onClick={() => setSelectedCert(null)}
                className="absolute top-4 right-4 z-20 p-2 rounded-lg bg-zinc-900/80 border border-purple-950/30 text-gray-400 hover:text-white transition-colors cursor-pointer"
                aria-label="Close popup"
              >
                <X size={18} />
              </button>

              {/* Certificate Preview Panel (Left or Top) */}
              <div className="w-full md:w-3/5 bg-[#070411] border-b md:border-b-0 md:border-r border-purple-950/30 p-6 sm:p-8 flex items-center justify-center overflow-y-auto min-h-[250px] md:min-h-0">
                {selectedCert.id === 'cert-2' && selectedCert.link ? (
                  /* Udemy Image Certificate */
                  <div className="relative group w-full flex flex-col items-center">
                    <div className="absolute inset-0 bg-gradient-to-tr from-purple-500/5 to-transparent rounded-lg pointer-events-none" />
                    <img
                      src={selectedCert.link}
                      alt={selectedCert.name}
                      referrerPolicy="no-referrer"
                      className="max-w-full max-h-[45vh] rounded-lg shadow-2xl border border-purple-950/40 object-contain hover:scale-[1.01] transition-transform duration-300"
                    />
                  </div>
                ) : selectedCert.id === 'cert-1' ? (
                  /* Custom Designed HTML Certificate for Volunteer Recognition */
                  <div className="w-full max-w-lg aspect-[1.414/1] bg-gradient-to-br from-zinc-900 via-stone-950 to-zinc-900 border-[8px] border-double border-amber-500/40 rounded p-6 sm:p-8 flex flex-col justify-between text-center relative overflow-hidden shadow-2xl select-none">
                    {/* Watermark Logo */}
                    <div className="absolute inset-0 flex items-center justify-center opacity-[0.02] pointer-events-none">
                      <Award size={280} className="text-amber-500" />
                    </div>
                    
                    {/* Top Decorative Corners */}
                    <div className="absolute top-2 left-2 w-4 h-4 border-t border-l border-amber-500/30" />
                    <div className="absolute top-2 right-2 w-4 h-4 border-t border-r border-amber-500/30" />
                    <div className="absolute bottom-2 left-2 w-4 h-4 border-b border-l border-amber-500/30" />
                    <div className="absolute bottom-2 right-2 w-4 h-4 border-b border-r border-amber-500/30" />

                    <div className="flex flex-col gap-1 sm:gap-2">
                      <span className="font-mono text-[9px] sm:text-xs text-amber-500 tracking-widest uppercase">Certificate of Appreciation</span>
                      <h3 className="font-serif text-lg sm:text-2xl text-amber-100 font-bold tracking-tight">Recognition of Excellence</h3>
                      <div className="h-[1px] w-24 bg-gradient-to-r from-transparent via-amber-500/50 to-transparent mx-auto mt-1" />
                    </div>

                    <div className="my-3 sm:my-5 flex flex-col gap-1 sm:gap-1.5">
                      <p className="font-serif italic text-gray-400 text-[10px] sm:text-xs">This official recognition is proudly presented to</p>
                      <h4 className="font-serif text-xl sm:text-2xl text-white font-extrabold tracking-wide drop-shadow-sm my-0.5">Gift Chisom Nneji</h4>
                      <p className="text-gray-400 text-[9px] sm:text-[11px] leading-relaxed px-4 max-w-md mx-auto font-serif">
                        for outstanding volunteer services, technical excellence, and dedication as <strong className="text-amber-500/90">Frontend Engineer & Web Development Lead</strong> for the PyCon Togo Africa website and the Tech Savvy Summit.
                      </p>
                    </div>

                    <div className="flex justify-between items-end border-t border-amber-500/10 pt-4 mt-2">
                      <div className="flex flex-col items-center gap-0.5">
                        <span className="font-serif italic text-[8px] sm:text-[10px] text-gray-500">Authorized by</span>
                        <div className="h-5 sm:h-6 flex items-center justify-center font-mono text-[10px] sm:text-xs text-amber-500/70 italic">TSS Committee</div>
                        <div className="w-16 h-[0.5px] bg-gray-700" />
                        <span className="font-mono text-[7px] sm:text-[9px] text-gray-500">Tech Savvy Summit</span>
                      </div>
                      
                      {/* Golden Seal */}
                      <div className="relative flex items-center justify-center">
                        <div className="absolute w-8 h-8 sm:w-10 sm:h-10 rounded-full border border-dashed border-amber-500/30 animate-spin-slow pointer-events-none" />
                        <div className="w-6 h-6 sm:w-8 sm:h-8 rounded-full bg-gradient-to-br from-amber-400 to-yellow-600 flex items-center justify-center shadow-lg border border-amber-300/30">
                          <Award size={14} className="text-zinc-950" />
                        </div>
                      </div>

                      <div className="flex flex-col items-center gap-0.5">
                        <span className="font-serif italic text-[8px] sm:text-[10px] text-gray-500">Date Issued</span>
                        <div className="h-5 sm:h-6 flex items-center justify-center font-mono text-[10px] sm:text-xs text-amber-500/80 font-bold">02 / 2026</div>
                        <div className="w-16 h-[0.5px] bg-gray-700" />
                        <span className="font-mono text-[7px] sm:text-[9px] text-gray-500">PyCon Togo Africa</span>
                      </div>
                    </div>
                  </div>
                ) : (
                  /* Custom Designed HTML Certificate for CodeAlpha Completion */
                  <div className="w-full max-w-lg aspect-[1.414/1] bg-gradient-to-br from-zinc-900 via-slate-950 to-zinc-900 border-[8px] border-double border-purple-500/40 rounded p-6 sm:p-8 flex flex-col justify-between text-center relative overflow-hidden shadow-2xl select-none">
                    {/* Watermark Logo */}
                    <div className="absolute inset-0 flex items-center justify-center opacity-[0.02] pointer-events-none">
                      <Award size={280} className="text-purple-500" />
                    </div>
                    
                    {/* Top Decorative Corners */}
                    <div className="absolute top-2 left-2 w-4 h-4 border-t border-l border-purple-500/30" />
                    <div className="absolute top-2 right-2 w-4 h-4 border-t border-r border-purple-500/30" />
                    <div className="absolute bottom-2 left-2 w-4 h-4 border-b border-l border-purple-500/30" />
                    <div className="absolute bottom-2 right-2 w-4 h-4 border-b border-r border-purple-500/30" />

                    <div className="flex flex-col gap-1 sm:gap-2">
                      <span className="font-mono text-[9px] sm:text-xs text-purple-400 tracking-widest uppercase">Certificate of Completion</span>
                      <h3 className="font-serif text-lg sm:text-2xl text-purple-100 font-bold tracking-tight">Full Stack Web Development</h3>
                      <div className="h-[1px] w-24 bg-gradient-to-r from-transparent via-purple-500/50 to-transparent mx-auto mt-1" />
                    </div>

                    <div className="my-3 sm:my-5 flex flex-col gap-1 sm:gap-1.5">
                      <p className="font-serif italic text-gray-400 text-[10px] sm:text-xs">This is proudly certified that</p>
                      <h4 className="font-serif text-xl sm:text-2xl text-white font-extrabold tracking-wide drop-shadow-sm my-0.5">Gift Chisom Nneji</h4>
                      <p className="text-gray-400 text-[9px] sm:text-[11px] leading-relaxed px-4 max-w-md mx-auto font-serif">
                        has successfully completed the intensive <strong className="text-purple-400">CodeAlpha Software Development Bootcamp</strong> as a Full Stack Developer, acquiring professional hands-on expertise.
                      </p>
                    </div>

                    <div className="flex justify-between items-end border-t border-purple-500/10 pt-4 mt-2">
                      <div className="flex flex-col items-center gap-0.5">
                        <span className="font-serif italic text-[8px] sm:text-[10px] text-gray-500">Verified Credentials</span>
                        <div className="h-5 sm:h-6 flex items-center justify-center font-mono text-[9px] sm:text-xs text-purple-400/80 bg-purple-950/30 px-2 py-0.5 rounded border border-purple-900/30">ID: CA/DF1/91356</div>
                        <div className="w-16 h-[0.5px] bg-gray-700" />
                        <span className="font-mono text-[7px] sm:text-[9px] text-gray-500">Verification Center</span>
                      </div>
                      
                      {/* Purple Seal */}
                      <div className="relative flex items-center justify-center">
                        <div className="absolute w-8 h-8 sm:w-10 sm:h-10 rounded-full border border-dashed border-purple-500/30 animate-spin-slow pointer-events-none" />
                        <div className="w-6 h-6 sm:w-8 sm:h-8 rounded-full bg-gradient-to-br from-purple-500 to-indigo-600 flex items-center justify-center shadow-lg border border-purple-300/30">
                          <ShieldCheck size={14} className="text-white" />
                        </div>
                      </div>

                      <div className="flex flex-col items-center gap-0.5">
                        <span className="font-serif italic text-[8px] sm:text-[10px] text-gray-500">Bootcamp Registrar</span>
                        <div className="h-5 sm:h-6 flex items-center justify-center font-mono text-[10px] sm:text-xs text-purple-400/80 font-bold">July 2026</div>
                        <div className="w-16 h-[0.5px] bg-gray-700" />
                        <span className="font-mono text-[7px] sm:text-[9px] text-gray-500">CodeAlpha Tech</span>
                      </div>
                    </div>
                  </div>
                )}
              </div>

              {/* Certificate Details Panel (Right or Bottom) */}
              <div className="w-full md:w-2/5 p-6 sm:p-8 flex flex-col justify-between overflow-y-auto">
                <div className="flex flex-col gap-6">
                  {/* Badge */}
                  <div className="flex items-center gap-2">
                    <span className="font-mono text-[10px] uppercase tracking-wider text-purple-400 bg-purple-950/40 px-2.5 py-1 rounded border border-purple-900/30 flex items-center gap-1.5">
                      <ShieldCheck size={12} className="text-purple-400" /> Verified Credential
                    </span>
                  </div>

                  {/* Text Details */}
                  <div className="flex flex-col gap-2">
                    <h3 className="font-display font-bold text-lg sm:text-xl text-white leading-tight">
                      {selectedCert.name}
                    </h3>
                    <p className="text-sm text-gray-400">
                      Issued by <span className="text-purple-300 font-semibold">{selectedCert.issuer}</span>
                    </p>
                  </div>

                  <div className="h-[1px] bg-purple-950/20" />

                  {/* Meta items */}
                  <div className="flex flex-col gap-3 text-sm">
                    <div className="flex items-center gap-3 text-gray-300">
                      <Calendar size={16} className="text-purple-400 flex-shrink-0" />
                      <div>
                        <span className="text-gray-500 block text-[11px] uppercase tracking-wider">Date of Issue</span>
                        <span className="font-mono text-xs">{selectedCert.date}</span>
                      </div>
                    </div>

                    <div className="flex items-center gap-3 text-gray-300">
                      <CheckCircle2 size={16} className="text-purple-400 flex-shrink-0" />
                      <div>
                        <span className="text-gray-500 block text-[11px] uppercase tracking-wider">Status</span>
                        <span className="text-xs text-emerald-400 flex items-center gap-1">Active & Validated</span>
                      </div>
                    </div>
                  </div>

                  {selectedCert.id === 'cert-1' && (
                    <div className="text-xs text-gray-400 bg-purple-950/10 border border-purple-950/30 p-3.5 rounded-lg leading-relaxed flex gap-2">
                      <Sparkles size={14} className="text-purple-400 flex-shrink-0 mt-0.5" />
                      <span>This Certificate of Recognition was awarded to Gift Nneji for her leadership, volunteer web development work, and project execution at PyCon Togo and TSS.</span>
                    </div>
                  )}
                </div>

                {/* Bottom Actions */}
                <div className="flex flex-col gap-2 pt-6">
                  {selectedCert.link && (
                    <a
                      href={selectedCert.link}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="w-full bg-purple-600 hover:bg-purple-500 text-white font-medium text-xs sm:text-sm py-2.5 px-4 rounded-xl flex items-center justify-center gap-2 shadow-lg shadow-purple-600/10 hover:shadow-purple-600/20 transition-all cursor-pointer"
                    >
                      <span>Verify on Official Site</span>
                      <ExternalLink size={14} />
                    </a>
                  )}
                  <button
                    onClick={() => setSelectedCert(null)}
                    className="w-full bg-zinc-900 hover:bg-zinc-800 border border-purple-950/40 text-gray-300 hover:text-white font-medium text-xs sm:text-sm py-2.5 px-4 rounded-xl transition-all cursor-pointer"
                  >
                    Close Preview
                  </button>
                </div>
              </div>

            </motion.div>
          </div>
        )}
      </AnimatePresence>
    </section>
  );
}
