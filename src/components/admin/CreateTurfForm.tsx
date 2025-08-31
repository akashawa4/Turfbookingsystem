import React, { useState } from 'react';
import { Plus, Building, User, Mail, Lock, MapPin, DollarSign } from 'lucide-react';
import { useAuth } from '../../contexts/AuthContext';

interface CreateTurfFormProps {
  onTurfCreated: () => void;
}

const CreateTurfForm: React.FC<CreateTurfFormProps> = ({ onTurfCreated }) => {
  const [turfData, setTurfData] = useState({
    name: '',
    location: '',
    price: '',
    description: '',
    facilities: '',
    images: ''
  });

  const [managerData, setManagerData] = useState({
    name: '',
    email: '',
    password: ''
  });

  const [isLoading, setIsLoading] = useState(false);
  const { createTurfManager } = useAuth();

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsLoading(true);

    try {
      // Create turf manager
      await createTurfManager({
        name: managerData.name,
        email: managerData.email,
        password: managerData.password,
        managedTurfId: 'turf_' + Date.now(),
        turfName: turfData.name
      });

      // Reset form
      setTurfData({
        name: '',
        location: '',
        price: '',
        description: '',
        facilities: '',
        images: ''
      });

      setManagerData({
        name: '',
        email: '',
        password: ''
      });

      onTurfCreated();
    } catch (error) {
      console.error('Error creating turf:', error);
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div className="bg-white rounded-2xl shadow-lg p-6">
      <h3 className="text-xl font-semibold text-gray-900 mb-6 flex items-center">
        <Plus className="w-5 h-5 mr-2 text-blue-600" />
        Create New Turf & Manager - Galli2Ground
      </h3>

      <form onSubmit={handleSubmit} className="space-y-6">
        {/* Turf Information */}
        <div className="space-y-4">
          <h4 className="text-lg font-medium text-gray-800 flex items-center">
            <Building className="w-4 h-4 mr-2 text-blue-600" />
            Turf Information
          </h4>
          
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">
                Turf Name
              </label>
              <input
                type="text"
                value={turfData.name}
                onChange={(e) => setTurfData({...turfData, name: e.target.value})}
                className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                placeholder="Enter turf name"
                required
              />
            </div>

            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">
                Location
              </label>
              <div className="relative">
                <input
                  type="text"
                  value={turfData.location}
                  onChange={(e) => setTurfData({...turfData, location: e.target.value})}
                  className="w-full pl-10 pr-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                  placeholder="Enter location"
                  required
                />
                <MapPin className="absolute left-3 top-1/2 transform -translate-y-1/2 w-4 h-4 text-gray-400" />
              </div>
            </div>

            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">
                Price per Hour
              </label>
              <div className="relative">
                <input
                  type="number"
                  value={turfData.price}
                  onChange={(e) => setTurfData({...turfData, price: e.target.value})}
                  className="w-full pl-10 pr-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                  placeholder="Enter price"
                  required
                />
                <DollarSign className="absolute left-3 top-1/2 transform -translate-y-1/2 w-4 h-4 text-gray-400" />
              </div>
            </div>

            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">
                Facilities
              </label>
              <input
                type="text"
                value={turfData.facilities}
                onChange={(e) => setTurfData({...turfData, facilities: e.target.value})}
                className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                placeholder="Parking, Changing rooms, etc."
              />
            </div>
          </div>

          <div>
            <label className="block text-sm font-medium text-gray-700 mb-2">
              Description
            </label>
            <textarea
              value={turfData.description}
              onChange={(e) => setTurfData({...turfData, description: e.target.value})}
              className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
              rows={3}
              placeholder="Enter turf description"
            />
          </div>
        </div>

        {/* Manager Information */}
        <div className="space-y-4">
          <h4 className="text-lg font-medium text-gray-800 flex items-center">
            <User className="w-4 h-4 mr-2 text-green-600" />
            Assign Turf Manager
          </h4>
          
          <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">
                Manager Name
              </label>
              <input
                type="text"
                value={managerData.name}
                onChange={(e) => setManagerData({...managerData, name: e.target.value})}
                className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                placeholder="Enter manager name"
                required
              />
            </div>

            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">
                Email
              </label>
              <div className="relative">
                <input
                  type="email"
                  value={managerData.email}
                  onChange={(e) => setManagerData({...managerData, email: e.target.value})}
                  className="w-full pl-10 pr-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                  placeholder="Enter email"
                  required
                />
                <Mail className="absolute left-3 top-1/2 transform -translate-y-1/2 w-4 h-4 text-gray-400" />
              </div>
            </div>

            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">
                Password
              </label>
              <div className="relative">
                <input
                  type="password"
                  value={managerData.password}
                  onChange={(e) => setManagerData({...managerData, password: e.target.value})}
                  className="w-full pl-10 pr-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                  placeholder="Enter password"
                  required
                />
                <Lock className="absolute left-3 top-1/2 transform -translate-y-1/2 w-4 h-4 text-gray-400" />
              </div>
            </div>
          </div>
        </div>

        <button
          type="submit"
          disabled={isLoading}
          className="w-full bg-gradient-to-r from-blue-600 to-purple-600 hover:from-blue-700 hover:to-purple-700 text-white py-3 px-4 rounded-xl font-semibold transition-all duration-300 disabled:opacity-50 disabled:cursor-not-allowed"
        >
          {isLoading ? 'Creating...' : 'Create Turf & Manager'}
        </button>
      </form>
    </div>
  );
};

export default CreateTurfForm;
