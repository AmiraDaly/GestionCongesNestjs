import { CanActivate, ExecutionContext, Injectable } from '@nestjs/common';
import { Observable } from 'rxjs';
import { Reflector } from '@nestjs/core';
import {JwtauthStrategy} from "../strategy/jwtauth.strategy";

@Injectable()
export class RoleGuard implements CanActivate  {
  constructor(private reflector: Reflector) {}
  canActivate(
    context: ExecutionContext,
  ): boolean | Promise<boolean> | Observable<boolean> {
    const allContext = [context.getClass(), context.getHandler()];
    const roles = this.reflector.getAllAndMerge('roles', allContext);
    if (roles.length == 0) {
      return true;
    }

    const user = context.switchToHttp().getRequest().user;
    return roles.some((role) => role == user.role);
  }
}
