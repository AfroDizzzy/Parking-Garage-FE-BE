import app from "./app";
import config from "./config/config";

const PORT = config.port;

app.listen(PORT, () => {
  console.log(`${config.app.name} running on http://localhost:${PORT}`);
  console.log("Available endpoints:");
  console.log("- GET /api/employees");
  console.log("- GET /api/bookings");
  console.log("- GET /api/bookings/upcoming");
  console.log("- GET /api/bookings/check/:date");
  console.log("- POST /api/bookings");
  console.log("- DELETE /api/bookings/:id");
});
