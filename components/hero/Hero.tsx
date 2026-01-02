import React, { useState, useEffect, useRef } from 'react';
import { Download, ChevronRight, MessageCircle } from 'lucide-react';
import { PERSONAL_INFO, RESUME_URL, SOCIAL_LINKS, ENABLE_FIDGET_SPINNER, PROFILE_BACKGROUND_STYLE } from '../../src/constants';
import { motion, useMotionValue, useAnimationFrame } from 'framer-motion';

const Hero: React.FC = () => {
  const [displayRole, setDisplayRole] = useState('');
  const [roleIndex, setRoleIndex] = useState(0);
  const [isDeleting, setIsDeleting] = useState(false);

  // Physics based rotation state
  const rotation = useMotionValue(0);
  const velocity = useRef(0.5); // Initial idle speed (clockwise)
  const isDragging = useRef(false);
  const lastTime = useRef(performance.now());

  // Physics Loop for Fidget Spinner Effect
  useAnimationFrame((time) => {
    const now = performance.now();
    const deltaTime = Math.min(now - lastTime.current, 32); // Cap delta to avoid jumps
    lastTime.current = now;

    if (!isDragging.current) {
      // Time-normalized friction (roughly 0.98 per 16ms frame)
      const friction = Math.pow(0.98, deltaTime / 16);
      const idleSpeed = 0.5; 
      
      if (Math.abs(velocity.current) > idleSpeed) {
        velocity.current *= friction;
      } else {
        // Recovery towards idle clockwise rotation
        const recoveryFactor = 0.002 * deltaTime; 
        velocity.current = velocity.current * (1 - recoveryFactor) + idleSpeed * recoveryFactor;
      }
      
      // Update rotation based on velocity and time
      rotation.set(rotation.get() + velocity.current * (deltaTime / 16));
    }
  });

  const handlePanStart = () => {
    if (!ENABLE_FIDGET_SPINNER) return;
    isDragging.current = true;
  };

  const handlePan = (event: any, info: any) => {
    if (!ENABLE_FIDGET_SPINNER) return;
    // Calculate velocity based on drag movement delta
    // We use info.delta.x and y to make it feel responsive in all drag directions
    const sensitivity = 0.4; 
    const dragForce = (info.delta.x - info.delta.y) * sensitivity;
    velocity.current = dragForce;
    
    // Immediate feedback
    rotation.set(rotation.get() + dragForce);
  };

  const handlePanEnd = () => {
    if (!ENABLE_FIDGET_SPINNER) return;
    isDragging.current = false;
  };

  const panHandlers = ENABLE_FIDGET_SPINNER ? {
    onPanStart: handlePanStart,
    onPan: handlePan,
    onPanEnd: handlePanEnd
  } : {};

  const scrollToSection = (href: string) => {
    const targetId = href.replace('#', '');
    const targetElement = document.getElementById(targetId);
    
    if (targetElement) {
      const targetPosition = targetElement.getBoundingClientRect().top + window.pageYOffset;
      const startPosition = window.pageYOffset;
      const distance = targetPosition - startPosition;
      const duration = 1000; // 1 second for smooth scroll
      let startTime: number | null = null;

      const animation = (currentTime: number) => {
        if (startTime === null) startTime = currentTime;
        const timeElapsed = currentTime - startTime;
        const progress = Math.min(timeElapsed / duration, 1);
        
        // Easing function for smooth animation (easeInOutCubic)
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

  // Find WhatsApp link
  const whatsappLink = SOCIAL_LINKS.find(link => link.name === 'WhatsApp')?.href || "#";

  useEffect(() => {
    const roles = PERSONAL_INFO.typingRoles;
    const currentRole = roles[roleIndex];
    
    let timeout: ReturnType<typeof setTimeout>;

    if (isDeleting) {
      if (displayRole.length > 0) {
        timeout = setTimeout(() => {
          setDisplayRole(currentRole.substring(0, displayRole.length - 1));
        }, 50);
      } else {
        setIsDeleting(false);
        setRoleIndex((prev) => (prev + 1) % roles.length);
      }
    } else {
      if (displayRole.length < currentRole.length) {
        timeout = setTimeout(() => {
          setDisplayRole(currentRole.substring(0, displayRole.length + 1));
        }, 100);
      } else {
        timeout = setTimeout(() => {
          setIsDeleting(true);
        }, 2000);
      }
    }

    return () => clearTimeout(timeout);
  }, [displayRole, isDeleting, roleIndex]);

  return (
    <section id="home" className="min-h-screen flex items-center pt-20 pb-20 relative overflow-hidden bg-gray-50 dark:bg-dark transition-colors duration-500">
      {/* Texture Pattern: Dot Grid */}
      <div className="absolute inset-0 bg-[radial-gradient(#00000033_1px,transparent_1px)] dark:bg-[radial-gradient(#ffffff33_1px,transparent_1px)] [background-size:20px_20px] opacity-[0.1] z-0"></div>

      {/* Background Glows */}
      <div className="absolute top-20 right-0 w-96 h-96 bg-primary/20 rounded-full blur-3xl -z-10 animate-pulse"></div>
      <div className="absolute bottom-20 left-0 w-72 h-72 bg-secondary/20 rounded-full blur-3xl -z-10"></div>

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 w-full grid grid-cols-1 lg:grid-cols-2 gap-12 items-center relative z-10">
        <div className="order-2 lg:order-1 space-y-8 text-center md:text-left">
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8 }}
          >
            <span className="text-secondary font-medium tracking-wider text-sm uppercase">Welcome to my portfolio</span>
            <h1 className="mt-4 text-4xl md:text-6xl lg:text-7xl font-bold text-gray-900 dark:text-white leading-tight">
              Hi, I'm <br />
              <span className="text-transparent bg-clip-text bg-gradient-to-r from-primary to-secondary dark:drop-shadow-[0_0_15px_rgba(68,127,152,0.5)]">
                {PERSONAL_INFO.firstName} <br className="hidden md:block" /> {PERSONAL_INFO.lastName}
              </span>
            </h1>
            <h2 className="mt-4 text-xl md:text-2xl text-gray-600 dark:text-gray-400 font-light flex items-center justify-center md:justify-start h-8">
              <span>{displayRole}</span>
              <span className="animate-pulse ml-1 text-primary">|</span>
            </h2>
            
            {/* Role Badges */}
            <div className="flex flex-wrap gap-2 mt-6 justify-center md:justify-start max-w-lg mx-auto md:mx-0">
              {PERSONAL_INFO.typingRoles.map((role, index) => (
                <span 
                  key={index} 
                  className="px-3 py-1 text-xs md:text-sm font-medium text-primary dark:text-primary-foreground bg-primary/10 dark:bg-primary/20 rounded-full border border-primary/20 dark:border-primary/30 shadow-sm"
                >
                  {role}
                </span>
              ))}
            </div>
          </motion.div>

          <motion.p 
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.3, duration: 0.8 }}
            className="text-gray-600 dark:text-gray-400 text-lg max-w-lg leading-relaxed mx-auto md:mx-0"
          >
            {PERSONAL_INFO.about}
          </motion.p>
          
          <motion.div 
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.5, duration: 0.8 }}
            className="flex flex-wrap gap-4 justify-center md:justify-start"
          >
            <motion.a 
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
              href={whatsappLink}
              target="_blank"
              rel="noopener noreferrer"
              className="px-8 py-3 bg-gradient-to-r from-secondary to-pink-600 hover:from-pink-500 hover:to-pink-600 text-white font-bold rounded-full flex items-center justify-center transition-all shadow-lg shadow-pink-500/25 border border-transparent"
            >
              Hire Me Now <MessageCircle className="ml-2 w-4 h-4 fill-current" />
            </motion.a>

            <motion.a 
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
              href={RESUME_URL}
              target="_blank"
              download
              className="px-8 py-3 border border-gray-300 dark:border-gray-600 hover:border-gray-900 dark:hover:border-white text-gray-700 dark:text-gray-300 hover:text-gray-900 dark:hover:text-white font-medium rounded-full flex items-center justify-center transition-all group"
            >
              <Download className="mr-2 w-4 h-4 group-hover:animate-bounce" />
              Download CV
            </motion.a>
          </motion.div>

          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 0.7, duration: 0.8 }}
            className="flex items-center gap-6 pt-8 justify-center md:justify-start"
          >
            {SOCIAL_LINKS.map((link) => (
              <motion.a
                key={link.name}
                href={link.href}
                target="_blank"
                rel="noopener noreferrer"
                whileHover={{ scale: 1.2, color: '#3b82f6' }}
                whileTap={{ scale: 0.9 }}
                className="text-gray-500 dark:text-gray-400 transition-colors"
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
          className="order-1 lg:order-2 flex justify-center lg:justify-end relative"
        >
           {/* Interactive Fidget Spinner Area */}
           <motion.div 
             className={`relative w-72 h-72 md:w-96 md:h-96 lg:w-[480px] lg:h-[480px] flex items-center justify-center ${ENABLE_FIDGET_SPINNER ? 'cursor-grab active:cursor-grabbing' : ''}`}
             {...panHandlers}
             style={{ touchAction: ENABLE_FIDGET_SPINNER ? 'none' : 'auto' }} // CRITICAL: Prevents scrolling interference on mobile/tablet
           >
              {/* Rotating Segmented Border */}
              <motion.div 
                className="absolute inset-0 z-0"
                style={{ rotate: rotation }}
              >
                 <svg className="w-full h-full overflow-visible dark:drop-shadow-[0_0_20px_rgba(68,127,152,0.8)] pointer-events-none" viewBox="0 0 100 100">
                    <defs>
                      <linearGradient id="borderGradient" x1="0%" y1="0%" x2="100%" y2="0%">
                        <stop offset="0%" stopColor="rgb(var(--color-primary))" />
                        <stop offset="100%" stopColor="rgb(var(--color-secondary))" />
                      </linearGradient>
                    </defs>
                    <circle 
                      cx="50" 
                      cy="50" 
                      r="48" 
                      fill="none" 
                      stroke="url(#borderGradient)" 
                      strokeWidth="2" 
                      strokeDasharray="24 16"
                      strokeLinecap="round"
                    />
                 </svg>
              </motion.div>
              
              {/* Inner Profile Image - Remains Static */}
              <div className="relative w-[85%] h-[85%] rounded-full border border-gray-200 dark:border-gray-800 overflow-hidden z-10 bg-gray-50 dark:bg-gray-900 pointer-events-none select-none">
                 
                 {/* Background Graphic for Transparent PNG */}
                 <div className="absolute inset-0 z-0">
                    {/* Render based on PROFILE_BACKGROUND_STYLE constant */}
                    {PROFILE_BACKGROUND_STYLE === 'MATH_GRID' && (
                      <>
                        {/* Base Gradient */}
                        <div className="absolute inset-0 bg-gradient-to-br from-gray-100 via-gray-50 to-pink-50 dark:from-dark dark:via-gray-900 dark:to-slate-900"></div>
                        {/* Math Pattern: Coordinate Dots */}
                        <div className="absolute inset-0 opacity-[0.15] dark:opacity-[0.2]" 
                             style={{ 
                               backgroundImage: 'radial-gradient(currentColor 1px, transparent 1px)', 
                               backgroundSize: '20px 20px',
                               color: 'rgb(var(--color-primary))' // Primary color dots
                             }}>
                        </div>
                        {/* Abstract Glow Orb */}
                        <div className="absolute -bottom-4 -right-4 w-32 h-32 bg-secondary/30 rounded-full blur-2xl"></div>
                        <div className="absolute top-0 left-0 w-24 h-24 bg-primary/20 rounded-full blur-xl"></div>
                      </>
                    )}

                    {PROFILE_BACKGROUND_STYLE === 'ABSTRACT_FLUID' && (
                      <>
                        <div className="absolute inset-0 bg-gradient-to-tr from-rose-100 via-purple-50 to-blue-100 dark:from-slate-900 dark:via-purple-900/40 dark:to-slate-900"></div>
                        {/* Enhanced Blobs - Increased opacity and size for visibility */}
                        <div className="absolute -top-4 -right-4 w-40 h-40 bg-purple-400/40 rounded-full blur-2xl mix-blend-multiply dark:mix-blend-screen animate-pulse"></div>
                        <div className="absolute -bottom-4 -left-4 w-40 h-40 bg-blue-400/40 rounded-full blur-2xl mix-blend-multiply dark:mix-blend-screen animate-pulse" style={{ animationDelay: '1s' }}></div>
                      </>
                    )}

                    {PROFILE_BACKGROUND_STYLE === 'TECH_CIRCUIT' && (
                      <>
                        <div className="absolute inset-0 bg-gray-50 dark:bg-dark"></div>
                        {/* Circuit Grid */}
                        <div className="absolute inset-0 opacity-20" 
                             style={{ 
                               backgroundImage: 'linear-gradient(var(--color-primary) 1px, transparent 1px), linear-gradient(90deg, var(--color-primary) 1px, transparent 1px)', 
                               backgroundSize: '20px 20px' 
                             }}>
                        </div>
                        {/* Tech Rings */}
                        <div className="absolute inset-0 flex items-center justify-center">
                           <div className="w-[90%] h-[90%] border border-primary/30 rounded-full"></div>
                           <div className="absolute w-[70%] h-[70%] border border-dashed border-secondary/40 rounded-full animate-[spin_10s_linear_infinite]"></div>
                           <div className="absolute w-[50%] h-[50%] border-2 border-t-transparent border-l-transparent border-r-primary/50 border-b-primary/50 rounded-full animate-[spin_3s_linear_infinite_reverse]"></div>
                        </div>
                        {/* Glow */}
                        <div className="absolute inset-0 bg-primary/5 rounded-full blur-xl"></div>
                      </>
                    )}

                    {PROFILE_BACKGROUND_STYLE === 'GRADIENT_MESH' && (
                      <>
                        <div className="absolute inset-0 bg-white dark:bg-slate-900"></div>
                        <div className="absolute inset-0 opacity-60 dark:opacity-40 bg-[radial-gradient(at_0%_0%,_hsla(253,16%,7%,1)_0,transparent_50%),_radial-gradient(at_50%_0%,_hsla(225,39%,30%,1)_0,transparent_50%),_radial-gradient(at_100%_0%,_hsla(339,49%,30%,1)_0,transparent_50%)]"></div>
                        <div className="absolute top-0 left-0 w-full h-full bg-gradient-to-b from-transparent via-purple-500/10 to-blue-500/10 mix-blend-overlay"></div>
                      </>
                    )}

                    {PROFILE_BACKGROUND_STYLE === 'GEOMETRIC_SHAPES' && (
                      <>
                        <div className="absolute inset-0 bg-gray-50 dark:bg-gray-900"></div>
                        
                        {/* Triangle - Moved to safer position and increased opacity */}
                        <div className="absolute top-[20%] right-[15%] w-0 h-0 border-l-[12px] border-l-transparent border-r-[12px] border-r-transparent border-b-[20px] border-b-yellow-500/60 transform rotate-12 animate-bounce" style={{ animationDuration: '3s' }}></div>
                        
                        {/* Circle - Moved to safer position */}
                        <div className="absolute bottom-[20%] left-[15%] w-6 h-6 rounded-full bg-red-500/50 animate-pulse"></div>
                        
                        {/* Square - Adjusted position */}
                        <div className="absolute top-[45%] left-[10%] w-5 h-5 bg-blue-500/50 transform rotate-45 animate-spin" style={{ animationDuration: '8s' }}></div>
                        
                        {/* Added Hexagon/Polygon for balance */}
                        <div className="absolute bottom-[30%] right-[10%] w-6 h-6 bg-green-500/50 clip-path-polygon animate-pulse" style={{ clipPath: 'polygon(50% 0%, 100% 25%, 100% 75%, 50% 100%, 0% 75%, 0% 25%)', animationDelay: '1s' }}></div>

                        {/* Grid Background */}
                        <div className="absolute inset-0 opacity-10" 
                             style={{ 
                               backgroundImage: 'radial-gradient(#000 1px, transparent 1px)', 
                               backgroundSize: '10px 10px' 
                             }}>
                        </div>
                      </>
                    )}
                 </div>

                 <img 
                   src={PERSONAL_INFO.profileImage}
                   alt={`${PERSONAL_INFO.firstName} ${PERSONAL_INFO.lastName}`}
                   className="relative z-10 w-full h-full rounded-full object-cover"
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