
import { useEffect, useState } from 'react';
import { useParams, Link } from 'react-router-dom';
import { ChevronLeft, Image } from 'lucide-react';
import PageHeader from '../components/PageHeader';
import { cultures } from '../data/culture';
import { states } from '../data/states';
import PageTransition from '../components/PageTransition';
import { motion } from 'framer-motion';

const CultureDetail = () => {
  const { id, state } = useParams<{ id: string; state: string }>();
  const [isLoading, setIsLoading] = useState(true);
  const [relatedStates, setRelatedStates] = useState<typeof states>([]);
  
  const culture = cultures.find((c) => c.id === id);
  const stateData = states.find((s) => s.path === state);

  useEffect(() => {
    // Find related states (states with the same culture)
    if (culture) {
      const related = states.filter(
        (s) => s.cultures.includes(culture.id) && s.path !== state
      ).slice(0, 3);
      setRelatedStates(related);
    }
    
    // Simulate loading
    const timer = setTimeout(() => {
      setIsLoading(false);
    }, 1000);
    
    return () => clearTimeout(timer);
  }, [culture, state]);

  if (!culture || !stateData) {
    return (
      <div className="py-32 text-center">
        <h1 className="text-2xl">Culture not found</h1>
        <Link to="/culture" className="text-blue-500 hover:underline mt-4 inline-block">
          Return to Cultures
        </Link>
      </div>
    );
  }

  return (
    <PageTransition>
      <div>
        <PageHeader
          title={`${culture.name} - ${stateData.name}`}
          description={`Explore the rich ${culture.name} tradition in ${stateData.name}`}
          image={culture.image}
        />

        <div className="max-w-7xl mx-auto px-4 py-12">
          {/* Back navigation */}
          <Link
            to="/culture"
            className="inline-flex items-center text-violet-400 hover:text-violet-300 mb-8 group"
          >
            <ChevronLeft className="mr-2 h-5 w-5 transition-transform group-hover:-translate-x-1" />
            Back to Cultures
          </Link>

          {/* Loading state */}
          {isLoading ? (
            <div className="flex justify-center items-center min-h-[400px]">
              <div className="neo-spinner"></div>
            </div>
          ) : (
            <div className="grid grid-cols-1 lg:grid-cols-3 gap-8 mt-8">
              {/* Main content */}
              <div className="lg:col-span-2 space-y-8">
                <div className="neo-panel p-8">
                  <h2 className="text-3xl font-bold mb-6 neo-gradient-text">
                    {culture.name} in {stateData.name}
                  </h2>
                  
                  <div className="relative aspect-video overflow-hidden rounded-xl mb-8">
                    <motion.img
                      src={culture.detailImage || culture.image}
                      alt={culture.name}
                      className="w-full h-full object-cover"
                      initial={{ scale: 1.1, filter: 'blur(10px)' }}
                      animate={{ scale: 1, filter: 'blur(0px)' }}
                      transition={{ duration: 0.7 }}
                    />
                    <div className="absolute inset-0 bg-gradient-to-t from-gray-900 to-transparent opacity-40"></div>
                  </div>
                  
                  <p className="text-gray-300 leading-relaxed mb-6">
                    {culture.description}
                  </p>

                  <h3 className="text-xl font-semibold mb-4 text-violet-300">
                    Historical Significance
                  </h3>
                  <p className="text-gray-300 leading-relaxed mb-6">
                    {culture.history || `The ${culture.name} has deep historical roots in ${stateData.name}, 
                    dating back several centuries. It evolved from ancient traditions and has been 
                    passed down through generations, becoming an integral part of the cultural fabric.`}
                  </p>

                  <h3 className="text-xl font-semibold mb-4 text-violet-300">
                    Key Elements
                  </h3>
                  <ul className="list-disc list-inside text-gray-300 mb-6 space-y-2">
                    {culture.elements?.map((element, index) => (
                      <li key={index} className="ml-4">{element}</li>
                    )) || (
                      <>
                        <li className="ml-4">Traditional performances by skilled artists</li>
                        <li className="ml-4">Special costumes and accessories</li>
                        <li className="ml-4">Unique musical instruments and rhythms</li>
                        <li className="ml-4">Cultural rituals with deep symbolic meaning</li>
                      </>
                    )}
                  </ul>
                </div>
              </div>

              {/* Sidebar content */}
              <div className="space-y-8">
                <div className="neo-panel p-6">
                  <h3 className="text-xl font-semibold mb-4 flex items-center">
                    <Image className="mr-2 h-5 w-5 text-violet-400" />
                    Gallery
                  </h3>
                  <div className="grid grid-cols-2 gap-4">
                    {[1, 2, 3, 4].map((_, index) => (
                      <div key={index} className="aspect-square overflow-hidden rounded-lg relative group">
                        <motion.img
                          src={`https://source.unsplash.com/random/300x300?${culture.name.toLowerCase()},culture,india,${index}`}
                          alt={`${culture.name} gallery ${index + 1}`}
                          className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-110"
                          initial={{ opacity: 0 }}
                          animate={{ opacity: 1 }}
                          transition={{ delay: index * 0.1 }}
                          loading="lazy"
                        />
                        <div className="absolute inset-0 bg-gradient-to-t from-gray-900 to-transparent opacity-0 group-hover:opacity-60 transition-opacity"></div>
                      </div>
                    ))}
                  </div>
                </div>

                {relatedStates.length > 0 && (
                  <div className="neo-panel p-6">
                    <h3 className="text-xl font-semibold mb-4">
                      Also present in
                    </h3>
                    <div className="space-y-4">
                      {relatedStates.map((relatedState) => (
                        <Link
                          key={relatedState.path}
                          to={`/culture/${culture.id}/${relatedState.path}`}
                          className="flex items-center p-3 rounded-lg bg-gray-800/50 hover:bg-gray-700/50 transition-colors"
                        >
                          <img
                            src={relatedState.thumbnail}
                            alt={relatedState.name}
                            className="w-12 h-12 rounded object-cover mr-4"
                          />
                          <div>
                            <h4 className="font-medium text-white">{relatedState.name}</h4>
                            <p className="text-sm text-gray-400">Explore {culture.name} in {relatedState.name}</p>
                          </div>
                        </Link>
                      ))}
                    </div>
                  </div>
                )}
              </div>
            </div>
          )}
        </div>
      </div>
    </PageTransition>
  );
};

export default CultureDetail;
