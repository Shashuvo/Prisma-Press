import { NextFunction, Request, Response } from "express";
import { catchAsync } from "../../utils/catchAsync"
import { commentService } from "./comment.service";
import { sendResponse } from "../../utils/sendResponse";
import httpStatus from "http-status";

// get authors comment
const getAuthorCommentsById = catchAsync(async (req: Request, res: Response, next: NextFunction) => {
    const { authorId } = req.params
    const result = await commentService.getAuthorCommentsByIdFromDB(authorId as string)
    sendResponse(res, {
        success: true,
        statusCode: httpStatus.OK,
        message: "Comments retrieved successfully",
        data: result
    })
});

// get comment by post id
const getCommentById = catchAsync(async (req: Request, res: Response, next: NextFunction) => {
    const { postId } = req.params
    const result = await commentService.getCommentByIdFromDB(postId as string)
    sendResponse(res, {
        success: true,
        statusCode: httpStatus.OK,
        message: "Comment retrieved successfully",
        data: result
    })
});

// create comment
const createComment = catchAsync(async (req: Request, res: Response, next: NextFunction) => {
    const authorId = req.user?.id as string;
    const result = await commentService.createCommentIntoDB(authorId, req.body);
    sendResponse(res, {
        success: true,
        statusCode: httpStatus.CREATED,
        message: "Comment created successfully",
        data: result
    })
});

// update comment by id
const updateCommentById = catchAsync(async (req: Request, res: Response, next: NextFunction) => {
    const user = req.user;
    const { commentId } = req.params;
    const authorId = user?.id as string;
    const payload = req.body;
    const result = await commentService.updateCommentByIdIntoDB(commentId as string, payload, authorId)
    sendResponse(res, {
        success: true,
        statusCode: httpStatus.OK,
        message: "Comment updated successfully",
        data: result
    })
});

// delete comment by id
const deleteCommentById = catchAsync(async (req: Request, res: Response, next: NextFunction) => {
    const user = req.user;
    const { commentId } = req.params;
    const authorId = user?.id as string;
    const result = await commentService.deleteCommentByIdFromDB(commentId as string, authorId)
    sendResponse(res, {
        success: true,
        statusCode: httpStatus.OK,
        message: "Comment deleted successfully",
        data: result
    })
});

// moderate comment by id
const moderateCommentById = catchAsync(async (req: Request, res: Response, next: NextFunction) => {
    const { commentId } = req.params;
    const payload = req.body;
    const result = await commentService.moderateCommentByIdIntoDB(commentId as string, payload);
    sendResponse(res, {
        success: true,
        statusCode: httpStatus.OK,
        message: "Comment moderated successfully",
        data: result
    });
});

export const commentController = {
    getAuthorCommentsById,
    getCommentById,
    createComment,
    updateCommentById,
    deleteCommentById,
    moderateCommentById
}