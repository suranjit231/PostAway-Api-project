import multer from "multer";
import path from "path";
//........consiguration of multer for file uploads

const storage = multer.diskStorage({
    destination:(req,file,cb)=>{
        cb(null, path.resolve('./uploads'))

    },
    filename:(req,file,cb)=>{
        cb(null, new Date().toISOString().replace(/:/, '-'+file.originalname));
    }

});


export const uploads = multer({storage:storage});