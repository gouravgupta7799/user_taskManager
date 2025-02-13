import * as dotenv from 'dotenv';
dotenv.config();

import express from 'express';
import { dbModuleInstance } from './db';
import cors from 'cors';
import userRoute from './routers/user.route';
import taskRoute from './routers/task.router';

const app = express();
app.use(cors());
app.use(express.json());

const PORT = process.env.PORT || 4001;

async function startServer() {
  try {
    // connect to database
    await dbModuleInstance.register();

    // Define routes and use controllers
    app.use('/user', userRoute);
    app.use('/tasks', taskRoute);
    // app.use('/projects', projectRoute);
    // Start your server after DB connection is successful
    app.listen(PORT, () => {
      console.log(`Server is running on port ${PORT}`);
    });
  } catch (error) {
    console.error("❌ Database connection failed:", error);
  }
}

startServer();
