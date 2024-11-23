import { Request, Response, NextFunction } from 'express';

class CustomError extends Error {
  statusCode: number;

  constructor(message: string, statusCode: number) {
    super(message);
    this.statusCode = statusCode;
    this.name = this.constructor.name;
    Error.captureStackTrace(this, this.constructor);
  }
}

// Utility function to create and throw an error with a status code and message
export const throwError = (message: string, statusCode: number | 400): never => {
  throw new CustomError(message, statusCode);
};
