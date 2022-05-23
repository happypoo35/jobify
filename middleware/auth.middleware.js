import jwt from "jsonwebtoken";
import ApiError from "../errors/custom.error.js";
import Job from "../models/job.model.js";
import User from "../models/user.model.js";

export const protect = async (req, res, next) => {
  const { token } = req.cookies;

  if (!token) {
    throw new ApiError("Unauthorized. Please log in to gain access", 401);
  }

  try {
    const decoded = jwt.verify(token, process.env.JWT_SECRET);
    const user = await User.findById(decoded.userId);

    if (!user) {
      throw new ApiError(
        "The user belonging to this token no longer exists",
        401
      );
    }

    user.refreshJWT(user, req, res);
    req.user = user;

    next();
  } catch (err) {
    throw new ApiError("Token expired. Please log in to gain access", 401);
  }
};

export const checkPermissions = async (req, res, next) => {
  const { jobId } = req.params;
  const job = await Job.findById(jobId);

  if (!job) {
    throw new ApiError(`No job with id ${jobId}`, 404);
  }

  if (req.user.role === "admin") return;

  if (req.user._id.toString() !== job.createdBy.toString()) {
    throw new ApiError("Not authorized to access this route", 401);
  }

  next();
};
