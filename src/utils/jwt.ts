import jwt from 'jsonwebtoken';
import { PayloadToken } from '../types/Token';

const secret = process.env.JWT_SECRET || 'secret';

function sign(payload: PayloadToken): string {
  const token = jwt.sign(payload, secret);
  return token;
}

function verify(token: string): PayloadToken {
  const data = jwt.verify(token, secret) as PayloadToken;
  return data;
}

export default {
  sign,
  verify,
};