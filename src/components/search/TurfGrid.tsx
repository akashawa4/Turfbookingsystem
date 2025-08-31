import React, { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { Star, MapPin, Clock, ArrowRight, Heart, Eye, Users, Award, Shield, Zap, Image as ImageIcon } from 'lucide-react';
import { useAuth } from '../../contexts/AuthContext';

interface Turf {
  id: string;
  name: string;
  location: string;
  pricePerHour: number;
  rating: number;
  reviews: number;
  sports: string[];
  facilities: string[];
  images: string[];
  isAvailable: boolean;
}

interface TurfGridProps {
  turfs: Turf[];
  loading?: boolean;
}

const TurfGrid: React.FC<TurfGridProps> = ({ turfs, loading = false }) => {
  const { user } = useAuth();
  const navigate = useNavigate();

  const handleBookNow = (turfId: string) => {
    if (!user) {
      // Redirect to login page if user is not authenticated
      navigate('/login', { state: { from: `/turf/${turfId}` } });
    } else {
      // Navigate to booking page if user is logged in
      navigate(`/turf/${turfId}`);
    }
  };

  const getFallbackImage = (sport: string) => {
    const sportImages = {
      football: 'https://images.pexels.com/photos/46798/the-ball-stadion-football-the-pitch-46798.jpeg?auto=compress&cs=tinysrgb&w=800',
      cricket: 'https://images.pexels.com/photos/163387/cricket-player-batsman-batting-163387.jpeg?auto=compress&cs=tinysrgb&w=800',
      tennis: 'https://images.pexels.com/photos/209977/pexels-photo-209977.jpeg?auto=compress&cs=tinysrgb&w=800',
      basketball: 'https://images.pexels.com/photos/1752757/pexels-photo-1752757.jpeg?auto=compress&cs=tinysrgb&w=800',
      badminton: 'https://images.pexels.com/photos/1263426/pexels-photo-1263426.jpeg?auto=compress&cs=tinysrgb&w=800',
      swimming: 'https://images.pexels.com/photos/863988/pexels-photo-863988.jpeg?auto=compress&cs=tinysrgb&w=800',
      volleyball: 'https://images.pexels.com/photos/1752757/pexels-photo-1752757.jpeg?auto=compress&cs=tinysrgb&w=800'
    };
    return sportImages[sport.toLowerCase() as keyof typeof sportImages] || 'https://images.pexels.com/photos/274506/pexels-photo-274506.jpeg?auto=compress&cs=tinysrgb&w=800';
  };

  const TurfCard = ({ turf }: { turf: Turf }) => {
    const [imageError, setImageError] = useState(false);
    const [imageSrc, setImageSrc] = useState(turf.images[0] || getFallbackImage(turf.sports[0]));

    const handleImageError = () => {
      if (!imageError) {
        setImageError(true);
        setImageSrc(getFallbackImage(turf.sports[0]));
      }
    };

    return (
      <div className="group relative bg-white rounded-2xl shadow-lg overflow-hidden hover:shadow-2xl transition-all duration-500 hover:-translate-y-2 border border-gray-100 hover:border-blue-200/50 flex flex-col h-full">
        {/* Background Pattern */}
        <div className="absolute inset-0 bg-gradient-to-br from-blue-50/30 via-transparent to-purple-50/30 opacity-0 group-hover:opacity-100 transition-opacity duration-500"></div>
        
        {/* Image Section - Fixed Height */}
        <div className="relative overflow-hidden h-48 md:h-auto flex-shrink-0">
          <img
            src={imageSrc}
            alt={turf.name}
            className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-700 ease-out"
            onError={handleImageError}
            loading="lazy"
          />
          
          {/* Gradient Overlay */}
          <div className="absolute inset-0 bg-gradient-to-t from-black/60 via-black/20 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-500" />
          
          {/* Top Badges */}
          <div className="absolute top-3 left-3 right-3 flex justify-between items-start">
            {/* Availability Badge */}
            {turf.isAvailable && (
              <div className="bg-gradient-to-r from-green-500 to-emerald-600 text-white px-3 py-1 rounded-full text-xs font-bold shadow-lg">
                Available
              </div>
            )}
            
            {/* Rating Badge */}
            <div className="bg-white/95 backdrop-blur-sm rounded-xl px-2 py-1 flex items-center space-x-1 shadow-lg">
              <Star className="w-3 h-3 text-yellow-500 fill-current" />
              <span className="text-xs font-bold text-gray-800">{turf.rating}</span>
            </div>
          </div>
          
          {/* Premium Badge */}
          {turf.rating >= 4.5 && (
            <div className="absolute top-3 left-1/2 transform -translate-x-1/2">
              <div className="bg-gradient-to-r from-amber-500 to-yellow-500 text-white px-2 py-1 rounded-full text-xs font-bold shadow-lg">
                <Award className="w-3 h-3 inline mr-1" />
                Premium
              </div>
            </div>
          )}
          
          {/* Hover Action Overlay */}
          <div className="absolute inset-0 flex items-center justify-center opacity-0 group-hover:opacity-100 transition-all duration-500">
            <div className="flex space-x-3">
              <button className="bg-white/95 backdrop-blur-sm p-3 rounded-full shadow-xl hover:bg-white transition-all duration-300 transform hover:scale-110">
                <Heart className="w-5 h-5 text-red-500" />
              </button>
              <Link
                to={`/turf/${turf.id}`}
                className="bg-white/95 backdrop-blur-sm p-3 rounded-full shadow-xl hover:bg-white transition-all duration-300 transform hover:scale-110"
              >
                <Eye className="w-5 h-5 text-blue-500" />
              </Link>
              <button 
                onClick={() => window.open(`https://www.google.com/maps/dir/?api=1&destination=${encodeURIComponent(turf.location)}`, '_blank')}
                className="bg-gradient-to-r from-green-500 to-emerald-600 hover:from-green-600 hover:to-emerald-700 text-white p-3 rounded-full shadow-xl hover:shadow-2xl transition-all duration-300 transform hover:scale-110 hover:rotate-3 border-0 group relative overflow-hidden"
              >
                <MapPin className="w-5 h-5 group-hover:animate-bounce transition-transform duration-300" />
                <div className="absolute inset-0 bg-gradient-to-r from-green-400 to-emerald-500 rounded-full opacity-0 group-hover:opacity-100 transition-opacity duration-300 -z-10"></div>
                <div className="absolute inset-0 bg-white/20 opacity-0 group-hover:opacity-100 transition-opacity duration-300 rounded-full"></div>
              </button>
            </div>
          </div>
          
          {/* Verified Facility Indicator */}
          <div className="absolute bottom-3 left-3">
            <div className="bg-gradient-to-r from-green-500 to-emerald-600 text-white px-2 py-1 rounded-full text-xs font-bold shadow-lg flex items-center space-x-1">
              <Shield className="w-3 h-3" />
              <span>Verified</span>
            </div>
          </div>
        </div>
        
        {/* Content Section - Flexible Height */}
        <div className="flex flex-col flex-grow p-4">
          {/* Turf Name and Location */}
          <div className="mb-3">
            <h3 className="text-lg font-bold text-gray-900 mb-1 group-hover:text-blue-600 transition-colors duration-300">
              {turf.name}
            </h3>
            <div className="flex items-center text-gray-600 group-hover:text-gray-700 transition-colors duration-300">
              <MapPin className="w-4 h-4 mr-1 text-blue-500" />
              <span className="text-sm font-medium">{turf.location}</span>
            </div>
          </div>
          
          {/* Price and Rating */}
          <div className="flex items-center justify-between mb-3">
            <div className="flex items-center space-x-1">
              <span className="text-xl font-bold text-blue-600">₹{turf.pricePerHour}</span>
              <span className="text-gray-500 text-sm">/hour</span>
            </div>
            <div className="flex items-center space-x-1">
              <Star className="w-4 h-4 text-yellow-500 fill-current" />
              <span className="text-sm font-medium text-gray-700">{turf.rating}</span>
              <span className="text-gray-500 text-sm">({turf.reviews})</span>
            </div>
          </div>
          
          {/* Sports Tags */}
          <div className="flex flex-wrap gap-1.5 mb-4">
            {turf.sports.slice(0, 3).map((sport) => (
              <span key={sport} className="inline-flex items-center space-x-1 bg-gradient-to-r from-blue-100 to-purple-100 text-blue-700 px-2 py-1 rounded-full text-xs font-medium border border-blue-200/50">
                <Zap className="w-3 h-3" />
                <span>{sport}</span>
              </span>
            ))}
            {turf.sports.length > 3 && (
              <span className="text-gray-500 text-xs font-medium bg-gray-100 px-2 py-1 rounded-full">
                +{turf.sports.length - 3} more
              </span>
            )}
          </div>
          
          {/* Facilities Preview */}
          <div className="flex items-center justify-between mb-4">
            <div className="flex items-center space-x-2">
              {turf.facilities.slice(0, 2).map((facility, index) => (
                <div key={facility} className="flex items-center space-x-1 text-gray-500 group-hover:text-gray-600 transition-colors duration-300">
                  <div className="w-1.5 h-2 bg-blue-400 rounded-full animate-pulse" style={{ animationDelay: `${index * 200}ms` }}></div>
                  <span className="text-xs font-medium">{facility}</span>
                </div>
              ))}
            </div>
            <div className="flex items-center space-x-1 text-gray-500">
              <Users className="w-3 h-3" />
              <span className="text-xs font-medium">{turf.reviews} reviews</span>
            </div>
          </div>
          
          {/* Spacer to Push Button to Bottom */}
          <div className="flex-grow"></div>
          
          {/* CTA Button */}
          <button
            onClick={() => handleBookNow(turf.id)}
            className="w-full bg-gradient-to-r from-blue-600 to-purple-600 hover:from-blue-700 hover:to-purple-700 text-white py-3 px-4 rounded-xl font-semibold transition-all duration-300 transform hover:scale-105 hover:shadow-lg group-hover:shadow-xl"
          >
            Book Now
          </button>

          {/* View in Map Button - Below Book Now */}
          <div className="mt-3">
            <button
              onClick={() => window.open(`https://www.google.com/maps/dir/?api=1&destination=${encodeURIComponent(turf.location)}`, '_blank')}
              className="w-full py-3 px-4 rounded-xl font-medium transition-all duration-300 flex items-center justify-center space-x-2 bg-gradient-to-r from-green-500 to-emerald-600 hover:from-green-600 hover:to-emerald-700 text-white shadow-lg hover:shadow-xl transform hover:scale-105 border-0 group relative overflow-hidden"
            >
              <MapPin className="w-4 h-4 group-hover:animate-bounce transition-transform duration-300" />
              <span>View in Map</span>
              <div className="absolute inset-0 bg-gradient-to-r from-green-400 to-emerald-500 rounded-xl opacity-0 group-hover:opacity-100 transition-opacity duration-300 -z-10"></div>
              <div className="absolute inset-0 bg-white/20 opacity-0 group-hover:opacity-100 transition-opacity duration-300 rounded-xl"></div>
            </button>
          </div>
        </div>
        
        {/* Decorative Corner Elements */}
        <div className="absolute top-0 right-0 w-16 h-16 bg-gradient-to-br from-blue-600/10 to-purple-600/10 rounded-bl-full opacity-0 group-hover:opacity-100 transition-opacity duration-500"></div>
        <div className="absolute bottom-0 left-0 w-12 h-12 bg-gradient-to-tr from-green-500/10 to-emerald-500/10 rounded-tr-full opacity-0 group-hover:opacity-100 transition-opacity duration-500"></div>
      </div>
    );
  };

  if (loading) {
    return (
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
        {[...Array(8)].map((_, index) => (
          <div key={index} className="bg-white rounded-2xl shadow-lg overflow-hidden animate-pulse">
            <div className="h-48 bg-gray-300"></div>
            <div className="p-4 space-y-3">
              <div className="h-4 bg-gray-300 rounded"></div>
              <div className="h-3 bg-gray-300 rounded w-3/4"></div>
              <div className="h-3 bg-gray-300 rounded w-1/2"></div>
              <div className="h-10 bg-gray-300 rounded"></div>
            </div>
          </div>
        ))}
      </div>
    );
  }

  if (turfs.length === 0) {
    return (
      <div className="text-center py-12">
        <div className="w-24 h-24 bg-gray-100 rounded-full flex items-center justify-center mx-auto mb-4">
          <ImageIcon className="w-12 h-12 text-gray-400" />
        </div>
        <h3 className="text-xl font-semibold text-gray-900 mb-2">No turfs found</h3>
        <p className="text-gray-600">Try adjusting your search criteria or filters.</p>
      </div>
    );
  }

  return (
    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6 items-stretch">
      {turfs.map((turf) => (
        <TurfCard key={turf.id} turf={turf} />
      ))}
    </div>
  );
};

export default TurfGrid;