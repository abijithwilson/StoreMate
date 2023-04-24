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
exports.StoreController = void 0;
const store_dto_1 = require("./../dto/store.dto");
const common_1 = require("@nestjs/common");
const validation_pipe_1 = require("../../pipes/validation-pipe");
const store_dto_2 = require("../dto/store.dto");
const store_service_1 = require("./store.service");
const jwt_decorator_1 = require("../../decorator/jwt.decorator");
const swagger_1 = require("@nestjs/swagger");
const K = require("../../shared/constants");
const rxjs_1 = require("rxjs");
const product_dto_1 = require("../dto/product.dto");
const roles_decorator_1 = require("../../decorator/roles.decorator");
const roles_dto_1 = require("../dto/roles.dto");
const public_guard_1 = require("../../guards/public.guard");
const offer_dto_1 = require("../dto/offer.dto");
const store_admin_dto_1 = require("../dto/store-admin.dto");
let StoreController = class StoreController {
    constructor(storeService) {
        this.storeService = storeService;
    }
    createStore(createBody, jwtBody) {
        return this.storeService.createStore(createBody, jwtBody);
    }
    deleteStore(id) {
        return this.storeService.deleteStore(id);
    }
    getSingleStoreDetails(id) {
        return this.storeService.getSingleStoreDetails(id);
    }
    getStoreDetails(param) {
        return this.storeService.getStoreDetails(param);
    }
    updateStoreProfile(id, body, jwtBody) {
        return this.storeService.updateStoreProfile(id, body, jwtBody);
    }
    fetchStoreName(param) {
        return this.storeService.fetchStoreName(param);
    }
    viewNearbyStores(jwtBody, param) {
        return this.storeService.viewNearbyStores(jwtBody, param);
    }
    deleteRewardPoints(param) {
        return this.storeService.deleteRewardPoints(param);
    }
    viewStoreRewardDetails(jwtBody, param) {
        return this.storeService.viewStoreRewardDetails(jwtBody, param);
    }
    insertStoreRewardPoints(createBody, jwtBody) {
        return this.storeService.insertStoreRewardPoints(createBody, jwtBody);
    }
    updateStoreRewardPoints(updateBody, jwtBody) {
        return this.storeService.updateStoreRewardPoints(updateBody, jwtBody);
    }
    storeWithoutRewards() {
        return this.storeService.storeWithoutRewards();
    }
    updateSkuUnderStore(storeId, productId, jwtBody, body) {
        return this.storeService.updateSkuUnderStore(storeId, productId, jwtBody, body);
    }
    getSkuDetailUnderStore(storeId, productId, jwtBody) {
        return this.storeService.getSkuDetailUnderStore(storeId, productId, jwtBody);
    }
    fetchStoreWiseProductList(storeId, param, jwtBody) {
        return this.storeService.fetchStoreWiseProductList(storeId, param, jwtBody);
    }
    getProductAndSkuDetails(storeId, sectionId, param, jwtBody) {
        return this.storeService.getProductAndSkuDetails(storeId, sectionId, param, jwtBody);
    }
    assignOfferToStore(body) {
        return this.storeService.assignOfferToStore(body);
    }
    unAssignOfferToStore(body) {
        return this.storeService.unAssignOfferToStore(body);
    }
    fetchStoreList(param) {
        return this.storeService.fetchStoreList(param);
    }
    getofferDetails(param, storeId) {
        return this.storeService.getofferDetails(storeId, param);
    }
    fetchStoreDashboardData(storeId, jwtBody) {
        return this.storeService.fetchStoreDashboardData(storeId, jwtBody);
    }
    getStorePiechartDetails(storeId, param, jwtBody) {
        return this.storeService.getStorePiechartDetails(storeId, param, jwtBody);
    }
    getStoreBarchartDetails(storeId, param, jwtBody) {
        return this.storeService.getStoreBarchartDetails(storeId, param, jwtBody);
    }
    getStoreVistorsTimeDetails(storeId, param, jwtBody) {
        return this.storeService.getStoreVistorsTimeDetails(storeId, param, jwtBody);
    }
    getOfferWiseProductDetails(storeId, sectionId, offerId, param, jwtBody) {
        return this.storeService.getOfferWiseProductDetails(storeId, sectionId, offerId, param, jwtBody);
    }
    fetchProductFilterData() {
        return this.storeService.fetchStoreCountryData();
    }
    fetchStoreStateData(countryId) {
        return this.storeService.fetchStoreStateData(countryId);
    }
    fetchStoreDistrictData(stateId) {
        return this.storeService.fetchStoreDistrictData(stateId);
    }
    fetchLastVisitedStoresData(jwtBody, param) {
        return this.storeService.fetchLastVisitedStoresData(jwtBody, param);
    }
};
__decorate([
    (0, common_1.Post)(),
    (0, roles_decorator_1.Roles)(roles_dto_1.UserRoles.SUPER_ADMIN),
    (0, swagger_1.ApiBearerAuth)(),
    (0, swagger_1.ApiOperation)({ description: 'Create store' }),
    (0, swagger_1.ApiOkResponse)({ description: 'Successfully created', type: store_dto_1.MessageDto }),
    (0, swagger_1.ApiUnauthorizedResponse)({ description: K.ERROR_CODES.UNAUTHORIZED.message }),
    (0, swagger_1.ApiInternalServerErrorResponse)({
        description: K.ERROR_CODES.DEFAULT.message
    }),
    (0, swagger_1.ApiBadRequestResponse)({ description: 'Invalid data' }),
    __param(0, (0, common_1.Body)()),
    __param(1, (0, jwt_decorator_1.JwtBody)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [store_dto_2.StoreDto, Object]),
    __metadata("design:returntype", rxjs_1.Observable)
], StoreController.prototype, "createStore", null);
__decorate([
    (0, roles_decorator_1.Roles)(roles_dto_1.UserRoles.SUPER_ADMIN),
    (0, swagger_1.ApiBearerAuth)(),
    (0, swagger_1.ApiOperation)({ description: 'Delete store' }),
    (0, swagger_1.ApiOkResponse)({ description: 'Successfully deleted', type: store_dto_1.MessageDto }),
    (0, swagger_1.ApiUnauthorizedResponse)({
        description: K.ERROR_CODES.UNAUTHORIZED.message
    }),
    (0, swagger_1.ApiInternalServerErrorResponse)({
        description: K.ERROR_CODES.DEFAULT.message
    }),
    (0, swagger_1.ApiBadRequestResponse)({ description: 'Invalid id' }),
    (0, swagger_1.ApiNotFoundResponse)({ description: 'Store not found' }),
    (0, common_1.Delete)(':id'),
    __param(0, (0, common_1.Param)('id', common_1.ParseIntPipe)),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [Number]),
    __metadata("design:returntype", void 0)
], StoreController.prototype, "deleteStore", null);
__decorate([
    (0, common_1.Get)('single-store/:id'),
    (0, roles_decorator_1.Roles)(roles_dto_1.UserRoles.SUPER_ADMIN, roles_dto_1.UserRoles.STORE_ADMIN),
    (0, swagger_1.ApiBearerAuth)(),
    (0, swagger_1.ApiOperation)({ description: 'Get single store details' }),
    (0, common_1.UsePipes)(new validation_pipe_1.CustomValidationPipe()),
    (0, swagger_1.ApiOkResponse)({
        description: 'Successfully collected',
        type: store_dto_1.SingleStoreDetailsDto
    }),
    (0, swagger_1.ApiUnauthorizedResponse)({ description: K.ERROR_CODES.UNAUTHORIZED.message }),
    (0, swagger_1.ApiInternalServerErrorResponse)({
        description: K.ERROR_CODES.DEFAULT.message
    }),
    (0, swagger_1.ApiBadRequestResponse)({ description: K.ERROR_CODES.BADREQUEST.message }),
    __param(0, (0, common_1.Param)('id', common_1.ParseIntPipe)),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [Number]),
    __metadata("design:returntype", rxjs_1.Observable)
], StoreController.prototype, "getSingleStoreDetails", null);
__decorate([
    (0, common_1.Get)(),
    (0, roles_decorator_1.Roles)(roles_dto_1.UserRoles.SUPER_ADMIN),
    (0, swagger_1.ApiBearerAuth)(),
    (0, swagger_1.ApiOperation)({ description: 'Get all store details' }),
    (0, common_1.UsePipes)(new validation_pipe_1.CustomValidationPipe()),
    (0, swagger_1.ApiOkResponse)({
        description: 'Successfully collected',
        type: store_dto_1.StoreFetchResponseDto
    }),
    (0, swagger_1.ApiUnauthorizedResponse)({ description: K.ERROR_CODES.UNAUTHORIZED.message }),
    (0, swagger_1.ApiInternalServerErrorResponse)({
        description: K.ERROR_CODES.DEFAULT.message
    }),
    (0, swagger_1.ApiBadRequestResponse)({ description: K.ERROR_CODES.BADREQUEST.message }),
    __param(0, (0, common_1.Query)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [store_dto_2.FetchAllStorePagination]),
    __metadata("design:returntype", rxjs_1.Observable)
], StoreController.prototype, "getStoreDetails", null);
__decorate([
    (0, common_1.Patch)('profile/:id'),
    (0, roles_decorator_1.Roles)(roles_dto_1.UserRoles.SUPER_ADMIN),
    (0, common_1.UsePipes)(new validation_pipe_1.CustomValidationPipe()),
    (0, swagger_1.ApiBearerAuth)(),
    (0, swagger_1.ApiOperation)({ description: 'Update store details' }),
    (0, swagger_1.ApiBody)({ type: store_dto_2.StoreUpdateDto }),
    (0, swagger_1.ApiOkResponse)({ description: 'Successfully updated', type: store_dto_1.MessageDto }),
    (0, swagger_1.ApiUnauthorizedResponse)({ description: K.ERROR_CODES.UNAUTHORIZED.message }),
    (0, swagger_1.ApiInternalServerErrorResponse)({
        description: K.ERROR_CODES.DEFAULT.message
    }),
    (0, swagger_1.ApiBadRequestResponse)({ description: K.INVALID_ID }),
    __param(0, (0, common_1.Param)('id', common_1.ParseIntPipe)),
    __param(1, (0, common_1.Body)()),
    __param(2, (0, jwt_decorator_1.JwtBody)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [Number, store_dto_2.StoreUpdateDto, Object]),
    __metadata("design:returntype", rxjs_1.Observable)
], StoreController.prototype, "updateStoreProfile", null);
__decorate([
    (0, common_1.Get)('store-name'),
    (0, swagger_1.ApiOperation)({ description: 'Fetch store names' }),
    (0, swagger_1.ApiBody)({ type: store_dto_1.StoreNameFetchDto }),
    (0, common_1.UsePipes)(new validation_pipe_1.CustomValidationPipe()),
    (0, swagger_1.ApiOkResponse)({ description: 'Successfully fetched', type: store_dto_1.MessageDto }),
    (0, swagger_1.ApiInternalServerErrorResponse)({
        description: K.ERROR_CODES.DEFAULT.message
    }),
    (0, public_guard_1.Public)(),
    __param(0, (0, common_1.Query)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [store_dto_1.StoreNameFetchDto]),
    __metadata("design:returntype", rxjs_1.Observable)
], StoreController.prototype, "fetchStoreName", null);
__decorate([
    (0, common_1.Get)('nearby-stores'),
    (0, roles_decorator_1.Roles)(roles_dto_1.UserRoles.USER),
    (0, common_1.HttpCode)(200),
    (0, swagger_1.ApiBearerAuth)(),
    (0, swagger_1.ApiOperation)({ description: 'View nearby-stores of user' }),
    (0, swagger_1.ApiOkResponse)({
        description: 'Store details collected successfully',
        type: store_dto_1.NearbyStoreResultDto
    }),
    (0, swagger_1.ApiUnauthorizedResponse)({ description: K.ERROR_CODES.UNAUTHORIZED.message }),
    (0, swagger_1.ApiNotFoundResponse)({ description: 'Id not found' }),
    (0, swagger_1.ApiInternalServerErrorResponse)({
        description: K.ERROR_CODES.DEFAULT.message
    }),
    __param(0, (0, jwt_decorator_1.JwtBody)()),
    __param(1, (0, common_1.Query)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [Object, store_dto_2.NearbyStoreDto]),
    __metadata("design:returntype", rxjs_1.Observable)
], StoreController.prototype, "viewNearbyStores", null);
__decorate([
    (0, common_1.Delete)('reward-points'),
    (0, roles_decorator_1.Roles)(roles_dto_1.UserRoles.SUPER_ADMIN),
    (0, swagger_1.ApiBearerAuth)(),
    (0, swagger_1.ApiOperation)({ description: 'Bulk delete reward-points details' }),
    (0, common_1.UsePipes)(new validation_pipe_1.CustomValidationPipe()),
    (0, swagger_1.ApiOkResponse)({
        description: 'Successfully deleted',
        type: store_dto_1.MessageDto
    }),
    (0, swagger_1.ApiUnauthorizedResponse)({ description: K.ERROR_CODES.UNAUTHORIZED.message }),
    (0, swagger_1.ApiInternalServerErrorResponse)({
        description: K.ERROR_CODES.DEFAULT.message
    }),
    (0, swagger_1.ApiBadRequestResponse)({ description: K.ERROR_CODES.BADREQUEST.message }),
    __param(0, (0, common_1.Body)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [store_dto_1.DeleteRewardPointsDto]),
    __metadata("design:returntype", rxjs_1.Observable)
], StoreController.prototype, "deleteRewardPoints", null);
__decorate([
    (0, common_1.Get)('reward-points'),
    (0, roles_decorator_1.Roles)(roles_dto_1.UserRoles.SUPER_ADMIN),
    (0, common_1.HttpCode)(200),
    (0, swagger_1.ApiBearerAuth)(),
    (0, swagger_1.ApiOperation)({ description: 'View reward details of store' }),
    (0, swagger_1.ApiOkResponse)({
        description: 'Store reward details collected successfully',
        type: store_dto_1.RewardDetailsResponseDto
    }),
    (0, swagger_1.ApiUnauthorizedResponse)({ description: K.ERROR_CODES.UNAUTHORIZED.message }),
    (0, swagger_1.ApiNotFoundResponse)({ description: 'Id not found' }),
    (0, swagger_1.ApiInternalServerErrorResponse)({
        description: K.ERROR_CODES.DEFAULT.message
    }),
    __param(0, (0, jwt_decorator_1.JwtBody)()),
    __param(1, (0, common_1.Query)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [Object, store_dto_1.FetchRewardDetailsOfStoreDto]),
    __metadata("design:returntype", rxjs_1.Observable)
], StoreController.prototype, "viewStoreRewardDetails", null);
__decorate([
    (0, common_1.Post)('reward-points'),
    (0, roles_decorator_1.Roles)(roles_dto_1.UserRoles.SUPER_ADMIN),
    (0, swagger_1.ApiBearerAuth)(),
    (0, swagger_1.ApiOperation)({ description: 'Assign store reward points' }),
    (0, swagger_1.ApiOkResponse)({ description: 'Successfully assigned', type: store_dto_1.MessageDto }),
    (0, swagger_1.ApiUnauthorizedResponse)({ description: K.ERROR_CODES.UNAUTHORIZED.message }),
    (0, swagger_1.ApiInternalServerErrorResponse)({
        description: K.ERROR_CODES.DEFAULT.message
    }),
    (0, swagger_1.ApiBadRequestResponse)({ description: 'Invalid data' }),
    __param(0, (0, common_1.Body)()),
    __param(1, (0, jwt_decorator_1.JwtBody)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [store_dto_1.StoreRewardDto, Object]),
    __metadata("design:returntype", rxjs_1.Observable)
], StoreController.prototype, "insertStoreRewardPoints", null);
__decorate([
    (0, common_1.Patch)('reward-points'),
    (0, roles_decorator_1.Roles)(roles_dto_1.UserRoles.SUPER_ADMIN),
    (0, swagger_1.ApiBearerAuth)(),
    (0, swagger_1.ApiOperation)({ description: 'Update store reward points' }),
    (0, swagger_1.ApiOkResponse)({ description: 'Successfully updated', type: store_dto_1.MessageDto }),
    (0, swagger_1.ApiUnauthorizedResponse)({ description: K.ERROR_CODES.UNAUTHORIZED.message }),
    (0, swagger_1.ApiInternalServerErrorResponse)({
        description: K.ERROR_CODES.DEFAULT.message
    }),
    (0, swagger_1.ApiBadRequestResponse)({ description: 'Invalid data' }),
    __param(0, (0, common_1.Body)()),
    __param(1, (0, jwt_decorator_1.JwtBody)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [store_dto_1.StoreRewardEditDto, Object]),
    __metadata("design:returntype", rxjs_1.Observable)
], StoreController.prototype, "updateStoreRewardPoints", null);
__decorate([
    (0, common_1.Get)('reward-points/drop-down'),
    (0, roles_decorator_1.Roles)(roles_dto_1.UserRoles.SUPER_ADMIN),
    (0, swagger_1.ApiBearerAuth)(),
    (0, swagger_1.ApiOperation)({ description: 'Get names of store without rewards' }),
    (0, common_1.UsePipes)(new validation_pipe_1.CustomValidationPipe()),
    (0, swagger_1.ApiOkResponse)({
        description: 'Successfully collected',
        type: store_dto_1.StoreWithoutRewardsDto
    }),
    (0, swagger_1.ApiUnauthorizedResponse)({ description: K.ERROR_CODES.UNAUTHORIZED.message }),
    (0, swagger_1.ApiInternalServerErrorResponse)({
        description: K.ERROR_CODES.DEFAULT.message
    }),
    (0, swagger_1.ApiBadRequestResponse)({ description: K.ERROR_CODES.BADREQUEST.message }),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", []),
    __metadata("design:returntype", rxjs_1.Observable)
], StoreController.prototype, "storeWithoutRewards", null);
__decorate([
    (0, common_1.Patch)(':storeId/product/:productId/sku'),
    (0, roles_decorator_1.Roles)(roles_dto_1.UserRoles.STORE_ADMIN),
    (0, swagger_1.ApiBearerAuth)(),
    (0, swagger_1.ApiOperation)({ description: 'Update SKU for Store' }),
    (0, common_1.UsePipes)(new validation_pipe_1.CustomValidationPipe()),
    (0, swagger_1.ApiBody)({ type: store_dto_1.UpdateSkuUnderStoreDto }),
    (0, swagger_1.ApiOkResponse)({
        description: K.ERROR_CODES.UPDATED.message
    }),
    (0, swagger_1.ApiUnauthorizedResponse)({ description: K.ERROR_CODES.UNAUTHORIZED.message }),
    (0, swagger_1.ApiInternalServerErrorResponse)({
        description: K.ERROR_CODES.DEFAULT.message
    }),
    (0, swagger_1.ApiBadRequestResponse)({ description: K.ERROR_CODES.BADREQUEST.message }),
    __param(0, (0, common_1.Param)('storeId', common_1.ParseIntPipe)),
    __param(1, (0, common_1.Param)('productId', common_1.ParseIntPipe)),
    __param(2, (0, jwt_decorator_1.JwtBody)()),
    __param(3, (0, common_1.Body)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [Number, Number, Object, store_dto_1.UpdateSkuUnderStoreDto]),
    __metadata("design:returntype", Promise)
], StoreController.prototype, "updateSkuUnderStore", null);
__decorate([
    (0, common_1.Get)(':storeId/product/:productId/sku'),
    (0, roles_decorator_1.Roles)(roles_dto_1.UserRoles.STORE_ADMIN),
    (0, swagger_1.ApiBearerAuth)(),
    (0, swagger_1.ApiOperation)({ description: 'Get all SKU' }),
    (0, common_1.UsePipes)(new validation_pipe_1.CustomValidationPipe()),
    (0, swagger_1.ApiOkResponse)({
        description: 'Successfully collected',
        type: store_dto_1.MessageSkuUnderStore
    }),
    (0, swagger_1.ApiUnauthorizedResponse)({ description: K.ERROR_CODES.UNAUTHORIZED.message }),
    (0, swagger_1.ApiInternalServerErrorResponse)({
        description: K.ERROR_CODES.DEFAULT.message
    }),
    (0, swagger_1.ApiBadRequestResponse)({ description: K.ERROR_CODES.BADREQUEST.message }),
    __param(0, (0, common_1.Param)('storeId', common_1.ParseIntPipe)),
    __param(1, (0, common_1.Param)('productId', common_1.ParseIntPipe)),
    __param(2, (0, jwt_decorator_1.JwtBody)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [Number, Number, Object]),
    __metadata("design:returntype", Promise)
], StoreController.prototype, "getSkuDetailUnderStore", null);
__decorate([
    (0, common_1.Get)(':storeId/product'),
    (0, roles_decorator_1.Roles)(roles_dto_1.UserRoles.STORE_ADMIN),
    (0, swagger_1.ApiBearerAuth)(),
    (0, swagger_1.ApiOperation)({ description: 'Get all products' }),
    (0, common_1.UsePipes)(new validation_pipe_1.CustomValidationPipe()),
    (0, swagger_1.ApiOkResponse)({
        description: 'Successfully collected',
        type: store_dto_1.FetchStoreWiseProductsResponse
    }),
    (0, swagger_1.ApiUnauthorizedResponse)({ description: K.ERROR_CODES.UNAUTHORIZED.message }),
    (0, swagger_1.ApiInternalServerErrorResponse)({
        description: K.ERROR_CODES.DEFAULT.message
    }),
    (0, swagger_1.ApiBadRequestResponse)({ description: K.ERROR_CODES.BADREQUEST.message }),
    __param(0, (0, common_1.Param)('storeId', common_1.ParseIntPipe)),
    __param(1, (0, common_1.Query)()),
    __param(2, (0, jwt_decorator_1.JwtBody)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [Number, store_dto_1.FetchStoreWiseProductsPagination, Object]),
    __metadata("design:returntype", Promise)
], StoreController.prototype, "fetchStoreWiseProductList", null);
__decorate([
    (0, common_1.Get)(':storeid/section/:sectionid/products'),
    (0, roles_decorator_1.Roles)(roles_dto_1.UserRoles.USER),
    (0, swagger_1.ApiBearerAuth)(),
    (0, swagger_1.ApiOperation)({ description: 'Get product details' }),
    (0, swagger_1.ApiOkResponse)({
        description: 'Successfully fetched product details',
        type: product_dto_1.UserProductFetchResponseDto
    }),
    (0, swagger_1.ApiUnauthorizedResponse)({ description: K.ERROR_CODES.UNAUTHORIZED.message }),
    (0, swagger_1.ApiInternalServerErrorResponse)({
        description: K.ERROR_CODES.DEFAULT.message
    }),
    (0, swagger_1.ApiBadRequestResponse)({ description: K.ERROR_CODES.BADREQUEST.message }),
    __param(0, (0, common_1.Param)('storeid', new common_1.ParseIntPipe())),
    __param(1, (0, common_1.Param)('sectionid', new common_1.ParseIntPipe())),
    __param(2, (0, common_1.Query)()),
    __param(3, (0, jwt_decorator_1.JwtBody)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [Number, Number, store_dto_1.UserProductFilterOptionsDto, Object]),
    __metadata("design:returntype", rxjs_1.Observable)
], StoreController.prototype, "getProductAndSkuDetails", null);
__decorate([
    (0, common_1.Post)('offer'),
    (0, roles_decorator_1.Roles)(roles_dto_1.UserRoles.STORE_ADMIN),
    (0, common_1.UsePipes)(new validation_pipe_1.CustomValidationPipe()),
    (0, swagger_1.ApiBearerAuth)(),
    (0, swagger_1.ApiOperation)({ description: 'Assigning offer to store' }),
    (0, swagger_1.ApiBody)({ type: store_dto_1.AssigningOfferDto }),
    (0, swagger_1.ApiOkResponse)({ description: 'Successfully assigned', type: store_dto_1.MessageDto }),
    (0, swagger_1.ApiUnauthorizedResponse)({ description: K.ERROR_CODES.UNAUTHORIZED.message }),
    (0, swagger_1.ApiInternalServerErrorResponse)({
        description: K.ERROR_CODES.DEFAULT.message
    }),
    (0, swagger_1.ApiBadRequestResponse)({ description: K.ERROR_CODES.BADREQUEST.message }),
    __param(0, (0, common_1.Body)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [store_dto_1.AssigningOfferDto]),
    __metadata("design:returntype", rxjs_1.Observable)
], StoreController.prototype, "assignOfferToStore", null);
__decorate([
    (0, common_1.Delete)('offer'),
    (0, roles_decorator_1.Roles)(roles_dto_1.UserRoles.STORE_ADMIN),
    (0, common_1.UsePipes)(new validation_pipe_1.CustomValidationPipe()),
    (0, swagger_1.ApiBearerAuth)(),
    (0, swagger_1.ApiOperation)({ description: 'Unassigning offer to store' }),
    (0, swagger_1.ApiBody)({ type: store_dto_1.UnAssigningOfferDto }),
    (0, swagger_1.ApiOkResponse)({ description: 'Successfully uassigned', type: store_dto_1.MessageDto }),
    (0, swagger_1.ApiUnauthorizedResponse)({ description: K.ERROR_CODES.UNAUTHORIZED.message }),
    (0, swagger_1.ApiInternalServerErrorResponse)({
        description: K.ERROR_CODES.DEFAULT.message
    }),
    (0, swagger_1.ApiBadRequestResponse)({ description: K.ERROR_CODES.BADREQUEST.message }),
    __param(0, (0, common_1.Body)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [store_dto_1.UnAssigningOfferDto]),
    __metadata("design:returntype", rxjs_1.Observable)
], StoreController.prototype, "unAssignOfferToStore", null);
__decorate([
    (0, common_1.Get)('location'),
    (0, roles_decorator_1.Roles)(roles_dto_1.UserRoles.SUPER_ADMIN),
    (0, swagger_1.ApiBearerAuth)(),
    (0, swagger_1.ApiOperation)({ description: 'Get store list' }),
    (0, swagger_1.ApiOkResponse)({
        description: 'Successfully fetched store list',
        type: store_dto_1.StoreListFetchResponseDto
    }),
    (0, swagger_1.ApiUnauthorizedResponse)({ description: K.ERROR_CODES.UNAUTHORIZED.message }),
    (0, swagger_1.ApiInternalServerErrorResponse)({
        description: K.ERROR_CODES.DEFAULT.message
    }),
    (0, swagger_1.ApiBadRequestResponse)({ description: K.ERROR_CODES.BADREQUEST.message }),
    __param(0, (0, common_1.Query)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [store_dto_1.StoreListParamDto]),
    __metadata("design:returntype", rxjs_1.Observable)
], StoreController.prototype, "fetchStoreList", null);
__decorate([
    (0, common_1.Get)(':storeId/offer'),
    (0, roles_decorator_1.Roles)(roles_dto_1.UserRoles.STORE_ADMIN),
    (0, swagger_1.ApiBearerAuth)(),
    (0, swagger_1.ApiOperation)({
        description: 'Functionality for fetching offer detail under store'
    }),
    (0, common_1.UsePipes)(new validation_pipe_1.CustomValidationPipe()),
    (0, swagger_1.ApiOkResponse)({
        description: 'Successfully Collected offer Details',
        type: store_dto_1.MessageStoreFetchDto
    }),
    (0, swagger_1.ApiUnauthorizedResponse)({ description: K.ERROR_CODES.UNAUTHORIZED.message }),
    (0, swagger_1.ApiInternalServerErrorResponse)({
        description: K.ERROR_CODES.DEFAULT.message
    }),
    (0, swagger_1.ApiBadRequestResponse)({ description: K.ERROR_CODES.BADREQUEST.message }),
    __param(0, (0, common_1.Query)()),
    __param(1, (0, common_1.Param)('storeId', new common_1.ParseIntPipe())),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [offer_dto_1.OfferListParamDto, Number]),
    __metadata("design:returntype", rxjs_1.Observable)
], StoreController.prototype, "getofferDetails", null);
__decorate([
    (0, roles_decorator_1.Roles)(roles_dto_1.UserRoles.STORE_ADMIN, roles_dto_1.UserRoles.SUPER_ADMIN),
    (0, common_1.Get)(':storeId/dashboard'),
    (0, swagger_1.ApiBearerAuth)(),
    (0, swagger_1.ApiOperation)({
        description: 'View store dashboard data'
    }),
    (0, swagger_1.ApiOkResponse)({
        description: 'Successfully fetched store dashboard data',
        type: store_admin_dto_1.StoreDashboardResponseDto
    }),
    (0, swagger_1.ApiUnauthorizedResponse)({ description: K.ERROR_CODES.UNAUTHORIZED.message }),
    (0, swagger_1.ApiNotFoundResponse)({ description: 'Id not found' }),
    (0, swagger_1.ApiInternalServerErrorResponse)({
        description: K.ERROR_CODES.DEFAULT.message
    }),
    (0, swagger_1.ApiBadRequestResponse)({ description: 'Invalid Id' }),
    __param(0, (0, common_1.Param)('storeId', new common_1.ParseIntPipe())),
    __param(1, (0, jwt_decorator_1.JwtBody)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [Number, Object]),
    __metadata("design:returntype", Promise)
], StoreController.prototype, "fetchStoreDashboardData", null);
__decorate([
    (0, common_1.Get)(':storeId/dashboard-piechart'),
    (0, roles_decorator_1.Roles)(roles_dto_1.UserRoles.SUPER_ADMIN, roles_dto_1.UserRoles.STORE_ADMIN),
    (0, swagger_1.ApiBearerAuth)(),
    (0, swagger_1.ApiOperation)({
        description: 'API for fetching detail for pie chart to display section wise visit'
    }),
    (0, common_1.UsePipes)(new validation_pipe_1.CustomValidationPipe()),
    (0, swagger_1.ApiOkResponse)({
        description: 'Successfully collected',
        type: store_dto_1.StoresPiechartMessageDto
    }),
    (0, swagger_1.ApiUnauthorizedResponse)({ description: K.ERROR_CODES.UNAUTHORIZED.message }),
    (0, swagger_1.ApiInternalServerErrorResponse)({
        description: K.ERROR_CODES.DEFAULT.message
    }),
    (0, swagger_1.ApiBadRequestResponse)({ description: K.ERROR_CODES.BADREQUEST.message }),
    __param(0, (0, common_1.Param)('storeId', common_1.ParseIntPipe)),
    __param(1, (0, common_1.Query)()),
    __param(2, (0, jwt_decorator_1.JwtBody)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [Number, store_dto_1.ChartSpanTypeDto, Object]),
    __metadata("design:returntype", Promise)
], StoreController.prototype, "getStorePiechartDetails", null);
__decorate([
    (0, common_1.Get)(':storeId/dashboard-barchart'),
    (0, roles_decorator_1.Roles)(roles_dto_1.UserRoles.SUPER_ADMIN, roles_dto_1.UserRoles.STORE_ADMIN),
    (0, swagger_1.ApiBearerAuth)(),
    (0, swagger_1.ApiOperation)({
        description: `API for fetching detail for bar chart to
       display regular and new customer`
    }),
    (0, common_1.UsePipes)(new validation_pipe_1.CustomValidationPipe()),
    (0, swagger_1.ApiOkResponse)({
        description: 'Successfully collected',
        type: store_dto_1.StoresBarchartMessageDto
    }),
    (0, swagger_1.ApiUnauthorizedResponse)({ description: K.ERROR_CODES.UNAUTHORIZED.message }),
    (0, swagger_1.ApiInternalServerErrorResponse)({
        description: K.ERROR_CODES.DEFAULT.message
    }),
    (0, swagger_1.ApiBadRequestResponse)({ description: K.ERROR_CODES.BADREQUEST.message }),
    __param(0, (0, common_1.Param)('storeId', common_1.ParseIntPipe)),
    __param(1, (0, common_1.Query)()),
    __param(2, (0, jwt_decorator_1.JwtBody)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [Number, store_dto_1.BarchartSpanDto, Object]),
    __metadata("design:returntype", Promise)
], StoreController.prototype, "getStoreBarchartDetails", null);
__decorate([
    (0, common_1.Get)(':storeId/dashboard-linegraph'),
    (0, roles_decorator_1.Roles)(roles_dto_1.UserRoles.SUPER_ADMIN, roles_dto_1.UserRoles.STORE_ADMIN),
    (0, swagger_1.ApiBearerAuth)(),
    (0, swagger_1.ApiOperation)({
        description: `API for fetching detail for line graph to display
       visitors count based on time.`
    }),
    (0, common_1.UsePipes)(new validation_pipe_1.CustomValidationPipe()),
    (0, swagger_1.ApiOkResponse)({
        description: 'Successfully collected',
        type: store_dto_1.StoresLinechartMessageDto
    }),
    (0, swagger_1.ApiUnauthorizedResponse)({ description: K.ERROR_CODES.UNAUTHORIZED.message }),
    (0, swagger_1.ApiInternalServerErrorResponse)({
        description: K.ERROR_CODES.DEFAULT.message
    }),
    (0, swagger_1.ApiBadRequestResponse)({ description: K.ERROR_CODES.BADREQUEST.message }),
    __param(0, (0, common_1.Param)('storeId', common_1.ParseIntPipe)),
    __param(1, (0, common_1.Query)()),
    __param(2, (0, jwt_decorator_1.JwtBody)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [Number, store_dto_1.LinechartSpanDto, Object]),
    __metadata("design:returntype", Promise)
], StoreController.prototype, "getStoreVistorsTimeDetails", null);
__decorate([
    (0, common_1.Get)(':storeid/section/:sectionid/offer/:offerId/products'),
    (0, roles_decorator_1.Roles)(roles_dto_1.UserRoles.USER),
    (0, swagger_1.ApiBearerAuth)(),
    (0, common_1.UsePipes)(new validation_pipe_1.CustomValidationPipe()),
    (0, swagger_1.ApiOperation)({ description: 'Get offer wise product details' }),
    (0, swagger_1.ApiOkResponse)({
        description: 'Successfully fetched product details',
        type: store_dto_1.OfferWiseProductMessageDto
    }),
    (0, swagger_1.ApiUnauthorizedResponse)({ description: K.ERROR_CODES.UNAUTHORIZED.message }),
    (0, swagger_1.ApiInternalServerErrorResponse)({
        description: K.ERROR_CODES.DEFAULT.message
    }),
    (0, swagger_1.ApiBadRequestResponse)({ description: K.ERROR_CODES.BADREQUEST.message }),
    __param(0, (0, common_1.Param)('storeid', new common_1.ParseIntPipe())),
    __param(1, (0, common_1.Param)('sectionid', new common_1.ParseIntPipe())),
    __param(2, (0, common_1.Param)('offerId', new common_1.ParseIntPipe())),
    __param(3, (0, common_1.Query)()),
    __param(4, (0, jwt_decorator_1.JwtBody)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [Number, Number, Number, store_dto_1.UserProductFilterOptionsDto, Object]),
    __metadata("design:returntype", rxjs_1.Observable)
], StoreController.prototype, "getOfferWiseProductDetails", null);
__decorate([
    (0, common_1.Get)('countries'),
    (0, roles_decorator_1.Roles)(roles_dto_1.UserRoles.USER, roles_dto_1.UserRoles.STORE_ADMIN, roles_dto_1.UserRoles.SUPER_ADMIN),
    (0, swagger_1.ApiBearerAuth)(),
    (0, swagger_1.ApiOperation)({
        description: 'Get country data for filtering stores'
    }),
    (0, swagger_1.ApiOkResponse)({
        description: 'Successfully fetched country data for filtering stores',
        type: store_dto_1.StoreCountryDataResponseDto
    }),
    (0, swagger_1.ApiUnauthorizedResponse)({ description: K.ERROR_CODES.UNAUTHORIZED.message }),
    (0, swagger_1.ApiInternalServerErrorResponse)({
        description: K.ERROR_CODES.DEFAULT.message
    }),
    (0, swagger_1.ApiBadRequestResponse)({ description: K.ERROR_CODES.BADREQUEST.message }),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", []),
    __metadata("design:returntype", rxjs_1.Observable)
], StoreController.prototype, "fetchProductFilterData", null);
__decorate([
    (0, common_1.Get)('country/:countryId/states'),
    (0, roles_decorator_1.Roles)(roles_dto_1.UserRoles.USER, roles_dto_1.UserRoles.STORE_ADMIN, roles_dto_1.UserRoles.SUPER_ADMIN),
    (0, swagger_1.ApiBearerAuth)(),
    (0, swagger_1.ApiOperation)({
        description: 'Get state data for filtering stores'
    }),
    (0, swagger_1.ApiOkResponse)({
        description: 'Successfully fetched state data for filtering stores',
        type: store_dto_1.StoreStateDataResponseDto
    }),
    (0, swagger_1.ApiUnauthorizedResponse)({ description: K.ERROR_CODES.UNAUTHORIZED.message }),
    (0, swagger_1.ApiInternalServerErrorResponse)({
        description: K.ERROR_CODES.DEFAULT.message
    }),
    (0, swagger_1.ApiBadRequestResponse)({ description: K.ERROR_CODES.BADREQUEST.message }),
    __param(0, (0, common_1.Param)('countryId', new common_1.ParseIntPipe())),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [Number]),
    __metadata("design:returntype", rxjs_1.Observable)
], StoreController.prototype, "fetchStoreStateData", null);
__decorate([
    (0, common_1.Get)('state/:stateId/districts'),
    (0, roles_decorator_1.Roles)(roles_dto_1.UserRoles.USER, roles_dto_1.UserRoles.STORE_ADMIN, roles_dto_1.UserRoles.SUPER_ADMIN),
    (0, swagger_1.ApiBearerAuth)(),
    (0, swagger_1.ApiOperation)({
        description: 'Get district data for filtering stores'
    }),
    (0, swagger_1.ApiOkResponse)({
        description: 'Successfully fetched district data for filtering stores',
        type: store_dto_1.StoreDistrictDataResponseDto
    }),
    (0, swagger_1.ApiUnauthorizedResponse)({ description: K.ERROR_CODES.UNAUTHORIZED.message }),
    (0, swagger_1.ApiInternalServerErrorResponse)({
        description: K.ERROR_CODES.DEFAULT.message
    }),
    (0, swagger_1.ApiBadRequestResponse)({ description: K.ERROR_CODES.BADREQUEST.message }),
    __param(0, (0, common_1.Param)('stateId', new common_1.ParseIntPipe())),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [Number]),
    __metadata("design:returntype", rxjs_1.Observable)
], StoreController.prototype, "fetchStoreDistrictData", null);
__decorate([
    (0, common_1.Get)('last-visited'),
    (0, roles_decorator_1.Roles)(roles_dto_1.UserRoles.USER),
    (0, swagger_1.ApiBearerAuth)(),
    (0, common_1.UsePipes)(new validation_pipe_1.CustomValidationPipe()),
    (0, swagger_1.ApiOperation)({ description: 'Get last visited store details' }),
    (0, swagger_1.ApiOkResponse)({
        description: 'Successfully fetched last visited store details',
        type: store_dto_1.LastVisitedStoresResponseDto
    }),
    (0, swagger_1.ApiUnauthorizedResponse)({ description: K.ERROR_CODES.UNAUTHORIZED.message }),
    (0, swagger_1.ApiInternalServerErrorResponse)({
        description: K.ERROR_CODES.DEFAULT.message
    }),
    (0, swagger_1.ApiBadRequestResponse)({ description: K.ERROR_CODES.BADREQUEST.message }),
    __param(0, (0, jwt_decorator_1.JwtBody)()),
    __param(1, (0, common_1.Query)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [Object, store_dto_1.LastVisitedStoresDto]),
    __metadata("design:returntype", rxjs_1.Observable)
], StoreController.prototype, "fetchLastVisitedStoresData", null);
StoreController = __decorate([
    (0, swagger_1.ApiTags)('Stores'),
    (0, common_1.Controller)('store'),
    __metadata("design:paramtypes", [store_service_1.StoreService])
], StoreController);
exports.StoreController = StoreController;
//# sourceMappingURL=store.controller.js.map