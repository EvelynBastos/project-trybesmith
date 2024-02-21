import { Router } from 'express';
import userController from '../controllers/user.controller';

const userRoute = Router();

userRoute.get('/', userController.getUserController);

export default userRoute;