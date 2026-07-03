import httpStatus from 'http-status';
import { NextFunction, Request, Response } from "express";
import { catchAsync } from "../../utils/catchAsync";
import { postService } from "./post.service";
import { sendResponse } from "../../utils/sendResponse";

const getAllPosts = catchAsync(async (req: Request, res: Response, next: NextFunction) => {

});

const getStats = catchAsync(async (req: Request, res: Response, next: NextFunction) => {

});

const getMyPosts = catchAsync(async (req: Request, res: Response, next: NextFunction) => {

});

const getPostById = catchAsync(async (req: Request, res: Response, next: NextFunction) => {

});

// create a post
const createPost = catchAsync(async (req: Request, res: Response, next: NextFunction) => {
    const userId = req.user?.id as string;
    const payload = req.body;
    const result = await postService.createPostIntoDB(payload, userId);
    sendResponse(res, {
        success: true,
        statusCode: httpStatus.CREATED,
        message: "Post created successfully.",
        data: { result }
    })
});

const updatePostById = catchAsync(async (req: Request, res: Response, next: NextFunction) => {

});

const deletePostById = catchAsync(async (req: Request, res: Response, next: NextFunction) => {

});


export const postController = {
    getAllPosts,
    getStats,
    getMyPosts,
    getPostById,
    createPost,
    updatePostById,
    deletePostById
}