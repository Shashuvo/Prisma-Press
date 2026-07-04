import { Router } from "express";
import { postController } from "./post.controller";
import { auth } from "../../middleware/auth";
import { Role } from "../../../generated/prisma/enums";

const router = Router();

router.get("", postController.getAllPosts);

router.get("/stats", auth(Role.ADMIN), postController.getStats);

router.get("/my-posts", auth(Role.ADMIN, Role.AUTHOR, Role.USER), postController.getMyPosts);

router.get("/:postId", postController.getPostById);

router.post("", auth(Role.ADMIN, Role.AUTHOR, Role.USER), postController.createPost);

router.patch("/:postId", auth(Role.ADMIN, Role.AUTHOR, Role.USER), postController.updatePostById);

router.delete("/:postId", auth(Role.ADMIN, Role.AUTHOR, Role.USER), postController.deletePostById);

export const postRoutes = router;