import express from "express";
import LikeController from "./like.controller.js";

const likeRoutes = express.Router();
const likeController = new LikeController();


//.......routes for toggling likes by post id
likeRoutes.post("/:id", likeController.toggleLikesController);

//.......routes for get all liktes byt post id
likeRoutes.get("/:id", likeController.getAllLikesController);

export default likeRoutes;

