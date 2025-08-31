import React from 'react';
import { X, Star } from 'lucide-react';

interface FilterSidebarProps {
  filters: {
    sport: string;
    priceRange: [number, number];
    timeSlot: string;
    rating: number;
    query: string;
  };
  onFiltersChange: (filters: any) => void;
  onClose?: () => void;
}

const FilterSidebar: React.FC<FilterSidebarProps> = ({ filters, onFiltersChange, onClose }) => {
  const sports = ['Cricket', 'Football', 'Tennis', 'Badminton', 'Basketball', 'Swimming', 'Volleyball'];
  const timeSlots = ['Morning (6 AM - 12 PM)', 'Afternoon (12 PM - 6 PM)', 'Evening (6 PM - 9 PM)', 'Night (9 PM - 11 PM)'];

  const updateFilters = (key: string, value: any) => {
    onFiltersChange({ ...filters, [key]: value });
  };

  const clearFilters = () => {
    onFiltersChange({
      sport: '',
      priceRange: [0, 5000] as [number, number],
      timeSlot: '',
      rating: 0,
      query: filters.query
    });
  };

  return (
    <div className="bg-white rounded-2xl shadow-lg h-full flex flex-col">
      {/* Header - Fixed */}
      <div className="flex-shrink-0 p-6 border-b border-gray-200">
        {/* Mobile Header */}
        {onClose && (
          <div className="flex items-center justify-between md:hidden">
            <h3 className="text-lg font-bold text-gray-900">Filters</h3>
            <button 
              onClick={onClose} 
              className="p-2 rounded-lg hover:bg-gray-100 transition-colors mobile-button"
            >
              <X className="w-5 h-5" />
            </button>
          </div>
        )}
        
        {/* Desktop Header */}
        {!onClose && (
          <h3 className="text-lg font-bold text-gray-900">Filters</h3>
        )}
      </div>

      {/* Scrollable Content */}
      <div className="flex-1 overflow-y-auto p-6 space-y-6 scrollbar-hide">
        {/* Sport Type */}
        <div>
          <h4 className="text-lg font-semibold text-gray-900 mb-3 mobile-text">Sport Type</h4>
          <div className="space-y-3">
            {sports.map((sport) => (
              <label key={sport} className="flex items-center space-x-3 cursor-pointer group">
                <input
                  type="radio"
                  name="sport"
                  value={sport.toLowerCase()}
                  checked={filters.sport === sport.toLowerCase()}
                  onChange={(e) => updateFilters('sport', e.target.value)}
                  className="text-blue-600 focus:ring-blue-500 w-4 h-4"
                />
                <span className="text-gray-700 group-hover:text-blue-600 transition-colors mobile-text">{sport}</span>
              </label>
            ))}
          </div>
        </div>

        {/* Price Range */}
        <div>
          <h4 className="text-lg font-semibold text-gray-900 mb-3 mobile-text">Price Range</h4>
          <div className="space-y-4">
            <input
              type="range"
              min="0"
              max="5000"
              step="100"
              value={filters.priceRange[1]}
              onChange={(e) => updateFilters('priceRange', [0, parseInt(e.target.value)])}
              className="w-full h-2 bg-gray-200 rounded-lg appearance-none cursor-pointer slider"
            />
            <div className="flex justify-between text-sm text-gray-600 mobile-text">
              <span>₹0</span>
              <span>₹{filters.priceRange[1]}</span>
            </div>
          </div>
        </div>

        {/* Rating Filter */}
        <div>
          <h4 className="text-lg font-semibold text-gray-900 mb-3 mobile-text">Minimum Rating</h4>
          <div className="space-y-3">
            {[1, 2, 3, 4, 5].map((rating) => (
              <label key={rating} className="flex items-center space-x-3 cursor-pointer group">
                <input
                  type="radio"
                  name="rating"
                  value={rating}
                  checked={filters.rating === rating}
                  onChange={(e) => updateFilters('rating', parseInt(e.target.value))}
                  className="text-blue-600 focus:ring-blue-500 w-4 h-4"
                />
                <div className="flex items-center space-x-1">
                  {[...Array(rating)].map((_, i) => (
                    <Star key={i} className="w-4 h-4 text-yellow-500 fill-current" />
                  ))}
                  <span className="text-gray-600 mobile-text ml-2">& up</span>
                </div>
              </label>
            ))}
          </div>
        </div>

        {/* Time Slot */}
        <div>
          <h4 className="text-lg font-semibold text-gray-900 mb-3 mobile-text">Available Time</h4>
          <div className="space-y-3">
            {timeSlots.map((timeSlot) => (
              <label key={timeSlot} className="flex items-center space-x-3 cursor-pointer group">
                <input
                  type="radio"
                  name="timeSlot"
                  value={timeSlot}
                  checked={filters.timeSlot === timeSlot}
                  onChange={(e) => updateFilters('timeSlot', e.target.value)}
                  className="text-blue-600 focus:ring-blue-500 w-4 h-4"
                />
                <span className="text-gray-700 group-hover:text-blue-600 transition-colors mobile-text">{timeSlot}</span>
              </label>
            ))}
          </div>
        </div>

        {/* Additional Filters */}
        <div>
          <h4 className="text-lg font-semibold text-gray-900 mb-3 mobile-text">Additional Filters</h4>
          <div className="space-y-3">
            <label className="flex items-center space-x-3 cursor-pointer group">
              <input
                type="checkbox"
                className="text-blue-600 focus:ring-blue-500 w-4 h-4"
              />
              <span className="text-gray-700 group-hover:text-blue-600 transition-colors mobile-text">Available Now</span>
            </label>
            <label className="flex items-center space-x-3 cursor-pointer group">
              <input
                type="checkbox"
                className="text-blue-600 focus:ring-blue-500 w-4 h-4"
              />
              <span className="text-gray-700 group-hover:text-blue-600 transition-colors mobile-text">Premium Facilities</span>
            </label>
            <label className="flex items-center space-x-3 cursor-pointer group">
              <input
                type="checkbox"
                className="text-blue-600 focus:ring-blue-500 w-4 h-4"
              />
              <span className="text-gray-700 group-hover:text-blue-600 transition-colors mobile-text">Parking Available</span>
            </label>
            <label className="flex items-center space-x-3 cursor-pointer group">
              <input
                type="checkbox"
                className="text-blue-600 focus:ring-blue-500 w-4 h-4"
              />
              <span className="text-gray-700 group-hover:text-blue-600 transition-colors mobile-text">Lighting Available</span>
            </label>
          </div>
        </div>
      </div>

      {/* Footer - Fixed */}
      <div className="flex-shrink-0 p-6 border-t border-gray-200">
        <button
          onClick={clearFilters}
          className="w-full bg-gray-100 hover:bg-gray-200 text-gray-700 py-3 px-4 rounded-xl transition-colors font-medium mobile-button"
        >
          Clear All Filters
        </button>
      </div>
    </div>
  );
};

export default FilterSidebar;