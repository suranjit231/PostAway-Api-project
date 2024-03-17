import { v4 as uuidv4 } from 'uuid';
import UserModel from '../users/user.model.js';
import PostModel from '../posts/post.model.js';

export default class CommentModel{
    constructor(commentId,userId,postId, comment){
        this.commentId = commentId;
        this.userId = userId;
        this.postId = postId;
        this.comment = comment;

    }

    //......addComments methods
    static addComments(userId,postId,comment){
        const user = UserModel.getUserById(userId);

        if(!user){
            return {success:false, msg:"user not found"};
        }

        const post = PostModel.getAllPosts().find((post)=>post.postId==postId);
        console.log("console from comments modal", post);

        if(!post){
            return {success:false, msg:"post not founds"};
        }

    const newComment = new CommentModel(uuidv4(), userId,postId,comment);
    post.comments.push(newComment);
    return { success: true, msg: "Comment added successfully", newComment };

    }

    //..............update comments
    static updateComment(postId,commentId,userId,updateContent){
       
        const post = PostModel.getAllPosts().find((post)=>post.postId==postId);


        if(!post){
            return {success:false, msg:"post not found"};

        }

      const commentIdx=  post.comments.findIndex((comment)=>comment.commentId==commentId && comment.userId==userId);
      if(commentIdx == -1){
        return {success:false, msg:"comments not found"};
      }

      post.comments[commentIdx] = updateContent;
      const updatedComment =  post.comments[commentIdx];


      return {success:true, mgs:"comment updated sucess fullly", updatedComment};
        
    }

    //...................delete comments
     static deleteComment(commentId, userId){
       const posts= PostModel.getAllPosts();
       for (const post of posts) {
        const commentIndex = post.comments.findIndex(comment => comment.commentId === commentId && comment.userId === userId);
        
        if (commentIndex !== -1) {
            post.comments.splice(commentIndex, 1);
            return { success: true, msg: "Comment deleted successfully" };
        }
    }

    return { success: false, msg: "Comment not found" };

     }

     //.............get all comments for specific posts
     static getAllComments(postId){
        const post = PostModel.getAllPosts().find((post)=>post.postId==postId);

        if(!post){
            return {success:false, msg:"No posts found with the given postId"};
        }

       const comments= post.comments;

       if(comments.length<=0){
            return {success:false, msg:"No comments found for this post"};
       }

       const totalComments = comments.length;

      // return {success:true, msg:"lists of comments for this posts are", comments};
       return { success: true, msg: `Found ${totalComments} comments for this post`, comments };

        
     }
   
}