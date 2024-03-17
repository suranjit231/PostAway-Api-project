//.......import uuid for creating quique user id
import { v4 as uuidv4 } from 'uuid';
import ApplicationError from '../error-handler/applicationError.js';

export default class UserModel{
    constructor(userId,name,email,password){
        this.userId = userId;
        this.name = name;
        this.email = email;
        this.password = password;
    }

    //......array to store all the user data
    static users = [];

    //......method for creating new user
    static createUser(name,email,password){
        const newUser = new UserModel(uuidv4(),name,email,password);
        this.users.push(newUser);

        return this.users;
    }

    //.....methods for login user confirmation
    static login(email,password){
       const user= this.users.find((user)=>user.email==email && user.password==password);

        if(!user){
            throw new ApplicationError("invalid user Credential",400);

        }else{
            return user;
        }
    }

    //.....get all users
    static getAllUser(){
        return this.users;
    }

    //.....get user by their unique id;
    static getUserById(userId){
       const user= this.users.find((user)=>user.userId==userId);

       if(!user){
        // throw new Error("user is not exist");
       // return {success:false, msg:"user not exist by id"};

        throw new ApplicationError("user not exist by id",404);

       }else{

        return user;
       }
    }

}


//----------default user for testing
UserModel.createUser("John Doe", "john@example.com", "password1");
UserModel.createUser("Jane Smith", "jane@example.com", "password2");