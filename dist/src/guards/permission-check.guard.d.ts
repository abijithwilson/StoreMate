import { ExecutionContext } from '@nestjs/common';
import { Reflector } from '@nestjs/core';
declare const PermissionCheckGuard_base: import("@nestjs/passport").Type<import("@nestjs/passport").IAuthGuard>;
export declare class PermissionCheckGuard extends PermissionCheckGuard_base {
    private reflector;
    constructor(reflector: Reflector);
    canActivate(context: ExecutionContext): Promise<boolean>;
}
export {};
