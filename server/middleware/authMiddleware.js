import jwt from 'jsonwebtoken';
import asyncHandler from 'express-async-handler';
import userModel from '../models/userModel.js';

const protectRoute = asyncHandler(async (req, res, next) => {
    
    let token = req.cookies.jwt;

    if (token) {
        try {
            const decoded = jwt.verify(token, process.env.JWT_SECRET);
            // decode toen and extract userId minus password from decoded string
            req.user = await userModel.findById(decoded.userId).select('-password');
            next()
        } catch (error) {
            res.status(401);
            throw new Error('not authorized, Invalid token');
        }
    } else {
        res.status(401);
        throw new Error('Not authorized, no token available');
    }
});

export { protectRoute };