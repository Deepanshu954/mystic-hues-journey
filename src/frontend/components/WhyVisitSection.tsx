import React from 'react';
import { motion } from 'framer-motion';
import { 
  Globe, Landmark, Utensils, 
  Image, BookOpen, Heart 
} from 'lucide-react';

interface ReasonCardProps {
  icon: React.ElementType;
  title: string;
  description: string;
  index: number;
}

const ReasonCard: React.FC<ReasonCardProps> = ({ icon: Icon, title, description, index }) => {
  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, margin: "-100px" }}
      transition={{ duration: 0.5, delay: index * 0.1 }}
      whileHover={{ y: -5 }}
      className="glass-card p-6 h-full"
    >
      <div className="mb-4 p-3 bg-mystic-50/50 dark:bg-indigo-900/20 rounded-lg inline-flex">
        <Icon className="w-6 h-6 text-mystic-500 dark:text-indigo-400" />
      </div>
      <h3 className="text-xl font-serif font-semibold mb-3">{title}</h3>
      <p className="text-text-secondary dark:text-text-light/70">{description}</p>
    </motion.div>
  );
};

const WhyVisitSection: React.FC = () => {
  const reasons = [
    {
      icon: Globe,
      title: "Cultural Diversity",
      description: "Experience a tapestry of cultures, languages, religions, and traditions that vary dramatically across different regions."
    },
    {
      icon: Landmark,
      title: "Historical Wonders",
      description: "From ancient temples to magnificent forts and palaces, India's rich history spans thousands of years and numerous civilizations."
    },
    {
      icon: Utensils,
      title: "Culinary Journey",
      description: "Embark on a gastronomic adventure with diverse cuisines that change every few hundred kilometers, offering unique flavors and techniques."
    },
    {
      icon: Image,
      title: "Scenic Landscapes",
      description: "From the snow-capped Himalayas to lush backwaters, sun-kissed beaches to vast deserts - India's geographical diversity is unmatched."
    },
    {
      icon: BookOpen,
      title: "Spiritual Experiences",
      description: "The birthplace of major religions offers countless opportunities for spiritual discovery, meditation, and yoga practices."
    },
    {
      icon: Heart,
      title: "Warm Hospitality",
      description: "'Atithi Devo Bhava' (The guest is God) - experience the legendary warmth and hospitality of the Indian people."
    }
  ];

  return (
    <section className="section-padding relative overflow-hidden">
      {/* Background decoration */}
      <div className="absolute inset-0 bg-gradient-to-b from-transparent via-mystic-50/30 to-transparent dark:from-transparent dark:via-indigo-950/10 dark:to-transparent -z-10"></div>
      
      <div className="container mx-auto container-padding">
        <motion.div 
          className="text-center mb-16"
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.5 }}
        >
          <h2 className="text-4xl md:text-5xl font-serif font-bold mb-4 gradient-heading">
            Why Visit India
          </h2>
          <p className="text-xl text-text-secondary dark:text-text-light/70 max-w-3xl mx-auto">
            Discover the many reasons why India should be your next travel destination
          </p>
        </motion.div>
        
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {reasons.map((reason, index) => (
            <ReasonCard
              key={index}
              icon={reason.icon}
              title={reason.title}
              description={reason.description}
              index={index}
            />
          ))}
        </div>
      </div>
    </section>
  );
};

export default WhyVisitSection;
