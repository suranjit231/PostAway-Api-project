//.........it is a validor which check the sign up data

import { body, validationResult } from 'express-validator';

export const validateSignup = [
    body('name').trim().notEmpty().withMessage('Name is required'),
    body('email').trim().isEmail().withMessage('Invalid email'),
    body('password').trim().isLength({ min: 6 }).withMessage('Password must be at least 6 characters long'),
    (req, res, next) => {
        const errors = validationResult(req);
        if (!errors.isEmpty()) {
            const errorMessages = errors.array().map(error => error.msg); // Extract error messages
            return res.status(400).json({ errors: errorMessages }); 
        }
        next();
    }
];
