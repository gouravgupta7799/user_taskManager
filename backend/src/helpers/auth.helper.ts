import bcrypt from 'bcrypt';
import { AuthenticatedRequest } from './interface';
import { NextFunction } from 'express';
import { verify } from 'jsonwebtoken';
import { User } from '../entity/user.entity';
import dbModuleInstance from '../db';

const userRepository = dbModuleInstance.getRepository(User);

// hashpassword function
export async function hashPassword(password: string): Promise<string> {
  const saltRounds = 10;
  const hashedPassword = await bcrypt.hash(password, saltRounds);
  return hashedPassword;
}

// compare hash password function
export const comparePassword = async (password: string, hashedPassword: string): Promise<boolean> => {
  return await bcrypt.compare(password, hashedPassword);
};

export const isAdmin = async (req: AuthenticatedRequest, res: any, next: NextFunction) => {
  try {
    const token = req.header('Authorization');
    const secret = process.env.JWTPASSCODE as string;

    // Check if token is provided
    if (!token) {
      return res.status(400).json({ error: 'Authorization token is required' });
    }

    // Decode and verify the token
    const details = verify(token, secret) as { userId: string; userEmail: string }; // Verifies and decodes

    // Check if decoding was successful
    if (!details || !details?.userId || !details?.userEmail) {
      return res.status(400).json({ error: 'Invalid token format' });
    }

    const { userId, userEmail } = details;

    // Find user in DB with email and userId
    const user = await userRepository.createQueryBuilder('user').where('user.id = :userId AND user.email = :userEmail', { userId, userEmail }).getOne();

    if (!user) {
      return res.status(401).json({ error: 'User not found, please log in again' });
    }

    // Check if user is an admin
    if (!user.isAdmin) {
      return res.status(403).json({ error: 'User not authorized, please log in with an admin account' });
    }

    // // Attach user to the request object
    // req.user = user;

     // Proceed to the next middleware or route handler
    next();
  } catch (err: any) {
    console.error('Error in isAdmin middleware:', err);
    if (err.name === 'JsonWebTokenError') {
      return res.status(401).json({ error: 'Invalid token' });
    }
    if (err.name === 'TokenExpiredError') {
      return res.status(401).json({ error: 'Token expired, please log in again' });
    }
    return res.status(500).json({ error: 'Failed to process token' });
  }
};
