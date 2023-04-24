"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.Password = void 0;
const common_1 = require("@nestjs/common");
const K = require("./../shared/constants");
exports.Password = (0, common_1.createParamDecorator)((data, ctx) => {
    const request = ctx.switchToHttp().getRequest();
    const loginbody = request.headers.authorizations;
    const decrypt = JSON.parse(Buffer.from(loginbody, 'base64').toString('ascii'));
    if ('confirmPassword' in decrypt) {
        if (decrypt.password !== decrypt.confirmPassword)
            throw new common_1.HttpException(K.ERROR_CODES.PASSWORDMISSMATCH.message, K.ERROR_CODES.PASSWORDMISSMATCH.statusCode);
    }
    if (!decrypt.password || decrypt.password === '') {
        throw new common_1.NotFoundException('No Password');
    }
    return decrypt.password;
});
//# sourceMappingURL=password.decorator.js.map