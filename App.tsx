import React from 'react';
import Navbar from './components/navbar/Navbar';
import Hero from './components/hero/Hero';
import Experience from './components/experience/Experience';
import Projects from './components/projects/Projects';
import Publications from './components/publications/Publications';
import Skills from './components/skills/Skills';
import Certifications from './components/certifications/Certifications';
import Contact from './components/contact/Contact';

function App() {
  return (
    <div className="bg-dark min-h-screen text-gray-200 font-sans selection:bg-primary selection:text-white">
      <Navbar />
      <main>
        <Hero />
        <Experience />
        <Projects />
        <Publications />
        <Certifications />
        <Skills />
        <Contact />
      </main>
    </div>
  );
}

export default App;