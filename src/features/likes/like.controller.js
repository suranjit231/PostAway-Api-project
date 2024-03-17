import LikeModel from "./like.model.js";

export default class LikeController{

    //..........toggle likes controller methods
    toggleLikesController(req,res){
        const postId = req.params.id;
        const userId = req.userId;

        if(!userId){
            return res.status(404).send("user Id not found");
        }

      const result=  LikeModel.toggleLike(postId,userId);

      if(result.success==false){
            return res.status(400).send(result);

      }

      res.status(200).send(result);

    }

    //.........get all likes in a post controller methods
    getAllLikesController(req,res){
        const postId = req.params.id;

        const result = LikeModel.getAllLike(postId);

        if(result.success==false){
           return res.status(400).send(result);
        }

        res.status(200).send(result);

    }



}