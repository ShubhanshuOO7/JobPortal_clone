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
exports.companyRouter = void 0;
const middleware_1 = require("../middlewares/middleware");
const client_1 = require("@prisma/client");
const cookie_parser_1 = __importDefault(require("cookie-parser"));
const express_1 = __importDefault(require("express"));
const multer_1 = require("../middlewares/multer");
const datauri_1 = __importDefault(require("../utils/datauri"));
const cloudinary_1 = __importDefault(require("../utils/cloudinary"));
exports.companyRouter = express_1.default.Router();
exports.companyRouter.use(express_1.default.json());
exports.companyRouter.use((0, cookie_parser_1.default)());
exports.companyRouter.use(middleware_1.userMiddleware);
exports.companyRouter.post('/registration', middleware_1.userMiddleware, (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const { companyName } = req.body;
        if (!companyName) {
            return res.status(400).json({
                message: "Company name is required",
                status: false
            });
        }
        const prisma = new client_1.PrismaClient({
            datasourceUrl: process.env.DATABASE_URL,
        });
        const existingcompany = yield prisma.company.findUnique({
            where: {
                companyName: req.body.companyName
            }
        });
        if (existingcompany) {
            return res.status(400).json({
                message: "You can't register the same company",
            });
        }
        let company = yield prisma.company.create({
            data: {
                companyName: companyName,
                userId: req.id
            }
        });
        return res.status(201).json({
            message: "Company registered successfully",
            company,
            success: true
        });
    }
    catch (error) {
        console.log(error);
    }
}));
exports.companyRouter.get('/get', middleware_1.userMiddleware, (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const userId = req.id;
        const prisma = new client_1.PrismaClient({
            datasourceUrl: process.env.DATABASE_URL
        });
        const companies = yield prisma.company.findMany({
            where: {
                userId: userId
            }
        });
        if (!companies) {
            return res.status(404).json({
                message: "Companies not found",
                success: false
            });
        }
        return res.status(200).json({
            companies,
            success: true
        });
    }
    catch (error) {
        console.log(error);
    }
}));
exports.companyRouter.get('/getById/:id', (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const companyId = req.params.id;
        const prisma = new client_1.PrismaClient({
            datasourceUrl: process.env.DATABASE_URL
        });
        const company = yield prisma.company.findFirst({
            where: {
                id: Number(companyId)
            }
        });
        if (!company) {
            return res.status(404).json({
                message: "Company not found",
                success: false
            });
        }
        return res.status(200).json({
            company,
            success: true
        });
    }
    catch (error) {
        console.log(error);
    }
}));
exports.companyRouter.put('/update/:id', multer_1.singleUpload, (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const { companyName, description, website, location } = req.body;
    const file = req.file;
    // idhar cloudinary aayega
    const fileUri = (0, datauri_1.default)(file);
    const cloudResponse = yield cloudinary_1.default.uploader.upload((fileUri === null || fileUri === void 0 ? void 0 : fileUri.content) || "");
    const companyId = req.params.id;
    if (!companyName && !description && !website && !location) {
        return res.json({
            message: "Something is missing",
            success: false
        });
    }
    const prisma = new client_1.PrismaClient({
        datasourceUrl: process.env.DATABASE_URL
    });
    const company = yield prisma.company.update({
        where: {
            id: Number(companyId)
        },
        data: {
            descriptions: req.body.description,
            website: req.body.website,
            location: req.body.location,
            logo: cloudResponse.secure_url
        }
    });
    if (!company) {
        return res.status(404).json({
            message: "Company not found",
            success: false
        });
    }
    return res.status(200).json({
        message: "Company information updated",
        success: true
    });
}));
