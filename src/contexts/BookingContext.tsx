import React, { createContext, useContext, useState, useEffect, ReactNode } from 'react';

interface Booking {
  id: string;
  turfId: string;
  turfName: string;
  date: string;
  time: string;
  duration: number;
  sport: string;
  players: number;
  customerName: string;
  phone: string;
  email: string;
  totalAmount: number;
  bookingFee: number;
  remainingAmount: number;
  status: 'pending' | 'confirmed' | 'cancelled' | 'refunded';
  createdAt: string;
}

interface BookingContextType {
  bookings: Booking[];
  createBooking: (booking: Omit<Booking, 'id' | 'createdAt'>) => Promise<void>;
  getBookingById: (id: string) => Booking | null;
  updateBookingStatus: (id: string, status: Booking['status']) => void;
  cancelBooking: (id: string) => void;
}

const BookingContext = createContext<BookingContextType | undefined>(undefined);

// Local storage key for bookings
const BOOKINGS_STORAGE_KEY = 'galli2ground_bookings';

export const BookingProvider: React.FC<{ children: ReactNode }> = ({ children }) => {
  const [bookings, setBookings] = useState<Booking[]>([]);

  // Load bookings from localStorage on component mount
  useEffect(() => {
    const savedBookings = localStorage.getItem(BOOKINGS_STORAGE_KEY);
    if (savedBookings) {
      try {
        setBookings(JSON.parse(savedBookings));
      } catch (error) {
        console.error('Error parsing saved bookings:', error);
        localStorage.removeItem(BOOKINGS_STORAGE_KEY);
      }
    }
  }, []);

  // Save bookings to localStorage whenever bookings change
  useEffect(() => {
    localStorage.setItem(BOOKINGS_STORAGE_KEY, JSON.stringify(bookings));
  }, [bookings]);

  const createBooking = async (bookingData: Omit<Booking, 'id' | 'createdAt'>): Promise<void> => {
    const newBooking: Booking = {
      ...bookingData,
      id: Date.now().toString(),
      createdAt: new Date().toISOString()
    };

    setBookings(prevBookings => [...prevBookings, newBooking]);
  };

  const getBookingById = (id: string): Booking | null => {
    return bookings.find(booking => booking.id === id) || null;
  };

  const updateBookingStatus = (id: string, status: Booking['status']): void => {
    setBookings(prevBookings =>
      prevBookings.map(booking =>
        booking.id === id ? { ...booking, status } : booking
      )
    );
  };

  const cancelBooking = (id: string): void => {
    setBookings(prevBookings =>
      prevBookings.map(booking =>
        booking.id === id ? { ...booking, status: 'cancelled' } : booking
      )
    );
  };

  const value: BookingContextType = {
    bookings,
    createBooking,
    getBookingById,
    updateBookingStatus,
    cancelBooking
  };

  return (
    <BookingContext.Provider value={value}>
      {children}
    </BookingContext.Provider>
  );
};

export const useBooking = (): BookingContextType => {
  const context = useContext(BookingContext);
  if (context === undefined) {
    throw new Error('useBooking must be used within a BookingProvider');
  }
  return context;
};