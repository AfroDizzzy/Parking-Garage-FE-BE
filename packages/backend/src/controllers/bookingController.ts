import { Request, Response } from "express";
import {
  getBookings,
  getBookingByDate,
  addBooking,
  removeBooking,
  getBookingById,
} from "../models/bookingModel";
import { getEmployeeById } from "../models/employeeModel";
import {
  Booking,
  BookingWithEmployeeName,
  CreateBookingRequest,
  BookingAvailabilityResponse,
  CreateBookingResponse,
  CancelBookingResponse,
} from "../models/types";

export const getAllBookings = (req: Request, res: Response): void => {
  try {
    const bookings: Booking[] = getBookings();
    const bookingsWithEmployeeNames: BookingWithEmployeeName[] = bookings.map(
      (booking) => {
        const employee = getEmployeeById(booking.employeeId);
        return {
          ...booking,
          employeeName: employee ? employee.name : "Unknown",
        };
      }
    );
    res.json(bookingsWithEmployeeNames);
  } catch (error) {
    res.status(500).json({ error: "Failed to retrieve bookings" });
  }
};

export const getUpcomingBookings = (req: Request, res: Response): void => {
  try {
    const today = new Date();
    const thirtyDaysFromNow = new Date();
    thirtyDaysFromNow.setDate(today.getDate() + 30);

    const bookings: Booking[] = getBookings();
    const upcomingBookings: BookingWithEmployeeName[] = bookings
      .filter((booking) => {
        const bookingDate = new Date(booking.date);
        return bookingDate >= today && bookingDate <= thirtyDaysFromNow;
      })
      .map((booking) => {
        const employee = getEmployeeById(booking.employeeId);
        return {
          ...booking,
          employeeName: employee ? employee.name : "Unknown",
        };
      })
      .sort((a, b) => new Date(a.date).getTime() - new Date(b.date).getTime());

    res.json(upcomingBookings);
  } catch (error) {
    res.status(500).json({ error: "Failed to retrieve upcoming bookings" });
  }
};

export const checkDateAvailability = (req: Request, res: Response): void => {
  try {
    const date: string = req.params.date as string;
    const existingBooking = getBookingByDate(date);

    if (existingBooking) {
      const employee = getEmployeeById(existingBooking.employeeId);
      const response: BookingAvailabilityResponse = {
        available: false,
        bookedBy: employee ? employee.name : "Unknown",
        booking: existingBooking,
      };
      res.json(response);
    } else {
      const response: BookingAvailabilityResponse = { available: true };
      res.json(response);
    }
  } catch (error) {
    res.status(500).json({ error: "Failed to check date availability" });
  }
};

export const createBooking = (
  req: Request<{}, CreateBookingResponse, CreateBookingRequest>,
  res: Response<CreateBookingResponse>
): void => {
  try {
    const { employeeId, date, notes } = req.body;

    const employee = getEmployeeById(employeeId);
    if (!employee) {
      res.status(400).json({ error: "Invalid employee ID" } as any);
      return;
    }

    const bookingDate = new Date(date);
    const today = new Date();
    today.setHours(0, 0, 0, 0);

    if (bookingDate < today) {
      res.status(400).json({ error: "Cannot book dates in the past" } as any);
      return;
    }

    const existingBooking = getBookingByDate(date);
    if (existingBooking) {
      res.status(409).json({ error: "This date is already booked" } as any);
      return;
    }

    const newBooking = addBooking({
      employeeId,
      date,
      notes: notes || "",
    });

    const response: CreateBookingResponse = {
      ...newBooking,
      employeeName: employee.name,
      message: "Booking created successfully",
    };

    res.status(201).json(response);
  } catch (error) {
    res.status(500).json({ error: "Failed to create booking" } as any);
  }
};

export const cancelBooking = (req: Request, res: Response): void => {
  try {
    const bookingId = parseInt(req.params.id as string, 10);

    if (isNaN(bookingId)) {
      res.status(400).json({ error: "Invalid booking ID" });
      return;
    }

    const booking = getBookingById(bookingId);
    if (!booking) {
      res.status(404).json({ error: "Booking not found" });
      return;
    }

    const deletedBooking = removeBooking(bookingId);
    const response: CancelBookingResponse = {
      message: "Booking cancelled successfully",
      booking: deletedBooking!,
    };

    res.json(response);
  } catch (error) {
    res.status(500).json({ error: "Failed to cancel booking" });
  }
};
