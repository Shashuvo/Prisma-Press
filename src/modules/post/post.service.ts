import { prisma } from "../../lib/prisma"
import { ICreatePostPayload } from "./post.interface"

// get all posts
const getAllPostsFromDB = async () => {
    const posts = await prisma.post.findMany({
        include: {
            author: {
                omit: {
                    password: true
                }
            },
            comments: true
        }
    });

    return posts;
};

const getStatsFromDB = async () => {

}

// get my posts
const getMyPostsFromDB = async (authorId: string) => {
    const result = await prisma.post.findMany({
        where: {
            authorId
        },
        orderBy: {
            createdAt: "desc"
        },
        include: {
            comments: true,
            _count: {
                select: {
                    comments: true
                }
            },
            author: {
                omit: {
                    password: true
                }
            }
        }
    });
    return result;
};

// get post by id
const getPostByIdFromDB = async (postId: string) => {
    const post = await prisma.post.findUniqueOrThrow({
        where: {
            id: postId
        }
    });

    const updatedPost = await prisma.post.update({
        where: {
            id: postId
        },
        data: {
            views: {
                increment: 1
            }
        },
        include: {
            author: {
                omit: {
                    password: true
                }
            },
            comments: true
        }
    });

    return updatedPost;
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