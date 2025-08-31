import React, { useState } from 'react';
import { Plus, Edit, BarChart3, Users, Calendar, MapPin, Star, ToggleLeft as Toggle } from 'lucide-react';
import { getAllTurfs } from '../../data/turfs';
import { getAllBookings } from '../../data/bookings';

const AdminDashboard = () => {
  const [activeTab, setActiveTab] = useState<'overview' | 'turfs' | 'bookings'>('overview');
  const [showAddTurf, setShowAddTurf] = useState(false);
  
  const turfs = getAllTurfs();
  const bookings = getAllBookings();
  const todayBookings = bookings.filter(b => 
    new Date(b.date).toDateString() === new Date().toDateString()
  );

  const stats = [
    { title: 'Total Bookings', value: bookings.length, icon: Calendar, color: 'text-blue-600' },
    { title: 'Active Turfs', value: turfs.length, icon: MapPin, color: 'text-green-600' },
    { title: 'Today\'s Bookings', value: todayBookings.length, icon: Users, color: 'text-purple-600' },
    { title: 'Revenue', value: `₹${bookings.reduce((sum, b) => sum + b.totalAmount, 0)}`, icon: BarChart3, color: 'text-orange-600' }
  ];

  const tabs = [
    { id: 'overview' as const, name: 'Overview' },
    { id: 'turfs' as const, name: 'Manage Turfs' },
    { id: 'bookings' as const, name: 'Bookings' }
  ];

  return (
    <div className="min-h-screen bg-gray-50 py-8">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Header */}
        <div className="mb-8">
          <h1 className="text-3xl font-bold text-gray-900 mb-2">Admin Dashboard</h1>
          <p className="text-gray-600">Manage your turfs and bookings</p>
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
            </button>
          ))}
        </div>

        {/* Overview Tab */}
        {activeTab === 'overview' && (
          <div className="space-y-8">
            {/* Stats Grid */}
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
              {stats.map((stat) => {
                const IconComponent = stat.icon;
                return (
                  <div key={stat.title} className="bg-white rounded-xl shadow-md p-6">
                    <div className="flex items-center justify-between">
                      <div>
                        <p className="text-gray-600 text-sm">{stat.title}</p>
                        <p className="text-2xl font-bold text-gray-900">{stat.value}</p>
                      </div>
                      <IconComponent className={`w-8 h-8 ${stat.color}`} />
                    </div>
                  </div>
                );
              })}
            </div>

            {/* Recent Bookings */}
            <div className="bg-white rounded-xl shadow-md">
              <div className="p-6 border-b border-gray-200">
                <h3 className="text-lg font-semibold text-gray-900">Recent Bookings</h3>
              </div>
              <div className="overflow-x-auto">
                <table className="w-full">
                  <thead className="bg-gray-50">
                    <tr>
                      <th className="text-left py-3 px-6 text-gray-600 font-medium">Booking ID</th>
                      <th className="text-left py-3 px-6 text-gray-600 font-medium">Turf</th>
                      <th className="text-left py-3 px-6 text-gray-600 font-medium">Date</th>
                      <th className="text-left py-3 px-6 text-gray-600 font-medium">Amount</th>
                      <th className="text-left py-3 px-6 text-gray-600 font-medium">Status</th>
                    </tr>
                  </thead>
                  <tbody>
                    {bookings.slice(0, 5).map((booking) => (
                      <tr key={booking.id} className="border-b border-gray-200 hover:bg-gray-50">
                        <td className="py-4 px-6 font-mono text-sm">#{booking.id}</td>
                        <td className="py-4 px-6">{booking.turfName}</td>
                        <td className="py-4 px-6">{new Date(booking.date).toLocaleDateString('en-IN')}</td>
                        <td className="py-4 px-6 font-semibold">₹{booking.totalAmount}</td>
                        <td className="py-4 px-6">
                          <span className={`px-3 py-1 rounded-full text-xs font-medium ${
                            booking.status === 'confirmed' ? 'bg-green-100 text-green-600' :
                            booking.status === 'completed' ? 'bg-blue-100 text-blue-600' :
                            'bg-red-100 text-red-600'
                          }`}>
                            {booking.status}
                          </span>
                        </td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>
            </div>
          </div>
        )}

        {/* Turfs Tab */}
        {activeTab === 'turfs' && (
          <div>
            <div className="flex justify-between items-center mb-6">
              <h2 className="text-2xl font-bold text-gray-900">Manage Turfs</h2>
              <button
                onClick={() => setShowAddTurf(true)}
                className="bg-blue-600 text-white px-4 py-2 rounded-lg hover:bg-blue-700 transition-colors flex items-center space-x-2"
              >
                <Plus className="w-4 h-4" />
                <span>Add New Turf</span>
              </button>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
              {turfs.map((turf) => (
                <div key={turf.id} className="bg-white rounded-xl shadow-md overflow-hidden">
                  <img
                    src={turf.images[0]}
                    alt={turf.name}
                    className="w-full h-40 object-cover"
                  />
                  <div className="p-4">
                    <div className="flex justify-between items-start mb-2">
                      <h3 className="font-semibold text-gray-900">{turf.name}</h3>
                      <div className="flex items-center space-x-1">
                        <Star className="w-4 h-4 text-yellow-500 fill-current" />
                        <span className="text-sm">{turf.rating}</span>
                      </div>
                    </div>
                    
                    <div className="flex items-center text-gray-600 text-sm mb-3">
                      <MapPin className="w-4 h-4 mr-1" />
                      <span>{turf.location}</span>
                    </div>
                    
                    <div className="flex justify-between items-center">
                      <span className="text-lg font-bold text-blue-600">₹{turf.pricePerHour}/hr</span>
                      <div className="flex space-x-2">
                        <button className="p-2 text-gray-600 hover:text-blue-600 transition-colors">
                          <Edit className="w-4 h-4" />
                        </button>
                        <button className="p-2 text-gray-600 hover:text-green-600 transition-colors">
                          <Toggle className="w-4 h-4" />
                        </button>
                      </div>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </div>
        )}

        {/* Bookings Tab */}
        {activeTab === 'bookings' && (
          <div>
            <h2 className="text-2xl font-bold text-gray-900 mb-6">All Bookings</h2>
            <div className="bg-white rounded-xl shadow-md overflow-hidden">
              <div className="overflow-x-auto">
                <table className="w-full">
                  <thead className="bg-gray-50">
                    <tr>
                      <th className="text-left py-3 px-6 text-gray-600 font-medium">Booking ID</th>
                      <th className="text-left py-3 px-6 text-gray-600 font-medium">Customer</th>
                      <th className="text-left py-3 px-6 text-gray-600 font-medium">Turf</th>
                      <th className="text-left py-3 px-6 text-gray-600 font-medium">Date & Time</th>
                      <th className="text-left py-3 px-6 text-gray-600 font-medium">Amount</th>
                      <th className="text-left py-3 px-6 text-gray-600 font-medium">Status</th>
                    </tr>
                  </thead>
                  <tbody>
                    {bookings.map((booking) => (
                      <tr key={booking.id} className="border-b border-gray-200 hover:bg-gray-50">
                        <td className="py-4 px-6 font-mono text-sm">#{booking.id}</td>
                        <td className="py-4 px-6">
                          <div>
                            <div className="font-medium">{booking.userDetails.name}</div>
                            <div className="text-sm text-gray-600">{booking.userDetails.phone}</div>
                          </div>
                        </td>
                        <td className="py-4 px-6">{booking.turfName}</td>
                        <td className="py-4 px-6">
                          <div>
                            <div>{new Date(booking.date).toLocaleDateString('en-IN')}</div>
                            <div className="text-sm text-gray-600">{booking.slots.join(', ')}</div>
                          </div>
                        </td>
                        <td className="py-4 px-6 font-semibold">₹{booking.totalAmount}</td>
                        <td className="py-4 px-6">
                          <span className={`px-3 py-1 rounded-full text-xs font-medium ${
                            booking.status === 'confirmed' ? 'bg-green-100 text-green-600' :
                            booking.status === 'completed' ? 'bg-blue-100 text-blue-600' :
                            'bg-red-100 text-red-600'
                          }`}>
                            {booking.status}
                          </span>
                        </td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>
            </div>
          </div>
        )}
      </div>
    </div>
  );
};

export default AdminDashboard;