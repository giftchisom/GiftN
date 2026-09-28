import React, { useState } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import { useGiftHunt } from '../context/GiftHuntContext';

interface HiddenGiftProps {
  id: number;
  className?: string;
  tooltipSide?: 'top' | 'bottom' | 'left' | 'right';
}

export default function HiddenGift({ id, className = '', tooltipSide = 'top' }: HiddenGiftProps) {
  const { isGiftFound, claimGift, foundCount, totalGifts } = useGiftHunt();
  const [showBurst, setShowBurst] = useState(false);
  const found = isGiftFound(id);

  const handleClick = (e: React.MouseEvent) => {
    e.stopPropagation();
    if (!found) {
      setShowBurst(true);
      claimGift(id);
      setTimeout(() => setShowBurst(false), 1200);
    }
  };

  const tooltipPositions = {
    top: 'bottom-full mb-1 left-1/2 -translate-x-1/2',
    bottom: 'top-full mt-1 left-1/2 -translate-x-1/2',
    left: 'right-full mr-1 top-1/2 -translate-y-1/2',
    right: 'left-full ml-1 top-1/2 -translate-y-1/2',
  };

  return (
    <span className={`relative inline-flex items-center justify-center select-none align-middle ${className}`}>
      {/* Tiny celebratory burst on click */}
      <AnimatePresence>
        {showBurst && (
          <div className="absolute inset-0 pointer-events-none flex items-center justify-center z-50">
            {[...Array(6)].map((_, i) => {
              const angle = (i * 60 * Math.PI) / 180;
              const distance = 16;
              const x = Math.cos(angle) * distance;
              const y = Math.sin(angle) * distance;

              return (
                <motion.span
                  key={i}
                  initial={{ opacity: 1, scale: 0, x: 0, y: 0 }}
                  animate={{ opacity: 0, scale: 1, x, y }}
                  exit={{ opacity: 0 }}
                  transition={{ duration: 0.6, ease: 'easeOut' }}
                  className="absolute w-1 h-1 rounded-full bg-amber-400"
                />
              );
            })}
            <motion.span
              initial={{ scale: 0.6, opacity: 0, y: 0 }}
              animate={{ scale: 1, opacity: 1, y: -16 }}
              exit={{ opacity: 0 }}
              transition={{ duration: 0.7 }}
              className="absolute font-mono text-[9px] font-bold text-amber-300 bg-purple-950/95 border border-purple-500/40 px-1.5 py-0.5 rounded-full shadow whitespace-nowrap"
            >
              +{foundCount + 1}/{totalGifts} ✨
            </motion.span>
          </div>
        )}
      </AnimatePresence>

      <motion.button
        type="button"
        onClick={handleClick}
        whileHover={{ scale: 1.2 }}
        whileTap={{ scale: 0.85 }}
        className={`relative group inline-flex items-center justify-center p-0.5 rounded transition-all duration-300 cursor-pointer focus:outline-none ${
          found
            ? 'opacity-40 hover:opacity-90'
            : 'opacity-20 hover:opacity-100 hover:drop-shadow-[0_0_4px_rgba(251,191,36,0.6)]'
        }`}
        aria-label={found ? `Gift #${id} (Found)` : `Gift #${id}`}
      >
        <span className="text-[10px] sm:text-[11px] leading-none inline-block filter grayscale-[25%] hover:grayscale-0">
          🎁
        </span>

        {/* Tiny, minimal micro-tooltip */}
        <span
          className={`absolute ${tooltipPositions[tooltipSide]} hidden group-hover:inline-flex items-center px-1.5 py-0.5 bg-[#0d041e]/95 border border-purple-500/30 text-[9px] font-mono text-amber-300 rounded shadow-md whitespace-nowrap z-50 pointer-events-none`}
        >
          {found ? `✓ #${id}` : `? #${id}`}
        </span>
      </motion.button>
    </span>
  );
}
