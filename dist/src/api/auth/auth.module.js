"use strict";
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var AuthModule_1;
Object.defineProperty(exports, "__esModule", { value: true });
exports.AuthModule = void 0;
const common_1 = require("@nestjs/common");
const passport_1 = require("@nestjs/passport");
const auth_service_1 = require("./auth.service");
const jwt_1 = require("@nestjs/jwt");
const database_module_1 = require("../../database/database.module");
const auth_controller_1 = require("./auth.controller");
const mail_service_1 = require("../../mail/mail.service");
const config_1 = require("@nestjs/config");
const password_reset_strategy_1 = require("./password-reset.strategy");
const jwt_refresh_statergy_1 = require("./jwt-refresh.statergy");
const jwt_user_refresh_statergy_1 = require("./jwt-user-refresh.statergy");
const permission_check_strategy_1 = require("./permission-check.strategy");
let AuthModule = AuthModule_1 = class AuthModule {
};
AuthModule = AuthModule_1 = __decorate([
    (0, common_1.Module)({
        imports: [
            passport_1.PassportModule,
            jwt_1.JwtModule.registerAsync({
                useFactory: async (configService) => ({
                    secret: configService.get('JWT_SECRET')
                }),
                inject: [config_1.ConfigService]
            }),
            database_module_1.DatabaseModule,
            config_1.ConfigModule
        ],
        controllers: [auth_controller_1.AuthController],
        providers: [
            auth_service_1.AuthService,
            mail_service_1.MailService,
            jwt_refresh_statergy_1.JwtRefreshStrategy,
            password_reset_strategy_1.JwtPasswordResetStatergy,
            jwt_user_refresh_statergy_1.JwtUserRefreshStrategy,
            permission_check_strategy_1.JwtTokenCheckStrategy
        ],
        exports: [AuthModule_1]
    })
], AuthModule);
exports.AuthModule = AuthModule;
//# sourceMappingURL=auth.module.js.map