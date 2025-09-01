import React, { useEffect, useState } from "react";

import {
  checkDate,
  getBookings,
  getEmployees,
  getUpcomingBookings,
} from "./services/api";
import { type Booking } from "./models/booking";
import { type Employee } from "./models/employee";
import { BookingForm } from "./components/bookingForm";
import { UpcomingBookings } from "./components/upcomingBookings";
import { BookingStats } from "./components/bookingStats";
import { MessageBanner } from "./components/MessageBanner";
import { Header } from "./components/Header";

const CarParkBookingSystem: React.FC = () => {
  const [employees, setEmployees] = useState<Employee[]>([]);
  const [bookings, setBookings] = useState<Booking[]>([]);
  const [upcomingBookings, setUpcomingBookings] = useState<Booking[]>([]);
  const [message, setMessage] = useState({
    type: "" as "success" | "error" | "",
    text: "",
  });
  const [todayAvailable, setTodayAvailable] = useState(true);

  const getTodayDate = () => new Date().toISOString().split("T")[0];

  const loadData = async () => {
    try {
      const [emp, allBookings, upcoming] = await Promise.all([
        getEmployees(),
        getBookings(),
        getUpcomingBookings(),
      ]);
      setEmployees(emp);
      setBookings(allBookings);
      setUpcomingBookings(upcoming);

      const today = await checkDate(getTodayDate());
      setTodayAvailable(today.available);
    } catch {
      setMessage({ type: "error", text: "Failed to load data" });
    }
  };

  useEffect(() => {
    loadData();
  }, []);

  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-50 to-indigo-100 p-4">
      <div className="max-w-4xl mx-auto">
        <div className="bg-white rounded-lg shadow-lg overflow-hidden">
          <Header />
          <div className="p-6">
            <MessageBanner
              type={message.type}
              text={message.text}
              onClose={() => setMessage({ type: "", text: "" })}
            />

            <div className="grid md:grid-cols-2 gap-8">
              <BookingForm
                employees={employees}
                onBookingCreated={loadData}
                getTodayDate={getTodayDate}
              />
              <UpcomingBookings
                bookings={upcomingBookings}
                onBookingCancelled={loadData}
              />
            </div>

            <BookingStats
              bookings={bookings}
              upcoming={upcomingBookings}
              isTodayAvailable={todayAvailable}
            />
          </div>
        </div>
      </div>
    </div>
  );
};

export default CarParkBookingSystem;
