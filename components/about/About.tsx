import React from 'react';
import { motion } from 'framer-motion';
import { ChevronRight, CheckCircle2 } from 'lucide-react';
import { ABOUT_DETAILS } from '../../constants';

const About: React.FC = () => {
  // Helper to parse bold text using * syntax
  const parseBoldText = (text: string | React.ReactNode) => {
    if (typeof text !== 'string') return text;
    return text.split('*').map((part, index) => 
      index % 2 === 1 ? <span key={index} className="font-bold text-gray-900 dark:text-white">{part}</span> : part
    );
  };

  const scrollToProjects = (e: React.MouseEvent) => {
    e.preventDefault();
    const targetElement = document.getElementById('projects');
    if (targetElement) {
      const targetPosition = targetElement.getBoundingClientRect().top + window.pageYOffset;
      const startPosition = window.pageYOffset;
      const distance = targetPosition - startPosition;
      const duration = 1000;
      let startTime: number | null = null;

      const animation = (currentTime: number) => {
        if (startTime === null) startTime = currentTime;
        const timeElapsed = currentTime - startTime;
        const progress = Math.min(timeElapsed / duration, 1);
        const easeInOutCubic = (t: number): number => {
          return t < 0.5 ? 4 * t * t * t : 1 - Math.pow(-2 * t + 2, 3) / 2;
        };
        window.scrollTo(0, startPosition + distance * easeInOutCubic(progress));
        if (timeElapsed < duration) {
          requestAnimationFrame(animation);
        }
      };
      requestAnimationFrame(animation);
    }
  };

  return (
    <section id="about" className="py-20 relative overflow-hidden bg-gray-50 dark:bg-dark transition-colors duration-500">
      {/* Background Motif: Dot Grid (Matching Hero Section) */}
      <div className="absolute inset-0 bg-[radial-gradient(#00000033_1px,transparent_1px)] dark:bg-[radial-gradient(#ffffff33_1px,transparent_1px)] [background-size:20px_20px] opacity-[0.1] pointer-events-none"></div>

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">
          {/* Left Column: Text Content */}
          <motion.div
            initial={{ opacity: 0, x: -30 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6 }}
          >
            <h2 className="text-3xl md:text-4xl font-bold text-gray-900 dark:text-white mb-2">
              About Me
            </h2>
            <h3 className="text-xl text-primary font-medium mb-6">
              {ABOUT_DETAILS.subtitle}
            </h3>
            
            <p className="text-lg text-gray-600 dark:text-gray-300 leading-relaxed mb-8">
              {parseBoldText(ABOUT_DETAILS.introduction)}
            </p>

            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 mb-8">
              {ABOUT_DETAILS.highlights.map((highlight, index) => (
                <div key={index} className="flex items-start space-x-2">
                  <CheckCircle2 className="w-5 h-5 text-secondary flex-shrink-0 mt-1" />
                  <span className="text-gray-700 dark:text-gray-300">{parseBoldText(highlight)}</span>
                </div>
              ))}
            </div>

            <motion.a
              href="#projects"
              onClick={scrollToProjects}
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
              className="inline-flex items-center px-8 py-3 bg-primary hover:bg-blue-600 text-white font-medium rounded-full transition-all shadow-lg shadow-blue-500/25"
            >
              {ABOUT_DETAILS.buttonText} <ChevronRight className="ml-2 w-4 h-4" />
            </motion.a>
          </motion.div>

          {/* Right Column: Quick Stats */}
          <motion.div
            initial={{ opacity: 0, x: 30 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6, delay: 0.2 }}
            className="grid grid-cols-2 gap-6"
          >
            {ABOUT_DETAILS.quickStats.map((stat, index) => (
              <motion.div
                key={index}
                whileHover={{ y: -5 }}
                className="bg-gray-50 dark:bg-gray-800 p-6 rounded-2xl border border-gray-100 dark:border-gray-700 shadow-sm text-center"
              >
                <div className="text-4xl font-bold text-transparent bg-clip-text bg-gradient-to-r from-primary to-secondary mb-2">
                  {stat.value}
                </div>
                <div className="text-sm text-gray-500 dark:text-gray-400 font-medium uppercase tracking-wide">
                  {stat.label}
                </div>
              </motion.div>
            ))}
          </motion.div>
        </div>
      </div>
    </section>
  );
};

export default About;
