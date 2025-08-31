import React, { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { Star, MapPin, Clock, ArrowRight, Heart, Eye, Users, Award, Shield, Zap, Image as ImageIcon } from 'lucide-react';
import { getFeaturedTurfs, getTurfsByCategory } from '../../data/turfs';
import { useAuth } from '../../contexts/AuthContext';

const FeaturedTurfs = () => {
  const featuredTurfs = getFeaturedTurfs();
  const topRatedTurfs = getTurfsByCategory('top-rated').slice(0, 4);
  const nearbyTurfs = getTurfsByCategory('nearby').slice(0, 4);
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

  // Fallback images for different sports
  const getFallbackImage = (sports: string[]) => {
    const sport = sports[0]?.toLowerCase();
    switch (sport) {
      case 'cricket':
        return 'https://images.pexels.com/photos/274506/pexels-photo-274506.jpeg?auto=compress&cs=tinysrgb&w=800';
      case 'football':
        return 'https://images.pexels.com/photos/1171084/pexels-photo-1171084.jpeg?auto=compress&cs=tinysrgb&w=800';
      case 'tennis':
        return 'https://images.pexels.com/photos/209977/pexels-photo-209977.jpeg?auto=compress&cs=tinysrgb&w=800';
      case 'badminton':
        return 'https://images.pexels.com/photos/1263426/pexels-photo-1263426.jpeg?auto=compress&cs=tinysrgb&w=800';
      case 'swimming':
        return 'https://images.pexels.com/photos/863988/pexels-photo-863988.jpeg?auto=compress&cs=tinysrgb&w=800';
      case 'basketball':
        return 'https://images.pexels.com/photos/1752757/pexels-photo-1752757.jpeg?auto=compress&cs=tinysrgb&w=800';
      case 'volleyball':
        return 'https://images.pexels.com/photos/1752757/pexels-photo-1752757.jpeg?auto=compress&cs=tinysrgb&w=800';
      default:
        return 'https://images.pexels.com/photos/274506/pexels-photo-274506.jpeg?auto=compress&cs=tinysrgb&w=800';
    }
  };

  const TurfCard = ({ turf }: { turf: any }) => {
    const [imageError, setImageError] = useState(false);
    const [imageSrc, setImageSrc] = useState(turf.images[0] || getFallbackImage(turf.sports));

    const handleImageError = () => {
      if (!imageError) {
        setImageError(true);
        setImageSrc(getFallbackImage(turf.sports));
      }
    };

    return (
      <div className="group relative bg-white rounded-3xl shadow-lg overflow-hidden hover:shadow-2xl transition-all duration-700 hover:-translate-y-4 border border-gray-100 hover:border-blue-200/50 flex flex-col h-full">
        {/* Background Pattern */}
        <div className="absolute inset-0 bg-gradient-to-br from-blue-50/30 via-transparent to-purple-50/30 opacity-0 group-hover:opacity-100 transition-opacity duration-500"></div>
        
        {/* Image Section - Fixed Height */}
        <div className="relative overflow-hidden h-64 flex-shrink-0">
          <img
            src={imageSrc}
            alt={turf.name}
            className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-1000 ease-out"
            onError={handleImageError}
            loading="lazy"
          />
          
          {/* Multiple Gradient Overlays */}
          <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-black/20 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-500" />
          <div className="absolute inset-0 bg-gradient-to-r from-blue-600/20 to-purple-600/20 opacity-0 group-hover:opacity-100 transition-opacity duration-700" />
          
          {/* Top Badges Row */}
          <div className="absolute top-4 left-4 right-4 flex justify-between items-start">
            {/* Availability Badge */}
            {turf.isAvailable && (
              <div className="relative">
                <div className="bg-gradient-to-r from-green-500 to-emerald-600 text-white px-4 py-2 rounded-full text-xs font-bold shadow-lg border border-white/20 backdrop-blur-sm">
                  Available Now
                </div>
                <div className="absolute inset-0 bg-gradient-to-r from-green-500 to-emerald-600 rounded-full blur opacity-75 animate-pulse"></div>
              </div>
            )}
            
            {/* Rating Badge */}
            <div className="relative">
              <div className="bg-white/95 backdrop-blur-sm rounded-2xl px-3 py-2 flex items-center space-x-2 shadow-xl border border-white/20">
                <Star className="w-4 h-4 text-yellow-500 fill-current" />
                <span className="text-sm font-bold text-gray-800">{turf.rating}</span>
              </div>
              <div className="absolute inset-0 bg-white/95 rounded-2xl blur opacity-75"></div>
            </div>
          </div>
          
          {/* Premium Badge */}
          {turf.rating >= 4.5 && (
            <div className="absolute top-4 left-1/2 transform -translate-x-1/2">
              <div className="bg-gradient-to-r from-amber-500 to-yellow-500 text-white px-3 py-1 rounded-full text-xs font-bold shadow-lg border border-white/20 backdrop-blur-sm flex items-center space-x-1">
                <Award className="w-3 h-3" />
                <span>Premium</span>
              </div>
            </div>
          )}
          
          {/* Hover Action Overlay */}
          <div className="absolute inset-0 flex items-center justify-center opacity-0 group-hover:opacity-100 transition-all duration-500">
            <div className="flex space-x-4">
              <button className="bg-white/95 backdrop-blur-sm p-4 rounded-full shadow-2xl hover:bg-white transition-all duration-300 transform hover:scale-110 hover:shadow-3xl border border-white/20">
                <Heart className="w-6 h-6 text-red-500" />
              </button>
              <button className="bg-white/95 backdrop-blur-sm p-4 rounded-full shadow-2xl hover:bg-white transition-all duration-300 transform hover:scale-110 hover:shadow-3xl border border-white/20">
                <Eye className="w-6 h-6 text-blue-500" />
              </button>
              <button 
                onClick={() => window.open(`https://www.google.com/maps/dir/?api=1&destination=${encodeURIComponent(turf.location)}`, '_blank')}
                className="bg-gradient-to-r from-green-500 to-emerald-600 hover:from-green-600 hover:to-emerald-700 text-white p-4 rounded-full shadow-2xl hover:shadow-3xl transition-all duration-300 transform hover:scale-110 hover:rotate-3 border-0 group relative overflow-hidden"
              >
                <MapPin className="w-6 h-6 group-hover:animate-bounce transition-transform duration-300" />
                <div className="absolute inset-0 bg-gradient-to-r from-green-400 to-emerald-500 rounded-full opacity-0 group-hover:opacity-100 transition-opacity duration-300 -z-10"></div>
                <div className="absolute inset-0 bg-white/20 opacity-0 group-hover:opacity-100 transition-opacity duration-300 rounded-full"></div>
              </button>
            </div>
          </div>
          
          {/* Verified Facility Indicator */}
          <div className="absolute bottom-4 left-4">
            <div className="bg-gradient-to-r from-green-500 to-emerald-600 text-white px-3 py-1 rounded-full text-xs font-bold shadow-lg border border-white/20 backdrop-blur-sm flex items-center space-x-1">
              <Shield className="w-3 h-3" />
              <span>Verified</span>
            </div>
          </div>
        </div>
        
        {/* Content Section - Flexible Height */}
        <div className="flex flex-col flex-grow p-6">
          {/* Turf Name and Location */}
          <div className="mb-4">
            <h3 className="text-xl font-bold text-gray-900 mb-2 group-hover:text-blue-600 transition-colors duration-300">
              {turf.name}
            </h3>
            <div className="flex items-center text-gray-600 group-hover:text-gray-700 transition-colors duration-300">
              <MapPin className="w-4 h-4 mr-2 text-blue-500" />
              <span className="text-sm font-medium">{turf.location}</span>
            </div>
          </div>
          
          {/* Price and Rating */}
          <div className="flex items-center justify-between mb-4">
            <div className="flex items-center space-x-2">
              <span className="text-2xl font-bold text-blue-600">₹{turf.pricePerHour}</span>
              <span className="text-gray-500 text-sm">/hour</span>
            </div>
            <div className="flex items-center space-x-1">
              <Star className="w-4 h-4 text-yellow-500 fill-current" />
              <span className="text-sm font-medium text-gray-700">{turf.rating}</span>
              <span className="text-gray-500 text-sm">({turf.reviews})</span>
            </div>
          </div>
          
          {/* Sports Tags */}
          <div className="flex flex-wrap gap-2 mb-6">
            {turf.sports.slice(0, 3).map((sport: string) => (
              <span key={sport} className="inline-flex items-center space-x-1 bg-gradient-to-r from-blue-100 to-purple-100 text-blue-700 px-3 py-1.5 rounded-full text-xs font-medium border border-blue-200/50">
                <Zap className="w-3 h-3" />
                <span>{sport}</span>
              </span>
            ))}
            {turf.sports.length > 3 && (
              <span className="text-gray-500 text-xs font-medium bg-gray-100 px-2 py-1.5 rounded-full">
                +{turf.sports.length - 3} more
              </span>
            )}
          </div>
          
          {/* Facilities Preview */}
          <div className="flex items-center justify-between mb-6">
            <div className="flex items-center space-x-3">
              {turf.facilities.slice(0, 3).map((facility: string, index: number) => (
                <div key={facility} className="flex items-center space-x-1 text-gray-500 group-hover:text-gray-600 transition-colors duration-300">
                  <div className="w-2 h-2 bg-blue-400 rounded-full animate-pulse" style={{ animationDelay: `${index * 200}ms` }}></div>
                  <span className="text-xs font-medium">{facility}</span>
                </div>
              ))}
            </div>
            <div className="flex items-center space-x-1 text-gray-500">
              <Users className="w-4 h-4" />
              <span className="text-xs font-medium">{turf.reviews} reviews</span>
            </div>
          </div>
          
          {/* Spacer to Push Button to Bottom */}
          <div className="flex-grow"></div>
          
          {/* Enhanced CTA Button - Always at Bottom */}
          <div className="relative mt-auto">
            <button
              onClick={() => handleBookNow(turf.id)}
              className="group/btn w-full bg-gradient-to-r from-blue-600 to-purple-600 hover:from-blue-700 hover:to-purple-700 text-white px-6 py-4 rounded-2xl font-semibold transition-all duration-300 transform hover:scale-105 hover:shadow-xl shadow-lg flex items-center justify-center space-x-2 overflow-hidden"
            >
              <div className="absolute inset-0 bg-gradient-to-r from-blue-600 to-purple-600 opacity-0 group-hover/btn:opacity-100 transition-opacity duration-300"></div>
              <span className="relative z-10">Book Now</span>
              <ArrowRight className="w-5 h-5 transform group-hover/btn:translate-x-1 transition-transform duration-300 relative z-10" />
            </button>
            
            {/* Button Glow Effect */}
            <div className="absolute inset-0 bg-gradient-to-r from-blue-600 to-purple-600 rounded-2xl blur opacity-75 group-hover:opacity-100 transition-opacity duration-500 -z-10"></div>
          </div>

          {/* View in Map Button - Below Book Now */}
          <div className="mt-3">
            <button
              onClick={() => window.open(`https://www.google.com/maps/dir/?api=1&destination=${encodeURIComponent(turf.location)}`, '_blank')}
              className="w-full py-3 px-6 rounded-xl font-medium transition-all duration-300 flex items-center justify-center space-x-2 bg-gradient-to-r from-green-500 to-emerald-600 hover:from-green-600 hover:to-emerald-700 text-white shadow-lg hover:shadow-xl transform hover:scale-105 border-0 group relative overflow-hidden"
            >
              <MapPin className="w-4 h-4 group-hover:animate-bounce transition-transform duration-300" />
              <span>View in Map</span>
              <div className="absolute inset-0 bg-gradient-to-r from-green-400 to-emerald-500 rounded-xl opacity-0 group-hover:opacity-100 transition-opacity duration-300 -z-10"></div>
              <div className="absolute inset-0 bg-white/20 opacity-0 group-hover:opacity-100 transition-opacity duration-300 rounded-xl"></div>
            </button>
          </div>
        </div>
        
        {/* Decorative Corner Elements */}
        <div className="absolute top-0 right-0 w-20 h-20 bg-gradient-to-br from-blue-600/10 to-purple-600/10 rounded-bl-full opacity-0 group-hover:opacity-100 transition-opacity duration-500"></div>
        <div className="absolute bottom-0 left-0 w-16 h-16 bg-gradient-to-tr from-green-500/10 to-emerald-500/10 rounded-tr-full opacity-0 group-hover:opacity-100 transition-opacity duration-500"></div>
      </div>
    );
  };

  const Section = ({ title, description, turfs }: { title: string, description: string, turfs: any[] }) => (
    <div className="mb-24">
      <div className="text-center mb-16">
        <div className="inline-block mb-6">
          <h3 className="text-4xl md:text-5xl font-bold text-gray-900 mb-4">{title}</h3>
          <div className="w-32 h-1.5 bg-gradient-to-r from-blue-600 to-purple-600 mx-auto rounded-full shadow-lg"></div>
        </div>
        <p className="text-xl text-gray-600 max-w-3xl mx-auto leading-relaxed">{description}</p>
      </div>
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8 items-stretch">
        {turfs.map((turf) => (
          <TurfCard key={turf.id} turf={turf} />
        ))}
      </div>
    </div>
  );

  return (
    <section className="py-24 bg-gradient-to-br from-gray-50 via-white to-blue-50/30 relative overflow-hidden">
      {/* Background Decorative Elements */}
      <div className="absolute top-20 left-10 w-32 h-32 bg-gradient-to-br from-blue-400/20 to-purple-400/20 rounded-full blur-3xl animate-float"></div>
      <div className="absolute bottom-20 right-10 w-40 h-40 bg-gradient-to-br from-green-400/20 to-blue-400/20 rounded-full blur-3xl animate-float animation-delay-1000"></div>
      
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
        <Section
          title="Top Rated Turfs"
          description="Highest rated turfs by our community with premium facilities and excellent service"
          turfs={topRatedTurfs}
        />
        
        <Section
          title="Nearby Turfs"
          description="Convenient locations in your area with easy accessibility and flexible timing"
          turfs={nearbyTurfs}
        />
        
        <Section
          title="Recently Added"
          description="New turfs with modern facilities, latest equipment and innovative features"
          turfs={featuredTurfs}
        />
      </div>
    </section>
  );
};

export default FeaturedTurfs;