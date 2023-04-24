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
exports.AuthController = void 0;
const auth_dto_1 = require("./../dto/auth.dto");
const common_1 = require("@nestjs/common");
const swagger_1 = require("@nestjs/swagger");
const rxjs_1 = require("rxjs");
const password_decorator_1 = require("../../decorator/password.decorator");
const reset_body_decorator_1 = require("../../decorator/reset-body.decorator");
const jwt_refresh_guard_1 = require("../../guards/jwt-refresh.guard");
const jwt_user_refresh_guard_1 = require("../../guards/jwt-user-refresh.guard");
const password_reset_quard_1 = require("../../guards/password-reset.quard");
const validation_pipe_1 = require("../../pipes/validation-pipe");
const K = require("../../shared/constants");
const auth_dto_2 = require("../dto/auth.dto");
const auth_service_1 = require("./auth.service");
const public_guard_1 = require("../../guards/public.guard");
let AuthController = class AuthController {
    constructor(authService) {
        this.authService = authService;
    }
    login(body) {
        return this.authService.validateUser(body);
    }
    adminLogin(password, body) {
        return this.authService.adminLogin(password, body);
    }
    refreshToken(req) {
        return this.authService.refreshToken(req.user);
    }
    adminForgotPassword(body) {
        return this.authService.adminForgotPassword(body);
    }
    adminResetPassword(adminTypeBody, password, resetBody) {
        return this.authService.adminResetPassword(adminTypeBody, password, resetBody);
    }
    userForgotPassword(body) {
        return this.authService.userForgotPassword(body);
    }
    userResetPassword(password, body) {
        return this.authService.userResetPassword(password, body);
    }
    userRefreshToken(req) {
        return this.authService.refreshToken(req.user);
    }
};
__decorate([
    (0, common_1.Post)('/user/login'),
    (0, common_1.UsePipes)(new validation_pipe_1.CustomValidationPipe({ transform: true })),
    (0, common_1.HttpCode)(200),
    (0, common_1.HttpCode)(200),
    (0, swagger_1.ApiBearerAuth)(),
    (0, swagger_1.ApiBody)({ type: auth_dto_2.LoginUserBodyDto }),
    (0, swagger_1.ApiOperation)({ description: 'User login' }),
    (0, swagger_1.ApiOkResponse)({
        description: K.ERROR_CODES.Login.message,
        type: auth_dto_2.LoginResponseDto
    }),
    (0, swagger_1.ApiUnauthorizedResponse)({ description: K.ERROR_CODES.UNAUTHORIZED.message }),
    (0, swagger_1.ApiInternalServerErrorResponse)({
        description: K.ERROR_CODES.DEFAULT.message
    }),
    (0, public_guard_1.Public)(),
    __param(0, (0, common_1.Body)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [auth_dto_2.LoginUserBodyDto]),
    __metadata("design:returntype", Promise)
], AuthController.prototype, "login", null);
__decorate([
    (0, common_1.Post)('/admin/login'),
    (0, common_1.UsePipes)(new validation_pipe_1.CustomValidationPipe({ transform: true })),
    (0, common_1.HttpCode)(200),
    (0, swagger_1.ApiBody)({ type: auth_dto_2.LoginDto }),
    (0, swagger_1.ApiOperation)({ description: 'Login for admin' }),
    (0, swagger_1.ApiHeader)({
        name: 'authorizations',
        description: 'Contain Password for login'
    }),
    (0, swagger_1.ApiOkResponse)({
        description: K.ERROR_CODES.Login.message,
        type: auth_dto_2.LoginResponseDto
    }),
    (0, swagger_1.ApiBadRequestResponse)({ description: 'Invalid email/password' }),
    (0, swagger_1.ApiUnauthorizedResponse)({ description: K.ERROR_CODES.UNAUTHORISED.message }),
    (0, swagger_1.ApiNotFoundResponse)({ description: 'Email not found' }),
    (0, swagger_1.ApiInternalServerErrorResponse)({
        description: K.ERROR_CODES.DEFAULT.message
    }),
    (0, public_guard_1.Public)(),
    __param(0, (0, password_decorator_1.Password)()),
    __param(1, (0, common_1.Body)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [Object, auth_dto_2.LoginDto]),
    __metadata("design:returntype", Promise)
], AuthController.prototype, "adminLogin", null);
__decorate([
    (0, common_1.Post)('/admin/refresh'),
    (0, common_1.UseGuards)(jwt_refresh_guard_1.default),
    (0, swagger_1.ApiBearerAuth)(),
    (0, swagger_1.ApiOperation)({ description: 'To generate bearer token' }),
    (0, swagger_1.ApiOkResponse)({
        description: 'Generated bearer token',
        type: auth_dto_1.RefreshResponseDto
    }),
    (0, swagger_1.ApiInternalServerErrorResponse)({
        description: K.ERROR_CODES.DEFAULT.message
    }),
    (0, public_guard_1.Public)(),
    __param(0, (0, common_1.Request)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [Object]),
    __metadata("design:returntype", void 0)
], AuthController.prototype, "refreshToken", null);
__decorate([
    (0, common_1.Post)('/admin/forgotpassword'),
    (0, common_1.HttpCode)(200),
    (0, common_1.UsePipes)(new validation_pipe_1.CustomValidationPipe({ transform: true })),
    (0, swagger_1.ApiBody)({ type: auth_dto_2.AdminForgotPasswordDTO }),
    (0, swagger_1.ApiOperation)({ description: 'To send forgot link to Admin' }),
    (0, swagger_1.ApiOkResponse)({ description: 'Email send successfully', type: auth_dto_2.MessageDto }),
    (0, swagger_1.ApiBadRequestResponse)({ description: 'Invalid email' }),
    (0, swagger_1.ApiNotFoundResponse)({ description: K.ERROR_CODES.Email.message }),
    (0, swagger_1.ApiInternalServerErrorResponse)({
        description: K.ERROR_CODES.DEFAULT.message
    }),
    (0, public_guard_1.Public)(),
    __param(0, (0, common_1.Body)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [auth_dto_2.AdminForgotPasswordDTO]),
    __metadata("design:returntype", Promise)
], AuthController.prototype, "adminForgotPassword", null);
__decorate([
    (0, common_1.Post)('/admin/resetpassword'),
    (0, common_1.UseGuards)(password_reset_quard_1.PasswordResetGuard),
    (0, common_1.HttpCode)(200),
    (0, common_1.UsePipes)(new validation_pipe_1.CustomValidationPipe()),
    (0, swagger_1.ApiBody)({ type: auth_dto_2.AdminResetPasswordDTO }),
    (0, swagger_1.ApiOperation)({ description: 'To update new password' }),
    (0, swagger_1.ApiOkResponse)({
        description: 'Password inserted successfully',
        type: auth_dto_2.MessageDto
    }),
    (0, swagger_1.ApiHeader)({
        name: 'authorizations',
        description: 'Contain password and confirm password for login'
    }),
    (0, swagger_1.ApiBadRequestResponse)({ description: 'Password mismatch' }),
    (0, swagger_1.ApiBearerAuth)(),
    (0, swagger_1.ApiInternalServerErrorResponse)({
        description: K.ERROR_CODES.DEFAULT.message
    }),
    (0, public_guard_1.Public)(),
    __param(0, (0, common_1.Body)()),
    __param(1, (0, password_decorator_1.Password)()),
    __param(2, (0, reset_body_decorator_1.ResetBody)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [auth_dto_1.AdminTypeDto,
        auth_dto_2.AdminResetPasswordDTO, Object]),
    __metadata("design:returntype", rxjs_1.Observable)
], AuthController.prototype, "adminResetPassword", null);
__decorate([
    (0, common_1.Post)('/user/forgotpassword'),
    (0, common_1.HttpCode)(200),
    (0, common_1.UsePipes)(new validation_pipe_1.CustomValidationPipe({ transform: true })),
    (0, common_1.HttpCode)(200),
    (0, swagger_1.ApiBody)({ type: auth_dto_2.UserForgotPasswordDTO }),
    (0, swagger_1.ApiOperation)({ description: 'To send forgot link to User' }),
    (0, swagger_1.ApiOkResponse)({ description: 'Email send successfully', type: auth_dto_2.MessageDto }),
    (0, swagger_1.ApiBadRequestResponse)({ description: 'Invalid email' }),
    (0, swagger_1.ApiNotFoundResponse)({ description: K.ERROR_CODES.Email.message }),
    (0, swagger_1.ApiInternalServerErrorResponse)({
        description: K.ERROR_CODES.DEFAULT.message
    }),
    (0, public_guard_1.Public)(),
    __param(0, (0, common_1.Body)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [auth_dto_2.UserForgotPasswordDTO]),
    __metadata("design:returntype", Promise)
], AuthController.prototype, "userForgotPassword", null);
__decorate([
    (0, common_1.Post)('/user/resetpassword'),
    (0, common_1.UseGuards)(password_reset_quard_1.PasswordResetGuard),
    (0, common_1.HttpCode)(200),
    (0, common_1.UsePipes)(new validation_pipe_1.CustomValidationPipe({ transform: true })),
    (0, swagger_1.ApiBody)({ type: auth_dto_2.AdminResetPasswordDTO }),
    (0, swagger_1.ApiOperation)({ description: 'To Update new password' }),
    (0, swagger_1.ApiOkResponse)({
        description: 'Password inserted successfully',
        type: auth_dto_2.MessageDto
    }),
    (0, swagger_1.ApiHeader)({
        name: 'authorizations',
        description: 'Contain Password and confirm password for login'
    }),
    (0, swagger_1.ApiBadRequestResponse)({ description: 'Password Mismatch' }),
    (0, swagger_1.ApiBearerAuth)(),
    (0, swagger_1.ApiInternalServerErrorResponse)({
        description: K.ERROR_CODES.DEFAULT.message
    }),
    (0, public_guard_1.Public)(),
    __param(0, (0, password_decorator_1.Password)()),
    __param(1, (0, reset_body_decorator_1.ResetBody)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [Object, Object]),
    __metadata("design:returntype", rxjs_1.Observable)
], AuthController.prototype, "userResetPassword", null);
__decorate([
    (0, common_1.Post)('/user/refresh'),
    (0, common_1.UseGuards)(jwt_user_refresh_guard_1.default),
    (0, common_1.HttpCode)(200),
    (0, swagger_1.ApiBearerAuth)(),
    (0, swagger_1.ApiOperation)({ description: 'To generate bearer token' }),
    (0, swagger_1.ApiOkResponse)({
        description: 'Generated bearer token',
        type: auth_dto_1.RefreshResponseDto
    }),
    (0, swagger_1.ApiInternalServerErrorResponse)({
        description: K.ERROR_CODES.DEFAULT.message
    }),
    (0, public_guard_1.Public)(),
    __param(0, (0, common_1.Request)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [Object]),
    __metadata("design:returntype", void 0)
], AuthController.prototype, "userRefreshToken", null);
AuthController = __decorate([
    (0, swagger_1.ApiTags)('Auth'),
    (0, common_1.Controller)('auth'),
    __metadata("design:paramtypes", [auth_service_1.AuthService])
], AuthController);
exports.AuthController = AuthController;
//# sourceMappingURL=auth.controller.js.map