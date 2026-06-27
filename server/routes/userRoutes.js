import express from "express";
import { protect, authorize } from "../middleware/authMiddleware.js";
import { getSupportAgents } from "../controllers/userController.js";

const router = express.Router();

router.get(
    "/support-agents",
    protect,
    authorize("Admin"),
    getSupportAgents
);

export default router;