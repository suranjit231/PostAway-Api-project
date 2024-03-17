import PostModel from "../posts/post.model.js";
import { v4 as uuidv4 } from 'uuid';

export default class LikeModel{
    constructor(likeId,postId,userId){
        this.likeId = likeId;
        this.postId = postId;
        this.userId = userId;

    }

    //......method for toggling like and dislike in post

    static toggleLike(postId,userId){
        const post = PostModel.getAllPosts().find((post)=>post.postId==postId);

        if(!post){
            return {success:false, msg:"post not found"};
        }

        if (!post.likes) {
            post.likes = [];
        }

       const likeIndex= post.likes.findIndex((like)=>like.userId==userId);

       if(likeIndex == -1){
            const newLike = new LikeModel(uuidv4(),postId,userId);
            post.likes.push(newLike);

            return {success:true, msg:"Post liked successfully", newLike};
       }

       post.likes.splice(likeIndex,1);
       return { success: true, msg: "Post unliked successfully" };

    }


    //........get all likes
    static getAllLike(postId){
        const post = PostModel.getAllPosts().find((post)=>post.postId==postId);

        if(!post){
            return {success:false, msg:"post not found"};
        }

        const likes = post.likes;
        const totalLike = likes.length;

        if(totalLike==0){
            return {success:false, msg:"No likes given in this post"};
        }

        return {success:true, msg:`Total ${totalLike} in this post`, likes};

    }


}