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
exports.jobRouter = void 0;
const client_1 = require("@prisma/client");
const express_1 = __importDefault(require("express"));
exports.jobRouter = (0, express_1.default)();
const middleware_1 = require("../middlewares/middleware");
exports.jobRouter.use(express_1.default.json());
exports.jobRouter.use(middleware_1.userMiddleware);
//admin
exports.jobRouter.post("/jobPost", middleware_1.userMiddleware, (req, res) => __awaiter(void 0, void 0, void 0, function* () {
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
        const job = yield prisma.job.create({
            data: {
                title,
                description,
                requirements,
                salary: Number(salary),
                location,
                jobType,
                experience: Number(experience),
                position,
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
}));
//students ke liye
exports.jobRouter.get("/get", (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const keyWord = req.query.keyWord || "";
        const prisma = new client_1.PrismaClient({
            datasourceUrl: process.env.DATABASE_URL
        });
        const jobs = yield prisma.job.findMany({
            where: {
                OR: [
                    {
                        title: {
                            contains: keyWord,
                            mode: "insensitive"
                        },
                    },
                    {
                        description: {
                            contains: keyWord,
                            mode: "insensitive"
                        }
                    }
                ]
            },
            include: {
                company: true
            }
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
}));
exports.jobRouter.get("/getJob/:id", (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const jobId = req.params.id;
        const prisma = new client_1.PrismaClient({
            datasourceUrl: process.env.DATABASE_URL
        });
        const jobs = yield prisma.job.findFirst({
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
}));
// admin ne kitne job create kare hain abhi tak
exports.jobRouter.get("/getAdminJobs", (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const adminId = req.id;
        const prisma = new client_1.PrismaClient({
            datasourceUrl: process.env.DATABASE_URL
        });
        const jobs = yield prisma.job.findMany({
            where: {
                createdBy: Number(adminId)
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
}));
