import React, { useState, useEffect } from 'react';
import { Search, Play, ArrowRight } from 'lucide-react';
import { useNavigate } from 'react-router-dom';

const HeroBanner = () => {
  const [currentSlide, setCurrentSlide] = useState(0);
  const [searchQuery, setSearchQuery] = useState('');
  const navigate = useNavigate();

  const slides = [
    {
      image: 'https://images.pexels.com/photos/274506/pexels-photo-274506.jpeg?auto=compress&cs=tinysrgb&w=1200',
      title: 'Book Premium Cricket Turfs',
      subtitle: 'Professional quality pitches with all facilities',
      gradient: 'from-orange-500/80 to-red-600/80'
    },
    {
      image: 'https://images.pexels.com/photos/1171084/pexels-photo-1171084.jpeg?auto=compress&cs=tinysrgb&w=1200',
      title: 'Football Grounds Available',
      subtitle: 'FIFA standard grass and artificial turf options',
      gradient: 'from-green-500/80 to-emerald-600/80'
    },
    {
      image: 'https://images.pexels.com/photos/209977/pexels-photo-209977.jpeg?auto=compress&cs=tinysrgb&w=1200',
      title: 'Tennis Courts Ready',
      subtitle: 'Indoor and outdoor courts with lighting',
      gradient: 'from-yellow-500/80 to-amber-600/80'
    }
  ];

  useEffect(() => {
    const timer = setInterval(() => {
      setCurrentSlide((prev) => (prev + 1) % slides.length);
    }, 5000);
    return () => clearInterval(timer);
  }, []);

  const handleSearch = (e: React.FormEvent) => {
    e.preventDefault();
    if (searchQuery.trim()) {
      navigate(`/search?q=${encodeURIComponent(searchQuery)}`);
    }
  };

  return (
    <div className="relative h-[500px] md:h-[600px] lg:h-[700px] overflow-hidden">
      {/* Background Carousel */}
      <div className="absolute inset-0">
        {slides.map((slide, index) => (
          <div
            key={index}
            className={`absolute inset-0 transition-all duration-1000 ease-in-out ${
              index === currentSlide ? 'opacity-100 scale-100' : 'opacity-0 scale-105'
            }`}
          >
            <img
              src={slide.image}
              alt={slide.title}
              className="w-full h-full object-cover"
              loading="eager"
            />
            <div className={`absolute inset-0 bg-gradient-to-br ${slide.gradient}`} />
            <div className="absolute inset-0 bg-black/20" />
          </div>
        ))}
      </div>

      {/* Content Overlay */}
      <div className="relative z-10 h-full flex items-center justify-center px-4 mobile-padding">
        <div className="text-center text-white max-w-5xl w-full">
          <div className="mb-6">
            <h1 className="text-3xl md:text-5xl lg:text-6xl xl:text-7xl font-bold mb-4 leading-tight animate-fade-in-up mobile-text">
              {slides[currentSlide].title}
            </h1>
            <p className="text-lg md:text-xl lg:text-2xl xl:text-3xl mb-6 md:mb-8 opacity-95 font-light animate-fade-in-up animation-delay-200 mobile-text">
              {slides[currentSlide].subtitle}
            </p>
          </div>

          {/* Enhanced Search CTA */}
          <form onSubmit={handleSearch} className="max-w-lg mx-auto mb-6 md:mb-8 animate-fade-in-up animation-delay-400">
            <div className="group relative">
              <div className="absolute inset-0 bg-gradient-to-r from-blue-600 to-purple-600 rounded-2xl blur opacity-75 group-hover:opacity-100 transition-opacity duration-300"></div>
              <div className="relative flex bg-white/95 backdrop-blur-sm rounded-2xl shadow-2xl overflow-hidden border border-white/20">
                <input
                  type="text"
                  value={searchQuery}
                  onChange={(e) => setSearchQuery(e.target.value)}
                  placeholder="Search for turfs, sports..."
                  className="flex-1 px-4 md:px-6 py-3 md:py-4 text-gray-800 focus:outline-none bg-transparent placeholder-gray-500 mobile-input"
                />
                <button
                  type="submit"
                  className="bg-gradient-to-r from-blue-600 to-purple-600 hover:from-blue-700 hover:to-purple-700 px-4 md:px-8 py-3 md:py-4 transition-all duration-300 transform hover:scale-105 hover:shadow-lg mobile-button"
                >
                  <Search className="w-4 md:w-5 h-4 md:h-5 text-white" />
                </button>
              </div>
            </div>
          </form>

          {/* Enhanced CTA Button */}
          <div className="animate-fade-in-up animation-delay-600">
            <button className="group inline-flex items-center space-x-2 md:space-x-3 text-white hover:text-blue-200 transition-all duration-300 transform hover:scale-105 mobile-button">
              <div className="relative">
                <div className="absolute inset-0 bg-white/20 rounded-full blur group-hover:blur-md transition-all duration-300"></div>
                <div className="relative bg-white/10 backdrop-blur-sm rounded-full p-2 md:p-3 group-hover:bg-white/20 transition-all duration-300">
                  <Play className="w-4 md:w-6 h-4 md:h-6" />
                </div>
              </div>
              <span className="text-sm md:text-lg font-medium mobile-text">Watch How It Works</span>
              <ArrowRight className="w-4 md:w-5 h-4 md:h-5 transform group-hover:translate-x-1 transition-transform duration-300" />
            </button>
          </div>
        </div>
      </div>

      {/* Enhanced Slide Indicators */}
      <div className="absolute bottom-4 md:bottom-8 left-1/2 transform -translate-x-1/2 flex space-x-2 md:space-x-3">
        {slides.map((_, index) => (
          <button
            key={index}
            onClick={() => setCurrentSlide(index)}
            className={`group relative transition-all duration-300 ${
              index === currentSlide ? 'scale-125' : 'scale-100'
            }`}
          >
            <div className={`w-3 md:w-4 h-3 md:h-4 rounded-full transition-all duration-300 ${
              index === currentSlide 
                ? 'bg-white shadow-lg shadow-white/50' 
                : 'bg-white/50 hover:bg-white/75'
            }`} />
            <div className={`absolute inset-0 w-3 md:w-4 h-3 md:h-4 rounded-full bg-white/20 scale-0 transition-transform duration-300 ${
              index === currentSlide ? 'scale-150' : 'group-hover:scale-125'
            }`} />
          </button>
        ))}
      </div>

      {/* Floating Elements - Hidden on Mobile */}
      <div className="absolute top-20 left-10 hidden lg:block animate-float">
        <div className="w-20 h-20 bg-white/10 backdrop-blur-sm rounded-full border border-white/20"></div>
      </div>
      <div className="absolute bottom-40 right-16 hidden lg:block animate-float animation-delay-1000">
        <div className="w-16 h-16 bg-white/10 backdrop-blur-sm rounded-full border border-white/20"></div>
      </div>

      {/* Mobile Scroll Indicator */}
      <div className="absolute bottom-2 left-1/2 transform -translate-x-1/2 md:hidden">
        <div className="w-6 h-10 border-2 border-white/50 rounded-full flex justify-center">
          <div className="w-1 h-3 bg-white/70 rounded-full mt-2 animate-bounce"></div>
        </div>
      </div>
    </div>
  );
};

export default HeroBanner;