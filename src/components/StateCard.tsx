
import { ArrowRight } from 'lucide-react';
import { Link } from 'react-router-dom';
import { motion } from 'framer-motion';
import { useState } from 'react';

interface StateCardProps {
  name: string;
  image: string;
  description: string;
  tags?: string[];
  path: string;
}

const StateCard = ({ name, image, description, tags = [], path }: StateCardProps) => {
  const [hovered, setHovered] = useState(false);
  const [mousePosition, setMousePosition] = useState({ x: 0, y: 0 });
  
  const handleMouseMove = (e: React.MouseEvent<HTMLDivElement>) => {
    const { currentTarget, clientX, clientY } = e;
    const { left, top, width, height } = currentTarget.getBoundingClientRect();
    
    // Calculate mouse position relative to card (from -0.5 to 0.5)
    const x = (clientX - left) / width - 0.5;
    const y = (clientY - top) / height - 0.5;
    setMousePosition({ x, y });
  };

  return (
    <motion.div 
      className="neo-card relative group"
      initial={{ opacity: 0, y: 20 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, margin: "-100px" }}
      transition={{ duration: 0.5 }}
      whileHover={{ scale: 1.02 }}
      onMouseMove={handleMouseMove}
      onMouseEnter={() => setHovered(true)}
      onMouseLeave={() => setHovered(false)}
      style={{
        transformStyle: "preserve-3d",
        transform: hovered 
          ? `perspective(1000px) rotateX(${mousePosition.y * -5}deg) rotateY(${mousePosition.x * 5}deg)` 
          : "perspective(1000px) rotateX(0deg) rotateY(0deg)",
        transition: "transform 0.2s ease-out"
      }}
    >
      {/* Glow effect on hover */}
      <motion.div 
        className="absolute -inset-0.5 rounded-xl opacity-0 group-hover:opacity-100"
        style={{
          background: "linear-gradient(90deg, rgba(139, 92, 246, 0.5), rgba(14, 165, 233, 0.5))",
          filter: "blur(8px)",
          zIndex: -1,
        }}
        animate={{ opacity: hovered ? 0.6 : 0 }}
        transition={{ duration: 0.3 }}
      />

      {/* Card Content - Using 3D transforms */}
      <div className="h-56 overflow-hidden relative" style={{ transform: "translateZ(20px)" }}>
        <img 
          src={image} 
          alt={name} 
          className="w-full h-full object-cover transition-all duration-700"
          style={{
            transform: hovered ? `scale(1.1) translateX(${mousePosition.x * -10}px) translateY(${mousePosition.y * -10}px)` : "scale(1)",
            transition: "transform 0.3s ease-out"
          }}
          loading="lazy"
        />
        
        <div 
          className="absolute inset-0 bg-gradient-to-t from-neo-black/90 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-500"
          style={{ transform: "translateZ(30px)" }}
        />
        
        {/* Dynamic light reflection effect */}
        <div 
          className="absolute inset-0 bg-gradient-shine opacity-0 group-hover:opacity-100 bg-shimmer"
          style={{
            transform: `translateX(${mousePosition.x * 100}px) translateY(${mousePosition.y * 100}px)`,
            transition: "transform 0.1s ease-out"
          }}
        />
      </div>
      
      <div className="p-6 relative" style={{ transform: "translateZ(40px)" }}>
        {/* Animated underline for heading with 3D effect */}
        <h3 className="text-2xl font-semibold mb-3 relative inline-block">
          {name}
          <motion.span 
            className="absolute bottom-0 left-0 h-0.5 bg-neo-violet"
            initial={{ width: "0%" }}
            animate={{ width: hovered ? "100%" : "0%" }}
            transition={{ duration: 0.3 }}
          />
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
              whileHover={{ 
                y: -2, 
                boxShadow: "0 4px 12px rgba(139, 92, 246, 0.3)" 
              }}
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
            <motion.span 
              className="absolute bottom-0 left-0 h-0.5 bg-neo-violet"
              initial={{ width: "0%" }}
              animate={{ width: hovered ? "100%" : "0%" }}
              transition={{ duration: 0.3, delay: 0.1 }}
            />
          </span>
          <motion.div
            animate={{ x: hovered ? 5 : 0 }}
            transition={{ duration: 0.3 }}
          >
            <ArrowRight className="w-5 h-5" />
          </motion.div>
        </Link>
      </div>
    </motion.div>
  );
};

export default StateCard;
