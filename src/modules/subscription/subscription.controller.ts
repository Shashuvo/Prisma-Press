import httpStatus from 'http-status';
import { NextFunction, Request, Response } from "express";
import { catchAsync } from "../../utils/catchAsync";
import { subscriptionService } from "./subscription.service";
import { sendResponse } from "../../utils/sendResponse";

// create check out after payment
const createCheckOutSession = catchAsync(async (req: Request, res: Response, next: NextFunction) => {
    const userId = req.user?.id as string;
    const result = await subscriptionService.createCheckoutSession(userId);
    sendResponse(res, {
        success: true,
        statusCode: httpStatus.CREATED,
        message: "Checkout completed successfully.",
        data: result
    })
});
// handle web hook
const handleWebhook = catchAsync(async (req: Request, res: Response, next: NextFunction) => {
    const event = req.body as Buffer;
    const signature = req.headers['stripe-signature']! as string;
    await subscriptionService.handleWebhook(event, signature);
    sendResponse(res, {
        success: true,
        statusCode: httpStatus.OK,
        message: "Webhook triggered successfully.",
        data: null
    })
});
// get Subscription Status
const getSubscriptionStatus = catchAsync(async (req: Request, res: Response, next: NextFunction) => {
    const userId = req.user?.id as string;
    const result = await subscriptionService.getSubscriptionStatus(userId);
    sendResponse(res, {
        success: true,
        statusCode: httpStatus.OK,
        message: "Subscription status retrieved successfully.",
        data: result
    })
});

export const subscriptionController = {
    createCheckOutSession,
    handleWebhook,
    getSubscriptionStatus
}