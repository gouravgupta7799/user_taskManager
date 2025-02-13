import dbModuleInstance from '../db';
import { User } from '../entity/user.entity';
import { Repository } from 'typeorm';
import { throwError } from '../helpers/errorHelper';
import { Task } from '../entity/task.entity';
import { TaskPriority, TaskStatus } from '../helpers/enums/task.enums';
import { Response } from 'express';

// User service class
export class TaskService {
  private userRepository: Repository<User>;
  private taskRepository: Repository<Task>;

  constructor() {
    this.userRepository = dbModuleInstance.getRepository(User);
    this.taskRepository = dbModuleInstance.getRepository(Task);
  }

  //

  public async createUserTask(
    req: {
      taskMessage: string;
      dueDate: Date;
      priority: TaskPriority;
      status: TaskStatus;
      description: string;
      title: string;
      userId: any;
    },
    res: Response
  ): Promise<any> {
    try {
      const { taskMessage, dueDate, priority, status, description, title, userId } = req;

      const user = await this.userRepository.findOne({ where: { id: userId } });

      if (!user) {
        throwError('User not found');
      }

      const task = this.taskRepository.create({
        title,
        description,
        status,
        priority,
        dueDate,
        taskMessage,
        user: user!,
      });

      const tasks = await this.taskRepository.save(task);

      return tasks;
    } catch (error) {
      console.error(error);
      throwError(`${error}`, 500);
    }
  }

  //

  public async allUserList(req: any, res: Response): Promise<any> {
    try {
      //

      const [users, totalCount] = await this.userRepository
        .createQueryBuilder('user')
        .select([
          'user.id',
          'user.createdAt',
          'user.updatedAt',
          'user.name',
          'user.email',
          'user.status',
          'user.alias',
          'user.isDeleted',
          'user.isAdmin',
        ]) // Specify the fields you want to retrieve
        .where('user.isAdmin=:admin AND user.isDeleted=:delete', { admin: false, delete: false })
        .getManyAndCount();

      if (totalCount <= 0) {
        throwError('data for users is not found');
      }
      return { users, totalCount };
      //
    } catch (error) {
      console.error(error);
      throwError(`${error}`, 500);
    }
  }

  //

  public async userTaskList(req: any, res: Response): Promise<any> {
    try {
      //
      const { user } = req;
      const id = req?.id;

      if (!user && !id) {
        throwError('arguments required user id', 400);
      }

      if (!user) {
        throwError("User information is missing from the request", 400);
      }
      let usersTask = this.userRepository
        .createQueryBuilder('user')
        .leftJoinAndSelect('user.tasks', 'task');

      if (req?.id) {
        usersTask.andWhere('user.id=:id', { id });
      } else {
        usersTask.where('user.email=:email OR user.id=:id', { email: user.email, id: user?.id });
      }

      const [tasks, totalCount] = await usersTask.getManyAndCount();

      return { tasks, totalCount };

      //
    } catch (error) {
      console.error(error);
      throwError(`${error}`, 500);
    }
  }
}
