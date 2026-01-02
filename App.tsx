import React, { Suspense, lazy, useEffect } from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import Navbar from './components/navbar/Navbar';
import { ThemeProvider } from './contexts/ThemeContext';
import NotFound from './components/NotFound';
import { METADATA } from './src/constants';
import { PERSONAL_INFO } from './src/constants';

// Lazy load components
const Hero = lazy(() => import('./components/hero/Hero'));
const About = lazy(() => import('./components/about/About'));
const Experience = lazy(() => import('./components/experience/Experience'));
const Projects = lazy(() => import('./components/projects/Projects'));
const Skills = lazy(() => import('./components/skills/Skills'));
const Certifications = lazy(() => import('./components/certifications/Certifications'));
const Gallery = lazy(() => import('./components/gallery/Gallery'));
const Contact = lazy(() => import('./components/contact/Contact'));

const LoadingFallback = () => (
  <div className="flex items-center justify-center min-h-[calc(100vh-80px)]">
    <div className="w-12 h-12 border-4 border-primary border-t-transparent rounded-full animate-spin"></div>
  </div>
);

function App() {
  useEffect(() => {
    // Update Title
    document.title = METADATA.title;
    
    // Helper to update meta tags
    const updateMeta = (name: string, content: string, attribute: 'name' | 'property' = 'name') => {
      let element = document.querySelector(`meta[${attribute}="${name}"]`);
      if (!element) {
        element = document.createElement('meta');
        element.setAttribute(attribute, name);
        document.head.appendChild(element);
      }
      element.setAttribute('content', content);
    };

    // Update Meta Tags
    updateMeta('description', METADATA.description);
    
    // Open Graph
    updateMeta('og:title', METADATA.title, 'property');
    updateMeta('og:description', METADATA.description, 'property');
    updateMeta('og:image', METADATA.image, 'property');
    updateMeta('og:url', METADATA.url, 'property');
    updateMeta('og:type', METADATA.type, 'property');
    
    // Twitter
    updateMeta('twitter:card', METADATA.twitterCard, 'property');
    updateMeta('twitter:title', METADATA.title, 'property');
    updateMeta('twitter:description', METADATA.description, 'property');
    updateMeta('twitter:image', METADATA.image, 'property');
    updateMeta('twitter:url', METADATA.url, 'property');

  }, []);

  return (
    <ThemeProvider>
      <Router>
        <div className="bg-gray-50 dark:bg-dark min-h-screen text-gray-900 dark:text-gray-200 font-sans selection:bg-primary selection:text-white transition-colors duration-500">
          <Routes>
            <Route path="/" element={
              <>
                <Navbar />
                <main>
                  <Suspense fallback={<LoadingFallback />}>
                    <Hero />
                    <About />
                    <Experience />
                    <Projects />
                    <Certifications />
                    <Gallery />
                    <Skills />
                    <Contact />
                    <footer className="bg-gray-100 dark:bg-dark py-8 text-center text-gray-500 dark:text-gray-400 text-sm transition-colors duration-500 border-t border-gray-200 dark:border-gray-800">
                      <p>© {new Date().getFullYear()} {PERSONAL_INFO.name}. All rights reserved.</p>
                    </footer>
                  </Suspense>
                </main>
              </>
            } />
            <Route path="*" element={<NotFound />} />
          </Routes>
        </div>
      </Router>
    </ThemeProvider>
  );
}

export default App;