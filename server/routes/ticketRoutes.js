import express from "express";

import { protect } from "../middleware/authMiddleware.js";
import { authorize } from "../middleware/roleMiddleware.js";

import {
  createTicket,
  getTickets,
  getTicketById,
  updateTicket,
  addComment,
  assignTicket,
  dashboardStats,
  closeTicket
} from "../controllers/ticketController.js";

const router = express.Router();

// Create Ticket
router.post(
  "/",
  protect,
  authorize("Admin", "SupportAgent", "Employee"),
  createTicket
);

// Get Tickets
router.get(
  "/",
  protect,
  authorize("Admin", "SupportAgent", "Employee"),
  getTickets,
);

router.get(
  "/:id",
  protect,
  authorize("Admin", "SupportAgent", "Employee"),
  getTicketById
);

router.put(
  "/:id",
  protect,
  authorize("Admin", "SupportAgent", "Employee"),
  updateTicket
);

router.post(
  "/:id/comments",
  protect,
  authorize("Admin", "SupportAgent", "Employee"),
  addComment
);

router.put(
    "/:id/assign",
    protect,
    authorize("Admin"),
    assignTicket
);

router.get(
  "/dashboard/stats",
  protect,
  authorize("Admin"),
  dashboardStats
);

router.put(
  "/:id/close",
  protect,
  authorize("Admin", "SupportAgent"),
  closeTicket
);

export default router;