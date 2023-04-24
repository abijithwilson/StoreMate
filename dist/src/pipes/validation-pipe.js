"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.CustomValidationPipe = void 0;
const constants_1 = require("../shared/constants");
const common_1 = require("@nestjs/common");
class CustomValidationPipe extends common_1.ValidationPipe {
    constructor(options, isWeb = false) {
        super();
        this.options = options;
        this._isWeb = isWeb;
    }
    async transform(value, metadata) {
        this.validatorOptions = Object.assign(Object.assign(Object.assign({}, this.validatorOptions), { skipMissingProperties: false, whitelist: true, forbidNonWhitelisted: false }), this.options);
        try {
            const result = await super.transform(value, metadata);
            return result;
        }
        catch (error) {
            let errorResponse = {};
            if (this._isWeb) {
                errorResponse = {
                    code: -1,
                    message: error.response.message.filter((x) => x)
                };
            }
            else {
                errorResponse = {
                    statusCode: constants_1.ERROR_CODES.BADREQUEST.statusCode,
                    message: error.response.message
                };
            }
            throw new common_1.HttpException(errorResponse, common_1.HttpStatus.BAD_REQUEST);
        }
    }
}
exports.CustomValidationPipe = CustomValidationPipe;
//# sourceMappingURL=validation-pipe.js.map