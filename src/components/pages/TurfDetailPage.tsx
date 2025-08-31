import React, { useState, useEffect } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import { Star, MapPin, Clock, Car, Lightbulb, Coffee, Wifi, ArrowLeft, Calendar, Heart, Share2 } from 'lucide-react';
import ImageCarousel from '../turf/ImageCarousel';
import SlotGrid from '../turf/SlotGrid';
import { getTurfById } from '../../data/turfs';
import { useAuth } from '../../contexts/AuthContext';

const TurfDetailPage = () => {
  const { id } = useParams();
  const navigate = useNavigate();
  const { user, login } = useAuth();
  const [turf, setTurf] = useState<any>(null);
  const [selectedDate, setSelectedDate] = useState(new Date());
  const [selectedSlots, setSelectedSlots] = useState<string[]>([]);
  const [isFavorite, setIsFavorite] = useState(false);

  useEffect(() => {
    if (id) {
      const turfData = getTurfById(id);
      setTurf(turfData);
    }
  }, [id]);

  const getFacilityIcon = (facility: string) => {
    switch (facility.toLowerCase()) {
      case 'parking': return Car;
      case 'washrooms': return Coffee;
      case 'lights': return Lightbulb;
      case 'refreshments': return Coffee;
      default: return Wifi;
    }
  };

  const handleBookNow = () => {
    if (!user) {
      // Redirect to login page if user is not authenticated
      navigate('/login', { state: { from: `/turf/${id}` } });
      return;
    }
    
    if (selectedSlots.length === 0) {
      alert('Please select at least one time slot');
      return;
    }

    navigate(`/booking/${turf.id}`, {
      state: {
        turf,
        selectedDate,
        selectedSlots,
        totalAmount: selectedSlots.length * turf.pricePerHour
      }
    });
  };

  const handleShare = () => {
    if (navigator.share) {
      navigator.share({
        title: turf.name,
        text: `Check out ${turf.name} - ${turf.location}`,
        url: window.location.href,
      });
    } else {
      // Fallback for browsers that don't support Web Share API
      navigator.clipboard.writeText(window.location.href);
      alert('Link copied to clipboard!');
    }
  };

  if (!turf) {
    return (
      <div className="min-h-screen bg-gray-50 flex items-center justify-center mobile-padding">
        <div className="text-center">
          <div className="animate-spin rounded-full h-16 w-16 md:h-32 md:w-32 border-b-2 border-blue-600 mx-auto mb-4"></div>
          <p className="text-gray-600 mobile-text">Loading turf details...</p>
        </div>
      </div>
    );
  }

  const totalAmount = selectedSlots.length * turf.pricePerHour;

  return (
    <div className="min-h-screen bg-gray-50 overflow-x-hidden">
      {/* Mobile Sticky Header */}
      <div className="sticky top-0 z-40 bg-white/95 backdrop-blur-md border-b border-gray-200/50 md:hidden">
        <div className="flex items-center justify-between p-4">
          <button
            onClick={() => navigate(-1)}
            className="flex items-center space-x-2 text-gray-600 hover:text-blue-600 transition-colors mobile-button"
          >
            <ArrowLeft className="w-5 h-5" />
            <span className="mobile-text">Back</span>
          </button>
          <div className="flex items-center space-x-2">
            <button
              onClick={() => setIsFavorite(!isFavorite)}
              className={`p-2 rounded-full transition-colors ${
                isFavorite ? 'text-red-500' : 'text-gray-600 hover:text-red-500'
              }`}
            >
              <Heart className={`w-5 h-5 ${isFavorite ? 'fill-current' : ''}`} />
            </button>
            <button
              onClick={handleShare}
              className="p-2 rounded-full text-gray-600 hover:text-blue-600 transition-colors"
            >
              <Share2 className="w-5 h-5" />
            </button>
          </div>
        </div>
      </div>

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-4 md:py-8 mobile-padding">
        {/* Back Button - Desktop Only */}
        <button
          onClick={() => navigate(-1)}
          className="hidden md:flex items-center space-x-2 text-gray-600 hover:text-blue-600 mb-6 transition-colors"
        >
          <ArrowLeft className="w-5 h-5" />
          <span>Back to Search</span>
        </button>

        <div className="grid grid-cols-1 lg:grid-cols-3 gap-6 md:gap-8">
          {/* Left Column - Images and Details */}
          <div className="lg:col-span-2 space-y-6 md:space-y-8">
            {/* Header */}
            <div>
              <h1 className="text-2xl md:text-3xl lg:text-4xl font-bold text-gray-900 mb-4 mobile-text">{turf.name}</h1>
              <div className="flex flex-wrap items-center gap-3 md:gap-4 mb-4">
                <div className="flex items-center space-x-1">
                  <Star className="w-4 md:w-5 h-4 md:h-5 text-yellow-500 fill-current" />
                  <span className="font-semibold mobile-text">{turf.rating}</span>
                  <span className="text-gray-600 mobile-text">({turf.reviews} reviews)</span>
                </div>
                <div className="flex items-center space-x-1 text-gray-600">
                  <MapPin className="w-4 h-4" />
                  <span className="mobile-text">{turf.location}</span>
                </div>
                <div className="flex items-center space-x-1 text-gray-600">
                  <Clock className="w-4 h-4" />
                  <span className="mobile-text">6 AM - 11 PM</span>
                </div>
              </div>
              
              {/* Sports Tags */}
              <div className="flex flex-wrap gap-2">
                {turf.sports.map((sport: string) => (
                  <span key={sport} className="bg-blue-100 text-blue-600 px-3 py-1 rounded-full text-sm font-medium mobile-text">
                    {sport}
                  </span>
                ))}
              </div>
            </div>

            {/* Image Carousel */}
            <div className="mobile-card">
              <ImageCarousel images={turf.images} />
            </div>

            {/* Facilities */}
            <div>
              <h3 className="text-xl md:text-2xl font-bold text-gray-900 mb-4 mobile-text">Facilities</h3>
              <div className="grid grid-cols-2 md:grid-cols-4 gap-3 md:gap-4">
                {turf.facilities.map((facility: string) => {
                  const IconComponent = getFacilityIcon(facility);
                  return (
                    <div key={facility} className="flex items-center space-x-2 md:space-x-3 p-3 md:p-4 bg-gray-100 rounded-xl mobile-card">
                      <IconComponent className="w-5 md:w-6 h-5 md:h-6 text-blue-600" />
                      <span className="font-medium text-gray-800 mobile-text">{facility}</span>
                    </div>
                  );
                })}
              </div>
            </div>

            {/* Description */}
            <div>
              <h3 className="text-xl md:text-2xl font-bold text-gray-900 mb-4 mobile-text">About This Turf</h3>
              <p className="text-gray-600 leading-relaxed mobile-text">
                {turf.description || `Experience premium sports facilities at ${turf.name}. Our well-maintained turf provides the perfect environment for your game with professional-grade equipment and amenities. Located in the heart of ${turf.location}, we offer convenient access and ample parking for all players.`}
              </p>
            </div>
          </div>

          {/* Right Column - Booking */}
          <div className="space-y-4 md:space-y-6">
            {/* Pricing Card */}
            <div className="bg-white rounded-2xl shadow-lg p-4 md:p-6 lg:sticky lg:top-24">
              <div className="text-center mb-4 md:mb-6">
                <span className="text-2xl md:text-3xl font-bold text-blue-600">₹{turf.pricePerHour}</span>
                <span className="text-gray-600 ml-2 mobile-text">/hour</span>
              </div>

              {/* Date Selection */}
              <div className="mb-4 md:mb-6">
                <label className="block text-sm font-medium text-gray-700 mb-2 mobile-text">Select Date</label>
                <input
                  type="date"
                  value={selectedDate.toISOString().split('T')[0]}
                  onChange={(e) => setSelectedDate(new Date(e.target.value))}
                  min={new Date().toISOString().split('T')[0]}
                  className="w-full p-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent mobile-input"
                />
              </div>

              {/* Selected Slots Summary */}
              {selectedSlots.length > 0 && (
                <div className="mb-4 md:mb-6 p-3 md:p-4 bg-blue-50 rounded-lg">
                  <h4 className="font-semibold text-gray-900 mb-2 mobile-text">Selected Slots</h4>
                  <div className="space-y-1">
                    {selectedSlots.map((slot) => (
                      <div key={slot} className="flex justify-between text-sm mobile-text">
                        <span>{slot}</span>
                        <span>₹{turf.pricePerHour}</span>
                      </div>
                    ))}
                  </div>
                  <div className="border-t border-blue-200 mt-2 pt-2">
                    <div className="flex justify-between font-semibold mobile-text">
                      <span>Total</span>
                      <span>₹{totalAmount}</span>
                    </div>
                  </div>
                </div>
              )}

              <button
                onClick={handleBookNow}
                disabled={selectedSlots.length === 0}
                className={`w-full py-3 md:py-4 rounded-xl font-semibold text-white transition-all mobile-button ${
                  selectedSlots.length > 0
                    ? 'bg-blue-600 hover:bg-blue-700 hover:shadow-lg'
                    : 'bg-gray-300 cursor-not-allowed'
                }`}
              >
                {selectedSlots.length > 0 ? `Book Now - ₹${totalAmount}` : 'Select Slots to Book'}
              </button>

              {/* Modern View in Map Button */}
              <button
                onClick={() => window.open(`https://www.google.com/maps/dir/?api=1&destination=${encodeURIComponent(turf.location)}`, '_blank')}
                className="w-full mt-3 py-3 md:py-3 rounded-xl font-medium transition-all duration-300 mobile-button flex items-center justify-center space-x-2 bg-gradient-to-r from-green-500 to-emerald-600 hover:from-green-600 hover:to-emerald-700 text-white shadow-lg hover:shadow-xl transform hover:scale-105 border-0 group relative overflow-hidden"
              >
                <MapPin className="w-4 h-4 group-hover:animate-bounce transition-transform duration-300" />
                <span>View in Map</span>
                <div className="absolute inset-0 bg-gradient-to-r from-green-400 to-emerald-500 rounded-xl opacity-0 group-hover:opacity-100 transition-opacity duration-300 -z-10"></div>
                <div className="absolute inset-0 bg-white/20 opacity-0 group-hover:opacity-100 transition-opacity duration-300 rounded-xl"></div>
              </button>
            </div>
          </div>
        </div>

        {/* Slot Selection Grid */}
        <div className="mt-8 md:mt-12">
          <h3 className="text-xl md:text-2xl font-bold text-gray-900 mb-4 md:mb-6 mobile-text">Available Time Slots</h3>
          <SlotGrid
            turfId={turf.id}
            selectedDate={selectedDate}
            selectedSlots={selectedSlots}
            onSlotsChange={setSelectedSlots}
            pricePerHour={turf.pricePerHour}
          />
        </div>
      </div>

      {/* Mobile Sticky Button */}
      <div className="fixed bottom-0 left-0 right-0 p-4 bg-white shadow-lg border-t border-gray-200 md:hidden safe-area-padding">
        <button
          onClick={handleBookNow}
          disabled={selectedSlots.length === 0}
          className={`w-full py-4 rounded-xl font-semibold text-white transition-all mobile-button ${
            selectedSlots.length > 0
              ? 'bg-blue-600 hover:bg-blue-700'
              : 'bg-gray-300 cursor-not-allowed'
          }`}
        >
          {selectedSlots.length > 0 ? `Book Now - ₹${totalAmount}` : 'Select Slots to Book'}
        </button>
      </div>
    </div>
  );
};

export default TurfDetailPage;