import React from 'react';
import { 
  ArrowRight, 
  Mail, 
  ChevronDown, 
  Sparkles, 
  Rocket,
  Wifi,
  Cpu
} from 'lucide-react';
import { motion, AnimatePresence } from 'motion/react';
import { useLanguage } from '../context/LanguageContext';
import HiddenGift from './HiddenGift';
// @ts-ignore
import profileImg from '../assets/profile.png';

interface HeroProps {
  onNavigate: (sectionId: string) => void;
}

export default function Hero({ onNavigate }: HeroProps) {
  const { language, t } = useLanguage();
  // Reference the imported image asset directly
  const profileImgPath = profileImg;
  
  const [text, setText] = React.useState('');
  const targetWord = "Gift Nneji";

  const [currentFactIndex, setCurrentFactIndex] = React.useState(0);

  const FUN_FACTS = React.useMemo(() => {
    if (language === 'fr') {
      return [
        {
          icon: <Rocket size={16} className="text-purple-400" />,
          text: "Margaret Hamilton a forgé le terme 'génie logiciel' et dirigé l'équipe ayant conçu le code d'Apollo 11 qui a fait alunir l'humanité."
        },
        {
          icon: <Wifi size={16} className="text-cyan-400" />,
          text: "Hedy Lamarr a breveté le saut de fréquence en 1942—l'invention pionnière qui alimente aujourd'hui le Wi-Fi, le Bluetooth et le GPS."
        },
        {
          icon: <Cpu size={16} className="text-amber-400" />,
          text: "Grace Hopper a développé le tout premier compilateur en 1952, créant les langages de programmation lisibles et popularisant le 'débogage'."
        }
      ];
    }
    return [
      {
        icon: <Rocket size={16} className="text-purple-400" />,
        text: "Margaret Hamilton coined the term 'software engineering' and led the team that wrote the Apollo 11 code that safely landed humans on the Moon."
      },
      {
        icon: <Wifi size={16} className="text-cyan-400" />,
        text: "Hedy Lamarr patented frequency-hopping in 1942—the fundamental invention that directly powers modern Wi-Fi, Bluetooth, and GPS."
      },
      {
        icon: <Cpu size={16} className="text-amber-400" />,
        text: "Grace Hopper developed the first computer compiler in 1952, enabling human-readable programming languages and coining the term 'debugging'."
      }
    ];
  }, [language]);

  React.useEffect(() => {
    if (text.length < targetWord.length) {
      const timer = window.setTimeout(() => {
        setText(targetWord.substring(0, text.length + 1));
      }, 120);
      return () => clearTimeout(timer);
    }
  }, [text]);

  React.useEffect(() => {
    const interval = setInterval(() => {
      setCurrentFactIndex((prev) => (prev + 1) % FUN_FACTS.length);
    }, 6000);
    return () => clearInterval(interval);
  }, [FUN_FACTS.length]);

  return (
    <section
      id="intro"
      className="min-h-screen relative flex flex-col justify-center items-center md:items-start pt-20 md:pt-0 px-6 md:px-16 lg:px-24 xl:px-32 overflow-hidden bg-transparent"
    >
      {/* Sleek subtle ambient backdrop (no heavy sci-fi glowing) */}
      <div className="absolute inset-0 overflow-hidden pointer-events-none">
        <div className="absolute top-[20%] right-[10%] w-[400px] h-[400px] rounded-full bg-purple-950/10 blur-[120px]" />
        <div className="absolute bottom-[10%] left-[20%] w-[300px] h-[300px] rounded-full bg-indigo-950/10 blur-[100px]" />
        
        {/* Subtle background solid overlay */}
        <div className="absolute inset-0 bg-[#050112] opacity-40" />
      </div>

      <div className="w-full max-w-5xl grid grid-cols-1 md:grid-cols-12 gap-8 md:gap-8 items-center z-10">
        {/* Left column: Text Content */}
        <div className="md:col-span-7 flex flex-col text-center md:text-left gap-6 order-2 md:order-1">
          <motion.div
            initial={{ opacity: 0, y: 15 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5, delay: 0.1 }}
            className="flex items-center justify-center md:justify-start gap-3"
          >
            <span className="w-2 h-2 rounded-full bg-purple-500 animate-pulse" />
            <span className="font-mono text-xs text-purple-400 uppercase tracking-widest font-medium">
              {t('hero.status')}
            </span>
          </motion.div>

          <div className="flex flex-col gap-2">
            <motion.h1
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, delay: 0.2 }}
              className="font-display text-4xl sm:text-5xl lg:text-6xl font-bold tracking-tight text-white leading-none min-h-[1.2em] flex flex-wrap items-center justify-center md:justify-start"
            >
              {t('hero.greeting')}{" "}
              <span className="text-purple-400 inline-flex items-center ml-2">
                {text || "\u00A0"}
                {/* Flashing cursor */}
                <motion.span
                  animate={{ opacity: [1, 0, 1] }}
                  transition={{
                    repeat: Infinity,
                    duration: 0.8,
                    ease: "easeInOut",
                  }}
                  className="inline-block ml-1 text-purple-400"
                >
                |
                </motion.span>
              </span>
            </motion.h1>
            
            <motion.h2
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, delay: 0.4 }}
              className="font-display text-2xl sm:text-3xl font-medium text-gray-300 tracking-tight"
            >
              {language === 'fr' ? 'Développeur Logiciel Full-Stack & Developpeur IA' : 'Full-Stack Software Developer & AI Developer'}
            </motion.h2>
          </div>

          {/* Fading Rotating Fun Facts Widget */}
          <motion.div
            initial={{ opacity: 0, y: 15 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.45 }}
            className="w-full max-w-md bg-[#090518]/70 border border-purple-950/45 rounded-xl p-4 shadow-[0_4px_30px_rgba(139,92,246,0.02)] backdrop-blur-md self-center md:self-start flex flex-col gap-2.5 overflow-hidden"
          >
            <div className="flex items-center justify-between text-[10px] font-mono text-purple-400 uppercase tracking-widest font-semibold">
              <div className="flex items-center gap-2">
                <Sparkles size={11} className="animate-pulse" />
                <span>{language === 'fr' ? 'Pionnières & Inventions' : 'Women Pioneers in Tech'}</span>
              </div>
              <HiddenGift id={1} tooltipSide="bottom" />
            </div>

            <div className="min-h-[50px] relative flex items-start">
              <AnimatePresence mode="wait">
                <motion.div
                  key={currentFactIndex}
                  initial={{ opacity: 0, x: 8 }}
                  animate={{ opacity: 1, x: 0 }}
                  exit={{ opacity: 0, x: -8 }}
                  transition={{ duration: 0.3, ease: 'easeInOut' }}
                  className="flex items-start gap-3 w-full"
                >
                  <div className="p-2 bg-purple-950/40 border border-purple-900/30 rounded-lg text-purple-300 flex-shrink-0 mt-0.5">
                    {FUN_FACTS[currentFactIndex % FUN_FACTS.length].icon}
                  </div>
                  <p className="text-gray-300 text-xs sm:text-sm leading-relaxed font-sans font-medium">
                    {FUN_FACTS[currentFactIndex % FUN_FACTS.length].text}
                  </p>
                </motion.div>
              </AnimatePresence>
            </div>

            {/* Indicator Dots */}
            <div className="flex gap-1.5 justify-end items-center mt-1.5">
              {FUN_FACTS.map((_, idx) => (
                <button
                  key={idx}
                  onClick={() => setCurrentFactIndex(idx)}
                  className={`h-1 rounded-full transition-all duration-300 cursor-pointer ${
                    currentFactIndex === idx ? 'w-4 bg-purple-500' : 'w-1 bg-purple-950 hover:bg-purple-900'
                  }`}
                  aria-label={`View fun fact ${idx + 1}`}
                />
              ))}
            </div>
          </motion.div>

          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.5 }}
            className="flex flex-col sm:flex-row items-center gap-4 mt-4"
          >
            <button
              onClick={() => onNavigate('projects')}
              className="w-full sm:w-auto px-8 py-3.5 bg-purple-700 hover:bg-purple-600 text-white font-medium text-sm rounded-lg flex items-center justify-center gap-2 transition-all duration-300 hover:shadow-[0_4px_20px_rgba(139,92,246,0.15)] group cursor-pointer"
            >
              {t('hero.viewWork')}
              <ArrowRight size={16} className="transform group-hover:translate-x-1 transition-transform" />
            </button>
            
            <button
              onClick={() => onNavigate('contact')}
              className="w-full sm:w-auto px-8 py-3.5 bg-zinc-950 hover:bg-zinc-900 border border-purple-950 hover:border-purple-800/80 text-gray-300 hover:text-white font-medium text-sm rounded-lg flex items-center justify-center gap-2 transition-all duration-300 cursor-pointer shadow-[0_0_15px_rgba(139,92,246,0.1)]"
            >
              <Mail size={16} />
              {t('hero.contactBtn')}
            </button>
          </motion.div>
        </div>

        {/* Right column: Concentric Rotating Graphic with Medium/Big Profile Picture */}
        <div className="md:col-span-5 flex justify-center items-center order-1 md:order-2">
          <motion.div
            initial={{ opacity: 0, scale: 0.85 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ duration: 0.8, ease: 'easeOut' }}
            className="relative flex flex-col items-center justify-center my-4 md:my-0"
          >
            {/* Outer dotted ring - rotating slowly */}
            <motion.div
              animate={{ rotate: 360 }}
              transition={{ repeat: Infinity, duration: 40, ease: 'linear' }}
              className="absolute -inset-6 sm:-inset-8 rounded-full border border-dashed border-purple-950/60 pointer-events-none"
            />

            {/* Inner orbital ring with accent nodes - rotating in opposite direction */}
            <motion.div
              animate={{ rotate: -360 }}
              transition={{ repeat: Infinity, duration: 25, ease: 'linear' }}
              className="absolute -inset-3 sm:-inset-4 rounded-full border border-purple-500/25 pointer-events-none"
            >
              {/* Little orbital nodes representing tech connections */}
              <div className="absolute top-0 left-1/2 -translate-x-1/2 w-2 h-2 rounded-full bg-purple-500 shadow-[0_0_8px_rgba(168,85,247,0.8)]" />
              <div className="absolute bottom-0 left-1/2 -translate-x-1/2 w-2 h-2 rounded-full bg-indigo-500 shadow-[0_0_8px_rgba(99,102,241,0.8)]" />
              <div className="absolute left-0 top-1/2 -translate-y-1/2 w-2 h-2 rounded-full bg-violet-500 shadow-[0_0_8px_rgba(139,92,246,0.8)]" />
            </motion.div>

            {/* Ambient Cosmic Backlight */}
            <div className="absolute -inset-4 rounded-full bg-purple-600/20 blur-2xl pointer-events-none" />

            {/* Medium/Big Profile Picture Frame */}
            <div className="relative w-48 h-48 sm:w-56 sm:h-56 md:w-60 md:h-60 lg:w-68 lg:h-68 rounded-full p-2 bg-[#060111]/90 border-2 border-purple-900/50 shadow-[0_0_25px_rgba(147,51,234,0.25)] flex items-center justify-center overflow-hidden group">
              <img
                src={profileImgPath}
                onError={(e) => {
                  (e.currentTarget as HTMLImageElement).src = '/profile.png';
                }}
                alt="Gift Nneji"
                className="w-full h-full object-cover object-top rounded-full transition-transform duration-500 group-hover:scale-105"
              />
            </div>
          </motion.div>
        </div>
      </div>

      {/* Down indicator */}
      <div className="absolute bottom-6 left-1/2 -translate-x-1/2 flex flex-col items-center gap-1.5 opacity-55 animate-bounce">
        <span className="font-mono text-[10px] text-gray-500 tracking-widest uppercase">{t('hero.scroll')}</span>
        <button 
          onClick={() => onNavigate('about')}
          className="text-purple-400 hover:text-purple-300 cursor-pointer"
          aria-label="Scroll to about"
        >
          <ChevronDown size={18} />
        </button>
      </div>
    </section>
  );
}
