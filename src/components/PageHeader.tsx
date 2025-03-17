
import { motion } from 'framer-motion';
import { ReactNode } from 'react';

interface PageHeaderProps {
  title: string;
  subtitle?: string;
  children?: ReactNode;
}

const PageHeader = ({ title, subtitle, children }: PageHeaderProps) => {
  const titleWords = title.split(' ');
  
  return (
    <div className="mb-16 relative">
      <div className="text-center mb-8 relative">
        <motion.h1 
          className="text-4xl md:text-6xl font-bold mb-4"
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5 }}
        >
          {titleWords.map((word, i) => (
            <motion.span 
              key={i} 
              className="inline-block mr-4 last:mr-0 text-gradient"
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: i * 0.1, duration: 0.5 }}
            >
              {word}
            </motion.span>
          ))}
        </motion.h1>
        
        {subtitle && (
          <motion.p 
            className="text-xl text-neo-gray-300 max-w-3xl mx-auto"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 0.3, duration: 0.5 }}
          >
            {subtitle}
          </motion.p>
        )}
      </div>
      
      {/* Subtle animated decorative elements */}
      <div className="absolute top-1/2 left-0 transform -translate-y-1/2 -translate-x-1/2 w-64 h-64 rounded-full bg-neo-violet/10 blur-3xl opacity-30 animate-pulse-slow" />
      <div className="absolute top-1/4 right-0 transform -translate-x-1/2 w-32 h-32 rounded-full bg-neo-blue/10 blur-2xl opacity-20 animate-float" />
      
      {children}
    </div>
  );
};

export default PageHeader;
