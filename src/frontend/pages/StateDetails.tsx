
import { useEffect, useState } from 'react';
import { useParams, Link } from 'react-router-dom';
import { motion } from 'framer-motion';
import { ArrowLeft, Map, PenTool, Utensils, Star, Camera, CalendarDays } from 'lucide-react';
import { states } from '../../database/states';
import PageTransition from '../components/PageTransition';

const StateDetails = () => {
  const { state: stateId } = useParams<{ state: string }>();
  const [isLoading, setIsLoading] = useState(true);
  
  // Find state by path
  const stateData = states.find(s => s.path === stateId);

  useEffect(() => {
    // Simulate loading
    const timer = setTimeout(() => {
      setIsLoading(false);
    }, 800);
    
    return () => clearTimeout(timer);
  }, []);

  if (!stateData) {
    return (
      <div className="min-h-screen flex flex-col items-center justify-center">
        <h1 className="text-3xl font-bold mb-4">State not found</h1>
        <p className="text-gray-500 mb-8">We couldn't find the state you're looking for.</p>
        <Link to="/states" className="bg-violet-600 text-white px-6 py-3 rounded-lg hover:bg-violet-700 transition-colors">
          Return to All States
        </Link>
      </div>
    );
  }

  if (isLoading) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <div className="w-12 h-12 border-4 border-violet-200 border-t-violet-600 rounded-full animate-spin"></div>
      </div>
    );
  }

  return (
    <PageTransition>
      <div className="min-h-screen pb-16 relative overflow-hidden">
        {/* Gradient background */}
        <div className="absolute inset-0 -z-10 bg-gradient-to-b from-gray-900 to-gray-800"></div>
        
        {/* Hero section */}
        <div className="relative h-[60vh] min-h-[400px] w-full overflow-hidden">
          <div className="absolute inset-0 bg-black/20 z-10"></div>
          <img 
            src={stateData.image} 
            alt={stateData.name} 
            className="absolute inset-0 w-full h-full object-cover"
          />
          
          <div className="absolute inset-0 bg-gradient-to-t from-gray-900 via-gray-900/80 to-transparent z-10"></div>
          
          <div className="absolute bottom-0 left-0 right-0 p-8 z-20">
            <Link 
              to="/states" 
              className="inline-flex items-center text-gray-300 hover:text-white mb-4 transition-colors"
            >
              <ArrowLeft className="mr-2 h-5 w-5" />
              Back to All States
            </Link>
            
            <h1 className="text-4xl md:text-6xl font-bold text-white mb-2">
              {stateData.name}
            </h1>
            
            <div className="flex flex-wrap gap-2 mt-4">
              {stateData.tags.map((tag, index) => (
                <span 
                  key={index} 
                  className="px-3 py-1 bg-violet-800/60 text-violet-100 text-sm rounded-full"
                >
                  {tag}
                </span>
              ))}
            </div>
          </div>
        </div>
        
        <div className="max-w-7xl mx-auto px-4 py-8">
          <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
            {/* Main content */}
            <div className="lg:col-span-2 space-y-8">
              <motion.div 
                className="bg-gray-800/80 backdrop-blur-md rounded-xl p-6 shadow-xl"
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.5 }}
              >
                <h2 className="text-2xl font-bold mb-4 text-white">About {stateData.name}</h2>
                <p className="text-gray-300 leading-relaxed">{stateData.description}</p>
                
                <div className="grid grid-cols-2 md:grid-cols-4 gap-4 mt-8">
                  <div className="flex flex-col items-center bg-gray-700/50 p-4 rounded-lg">
                    <Map className="h-6 w-6 text-violet-400 mb-2" />
                    <span className="text-sm text-gray-400">Capital</span>
                    <span className="text-white font-medium">{stateData.capital}</span>
                  </div>
                  
                  <div className="flex flex-col items-center bg-gray-700/50 p-4 rounded-lg">
                    <PenTool className="h-6 w-6 text-violet-400 mb-2" />
                    <span className="text-sm text-gray-400">Languages</span>
                    <span className="text-white font-medium">{stateData.tags.includes('Hindi') ? 'Hindi' : (stateData.tags.includes('Tamil') ? 'Tamil' : 'Multiple')}</span>
                  </div>
                  
                  <div className="flex flex-col items-center bg-gray-700/50 p-4 rounded-lg">
                    <Utensils className="h-6 w-6 text-violet-400 mb-2" />
                    <span className="text-sm text-gray-400">Cuisine</span>
                    <span className="text-white font-medium">Traditional</span>
                  </div>
                  
                  <div className="flex flex-col items-center bg-gray-700/50 p-4 rounded-lg">
                    <Star className="h-6 w-6 text-violet-400 mb-2" />
                    <span className="text-sm text-gray-400">Famous For</span>
                    <span className="text-white font-medium">{stateData.famous}</span>
                  </div>
                </div>
              </motion.div>
              
              {/* Tourist attractions */}
              <motion.div 
                className="bg-gray-800/80 backdrop-blur-md rounded-xl p-6 shadow-xl"
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.5, delay: 0.1 }}
              >
                <div className="flex items-center mb-6">
                  <Camera className="h-6 w-6 text-violet-400 mr-3" />
                  <h2 className="text-2xl font-bold text-white">Top Places to Visit</h2>
                </div>
                
                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                  {stateData.places?.slice(0, 4).map((place, index) => (
                    <motion.div 
                      key={index}
                      className="group rounded-xl overflow-hidden relative hover:shadow-lg transition-all duration-300"
                      whileHover={{ y: -5 }}
                    >
                      <div className="relative h-48">
                        <img 
                          src={place.image} 
                          alt={place.name} 
                          className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-500" 
                        />
                        <div className="absolute inset-0 bg-gradient-to-t from-black to-transparent opacity-70"></div>
                        <div className="absolute bottom-0 left-0 right-0 p-4">
                          <h3 className="text-lg font-semibold text-white">{place.name}</h3>
                          <div className="flex items-center mt-1">
                            <div className="flex">
                              {[...Array(5)].map((_, i) => (
                                <Star key={i} className={`h-4 w-4 ${i < 4 ? 'text-yellow-400' : 'text-gray-500'}`} fill={i < 4 ? 'currentColor' : 'none'} />
                              ))}
                            </div>
                            <span className="text-sm text-gray-300 ml-2">(120+ reviews)</span>
                          </div>
                        </div>
                      </div>
                    </motion.div>
                  ))}
                </div>
                
                {stateData.places && stateData.places.length > 4 && (
                  <div className="mt-6 text-center">
                    <button className="inline-flex items-center text-violet-400 hover:text-violet-300 transition-colors">
                      <span>View all {stateData.places.length} attractions</span>
                      <ArrowLeft className="ml-1 h-4 w-4 rotate-180" />
                    </button>
                  </div>
                )}
              </motion.div>
            </div>
            
            {/* Sidebar */}
            <div className="space-y-8">
              {/* Cultural highlights */}
              <motion.div 
                className="bg-gray-800/80 backdrop-blur-md rounded-xl p-6 shadow-xl"
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.5, delay: 0.2 }}
              >
                <div className="flex items-center mb-6">
                  <PenTool className="h-6 w-6 text-violet-400 mr-3" />
                  <h2 className="text-xl font-bold text-white">Cultural Highlights</h2>
                </div>
                
                <div className="space-y-4">
                  <div className="bg-gray-700/50 p-4 rounded-lg">
                    <h3 className="font-medium text-violet-300 mb-1">Art Forms</h3>
                    <p className="text-gray-300">{stateData.culture?.art || "Various traditional art forms"}</p>
                  </div>
                  
                  <div className="bg-gray-700/50 p-4 rounded-lg">
                    <h3 className="font-medium text-violet-300 mb-1">Traditional Dance</h3>
                    <p className="text-gray-300">{stateData.culture?.dance || "Traditional folk dances"}</p>
                  </div>
                  
                  <div className="bg-gray-700/50 p-4 rounded-lg">
                    <h3 className="font-medium text-violet-300 mb-1">Handicrafts</h3>
                    <div className="flex flex-wrap gap-2 mt-2">
                      {stateData.culture?.handicrafts?.map((craft, index) => (
                        <span key={index} className="px-2 py-1 bg-gray-600/50 text-gray-200 text-xs rounded-md">
                          {craft}
                        </span>
                      )) || <span className="text-gray-300">Traditional crafts</span>}
                    </div>
                  </div>
                </div>
              </motion.div>
              
              {/* Festivals */}
              <motion.div 
                className="bg-gray-800/80 backdrop-blur-md rounded-xl p-6 shadow-xl"
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.5, delay: 0.3 }}
              >
                <div className="flex items-center mb-6">
                  <CalendarDays className="h-6 w-6 text-violet-400 mr-3" />
                  <h2 className="text-xl font-bold text-white">Major Festivals</h2>
                </div>
                
                <div className="space-y-3">
                  {stateData.culture?.festivals?.map((festival, index) => (
                    <div 
                      key={index}
                      className="flex items-center p-3 bg-gray-700/50 rounded-lg hover:bg-gray-600/50 transition-colors"
                    >
                      <div className="h-10 w-10 flex items-center justify-center bg-violet-500/20 rounded-full mr-3">
                        <CalendarDays className="h-5 w-5 text-violet-400" />
                      </div>
                      <div>
                        <h3 className="font-medium text-white">{festival}</h3>
                        <p className="text-sm text-gray-400">Traditional celebration</p>
                      </div>
                    </div>
                  )) || (
                    <div className="flex items-center p-3 bg-gray-700/50 rounded-lg">
                      <div className="h-10 w-10 flex items-center justify-center bg-violet-500/20 rounded-full mr-3">
                        <CalendarDays className="h-5 w-5 text-violet-400" />
                      </div>
                      <div>
                        <h3 className="font-medium text-white">Local Festivals</h3>
                        <p className="text-sm text-gray-400">Traditional celebrations</p>
                      </div>
                    </div>
                  )}
                </div>
                
                <div className="mt-4">
                  <Link 
                    to="/festivals" 
                    className="text-sm text-violet-400 hover:text-violet-300 transition-colors flex items-center"
                  >
                    View all Indian festivals
                    <ArrowLeft className="ml-1 h-4 w-4 rotate-180" />
                  </Link>
                </div>
              </motion.div>
              
              {/* Local Cuisine */}
              <motion.div 
                className="bg-gray-800/80 backdrop-blur-md rounded-xl p-6 shadow-xl"
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.5, delay: 0.4 }}
              >
                <div className="flex items-center mb-6">
                  <Utensils className="h-6 w-6 text-violet-400 mr-3" />
                  <h2 className="text-xl font-bold text-white">Local Cuisine</h2>
                </div>
                
                <div className="space-y-4">
                  {stateData.cuisine?.slice(0, 3).map((item, index) => (
                    <div key={index} className="flex items-start">
                      <img 
                        src={item.image} 
                        alt={item.name} 
                        className="w-16 h-16 object-cover rounded-lg mr-4"
                      />
                      <div>
                        <h3 className="font-medium text-white">{item.name}</h3>
                        <p className="text-sm text-gray-400 line-clamp-2">{item.description}</p>
                      </div>
                    </div>
                  )) || (
                    <div className="text-center text-gray-400">
                      <p>Cuisine information coming soon</p>
                    </div>
                  )}
                </div>
                
                <div className="mt-4">
                  <Link 
                    to="/food" 
                    className="text-sm text-violet-400 hover:text-violet-300 transition-colors flex items-center"
                  >
                    Explore more Indian cuisines
                    <ArrowLeft className="ml-1 h-4 w-4 rotate-180" />
                  </Link>
                </div>
              </motion.div>
            </div>
          </div>
        </div>
      </div>
    </PageTransition>
  );
};

export default StateDetails;
