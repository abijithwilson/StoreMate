import { ExecutionContext, Injectable } from '@nestjs/common';
import { Reflector } from '@nestjs/core';
import { AuthGuard } from '@nestjs/passport';

import { UserRoles } from 'src/api/dto/roles.dto';

@Injectable()
export class PermissionCheckGuard extends AuthGuard(
  'permission-check-strategy'
) {
  constructor(private reflector: Reflector) {
    super();
  }

  async canActivate(context: ExecutionContext) {
    const isPublic = this.reflector.get<boolean>(
      'isPublic',
      context.getHandler()
    );

    if (isPublic) return true;

    const parentCanActivate = (await super.canActivate(context)) as boolean;

    if (!parentCanActivate) return false;

    const requiredRoles = this.reflector.getAllAndOverride<UserRoles[]>(
      'roles',
      [context.getHandler(), context.getClass()]
    );

    const user = context.switchToHttp().getRequest().user;

    return requiredRoles.some((role) => user.role?.includes(role));
  }
}
