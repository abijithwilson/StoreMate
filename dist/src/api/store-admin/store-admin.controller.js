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
exports.StoreAdminController = void 0;
const store_admin_dto_1 = require("./../dto/store-admin.dto");
const adminJwtBody_dto_1 = require("./../dto/adminJwtBody.dto");
const common_1 = require("@nestjs/common");
const swagger_1 = require("@nestjs/swagger");
const rxjs_1 = require("rxjs");
const jwt_decorator_1 = require("../../decorator/jwt.decorator");
const store_admin_dto_2 = require("../dto/store-admin.dto");
const store_admin_service_1 = require("./store-admin.service");
const message_dto_1 = require("../dto/message.dto");
const validation_pipe_1 = require("../../pipes/validation-pipe");
const K = require("../../shared/constants");
const roles_decorator_1 = require("../../decorator/roles.decorator");
const roles_dto_1 = require("../dto/roles.dto");
let StoreAdminController = class StoreAdminController {
    constructor(storeAdminService) {
        this.storeAdminService = storeAdminService;
    }
    storeAdminProfileUpdate(id, body, jwtBody) {
        return this.storeAdminService.storeAdminProfileUpdate(id, body, jwtBody);
    }
    fetchStoreAdminProfile(id, jwtBody) {
        return this.storeAdminService.fetchStoreAdminProfile(id, jwtBody);
    }
    fetchAssignedStores(param, id, jwtBody) {
        return this.storeAdminService.fetchAssignedStores(param, id, jwtBody);
    }
    fetchBeaconUnderStore(storeAdminId, storeId, jwtBody, param) {
        return this.storeAdminService.fetchBeaconUnderStore(storeAdminId, storeId, param, jwtBody);
    }
    fetchUnassignedBeacons(id, storeId, jwtBody) {
        return this.storeAdminService.fetchUnassignedBeacons(id, storeId, jwtBody);
    }
    assignBeacon(storeAdminId, storeId, sectionId, body, jwtBody) {
        return this.storeAdminService.assignBeacon(storeAdminId, storeId, sectionId, body, jwtBody);
    }
    unAssignBeacon(storeAdminId, storeId, beaconId, jwtBody) {
        return this.storeAdminService.unAssignBeacon(storeAdminId, storeId, beaconId, jwtBody);
    }
    fetchSectionWiseProducts(storeAdminId, storeId, sectionId, jwtBody, param) {
        return this.storeAdminService.fetchSectionWiseProducts(storeAdminId, storeId, sectionId, jwtBody, param);
    }
    fetchVisitorsCount(storeId, sectionId, jwtBody) {
        return this.storeAdminService.fetchVisitorsCount(storeId, sectionId, jwtBody);
    }
};
__decorate([
    (0, roles_decorator_1.Roles)(roles_dto_1.UserRoles.STORE_ADMIN),
    (0, common_1.Patch)('profile/:id'),
    (0, common_1.UsePipes)(new validation_pipe_1.CustomValidationPipe({ transform: true })),
    (0, common_1.HttpCode)(200),
    (0, swagger_1.ApiBody)({ type: store_admin_dto_2.StoreAdminUpdateDto }),
    (0, swagger_1.ApiBearerAuth)(),
    (0, swagger_1.ApiOperation)({ description: 'Profile update by store admin' }),
    (0, swagger_1.ApiOkResponse)({
        description: K.ERROR_CODES.UPDATED.message,
        type: message_dto_1.MessageDto
    }),
    (0, swagger_1.ApiUnauthorizedResponse)({ description: K.ERROR_CODES.UNAUTHORIZED.message }),
    (0, swagger_1.ApiNotFoundResponse)({ description: 'Id not found' }),
    (0, swagger_1.ApiInternalServerErrorResponse)({
        description: K.ERROR_CODES.DEFAULT.message
    }),
    (0, swagger_1.ApiBadRequestResponse)({ description: 'Invalid Id' }),
    __param(0, (0, common_1.Param)('id', common_1.ParseIntPipe)),
    __param(1, (0, common_1.Body)()),
    __param(2, (0, jwt_decorator_1.JwtBody)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [Number, store_admin_dto_2.StoreAdminUpdateDto,
        adminJwtBody_dto_1.AdminJwtBody]),
    __metadata("design:returntype", rxjs_1.Observable)
], StoreAdminController.prototype, "storeAdminProfileUpdate", null);
__decorate([
    (0, roles_decorator_1.Roles)(roles_dto_1.UserRoles.STORE_ADMIN),
    (0, common_1.Get)(':id/profile'),
    (0, swagger_1.ApiBearerAuth)(),
    (0, swagger_1.ApiOperation)({ description: 'View profile for store admin' }),
    (0, swagger_1.ApiOkResponse)({
        description: 'Successfully fetched store admin profile',
        type: store_admin_dto_2.StoreAdminProfileFetchResponseDto
    }),
    (0, swagger_1.ApiUnauthorizedResponse)({ description: K.ERROR_CODES.UNAUTHORIZED.message }),
    (0, swagger_1.ApiNotFoundResponse)({ description: 'Id not found' }),
    (0, swagger_1.ApiInternalServerErrorResponse)({
        description: K.ERROR_CODES.DEFAULT.message
    }),
    (0, swagger_1.ApiBadRequestResponse)({ description: 'Invalid Id' }),
    __param(0, (0, common_1.Param)('id', new common_1.ParseIntPipe())),
    __param(1, (0, jwt_decorator_1.JwtBody)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [Number, adminJwtBody_dto_1.AdminJwtBody]),
    __metadata("design:returntype", rxjs_1.Observable)
], StoreAdminController.prototype, "fetchStoreAdminProfile", null);
__decorate([
    (0, roles_decorator_1.Roles)(roles_dto_1.UserRoles.STORE_ADMIN),
    (0, common_1.Get)(':id/stores'),
    (0, swagger_1.ApiBearerAuth)(),
    (0, swagger_1.ApiOperation)({ description: 'View stores assigned to store admin' }),
    (0, swagger_1.ApiOkResponse)({
        description: 'Successfully fetched stores assigned to store admin',
        type: store_admin_dto_1.FetchAssignedStoresResponseDto
    }),
    (0, swagger_1.ApiUnauthorizedResponse)({ description: K.ERROR_CODES.UNAUTHORIZED.message }),
    (0, swagger_1.ApiNotFoundResponse)({ description: 'Id not found' }),
    (0, swagger_1.ApiInternalServerErrorResponse)({
        description: K.ERROR_CODES.DEFAULT.message
    }),
    (0, swagger_1.ApiBadRequestResponse)({ description: 'Invalid Id' }),
    __param(0, (0, common_1.Query)()),
    __param(1, (0, common_1.Param)('id', new common_1.ParseIntPipe())),
    __param(2, (0, jwt_decorator_1.JwtBody)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [store_admin_dto_1.FetchAllAssignedStoresPaginationDto, Number, adminJwtBody_dto_1.AdminJwtBody]),
    __metadata("design:returntype", rxjs_1.Observable)
], StoreAdminController.prototype, "fetchAssignedStores", null);
__decorate([
    (0, roles_decorator_1.Roles)(roles_dto_1.UserRoles.STORE_ADMIN, roles_dto_1.UserRoles.SUPER_ADMIN),
    (0, common_1.Get)(':storeAdminId/store/:storeId/beacon'),
    (0, swagger_1.ApiBearerAuth)(),
    (0, swagger_1.ApiOperation)({ description: 'View beacon under store' }),
    (0, swagger_1.ApiOkResponse)({
        description: 'Successfully fetched beacon under store',
        type: store_admin_dto_1.BeaconFetchMessageDto
    }),
    (0, swagger_1.ApiUnauthorizedResponse)({ description: K.ERROR_CODES.UNAUTHORIZED.message }),
    (0, swagger_1.ApiInternalServerErrorResponse)({
        description: K.ERROR_CODES.DEFAULT.message
    }),
    (0, swagger_1.ApiBadRequestResponse)({ description: 'Invalid Id' }),
    __param(0, (0, common_1.Param)('storeAdminId', new common_1.ParseIntPipe())),
    __param(1, (0, common_1.Param)('storeId', new common_1.ParseIntPipe())),
    __param(2, (0, jwt_decorator_1.JwtBody)()),
    __param(3, (0, common_1.Query)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [Number, Number, adminJwtBody_dto_1.AdminJwtBody,
        store_admin_dto_1.BeaconPaginationQueryParam]),
    __metadata("design:returntype", Promise)
], StoreAdminController.prototype, "fetchBeaconUnderStore", null);
__decorate([
    (0, roles_decorator_1.Roles)(roles_dto_1.UserRoles.STORE_ADMIN),
    (0, common_1.Get)(':id/store/:storeId/unassigned-beacons'),
    (0, swagger_1.ApiBearerAuth)(),
    (0, swagger_1.ApiOperation)({ description: 'Fetch unassigned beacons for drop-down' }),
    (0, swagger_1.ApiOkResponse)({
        description: 'Successfully fetched unassigned beacons details',
        type: store_admin_dto_1.FetchAssignedStoresResponseDto
    }),
    (0, swagger_1.ApiUnauthorizedResponse)({ description: K.ERROR_CODES.UNAUTHORIZED.message }),
    (0, swagger_1.ApiNotFoundResponse)({ description: 'Id not found' }),
    (0, swagger_1.ApiInternalServerErrorResponse)({
        description: K.ERROR_CODES.DEFAULT.message
    }),
    (0, swagger_1.ApiBadRequestResponse)({ description: 'Invalid Id' }),
    __param(0, (0, common_1.Param)('id', new common_1.ParseIntPipe())),
    __param(1, (0, common_1.Param)('storeId', new common_1.ParseIntPipe())),
    __param(2, (0, jwt_decorator_1.JwtBody)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [Number, Number, adminJwtBody_dto_1.AdminJwtBody]),
    __metadata("design:returntype", Promise)
], StoreAdminController.prototype, "fetchUnassignedBeacons", null);
__decorate([
    (0, common_1.Patch)(':storeAdminId/store/:storeId/section/:sectionId/beacon/assign'),
    (0, roles_decorator_1.Roles)(roles_dto_1.UserRoles.STORE_ADMIN),
    (0, common_1.UsePipes)(new validation_pipe_1.CustomValidationPipe({ transform: true })),
    (0, swagger_1.ApiBearerAuth)(),
    (0, swagger_1.ApiOperation)({ description: 'Assign beacon from a section' }),
    (0, swagger_1.ApiBody)({ type: store_admin_dto_1.AssignBeaconDto }),
    (0, swagger_1.ApiOkResponse)({
        description: K.ERROR_CODES.UPDATED.message,
        type: store_admin_dto_1.BeaconMessageDto
    }),
    (0, swagger_1.ApiUnauthorizedResponse)({
        description: K.ERROR_CODES.UNAUTHORIZED.message
    }),
    (0, swagger_1.ApiInternalServerErrorResponse)({
        description: K.ERROR_CODES.DEFAULT.message
    }),
    (0, swagger_1.ApiBadRequestResponse)({ description: 'Invalid id' }),
    __param(0, (0, common_1.Param)('storeAdminId', common_1.ParseIntPipe)),
    __param(1, (0, common_1.Param)('storeId', common_1.ParseIntPipe)),
    __param(2, (0, common_1.Param)('sectionId', common_1.ParseIntPipe)),
    __param(3, (0, common_1.Body)()),
    __param(4, (0, jwt_decorator_1.JwtBody)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [Number, Number, Number, store_admin_dto_1.AssignBeaconDto, Object]),
    __metadata("design:returntype", Promise)
], StoreAdminController.prototype, "assignBeacon", null);
__decorate([
    (0, common_1.Patch)(':storeAdminId/store/:storeId/beacon/:beaconId/unassign'),
    (0, roles_decorator_1.Roles)(roles_dto_1.UserRoles.STORE_ADMIN),
    (0, common_1.UsePipes)(new validation_pipe_1.CustomValidationPipe({ transform: true })),
    (0, swagger_1.ApiBearerAuth)(),
    (0, swagger_1.ApiOperation)({ description: 'Unassign beacon from a section' }),
    (0, swagger_1.ApiOkResponse)({
        description: K.ERROR_CODES.UPDATED.message,
        type: store_admin_dto_1.BeaconMessageDto
    }),
    (0, swagger_1.ApiUnauthorizedResponse)({
        description: K.ERROR_CODES.UNAUTHORIZED.message
    }),
    (0, swagger_1.ApiInternalServerErrorResponse)({
        description: K.ERROR_CODES.DEFAULT.message
    }),
    __param(0, (0, common_1.Param)('storeAdminId', common_1.ParseIntPipe)),
    __param(1, (0, common_1.Param)('storeId', common_1.ParseIntPipe)),
    __param(2, (0, common_1.Param)('beaconId', common_1.ParseIntPipe)),
    __param(3, (0, jwt_decorator_1.JwtBody)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [Number, Number, Number, Object]),
    __metadata("design:returntype", Promise)
], StoreAdminController.prototype, "unAssignBeacon", null);
__decorate([
    (0, common_1.Get)(':storeAdminId/store/:storeId/section/:sectionId/product'),
    (0, roles_decorator_1.Roles)(roles_dto_1.UserRoles.STORE_ADMIN, roles_dto_1.UserRoles.SUPER_ADMIN),
    (0, swagger_1.ApiBearerAuth)(),
    (0, swagger_1.ApiOperation)({ description: 'Get section wise products in a store' }),
    (0, common_1.UsePipes)(new validation_pipe_1.CustomValidationPipe()),
    (0, swagger_1.ApiOkResponse)({
        description: 'Successfully collected section wise products',
        type: store_admin_dto_1.FetchSectionWiseProductsResponseDto
    }),
    (0, swagger_1.ApiUnauthorizedResponse)({ description: K.ERROR_CODES.UNAUTHORIZED.message }),
    (0, swagger_1.ApiInternalServerErrorResponse)({
        description: K.ERROR_CODES.DEFAULT.message
    }),
    (0, swagger_1.ApiBadRequestResponse)({ description: K.ERROR_CODES.BADREQUEST.message }),
    __param(0, (0, common_1.Param)('storeAdminId', common_1.ParseIntPipe)),
    __param(1, (0, common_1.Param)('storeId', common_1.ParseIntPipe)),
    __param(2, (0, common_1.Param)('sectionId', common_1.ParseIntPipe)),
    __param(3, (0, jwt_decorator_1.JwtBody)()),
    __param(4, (0, common_1.Query)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [Number, Number, Number, Object, store_admin_dto_1.FetchSectionWiseProductsPaginationDto]),
    __metadata("design:returntype", Promise)
], StoreAdminController.prototype, "fetchSectionWiseProducts", null);
__decorate([
    (0, roles_decorator_1.Roles)(roles_dto_1.UserRoles.STORE_ADMIN, roles_dto_1.UserRoles.SUPER_ADMIN),
    (0, common_1.Get)('store/:storeId/section/:sectionId/dashboard'),
    (0, swagger_1.ApiBearerAuth)(),
    (0, swagger_1.ApiOperation)({
        description: 'View total and active number of visitors to a store'
    }),
    (0, swagger_1.ApiOkResponse)({
        description: 'Successfully fetched total and active number of visitors to a store',
        type: store_admin_dto_1.FetchVisitorsCountResponseDto
    }),
    (0, swagger_1.ApiUnauthorizedResponse)({ description: K.ERROR_CODES.UNAUTHORIZED.message }),
    (0, swagger_1.ApiNotFoundResponse)({ description: 'Id not found' }),
    (0, swagger_1.ApiInternalServerErrorResponse)({
        description: K.ERROR_CODES.DEFAULT.message
    }),
    (0, swagger_1.ApiBadRequestResponse)({ description: 'Invalid Id' }),
    __param(0, (0, common_1.Param)('storeId', new common_1.ParseIntPipe())),
    __param(1, (0, common_1.Param)('sectionId', new common_1.ParseIntPipe())),
    __param(2, (0, jwt_decorator_1.JwtBody)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [Number, Number, adminJwtBody_dto_1.AdminJwtBody]),
    __metadata("design:returntype", Promise)
], StoreAdminController.prototype, "fetchVisitorsCount", null);
StoreAdminController = __decorate([
    (0, swagger_1.ApiTags)('Store-admin'),
    (0, common_1.Controller)('store-admin'),
    __metadata("design:paramtypes", [store_admin_service_1.StoreAdminService])
], StoreAdminController);
exports.StoreAdminController = StoreAdminController;
//# sourceMappingURL=store-admin.controller.js.map