import React, { useState, useEffect } from 'react';
import { useSearchParams } from 'react-router-dom';
import { Filter, Map, List, Search } from 'lucide-react';
import FilterSidebar from '../search/FilterSidebar';
import TurfGrid from '../search/TurfGrid';
import MapView from '../search/MapView';
import { searchTurfs } from '../../data/turfs';

const SearchPage = () => {
  const [searchParams] = useSearchParams();
  const [viewMode, setViewMode] = useState<'list' | 'map'>('list');
  const [showFilters, setShowFilters] = useState(false);
  const [filters, setFilters] = useState({
    sport: searchParams.get('sport') || '',
    priceRange: [0, 5000] as [number, number],
    timeSlot: '',
    rating: 0,
    query: searchParams.get('q') || ''
  });
  const [turfs, setTurfs] = useState<any[]>([]);

  useEffect(() => {
    const results = searchTurfs(filters);
    setTurfs(results);
  }, [filters]);

  return (
    <div className="min-h-screen bg-gray-50">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8 mobile-padding">
        {/* Header */}
        <div className="flex flex-col md:flex-row md:items-center justify-between mb-8">
          <div>
            <h1 className="text-2xl md:text-3xl font-bold text-gray-900 mb-2 mobile-text">
              {filters.query ? `Search Results for "${filters.query}"` : 'Find Your Perfect Turf'}
            </h1>
            <p className="text-gray-600 mobile-text">{turfs.length} turfs available</p>
          </div>
          
          <div className="flex items-center space-x-4 mt-4 md:mt-0">
            {/* View Toggle */}
            <div className="bg-white rounded-lg p-1 shadow-md">
              <button
                onClick={() => setViewMode('list')}
                className={`p-2 rounded-md transition-colors mobile-button ${
                  viewMode === 'list' ? 'bg-blue-600 text-white' : 'text-gray-600 hover:text-blue-600'
                }`}
              >
                <List className="w-5 h-5" />
              </button>
              <button
                onClick={() => setViewMode('map')}
                className={`p-2 rounded-md transition-colors mobile-button ${
                  viewMode === 'map' ? 'bg-blue-600 text-white' : 'text-gray-600 hover:text-blue-600'
                }`}
              >
                <Map className="w-5 h-5" />
              </button>
            </div>

            {/* Mobile Filter Button */}
            <button
              onClick={() => setShowFilters(!showFilters)}
              className="md:hidden bg-gradient-to-r from-blue-600 to-purple-600 hover:from-blue-700 hover:to-purple-700 text-white px-4 py-2 rounded-xl flex items-center space-x-2 transition-all duration-300 transform hover:scale-105 mobile-button"
            >
              <Filter className="w-4 h-4" />
              <span>Filters</span>
            </button>
          </div>
        </div>

        <div className="flex gap-6 md:gap-8">
          {/* Desktop Sidebar */}
          <div className="hidden md:block w-80 flex-shrink-0">
            <div className="sticky top-24">
              <FilterSidebar filters={filters} onFiltersChange={setFilters} />
            </div>
          </div>

          {/* Mobile Filter Overlay */}
          {showFilters && (
            <div className="fixed inset-0 z-50 md:hidden">
              <div className="absolute inset-0 bg-black/50 backdrop-blur-sm" onClick={() => setShowFilters(false)} />
              <div className="absolute top-0 left-0 w-full h-full bg-white shadow-2xl mobile-filter">
                <FilterSidebar 
                  filters={filters} 
                  onFiltersChange={setFilters}
                  onClose={() => setShowFilters(false)}
                />
              </div>
            </div>
          )}

          {/* Main Content */}
          <div className="flex-1">
            {viewMode === 'list' ? (
              <TurfGrid turfs={turfs} />
            ) : (
              <MapView turfs={turfs} />
            )}
          </div>
        </div>
      </div>
    </div>
  );
};

export default SearchPage;