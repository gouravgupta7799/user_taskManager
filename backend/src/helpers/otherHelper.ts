import dbModuleInstance from '../db';
import { User } from '../entity/user.entity';
import bcrypt from 'bcrypt';
import { throwError } from './errorHelper';

let userRepository = dbModuleInstance.getRepository(User);

// Generate unique alias
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
    let attempts = 0;
    const maxAttempts = 10; // Prevent infinite loop

    // Loop to ensure uniqueness
    while (attempts < maxAttempts) {
      const checkAlias = await userRepository
        .createQueryBuilder('user')
        .where('user.alias = :alias', { alias })
        .getOne();

      if (!checkAlias) {
        return alias; // Alias is unique, return it
      }

      // Generate a new alias if the current one exists
      alias = generateRandomAlias();
      attempts++;
    }
    throwError('Failed to generate a unique alias after multiple attempts', 500);
  } catch (error) {
    console.error("Error in generateAlias:", error);
    throwError('Error in generating unique alias', 400);
  }
};

// Hash password
export const generateHashPassword = async (password: string): Promise<string | undefined> => {
  try {
    const saltRounds = 5;
    
    // Using bcrypt's promise-based approach to hash the password
    const hashedPassword = await bcrypt.hash(password, saltRounds);
    console.log(hashedPassword);
    return hashedPassword; // Return the hashed password
  } catch (error) {
    // Throwing a generic error with a message and status code
    console.error("Error hashing password:", error);
    throwError('Error hashing password', 500);
  }
};

// Compare hashed password
export const compareHash = async (plainPassword: string, hashedPassword: string): Promise<boolean> => {
  return await bcrypt.compare(plainPassword, hashedPassword);
};
