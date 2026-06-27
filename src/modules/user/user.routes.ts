import { Router } from "express";
import { userController } from "./user.controller";

const router = Router();

// register user
router.post("/register", userController.registerUser);

// get a single user profile
router.get("/me", userController.getMyProfile);

export const userRoutes = router;