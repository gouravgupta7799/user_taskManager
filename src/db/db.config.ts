// db.config.ts
import { User } from '../entity/user.entity';
import { Task } from '../entity/task.entity';
import { Project } from '../entity/project.entity';
import { DataSourceOptions } from 'typeorm';

const DB_HOST = process.env.DB_HOST || 'localhost';
const DB_PORT = parseInt(process.env.DB_PORT || '5432');
const DB_USERNAME = process.env.DB_USERNAME || 'default_username';
const DB_PASSWORD = process.env.DB_PASSWORD || 'default_password';
const DB_DATABASE = process.env.DB_DATABASE || 'default_database';

// Initialize AppDataSource as a DataSource instance
export const AppDataSource:DataSourceOptions = {
  type: 'postgres',
  host: DB_HOST,
  port: DB_PORT,
  username: DB_USERNAME,
  password: DB_PASSWORD,
  database: DB_DATABASE,
  entities: [User, Project, Task],
  migrations: ['build/src/migrations/**/*.js'],
  migrationsTableName: 'dataBase_table',
  synchronize: true, // Use false in production
  logging: false,
  ssl: false,
};

