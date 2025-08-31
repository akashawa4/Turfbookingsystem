import React from 'react';
import { MapPin, Star } from 'lucide-react';
import { Link } from 'react-router-dom';

interface MapViewProps {
  turfs: any[];
}

const MapView: React.FC<MapViewProps> = ({ turfs }) => {
  return (
    <div className="bg-white rounded-2xl shadow-lg overflow-hidden h-[600px]">
      {/* Map Container */}
      <div className="relative h-2/3 bg-gray-200">
        {/* Simulated Map */}
        <div className="absolute inset-0 bg-gradient-to-br from-green-100 to-blue-100">
          <div className="absolute inset-0 opacity-20">
            <svg className="w-full h-full" viewBox="0 0 400 300">
              {/* Simulated roads */}
              <path d="M0,150 L400,150" stroke="#666" strokeWidth="2" />
              <path d="M200,0 L200,300" stroke="#666" strokeWidth="2" />
              
              {/* Turf markers */}
              {turfs.slice(0, 8).map((turf, index) => (
                <g key={turf.id}>
                  <circle
                    cx={50 + (index % 4) * 90}
                    cy={75 + Math.floor(index / 4) * 150}
                    r="8"
                    fill="#2563eb"
                    className="cursor-pointer hover:r-10 transition-all"
                  />
                  <text
                    x={50 + (index % 4) * 90}
                    y={95 + Math.floor(index / 4) * 150}
                    textAnchor="middle"
                    className="text-xs fill-gray-700"
                  >
                    ₹{turf.pricePerHour}
                  </text>
                </g>
              ))}
            </svg>
          </div>
        </div>

        {/* Map Controls */}
        <div className="absolute top-4 right-4 bg-white rounded-lg shadow-md">
          <button className="p-2 text-gray-600 hover:text-blue-600">
            <MapPin className="w-5 h-5" />
          </button>
        </div>
      </div>

      {/* Turf List Below Map */}
      <div className="h-1/3 overflow-y-auto p-4">
        <h3 className="text-lg font-semibold text-gray-900 mb-4">Turfs on Map</h3>
        <div className="space-y-3">
          {turfs.slice(0, 5).map((turf) => (
            <Link
              key={turf.id}
              to={`/turf/${turf.id}`}
              className="flex items-center space-x-4 p-3 rounded-lg hover:bg-gray-50 transition-colors"
            >
              <img
                src={turf.images[0]}
                alt={turf.name}
                className="w-16 h-16 rounded-lg object-cover"
              />
              <div className="flex-1">
                <h4 className="font-semibold text-gray-900">{turf.name}</h4>
                <div className="flex items-center space-x-2 text-sm text-gray-600">
                  <Star className="w-4 h-4 text-yellow-500 fill-current" />
                  <span>{turf.rating}</span>
                  <span>•</span>
                  <span>₹{turf.pricePerHour}/hr</span>
                </div>
              </div>
            </Link>
          ))}
        </div>
      </div>
    </div>
  );
};

export default MapView;