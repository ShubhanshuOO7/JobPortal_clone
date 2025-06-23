"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const dotenv_1 = __importDefault(require("dotenv"));
const path_1 = __importDefault(require("path"));
dotenv_1.default.config({ path: path_1.default.resolve(__dirname, "../../.env") }); // ✅ Load .env file from root
const express_1 = __importDefault(require("express"));
const user_1 = require("./routes/user");
const company_1 = require("./routes/company");
const job_1 = require("./routes/job");
const application_1 = require("./routes/application");
const cors_1 = __importDefault(require("cors"));
const _dirname = path_1.default.resolve(__dirname, "..", ".."); // Path to project root
const app = (0, express_1.default)();
app.use((0, cors_1.default)({
    origin: 'http://localhost:5173',
    credentials: true
}));
app.use(express_1.default.json());
app.use("/api/v1/user", user_1.userRouter);
app.use("/api/v1/user/company", company_1.companyRouter);
app.use("/api/v1/user/job", job_1.jobRouter);
app.use("/api/v1/user/application", application_1.applyRouter);
// Serve frontend build
app.use(express_1.default.static(path_1.default.join(_dirname, "frontend", "dist")));
app.get("*", (req, res) => {
    res.sendFile(path_1.default.resolve(_dirname, "frontend", "dist", "index.html"));
});
app.listen(3000, () => {
    console.log("Backend running on http://localhost:3000");
});
