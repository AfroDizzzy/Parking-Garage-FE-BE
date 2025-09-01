import express from "express";
import cors from "cors";

import config from "./config/config";
import employeeRoutes from "./routes/employeeRoutes";
import bookingRoutes from "./routes/bookingRoutes";
import errorHandler from "./middleware/errorHandler";

const app = express();

app.use(cors(config.cors));
app.use(express.json());

app.use("/api/employees", employeeRoutes);
app.use("/api/bookings", bookingRoutes);

app.use(errorHandler);

app.use((req, res) => {
  res.status(404).json({ error: "Route not found" });
});

export default app;
