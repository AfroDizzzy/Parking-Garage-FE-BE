import { Booking, CreateBookingRequest } from "./types";

// In-memory storage (replace with database in production)
let bookings: Booking[] = [];

export const getBookings = (): Booking[] => {
  return bookings;
};

export const getBookingById = (id: number): Booking | undefined => {
  return bookings.find((booking) => booking.id === id);
};

export const getBookingByDate = (date: string): Booking | undefined => {
  return bookings.find((booking) => booking.date === date);
};

export const addBooking = (
  bookingData: Omit<CreateBookingRequest, "notes"> & { notes: string }
): Booking => {
  const newBooking: Booking = {
    id: bookings.length + 1,
    ...bookingData,
    createdAt: new Date().toISOString(),
  };
  bookings.push(newBooking);
  return newBooking;
};

export const removeBooking = (id: number): Booking | null => {
  const index = bookings.findIndex((booking) => booking.id === id);
  if (index === -1) return null;

  return bookings.splice(index, 1)[0] ?? null;
};

export const updateBooking = (id: number, updates: Booking): Booking | null => {
  const index = bookings.findIndex((booking) => booking.id === id);
  if (index === -1) return null;
  // date: string;
  //   notes: string;
  //   createdAt: string;

  bookings[index] = { ...bookings[index], ...updates };
  return bookings[index] ?? null;
};
