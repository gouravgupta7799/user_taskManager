import { Request, Response } from 'express';

// Initialize user service instance
import { UserService } from '../services/user.service';
import { generateToken, userAccess } from '../helpers/jwt.helper';

const userServiceInstance = new UserService();

export const userControllers = {
  // User sign-up functionality
  signUp: async (req: Request, res: Response): Promise<any> => {
    try {
      // Assuming signupUser expects some data from req.body
      const signUser = await userServiceInstance.signupUser(req.body, res);

      console.log('User signed up successfully:', signUser);
      res.status(200).json({ message: 'User signed up successfully', user: signUser });
    } catch (error: any) {
      // Log the error with stack trace for debugging
      console.error('Error during user sign-up:', error);

      // Send a generic error message, without exposing internal details
      res.status(error.statusCode || 500).json({
        error: error.message,
        message: 'An error occurred during user sign-up.',
      });
    }
  },

  // User login functionality
  login: async (req: Request, res: Response): Promise<any> => {
    try {
      // Assuming signupUser expects some data from req.body
      const user = await userServiceInstance.loginUser(req.body, res);
      const loginUser = {
        email: user?.email,
        name: user?.name,
        status: user?.status,
        token: await generateToken(user?.id, user?.email),
      };
      console.log('User signed up successfully:', loginUser);
      res.status(200).json({ message: 'User login up successfully', user: loginUser });
    } catch (error: any) {
      // Log the error with stack trace for debugging
      console.error('Error during user login:', error);

      // Send a generic error message, without exposing internal details
      res.status(error.statusCode || 500).json({
        error: error.message,
        message: 'An error occurred during user login.',
      });
    }
  },
};
