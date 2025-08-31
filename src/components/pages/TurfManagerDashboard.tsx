import React, { useState, useEffect } from 'react';
import { useAuth } from '../../contexts/AuthContext';
import { 
  Calendar, 
  Users, 
  DollarSign, 
  Settings, 
  Image, 
  Star, 
  Clock, 
  CheckCircle, 
  XCircle, 
  AlertCircle,
  Edit,
  Plus,
  Trash2,
  Eye,
  Download,
  Upload
} from 'lucide-react';

const TurfManagerDashboard = () => {
  const { user } = useAuth();
  const [activeTab, setActiveTab] = useState('overview');
  const [turfData, setTurfData] = useState({
    name: 'Elite Sports Complex',
    location: 'Mumbai, Maharashtra',
    price: 1200,
    rating: 4.5,
    totalBookings: 156,
    monthlyRevenue: 45000,
    status: 'active'
  });

  const [bookings, setBookings] = useState([
    {
      id: '1',
      customerName: 'Rahul Sharma',
      date: '2024-01-15',
      time: '14:00-16:00',
      sport: 'Football',
      amount: 2400,
      status: 'confirmed',
      phone: '+91 98765 43210'
    },
    {
      id: '2',
      customerName: 'Priya Patel',
      date: '2024-01-15',
      time: '16:00-18:00',
      sport: 'Cricket',
      amount: 2400,
      status: 'pending',
      phone: '+91 87654 32109'
    },
    {
      id: '3',
      customerName: 'Amit Kumar',
      date: '2024-01-16',
      time: '10:00-12:00',
      sport: 'Football',
      amount: 2400,
      status: 'cancelled',
      phone: '+91 76543 21098'
    }
  ]);

  const [facilities, setFacilities] = useState([
    { id: '1', name: 'Parking', available: true },
    { id: '2', name: 'Changing Rooms', available: true },
    { id: '3', name: 'Equipment Rental', available: false },
    { id: '4', name: 'Refreshments', available: true }
  ]);

  const [images, setImages] = useState([
    { id: '1', url: 'https://images.unsplash.com/photo-1571019613454-1cb2f99b2d8b?w=400', name: 'Main Turf View' },
    { id: '2', url: 'https://images.unsplash.com/photo-1571019613454-1cb2f99b2d8b?w=400', name: 'Changing Rooms' },
    { id: '3', url: 'https://images.unsplash.com/photo-1571019613454-1cb2f99b2d8b?w=400', name: 'Parking Area' }
  ]);

  if (!user || user.role !== 'manager') {
    return (
      <div className="min-h-screen bg-gray-50 flex items-center justify-center">
        <div className="text-center">
          <h1 className="text-2xl font-bold text-gray-900 mb-4">Access Denied</h1>
          <p className="text-gray-600">You don't have permission to access this page.</p>
        </div>
      </div>
    );
  }

  const handleBookingAction = (bookingId: string, action: 'confirm' | 'cancel' | 'refund') => {
    setBookings(bookings.map(booking => {
      if (booking.id === bookingId) {
        switch (action) {
          case 'confirm':
            return { ...booking, status: 'confirmed' };
          case 'cancel':
            return { ...booking, status: 'cancelled' };
          case 'refund':
            return { ...booking, status: 'refunded' };
          default:
            return booking;
        }
      }
      return booking;
    }));
  };

  const getStatusColor = (status: string) => {
    switch (status) {
      case 'confirmed': return 'text-green-600 bg-green-100';
      case 'pending': return 'text-yellow-600 bg-yellow-100';
      case 'cancelled': return 'text-red-600 bg-red-100';
      case 'refunded': return 'text-blue-600 bg-blue-100';
      default: return 'text-gray-600 bg-gray-100';
    }
  };

  const getStatusIcon = (status: string) => {
    switch (status) {
      case 'confirmed': return <CheckCircle className="w-4 h-4" />;
      case 'pending': return <Clock className="w-4 h-4" />;
      case 'cancelled': return <XCircle className="w-4 h-4" />;
      case 'refunded': return <DollarSign className="w-4 h-4" />;
      default: return <AlertCircle className="w-4 h-4" />;
    }
  };

  return (
    <div className="min-h-screen bg-gray-50">
      {/* Header */}
      <div className="bg-white shadow-sm border-b">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-6">
          <div className="flex items-center justify-between">
            <div>
              <h1 className="text-3xl font-bold text-gray-900">Turf Manager Dashboard</h1>
              <p className="text-gray-600 mt-1">Managing: {turfData.name}</p>
            </div>
            <div className="flex items-center space-x-4">
              <div className="text-right">
                <p className="text-sm text-gray-500">Welcome back,</p>
                <p className="font-semibold text-gray-900">{user.name}</p>
              </div>
              <div className="w-10 h-10 bg-gradient-to-r from-blue-600 to-purple-600 rounded-full flex items-center justify-center text-white font-semibold">
                {user.avatar || user.name.charAt(0)}
              </div>
            </div>
          </div>
        </div>
      </div>

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        {/* Stats Cards */}
        <div className="grid grid-cols-1 md:grid-cols-4 gap-6 mb-8">
          <div className="bg-white rounded-2xl shadow-sm p-6">
            <div className="flex items-center">
              <div className="p-2 bg-blue-100 rounded-lg">
                <Calendar className="w-6 h-6 text-blue-600" />
              </div>
              <div className="ml-4">
                <p className="text-sm font-medium text-gray-600">Total Bookings</p>
                <p className="text-2xl font-bold text-gray-900">{turfData.totalBookings}</p>
              </div>
            </div>
          </div>

          <div className="bg-white rounded-2xl shadow-sm p-6">
            <div className="flex items-center">
              <div className="p-2 bg-green-100 rounded-lg">
                <DollarSign className="w-6 h-6 text-green-600" />
              </div>
              <div className="ml-4">
                <p className="text-sm font-medium text-gray-600">Monthly Revenue</p>
                <p className="text-2xl font-bold text-gray-900">₹{turfData.monthlyRevenue.toLocaleString()}</p>
              </div>
            </div>
          </div>

          <div className="bg-white rounded-2xl shadow-sm p-6">
            <div className="flex items-center">
              <div className="p-2 bg-yellow-100 rounded-lg">
                <Star className="w-6 h-6 text-yellow-600" />
              </div>
              <div className="ml-4">
                <p className="text-sm font-medium text-gray-600">Rating</p>
                <p className="text-2xl font-bold text-gray-900">{turfData.rating}/5</p>
              </div>
            </div>
          </div>

          <div className="bg-white rounded-2xl shadow-sm p-6">
            <div className="flex items-center">
              <div className="p-2 bg-purple-100 rounded-lg">
                <Users className="w-6 h-6 text-purple-600" />
              </div>
              <div className="ml-4">
                <p className="text-sm font-medium text-gray-600">Active Bookings</p>
                <p className="text-2xl font-bold text-gray-900">{bookings.filter(b => b.status === 'confirmed').length}</p>
              </div>
            </div>
          </div>
        </div>

        {/* Tabs */}
        <div className="bg-white rounded-2xl shadow-sm mb-8">
          <div className="border-b border-gray-200">
            <nav className="flex space-x-8 px-6">
              {[
                { id: 'overview', name: 'Overview', icon: Eye },
                { id: 'bookings', name: 'Bookings', icon: Calendar },
                { id: 'facilities', name: 'Facilities', icon: Settings },
                { id: 'images', name: 'Images', icon: Image }
              ].map((tab) => {
                const IconComponent = tab.icon;
                return (
                  <button
                    key={tab.id}
                    onClick={() => setActiveTab(tab.id)}
                    className={`py-4 px-1 border-b-2 font-medium text-sm flex items-center space-x-2 ${
                      activeTab === tab.id
                        ? 'border-blue-500 text-blue-600'
                        : 'border-transparent text-gray-500 hover:text-gray-700 hover:border-gray-300'
                    }`}
                  >
                    <IconComponent className="w-4 h-4" />
                    <span>{tab.name}</span>
                  </button>
                );
              })}
            </nav>
          </div>

          <div className="p-6">
            {/* Overview Tab */}
            {activeTab === 'overview' && (
              <div className="space-y-6">
                <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
                  <div className="bg-gray-50 rounded-xl p-6">
                    <h3 className="text-lg font-semibold text-gray-900 mb-4">Turf Information</h3>
                    <div className="space-y-3">
                      <div className="flex justify-between">
                        <span className="text-gray-600">Name:</span>
                        <span className="font-medium">{turfData.name}</span>
                      </div>
                      <div className="flex justify-between">
                        <span className="text-gray-600">Location:</span>
                        <span className="font-medium">{turfData.location}</span>
                      </div>
                      <div className="flex justify-between">
                        <span className="text-gray-600">Price per Hour:</span>
                        <span className="font-medium">₹{turfData.price}</span>
                      </div>
                      <div className="flex justify-between">
                        <span className="text-gray-600">Status:</span>
                        <span className={`px-2 py-1 rounded-full text-xs font-medium ${
                          turfData.status === 'active' ? 'bg-green-100 text-green-800' : 'bg-red-100 text-red-800'
                        }`}>
                          {turfData.status}
                        </span>
                      </div>
                    </div>
                    <button className="mt-4 w-full bg-blue-600 text-white py-2 px-4 rounded-lg hover:bg-blue-700 transition-colors flex items-center justify-center space-x-2">
                      <Edit className="w-4 h-4" />
                      <span>Edit Turf Details</span>
                    </button>
                  </div>

                  <div className="bg-gray-50 rounded-xl p-6">
                    <h3 className="text-lg font-semibold text-gray-900 mb-4">Recent Bookings</h3>
                    <div className="space-y-3">
                      {bookings.slice(0, 3).map((booking) => (
                        <div key={booking.id} className="flex items-center justify-between p-3 bg-white rounded-lg">
                          <div>
                            <p className="font-medium text-gray-900">{booking.customerName}</p>
                            <p className="text-sm text-gray-600">{booking.date} • {booking.time}</p>
                          </div>
                          <span className={`px-2 py-1 rounded-full text-xs font-medium ${getStatusColor(booking.status)}`}>
                            {booking.status}
                          </span>
                        </div>
                      ))}
                    </div>
                  </div>
                </div>
              </div>
            )}

            {/* Bookings Tab */}
            {activeTab === 'bookings' && (
              <div className="space-y-6">
                <div className="flex justify-between items-center">
                  <h3 className="text-lg font-semibold text-gray-900">All Bookings</h3>
                  <button className="bg-blue-600 text-white px-4 py-2 rounded-lg hover:bg-blue-700 transition-colors flex items-center space-x-2">
                    <Plus className="w-4 h-4" />
                    <span>Add Booking</span>
                  </button>
                </div>

                <div className="overflow-x-auto">
                  <table className="min-w-full divide-y divide-gray-200">
                    <thead className="bg-gray-50">
                      <tr>
                        <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Customer</th>
                        <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Date & Time</th>
                        <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Sport</th>
                        <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Amount</th>
                        <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Status</th>
                        <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Actions</th>
                      </tr>
                    </thead>
                    <tbody className="bg-white divide-y divide-gray-200">
                      {bookings.map((booking) => (
                        <tr key={booking.id}>
                          <td className="px-6 py-4 whitespace-nowrap">
                            <div>
                              <div className="text-sm font-medium text-gray-900">{booking.customerName}</div>
                              <div className="text-sm text-gray-500">{booking.phone}</div>
                            </div>
                          </td>
                          <td className="px-6 py-4 whitespace-nowrap">
                            <div className="text-sm text-gray-900">{booking.date}</div>
                            <div className="text-sm text-gray-500">{booking.time}</div>
                          </td>
                          <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-900">{booking.sport}</td>
                          <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-900">₹{booking.amount}</td>
                          <td className="px-6 py-4 whitespace-nowrap">
                            <span className={`inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium ${getStatusColor(booking.status)}`}>
                              {getStatusIcon(booking.status)}
                              <span className="ml-1">{booking.status}</span>
                            </span>
                          </td>
                          <td className="px-6 py-4 whitespace-nowrap text-sm font-medium space-x-2">
                            {booking.status === 'pending' && (
                              <>
                                <button
                                  onClick={() => handleBookingAction(booking.id, 'confirm')}
                                  className="text-green-600 hover:text-green-900"
                                >
                                  Confirm
                                </button>
                                <button
                                  onClick={() => handleBookingAction(booking.id, 'cancel')}
                                  className="text-red-600 hover:text-red-900"
                                >
                                  Cancel
                                </button>
                              </>
                            )}
                            {booking.status === 'confirmed' && (
                              <button
                                onClick={() => handleBookingAction(booking.id, 'refund')}
                                className="text-blue-600 hover:text-blue-900"
                              >
                                Refund
                              </button>
                            )}
                            <button className="text-gray-600 hover:text-gray-900">
                              <Eye className="w-4 h-4" />
                            </button>
                          </td>
                        </tr>
                      ))}
                    </tbody>
                  </table>
                </div>
              </div>
            )}

            {/* Facilities Tab */}
            {activeTab === 'facilities' && (
              <div className="space-y-6">
                <div className="flex justify-between items-center">
                  <h3 className="text-lg font-semibold text-gray-900">Facilities Management</h3>
                  <button className="bg-blue-600 text-white px-4 py-2 rounded-lg hover:bg-blue-700 transition-colors flex items-center space-x-2">
                    <Plus className="w-4 h-4" />
                    <span>Add Facility</span>
                  </button>
                </div>

                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
                  {facilities.map((facility) => (
                    <div key={facility.id} className="bg-gray-50 rounded-xl p-4">
                      <div className="flex items-center justify-between">
                        <div>
                          <h4 className="font-medium text-gray-900">{facility.name}</h4>
                          <span className={`inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium ${
                            facility.available ? 'bg-green-100 text-green-800' : 'bg-red-100 text-red-800'
                          }`}>
                            {facility.available ? 'Available' : 'Unavailable'}
                          </span>
                        </div>
                        <div className="flex space-x-2">
                          <button className="text-blue-600 hover:text-blue-900">
                            <Edit className="w-4 h-4" />
                          </button>
                          <button className="text-red-600 hover:text-red-900">
                            <Trash2 className="w-4 h-4" />
                          </button>
                        </div>
                      </div>
                    </div>
                  ))}
                </div>
              </div>
            )}

            {/* Images Tab */}
            {activeTab === 'images' && (
              <div className="space-y-6">
                <div className="flex justify-between items-center">
                  <h3 className="text-lg font-semibold text-gray-900">Turf Images</h3>
                  <button className="bg-blue-600 text-white px-4 py-2 rounded-lg hover:bg-blue-700 transition-colors flex items-center space-x-2">
                    <Upload className="w-4 h-4" />
                    <span>Upload Image</span>
                  </button>
                </div>

                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                  {images.map((image) => (
                    <div key={image.id} className="bg-white rounded-xl shadow-sm overflow-hidden">
                      <img
                        src={image.url}
                        alt={image.name}
                        className="w-full h-48 object-cover"
                      />
                      <div className="p-4">
                        <h4 className="font-medium text-gray-900 mb-2">{image.name}</h4>
                        <div className="flex space-x-2">
                          <button className="text-blue-600 hover:text-blue-900 flex items-center space-x-1">
                            <Edit className="w-4 h-4" />
                            <span>Edit</span>
                          </button>
                          <button className="text-green-600 hover:text-green-900 flex items-center space-x-1">
                            <Download className="w-4 h-4" />
                            <span>Download</span>
                          </button>
                          <button className="text-red-600 hover:text-red-900 flex items-center space-x-1">
                            <Trash2 className="w-4 h-4" />
                            <span>Delete</span>
                          </button>
                        </div>
                      </div>
                    </div>
                  ))}
                </div>
              </div>
            )}
          </div>
        </div>
      </div>
    </div>
  );
};

export default TurfManagerDashboard;
