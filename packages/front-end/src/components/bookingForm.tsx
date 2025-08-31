import React, { useState } from "react";
import { Calendar, Plus } from "lucide-react";
import { type Employee, createBooking } from "../services/api";

interface Props {
  employees: Employee[];
  onBookingCreated: () => void;
  getTodayDate: () => string;
}

export const BookingForm: React.FC<Props> = ({
  employees,
  onBookingCreated,
  getTodayDate,
}) => {
  const [selectedEmployee, setSelectedEmployee] = useState("");
  const [selectedDate, setSelectedDate] = useState("");
  const [notes, setNotes] = useState("");
  const [loading, setLoading] = useState(false);

  const handleBooking = async () => {
    if (!selectedEmployee || !selectedDate) return;

    setLoading(true);
    try {
      await createBooking({
        employeeId: parseInt(selectedEmployee),
        employeeName:
          employees.find((e) => e.id === parseInt(selectedEmployee))?.name ||
          "",
        date: selectedDate,
        notes,
      });
      onBookingCreated();
      setSelectedEmployee("");
      setSelectedDate("");
      setNotes("");
    } catch {
      alert("Booking failed. Try again.");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="space-y-6">
      <div className="flex items-center space-x-2 mb-4">
        <Plus className="w-5 h-5 text-blue-600" />
        <h2 className="text-xl font-semibold text-gray-800">New Booking</h2>
      </div>

      <div className="space-y-4">
        <div>
          <label className="block text-sm font-medium text-gray-700 mb-2">
            Employee
          </label>
          <select
            value={selectedEmployee}
            onChange={(e) => setSelectedEmployee(e.target.value)}
            className="w-full p-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
          >
            <option value="">Select an employee</option>
            {employees.map((e) => (
              <option key={e.id} value={e.id}>
                {e.name}
              </option>
            ))}
          </select>
        </div>

        <div>
          <label className="block text-sm font-medium text-gray-700 mb-2">
            Date
          </label>
          <input
            type="date"
            value={selectedDate}
            onChange={(e) => setSelectedDate(e.target.value)}
            min={getTodayDate()}
            className="w-full p-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
          />
        </div>

        <div>
          <label className="block text-sm font-medium text-gray-700 mb-2">
            Notes (Optional)
          </label>
          <textarea
            value={notes}
            onChange={(e) => setNotes(e.target.value)}
            placeholder="Any additional notes..."
            className="w-full p-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
            rows={3}
          />
        </div>

        <button
          onClick={handleBooking}
          disabled={loading}
          className="w-full bg-blue-600 text-white py-3 px-4 rounded-lg hover:bg-blue-700 disabled:bg-gray-400 flex items-center justify-center space-x-2"
        >
          {loading ? (
            <div className="w-5 h-5 border-2 border-white border-t-transparent rounded-full animate-spin" />
          ) : (
            <>
              <Calendar className="w-5 h-5" />
              <span>Book Parking Spot</span>
            </>
          )}
        </button>
      </div>
    </div>
  );
};
