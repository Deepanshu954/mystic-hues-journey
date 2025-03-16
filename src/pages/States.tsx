
import { useState } from 'react';
import { Link } from 'react-router-dom';
import { Search } from 'lucide-react';
import { states } from '../data/states';

function States() {
  const [searchQuery, setSearchQuery] = useState('');
  
  // Filter states based on search query
  const filteredStates = states.filter(state => 
    state.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
    state.description.toLowerCase().includes(searchQuery.toLowerCase()) ||
    (state.famous && state.famous.toLowerCase().includes(searchQuery.toLowerCase())) ||
    state.tags?.some(tag => tag.toLowerCase().includes(searchQuery.toLowerCase()))
  );

  // Separate states and union territories
  const statesList = filteredStates.filter(s => !s.isUT);
  const utList = filteredStates.filter(s => s.isUT);

  return (
    <div className="min-h-screen bg-gray-900 pt-24">
      <div className="max-w-7xl mx-auto px-4 py-12">
        <div className="flex flex-col md:flex-row justify-between items-start md:items-center gap-6 mb-16">
          <div>
            <h1 className="text-4xl md:text-6xl font-bold mb-4">States & Union Territories</h1>
            <p className="text-xl text-gray-300">Explore the diverse cultures and traditions of India's states and union territories.</p>
          </div>
          
          {/* Search Bar */}
          <div className="w-full md:w-96">
            <div className="relative">
              <Search className="absolute left-4 top-1/2 transform -translate-y-1/2 text-gray-400 w-5 h-5" />
              <input
                type="text"
                placeholder="Search states, places, or culture..."
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                className="w-full bg-gray-800 text-white pl-12 pr-4 py-3 rounded-xl focus:outline-none focus:ring-2 focus:ring-violet-500 border border-gray-700"
              />
            </div>
          </div>
        </div>

        {/* States Section */}
        {statesList.length > 0 && (
          <div className="mb-20">
            <h2 className="text-3xl font-bold mb-8">States ({statesList.length})</h2>
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
              {statesList.map((state) => (
                <Link
                  key={state.path}
                  to={`/states/${state.path}`}
                  className="group"
                >
                  <div className="relative h-80 rounded-xl overflow-hidden">
                    <img
                      src={state.image}
                      alt={state.name}
                      className="w-full h-full object-cover transform transition-transform duration-500 group-hover:scale-110"
                    />
                    <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-black/50 to-transparent" />
                    <div className="absolute bottom-0 left-0 right-0 p-6">
                      <h3 className="text-2xl font-bold mb-2">{state.name}</h3>
                      {state.famous && <p className="text-gray-300">Famous for: {state.famous}</p>}
                      <div className="flex flex-wrap gap-2 mt-3">
                        {state.tags?.slice(0, 3).map((tag, index) => (
                          <span key={index} className="text-sm px-2 py-1 bg-violet-500/20 text-violet-300 rounded-full">
                            {tag}
                          </span>
                        ))}
                      </div>
                    </div>
                    <div className="absolute inset-0 bg-violet-600/20 opacity-0 group-hover:opacity-100 transition-opacity duration-300" />
                  </div>
                </Link>
              ))}
            </div>
          </div>
        )}

        {/* Union Territories Section */}
        {utList.length > 0 && (
          <div>
            <h2 className="text-3xl font-bold mb-8">Union Territories ({utList.length})</h2>
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
              {utList.map((ut) => (
                <Link
                  key={ut.path}
                  to={`/states/${ut.path}`}
                  className="group"
                >
                  <div className="relative h-80 rounded-xl overflow-hidden">
                    <img
                      src={ut.image}
                      alt={ut.name}
                      className="w-full h-full object-cover transform transition-transform duration-500 group-hover:scale-110"
                    />
                    <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-black/50 to-transparent" />
                    <div className="absolute bottom-0 left-0 right-0 p-6">
                      <h3 className="text-2xl font-bold mb-2">{ut.name}</h3>
                      {ut.famous && <p className="text-gray-300">Famous for: {ut.famous}</p>}
                      <div className="flex flex-wrap gap-2 mt-3">
                        {ut.tags?.slice(0, 3).map((tag, index) => (
                          <span key={index} className="text-sm px-2 py-1 bg-violet-500/20 text-violet-300 rounded-full">
                            {tag}
                          </span>
                        ))}
                      </div>
                    </div>
                    <div className="absolute inset-0 bg-violet-600/20 opacity-0 group-hover:opacity-100 transition-opacity duration-300" />
                  </div>
                </Link>
              ))}
            </div>
          </div>
        )}

        {/* No Results Message */}
        {filteredStates.length === 0 && (
          <div className="text-center py-20">
            <p className="text-2xl text-gray-400">No states or territories found matching your search.</p>
          </div>
        )}
      </div>
    </div>
  );
}

export default States;
