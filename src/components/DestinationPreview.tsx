
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
    <section className="section-padding bg-white/30 dark:bg-background-dark/50 backdrop-blur-sm">
      <div className="container mx-auto container-padding">
        <div className="flex flex-col md:flex-row md:items-end md:justify-between mb-12">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6 }}
          >
            <h2 className="text-4xl md:text-5xl font-serif font-bold mb-4 gradient-heading">
              Discover India's Treasures
            </h2>
            <p className="text-xl text-text-secondary dark:text-text-light/70 max-w-2xl">
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
              className="group flex items-center gap-2 mystic-button"
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
                <div className="mystic-card h-full flex flex-col">
                  <div className="relative h-64 overflow-hidden rounded-t-xl">
                    <img 
                      src={state.image} 
                      alt={state.name}
                      className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-110"
                    />
                    <div className="absolute inset-0 bg-gradient-to-t from-black/60 to-transparent"></div>
                    <div className="absolute bottom-4 left-4">
                      <div className="flex flex-wrap gap-2">
                        {state.tags.slice(0, 2).map((tag, i) => (
                          <span 
                            key={i} 
                            className="px-3 py-1 bg-mystic-500/90 dark:bg-indigo-600/90 text-white text-xs font-medium rounded-full"
                          >
                            {tag}
                          </span>
                        ))}
                      </div>
                    </div>
                  </div>
                  
                  <div className="p-6 flex-grow flex flex-col">
                    <h3 className="text-2xl font-serif font-semibold mb-3 text-text-primary dark:text-text-light">
                      {state.name}
                    </h3>
                    <p className="text-text-secondary dark:text-text-light/70 mb-4 flex-grow">
                      {state.description.substring(0, 120)}...
                    </p>
                    <div className="flex justify-end">
                      <span className="inline-flex items-center gap-1 text-mystic-600 dark:text-indigo-400 font-medium group">
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
