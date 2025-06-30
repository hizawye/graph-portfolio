
import React from 'react';
import { portfolioData } from '../constants';
import { motion } from 'framer-motion';

const SectionHeader: React.FC<{ number: string; title: string }> = ({ number, title }) => (
  <motion.div 
    className="flex items-center gap-4 mb-8"
    initial={{ opacity: 0, x: -50 }}
    whileInView={{ opacity: 1, x: 0 }}
    viewport={{ once: true, amount: 0.5 }}
    transition={{ duration: 0.5 }}
  >
    <h2 className="text-2xl md:text-3xl font-bold text-[#ccd6f6]">
      <span className="text-[#64ffda] mr-2">{number}</span>
      {title}
    </h2>
    <div className="h-px bg-[#233554] flex-grow"></div>
  </motion.div>
);


const AboutSection: React.FC = () => {
  const aboutMeNode = portfolioData.nodes.find(node => node.id === 'me');

  if (!aboutMeNode) {
    return null;
  }

  return (
    <section id="about" className="py-24">
      <SectionHeader number="01." title="About Me" />
      <motion.div
        initial={{ opacity: 0, y: 50 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true, amount: 0.3 }}
        transition={{ duration: 0.5, delay: 0.2 }}
      >
        <p className="text-[#a8b2d1] text-lg leading-relaxed max-w-3xl">
          I’m a full-stack developer, AI enthusiast, and ambitious entrepreneur passionate about building powerful tools that solve real-world problems. My work ranges from fintech platforms to AI agents and IoT devices. I bring a unique combination of technical depth, business vision, and execution speed, with a goal to build a company spanning tech, infrastructure, and renewable energy.
        </p>
      </motion.div>
    </section>
  );
};

export default AboutSection;
