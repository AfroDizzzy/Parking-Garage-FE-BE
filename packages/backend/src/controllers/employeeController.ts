import { Request, Response } from "express";
import { getEmployees } from "../models/employeeModel";
import { Employee } from "../models/types";

export const getAllEmployees = (req: Request, res: Response): void => {
  try {
    const employees: Employee[] = getEmployees();
    res.json(employees);
  } catch (error) {
    res.status(500).json({ error: "Failed to retrieve employees" });
  }
};
