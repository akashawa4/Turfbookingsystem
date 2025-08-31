import React, { useState, useEffect } from 'react';
import { useParams, Link } from 'react-router-dom';
import { useBooking } from '../../contexts/BookingContext';
import { CheckCircle, Download, Share2, MapPin, Calendar, Clock, Users, DollarSign, CreditCard } from 'lucide-react';

const BookingConfirmation = () => {
  const { bookingId } = useParams<{ bookingId: string }>();
  const { getBookingById } = useBooking();
  const [booking, setBooking] = useState<any>(null);

  useEffect(() => {
    if (bookingId) {
      const bookingData = getBookingById(bookingId);
      setBooking(bookingData);
    }
  }, [bookingId, getBookingById]);

  if (!booking) {
    return (
      <div className="min-h-screen bg-gray-50 flex items-center justify-center">
        <div className="text-center">
          <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-blue-600 mx-auto mb-4"></div>
          <p className="text-gray-600">Loading booking details...</p>
        </div>
      </div>
    );
  }

  const handleDownload = () => {
    // Create a simple text receipt
    const receipt = `
BOOKING CONFIRMATION
===================

Booking ID: ${booking.id}
Turf: ${booking.turfName}
Date: ${booking.date}
Time: ${booking.time}
Duration: ${booking.duration} hour(s)
Sport: ${booking.sport}
Players: ${booking.players}

Customer Details:
Name: ${booking.customerName}
Phone: ${booking.phone}
Email: ${booking.email}

Payment Details:
Total Amount: ₹${booking.totalAmount}
Booking Fee (Paid): ₹${booking.bookingFee}
Remaining (At Turf): ₹${booking.remainingAmount}

Status: ${booking.status.toUpperCase()}

IMPORTANT:
- Show this booking ID at the turf
- Pay remaining ₹${booking.remainingAmount} at turf location
- Arrive 10 minutes before booking time
- Bring your own sports equipment if needed

Thank you for choosing BookMyTurf!
    `;

    const blob = new Blob([receipt], { type: 'text/plain' });
    const url = window.URL.createObjectURL(blob);
    const a = document.createElement('a');
    a.href = url;
    a.download = `booking-${booking.id}.txt`;
    document.body.appendChild(a);
    a.click();
    document.body.removeChild(a);
    window.URL.revokeObjectURL(url);
  };

  const handleShare = async () => {
    if (navigator.share) {
      try {
        await navigator.share({
          title: 'My Turf Booking',
          text: `I just booked ${booking.turfName} for ${booking.date} at ${booking.time}! Booking ID: ${booking.id}`,
          url: window.location.href
        });
      } catch (error) {
        console.log('Error sharing:', error);
      }
    } else {
      // Fallback: copy to clipboard
      const text = `Booking ID: ${booking.id}\nTurf: ${booking.turfName}\nDate: ${booking.date}\nTime: ${booking.time}`;
      await navigator.clipboard.writeText(text);
      alert('Booking details copied to clipboard!');
    }
  };

  return (
    <div className="min-h-screen bg-gray-50 py-8">
      <div className="max-w-2xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Success Header */}
        <div className="text-center mb-8">
          <div className="w-20 h-20 bg-green-100 rounded-full flex items-center justify-center mx-auto mb-4">
            <CheckCircle className="w-10 h-10 text-green-600" />
          </div>
          <h1 className="text-3xl font-bold text-gray-900 mb-2">Booking Confirmed!</h1>
          <p className="text-gray-600">Your turf booking has been successfully confirmed</p>
        </div>

        {/* Booking Details Card */}
        <div className="bg-white rounded-2xl shadow-sm p-6 mb-6">
          <div className="flex items-center justify-between mb-6">
            <h2 className="text-xl font-semibold text-gray-900">Booking Details</h2>
            <div className="flex space-x-2">
              <button
                onClick={handleDownload}
                className="flex items-center space-x-2 px-3 py-2 text-sm bg-gray-100 text-gray-700 rounded-lg hover:bg-gray-200 transition-colors"
              >
                <Download className="w-4 h-4" />
                <span>Download</span>
              </button>
              <button
                onClick={handleShare}
                className="flex items-center space-x-2 px-3 py-2 text-sm bg-blue-100 text-blue-700 rounded-lg hover:bg-blue-200 transition-colors"
              >
                <Share2 className="w-4 h-4" />
                <span>Share</span>
              </button>
            </div>
          </div>

          {/* Booking ID */}
          <div className="bg-blue-50 rounded-xl p-4 mb-6">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm text-blue-600 font-medium">Booking ID</p>
                <p className="text-2xl font-bold text-blue-900">{booking.id}</p>
              </div>
              <div className="text-right">
                <p className="text-sm text-blue-600">Status</p>
                <span className="inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium bg-green-100 text-green-800">
                  Confirmed
                </span>
              </div>
            </div>
          </div>

          {/* Turf Information */}
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-6">
            <div className="space-y-4">
              <div className="flex items-center space-x-3">
                <div className="w-8 h-8 bg-blue-100 rounded-lg flex items-center justify-center">
                  <MapPin className="w-4 h-4 text-blue-600" />
                </div>
                <div>
                  <p className="text-sm text-gray-600">Turf</p>
                  <p className="font-medium text-gray-900">{booking.turfName}</p>
                </div>
              </div>
              <div className="flex items-center space-x-3">
                <div className="w-8 h-8 bg-green-100 rounded-lg flex items-center justify-center">
                  <Calendar className="w-4 h-4 text-green-600" />
                </div>
                <div>
                  <p className="text-sm text-gray-600">Date</p>
                  <p className="font-medium text-gray-900">{booking.date}</p>
                </div>
              </div>
              <div className="flex items-center space-x-3">
                <div className="w-8 h-8 bg-purple-100 rounded-lg flex items-center justify-center">
                  <Clock className="w-4 h-4 text-purple-600" />
                </div>
                <div>
                  <p className="text-sm text-gray-600">Time</p>
                  <p className="font-medium text-gray-900">{booking.time}</p>
                </div>
              </div>
            </div>
            <div className="space-y-4">
              <div className="flex items-center space-x-3">
                <div className="w-8 h-8 bg-yellow-100 rounded-lg flex items-center justify-center">
                  <Users className="w-4 h-4 text-yellow-600" />
                </div>
                <div>
                  <p className="text-sm text-gray-600">Duration</p>
                  <p className="font-medium text-gray-900">{booking.duration} hour(s)</p>
                </div>
              </div>
              <div className="flex items-center space-x-3">
                <div className="w-8 h-8 bg-red-100 rounded-lg flex items-center justify-center">
                  <span className="text-red-600 font-bold text-sm">⚽</span>
                </div>
                <div>
                  <p className="text-sm text-gray-600">Sport</p>
                  <p className="font-medium text-gray-900">{booking.sport}</p>
                </div>
              </div>
              <div className="flex items-center space-x-3">
                <div className="w-8 h-8 bg-indigo-100 rounded-lg flex items-center justify-center">
                  <Users className="w-4 h-4 text-indigo-600" />
                </div>
                <div>
                  <p className="text-sm text-gray-600">Players</p>
                  <p className="font-medium text-gray-900">{booking.players}</p>
                </div>
              </div>
            </div>
          </div>

          {/* Customer Details */}
          <div className="border-t border-gray-200 pt-6 mb-6">
            <h3 className="text-lg font-semibold text-gray-900 mb-4">Customer Details</h3>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <div>
                <p className="text-sm text-gray-600">Name</p>
                <p className="font-medium text-gray-900">{booking.customerName}</p>
              </div>
              <div>
                <p className="text-sm text-gray-600">Phone</p>
                <p className="font-medium text-gray-900">{booking.phone}</p>
              </div>
              <div className="md:col-span-2">
                <p className="text-sm text-gray-600">Email</p>
                <p className="font-medium text-gray-900">{booking.email}</p>
              </div>
            </div>
          </div>

          {/* Payment Details */}
          <div className="border-t border-gray-200 pt-6">
            <h3 className="text-lg font-semibold text-gray-900 mb-4">Payment Details</h3>
            <div className="bg-gray-50 rounded-xl p-4 space-y-3">
              <div className="flex justify-between">
                <span className="text-gray-600">Total Amount:</span>
                <span className="font-medium">₹{booking.totalAmount}</span>
              </div>
              <div className="flex justify-between">
                <span className="text-gray-600">Booking Fee (Paid Online):</span>
                <span className="font-medium text-green-600">₹{booking.bookingFee}</span>
              </div>
              <div className="flex justify-between">
                <span className="text-gray-600">Remaining (Pay at Turf):</span>
                <span className="font-medium text-blue-600">₹{booking.remainingAmount}</span>
              </div>
              <div className="border-t border-gray-200 pt-3">
                <div className="flex justify-between text-lg font-semibold">
                  <span>Payment Status:</span>
                  <span className="text-green-600">₹{booking.bookingFee} Paid</span>
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* Important Information */}
        <div className="bg-blue-50 rounded-2xl p-6 mb-6">
          <h3 className="text-lg font-semibold text-blue-900 mb-4">Important Information</h3>
          <ul className="space-y-3 text-blue-800">
            <li className="flex items-start space-x-3">
              <span className="w-2 h-2 bg-blue-600 rounded-full mt-2 flex-shrink-0"></span>
              <span>Show your <strong>Booking ID: {booking.id}</strong> at the turf location</span>
            </li>
            <li className="flex items-start space-x-3">
              <span className="w-2 h-2 bg-blue-600 rounded-full mt-2 flex-shrink-0"></span>
              <span>Pay the remaining <strong>₹{booking.remainingAmount}</strong> at the turf</span>
            </li>
            <li className="flex items-start space-x-3">
              <span className="w-2 h-2 bg-blue-600 rounded-full mt-2 flex-shrink-0"></span>
              <span>Arrive 10 minutes before your booking time</span>
            </li>
            <li className="flex items-start space-x-3">
              <span className="w-2 h-2 bg-blue-600 rounded-full mt-2 flex-shrink-0"></span>
              <span>Bring your own sports equipment if needed</span>
            </li>
            <li className="flex items-start space-x-3">
              <span className="w-2 h-2 bg-blue-600 rounded-full mt-2 flex-shrink-0"></span>
              <span>Contact the turf manager if you need to cancel or reschedule</span>
            </li>
          </ul>
        </div>

        {/* Action Buttons */}
        <div className="flex flex-col sm:flex-row gap-4">
          <Link
            to="/dashboard"
            className="flex-1 bg-gradient-to-r from-blue-600 to-purple-600 hover:from-blue-700 hover:to-purple-700 text-white py-3 px-6 rounded-xl font-semibold text-center transition-all duration-300 transform hover:scale-105 hover:shadow-lg"
          >
            View My Bookings
          </Link>
          <Link
            to="/"
            className="flex-1 bg-gray-100 hover:bg-gray-200 text-gray-700 py-3 px-6 rounded-xl font-semibold text-center transition-all duration-300"
          >
            Book Another Turf
          </Link>
        </div>
      </div>
    </div>
  );
};

export default BookingConfirmation;