import { UserService } from './../services/user.service';
import jwt, { JwtPayload } from 'jsonwebtoken';
import authConfig from '../config/auth.json';
import { User } from '../models/user';

const userService = new UserService();

function formatToken(token: string): string {
  let tokenArray = token.split(' ');
  return tokenArray.length > 1 ? tokenArray[1] : token;
}

export async function validToken(token: string): Promise<boolean> {
  try {
    await jwt.verify(formatToken(token), authConfig.secret);
    return true;
  } catch (err) {
    return false;
  }
}

export async function getUserByToken(token: string): Promise<User | null> {

    const data = (await jwt.verify(formatToken(token), authConfig.secret)) as any;
    const user = await userService.findById(data?.id);
    return user;
}
