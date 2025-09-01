import { Request, Response, NextFunction } from "express";
import config from "../config/config";
import { CreateBookingRequest } from "../models/types";

export const validateBookingInput = (
  req: Request<{}, any, CreateBookingRequest>,
  res: Response,
  next: NextFunction
): void => {
  const { employeeId, date, notes } = req.body;

  if (!employeeId || !date) {
    res.status(400).json({
      error: "Employee ID and date are required",
    });
    return;
  }

  if (isNaN(parseInt(String(employeeId), 10))) {
    res.status(400).json({
      error: "Employee ID must be a valid number",
    });
    return;
  }

  const dateRegex = /^\d{4}-\d{2}-\d{2}$/;
  if (!dateRegex.test(date)) {
    res.status(400).json({
      error: "Date must be in YYYY-MM-DD format",
    });
    return;
  }

  if (notes && notes.length > config.booking.maxNotesLength) {
    res.status(400).json({
      error: `Notes cannot exceed ${config.booking.maxNotesLength} characters`,
    });
    return;
  }

  next();
};

export const validateDateParam = (
  req: Request,
  res: Response,
  next: NextFunction
): void => {
  const { date } = req.params;

  const dateRegex = /^\d{4}-\d{2}-\d{2}$/;
  if (typeof date !== "string" || !dateRegex.test(date)) {
    res.status(400).json({
      error: "Date must be in YYYY-MM-DD format",
    });
    return;
  }

  next();
};

export const validateIdParam = (
  req: Request,
  res: Response,
  next: NextFunction
): void => {
  const { id } = req.params;

  if (typeof id !== "string" || isNaN(parseInt(id, 10))) {
    res.status(400).json({
      error: "ID must be a valid number",
    });
    return;
  }

  next();
};
