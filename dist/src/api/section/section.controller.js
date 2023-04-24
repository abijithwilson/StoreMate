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
exports.SectionController = void 0;
const common_1 = require("@nestjs/common");
const swagger_1 = require("@nestjs/swagger");
const validation_pipe_1 = require("../../pipes/validation-pipe");
const jwt_decorator_1 = require("../../decorator/jwt.decorator");
const section_dto_1 = require("../dto/section.dto");
const section_service_1 = require("./section.service");
const K = require("../../shared/constants");
const rxjs_1 = require("rxjs");
const product_dto_1 = require("../dto/product.dto");
const roles_decorator_1 = require("../../decorator/roles.decorator");
const roles_dto_1 = require("../dto/roles.dto");
let SectionController = class SectionController {
    constructor(sectionService) {
        this.sectionService = sectionService;
    }
    assignSection(body, storeId) {
        return this.sectionService.assignSection(body, storeId);
    }
    unAssignSection(sectionId, storeId, jwtBody) {
        return this.sectionService.unAssignSection(sectionId, storeId, jwtBody);
    }
    getSectionAndSectionNotListedInStore(queryParam, jwtBody) {
        return this.sectionService.getSectionAndSectionNotListedInStore(queryParam, jwtBody);
    }
    updateSection(sectionId, storeId, body, jwtBody) {
        return this.sectionService.updateSection(sectionId, storeId, jwtBody, body);
    }
    getStoreSectionDetails(storeId, param, jwtBody) {
        return this.sectionService.getStoreSectionDetails(storeId, param, jwtBody);
    }
    assignProductToSection(storeId, sectionId, body, jwtBody) {
        return this.sectionService.assignProductToSection(storeId, sectionId, body, jwtBody);
    }
    getStoreAssignedSectionDetails(storeId, jwtBody, param) {
        return this.sectionService.getStoreAssignedSectionDetails(storeId, param, jwtBody);
    }
    getDetailsOfProductInASection(storeId, productId, sectionId, param, jwtBody) {
        return this.sectionService.getDetailsOfAProductInASection(sectionId, productId, storeId, param, jwtBody);
    }
    sectionWiseProductUnassign(storeId, sectionId, productId, jwtBody) {
        return this.sectionService.sectionWiseProductUnassign(storeId, sectionId, productId, jwtBody);
    }
    getListOfUnAssignedProductsToAnySection(storeId, jwtBody) {
        return this.sectionService.getListOfProductsNotAssignedToAnySection(storeId, jwtBody);
    }
    fetchSectionWiseCategoryList(storeId, sectionId, param) {
        return this.sectionService.fetchSectionWiseCategoryList(storeId, sectionId, param);
    }
    fetchSectionWiseOfferList(storeId, sectionId, param) {
        return this.sectionService.fetchSectionWiseOfferList(storeId, sectionId, param);
    }
    fetchWishlistProducts(storeId, sectionId, param, jwtBody) {
        return this.sectionService.fetchWishlistProducts(storeId, sectionId, param, jwtBody);
    }
    fetchProductFilterData(storeId, sectionId, param, jwtBody) {
        return this.sectionService.fetchProductFilterData(storeId, sectionId, param, jwtBody);
    }
    assignProductsToWishlist(body, jwtBody) {
        return this.sectionService.assignProductsToWishlist(body, jwtBody);
    }
    unassignProductFromWishlist(storeId, productId, jwtBody) {
        return this.sectionService.unassignProductFromWishlist(storeId, productId, jwtBody);
    }
    fetchSectionVisitData(storeId, param, jwtBody) {
        return this.sectionService.fetchSectionVisitData(storeId, param, jwtBody);
    }
};
__decorate([
    (0, common_1.Post)(':storeId/section'),
    (0, roles_decorator_1.Roles)(roles_dto_1.UserRoles.STORE_ADMIN),
    (0, common_1.HttpCode)(200),
    (0, common_1.UsePipes)(new validation_pipe_1.CustomValidationPipe({ transform: true })),
    (0, swagger_1.ApiBody)({ type: section_dto_1.AssignSectionDto }),
    (0, swagger_1.ApiBearerAuth)(),
    (0, swagger_1.ApiOperation)({ description: 'Assign new section to store' }),
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
    __param(1, (0, common_1.Param)('storeId', common_1.ParseIntPipe)),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [section_dto_1.AssignSectionDto, Number]),
    __metadata("design:returntype", rxjs_1.Observable)
], SectionController.prototype, "assignSection", null);
__decorate([
    (0, common_1.Delete)(':storeId/section/:sectionId'),
    (0, roles_decorator_1.Roles)(roles_dto_1.UserRoles.STORE_ADMIN, roles_dto_1.UserRoles.SUPER_ADMIN),
    (0, swagger_1.ApiBearerAuth)(),
    (0, swagger_1.ApiOperation)({ description: 'Unassign section' }),
    (0, swagger_1.ApiOkResponse)({
        description: 'Unasssign Section deleted',
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
    __param(1, (0, common_1.Param)('storeId', common_1.ParseIntPipe)),
    __param(2, (0, jwt_decorator_1.JwtBody)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [Number, Number, Object]),
    __metadata("design:returntype", Promise)
], SectionController.prototype, "unAssignSection", null);
__decorate([
    (0, common_1.Get)('section'),
    (0, roles_decorator_1.Roles)(roles_dto_1.UserRoles.SUPER_ADMIN, roles_dto_1.UserRoles.STORE_ADMIN),
    (0, swagger_1.ApiBearerAuth)(),
    (0, swagger_1.ApiOperation)({
        description: `Fetch section Listed by super admin or fetch
       section not listed under store`
    }),
    (0, swagger_1.ApiOkResponse)({
        description: 'Successfully fetched.',
        type: section_dto_1.SectionFetchDto
    }),
    (0, swagger_1.ApiUnauthorizedResponse)({
        description: K.ERROR_CODES.UNAUTHORIZED.message
    }),
    (0, swagger_1.ApiInternalServerErrorResponse)({
        description: K.ERROR_CODES.DEFAULT.message
    }),
    (0, swagger_1.ApiBadRequestResponse)({ description: K.ERROR_CODES.BADREQUEST.message }),
    __param(0, (0, common_1.Query)()),
    __param(1, (0, jwt_decorator_1.JwtBody)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [section_dto_1.SectionQueryDto, Object]),
    __metadata("design:returntype", rxjs_1.Observable)
], SectionController.prototype, "getSectionAndSectionNotListedInStore", null);
__decorate([
    (0, common_1.Patch)(':storeId/section/:sectionId'),
    (0, roles_decorator_1.Roles)(roles_dto_1.UserRoles.STORE_ADMIN),
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
    __param(1, (0, common_1.Param)('storeId', common_1.ParseIntPipe)),
    __param(2, (0, common_1.Body)()),
    __param(3, (0, jwt_decorator_1.JwtBody)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [Number, Number, section_dto_1.UpdateSectionDto, Object]),
    __metadata("design:returntype", Promise)
], SectionController.prototype, "updateSection", null);
__decorate([
    (0, common_1.Get)(':storeId/section'),
    (0, roles_decorator_1.Roles)(roles_dto_1.UserRoles.STORE_ADMIN, roles_dto_1.UserRoles.SUPER_ADMIN, roles_dto_1.UserRoles.USER),
    (0, swagger_1.ApiBearerAuth)(),
    (0, swagger_1.ApiOperation)({ description: 'Fetch store wise section list.' }),
    (0, swagger_1.ApiOkResponse)({
        description: 'Successfully fetched store wise section list.',
        type: section_dto_1.StoreWiseSectionResponseDto
    }),
    (0, swagger_1.ApiUnauthorizedResponse)({
        description: K.ERROR_CODES.UNAUTHORIZED.message
    }),
    (0, swagger_1.ApiInternalServerErrorResponse)({
        description: K.ERROR_CODES.DEFAULT.message
    }),
    (0, swagger_1.ApiBadRequestResponse)({ description: 'Invalid id' }),
    __param(0, (0, common_1.Param)('storeId', common_1.ParseIntPipe)),
    __param(1, (0, common_1.Query)()),
    __param(2, (0, jwt_decorator_1.JwtBody)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [Number, section_dto_1.FetchStoreWiseSectionsPaginationDto, Object]),
    __metadata("design:returntype", Promise)
], SectionController.prototype, "getStoreSectionDetails", null);
__decorate([
    (0, common_1.Patch)(':storeId/section/:sectionId/product/assign'),
    (0, roles_decorator_1.Roles)(roles_dto_1.UserRoles.STORE_ADMIN),
    (0, common_1.UsePipes)(new validation_pipe_1.CustomValidationPipe({ transform: true })),
    (0, swagger_1.ApiBearerAuth)(),
    (0, swagger_1.ApiBody)({ type: section_dto_1.AssignProductSectionDto }),
    (0, swagger_1.ApiOperation)({ description: 'Assigning product to particular section' }),
    (0, swagger_1.ApiOkResponse)({
        description: 'Successfully assigned',
        type: section_dto_1.SectionMessageDto
    }),
    (0, swagger_1.ApiUnauthorizedResponse)({
        description: K.ERROR_CODES.UNAUTHORIZED.message
    }),
    (0, swagger_1.ApiInternalServerErrorResponse)({
        description: K.ERROR_CODES.DEFAULT.message
    }),
    (0, swagger_1.ApiBadRequestResponse)({ description: 'Invalid id' }),
    __param(0, (0, common_1.Param)('storeId', common_1.ParseIntPipe)),
    __param(1, (0, common_1.Param)('sectionId', common_1.ParseIntPipe)),
    __param(2, (0, common_1.Body)()),
    __param(3, (0, jwt_decorator_1.JwtBody)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [Number, Number, section_dto_1.AssignProductSectionDto, Object]),
    __metadata("design:returntype", Promise)
], SectionController.prototype, "assignProductToSection", null);
__decorate([
    (0, common_1.Get)(':storeId/assigned-section'),
    (0, roles_decorator_1.Roles)(roles_dto_1.UserRoles.STORE_ADMIN),
    (0, swagger_1.ApiBearerAuth)(),
    (0, swagger_1.ApiOperation)({ description: 'Fetch store wise section list.' }),
    (0, swagger_1.ApiOkResponse)({
        description: 'Successfully fetched store wise section list.',
        type: section_dto_1.MessageSectionDropDownList
    }),
    (0, swagger_1.ApiUnauthorizedResponse)({
        description: K.ERROR_CODES.UNAUTHORIZED.message
    }),
    (0, swagger_1.ApiInternalServerErrorResponse)({
        description: K.ERROR_CODES.DEFAULT.message
    }),
    (0, swagger_1.ApiBadRequestResponse)({ description: 'Invalid id' }),
    __param(0, (0, common_1.Param)('storeId', common_1.ParseIntPipe)),
    __param(1, (0, jwt_decorator_1.JwtBody)()),
    __param(2, (0, common_1.Query)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [Number, Object, section_dto_1.SectionUnderStoreQueryParam]),
    __metadata("design:returntype", Promise)
], SectionController.prototype, "getStoreAssignedSectionDetails", null);
__decorate([
    (0, common_1.Get)(':storeId/section/:sectionId/product/:productId'),
    (0, roles_decorator_1.Roles)(roles_dto_1.UserRoles.USER),
    (0, swagger_1.ApiBearerAuth)(),
    (0, swagger_1.ApiOperation)({ description: 'Get details of a product in a section' }),
    (0, swagger_1.ApiOkResponse)({
        description: 'Successfully fetched',
        type: product_dto_1.FetchSingleProductDetailsResponseDto
    }),
    (0, swagger_1.ApiUnauthorizedResponse)({ description: K.ERROR_CODES.UNAUTHORIZED.message }),
    (0, swagger_1.ApiInternalServerErrorResponse)({
        description: K.ERROR_CODES.DEFAULT.message
    }),
    (0, swagger_1.ApiBadRequestResponse)({ description: K.ERROR_CODES.BADREQUEST.message }),
    __param(0, (0, common_1.Param)('storeId', new common_1.ParseIntPipe())),
    __param(1, (0, common_1.Param)('productId', new common_1.ParseIntPipe())),
    __param(2, (0, common_1.Param)('sectionId', new common_1.ParseIntPipe())),
    __param(3, (0, common_1.Query)()),
    __param(4, (0, jwt_decorator_1.JwtBody)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [Number, Number, Number, product_dto_1.FetchSingleColourAndSizeSkuDetails, Object]),
    __metadata("design:returntype", rxjs_1.Observable)
], SectionController.prototype, "getDetailsOfProductInASection", null);
__decorate([
    (0, common_1.Patch)(':storeId/section/:sectionId/product/:productId/unassign'),
    (0, roles_decorator_1.Roles)(roles_dto_1.UserRoles.STORE_ADMIN),
    (0, common_1.UsePipes)(new validation_pipe_1.CustomValidationPipe({ transform: true })),
    (0, swagger_1.ApiBearerAuth)(),
    (0, swagger_1.ApiOperation)({ description: 'Unassign product from a section' }),
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
    __param(0, (0, common_1.Param)('storeId', common_1.ParseIntPipe)),
    __param(1, (0, common_1.Param)('sectionId', common_1.ParseIntPipe)),
    __param(2, (0, common_1.Param)('productId', common_1.ParseIntPipe)),
    __param(3, (0, jwt_decorator_1.JwtBody)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [Number, Number, Number, Object]),
    __metadata("design:returntype", Promise)
], SectionController.prototype, "sectionWiseProductUnassign", null);
__decorate([
    (0, common_1.Get)(':storeId/unAssignedProducts'),
    (0, roles_decorator_1.Roles)(roles_dto_1.UserRoles.STORE_ADMIN),
    (0, swagger_1.ApiBearerAuth)(),
    (0, swagger_1.ApiOperation)({
        description: 'Get list of products not assigned to any section'
    }),
    (0, swagger_1.ApiOkResponse)({
        description: 'Successfully fetched',
        type: product_dto_1.ProductFetchResponseDto
    }),
    (0, swagger_1.ApiUnauthorizedResponse)({ description: K.ERROR_CODES.UNAUTHORIZED.message }),
    (0, swagger_1.ApiInternalServerErrorResponse)({
        description: K.ERROR_CODES.DEFAULT.message
    }),
    (0, swagger_1.ApiBadRequestResponse)({ description: K.ERROR_CODES.BADREQUEST.message }),
    __param(0, (0, common_1.Param)('storeId', new common_1.ParseIntPipe())),
    __param(1, (0, jwt_decorator_1.JwtBody)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [Number, Object]),
    __metadata("design:returntype", Promise)
], SectionController.prototype, "getListOfUnAssignedProductsToAnySection", null);
__decorate([
    (0, common_1.Get)(':storeId/section/:sectionId/categories'),
    (0, roles_decorator_1.Roles)(roles_dto_1.UserRoles.USER),
    (0, swagger_1.ApiBearerAuth)(),
    (0, swagger_1.ApiOperation)({
        description: 'Get list of categories in a section'
    }),
    (0, swagger_1.ApiOkResponse)({
        description: 'Successfully fetched categories in a section',
        type: section_dto_1.FetchCategoryListResponseDto
    }),
    (0, swagger_1.ApiUnauthorizedResponse)({ description: K.ERROR_CODES.UNAUTHORIZED.message }),
    (0, swagger_1.ApiInternalServerErrorResponse)({
        description: K.ERROR_CODES.DEFAULT.message
    }),
    (0, swagger_1.ApiBadRequestResponse)({ description: K.ERROR_CODES.BADREQUEST.message }),
    __param(0, (0, common_1.Param)('storeId', new common_1.ParseIntPipe())),
    __param(1, (0, common_1.Param)('sectionId', new common_1.ParseIntPipe())),
    __param(2, (0, common_1.Query)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [Number, Number, section_dto_1.SectionWiseCategoriesPaginationDto]),
    __metadata("design:returntype", Promise)
], SectionController.prototype, "fetchSectionWiseCategoryList", null);
__decorate([
    (0, common_1.Get)(':storeId/section/:sectionId/offers'),
    (0, roles_decorator_1.Roles)(roles_dto_1.UserRoles.USER),
    (0, swagger_1.ApiBearerAuth)(),
    (0, swagger_1.ApiOperation)({
        description: 'Get list of offers in a section'
    }),
    (0, swagger_1.ApiOkResponse)({
        description: 'Successfully fetched offers in a section',
        type: section_dto_1.FetchOfferListResponseDto
    }),
    (0, swagger_1.ApiUnauthorizedResponse)({ description: K.ERROR_CODES.UNAUTHORIZED.message }),
    (0, swagger_1.ApiInternalServerErrorResponse)({
        description: K.ERROR_CODES.DEFAULT.message
    }),
    (0, swagger_1.ApiBadRequestResponse)({ description: K.ERROR_CODES.BADREQUEST.message }),
    __param(0, (0, common_1.Param)('storeId', new common_1.ParseIntPipe())),
    __param(1, (0, common_1.Param)('sectionId', new common_1.ParseIntPipe())),
    __param(2, (0, common_1.Query)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [Number, Number, section_dto_1.SectionWiseCategoriesPaginationDto]),
    __metadata("design:returntype", rxjs_1.Observable)
], SectionController.prototype, "fetchSectionWiseOfferList", null);
__decorate([
    (0, common_1.Get)(':storeId/section/:sectionId/wishlist'),
    (0, roles_decorator_1.Roles)(roles_dto_1.UserRoles.USER),
    (0, swagger_1.ApiBearerAuth)(),
    (0, swagger_1.ApiOperation)({
        description: 'Get list of products in wishlist'
    }),
    (0, swagger_1.ApiOkResponse)({
        description: 'Successfully fetched products in wishlist',
        type: section_dto_1.FetchWishlistProductsResponseDto
    }),
    (0, swagger_1.ApiUnauthorizedResponse)({ description: K.ERROR_CODES.UNAUTHORIZED.message }),
    (0, swagger_1.ApiInternalServerErrorResponse)({
        description: K.ERROR_CODES.DEFAULT.message
    }),
    (0, swagger_1.ApiBadRequestResponse)({ description: K.ERROR_CODES.BADREQUEST.message }),
    __param(0, (0, common_1.Param)('storeId', new common_1.ParseIntPipe())),
    __param(1, (0, common_1.Param)('sectionId', new common_1.ParseIntPipe())),
    __param(2, (0, common_1.Query)()),
    __param(3, (0, jwt_decorator_1.JwtBody)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [Number, Number, section_dto_1.FetchWishlistProductsPaginationDto, Object]),
    __metadata("design:returntype", rxjs_1.Observable)
], SectionController.prototype, "fetchWishlistProducts", null);
__decorate([
    (0, common_1.Get)(':storeId/section/:sectionId/filters'),
    (0, roles_decorator_1.Roles)(roles_dto_1.UserRoles.USER),
    (0, swagger_1.ApiBearerAuth)(),
    (0, swagger_1.ApiOperation)({
        description: 'Get filter data for product list'
    }),
    (0, swagger_1.ApiOkResponse)({
        description: 'Successfully fetched product filter data',
        type: section_dto_1.ProductFilterDataResponse
    }),
    (0, swagger_1.ApiUnauthorizedResponse)({ description: K.ERROR_CODES.UNAUTHORIZED.message }),
    (0, swagger_1.ApiInternalServerErrorResponse)({
        description: K.ERROR_CODES.DEFAULT.message
    }),
    (0, swagger_1.ApiBadRequestResponse)({ description: K.ERROR_CODES.BADREQUEST.message }),
    __param(0, (0, common_1.Param)('storeId', new common_1.ParseIntPipe())),
    __param(1, (0, common_1.Param)('sectionId', new common_1.ParseIntPipe())),
    __param(2, (0, common_1.Query)()),
    __param(3, (0, jwt_decorator_1.JwtBody)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [Number, Number, section_dto_1.FetchProductFilterData, Object]),
    __metadata("design:returntype", rxjs_1.Observable)
], SectionController.prototype, "fetchProductFilterData", null);
__decorate([
    (0, common_1.Post)('wishlist/assign'),
    (0, roles_decorator_1.Roles)(roles_dto_1.UserRoles.USER),
    (0, common_1.HttpCode)(200),
    (0, common_1.UsePipes)(new validation_pipe_1.CustomValidationPipe({ transform: true })),
    (0, swagger_1.ApiBody)({ type: section_dto_1.WishlistProductAssignDto }),
    (0, swagger_1.ApiBearerAuth)(),
    (0, swagger_1.ApiOperation)({ description: 'Assign products to user wishlist' }),
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
    __metadata("design:paramtypes", [section_dto_1.WishlistProductAssignDto, Object]),
    __metadata("design:returntype", Promise)
], SectionController.prototype, "assignProductsToWishlist", null);
__decorate([
    (0, common_1.Delete)(':storeId/product/:productId/wishlist/unassign'),
    (0, roles_decorator_1.Roles)(roles_dto_1.UserRoles.USER),
    (0, swagger_1.ApiBearerAuth)(),
    (0, swagger_1.ApiOperation)({ description: 'Unassign product from wishlist' }),
    (0, swagger_1.ApiOkResponse)({
        description: 'Successfully unassigned product from wishlist',
        type: section_dto_1.SectionMessageDto
    }),
    (0, swagger_1.ApiUnauthorizedResponse)({
        description: K.ERROR_CODES.UNAUTHORIZED.message
    }),
    (0, swagger_1.ApiInternalServerErrorResponse)({
        description: K.ERROR_CODES.DEFAULT.message
    }),
    (0, swagger_1.ApiBadRequestResponse)({ description: 'Invalid id' }),
    __param(0, (0, common_1.Param)('storeId', common_1.ParseIntPipe)),
    __param(1, (0, common_1.Param)('productId', common_1.ParseIntPipe)),
    __param(2, (0, jwt_decorator_1.JwtBody)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [Number, Number, Object]),
    __metadata("design:returntype", Promise)
], SectionController.prototype, "unassignProductFromWishlist", null);
__decorate([
    (0, common_1.Get)(':storeId/section/last-visited'),
    (0, roles_decorator_1.Roles)(roles_dto_1.UserRoles.USER),
    (0, swagger_1.ApiBearerAuth)(),
    (0, swagger_1.ApiOperation)({
        description: 'Get user section visit data'
    }),
    (0, swagger_1.ApiOkResponse)({
        description: 'Successfully fetched user section visit data',
        type: section_dto_1.SectionVisitDataResponseDto
    }),
    (0, swagger_1.ApiUnauthorizedResponse)({ description: K.ERROR_CODES.UNAUTHORIZED.message }),
    (0, swagger_1.ApiInternalServerErrorResponse)({
        description: K.ERROR_CODES.DEFAULT.message
    }),
    (0, swagger_1.ApiBadRequestResponse)({ description: K.ERROR_CODES.BADREQUEST.message }),
    __param(0, (0, common_1.Param)('storeId', new common_1.ParseIntPipe())),
    __param(1, (0, common_1.Query)()),
    __param(2, (0, jwt_decorator_1.JwtBody)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [Number, section_dto_1.SectionVisitParamDto, Object]),
    __metadata("design:returntype", rxjs_1.Observable)
], SectionController.prototype, "fetchSectionVisitData", null);
SectionController = __decorate([
    (0, common_1.Controller)('store'),
    (0, swagger_1.ApiTags)('Section'),
    __metadata("design:paramtypes", [section_service_1.SectionService])
], SectionController);
exports.SectionController = SectionController;
//# sourceMappingURL=section.controller.js.map