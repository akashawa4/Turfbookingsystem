import React from 'react';
import { Calendar, Clock, MapPin, User, Phone, Mail } from 'lucide-react';

interface UserDetailsStepProps {
  userDetails: {
    name: string;
    phone: string;
    email: string;
  };
  onUserDetailsChange: (details: any) => void;
  turf: any;
  selectedDate: Date;
  selectedSlots: string[];
  totalAmount: number;
}

const UserDetailsStep: React.FC<UserDetailsStepProps> = ({
  userDetails,
  onUserDetailsChange,
  turf,
  selectedDate,
  selectedSlots,
  totalAmount
}) => {
  const updateField = (field: string, value: string) => {
    onUserDetailsChange({ ...userDetails, [field]: value });
  };

  return (
    <div>
      <h2 className="text-2xl font-bold text-gray-900 mb-6">Booking Details</h2>

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
        {/* User Details Form */}
        <div>
          <h3 className="text-lg font-semibold text-gray-900 mb-4">Contact Information</h3>
          <div className="space-y-4">
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">
                <User className="w-4 h-4 inline mr-2" />
                Full Name
              </label>
              <input
                type="text"
                value={userDetails.name}
                onChange={(e) => updateField('name', e.target.value)}
                className="w-full p-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                placeholder="Enter your full name"
                required
              />
            </div>

            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">
                <Phone className="w-4 h-4 inline mr-2" />
                Phone Number
              </label>
              <input
                type="tel"
                value={userDetails.phone}
                onChange={(e) => updateField('phone', e.target.value)}
                className="w-full p-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                placeholder="+91 XXXXX XXXXX"
                required
              />
            </div>

            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">
                <Mail className="w-4 h-4 inline mr-2" />
                Email Address
              </label>
              <input
                type="email"
                value={userDetails.email}
                onChange={(e) => updateField('email', e.target.value)}
                className="w-full p-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                placeholder="your.email@example.com"
                required
              />
            </div>
          </div>
        </div>

        {/* Booking Summary */}
        <div>
          <h3 className="text-lg font-semibold text-gray-900 mb-4">Booking Summary</h3>
          <div className="bg-gray-50 rounded-xl p-6 space-y-4">
            {/* Turf Info */}
            <div className="flex items-start space-x-4">
              <img
                src={turf.images[0]}
                alt={turf.name}
                className="w-20 h-20 rounded-lg object-cover"
              />
              <div className="flex-1">
                <h4 className="font-semibold text-gray-900">{turf.name}</h4>
                <div className="flex items-center text-gray-600 text-sm mt-1">
                  <MapPin className="w-4 h-4 mr-1" />
                  <span>{turf.location}</span>
                </div>
              </div>
            </div>

            {/* Date and Slots */}
            <div className="border-t border-gray-200 pt-4">
              <div className="flex items-center text-gray-700 mb-2">
                <Calendar className="w-4 h-4 mr-2" />
                <span className="font-medium">
                  {selectedDate.toLocaleDateString('en-IN', { 
                    weekday: 'long',
                    year: 'numeric',
                    month: 'long',
                    day: 'numeric'
                  })}
                </span>
              </div>
              
              <div className="flex items-start text-gray-700">
                <Clock className="w-4 h-4 mr-2 mt-0.5" />
                <div>
                  <span className="font-medium">Time Slots:</span>
                  <div className="mt-1 space-y-1">
                    {selectedSlots.map((slot) => (
                      <div key={slot} className="flex justify-between text-sm">
                        <span>{slot}</span>
                        <span>₹{turf.pricePerHour}</span>
                      </div>
                    ))}
                  </div>
                </div>
              </div>
            </div>

            {/* Total */}
            <div className="border-t border-gray-200 pt-4">
              <div className="flex justify-between items-center">
                <span className="text-lg font-semibold text-gray-900">Total Amount</span>
                <span className="text-2xl font-bold text-blue-600">₹{totalAmount}</span>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default UserDetailsStep;