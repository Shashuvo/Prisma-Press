import httpStatus from 'http-status';
import { NextFunction, Request, Response } from "express";
import { catchAsync } from "../../utils/catchAsync";
import { postService } from "./post.service";
import { sendResponse } from "../../utils/sendResponse";

// get all posts
const getAllPosts = catchAsync(async (req: Request, res: Response, next: NextFunction) => {
    const posts = await postService.getAllPostsFromDB();
    sendResponse(res, {
        success: true,
        statusCode: httpStatus.OK,
        message: "All posts retrieved successfully.",
        data: { posts }
    })
});

const getStats = catchAsync(async (req: Request, res: Response, next: NextFunction) => {

});

// get my posts
const getMyPosts = catchAsync(async (req: Request, res: Response, next: NextFunction) => {
    const authorId = req.user?.id as string;
    const result = await postService.getMyPostsFromDB(authorId);
    sendResponse(res, {
        success: true,
        statusCode: httpStatus.OK,
        message: "My posts retrieved successfully.",
        data: { result }
    })
});

// get post by id
const getPostById = catchAsync(async (req: Request, res: Response, next: NextFunction) => {
    const postId = req.params.postId as string;
    if (!postId) {
        throw new Error("Post id required in params.")
    }
    const result = await postService.getPostByIdFromDB(postId);
    sendResponse(res, {
        success: true,
        statusCode: httpStatus.OK,
        message: "Post retrieved successfully.",
        data: { result }
    })
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

// update post
const updatePostById = catchAsync(async (req: Request, res: Response, next: NextFunction) => {
    const authorId = req.user?.id as string;
    const postId = req.params.postId as string;
    const isAdmin = req.user?.role === "ADMIN";
    const payload = req.body;
    if (!postId) {
        throw new Error("Post id required in params.")
    }
    const result = await postService.updatePostByIdIntoDB(postId, payload, authorId, isAdmin);
    sendResponse(res, {
        success: true,
        statusCode: httpStatus.OK,
        message: "Post updated successfully.",
        data: { result }
    })
});

// post delete by id
const deletePostById = catchAsync(async (req: Request, res: Response, next: NextFunction) => {
    const authorId = req.user?.id as string;
    const postId = req.params.postId as string;
    const isAdmin = req.user?.role === "ADMIN";
    if (!postId) {
        throw new Error("Post id required in params.")
    }
    const result = await postService.deletePostByIdFromDB(postId, authorId, isAdmin);
    sendResponse(res, {
        success: true,
        statusCode: httpStatus.OK,
        message: "Post deleted successfully.",
        data: { result }
    })
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