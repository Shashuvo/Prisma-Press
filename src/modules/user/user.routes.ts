import { NextFunction, Request, Response, Router } from "express";
import { userController } from "./user.controller";
import { jwtUtils } from "../../utils/jwt";
import config from "../../config";
import { Role } from "../../../generated/prisma/enums";
import httpStatus from "http-status";
import { catchAsync } from "../../utils/catchAsync";
import { JwtPayload } from "jsonwebtoken";
import { prisma } from "../../lib/prisma";

const router = Router();

declare global {
    namespace Express {
        interface Request {
            user?: {
                id: string,
                name: string,
                email: string,
                role: Role
            }
        }
    }
}

// register user
router.post("/register", userController.registerUser);

const auth = (...requiredRoles: Role[]) => {
    return catchAsync(async (req: Request, res: Response, next: NextFunction) => {
        const token = req.cookies.accessToken;
        // || req.headers.authorization?.startsWith("Bearer ") ? req.headers.authorization?.split(" ")[1] : req.headers.authorization;

        if (!token) {
            throw new Error("You are not logged in. Please log in to access this resource.");
        }

        const verifiedToken = jwtUtils.verifyToken(token, config.jwt_access_secret);

        if (!verifiedToken.success) {
            throw new Error(verifiedToken.error);
        }

        const { id, name, email, role, } = verifiedToken.data as JwtPayload;

        if (requiredRoles.length && !requiredRoles.includes(role)) {
            throw new Error("Forbidden. You are not allow to access this resource.")
        }

        const user = await prisma.user.findFirstOrThrow({
            where: {
                id,
                email,
                name,
                role
            }
        });

        if (!user) {
            throw new Error("User not found. Please log in again.")
        }

        req.user = {
            id,
            name,
            email,
            role
        }
        next();
    })
}

// get a single user profile
router.get("/me", auth(Role.ADMIN, Role.AUTHOR, Role.USER), userController.getMyProfile);

export const userRoutes = router;