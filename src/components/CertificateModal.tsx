import React from 'react';
import { motion, AnimatePresence } from 'motion/react';
import { X, Sparkles, RotateCcw } from 'lucide-react';
import { useGiftHunt } from '../context/GiftHuntContext';

export default function CertificateModal() {
  const { isCertificateOpen, setIsCertificateOpen, resetHunt } = useGiftHunt();

  if (!isCertificateOpen) return null;

  return (
    <AnimatePresence>
      <div className="fixed inset-0 z-50 flex items-center justify-center p-4 overflow-y-auto bg-black/80 backdrop-blur-sm">
        {/* Backdrop click to close */}
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          onClick={() => setIsCertificateOpen(false)}
          className="fixed inset-0 cursor-pointer"
        />

        {/* Small, Cute, Simple Certificate Card */}
        <motion.div
          initial={{ opacity: 0, scale: 0.9, y: 15 }}
          animate={{ opacity: 1, scale: 1, y: 0 }}
          exit={{ opacity: 0, scale: 0.9, y: 15 }}
          transition={{ type: 'spring', duration: 0.45, bounce: 0.25 }}
          className="relative w-full max-w-xs sm:max-w-sm bg-[#090317] border border-amber-400/40 rounded-2xl p-5 sm:p-6 shadow-[0_0_35px_rgba(251,191,36,0.25)] z-10 text-gray-100 flex flex-col items-center text-center gap-4 select-none"
        >
          {/* Close button */}
          <button
            onClick={() => setIsCertificateOpen(false)}
            className="absolute top-3 right-3 p-1.5 text-gray-400 hover:text-white rounded-full bg-purple-950/40 hover:bg-purple-900/50 transition-colors cursor-pointer"
            aria-label="Close"
          >
            <X size={15} />
          </button>

          {/* Tiny cute top badge */}
          <div className="inline-flex items-center gap-1.5 px-2.5 py-0.5 rounded-full bg-amber-400/10 border border-amber-400/30 text-amber-300 text-[10px] font-mono tracking-wider uppercase">
            <Sparkles size={11} className="text-amber-400 animate-pulse" />
            <span>Detective Verified</span>
          </div>

          {/* Certificate Inner Border Box */}
          <div className="w-full bg-gradient-to-b from-[#12062b] to-[#070212] border border-purple-500/30 rounded-xl p-4 flex flex-col items-center gap-2 relative">
            <div className="text-2xl">📜</div>

            <h3 className="font-display text-lg font-bold text-amber-200 tracking-wide uppercase drop-shadow">
              Congratulations Visitor
            </h3>

            <p className="font-serif italic text-xs text-purple-300 font-light">
              Certificate of Completion
            </p>

            <div className="w-12 h-[1px] bg-amber-400/50 my-1" />

            <div className="p-2.5 bg-purple-950/50 border border-purple-500/20 rounded-lg text-amber-200 text-xs font-mono tracking-wide font-medium shadow-sm">
              &ldquo;Thank you for stalking *☺︎*&rdquo;
            </div>

            <div className="flex items-center gap-2 mt-1 text-[10px] font-mono text-purple-300/80">
              <span>🎁 5/5 Gifts Found</span>
              <span>•</span>
              <span>Gift Nneji</span>
            </div>
          </div>

          {/* Action buttons */}
          <div className="w-full flex items-center justify-between gap-2 pt-1">
            <button
              onClick={resetHunt}
              className="flex items-center gap-1 px-2.5 py-1.5 rounded-lg text-gray-400 hover:text-gray-200 text-[11px] font-mono transition-colors cursor-pointer"
              title="Reset found gifts"
            >
              <RotateCcw size={11} />
              <span>Reset</span>
            </button>

            <button
              onClick={() => setIsCertificateOpen(false)}
              className="flex-1 py-1.5 px-4 rounded-xl bg-purple-600 hover:bg-purple-500 text-white text-xs font-medium transition-all shadow-[0_0_15px_rgba(147,51,234,0.4)] cursor-pointer"
            >
              Keep Exploring ✨
            </button>
          </div>
        </motion.div>
      </div>
    </AnimatePresence>
  );
}
