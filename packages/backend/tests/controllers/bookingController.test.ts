import request from "supertest";
import app from "../../src/app";
import { Employee, Booking } from "../../src/models/types";

describe("Booking Controller", () => {
  beforeEach(() => {
    // Reset data before each test
    // In a real app, you'd use a test database
  });

  describe("GET /api/bookings", () => {
    it("should return all bookings", async () => {
      const response = await request(app).get("/api/bookings").expect(200);

      expect(Array.isArray(response.body)).toBe(true);
    });
  });

  describe("POST /api/bookings", () => {
    it("should create a new booking with valid data", async () => {
      const bookingData = {
        employeeId: 1,
        date: "2025-12-25",
        notes: "Christmas booking",
      };

      const response = await request(app)
        .post("/api/bookings")
        .send(bookingData)
        .expect(201);

      expect(response.body).toHaveProperty("id");
      expect(response.body).toHaveProperty("employeeName");
      expect(response.body.message).toBe("Booking created successfully");
    });

    it("should reject booking without required fields", async () => {
      const invalidData = {
        notes: "Missing required fields",
      };

      const response = await request(app)
        .post("/api/bookings")
        .send(invalidData)
        .expect(400);

      expect(response.body.error).toBe("Employee ID and date are required");
    });

    it("should reject booking for past dates", async () => {
      const pastBooking = {
        employeeId: 1,
        date: "2020-01-01",
        notes: "Past date booking",
      };

      const response = await request(app)
        .post("/api/bookings")
        .send(pastBooking)
        .expect(400);

      expect(response.body.error).toBe("Cannot book dates in the past");
    });
  });

  describe("GET /api/bookings/check/:date", () => {
    it("should return availability for a date", async () => {
      const response = await request(app)
        .get("/api/bookings/check/2025-12-25")
        .expect(200);

      expect(response.body).toHaveProperty("available");
    });

    it("should reject invalid date format", async () => {
      const response = await request(app)
        .get("/api/bookings/check/invalid-date")
        .expect(400);

      expect(response.body.error).toBe("Date must be in YYYY-MM-DD format");
    });
  });
});
