import express, { Router } from 'express';
const router:Router = express.Router();
import {userControllers} from '../Controllers/userControllers'

router.post('/signup', userControllers.signUp);
router.post('/login', userControllers.login);
// router.delete('/', userControllers.postDeleteData);

export default router;
