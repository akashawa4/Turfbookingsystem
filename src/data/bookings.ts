interface Booking {
  id: string;
  turfId: string;
  turfName: string;
  location: string;
  date: Date;
  slots: string[];
  userDetails: {
    name: string;
    phone: string;
    email: string;
  };
  paymentMethod: string;
  totalAmount: number;
  promoCode?: string;
  status: 'confirmed' | 'completed' | 'cancelled';
  createdAt: Date;
}

let bookings: Booking[] = [
  {
    id: 'BMT123456',
    turfId: '1',
    turfName: 'Elite Sports Complex',
    location: 'Rankala, Kolhapur',
    date: new Date('2025-01-20'),
    slots: ['6:00 PM', '7:00 PM'],
    userDetails: {
      name: 'John Doe',
      phone: '+91 98765 43210',
      email: 'john.doe@example.com'
    },
    paymentMethod: 'upi',
    totalAmount: 2400,
    status: 'confirmed',
    createdAt: new Date('2025-01-15')
  },
  {
    id: 'BMT123457',
    turfId: '2',
    turfName: 'Champions Cricket Ground',
    location: 'Shivaji University, Kolhapur',
    date: new Date('2025-01-10'),
    slots: ['8:00 AM', '9:00 AM', '10:00 AM'],
    userDetails: {
      name: 'John Doe',
      phone: '+91 98765 43210',
      email: 'john.doe@example.com'
    },
    paymentMethod: 'card',
    totalAmount: 2400,
    status: 'completed',
    createdAt: new Date('2025-01-05')
  }
];

export const createBooking = (bookingData: {
  turfId: string;
  turfName: string;
  date: Date;
  slots: string[];
  userDetails: any;
  paymentMethod: string;
  totalAmount: number;
  promoCode?: string;
}): Booking => {
  const newBooking: Booking = {
    id: `BMT${Date.now().toString().slice(-6)}`,
    ...bookingData,
    location: 'Kolhapur, India', // Would be fetched from turf data
    status: 'confirmed',
    createdAt: new Date()
  };

  bookings.push(newBooking);
  return newBooking;
};

export const getBookingById = (id: string): Booking | null => {
  return bookings.find(booking => booking.id === id) || null;
};

export const getUserBookings = (userId: string): Booking[] => {
  // In real app, would filter by actual user ID
  return bookings;
};

export const getAllBookings = (): Booking[] => {
  return bookings;
};