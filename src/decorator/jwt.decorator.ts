import { createParamDecorator, ExecutionContext } from '@nestjs/common';

export const JwtBody = createParamDecorator(
  (data: unknown, ctx: ExecutionContext) => {
    const request = ctx.switchToHttp().getRequest();
    return {
      id: request.user.id,
      email: request.user.email,
      role: request.user.role,
    };
  }
);
