import { Request, Response } from 'express';

// Initialize user service instance
import { UserService } from '../services/user.service';
import { generateToken, userAccess } from '../helpers/jwt.helper';
import { TaskService } from '../services/task.service';

const userServiceInstance = new UserService();
const taskServiceInstance = new TaskService();

export const taskControllers = {
  // create task function

  createTask: async (req: Request, res: Response): Promise<any> => {
    try {
      //

      const task = await taskServiceInstance.createUserTask(req.body, res);

      res.status(200).json({ task });
    } catch (error: any) {
      // Log the error with stack trace for debugging

      console.error('Error during creating task:', error);

      // Send a generic error message, without exposing internal details

      res.status(error.statusCode || 500).json({
        error: error.message,
        message: 'An error occurred during Creating task.',
      });
    }
  },

  // get user task

  userTask: async (req: any, res: any): Promise<any> => {
    try {
      const { tasks, totalCount } = await taskServiceInstance.userTaskList(req.body, res);

      res.status(200).json({ totalCount, tasks });
      //
    } catch (error: any) {
      // Log the error with stack trace for debugging

      console.error('Error during fetch user task:', error);

      // Send a generic error message, without exposing internal details

      res.status(error.statusCode || 500).json({
        error: error.message,
        message: 'An error occurred during fetch user task.',
      });
    }
  },

  // get all users

  userList: async (req: Request, res: Response): Promise<any> => {
    try {
      //
      const { users, totalCount } = await taskServiceInstance.allUserList(req.body, res);

      res.status(200).json({ totalCount, users });
    } catch (error: any) {
      // Log the error with stack trace for debugging

      console.error('Error during fetch users :', error);

      // Send a generic error message, without exposing internal details

      res.status(error.statusCode || 500).json({
        error: error.message,
        message: 'An error occurred during fetch all users.',
      });
    }
  },
};
