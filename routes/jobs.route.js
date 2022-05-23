import express from "express";
import {
  createJob,
  deleteJob,
  updateJob,
  getAllJobs,
  showStats,
  getJob,
} from "../controllers/jobs.controller.js";
import { checkPermissions, protect } from "../middleware/auth.middleware.js";

const router = express.Router();

router.use(protect);

router.route("/").get(getAllJobs).post(createJob);
router.get("/stats", showStats);

router
  .route("/:jobId")
  .all(checkPermissions)
  .get(getJob)
  .patch(updateJob)
  .delete(deleteJob);

export default router;
