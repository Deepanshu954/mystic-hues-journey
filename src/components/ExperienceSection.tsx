
import React from 'react';
import { motion } from 'framer-motion';
import { MapPin, Utensils, Landmark, PartyPopper, Users, Book } from 'lucide-react';

interface ExperienceCardProps {
  icon: React.ElementType;
  title: string;
  description: string;
  delay: number;
}

const ExperienceCard: React.FC<ExperienceCardProps> = ({ icon: Icon, title, description, delay }) => {
  return (
    <motion.div 
      className="neo-card p-8 text-center h-full flex flex-col items-center"
      initial={{ opacity: 0, y: 20 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, margin: "-100px" }}
      transition={{ duration: 0.6, delay }}
      whileHover={{ y: -5 }}
    >
      <div className="mb-6 p-4 rounded-full bg-neo-violet/10 dark:bg-neo-violet/20">
        <Icon className="w-10 h-10 text-neo-violet" />
      </div>
      <h3 className="text-xl font-medium mb-3">{title}</h3>
      <p className="text-light-muted dark:text-dark-muted flex-grow">{description}</p>
    </motion.div>
  );
};

const ExperienceSection: React.FC = () => {
  const experiences = [
    {
      icon: MapPin,
      title: "Diverse Regions",
      description: "From the snow-capped Himalayas to tropical beaches, explore 28 states with unique geography and culture."
    },
    {
      icon: Utensils,
      title: "Culinary Journey",
      description: "Savor over 100 traditional dishes that change every few hundred kilometers across the country."
    },
    {
      icon: Landmark,
      title: "Ancient Heritage",
      description: "Discover 40 UNESCO World Heritage sites spanning thousands of years of rich history and civilization."
    },
    {
      icon: PartyPopper,
      title: "Vibrant Festivals",
      description: "Experience over 50 major celebrations that showcase India's colorful traditions and communal harmony."
    },
    {
      icon: Users,
      title: "Cultural Diversity",
      description: "Interact with people speaking 22 official languages and practicing various religions and customs."
    },
    {
      icon: Book,
      title: "Spiritual Wisdom",
      description: "Explore ancient philosophies and practices from yoga to meditation in their authentic birthplace."
    },
  ];

  return (
    <section className="py-16 md:py-24 relative overflow-hidden">
      {/* Decorative elements */}
      <div className="absolute top-0 right-0 w-1/3 h-1/3 bg-gradient-radial from-neo-violet/5 to-transparent opacity-60"></div>
      <div className="absolute bottom-0 left-0 w-1/3 h-1/3 bg-gradient-radial from-neo-blue/5 to-transparent opacity-60"></div>
      
      <div className="container mx-auto px-4 sm:px-6 lg:px-8">
        <motion.div 
          className="text-center mb-16"
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6 }}
        >
          <h2 className="text-4xl md:text-5xl font-bold mb-6 neo-gradient-text">
            Experience India
          </h2>
          <p className="text-xl text-light-muted dark:text-dark-muted max-w-3xl mx-auto">
            Immerse yourself in the wonders of a subcontinent where every journey becomes a story
          </p>
        </motion.div>
        
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-8">
          {experiences.map((experience, index) => (
            <ExperienceCard 
              key={index}
              icon={experience.icon}
              title={experience.title}
              description={experience.description}
              delay={index * 0.1}
            />
          ))}
        </div>
      </div>
    </section>
  );
};

export default ExperienceSection;
