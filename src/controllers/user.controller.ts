import { Request, Response } from 'express';
import mapStatusHTTP from '../utils/mapStatusHTTP';
import userService from '../services/user.service';

const getUserController = async (_req: Request, res: Response) => {
  const user = await userService.getUser();

  return res.status(mapStatusHTTP.SUCCESSFUL).json(user);
};

export default {
  getUserController,
};