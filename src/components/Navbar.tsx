
import { useState, useEffect } from 'react';
import { Menu, Search, X, User } from 'lucide-react';
import { Link, useLocation, useNavigate } from 'react-router-dom';
import { states } from '../data/states';
import { motion } from 'framer-motion';

const navItems = [
  { path: '/', label: 'Home' },
  { path: '/states', label: 'States' },
  { path: '/culture', label: 'Culture' },
  { path: '/festivals', label: 'Festivals' },
  { path: '/food', label: 'Food' },
];

const Navbar = () => {
  const [isScrolled, setIsScrolled] = useState(false);
  const [isSearchOpen, setIsSearchOpen] = useState(false);
  const [searchQuery, setSearchQuery] = useState('');
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
  const location = useLocation();
  const navigate = useNavigate();

  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 0);
    };

    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  const handleStateSelect = (statePath: string) => {
    setIsSearchOpen(false);
    setSearchQuery('');
    navigate(`/states/${statePath}`);
  };

  const filteredStates = states.filter(state =>
    state.name.toLowerCase().includes(searchQuery.toLowerCase())
  );

  return (
    <>
      <nav className={`fixed w-full z-50 transition-all duration-300 ${
        isScrolled || location.pathname !== '/'
          ? 'bg-gray-900/95 backdrop-blur-sm border-b border-gray-800' 
          : 'bg-transparent'
      }`}>
        <div className="max-w-7xl mx-auto px-4">
          <div className="flex justify-between items-center h-20">
            <Link to="/" className="group">
              <h1 className="text-3xl font-bold tracking-wider text-white group-hover:text-violet-400 transition-colors">
                MYSTIC INDIA
              </h1>
            </Link>

            <div className="hidden md:flex items-center space-x-12">
              {navItems.map((item) => (
                <Link
                  key={item.path}
                  to={item.path}
                  className={`text-sm uppercase tracking-wider font-medium transition-all duration-300 relative
                    ${location.pathname === item.path
                      ? 'text-violet-400'
                      : 'text-gray-300 hover:text-violet-400'
                    }
                    after:content-[''] after:absolute after:bottom-0 after:left-0 after:w-full after:h-0.5 
                    after:bg-violet-400 after:scale-x-0 after:origin-right after:transition-transform 
                    hover:after:scale-x-100 hover:after:origin-left`}
                >
                  {item.label}
                </Link>
              ))}
            </div>

            <div className="flex items-center space-x-6">
              <button 
                onClick={() => setIsSearchOpen(true)}
                className="p-2 rounded-full transition-colors hover:bg-violet-500/10 text-gray-300 hover:text-violet-400"
              >
                <Search className="w-5 h-5" />
              </button>
              <Link 
                to="/login"
                className="flex items-center gap-2 px-4 py-2 rounded-full bg-violet-600/20 hover:bg-violet-600/30 text-white transition-all duration-300 border border-violet-500/30 hover:scale-105"
              >
                <User className="w-4 h-4" />
                <span className="text-sm font-medium">Login</span>
              </Link>
              <button 
                onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
                className="md:hidden p-2 rounded-full transition-colors hover:bg-violet-500/10 text-gray-300 hover:text-violet-400"
              >
                {isMobileMenuOpen ? <X className="w-5 h-5" /> : <Menu className="w-5 h-5" />}
              </button>
            </div>
          </div>
        </div>

        {/* Mobile Menu */}
        <motion.div
          initial={false}
          animate={isMobileMenuOpen ? { height: 'auto', opacity: 1 } : { height: 0, opacity: 0 }}
          className="md:hidden overflow-hidden bg-gray-800"
        >
          <div className="px-4 py-3 space-y-3">
            {navItems.map((item) => (
              <Link
                key={item.path}
                to={item.path}
                onClick={() => setIsMobileMenuOpen(false)}
                className={`block text-base font-medium ${
                  location.pathname === item.path
                    ? 'text-violet-400'
                    : 'text-gray-300 hover:text-white'
                }`}
              >
                {item.label}
              </Link>
            ))}
          </div>
        </motion.div>
      </nav>

      {/* Search Modal */}
      {isSearchOpen && (
        <div className="fixed inset-0 bg-black/90 backdrop-blur-sm z-50 animate-fade-in">
          <div className="max-w-3xl mx-auto pt-32 px-4">
            <div className="flex justify-between items-center mb-8">
              <h2 className="text-2xl font-bold text-white">Search States</h2>
              <button 
                onClick={() => setIsSearchOpen(false)}
                className="p-2 rounded-full hover:bg-gray-800 transition-colors"
              >
                <X className="w-6 h-6 text-gray-400" />
              </button>
            </div>
            <input
              type="text"
              placeholder="Search for a state..."
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              className="w-full bg-gray-800 text-white px-6 py-4 rounded-xl focus:outline-none focus:ring-2 focus:ring-violet-500 mb-6 transition-all duration-300"
              autoFocus
            />
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4 max-h-[60vh] overflow-y-auto">
              {filteredStates.map((state) => (
                <div
                  key={state.name}
                  onClick={() => handleStateSelect(state.path)}
                  className="flex items-center gap-4 p-4 rounded-xl bg-gray-800/50 cursor-pointer hover:bg-gray-700/50 transition-all duration-300 hover:scale-105"
                >
                  <img
                    src={state.thumbnail}
                    alt={state.name}
                    className="w-16 h-16 rounded-lg object-cover"
                  />
                  <div>
                    <h3 className="font-semibold text-white">{state.name}</h3>
                    <p className="text-sm text-gray-400">{state.famous}</p>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>
      )}
    </>
  );
};

export default Navbar;
