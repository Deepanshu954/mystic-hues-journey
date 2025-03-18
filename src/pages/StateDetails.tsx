
import { useState, useEffect } from 'react';
import { useParams, Link } from 'react-router-dom';
import { motion } from 'framer-motion';
import { Utensils, Palette, LandPlot, Clock, Newspaper, ChevronDown, ChevronUp, MapPin, Home, ArrowRight } from 'lucide-react';
import { states } from '../data/states';

function StateDetails() {
  const { state: statePath } = useParams();
  const [data, setData] = useState<typeof states[0] | undefined>(undefined);
  const [showAllPlaces, setShowAllPlaces] = useState(false);
  const [showAllCuisine, setShowAllCuisine] = useState(false);
  const [showAllHistory, setShowAllHistory] = useState(false);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    // Simulate data loading
    setLoading(true);
    setTimeout(() => {
      const stateData = states.find(s => s.path === statePath);
      setData(stateData);
      setLoading(false);
      // Reset view states when state changes
      setShowAllPlaces(false);
      setShowAllCuisine(false);
      setShowAllHistory(false);
    }, 300);
  }, [statePath]);

  if (loading) {
    return (
      <div className="min-h-screen bg-light-bg dark:bg-gray-900 pt-24 flex items-center justify-center">
        <div className="animate-pulse flex flex-col items-center">
          <div className="h-8 w-60 bg-gray-300 dark:bg-gray-700 rounded mb-4"></div>
          <div className="h-4 w-96 bg-gray-200 dark:bg-gray-800 rounded"></div>
        </div>
      </div>
    );
  }

  if (!data) {
    return (
      <div className="min-h-screen bg-light-bg dark:bg-gray-900 pt-24 flex items-center justify-center">
        <div className="text-center">
          <h2 className="text-2xl text-light-text dark:text-white mb-4">State not found</h2>
          <Link 
            to="/states"
            className="px-6 py-3 bg-violet-600 text-white rounded-lg inline-flex items-center gap-2"
          >
            <Home className="w-5 h-5" /> Return to States
          </Link>
        </div>
      </div>
    );
  }

  // Find region from tags
  const region = data.tags.find(tag => tag.includes('India')) || '';

  // Safely handle optional properties
  const places = data.places || [];
  const cuisine = data.cuisine || [];
  const displayedPlaces = showAllPlaces ? places : places.slice(0, 3);
  const displayedCuisine = showAllCuisine ? cuisine : cuisine.slice(0, 3);

  // Find related states (other states in the same region)
  const relatedStates = states
    .filter(s => s.path !== data.path && s.tags.includes(region))
    .slice(0, 3);

  return (
    <div className="min-h-screen bg-light-bg dark:bg-gray-900 pt-24">
      {/* Breadcrumb Navigation */}
      <div className="bg-white/50 dark:bg-gray-800/50 backdrop-blur-sm py-3 sticky top-20 z-30">
        <div className="max-w-7xl mx-auto px-4">
          <div className="flex items-center text-sm text-light-muted dark:text-gray-400">
            <Link to="/" className="hover:text-violet-600 dark:hover:text-violet-400">Home</Link>
            <ArrowRight className="w-3 h-3 mx-2" />
            <Link to="/states" className="hover:text-violet-600 dark:hover:text-violet-400">States</Link>
            <ArrowRight className="w-3 h-3 mx-2" />
            <span className="text-light-text dark:text-white">{data.name}</span>
          </div>
        </div>
      </div>

      {/* Hero Section */}
      <div className="relative h-[60vh]">
        <img
          src={data.image}
          alt={data.name}
          className="w-full h-full object-cover"
        />
        <div className="absolute inset-0 bg-gradient-to-t from-black via-black/60 to-transparent" />
        <motion.div 
          className="absolute bottom-0 left-0 right-0 p-8 max-w-7xl mx-auto"
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5 }}
        >
          {region && (
            <div className="inline-flex items-center gap-1 bg-violet-600/80 text-white px-3 py-1 rounded-full text-sm mb-4">
              <MapPin className="w-4 h-4" /> {region}
            </div>
          )}
          <h1 className="text-5xl md:text-7xl font-bold mb-4 text-white">{data.name}</h1>
          <div className="flex flex-wrap items-center gap-4 mb-4">
            <p className="text-xl text-gray-300 max-w-3xl">{data.description}</p>
            <div className="flex items-center gap-2 bg-white/10 backdrop-blur-sm px-4 py-2 rounded-lg">
              <span className="text-white font-semibold">Capital:</span>
              <span className="text-gray-200">{data.capital}</span>
            </div>
          </div>
          <div className="flex flex-wrap gap-2 mt-2">
            {data.tags?.filter(tag => !tag.includes('India')).map((tag, index) => (
              <span key={index} className="text-sm px-3 py-1 bg-gray-200/20 text-gray-100 rounded-full backdrop-blur-sm">
                {tag}
              </span>
            ))}
          </div>
        </motion.div>
      </div>

      {/* Quick Facts */}
      <div className="bg-white dark:bg-gray-800 py-8 shadow-md">
        <div className="max-w-7xl mx-auto px-4">
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            <div className="flex items-center gap-4">
              <div className="bg-violet-100 dark:bg-violet-900/30 p-3 rounded-lg">
                <Palette className="w-6 h-6 text-violet-600 dark:text-violet-400" />
              </div>
              <div>
                <h3 className="text-sm text-light-muted dark:text-gray-400">Famous For</h3>
                <p className="text-light-text dark:text-white font-medium">{data.famous}</p>
              </div>
            </div>
            <div className="flex items-center gap-4">
              <div className="bg-violet-100 dark:bg-violet-900/30 p-3 rounded-lg">
                <MapPin className="w-6 h-6 text-violet-600 dark:text-violet-400" />
              </div>
              <div>
                <h3 className="text-sm text-light-muted dark:text-gray-400">Region</h3>
                <p className="text-light-text dark:text-white font-medium">{region}</p>
              </div>
            </div>
            <div className="flex items-center gap-4">
              <div className="bg-violet-100 dark:bg-violet-900/30 p-3 rounded-lg">
                <LandPlot className="w-6 h-6 text-violet-600 dark:text-violet-400" />
              </div>
              <div>
                <h3 className="text-sm text-light-muted dark:text-gray-400">Places to Visit</h3>
                <p className="text-light-text dark:text-white font-medium">{places.length} Destinations</p>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Cultural Highlights */}
      {data.culture && (
        <div className="max-w-7xl mx-auto px-4 py-16">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.5 }}
          >
            <h2 className="text-4xl font-bold mb-12 flex items-center gap-4 text-light-text dark:text-white">
              <Palette className="w-10 h-10 text-violet-600 dark:text-violet-400" />
              Cultural Heritage
            </h2>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
              <div className="bg-white dark:bg-gray-800 rounded-xl p-8 shadow-light-card dark:shadow-none">
                <h3 className="text-2xl font-semibold mb-4 text-light-text dark:text-white">Art Forms</h3>
                <p className="text-light-muted dark:text-gray-300">{data.culture.art}</p>
              </div>
              <div className="bg-white dark:bg-gray-800 rounded-xl p-8 shadow-light-card dark:shadow-none">
                <h3 className="text-2xl font-semibold mb-4 text-light-text dark:text-white">Dance</h3>
                <p className="text-light-muted dark:text-gray-300">{data.culture.dance}</p>
              </div>
              <div className="bg-white dark:bg-gray-800 rounded-xl p-8 shadow-light-card dark:shadow-none">
                <h3 className="text-2xl font-semibold mb-4 text-light-text dark:text-white">Festivals</h3>
                <ul className="list-disc list-inside text-light-muted dark:text-gray-300">
                  {data.culture.festivals.map((festival) => (
                    <li key={festival}>{festival}</li>
                  ))}
                </ul>
              </div>
              <div className="bg-white dark:bg-gray-800 rounded-xl p-8 shadow-light-card dark:shadow-none">
                <h3 className="text-2xl font-semibold mb-4 text-light-text dark:text-white">Handicrafts</h3>
                <ul className="list-disc list-inside text-light-muted dark:text-gray-300">
                  {data.culture.handicrafts.map((craft) => (
                    <li key={craft}>{craft}</li>
                  ))}
                </ul>
              </div>
            </div>
          </motion.div>
        </div>
      )}

      {/* Places to Visit */}
      {places.length > 0 && (
        <div className="bg-gray-50 dark:bg-gray-800/50 py-16">
          <div className="max-w-7xl mx-auto px-4">
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.5 }}
            >
              <h2 className="text-4xl font-bold mb-12 flex items-center gap-4 text-light-text dark:text-white">
                <LandPlot className="w-10 h-10 text-violet-600 dark:text-violet-400" />
                Places to Visit
              </h2>
              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
                {displayedPlaces.map((place, index) => (
                  <motion.div 
                    key={place.name} 
                    className="bg-white dark:bg-gray-800 rounded-xl overflow-hidden group shadow-light-card dark:shadow-none"
                    initial={{ opacity: 0, y: 20 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    viewport={{ once: true }}
                    transition={{ duration: 0.5, delay: index * 0.1 }}
                  >
                    <div className="h-64 overflow-hidden">
                      <img
                        src={place.image}
                        alt={place.name}
                        className="w-full h-full object-cover transform transition-transform duration-500 group-hover:scale-110"
                        loading="lazy"
                      />
                    </div>
                    <div className="p-6">
                      <h3 className="text-2xl font-semibold mb-3 text-light-text dark:text-white">{place.name}</h3>
                      <p className="text-light-muted dark:text-gray-300">{place.description}</p>
                    </div>
                  </motion.div>
                ))}
              </div>
              {places.length > 3 && (
                <button
                  onClick={() => setShowAllPlaces(!showAllPlaces)}
                  className="mt-8 flex items-center gap-2 mx-auto px-6 py-3 bg-violet-100 dark:bg-violet-900/30 hover:bg-violet-200 dark:hover:bg-violet-800/30 rounded-lg text-violet-700 dark:text-violet-400 border border-violet-200 dark:border-violet-800/30 transition-colors"
                >
                  {showAllPlaces ? (
                    <>Show Less <ChevronUp className="w-5 h-5" /></>
                  ) : (
                    <>View More Places <ChevronDown className="w-5 h-5" /></>
                  )}
                </button>
              )}
            </motion.div>
          </div>
        </div>
      )}

      {/* Cuisine */}
      {cuisine.length > 0 && (
        <div className="max-w-7xl mx-auto px-4 py-16">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.5 }}
          >
            <h2 className="text-4xl font-bold mb-12 flex items-center gap-4 text-light-text dark:text-white">
              <Utensils className="w-10 h-10 text-violet-600 dark:text-violet-400" />
              Traditional Cuisine
            </h2>
            <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
              {displayedCuisine.map((dish, index) => (
                <motion.div 
                  key={dish.name} 
                  className="bg-white dark:bg-gray-800 rounded-xl overflow-hidden shadow-light-card dark:shadow-none"
                  initial={{ opacity: 0, y: 20 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true }}
                  transition={{ duration: 0.5, delay: index * 0.1 }}
                >
                  <div className="h-48 overflow-hidden">
                    <img
                      src={dish.image}
                      alt={dish.name}
                      className="w-full h-full object-cover"
                      loading="lazy"
                    />
                  </div>
                  <div className="p-6">
                    <h3 className="text-xl font-semibold mb-2 text-light-text dark:text-white">{dish.name}</h3>
                    <p className="text-light-muted dark:text-gray-300">{dish.description}</p>
                  </div>
                </motion.div>
              ))}
            </div>
            {cuisine.length > 3 && (
              <button
                onClick={() => setShowAllCuisine(!showAllCuisine)}
                className="mt-8 flex items-center gap-2 mx-auto px-6 py-3 bg-violet-100 dark:bg-violet-900/30 hover:bg-violet-200 dark:hover:bg-violet-800/30 rounded-lg text-violet-700 dark:text-violet-400 border border-violet-200 dark:border-violet-800/30 transition-colors"
              >
                {showAllCuisine ? (
                  <>Show Less <ChevronUp className="w-5 h-5" /></>
                ) : (
                  <>View More Dishes <ChevronDown className="w-5 h-5" /></>
                )}
              </button>
            )}
          </motion.div>
        </div>
      )}

      {/* History */}
      {data.history && (
        <div className="bg-gray-50 dark:bg-gray-800/50 py-16">
          <div className="max-w-7xl mx-auto px-4">
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.5 }}
            >
              <h2 className="text-4xl font-bold mb-12 flex items-center gap-4 text-light-text dark:text-white">
                <Clock className="w-10 h-10 text-violet-600 dark:text-violet-400" />
                History
              </h2>
              <div className="space-y-8">
                <div className="bg-white dark:bg-gray-800 rounded-xl p-8 shadow-light-card dark:shadow-none">
                  <h3 className="text-2xl font-semibold mb-4 text-violet-700 dark:text-violet-400">Ancient Period</h3>
                  <p className="text-light-muted dark:text-gray-300 leading-relaxed mb-6">{data.history.ancient}</p>
                  {!showAllHistory && (
                    <button
                      onClick={() => setShowAllHistory(true)}
                      className="text-violet-700 dark:text-violet-400 hover:text-violet-800 dark:hover:text-violet-300 flex items-center gap-2"
                    >
                      View Detailed Timeline <ChevronDown className="w-5 h-5" />
                    </button>
                  )}
                </div>
                
                {showAllHistory && (
                  <>
                    <div className="space-y-6">
                      {data.history.details.map((detail, index) => (
                        <motion.div 
                          key={index} 
                          className="bg-white dark:bg-gray-800 rounded-xl p-6 shadow-light-card dark:border dark:border-gray-700 dark:shadow-none"
                          initial={{ opacity: 0, y: 20 }}
                          whileInView={{ opacity: 1, y: 0 }}
                          viewport={{ once: true }}
                          transition={{ duration: 0.5, delay: index * 0.1 }}
                        >
                          <div className="flex items-start gap-4">
                            <div className="bg-violet-100 dark:bg-violet-900/30 text-violet-700 dark:text-violet-400 px-3 py-1 rounded-full text-sm">
                              {detail.year}
                            </div>
                            <div>
                              <h4 className="text-lg font-semibold mb-2 text-light-text dark:text-white">{detail.period} Period</h4>
                              <p className="text-light-muted dark:text-gray-300">{detail.description}</p>
                            </div>
                          </div>
                        </motion.div>
                      ))}
                    </div>
                    <button
                      onClick={() => setShowAllHistory(false)}
                      className="text-violet-700 dark:text-violet-400 hover:text-violet-800 dark:hover:text-violet-300 flex items-center gap-2"
                    >
                      Show Less <ChevronUp className="w-5 h-5" />
                    </button>
                  </>
                )}
              </div>
            </motion.div>
          </div>
        </div>
      )}

      {/* Latest News */}
      {data.news && (
        <div className="max-w-7xl mx-auto px-4 py-16">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.5 }}
          >
            <h2 className="text-4xl font-bold mb-12 flex items-center gap-4 text-light-text dark:text-white">
              <Newspaper className="w-10 h-10 text-violet-600 dark:text-violet-400" />
              Latest News
            </h2>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
              {data.news.map((item, index) => (
                <motion.div 
                  key={item.title} 
                  className="bg-white dark:bg-gray-800 rounded-xl p-6 shadow-light-card dark:shadow-none"
                  initial={{ opacity: 0, y: 20 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true }}
                  transition={{ duration: 0.5, delay: index * 0.1 }}
                  whileHover={{ y: -5 }}
                >
                  <h3 className="text-xl font-semibold mb-2 text-light-text dark:text-white">{item.title}</h3>
                  <p className="text-sm text-violet-600 dark:text-violet-400 mb-4">{item.date}</p>
                  <p className="text-light-muted dark:text-gray-300">{item.summary}</p>
                </motion.div>
              ))}
            </div>
          </motion.div>
        </div>
      )}

      {/* Explore More States */}
      {relatedStates.length > 0 && (
        <div className="bg-gray-50 dark:bg-gray-800/50 py-16">
          <div className="max-w-7xl mx-auto px-4">
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.5 }}
            >
              <h2 className="text-4xl font-bold mb-4 text-light-text dark:text-white">Explore More {region}</h2>
              <p className="text-light-muted dark:text-gray-300 mb-12">Discover other fascinating states in this region</p>
              
              <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
                {relatedStates.map((state, index) => (
                  <motion.div
                    key={state.path}
                    className="group"
                    initial={{ opacity: 0, y: 20 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    viewport={{ once: true }}
                    transition={{ duration: 0.5, delay: index * 0.1 }}
                  >
                    <Link to={`/states/${state.path}`}>
                      <div className="relative h-60 rounded-xl overflow-hidden shadow-light-card dark:shadow-none">
                        <img
                          src={state.image}
                          alt={state.name}
                          className="w-full h-full object-cover transform transition-transform duration-500 group-hover:scale-110"
                        />
                        <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-black/50 to-transparent" />
                        <div className="absolute bottom-0 left-0 right-0 p-6">
                          <h3 className="text-2xl font-bold mb-2 text-white">{state.name}</h3>
                          <p className="text-gray-300 line-clamp-2">{state.description}</p>
                        </div>
                        <div className="absolute inset-0 bg-violet-600/20 opacity-0 group-hover:opacity-100 transition-opacity duration-300" />
                      </div>
                    </Link>
                  </motion.div>
                ))}
              </div>
              
              <div className="text-center mt-10">
                <Link
                  to="/states"
                  className="px-6 py-3 bg-violet-600 hover:bg-violet-700 text-white rounded-lg inline-flex items-center gap-2 shadow-neo transition-all hover:shadow-neo-hover"
                >
                  View All States <ArrowRight className="w-5 h-5" />
                </Link>
              </div>
            </motion.div>
          </div>
        </div>
      )}
    </div>
  );
}

export default StateDetails;
