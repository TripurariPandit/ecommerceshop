import express from 'express';
import UserController from './user.controller.js';
import jwtAuth from '../../middlewares/jwt.middleware.js';

const router = express.Router();
const userConteroller = new UserController();

router.post('/signup', userConteroller.signUp);
router.post('/signin', userConteroller.signIn);
router.post('/reset', jwtAuth, userConteroller.reSetPassword);
router.post('/forget-password', userConteroller.forgetPassword);
router.post('/reset-password', userConteroller.reSetPasswordWithToken);

export default router;  