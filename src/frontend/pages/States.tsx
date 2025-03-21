
import { useState, useEffect } from 'react';
import { motion } from 'framer-motion';
import { useLocation } from 'react-router-dom';
import { states } from '../../database/states';
import StateCard from '../components/StateCard';
import PageHeader from '../../components/PageHeader';
import { MapPin, Filter, ChevronDown, ChevronUp } from 'lucide-react';
import PageTransition from '../components/PageTransition';

const States = () => {
  const location = useLocation();
  const [searchTerm, setSearchTerm] = useState('');
  const [filteredStates, setFilteredStates] = useState(states);
  const [selectedRegion, setSelectedRegion] = useState<string | null>(null);
  const [isFilterOpen, setIsFilterOpen] = useState(false);
  const [isFilterExpanded, setIsFilterExpanded] = useState(false);

  useEffect(() => {
    if (location.state && location.state.selectedRegion) {
      setSelectedRegion(location.state.selectedRegion);
      setIsFilterOpen(false);
      setIsFilterExpanded(false);
    }
  }, [location.state]);

  useEffect(() => {
    let results = states.filter(state =>
      state.name.toLowerCase().includes(searchTerm.toLowerCase())
    );

    if (selectedRegion) {
      results = results.filter(state =>
        state.tags.includes(selectedRegion)
      );
    }

    setFilteredStates(results);
  }, [searchTerm, selectedRegion]);

  const handleRegionChange = (region: string | null) => {
    setSelectedRegion(region);
    setIsFilterOpen(false);
  };

  const clearFilters = () => {
    setSearchTerm('');
    setSelectedRegion(null);
    setFilteredStates(states);
    setIsFilterOpen(false);
  };

  const toggleFilter = () => {
    setIsFilterOpen(!isFilterOpen);
  };

  const toggleFilterExpand = () => {
    setIsFilterExpanded(!isFilterExpanded);
  };

  const regions = [...new Set(states.flatMap(state => state.tags))];

  return (
    <PageTransition>
      <div
        className="page-transition"
        initial={{ opacity: 0, y: 10 }}
        animate={{ opacity: 1, y: 0 }}
        exit={{ opacity: 0, y: 10 }}
      >
        <PageHeader title="View All Indian States" description="Discover the diverse tapestry of India, state by state." />

        <div className="px-6 py-3">
          <div className="flex flex-col md:flex-row items-center justify-between gap-4 w-full">
            <div className="flex items-center gap-2 w-full md:w-auto">
              <MapPin className="w-5 h-5 text-gray-500 dark:text-gray-400" />
              <input
                type="text"
                placeholder="Search for a state..."
                className="neo-input w-full"
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
              />
            </div>

            <button
              onClick={toggleFilter}
              className="neo-button flex items-center gap-2 md:hidden"
            >
              <Filter className="w-5 h-5" />
              Filter
            </button>

            <button
              onClick={toggleFilterExpand}
              className="hidden md:flex items-center gap-2 text-gray-700 dark:text-gray-300 hover:text-saffron-500 dark:hover:text-violet-400"
            >
              <span>Filters</span>
              {isFilterExpanded ? <ChevronUp className="w-4 h-4" /> : <ChevronDown className="w-4 h-4" />}
            </button>
          </div>

          <motion.div
            className={`md:mt-4 ${isFilterOpen ? 'flex' : 'hidden'} ${isFilterExpanded ? 'md:flex' : 'md:hidden'} flex-wrap gap-2 items-center w-full`}
            initial={{ opacity: 0, height: 0 }}
            animate={{ 
              opacity: (isFilterOpen || isFilterExpanded) ? 1 : 0,
              height: (isFilterOpen || isFilterExpanded) ? 'auto' : 0
            }}
            transition={{ duration: 0.3, ease: "easeInOut" }}
          >
            <div className="p-4 neo-panel w-full">
              <div className="flex flex-wrap gap-2 items-center">
                <span className="text-sm font-medium mr-2">Region:</span>
                <button
                  onClick={() => handleRegionChange(null)}
                  className={`neo-button text-sm ${selectedRegion === null ? 'opacity-50' : ''}`}
                >
                  All Regions
                </button>
                {regions.map((region) => (
                  <button
                    key={region}
                    onClick={() => handleRegionChange(region)}
                    className={`neo-button text-sm ${selectedRegion === region ? 'opacity-50' : ''}`}
                  >
                    {region.split(' ').slice(0, 2).join(' ')}
                  </button>
                ))}
                {selectedRegion && (
                  <button onClick={clearFilters} className="text-red-500 text-sm ml-auto">
                    Clear Filters
                  </button>
                )}
              </div>
            </div>
          </motion.div>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 p-6">
          {filteredStates.map((state) => (
            <StateCard
              key={state.name}
              name={state.name}
              image={state.image}
              description={state.description}
              tags={state.tags}
              path={state.path}
            />
          ))}
          
          {filteredStates.length === 0 && (
            <div className="col-span-full text-center py-12">
              <h3 className="text-xl text-gray-600 dark:text-gray-400">No states found matching your criteria.</h3>
              <button onClick={clearFilters} className="mt-4 neo-button">Clear Filters</button>
            </div>
          )}
        </div>
      </div>
    </PageTransition>
  );
};

export default States;
