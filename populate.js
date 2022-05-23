import { createRequire } from "module";
import dotenv from "dotenv";
import connect from "./db/connect.js";
import Job from "./models/job.model.js";

dotenv.config();

const require = createRequire(import.meta.url);
const data = require("./data.json");

const start = async () => {
  try {
    await connect(process.env.MONGO_URI);
    await Job.deleteMany();
    await Job.create(data);
    console.log("DB populated");
    process.exit(0);
  } catch (err) {
    console.log(err);
    process.exit(1);
  }
};

start();
