import express, { Request, Response, NextFunction } from "express";
import Jwt from "jsonwebtoken";
import cookieParser from "cookie-parser";

const app = express();
app.use(cookieParser());

interface CustomRequest extends Request {
    id?: string;
}

export const userMiddleware = async (
    req: CustomRequest,
    res: Response,
    next: NextFunction
) => {
    try {
        const token = req.cookies.token;

        if (!token) {
            return res.status(401).json({
                message: "User not authenticated",
                success: false,
            });
        }

        const secret = process.env.JWT_SECRET;
        if (!secret) {
            throw new Error("JWT_SECRET is not defined in the environment variables");
        }

        interface JwtPayload {
            userId: string;
        }

        const decode = Jwt.verify(token, secret) as JwtPayload;

        if (!decode) {
            return res.status(401).json({
                message: "Invalid token",
                success: false,
            });
        }

        req.id = decode.userId;
        next();
    } catch (error) {
        console.error(error);
        res.status(500).json({
            message: "Internal server error",
            success: false,
        });
    }
};
