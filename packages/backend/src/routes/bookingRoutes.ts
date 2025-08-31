import {
  cancelBooking,
  checkDateAvailability,
  createBooking,
  getAllBookings,
  getUpcomingBookings,
} from "../controllers/bookingController";
import { Router } from "express";

const {
  validateBookingInput,
  validateDateParam,
  validateIdParam,
} = require("../middleware/validation");

const router = Router();

// GET /api/bookings
router.get("/", getAllBookings);

// GET /api/bookings/upcoming
router.get("/upcoming", getUpcomingBookings);

// GET /api/bookings/check/:date
router.get("/check/:date", checkDateAvailability);

// POST /api/bookings
router.post("/", createBooking);

// DELETE /api/bookings/:id
router.delete("/:id", cancelBooking);

export default router;
