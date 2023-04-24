import { ExtractJwt, Strategy } from 'passport-jwt';
import { PassportStrategy } from '@nestjs/passport';
import { Injectable } from '@nestjs/common';
import { ConfigService } from '@nestjs/config';

@Injectable()
export class JwtPasswordResetStatergy extends PassportStrategy(
  Strategy,
  'password-reset'
) {
  constructor(private configService: ConfigService) {
    super({
      jwtFromRequest: ExtractJwt.fromAuthHeaderAsBearerToken(),
      ignoreExpiration: false,
      secretOrKey: configService.get<string>('JWT_FORGOT_PASSWORD_SECRET')
    });
  }
  async validate(payload: any) {
    const user = { email: payload.username, id: payload.userId };
    return user;
  }
}
