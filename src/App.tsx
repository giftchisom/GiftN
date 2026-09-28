import React from 'react';
import { LanguageProvider } from './context/LanguageContext';
import { GiftHuntProvider } from './context/GiftHuntContext';
import Sidebar from './components/Sidebar';
import Hero from './components/Hero';
import About from './components/About';
import Experience from './components/Experience';
import Projects from './components/Projects';
import Contact from './components/Contact';
import MusicPlayer from './components/MusicPlayer';
import GalaxyBackground from './components/GalaxyBackground';
import CertificateModal from './components/CertificateModal';

export default function App() {
  const [activeSection, setActiveSection] = React.useState('intro');

  React.useEffect(() => {
    // Set up intersection observer to detect active section on scroll
    const sections = ['intro', 'about', 'experience', 'projects', 'contact'];
    
    const observerOptions = {
      root: null, // viewport
      rootMargin: '-30% 0px -40% 0px', // focused in center of screen
      threshold: 0
    };

    const observerCallback = (entries: IntersectionObserverEntry[]) => {
      entries.forEach((entry) => {
        if (entry.isIntersecting) {
          setActiveSection(entry.target.id);
        }
      });
    };

    const observer = new IntersectionObserver(observerCallback, observerOptions);

    sections.forEach((id) => {
      const el = document.getElementById(id);
      if (el) observer.observe(el);
    });

    return () => {
      sections.forEach((id) => {
        const el = document.getElementById(id);
        if (el) observer.unobserve(el);
      });
    };
  }, []);

  const handleNavigate = (sectionId: string) => {
    const el = document.getElementById(sectionId);
    if (el) {
      el.scrollIntoView({ behavior: 'smooth' });
      setActiveSection(sectionId);
    }
  };

  return (
    <LanguageProvider>
      <GiftHuntProvider>
        <div id="portfolio-root" className="min-h-screen bg-[#03000a] text-gray-100 flex flex-col md:flex-row relative">
          
          {/* Immersive Stars & Galaxy Canvas Background */}
          <GalaxyBackground />

          {/* Dynamic Nav Sidebar / Mobile Header */}
          <Sidebar activeSection={activeSection} onNavigate={handleNavigate} />

          {/* Main Content Area */}
          <main 
            id="main-content"
            className="flex-1 md:pl-80 pt-16 md:pt-0 min-w-0 relative z-10"
          >
            <Hero onNavigate={handleNavigate} />
            
            <About />
            
            <Experience />
            
            <Projects />

            <Contact onNavigate={handleNavigate} />

            {/* Minimalist Footnote */}
            <footer className="py-12 px-6 md:px-16 lg:px-24 xl:px-32 bg-transparent border-t border-purple-950/20 text-center flex flex-col sm:flex-row items-center justify-between gap-4 text-xs text-gray-500 font-mono">
              <div>
                © {new Date().getFullYear()} Gift Nneji
              </div>
              <div className="text-purple-300/90 font-medium">
                Built with 💜 by Gift N
              </div>
            </footer>
          </main>

          {/* Ambient Music Player */}
          <MusicPlayer />

          {/* Easter Egg Visitor Certificate Modal */}
          <CertificateModal />

        </div>
      </GiftHuntProvider>
    </LanguageProvider>
  );
}
