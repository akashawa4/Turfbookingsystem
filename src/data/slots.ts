type SlotStatus = 'available' | 'booked' | 'unavailable';

interface SlotData {
  [turfId: string]: {
    [dateKey: string]: {
      [time: string]: SlotStatus;
    };
  };
}

// Simulated slot availability data
const slotData: SlotData = {};

export const getSlotAvailability = (turfId: string, date: Date, time: string): SlotStatus => {
  const dateKey = date.toDateString();
  
  // Initialize if not exists
  if (!slotData[turfId]) {
    slotData[turfId] = {};
  }
  
  if (!slotData[turfId][dateKey]) {
    slotData[turfId][dateKey] = {};
  }

  // If slot status doesn't exist, generate random status
  if (!slotData[turfId][dateKey][time]) {
    const random = Math.random();
    if (random < 0.7) {
      slotData[turfId][dateKey][time] = 'available';
    } else if (random < 0.9) {
      slotData[turfId][dateKey][time] = 'booked';
    } else {
      slotData[turfId][dateKey][time] = 'unavailable';
    }
  }

  return slotData[turfId][dateKey][time];
};

export const bookSlot = (turfId: string, date: Date, time: string): boolean => {
  const dateKey = date.toDateString();
  
  if (!slotData[turfId]) {
    slotData[turfId] = {};
  }
  
  if (!slotData[turfId][dateKey]) {
    slotData[turfId][dateKey] = {};
  }

  if (slotData[turfId][dateKey][time] === 'available') {
    slotData[turfId][dateKey][time] = 'booked';
    return true;
  }
  
  return false;
};