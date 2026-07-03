import { NextFunction, Request, Response } from "express";
import { catchAsync } from "../../utils/catchAsync"

const getAuthorCommentsById = catchAsync(async (req: Request, res: Response, next: NextFunction) => {

});

const getCommentById = catchAsync(async (req: Request, res: Response, next: NextFunction) => {

});

const createComment = catchAsync(async (req: Request, res: Response, next: NextFunction) => {

});

const updateCommentById = catchAsync(async (req: Request, res: Response, next: NextFunction) => {

});

const deleteCommentById = catchAsync(async (req: Request, res: Response, next: NextFunction) => {

});

const moderateCommentById = catchAsync(async (req: Request, res: Response, next: NextFunction) => {

});

export const commentController = {
    getAuthorCommentsById,
    getCommentById,
    createComment,
    updateCommentById,
    deleteCommentById,
    moderateCommentById
}