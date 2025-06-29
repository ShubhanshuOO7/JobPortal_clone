import dotenv from "dotenv";
import path from "path";
import express, { Request, Response } from "express";
import cors from "cors";

import { userRouter } from "./routes/user";
import { companyRouter } from "./routes/company";
import { jobRouter } from "./routes/job";
import { applyRouter } from "./routes/application";

if (process.env.NODE_ENV !== "production") {
  dotenv.config();
}

const __rootdir = path.resolve(__dirname, "..", "..");

const app = express();

app.use(
  cors({
    origin: "https://jobportal-clone.onrender.com",
    credentials: true,
  })
);

app.use(express.json());

app.use("/api/v1/user", userRouter);
app.use("/api/v1/company", companyRouter);
app.use("/api/v1/job", jobRouter);
app.use("/api/v1/application", applyRouter);

app.use(express.static(path.join(__rootdir, "frontend", "dist")));

app.get("/*", (req: Request, res: Response) => {
  res.sendFile(path.join(__rootdir, "frontend", "dist", "index.html"));
});

const PORT = process.env.PORT || 3000;
app.listen(PORT, () => {
  console.log(`Server running on http://localhost:${PORT}`);
});
