import React from 'react';
import { Github, Linkedin, Mail, Menu, X, Phone, Globe, Sparkles } from 'lucide-react';
import { motion, AnimatePresence } from 'motion/react';
import { useLanguage } from '../context/LanguageContext';
import { useGiftHunt } from '../context/GiftHuntContext';

interface SidebarProps {
  activeSection: string;
  onNavigate: (sectionId: string) => void;
}

export default function Sidebar({ activeSection, onNavigate }: SidebarProps) {
  const [isOpen, setIsOpen] = React.useState(false);
  const { language, setLanguage, t } = useLanguage();
  const { foundCount, totalGifts, isGiftFound, setIsCertificateOpen } = useGiftHunt();

  const navItems = [
    { id: 'intro', label: t('nav.intro') },
    { id: 'about', label: t('nav.about') },
    { id: 'experience', label: t('nav.experience') },
    { id: 'projects', label: t('nav.projects') },
    { id: 'contact', label: t('nav.contact') }
  ];

  const handleLinkClick = (id: string) => {
    onNavigate(id);
    setIsOpen(false);
  };

  return (
    <>
      {/* Mobile Toggle Bar */}
      <div className="md:hidden fixed top-0 left-0 right-0 h-16 bg-[#03000a] border-b border-purple-950/30 z-50 flex items-center justify-between px-6">
        <button
          onClick={() => handleLinkClick('intro')}
          className="font-display font-bold text-lg tracking-wider text-purple-400 cursor-pointer"
        >
          GIFT NNEJI
        </button>

        <div className="flex items-center gap-3">
          {/* Mobile Language Switcher */}
          <div className="inline-flex items-center bg-[#070214] border border-purple-900/50 rounded-lg p-0.5 shadow-sm">
            <button
              onClick={() => setLanguage('en')}
              className={`px-2 py-0.5 rounded text-[10px] font-mono font-medium transition-colors cursor-pointer ${
                language === 'en'
                  ? 'bg-purple-600 text-white'
                  : 'text-gray-400 hover:text-gray-200'
              }`}
              aria-label="Switch to English"
            >
              EN
            </button>
            <button
              onClick={() => setLanguage('fr')}
              className={`px-2 py-0.5 rounded text-[10px] font-mono font-medium transition-colors cursor-pointer ${
                language === 'fr'
                  ? 'bg-purple-600 text-white'
                  : 'text-gray-400 hover:text-gray-200'
              }`}
              aria-label="Passer en Français"
            >
              FR
            </button>
          </div>

          <button
            id="mobile-menu-toggle"
            onClick={() => setIsOpen(!isOpen)}
            className="text-gray-300 hover:text-purple-400 p-2 transition-colors cursor-pointer"
            aria-label="Toggle navigation menu"
          >
            {isOpen ? <X size={24} /> : <Menu size={24} />}
          </button>
        </div>
      </div>

      {/* Mobile Menu Dropdown */}
      <AnimatePresence>
        {isOpen && (
          <motion.div
            id="mobile-nav-menu"
            initial={{ opacity: 0, y: -20 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -20 }}
            transition={{ duration: 0.2 }}
            className="md:hidden fixed top-16 left-0 right-0 bg-[#03000a] border-b border-purple-950/80 z-40 px-8 py-6 flex flex-col gap-6 shadow-2xl"
          >
            <div className="flex flex-col gap-4">
              {navItems.map((item) => (
                <button
                  key={item.id}
                  onClick={() => handleLinkClick(item.id)}
                  className={`text-left py-2 font-display text-base tracking-wide transition-colors cursor-pointer ${
                    activeSection === item.id
                      ? 'text-purple-400 font-medium'
                      : 'text-gray-400 hover:text-gray-200'
                  }`}
                >
                  {item.label}
                </button>
              ))}
            </div>

            <div className="h-[1px] bg-purple-950/50 w-full" />

            {/* Language Switcher inside Mobile Drawer */}
            <div className="flex items-center justify-between">
              <span className="font-mono text-xs text-gray-400 flex items-center gap-1.5">
                <Globe size={14} className="text-purple-400" />
                <span>Language / Langue:</span>
              </span>
              <div className="inline-flex items-center bg-[#070214] border border-purple-900/50 rounded-lg p-0.5">
                <button
                  onClick={() => setLanguage('en')}
                  className={`px-3 py-1 rounded text-xs font-mono font-medium transition-colors cursor-pointer ${
                    language === 'en'
                      ? 'bg-purple-600 text-white'
                      : 'text-gray-400'
                  }`}
                >
                  English (EN)
                </button>
                <button
                  onClick={() => setLanguage('fr')}
                  className={`px-3 py-1 rounded text-xs font-mono font-medium transition-colors cursor-pointer ${
                    language === 'fr'
                      ? 'bg-purple-600 text-white'
                      : 'text-gray-400'
                  }`}
                >
                  Français (FR)
                </button>
              </div>
            </div>

            {/* Mobile Easter Egg Tracker */}
            <div className="p-3 rounded-xl bg-[#090317]/90 border border-purple-900/50 shadow-inner flex flex-col gap-2 w-full max-w-xs">
              <div className="flex items-center justify-between text-[11px] font-mono">
                <span className="text-purple-300 font-semibold flex items-center gap-1.5">
                  <Sparkles size={11} className="text-amber-400" />
                  {foundCount === totalGifts ? 'You found all 5.' : 'Psst… you missed something.'}
                </span>
              </div>
              <div className="flex items-center justify-between">
                <span className="font-mono text-xs text-amber-300 font-bold flex items-center gap-1">
                  {foundCount}/{totalGifts} Gifts found 🎁
                </span>
                {foundCount === totalGifts ? (
                  <button
                    onClick={() => {
                      setIsCertificateOpen(true);
                      setIsOpen(false);
                    }}
                    className="px-2.5 py-1 rounded bg-purple-600 hover:bg-purple-500 text-white font-mono text-[10px] font-bold shadow-[0_0_10px_rgba(168,85,247,0.5)] cursor-pointer"
                  >
                    Certificate 📜
                  </button>
                ) : (
                  <span className="text-[10px] font-mono text-gray-500">
                    {foundCount === 0 ? 'Explore to find' : `${totalGifts - foundCount} left`}
                  </span>
                )}
              </div>
              <div className="flex items-center gap-1.5 mt-0.5">
                {[1, 2, 3, 4, 5].map((idx) => (
                  <div
                    key={idx}
                    className={`h-1.5 flex-1 rounded-full transition-all duration-500 ${
                      isGiftFound(idx)
                        ? 'bg-amber-400 shadow-[0_0_8px_rgba(251,191,36,0.8)]'
                        : 'bg-purple-950/60 border border-purple-900/30'
                    }`}
                  />
                ))}
              </div>
              {foundCount === totalGifts && (
                <p className="text-[10px] text-amber-300/90 font-mono mt-0.5 leading-snug">
                  Okay detective, you can have my mini certificate! *☺︎*
                </p>
              )}
            </div>

            <div className="h-[1px] bg-purple-950/50 w-full" />

            {/* Socials on Mobile */}
            <div className="flex items-center gap-6 text-gray-400">
              <a
                href="https://github.com/giftchisom"
                target="_blank"
                rel="noreferrer"
                className="hover:text-purple-400 transition-colors"
                aria-label="GitHub Profile"
              >
                <Github size={20} />
              </a>
              <a
                href="https://www.linkedin.com/in/gift-n-128172348/"
                target="_blank"
                rel="noreferrer"
                className="hover:text-purple-400 transition-colors"
                aria-label="LinkedIn Profile"
              >
                <Linkedin size={20} />
              </a>
              <a
                href="mailto:giftchisomwork@gmail.com"
                className="hover:text-purple-400 transition-colors"
                aria-label="Email Gift"
              >
                <Mail size={20} />
              </a>
              <a
                href="tel:+22870800377"
                className="hover:text-purple-400 transition-colors"
                aria-label="Call Phone"
              >
                <Phone size={20} />
              </a>
            </div>
          </motion.div>
        )}
      </AnimatePresence>

      {/* Desktop Sidebar */}
      <aside
        id="desktop-sidebar"
        className="hidden md:flex fixed top-0 left-0 h-screen w-80 bg-transparent border-r border-purple-950/20 px-10 py-10 flex-col justify-between z-30 select-none overflow-y-auto scrollbar-none"
      >
        {/* Top: Branding & Language Switcher */}
        <div className="flex flex-col gap-2">
          <button
            onClick={() => onNavigate('intro')}
            className="text-left font-display text-2xl font-bold tracking-widest text-white hover:text-purple-400 transition-colors cursor-pointer"
          >
            GIFT NNEJI
          </button>
          <span className="font-mono text-xs text-purple-400/80 tracking-wider">
            {t('sidebar.role')}
          </span>
          <p className="text-gray-500 text-xs mt-3 leading-relaxed max-w-[210px]">
            {t('sidebar.tagline')}
          </p>

          {/* Desktop Language Switcher */}
          <div className="flex items-center gap-2.5 mt-3 pt-3 border-t border-purple-950/30">
            <div className="flex items-center gap-1.5 text-xs text-gray-400 font-mono">
              <Globe size={13} className="text-purple-400" />
              <span>Lang:</span>
            </div>
            <div className="inline-flex items-center bg-[#070214] border border-purple-900/50 rounded-lg p-0.5 shadow-inner">
              <button
                onClick={() => setLanguage('en')}
                className={`px-2.5 py-1 rounded-md text-[11px] font-mono font-medium transition-all duration-200 cursor-pointer ${
                  language === 'en'
                    ? 'bg-purple-600 text-white shadow-[0_0_12px_rgba(147,51,234,0.4)]'
                    : 'text-gray-400 hover:text-gray-200 hover:bg-purple-950/30'
                }`}
                aria-label="Switch to English"
              >
                EN
              </button>
              <button
                onClick={() => setLanguage('fr')}
                className={`px-2.5 py-1 rounded-md text-[11px] font-mono font-medium transition-all duration-200 cursor-pointer ${
                  language === 'fr'
                    ? 'bg-purple-600 text-white shadow-[0_0_12px_rgba(147,51,234,0.4)]'
                    : 'text-gray-400 hover:text-gray-200 hover:bg-purple-950/30'
                }`}
                aria-label="Passer en Français"
              >
                FR
              </button>
            </div>
            <span className="text-[10px] font-mono text-purple-400/70 uppercase">
              {language === 'en' ? 'English' : 'Français'}
            </span>
          </div>
        </div>

        {/* Center: Connective Tree Navigation */}
        <nav className="relative flex flex-col gap-7 pl-4 py-6">
          {/* Vertical continuous line */}
          <div className="absolute left-0 top-3 bottom-3 w-[2px] bg-purple-950/30" />

          {/* Active track filling */}
          <div className="absolute left-0 top-3 bottom-3 w-[2px] overflow-hidden">
            <motion.div
              className="w-full bg-purple-500 origin-top"
              initial={{ scaleY: 0 }}
              animate={{
                scaleY:
                  activeSection === 'intro'
                    ? 0.1
                    : activeSection === 'about'
                    ? 0.32
                    : activeSection === 'experience'
                    ? 0.55
                    : activeSection === 'projects'
                    ? 0.78
                    : 1,
              }}
              transition={{ type: 'spring', stiffness: 80, damping: 15 }}
              style={{ height: '100%' }}
            />
          </div>

          {navItems.map((item) => {
            const isActive = activeSection === item.id;
            return (
              <button
                key={item.id}
                onClick={() => onNavigate(item.id)}
                className="group relative flex items-center gap-6 text-left cursor-pointer focus:outline-none"
              >
                {/* Connection Node */}
                <div className="absolute -left-4 flex items-center justify-center">
                  <div className="relative">
                    {/* Ring */}
                    <motion.div
                      className={`absolute -inset-[6px] rounded-full border border-purple-500/40 opacity-0 ${
                        isActive ? 'opacity-100 scale-100' : 'scale-70 group-hover:opacity-40 group-hover:scale-90'
                      }`}
                      animate={{
                        scale: isActive ? [1, 1.2, 1] : 1,
                      }}
                      transition={{
                        repeat: isActive ? Infinity : 0,
                        duration: 2,
                        ease: 'easeInOut',
                      }}
                    />
                    {/* Inner core */}
                    <div
                      className={`w-[10px] h-[10px] rounded-full border-2 transition-all duration-300 ${
                        isActive
                          ? 'bg-purple-400 border-purple-400 shadow-[0_0_8px_rgba(168,85,247,0.5)]'
                          : 'bg-[#04010b] border-purple-950 group-hover:border-purple-600'
                      }`}
                    />
                  </div>
                </div>

                {/* Text */}
                <span
                  className={`font-display text-sm uppercase tracking-widest transition-all duration-300 ${
                    isActive
                      ? 'text-purple-300 font-semibold translate-x-1'
                      : 'text-gray-500 group-hover:text-gray-300 group-hover:translate-x-1'
                  }`}
                >
                  {item.label}
                </span>
              </button>
            );
          })}
        </nav>

        {/* Easter Egg: "Can You Find Me?" Tracker */}
        <div className="my-2 p-3 rounded-xl bg-[#090317]/85 border border-purple-900/40 shadow-inner flex flex-col gap-2">
          <div className="flex items-center justify-between text-[11px] font-mono">
            <span className="text-purple-300 font-semibold flex items-center gap-1.5">
              <Sparkles size={11} className="text-amber-400" />
              {foundCount === totalGifts ? 'You found all 5.' : 'Psst… you missed something.'}
            </span>
          </div>

          <div className="flex items-center justify-between">
            <span className="font-mono text-xs text-amber-300 font-bold flex items-center gap-1">
              {foundCount}/{totalGifts} Gifts found 🎁
            </span>

            {foundCount === totalGifts ? (
              <button
                onClick={() => setIsCertificateOpen(true)}
                className="px-2 py-0.5 rounded bg-purple-600 hover:bg-purple-500 text-white font-mono text-[10px] font-bold transition-all shadow-[0_0_10px_rgba(168,85,247,0.5)] cursor-pointer animate-pulse"
              >
                Certificate 📜
              </button>
            ) : (
              <span className="text-[10px] font-mono text-gray-500">
                {foundCount === 0 ? 'Explore to find' : `${totalGifts - foundCount} left`}
              </span>
            )}
          </div>

          {/* Progress dots */}
          <div className="flex items-center gap-1.5 mt-0.5">
            {[1, 2, 3, 4, 5].map((idx) => {
              const isFound = isGiftFound(idx);
              return (
                <div
                  key={idx}
                  title={`Gift #${idx} ${isFound ? '(Found)' : '(Hidden)'}`}
                  className={`h-1.5 flex-1 rounded-full transition-all duration-500 ${
                    isFound
                      ? 'bg-amber-400 shadow-[0_0_8px_rgba(251,191,36,0.8)]'
                      : 'bg-purple-950/60 border border-purple-900/30'
                  }`}
                />
              );
            })}
          </div>

          {foundCount === totalGifts && (
            <p className="text-[10px] text-amber-300/90 font-mono mt-0.5 leading-snug">
              Okay detective, you can have my mini certificate! *☺︎*
            </p>
          )}
        </div>

        {/* Bottom: Contact & Social Info */}
        <div className="flex flex-col gap-5">
          <div className="flex items-center gap-4 text-gray-500">
            <a
              href="https://github.com/giftchisom"
              target="_blank"
              rel="noreferrer"
              className="hover:text-purple-400 hover:scale-110 transition-all duration-200"
              title="GitHub Profile"
            >
              <Github size={18} />
            </a>
            <a
              href="https://www.linkedin.com/in/gift-n-128172348/"
              target="_blank"
              rel="noreferrer"
              className="hover:text-purple-400 hover:scale-110 transition-all duration-200"
              title="LinkedIn Profile"
            >
              <Linkedin size={18} />
            </a>
            <a
              href="mailto:giftchisomwork@gmail.com"
              className="hover:text-purple-400 hover:scale-110 transition-all duration-200"
              title="Email Contact"
            >
              <Mail size={18} />
            </a>
            <a
              href="tel:+22870800377"
              className="hover:text-purple-400 hover:scale-110 transition-all duration-200"
              title="Call Phone"
            >
              <Phone size={18} />
            </a>
          </div>

          <div className="h-[1px] bg-purple-950/20 w-2/3" />

          {/* Quick info badges */}
          <div className="flex flex-col gap-1 font-mono text-[10px] text-gray-500">
            <div>📍 Lomé, Togo</div>
            <div>📧 giftchisomwork@gmail.com</div>
            <div>📞 (+228) 70800377</div>
          </div>
        </div>
      </aside>
    </>
  );
}
