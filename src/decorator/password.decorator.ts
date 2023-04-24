import {
  createParamDecorator,
  ExecutionContext,
  HttpException,
  NotFoundException
} from '@nestjs/common';
import { PasswordDto } from 'src/api/dto/auth.dto';
import * as K from './../shared/constants';

export const Password = createParamDecorator(
  (data: unknown, ctx: ExecutionContext) => {
    const request = ctx.switchToHttp().getRequest();
    const loginbody = request.headers.authorizations;
    const decrypt: PasswordDto = JSON.parse(
      Buffer.from(loginbody, 'base64').toString('ascii')
    );

    if ('confirmPassword' in decrypt) {
      if (decrypt.password !== decrypt.confirmPassword)
        throw new HttpException(
          K.ERROR_CODES.PASSWORDMISSMATCH.message,
          K.ERROR_CODES.PASSWORDMISSMATCH.statusCode
        );
    }
    if (!decrypt.password || decrypt.password === '') {
      throw new NotFoundException('No Password');
    }
    return decrypt.password;
  }
);
