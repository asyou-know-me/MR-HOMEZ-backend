import express from "express";

import EnquiryRepository from "../../infrastructure/repositories/EnquiryRepository.js";

import EnquiryController from "../controllers/EnquiryController.js";

import { authenticate, requireAdmin } from "../middleware/authMiddleware.js";

const router = express.Router();

const enquiryRepository = new EnquiryRepository();

const enquiryController = new EnquiryController(enquiryRepository);

/* PUBLIC */

router.post("/", enquiryController.create);

/* ADMIN */

router.get("/", authenticate, requireAdmin, enquiryController.getAll);

router.put(
  "/:id/status",
  authenticate,
  requireAdmin,
  enquiryController.updateStatus,
);

router.delete("/:id", authenticate, requireAdmin, enquiryController.delete);

export default router;
