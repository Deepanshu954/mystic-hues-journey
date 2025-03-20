
import React, { useEffect, useRef } from 'react';
import { motion } from 'framer-motion';
import { ArrowDown } from 'lucide-react';

const HeroSection: React.FC = () => {
  const heroRef = useRef<HTMLDivElement>(null);
  
  useEffect(() => {
    // Parallax effect on scroll
    const handleScroll = () => {
      if (!heroRef.current) return;
      const scrollY = window.scrollY;
      const opacity = Math.max(1 - scrollY / 700, 0);
      const transform = `translateY(${scrollY * 0.4}px)`;
      
      heroRef.current.style.opacity = opacity.toString();
      heroRef.current.style.transform = transform;
    };
    
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  return (
    <div className="relative h-screen overflow-hidden">
      {/* Animated background elements */}
      <div className="absolute inset-0 z-0">
        <div className="absolute top-1/4 left-1/4 w-96 h-96 bg-mystic-500/20 dark:bg-indigo-600/20 rounded-full filter blur-3xl animate-pulse-slow"></div>
        <div className="absolute bottom-1/4 right-1/4 w-96 h-96 bg-indigo-500/20 dark:bg-mystic-500/20 rounded-full filter blur-3xl animate-pulse-slow" style={{ animationDelay: '2s' }}></div>
        <div className="absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 w-[800px] h-[800px] border border-mystic-200/20 dark:border-indigo-200/10 rounded-full animate-rotate opacity-30"></div>
        <div className="absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 w-[600px] h-[600px] border border-indigo-300/20 dark:border-mystic-300/10 rounded-full animate-rotate opacity-30" style={{ animationDirection: 'reverse', animationDuration: '40s' }}></div>
      </div>
      
      {/* Content layer */}
      <div ref={heroRef} className="relative h-full z-10 flex flex-col items-center justify-center text-center px-4">
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8 }}
          className="mb-6"
        >
          <img 
            src="/om.svg" 
            alt="Om Symbol" 
            className="w-24 h-24 mx-auto mb-6 opacity-80 dark:opacity-90" 
          />
        </motion.div>
        
        <motion.h1 
          className="text-5xl md:text-7xl font-serif font-bold mb-6 gradient-heading"
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, delay: 0.2 }}
        >
          Mystic India
        </motion.h1>
        
        <motion.p 
          className="text-xl md:text-2xl text-text-secondary dark:text-text-light/80 mb-12 max-w-3xl font-light tracking-wide"
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, delay: 0.4 }}
        >
          Embark on a journey through the land of timeless traditions, vibrant cultures, and spiritual discoveries
        </motion.p>
        
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, delay: 0.6 }}
          className="flex flex-col sm:flex-row gap-4"
        >
          <button className="mystic-button">
            Explore Destinations
          </button>
          <button className="outline-button">
            Cultural Experiences
          </button>
        </motion.div>
      </div>
      
      {/* Scroll indicator */}
      <motion.div 
        className="absolute bottom-10 left-1/2 transform -translate-x-1/2 text-text-secondary dark:text-text-light/70 flex flex-col items-center z-10"
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ delay: 1.2, duration: 1 }}
      >
        <p className="text-sm mb-2 font-light">Scroll to discover</p>
        <ArrowDown className="w-5 h-5 animate-bounce" />
      </motion.div>
    </div>
  );
};

export default HeroSection;
