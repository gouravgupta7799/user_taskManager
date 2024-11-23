import * as dotenv from 'dotenv';
dotenv.config();

import express from 'express';
import { dbModuleInstance } from './db';
import cors from 'cors';
import userRoute from './routers/userRoute';
const app = express();
app.use(cors());
app.use(express.json());

const PORT = process.env.PORT || 4000;

async function startServer() {
  // connect to database
  await dbModuleInstance.register();

  // Define routes and use controllers
  app.use('/user', userRoute);
  // app.use('/tasks', taskRoute);
  // app.use('/projects', projectRoute);
  // Start your server after DB connection is successful
  app.listen(PORT, () => {
    console.log(`Server is running on port ${PORT}`);
  });
}

startServer();
