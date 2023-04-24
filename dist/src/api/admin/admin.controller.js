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
exports.AdminController = void 0;
const admin_dto_1 = require("./../dto/admin.dto");
const store_dto_1 = require("./../dto/store.dto");
const common_1 = require("@nestjs/common");
const swagger_1 = require("@nestjs/swagger");
const rxjs_1 = require("rxjs");
const jwt_decorator_1 = require("../../decorator/jwt.decorator");
const validation_pipe_1 = require("../../pipes/validation-pipe");
const K = require("../../shared/constants");
const admin_dto_2 = require("../dto/admin.dto");
const message_dto_1 = require("../dto/message.dto");
const admin_service_1 = require("./admin.service");
const offer_dto_1 = require("../dto/offer.dto");
const section_dto_1 = require("../dto/section.dto");
const roles_dto_1 = require("../dto/roles.dto");
const roles_decorator_1 = require("../../decorator/roles.decorator");
let AdminController = class AdminController {
    constructor(adminService) {
        this.adminService = adminService;
    }
    adminProfileUpdate(id, body, jwtBody) {
        return this.adminService.adminProfileUpdate(id, body, jwtBody);
    }
    fetchAdminProfile(id) {
        return this.adminService.fetchAdminProfile(id);
    }
    getAllStoreAdminDetails(param) {
        return this.adminService.getAllStoreAdminDetails(param);
    }
    inviteStoreAdmin(inviteBody, jwtBody) {
        return this.adminService.inviteStoreAdmin(inviteBody, jwtBody);
    }
    storeAdminProfileUpdate(id, body, jwtBody) {
        return this.adminService.storeAdminProfileUpdate(id, body, jwtBody);
    }
    fetchStoreAdminProfile(id) {
        return this.adminService.fetchStoreAdminProfile(id);
    }
    deleteStoreAdminDetails(param) {
        return this.adminService.deleteStoreAdminDetails(param);
    }
    updateOfferDetails(body, id, jwtBody) {
        return this.adminService.updateOfferDetails(body, id, jwtBody);
    }
    getofferDetails(id) {
        return this.adminService.getofferDetails(id);
    }
    createOfferDtails(body, jwtBody) {
        return this.adminService.createOfferDtails(body, jwtBody);
    }
    deleteOffer(id) {
        return this.adminService.deleteOffer(id);
    }
    fetchOfferList(queryParam) {
        return this.adminService.fetchOfferList(queryParam);
    }
    createSection(body, jwtBody) {
        return this.adminService.createSection(body, jwtBody);
    }
    deleteSection(sectionId) {
        return this.adminService.deleteSection(sectionId);
    }
    updateSection(sectionId, body, jwtBody) {
        return this.adminService.updateSection(sectionId, jwtBody, body);
    }
    singleOfferProductList(offerId, param) {
        return this.adminService.singleOfferProductList(offerId, param);
    }
    singleOfferProductAssign(body) {
        return this.adminService.singleOfferProductAssign(body);
    }
    singleOfferProductUnassign(offerId, productId) {
        return this.adminService.singleOfferProductUnassign(offerId, productId);
    }
    adminPasswordUpdate(adminId, jwtBody, body) {
        return this.adminService.adminPasswordUpdate(adminId, jwtBody, body);
    }
};
__decorate([
    (0, common_1.Patch)('profile/:id'),
    (0, roles_decorator_1.Roles)(roles_dto_1.UserRoles.SUPER_ADMIN),
    (0, common_1.UsePipes)(new validation_pipe_1.CustomValidationPipe({ transform: true })),
    (0, common_1.HttpCode)(200),
    (0, swagger_1.ApiBody)({ type: admin_dto_2.AdminUpdateDto }),
    (0, swagger_1.ApiBearerAuth)(),
    (0, swagger_1.ApiOperation)({ description: 'Update profile for admin' }),
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
    __metadata("design:paramtypes", [Number, admin_dto_2.AdminUpdateDto, Object]),
    __metadata("design:returntype", rxjs_1.Observable)
], AdminController.prototype, "adminProfileUpdate", null);
__decorate([
    (0, common_1.Get)('profile/:id'),
    (0, roles_decorator_1.Roles)(roles_dto_1.UserRoles.SUPER_ADMIN),
    (0, swagger_1.ApiBearerAuth)(),
    (0, swagger_1.ApiOperation)({ description: 'View profile for admin' }),
    (0, swagger_1.ApiOkResponse)({
        description: 'Successfully fetched',
        type: admin_dto_2.AdminFetchMessageDto
    }),
    (0, swagger_1.ApiUnauthorizedResponse)({ description: K.ERROR_CODES.UNAUTHORIZED.message }),
    (0, swagger_1.ApiNotFoundResponse)({ description: 'Id not found' }),
    (0, swagger_1.ApiInternalServerErrorResponse)({
        description: K.ERROR_CODES.DEFAULT.message
    }),
    (0, swagger_1.ApiBadRequestResponse)({ description: 'Invalid Id' }),
    __param(0, (0, common_1.Param)('id', new common_1.ParseIntPipe())),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [Number]),
    __metadata("design:returntype", rxjs_1.Observable)
], AdminController.prototype, "fetchAdminProfile", null);
__decorate([
    (0, common_1.Get)('store-admin'),
    (0, roles_decorator_1.Roles)(roles_dto_1.UserRoles.SUPER_ADMIN),
    (0, swagger_1.ApiBearerAuth)(),
    (0, swagger_1.ApiOperation)({ description: 'Get all store admin details' }),
    (0, common_1.UsePipes)(new validation_pipe_1.CustomValidationPipe()),
    (0, swagger_1.ApiOkResponse)({
        description: 'Successfully collected',
        type: admin_dto_2.FetchAllStoreAdminMessageDto
    }),
    (0, swagger_1.ApiUnauthorizedResponse)({ description: K.ERROR_CODES.UNAUTHORIZED.message }),
    (0, swagger_1.ApiInternalServerErrorResponse)({
        description: K.ERROR_CODES.DEFAULT.message
    }),
    (0, swagger_1.ApiBadRequestResponse)({ description: K.ERROR_CODES.BADREQUEST.message }),
    __param(0, (0, common_1.Query)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [admin_dto_2.FetchAllStoreAdminPaginationDTO]),
    __metadata("design:returntype", rxjs_1.Observable)
], AdminController.prototype, "getAllStoreAdminDetails", null);
__decorate([
    (0, common_1.Post)('store-admin'),
    (0, roles_decorator_1.Roles)(roles_dto_1.UserRoles.SUPER_ADMIN),
    (0, swagger_1.ApiOperation)({ description: 'Invite store admin' }),
    (0, swagger_1.ApiOkResponse)({ description: 'Successfully invited', type: message_dto_1.MessageDto }),
    (0, swagger_1.ApiUnauthorizedResponse)({ description: K.ERROR_CODES.UNAUTHORIZED.message }),
    (0, swagger_1.ApiInternalServerErrorResponse)({
        description: K.ERROR_CODES.DEFAULT.message
    }),
    (0, swagger_1.ApiBadRequestResponse)({ description: 'Invalid Id' }),
    __param(0, (0, common_1.Body)()),
    __param(1, (0, jwt_decorator_1.JwtBody)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [store_dto_1.StoreAdminInviteDto, Object]),
    __metadata("design:returntype", void 0)
], AdminController.prototype, "inviteStoreAdmin", null);
__decorate([
    (0, common_1.Patch)('store-admin/profile/:id'),
    (0, roles_decorator_1.Roles)(roles_dto_1.UserRoles.SUPER_ADMIN),
    (0, common_1.HttpCode)(200),
    (0, swagger_1.ApiBody)({ type: admin_dto_2.StoreAdminUpdateDto }),
    (0, swagger_1.ApiBearerAuth)(),
    (0, swagger_1.ApiOperation)({ description: 'Update profile for store-admin' }),
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
    __metadata("design:paramtypes", [Number, admin_dto_2.StoreAdminUpdateDto, Object]),
    __metadata("design:returntype", rxjs_1.Observable)
], AdminController.prototype, "storeAdminProfileUpdate", null);
__decorate([
    (0, common_1.Get)('store-admin/profile/:id'),
    (0, roles_decorator_1.Roles)(roles_dto_1.UserRoles.SUPER_ADMIN),
    (0, swagger_1.ApiBearerAuth)(),
    (0, swagger_1.ApiOperation)({ description: 'View profile for store admin' }),
    (0, swagger_1.ApiOkResponse)({
        description: 'Successfully Fetched',
        type: admin_dto_2.MessageAdminFetchDto
    }),
    (0, swagger_1.ApiUnauthorizedResponse)({ description: K.ERROR_CODES.UNAUTHORIZED.message }),
    (0, swagger_1.ApiNotFoundResponse)({ description: 'Id not found' }),
    (0, swagger_1.ApiInternalServerErrorResponse)({
        description: K.ERROR_CODES.DEFAULT.message
    }),
    (0, swagger_1.ApiBadRequestResponse)({ description: 'Invalid Id' }),
    __param(0, (0, common_1.Param)('id', new common_1.ParseIntPipe())),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [Number]),
    __metadata("design:returntype", rxjs_1.Observable)
], AdminController.prototype, "fetchStoreAdminProfile", null);
__decorate([
    (0, common_1.Delete)('store-admin'),
    (0, roles_decorator_1.Roles)(roles_dto_1.UserRoles.SUPER_ADMIN),
    (0, swagger_1.ApiBearerAuth)(),
    (0, swagger_1.ApiOperation)({ description: 'Bulk delete store admin details' }),
    (0, common_1.UsePipes)(new validation_pipe_1.CustomValidationPipe()),
    (0, swagger_1.ApiOkResponse)({
        description: 'Successfully deleted',
        type: message_dto_1.MessageDto
    }),
    (0, swagger_1.ApiUnauthorizedResponse)({ description: K.ERROR_CODES.UNAUTHORIZED.message }),
    (0, swagger_1.ApiInternalServerErrorResponse)({
        description: K.ERROR_CODES.DEFAULT.message
    }),
    (0, swagger_1.ApiBadRequestResponse)({ description: K.ERROR_CODES.BADREQUEST.message }),
    __param(0, (0, common_1.Body)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [admin_dto_2.DeleteStoreAdminDto]),
    __metadata("design:returntype", rxjs_1.Observable)
], AdminController.prototype, "deleteStoreAdminDetails", null);
__decorate([
    (0, common_1.Patch)('offer/:id'),
    (0, roles_decorator_1.Roles)(roles_dto_1.UserRoles.SUPER_ADMIN),
    (0, common_1.UsePipes)(new validation_pipe_1.CustomValidationPipe()),
    (0, swagger_1.ApiOperation)({ description: 'To edit offer' }),
    (0, swagger_1.ApiBody)({ type: admin_dto_2.UpdateOffer }),
    (0, swagger_1.ApiOkResponse)({
        description: K.ERROR_CODES.UPDATED.message,
        type: message_dto_1.MessageDto
    }),
    (0, swagger_1.ApiUnauthorizedResponse)({ description: K.ERROR_CODES.UNAUTHORIZED.message }),
    (0, swagger_1.ApiInternalServerErrorResponse)({
        description: K.ERROR_CODES.DEFAULT.message
    }),
    (0, swagger_1.ApiBadRequestResponse)({ description: K.ERROR_CODES.BADREQUEST.message }),
    __param(0, (0, common_1.Body)()),
    __param(1, (0, common_1.Param)('id', new common_1.ParseIntPipe())),
    __param(2, (0, jwt_decorator_1.JwtBody)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [admin_dto_2.UpdateOffer, Number, Object]),
    __metadata("design:returntype", rxjs_1.Observable)
], AdminController.prototype, "updateOfferDetails", null);
__decorate([
    (0, common_1.Get)('offer/:id'),
    (0, roles_decorator_1.Roles)(roles_dto_1.UserRoles.SUPER_ADMIN, roles_dto_1.UserRoles.STORE_ADMIN),
    (0, swagger_1.ApiBearerAuth)(),
    (0, swagger_1.ApiOperation)({ description: 'Functionality for fetching offer detail' }),
    (0, common_1.UsePipes)(new validation_pipe_1.CustomValidationPipe()),
    (0, swagger_1.ApiOkResponse)({
        description: 'Successfully Collected offer Details',
        type: admin_dto_2.OfferFetchMessageDto
    }),
    (0, swagger_1.ApiUnauthorizedResponse)({ description: K.ERROR_CODES.UNAUTHORIZED.message }),
    (0, swagger_1.ApiInternalServerErrorResponse)({
        description: K.ERROR_CODES.DEFAULT.message
    }),
    (0, swagger_1.ApiBadRequestResponse)({ description: K.ERROR_CODES.BADREQUEST.message }),
    __param(0, (0, common_1.Param)('id', new common_1.ParseIntPipe())),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [Number]),
    __metadata("design:returntype", rxjs_1.Observable)
], AdminController.prototype, "getofferDetails", null);
__decorate([
    (0, common_1.Post)('offer'),
    (0, roles_decorator_1.Roles)(roles_dto_1.UserRoles.SUPER_ADMIN),
    (0, common_1.UsePipes)(new validation_pipe_1.CustomValidationPipe()),
    (0, swagger_1.ApiOperation)({ description: 'To create offer' }),
    (0, swagger_1.ApiBody)({ type: admin_dto_2.CreateOffer }),
    (0, swagger_1.ApiOkResponse)({
        description: K.ERROR_CODES.Created.message,
        type: message_dto_1.MessageDto
    }),
    (0, swagger_1.ApiUnauthorizedResponse)({ description: K.ERROR_CODES.UNAUTHORIZED.message }),
    (0, swagger_1.ApiInternalServerErrorResponse)({
        description: K.ERROR_CODES.DEFAULT.message
    }),
    (0, swagger_1.ApiBadRequestResponse)({ description: K.ERROR_CODES.BADREQUEST.message }),
    __param(0, (0, common_1.Body)()),
    __param(1, (0, jwt_decorator_1.JwtBody)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [admin_dto_2.CreateOffer, Object]),
    __metadata("design:returntype", rxjs_1.Observable)
], AdminController.prototype, "createOfferDtails", null);
__decorate([
    (0, common_1.Delete)('offer/:id'),
    (0, roles_decorator_1.Roles)(roles_dto_1.UserRoles.SUPER_ADMIN),
    (0, swagger_1.ApiBearerAuth)(),
    (0, swagger_1.ApiOperation)({ description: 'Functionality for deleting offer' }),
    (0, common_1.UsePipes)(new validation_pipe_1.CustomValidationPipe()),
    (0, swagger_1.ApiOkResponse)({
        description: K.ERROR_CODES.DELETE.message,
        type: message_dto_1.MessageDto
    }),
    (0, swagger_1.ApiUnauthorizedResponse)({ description: K.ERROR_CODES.UNAUTHORIZED.message }),
    (0, swagger_1.ApiInternalServerErrorResponse)({
        description: K.ERROR_CODES.DEFAULT.message
    }),
    (0, swagger_1.ApiBadRequestResponse)({ description: K.ERROR_CODES.BADREQUEST.message }),
    __param(0, (0, common_1.Param)('id', new common_1.ParseIntPipe())),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [Number]),
    __metadata("design:returntype", rxjs_1.Observable)
], AdminController.prototype, "deleteOffer", null);
__decorate([
    (0, common_1.Get)('offer'),
    (0, roles_decorator_1.Roles)(roles_dto_1.UserRoles.SUPER_ADMIN),
    (0, swagger_1.ApiBearerAuth)(),
    (0, swagger_1.ApiOperation)({ description: 'View offers list for store admin' }),
    (0, swagger_1.ApiOkResponse)({
        description: 'Successfully Fetched',
        type: offer_dto_1.OfferListResponseDto
    }),
    (0, swagger_1.ApiUnauthorizedResponse)({ description: K.ERROR_CODES.UNAUTHORIZED.message }),
    (0, swagger_1.ApiInternalServerErrorResponse)({
        description: K.ERROR_CODES.DEFAULT.message
    }),
    (0, swagger_1.ApiBadRequestResponse)({ description: K.ERROR_CODES.BADREQUEST.message }),
    __param(0, (0, common_1.Query)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [offer_dto_1.OfferListParamDto]),
    __metadata("design:returntype", rxjs_1.Observable)
], AdminController.prototype, "fetchOfferList", null);
__decorate([
    (0, common_1.Post)('section'),
    (0, roles_decorator_1.Roles)(roles_dto_1.UserRoles.SUPER_ADMIN),
    (0, common_1.HttpCode)(200),
    (0, common_1.UsePipes)(new validation_pipe_1.CustomValidationPipe({ transform: true })),
    (0, swagger_1.ApiBody)({ type: section_dto_1.CreateSectionDto }),
    (0, swagger_1.ApiBearerAuth)(),
    (0, swagger_1.ApiOperation)({ description: 'Create new Section' }),
    (0, swagger_1.ApiOkResponse)({
        description: K.ERROR_CODES.Created.message,
        type: section_dto_1.SectionMessageDto
    }),
    (0, swagger_1.ApiUnauthorizedResponse)({ description: K.ERROR_CODES.UNAUTHORIZED.message }),
    (0, swagger_1.ApiInternalServerErrorResponse)({
        description: K.ERROR_CODES.DEFAULT.message
    }),
    (0, swagger_1.ApiBadRequestResponse)({ description: K.ERROR_CODES.BADREQUEST.message }),
    __param(0, (0, common_1.Body)()),
    __param(1, (0, jwt_decorator_1.JwtBody)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [section_dto_1.CreateSectionDto, Object]),
    __metadata("design:returntype", rxjs_1.Observable)
], AdminController.prototype, "createSection", null);
__decorate([
    (0, common_1.Delete)('section/:sectionId'),
    (0, roles_decorator_1.Roles)(roles_dto_1.UserRoles.SUPER_ADMIN),
    (0, swagger_1.ApiBearerAuth)(),
    (0, swagger_1.ApiOperation)({ description: 'Delete section' }),
    (0, swagger_1.ApiOkResponse)({
        description: 'Successfully deleted',
        type: section_dto_1.SectionMessageDto
    }),
    (0, swagger_1.ApiUnauthorizedResponse)({
        description: K.ERROR_CODES.UNAUTHORIZED.message
    }),
    (0, swagger_1.ApiInternalServerErrorResponse)({
        description: K.ERROR_CODES.DEFAULT.message
    }),
    (0, swagger_1.ApiBadRequestResponse)({ description: 'Invalid id' }),
    __param(0, (0, common_1.Param)('sectionId', common_1.ParseIntPipe)),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [Number]),
    __metadata("design:returntype", rxjs_1.Observable)
], AdminController.prototype, "deleteSection", null);
__decorate([
    (0, common_1.Patch)('section/:sectionId'),
    (0, roles_decorator_1.Roles)(roles_dto_1.UserRoles.SUPER_ADMIN),
    (0, common_1.UsePipes)(new validation_pipe_1.CustomValidationPipe({ transform: true })),
    (0, swagger_1.ApiBearerAuth)(),
    (0, swagger_1.ApiOperation)({ description: 'Update section' }),
    (0, swagger_1.ApiBody)({ type: section_dto_1.UpdateSectionDto }),
    (0, swagger_1.ApiOkResponse)({
        description: K.ERROR_CODES.UPDATED.message,
        type: section_dto_1.SectionMessageDto
    }),
    (0, swagger_1.ApiUnauthorizedResponse)({
        description: K.ERROR_CODES.UNAUTHORIZED.message
    }),
    (0, swagger_1.ApiInternalServerErrorResponse)({
        description: K.ERROR_CODES.DEFAULT.message
    }),
    (0, swagger_1.ApiBadRequestResponse)({ description: 'Invalid id' }),
    __param(0, (0, common_1.Param)('sectionId', common_1.ParseIntPipe)),
    __param(1, (0, common_1.Body)()),
    __param(2, (0, jwt_decorator_1.JwtBody)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [Number, section_dto_1.UpdateSectionDto, Object]),
    __metadata("design:returntype", rxjs_1.Observable)
], AdminController.prototype, "updateSection", null);
__decorate([
    (0, common_1.Get)('offer/:offerId/product'),
    (0, roles_decorator_1.Roles)(roles_dto_1.UserRoles.SUPER_ADMIN, roles_dto_1.UserRoles.STORE_ADMIN),
    (0, swagger_1.ApiBearerAuth)(),
    (0, swagger_1.ApiOperation)({ description: 'View products under a single offer' }),
    (0, swagger_1.ApiOkResponse)({
        description: 'Successfully fetched single offer product list',
        type: admin_dto_1.SingleOfferProductListResponseDto
    }),
    (0, swagger_1.ApiUnauthorizedResponse)({ description: K.ERROR_CODES.UNAUTHORIZED.message }),
    (0, swagger_1.ApiInternalServerErrorResponse)({
        description: K.ERROR_CODES.DEFAULT.message
    }),
    (0, swagger_1.ApiBadRequestResponse)({ description: K.ERROR_CODES.BADREQUEST.message }),
    __param(0, (0, common_1.Param)('offerId', new common_1.ParseIntPipe())),
    __param(1, (0, common_1.Query)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [Number, admin_dto_1.SingleOfferProductListPaginationDto]),
    __metadata("design:returntype", rxjs_1.Observable)
], AdminController.prototype, "singleOfferProductList", null);
__decorate([
    (0, common_1.Post)('offer/product'),
    (0, roles_decorator_1.Roles)(roles_dto_1.UserRoles.SUPER_ADMIN),
    (0, common_1.UsePipes)(new validation_pipe_1.CustomValidationPipe()),
    (0, swagger_1.ApiOperation)({ description: 'Assign offer to products' }),
    (0, swagger_1.ApiBody)({ type: admin_dto_1.SingleOfferProductAssignDto }),
    (0, swagger_1.ApiOkResponse)({
        description: K.ERROR_CODES.Created.message,
        type: message_dto_1.MessageDto
    }),
    (0, swagger_1.ApiUnauthorizedResponse)({ description: K.ERROR_CODES.UNAUTHORIZED.message }),
    (0, swagger_1.ApiInternalServerErrorResponse)({
        description: K.ERROR_CODES.DEFAULT.message
    }),
    (0, swagger_1.ApiBadRequestResponse)({ description: K.ERROR_CODES.BADREQUEST.message }),
    __param(0, (0, common_1.Body)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [admin_dto_1.SingleOfferProductAssignDto]),
    __metadata("design:returntype", rxjs_1.Observable)
], AdminController.prototype, "singleOfferProductAssign", null);
__decorate([
    (0, common_1.Delete)('offer/:offerId/product/:productId'),
    (0, roles_decorator_1.Roles)(roles_dto_1.UserRoles.SUPER_ADMIN),
    (0, common_1.UsePipes)(new validation_pipe_1.CustomValidationPipe()),
    (0, swagger_1.ApiOperation)({ description: 'Unassign product from an offer' }),
    (0, swagger_1.ApiOkResponse)({
        description: 'Successfully unassigned product',
        type: message_dto_1.MessageDto
    }),
    (0, swagger_1.ApiUnauthorizedResponse)({ description: K.ERROR_CODES.UNAUTHORIZED.message }),
    (0, swagger_1.ApiInternalServerErrorResponse)({
        description: K.ERROR_CODES.DEFAULT.message
    }),
    (0, swagger_1.ApiBadRequestResponse)({ description: K.ERROR_CODES.BADREQUEST.message }),
    __param(0, (0, common_1.Param)('offerId', new common_1.ParseIntPipe())),
    __param(1, (0, common_1.Param)('productId', new common_1.ParseIntPipe())),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [Number, Number]),
    __metadata("design:returntype", rxjs_1.Observable)
], AdminController.prototype, "singleOfferProductUnassign", null);
__decorate([
    (0, common_1.Patch)(':adminId/update-password'),
    (0, roles_decorator_1.Roles)(roles_dto_1.UserRoles.STORE_ADMIN, roles_dto_1.UserRoles.SUPER_ADMIN),
    (0, common_1.UsePipes)(new validation_pipe_1.CustomValidationPipe({ transform: true })),
    (0, common_1.HttpCode)(200),
    (0, swagger_1.ApiBearerAuth)(),
    (0, swagger_1.ApiBody)({ type: admin_dto_1.AdminPasswordUpdateDto }),
    (0, swagger_1.ApiOperation)({ description: 'Update password for admin' }),
    (0, swagger_1.ApiOkResponse)({
        description: K.ERROR_CODES.UPDATED.message,
        type: message_dto_1.MessageDto
    }),
    (0, swagger_1.ApiUnauthorizedResponse)({ description: K.ERROR_CODES.UNAUTHORIZED.message }),
    (0, swagger_1.ApiInternalServerErrorResponse)({
        description: K.ERROR_CODES.DEFAULT.message
    }),
    __param(0, (0, common_1.Param)('adminId', common_1.ParseIntPipe)),
    __param(1, (0, jwt_decorator_1.JwtBody)()),
    __param(2, (0, common_1.Body)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [Number, Object, admin_dto_1.AdminPasswordUpdateDto]),
    __metadata("design:returntype", Promise)
], AdminController.prototype, "adminPasswordUpdate", null);
AdminController = __decorate([
    (0, swagger_1.ApiTags)('Admin'),
    (0, common_1.Controller)('admin'),
    __metadata("design:paramtypes", [admin_service_1.AdminService])
], AdminController);
exports.AdminController = AdminController;
//# sourceMappingURL=admin.controller.js.map