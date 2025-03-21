
import { useEffect } from 'react';
import { motion } from 'framer-motion';
import { Link } from 'react-router-dom';
import PageTransition from '../components/PageTransition';
import HeroSection from '../components/HeroSection';
import ExperienceSection from '../components/ExperienceSection';
import WhyVisitSection from '../components/WhyVisitSection';
import DestinationPreview from '../components/DestinationPreview';
import Newsletter from '../components/Newsletter';
import Testimonials from '../components/Testimonials';
import UpcomingEvents from '../components/UpcomingEvents';
import { states } from '../data/states';
import { StateType } from '../types/StateType';

// Show only 3 featured states on the home page
const featuredStates = states.slice(0, 3).map(state => ({
  name: state.name,
  path: state.path,
  image: state.image,
  description: state.description,
  region: state.tags.find(tag => tag.includes('India')) || 'India',
  capital: state.capital,
  language: state.culture?.festivals || ['Hindi'],
  tags: state.tags,
  cuisine: state.cuisine.map(item => item.name),
  population: '1M+',
  attractions: state.places.map(place => place.name)
})) as StateType[];

function Home() {
  // Preload key images for better performance
  useEffect(() => {
    const preloadImages = () => {
      const imageUrls = [
        '/lovable-uploads/abstract-light.jpg',
        '/lovable-uploads/abstract-dark.jpg',
        ...featuredStates.map(state => state.image)
      ];
      
      imageUrls.forEach(url => {
        const img = new Image();
        img.src = url;
      });
    };
    
    preloadImages();
  }, []);

  return (
    <PageTransition>
      <div className="relative">
        {/* Hero Section */}
        <HeroSection />
        
        {/* Experience India Section */}
        <ExperienceSection />
        
        {/* Why Visit India */}
        <WhyVisitSection />
        
        {/* Featured Destinations */}
        <DestinationPreview states={featuredStates} />
        
        {/* Upcoming Events */}
        <UpcomingEvents />
        
        {/* Testimonials */}
        <Testimonials />
        
        {/* Newsletter */}
        <Newsletter />
        
        {/* Quick Links */}
        <section className="py-12 bg-gradient-to-b from-transparent to-mystic-50/50 dark:to-indigo-950/20">
          <div className="container mx-auto container-padding">
            <div className="flex flex-wrap justify-center gap-6">
              <motion.div
                initial={{ opacity: 0, y: 10 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.4 }}
              >
                <Link to="/culture" className="mystic-button">Explore Culture</Link>
              </motion.div>
              
              <motion.div
                initial={{ opacity: 0, y: 10 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.4, delay: 0.1 }}
              >
                <Link to="/food" className="mystic-button">Discover Cuisine</Link>
              </motion.div>
              
              <motion.div
                initial={{ opacity: 0, y: 10 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.4, delay: 0.2 }}
              >
                <Link to="/festivals" className="mystic-button">Experience Festivals</Link>
              </motion.div>
            </div>
          </div>
        </section>
      </div>
    </PageTransition>
  );
}

export default Home;
