import { NextFunction, Request, Response } from "express";
import { catchAsync } from "../../utils/catchAsync";

const getAllPosts = catchAsync(async (req: Request, res: Response, next: NextFunction) => {

});

const getStats = catchAsync(async (req: Request, res: Response, next: NextFunction) => {

});

const getMyPosts = catchAsync(async (req: Request, res: Response, next: NextFunction) => {

});

const getPostById = catchAsync(async (req: Request, res: Response, next: NextFunction) => {

});

const createPost = catchAsync(async (req: Request, res: Response, next: NextFunction) => {

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