
import React from 'react';
import { motion } from 'framer-motion';
import PortfolioGraph from './components/PortfolioGraph';
import AboutSection from './components/AboutSection';
import ProjectsSection from './components/ProjectsSection';
import SkillsSection from './components/SkillsSection';

function App() {
  const handleScrollDown = (e: React.MouseEvent<HTMLAnchorElement>) => {
    e.preventDefault();
    document.getElementById('about')?.scrollIntoView({ behavior: 'smooth' });
  };

  return (
    <div className="bg-[#0a192f]">
      {/* Section 1: Fullscreen Interactive Graph */}
      <section className="relative w-screen h-screen overflow-hidden">
        <div className="absolute inset-0 bg-radial-gradient"></div>
        <motion.div
          initial={{ opacity: 0, y: -20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, ease: "easeOut" }}
          className="absolute top-8 left-8 z-20 text-[#ccd6f6] pointer-events-none"
        >
          <h1 className="text-4xl font-bold">Abderrahim Safou</h1>
          <p className="text-[#64ffda] text-lg">Interactive Portfolio</p>
        </motion.div>
        
        <div className="absolute inset-0 z-10">
          <PortfolioGraph />
        </div>

        <div className="absolute bottom-16 right-4 z-20 text-xs text-[#8892b0] pointer-events-none">
          Click nodes to explore. Drag to pan, scroll to zoom.
        </div>
        
        <a 
          href="#about" 
          onClick={handleScrollDown}
          className="absolute bottom-4 left-1/2 -translate-x-1/2 z-20 text-xs text-[#8892b0] animate-bounce group cursor-pointer" 
          aria-label="Scroll down"
        >
           <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="w-6 h-6 group-hover:text-[#64ffda] transition-colors">
            <path strokeLinecap="round" strokeLinejoin="round" d="m9 12.75 3 3m0 0 3-3m-3 3v-7.5" />
          </svg>
        </a>
      </section>

      {/* Static Content Sections */}
      <div className="relative z-10 bg-[#0a192f] px-6 sm:px-12 md:px-24">
        <AboutSection />
        <ProjectsSection />
        <SkillsSection />
      </div>

      <footer className="text-center p-8 text-sm text-[#8892b0] bg-[#0a192f]">
        <p>Designed & Built by Abderrahim Safou</p>
        <div className="flex justify-center gap-4 mt-4">
          <a href="https://github.com/hizawye" target="_blank" rel="noopener noreferrer" className="hover:text-[#64ffda] transition-colors">GitHub</a>
          <a href="https://linkedin.com/in/hizawye" target="_blank" rel="noopener noreferrer" className="hover:text-[#64ffda] transition-colors">LinkedIn</a>
        </div>
      </footer>
    </div>
  );
}

export default App;
