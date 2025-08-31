// import React, { useState, useEffect } from "react";
// import {
//   Calendar,
//   Car,
//   User,
//   Plus,
//   X,
//   CheckCircle,
//   AlertCircle,
// } from "lucide-react";

// const CarParkBookingSystem = () => {
//   const [employees, setEmployees] = useState([]);
//   const [bookings, setBookings] = useState([]);
//   const [selectedEmployee, setSelectedEmployee] = useState("");
//   const [selectedDate, setSelectedDate] = useState("");
//   const [notes, setNotes] = useState("");
//   const [message, setMessage] = useState({ type: "", text: "" });
//   const [loading, setLoading] = useState(false);

//   // Mock API functions (replace with actual API calls)
//   const mockEmployees = [
//     { id: 1, name: "John Smith", email: "john@company.com" },
//     { id: 2, name: "Sarah Johnson", email: "sarah@company.com" },
//     { id: 3, name: "Mike Chen", email: "mike@company.com" },
//     { id: 4, name: "Emily Davis", email: "emily@company.com" },
//     { id: 5, name: "David Wilson", email: "david@company.com" },
//   ];

//   const [mockBookings, setMockBookings] = useState([]);

//   useEffect(() => {
//     // Initialize employees
//     setEmployees(mockEmployees);
//   }, []);

//   const formatDate = (dateString) => {
//     return new Date(dateString).toLocaleDateString("en-US", {
//       weekday: "long",
//       year: "numeric",
//       month: "long",
//       day: "numeric",
//     });
//   };

//   const getTodayDate = () => {
//     return new Date().toISOString().split("T")[0];
//   };

//   const checkDateAvailability = (date) => {
//     return !mockBookings.some((booking) => booking.date === date);
//   };

//   const handleBooking = async () => {
//     if (!selectedEmployee || !selectedDate) {
//       setMessage({ type: "error", text: "Please select an employee and date" });
//       return;
//     }

//     // Check if date is in the past
//     const bookingDate = new Date(selectedDate);
//     const today = new Date();
//     today.setHours(0, 0, 0, 0);

//     if (bookingDate < today) {
//       setMessage({ type: "error", text: "Cannot book dates in the past" });
//       return;
//     }

//     // Check availability
//     if (!checkDateAvailability(selectedDate)) {
//       setMessage({ type: "error", text: "This date is already booked" });
//       return;
//     }

//     setLoading(true);

//     try {
//       // Simulate API call
//       await new Promise((resolve) => setTimeout(resolve, 500));

//       const employee = employees.find(
//         (emp) => emp.id === parseInt(selectedEmployee)
//       );
//       const newBooking = {
//         id: mockBookings.length + 1,
//         employeeId: parseInt(selectedEmployee),
//         employeeName: employee.name,
//         date: selectedDate,
//         notes: notes,
//         createdAt: new Date().toISOString(),
//       };

//       setMockBookings([...mockBookings, newBooking]);
//       setBookings([...bookings, newBooking]);

//       // Reset form
//       setSelectedEmployee("");
//       setSelectedDate("");
//       setNotes("");

//       setMessage({
//         type: "success",
//         text: `Booking confirmed for ${employee.name} on ${formatDate(
//           selectedDate
//         )}`,
//       });
//     } catch (error) {
//       setMessage({
//         type: "error",
//         text: "Failed to create booking. Please try again.",
//       });
//     } finally {
//       setLoading(false);
//     }
//   };

//   const handleCancelBooking = async (bookingId) => {
//     setLoading(true);

//     try {
//       // Simulate API call
//       await new Promise((resolve) => setTimeout(resolve, 300));

//       const updatedBookings = mockBookings.filter(
//         (booking) => booking.id !== bookingId
//       );
//       setMockBookings(updatedBookings);
//       setBookings(updatedBookings);

//       setMessage({ type: "success", text: "Booking cancelled successfully" });
//     } catch (error) {
//       setMessage({
//         type: "error",
//         text: "Failed to cancel booking. Please try again.",
//       });
//     } finally {
//       setLoading(false);
//     }
//   };

//   const upcomingBookings = mockBookings
//     .filter((booking) => new Date(booking.date) >= new Date())
//     .sort((a, b) => new Date(a.date) - new Date(b.date));

//   return (
//     <div className="min-h-screen bg-gradient-to-br from-blue-50 to-indigo-100 p-4">
//       <div className="max-w-4xl mx-auto">
//         <div className="bg-white rounded-lg shadow-lg overflow-hidden">
//           {/* Header */}
//           <div className="bg-gradient-to-r from-blue-600 to-indigo-600 text-white p-6">
//             <div className="flex items-center space-x-3">
//               <Car className="w-8 h-8" />
//               <div>
//                 <h1 className="text-2xl font-bold">Car Park Booking System</h1>
//                 <p className="text-blue-100">Reserve the shared parking spot</p>
//               </div>
//             </div>
//           </div>

//           <div className="p-6">
//             {/* Message Display */}
//             {message.text && (
//               <div
//                 className={`mb-6 p-4 rounded-lg flex items-center space-x-2 ${
//                   message.type === "success"
//                     ? "bg-green-50 text-green-800 border border-green-200"
//                     : "bg-red-50 text-red-800 border border-red-200"
//                 }`}
//               >
//                 {message.type === "success" ? (
//                   <CheckCircle className="w-5 h-5" />
//                 ) : (
//                   <AlertCircle className="w-5 h-5" />
//                 )}
//                 <span>{message.text}</span>
//                 <button
//                   onClick={() => setMessage({ type: "", text: "" })}
//                   className="ml-auto text-gray-500 hover:text-gray-700"
//                 >
//                   <X className="w-4 h-4" />
//                 </button>
//               </div>
//             )}

//             <div className="grid md:grid-cols-2 gap-8">
//               {/* Booking Form */}
//               <div className="space-y-6">
//                 <div className="flex items-center space-x-2 mb-4">
//                   <Plus className="w-5 h-5 text-blue-600" />
//                   <h2 className="text-xl font-semibold text-gray-800">
//                     New Booking
//                   </h2>
//                 </div>

//                 <div className="space-y-4">
//                   <div>
//                     <label className="block text-sm font-medium text-gray-700 mb-2">
//                       Employee
//                     </label>
//                     <select
//                       value={selectedEmployee}
//                       onChange={(e) => setSelectedEmployee(e.target.value)}
//                       className="w-full p-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
//                       required
//                     >
//                       <option value="">Select an employee</option>
//                       {employees.map((employee) => (
//                         <option key={employee.id} value={employee.id}>
//                           {employee.name}
//                         </option>
//                       ))}
//                     </select>
//                   </div>

//                   <div>
//                     <label className="block text-sm font-medium text-gray-700 mb-2">
//                       Date
//                     </label>
//                     <input
//                       type="date"
//                       value={selectedDate}
//                       onChange={(e) => setSelectedDate(e.target.value)}
//                       min={getTodayDate()}
//                       className="w-full p-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
//                       required
//                     />
//                     {selectedDate && !checkDateAvailability(selectedDate) && (
//                       <p className="text-red-600 text-sm mt-1">
//                         This date is already booked
//                       </p>
//                     )}
//                   </div>

//                   <div>
//                     <label className="block text-sm font-medium text-gray-700 mb-2">
//                       Notes (Optional)
//                     </label>
//                     <textarea
//                       value={notes}
//                       onChange={(e) => setNotes(e.target.value)}
//                       placeholder="Any additional notes..."
//                       className="w-full p-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
//                       rows="3"
//                     />
//                   </div>

//                   <button
//                     onClick={handleBooking}
//                     disabled={loading || !checkDateAvailability(selectedDate)}
//                     className="w-full bg-blue-600 text-white py-3 px-4 rounded-lg hover:bg-blue-700 disabled:bg-gray-400 disabled:cursor-not-allowed flex items-center justify-center space-x-2 transition-colors"
//                   >
//                     {loading ? (
//                       <div className="w-5 h-5 border-2 border-white border-t-transparent rounded-full animate-spin" />
//                     ) : (
//                       <>
//                         <Calendar className="w-5 h-5" />
//                         <span>Book Parking Spot</span>
//                       </>
//                     )}
//                   </button>
//                 </div>
//               </div>

//               {/* Current Bookings */}
//               <div className="space-y-6">
//                 <div className="flex items-center space-x-2 mb-4">
//                   <Calendar className="w-5 h-5 text-green-600" />
//                   <h2 className="text-xl font-semibold text-gray-800">
//                     Upcoming Bookings
//                   </h2>
//                 </div>

//                 <div className="space-y-3 max-h-96 overflow-y-auto">
//                   {upcomingBookings.length === 0 ? (
//                     <div className="text-center py-8 text-gray-500">
//                       <Car className="w-12 h-12 mx-auto mb-3 text-gray-300" />
//                       <p>No upcoming bookings</p>
//                       <p className="text-sm">The parking spot is available!</p>
//                     </div>
//                   ) : (
//                     upcomingBookings.map((booking) => (
//                       <div
//                         key={booking.id}
//                         className="border border-gray-200 rounded-lg p-4 hover:shadow-md transition-shadow"
//                       >
//                         <div className="flex justify-between items-start">
//                           <div className="flex-1">
//                             <div className="flex items-center space-x-2 mb-2">
//                               <User className="w-4 h-4 text-blue-600" />
//                               <span className="font-medium text-gray-800">
//                                 {booking.employeeName}
//                               </span>
//                             </div>
//                             <div className="flex items-center space-x-2 mb-2">
//                               <Calendar className="w-4 h-4 text-green-600" />
//                               <span className="text-gray-600">
//                                 {formatDate(booking.date)}
//                               </span>
//                             </div>
//                             {booking.notes && (
//                               <p className="text-sm text-gray-600 mt-2">
//                                 <span className="font-medium">Notes:</span>{" "}
//                                 {booking.notes}
//                               </p>
//                             )}
//                           </div>
//                           <button
//                             onClick={() => handleCancelBooking(booking.id)}
//                             disabled={loading}
//                             className="ml-4 text-red-600 hover:text-red-800 p-1 hover:bg-red-50 rounded transition-colors"
//                             title="Cancel booking"
//                           >
//                             <X className="w-4 h-4" />
//                           </button>
//                         </div>
//                       </div>
//                     ))
//                   )}
//                 </div>
//               </div>
//             </div>

//             {/* Statistics */}
//             <div className="mt-8 bg-gray-50 rounded-lg p-6">
//               <h3 className="text-lg font-semibold text-gray-800 mb-4">
//                 Booking Statistics
//               </h3>
//               <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
//                 <div className="text-center">
//                   <div className="text-2xl font-bold text-blue-600">
//                     {mockBookings.length}
//                   </div>
//                   <div className="text-gray-600">Total Bookings</div>
//                 </div>
//                 <div className="text-center">
//                   <div className="text-2xl font-bold text-green-600">
//                     {upcomingBookings.length}
//                   </div>
//                   <div className="text-gray-600">Upcoming</div>
//                 </div>
//                 <div className="text-center">
//                   <div className="text-2xl font-bold text-orange-600">
//                     {checkDateAvailability(getTodayDate())
//                       ? "Available"
//                       : "Booked"}
//                   </div>
//                   <div className="text-gray-600">Today's Status</div>
//                 </div>
//               </div>
//             </div>
//           </div>
//         </div>
//       </div>
//     </div>
//   );
// };

// export default CarParkBookingSystem;
