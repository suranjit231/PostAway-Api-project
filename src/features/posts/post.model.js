import { v4 as uuidv4 } from 'uuid';
import UserModel from '../users/user.model.js';

export default class PostModel{
    constructor(postId,userId,caption,imageUrl){
        this.postId = postId;
        this.userId = userId;
        this.caption = caption;
        this.imageUrl = imageUrl;
        this.comments = [];
        this.likes = [];
    }

    //....array to store the post data
    static posts =[];

    //.....storage for comments
    

    //.........methods for create post
    static createPost(userId,caption,imageUrl){
        const user = UserModel.getUserById(userId);

        if(!user){
            return { success: false, msg: "User not found" };
        }


        const newPost = new PostModel(uuidv4(),userId,caption,imageUrl);
        this.posts.push(newPost);

        return { success: true, msg: "Post created successfully", newPost};
    }

   // Methods for update post
   static updatePost(updateObj) {
    const { postId, userId, ...rest } = updateObj;

    const postIndex = this.posts.findIndex(post => post.postId === postId);
    if (postIndex === -1) {
        return { success: false, msg: "Post not found" };
    }

    const post = this.posts[postIndex];
    if (post.userId !== userId) {
        return { success: false, msg: "You are not authorized to update this post" };
    }

    // Update post properties with values from updateObj using Object.assign
    Object.assign(post, rest);

    return { success: true, msg: "Post updated successfully", post };
}

 //..........get all posts
   static getAllPosts(){
        return this.posts;

    }

//............get posts by postId
   static getPostBypostId(postId){
       const postById= this.posts.find((post)=>post.postId==postId);

       if(!postById){
            return {success:false, msg:"posts not found"};
       }

       return {success:true, msg:"your posts", postById};
    }

//.............delete posts
    static deletePost(userId,postId){
        const postIndex = this.posts.findIndex((post)=>post.userId==userId && post.postId==postId);

        if(postIndex == -1){
            return {success:false, msg:"posts not found"};
        }

        this.posts.splice(postIndex,1);

        return {success:true, msg:"posts removed sucessfully"};
    }

// Get posts by userId
static getPostsByUserId(userId) {
    return this.posts.filter(post => post.userId === userId);
}

}