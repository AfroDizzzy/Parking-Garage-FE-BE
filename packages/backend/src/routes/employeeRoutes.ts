import { Router } from "express";
import { getAllEmployees } from "../controllers/employeeController";

const router = Router();

// GET /api/employees
router.get("/", getAllEmployees);

export default router;
