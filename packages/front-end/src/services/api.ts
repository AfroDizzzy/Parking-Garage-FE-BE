import axios from "axios";

const API_BASE = "http://localhost:3001/api";

export interface Employee {
  id: number;
  name: string;
  email: string;
}

export interface Booking {
  id: number;
  employeeId: number;
  employeeName: string;
  date: string;
  notes?: string;
  createdAt: string;
}

export const getEmployees = async (): Promise<Employee[]> => {
  const { data } = await axios.get<Employee[]>(`${API_BASE}/employees`);
  return data;
};

export const getBookings = async (): Promise<Booking[]> => {
  const { data } = await axios.get<Booking[]>(`${API_BASE}/bookings`);
  return data;
};

export const getUpcomingBookings = async (): Promise<Booking[]> => {
  const { data } = await axios.get<Booking[]>(`${API_BASE}/bookings/upcoming`);
  return data;
};

export const checkDate = async (
  date: string
): Promise<{ available: boolean }> => {
  const { data } = await axios.get<{ available: boolean }>(
    `${API_BASE}/bookings/check/${date}`
  );
  return data;
};

export const createBooking = async (
  booking: Omit<Booking, "id" | "createdAt">
): Promise<Booking> => {
  const { data } = await axios.post<Booking>(`${API_BASE}/bookings`, booking);
  return data;
};

export const deleteBooking = async (id: number): Promise<void> => {
  await axios.delete(`${API_BASE}/bookings/${id}`);
};
