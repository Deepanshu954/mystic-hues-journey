
import { motion } from 'framer-motion';
import { ReactNode } from 'react';

interface PageTransitionProps {
  children: ReactNode;
}

const PageTransition = ({ children }: PageTransitionProps) => {
  return (
    <motion.div
      initial={{ opacity: 0, y: 20, rotateX: 10 }}
      animate={{ opacity: 1, y: 0, rotateX: 0 }}
      exit={{ opacity: 0, y: -20, rotateX: -10 }}
      transition={{ 
        duration: 0.5, 
        ease: [0.25, 0.1, 0.25, 1.0],
        staggerChildren: 0.1
      }}
      style={{ perspective: '1000px' }}
      className="w-full"
    >
      {children}
    </motion.div>
  );
};

export default PageTransition;
