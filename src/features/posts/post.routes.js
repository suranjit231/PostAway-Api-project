import express from "express";
import { uploads } from "../../middleware/fileUpload.middleware.js";
import PostController from "./post.controller.js";
import { validatePostCreation } from "../../validator/addPost-validator.js";

const postRoutes = express.Router();
const postController = new PostController();

postRoutes.post('/', uploads.single("imageUrl"),validatePostCreation, postController.addPost);

postRoutes.put('/:id', uploads.single('imageUrl'), postController.updatePostController);

postRoutes.get("/", postController.getAllPost);

postRoutes.get("/user-post", postController.getPostByUserCredential);

postRoutes.get("/:id", postController.getPostById);

postRoutes.delete("/:id", postController.deletePostController);

export default postRoutes;