import React, { useState, useEffect } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import { useBooking } from '../../contexts/BookingContext';
import { getTurfById } from '../../data/turfs';
import { Calendar, Clock, Users, DollarSign, CreditCard, MapPin, CheckCircle, ArrowLeft } from 'lucide-react';

const BookingFlow = () => {
  const { turfId } = useParams<{ turfId: string }>();
  const navigate = useNavigate();
  const { createBooking } = useBooking();
  const [currentStep, setCurrentStep] = useState(1);
  const [isLoading, setIsLoading] = useState(false);
  const [bookingData, setBookingData] = useState({
    date: '',
    time: '',
    duration: 2,
    sport: 'Football',
    players: 10,
    customerName: '',
    phone: '',
    email: ''
  });

  const [turf, setTurf] = useState<any>(null);

  useEffect(() => {
    if (turfId) {
      const turfData = getTurfById(turfId);
      setTurf(turfData);
    }
  }, [turfId]);

  if (!turf) {
    return (
      <div className="min-h-screen bg-gray-50 flex items-center justify-center">
        <div className="text-center">
          <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-blue-600 mx-auto mb-4"></div>
          <p className="text-gray-600">Loading turf details...</p>
        </div>
      </div>
    );
  }

  const calculateTotalAmount = () => {
    return turf.pricePerHour * bookingData.duration;
  };

  const calculateBookingFee = () => {
    return 100; // Fixed booking fee
  };

  const calculateRemainingAmount = () => {
    return calculateTotalAmount() - calculateBookingFee();
  };

  const handleInputChange = (field: string, value: string | number) => {
    setBookingData(prev => ({
      ...prev,
      [field]: value
    }));
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsLoading(true);

    try {
      const booking = {
        id: Date.now().toString(),
        turfId: turfId!,
      turfName: turf.name,
        ...bookingData,
        totalAmount: calculateTotalAmount(),
        bookingFee: calculateBookingFee(),
        remainingAmount: calculateRemainingAmount(),
        status: 'pending',
        createdAt: new Date().toISOString()
      };

      await createBooking(booking);
    navigate(`/confirmation/${booking.id}`);
    } catch (error) {
      console.error('Booking failed:', error);
    } finally {
      setIsLoading(false);
    }
  };

  const steps = [
    { id: 1, name: 'Booking Details', icon: Calendar },
    { id: 2, name: 'Payment', icon: CreditCard },
    { id: 3, name: 'Confirmation', icon: CheckCircle }
  ];

  return (
    <div className="min-h-screen bg-gray-50 py-8">
      <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Header */}
        <div className="mb-8">
          <button
            onClick={() => navigate(-1)}
            className="flex items-center space-x-2 text-gray-600 hover:text-blue-600 mb-4 transition-colors"
          >
            <ArrowLeft className="w-5 h-5" />
            <span>Back to Turf</span>
          </button>
          <h1 className="text-3xl font-bold text-gray-900">Book Your Turf</h1>
          <p className="text-gray-600 mt-2">Complete your booking for {turf.name}</p>
        </div>

        {/* Progress Steps */}
        <div className="bg-white rounded-2xl shadow-sm p-6 mb-8">
          <div className="flex items-center justify-between">
            {steps.map((step, index) => {
              const IconComponent = step.icon;
              const isActive = currentStep === step.id;
              const isCompleted = currentStep > step.id;
              
              return (
                <div key={step.id} className="flex items-center">
                  <div className={`flex items-center justify-center w-10 h-10 rounded-full border-2 ${
                    isCompleted ? 'bg-green-500 border-green-500 text-white' :
                    isActive ? 'bg-blue-500 border-blue-500 text-white' :
                    'bg-gray-100 border-gray-300 text-gray-500'
                  }`}>
                    {isCompleted ? (
                      <CheckCircle className="w-5 h-5" />
                    ) : (
                      <IconComponent className="w-5 h-5" />
                    )}
                    </div>
                  <div className="ml-3">
                    <p className={`text-sm font-medium ${
                      isActive ? 'text-blue-600' : 'text-gray-500'
                    }`}>
                      {step.name}
                    </p>
                  </div>
                  {index < steps.length - 1 && (
                    <div className={`w-16 h-0.5 mx-4 ${
                      isCompleted ? 'bg-green-500' : 'bg-gray-300'
                    }`} />
                  )}
                </div>
              );
            })}
          </div>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
          {/* Booking Form */}
          <div className="lg:col-span-2">
            <div className="bg-white rounded-2xl shadow-sm p-6">
              <h2 className="text-xl font-semibold text-gray-900 mb-6">Booking Details</h2>
              
              <form onSubmit={handleSubmit} className="space-y-6">
                {/* Date and Time */}
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-2">
                      <Calendar className="w-4 h-4 inline mr-2" />
                      Date
                    </label>
                    <input
                      type="date"
                      value={bookingData.date}
                      onChange={(e) => handleInputChange('date', e.target.value)}
                      className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                      required
                      min={new Date().toISOString().split('T')[0]}
                    />
                  </div>
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-2">
                      <Clock className="w-4 h-4 inline mr-2" />
                      Time
                    </label>
                    <select
                      value={bookingData.time}
                      onChange={(e) => handleInputChange('time', e.target.value)}
                      className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                      required
                    >
                      <option value="">Select time</option>
                      <option value="06:00-08:00">06:00 - 08:00</option>
                      <option value="08:00-10:00">08:00 - 10:00</option>
                      <option value="10:00-12:00">10:00 - 12:00</option>
                      <option value="14:00-16:00">14:00 - 16:00</option>
                      <option value="16:00-18:00">16:00 - 18:00</option>
                      <option value="18:00-20:00">18:00 - 20:00</option>
                      <option value="20:00-22:00">20:00 - 22:00</option>
                    </select>
                  </div>
                </div>

                {/* Duration and Sport */}
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-2">
                      Duration (Hours)
                    </label>
                    <select
                      value={bookingData.duration}
                      onChange={(e) => handleInputChange('duration', parseInt(e.target.value))}
                      className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                    >
                      <option value={1}>1 Hour</option>
                      <option value={2}>2 Hours</option>
                      <option value={3}>3 Hours</option>
                      <option value={4}>4 Hours</option>
                    </select>
                  </div>
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-2">
                      Sport
                    </label>
                    <select
                      value={bookingData.sport}
                      onChange={(e) => handleInputChange('sport', e.target.value)}
                      className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                    >
                      <option value="Football">Football</option>
                      <option value="Cricket">Cricket</option>
                      <option value="Tennis">Tennis</option>
                      <option value="Basketball">Basketball</option>
                      <option value="Badminton">Badminton</option>
                    </select>
                  </div>
                </div>

                {/* Number of Players */}
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">
                    <Users className="w-4 h-4 inline mr-2" />
                    Number of Players
                  </label>
                  <input
                    type="number"
                    value={bookingData.players}
                    onChange={(e) => handleInputChange('players', parseInt(e.target.value))}
                    className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                    min="1"
                    max="22"
                  />
                </div>

                {/* Customer Details */}
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-2">
                      Full Name
                    </label>
                    <input
                      type="text"
                      value={bookingData.customerName}
                      onChange={(e) => handleInputChange('customerName', e.target.value)}
                      className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                      required
                    />
                  </div>
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-2">
                      Phone Number
                    </label>
                    <input
                      type="tel"
                      value={bookingData.phone}
                      onChange={(e) => handleInputChange('phone', e.target.value)}
                      className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                      required
                    />
                  </div>
                </div>

                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">
                    Email Address
                  </label>
                  <input
                    type="email"
                    value={bookingData.email}
                    onChange={(e) => handleInputChange('email', e.target.value)}
                    className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                    required
                  />
        </div>

          <button
                  type="submit"
                  disabled={isLoading}
                  className="w-full bg-gradient-to-r from-blue-600 to-purple-600 hover:from-blue-700 hover:to-purple-700 text-white py-3 px-4 rounded-xl font-semibold transition-all duration-300 transform hover:scale-105 hover:shadow-lg disabled:opacity-50 disabled:cursor-not-allowed"
          >
                  {isLoading ? 'Processing...' : 'Proceed to Payment'}
          </button>
              </form>
            </div>
          </div>

          {/* Payment Summary */}
          <div className="lg:col-span-1">
            <div className="bg-white rounded-2xl shadow-sm p-6 sticky top-8">
              <h3 className="text-lg font-semibold text-gray-900 mb-4">Payment Summary</h3>
              
              {/* Turf Info */}
              <div className="mb-6 p-4 bg-gray-50 rounded-xl">
                <h4 className="font-medium text-gray-900 mb-2">{turf.name}</h4>
                <div className="flex items-center text-sm text-gray-600 mb-2">
                  <MapPin className="w-4 h-4 mr-1" />
                  {turf.location}
                </div>
                <div className="flex items-center text-sm text-gray-600">
                  <DollarSign className="w-4 h-4 mr-1" />
                  ₹{turf.pricePerHour}/hour
                </div>
              </div>

              {/* Booking Details */}
              <div className="space-y-3 mb-6">
                <div className="flex justify-between text-sm">
                  <span className="text-gray-600">Date:</span>
                  <span className="font-medium">{bookingData.date || 'Select date'}</span>
                </div>
                <div className="flex justify-between text-sm">
                  <span className="text-gray-600">Time:</span>
                  <span className="font-medium">{bookingData.time || 'Select time'}</span>
                </div>
                <div className="flex justify-between text-sm">
                  <span className="text-gray-600">Duration:</span>
                  <span className="font-medium">{bookingData.duration} hour(s)</span>
                </div>
                <div className="flex justify-between text-sm">
                  <span className="text-gray-600">Sport:</span>
                  <span className="font-medium">{bookingData.sport}</span>
                </div>
              </div>

              {/* Payment Breakdown */}
              <div className="border-t border-gray-200 pt-4 space-y-3">
                <div className="flex justify-between text-sm">
                  <span className="text-gray-600">Total Amount:</span>
                  <span className="font-medium">₹{calculateTotalAmount()}</span>
                </div>
                <div className="flex justify-between text-sm">
                  <span className="text-gray-600">Booking Fee (Online):</span>
                  <span className="font-medium text-green-600">₹{calculateBookingFee()}</span>
                </div>
                <div className="flex justify-between text-sm">
                  <span className="text-gray-600">Remaining (At Turf):</span>
                  <span className="font-medium text-blue-600">₹{calculateRemainingAmount()}</span>
                </div>
                
                <div className="border-t border-gray-200 pt-3">
                  <div className="flex justify-between text-lg font-semibold">
                    <span>Pay Now:</span>
                    <span className="text-green-600">₹{calculateBookingFee()}</span>
                  </div>
                </div>
              </div>

              {/* Payment Info */}
              <div className="mt-6 p-4 bg-blue-50 rounded-xl">
                <h4 className="font-medium text-blue-900 mb-2">Payment Information</h4>
                <ul className="text-sm text-blue-800 space-y-1">
                  <li>• Pay ₹100 booking fee online</li>
                  <li>• Remaining ₹{calculateRemainingAmount()} at turf</li>
                  <li>• Booking confirmed after payment</li>
                  <li>• Show booking ID at turf</li>
                </ul>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default BookingFlow;