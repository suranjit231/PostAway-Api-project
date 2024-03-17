import { body, validationResult } from 'express-validator';

export const validatePostCreation = [
    body('caption').trim().notEmpty().withMessage('Caption is required'),
    body('imageUrl').custom((value, {req})=>{
        if(!req.file){
            throw new Error("Image Url required");
        }

        return true;
    }),
    (req, res, next) => {
        const errors = validationResult(req);
        if (!errors.isEmpty()) {
            const errorMessages = errors.array().map(error => error.msg); // Extract error messages
            return res.status(400).json({ errors: errorMessages }); // Send only error messages
        }
        next();
    }
];
