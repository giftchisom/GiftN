import React from 'react';
import { 
  ArrowRight, 
  Mail, 
  ChevronDown, 
  Award, 
  GraduationCap, 
  Sparkles, 
  Cpu, 
  Music, 
  ChefHat, 
  Compass 
} from 'lucide-react';
import { motion, AnimatePresence } from 'motion/react';

interface HeroProps {
  onNavigate: (sectionId: string) => void;
}

export default function Hero({ onNavigate }: HeroProps) {
 
  // Change this path to match your newly uploaded image file:
const profileImgPath = 'src/assets/6ca324e9-280a-4e7a-9462-229b6900dffd.png';
  
  const [text, setText] = React.useState('');
  const targetWord = "Gift Nneji";

  const [currentFactIndex, setCurrentFactIndex] = React.useState(0);

  const FUN_FACTS = React.useMemo(() => [
    {
      icon: <Award size={16} className="text-purple-400" />,
      text: "I was recognized as the best Computer Science student in my college / university."
    },
    {
      icon: <GraduationCap size={16} className="text-purple-400" />,
      text: "I graduated with a First Class honors degree at just 19 years old."
    },
    {
      icon: <Sparkles size={16} className="text-purple-400" />,
      text: "I am deeply inspired by the visual design and software creations of Gazi Jarin."
    },
    {
      icon: <Cpu size={16} className="text-purple-400" />,
      text: "I believe we should leverage AI as a collaborator rather than claiming it is taking our jobs."
    },
    {
      icon: <Music size={16} className="text-purple-400" />,
      text: "My absolute favorite song of all time is 'Forever Young' by Alphaville."
    },
    {
      icon: <ChefHat size={16} className="text-purple-400" />,
      text: "I love cooking, experimenting in the kitchen, and making delicious new dishes."
    },
    {
      icon: <Compass size={16} className="text-purple-400" />,
      text: "I am highly passionate about travelling, exploring new places, and experiencing diverse cultures."
    }
  ], []);

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
      className="min-h-screen relative flex flex-col justify-center items-center md:items-start pt-20 md:pt-0 px-6 md:px-16 lg:px-24 xl:px-32 overflow-hidden bg-[#03000a]"
    >
      {/* Sleek subtle ambient backdrop (no heavy sci-fi glowing) */}
      <div className="absolute inset-0 overflow-hidden pointer-events-none">
        <div className="absolute top-[20%] right-[10%] w-[400px] h-[400px] rounded-full bg-purple-950/10 blur-[120px]" />
        <div className="absolute bottom-[10%] left-[20%] w-[300px] h-[300px] rounded-full bg-indigo-950/10 blur-[100px]" />
        
        {/* Subtle grid accent */}
        <div 
          className="absolute inset-0 opacity-[0.02]" 
          style={{
            backgroundImage: `radial-gradient(circle, #8b5cf6 1px, transparent 1px)`,
            backgroundSize: '24px 24px'
          }}
        />
      </div>

      <div className="w-full max-w-5xl grid grid-cols-1 md:grid-cols-12 gap-12 md:gap-8 items-center z-10">
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
              Open to New Projects
            </span>
          </motion.div>

          <div className="flex flex-col gap-2">
            <motion.h1
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, delay: 0.2 }}
              className="font-display text-4xl sm:text-5xl lg:text-6xl font-bold tracking-tight text-white leading-none min-h-[1.2em] flex flex-wrap items-center justify-center md:justify-start"
            >
              Hi, I'm{" "}
              <span className="text-purple-400 inline-flex items-center">
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
              Full-Stack Software Developer
            </motion.h2>
          </div>

          {/* Fading Rotating Fun Facts Widget */}
          <motion.div
            initial={{ opacity: 0, y: 15 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.45 }}
            className="w-full max-w-md bg-[#090518]/70 border border-purple-950/45 rounded-xl p-4 shadow-[0_4px_30px_rgba(139,92,246,0.02)] backdrop-blur-md self-center md:self-start flex flex-col gap-2.5 overflow-hidden"
          >
            <div className="flex items-center gap-2 text-[10px] font-mono text-purple-400 uppercase tracking-widest font-semibold">
              <Sparkles size={11} className="animate-pulse" />
              <span>Fun Fact</span>
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
                    {FUN_FACTS[currentFactIndex].icon}
                  </div>
                  <p className="text-gray-300 text-xs sm:text-sm leading-relaxed font-sans font-medium">
                    {FUN_FACTS[currentFactIndex].text}
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
              className="w-full sm:w-auto px-8 py-3.5 bg-gradient-to-r from-purple-900 to-violet-800 hover:from-purple-800 hover:to-violet-700 text-white font-medium text-sm rounded-lg flex items-center justify-center gap-2 transition-all duration-300 hover:shadow-[0_4px_20px_rgba(139,92,246,0.15)] group cursor-pointer"
            >
              View My Work
              <ArrowRight size={16} className="transform group-hover:translate-x-1 transition-transform" />
            </button>
            
            <a
              href="mailto:giftchisomwork@gmail.com"
              className="w-full sm:w-auto px-8 py-3.5 bg-zinc-950 hover:bg-zinc-900 border border-purple-950 hover:border-purple-800/80 text-gray-300 font-medium text-sm rounded-lg flex items-center justify-center gap-2 transition-all duration-300"
            >
              <Mail size={16} />
              Contact Me
            </a>
          </motion.div>
        </div>

        {/* Right column: Concentric Rotating Profile Graphic */}
        <div className="md:col-span-5 flex justify-center items-center order-1 md:order-2">
          <motion.div
            initial={{ opacity: 0, scale: 0.8 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ duration: 0.8, ease: 'easeOut' }}
            className="relative w-72 h-72 sm:w-80 sm:h-80 md:w-[340px] md:h-[340px] flex items-center justify-center"
          >
            {/* Outer dotted ring - rotating slowly */}
            <motion.div
              animate={{ rotate: 360 }}
              transition={{ repeat: Infinity, duration: 40, ease: 'linear' }}
              className="absolute inset-0 rounded-full border-2 border-dashed border-purple-950/40"
            />

            {/* Inner orbital ring with accent nodes - rotating in opposite direction */}
            <motion.div
              animate={{ rotate: -360 }}
              transition={{ repeat: Infinity, duration: 25, ease: 'linear' }}
              className="absolute inset-6 rounded-full border border-purple-500/20"
            >
              {/* Little orbital nodes representing tech connections */}
              <div className="absolute top-0 left-1/2 -translate-x-1/2 w-2 h-2 rounded-full bg-purple-500" />
              <div className="absolute bottom-0 left-1/2 -translate-x-1/2 w-2 h-2 rounded-full bg-indigo-500" />
              <div className="absolute left-0 top-1/2 -translate-y-1/2 w-2 h-2 rounded-full bg-violet-500" />
            </motion.div>

            {/* Even closer orbit ring */}
            <motion.div
              animate={{ rotate: 360 }}
              transition={{ repeat: Infinity, duration: 15, ease: 'linear' }}
              className="absolute inset-12 rounded-full border border-dashed border-purple-400/10"
            />

            {/* Profile Picture Container with Glow Mask */}
            <div className="relative w-[180px] h-[180px] sm:w-[210px] sm:h-[210px] md:w-[230px] md:h-[230px] rounded-full overflow-hidden p-1.5 bg-[#05010f] border-2 border-purple-900/60 shadow-[0_0_30px_rgba(88,28,135,0.2)] group">
              <div className="w-full h-full rounded-full overflow-hidden relative">
                <img
                  src={profileImgPath}
                  alt="Gift Chisom Portrait"
                  referrerPolicy="no-referrer"
                  className="w-full h-full object-cover rounded-full scale-105 transition-transform duration-500 group-hover:scale-110"
                />
                
                {/* Visual hover overlay */}
                <div className="absolute inset-0 bg-purple-950/20 opacity-0 group-hover:opacity-100 transition-opacity duration-300 flex items-center justify-center">
                  <div className="font-mono text-[10px] text-purple-300 bg-black/80 px-2.5 py-1 rounded-full tracking-wider uppercase border border-purple-500/30">
                    Full-Stack Engineer
                  </div>
                </div>
              </div>
            </div>

            {/* Micro rotating indicators/text orbiting her */}
            <svg
              className="absolute inset-2 w-[calc(100%-16px)] h-[calc(100%-16px)] animate-[spin_60s_linear_infinite] opacity-30"
              viewBox="0 0 100 100"
            >
              <defs>
                <path
                  id="circlePath"
                  d="M 50, 50 m -44, 0 a 44,44 0 1,1 88,0 a 44,44 0 1,1 -88,0"
                />
              </defs>
              <text fill="#a78bfa" className="font-mono text-[3.8px] tracking-[4px]">
                <textPath href="#circlePath">
                  DESIGN • DEVELOP • OPTIMIZE • SCALE • IDEATE • ITERATE • LEAD • SUPPORT •
                </textPath>
              </text>
            </svg>
          </motion.div>
        </div>
      </div>

      {/* Down indicator */}
      <div className="absolute bottom-6 left-1/2 -translate-x-1/2 flex flex-col items-center gap-1.5 opacity-55 animate-bounce">
        <span className="font-mono text-[10px] text-gray-500 tracking-widest uppercase">Scroll</span>
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
