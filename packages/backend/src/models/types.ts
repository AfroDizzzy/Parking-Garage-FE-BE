import { Booking } from "./bookingModel";

export interface BookingWithEmployeeName extends Booking {
  employeeName: string;
}

export interface CreateBookingRequest {
  employeeId: number;
  date: string;
  notes?: string;
}

export interface BookingAvailabilityResponse {
  available: boolean;
  bookedBy?: string;
  booking?: Booking;
}

export interface ApiResponse<T = any> {
  data?: T;
  message?: string;
  error?: string;
}

export interface CreateBookingResponse extends BookingWithEmployeeName {
  message: string;
}

export interface CancelBookingResponse {
  message: string;
  booking: Booking;
}
