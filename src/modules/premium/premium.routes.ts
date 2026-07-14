import { Router } from "express";
import { auth } from "../../middleware/auth";
import { subscriptionGuard } from "../../middleware/premiumPostGuard";
import { premiumController } from "./premium.controller";

const router = Router();

router.get("/", auth(), subscriptionGuard(), premiumController.getPremiumPosts);

export const premiumRoutes = router;