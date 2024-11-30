import express, { Router } from 'express';
const router: Router = express.Router();

import { taskControllers } from '../Controllers/task.controller';
import { userAccess } from '../helpers/jwt.helper';
import { isAdmin } from '../helpers/auth.helper';

router.post('/task', isAdmin, taskControllers.createTask);
router.get('/users', isAdmin, taskControllers.userList);

export default router;
