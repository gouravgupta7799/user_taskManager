import dbModuleInstance from '../db';
import { User } from '../entity/user.entity';
import bcrypt from 'bcrypt';
import { throwError } from './errorHelper';

let userRepository = dbModuleInstance.getRepository(User);

export const generateAlias = async (): Promise<string | undefined> => {
  try {
    const characters = 'abcdefghijklmnopqrstuvwxyzABCDEFGHIJKLMNOPQRSTUVWXYZ0123456789'; // Allowed characters

    // Helper function to generate a random 3-character string
    const generateRandomAlias = (): string => {
      let alias = '';
      for (let i = 0; i < 3; i++) {
        alias += characters[Math.floor(Math.random() * characters.length)];
      }
      return alias;
    };

    let alias = generateRandomAlias();

    // Loop to ensure uniqueness
    while (true) {
      const checkAlias = await userRepository
        .createQueryBuilder('user')
        .where('user.alias = :alias', { alias })
        .getOne();

      if (!checkAlias) {
        return alias; // Alias is unique, return it
      }

      // Generate a new alias if the current one exists
      alias = generateRandomAlias();
    }
  } catch (error) {
    throwError('error in genereting uniqe alias',400);
  }
};

export const generateHashPassword = async (password: string): Promise<string | undefined> => {
  try {
    const saltRounds = 5;

    // Using bcrypt's promise-based approach to hash the password
    const hashedPassword = await bcrypt.hash(password, saltRounds);
    console.log(hashedPassword);
    return hashedPassword; // Return the hashed password
  } catch (error) {
    // Throwing a generic error with a message and status code
    throwError('Error hashing password', 400);
  }
};

export const compareHash = async (userPassword: string, password: string): Promise<Boolean> => {
  return bcrypt.compare(userPassword, password);
};
