import dbModuleInstance from '../db';
import { StatusEnums } from '../helpers/enums/user.enums';
import { User } from '../entity/user.entity';
import { Repository } from 'typeorm';
import { throwError } from '../helpers/errorHelper';
import { compareHash, generateAlias, generateHashPassword } from '../helpers/otherHelper';

// User service class
export class UserService {
  private userRepository: Repository<User>;

  constructor() {
    this.userRepository = dbModuleInstance.getRepository(User);
  }

  // Signup functionality
  public async signupUser(
    req: { userEmail: string; password: string; name: string },
    res: any
  ): Promise<User | undefined> {
    try {
      const { userEmail, password, name } = req;

      // Check if userEmail, password, and name are provided
      if (!userEmail || !password || !name) {
        throwError('Email, password, and name are required', 400);
      }

      const emailRegex = /^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$/;
      const isValidEmail = emailRegex.test(userEmail);

      if (!isValidEmail) {
        throwError('Invalid Email', 400);
      }
      // Checking if user already exists
      const userExisted = await this.userRepository
        .createQueryBuilder('user')
        .where('user.email = :email', { email: userEmail })
        .getOne();

      // If user already exists, throw an error
      if (userExisted) {
        throwError(`User with this email already exists: ${userEmail}`, 400);
      }
      // generete uniqe alias
      const uniqeAlias = await generateAlias();

      // generete hash password
      const hashPassword = await generateHashPassword(password);

      const CreateUser = this.userRepository.create({
        email: userEmail,
        password: hashPassword,
        name: name,
        alias: uniqeAlias,
      });

      const user = await this.userRepository.save(CreateUser);

      return user;
    } catch (error) {
      console.error(error);
      throwError(`${error}`, 500);
    }
  }

  public async loginUser(
    req: { userEmail: string; password: string },
    res: any
  ): Promise<User | undefined> {
    try {
      const { userEmail, password } = req;

      // Validate inputs
      if (!userEmail || !password) {
        throwError('Email and password are required', 400);
      }

      // Check if user exists
      const userExisted = await this.userRepository.findOne({
        where: { email: userEmail },
      });

      if (!userExisted) {
        throw new Error(`User with this email does not exist: ${userEmail}`);
      }

      // Check if user is already active
      if (userExisted.status === 'ACTIVE') {
        return userExisted;
      }

      // Validate password
      const isPasswordValid = await compareHash(password, userExisted.password);
      if (!isPasswordValid) {
        throwError('Password is incorrect', 403);
      }

      // Update user status to ACTIVE
      const updateResult = await this.userRepository
        .createQueryBuilder('user')
        .update()
        .set({ status: StatusEnums.ACTIVE })
        .where('email = :email', { email: userEmail })
        .returning('*') // Works for databases like PostgreSQL
        .execute();

      if (updateResult.affected === 1) {
        // Return the updated user
        return updateResult.raw[0];
      } else {
        throwError('Failed to update user status', 400);
      }
    } catch (error) {
      console.error('Error during user login:', error);
      throwError(`${error}`, 500);
    }
  }
}
