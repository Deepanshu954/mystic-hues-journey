import React, { useState, useEffect } from 'react';
import { motion } from 'framer-motion';
// Removed unused Link import
import { states } from '../data/states';
import StateCard from '../components/StateCard';
import PageHeader from '../components/PageHeader';
import { MapPin, Filter } from 'lucide-react';

const States = () => {
  const [searchTerm, setSearchTerm] = useState('');
  const [filteredStates, setFilteredStates] = useState(states);
  const [selectedRegion, setSelectedRegion] = useState<string | null>(null);
  const [isFilterOpen, setIsFilterOpen] = useState(false);

  useEffect(() => {
    // Apply both search and region filters
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
    setIsFilterOpen(false); // Close the filter after selection
  };

  const clearFilters = () => {
    setSearchTerm('');
    setSelectedRegion(null);
    setFilteredStates(states); // Reset to all states
    setIsFilterOpen(false); // Close the filter after clearing
  };

  const toggleFilter = () => {
    setIsFilterOpen(!isFilterOpen);
  };

  const regions = [...new Set(states.flatMap(state => state.tags))];

  return (
    <motion.div
      className="page-transition"
      initial={{ opacity: 0, y: 10 }}
      animate={{ opacity: 1, y: 0 }}
      exit={{ opacity: 0, y: 10 }}
    >
      <PageHeader title="Explore Indian States" description="Discover the diverse tapestry of India, state by state." />

      {/* Search and Filter Bar */}
      <div className="flex flex-col md:flex-row items-center justify-between gap-4 px-6 py-3">
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

        {/* Filter Button - Visible on smaller screens */}
        <button
          onClick={toggleFilter}
          className="neo-button flex items-center gap-2 md:hidden"
        >
          <Filter className="w-5 h-5" />
          Filter
        </button>

        {/* Filter Dropdown - Hidden on smaller screens, always visible on larger screens */}
        <motion.div
          className={`md:flex flex-wrap gap-2 items-center justify-end w-full md:w-auto ${isFilterOpen ? 'flex' : 'hidden md:flex'}`}
          initial={{ opacity: 0, height: 0 }}
          animate={{ opacity: 1, height: 'auto' }}
          exit={{ opacity: 0, height: 0 }}
          transition={{ duration: 0.3, ease: "easeInOut" }}
        >
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
            <button onClick={clearFilters} className="text-red-500 text-sm">
              Clear Filters
            </button>
          )}
        </motion.div>
      </div>

      {/* State Cards Grid */}
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
      </div>
    </motion.div>
  );
};

export default States;
