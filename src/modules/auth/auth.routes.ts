import { Router } from "express";
import { authController } from "./auth.controller";

const router = Router();

// user login
router.post("/login", authController.loginUser);

export const authRoutes = router