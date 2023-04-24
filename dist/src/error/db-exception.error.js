"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.DbExceptionError = void 0;
const common_1 = require("@nestjs/common");
const utils_service_1 = require("../utils/utils.service");
const constants_1 = require("../shared/constants/constants");
class DbExceptionError extends common_1.HttpException {
    constructor(props, context) {
        if (context.includes('duplicate key value violates unique constraint')) {
            props = {
                statusCode: constants_1.ERROR_CODES.BADREQUEST.statusCode,
                message: [
                    `${utils_service_1.UtilsService.convertSnakeCaseToCamelCase(props.detail.split(/[()]/, 2)[1])} should be unique`
                ]
            };
            context = 400;
        }
        else if (context.includes('violates foreign key constraint')) {
            props = {
                statusCode: constants_1.ERROR_CODES.BADREQUEST.statusCode,
                message: [
                    `${utils_service_1.UtilsService.convertSnakeCaseToCamelCase(props.detail.split(/[()]/, 2)[1])} is invalid`
                ]
            };
            context = 400;
        }
        else if (context.includes('violates check constraint')) {
            console.log(context);
            props = {
                statusCode: constants_1.ERROR_CODES.BADREQUEST.statusCode,
                message: [
                    `${utils_service_1.UtilsService.convertSnakeCaseToCamelCase(context.split(/"(.*?)"/g, 2)[1])} should be a allowed value`
                ]
            };
            context = 400;
        }
        super(props, context);
    }
}
exports.DbExceptionError = DbExceptionError;
//# sourceMappingURL=db-exception.error.js.map