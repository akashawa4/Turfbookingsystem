import React, { useState, useEffect } from 'react';
import { Link, useLocation } from 'react-router-dom';
import { Search, Bell, Bookmark, Menu, X, MapPin, User, LogOut, ChevronDown, Building } from 'lucide-react';
import { useAuth } from '../../contexts/AuthContext';

const Navbar = () => {
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
  const [isUserDropdownOpen, setIsUserDropdownOpen] = useState(false);
  const [isLocationDropdownOpen, setIsLocationDropdownOpen] = useState(false);
  const [searchQuery, setSearchQuery] = useState('');
  const [selectedLocation, setSelectedLocation] = useState('Mumbai');
  const [isScrolled, setIsScrolled] = useState(false);
  const { user, logout, isLoading } = useAuth();
  const location = useLocation();

  const cities = ['Mumbai', 'Kolhapur', 'Pune', 'Bangalore', 'Delhi', 'Chennai', 'Hyderabad'];

  // Handle scroll effect for navbar
  useEffect(() => {
    const handleScroll = () => {
      const scrollTop = window.scrollY;
      setIsScrolled(scrollTop > 10);
    };

    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  const isActiveLink = (path: string) => {
    return location.pathname === path;
  };

  const getPageTitle = () => {
    const path = location.pathname;
    if (path === '/') return 'Home';
    if (path.startsWith('/search')) return 'Search';
    if (path.startsWith('/turf/')) return 'Turf Details';
    if (path.startsWith('/booking/')) return 'Booking';
    if (path.startsWith('/dashboard')) return 'Dashboard';
    if (path.startsWith('/admin')) return 'Admin';
    if (path.startsWith('/manager')) return 'Manager';
    return 'Galli2Ground';
  };

  const handleSearch = (e: React.FormEvent) => {
    e.preventDefault();
    if (searchQuery.trim()) {
      window.location.href = `/search?q=${encodeURIComponent(searchQuery)}`;
    }
  };

  const handleLocationChange = (city: string) => {
    setSelectedLocation(city);
    setIsLocationDropdownOpen(false);
  };

  const handleLogout = () => {
    logout();
    setIsUserDropdownOpen(false);
    setIsMobileMenuOpen(false);
  };

  const getDashboardLink = () => {
    if (!user) return '/dashboard';
    switch (user.role) {
      case 'admin':
        return '/admin';
      case 'manager':
        return '/manager';
      default:
        return '/dashboard';
    }
  };

  const getDashboardLabel = () => {
    if (!user) return 'Dashboard';
    switch (user.role) {
      case 'admin':
        return 'Admin Panel';
      case 'manager':
        return 'Manager Dashboard';
      default:
        return 'My Dashboard';
    }
  };

  return (
    <nav className={`fixed top-0 left-0 right-0 bg-white/95 backdrop-blur-md shadow-lg border-b border-gray-200/50 h-16 md:h-20 transition-all duration-300 z-[9999] ${
      isScrolled ? 'shadow-xl bg-white/98' : 'shadow-lg bg-white/95'
    }`}>
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 h-full">
        <div className="flex items-center justify-between h-full">
          {/* Logo and Location Selector */}
          <div className="flex items-center space-x-3">
            <Link to="/" className="flex items-center space-x-2 group">
              <div className="relative">
                <div className="absolute inset-0 bg-gradient-to-r from-blue-600 to-purple-600 rounded-xl blur group-hover:blur-md transition-all duration-300"></div>
                <div className="relative bg-gradient-to-r from-blue-600 to-purple-600 text-white p-2 rounded-xl group-hover:scale-105 transition-transform duration-300">
                  <span className="text-lg md:text-xl font-bold">🏟️</span>
                </div>
              </div>
              <div className="text-center">
                <span className="text-xl md:text-2xl font-bold bg-gradient-to-r from-blue-600 to-purple-600 bg-clip-text text-transparent">
                  Galli2Ground
                </span>
                <p className="text-xs text-gray-500 -mt-1">From Streets to Stadium</p>
              </div>
            </Link>

            {/* Location Selector */}
            <div className="relative">
              <button
                onClick={() => setIsLocationDropdownOpen(!isLocationDropdownOpen)}
                className="flex items-center space-x-1 px-3 py-1.5 rounded-lg hover:bg-gray-100 transition-colors group mobile-button"
              >
                <MapPin className="w-4 h-4 text-blue-600 group-hover:text-blue-700" />
                <span className="text-sm font-medium text-gray-700 group-hover:text-gray-900 mobile-text">{selectedLocation}</span>
                <ChevronDown className={`w-3 h-3 text-gray-500 transition-transform duration-200 ${isLocationDropdownOpen ? 'rotate-180' : ''}`} />
              </button>

              {isLocationDropdownOpen && (
                <div className="absolute top-full left-0 mt-2 w-48 bg-white/95 backdrop-blur-md rounded-xl shadow-2xl border border-gray-200/50 py-2 z-[10000]">
                  {cities.map((city) => (
                    <button
                      key={city}
                      onClick={() => handleLocationChange(city)}
                      className={`w-full text-left px-4 py-2 text-sm hover:bg-gray-100 transition-colors ${
                        selectedLocation === city ? 'text-blue-600 font-medium bg-blue-50' : 'text-gray-700'
                      }`}
                    >
                      {city}
                    </button>
                  ))}
                </div>
              )}
            </div>
          </div>

          {/* Desktop Navigation */}
          <div className="hidden md:flex items-center space-x-8">
            {/* Search Bar */}
            <form onSubmit={handleSearch} className="relative">
              <div className="relative">
                <div className="absolute inset-0 bg-gradient-to-r from-blue-600 to-purple-600 rounded-xl blur opacity-75"></div>
                <div className="relative flex items-center bg-white/95 backdrop-blur-sm rounded-xl shadow-lg border border-gray-200/50">
                  <input
                    type="text"
                    value={searchQuery}
                    onChange={(e) => setSearchQuery(e.target.value)}
                    placeholder="Search turfs, sports..."
                    className="w-64 lg:w-80 px-4 py-2 bg-transparent border-none outline-none placeholder-gray-500"
                  />
                  <button
                    type="submit"
                    className="bg-gradient-to-r from-blue-600 to-purple-600 hover:from-blue-700 hover:to-purple-700 p-2 rounded-r-xl transition-all duration-300 transform hover:scale-105"
                  >
                    <Search className="w-4 h-4 text-white" />
                  </button>
                </div>
              </div>
            </form>

            {/* Navigation Links */}
            <div className="flex items-center space-x-6">
              <Link
                to="/"
                className={`relative group font-medium transition-colors ${
                  isActiveLink('/') ? 'text-blue-600' : 'text-gray-600 hover:text-blue-600'
                }`}
              >
                Home
                <div className={`absolute bottom-0 left-0 w-0 h-0.5 bg-gradient-to-r from-blue-600 to-purple-600 group-hover:w-full transition-all duration-300 ${
                  isActiveLink('/') ? 'w-full' : ''
                }`} />
              </Link>
              <Link
                to="/search"
                className={`relative group font-medium transition-colors ${
                  isActiveLink('/search') ? 'text-blue-600' : 'text-gray-600 hover:text-blue-600'
                }`}
              >
                Search
                <div className={`absolute bottom-0 left-0 w-0 h-0.5 bg-gradient-to-r from-blue-600 to-purple-600 group-hover:w-full transition-all duration-300 ${
                  isActiveLink('/search') ? 'w-full' : ''
                }`} />
              </Link>
            </div>

            {/* Notifications */}
            <button className="relative p-2 text-gray-600 hover:text-blue-600 transition-colors">
              <Bell className="w-5 h-5 animate-pulse" />
              <span className="absolute -top-1 -right-1 w-3 h-3 bg-red-500 rounded-full"></span>
            </button>

            {/* User Menu */}
            {user ? (
              <div className="relative">
                <button
                  onClick={() => setIsUserDropdownOpen(!isUserDropdownOpen)}
                  className="flex items-center space-x-2 p-2 rounded-xl hover:bg-gray-100 transition-colors"
                >
                  <div className="w-8 h-8 bg-gradient-to-r from-blue-600 to-purple-600 rounded-full flex items-center justify-center text-white text-sm font-semibold">
                    {user.avatar || user.name.charAt(0)}
                  </div>
                  <span className="font-medium text-gray-700">{user.name}</span>
                </button>

                {isUserDropdownOpen && (
                  <div className="absolute right-0 mt-2 w-48 bg-white/95 backdrop-blur-md rounded-2xl shadow-2xl border border-gray-200/50 py-2 z-[10000]">
                    <div className="px-4 py-2 border-b border-gray-200/50">
                      <p className="text-sm font-medium text-gray-900">{user.name}</p>
                      <p className="text-xs text-gray-500 capitalize">{user.role}</p>
                    </div>
                    <Link
                      to={getDashboardLink()}
                      className="flex items-center space-x-2 px-4 py-2 text-gray-700 hover:bg-gray-100 transition-colors"
                    >
                      {user.role === 'manager' ? <Building className="w-4 h-4" /> : <Bookmark className="w-4 h-4" />}
                      <span>{getDashboardLabel()}</span>
                    </Link>
                    <button
                      onClick={handleLogout}
                      className="flex items-center space-x-2 px-4 py-2 text-gray-700 hover:bg-gray-100 transition-colors w-full"
                    >
                      <LogOut className="w-4 h-4" />
                      <span>Logout</span>
                    </button>
                  </div>
                )}
              </div>
            ) : (
              <Link
                to="/login"
                className="bg-gradient-to-r from-blue-600 to-purple-600 hover:from-blue-700 hover:to-purple-700 text-white px-6 py-2 rounded-xl font-semibold transition-all duration-300 transform hover:scale-105 hover:shadow-lg"
              >
                Login
              </Link>
            )}
          </div>

          {/* Mobile Menu Button */}
          <button
            onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
            className="md:hidden p-2 rounded-lg hover:bg-gray-100 transition-colors"
          >
            {isMobileMenuOpen ? (
              <X className="w-6 h-6 text-gray-600" />
            ) : (
              <Menu className="w-6 h-6 text-gray-600" />
            )}
          </button>
        </div>
      </div>

      {/* Mobile Menu */}
      {isMobileMenuOpen && (
        <div className="md:hidden bg-white/95 backdrop-blur-md border-t border-gray-200/50 absolute top-full left-0 right-0 z-[10000]">
          <div className="px-4 py-6 space-y-4">
            {/* Mobile Search */}
            <form onSubmit={handleSearch} className="relative">
              <div className="relative">
                <div className="absolute inset-0 bg-gradient-to-r from-blue-600 to-purple-600 rounded-xl blur opacity-75"></div>
                <div className="relative flex items-center bg-white/95 backdrop-blur-sm rounded-xl shadow-lg border border-gray-200/50">
                  <input
                    type="text"
                    value={searchQuery}
                    onChange={(e) => setSearchQuery(e.target.value)}
                    placeholder="Search turfs, sports..."
                    className="flex-1 px-4 py-3 bg-transparent border-none outline-none placeholder-gray-500 mobile-input"
                  />
                  <button
                    type="submit"
                    className="bg-gradient-to-r from-blue-600 to-purple-600 hover:from-blue-700 hover:to-purple-700 p-3 rounded-r-xl transition-all duration-300"
                  >
                    <Search className="w-4 h-4 text-white" />
                  </button>
                </div>
              </div>
            </form>

            {/* Mobile Navigation Links */}
            <div className="space-y-2">
              <Link
                to="/"
                onClick={() => setIsMobileMenuOpen(false)}
                className={`block px-4 py-3 rounded-xl font-medium transition-colors ${
                  isActiveLink('/') ? 'bg-blue-50 text-blue-600' : 'text-gray-600 hover:bg-gray-50'
                }`}
              >
                Home
              </Link>
              <Link
                to="/search"
                onClick={() => setIsMobileMenuOpen(false)}
                className={`block px-4 py-3 rounded-xl font-medium transition-colors ${
                  isActiveLink('/search') ? 'bg-blue-50 text-blue-600' : 'text-gray-600 hover:bg-gray-50'
                }`}
              >
                Search Turfs
              </Link>
            </div>

            {/* Mobile User Section */}
            {user ? (
              <div className="border-t border-gray-200/50 pt-4 space-y-2">
                <div className="flex items-center space-x-3 px-4 py-2">
                  <div className="w-10 h-10 bg-gradient-to-r from-blue-600 to-purple-600 rounded-full flex items-center justify-center text-white font-semibold">
                    {user.avatar || user.name.charAt(0)}
                  </div>
                  <div>
                    <p className="font-medium text-gray-800">{user.name}</p>
                    <p className="text-sm text-gray-500 capitalize">{user.role}</p>
                  </div>
                </div>
                <Link
                  to={getDashboardLink()}
                  onClick={() => setIsMobileMenuOpen(false)}
                  className="flex items-center space-x-2 px-4 py-3 text-gray-600 hover:bg-gray-50 rounded-xl transition-colors"
                >
                  {user.role === 'manager' ? <Building className="w-4 h-4" /> : <Bookmark className="w-4 h-4" />}
                  <span>{getDashboardLabel()}</span>
                </Link>
                <button
                  onClick={handleLogout}
                  className="flex items-center space-x-2 px-4 py-3 text-gray-600 hover:bg-gray-50 rounded-xl transition-colors w-full"
                >
                  <LogOut className="w-4 h-4" />
                  <span>Logout</span>
                </button>
              </div>
            ) : (
              <div className="border-t border-gray-200/50 pt-4">
                <Link
                  to="/login"
                  onClick={() => setIsMobileMenuOpen(false)}
                  className="block w-full bg-gradient-to-r from-blue-600 to-purple-600 hover:from-blue-700 hover:to-purple-700 text-white px-6 py-3 rounded-xl font-semibold text-center transition-all duration-300"
                >
                  Login
                </Link>
              </div>
            )}
          </div>
        </div>
      )}
    </nav>
  );
};

export default Navbar;