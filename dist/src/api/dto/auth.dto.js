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
Object.defineProperty(exports, "__esModule", { value: true });
exports.RefreshResponseDto = exports.AdminTypeDto = exports.IdDto = exports.MessageDto = exports.LoginUserDto = exports.UserDetailDto = exports.AdminDetailDto = exports.AdminResetPasswordDTO = exports.PasswordDto = exports.UserForgotPasswordDTO = exports.AdminForgotPasswordDTO = exports.LoginAdminDto = exports.LoginUserBodyDto = exports.LoginDto = exports.LoginResponseDto = void 0;
const swagger_1 = require("@nestjs/swagger");
const class_transformer_1 = require("class-transformer");
const class_validator_1 = require("class-validator");
const match_decorator_1 = require("../../decorator/match.decorator");
class LoginResponseDto {
}
__decorate([
    (0, swagger_1.ApiProperty)({ example: 'bearer token' }),
    __metadata("design:type", String)
], LoginResponseDto.prototype, "bearer_token", void 0);
__decorate([
    (0, swagger_1.ApiProperty)({ example: 'refresh token' }),
    (0, class_validator_1.IsOptional)(),
    __metadata("design:type", String)
], LoginResponseDto.prototype, "refresh_token", void 0);
exports.LoginResponseDto = LoginResponseDto;
class LoginDto {
}
__decorate([
    (0, swagger_1.ApiProperty)({ example: 'owanshaji@gmail.com' }),
    (0, class_validator_1.IsString)(),
    (0, class_validator_1.IsNotEmpty)(),
    (0, class_validator_1.IsEmail)(),
    (0, class_transformer_1.Transform)((email) => email.value.toLowerCase()),
    __metadata("design:type", String)
], LoginDto.prototype, "email", void 0);
exports.LoginDto = LoginDto;
class LoginUserBodyDto {
}
__decorate([
    (0, swagger_1.ApiProperty)(),
    (0, class_validator_1.IsString)(),
    (0, class_validator_1.IsNotEmpty)(),
    (0, class_validator_1.IsEmail)(),
    (0, class_transformer_1.Transform)((email) => email.value.toLowerCase()),
    __metadata("design:type", String)
], LoginUserBodyDto.prototype, "email", void 0);
__decorate([
    (0, swagger_1.ApiProperty)(),
    (0, class_validator_1.IsString)(),
    (0, class_validator_1.IsNotEmpty)(),
    __metadata("design:type", String)
], LoginUserBodyDto.prototype, "password", void 0);
exports.LoginUserBodyDto = LoginUserBodyDto;
class LoginAdminDto {
}
__decorate([
    (0, swagger_1.ApiProperty)(),
    __metadata("design:type", String)
], LoginAdminDto.prototype, "adminId", void 0);
__decorate([
    (0, swagger_1.ApiProperty)(),
    __metadata("design:type", String)
], LoginAdminDto.prototype, "email", void 0);
__decorate([
    (0, swagger_1.ApiProperty)(),
    __metadata("design:type", String)
], LoginAdminDto.prototype, "password", void 0);
__decorate([
    (0, swagger_1.ApiProperty)(),
    __metadata("design:type", String)
], LoginAdminDto.prototype, "salt", void 0);
__decorate([
    (0, swagger_1.ApiProperty)(),
    __metadata("design:type", String)
], LoginAdminDto.prototype, "roles", void 0);
__decorate([
    (0, swagger_1.ApiProperty)(),
    __metadata("design:type", String)
], LoginAdminDto.prototype, "roleName", void 0);
exports.LoginAdminDto = LoginAdminDto;
class AdminForgotPasswordDTO {
}
__decorate([
    (0, swagger_1.ApiProperty)({ required: true, example: 'owanshaji@gmail.com' }),
    (0, class_validator_1.IsString)(),
    (0, class_validator_1.IsNotEmpty)(),
    (0, class_validator_1.IsEmail)(),
    (0, class_transformer_1.Transform)((email) => email.value.toLowerCase()),
    __metadata("design:type", String)
], AdminForgotPasswordDTO.prototype, "email", void 0);
exports.AdminForgotPasswordDTO = AdminForgotPasswordDTO;
class UserForgotPasswordDTO {
}
__decorate([
    (0, swagger_1.ApiProperty)(),
    (0, class_validator_1.IsString)(),
    (0, class_validator_1.IsNotEmpty)(),
    (0, class_validator_1.IsEmail)(),
    (0, class_transformer_1.Transform)((email) => email.value.toLowerCase()),
    __metadata("design:type", String)
], UserForgotPasswordDTO.prototype, "email", void 0);
exports.UserForgotPasswordDTO = UserForgotPasswordDTO;
class PasswordDto {
}
__decorate([
    (0, swagger_1.ApiProperty)({ example: 'haai' }),
    (0, class_validator_1.IsString)(),
    (0, class_validator_1.IsNotEmpty)(),
    __metadata("design:type", String)
], PasswordDto.prototype, "password", void 0);
__decorate([
    (0, swagger_1.ApiProperty)(),
    (0, class_validator_1.IsString)(),
    (0, class_validator_1.IsNotEmpty)(),
    (0, match_decorator_1.Match)('password'),
    __metadata("design:type", String)
], PasswordDto.prototype, "confirmPassword", void 0);
exports.PasswordDto = PasswordDto;
class AdminResetPasswordDTO {
}
__decorate([
    (0, swagger_1.ApiProperty)({ required: true }),
    (0, class_validator_1.IsString)(),
    (0, class_validator_1.IsNotEmpty)(),
    __metadata("design:type", String)
], AdminResetPasswordDTO.prototype, "password", void 0);
__decorate([
    (0, swagger_1.ApiProperty)({ required: true }),
    (0, class_validator_1.IsString)(),
    (0, class_validator_1.IsNotEmpty)(),
    __metadata("design:type", String)
], AdminResetPasswordDTO.prototype, "confirmPassword", void 0);
exports.AdminResetPasswordDTO = AdminResetPasswordDTO;
class AdminDetailDto {
}
__decorate([
    (0, swagger_1.ApiProperty)(),
    __metadata("design:type", String)
], AdminDetailDto.prototype, "firstName", void 0);
__decorate([
    (0, swagger_1.ApiProperty)(),
    __metadata("design:type", String)
], AdminDetailDto.prototype, "adminId", void 0);
__decorate([
    (0, swagger_1.ApiProperty)(),
    __metadata("design:type", String)
], AdminDetailDto.prototype, "email", void 0);
__decorate([
    (0, swagger_1.ApiProperty)(),
    __metadata("design:type", String)
], AdminDetailDto.prototype, "pass", void 0);
__decorate([
    (0, swagger_1.ApiProperty)(),
    __metadata("design:type", String)
], AdminDetailDto.prototype, "salt", void 0);
__decorate([
    (0, swagger_1.ApiProperty)(),
    __metadata("design:type", String)
], AdminDetailDto.prototype, "roles", void 0);
__decorate([
    (0, swagger_1.ApiProperty)(),
    __metadata("design:type", String)
], AdminDetailDto.prototype, "roleName", void 0);
exports.AdminDetailDto = AdminDetailDto;
class UserDetailDto {
}
__decorate([
    (0, swagger_1.ApiProperty)(),
    __metadata("design:type", String)
], UserDetailDto.prototype, "firstName", void 0);
__decorate([
    (0, swagger_1.ApiProperty)(),
    __metadata("design:type", String)
], UserDetailDto.prototype, "userId", void 0);
exports.UserDetailDto = UserDetailDto;
class LoginUserDto {
}
__decorate([
    (0, swagger_1.ApiProperty)(),
    __metadata("design:type", String)
], LoginUserDto.prototype, "id", void 0);
__decorate([
    (0, swagger_1.ApiProperty)(),
    __metadata("design:type", String)
], LoginUserDto.prototype, "email", void 0);
__decorate([
    (0, swagger_1.ApiProperty)(),
    __metadata("design:type", String)
], LoginUserDto.prototype, "password", void 0);
__decorate([
    (0, swagger_1.ApiProperty)(),
    __metadata("design:type", String)
], LoginUserDto.prototype, "salt", void 0);
exports.LoginUserDto = LoginUserDto;
class MessageDto {
}
__decorate([
    (0, swagger_1.ApiProperty)(),
    __metadata("design:type", String)
], MessageDto.prototype, "message", void 0);
exports.MessageDto = MessageDto;
class IdDto {
}
__decorate([
    (0, swagger_1.ApiProperty)(),
    __metadata("design:type", String)
], IdDto.prototype, "id", void 0);
exports.IdDto = IdDto;
class AdminTypeDto {
}
__decorate([
    (0, swagger_1.ApiProperty)({ required: false }),
    (0, class_validator_1.IsNumber)(),
    (0, class_validator_1.IsOptional)(),
    __metadata("design:type", Number)
], AdminTypeDto.prototype, "adminType", void 0);
exports.AdminTypeDto = AdminTypeDto;
class RefreshResponseDto {
}
__decorate([
    (0, swagger_1.ApiProperty)({ example: 'bearer token' }),
    __metadata("design:type", String)
], RefreshResponseDto.prototype, "bearer_token", void 0);
exports.RefreshResponseDto = RefreshResponseDto;
//# sourceMappingURL=auth.dto.js.map