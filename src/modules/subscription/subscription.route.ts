import { Router } from "express";
import { auth } from "../../middleware/auth";
import { subscriptionController } from "./subscription.controller";

const router = Router();

// create check out after payment
router.post("/checkout", auth(), subscriptionController.createCheckOutSession);
// stripe webhook
router.post("/webhook",subscriptionController.handleWebhook)

export const subscriptionRoutes = router;