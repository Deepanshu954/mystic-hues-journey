
import { useState } from 'react';
import { Link } from 'react-router-dom';
import { Search, MapPin } from 'lucide-react';
import { states } from '../data/states';
import { motion } from 'framer-motion';
import PageHeader from '../components/PageHeader';

// Group states by region
const groupStatesByRegion = () => {
  const regions = {
    'North India': states.filter(state => state.tags.includes('North India')),
    'South India': states.filter(state => state.tags.includes('South India')),
    'East India': states.filter(state => state.tags.includes('East India')),
    'West India': states.filter(state => state.tags.includes('West India')),
    'Central India': states.filter(state => state.tags.includes('Central India')),
    'Northeast India': states.filter(state => state.tags.includes('Northeast India')),
  };
  
  // Filter out regions with no states
  return Object.fromEntries(
    Object.entries(regions).filter(([_, states]) => states.length > 0)
  );
};

function States() {
  const [searchQuery, setSearchQuery] = useState('');
  const [activeRegionFilter, setActiveRegionFilter] = useState<string | null>(null);
  
  // Filter states based on search query
  const filteredStates = states.filter(state => 
    state.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
    state.description.toLowerCase().includes(searchQuery.toLowerCase()) ||
    (state.famous && state.famous.toLowerCase().includes(searchQuery.toLowerCase())) ||
    state.tags?.some(tag => tag.toLowerCase().includes(searchQuery.toLowerCase()))
  );

  // First apply search filter, then apply region filter if active
  const finalFilteredStates = activeRegionFilter 
    ? filteredStates.filter(state => state.tags.includes(activeRegionFilter))
    : filteredStates;

  // Separate states and union territories
  const statesList = finalFilteredStates.filter(s => !s.isUT);
  const utList = finalFilteredStates.filter(s => s.isUT);

  // Get region map for filter buttons
  const regionMap = groupStatesByRegion();
  const regionNames = Object.keys(regionMap);

  return (
    <div className="min-h-screen bg-light-bg dark:bg-gray-900 pt-24">
      <div className="max-w-7xl mx-auto px-4 py-12">
        <PageHeader 
          title="States & Union Territories" 
          description="Explore the diverse cultures and traditions of India's states and union territories."
        />
        
        <div className="flex flex-col md:flex-row justify-between items-start md:items-center gap-6 mb-8">
          {/* Search Bar */}
          <div className="w-full md:w-96">
            <div className="relative">
              <Search className="absolute left-4 top-1/2 transform -translate-y-1/2 text-gray-400 w-5 h-5" />
              <input
                type="text"
                placeholder="Search states, places, or culture..."
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                className="w-full bg-white dark:bg-gray-800 text-light-text dark:text-white pl-12 pr-4 py-3 rounded-xl focus:outline-none focus:ring-2 focus:ring-violet-500 border border-gray-200 dark:border-gray-700"
              />
            </div>
          </div>

          {/* Region Filters */}
          <div className="flex flex-wrap gap-2">
            {activeRegionFilter && (
              <button
                onClick={() => setActiveRegionFilter(null)}
                className="px-4 py-2 text-sm rounded-full bg-violet-100 dark:bg-violet-800 text-violet-800 dark:text-violet-100 hover:bg-violet-200 dark:hover:bg-violet-700 transition-colors"
              >
                Clear Filter
              </button>
            )}
            {regionNames.map(region => (
              <button
                key={region}
                onClick={() => setActiveRegionFilter(region === activeRegionFilter ? null : region)}
                className={`px-4 py-2 text-sm rounded-full flex items-center gap-1 transition-colors ${
                  region === activeRegionFilter 
                    ? 'bg-violet-600 text-white' 
                    : 'bg-violet-50 dark:bg-gray-800 text-light-text dark:text-gray-300 hover:bg-violet-100 dark:hover:bg-gray-700'
                }`}
              >
                <MapPin className="w-3 h-3" /> {region}
              </button>
            ))}
          </div>
        </div>

        {/* Active Filters Display */}
        {activeRegionFilter && (
          <div className="mb-8">
            <div className="px-4 py-3 bg-violet-50 dark:bg-violet-900/20 rounded-lg">
              <p className="text-light-text dark:text-white">
                Showing states in <span className="font-semibold">{activeRegionFilter}</span>
              </p>
            </div>
          </div>
        )}

        {/* Display by Regions when no search or filter is active */}
        {!searchQuery && !activeRegionFilter && (
          <div className="space-y-16">
            {Object.entries(regionMap).map(([region, regionStates]) => (
              <div key={region} className="mb-16">
                <motion.h2 
                  className="text-3xl font-bold mb-8 flex items-center gap-2 text-light-text dark:text-white"
                  initial={{ opacity: 0, x: -20 }}
                  whileInView={{ opacity: 1, x: 0 }}
                  viewport={{ once: true }}
                  transition={{ duration: 0.5 }}
                >
                  <MapPin className="w-6 h-6 text-violet-600 dark:text-violet-400" /> 
                  {region} ({regionStates.length})
                </motion.h2>
                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
                  {regionStates.map((state) => (
                    <StateCard key={state.path} state={state} />
                  ))}
                </div>
              </div>
            ))}
          </div>
        )}

        {/* States Section - For search results or filtered results */}
        {(searchQuery || activeRegionFilter) && statesList.length > 0 && (
          <div className="mb-20">
            <h2 className="text-3xl font-bold mb-8 text-light-text dark:text-white">States ({statesList.length})</h2>
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
              {statesList.map((state) => (
                <StateCard key={state.path} state={state} />
              ))}
            </div>
          </div>
        )}

        {/* Union Territories Section */}
        {(searchQuery || activeRegionFilter) && utList.length > 0 && (
          <div>
            <h2 className="text-3xl font-bold mb-8 text-light-text dark:text-white">Union Territories ({utList.length})</h2>
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
              {utList.map((ut) => (
                <StateCard key={ut.path} state={ut} />
              ))}
            </div>
          </div>
        )}

        {/* No Results Message */}
        {finalFilteredStates.length === 0 && (
          <div className="text-center py-20">
            <p className="text-2xl text-light-muted dark:text-gray-400">No states or territories found matching your search.</p>
          </div>
        )}
      </div>
    </div>
  );
}

interface StateCardProps {
  state: {
    name: string;
    path: string;
    image: string;
    famous?: string;
    tags?: string[];
  };
}

const StateCard = ({ state }: StateCardProps) => {
  return (
    <Link
      to={`/states/${state.path}`}
      className="group"
    >
      <motion.div 
        className="relative h-80 rounded-xl overflow-hidden shadow-lg"
        initial={{ opacity: 0, y: 20 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true, margin: "-50px" }}
        transition={{ duration: 0.5 }}
        whileHover={{ y: -5 }}
      >
        <img
          src={state.image}
          alt={state.name}
          className="w-full h-full object-cover transform transition-transform duration-500 group-hover:scale-110"
        />
        <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-black/50 to-transparent" />
        <div className="absolute bottom-0 left-0 right-0 p-6">
          <h3 className="text-2xl font-bold mb-2 text-white">{state.name}</h3>
          {state.famous && <p className="text-gray-300">Famous for: {state.famous}</p>}
          <div className="flex flex-wrap gap-2 mt-3">
            {state.tags?.filter(tag => !tag.includes('India')).slice(0, 3).map((tag, index) => (
              <span key={index} className="text-sm px-2 py-1 bg-violet-500/20 text-violet-300 rounded-full">
                {tag}
              </span>
            ))}
          </div>
        </div>
        <div className="absolute inset-0 bg-violet-600/20 opacity-0 group-hover:opacity-100 transition-opacity duration-300" />
      </motion.div>
    </Link>
  );
};

export default States;
