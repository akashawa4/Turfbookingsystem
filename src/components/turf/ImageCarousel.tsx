import React, { useState } from 'react';
import { ChevronLeft, ChevronRight, ZoomIn, Play } from 'lucide-react';

interface ImageCarouselProps {
  images: string[];
}

const ImageCarousel: React.FC<ImageCarouselProps> = ({ images }) => {
  const [currentImage, setCurrentImage] = useState(0);

  const nextImage = () => {
    setCurrentImage((prev) => (prev + 1) % images.length);
  };

  const prevImage = () => {
    setCurrentImage((prev) => (prev - 1 + images.length) % images.length);
  };

  return (
    <div className="relative group">
      {/* Main Image */}
      <div className="relative h-64 md:h-96 lg:h-[500px] rounded-3xl overflow-hidden shadow-2xl">
        <img
          src={images[currentImage]}
          alt={`Turf view ${currentImage + 1}`}
          className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-105"
        />
        
        {/* Gradient Overlay */}
        <div className="absolute inset-0 bg-gradient-to-t from-black/20 via-transparent to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300" />
        
        {/* Enhanced Navigation Arrows */}
        <button
          onClick={prevImage}
          className="absolute left-4 top-1/2 transform -translate-y-1/2 bg-white/90 backdrop-blur-sm hover:bg-white text-gray-800 hover:text-blue-600 rounded-full p-3 transition-all duration-300 transform hover:scale-110 hover:shadow-lg shadow-md border border-white/20"
        >
          <ChevronLeft className="w-5 h-5" />
        </button>
        <button
          onClick={nextImage}
          className="absolute right-4 top-1/2 transform -translate-y-1/2 bg-white/90 backdrop-blur-sm hover:bg-white text-gray-800 hover:text-blue-600 rounded-full p-3 transition-all duration-300 transform hover:scale-110 hover:shadow-lg shadow-md border border-white/20"
        >
          <ChevronRight className="w-5 h-5" />
        </button>

        {/* Enhanced Image Counter */}
        <div className="absolute bottom-4 right-4 bg-black/70 backdrop-blur-sm text-white px-4 py-2 rounded-full text-sm font-medium border border-white/20">
          {currentImage + 1} / {images.length}
        </div>
        
        {/* Action Buttons */}
        <div className="absolute top-4 right-4 flex space-x-2 opacity-0 group-hover:opacity-100 transition-all duration-300">
          <button className="bg-white/90 backdrop-blur-sm hover:bg-white text-gray-800 hover:text-blue-600 rounded-full p-3 transition-all duration-300 transform hover:scale-110 hover:shadow-lg shadow-md border border-white/20">
            <ZoomIn className="w-5 h-5" />
          </button>
          <button className="bg-white/90 backdrop-blur-sm hover:bg-white text-gray-800 hover:text-blue-600 rounded-full p-3 transition-all duration-300 transform hover:scale-110 hover:shadow-lg shadow-md border border-white/20">
            <Play className="w-5 h-5" />
          </button>
        </div>
      </div>

      {/* Enhanced Thumbnail Strip */}
      <div className="flex space-x-3 mt-6 overflow-x-auto pb-2 scrollbar-hide">
        {images.map((image, index) => (
          <button
            key={index}
            onClick={() => setCurrentImage(index)}
            className={`group/thumb flex-shrink-0 w-24 h-24 rounded-2xl overflow-hidden border-2 transition-all duration-300 transform hover:scale-105 ${
              index === currentImage 
                ? 'border-blue-600 shadow-lg shadow-blue-600/25' 
                : 'border-transparent hover:border-blue-300'
            }`}
          >
            <img
              src={image}
              alt={`Thumbnail ${index + 1}`}
              className="w-full h-full object-cover transition-transform duration-300 group-hover/thumb:scale-110"
            />
            
            {/* Thumbnail Overlay */}
            <div className={`absolute inset-0 bg-gradient-to-t from-black/60 via-transparent to-transparent opacity-0 group-hover/thumb:opacity-100 transition-opacity duration-300 ${
              index === currentImage ? 'opacity-100' : ''
            }`} />
            
            {/* Active Indicator */}
            {index === currentImage && (
              <div className="absolute top-2 right-2 w-3 h-3 bg-blue-600 rounded-full border-2 border-white shadow-lg"></div>
            )}
          </button>
        ))}
      </div>
      
      {/* Progress Bar */}
      <div className="mt-4">
        <div className="w-full bg-gray-200 rounded-full h-1.5">
          <div 
            className="bg-gradient-to-r from-blue-600 to-purple-600 h-1.5 rounded-full transition-all duration-500 ease-out"
            style={{ width: `${((currentImage + 1) / images.length) * 100}%` }}
          ></div>
        </div>
      </div>
    </div>
  );
};

export default ImageCarousel;