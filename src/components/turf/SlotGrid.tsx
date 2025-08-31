import React from 'react';
import { Clock, CheckCircle, XCircle, Lock } from 'lucide-react';
import { getSlotAvailability } from '../../data/slots';

interface SlotGridProps {
  turfId: string;
  selectedDate: Date;
  selectedSlots: string[];
  onSlotsChange: (slots: string[]) => void;
  pricePerHour: number;
}

const SlotGrid: React.FC<SlotGridProps> = ({
  turfId,
  selectedDate,
  selectedSlots,
  onSlotsChange,
  pricePerHour
}) => {
  const timeSlots = [
    '6:00 AM', '7:00 AM', '8:00 AM', '9:00 AM', '10:00 AM', '11:00 AM',
    '12:00 PM', '1:00 PM', '2:00 PM', '3:00 PM', '4:00 PM', '5:00 PM',
    '6:00 PM', '7:00 PM', '8:00 PM', '9:00 PM', '10:00 PM'
  ];

  const dates = Array.from({ length: 7 }, (_, i) => {
    const date = new Date();
    date.setDate(date.getDate() + i);
    return date;
  });

  const getSlotStatus = (date: Date, time: string) => {
    return getSlotAvailability(turfId, date, time);
  };

  const toggleSlot = (time: string) => {
    const slotKey = `${selectedDate.toDateString()}-${time}`;
    const status = getSlotStatus(selectedDate, time);
    
    if (status !== 'available') return;

    if (selectedSlots.includes(time)) {
      onSlotsChange(selectedSlots.filter(slot => slot !== time));
    } else {
      onSlotsChange([...selectedSlots, time]);
    }
  };

  const formatDate = (date: Date) => {
    const today = new Date();
    const tomorrow = new Date(today);
    tomorrow.setDate(tomorrow.getDate() + 1);

    if (date.toDateString() === today.toDateString()) return 'Today';
    if (date.toDateString() === tomorrow.toDateString()) return 'Tomorrow';
    
    return date.toLocaleDateString('en-IN', { 
      weekday: 'short', 
      day: 'numeric',
      month: 'short'
    });
  };

  return (
    <div className="bg-white rounded-2xl shadow-lg p-6">
      {/* Date Selector */}
      <div className="mb-6">
        <h4 className="text-lg font-semibold text-gray-900 mb-4">Select Date</h4>
        <div className="flex space-x-2 overflow-x-auto pb-2">
          {dates.map((date) => (
            <button
              key={date.toDateString()}
              onClick={() => {
                setSelectedDate(date);
                onSlotsChange([]);
              }}
              className={`flex-shrink-0 px-4 py-3 rounded-xl text-center transition-all ${
                date.toDateString() === selectedDate.toDateString()
                  ? 'bg-blue-600 text-white'
                  : 'bg-gray-100 text-gray-700 hover:bg-blue-100'
              }`}
            >
              <div className="text-sm font-medium">{formatDate(date)}</div>
              <div className="text-xs opacity-75">{date.getDate()}</div>
            </button>
          ))}
        </div>
      </div>

      {/* Time Slots Grid */}
      <div>
        <h4 className="text-lg font-semibold text-gray-900 mb-4 flex items-center">
          <Clock className="w-5 h-5 mr-2" />
          Available Time Slots - {formatDate(selectedDate)}
        </h4>
        
        <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 xl:grid-cols-6 gap-3">
          {timeSlots.map((time) => {
            const status = getSlotStatus(selectedDate, time);
            const isSelected = selectedSlots.includes(time);
            
            let buttonClass = 'relative p-4 rounded-xl border-2 font-medium transition-all duration-200 ';
            let icon = null;
            
            switch (status) {
              case 'available':
                buttonClass += isSelected 
                  ? 'border-blue-600 bg-blue-600 text-white hover:bg-blue-700'
                  : 'border-gray-200 bg-white text-gray-700 hover:border-blue-300 hover:bg-blue-50';
                icon = isSelected ? <CheckCircle className="w-4 h-4 absolute top-2 right-2" /> : null;
                break;
              case 'booked':
                buttonClass += 'border-red-200 bg-red-50 text-red-600 cursor-not-allowed';
                icon = <Lock className="w-4 h-4 absolute top-2 right-2" />;
                break;
              case 'unavailable':
                buttonClass += 'border-gray-200 bg-gray-100 text-gray-400 cursor-not-allowed';
                icon = <XCircle className="w-4 h-4 absolute top-2 right-2" />;
                break;
            }

            return (
              <button
                key={time}
                onClick={() => toggleSlot(time)}
                disabled={status !== 'available'}
                className={buttonClass}
              >
                {icon}
                <div className="text-sm">{time}</div>
                <div className="text-xs opacity-75">₹{pricePerHour}</div>
              </button>
            );
          })}
        </div>

        {/* Legend */}
        <div className="flex flex-wrap justify-center gap-6 mt-6 text-sm">
          <div className="flex items-center space-x-2">
            <div className="w-4 h-4 bg-white border-2 border-gray-200 rounded"></div>
            <span className="text-gray-600">Available</span>
          </div>
          <div className="flex items-center space-x-2">
            <div className="w-4 h-4 bg-blue-600 rounded"></div>
            <span className="text-gray-600">Selected</span>
          </div>
          <div className="flex items-center space-x-2">
            <div className="w-4 h-4 bg-red-50 border-2 border-red-200 rounded"></div>
            <span className="text-gray-600">Booked</span>
          </div>
          <div className="flex items-center space-x-2">
            <div className="w-4 h-4 bg-gray-100 border-2 border-gray-200 rounded"></div>
            <span className="text-gray-600">Unavailable</span>
          </div>
        </div>
      </div>
    </div>
  );
};

export default SlotGrid;