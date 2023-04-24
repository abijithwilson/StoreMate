"use strict";
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __metadata = (this && this.__metadata) || function (k, v) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
};
var __param = (this && this.__param) || function (paramIndex, decorator) {
    return function (target, key) { decorator(target, key, paramIndex); }
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.AuthService = void 0;
const common_1 = require("@nestjs/common");
const jwt_1 = require("@nestjs/jwt");
const auth_dto_1 = require("../dto/auth.dto");
const rxjs_1 = require("rxjs");
const database_service_1 = require("../../database/database.service");
const mail_service_1 = require("../../mail/mail.service");
const crypto_1 = require("crypto");
const config_1 = require("@nestjs/config");
const pbkdf2 = require("pbkdf2");
const utils_service_1 = require("../../utils/utils.service");
const auth_query_1 = require("../db-queries/auth.query");
const K = require("../../shared/constants");
const configuration_1 = require("../../config/configuration");
let AuthService = class AuthService {
    constructor(jwtService, configService, config, databaseService, mailService) {
        this.jwtService = jwtService;
        this.configService = configService;
        this.config = config;
        this.databaseService = databaseService;
        this.mailService = mailService;
    }
    async adminLogin(pass, body) {
        const { email } = body;
        const admin = await (0, rxjs_1.firstValueFrom)(this.databaseService.rawQuery(auth_query_1.loginAdminQuery, [email], auth_dto_1.LoginAdminDto));
        if (admin.length === 0) {
            throw new common_1.NotFoundException();
        }
        const { salt, password, roleName, adminId } = admin[0];
        const iteration = this.configService.get('ITERATION');
        const passKeyLen = this.configService.get('PASSWORD_KEY_LENGTH');
        const derivedKey = pbkdf2
            .pbkdf2Sync(pass, salt, iteration, passKeyLen)
            .toString('base64');
        if (password != derivedKey) {
            throw new common_1.UnauthorizedException();
        }
        const payload = { username: email, role: roleName, id: `${adminId}` };
        return {
            bearer_token: this.jwtService.sign(payload, {
                expiresIn: this.configService.get('JWT_ACCESS_EXPIRE_IN')
            }),
            refresh_token: this.jwtService.sign(payload, {
                expiresIn: this.configService.get('JWT_REFRESH_EXPIRE_IN'),
                secret: this.configService.get('JWT_REFRESH_SECRET')
            })
        };
    }
    refreshToken(user) {
        return {
            bearer_token: this.jwtService.sign(user, {
                expiresIn: this.configService.get('JWT_ACCESS_EXPIRE_IN')
            })
        };
    }
    async validateUser(body) {
        const { email } = body;
        const query = utils_service_1.UtilsService.generateSelectQuery({
            tableName: K.TABLE_NAMES.USER,
            columnData: K.SELECT_LOGIN_COLUMN_DATA,
            whereCondition: `${K.EMAIL}='${email}'`
        });
        const user = await (0, rxjs_1.firstValueFrom)(this.databaseService.rawQuery(query, [], auth_dto_1.LoginUserDto));
        if (user.length === 0) {
            throw new common_1.NotFoundException();
        }
        const { salt, password, id } = user[0];
        const iteration = this.configService.get('ITERATION');
        const passKeyLen = this.configService.get('PASSWORD_KEY_LENGTH');
        const derivedKey = pbkdf2
            .pbkdf2Sync(body.password, salt, iteration, passKeyLen)
            .toString('base64');
        if (password !== derivedKey) {
            throw new common_1.UnauthorizedException();
        }
        const payload = { username: email, id: `${id}`, role: K.USER };
        return {
            bearer_token: this.jwtService.sign(payload, {
                expiresIn: this.configService.get('JWT_ACCESS_EXPIRE_IN')
            }),
            refresh_token: this.jwtService.sign(payload, {
                expiresIn: this.configService.get('JWT_REFRESH_EXPIRE_IN'),
                secret: this.configService.get('JWT_REFRESH_SECRET')
            })
        };
    }
    userRefreshToken(user) {
        return {
            bearer_token: this.jwtService.sign(user, {
                expiresIn: this.configService.get('JWT_ACCESS_EXPIRE_IN')
            })
        };
    }
    async adminForgotPassword(body) {
        const { email } = body;
        const query = utils_service_1.UtilsService.generateSelectQuery({
            tableName: K.TABLE_NAMES.ADMIN,
            columnData: ['first_name', 'admin_id'],
            whereCondition: `email='${email}'`
        });
        const admin = await (0, rxjs_1.firstValueFrom)(this.databaseService.rawQuery(query, [], auth_dto_1.AdminDetailDto));
        if (admin.length === 0)
            throw new common_1.NotFoundException();
        const { firstName, adminId } = admin[0];
        const payload = { username: email, userId: adminId };
        const jwtToken = this.jwtService.sign(payload, {
            expiresIn: this.configService.get('JWT_FORGOT_PASSWORD_EXPIRE_IN'),
            secret: this.configService.get('JWT_FORGOT_PASSWORD_SECRET')
        });
        const url = this.config.mail.redirect_link +
            '?type=' +
            K.USERTYPE.ADMIN +
            '&token=' +
            jwtToken;
        return await this.mailService.sendLinkToEmail(email, firstName, url);
    }
    adminResetPassword(adminTypeBody, password, resetBody) {
        const iteration = this.configService.get('ITERATION');
        const passKeyLen = this.configService.get('PASSWORD_KEY_LENGTH');
        const salt = (0, crypto_1.randomBytes)(128).toString('base64');
        const derivedKey = pbkdf2
            .pbkdf2Sync(password, salt, iteration, passKeyLen)
            .toString('base64');
        const body = {};
        body['password'] = derivedKey;
        body['salt'] = salt;
        body['updatedBy'] = resetBody.id;
        const { adminType } = adminTypeBody;
        if (adminType === 3) {
            body['isActive'] = true;
        }
        const query = utils_service_1.UtilsService.generateUpdateQuery({
            tableName: K.TABLE_NAMES.ADMIN,
            primaryKey: K.PRIMARY_KEYS.ADMIN,
            columnData: body,
            keysToIgnore: ['confirmPassword'],
            whereCondition: `email='${resetBody.email}'`
        });
        return this.databaseService.rawQuery(query.query, query.data, auth_dto_1.IdDto).pipe((0, rxjs_1.map)((result) => {
            if (result.length == 0)
                throw new common_1.NotFoundException();
            return { message: 'Password updated successfully' };
        }));
    }
    async userForgotPassword(body) {
        const { email } = body;
        const query = utils_service_1.UtilsService.generateSelectQuery({
            tableName: K.TABLE_NAMES.USER,
            columnData: ['first_name', 'id'],
            whereCondition: `${K.EMAIL}='${email}'`
        });
        const user = await (0, rxjs_1.firstValueFrom)(this.databaseService.rawQuery(query, [], auth_dto_1.UserDetailDto));
        if (user.length === 0)
            throw new common_1.NotFoundException();
        const { firstName, userId } = user[0];
        const payload = { username: email, userId: userId };
        const jwtToken = this.jwtService.sign(payload, {
            expiresIn: this.config.jwt.forgot_password_expire_in,
            secret: this.config.jwt.forgot_password_secret
        });
        const url = this.config.mail.redirect_link +
            '?type=' +
            K.USERTYPE.USER +
            '&token=' +
            jwtToken;
        return await this.mailService.sendLinkToEmail(email, firstName, url);
    }
    userResetPassword(password, resetBody) {
        const iteration = parseInt(this.config.password.iteration);
        const passKeyLen = parseInt(this.config.password.password_key_len);
        const salt = (0, crypto_1.randomBytes)(128).toString('base64');
        const derivedKey = pbkdf2
            .pbkdf2Sync(password, salt, iteration, passKeyLen)
            .toString('base64');
        const body = {};
        body['password'] = derivedKey;
        body['salt'] = salt;
        body['updatedBy'] = resetBody.id;
        const query = utils_service_1.UtilsService.generateUpdateQuery({
            tableName: K.TABLE_NAMES.USER,
            primaryKey: K.PRIMARY_KEYS.USER,
            columnData: body,
            keysToIgnore: ['confirmPassword'],
            whereCondition: `email='${resetBody.email}'`
        });
        return this.databaseService.rawQuery(query.query, query.data, auth_dto_1.IdDto).pipe((0, rxjs_1.map)((result) => {
            if (result.length == 0)
                throw new common_1.NotFoundException();
            return { message: 'Password updated successfully' };
        }));
    }
};
AuthService = __decorate([
    (0, common_1.Injectable)(),
    __param(2, (0, common_1.Inject)(configuration_1.default.KEY)),
    __metadata("design:paramtypes", [jwt_1.JwtService,
        config_1.ConfigService, void 0, database_service_1.DatabaseService,
        mail_service_1.MailService])
], AuthService);
exports.AuthService = AuthService;
//# sourceMappingURL=auth.service.js.map