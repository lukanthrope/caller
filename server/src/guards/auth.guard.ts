import { CanActivate, ExecutionContext, Injectable } from '@nestjs/common';
import * as jwt from 'jsonwebtoken';
import { EInfo } from 'src/enums';

@Injectable()
export class AuthGuard implements CanActivate {
  public canActivate(context: ExecutionContext): boolean {
    const { headers } = context.switchToHttp().getRequest();
    const token = headers.authorization.replace('Bearer ', '');
    try {
      jwt.verify(token, EInfo.SECRET);
      return true;
    } catch (e) {
      console.log(e);
      return false;
    }
  }
}
