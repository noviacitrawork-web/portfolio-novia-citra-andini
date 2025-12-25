import React, { useState, useEffect, useRef } from 'react';
import { Download, ChevronRight, MessageCircle } from 'lucide-react';
import { PERSONAL_INFO, RESUME_URL, SOCIAL_LINKS } from '../../constants';
import { motion, useMotionValue, useAnimationFrame } from 'framer-motion';

const Hero: React.FC = () => {
  const [displayRole, setDisplayRole] = useState('');
  const [roleIndex, setRoleIndex] = useState(0);
  const [isDeleting, setIsDeleting] = useState(false);

  // Physics based rotation state
  const rotation = useMotionValue(0);
  const velocity = useRef(0.5); // Initial idle speed (clockwise)
  const isDragging = useRef(false);

  // Physics Loop for Fidget Spinner Effect
  useAnimationFrame((time, delta) => {
    if (!isDragging.current) {
      const friction = 0.98;
      const idleSpeed = 0.5; // Always return to clockwise (positive)
      
      // If moving faster than idle speed (in either direction), apply friction
      if (Math.abs(velocity.current) > idleSpeed) {
        velocity.current *= friction;
      } else {
        // If slow (or spinning backwards slowly), gently accelerate towards positive idle speed
        // This ensures if it was spinning left, it slows to stop then starts spinning right
        const recoveryFactor = 0.02; 
        velocity.current = velocity.current * (1 - recoveryFactor) + idleSpeed * recoveryFactor;
      }
      
      // Update rotation
      rotation.set(rotation.get() + velocity.current);
    }
  });

  const handlePanStart = () => {
    isDragging.current = true;
  };

  const handlePan = (event: any, info: any) => {
    // Calculate velocity based on drag movement
    const sensitivity = 0.5; 
    velocity.current = info.delta.x * sensitivity;
    
    // Direct rotation tracking while dragging
    rotation.set(rotation.get() + velocity.current);
  };

  const handlePanEnd = () => {
    isDragging.current = false;
  };

  // Find WhatsApp link
  const whatsappLink = SOCIAL_LINKS.find(link => link.name === 'WhatsApp')?.href || "#";

  useEffect(() => {
    const roles = PERSONAL_INFO.typingRoles;
    const currentRole = roles[roleIndex];
    
    let timeout: ReturnType<typeof setTimeout>;

    if (isDeleting) {
      // Deleting
      if (displayRole.length > 0) {
        timeout = setTimeout(() => {
          setDisplayRole(currentRole.substring(0, displayRole.length - 1));
        }, 50);
      } else {
        // Finished deleting
        setIsDeleting(false);
        setRoleIndex((prev) => (prev + 1) % roles.length);
      }
    } else {
      // Typing
      if (displayRole.length < currentRole.length) {
        timeout = setTimeout(() => {
          setDisplayRole(currentRole.substring(0, displayRole.length + 1));
        }, 100);
      } else {
        // Finished typing, pause
        timeout = setTimeout(() => {
          setIsDeleting(true);
        }, 2000);
      }
    }

    return () => clearTimeout(timeout);
  }, [displayRole, isDeleting, roleIndex]);

  return (
    <section id="about" className="min-h-screen flex items-center pt-20 relative overflow-hidden bg-dark">
      {/* Texture Pattern: Dot Grid */}
      <div className="absolute inset-0 bg-[radial-gradient(#ffffff33_1px,transparent_1px)] [background-size:20px_20px] opacity-[0.1] z-0"></div>

      {/* Background Glows */}
      <div className="absolute top-20 right-0 w-96 h-96 bg-primary/20 rounded-full blur-3xl -z-10 animate-pulse"></div>
      <div className="absolute bottom-20 left-0 w-72 h-72 bg-secondary/20 rounded-full blur-3xl -z-10"></div>

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 w-full grid grid-cols-1 lg:grid-cols-2 gap-12 items-center relative z-10">
        <div className="order-2 lg:order-1 space-y-8">
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8 }}
          >
            <span className="text-secondary font-medium tracking-wider text-sm uppercase">Welcome to my portfolio</span>
            <h1 className="mt-4 text-4xl md:text-6xl lg:text-7xl font-bold text-white leading-tight">
              Hi, I'm <br />
              <span className="text-transparent bg-clip-text bg-gradient-to-r from-blue-400 to-cyan-400">
                {PERSONAL_INFO.firstName} <br className="hidden md:block" /> {PERSONAL_INFO.lastName}
              </span>
            </h1>
            <h2 className="mt-4 text-xl md:text-2xl text-gray-400 font-light flex items-center h-8">
              <span>{displayRole}</span>
              <span className="animate-pulse ml-1 text-primary">|</span>
            </h2>
          </motion.div>
          
          <motion.p 
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.3, duration: 0.8 }}
            className="text-gray-400 text-lg max-w-lg leading-relaxed"
          >
            {PERSONAL_INFO.about}
          </motion.p>

          <motion.div 
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.5, duration: 0.8 }}
            className="flex flex-wrap gap-4 lg:justify-center"
          >
            {/* Hire Me Button (Primary Action) */}
            <motion.a 
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
              href={whatsappLink}
              target="_blank"
              rel="noopener noreferrer"
              className="px-8 py-3 bg-gradient-to-r from-secondary to-cyan-600 hover:from-cyan-400 hover:to-cyan-500 text-white font-bold rounded-full flex items-center justify-center transition-all shadow-lg shadow-cyan-500/25 border border-transparent"
            >
              Hire Me Now <MessageCircle className="ml-2 w-4 h-4 fill-current" />
            </motion.a>

            {/* View Projects Button */}
            <motion.a 
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
              href="#projects" 
              className="px-8 py-3 bg-primary hover:bg-blue-600 text-white font-medium rounded-full flex items-center justify-center transition-all shadow-lg shadow-blue-500/25"
            >
              View Projects <ChevronRight className="ml-2 w-4 h-4" />
            </motion.a>

            {/* Download CV Button */}
            <motion.a 
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
              href={RESUME_URL}
              target="_blank"
              download
              className="px-8 py-3 border border-gray-600 hover:border-white text-gray-300 hover:text-white font-medium rounded-full flex items-center justify-center transition-all group"
            >
              <Download className="mr-2 w-4 h-4 group-hover:animate-bounce" />
              Download CV
            </motion.a>
          </motion.div>

          {/* Social Links Section in Hero */}
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 0.7, duration: 0.8 }}
            className="flex items-center gap-6 pt-2 lg:justify-center"
          >
            {SOCIAL_LINKS.map((link, index) => (
              <motion.a
                key={link.name}
                href={link.href}
                target="_blank"
                rel="noopener noreferrer"
                whileHover={{ scale: 1.2, color: '#3b82f6' }}
                whileTap={{ scale: 0.9 }}
                className="text-gray-400 transition-colors"
                title={link.name}
              >
                {link.icon}
              </motion.a>
            ))}
          </motion.div>
        </div>

        <motion.div 
          initial={{ opacity: 0, scale: 0.8 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ delay: 0.2, duration: 1 }}
          className="order-1 lg:order-2 flex justify-center lg:justify-end lg:-mt-16 relative"
        >
           {/* Interactive Fidget Spinner Area - Wrapper captures input but DOES NOT rotate itself */}
           <motion.div 
             className="relative w-72 h-72 md:w-96 md:h-96 lg:w-[500px] lg:h-[500px] flex items-center justify-center cursor-grab active:cursor-grabbing"
             onPanStart={handlePanStart}
             onPan={handlePan}
             onPanEnd={handlePanEnd}
           >
              
              {/* Rotating Segmented Border - Only this part rotates */}
              <motion.div 
                className="absolute inset-0 z-0"
                style={{ rotate: rotation }}
              >
                 <svg className="w-full h-full drop-shadow-[0_0_15px_rgba(6,182,212,0.3)] pointer-events-none" viewBox="0 0 100 100">
                    <defs>
                      <linearGradient id="borderGradient" x1="0%" y1="0%" x2="100%" y2="0%">
                        <stop offset="0%" stopColor="#3b82f6" /> {/* Primary Blue */}
                        <stop offset="100%" stopColor="#06b6d4" /> {/* Secondary Cyan */}
                      </linearGradient>
                    </defs>
                    <circle 
                      cx="50" 
                      cy="50" 
                      r="48" 
                      fill="none" 
                      stroke="url(#borderGradient)" 
                      strokeWidth="2" 
                      strokeDasharray="24 16" /* Creates the segmented look */
                      strokeLinecap="round"
                    />
                 </svg>
              </motion.div>
              
              {/* Inner Profile Image - Remains Static */}
              <div className="relative w-[85%] h-[85%] rounded-full border border-gray-800 overflow-hidden shadow-2xl z-10 bg-gray-900 pointer-events-none">
                 <img 
                   src={PERSONAL_INFO.profileImage}
                   alt={`${PERSONAL_INFO.firstName} ${PERSONAL_INFO.lastName}`}
                   className="w-full h-full rounded-full object-cover transition-all duration-500"
                   draggable="false"
                 />
              </div>
           </motion.div>
        </motion.div>
      </div>
    </section>
  );
};

export default Hero;