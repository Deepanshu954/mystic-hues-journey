
import React from 'react';
import { motion } from 'framer-motion';
import { ArrowRight } from 'lucide-react';
import { Link } from 'react-router-dom';
import { StateType } from '../types/StateType';

interface DestinationPreviewProps {
  states: StateType[];
}

const DestinationPreview: React.FC<DestinationPreviewProps> = ({ states }) => {
  return (
    <section className="py-16 md:py-24 bg-light-background/50 dark:bg-dark-background/50 backdrop-blur-sm">
      <div className="container mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex flex-col md:flex-row md:items-end md:justify-between mb-12">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6 }}
          >
            <h2 className="text-4xl md:text-5xl font-bold mb-4 neo-gradient-text">
              Discover India's Treasures
            </h2>
            <p className="text-xl text-light-muted dark:text-dark-muted max-w-2xl">
              Explore featured destinations that showcase India's diverse landscapes and rich cultural heritage
            </p>
          </motion.div>
          
          <motion.div
            initial={{ opacity: 0, x: 20 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6 }}
            className="mt-6 md:mt-0"
          >
            <Link
              to="/states"
              className="group flex items-center gap-2 neo-button bg-neo-violet text-white dark:bg-neo-violet dark:text-white border-neo-violet/20 hover:bg-neo-violet/90"
            >
              <span>View All Destinations</span>
              <ArrowRight className="w-4 h-4 transition-transform group-hover:translate-x-1" />
            </Link>
          </motion.div>
        </div>
        
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          {states.map((state, index) => (
            <motion.div
              key={state.path}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, margin: "-100px" }}
              transition={{ duration: 0.6, delay: index * 0.1 }}
              whileHover={{ y: -10 }}
              className="h-full"
            >
              <Link to={`/states/${state.path}`} className="block h-full">
                <div className="neo-card h-full flex flex-col">
                  <div className="relative h-64 overflow-hidden rounded-t-xl">
                    <img 
                      src={state.image} 
                      alt={state.name}
                      className="w-full h-full object-cover transition-transform duration-700 hover:scale-110"
                    />
                    <div className="absolute inset-0 bg-gradient-to-t from-black/60 to-transparent"></div>
                    <div className="absolute bottom-4 left-4">
                      <div className="flex flex-wrap gap-2">
                        {state.tags.slice(0, 2).map((tag, i) => (
                          <span 
                            key={i} 
                            className="px-3 py-1 bg-neo-violet/90 text-white text-xs font-medium rounded-full"
                          >
                            {tag}
                          </span>
                        ))}
                      </div>
                    </div>
                  </div>
                  
                  <div className="p-6 flex-grow flex flex-col">
                    <h3 className="text-2xl font-semibold mb-3 text-light-text dark:text-dark-text">
                      {state.name}
                    </h3>
                    <p className="text-light-muted dark:text-dark-muted mb-4 flex-grow">
                      {state.description.substring(0, 120)}...
                    </p>
                    <div className="flex justify-end">
                      <span className="inline-flex items-center gap-1 text-neo-violet font-medium group">
                        Explore
                        <ArrowRight className="w-4 h-4 transition-transform group-hover:translate-x-1" />
                      </span>
                    </div>
                  </div>
                </div>
              </Link>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default DestinationPreview;
