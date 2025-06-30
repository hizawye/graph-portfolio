
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

const SkillsSection: React.FC = () => {
  const skills = portfolioData.nodes.filter(node => node.type === 'skill');

  return (
    <section id="skills" className="py-24">
      <SectionHeader number="03." title="Skills & Technologies" />
       <motion.div 
        className="max-w-4xl"
        initial={{ opacity: 0, y: 50 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true, amount: 0.3 }}
        transition={{ duration: 0.5, delay: 0.2 }}
       >
        <p className="text-[#a8b2d1] text-lg leading-relaxed mb-8">
            Here are a few of the technologies I've been working with recently:
        </p>
        <div className="flex flex-wrap gap-4">
            {skills.map((skill, index) => (
            <motion.div
                key={skill.id}
                className="bg-[#233554] text-[#ccd6f6] text-base font-medium px-4 py-2 rounded-md hover:bg-[#64ffda] hover:text-[#0a192f] transition-colors duration-300 cursor-default"
                initial={{ opacity: 0, scale: 0.5 }}
                whileInView={{ opacity: 1, scale: 1 }}
                viewport={{ once: true }}
                transition={{ duration: 0.3, delay: index * 0.05 }}
            >
                {skill.name}
            </motion.div>
            ))}
        </div>
      </motion.div>
    </section>
  );
};

export default SkillsSection;
