import { PostStatus } from "../../../generated/prisma/enums";

export interface ICreatePostPayload {
    title: string,
    content: string,
    thumbNail?: string,
    isFeatured?: boolean,
    status?: PostStatus,
    tags: string[]
}