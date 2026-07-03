import { Router } from "express";
import { commentController } from "./comment.controller";
import { Role } from "../../../generated/prisma/enums";
import { auth } from "../../middleware/auth";

const router = Router();

router.get("/author/authorId", commentController.getAuthorCommentsById);

router.get("/:commentId", commentController.getCommentById);

router.post("", auth(Role.ADMIN, Role.AUTHOR, Role.USER), commentController.createComment);

router.patch("/:commentId", auth(Role.ADMIN, Role.AUTHOR, Role.USER), commentController.updateCommentById);

router.delete("/:commentId", auth(Role.ADMIN, Role.AUTHOR, Role.USER), commentController.deleteCommentById);

router.patch("/:commentId/moderate", auth(Role.ADMIN), commentController.moderateCommentById);

export const commentRoutes = router;