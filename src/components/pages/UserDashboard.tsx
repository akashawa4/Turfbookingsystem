import React, { useState } from 'react';
import { Calendar, Star, MapPin, Clock, Settings, Heart, User, ChevronRight } from 'lucide-react';
import { Link } from 'react-router-dom';
import { useAuth } from '../../contexts/AuthContext';
import { getUserBookings } from '../../data/bookings';
import { getFavoriteTurfs } from '../../data/turfs';

const UserDashboard = () => {
  const { user } = useAuth();
  const [activeTab, setActiveTab] = useState<'upcoming' | 'past' | 'favorites' | 'profile'>('upcoming');
  
  const bookings = getUserBookings(user?.id || '');
  const upcomingBookings = bookings.filter(b => new Date(b.date) >= new Date());
  const pastBookings = bookings.filter(b => new Date(b.date) < new Date());
  const favoritesTurfs = getFavoriteTurfs();

  const tabs = [
    { id: 'upcoming' as const, name: 'Upcoming', count: upcomingBookings.length },
    { id: 'past' as const, name: 'Past', count: pastBookings.length },
    { id: 'favorites' as const, name: 'Favorites', count: favoritesTurfs.length },
    { id: 'profile' as const, name: 'Profile', count: null }
  ];

  const BookingCard = ({ booking }: { booking: any }) => (
    <div className="bg-white rounded-xl shadow-md p-6 hover:shadow-lg transition-shadow">
      <div className="flex justify-between items-start mb-4">
        <div>
          <h3 className="text-lg font-semibold text-gray-900">{booking.turfName}</h3>
          <div className="flex items-center text-gray-600 text-sm mt-1">
            <MapPin className="w-4 h-4 mr-1" />
            <span>{booking.location}</span>
          </div>
        </div>
        <span className={`px-3 py-1 rounded-full text-xs font-medium ${
          booking.status === 'confirmed' ? 'bg-green-100 text-green-600' :
          booking.status === 'completed' ? 'bg-blue-100 text-blue-600' :
          'bg-red-100 text-red-600'
        }`}>
          {booking.status}
        </span>
      </div>

      <div className="grid grid-cols-2 gap-4 text-sm">
        <div className="flex items-center text-gray-600">
          <Calendar className="w-4 h-4 mr-2" />
          <span>{new Date(booking.date).toLocaleDateString('en-IN')}</span>
        </div>
        <div className="flex items-center text-gray-600">
          <Clock className="w-4 h-4 mr-2" />
          <span>{booking.slots.join(', ')}</span>
        </div>
      </div>

      <div className="flex justify-between items-center mt-4 pt-4 border-t border-gray-200">
        <span className="text-lg font-semibold text-blue-600">₹{booking.totalAmount}</span>
        <div className="flex space-x-2">
          <Link
            to={`/confirmation/${booking.id}`}
            className="text-blue-600 hover:text-blue-700 text-sm font-medium"
          >
            View Ticket
          </Link>
          {booking.status === 'confirmed' && (
            <Link
              to={`/turf/${booking.turfId}`}
              className="bg-blue-600 text-white px-4 py-2 rounded-lg text-sm hover:bg-blue-700 transition-colors"
            >
              Re-Book
            </Link>
          )}
        </div>
      </div>
    </div>
  );

  const FavoriteCard = ({ turf }: { turf: any }) => (
    <div className="bg-white rounded-xl shadow-md overflow-hidden hover:shadow-lg transition-all hover:-translate-y-1">
      <img
        src={turf.images[0]}
        alt={turf.name}
        className="w-full h-40 object-cover"
      />
      <div className="p-4">
        <h3 className="font-semibold text-gray-900 mb-2">{turf.name}</h3>
        <div className="flex items-center text-gray-600 text-sm mb-2">
          <MapPin className="w-4 h-4 mr-1" />
          <span>{turf.location}</span>
        </div>
        <div className="flex items-center justify-between">
          <div className="flex items-center">
            <Star className="w-4 h-4 text-yellow-500 fill-current mr-1" />
            <span className="text-sm font-medium">{turf.rating}</span>
          </div>
          <Link
            to={`/turf/${turf.id}`}
            className="text-blue-600 hover:text-blue-700 text-sm font-medium flex items-center"
          >
            Book Now
            <ChevronRight className="w-4 h-4 ml-1" />
          </Link>
        </div>
      </div>
    </div>
  );

  return (
    <div className="min-h-screen bg-gray-50 py-8">
      <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Header */}
        <div className="mb-8">
          <h1 className="text-3xl font-bold text-gray-900 mb-2">Dashboard</h1>
          <p className="text-gray-600">Welcome back, {user?.name}!</p>
        </div>

        {/* Tabs */}
        <div className="flex space-x-1 bg-gray-200 rounded-xl p-1 mb-8 overflow-x-auto">
          {tabs.map((tab) => (
            <button
              key={tab.id}
              onClick={() => setActiveTab(tab.id)}
              className={`flex-1 min-w-max px-4 py-3 rounded-lg font-medium transition-colors ${
                activeTab === tab.id
                  ? 'bg-white text-blue-600 shadow-sm'
                  : 'text-gray-600 hover:text-gray-900'
              }`}
            >
              {tab.name}
              {tab.count !== null && (
                <span className="ml-2 bg-blue-100 text-blue-600 px-2 py-1 rounded-full text-xs">
                  {tab.count}
                </span>
              )}
            </button>
          ))}
        </div>

        {/* Content */}
        <div>
          {activeTab === 'upcoming' && (
            <div>
              <h2 className="text-2xl font-bold text-gray-900 mb-6">Upcoming Bookings</h2>
              {upcomingBookings.length > 0 ? (
                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                  {upcomingBookings.map((booking) => (
                    <BookingCard key={booking.id} booking={booking} />
                  ))}
                </div>
              ) : (
                <div className="text-center py-12">
                  <Calendar className="w-16 h-16 text-gray-400 mx-auto mb-4" />
                  <h3 className="text-xl font-semibold text-gray-900 mb-2">No upcoming bookings</h3>
                  <p className="text-gray-600 mb-6">Ready to book your next game?</p>
                  <Link
                    to="/search"
                    className="bg-blue-600 text-white px-6 py-3 rounded-xl hover:bg-blue-700 transition-colors"
                  >
                    Find Turfs
                  </Link>
                </div>
              )}
            </div>
          )}

          {activeTab === 'past' && (
            <div>
              <h2 className="text-2xl font-bold text-gray-900 mb-6">Past Bookings</h2>
              {pastBookings.length > 0 ? (
                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                  {pastBookings.map((booking) => (
                    <BookingCard key={booking.id} booking={booking} />
                  ))}
                </div>
              ) : (
                <div className="text-center py-12">
                  <Clock className="w-16 h-16 text-gray-400 mx-auto mb-4" />
                  <h3 className="text-xl font-semibold text-gray-900 mb-2">No past bookings</h3>
                  <p className="text-gray-600">Your booking history will appear here</p>
                </div>
              )}
            </div>
          )}

          {activeTab === 'favorites' && (
            <div>
              <h2 className="text-2xl font-bold text-gray-900 mb-6">Favorite Turfs</h2>
              {favoritesTurfs.length > 0 ? (
                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                  {favoritesTurfs.map((turf) => (
                    <FavoriteCard key={turf.id} turf={turf} />
                  ))}
                </div>
              ) : (
                <div className="text-center py-12">
                  <Heart className="w-16 h-16 text-gray-400 mx-auto mb-4" />
                  <h3 className="text-xl font-semibold text-gray-900 mb-2">No favorites yet</h3>
                  <p className="text-gray-600">Save turfs you love for quick access</p>
                </div>
              )}
            </div>
          )}

          {activeTab === 'profile' && (
            <div>
              <h2 className="text-2xl font-bold text-gray-900 mb-6">Account Settings</h2>
              <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
                <div className="bg-white rounded-xl shadow-md p-6">
                  <h3 className="text-lg font-semibold text-gray-900 mb-4 flex items-center">
                    <User className="w-5 h-5 mr-2" />
                    Personal Information
                  </h3>
                  <div className="space-y-4">
                    <div>
                      <label className="block text-sm font-medium text-gray-700 mb-2">Name</label>
                      <input
                        type="text"
                        defaultValue={user?.name}
                        className="w-full p-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500"
                      />
                    </div>
                    <div>
                      <label className="block text-sm font-medium text-gray-700 mb-2">Email</label>
                      <input
                        type="email"
                        defaultValue={user?.email}
                        className="w-full p-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500"
                      />
                    </div>
                    <div>
                      <label className="block text-sm font-medium text-gray-700 mb-2">Phone</label>
                      <input
                        type="tel"
                        defaultValue={user?.phone}
                        className="w-full p-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500"
                      />
                    </div>
                    <button className="w-full bg-blue-600 text-white py-3 rounded-lg hover:bg-blue-700 transition-colors">
                      Update Profile
                    </button>
                  </div>
                </div>

                <div className="bg-white rounded-xl shadow-md p-6">
                  <h3 className="text-lg font-semibold text-gray-900 mb-4 flex items-center">
                    <Settings className="w-5 h-5 mr-2" />
                    Account Statistics
                  </h3>
                  <div className="space-y-4">
                    <div className="flex justify-between items-center py-3 border-b border-gray-200">
                      <span className="text-gray-600">Total Bookings</span>
                      <span className="font-semibold text-gray-900">{bookings.length}</span>
                    </div>
                    <div className="flex justify-between items-center py-3 border-b border-gray-200">
                      <span className="text-gray-600">Favorite Turfs</span>
                      <span className="font-semibold text-gray-900">{favoritesTurfs.length}</span>
                    </div>
                    <div className="flex justify-between items-center py-3 border-b border-gray-200">
                      <span className="text-gray-600">Member Since</span>
                      <span className="font-semibold text-gray-900">Jan 2024</span>
                    </div>
                    <div className="flex justify-between items-center py-3">
                      <span className="text-gray-600">Total Spent</span>
                      <span className="font-semibold text-green-600">
                        ₹{bookings.reduce((sum, b) => sum + b.totalAmount, 0)}
                      </span>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

export default UserDashboard;