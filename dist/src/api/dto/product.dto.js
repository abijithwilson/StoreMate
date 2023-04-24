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
exports.SkuIdListDto = exports.ProductListSetDto = exports.BulkProductUploadDto = exports.CsvProductDto = exports.FetchStoreWiseSingleProductDetailsResponseDto = exports.FetchStoreWiseSingleProductDetails = exports.StoreWiseSingleProductSKUDetails = exports.FetchProductOffersResponseDto = exports.FetchProductWiseOffersDto = exports.FetchProductOffersDto = exports.UserProductFetchResponseDto = exports.UserProductFetchDto = exports.ProductFetchResponseDto = exports.ProductFetchDto = exports.FetchAllProductsPagination = exports.FetchSingleColourAndSizeSkuDetails = exports.FetchSingleProductDetailsResponseDto = exports.FetchSingleProductDetails = exports.SingleProductSKUDetails = exports.SkuIdDTO = exports.CreateProductSku = exports.ProductSkuDetail = exports.UpdateProductDto = exports.UpdateProductSku = exports.UpdateProductSkuDetail = exports.ProductCreateDto = exports.CreatedProductId = exports.CreateProductBodyDto = exports.ProductIdDTO = exports.SkuIdDto = exports.MessageCategoryDto = exports.MessageColourDto = exports.MessageSizeDto = exports.CategorySizeDto = exports.ColourDto = void 0;
const swagger_1 = require("@nestjs/swagger");
const class_transformer_1 = require("class-transformer");
const class_validator_1 = require("class-validator");
const message_dto_1 = require("./message.dto");
class ColourDto {
}
__decorate([
    (0, swagger_1.ApiProperty)(),
    __metadata("design:type", Number)
], ColourDto.prototype, "id", void 0);
__decorate([
    (0, swagger_1.ApiProperty)(),
    __metadata("design:type", String)
], ColourDto.prototype, "name", void 0);
__decorate([
    (0, swagger_1.ApiProperty)(),
    __metadata("design:type", String)
], ColourDto.prototype, "colourCode", void 0);
exports.ColourDto = ColourDto;
class CategorySizeDto {
}
__decorate([
    (0, swagger_1.ApiProperty)(),
    __metadata("design:type", Number)
], CategorySizeDto.prototype, "id", void 0);
__decorate([
    (0, swagger_1.ApiProperty)(),
    __metadata("design:type", String)
], CategorySizeDto.prototype, "name", void 0);
exports.CategorySizeDto = CategorySizeDto;
class MessageSizeDto {
}
__decorate([
    (0, swagger_1.ApiProperty)(),
    __metadata("design:type", String)
], MessageSizeDto.prototype, "message", void 0);
__decorate([
    (0, swagger_1.ApiProperty)({ isArray: true }),
    __metadata("design:type", CategorySizeDto)
], MessageSizeDto.prototype, "data", void 0);
exports.MessageSizeDto = MessageSizeDto;
class MessageColourDto {
}
__decorate([
    (0, swagger_1.ApiProperty)(),
    __metadata("design:type", String)
], MessageColourDto.prototype, "message", void 0);
__decorate([
    (0, swagger_1.ApiProperty)({ isArray: true }),
    __metadata("design:type", ColourDto)
], MessageColourDto.prototype, "data", void 0);
exports.MessageColourDto = MessageColourDto;
class MessageCategoryDto {
}
__decorate([
    (0, swagger_1.ApiProperty)(),
    __metadata("design:type", String)
], MessageCategoryDto.prototype, "message", void 0);
__decorate([
    (0, swagger_1.ApiProperty)({ isArray: true }),
    __metadata("design:type", CategorySizeDto)
], MessageCategoryDto.prototype, "data", void 0);
exports.MessageCategoryDto = MessageCategoryDto;
class SkuIdDto {
}
exports.SkuIdDto = SkuIdDto;
class ProductIdDTO {
}
exports.ProductIdDTO = ProductIdDTO;
class CreateProductBodyDto {
}
__decorate([
    (0, swagger_1.ApiProperty)(),
    (0, class_validator_1.IsString)(),
    (0, class_validator_1.IsNotEmpty)(),
    __metadata("design:type", String)
], CreateProductBodyDto.prototype, "productName", void 0);
__decorate([
    (0, swagger_1.ApiProperty)(),
    (0, class_validator_1.IsString)(),
    (0, class_validator_1.IsNotEmpty)(),
    __metadata("design:type", String)
], CreateProductBodyDto.prototype, "description", void 0);
__decorate([
    (0, swagger_1.ApiProperty)(),
    (0, class_validator_1.IsNumber)(),
    (0, class_validator_1.IsNotEmpty)(),
    __metadata("design:type", Number)
], CreateProductBodyDto.prototype, "categoryId", void 0);
exports.CreateProductBodyDto = CreateProductBodyDto;
class CreatedProductId {
}
exports.CreatedProductId = CreatedProductId;
class ProductCreateDto {
}
__decorate([
    (0, swagger_1.ApiProperty)(),
    __metadata("design:type", Number)
], ProductCreateDto.prototype, "productId", void 0);
__decorate([
    (0, swagger_1.ApiProperty)(),
    __metadata("design:type", String)
], ProductCreateDto.prototype, "message", void 0);
exports.ProductCreateDto = ProductCreateDto;
class UpdateProductSkuDetail {
}
__decorate([
    (0, swagger_1.ApiProperty)(),
    (0, class_validator_1.IsNumber)(),
    (0, class_validator_1.IsOptional)(),
    __metadata("design:type", Number)
], UpdateProductSkuDetail.prototype, "id", void 0);
__decorate([
    (0, swagger_1.ApiProperty)(),
    (0, class_validator_1.IsString)(),
    (0, class_validator_1.IsOptional)(),
    __metadata("design:type", String)
], UpdateProductSkuDetail.prototype, "skuUniqueId", void 0);
__decorate([
    (0, swagger_1.ApiProperty)(),
    (0, class_validator_1.IsNumber)(),
    (0, class_validator_1.IsNotEmpty)(),
    __metadata("design:type", Number)
], UpdateProductSkuDetail.prototype, "colourId", void 0);
__decorate([
    (0, swagger_1.ApiProperty)(),
    (0, class_validator_1.IsNumber)(),
    (0, class_validator_1.IsNotEmpty)(),
    __metadata("design:type", Number)
], UpdateProductSkuDetail.prototype, "sizeId", void 0);
__decorate([
    (0, swagger_1.ApiProperty)(),
    (0, class_validator_1.IsNumber)(),
    (0, class_validator_1.IsNotEmpty)(),
    __metadata("design:type", Number)
], UpdateProductSkuDetail.prototype, "price", void 0);
__decorate([
    (0, swagger_1.ApiProperty)(),
    (0, class_validator_1.IsNumber)(),
    (0, class_validator_1.IsNotEmpty)(),
    (0, class_validator_1.IsOptional)(),
    __metadata("design:type", Number)
], UpdateProductSkuDetail.prototype, "discountPercent", void 0);
__decorate([
    (0, swagger_1.ApiProperty)(),
    (0, class_validator_1.IsString)(),
    (0, class_validator_1.IsNotEmpty)(),
    __metadata("design:type", String)
], UpdateProductSkuDetail.prototype, "image", void 0);
__decorate([
    (0, swagger_1.ApiProperty)({ type: Boolean, default: false }),
    (0, class_validator_1.IsNotEmpty)(),
    (0, class_validator_1.IsBooleanString)(),
    __metadata("design:type", String)
], UpdateProductSkuDetail.prototype, "defaultProduct", void 0);
exports.UpdateProductSkuDetail = UpdateProductSkuDetail;
class UpdateProductSku {
}
__decorate([
    (0, swagger_1.ApiProperty)(),
    (0, class_validator_1.IsNotEmpty)(),
    (0, class_validator_1.IsNumber)(),
    __metadata("design:type", Number)
], UpdateProductSku.prototype, "productId", void 0);
__decorate([
    (0, swagger_1.ApiProperty)(),
    (0, class_validator_1.IsNotEmpty)(),
    (0, class_validator_1.IsNumber)(),
    __metadata("design:type", Number)
], UpdateProductSku.prototype, "categoryId", void 0);
__decorate([
    (0, swagger_1.ApiProperty)({ isArray: true, type: UpdateProductSkuDetail }),
    (0, class_validator_1.ArrayMinSize)(1),
    __metadata("design:type", Array)
], UpdateProductSku.prototype, "skuDetails", void 0);
exports.UpdateProductSku = UpdateProductSku;
class UpdateProductDto {
}
__decorate([
    (0, swagger_1.ApiProperty)({ required: false }),
    (0, class_validator_1.IsString)(),
    (0, class_validator_1.IsOptional)(),
    __metadata("design:type", String)
], UpdateProductDto.prototype, "productName", void 0);
__decorate([
    (0, swagger_1.ApiProperty)({ required: false }),
    (0, class_validator_1.IsString)(),
    (0, class_validator_1.IsOptional)(),
    __metadata("design:type", String)
], UpdateProductDto.prototype, "description", void 0);
exports.UpdateProductDto = UpdateProductDto;
class ProductSkuDetail {
}
__decorate([
    (0, swagger_1.ApiProperty)(),
    (0, class_validator_1.IsNumber)(),
    (0, class_validator_1.IsNotEmpty)(),
    __metadata("design:type", Number)
], ProductSkuDetail.prototype, "colourId", void 0);
__decorate([
    (0, swagger_1.ApiProperty)(),
    (0, class_validator_1.IsNumber)(),
    (0, class_validator_1.IsNotEmpty)(),
    __metadata("design:type", Number)
], ProductSkuDetail.prototype, "sizeId", void 0);
__decorate([
    (0, swagger_1.ApiProperty)(),
    (0, class_validator_1.IsNumber)(),
    (0, class_validator_1.IsNotEmpty)(),
    __metadata("design:type", Number)
], ProductSkuDetail.prototype, "price", void 0);
__decorate([
    (0, swagger_1.ApiProperty)(),
    (0, class_validator_1.IsNumber)(),
    (0, class_validator_1.IsNotEmpty)(),
    (0, class_validator_1.IsOptional)(),
    __metadata("design:type", Number)
], ProductSkuDetail.prototype, "discountPercent", void 0);
__decorate([
    (0, swagger_1.ApiProperty)(),
    (0, class_validator_1.IsString)(),
    (0, class_validator_1.IsNotEmpty)(),
    __metadata("design:type", String)
], ProductSkuDetail.prototype, "image", void 0);
__decorate([
    (0, swagger_1.ApiProperty)({ type: Boolean, default: false }),
    (0, class_validator_1.IsBooleanString)(),
    __metadata("design:type", String)
], ProductSkuDetail.prototype, "defaultProduct", void 0);
exports.ProductSkuDetail = ProductSkuDetail;
class CreateProductSku {
}
__decorate([
    (0, swagger_1.ApiProperty)(),
    (0, class_validator_1.IsNotEmpty)(),
    (0, class_validator_1.IsNumber)(),
    __metadata("design:type", Number)
], CreateProductSku.prototype, "productId", void 0);
__decorate([
    (0, swagger_1.ApiProperty)(),
    (0, class_validator_1.IsNotEmpty)(),
    (0, class_validator_1.IsNumber)(),
    __metadata("design:type", Number)
], CreateProductSku.prototype, "categoryId", void 0);
__decorate([
    (0, swagger_1.ApiProperty)({ isArray: true, type: ProductSkuDetail }),
    (0, class_validator_1.ArrayMinSize)(1),
    __metadata("design:type", Array)
], CreateProductSku.prototype, "skuDetails", void 0);
exports.CreateProductSku = CreateProductSku;
class SkuIdDTO {
}
__decorate([
    (0, swagger_1.ApiProperty)(),
    __metadata("design:type", Number)
], SkuIdDTO.prototype, "id", void 0);
exports.SkuIdDTO = SkuIdDTO;
class SingleProductSKUDetails {
}
__decorate([
    (0, swagger_1.ApiProperty)({ required: false }),
    __metadata("design:type", String)
], SingleProductSKUDetails.prototype, "image", void 0);
__decorate([
    (0, swagger_1.ApiProperty)({ required: false }),
    __metadata("design:type", String)
], SingleProductSKUDetails.prototype, "colour", void 0);
__decorate([
    (0, swagger_1.ApiProperty)({ required: false }),
    __metadata("design:type", Number)
], SingleProductSKUDetails.prototype, "colourId", void 0);
__decorate([
    (0, swagger_1.ApiProperty)({ required: false }),
    __metadata("design:type", String)
], SingleProductSKUDetails.prototype, "colourCode", void 0);
__decorate([
    (0, swagger_1.ApiProperty)({ required: false }),
    __metadata("design:type", Boolean)
], SingleProductSKUDetails.prototype, "default", void 0);
__decorate([
    (0, swagger_1.ApiProperty)({ required: false }),
    __metadata("design:type", String)
], SingleProductSKUDetails.prototype, "size", void 0);
__decorate([
    (0, swagger_1.ApiProperty)({ required: false }),
    __metadata("design:type", Number)
], SingleProductSKUDetails.prototype, "sizeId", void 0);
__decorate([
    (0, swagger_1.ApiProperty)({ required: false }),
    __metadata("design:type", Number)
], SingleProductSKUDetails.prototype, "price", void 0);
__decorate([
    (0, swagger_1.ApiProperty)({ required: false }),
    __metadata("design:type", Number)
], SingleProductSKUDetails.prototype, "discountPercent", void 0);
__decorate([
    (0, swagger_1.ApiProperty)({ required: false }),
    __metadata("design:type", Number)
], SingleProductSKUDetails.prototype, "barcode", void 0);
exports.SingleProductSKUDetails = SingleProductSKUDetails;
class FetchSingleProductDetails {
}
__decorate([
    (0, swagger_1.ApiProperty)({ required: false }),
    __metadata("design:type", Number)
], FetchSingleProductDetails.prototype, "productId", void 0);
__decorate([
    (0, swagger_1.ApiProperty)({ required: false }),
    __metadata("design:type", String)
], FetchSingleProductDetails.prototype, "productName", void 0);
__decorate([
    (0, swagger_1.ApiProperty)({ required: false }),
    __metadata("design:type", String)
], FetchSingleProductDetails.prototype, "category", void 0);
__decorate([
    (0, swagger_1.ApiProperty)({ required: false }),
    __metadata("design:type", Number)
], FetchSingleProductDetails.prototype, "categoryId", void 0);
__decorate([
    (0, swagger_1.ApiProperty)({ required: false }),
    __metadata("design:type", String)
], FetchSingleProductDetails.prototype, "description", void 0);
__decorate([
    (0, swagger_1.ApiProperty)({ required: false, isArray: true }),
    __metadata("design:type", SingleProductSKUDetails)
], FetchSingleProductDetails.prototype, "skus", void 0);
exports.FetchSingleProductDetails = FetchSingleProductDetails;
class FetchSingleProductDetailsResponseDto {
}
__decorate([
    (0, swagger_1.ApiProperty)({ required: false }),
    __metadata("design:type", String)
], FetchSingleProductDetailsResponseDto.prototype, "message", void 0);
__decorate([
    (0, swagger_1.ApiProperty)({ required: false }),
    __metadata("design:type", FetchSingleProductDetails)
], FetchSingleProductDetailsResponseDto.prototype, "data", void 0);
exports.FetchSingleProductDetailsResponseDto = FetchSingleProductDetailsResponseDto;
class FetchSingleColourAndSizeSkuDetails {
}
__decorate([
    (0, swagger_1.ApiProperty)({ required: false }),
    (0, class_validator_1.IsNotEmpty)(),
    (0, class_validator_1.IsNumber)(),
    (0, class_validator_1.IsOptional)(),
    (0, class_transformer_1.Type)(() => Number),
    __metadata("design:type", Number)
], FetchSingleColourAndSizeSkuDetails.prototype, "filterColour", void 0);
__decorate([
    (0, swagger_1.ApiProperty)({ required: false }),
    (0, class_validator_1.IsNotEmpty)(),
    (0, class_validator_1.IsNumber)(),
    (0, class_validator_1.IsOptional)(),
    (0, class_transformer_1.Type)(() => Number),
    __metadata("design:type", Number)
], FetchSingleColourAndSizeSkuDetails.prototype, "filterSize", void 0);
exports.FetchSingleColourAndSizeSkuDetails = FetchSingleColourAndSizeSkuDetails;
class FetchAllProductsPagination {
}
__decorate([
    (0, swagger_1.ApiProperty)({ required: false }),
    (0, class_validator_1.IsNumber)(),
    (0, class_validator_1.IsOptional)(),
    (0, class_transformer_1.Type)(() => Number),
    (0, class_validator_1.IsNotEmpty)(),
    __metadata("design:type", Number)
], FetchAllProductsPagination.prototype, "limit", void 0);
__decorate([
    (0, swagger_1.ApiProperty)({ required: false }),
    (0, class_validator_1.IsNumber)(),
    (0, class_validator_1.IsOptional)(),
    (0, class_transformer_1.Type)(() => Number),
    (0, class_validator_1.IsNotEmpty)(),
    __metadata("design:type", Number)
], FetchAllProductsPagination.prototype, "offset", void 0);
__decorate([
    (0, swagger_1.ApiProperty)({ required: false }),
    (0, class_validator_1.IsNotEmpty)(),
    (0, class_validator_1.IsNumber)(),
    (0, class_validator_1.IsOptional)(),
    (0, class_transformer_1.Type)(() => Number),
    __metadata("design:type", Number)
], FetchAllProductsPagination.prototype, "id", void 0);
__decorate([
    (0, swagger_1.ApiProperty)({ required: false }),
    (0, class_validator_1.IsNotEmpty)(),
    (0, class_validator_1.IsBooleanString)(),
    (0, class_validator_1.IsOptional)(),
    __metadata("design:type", String)
], FetchAllProductsPagination.prototype, "sortName", void 0);
__decorate([
    (0, swagger_1.ApiProperty)({ required: false }),
    (0, class_validator_1.IsNotEmpty)(),
    (0, class_validator_1.IsBooleanString)(),
    (0, class_validator_1.IsOptional)(),
    __metadata("design:type", String)
], FetchAllProductsPagination.prototype, "sortPrice", void 0);
__decorate([
    (0, swagger_1.ApiProperty)({ required: false }),
    (0, class_validator_1.IsString)(),
    (0, class_validator_1.IsOptional)(),
    (0, class_validator_1.IsNotEmpty)(),
    __metadata("design:type", String)
], FetchAllProductsPagination.prototype, "productName", void 0);
__decorate([
    (0, swagger_1.ApiProperty)({ required: false }),
    (0, class_validator_1.IsString)(),
    (0, class_validator_1.IsOptional)(),
    (0, class_validator_1.IsNotEmpty)(),
    __metadata("design:type", String)
], FetchAllProductsPagination.prototype, "categoryName", void 0);
__decorate([
    (0, swagger_1.ApiProperty)({ required: false }),
    (0, class_validator_1.IsNotEmpty)(),
    (0, class_validator_1.Matches)(/^[[0-9,]*[0-9]+]$/, {
        message: 'filter category is in invalid format'
    }),
    (0, class_validator_1.IsOptional)(),
    __metadata("design:type", String)
], FetchAllProductsPagination.prototype, "filterCategory", void 0);
exports.FetchAllProductsPagination = FetchAllProductsPagination;
class ProductFetchDto {
}
__decorate([
    (0, swagger_1.ApiProperty)({ required: false }),
    __metadata("design:type", Number)
], ProductFetchDto.prototype, "id", void 0);
__decorate([
    (0, swagger_1.ApiProperty)({ required: false }),
    __metadata("design:type", String)
], ProductFetchDto.prototype, "productName", void 0);
__decorate([
    (0, swagger_1.ApiProperty)({ required: false }),
    __metadata("design:type", Number)
], ProductFetchDto.prototype, "categoryId", void 0);
__decorate([
    (0, swagger_1.ApiProperty)({ required: false }),
    __metadata("design:type", String)
], ProductFetchDto.prototype, "categoryName", void 0);
__decorate([
    (0, swagger_1.ApiProperty)({ required: false }),
    __metadata("design:type", Number)
], ProductFetchDto.prototype, "price", void 0);
__decorate([
    (0, swagger_1.ApiProperty)({ required: false }),
    __metadata("design:type", Number)
], ProductFetchDto.prototype, "discountPercent", void 0);
__decorate([
    (0, swagger_1.ApiProperty)({ required: false }),
    __metadata("design:type", String)
], ProductFetchDto.prototype, "image", void 0);
__decorate([
    (0, swagger_1.ApiProperty)({ required: false }),
    __metadata("design:type", String)
], ProductFetchDto.prototype, "skuUniqueId", void 0);
__decorate([
    (0, swagger_1.ApiProperty)({ required: false }),
    __metadata("design:type", Number)
], ProductFetchDto.prototype, "updatedBy", void 0);
exports.ProductFetchDto = ProductFetchDto;
class ProductFetchResponseDto {
}
__decorate([
    (0, swagger_1.ApiProperty)(),
    __metadata("design:type", String)
], ProductFetchResponseDto.prototype, "message", void 0);
__decorate([
    (0, swagger_1.ApiProperty)({ isArray: true }),
    __metadata("design:type", ProductFetchDto)
], ProductFetchResponseDto.prototype, "data", void 0);
__decorate([
    (0, swagger_1.ApiProperty)(),
    __metadata("design:type", message_dto_1.Pagination)
], ProductFetchResponseDto.prototype, "pagination", void 0);
exports.ProductFetchResponseDto = ProductFetchResponseDto;
class UserProductFetchDto {
}
__decorate([
    (0, swagger_1.ApiProperty)({ required: false }),
    __metadata("design:type", Number)
], UserProductFetchDto.prototype, "productId", void 0);
__decorate([
    (0, swagger_1.ApiProperty)({ required: false }),
    __metadata("design:type", String)
], UserProductFetchDto.prototype, "productName", void 0);
__decorate([
    (0, swagger_1.ApiProperty)({ required: false }),
    __metadata("design:type", String)
], UserProductFetchDto.prototype, "description", void 0);
__decorate([
    (0, swagger_1.ApiProperty)({ required: false }),
    __metadata("design:type", Number)
], UserProductFetchDto.prototype, "categoryId", void 0);
__decorate([
    (0, swagger_1.ApiProperty)({ required: false }),
    __metadata("design:type", String)
], UserProductFetchDto.prototype, "categoryName", void 0);
__decorate([
    (0, swagger_1.ApiProperty)({ required: false }),
    __metadata("design:type", Number)
], UserProductFetchDto.prototype, "basePrice", void 0);
__decorate([
    (0, swagger_1.ApiProperty)({ required: false }),
    __metadata("design:type", Number)
], UserProductFetchDto.prototype, "discountPercent", void 0);
__decorate([
    (0, swagger_1.ApiProperty)({ required: false }),
    __metadata("design:type", Number)
], UserProductFetchDto.prototype, "colourId", void 0);
__decorate([
    (0, swagger_1.ApiProperty)({ required: false }),
    __metadata("design:type", String)
], UserProductFetchDto.prototype, "colourName", void 0);
__decorate([
    (0, swagger_1.ApiProperty)({ required: false }),
    __metadata("design:type", String)
], UserProductFetchDto.prototype, "colourCode", void 0);
__decorate([
    (0, swagger_1.ApiProperty)({ required: false }),
    __metadata("design:type", Number)
], UserProductFetchDto.prototype, "sizeId", void 0);
__decorate([
    (0, swagger_1.ApiProperty)({ required: false }),
    __metadata("design:type", String)
], UserProductFetchDto.prototype, "sizeName", void 0);
__decorate([
    (0, swagger_1.ApiProperty)({ required: false }),
    __metadata("design:type", String)
], UserProductFetchDto.prototype, "image", void 0);
__decorate([
    (0, swagger_1.ApiProperty)({ required: false }),
    __metadata("design:type", Number)
], UserProductFetchDto.prototype, "skuId", void 0);
__decorate([
    (0, swagger_1.ApiProperty)({ required: false }),
    __metadata("design:type", String)
], UserProductFetchDto.prototype, "skuUniqueId", void 0);
__decorate([
    (0, swagger_1.ApiProperty)({ required: false }),
    __metadata("design:type", String)
], UserProductFetchDto.prototype, "barcode", void 0);
__decorate([
    (0, swagger_1.ApiProperty)({ required: false }),
    __metadata("design:type", Number)
], UserProductFetchDto.prototype, "count", void 0);
exports.UserProductFetchDto = UserProductFetchDto;
class UserProductFetchResponseDto {
}
__decorate([
    (0, swagger_1.ApiProperty)(),
    __metadata("design:type", String)
], UserProductFetchResponseDto.prototype, "message", void 0);
__decorate([
    (0, swagger_1.ApiProperty)({ isArray: true }),
    __metadata("design:type", UserProductFetchDto)
], UserProductFetchResponseDto.prototype, "data", void 0);
__decorate([
    (0, swagger_1.ApiProperty)(),
    __metadata("design:type", message_dto_1.Pagination)
], UserProductFetchResponseDto.prototype, "pagination", void 0);
exports.UserProductFetchResponseDto = UserProductFetchResponseDto;
class FetchProductOffersDto {
}
__decorate([
    (0, swagger_1.ApiProperty)({ required: false }),
    (0, class_validator_1.IsNumber)(),
    (0, class_validator_1.IsOptional)(),
    (0, class_transformer_1.Type)(() => Number),
    (0, class_validator_1.IsNotEmpty)(),
    __metadata("design:type", Number)
], FetchProductOffersDto.prototype, "limit", void 0);
__decorate([
    (0, swagger_1.ApiProperty)({ required: false }),
    (0, class_validator_1.IsNumber)(),
    (0, class_validator_1.IsOptional)(),
    (0, class_transformer_1.Type)(() => Number),
    (0, class_validator_1.IsNotEmpty)(),
    __metadata("design:type", Number)
], FetchProductOffersDto.prototype, "offset", void 0);
__decorate([
    (0, swagger_1.ApiProperty)({ required: false }),
    (0, class_validator_1.IsNotEmpty)(),
    (0, class_validator_1.IsString)(),
    (0, class_validator_1.IsOptional)(),
    __metadata("design:type", String)
], FetchProductOffersDto.prototype, "sortField", void 0);
__decorate([
    (0, swagger_1.ApiProperty)({ required: false }),
    (0, class_validator_1.IsNotEmpty)(),
    (0, class_validator_1.IsBooleanString)(),
    (0, class_validator_1.IsOptional)(),
    __metadata("design:type", String)
], FetchProductOffersDto.prototype, "sortOrder", void 0);
exports.FetchProductOffersDto = FetchProductOffersDto;
class FetchProductWiseOffersDto {
}
__decorate([
    (0, swagger_1.ApiProperty)({ required: false }),
    __metadata("design:type", Number)
], FetchProductWiseOffersDto.prototype, "offerId", void 0);
__decorate([
    (0, swagger_1.ApiProperty)({ required: false }),
    __metadata("design:type", String)
], FetchProductWiseOffersDto.prototype, "offerTitle", void 0);
__decorate([
    (0, swagger_1.ApiProperty)({ required: false }),
    __metadata("design:type", Number)
], FetchProductWiseOffersDto.prototype, "discountPercent", void 0);
__decorate([
    (0, swagger_1.ApiProperty)({ required: false }),
    __metadata("design:type", String)
], FetchProductWiseOffersDto.prototype, "description", void 0);
__decorate([
    (0, swagger_1.ApiProperty)({ required: false }),
    __metadata("design:type", String)
], FetchProductWiseOffersDto.prototype, "image", void 0);
__decorate([
    (0, swagger_1.ApiProperty)({ required: false }),
    __metadata("design:type", Date)
], FetchProductWiseOffersDto.prototype, "startDate", void 0);
__decorate([
    (0, swagger_1.ApiProperty)({ required: false }),
    __metadata("design:type", Date)
], FetchProductWiseOffersDto.prototype, "endDate", void 0);
__decorate([
    (0, swagger_1.ApiProperty)({ required: false }),
    __metadata("design:type", Number)
], FetchProductWiseOffersDto.prototype, "count", void 0);
exports.FetchProductWiseOffersDto = FetchProductWiseOffersDto;
class FetchProductOffersResponseDto {
}
__decorate([
    (0, swagger_1.ApiProperty)({ required: false }),
    __metadata("design:type", String)
], FetchProductOffersResponseDto.prototype, "message", void 0);
__decorate([
    (0, swagger_1.ApiProperty)({ required: false, type: FetchProductWiseOffersDto }),
    __metadata("design:type", FetchProductWiseOffersDto)
], FetchProductOffersResponseDto.prototype, "data", void 0);
exports.FetchProductOffersResponseDto = FetchProductOffersResponseDto;
class StoreWiseSingleProductSKUDetails {
}
__decorate([
    (0, swagger_1.ApiProperty)({ required: false }),
    __metadata("design:type", String)
], StoreWiseSingleProductSKUDetails.prototype, "image", void 0);
__decorate([
    (0, swagger_1.ApiProperty)({ required: false }),
    __metadata("design:type", String)
], StoreWiseSingleProductSKUDetails.prototype, "colour", void 0);
__decorate([
    (0, swagger_1.ApiProperty)({ required: false }),
    __metadata("design:type", Number)
], StoreWiseSingleProductSKUDetails.prototype, "colourId", void 0);
__decorate([
    (0, swagger_1.ApiProperty)({ required: false }),
    __metadata("design:type", String)
], StoreWiseSingleProductSKUDetails.prototype, "colourCode", void 0);
__decorate([
    (0, swagger_1.ApiProperty)({ required: false }),
    __metadata("design:type", Boolean)
], StoreWiseSingleProductSKUDetails.prototype, "default", void 0);
__decorate([
    (0, swagger_1.ApiProperty)({ required: false }),
    __metadata("design:type", String)
], StoreWiseSingleProductSKUDetails.prototype, "size", void 0);
__decorate([
    (0, swagger_1.ApiProperty)({ required: false }),
    __metadata("design:type", Number)
], StoreWiseSingleProductSKUDetails.prototype, "sizeId", void 0);
__decorate([
    (0, swagger_1.ApiProperty)({ required: false }),
    __metadata("design:type", Number)
], StoreWiseSingleProductSKUDetails.prototype, "price", void 0);
__decorate([
    (0, swagger_1.ApiProperty)({ required: false }),
    __metadata("design:type", Number)
], StoreWiseSingleProductSKUDetails.prototype, "barcode", void 0);
__decorate([
    (0, swagger_1.ApiProperty)({ required: false }),
    __metadata("design:type", Number)
], StoreWiseSingleProductSKUDetails.prototype, "discountPercent", void 0);
__decorate([
    (0, swagger_1.ApiProperty)({ required: false }),
    __metadata("design:type", Number)
], StoreWiseSingleProductSKUDetails.prototype, "skuUniqueId", void 0);
__decorate([
    (0, swagger_1.ApiProperty)({ required: false }),
    __metadata("design:type", Number)
], StoreWiseSingleProductSKUDetails.prototype, "skuId", void 0);
__decorate([
    (0, swagger_1.ApiProperty)({ required: false }),
    __metadata("design:type", Boolean)
], StoreWiseSingleProductSKUDetails.prototype, "availability", void 0);
exports.StoreWiseSingleProductSKUDetails = StoreWiseSingleProductSKUDetails;
class FetchStoreWiseSingleProductDetails {
}
__decorate([
    (0, swagger_1.ApiProperty)({ required: false }),
    __metadata("design:type", Number)
], FetchStoreWiseSingleProductDetails.prototype, "productId", void 0);
__decorate([
    (0, swagger_1.ApiProperty)({ required: false }),
    __metadata("design:type", String)
], FetchStoreWiseSingleProductDetails.prototype, "productName", void 0);
__decorate([
    (0, swagger_1.ApiProperty)({ required: false }),
    __metadata("design:type", String)
], FetchStoreWiseSingleProductDetails.prototype, "category", void 0);
__decorate([
    (0, swagger_1.ApiProperty)({ required: false }),
    __metadata("design:type", Number)
], FetchStoreWiseSingleProductDetails.prototype, "categoryId", void 0);
__decorate([
    (0, swagger_1.ApiProperty)({ required: false }),
    __metadata("design:type", String)
], FetchStoreWiseSingleProductDetails.prototype, "description", void 0);
__decorate([
    (0, swagger_1.ApiProperty)({ required: false, isArray: true }),
    __metadata("design:type", StoreWiseSingleProductSKUDetails)
], FetchStoreWiseSingleProductDetails.prototype, "skus", void 0);
exports.FetchStoreWiseSingleProductDetails = FetchStoreWiseSingleProductDetails;
class FetchStoreWiseSingleProductDetailsResponseDto {
}
__decorate([
    (0, swagger_1.ApiProperty)({ required: false }),
    __metadata("design:type", String)
], FetchStoreWiseSingleProductDetailsResponseDto.prototype, "message", void 0);
__decorate([
    (0, swagger_1.ApiProperty)({ required: false, type: FetchStoreWiseSingleProductDetails }),
    __metadata("design:type", FetchStoreWiseSingleProductDetails)
], FetchStoreWiseSingleProductDetailsResponseDto.prototype, "data", void 0);
exports.FetchStoreWiseSingleProductDetailsResponseDto = FetchStoreWiseSingleProductDetailsResponseDto;
class CsvProductDto {
}
__decorate([
    (0, class_validator_1.ValidateNested)({ each: true }),
    (0, class_transformer_1.Type)(() => BulkProductUploadDto),
    (0, class_validator_1.IsNotEmpty)(),
    __metadata("design:type", Array)
], CsvProductDto.prototype, "products", void 0);
exports.CsvProductDto = CsvProductDto;
class BulkProductUploadDto {
}
__decorate([
    (0, class_validator_1.IsNotEmpty)(),
    (0, class_validator_1.IsString)(),
    __metadata("design:type", String)
], BulkProductUploadDto.prototype, "product_name", void 0);
__decorate([
    (0, class_validator_1.IsNotEmpty)(),
    (0, class_validator_1.IsString)(),
    __metadata("design:type", String)
], BulkProductUploadDto.prototype, "description", void 0);
__decorate([
    (0, class_validator_1.IsNotEmpty)(),
    (0, class_transformer_1.Transform)(({ value }) => parseInt(value)),
    (0, class_validator_1.IsNumber)(),
    (0, class_validator_1.Min)(0),
    __metadata("design:type", Number)
], BulkProductUploadDto.prototype, "category_id", void 0);
__decorate([
    (0, class_validator_1.IsNotEmpty)(),
    (0, class_transformer_1.Transform)(({ value }) => parseFloat(value)),
    (0, class_validator_1.IsNumber)(),
    (0, class_validator_1.Min)(0.01),
    (0, class_validator_1.Max)(99.99),
    __metadata("design:type", Number)
], BulkProductUploadDto.prototype, "sale_price_discount", void 0);
__decorate([
    (0, class_validator_1.IsNotEmpty)(),
    (0, class_transformer_1.Transform)(({ value }) => parseInt(value)),
    (0, class_validator_1.IsNumber)(),
    (0, class_validator_1.Min)(0),
    __metadata("design:type", Number)
], BulkProductUploadDto.prototype, "base_price", void 0);
__decorate([
    (0, class_validator_1.IsNotEmpty)(),
    (0, class_transformer_1.Transform)(({ value }) => parseInt(value)),
    (0, class_validator_1.IsNumber)(),
    (0, class_validator_1.Min)(0),
    __metadata("design:type", Number)
], BulkProductUploadDto.prototype, "colour_id", void 0);
__decorate([
    (0, class_validator_1.IsNotEmpty)(),
    (0, class_transformer_1.Transform)(({ value }) => parseInt(value)),
    (0, class_validator_1.IsNumber)(),
    (0, class_validator_1.Min)(0),
    __metadata("design:type", Number)
], BulkProductUploadDto.prototype, "size_id", void 0);
__decorate([
    (0, class_validator_1.IsNotEmpty)(),
    (0, class_validator_1.IsBooleanString)(),
    __metadata("design:type", Boolean)
], BulkProductUploadDto.prototype, "in_store_availability", void 0);
__decorate([
    (0, class_validator_1.IsNotEmpty)(),
    (0, class_validator_1.IsString)(),
    __metadata("design:type", String)
], BulkProductUploadDto.prototype, "image", void 0);
__decorate([
    (0, class_validator_1.IsNotEmpty)(),
    (0, class_validator_1.IsBooleanString)(),
    __metadata("design:type", Boolean)
], BulkProductUploadDto.prototype, "default_product", void 0);
exports.BulkProductUploadDto = BulkProductUploadDto;
class ProductListSetDto {
}
exports.ProductListSetDto = ProductListSetDto;
class SkuIdListDto {
}
exports.SkuIdListDto = SkuIdListDto;
//# sourceMappingURL=product.dto.js.map