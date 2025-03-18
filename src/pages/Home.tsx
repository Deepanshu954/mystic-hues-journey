
import { useState } from 'react';
import { MapPin, Utensils, Landmark, PartyPopper, Play, ArrowRight } from 'lucide-react';
import { Link } from 'react-router-dom';
import StateCard from '../components/StateCard';
import FeaturedSection from '../components/FeaturedSection';
import VideoModal from '../components/VideoModal';
import PageTransition from '../components/PageTransition';
import NeoBackground from '../components/NeoBackground';
import { states } from '../data/states';

// Show only 3 featured states on the home page
const featuredStates = states.slice(0, 3);

function Home() {
  const [isVideoModalOpen, setIsVideoModalOpen] = useState(false);

  return (
    <PageTransition>
      <div>
        {/* Hero Section with Background Image */}
        <div className="relative h-screen">
          <div className="absolute inset-0 overflow-hidden">
            <div 
              className="absolute min-w-full min-h-full object-cover"
              style={{
                backgroundImage: 'url(/lovable-uploads/609cfc24-6e27-491e-a767-478433efa961.png)',
                backgroundSize: 'cover',
                backgroundPosition: 'center',
                animation: 'pulse 15s ease-in-out infinite'
              }}
            >
              {/* Dynamic overlay gradient */}
              <div className="absolute inset-0 bg-gradient-to-r from-violet-900/30 to-blue-900/30" />
            </div>
            <div className="absolute inset-0 bg-black/50" />
            
            {/* Particle effects overlay */}
            <NeoBackground />
          </div>
          <div className="absolute inset-0 flex items-center justify-center text-center">
            <div className="max-w-4xl px-4">
              <h1 className="text-5xl md:text-7xl font-bold mb-6 text-white">Mystic India</h1>
              <p className="text-xl md:text-2xl text-white mb-8 font-light tracking-wide">Land of Diversity, Culture, and Timeless Traditions</p>
              <button 
                onClick={() => setIsVideoModalOpen(true)}
                className="bg-violet-600 hover:bg-violet-700 text-white px-8 py-4 rounded-full font-semibold flex items-center mx-auto gap-3 transition-colors duration-300 shadow-neo-button hover:shadow-neo"
              >
                Watch Video <Play className="w-5 h-5" />
              </button>
            </div>
          </div>
        </div>

        {/* Experience India Section */}
        <div className="bg-gray-800 py-20">
          <div className="max-w-7xl mx-auto px-4">
            <h2 className="text-4xl md:text-5xl font-bold text-center mb-16 neo-gradient-text">Experience India</h2>
            <div className="grid grid-cols-1 md:grid-cols-4 gap-8">
              {[
                { icon: MapPin, title: 'States & Territories', count: '28 States & 8 UTs' },
                { icon: Utensils, title: 'Rich Cuisines', count: '100+ Traditional Dishes' },
                { icon: Landmark, title: 'Heritage Sites', count: '40 UNESCO Sites' },
                { icon: PartyPopper, title: 'Vibrant Festivals', count: '50+ Major Celebrations' },
              ].map((item, index) => (
                <div key={index} className="group cursor-pointer">
                  <div className="bg-gray-700/50 rounded-xl p-8 text-center transform transition-all duration-300 group-hover:-translate-y-2 group-hover:shadow-xl group-hover:shadow-violet-500/10">
                    <item.icon className="w-16 h-16 text-violet-400 mb-6 mx-auto" />
                    <h3 className="text-xl font-semibold mb-3">{item.title}</h3>
                    <p className="text-gray-300">{item.count}</p>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>

        {/* Featured Destinations */}
        <div className="bg-gray-900 py-20">
          <div className="max-w-7xl mx-auto px-4">
            <FeaturedSection 
              title="Discover India's Treasures" 
              subtitle="Explore the diverse landscapes and rich cultural heritage of featured Indian States"
            >
              <div className="flex justify-end mb-8">
                <Link
                  to="/states"
                  className="flex items-center gap-2 px-6 py-2 bg-violet-600 hover:bg-violet-700 rounded-lg text-white transition-colors shadow-neo-button hover:shadow-neo"
                >
                  View All States
                  <ArrowRight className="w-4 h-4" />
                </Link>
              </div>
              <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
                {featuredStates.map((state) => (
                  <StateCard
                    key={state.path}
                    name={state.name}
                    image={state.image}
                    description={state.description}
                    tags={state.tags}
                    path={state.path}
                  />
                ))}
              </div>
            </FeaturedSection>
          </div>
        </div>

        {/* Video Modal */}
        <VideoModal
          isOpen={isVideoModalOpen}
          onClose={() => setIsVideoModalOpen(false)}
          videoId="35npVaFGHMY"
        />
      </div>
    </PageTransition>
  );
}

export default Home;
