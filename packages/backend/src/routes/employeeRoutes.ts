import { Router } from "express";
import { getAllEmployees } from "../controllers/employeeController";

const router = Router();

// base endpoint is /api/employees
router.get("/", getAllEmployees);

export default router;
