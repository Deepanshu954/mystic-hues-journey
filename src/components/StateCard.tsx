
import { ArrowRight } from 'lucide-react';
import { Link } from 'react-router-dom';

interface StateCardProps {
  name: string;
  image: string;
  description: string;
  tags?: string[];
  path: string;
}

const StateCard = ({ name, image, description, tags = [], path }: StateCardProps) => {
  return (
    <div className="bg-gray-800 rounded-xl overflow-hidden shadow-lg hover:shadow-xl hover:shadow-violet-500/10 transition-all duration-500 transform hover:-translate-y-2 animate-fade-in">
      <div className="h-56 overflow-hidden relative group">
        <img 
          src={image} 
          alt={name} 
          className="w-full h-full object-cover transform transition-transform duration-700 group-hover:scale-110"
        />
        <div className="absolute inset-0 bg-gradient-to-t from-black/60 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-500" />
      </div>
      <div className="p-6">
        <h3 className="text-2xl font-semibold mb-3 group-hover:text-violet-400 transition-colors">{name}</h3>
        <p className="text-gray-300 mb-4 line-clamp-2">{description}</p>
        <div className="flex flex-wrap gap-2 mb-4">
          {tags.map((tag, index) => (
            <span 
              key={index}
              className="text-sm px-3 py-1 bg-violet-500/10 text-violet-400 rounded-full transition-all duration-300 hover:bg-violet-500/20"
            >
              {tag}
            </span>
          ))}
        </div>
        <Link 
          to={`/states/${path}`}
          className="text-violet-400 font-semibold flex items-center gap-2 hover:gap-3 transition-all duration-300 group"
        >
          Explore More 
          <ArrowRight className="w-5 h-5 transform transition-transform duration-300 group-hover:translate-x-1" />
        </Link>
      </div>
    </div>
  );
}

export default StateCard;
