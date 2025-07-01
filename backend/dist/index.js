"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const dotenv_1 = __importDefault(require("dotenv"));
const path_1 = __importDefault(require("path"));
const fs_1 = __importDefault(require("fs"));
const express_1 = __importDefault(require("express"));
const cors_1 = __importDefault(require("cors"));
const user_1 = require("./routes/user");
const company_1 = require("./routes/company");
const job_1 = require("./routes/job");
const application_1 = require("./routes/application");
if (process.env.NODE_ENV !== "production") {
    dotenv_1.default.config();
}
const __rootdir = path_1.default.resolve(__dirname, "..", "..");
const app = (0, express_1.default)();
app.use((0, cors_1.default)({
    origin: "https://jobportal-clone.onrender.com",
    credentials: true,
}));
app.use(express_1.default.json());
app.use("/api/v1/user", user_1.userRouter);
app.use("/api/v1/company", company_1.companyRouter);
app.use("/api/v1/job", job_1.jobRouter);
app.use("/api/v1/application", application_1.applyRouter);
app.use(express_1.default.static(path_1.default.join(__rootdir, "frontend", "dist")));
app.get("*", (req, res) => {
    const indexPath = path_1.default.resolve(__rootdir, "frontend", "dist", "index.html");
    if (fs_1.default.existsSync(indexPath)) {
        res.sendFile(indexPath);
    }
    else {
        console.error("index.html NOT FOUND at path:", indexPath);
        res.status(500).send("index.html not found");
    }
});
const PORT = process.env.PORT || 3000;
app.listen(PORT, () => {
    console.log(`Server running on http://localhost:${PORT}`);
});
