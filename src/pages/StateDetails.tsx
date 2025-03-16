import React, { useState } from 'react';
import { useParams } from 'react-router-dom';
import { Music2, Utensils, Palette, LandPlot, Clock, Newspaper, ChevronDown, ChevronUp } from 'lucide-react';
import { states } from '../data/states';

function StateDetails() {
  const { state: statePath } = useParams();
  const data = states.find(s => s.path === statePath);
  const [showAllPlaces, setShowAllPlaces] = useState(false);
  const [showAllCuisine, setShowAllCuisine] = useState(false);
  const [showAllHistory, setShowAllHistory] = useState(false);

  if (!data) {
    return (
      <div className="min-h-screen bg-gray-900 pt-24 flex items-center justify-center">
        <p className="text-2xl text-gray-300">State not found</p>
      </div>
    );
  }

  const displayedPlaces = showAllPlaces ? data.places : data.places.slice(0, 3);
  const displayedCuisine = showAllCuisine ? data.cuisine : data.cuisine.slice(0, 3);

  return (
    <div className="min-h-screen bg-gray-900 pt-24">
      {/* Hero Section */}
      <div className="relative h-[60vh]">
        <img
          src={data.image}
          alt={data.name}
          className="w-full h-full object-cover"
        />
        <div className="absolute inset-0 bg-gradient-to-t from-gray-900 via-gray-900/50" />
        <div className="absolute bottom-0 left-0 right-0 p-8 max-w-7xl mx-auto">
          <h1 className="text-5xl md:text-7xl font-bold mb-4">{data.name}</h1>
          <p className="text-xl text-gray-300 max-w-3xl">{data.description}</p>
        </div>
      </div>

      {/* Cultural Highlights */}
      <div className="max-w-7xl mx-auto px-4 py-16">
        <h2 className="text-4xl font-bold mb-12 flex items-center gap-4">
          <Palette className="w-10 h-10 text-violet-400" />
          Cultural Heritage
        </h2>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
          <div className="bg-gray-800 rounded-xl p-8">
            <h3 className="text-2xl font-semibold mb-4">Art Forms</h3>
            <p className="text-gray-300">{data.culture?.art}</p>
          </div>
          <div className="bg-gray-800 rounded-xl p-8">
            <h3 className="text-2xl font-semibold mb-4">Dance</h3>
            <p className="text-gray-300">{data.culture?.dance}</p>
          </div>
          <div className="bg-gray-800 rounded-xl p-8">
            <h3 className="text-2xl font-semibold mb-4">Festivals</h3>
            <ul className="list-disc list-inside text-gray-300">
              {data.culture?.festivals.map((festival) => (
                <li key={festival}>{festival}</li>
              ))}
            </ul>
          </div>
          <div className="bg-gray-800 rounded-xl p-8">
            <h3 className="text-2xl font-semibold mb-4">Handicrafts</h3>
            <ul className="list-disc list-inside text-gray-300">
              {data.culture?.handicrafts.map((craft) => (
                <li key={craft}>{craft}</li>
              ))}
            </ul>
          </div>
        </div>
      </div>

      {/* Places to Visit */}
      <div className="bg-gray-800 py-16">
        <div className="max-w-7xl mx-auto px-4">
          <h2 className="text-4xl font-bold mb-12 flex items-center gap-4">
            <LandPlot className="w-10 h-10 text-violet-400" />
            Places to Visit
          </h2>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            {displayedPlaces.map((place) => (
              <div key={place.name} className="bg-gray-900 rounded-xl overflow-hidden group">
                <div className="h-64 overflow-hidden">
                  <img
                    src={place.image}
                    alt={place.name}
                    className="w-full h-full object-cover transform transition-transform duration-500 group-hover:scale-110"
                  />
                </div>
                <div className="p-6">
                  <h3 className="text-2xl font-semibold mb-3">{place.name}</h3>
                  <p className="text-gray-300">{place.description}</p>
                </div>
              </div>
            ))}
          </div>
          {data.places.length > 3 && (
            <button
              onClick={() => setShowAllPlaces(!showAllPlaces)}
              className="mt-8 flex items-center gap-2 mx-auto px-6 py-3 bg-violet-600/20 hover:bg-violet-600/30 rounded-lg text-violet-400 border border-violet-500/30 transition-colors"
            >
              {showAllPlaces ? (
                <>Show Less <ChevronUp className="w-5 h-5" /></>
              ) : (
                <>View More Places <ChevronDown className="w-5 h-5" /></>
              )}
            </button>
          )}
        </div>
      </div>

      {/* Cuisine */}
      <div className="max-w-7xl mx-auto px-4 py-16">
        <h2 className="text-4xl font-bold mb-12 flex items-center gap-4">
          <Utensils className="w-10 h-10 text-violet-400" />
          Traditional Cuisine
        </h2>
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          {displayedCuisine.map((dish) => (
            <div key={dish.name} className="bg-gray-800 rounded-xl overflow-hidden">
              <div className="h-48 overflow-hidden">
                <img
                  src={dish.image}
                  alt={dish.name}
                  className="w-full h-full object-cover"
                />
              </div>
              <div className="p-6">
                <h3 className="text-xl font-semibold mb-2">{dish.name}</h3>
                <p className="text-gray-300">{dish.description}</p>
              </div>
            </div>
          ))}
        </div>
        {data.cuisine.length > 3 && (
          <button
            onClick={() => setShowAllCuisine(!showAllCuisine)}
            className="mt-8 flex items-center gap-2 mx-auto px-6 py-3 bg-violet-600/20 hover:bg-violet-600/30 rounded-lg text-violet-400 border border-violet-500/30 transition-colors"
          >
            {showAllCuisine ? (
              <>Show Less <ChevronUp className="w-5 h-5" /></>
            ) : (
              <>View More Dishes <ChevronDown className="w-5 h-5" /></>
            )}
          </button>
        )}
      </div>

      {/* History */}
      <div className="bg-gray-800 py-16">
        <div className="max-w-7xl mx-auto px-4">
          <h2 className="text-4xl font-bold mb-12 flex items-center gap-4">
            <Clock className="w-10 h-10 text-violet-400" />
            History
          </h2>
          <div className="space-y-8">
            <div className="bg-gray-900 rounded-xl p-8">
              <h3 className="text-2xl font-semibold mb-4 text-violet-300">Ancient Period</h3>
              <p className="text-gray-300 leading-relaxed mb-6">{data.history.ancient}</p>
              {!showAllHistory && (
                <button
                  onClick={() => setShowAllHistory(true)}
                  className="text-violet-400 hover:text-violet-300 flex items-center gap-2"
                >
                  View Detailed Timeline <ChevronDown className="w-5 h-5" />
                </button>
              )}
            </div>
            
            {showAllHistory && (
              <>
                <div className="space-y-6">
                  {data.history.details.map((detail, index) => (
                    <div key={index} className="bg-gray-800/50 rounded-xl p-6 border border-gray-700">
                      <div className="flex items-start gap-4">
                        <div className="bg-violet-500/10 text-violet-400 px-3 py-1 rounded-full text-sm">
                          {detail.year}
                        </div>
                        <div>
                          <h4 className="text-lg font-semibold mb-2">{detail.period} Period</h4>
                          <p className="text-gray-300">{detail.description}</p>
                        </div>
                      </div>
                    </div>
                  ))}
                </div>
                <button
                  onClick={() => setShowAllHistory(false)}
                  className="text-violet-400 hover:text-violet-300 flex items-center gap-2"
                >
                  Show Less <ChevronUp className="w-5 h-5" />
                </button>
              </>
            )}
          </div>
        </div>
      </div>

      {/* Latest News */}
      <div className="max-w-7xl mx-auto px-4 py-16">
        <h2 className="text-4xl font-bold mb-12 flex items-center gap-4">
          <Newspaper className="w-10 h-10 text-violet-400" />
          Latest News
        </h2>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
          {data.news.map((item) => (
            <div key={item.title} className="bg-gray-800 rounded-xl p-6">
              <h3 className="text-xl font-semibold mb-2">{item.title}</h3>
              <p className="text-sm text-violet-400 mb-4">{item.date}</p>
              <p className="text-gray-300">{item.summary}</p>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}

export default StateDetails;