import React from "react";
import { Calendar, Car, User, X } from "lucide-react";
import { deleteBooking } from "../services/api";
import { type Booking } from "../models/booking";

interface Props {
  bookings: Booking[];
  onBookingCancelled: () => void;
}

export const UpcomingBookings: React.FC<Props> = ({
  bookings,
  onBookingCancelled,
}) => {
  const handleCancel = async (id: number) => {
    await deleteBooking(id);
    onBookingCancelled();
  };

  const formatDate = (dateString: string) =>
    new Date(dateString).toLocaleDateString("en-US", {
      weekday: "long",
      year: "numeric",
      month: "long",
      day: "numeric",
    });

  return (
    <div className="space-y-6">
      <div className="flex items-center space-x-2 mb-4">
        <Calendar className="w-5 h-5 text-green-600" />
        <h2 className="text-xl font-semibold text-gray-800">
          Upcoming Bookings
        </h2>
      </div>

      <div className="space-y-3 max-h-96 overflow-y-auto">
        {bookings.length === 0 ? (
          <div className="text-center py-8 text-gray-500">
            <Car className="w-12 h-12 mx-auto mb-3 text-gray-300" />
            <p>No upcoming bookings</p>
            <p className="text-sm">The parking spot is available!</p>
          </div>
        ) : (
          bookings.map((b) => (
            <div
              key={b.id}
              className="border border-gray-200 rounded-lg p-4 hover:shadow-md transition-shadow"
            >
              <div className="flex justify-between items-start">
                <div className="flex-1">
                  <div className="flex items-center space-x-2 mb-2">
                    <User className="w-4 h-4 text-blue-600" />
                    <span className="font-medium text-gray-800">
                      {b.employeeName}
                    </span>
                  </div>
                  <div className="flex items-center space-x-2 mb-2">
                    <Calendar className="w-4 h-4 text-green-600" />
                    <span className="text-gray-600">{formatDate(b.date)}</span>
                  </div>
                  {b.notes && (
                    <p className="text-sm text-gray-600 mt-2">
                      <span className="font-medium">Notes:</span> {b.notes}
                    </p>
                  )}
                </div>
                <button
                  onClick={() => handleCancel(b.id)}
                  className="ml-4 text-red-600 hover:text-red-800 p-1 hover:bg-red-50 rounded"
                >
                  <X className="w-4 h-4" />
                </button>
              </div>
            </div>
          ))
        )}
      </div>
    </div>
  );
};
