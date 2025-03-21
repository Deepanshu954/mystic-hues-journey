
import { Link } from 'react-router-dom';
import { Heart, Instagram, Twitter, Facebook, Mail } from 'lucide-react';

const Footer = () => {
  return (
    <footer className="bg-gray-900 text-white pt-12 pb-6">
      <div className="container mx-auto px-4">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8 mb-8">
          <div>
            <h3 className="text-xl font-semibold mb-4">Indian Explorer</h3>
            <p className="text-gray-400 mb-4">
              Discover the vibrant diversity of India, its rich culture, heritage, and stunning landscapes.
            </p>
            <div className="flex space-x-4">
              <a href="#" className="text-gray-400 hover:text-violet-400 transition-colors">
                <Instagram size={20} />
              </a>
              <a href="#" className="text-gray-400 hover:text-violet-400 transition-colors">
                <Twitter size={20} />
              </a>
              <a href="#" className="text-gray-400 hover:text-violet-400 transition-colors">
                <Facebook size={20} />
              </a>
              <a href="#" className="text-gray-400 hover:text-violet-400 transition-colors">
                <Mail size={20} />
              </a>
            </div>
          </div>
          
          <div>
            <h3 className="text-xl font-semibold mb-4">Quick Links</h3>
            <ul className="space-y-2">
              <li>
                <Link to="/" className="text-gray-400 hover:text-violet-400 transition-colors">Home</Link>
              </li>
              <li>
                <Link to="/states" className="text-gray-400 hover:text-violet-400 transition-colors">States</Link>
              </li>
              <li>
                <Link to="/culture" className="text-gray-400 hover:text-violet-400 transition-colors">Culture</Link>
              </li>
              <li>
                <Link to="/food" className="text-gray-400 hover:text-violet-400 transition-colors">Food</Link>
              </li>
              <li>
                <Link to="/festivals" className="text-gray-400 hover:text-violet-400 transition-colors">Festivals</Link>
              </li>
            </ul>
          </div>
          
          <div>
            <h3 className="text-xl font-semibold mb-4">Regions</h3>
            <ul className="space-y-2">
              <li>
                <Link to="/states" className="text-gray-400 hover:text-violet-400 transition-colors">North India</Link>
              </li>
              <li>
                <Link to="/states" className="text-gray-400 hover:text-violet-400 transition-colors">South India</Link>
              </li>
              <li>
                <Link to="/states" className="text-gray-400 hover:text-violet-400 transition-colors">East India</Link>
              </li>
              <li>
                <Link to="/states" className="text-gray-400 hover:text-violet-400 transition-colors">West India</Link>
              </li>
              <li>
                <Link to="/states" className="text-gray-400 hover:text-violet-400 transition-colors">Central India</Link>
              </li>
            </ul>
          </div>
          
          <div>
            <h3 className="text-xl font-semibold mb-4">Support</h3>
            <ul className="space-y-2">
              <li>
                <a href="#" className="text-gray-400 hover:text-violet-400 transition-colors">Help Center</a>
              </li>
              <li>
                <a href="#" className="text-gray-400 hover:text-violet-400 transition-colors">Contact Us</a>
              </li>
              <li>
                <a href="#" className="text-gray-400 hover:text-violet-400 transition-colors">Privacy Policy</a>
              </li>
              <li>
                <a href="#" className="text-gray-400 hover:text-violet-400 transition-colors">Terms of Service</a>
              </li>
            </ul>
          </div>
        </div>
        
        <div className="border-t border-gray-800 pt-6 text-center">
          <p className="text-gray-500 text-sm flex items-center justify-center">
            Made with <Heart size={16} className="mx-1 text-red-500" /> for learning purposes
          </p>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
