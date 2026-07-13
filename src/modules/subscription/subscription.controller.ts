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
    const userId = req.user?.id as string;
    const result = await subscriptionService.createCheckoutSession(userId);
    sendResponse(res, {
        success: true,
        statusCode: httpStatus.CREATED,
        message: "Checkout completed successfully.",
        data: result
    })
});

export const subscriptionController = {
    createCheckOutSession
}