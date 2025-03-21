
import { useState, useEffect } from 'react';
import { Menu, Search, X, User } from 'lucide-react';
import { Link, useLocation, useNavigate } from 'react-router-dom';
import { states } from '../data/states';
import { motion } from 'framer-motion';
import ThemeToggle from './ThemeToggle';

const navItems = [
  { path: '/states', label: 'View States' },
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

  // Close mobile menu on route change
  useEffect(() => {
    setIsMobileMenuOpen(false);
  }, [location.pathname]);

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
      <motion.nav 
        className={`fixed w-full z-50 transition-all duration-300 ${
          isScrolled || location.pathname !== '/'
            ? 'bg-light-background/95 dark:bg-dark-background/95 backdrop-blur-sm border-b border-light-border dark:border-dark-border' 
            : 'bg-transparent'
        }`}
        initial={{ y: -100, opacity: 0 }}
        animate={{ y: 0, opacity: 1 }}
        transition={{ duration: 0.6, ease: [0.22, 1, 0.36, 1] }}
      >
        <div className="max-w-7xl mx-auto px-4">
          <div className="flex justify-between items-center h-20">
            <Link to="/" className="group">
              <h1 className="text-3xl font-bold tracking-wider text-light-text dark:text-dark-text group-hover:text-neo-violet transition-colors duration-300">
                MYSTIC INDIA
              </h1>
            </Link>

            <div className="hidden md:flex items-center space-x-8">
              {navItems.map((item) => (
                <Link
                  key={item.path}
                  to={item.path}
                  className={`text-sm uppercase tracking-wider font-medium transition-all duration-300 relative
                    ${location.pathname === item.path
                      ? 'text-neo-violet'
                      : 'text-light-text dark:text-dark-text hover:text-neo-violet'
                    }
                    after:content-[''] after:absolute after:bottom-0 after:left-0 after:w-full after:h-0.5 
                    after:bg-neo-violet after:scale-x-0 after:origin-right after:transition-transform 
                    hover:after:scale-x-100 hover:after:origin-left`}
                >
                  {item.label}
                </Link>
              ))}
            </div>

            <div className="flex items-center space-x-6">
              <ThemeToggle />
              <button 
                onClick={() => setIsSearchOpen(true)}
                className="p-2 rounded-full transition-colors hover:bg-neo-violet/10 text-light-muted dark:text-dark-muted hover:text-neo-violet"
              >
                <Search className="w-5 h-5" />
              </button>
              <Link 
                to="/login"
                className="flex items-center gap-2 px-4 py-2 rounded-full bg-neo-violet/20 hover:bg-neo-violet/30 text-neo-violet dark:text-white transition-all duration-300 border border-neo-violet/30 hover:scale-105"
              >
                <User className="w-4 h-4" />
                <span className="text-sm font-medium">Login</span>
              </Link>
              <button 
                onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
                className="md:hidden p-2 rounded-full transition-colors hover:bg-neo-violet/10 text-light-muted dark:text-dark-muted hover:text-neo-violet"
              >
                {isMobileMenuOpen ? <X className="w-5 h-5" /> : <Menu className="w-5 h-5" />}
              </button>
            </div>
          </div>
        </div>

        <motion.div
          initial={false}
          animate={isMobileMenuOpen ? { height: 'auto', opacity: 1 } : { height: 0, opacity: 0 }}
          className="md:hidden overflow-hidden bg-light-background dark:bg-dark-surface"
        >
          <div className="px-4 py-3 space-y-3">
            {navItems.map((item) => (
              <Link
                key={item.path}
                to={item.path}
                onClick={() => setIsMobileMenuOpen(false)}
                className={`block text-base font-medium ${
                  location.pathname === item.path
                    ? 'text-neo-violet'
                    : 'text-light-text dark:text-dark-text hover:text-neo-violet'
                }`}
              >
                {item.label}
              </Link>
            ))}
          </div>
        </motion.div>
      </motion.nav>

      {isSearchOpen && (
        <div className="fixed inset-0 bg-light-background/90 dark:bg-dark-background/90 backdrop-blur-sm z-50 animate-fade-in">
          <div className="max-w-3xl mx-auto pt-32 px-4">
            <div className="flex justify-between items-center mb-8">
              <h2 className="text-2xl font-bold text-light-text dark:text-dark-text">Search States</h2>
              <button 
                onClick={() => setIsSearchOpen(false)}
                className="p-2 rounded-full hover:bg-neo-violet/10 dark:hover:bg-neo-violet/20 transition-colors"
              >
                <X className="w-6 h-6 text-light-muted dark:text-dark-muted" />
              </button>
            </div>
            <input
              type="text"
              placeholder="Search for a state..."
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              className="w-full neo-input text-light-text dark:text-dark-text text-lg px-6 py-4 mb-6"
              autoFocus
            />
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4 max-h-[60vh] overflow-y-auto">
              {filteredStates.map((state) => (
                <div
                  key={state.name}
                  onClick={() => handleStateSelect(state.path)}
                  className="flex items-center gap-4 p-4 rounded-xl bg-light-background/50 dark:bg-dark-surface/50 cursor-pointer hover:bg-light-background/80 dark:hover:bg-dark-surface/80 transition-all duration-300 hover:scale-105"
                >
                  <img
                    src={state.thumbnail}
                    alt={state.name}
                    className="w-16 h-16 rounded-lg object-cover"
                  />
                  <div>
                    <h3 className="font-semibold text-light-text dark:text-dark-text">{state.name}</h3>
                    <p className="text-sm text-light-muted dark:text-dark-muted">{state.famous}</p>
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
