
import { ArrowRight } from 'lucide-react';
import { Link } from 'react-router-dom';
import { motion } from 'framer-motion';

interface StateCardProps {
  name: string;
  image: string;
  description: string;
  tags?: string[];
  path: string;
}

const StateCard = ({ name, image, description, tags = [], path }: StateCardProps) => {
  return (
    <motion.div 
      className="neo-card group"
      initial={{ opacity: 0, y: 20 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, margin: "-100px" }}
      transition={{ duration: 0.5 }}
      whileHover={{ y: -8 }}
    >
      <div className="h-56 overflow-hidden relative">
        <img 
          src={image} 
          alt={name} 
          className="w-full h-full object-cover transform transition-transform duration-700 group-hover:scale-110"
          loading="lazy"
        />
        <div className="absolute inset-0 bg-gradient-to-t from-neo-black/90 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-500" />
        
        {/* Futuristic overlay effect */}
        <div className="absolute inset-0 bg-gradient-shine opacity-0 group-hover:opacity-100 bg-shimmer" />
      </div>
      
      <div className="p-6 relative">
        {/* Animated underline for heading */}
        <h3 className="text-2xl font-semibold mb-3 relative inline-block">
          {name}
          <span className="absolute bottom-0 left-0 w-0 h-0.5 bg-neo-violet group-hover:w-full transition-all duration-300 delay-100"></span>
        </h3>
        
        <p className="text-neo-gray-300 mb-4 line-clamp-2">{description}</p>
        
        <div className="flex flex-wrap gap-2 mb-4">
          {tags.map((tag, index) => (
            <motion.span 
              key={index}
              className="text-sm px-3 py-1 bg-neo-violet/10 text-neo-violet rounded-full transition-all duration-300 hover:bg-neo-violet/20"
              initial={{ opacity: 0, scale: 0.8 }}
              animate={{ opacity: 1, scale: 1 }}
              transition={{ delay: index * 0.1 }}
            >
              {tag}
            </motion.span>
          ))}
        </div>
        
        <Link 
          to={`/states/${path}`}
          className="text-neo-violet font-semibold flex items-center gap-2 group/link relative"
        >
          <span className="relative">
            Explore More
            <span className="absolute bottom-0 left-0 w-0 h-0.5 bg-neo-violet group-hover/link:w-full transition-all duration-300"></span>
          </span>
          <ArrowRight className="w-5 h-5 transform transition-transform duration-300 group-hover/link:translate-x-1" />
        </Link>
      </div>
    </motion.div>
  );
};

export default StateCard;
