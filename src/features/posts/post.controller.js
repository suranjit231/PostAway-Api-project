import PostModel from "./post.model.js";

export default class PostController{

    //......create new post
    addPost(req,res,next){
        const caption = req.body.caption;
        const userId = req.userId;
        const imageUrl = req.file.filename;

       const status= PostModel.createPost(userId,caption,imageUrl);

       if(status.success == false){
            return res.status(400).send(status);
       }

       res.status(201).send(status);
    }

    //........update post controller method

    updatePostController(req, res, next) {
        const postId = req.params.id;
        const userId = req.userId;
        const updateableBody = req.body;
    
        // Check if a file was uploaded
        if (req.file) {
            updateableBody.imageUrl = req.file.filename; // Update imageUrl with the filename of the uploaded file
        }
    
        // Add postId and userId to the updateableBody
        updateableBody.postId = postId;
        updateableBody.userId = userId;
    
        // Call updatePost method from PostModel
        const updateResult = PostModel.updatePost(updateableBody);
    
        if (!updateResult.success) {
            return res.status(400).send(updateResult);
        }
    
        res.status(200).send(updateResult);
    }


    //........delete post controller methods by posts id
    deletePostController(req,res,next){
        const postId = req.params.id;
        const userId = req.userId;

        if(!userId){
            return res.status(400).send("you are un authorized for delete a post ");
        }

       const result= PostModel.deletePost(userId,postId);
       if(result.success==false){
         res.status(400).send(result);

       }else{
            res.status(200).send(result);
       }
    }

    //.........get all posts methods controller
    getAllPost(req,res){
       const posts= PostModel.getAllPosts();

       if(posts.length>=1){
           return res.status(200).send(posts);
       }

       return res.status(400).send("posts not found");


    }

    //.........get posts by postId
    getPostById(req,res){
        const postId = req.params.id;

        if(!postId){
            return res.status(400).send("no post id exist");
        }

       const post= PostModel.getPostBypostId(postId);

       if(post.success==false){
        return res.status(400).send(post);
       }

       return res.status(200).send(post);


    }

    //.........get posts by user credentials
    getPostByUserCredential(req,res){
        const userId = req.userId;

        if(!userId){
           return res.status(404).send("no user credential found");
        }

       const userCredentialPost= PostModel.getPostsByUserId(userId);

       if(userCredentialPost.length<=0){
        return res.status(404).send("sorry you have not create any post now");
       }

       res.status(200).send(userCredentialPost);
    }
    
}