"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.jobRouter = void 0;
const client_1 = require("@prisma/client");
const express_1 = __importDefault(require("express"));
exports.jobRouter = (0, express_1.default)();
const middleware_1 = require("../middlewares/middleware");
exports.jobRouter.use(express_1.default.json());
exports.jobRouter.use(middleware_1.userMiddleware);
//admin
exports.jobRouter.post("/jobPost", middleware_1.userMiddleware, async (req, res) => {
    try {
        const { title, description, requirements, salary, location, jobType, experience, position, companyId } = req.body;
        const userId = req.id;
        if (!title || !description || !requirements || !salary || !location || !jobType || !experience || !position || !companyId) {
            return res.status(400).json({
                message: "Something is missing",
                success: false
            });
        }
        const prisma = new client_1.PrismaClient({
            datasourceUrl: process.env.DATABASE_URL
        });
        const job = await prisma.job.create({
            data: {
                title,
                description,
                requirements,
                salary: Number(salary),
                location,
                jobType,
                experience: Number(experience),
                position: Number(position),
                companyId: Number(companyId),
                createdBy: Number(userId)
            }
        });
        return res.json({
            message: "New job created successfully",
            success: true,
            job
        });
    }
    catch (error) {
        console.log(error);
    }
});
//students ke liye
exports.jobRouter.get("/get", async (req, res) => {
    try {
        const keyword = req.query.keyword || "";
        const prisma = new client_1.PrismaClient({
            datasourceUrl: process.env.DATABASE_URL
        });
        const jobs = await prisma.job.findMany({
            where: keyword
                ? {
                    OR: [
                        {
                            title: {
                                contains: keyword,
                                mode: "insensitive",
                            },
                        },
                        {
                            description: {
                                contains: keyword,
                                mode: "insensitive",
                            },
                        },
                    ],
                }
                : {}, // return all if no keyword
            include: {
                company: true,
            },
        });
        if (!jobs) {
            return res.status(401).json({
                message: "Jobs not found",
                success: false
            });
        }
        return res.status(200).json({
            jobs,
            success: true
        });
    }
    catch (error) {
        console.log(error);
    }
});
exports.jobRouter.get("/getJob/:id", async (req, res) => {
    try {
        const jobId = req.params.id;
        const prisma = new client_1.PrismaClient({
            datasourceUrl: process.env.DATABASE_URL
        });
        const jobs = await prisma.job.findFirst({
            where: {
                id: Number(jobId)
            },
            include: {
                applications: true
            }
        });
        if (!jobs) {
            return res.status(401).json({
                message: "jobs not found",
                success: false
            });
        }
        return res.status(200).json({ jobs, success: true });
    }
    catch (error) {
        console.log(error);
    }
});
// admin ne kitne job create kare hain abhi tak
exports.jobRouter.get("/getAdminJobs", async (req, res) => {
    try {
        const adminId = req.id;
        const prisma = new client_1.PrismaClient({
            datasourceUrl: process.env.DATABASE_URL
        });
        const jobs = await prisma.job.findMany({
            where: {
                createdBy: Number(adminId)
            },
            include: {
                company: true
            }
        });
        if (!jobs) {
            return res.status(401).json({
                message: "Jobs nott found",
                success: false
            });
        }
        return res.status(200).json({
            jobs,
            success: true
        });
    }
    catch (error) {
        console.log(error);
    }
});
