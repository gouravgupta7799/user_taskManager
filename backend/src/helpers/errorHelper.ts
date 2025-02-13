import { Request, Response, NextFunction } from 'express';

class CustomError extends Error {
  statusCode: number;

  constructor(message: string, statusCode: number) {
    super(message); // Call parent constructor first
    this.statusCode = statusCode || 500; // Default to 500 if no status code is provided
    this.name = this.constructor.name;
    Error.captureStackTrace(this, this.constructor);
  }
}

// Utility function to create and throw an error with a status code and message
export const throwError = (message: string = "Something went wrong", statusCode: number = 500): never => {
  throw new CustomError(message, statusCode);
};
