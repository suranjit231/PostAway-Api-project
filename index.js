import express from "express";
import cors from "cors";
import swaggerUi from "swagger-ui-express";

import userRoutes from "./src/features/users/user.routes.js";
import postRoutes from "./src/features/posts/post.routes.js";
import commentRoutes from "./src/features/comments/comments.routes.js";
import likeRoutes from "./src/features/likes/like.routes.js";
//import loggerMiddleware from "./src/middleware/logger.middleware.js";
import requestLoggerMiddleware from "./src/middleware/logger.middleware.js";

import { errorLogger } from "./src/middleware/logger.middleware.js";

import auth from "./src/middleware/jwt.middleware.js";
import ApplicationError from "./src/features/error-handler/applicationError.js";

import swaggerDocument from "./swagger-docs.json" assert { type: "json" };


const server = express();

//........middleware for cors setup
let corsOptions ={
    origin:"*",
    allowedHeader:"*",

}

server.use(cors(corsOptions));

//.......api-docs router
server.use('/api-docs', swaggerUi.serve, swaggerUi.setup(swaggerDocument));

//.........middleware to parse request in json payload.
server.use(express.json());

//........middleare to log the request data
server.use(requestLoggerMiddleware);

//.......middleware for users roues
server.use("/api/users", userRoutes)

//.......middleare for posts reutes
server.use("/api/posts",auth, postRoutes);

//.......middleware for comments routes
server.use("/api/comments",auth, commentRoutes);

//.......middleare for like routes
server.use("/api/likes",auth, likeRoutes);


//....default request
server.get("/", (req,res)=>{
    res.status(200).send("Welcome to my social media api");
});

//..............application level error handler middleware
server.use((err,req,res,next)=>{
    if(err instanceof ApplicationError){
       return res.status(err.code).send(err.message);
    }

   // loggerMiddleware.error(err);

    errorLogger.error(`${new Date().toString()} - ${err.stack}`);
    res.status(500).send("something went wrong please try later!");
})

//....server response for 404 request where the path is not found
server.use((req, res, next) => {
    res.status(404).send("Sorry, the page you're looking for could not be found.");
});


//.....server listing port
server.listen(3000, ()=>{
    console.log("server is listenng on port 3000");
})
