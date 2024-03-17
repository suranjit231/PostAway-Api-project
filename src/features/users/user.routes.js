//.....this is a user router file
import express from "express";
import UserController from "./user.controller.js";
import { validateSignup } from "../../validator/signup-validato.js";


const userRoutes = express.Router();
const userController = new UserController();


//....routes for sign up
userRoutes.post("/signup",validateSignup, userController.addUser);
//....routes for signin
userRoutes.post("/signin", userController.signin);

//...........get all user routes
userRoutes.get("/:id", userController.getAllUserController);

export default userRoutes;
