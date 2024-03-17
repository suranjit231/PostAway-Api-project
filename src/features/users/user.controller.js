import ApplicationError from "../error-handler/applicationError.js";
import UserModel from "./user.model.js";
import Jwd from "jsonwebtoken";

export default class UserController{

    //.......creating a new user
    addUser(req,res){
        
        const {name,email,password} = req.body;
        console.log(name);
    const user= UserModel.createUser(name,email,password );
    if(user){
        res.status(201).send("user has been created successfully");
    }
    }

    //......user signin method
    signin(req,res,next){

        try{

            const {email,password} = req.body;
            const user= UserModel.login(email,password);

            const token = Jwd.sign({userId:user.userId,email:user.email},
                "ZZ5ejehcNpGvSSKhN7BhvAVAYzURrRXK",{expiresIn:'1h'},
                );

            res.status(200).json({token, user});
        }
        catch(err){
           // res.status(404).send(err.message);

           next(err);

        }
       
    }

    //...............get all user method controller
    getAllUserController(req,res,next){

        try{
            const userId = req.params.id;
            if(!userId){
                throw new ApplicationError("invalid credentail", 404)
            }

           const users= UserModel.getAllUser();

          return res.status(200).send(users);

        }

        catch(err){

            next(err)

        }
       


    }
}