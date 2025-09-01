import { Router } from "express";
import {
  cancelBooking,
  checkDateAvailability,
  createBooking,
  getAllBookings,
  getUpcomingBookings,
} from "../controllers/bookingController";
import {
  validateBookingInput,
  validateDateParam,
  validateIdParam,
} from "../middleware/validation";

const router = Router();

//base endpoint is /api/bookings
router.get("/", getAllBookings);
router.get("/upcoming", getUpcomingBookings);
router.get("/check/:date", [validateDateParam], checkDateAvailability);

router.post("/", [validateBookingInput], createBooking);

router.delete("/:id", [validateIdParam], cancelBooking);

export default router;
