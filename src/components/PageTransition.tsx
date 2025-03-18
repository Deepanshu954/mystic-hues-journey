
import { motion } from 'framer-motion';
import { ReactNode } from 'react';

interface PageTransitionProps {
  children: ReactNode;
}

const PageTransition = ({ children }: PageTransitionProps) => {
  return (
    <motion.div
      initial={{ opacity: 0, y: 20, rotateX: 10, filter: 'blur(10px)' }}
      animate={{ opacity: 1, y: 0, rotateX: 0, filter: 'blur(0px)' }}
      exit={{ opacity: 0, y: -20, rotateX: -10, filter: 'blur(10px)' }}
      transition={{ 
        duration: 0.8, 
        ease: [0.25, 0.1, 0.25, 1.0],
        staggerChildren: 0.1
      }}
      style={{ 
        perspective: '1000px',
        transformStyle: 'preserve-3d'
      }}
      className="w-full"
    >
      {children}
    </motion.div>
  );
};

export default PageTransition;
