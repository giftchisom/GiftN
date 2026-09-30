import React, { useState, useEffect } from 'react';
import { 
  GraduationCap, 
  Award, 
  Globe, 
  Workflow,
  ExternalLink,
  X,
  ShieldCheck,
  CheckCircle2,
  Calendar,
  Sparkles
} from 'lucide-react';
import { motion, AnimatePresence } from 'motion/react';
import { useLanguage } from '../context/LanguageContext';
import FloatingTechStack from './FloatingTechStack';
import HiddenGift from './HiddenGift';
import { 
  EDUCATION, 
  CERTIFICATIONS 
} from '../data';

export default function About() {
  const { language, t } = useLanguage();
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
      className="py-24 px-6 md:px-16 lg:px-24 xl:px-32 bg-transparent border-t border-purple-950/15"
    >
      <div className="max-w-5xl flex flex-col gap-12">
        
        {/* Section Heading */}
        <div className="flex flex-col gap-3">
          <span className="font-mono text-xs text-purple-400 uppercase tracking-widest font-medium">
            {t('about.badge')}
          </span>
          <h2 className="font-display text-3xl sm:text-4xl font-bold tracking-tight text-white">
            {t('about.title')}
          </h2>
          <div className="h-[2px] w-16 bg-purple-500 rounded" />
        </div>

        {/* Identity & Background */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-start">
          <div className="lg:col-span-8 flex flex-col gap-6 text-gray-300 leading-relaxed text-sm sm:text-base">
            <p>
              I am a <strong className="text-purple-300">product-minded engineer</strong> with strong expertise in software design, development, and user-centered product strategy. I have a proven track record of building <strong className="text-purple-400">secure, real-time end-to-end solutions</strong>, from ideation and UI/UX design to scalable backend architecture.
            </p>
            <p>
              As a <strong className="text-purple-300">tech lifestyle creator</strong>, I focus on building a vibrant community of like-minded individuals, bridging the gap between technical innovation, lifestyle curation, and shared personal growth. <HiddenGift id={2} />
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

        {/* Interactive Technical Stack (Hover to Reveal) */}
        <FloatingTechStack />

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
                {selectedCert.id === 'cert-1' ? (
                  /* Tech Savvy Summit Volunteering Certificate */
                  <div className="relative group w-full flex flex-col items-center">
                    <img
                      src="/tech-savvy-certificate.svg"
                      alt="Tech Savvy Summit Volunteering Certificate"
                      referrerPolicy="no-referrer"
                      className="max-w-full max-h-[50vh] rounded-lg shadow-2xl border border-purple-950/40 object-contain hover:scale-[1.01] transition-transform duration-300"
                    />
                  </div>
                ) : selectedCert.id === 'cert-3' ? (
                  /* CodeAlpha Bootcamp Completion Certificate */
                  <div className="relative group w-full flex flex-col items-center">
                    <img
                      src="/codealpha-bootcamp.svg"
                      alt="CodeAlpha Full Stack Development Bootcamp Certificate"
                      referrerPolicy="no-referrer"
                      className="max-w-full max-h-[50vh] rounded-lg shadow-2xl border border-purple-950/40 object-contain hover:scale-[1.01] transition-transform duration-300"
                    />
                  </div>
                ) : selectedCert.id === 'cert-2' && selectedCert.link ? (
                  /* Udemy Image Certificate */
                  <div className="relative group w-full flex flex-col items-center">
                    <div className="absolute inset-0 bg-purple-950/20 rounded-lg pointer-events-none" />
                    <img
                      src={selectedCert.link}
                      alt={selectedCert.name}
                      referrerPolicy="no-referrer"
                      className="max-w-full max-h-[45vh] rounded-lg shadow-2xl border border-purple-950/40 object-contain hover:scale-[1.01] transition-transform duration-300"
                    />
                  </div>
                ) : null}
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
