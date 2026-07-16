import React from 'react';
import Sidebar from './components/Sidebar';
import Hero from './components/Hero';
import About from './components/About';
import Experience from './components/Experience';
import Projects from './components/Projects';
import MusicPlayer from './components/MusicPlayer';

export default function App() {
  const [activeSection, setActiveSection] = React.useState('intro');

  React.useEffect(() => {
    // Set up intersection observer to detect active section on scroll
    const sections = ['intro', 'about', 'experience', 'projects'];
    
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
    <div id="portfolio-root" className="min-h-screen bg-[#03000a] text-gray-100 flex flex-col md:flex-row relative">
      
      {/* Dynamic Nav Sidebar / Mobile Header */}
      <Sidebar activeSection={activeSection} onNavigate={handleNavigate} />

      {/* Main Content Area */}
      <main 
        id="main-content"
        className="flex-1 md:pl-80 pt-16 md:pt-0 min-w-0"
      >
        <Hero onNavigate={handleNavigate} />
        
        <About />
        
        <Experience />
        
        <Projects />

        {/* Minimalist Footnote (No slop, clean human label) */}
        <footer className="py-12 px-6 md:px-16 lg:px-24 xl:px-32 bg-[#020008] border-t border-purple-950/10 text-center flex flex-col sm:flex-row items-center justify-between gap-4 text-xs text-gray-500 font-mono">
          <div>
            © {new Date().getFullYear()} Gift Nneji • Full-Stack Developer
          </div>
          <div>
            Designed with precision • Built with React & Tailwind
          </div>
        </footer>
      </main>

      {/* Ambient Music Player */}
      <MusicPlayer />

    </div>
  );
}
