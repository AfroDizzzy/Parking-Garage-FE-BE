import axios from "axios";
import type { Employee } from "../models/employee";

const API_BASE = "http://localhost:3001/api";

export const getEmployees = async (): Promise<Employee[]> => {
  const { data } = await axios.get<Employee[]>(`${API_BASE}/employees`);
  return data;
};
