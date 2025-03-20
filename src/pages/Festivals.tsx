
import { motion } from 'framer-motion';
import PageTransition from '../components/PageTransition';
import { festivalsData } from '../data/festivals';
import { useEffect } from 'react';

function Festivals() {
  // Ensure page starts from top
  useEffect(() => {
    window.scrollTo(0, 0);
  }, []);

  return (
    <PageTransition>
      <div className="min-h-screen relative pt-24 pb-16 overflow-hidden">
        {/* Abstract Background Pattern */}
        <div className="absolute inset-0 -z-10">
          <div className="absolute inset-0 dark:bg-gray-900 light:bg-gradient-to-br light:from-saffron-50 light:to-light-bg opacity-95"></div>
          <div className="absolute inset-0 dark:bg-neo-grid light:bg-[radial-gradient(#f97316_1px,transparent_1px)] bg-[size:30px_30px] opacity-20"></div>
          <div className="absolute top-0 right-0 w-1/2 h-1/2 dark:bg-violet-600/10 light:bg-saffron-300/10 rounded-full blur-3xl -translate-y-1/4 translate-x-1/4"></div>
          <div className="absolute bottom-0 left-0 w-1/2 h-1/2 dark:bg-blue-600/10 light:bg-orange-300/10 rounded-full blur-3xl translate-y-1/4 -translate-x-1/4"></div>
        </div>

        <div className="max-w-7xl mx-auto px-4 py-8">
          {/* Floating Tab Header */}
          <motion.div 
            className="relative mx-auto mb-12 px-8 py-4 max-w-3xl dark:bg-gray-800/60 light:bg-white/60 backdrop-blur-md rounded-full shadow-lg border dark:border-violet-500/20 light:border-saffron-500/30"
            initial={{ y: -20, opacity: 0 }}
            animate={{ y: 0, opacity: 1 }}
            transition={{ duration: 0.5, delay: 0.2 }}
          >
            <h1 className="text-3xl md:text-4xl font-bold text-center dark:text-white light:text-saffron-800">
              Indian Festivals
            </h1>
          </motion.div>

          <motion.p 
            className="text-xl dark:text-gray-300 light:text-gray-700 text-center mb-12 max-w-3xl mx-auto"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ duration: 0.5, delay: 0.4 }}
          >
            Experience the vibrant celebrations and rich traditions of Indian festivals throughout the year.
          </motion.p>
          
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            {festivalsData.map((festival, index) => (
              <motion.div
                key={festival.id}
                whileHover={{ scale: 1.03 }}
                transition={{ duration: 0.3 }}
                className="dark:bg-gray-800/80 light:bg-white rounded-xl overflow-hidden shadow-lg dark:border dark:border-violet-500/10 light:border-saffron-300/30"
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.5, delay: 0.1 * index }}
              >
                <div className="relative h-64">
                  <img
                    src={festival.image}
                    alt={festival.name}
                    className="w-full h-full object-cover"
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-black/50 to-transparent" />
                </div>
                <div className="p-6">
                  <h3 className="text-2xl font-bold mb-2 dark:text-white light:text-gray-800">{festival.name}</h3>
                  <p className="dark:text-gray-300 light:text-gray-600 mb-2">{festival.description}</p>
                  <p className="dark:text-violet-400 light:text-saffron-500 font-medium">Celebrated: {festival.date}</p>
                </div>
              </motion.div>
            ))}
          </div>
        </div>
      </div>
    </PageTransition>
  );
}

export default Festivals;
