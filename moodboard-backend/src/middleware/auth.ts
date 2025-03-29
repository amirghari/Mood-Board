// src/middleware/auth.ts
import { Request, Response, NextFunction, RequestHandler } from 'express';
import jwt from 'jsonwebtoken';

export const verifyToken: RequestHandler = (req: Request, res: Response, next: NextFunction) => {
    // Expect the token to be sent in the Authorization header as "Bearer <token>"
    const token = req.headers['authorization']?.split(' ')[1];
    if (!token) {
        res.status(401).json({ message: 'Access token missing' });
        return;
    }
    try {
        // Verify the token using the JWT secret from your .env file
        const decoded = jwt.verify(token, process.env.JWT_SECRET as string) as { id: number };
        // Attach the user's id to the request for later use
        (req as any).userId = decoded.id;
        next();
    } catch (error) {
        res.status(401).json({ message: 'Invalid token' });
    }
};