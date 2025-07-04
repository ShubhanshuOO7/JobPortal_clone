"use strict";
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.applyRouter = void 0;
const express_1 = __importDefault(require("express"));
exports.applyRouter = express_1.default.Router();
const middleware_1 = require("../middlewares/middleware");
const client_1 = require("@prisma/client");
exports.applyRouter.use(middleware_1.userMiddleware);
exports.applyRouter.post("/applyJob/:id", (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const userId = req.id;
        const jobId = req.params.id;
        if (!jobId) {
            return res.status(400).json({
                message: "Job Id is required",
                success: false,
            });
        }
        const prisma = new client_1.PrismaClient({
            datasourceUrl: process.env.DATABASE_URL,
        });
        const existingApplication = yield prisma.applications.findFirst({
            where: {
                jobId: Number(jobId),
                applicantId: Number(userId),
            },
        });
        if (existingApplication) {
            return res.status(400).json({
                message: "You have already applied for this jobs",
                success: false,
            });
        }
        const job = yield prisma.job.findFirst({
            where: {
                id: Number(jobId),
            },
        });
        if (!job) {
            return res.status(400).json({
                message: "Job not found",
                success: false,
            });
        }
        const newApplication = yield prisma.applications.create({
            data: {
                job: {
                    connect: { id: Number(jobId) },
                },
                applicant: {
                    connect: { id: Number(userId) },
                },
            },
        });
        return res.status(201).json({
            message: "job applied successfully",
            success: true,
        });
    }
    catch (error) {
        console.log(error);
    }
}));
exports.applyRouter.get("/getAppliedJobs", (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const userId = req.id;
        const prisma = new client_1.PrismaClient({
            datasourceUrl: process.env.DATABASE_URL,
        });
        const application = yield prisma.applications.findMany({
            where: {
                applicantId: Number(userId),
            },
            include: {
                job: {
                    include: {
                        company: true
                    }
                }
            },
        });
        if (!application) {
            return res.status(404).json({
                message: "No Applications",
                success: false,
            });
        }
        return res.status(200).json({
            application,
            success: true,
        });
    }
    catch (error) {
        console.log(error);
    }
}));
// admin dekhega kitne users ne apply kiya hain
exports.applyRouter.get("/getApplicants/:id", (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const jobId = req.params.id;
        const prisma = new client_1.PrismaClient({
            datasourceUrl: process.env.DATABASE_URL,
        });
        const Jobs = yield prisma.job.findMany({
            where: {
                id: Number(jobId),
            },
            include: {
                // getting value of users by job -> applications -> applicant
                applications: {
                    include: {
                        applicant: {
                            include: {
                                profile: true,
                            },
                        },
                    },
                },
            },
        });
        if (!Jobs) {
            return res.status(400).json({
                meesage: "Jobs not found",
                success: false,
            });
        }
        return res.status(200).json({
            Jobs,
            successs: true,
        });
    }
    catch (error) {
        console.log(error);
    }
}));
exports.applyRouter.put("/updateStatus/:id", (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const { status } = req.body;
        const applicantId = req.params.id;
        const allowed = ["pending", "accepted", "rejected"];
        if (!allowed.includes(status === null || status === void 0 ? void 0 : status.toLowerCase())) {
            return res.status(400).json({
                message: "Invalid status value",
                success: false,
            });
        }
        const prisma = new client_1.PrismaClient({
            datasourceUrl: process.env.DATABASE_URL,
        });
        const application = yield prisma.applications.update({
            where: {
                id: Number(applicantId),
            },
            data: {
                status: status.toLowerCase(), // ✅ cast to enum
            },
        });
        if (!application) {
            return res.status(404).json({
                message: "Application not found",
                success: false,
            });
        }
        return res.status(200).json({
            message: "Status updated successfully",
            success: true,
            application,
        });
    }
    catch (error) {
        console.error(error);
        return res.status(500).json({
            message: "Internal server error",
            success: false,
        });
    }
}));
