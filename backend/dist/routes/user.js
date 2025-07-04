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
exports.userRouter = void 0;
const express_1 = __importDefault(require("express"));
const jsonwebtoken_1 = __importDefault(require("jsonwebtoken"));
const client_1 = require("@prisma/client");
const middleware_1 = require("../middlewares/middleware");
exports.userRouter = express_1.default.Router();
const bcrypt_1 = __importDefault(require("bcrypt"));
const cookie_parser_1 = __importDefault(require("cookie-parser"));
const multer_1 = require("../middlewares/multer");
const datauri_1 = __importDefault(require("../utils/datauri"));
const cloudinary_1 = __importDefault(require("../utils/cloudinary"));
exports.userRouter.use((0, cookie_parser_1.default)());
exports.userRouter.use(express_1.default.json());
exports.userRouter.post("/signup", multer_1.singleUpload, (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    var _a;
    const { fullName, email, phoneNumber, password, role } = req.body;
    if (!fullName || !email || !phoneNumber || !password || !role) {
        return res.status(400).json({
            message: "Something is missing",
            status: false,
        });
    }
    const file = req.file;
    const fileUri = (0, datauri_1.default)(file);
    const cloudResponse = yield cloudinary_1.default.uploader.upload((_a = fileUri.content) !== null && _a !== void 0 ? _a : "");
    const prisma = new client_1.PrismaClient({
        datasourceUrl: process.env.DATABASE_URL,
    });
    const user = yield prisma.user.findUnique({ where: { email: req.body.email } });
    if (user) {
        return res.status(400).json({
            message: "User already exist with this email",
            success: false
        });
    }
    const hashedPassword = yield bcrypt_1.default.hash(password, 10);
    try {
        let createdUser = yield prisma.user.create({
            data: {
                fullName: req.body.fullName,
                email: req.body.email,
                phoneNumber: req.body.phoneNumber,
                password: hashedPassword,
                role: req.body.role,
                profile: {
                    create: {
                        profilePhoto: cloudResponse.secure_url || ""
                    }
                }
            },
            include: {
                profile: true
            }
        });
        const { id, fullName, email, phoneNumber, password, role, createdAt, profile } = createdUser;
        createdUser = {
            id: createdUser.id,
            fullName,
            email,
            phoneNumber,
            password,
            role,
            profile,
            createdAt: createdUser.createdAt,
        };
        const token = jsonwebtoken_1.default.sign({
            userId: createdUser === null || createdUser === void 0 ? void 0 : createdUser.id,
        }, process.env.JWT_SECRET || "", {
            expiresIn: "2h",
        });
        return res
            .status(200)
            .cookie("token", token, {
            maxAge: 1 * 24 * 60 * 60 * 1000,
            httpOnly: true,
            sameSite: "strict",
        })
            .json({
            message: "Signup Successfully ",
            status: true,
            createdUser,
        });
    }
    catch (error) {
        console.log(error);
        return res.status(500).json({
            message: "Internal server error",
            status: false,
        });
    }
}));
exports.userRouter.post("/login", (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const { email, password, role } = req.body;
    if (!email || !password || !role) {
        return res.json({
            message: "something is missing",
            status: false
        });
    }
    const prisma = new client_1.PrismaClient({
        datasourceUrl: process.env.DATABASE_URL
    });
    try {
        let user = yield prisma.user.findUnique({
            where: {
                email: req.body.email
            },
            include: { profile: true }
        });
        if (!user) {
            return res.status(400).json({
                message: "incorrect email or password",
                status: false
            });
        }
        const passwordMatch = yield bcrypt_1.default.compare(password, user.password);
        if (!passwordMatch) {
            return res.status(400).json({
                message: "Incorrect email or password",
                status: false
            });
        }
        if (role != user.role) {
            return res.status(400).json({
                message: "Account doesn't exist with current role",
                status: false
            });
        }
        const token = yield jsonwebtoken_1.default.sign({ userId: user.id }, process.env.JWT_SECRET || "", { expiresIn: "24h" });
        const userResponse = {
            id: user.id,
            fullName: user.fullName,
            email: user.email,
            phoneNumber: user.phoneNumber,
            role: user.role,
            profile: user.profile,
            createdAt: user.createdAt,
        };
        return res.status(200).cookie("token", token, {
            maxAge: 1 * 24 * 60 * 60 * 1000,
            httpOnly: true,
            sameSite: "strict"
        }).json({
            message: `Welcome back ${user.fullName}`,
            userResponse,
            success: true
        });
    }
    catch (error) {
        console.log(error);
        return res.status(500).json({
            message: "internal server error",
            status: false
        });
    }
}));
exports.userRouter.get("/logout", (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        return res.status(200).cookie("token", "", { maxAge: 0 }).json({
            message: "User logged out successfully",
            status: true,
        });
    }
    catch (error) {
        console.log(error);
    }
}));
exports.userRouter.post("/update", middleware_1.userMiddleware, multer_1.singleUpload, (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    var _a;
    try {
        const { fullName, phoneNumber, email, bio, skills } = req.body;
        if (!fullName || !phoneNumber || !email || !bio || !skills) {
            return res.status(400).json({
                message: "something is missing",
                status: false
            });
        }
        const file = req.file;
        const fileUri = (0, datauri_1.default)(file);
        const cloudResponse = yield cloudinary_1.default.uploader.upload((_a = fileUri.content) !== null && _a !== void 0 ? _a : "");
        // cloudinary aayega idhar
        const skillsArray = skills.split(" ");
        const prisma = new client_1.PrismaClient({
            datasourceUrl: process.env.DATABASE_URL
        });
        const user = yield prisma.user.update({
            where: {
                email: req.body.email
            },
            data: {
                email: req.body.email,
                profile: {
                    upsert: {
                        create: {
                            bio: req.body.bio,
                            skills: skillsArray,
                            resume: cloudResponse.secure_url,
                            resumeOriginalName: file === null || file === void 0 ? void 0 : file.originalname // it comes from multer which contain originalName
                        },
                        update: {
                            bio: req.body.bio,
                            skills: skillsArray,
                            resume: cloudResponse.secure_url,
                            resumeOriginalName: file === null || file === void 0 ? void 0 : file.originalname
                        }
                    }
                }
            },
            include: {
                profile: true
            }
        });
        const updatedResponse = {
            fullName: user.fullName,
            email: user.email,
            phoneNumber: user.phoneNumber,
            role: user.role,
            profile: user.profile,
            //resumes comes later here
        };
        return res.status(200).json({
            message: "Updated successfully",
            updatedResponse,
            success: true
        });
    }
    catch (error) {
        console.log(error);
    }
}));
exports.userRouter.get("/getAllUsers", (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const prisma = new client_1.PrismaClient({
            datasourceUrl: process.env.DATABASE_URL
        });
        const users = yield prisma.user.findMany({
            select: {
                fullName: true,
                email: true,
                phoneNumber: true,
                password: true,
                role: true,
                job: {
                    select: {
                        title: true
                    }
                }
            }
        });
        if (!users) {
            return res.status(401).json({
                message: "there is a problem somewhere",
                success: false
            });
        }
        return res.status(200).json({
            users,
        });
    }
    catch (error) {
        console.log(error);
    }
}));
