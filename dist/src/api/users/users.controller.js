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
exports.UsersController = void 0;
const users_service_1 = require("./users.service");
const common_1 = require("@nestjs/common");
const message_dto_1 = require("../dto/message.dto");
const users_dto_1 = require("../dto/users.dto");
const rxjs_1 = require("rxjs");
const validation_pipe_1 = require("../../pipes/validation-pipe");
const jwt_decorator_1 = require("../../decorator/jwt.decorator");
const swagger_1 = require("@nestjs/swagger");
const K = require("../../shared/constants");
const roles_dto_1 = require("../dto/roles.dto");
const roles_decorator_1 = require("../../decorator/roles.decorator");
const public_guard_1 = require("../../guards/public.guard");
let UsersController = class UsersController {
    constructor(usersService) {
        this.usersService = usersService;
    }
    signUp(signUpDto) {
        return this.usersService.signUp(signUpDto);
    }
    userProfileView(jwtBody) {
        return this.usersService.userProfileView(jwtBody);
    }
    userDelete(jwtBody) {
        return this.usersService.userDelete(jwtBody);
    }
    userUpdate(jwtBody, body) {
        return this.usersService.userUpdate(jwtBody, body);
    }
    userPasswordUpdate(id, jwtBody, body) {
        return this.usersService.userPasswordUpdate(id, jwtBody, body);
    }
    userAddressCreate(jwtBody, body) {
        return this.usersService.userAddressCreate(jwtBody, body);
    }
    userAddressUpdate(id, jwtBody, body) {
        return this.usersService.userAddressUpdate(jwtBody, body, id);
    }
    userAddressFetch(id, jwtBody) {
        return this.usersService.userAddressFetch(id, jwtBody);
    }
    userAddressDelete(id, jwtBody) {
        return this.usersService.userAddressDelete(id, jwtBody);
    }
    userRewardUpdate(jwtBody, body) {
        return this.usersService.userRewardUpdate(jwtBody, body);
    }
    userExitUpdate(jwtBody, body) {
        return this.usersService.userExitUpdate(jwtBody, body);
    }
};
__decorate([
    (0, common_1.Post)('register'),
    (0, common_1.UsePipes)(new validation_pipe_1.CustomValidationPipe({ transform: true })),
    (0, common_1.HttpCode)(200),
    (0, swagger_1.ApiBearerAuth)(),
    (0, swagger_1.ApiOperation)({ description: 'Register profile of a new user' }),
    (0, swagger_1.ApiOkResponse)({
        description: 'User details registered successfully',
        type: message_dto_1.MessageDto
    }),
    (0, swagger_1.ApiUnauthorizedResponse)({ description: K.ERROR_CODES.UNAUTHORIZED.message }),
    (0, swagger_1.ApiNotFoundResponse)({ description: 'Id not found' }),
    (0, swagger_1.ApiInternalServerErrorResponse)({
        description: K.ERROR_CODES.DEFAULT.message
    }),
    (0, public_guard_1.Public)(),
    __param(0, (0, common_1.Body)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [users_dto_1.SignUpDto]),
    __metadata("design:returntype", rxjs_1.Observable)
], UsersController.prototype, "signUp", null);
__decorate([
    (0, common_1.Get)('profile'),
    (0, roles_decorator_1.Roles)(roles_dto_1.UserRoles.USER),
    (0, common_1.HttpCode)(200),
    (0, swagger_1.ApiBearerAuth)(),
    (0, swagger_1.ApiOperation)({ description: 'View profile of the user' }),
    (0, swagger_1.ApiOkResponse)({
        description: 'User details collected successfully',
        type: users_dto_1.UserProfileViewDto
    }),
    (0, swagger_1.ApiUnauthorizedResponse)({ description: K.ERROR_CODES.UNAUTHORIZED.message }),
    (0, swagger_1.ApiNotFoundResponse)({ description: 'Id not found' }),
    (0, swagger_1.ApiInternalServerErrorResponse)({
        description: K.ERROR_CODES.DEFAULT.message
    }),
    __param(0, (0, jwt_decorator_1.JwtBody)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [Object]),
    __metadata("design:returntype", rxjs_1.Observable)
], UsersController.prototype, "userProfileView", null);
__decorate([
    (0, common_1.Delete)('profile'),
    (0, roles_decorator_1.Roles)(roles_dto_1.UserRoles.USER),
    (0, common_1.HttpCode)(200),
    (0, swagger_1.ApiBearerAuth)(),
    (0, swagger_1.ApiOperation)({ description: 'Delete profile for user' }),
    (0, swagger_1.ApiOkResponse)({
        description: K.ERROR_CODES.DELETE.message,
        type: message_dto_1.MessageDto
    }),
    (0, swagger_1.ApiUnauthorizedResponse)({ description: K.ERROR_CODES.UNAUTHORIZED.message }),
    (0, swagger_1.ApiNotFoundResponse)({ description: 'Id not found' }),
    (0, swagger_1.ApiInternalServerErrorResponse)({
        description: K.ERROR_CODES.DEFAULT.message
    }),
    __param(0, (0, jwt_decorator_1.JwtBody)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [Object]),
    __metadata("design:returntype", rxjs_1.Observable)
], UsersController.prototype, "userDelete", null);
__decorate([
    (0, common_1.Patch)('profile'),
    (0, roles_decorator_1.Roles)(roles_dto_1.UserRoles.USER),
    (0, common_1.UsePipes)(new validation_pipe_1.CustomValidationPipe({ transform: true })),
    (0, common_1.HttpCode)(200),
    (0, swagger_1.ApiBearerAuth)(),
    (0, swagger_1.ApiBody)({ type: users_dto_1.UserUpdateDto }),
    (0, swagger_1.ApiOperation)({ description: 'Update profile for user' }),
    (0, swagger_1.ApiOkResponse)({
        description: K.ERROR_CODES.DELETE.message,
        type: message_dto_1.MessageDto
    }),
    (0, swagger_1.ApiUnauthorizedResponse)({ description: K.ERROR_CODES.UNAUTHORIZED.message }),
    (0, swagger_1.ApiInternalServerErrorResponse)({
        description: K.ERROR_CODES.DEFAULT.message
    }),
    __param(0, (0, jwt_decorator_1.JwtBody)()),
    __param(1, (0, common_1.Body)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [Object, users_dto_1.UserUpdateDto]),
    __metadata("design:returntype", rxjs_1.Observable)
], UsersController.prototype, "userUpdate", null);
__decorate([
    (0, common_1.Patch)(':id/update-password'),
    (0, roles_decorator_1.Roles)(roles_dto_1.UserRoles.USER),
    (0, common_1.UsePipes)(new validation_pipe_1.CustomValidationPipe({ transform: true })),
    (0, common_1.HttpCode)(200),
    (0, swagger_1.ApiBearerAuth)(),
    (0, swagger_1.ApiBody)({ type: users_dto_1.UserPasswordUpdateDto }),
    (0, swagger_1.ApiOperation)({ description: 'Update password for user' }),
    (0, swagger_1.ApiOkResponse)({
        description: K.ERROR_CODES.UPDATED.message,
        type: message_dto_1.MessageDto
    }),
    (0, swagger_1.ApiUnauthorizedResponse)({ description: K.ERROR_CODES.UNAUTHORIZED.message }),
    (0, swagger_1.ApiInternalServerErrorResponse)({
        description: K.ERROR_CODES.DEFAULT.message
    }),
    __param(0, (0, common_1.Param)('id', common_1.ParseIntPipe)),
    __param(1, (0, jwt_decorator_1.JwtBody)()),
    __param(2, (0, common_1.Body)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [Number, Object, users_dto_1.UserPasswordUpdateDto]),
    __metadata("design:returntype", Promise)
], UsersController.prototype, "userPasswordUpdate", null);
__decorate([
    (0, common_1.Post)('address'),
    (0, roles_decorator_1.Roles)(roles_dto_1.UserRoles.USER),
    (0, common_1.UsePipes)(new validation_pipe_1.CustomValidationPipe({ transform: true })),
    (0, common_1.HttpCode)(200),
    (0, swagger_1.ApiBearerAuth)(),
    (0, swagger_1.ApiBody)({ type: users_dto_1.UserAddressCreateDto }),
    (0, swagger_1.ApiOperation)({ description: 'Create address for user' }),
    (0, swagger_1.ApiOkResponse)({
        description: K.ERROR_CODES.Created.message,
        type: message_dto_1.MessageDto
    }),
    (0, swagger_1.ApiUnauthorizedResponse)({ description: K.ERROR_CODES.UNAUTHORIZED.message }),
    (0, swagger_1.ApiInternalServerErrorResponse)({
        description: K.ERROR_CODES.DEFAULT.message
    }),
    __param(0, (0, jwt_decorator_1.JwtBody)()),
    __param(1, (0, common_1.Body)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [Object, users_dto_1.UserAddressCreateDto]),
    __metadata("design:returntype", rxjs_1.Observable)
], UsersController.prototype, "userAddressCreate", null);
__decorate([
    (0, common_1.Patch)(':id/address'),
    (0, roles_decorator_1.Roles)(roles_dto_1.UserRoles.USER),
    (0, common_1.UsePipes)(new validation_pipe_1.CustomValidationPipe({ transform: true })),
    (0, common_1.HttpCode)(200),
    (0, swagger_1.ApiBearerAuth)(),
    (0, swagger_1.ApiBody)({ type: users_dto_1.UserAddressUpdateDto }),
    (0, swagger_1.ApiOperation)({ description: 'Update address for user' }),
    (0, swagger_1.ApiOkResponse)({
        description: K.ERROR_CODES.UPDATED.message,
        type: message_dto_1.MessageDto
    }),
    (0, swagger_1.ApiUnauthorizedResponse)({ description: K.ERROR_CODES.UNAUTHORIZED.message }),
    (0, swagger_1.ApiInternalServerErrorResponse)({
        description: K.ERROR_CODES.DEFAULT.message
    }),
    __param(0, (0, common_1.Param)('id', common_1.ParseIntPipe)),
    __param(1, (0, jwt_decorator_1.JwtBody)()),
    __param(2, (0, common_1.Body)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [Number, Object, users_dto_1.UserAddressUpdateDto]),
    __metadata("design:returntype", rxjs_1.Observable)
], UsersController.prototype, "userAddressUpdate", null);
__decorate([
    (0, common_1.Get)(':id/address'),
    (0, roles_decorator_1.Roles)(roles_dto_1.UserRoles.USER),
    (0, common_1.UsePipes)(new validation_pipe_1.CustomValidationPipe({ transform: true })),
    (0, common_1.HttpCode)(200),
    (0, swagger_1.ApiBearerAuth)(),
    (0, swagger_1.ApiOperation)({ description: 'Fetch address for user' }),
    (0, swagger_1.ApiOkResponse)({
        description: K.ERROR_CODES.OK.message,
        type: users_dto_1.AddressMessageDto
    }),
    (0, swagger_1.ApiUnauthorizedResponse)({ description: K.ERROR_CODES.UNAUTHORIZED.message }),
    (0, swagger_1.ApiInternalServerErrorResponse)({
        description: K.ERROR_CODES.DEFAULT.message
    }),
    __param(0, (0, common_1.Param)('id', common_1.ParseIntPipe)),
    __param(1, (0, jwt_decorator_1.JwtBody)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [Number, Object]),
    __metadata("design:returntype", rxjs_1.Observable)
], UsersController.prototype, "userAddressFetch", null);
__decorate([
    (0, common_1.Delete)(':id/address'),
    (0, roles_decorator_1.Roles)(roles_dto_1.UserRoles.USER),
    (0, common_1.UsePipes)(new validation_pipe_1.CustomValidationPipe({ transform: true })),
    (0, common_1.HttpCode)(200),
    (0, swagger_1.ApiBearerAuth)(),
    (0, swagger_1.ApiOperation)({ description: 'Delete address of user' }),
    (0, swagger_1.ApiOkResponse)({
        description: K.ERROR_CODES.DELETE.message,
        type: message_dto_1.MessageDto
    }),
    (0, swagger_1.ApiUnauthorizedResponse)({ description: K.ERROR_CODES.UNAUTHORIZED.message }),
    (0, swagger_1.ApiInternalServerErrorResponse)({
        description: K.ERROR_CODES.DEFAULT.message
    }),
    __param(0, (0, common_1.Param)('id', common_1.ParseIntPipe)),
    __param(1, (0, jwt_decorator_1.JwtBody)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [Number, Object]),
    __metadata("design:returntype", rxjs_1.Observable)
], UsersController.prototype, "userAddressDelete", null);
__decorate([
    (0, common_1.Patch)('reward'),
    (0, roles_decorator_1.Roles)(roles_dto_1.UserRoles.USER),
    (0, common_1.UsePipes)(new validation_pipe_1.CustomValidationPipe({ transform: true })),
    (0, swagger_1.ApiBearerAuth)(),
    (0, swagger_1.ApiBody)({ type: users_dto_1.UserRewardUpdateDto }),
    (0, swagger_1.ApiOperation)({ description: 'Update reward for user' }),
    (0, swagger_1.ApiOkResponse)({
        description: K.ERROR_CODES.UPDATED.message,
        type: message_dto_1.MessageDto
    }),
    (0, swagger_1.ApiUnauthorizedResponse)({ description: K.ERROR_CODES.UNAUTHORIZED.message }),
    (0, swagger_1.ApiInternalServerErrorResponse)({
        description: K.ERROR_CODES.DEFAULT.message
    }),
    __param(0, (0, jwt_decorator_1.JwtBody)()),
    __param(1, (0, common_1.Body)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [Object, users_dto_1.UserRewardUpdateDto]),
    __metadata("design:returntype", rxjs_1.Observable)
], UsersController.prototype, "userRewardUpdate", null);
__decorate([
    (0, common_1.Patch)('exit'),
    (0, roles_decorator_1.Roles)(roles_dto_1.UserRoles.USER),
    (0, common_1.UsePipes)(new validation_pipe_1.CustomValidationPipe({ transform: true })),
    (0, swagger_1.ApiBearerAuth)(),
    (0, swagger_1.ApiBody)({ type: users_dto_1.BeaconIdDto }),
    (0, swagger_1.ApiOperation)({ description: 'Update user visit status' }),
    (0, swagger_1.ApiOkResponse)({
        description: K.ERROR_CODES.UPDATED.message,
        type: message_dto_1.MessageDto
    }),
    (0, swagger_1.ApiUnauthorizedResponse)({ description: K.ERROR_CODES.UNAUTHORIZED.message }),
    (0, swagger_1.ApiInternalServerErrorResponse)({
        description: K.ERROR_CODES.DEFAULT.message
    }),
    __param(0, (0, jwt_decorator_1.JwtBody)()),
    __param(1, (0, common_1.Body)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [Object, users_dto_1.BeaconIdDto]),
    __metadata("design:returntype", rxjs_1.Observable)
], UsersController.prototype, "userExitUpdate", null);
UsersController = __decorate([
    (0, swagger_1.ApiTags)('User'),
    (0, common_1.Controller)('user'),
    __metadata("design:paramtypes", [users_service_1.UsersService])
], UsersController);
exports.UsersController = UsersController;
//# sourceMappingURL=users.controller.js.map