import { NextFunction, Request, Response } from 'express';

//
export interface AuthenticatedRequest extends Request {
  user?: any; // Define the type of user object if possible
}
