//......router file for all comments api

import express from "express";
import CommentController from "./comments.controller.js";

const commentRoutes = express.Router();

const commentController = new CommentController();

//.....get all comments by post id as params
commentRoutes.get("/:id", commentController.getAllCommentController);

//.....add comments by post id as params
commentRoutes.post("/:id", commentController.addCommentController);

//......delete comments 
commentRoutes.delete("/", commentController.deleteCommentController);

//......update comments
commentRoutes.put("/", commentController.updateCommentController);

export default commentRoutes;

