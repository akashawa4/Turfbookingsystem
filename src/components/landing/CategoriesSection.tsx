import React from 'react';
import { useNavigate } from 'react-router-dom';
import { Zap, Target, Wallet as Volleyball, Activity, CircleDot, Gamepad2, Trophy, Timer } from 'lucide-react';

const CategoriesSection = () => {
  const navigate = useNavigate();

  const categories = [
    { 
      name: 'Cricket', 
      icon: Zap, 
      color: 'from-orange-500 to-red-600',
      bgColor: 'from-orange-50 to-red-50',
      hoverColor: 'from-orange-500 to-red-600'
    },
    { 
      name: 'Football', 
      icon: CircleDot, 
      color: 'from-green-500 to-emerald-600',
      bgColor: 'from-green-50 to-emerald-50',
      hoverColor: 'from-green-500 to-emerald-600'
    },
    { 
      name: 'Tennis', 
      icon: Target, 
      color: 'from-yellow-500 to-amber-600',
      bgColor: 'from-yellow-50 to-amber-50',
      hoverColor: 'from-yellow-500 to-amber-600'
    },
    { 
      name: 'Badminton', 
      icon: Volleyball, 
      color: 'from-purple-500 to-indigo-600',
      bgColor: 'from-purple-50 to-indigo-50',
      hoverColor: 'from-purple-500 to-indigo-600'
    },
    { 
      name: 'Basketball', 
      icon: Activity, 
      color: 'from-red-500 to-pink-600',
      bgColor: 'from-red-50 to-pink-50',
      hoverColor: 'from-red-500 to-pink-600'
    },
    { 
      name: 'Swimming', 
      icon: Timer, 
      color: 'from-blue-500 to-cyan-600',
      bgColor: 'from-blue-50 to-cyan-50',
      hoverColor: 'from-blue-500 to-cyan-600'
    },
    { 
      name: 'Volleyball', 
      icon: Gamepad2, 
      color: 'from-pink-500 to-rose-600',
      bgColor: 'from-pink-50 to-rose-50',
      hoverColor: 'from-pink-500 to-rose-600'
    },
    { 
      name: 'Other Sports', 
      icon: Trophy, 
      color: 'from-gray-500 to-slate-600',
      bgColor: 'from-gray-50 to-slate-50',
      hoverColor: 'from-gray-500 to-slate-600'
    }
  ];

  const handleCategoryClick = (category: string) => {
    navigate(`/search?sport=${encodeURIComponent(category.toLowerCase())}`);
  };

  return (
    <section className="py-20 bg-gradient-to-br from-white via-gray-50 to-blue-50/20">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center mb-16">
          <div className="inline-block mb-6">
            <h2 className="text-4xl md:text-5xl font-bold text-gray-900 mb-4">
              Choose Your Sport
            </h2>
            <div className="w-32 h-1.5 bg-gradient-to-r from-blue-600 to-purple-600 mx-auto rounded-full"></div>
          </div>
          <p className="text-xl text-gray-600 max-w-3xl mx-auto leading-relaxed">
            Find the perfect turf for your favorite sport. Professional facilities with modern amenities and world-class equipment.
          </p>
        </div>

        <div className="grid grid-cols-2 md:grid-cols-4 lg:grid-cols-8 gap-6">
          {categories.map((category) => {
            const IconComponent = category.icon;
            return (
              <button
                key={category.name}
                onClick={() => handleCategoryClick(category.name)}
                className="group relative flex flex-col items-center p-6 rounded-3xl bg-gradient-to-br from-white to-gray-50/50 border border-gray-200/50 hover:border-transparent transition-all duration-500 hover:-translate-y-2 hover:shadow-2xl overflow-hidden"
              >
                {/* Background Gradient on Hover */}
                <div className={`absolute inset-0 bg-gradient-to-br ${category.bgColor} opacity-0 group-hover:opacity-100 transition-opacity duration-500`}></div>
                
                {/* Icon Container */}
                <div className="relative z-10 mb-4">
                  <div className={`w-20 h-20 rounded-2xl bg-gradient-to-br ${category.bgColor} group-hover:bg-gradient-to-br ${category.hoverColor} flex items-center justify-center transition-all duration-500 transform group-hover:scale-110 group-hover:rotate-3 shadow-lg group-hover:shadow-xl`}>
                    <IconComponent className={`w-10 h-10 text-gray-600 group-hover:text-white transition-all duration-500`} />
                  </div>
                </div>
                
                {/* Category Name */}
                <span className="relative z-10 text-sm font-semibold text-gray-700 group-hover:text-gray-900 transition-colors duration-300 text-center leading-tight">
                  {category.name}
                </span>
                
                {/* Hover Effect Ring */}
                <div className={`absolute inset-0 rounded-3xl border-2 border-transparent group-hover:border-${category.color.split('-')[1]}-300/30 transition-all duration-500`}></div>
                
                {/* Floating Particles Effect */}
                <div className="absolute top-2 right-2 w-2 h-2 bg-blue-400 rounded-full opacity-0 group-hover:opacity-100 group-hover:animate-ping transition-all duration-500"></div>
                <div className="absolute bottom-2 left-2 w-1.5 h-1.5 bg-purple-400 rounded-full opacity-0 group-hover:opacity-100 group-hover:animate-ping transition-all duration-500 animation-delay-200"></div>
              </button>
            );
          })}
        </div>
        
        {/* Call to Action */}
        <div className="text-center mt-16">
          <div className="inline-block group">
            <button className="bg-gradient-to-r from-blue-600 to-purple-600 hover:from-blue-700 hover:to-purple-700 text-white px-8 py-4 rounded-2xl font-semibold text-lg transition-all duration-300 transform hover:scale-105 hover:shadow-xl shadow-lg">
              Explore All Sports
            </button>
            <div className="w-full h-0.5 bg-gradient-to-r from-blue-600 to-purple-600 transform scale-x-0 group-hover:scale-x-100 transition-transform duration-500 origin-left"></div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default CategoriesSection;