import express from 'express';
import { userController } from '../users/controller.js';

const userRouter = express.Router();

userRouter.get('/', userController.findAuthenticatedUser);
//userRouter.get('/', userController.findAll);
// userRouter.get('/:id', userController.findOneById);
// userRouter.post('/', userController.create);

export default userRouter;
