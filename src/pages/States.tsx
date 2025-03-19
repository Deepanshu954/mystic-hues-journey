
import { useState } from 'react';
import { Link } from 'react-router-dom';
import { Search, MapPin } from 'lucide-react';
import { states } from '../data/states';
import { motion } from 'framer-motion';
import PageHeader from '../components/PageHeader';
import StateCard from '../components/StateCard';

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
                className="w-full neo-input pl-12 pr-4"
              />
            </div>
          </div>

          {/* Region Filters */}
          <div className="flex flex-wrap gap-2">
            {activeRegionFilter && (
              <button
                onClick={() => setActiveRegionFilter(null)}
                className="px-4 py-2 text-sm rounded-full dark:bg-violet-800 dark:text-violet-100 dark:hover:bg-violet-700 light:bg-saffron-100 light:text-saffron-800 light:hover:bg-saffron-200 transition-colors"
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
                    ? 'dark:bg-violet-600 dark:text-white light:bg-saffron-500 light:text-white' 
                    : 'dark:bg-gray-800 dark:text-gray-300 dark:hover:bg-gray-700 light:bg-saffron-50 light:text-saffron-800 light:hover:bg-saffron-100'
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
            <div className="px-4 py-3 dark:bg-violet-900/20 light:bg-saffron-100 rounded-lg">
              <p className="dark:text-white light:text-saffron-800">
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
                  className="text-3xl font-bold mb-8 flex items-center gap-2 dark:text-white light:text-light-text"
                  initial={{ opacity: 0, x: -20 }}
                  whileInView={{ opacity: 1, x: 0 }}
                  viewport={{ once: true }}
                  transition={{ duration: 0.5 }}
                >
                  <MapPin className="w-6 h-6 dark:text-violet-600 dark:text-violet-400 light:text-saffron-500" /> 
                  {region} ({regionStates.length})
                </motion.h2>
                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
                  {regionStates.map((state) => (
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
              </div>
            ))}
          </div>
        )}

        {/* States Section - For search results or filtered results */}
        {(searchQuery || activeRegionFilter) && statesList.length > 0 && (
          <div className="mb-20">
            <h2 className="text-3xl font-bold mb-8 dark:text-white light:text-light-text">States ({statesList.length})</h2>
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
              {statesList.map((state) => (
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
          </div>
        )}

        {/* Union Territories Section */}
        {(searchQuery || activeRegionFilter) && utList.length > 0 && (
          <div>
            <h2 className="text-3xl font-bold mb-8 dark:text-white light:text-light-text">Union Territories ({utList.length})</h2>
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
              {utList.map((ut) => (
                <StateCard 
                  key={ut.path} 
                  name={ut.name}
                  image={ut.image}
                  description={ut.description}
                  tags={ut.tags}
                  path={ut.path}
                />
              ))}
            </div>
          </div>
        )}

        {/* No Results Message */}
        {finalFilteredStates.length === 0 && (
          <div className="text-center py-20">
            <p className="text-2xl dark:text-gray-400 light:text-light-muted">No states or territories found matching your search.</p>
          </div>
        )}
      </div>
    </div>
  );
}

export default States;
