import { DataSource } from 'typeorm';
import { AppDataSource } from './db.config';

class dbModule {
  public static dbModuleInstance: DataSource = new DataSource(AppDataSource);
  public async register(): Promise<void> {
    await dbModule.dbModuleInstance.initialize();
    console.log('Database connection established');
  }
}
export default dbModule.dbModuleInstance;
export const dbModuleInstance = new dbModule();
