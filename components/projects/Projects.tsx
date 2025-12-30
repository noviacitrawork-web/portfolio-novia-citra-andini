import React, { useState } from "react";
import { Folder, ExternalLink, X, ZoomIn, ChevronDown, ChevronUp } from "lucide-react";
import { PROJECTS, PROJECTS_DESCRIPTION } from "../../constants";
import { motion, AnimatePresence } from "framer-motion";
import { Project } from "../../types";

const Projects: React.FC = () => {
  const [selectedProject, setSelectedProject] = useState<Project | null>(null);
  const [showAll, setShowAll] = useState(false);

  const visibleProjects = showAll ? PROJECTS : PROJECTS.slice(0, 3);

  // Helper to parse bold text using * syntax
  const parseBoldText = (
    text: string | React.ReactNode,
    className = "font-bold text-gray-900 dark:text-white"
  ) => {
    if (typeof text !== "string") return text;
    return text.split("*").map((part, index) =>
      index % 2 === 1 ? (
        <span key={index} className={className}>
          {part}
        </span>
      ) : (
        part
      )
    );
  };

  const handleOpenModal = (project: Project) => {
    setSelectedProject(project);
  };

  const container = {
    hidden: { opacity: 0 },
    show: {
      opacity: 1,
      transition: {
        staggerChildren: 0.1,
      },
    },
  };

  const item = {
    hidden: { opacity: 0, y: 30 },
    show: { opacity: 1, y: 0 },
  };

  return (
    <section
      id="projects"
      className="py-24 bg-gray-50 dark:bg-dark relative transition-colors duration-500 overflow-hidden"
    >
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
          <h2 className="text-3xl md:text-4xl font-bold text-gray-900 dark:text-white mb-4">
            Featured Projects
          </h2>
          <p className="text-gray-600 dark:text-gray-400 max-w-2xl mb-8">
            {PROJECTS_DESCRIPTION}
          </p>
        </motion.div>

        <motion.div
          variants={container}
          initial="hidden"
          whileInView="show"
          viewport={{ once: true, margin: "-50px" }}
          className="flex flex-wrap justify-center gap-8 mb-12"
        >
          {visibleProjects.map((project) => (
            <motion.div
              key={project.id}
              variants={item}
              whileHover={{ y: -8 }}
              className="w-full md:w-[calc(50%-1rem)] lg:w-[calc(33.333%-1.4rem)] bg-white dark:bg-card rounded-xl overflow-hidden border border-gray-200 dark:border-gray-800 hover:border-primary/50 transition-colors group flex flex-col shadow-sm dark:shadow-none"
            >
              {/* Project Image - Updated to 16:9 Aspect Ratio (PowerPoint Style) */}
              <div
                className="aspect-video w-full overflow-hidden relative bg-black border-b border-gray-200 dark:border-gray-800 cursor-pointer"
                onClick={() => handleOpenModal(project)}
              >
                <div className="absolute inset-0 bg-primary/10 group-hover:bg-transparent transition-colors z-10 pointer-events-none"></div>

                {/* View Full Size Overlay */}
                <div className="absolute inset-0 bg-black/40 opacity-0 group-hover:opacity-100 transition-opacity duration-300 z-20 hidden md:flex items-center justify-center pointer-events-none">
                  <div className="flex items-center gap-2 text-white text-sm font-bold uppercase tracking-wider bg-primary/90 px-4 py-2 rounded-full transform translate-y-4 group-hover:translate-y-0 transition-transform duration-300">
                    <ZoomIn size={16} />
                    <span>More</span>
                  </div>
                </div>

                <motion.img
                  whileHover={{ scale: 1.05 }}
                  transition={{ duration: 0.6 }}
                  src={project.image || "https://picsum.photos/400/250"}
                  alt={project.title}
                  className="w-full h-full object-contain"
                />
              </div>

              <div className="p-6 flex flex-col flex-grow">
                <div className="flex justify-between items-start mb-4">
                  <div className="p-2 bg-gray-100 dark:bg-gray-900 rounded-lg text-primary">
                    <Folder size={20} />
                  </div>
                  <div className="flex flex-col items-end">
                    <span className="text-xs text-gray-500 dark:text-gray-400 font-mono">
                      {project.date}
                    </span>
                  </div>
                </div>

                <h3 className="text-xl font-bold text-gray-900 dark:text-white mb-2 group-hover:text-primary transition-colors">
                  {project.link ? (
                    <a
                      href={project.link}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="hover:underline"
                    >
                      {project.title}
                    </a>
                  ) : (
                    project.title
                  )}
                </h3>

                <p className="text-sm text-gray-600 dark:text-gray-400 mb-4 line-clamp-3">
                  {parseBoldText(project.description[0])}
                </p>

                <button
                  onClick={() => handleOpenModal(project)}
                  className="text-primary text-sm font-medium hover:underline mb-6 focus:outline-none"
                >
                  Read More
                </button>

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

        {PROJECTS.length > 3 && (
          <div className="flex justify-center mt-8">
            <button
              onClick={() => setShowAll(!showAll)}
              className="flex items-center gap-2 px-6 py-3 bg-white dark:bg-card border border-gray-200 dark:border-gray-800 rounded-full shadow-lg hover:shadow-xl transition-all text-gray-900 dark:text-white font-medium group hover:-translate-y-1"
            >
              {showAll ? (
                <>
                  Show Less Projects <ChevronUp size={20} className="group-hover:-translate-y-1 transition-transform" />
                </>
              ) : (
                <>
                  Show More Projects <ChevronDown size={20} className="group-hover:translate-y-1 transition-transform" />
                </>
              )}
            </button>
          </div>
        )}
      </div>

      <AnimatePresence>
        {selectedProject && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            onClick={() => setSelectedProject(null)}
            className="fixed inset-0 z-[100] flex items-center justify-center p-4 bg-black/90 backdrop-blur-sm"
          >
            <motion.div
              initial={{ scale: 0.9, opacity: 0 }}
              animate={{ scale: 1, opacity: 1 }}
              exit={{ scale: 0.9, opacity: 0 }}
              onClick={(e) => e.stopPropagation()}
              className="relative max-w-5xl w-[95%] md:w-full bg-white dark:bg-gray-800 rounded-2xl overflow-hidden shadow-2xl max-h-[90vh] lg:h-[85vh] flex flex-col"
            >
              <button
                onClick={() => setSelectedProject(null)}
                className="absolute top-4 right-4 z-10 p-2 bg-black/50 hover:bg-black/70 text-white rounded-full transition-colors"
              >
                <X className="w-6 h-6" />
              </button>

              <div className="flex flex-col lg:grid lg:grid-cols-[65%_35%] flex-1 min-h-0 overflow-hidden">
                <div className="bg-black flex items-center justify-center p-0 relative group h-[40%] min-h-[250px] lg:h-full w-full shrink-0">
                  <img
                    src={
                      selectedProject.image || "https://picsum.photos/400/250"
                    }
                    alt={selectedProject.title}
                    className="max-w-full max-h-full w-auto object-contain"
                  />
                </div>
                {/* Unified Scroll Container */}
                <div className="flex-1 lg:h-full overflow-y-auto bg-white dark:bg-gray-800 p-6 md:p-8 custom-scrollbar">
                  <div className="flex flex-col min-h-full">
                    <div className="flex-shrink-0">
                      <h3 className="text-xl md:text-2xl font-bold text-gray-900 dark:text-white mb-4">
                        {selectedProject.title}
                      </h3>
                      <div className="w-20 h-1 bg-secondary rounded-full mb-6"></div>
                    </div>
                    
                    <div className="text-gray-600 dark:text-gray-300 leading-relaxed text-sm md:text-base mb-6">
                      {parseBoldText(selectedProject.description.join(' '))}
                    </div>
                    
                    <div className="mt-auto">
                      {/* Tags in Modal */}
                      <div className="flex flex-wrap gap-2 mb-4">
                        {selectedProject.tags.map((tag) => (
                          <span 
                            key={tag} 
                            className="px-2 py-1 text-xs font-medium text-cyan-700 dark:text-cyan-300 bg-cyan-100 dark:bg-cyan-900/30 rounded-md"
                          >
                            {tag}
                          </span>
                        ))}
                      </div>

                      {/* Link in Modal */}
                      {selectedProject.link && (
                        <a 
                          href={selectedProject.link} 
                          target="_blank" 
                          rel="noopener noreferrer" 
                          className="inline-flex items-center gap-2 text-primary hover:underline"
                        >
                          <ExternalLink size={16} />
                          View Project
                        </a>
                      )}
                    </div>
                  </div>
                </div>
              </div>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>
    </section>
  );
};

export default Projects;
