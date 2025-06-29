import dotenv from "dotenv";
import path from "path";
dotenv.config({ path: path.resolve(__dirname, "../../.env") }); // ✅ Load .env file from root

import express from "express";
import { userRouter } from "./routes/user";
import { companyRouter } from "./routes/company";
import { jobRouter } from "./routes/job";
import { applyRouter } from "./routes/application";
import cors from "cors";

const _dirname = path.resolve(__dirname, "..", ".."); // Path to project root

const app = express();

app.use(cors({
  origin: 'https://jobportal-clone.onrender.com',
  credentials: true
}));

app.use(express.json());

app.use("/api/v1/user", userRouter);
app.use("/api/v1/user/company", companyRouter);
app.use("/api/v1/user/job", jobRouter);
app.use("/api/v1/user/application", applyRouter);

// Serve frontend build
app.use(express.static(path.join(_dirname, "frontend", "dist")));

app.get("*", (req, res) => {
  res.sendFile(path.resolve(_dirname, "frontend", "dist", "index.html"));
});

app.listen(3000, () => {
  console.log("Backend running on http://localhost:3000");
});
