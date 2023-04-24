import { Injectable } from '@nestjs/common';
import { AuthGuard } from '@nestjs/passport';

@Injectable()
export default class JwtUserRefreshGuard extends AuthGuard(
  'jwt-user-refresh-token'
) {}
