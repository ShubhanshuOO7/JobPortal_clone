import express from "express"
import { userRouter } from "./routes/user";
import { companyRouter } from "./routes/company";
import { jobRouter } from "./routes/job";
import { applyRouter } from "./routes/application";
import cors from "cors"
const app = express();
app.use(cors({
  origin: 'http://localhost:5173',credentials: true
}));
app.use(express.json());
app.use("/api/v1/user",userRouter);
app.use("/api/v1/user/company",companyRouter)
app.use("/api/v1/user/job",jobRouter)
app.use("/api/v1/user/application",applyRouter)
app.listen(3000,()=>{
  console.log("server started at http://localhost:3000");
})