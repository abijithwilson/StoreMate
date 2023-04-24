import { ExtractJwt, Strategy } from 'passport-jwt';
import { PassportStrategy } from '@nestjs/passport';
import { Injectable } from '@nestjs/common';
import { ConfigService } from '@nestjs/config';

@Injectable()
export class JwtTokenCheckStrategy extends PassportStrategy(
  Strategy,
  'permission-check-strategy'
) {
  constructor(private readonly configService: ConfigService) {
    super({
      jwtFromRequest: ExtractJwt.fromAuthHeaderAsBearerToken(),
      ignoreExpiration: false,
      secretOrKey: configService.get<string>('JWT_SECRET')
    });
  }
  async validate(payload: any) {
    const user = {
      email: payload.username,
      id: payload.id,
      role: payload.role
    };

    return user;
  }
}
