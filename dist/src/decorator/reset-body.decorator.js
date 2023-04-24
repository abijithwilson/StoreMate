"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.ResetBody = void 0;
const common_1 = require("@nestjs/common");
exports.ResetBody = (0, common_1.createParamDecorator)((data, ctx) => {
    const request = ctx.switchToHttp().getRequest();
    return { email: request.user.email, id: request.user.id };
});
//# sourceMappingURL=reset-body.decorator.js.map