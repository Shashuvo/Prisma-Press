import { prisma } from "../../lib/prisma"
import { ICreatePostPayload } from "./post.interface"

const getAllPostsFromDB = async () => {

}

const getStatsFromDB = async () => {

}

const getMyPostsFromDB = async () => {

}

const getPostByIdFromDB = async () => {

}

// create a post
const createPostIntoDB = async (payload: ICreatePostPayload, userId: string) => {
    const result = await prisma.post.create({
        data: {
            ...payload,
            authorId: userId
        }
    });

    return result;
};

const updatePostByIdIntoDB = async () => {

}

const deletePostByIdFromDB = async () => {

}



export const postService = {
    getAllPostsFromDB,
    getStatsFromDB,
    getMyPostsFromDB,
    getPostByIdFromDB,
    createPostIntoDB,
    updatePostByIdIntoDB,
    deletePostByIdFromDB
}