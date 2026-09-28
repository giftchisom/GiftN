import React, { useRef } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import { X, Award, Download, RotateCcw, Sparkles } from 'lucide-react';
import { useGiftHunt } from '../context/GiftHuntContext';

export default function CertificateModal() {
  const { isCertificateOpen, setIsCertificateOpen, resetHunt, foundCount, totalGifts } = useGiftHunt();
  const certRef = useRef<HTMLDivElement>(null);

  if (!isCertificateOpen) return null;

  const handlePrint = () => {
    window.print();
  };

  const currentDate = new Date().toLocaleDateString('en-US', {
    year: 'numeric',
    month: 'long',
    day: 'numeric',
  });

  return (
    <AnimatePresence>
      <div className="fixed inset-0 z-50 flex items-center justify-center p-4 sm:p-6 overflow-y-auto bg-black/80 backdrop-blur-md">
        {/* Animated backdrop */}
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          onClick={() => setIsCertificateOpen(false)}
          className="fixed inset-0"
        />

        {/* Modal Container */}
        <motion.div
          initial={{ opacity: 0, scale: 0.85, y: 20 }}
          animate={{ opacity: 1, scale: 1, y: 0 }}
          exit={{ opacity: 0, scale: 0.85, y: 20 }}
          transition={{ type: 'spring', duration: 0.6, bounce: 0.2 }}
          className="relative w-full max-w-xl bg-[#080214] border-2 border-purple-500/40 rounded-2xl shadow-[0_0_50px_rgba(168,85,247,0.35)] p-6 sm:p-8 z-10 text-gray-100 flex flex-col gap-6"
        >
          {/* Close button */}
          <button
            onClick={() => setIsCertificateOpen(false)}
            className="absolute top-4 right-4 p-2 text-gray-400 hover:text-white rounded-full bg-purple-950/40 hover:bg-purple-900/50 transition-colors cursor-pointer"
            aria-label="Close Certificate"
          >
            <X size={18} />
          </button>

          {/* Top celebratory banner */}
          <div className="flex items-center justify-center gap-2 text-xs font-mono tracking-widest text-amber-300 uppercase">
            <Sparkles size={14} className="text-amber-400 animate-spin" style={{ animationDuration: '6s' }} />
            <span>You found all {totalGifts} gifts!</span>
            <Sparkles size={14} className="text-amber-400 animate-spin" style={{ animationDuration: '6s' }} />
          </div>

          {/* Certificate Body (Printable Area) */}
          <div
            ref={certRef}
            className="relative bg-gradient-to-b from-[#0f0524] to-[#080214] border-2 border-amber-500/40 rounded-xl p-6 sm:p-8 flex flex-col items-center text-center shadow-inner overflow-hidden"
          >
            {/* Watermark Emblem */}
            <div className="absolute inset-0 flex items-center justify-center pointer-events-none opacity-[0.04]">
              <Award size={360} className="text-purple-400" />
            </div>

            {/* Corner ornaments */}
            <div className="absolute top-2 left-2 w-4 h-4 border-t-2 border-l-2 border-amber-400/60" />
            <div className="absolute top-2 right-2 w-4 h-4 border-t-2 border-r-2 border-amber-400/60" />
            <div className="absolute bottom-2 left-2 w-4 h-4 border-b-2 border-l-2 border-amber-400/60" />
            <div className="absolute bottom-2 right-2 w-4 h-4 border-b-2 border-r-2 border-amber-400/60" />

            {/* Header */}
            <span className="font-mono text-[10px] tracking-[0.25em] text-purple-300/80 uppercase mb-1">
              Official Digital Accreditation
            </span>

            <h3 className="font-display text-2xl sm:text-3xl font-extrabold text-amber-200 tracking-wide uppercase drop-shadow-[0_2px_10px_rgba(251,191,36,0.3)]">
              Congratulations Visitor
            </h3>

            <div className="w-20 h-[1.5px] bg-amber-400/60 my-2" />

            <h4 className="font-serif italic text-lg sm:text-xl text-purple-200 font-light mb-4">
              Certificate of Completion
            </h4>

            {/* Recipient */}
            <div className="flex flex-col items-center my-2">
              <span className="text-xs font-mono text-gray-400 tracking-wider uppercase">
                Awarded To
              </span>
              <div className="font-display text-xl sm:text-2xl font-bold text-white tracking-wider border-b border-purple-400/40 pb-1 px-6 mt-1">
                Master Portfolio Detective 🕵️‍♀️
              </div>
            </div>

            {/* Description */}
            <p className="text-xs sm:text-sm text-gray-300 max-w-md my-4 leading-relaxed font-sans">
              For keen observation skills, tireless curiosity, and successfully unearthing every hidden gift in this portfolio universe.
            </p>

            {/* Highlighted Quote requested by user */}
            <div className="p-3 bg-purple-950/60 border border-purple-500/30 rounded-lg text-amber-300 text-xs sm:text-sm font-mono tracking-wide font-medium my-2 shadow-[0_0_15px_rgba(168,85,247,0.15)]">
              &ldquo;Thank you for stalking *☺︎*&rdquo;
            </div>

            {/* Footer Signatures & Seal */}
            <div className="w-full grid grid-cols-2 gap-4 pt-6 mt-4 border-t border-purple-950/60 items-end">
              <div className="flex flex-col items-center sm:items-start text-left">
                <span className="font-mono text-[9px] text-gray-400 uppercase tracking-widest">
                  Issued By
                </span>
                <span className="font-display font-semibold text-purple-200 text-sm mt-0.5">
                  Gift Nneji
                </span>
                <span className="text-[10px] text-gray-400 font-mono">
                  Full-Stack Dev & AI Specialist
                </span>
                <span className="text-[9px] text-gray-400 font-mono mt-1">
                  {currentDate}
                </span>
              </div>

              <div className="flex flex-col items-center sm:items-end">
                {/* Gold Seal */}
                <div className="w-14 h-14 rounded-full border-2 border-amber-400 bg-amber-950/30 flex flex-col items-center justify-center text-amber-300 shadow-[0_0_15px_rgba(251,191,36,0.3)] rotate-6">
                  <Award size={20} />
                  <span className="text-[7px] font-mono font-bold tracking-tighter uppercase">
                    5/5 VERIFIED
                  </span>
                </div>
              </div>
            </div>
          </div>

          {/* Action Bar */}
          <div className="flex flex-wrap items-center justify-between gap-3 pt-2">
            <button
              onClick={resetHunt}
              className="flex items-center gap-1.5 px-3 py-2 rounded-lg bg-zinc-900 hover:bg-zinc-800 text-gray-400 hover:text-gray-200 text-xs font-mono transition-colors cursor-pointer border border-zinc-800"
            >
              <RotateCcw size={13} />
              <span>Reset Hunt</span>
            </button>

            <div className="flex items-center gap-2">
              <button
                onClick={handlePrint}
                className="flex items-center gap-1.5 px-4 py-2 rounded-lg bg-purple-950 hover:bg-purple-900 border border-purple-500/40 text-purple-200 text-xs font-medium transition-colors cursor-pointer"
              >
                <Download size={13} />
                <span>Save / Print</span>
              </button>

              <button
                onClick={() => setIsCertificateOpen(false)}
                className="px-5 py-2 rounded-lg bg-purple-600 hover:bg-purple-500 text-white text-xs font-medium transition-colors shadow-[0_0_15px_rgba(147,51,234,0.4)] cursor-pointer"
              >
                Keep Exploring
              </button>
            </div>
          </div>
        </motion.div>
      </div>
    </AnimatePresence>
  );
}
