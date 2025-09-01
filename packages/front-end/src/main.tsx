import { StrictMode } from "react";
import { createRoot } from "react-dom/client";
import "./index.css";
import CarParkBookingSystem from "./carParkingBookingSystem";

createRoot(document.getElementById("root")!).render(
  <StrictMode>
    <CarParkBookingSystem></CarParkBookingSystem>
  </StrictMode>
);
