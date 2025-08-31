import express from "express";
import cors from "cors";

import config from "./config/config";
import employeeRoutes from "./routes/employeeRoutes";
import bookingRoutes from "./routes/bookingRoutes";
import errorHandler from "./middleware/errorHandler";

const app = express();

// Middleware
app.use(cors(config.cors));
app.use(express.json());

// Routes
app.use("/api/employees", employeeRoutes);
app.use("/api/bookings", bookingRoutes);

// Error handling middleware
app.use(errorHandler);

// 404 handler
app.use((req, res) => {
  res.status(404).json({ error: "Route not found" });
});

export default app;
