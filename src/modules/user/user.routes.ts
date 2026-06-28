import { Router } from "express";
import { userController } from "./user.controller";
import { Role } from "../../../generated/prisma/enums";
import { auth } from "../../middleware/auth";

const router = Router();



// register user
router.post("/register", userController.registerUser);

// get a single user profile
router.get("/me", auth(Role.ADMIN, Role.AUTHOR, Role.USER), userController.getMyProfile);

// update my profile
router.put("/my-profile", auth(Role.ADMIN, Role.AUTHOR, Role.USER), userController.updateMyProfile);

export const userRoutes = router;