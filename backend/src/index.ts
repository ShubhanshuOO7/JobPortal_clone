import dotenv from "dotenv";
import path from "path";
import express from "express";
import cors from "cors";

import { userRouter } from "./routes/user";
import { companyRouter } from "./routes/company";
import { jobRouter } from "./routes/job";
import { applyRouter } from "./routes/application";

// Load .env only in development
if (process.env.NODE_ENV !== "production") {
  dotenv.config();
}

// Root of the project (2 levels up from dist/)
const __rootdir = path.resolve(__dirname, "..", "..");

const app = express();

// Allow frontend to access backend (CORS)
app.use(cors({
  origin: 'https://jobportal-clone.onrender.com',
  credentials: true
}));

app.use(express.json());

// Backend API routes
app.use("/api/v1/user", userRouter);
app.use("/api/v1/company", companyRouter);
app.use("/api/v1/job", jobRouter);
app.use("/api/v1/application", applyRouter);

// Serve frontend build
app.use(express.static(path.join(__rootdir, "frontend", "dist")));

app.get("*", (req, res) => {
  res.sendFile(path.resolve(__rootdir, "frontend", "dist", "index.html"));
});

// Use Render-assigned PORT or 3000 locally
const PORT = process.env.PORT || 3000;
app.listen(PORT, () => {
  console.log(`Server running on http://localhost:${PORT}`);
});
