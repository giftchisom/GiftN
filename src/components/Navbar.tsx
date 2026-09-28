import React, { useState, useEffect } from 'react';
import { 
  Sun, 
  Moon, 
  Sunset, 
  Menu, 
  X, 
  ArrowUpRight, 
  Sparkles, 
  Terminal,
  FileText
} from 'lucide-react';
import { motion, AnimatePresence } from 'motion/react';

interface NavbarProps {
  activeSection: string;
  onNavigate: (sectionId: string) => void;
}

export default function Navbar({ activeSection, onNavigate }: NavbarProps) {
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const [greeting, setGreeting] = useState({ text: 'Good Day', icon: <Sun size={15} /> });
  const [scrolled, setScrolled] = useState(false);

  // Compute greeting from local hour
  useEffect(() => {
    const hour = new Date().getHours();
    if (hour >= 5 && hour < 12) {
      setGreeting({ text: 'Good Morning', icon: <Sun size={15} className="text-amber-500" /> });
    } else if (hour >= 12 && hour < 18) {
      setGreeting({ text: 'Good Afternoon', icon: <Sunset size={15} className="text-orange-500" /> });
    } else {
      setGreeting({ text: 'Good Evening', icon: <Moon size={15} className="text-indigo-500" /> });
    }
  }, []);

  // Track window scroll for elevated shadow
  useEffect(() => {
    const handleScroll = () => {
      setScrolled(window.scrollY > 20);
    };
    window.addEventListener('scroll', handleScroll, { passive: true });
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  const NAV_LINKS = [
    { id: 'intro', label: 'Home' },
    { id: 'about', label: 'About' },
    { id: 'experience', label: 'Experience' },
    { id: 'projects', label: 'Projects' },
    { id: 'skills', label: 'Skills' },
    { id: 'contact', label: 'Contact' },
  ];

  const handleLinkClick = (id: string) => {
    onNavigate(id);
    setMobileMenuOpen(false);
  };

  return (
    <header
      id="top-navbar"
      className={`fixed top-0 left-0 right-0 z-40 transition-all duration-300 ${
        scrolled 
          ? 'bg-white/90 backdrop-blur-md border-b border-slate-200/80 shadow-[0_4px_20px_-4px_rgba(0,0,0,0.05)] py-3' 
          : 'bg-white/60 backdrop-blur-sm border-b border-slate-100 py-4'
      }`}
    >
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 flex items-center justify-between">
        
        {/* Left: Logo & Live Day Greeting */}
        <div className="flex items-center gap-3">
          <button
            onClick={() => handleLinkClick('intro')}
            className="flex items-center gap-2 group cursor-pointer text-left"
          >
            <div className="w-9 h-9 rounded-xl bg-purple-600 flex items-center justify-center text-white font-display font-bold text-sm shadow-sm group-hover:scale-105 transition-transform">
              GN
            </div>
            <div className="hidden sm:flex flex-col">
              <span className="font-display font-bold text-sm text-slate-900 leading-tight">
                Gift Nneji
              </span>
              <span className="font-mono text-[11px] text-slate-500 leading-tight">
                Software Engineer
              </span>
            </div>
          </button>

          {/* Time-of-day greeting badge (inspired by awrs.me) */}
          <div className="hidden md:flex items-center gap-1.5 px-3 py-1 rounded-full bg-slate-100/90 border border-slate-200/70 text-slate-700 font-mono text-xs shadow-xs">
            {greeting.icon}
            <span className="font-medium">{greeting.text}</span>
          </div>
        </div>

        {/* Center: Navigation Links Desktop */}
        <nav className="hidden md:flex items-center gap-1 bg-slate-100/80 p-1 rounded-full border border-slate-200/70">
          {NAV_LINKS.map((link) => {
            const isActive = activeSection === link.id;
            return (
              <button
                key={link.id}
                onClick={() => handleLinkClick(link.id)}
                className={`relative px-4 py-1.5 rounded-full text-xs font-medium transition-all duration-200 cursor-pointer ${
                  isActive
                    ? 'text-indigo-600 font-semibold shadow-xs'
                    : 'text-slate-600 hover:text-slate-900 hover:bg-slate-200/50'
                }`}
              >
                {isActive && (
                  <motion.div
                    layoutId="activeNavTab"
                    className="absolute inset-0 bg-white rounded-full shadow-xs border border-slate-200/60"
                    transition={{ type: 'spring', bounce: 0.2, duration: 0.4 }}
                  />
                )}
                <span className="relative z-10">{link.label}</span>
              </button>
            );
          })}
        </nav>

        {/* Right: Availability Status & Contact CTA */}
        <div className="flex items-center gap-2.5">
          <div className="hidden lg:flex items-center gap-2 px-3 py-1.5 rounded-full bg-emerald-50 border border-emerald-200/70 text-emerald-800 text-xs font-mono">
            <span className="relative flex h-2 w-2">
              <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-emerald-400 opacity-75"></span>
              <span className="relative inline-flex rounded-full h-2 w-2 bg-emerald-500"></span>
            </span>
            <span className="font-medium">Available for Work</span>
          </div>

          <button
            onClick={() => handleLinkClick('contact')}
            className="hidden sm:inline-flex items-center gap-1.5 px-3.5 py-1.5 rounded-lg bg-indigo-600 hover:bg-indigo-700 text-white font-display text-xs font-semibold shadow-sm transition-all duration-200 hover:shadow-md cursor-pointer"
          >
            <span>Let's Talk</span>
            <ArrowUpRight size={13} />
          </button>

          {/* Mobile hamburger toggle */}
          <button
            onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
            className="md:hidden p-2 rounded-lg text-slate-700 hover:bg-slate-100 border border-slate-200/80 transition-colors cursor-pointer"
            aria-label="Toggle navigation"
          >
            {mobileMenuOpen ? <X size={20} /> : <Menu size={20} />}
          </button>
        </div>

      </div>

      {/* Mobile Menu Dropdown */}
      <AnimatePresence>
        {mobileMenuOpen && (
          <motion.div
            initial={{ opacity: 0, height: 0 }}
            animate={{ opacity: 1, height: 'auto' }}
            exit={{ opacity: 0, height: 0 }}
            className="md:hidden border-b border-slate-200 bg-white/95 backdrop-blur-md px-6 py-4 flex flex-col gap-2 shadow-lg"
          >
            <div className="flex items-center justify-between pb-3 border-b border-slate-100">
              <div className="flex items-center gap-2 font-mono text-xs text-slate-600">
                {greeting.icon}
                <span>{greeting.text}</span>
              </div>
              <div className="flex items-center gap-1.5 text-xs font-mono text-emerald-700 bg-emerald-50 px-2 py-0.5 rounded-full border border-emerald-200">
                <span className="w-1.5 h-1.5 rounded-full bg-emerald-500" />
                <span>Available</span>
              </div>
            </div>

            <div className="flex flex-col gap-1 py-2">
              {NAV_LINKS.map((link) => (
                <button
                  key={link.id}
                  onClick={() => handleLinkClick(link.id)}
                  className={`flex items-center justify-between px-3 py-2.5 rounded-lg text-sm text-left font-medium transition-colors ${
                    activeSection === link.id
                      ? 'bg-indigo-50 text-indigo-700 font-semibold'
                      : 'text-slate-700 hover:bg-slate-50'
                  }`}
                >
                  <span>{link.label}</span>
                  {activeSection === link.id && <span className="w-1.5 h-1.5 rounded-full bg-indigo-600" />}
                </button>
              ))}
            </div>

            <button
              onClick={() => handleLinkClick('contact')}
              className="w-full mt-2 py-2.5 rounded-lg bg-indigo-600 text-white font-medium text-sm flex items-center justify-center gap-2"
            >
              <span>Get in Touch</span>
              <ArrowUpRight size={15} />
            </button>
          </motion.div>
        )}
      </AnimatePresence>
    </header>
  );
}
