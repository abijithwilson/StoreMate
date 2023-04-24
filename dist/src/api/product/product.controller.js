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
exports.ProductController = void 0;
const common_1 = require("@nestjs/common");
const swagger_1 = require("@nestjs/swagger");
const product_service_1 = require("./product.service");
const K = require("../../shared/constants");
const product_dto_1 = require("../dto/product.dto");
const file_decorator_1 = require("../../decorator/file.decorator");
const jwt_decorator_1 = require("../../decorator/jwt.decorator");
const rxjs_1 = require("rxjs");
const admin_dto_1 = require("../dto/admin.dto");
const validation_pipe_1 = require("../../pipes/validation-pipe");
const roles_decorator_1 = require("../../decorator/roles.decorator");
const roles_dto_1 = require("../dto/roles.dto");
const public_guard_1 = require("../../guards/public.guard");
const upload_guard_1 = require("../../guards/upload.guard");
let ProductController = class ProductController {
    constructor(productService) {
        this.productService = productService;
    }
    fetchProductSize() {
        return this.productService.fetchProductSize();
    }
    fetchProductcolour() {
        return this.productService.fetchProductcolour();
    }
    fetchProductCategory() {
        return this.productService.fetchProductCategory();
    }
    deleteProduct(id) {
        return this.productService.deleteProduct(id);
    }
    deleteSkuDetails(id) {
        return this.productService.deleteSkuDetails(id);
    }
    editProductDetails(id, body, jwtBody) {
        return this.productService.editProductDetails(id, body, jwtBody);
    }
    createProduct(body, jwtBody) {
        return this.productService.createProduct(body, jwtBody);
    }
    updateSkuDetails(body, jwtBody) {
        return this.productService.updateSkuDetails(body, jwtBody);
    }
    createSkuDetails(body, jwtBody) {
        return this.productService.createSkuDetails(body, jwtBody);
    }
    getSingleProductSkuDetails(id, param) {
        return this.productService.getSingleProductSkuDetails(id, param);
    }
    getStoreDetails(param) {
        return this.productService.getAllProductDetails(param);
    }
    getStoreAdminSingleProductSkuDetails(productId, storeId, jwtBody, param) {
        return this.productService.fetchStoreWiseProductSkus(productId, storeId, jwtBody, param);
    }
    fetchProductOffers(productId, storeId, param) {
        return this.productService.fetchProductOffers(productId, storeId, param);
    }
    productBulkUpload(file, jwtBody) {
        return this.productService.productBulkUpload(file, jwtBody);
    }
    fetchProductWiseOffers(productId, param) {
        return this.productService.fetchProductWiseOffers(productId, param);
    }
};
__decorate([
    (0, common_1.Get)('size'),
    (0, roles_decorator_1.Roles)(roles_dto_1.UserRoles.SUPER_ADMIN, roles_dto_1.UserRoles.STORE_ADMIN, roles_dto_1.UserRoles.USER),
    (0, swagger_1.ApiOperation)({ description: 'Fetch available sizes of the product' }),
    (0, swagger_1.ApiOkResponse)({ description: 'Successfully Fetched', type: product_dto_1.MessageSizeDto }),
    (0, swagger_1.ApiInternalServerErrorResponse)({
        description: K.ERROR_CODES.DEFAULT.message
    }),
    (0, swagger_1.ApiBearerAuth)(),
    (0, swagger_1.ApiUnauthorizedResponse)({ description: K.ERROR_CODES.UNAUTHORIZED.message }),
    (0, public_guard_1.Public)(),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", []),
    __metadata("design:returntype", rxjs_1.Observable)
], ProductController.prototype, "fetchProductSize", null);
__decorate([
    (0, common_1.Get)('colour'),
    (0, roles_decorator_1.Roles)(roles_dto_1.UserRoles.SUPER_ADMIN, roles_dto_1.UserRoles.STORE_ADMIN, roles_dto_1.UserRoles.USER),
    (0, swagger_1.ApiOperation)({ description: 'Fetch available colour of the product' }),
    (0, swagger_1.ApiOkResponse)({
        description: 'Successfully Fetched',
        type: product_dto_1.MessageColourDto
    }),
    (0, swagger_1.ApiBearerAuth)(),
    (0, swagger_1.ApiInternalServerErrorResponse)({
        description: K.ERROR_CODES.DEFAULT.message
    }),
    (0, swagger_1.ApiUnauthorizedResponse)({ description: K.ERROR_CODES.UNAUTHORIZED.message }),
    (0, public_guard_1.Public)(),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", []),
    __metadata("design:returntype", rxjs_1.Observable)
], ProductController.prototype, "fetchProductcolour", null);
__decorate([
    (0, common_1.Get)('category'),
    (0, roles_decorator_1.Roles)(roles_dto_1.UserRoles.SUPER_ADMIN, roles_dto_1.UserRoles.STORE_ADMIN, roles_dto_1.UserRoles.USER),
    (0, swagger_1.ApiOperation)({ description: 'Fetch available category of the product' }),
    (0, swagger_1.ApiOkResponse)({
        description: 'Successfully Fetched',
        type: product_dto_1.MessageCategoryDto
    }),
    (0, swagger_1.ApiInternalServerErrorResponse)({
        description: K.ERROR_CODES.DEFAULT.message
    }),
    (0, swagger_1.ApiBearerAuth)(),
    (0, swagger_1.ApiUnauthorizedResponse)({ description: K.ERROR_CODES.UNAUTHORIZED.message }),
    (0, public_guard_1.Public)(),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", []),
    __metadata("design:returntype", rxjs_1.Observable)
], ProductController.prototype, "fetchProductCategory", null);
__decorate([
    (0, common_1.Delete)(':id'),
    (0, roles_decorator_1.Roles)(roles_dto_1.UserRoles.SUPER_ADMIN),
    (0, swagger_1.ApiBearerAuth)(),
    (0, swagger_1.ApiOperation)({ description: 'Delete Product' }),
    (0, swagger_1.ApiOkResponse)({ description: 'Successfully deleted', type: admin_dto_1.MessageDto }),
    (0, swagger_1.ApiUnauthorizedResponse)({
        description: K.ERROR_CODES.UNAUTHORIZED.message
    }),
    (0, swagger_1.ApiInternalServerErrorResponse)({
        description: K.ERROR_CODES.DEFAULT.message
    }),
    (0, swagger_1.ApiBadRequestResponse)({ description: 'Invalid id' }),
    __param(0, (0, common_1.Param)('id', common_1.ParseIntPipe)),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [Number]),
    __metadata("design:returntype", rxjs_1.Observable)
], ProductController.prototype, "deleteProduct", null);
__decorate([
    (0, common_1.Delete)(':id/sku'),
    (0, roles_decorator_1.Roles)(roles_dto_1.UserRoles.SUPER_ADMIN),
    (0, swagger_1.ApiBearerAuth)(),
    (0, swagger_1.ApiOperation)({ description: 'Delete SKU details of product' }),
    (0, swagger_1.ApiOkResponse)({ description: 'Successfully deleted', type: admin_dto_1.MessageDto }),
    (0, swagger_1.ApiUnauthorizedResponse)({
        description: K.ERROR_CODES.UNAUTHORIZED.message
    }),
    (0, swagger_1.ApiInternalServerErrorResponse)({
        description: K.ERROR_CODES.DEFAULT.message
    }),
    (0, swagger_1.ApiBadRequestResponse)({ description: 'Invalid id' }),
    __param(0, (0, common_1.Param)('id', common_1.ParseIntPipe)),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [Number]),
    __metadata("design:returntype", void 0)
], ProductController.prototype, "deleteSkuDetails", null);
__decorate([
    (0, common_1.Patch)(':id/edit'),
    (0, roles_decorator_1.Roles)(roles_dto_1.UserRoles.SUPER_ADMIN),
    (0, common_1.HttpCode)(200),
    (0, swagger_1.ApiBody)({ type: product_dto_1.UpdateProductDto }),
    (0, swagger_1.ApiBearerAuth)(),
    (0, swagger_1.ApiOperation)({ description: 'Update product details' }),
    (0, swagger_1.ApiOkResponse)({
        description: K.ERROR_CODES.UPDATED.message,
        type: admin_dto_1.MessageDto
    }),
    (0, swagger_1.ApiUnauthorizedResponse)({ description: K.ERROR_CODES.UNAUTHORIZED.message }),
    (0, swagger_1.ApiInternalServerErrorResponse)({
        description: K.ERROR_CODES.DEFAULT.message
    }),
    (0, swagger_1.ApiBadRequestResponse)({ description: K.ERROR_CODES.BADREQUEST.message }),
    __param(0, (0, common_1.Param)('id', common_1.ParseIntPipe)),
    __param(1, (0, common_1.Body)()),
    __param(2, (0, jwt_decorator_1.JwtBody)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [Number, product_dto_1.UpdateProductDto, Object]),
    __metadata("design:returntype", rxjs_1.Observable)
], ProductController.prototype, "editProductDetails", null);
__decorate([
    (0, common_1.Post)(),
    (0, roles_decorator_1.Roles)(roles_dto_1.UserRoles.SUPER_ADMIN),
    (0, common_1.HttpCode)(200),
    (0, common_1.UsePipes)(new validation_pipe_1.CustomValidationPipe({ transform: true })),
    (0, swagger_1.ApiBody)({ type: product_dto_1.CreateProductBodyDto }),
    (0, swagger_1.ApiBearerAuth)(),
    (0, swagger_1.ApiOperation)({ description: 'Create new product' }),
    (0, swagger_1.ApiOkResponse)({
        description: K.ERROR_CODES.Created.message,
        type: product_dto_1.ProductCreateDto
    }),
    (0, swagger_1.ApiUnauthorizedResponse)({ description: K.ERROR_CODES.UNAUTHORIZED.message }),
    (0, swagger_1.ApiInternalServerErrorResponse)({
        description: K.ERROR_CODES.DEFAULT.message
    }),
    (0, swagger_1.ApiBadRequestResponse)({ description: K.ERROR_CODES.BADREQUEST.message }),
    __param(0, (0, common_1.Body)()),
    __param(1, (0, jwt_decorator_1.JwtBody)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [product_dto_1.CreateProductBodyDto, Object]),
    __metadata("design:returntype", rxjs_1.Observable)
], ProductController.prototype, "createProduct", null);
__decorate([
    (0, common_1.Patch)('sku'),
    (0, roles_decorator_1.Roles)(roles_dto_1.UserRoles.SUPER_ADMIN),
    (0, common_1.HttpCode)(200),
    (0, common_1.UsePipes)(new validation_pipe_1.CustomValidationPipe({ transform: true })),
    (0, swagger_1.ApiBody)({ type: product_dto_1.UpdateProductSku }),
    (0, swagger_1.ApiBearerAuth)(),
    (0, swagger_1.ApiOperation)({ description: 'Update SKU details of product' }),
    (0, swagger_1.ApiOkResponse)({
        description: K.ERROR_CODES.UPDATED.message,
        type: admin_dto_1.MessageDto
    }),
    (0, swagger_1.ApiUnauthorizedResponse)({ description: K.ERROR_CODES.UNAUTHORIZED.message }),
    (0, swagger_1.ApiInternalServerErrorResponse)({
        description: K.ERROR_CODES.DEFAULT.message
    }),
    (0, swagger_1.ApiBadRequestResponse)({ description: K.ERROR_CODES.BADREQUEST.message }),
    __param(0, (0, common_1.Body)()),
    __param(1, (0, jwt_decorator_1.JwtBody)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [product_dto_1.UpdateProductSku, Object]),
    __metadata("design:returntype", rxjs_1.Observable)
], ProductController.prototype, "updateSkuDetails", null);
__decorate([
    (0, common_1.Post)('sku'),
    (0, roles_decorator_1.Roles)(roles_dto_1.UserRoles.SUPER_ADMIN),
    (0, common_1.HttpCode)(200),
    (0, common_1.UsePipes)(new validation_pipe_1.CustomValidationPipe({ transform: true })),
    (0, swagger_1.ApiBody)({ type: product_dto_1.CreateProductSku }),
    (0, swagger_1.ApiBearerAuth)(),
    (0, swagger_1.ApiOperation)({ description: 'Create SKU details of product' }),
    (0, swagger_1.ApiOkResponse)({
        description: K.ERROR_CODES.Created.message,
        type: admin_dto_1.MessageDto
    }),
    (0, swagger_1.ApiUnauthorizedResponse)({ description: K.ERROR_CODES.UNAUTHORIZED.message }),
    (0, swagger_1.ApiInternalServerErrorResponse)({
        description: K.ERROR_CODES.DEFAULT.message
    }),
    (0, swagger_1.ApiBadRequestResponse)({ description: K.ERROR_CODES.BADREQUEST.message }),
    __param(0, (0, common_1.Body)()),
    __param(1, (0, jwt_decorator_1.JwtBody)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [product_dto_1.CreateProductSku, Object]),
    __metadata("design:returntype", rxjs_1.Observable)
], ProductController.prototype, "createSkuDetails", null);
__decorate([
    (0, common_1.Get)(':id'),
    (0, roles_decorator_1.Roles)(roles_dto_1.UserRoles.SUPER_ADMIN),
    (0, swagger_1.ApiBearerAuth)(),
    (0, swagger_1.ApiOperation)({ description: 'Get single product details' }),
    (0, swagger_1.ApiOkResponse)({
        description: 'Successfully fetched single product details',
        type: product_dto_1.FetchSingleProductDetailsResponseDto
    }),
    (0, swagger_1.ApiUnauthorizedResponse)({ description: K.ERROR_CODES.UNAUTHORIZED.message }),
    (0, swagger_1.ApiInternalServerErrorResponse)({
        description: K.ERROR_CODES.DEFAULT.message
    }),
    (0, swagger_1.ApiBadRequestResponse)({ description: K.ERROR_CODES.BADREQUEST.message }),
    __param(0, (0, common_1.Param)('id', new common_1.ParseIntPipe())),
    __param(1, (0, common_1.Query)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [Number, product_dto_1.FetchSingleColourAndSizeSkuDetails]),
    __metadata("design:returntype", rxjs_1.Observable)
], ProductController.prototype, "getSingleProductSkuDetails", null);
__decorate([
    (0, common_1.Get)(),
    (0, roles_decorator_1.Roles)(roles_dto_1.UserRoles.SUPER_ADMIN),
    (0, swagger_1.ApiBearerAuth)(),
    (0, swagger_1.ApiOperation)({ description: 'Get all product details' }),
    (0, common_1.UsePipes)(new validation_pipe_1.CustomValidationPipe()),
    (0, swagger_1.ApiOkResponse)({
        description: 'Successfully fetched all product details',
        type: product_dto_1.ProductFetchResponseDto
    }),
    (0, swagger_1.ApiUnauthorizedResponse)({ description: K.ERROR_CODES.UNAUTHORIZED.message }),
    (0, swagger_1.ApiInternalServerErrorResponse)({
        description: K.ERROR_CODES.DEFAULT.message
    }),
    (0, swagger_1.ApiBadRequestResponse)({ description: K.ERROR_CODES.BADREQUEST.message }),
    __param(0, (0, common_1.Query)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [product_dto_1.FetchAllProductsPagination]),
    __metadata("design:returntype", rxjs_1.Observable)
], ProductController.prototype, "getStoreDetails", null);
__decorate([
    (0, common_1.Get)(':productId/store/:storeId'),
    (0, roles_decorator_1.Roles)(roles_dto_1.UserRoles.SUPER_ADMIN, roles_dto_1.UserRoles.STORE_ADMIN),
    (0, swagger_1.ApiBearerAuth)(),
    (0, swagger_1.ApiOperation)({ description: 'Get single product details for store admin' }),
    (0, swagger_1.ApiOkResponse)({
        description: 'Successfully fetched single product details',
        type: product_dto_1.FetchStoreWiseSingleProductDetailsResponseDto
    }),
    (0, swagger_1.ApiUnauthorizedResponse)({ description: K.ERROR_CODES.UNAUTHORIZED.message }),
    (0, swagger_1.ApiInternalServerErrorResponse)({
        description: K.ERROR_CODES.DEFAULT.message
    }),
    (0, swagger_1.ApiBadRequestResponse)({ description: K.ERROR_CODES.BADREQUEST.message }),
    __param(0, (0, common_1.Param)('productId', new common_1.ParseIntPipe())),
    __param(1, (0, common_1.Param)('storeId', new common_1.ParseIntPipe())),
    __param(2, (0, jwt_decorator_1.JwtBody)()),
    __param(3, (0, common_1.Query)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [Number, Number, Object, product_dto_1.FetchSingleColourAndSizeSkuDetails]),
    __metadata("design:returntype", Promise)
], ProductController.prototype, "getStoreAdminSingleProductSkuDetails", null);
__decorate([
    (0, common_1.Get)(':productId/store/:storeId/offers'),
    (0, roles_decorator_1.Roles)(roles_dto_1.UserRoles.USER, roles_dto_1.UserRoles.STORE_ADMIN, roles_dto_1.UserRoles.SUPER_ADMIN),
    (0, swagger_1.ApiBearerAuth)(),
    (0, swagger_1.ApiOperation)({ description: 'Get single product offers' }),
    (0, swagger_1.ApiOkResponse)({
        description: 'Successfully fetched single product offers',
        type: product_dto_1.FetchProductOffersResponseDto
    }),
    (0, swagger_1.ApiUnauthorizedResponse)({ description: K.ERROR_CODES.UNAUTHORIZED.message }),
    (0, swagger_1.ApiInternalServerErrorResponse)({
        description: K.ERROR_CODES.DEFAULT.message
    }),
    (0, swagger_1.ApiBadRequestResponse)({ description: K.ERROR_CODES.BADREQUEST.message }),
    __param(0, (0, common_1.Param)('productId', new common_1.ParseIntPipe())),
    __param(1, (0, common_1.Param)('storeId', new common_1.ParseIntPipe())),
    __param(2, (0, common_1.Query)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [Number, Number, product_dto_1.FetchProductOffersDto]),
    __metadata("design:returntype", rxjs_1.Observable)
], ProductController.prototype, "fetchProductOffers", null);
__decorate([
    (0, common_1.Post)('csv'),
    (0, roles_decorator_1.Roles)(roles_dto_1.UserRoles.SUPER_ADMIN),
    (0, common_1.UseGuards)(upload_guard_1.UploadGuard),
    (0, common_1.HttpCode)(200),
    (0, swagger_1.ApiConsumes)('multipart/form-data'),
    (0, swagger_1.ApiBody)({
        schema: {
            type: 'object',
            properties: {
                file: {
                    type: 'string',
                    format: 'binary'
                }
            }
        }
    }),
    (0, swagger_1.ApiBearerAuth)(),
    (0, swagger_1.ApiOperation)({ description: 'Create new product' }),
    (0, swagger_1.ApiOkResponse)({
        description: K.ERROR_CODES.Created.message,
        type: admin_dto_1.MessageDto
    }),
    (0, swagger_1.ApiUnauthorizedResponse)({ description: K.ERROR_CODES.UNAUTHORIZED.message }),
    (0, swagger_1.ApiInternalServerErrorResponse)({
        description: K.ERROR_CODES.DEFAULT.message
    }),
    (0, swagger_1.ApiBadRequestResponse)({ description: K.ERROR_CODES.BADREQUEST.message }),
    __param(0, (0, file_decorator_1.File)(new common_1.ValidationPipe({ validateCustomDecorators: true }))),
    __param(1, (0, jwt_decorator_1.JwtBody)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [product_dto_1.CsvProductDto, Object]),
    __metadata("design:returntype", Promise)
], ProductController.prototype, "productBulkUpload", null);
__decorate([
    (0, common_1.Get)(':productId/offers'),
    (0, roles_decorator_1.Roles)(roles_dto_1.UserRoles.SUPER_ADMIN),
    (0, swagger_1.ApiBearerAuth)(),
    (0, swagger_1.ApiOperation)({ description: 'Get single product offers' }),
    (0, swagger_1.ApiOkResponse)({
        description: 'Successfully fetched single product offers',
        type: product_dto_1.FetchProductOffersResponseDto
    }),
    (0, swagger_1.ApiUnauthorizedResponse)({ description: K.ERROR_CODES.UNAUTHORIZED.message }),
    (0, swagger_1.ApiInternalServerErrorResponse)({
        description: K.ERROR_CODES.DEFAULT.message
    }),
    (0, swagger_1.ApiBadRequestResponse)({ description: K.ERROR_CODES.BADREQUEST.message }),
    __param(0, (0, common_1.Param)('productId', new common_1.ParseIntPipe())),
    __param(1, (0, common_1.Query)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [Number, product_dto_1.FetchProductOffersDto]),
    __metadata("design:returntype", rxjs_1.Observable)
], ProductController.prototype, "fetchProductWiseOffers", null);
ProductController = __decorate([
    (0, swagger_1.ApiTags)('Product'),
    (0, common_1.Controller)('product'),
    __metadata("design:paramtypes", [product_service_1.ProductService])
], ProductController);
exports.ProductController = ProductController;
//# sourceMappingURL=product.controller.js.map