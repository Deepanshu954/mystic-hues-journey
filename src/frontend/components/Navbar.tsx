
import { useState, useEffect } from 'react';
import { Link, useLocation } from 'react-router-dom';
import { Menu, X } from 'lucide-react';

const Navbar = () => {
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const [isScrolled, setIsScrolled] = useState(false);
  const { pathname } = useLocation();

  const navLinks = [
    { name: 'Home', path: '/' },
    { name: 'States', path: '/states' },
    { name: 'Culture', path: '/culture' },
    { name: 'Food', path: '/food' },
    { name: 'Festivals', path: '/festivals' },
  ];

  // Check scroll position to change navbar style
  useEffect(() => {
    const handleScroll = () => {
      if (window.scrollY > 20) {
        setIsScrolled(true);
      } else {
        setIsScrolled(false);
      }
    };

    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  // Close mobile menu when route changes
  useEffect(() => {
    setIsMenuOpen(false);
  }, [pathname]);

  return (
    <header
      className={`fixed top-0 left-0 right-0 z-50 transition-all duration-300 ${
        isScrolled 
          ? 'bg-gray-900/80 backdrop-blur-lg py-3 shadow-lg' 
          : 'bg-transparent py-5'
      }`}
    >
      <div className="container mx-auto px-4 flex justify-between items-center">
        {/* Logo */}
        <Link to="/" className="flex items-center gap-2">
          <img src="/om.svg" alt="Indian Explorer" className="h-9 w-auto" />
          <span className="text-xl font-bold text-white">IndianExplorer</span>
        </Link>

        {/* Desktop Navigation */}
        <nav className="hidden md:flex items-center space-x-6">
          {navLinks.map((link) => (
            <Link
              key={link.path}
              to={link.path}
              className={`text-white hover:text-violet-400 transition-colors duration-300 ${
                pathname === link.path ? 'text-violet-400 font-medium' : ''
              }`}
            >
              {link.name}
            </Link>
          ))}
          <Link
            to="/login"
            className="bg-violet-600 hover:bg-violet-700 px-4 py-2 rounded-full text-white transition-colors duration-300"
          >
            Login
          </Link>
        </nav>

        {/* Mobile Menu Button */}
        <button
          onClick={() => setIsMenuOpen(!isMenuOpen)}
          className="md:hidden text-white p-2"
          aria-label="Toggle menu"
        >
          {isMenuOpen ? <X size={24} /> : <Menu size={24} />}
        </button>

        {/* Mobile Navigation */}
        {isMenuOpen && (
          <div className="absolute top-full left-0 right-0 bg-gray-900/95 backdrop-blur-lg md:hidden py-4 shadow-xl overflow-hidden">
            <nav className="flex flex-col space-y-4 px-4">
              {navLinks.map((link) => (
                <Link
                  key={link.path}
                  to={link.path}
                  className={`text-white hover:text-violet-400 transition-colors duration-300 ${
                    pathname === link.path ? 'text-violet-400 font-medium' : ''
                  }`}
                >
                  {link.name}
                </Link>
              ))}
              <Link
                to="/login"
                className="bg-violet-600 hover:bg-violet-700 px-4 py-2 rounded-full text-white transition-colors duration-300 text-center"
              >
                Login
              </Link>
            </nav>
          </div>
        )}
      </div>
    </header>
  );
};

export default Navbar;
