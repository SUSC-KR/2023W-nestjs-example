import { CanActivate, ExecutionContext, Injectable } from '@nestjs/common';
import { Request } from 'express';
import * as jwt from 'jsonwebtoken';
import { IUser } from './IUser';

@Injectable()
export class AuthGuard implements CanActivate {
  canActivate(context: ExecutionContext): boolean {
    const req: Request = context.switchToHttp().getRequest();

    const authorization = req.headers['authorization'];

    if (authorization === null || authorization === undefined) {
      return false;
    }

    const token = authorization.split(' ')[1];

    if (token === null || token === undefined) {
      return false;
    }

    try {
      const payload: IUser = jwt.verify(token, process.env.JWT_SECRET) as IUser;
      req['user'] = payload;
    } catch (e) {
      return false;
    }

    return true;
  }
}
