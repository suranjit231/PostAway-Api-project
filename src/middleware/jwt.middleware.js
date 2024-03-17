import Jwt from "jsonwebtoken";


//.........middleware to verify the authentication token
const auth = (req,res,next)=>{

    const token = req.headers["authorization"];

    if(!token){
        return res.status(401).send("Unauthorized access");
    }

    //........if token is presents in the request headers then verify the token

    try{

       const payload= Jwt.verify(token, "ZZ5ejehcNpGvSSKhN7BhvAVAYzURrRXK");
       req.userId = payload.userId;
       next();

    }
    catch(err){
        return res.status(401).send("Unauthorized access");
    }

}


export default auth;