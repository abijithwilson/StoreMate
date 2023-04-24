import { SetMetadata } from '@nestjs/common';
import { UserRoles } from 'src/api/dto/roles.dto';

export const Roles = (...userRoles: UserRoles[]) =>
  SetMetadata('roles', userRoles);
