import React from "react";
import { Car } from "lucide-react";

export const Header: React.FC = () => (
  <div className="bg-gradient-to-r from-blue-600 to-indigo-600 text-white p-6">
    <div className="flex items-center space-x-3">
      <Car className="w-8 h-8" />
      <div>
        <h1 className="text-2xl font-bold">Car Park Booking System</h1>
        <p className="text-blue-100">Reserve the shared parking spot</p>
      </div>
    </div>
  </div>
);
