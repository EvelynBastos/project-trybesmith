import bcrypt from 'bcryptjs';
import UserModel from '../database/models/user.model';
import { Login, ServiceResponse } from '../types/Login';
import { Token } from '../types/Token';
import jwt from '../utils/jwt';

const LoginVerify = async (login: Login): Promise<ServiceResponse<Token>> => {
  if (!login.username || !login.password) {
    return { status: 'BAD_REQUEST', data: { message: '"username" and "password" are required' } };
  }

  const foundLogin = await UserModel.findOne({ where: { username: login.username } });
  if (!foundLogin || !bcrypt.compareSync(login.password, foundLogin.dataValues.password)) {
    return { status: 'UNAUTHORIZED', data: { message: 'Username or password invalid' } };
  }

  const { id, username } = foundLogin.dataValues;
  const token = jwt.sign({ id, username });
  return { status: 'SUCCESSFUL', data: { token } };
};

export default {
  LoginVerify,
};