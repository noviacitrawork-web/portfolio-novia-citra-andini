import React from 'react';
import { Folder, ExternalLink } from 'lucide-react';
import { PROJECTS, PROJECTS_DESCRIPTION } from '../../constants';
import { motion } from 'framer-motion';

const Projects: React.FC = () => {
  const container = {
    hidden: { opacity: 0 },
    show: {
      opacity: 1,
      transition: {
        staggerChildren: 0.1
      }
    }
  };

  const item = {
    hidden: { opacity: 0, y: 30 },
    show: { opacity: 1, y: 0 }
  };

  return (
    <section id="projects" className="py-24 bg-gray-50 dark:bg-dark relative transition-colors duration-500 overflow-hidden">
        {/* Texture Pattern: Diagonal Lines (Linear Algebra/Vectors Theme) - Low Contrast */}
        <div className="absolute inset-0 opacity-[0.03] dark:opacity-[0.03] bg-[repeating-linear-gradient(45deg,currentColor_0px,currentColor_1px,transparent_1px,transparent_30px)]"></div>
        
        {/* Soft Gradient Overlay */}
        <div className="absolute inset-0 bg-gradient-to-b from-gray-50/50 via-transparent to-gray-50/50 dark:from-dark/50 dark:via-transparent dark:to-dark/50 pointer-events-none"></div>

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
        <motion.div 
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: "-100px" }}
          className="mb-12"
        >
          <h2 className="text-3xl md:text-4xl font-bold text-gray-900 dark:text-white mb-4">Featured Projects</h2>
          <p className="text-gray-600 dark:text-gray-400 max-w-2xl mb-8">
            {PROJECTS_DESCRIPTION}
          </p>
        </motion.div>

        <motion.div 
          variants={container}
          initial="hidden"
          whileInView="show"
          viewport={{ once: true, margin: "-50px" }}
          className="flex flex-wrap justify-center gap-8"
        >
          {PROJECTS.map((project) => (
            <motion.div 
              key={project.id} 
              variants={item}
              whileHover={{ y: -8 }}
              className="w-full md:w-[calc(50%-1rem)] lg:w-[calc(33.333%-1.4rem)] bg-white dark:bg-card rounded-xl overflow-hidden border border-gray-200 dark:border-gray-800 hover:border-primary/50 transition-colors group flex flex-col shadow-sm dark:shadow-none"
            >
              {/* Project Image - Updated to 16:9 Aspect Ratio (PowerPoint Style) */}
              <div className="aspect-video w-full overflow-hidden relative bg-gray-100 dark:bg-gray-900 border-b border-gray-200 dark:border-gray-800">
                  <div className="absolute inset-0 bg-primary/10 group-hover:bg-transparent transition-colors z-10 pointer-events-none"></div>
                  
                  {project.link ? (
                    <a href={project.link} target="_blank" rel="noopener noreferrer" className="block w-full h-full cursor-pointer">
                      <motion.img 
                        whileHover={{ scale: 1.05 }}
                        transition={{ duration: 0.6 }}
                        src={project.image || "https://picsum.photos/400/250"} 
                        alt={project.title}
                        className="w-full h-full object-contain" 
                      />
                    </a>
                  ) : (
                    <motion.img 
                      whileHover={{ scale: 1.05 }}
                      transition={{ duration: 0.6 }}
                      src={project.image || "https://picsum.photos/400/250"} 
                      alt={project.title}
                      className="w-full h-full object-contain"
                    />
                  )}
              </div>

              <div className="p-6 flex flex-col flex-grow">
                <div className="flex justify-between items-start mb-4">
                  <div className="p-2 bg-gray-100 dark:bg-gray-900 rounded-lg text-primary">
                    <Folder size={20} />
                  </div>
                  <div className="flex flex-col items-end">
                    <span className="text-xs text-gray-500 dark:text-gray-400 font-mono">{project.date}</span>
                  </div>
                </div>

                <h3 className="text-xl font-bold text-gray-900 dark:text-white mb-2 group-hover:text-primary transition-colors">
                  {project.link ? (
                    <a href={project.link} target="_blank" rel="noopener noreferrer" className="hover:underline">
                      {project.title}
                    </a>
                  ) : (
                    project.title
                  )}
                </h3>
                
                <p className="text-sm text-gray-600 dark:text-gray-400 mb-6">
                  {project.description[0]}
                </p>

                {/* Footer: Tags and External Link Symbol */}
                <div className="mt-auto pt-4 border-t border-gray-200 dark:border-gray-800 flex items-center justify-between gap-4">
                   <div className="flex flex-wrap gap-2">
                      {project.tags.map((tag) => (
                        <span 
                          key={tag} 
                          className="px-2 py-1 text-xs font-medium text-cyan-700 dark:text-cyan-300 bg-cyan-100 dark:bg-cyan-900/30 rounded-md"
                        >
                          {tag}
                        </span>
                      ))}
                   </div>

                   {/* Icon Only Link */}
                   {project.link && (
                      <a 
                        href={project.link} 
                        target="_blank" 
                        rel="noopener noreferrer" 
                        className="p-2 text-gray-400 hover:text-gray-900 dark:hover:text-white hover:bg-gray-200 dark:hover:bg-gray-800 rounded-full transition-all"
                      >
                        <ExternalLink size={18} />
                      </a>
                   )}
                </div>
              </div>
            </motion.div>
          ))}
        </motion.div>
      </div>
    </section>
  );
};

export default Projects;