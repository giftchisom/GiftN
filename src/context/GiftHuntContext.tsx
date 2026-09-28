import React, { createContext, useContext, useState, useEffect } from 'react';

interface GiftHuntContextType {
  foundGifts: number[];
  foundCount: number;
  totalGifts: number;
  isGiftFound: (id: number) => boolean;
  claimGift: (id: number) => void;
  isCertificateOpen: boolean;
  setIsCertificateOpen: (open: boolean) => void;
  resetHunt: () => void;
}

const GiftHuntContext = createContext<GiftHuntContextType | undefined>(undefined);

// Web Audio API chime synthesis for discovery
const playChime = (level: number) => {
  try {
    const AudioContextClass = window.AudioContext || (window as unknown as { webkitAudioContext: typeof AudioContext }).webkitAudioContext;
    if (!AudioContextClass) return;
    const ctx = new AudioContextClass();

    const notes = [
      [523.25, 659.25], // C5, E5
      [587.33, 739.99], // D5, F#5
      [659.25, 830.61], // E5, G#5
      [783.99, 987.77], // G5, B5
      [1046.50, 1318.51, 1567.98] // C6, E6, G6 fanfare on completion!
    ];

    const chord = notes[Math.min(level - 1, notes.length - 1)] || [523.25, 659.25];
    const now = ctx.currentTime;

    chord.forEach((freq, i) => {
      const osc = ctx.createOscillator();
      const gain = ctx.createGain();

      osc.type = 'sine';
      osc.frequency.setValueAtTime(freq, now + i * 0.08);

      gain.gain.setValueAtTime(0.001, now + i * 0.08);
      gain.gain.exponentialRampToValueAtTime(0.12, now + i * 0.08 + 0.02);
      gain.gain.exponentialRampToValueAtTime(0.0001, now + i * 0.08 + 0.6);

      osc.connect(gain);
      gain.connect(ctx.destination);

      osc.start(now + i * 0.08);
      osc.stop(now + i * 0.08 + 0.65);
    });
  } catch {
    // Audio may fail if user hasn't interacted or browser restricts audio
  }
};

export const GiftHuntProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const [foundGifts, setFoundGifts] = useState<number[]>(() => {
    try {
      const saved = localStorage.getItem('gift_hunt_progress');
      if (saved) {
        const parsed = JSON.parse(saved);
        if (Array.isArray(parsed)) return parsed;
      }
    } catch {
      // ignore storage errors
    }
    return [];
  });

  const [isCertificateOpen, setIsCertificateOpen] = useState(false);
  const totalGifts = 5;

  useEffect(() => {
    try {
      localStorage.setItem('gift_hunt_progress', JSON.stringify(foundGifts));
    } catch {
      // ignore storage errors
    }
  }, [foundGifts]);

  const isGiftFound = (id: number) => foundGifts.includes(id);

  const claimGift = (id: number) => {
    if (foundGifts.includes(id)) return;

    const nextFound = [...foundGifts, id];
    setFoundGifts(nextFound);
    playChime(nextFound.length);

    if (nextFound.length >= totalGifts) {
      setTimeout(() => {
        setIsCertificateOpen(true);
      }, 700);
    }
  };

  const resetHunt = () => {
    setFoundGifts([]);
    setIsCertificateOpen(false);
    try {
      localStorage.removeItem('gift_hunt_progress');
    } catch {
      // ignore
    }
  };

  return (
    <GiftHuntContext.Provider
      value={{
        foundGifts,
        foundCount: foundGifts.length,
        totalGifts,
        isGiftFound,
        claimGift,
        isCertificateOpen,
        setIsCertificateOpen,
        resetHunt,
      }}
    >
      {children}
    </GiftHuntContext.Provider>
  );
};

export const useGiftHunt = () => {
  const context = useContext(GiftHuntContext);
  if (!context) {
    throw new Error('useGiftHunt must be used within a GiftHuntProvider');
  }
  return context;
};
