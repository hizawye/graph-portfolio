
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

const ProjectsSection: React.FC = () => {
  const projects = portfolioData.nodes.filter(node => node.type === 'project');
  const skills = portfolioData.nodes.filter(node => node.type === 'skill');

  const getSkillsForProject = (projectId: string) => {
    return portfolioData.links
      .filter(link => (link.source === projectId && skills.some(s => s.id === link.target)) || (link.target === projectId && skills.some(s => s.id === link.source)))
      .map(link => {
        const skillId = link.source === projectId ? link.target : link.source;
        return skills.find(s => s.id === skillId);
      })
      .filter(Boolean);
  };
  
  return (
    <section id="projects" className="py-24">
      <SectionHeader number="02." title="Things I've Built" />
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {projects.map((project, index) => {
          const projectSkills = getSkillsForProject(project.id);
          return (
            <motion.div
              key={project.id}
              className="bg-[#112240] rounded-md p-6 flex flex-col justify-between hover:-translate-y-2 transition-transform duration-300 shadow-lg border border-transparent hover:border-[#64ffda]/30"
              initial={{ opacity: 0, y: 50 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, amount: 0.3 }}
              transition={{ duration: 0.5, delay: index * 0.1 }}
            >
              <div>
                <h3 className="text-xl font-bold text-[#ccd6f6] mb-2">{project.name}</h3>
                <p className="text-[#a8b2d1] text-sm leading-relaxed mb-4">{project.details}</p>
              </div>
              <div className="flex flex-wrap gap-2 mt-auto pt-4">
                {projectSkills.map(skill => skill && (
                  <span key={skill.id} className="text-xs text-[#64ffda] bg-[#233554]/50 px-2 py-1 rounded-full">
                    {skill.name}
                  </span>
                ))}
              </div>
            </motion.div>
          )
        })}
      </div>
    </section>
  );
};

export default ProjectsSection;
