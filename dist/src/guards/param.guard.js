"use strict";
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var ParamGuard_1;
Object.defineProperty(exports, "__esModule", { value: true });
exports.ParamGuard = void 0;
const common_1 = require("@nestjs/common");
const Joi = require("joi");
const rxjs_1 = require("rxjs");
let ParamGuard = ParamGuard_1 = class ParamGuard {
    canActivate(context) {
        const logger = new common_1.Logger(ParamGuard_1.name);
        const req = context.switchToHttp().getRequest();
        const URLParam = Joi.object().unknown(true);
        const reqParams = URLParam.validate(req.params, { abortEarly: false });
        if (reqParams.error) {
            logger.error(reqParams.error.message);
            return (0, rxjs_1.throwError)(() => new common_1.NotFoundException());
        }
        return true;
    }
};
ParamGuard = ParamGuard_1 = __decorate([
    (0, common_1.Injectable)()
], ParamGuard);
exports.ParamGuard = ParamGuard;
//# sourceMappingURL=param.guard.js.map