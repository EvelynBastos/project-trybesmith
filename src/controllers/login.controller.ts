import { Request, Response } from 'express';
import loginService from '../services/login.service';
import mapStatusHTTP from '../utils/mapStatusHTTP';

const login = async (req: Request, res: Response) => {
  const { username, password } = req.body;

  const response = await loginService.LoginVerify({ username, password });
  const { status, data } = response;

  if (status !== 'SUCCESSFUL') {
    return res.status(mapStatusHTTP[status]).json(data);
  }
  res.status(mapStatusHTTP.SUCCESSFUL).json(data);
};

export default { 
  login,
};