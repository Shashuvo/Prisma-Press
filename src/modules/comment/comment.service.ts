import { prisma } from "../../lib/prisma"
import { ICreateCommentPayload, IModerateCommentPayload, IUpdateCommentPayload } from "./comment.interface"

// get comment by author id
const getAuthorCommentsByIdFromDB = async (authorId: string) => {
    const comments = await prisma.comment.findMany({
        where: {
            authorId
        },
        orderBy: { createdAt: "desc" },
        include: {
            post: {
                select: {
                    id: true,
                    title: true
                }
            }
        }
    })
    return comments;
}

// get comment by post id
const getCommentByIdFromDB = async (postId: string) => {
    const comment = await prisma.comment.findMany({
        where: {
            postId
        }
    })
    return comment;
}

// create comment
const createCommentIntoDB = async (authorId: string, payload: ICreateCommentPayload) => {
    await prisma.post.findUniqueOrThrow({
        where: {
            id: payload.postId
        }
    })

    const comment = await prisma.comment.create({
        data: {
            ...payload,
            authorId
        },
        // include:{
        //     post : true
        // }
    })

    return comment;
}

// update comment by id
const updateCommentByIdIntoDB = async (commentId: string, data: IUpdateCommentPayload, authorId: string) => {
    const commentData = await prisma.comment.findUniqueOrThrow({
        where: {
            id: commentId,
            authorId
        },
        select: {
            id: true
        }
    })

    // if (!commentData) {
    //     throw new Error("Your provided input is invalid!")
    // }

    const comment = await prisma.comment.update({
        where: {
            id: commentId,
            authorId
        },
        data
    })

    return comment;
}

// delete comment by id
const deleteCommentByIdFromDB = async (commentId: string, authorId: string) => {
    const commentData = await prisma.comment.findUniqueOrThrow({
        where: {
            id: commentId,
            authorId
        },
        select: {
            id: true
        }
    })

    // if (!commentData) {
    //     throw new Error("Your provided input is invalid!")
    // }

    const comment = await prisma.comment.delete({
        where: {
            id: commentData.id
        }
    });

    return null;
}

// moderate comment by id
const moderateCommentByIdIntoDB = async (id: string, data: IModerateCommentPayload) => {
    const commentData = await prisma.comment.findUniqueOrThrow({
        where: {
            id
        },
        select: {
            id: true,
            status: true
        }
    });

    if (commentData.status === data.status) {
        throw new Error(`Your provided status (${data.status}) is already up to date.`)
    }

    const comment = await prisma.comment.update({
        where: {
            id
        },
        data
    });

    return comment;
}

export const commentService = {
    getAuthorCommentsByIdFromDB,
    getCommentByIdFromDB,
    createCommentIntoDB,
    updateCommentByIdIntoDB,
    deleteCommentByIdFromDB,
    moderateCommentByIdIntoDB
}