
import React from 'react';
import { motion } from 'framer-motion';
import { Link } from 'react-router-dom';
import { Facebook, Twitter, Instagram, Youtube, Mail, Heart } from 'lucide-react';

const Footer: React.FC = () => {
  const footerLinks = [
    {
      title: 'Explore',
      links: [
        { name: 'States', path: '/states' },
        { name: 'Culture', path: '/culture' },
        { name: 'Festivals', path: '/festivals' },
        { name: 'Food', path: '/food' },
      ],
    },
    {
      title: 'Info',
      links: [
        { name: 'About Us', path: '#' },
        { name: 'Contact', path: '#' },
        { name: 'Privacy Policy', path: '#' },
        { name: 'Terms of Service', path: '#' },
      ],
    },
    {
      title: 'Connect',
      links: [
        { name: 'Newsletter', path: '#' },
        { name: 'Feedback', path: '#' },
        { name: 'Community', path: '#' },
        { name: 'Travel Tips', path: '#' },
      ],
    },
  ];

  const socialLinks = [
    { icon: Facebook, href: '#' },
    { icon: Twitter, href: '#' },
    { icon: Instagram, href: '#' },
    { icon: Youtube, href: '#' },
  ];

  return (
    <footer className="bg-light-card/50 dark:bg-neo-dark/50 backdrop-blur-sm border-t border-gray-200 dark:border-gray-800 pt-16 pb-8">
      <div className="max-w-7xl mx-auto px-4">
        <div className="grid grid-cols-1 md:grid-cols-4 gap-8 mb-12">
          <div>
            <Link to="/" className="inline-block mb-6">
              <h2 className="text-2xl font-bold tracking-wider text-light-text dark:text-white">MYSTIC INDIA</h2>
            </Link>
            <p className="text-light-muted dark:text-gray-400 mb-6">
              Explore the diverse landscapes and rich cultural heritage of India's many treasures.
            </p>
            <div className="flex space-x-4">
              {socialLinks.map((social, index) => (
                <motion.a
                  key={index}
                  href={social.href}
                  className="p-2.5 bg-violet-100 dark:bg-violet-900/30 rounded-full text-violet-600 dark:text-violet-400 hover:bg-violet-200 dark:hover:bg-violet-800/30 transition-colors"
                  whileHover={{ scale: 1.1 }}
                  whileTap={{ scale: 0.95 }}
                >
                  <social.icon size={18} />
                </motion.a>
              ))}
            </div>
          </div>

          {footerLinks.map((section, idx) => (
            <div key={idx}>
              <h3 className="text-lg font-semibold mb-6 text-light-text dark:text-white">{section.title}</h3>
              <ul className="space-y-4">
                {section.links.map((link, index) => (
                  <li key={index}>
                    <Link 
                      to={link.path}
                      className="text-light-muted dark:text-gray-400 hover:text-violet-600 dark:hover:text-violet-400 transition-colors"
                    >
                      {link.name}
                    </Link>
                  </li>
                ))}
              </ul>
            </div>
          ))}
        </div>

        <div className="flex flex-col md:flex-row items-center justify-between pt-8 border-t border-gray-200 dark:border-gray-800">
          <p className="text-light-muted dark:text-gray-400 text-sm mb-4 md:mb-0">
            © {new Date().getFullYear()} Mystic India. All rights reserved.
          </p>
          <div className="flex items-center">
            <span className="text-sm text-light-muted dark:text-gray-400 flex items-center">
              Made with <Heart className="w-4 h-4 mx-1 text-red-500" /> in India
            </span>
          </div>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
