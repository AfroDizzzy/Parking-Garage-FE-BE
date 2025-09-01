import React from "react";
import { type Booking } from "../models/booking";

interface Props {
  bookings: Booking[];
  upcoming: Booking[];
  isTodayAvailable: boolean;
}

export const BookingStats: React.FC<Props> = ({
  bookings,
  upcoming,
  isTodayAvailable,
}) => {
  return (
    <div className="mt-8 bg-gray-50 rounded-lg p-6">
      <h3 className="text-lg font-semibold text-gray-800 mb-4">
        Booking Statistics
      </h3>
      <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
        <div className="text-center">
          <div className="text-2xl font-bold text-blue-600">
            {bookings.length}
          </div>
          <div className="text-gray-600">Total Bookings</div>
        </div>
        <div className="text-center">
          <div className="text-2xl font-bold text-green-600">
            {upcoming.length}
          </div>
          <div className="text-gray-600">Upcoming</div>
        </div>
        <div className="text-center">
          <div className="text-2xl font-bold text-orange-600">
            {isTodayAvailable ? "Available" : "Booked"}
          </div>
          <div className="text-gray-600">Today's Status</div>
        </div>
      </div>
    </div>
  );
};
