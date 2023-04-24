import { createParamDecorator, ExecutionContext } from '@nestjs/common';

export const ResetBody = createParamDecorator(
  (data: unknown, ctx: ExecutionContext) => {
    const request = ctx.switchToHttp().getRequest();
    return { email: request.user.email, id: request.user.id };
  }
);
