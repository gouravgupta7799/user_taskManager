import express, { Router } from 'express';
const router: Router = express.Router();
import { userControllers } from '../Controllers/user.controllers';
import { taskControllers } from '../Controllers/task.controller';
import { userAccess } from '../helpers/jwt.helper';

router.post('/signup', userControllers.signUp);
router.post('/login', userControllers.login);
router.get('/task', userAccess, taskControllers.userTask);
// router.delete('/', userControllers.postDeleteData);

export default router;
