import express from "express";
import "express-async-errors";
import dotenv from "dotenv";
import morgan from "morgan";
import cookieParser from "cookie-parser";
import { dirname } from "path";
import { fileURLToPath } from "url";
import path from "path";
import helmet from "helmet";
import xss from "xss-clean";
import sanitize from "express-mongo-sanitize";

import { errorHandler, notFound } from "./middleware/error.middleware.js";
import connectDB from "./db/connect.js";
import authRouter from "./routes/auth.route.js";
import jobsRouter from "./routes/jobs.route.js";

const app = express();
dotenv.config();

// Production
const __dirname = dirname(fileURLToPath(import.meta.url));
app.use(express.static(path.resolve(__dirname, "./client/build")));

// Middleware
if (process.env.NODE_ENV === "development") {
  app.use(morgan("dev"));
}
app.use(express.json());
app.use(cookieParser());
app.use(helmet());
app.use(xss());
app.use(sanitize());

// Routes
app.use("/api/v1/account", authRouter);
app.use("/api/v1/jobs", jobsRouter);

// Production route
app.get("*", (req, res) => {
  res.sendFile(path.resolve(__dirname, "./client/build", "index.html"));
});

// Errors
app.use(notFound);
app.use(errorHandler);

const port = process.env.PORT || 4000;

const start = async () => {
  try {
    await connectDB(process.env.MONGO_URI);
    app.listen(port, () => {
      console.log(`Server is listening on port ${port}...`);
    });
  } catch (err) {
    console.log(err);
  }
};

start();
