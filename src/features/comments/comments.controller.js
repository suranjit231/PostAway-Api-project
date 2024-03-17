import CommentModel from "./comments.model.js";

export default class CommentController{

    //..............addComment-controller
    addCommentController(req,res){
        const userId = req.userId;
        const postId = req.params.id;
        const comment = req.body.comment;

        console.log("console from add comments controller", postId);
        console.log("console from add comments controller", comment);

        if (!userId) {
            return res.status(404).send("User ID not provided.");
        }
    
        if (!postId) {
            return res.status(404).send("Post ID not provided.");
        }
    
        if (!comment) {
            return res.status(400).send("Comment content not provided.");
        }

        // Call addComments method from CommentModel
    const result = CommentModel.addComments(userId, postId, comment);

    if (result.success) {
        return res.status(201).json({ success: true, msg: "Comment added successfully", comment: result.newComment });
    } else {
        return res.status(400).json({ success: false, msg: result.msg });
    }

    }


    //..........update commment controller
    updateCommentController(req,res,next){
        const {postId,commentId} = req.query;
        const comment = req.body.comment;
        const userId = req.userId;

        if(!postId){
            return res.status(400).send("Post Id not found");
        }

        if(!commentId){
            return res.status(400).send("comment is not found");
        }

        if(!userId){
            return res.status(400).send("User Id not found");
        }

        if (!comment) {
            return res.status(400).send("Comment is empty");
        }

       const result= CommentModel.updateComment(postId,commentId,userId,comment);

       if(res.success==false){
       return res.status(400).send(result);
       }

       res.status(200).send(result);

    }

    //........delete comments controller
    deleteCommentController(req,res){
        const commentId = req.query.commentId;
        const userId = req.userId;

        if(!commentId){
            return res.status(400).send("comments Id not given");
        }

       const result= CommentModel.deleteComment(commentId,userId);

       if(result.success==false){
       return res.status(404).send(result);
       }

       res.status(200).send(result);
    }


    //..........get all comments for specific post
    getAllCommentController(req,res){
        const postId = req.params.id;
       const result= CommentModel.getAllComments(postId);

       if(result.success==false){
        return res.status(404).send(result);
       }

       res.status(200).send(result);

        
    }



}