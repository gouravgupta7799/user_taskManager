import { sign, verify } from 'jsonwebtoken';
import { throwError } from './errorHelper';
import { NextFunction, Request, Response } from 'express';
import { User } from '../entity/user.entity';
import dbModuleInstance from '../db';
import { AuthenticatedRequest } from './interface';

const userRepository = dbModuleInstance.getRepository(User);


export async function generateToken(
  id: number | undefined,
  email: string | undefined
): Promise<string | undefined> {
  const secretKey = process.env.JWTPASSCODE as string;

  if (!secretKey) {
    throwError('JWT secret key (JWTPASSCODE) is not defined in the environment variables.', 400);
  }

  try {
    const jwtToken = sign(
      { userId: id, userEmail: email },
      secretKey,
      { expiresIn: '24h' } // Optional: Set token expiration time
    );

    return jwtToken;
  } catch (error) {
    throwError('Failed to generate JWT', 400);
  }
}

export const userAccess = async (req: AuthenticatedRequest, res: any, next: NextFunction) => {
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
    if (!details || !details.userId || details.userEmail) {
      return res.status(400).json({ error: 'Invalid token format' });
    }

    const { userId, userEmail } = details;

    // Find user in DB with email and userId
    const user = await userRepository
      .createQueryBuilder('user')
      .where('user.id=:userId AND user.email=:userEmail', { userId, userEmail })
      .getOne();

    if (!user) {
      throw new Error('User not found, please log in again');
    }
    // Attach user to the request object
    req.user = user;

    // Proceed to the next middleware or route handler
    next();
  } catch (err: any) {
    console.error('Error in userAccess middleware:', err);
    if (err.name === 'JsonWebTokenError') {
      return res.status(401).json({ error: 'Invalid token' });
    }
    if (err.name === 'TokenExpiredError') {
      return res.status(401).json({ error: 'Token expired, please log in again' });
    }
    return res.status(500).json({ error: 'Failed to process token' });
  }
};
