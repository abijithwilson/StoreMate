"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.JwtBody = void 0;
const common_1 = require("@nestjs/common");
exports.JwtBody = (0, common_1.createParamDecorator)((data, ctx) => {
    const request = ctx.switchToHttp().getRequest();
    return {
        id: request.user.id,
        email: request.user.email,
        role: request.user.role,
    };
});
//# sourceMappingURL=jwt.decorator.js.map