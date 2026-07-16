import React from 'react';
import { Github, Linkedin, Mail, Menu, X, Phone, FileText } from 'lucide-react';
import { motion, AnimatePresence } from 'motion/react';

interface SidebarProps {
  activeSection: string;
  onNavigate: (sectionId: string) => void;
}

const NAV_ITEMS = [
  { id: 'intro', label: 'Intro' },
  { id: 'about', label: 'About & Skills' },
  { id: 'experience', label: 'Experience' },
  { id: 'projects', label: 'Featured Projects' }
];

export default function Sidebar({ activeSection, onNavigate }: SidebarProps) {
  const [isOpen, setIsOpen] = React.useState(false);

  const handleLinkClick = (id: string) => {
    onNavigate(id);
    setIsOpen(false);
  };

  return (
    <>
      {/* Mobile Toggle Bar */}
      <div className="md:hidden fixed top-0 left-0 right-0 h-16 bg-[#060311]/90 backdrop-blur-md border-b border-purple-950/40 z-50 flex items-center justify-between px-6">
        <button
          onClick={() => handleLinkClick('intro')}
          className="font-display font-bold text-lg tracking-wider text-purple-400 cursor-pointer"
        >
        GIFT NNEJI
        </button>
        <button
          id="mobile-menu-toggle"
          onClick={() => setIsOpen(!isOpen)}
          className="text-gray-300 hover:text-purple-400 p-2 transition-colors cursor-pointer"
          aria-label="Toggle navigation menu"
        >
          {isOpen ? <X size={24} /> : <Menu size={24} />}
        </button>
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
            className="md:hidden fixed top-16 left-0 right-0 bg-[#060311] border-b border-purple-950/80 z-40 px-8 py-6 flex flex-col gap-6 shadow-2xl"
          >
            <div className="flex flex-col gap-4">
              {NAV_ITEMS.map((item) => (
                <button
                  key={item.id}
                  onClick={() => handleLinkClick(item.id)}
                  className={`text-left py-2 font-display text-base tracking-wide transition-colors ${
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
        className="hidden md:flex fixed top-0 left-0 h-screen w-80 bg-[#04010b] border-r border-purple-950/20 px-10 py-12 flex-col justify-between z-30 select-none"
      >
        {/* Top: Branding */}
        <div className="flex flex-col gap-2">
          <button
            onClick={() => onNavigate('intro')}
            className="text-left font-display text-2xl font-bold tracking-widest text-white hover:text-purple-400 transition-colors cursor-pointer"
          >
            GIFT NNEJI
          </button>
          <span className="font-mono text-xs text-purple-400/80 tracking-wider">
            FULL STACK DEVELOPER
          </span>
          <p className="text-gray-500 text-xs mt-4 leading-relaxed max-w-[210px]">
            Product-minded engineer crafting secure, real-time, and AI-enabled digital ecosystems.
          </p>
        </div>

        {/* Center: Connective Tree Navigation */}
        <nav className="relative flex flex-col gap-8 pl-4 py-8">
          {/* Vertical continuous line */}
          <div className="absolute left-0 top-3 bottom-3 w-[2px] bg-purple-950/30" />

          {/* Active track filling */}
          <div className="absolute left-0 top-3 bottom-3 w-[2px] overflow-hidden">
            <motion.div
              className="w-full bg-gradient-to-b from-purple-500 via-violet-600 to-indigo-500 origin-top"
              initial={{ scaleY: 0 }}
              animate={{
                scaleY:
                  activeSection === 'intro'
                    ? 0.1
                    : activeSection === 'about'
                    ? 0.4
                    : activeSection === 'experience'
                    ? 0.7
                    : 1,
              }}
              transition={{ type: 'spring', stiffness: 80, damping: 15 }}
              style={{ height: '100%' }}
            />
          </div>

          {NAV_ITEMS.map((item, idx) => {
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

        {/* Bottom: Contact & Social Info */}
        <div className="flex flex-col gap-6">
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
