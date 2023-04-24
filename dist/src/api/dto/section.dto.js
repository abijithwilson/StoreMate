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
exports.SectionVisitDataResponseDto = exports.SectionVisitDataDto = exports.SectionVisitParamDto = exports.ProductIdArrayDto = exports.ProductFilterDataResponse = exports.ProductFilterData = exports.CategoryFilterData = exports.ColourFilterData = exports.SizeFilterData = exports.FetchProductFilterData = exports.WishlistProductAssignDto = exports.FetchWishlistProductsResponseDto = exports.FetchWishlistProductsDto = exports.FetchWishlistProductsPaginationDto = exports.FetchOfferListResponseDto = exports.SectionWiseOfferDto = exports.FetchCategoryListResponseDto = exports.SectionWiseCategoriesDto = exports.SectionWiseCategoriesPaginationDto = exports.AssignProductSectionDto = exports.AssignSectionDto = exports.SectionQueryDto = exports.SectionFetchDto = exports.ProductIdDto = exports.SectionProductMapId = exports.MessageSectionDropDownList = exports.SectionDropDownList = exports.SectionUnderStoreQueryParam = exports.SectionMessageDto = exports.SectionIdDto = exports.UpdateSectionDto = exports.CreateSectionDto = exports.StoreWiseSectionResponseDto = exports.StoreWiseSectionDto = exports.FetchStoreWiseSectionsPaginationDto = exports.StoreSectionIdDto = void 0;
const swagger_1 = require("@nestjs/swagger");
const class_transformer_1 = require("class-transformer");
const class_validator_1 = require("class-validator");
const joi_1 = require("joi");
const message_dto_1 = require("./message.dto");
class StoreSectionIdDto {
}
exports.StoreSectionIdDto = StoreSectionIdDto;
class FetchStoreWiseSectionsPaginationDto {
}
__decorate([
    (0, swagger_1.ApiProperty)({ required: false }),
    (0, class_validator_1.IsNumber)(),
    (0, class_validator_1.IsOptional)(),
    (0, class_transformer_1.Type)(() => Number),
    (0, class_validator_1.IsNotEmpty)(),
    __metadata("design:type", Number)
], FetchStoreWiseSectionsPaginationDto.prototype, "limit", void 0);
__decorate([
    (0, swagger_1.ApiProperty)({ required: false }),
    (0, class_validator_1.IsNumber)(),
    (0, class_validator_1.IsOptional)(),
    (0, class_transformer_1.Type)(() => Number),
    (0, class_validator_1.IsNotEmpty)(),
    __metadata("design:type", Number)
], FetchStoreWiseSectionsPaginationDto.prototype, "offset", void 0);
exports.FetchStoreWiseSectionsPaginationDto = FetchStoreWiseSectionsPaginationDto;
class StoreWiseSectionDto {
}
__decorate([
    (0, swagger_1.ApiProperty)({ required: false }),
    __metadata("design:type", String)
], StoreWiseSectionDto.prototype, "sectionName", void 0);
__decorate([
    (0, swagger_1.ApiProperty)({ required: false }),
    __metadata("design:type", Number)
], StoreWiseSectionDto.prototype, "sectionId", void 0);
__decorate([
    (0, swagger_1.ApiProperty)({ required: false }),
    __metadata("design:type", Number)
], StoreWiseSectionDto.prototype, "noOfBeacons", void 0);
__decorate([
    (0, swagger_1.ApiProperty)({ required: false }),
    __metadata("design:type", Number)
], StoreWiseSectionDto.prototype, "count", void 0);
exports.StoreWiseSectionDto = StoreWiseSectionDto;
class StoreWiseSectionResponseDto {
}
__decorate([
    (0, swagger_1.ApiProperty)({ required: false }),
    __metadata("design:type", String)
], StoreWiseSectionResponseDto.prototype, "message", void 0);
__decorate([
    (0, swagger_1.ApiProperty)({ required: false, type: StoreWiseSectionDto, isArray: true }),
    __metadata("design:type", Array)
], StoreWiseSectionResponseDto.prototype, "data", void 0);
__decorate([
    (0, swagger_1.ApiProperty)({ required: false }),
    __metadata("design:type", message_dto_1.Pagination)
], StoreWiseSectionResponseDto.prototype, "pagination", void 0);
exports.StoreWiseSectionResponseDto = StoreWiseSectionResponseDto;
class CreateSectionDto {
}
__decorate([
    (0, swagger_1.ApiProperty)(),
    (0, class_validator_1.IsString)(),
    (0, class_validator_1.IsNotEmpty)(),
    __metadata("design:type", String)
], CreateSectionDto.prototype, "sectionName", void 0);
exports.CreateSectionDto = CreateSectionDto;
class UpdateSectionDto {
}
__decorate([
    (0, swagger_1.ApiProperty)(),
    (0, class_validator_1.IsString)(),
    (0, class_validator_1.IsNotEmpty)(),
    __metadata("design:type", String)
], UpdateSectionDto.prototype, "sectionName", void 0);
exports.UpdateSectionDto = UpdateSectionDto;
class SectionIdDto {
}
exports.SectionIdDto = SectionIdDto;
class SectionMessageDto {
}
__decorate([
    (0, swagger_1.ApiProperty)(),
    __metadata("design:type", String)
], SectionMessageDto.prototype, "message", void 0);
exports.SectionMessageDto = SectionMessageDto;
class SectionUnderStoreQueryParam {
}
__decorate([
    (0, swagger_1.ApiProperty)(),
    __metadata("design:type", String)
], SectionUnderStoreQueryParam.prototype, "sectionName", void 0);
exports.SectionUnderStoreQueryParam = SectionUnderStoreQueryParam;
class SectionDropDownList {
}
__decorate([
    (0, swagger_1.ApiProperty)(),
    __metadata("design:type", Number)
], SectionDropDownList.prototype, "sectionId", void 0);
__decorate([
    (0, swagger_1.ApiProperty)(),
    __metadata("design:type", String)
], SectionDropDownList.prototype, "sectionName", void 0);
exports.SectionDropDownList = SectionDropDownList;
class MessageSectionDropDownList {
}
__decorate([
    (0, swagger_1.ApiProperty)(),
    __metadata("design:type", String)
], MessageSectionDropDownList.prototype, "message", void 0);
__decorate([
    (0, swagger_1.ApiProperty)({ type: SectionDropDownList, isArray: true }),
    __metadata("design:type", Array)
], MessageSectionDropDownList.prototype, "data", void 0);
exports.MessageSectionDropDownList = MessageSectionDropDownList;
class SectionProductMapId {
}
exports.SectionProductMapId = SectionProductMapId;
class ProductIdDto {
}
__decorate([
    (0, swagger_1.ApiProperty)(),
    __metadata("design:type", Number)
], ProductIdDto.prototype, "productId", void 0);
exports.ProductIdDto = ProductIdDto;
class SectionFetchDto {
}
__decorate([
    (0, swagger_1.ApiProperty)({ required: false }),
    __metadata("design:type", String)
], SectionFetchDto.prototype, "message", void 0);
__decorate([
    (0, swagger_1.ApiProperty)({ required: false, type: SectionDropDownList, isArray: true }),
    __metadata("design:type", Array)
], SectionFetchDto.prototype, "data", void 0);
__decorate([
    (0, swagger_1.ApiProperty)({ required: false }),
    __metadata("design:type", message_dto_1.Pagination)
], SectionFetchDto.prototype, "pagination", void 0);
exports.SectionFetchDto = SectionFetchDto;
class SectionQueryDto {
}
__decorate([
    (0, swagger_1.ApiProperty)({ required: false }),
    (0, class_validator_1.IsNumber)(),
    (0, class_validator_1.IsOptional)(),
    (0, class_transformer_1.Type)(() => Number),
    (0, class_validator_1.IsNotEmpty)(),
    __metadata("design:type", Number)
], SectionQueryDto.prototype, "limit", void 0);
__decorate([
    (0, swagger_1.ApiProperty)({ required: false }),
    (0, class_validator_1.IsNumber)(),
    (0, class_validator_1.IsOptional)(),
    (0, class_transformer_1.Type)(() => Number),
    (0, class_validator_1.IsNotEmpty)(),
    __metadata("design:type", Number)
], SectionQueryDto.prototype, "offset", void 0);
__decorate([
    (0, swagger_1.ApiProperty)({ required: false }),
    (0, class_validator_1.IsNumber)(),
    (0, class_validator_1.IsOptional)(),
    (0, class_transformer_1.Type)(() => Number),
    (0, class_validator_1.IsNotEmpty)(),
    __metadata("design:type", Number)
], SectionQueryDto.prototype, "storeId", void 0);
__decorate([
    (0, swagger_1.ApiProperty)(),
    (0, class_validator_1.IsNotEmpty)(),
    (0, class_validator_1.IsString)(),
    (0, class_validator_1.IsOptional)(),
    __metadata("design:type", String)
], SectionQueryDto.prototype, "sortField", void 0);
__decorate([
    (0, swagger_1.ApiProperty)({ required: false }),
    (0, class_validator_1.IsNotEmpty)(),
    (0, class_validator_1.IsBooleanString)(),
    (0, class_validator_1.IsOptional)(),
    __metadata("design:type", String)
], SectionQueryDto.prototype, "sortOrder", void 0);
exports.SectionQueryDto = SectionQueryDto;
class AssignSectionDto {
}
__decorate([
    (0, swagger_1.ApiProperty)({ type: Number, isArray: true }),
    (0, class_validator_1.IsNotEmpty)(),
    (0, class_validator_1.ArrayMinSize)(1),
    __metadata("design:type", Array)
], AssignSectionDto.prototype, "sectionId", void 0);
exports.AssignSectionDto = AssignSectionDto;
class AssignProductSectionDto {
}
__decorate([
    (0, swagger_1.ApiProperty)({ type: Number, isArray: true }),
    (0, class_validator_1.ArrayMinSize)(1),
    (0, class_validator_1.IsNotEmpty)(),
    (0, class_transformer_1.Type)(() => Number),
    __metadata("design:type", Array)
], AssignProductSectionDto.prototype, "productId", void 0);
exports.AssignProductSectionDto = AssignProductSectionDto;
class SectionWiseCategoriesPaginationDto {
}
__decorate([
    (0, swagger_1.ApiProperty)({ required: false }),
    (0, class_validator_1.IsNumber)(),
    (0, class_validator_1.IsOptional)(),
    (0, class_transformer_1.Type)(() => Number),
    (0, class_validator_1.IsNotEmpty)(),
    __metadata("design:type", Number)
], SectionWiseCategoriesPaginationDto.prototype, "limit", void 0);
__decorate([
    (0, swagger_1.ApiProperty)({ required: false }),
    (0, class_validator_1.IsNumber)(),
    (0, class_validator_1.IsOptional)(),
    (0, class_transformer_1.Type)(() => Number),
    (0, class_validator_1.IsNotEmpty)(),
    __metadata("design:type", Number)
], SectionWiseCategoriesPaginationDto.prototype, "offset", void 0);
exports.SectionWiseCategoriesPaginationDto = SectionWiseCategoriesPaginationDto;
class SectionWiseCategoriesDto {
}
__decorate([
    (0, swagger_1.ApiProperty)({ required: false }),
    __metadata("design:type", Number)
], SectionWiseCategoriesDto.prototype, "categoryId", void 0);
__decorate([
    (0, swagger_1.ApiProperty)({ required: false }),
    __metadata("design:type", String)
], SectionWiseCategoriesDto.prototype, "categoryName", void 0);
__decorate([
    (0, swagger_1.ApiProperty)({ required: false }),
    __metadata("design:type", String)
], SectionWiseCategoriesDto.prototype, "categoryImage", void 0);
__decorate([
    (0, swagger_1.ApiProperty)({ required: false }),
    __metadata("design:type", Number)
], SectionWiseCategoriesDto.prototype, "count", void 0);
exports.SectionWiseCategoriesDto = SectionWiseCategoriesDto;
class FetchCategoryListResponseDto {
}
__decorate([
    (0, swagger_1.ApiProperty)({ required: false }),
    __metadata("design:type", String)
], FetchCategoryListResponseDto.prototype, "message", void 0);
__decorate([
    (0, swagger_1.ApiProperty)({
        required: false,
        type: SectionWiseCategoriesDto,
        isArray: true
    }),
    __metadata("design:type", Array)
], FetchCategoryListResponseDto.prototype, "data", void 0);
exports.FetchCategoryListResponseDto = FetchCategoryListResponseDto;
class SectionWiseOfferDto {
}
__decorate([
    (0, swagger_1.ApiProperty)({ required: false }),
    __metadata("design:type", Number)
], SectionWiseOfferDto.prototype, "offerId", void 0);
__decorate([
    (0, swagger_1.ApiProperty)({ required: false }),
    __metadata("design:type", String)
], SectionWiseOfferDto.prototype, "image", void 0);
__decorate([
    (0, swagger_1.ApiProperty)({ required: false }),
    __metadata("design:type", String)
], SectionWiseOfferDto.prototype, "offerTitle", void 0);
__decorate([
    (0, swagger_1.ApiProperty)({ required: false }),
    __metadata("design:type", String)
], SectionWiseOfferDto.prototype, "description", void 0);
__decorate([
    (0, swagger_1.ApiProperty)({ required: false }),
    __metadata("design:type", Number)
], SectionWiseOfferDto.prototype, "count", void 0);
exports.SectionWiseOfferDto = SectionWiseOfferDto;
class FetchOfferListResponseDto {
}
__decorate([
    (0, swagger_1.ApiProperty)({ required: false }),
    __metadata("design:type", String)
], FetchOfferListResponseDto.prototype, "message", void 0);
__decorate([
    (0, swagger_1.ApiProperty)({ required: false, type: SectionWiseOfferDto, isArray: true }),
    __metadata("design:type", Array)
], FetchOfferListResponseDto.prototype, "data", void 0);
__decorate([
    (0, swagger_1.ApiProperty)({ required: false }),
    __metadata("design:type", message_dto_1.Pagination)
], FetchOfferListResponseDto.prototype, "pagination", void 0);
exports.FetchOfferListResponseDto = FetchOfferListResponseDto;
class FetchWishlistProductsPaginationDto {
}
__decorate([
    (0, swagger_1.ApiProperty)({ required: false }),
    (0, class_validator_1.IsNumber)(),
    (0, class_validator_1.IsOptional)(),
    (0, class_transformer_1.Type)(() => Number),
    (0, class_validator_1.IsNotEmpty)(),
    __metadata("design:type", Number)
], FetchWishlistProductsPaginationDto.prototype, "limit", void 0);
__decorate([
    (0, swagger_1.ApiProperty)({ required: false }),
    (0, class_validator_1.IsNumber)(),
    (0, class_validator_1.IsOptional)(),
    (0, class_transformer_1.Type)(() => Number),
    (0, class_validator_1.IsNotEmpty)(),
    __metadata("design:type", Number)
], FetchWishlistProductsPaginationDto.prototype, "offset", void 0);
__decorate([
    (0, swagger_1.ApiProperty)({ required: false }),
    (0, class_validator_1.IsNotEmpty)(),
    (0, class_validator_1.IsNumber)(),
    (0, class_validator_1.IsOptional)(),
    (0, class_transformer_1.Type)(() => Number),
    __metadata("design:type", Number)
], FetchWishlistProductsPaginationDto.prototype, "filterPriceHigh", void 0);
__decorate([
    (0, swagger_1.ApiProperty)({ required: false }),
    (0, class_validator_1.IsNotEmpty)(),
    (0, class_validator_1.IsNumber)(),
    (0, class_validator_1.IsOptional)(),
    (0, class_transformer_1.Type)(() => Number),
    __metadata("design:type", Number)
], FetchWishlistProductsPaginationDto.prototype, "filterPriceLow", void 0);
__decorate([
    (0, swagger_1.ApiProperty)({ required: false }),
    (0, class_validator_1.IsNotEmpty)(),
    (0, class_validator_1.IsBooleanString)(),
    (0, class_validator_1.IsOptional)(),
    __metadata("design:type", String)
], FetchWishlistProductsPaginationDto.prototype, "sortPrice", void 0);
__decorate([
    (0, swagger_1.ApiProperty)({ required: false }),
    (0, class_validator_1.IsOptional)(),
    (0, class_validator_1.IsNotEmpty)(),
    __metadata("design:type", String)
], FetchWishlistProductsPaginationDto.prototype, "searchName", void 0);
__decorate([
    (0, swagger_1.ApiProperty)({ required: false, type: Number, isArray: true }),
    (0, class_validator_1.IsNotEmpty)(),
    (0, class_validator_1.Matches)(/^[[0-9,]*[0-9]+]$/, {
        message: 'filter colour is in invalid format'
    }),
    (0, class_validator_1.IsOptional)(),
    __metadata("design:type", String)
], FetchWishlistProductsPaginationDto.prototype, "filterColour", void 0);
__decorate([
    (0, swagger_1.ApiProperty)({ required: false, type: Number, isArray: true }),
    (0, class_validator_1.IsNotEmpty)(),
    (0, class_validator_1.Matches)(/^[[0-9,]*[0-9]+]$/, {
        message: 'filter size is in invalid format'
    }),
    (0, class_validator_1.IsOptional)(),
    __metadata("design:type", String)
], FetchWishlistProductsPaginationDto.prototype, "filterSize", void 0);
__decorate([
    (0, swagger_1.ApiProperty)({ required: false }),
    (0, class_validator_1.IsNotEmpty)(),
    (0, class_validator_1.Matches)(/^[[0-9,]*[0-9]+]$/, {
        message: 'filter category is in invalid format'
    }),
    (0, class_validator_1.IsOptional)(),
    __metadata("design:type", String)
], FetchWishlistProductsPaginationDto.prototype, "filterCategory", void 0);
exports.FetchWishlistProductsPaginationDto = FetchWishlistProductsPaginationDto;
class FetchWishlistProductsDto {
}
__decorate([
    (0, swagger_1.ApiProperty)({ required: false }),
    __metadata("design:type", Number)
], FetchWishlistProductsDto.prototype, "productId", void 0);
__decorate([
    (0, swagger_1.ApiProperty)({ required: false }),
    __metadata("design:type", String)
], FetchWishlistProductsDto.prototype, "productName", void 0);
__decorate([
    (0, swagger_1.ApiProperty)({ required: false }),
    __metadata("design:type", Number)
], FetchWishlistProductsDto.prototype, "categoryId", void 0);
__decorate([
    (0, swagger_1.ApiProperty)({ required: false }),
    __metadata("design:type", String)
], FetchWishlistProductsDto.prototype, "categoryName", void 0);
__decorate([
    (0, swagger_1.ApiProperty)({ required: false }),
    __metadata("design:type", Number)
], FetchWishlistProductsDto.prototype, "price", void 0);
__decorate([
    (0, swagger_1.ApiProperty)({ required: false }),
    __metadata("design:type", Number)
], FetchWishlistProductsDto.prototype, "discountPercent", void 0);
__decorate([
    (0, swagger_1.ApiProperty)({ required: false }),
    __metadata("design:type", String)
], FetchWishlistProductsDto.prototype, "image", void 0);
__decorate([
    (0, swagger_1.ApiProperty)({ required: false }),
    __metadata("design:type", Number)
], FetchWishlistProductsDto.prototype, "count", void 0);
exports.FetchWishlistProductsDto = FetchWishlistProductsDto;
class FetchWishlistProductsResponseDto {
}
__decorate([
    (0, swagger_1.ApiProperty)({ required: false }),
    __metadata("design:type", String)
], FetchWishlistProductsResponseDto.prototype, "messsage", void 0);
__decorate([
    (0, swagger_1.ApiProperty)({ required: false, type: FetchWishlistProductsDto }),
    __metadata("design:type", FetchWishlistProductsDto)
], FetchWishlistProductsResponseDto.prototype, "data", void 0);
__decorate([
    (0, swagger_1.ApiProperty)({ required: false }),
    __metadata("design:type", message_dto_1.Pagination)
], FetchWishlistProductsResponseDto.prototype, "pagination", void 0);
exports.FetchWishlistProductsResponseDto = FetchWishlistProductsResponseDto;
class WishlistProductAssignDto {
}
__decorate([
    (0, swagger_1.ApiProperty)({ required: false }),
    (0, class_validator_1.IsOptional)(),
    (0, class_validator_1.IsNotEmpty)(),
    (0, class_validator_1.IsNumber)(),
    __metadata("design:type", Number)
], WishlistProductAssignDto.prototype, "storeId", void 0);
__decorate([
    (0, swagger_1.ApiProperty)({ required: false }),
    (0, class_validator_1.IsOptional)(),
    (0, class_validator_1.IsNotEmpty)(),
    (0, class_validator_1.IsNumber)(),
    __metadata("design:type", Number)
], WishlistProductAssignDto.prototype, "sectionId", void 0);
__decorate([
    (0, swagger_1.ApiProperty)({ required: false }),
    (0, class_validator_1.IsOptional)(),
    (0, class_validator_1.IsNotEmpty)(),
    (0, class_validator_1.IsNumber)(),
    __metadata("design:type", Number)
], WishlistProductAssignDto.prototype, "productId", void 0);
exports.WishlistProductAssignDto = WishlistProductAssignDto;
class FetchProductFilterData {
}
__decorate([
    (0, swagger_1.ApiProperty)({ required: false, type: Number, isArray: true }),
    (0, class_validator_1.IsNotEmpty)(),
    (0, class_validator_1.Matches)(/^[[0-9,]*[0-9]+]$/, {
        message: 'filter category is in invalid format'
    }),
    (0, class_validator_1.IsOptional)(),
    __metadata("design:type", String)
], FetchProductFilterData.prototype, "filterCategory", void 0);
__decorate([
    (0, swagger_1.ApiProperty)({ required: false }),
    (0, class_validator_1.IsNumber)(),
    (0, class_validator_1.IsOptional)(),
    (0, class_transformer_1.Type)(() => Number),
    (0, class_validator_1.IsNotEmpty)(),
    __metadata("design:type", Number)
], FetchProductFilterData.prototype, "offerId", void 0);
__decorate([
    (0, swagger_1.ApiProperty)({ required: false, type: joi_1.boolean }),
    (0, class_validator_1.IsNotEmpty)(),
    (0, class_validator_1.IsBooleanString)(),
    (0, class_validator_1.IsOptional)(),
    __metadata("design:type", String)
], FetchProductFilterData.prototype, "wishlist", void 0);
exports.FetchProductFilterData = FetchProductFilterData;
class SizeFilterData {
}
__decorate([
    (0, swagger_1.ApiProperty)({ required: false }),
    __metadata("design:type", Number)
], SizeFilterData.prototype, "sizeId", void 0);
__decorate([
    (0, swagger_1.ApiProperty)({ required: false }),
    __metadata("design:type", String)
], SizeFilterData.prototype, "size", void 0);
exports.SizeFilterData = SizeFilterData;
class ColourFilterData {
}
__decorate([
    (0, swagger_1.ApiProperty)({ required: false }),
    __metadata("design:type", Number)
], ColourFilterData.prototype, "colourId", void 0);
__decorate([
    (0, swagger_1.ApiProperty)({ required: false }),
    __metadata("design:type", String)
], ColourFilterData.prototype, "colour", void 0);
__decorate([
    (0, swagger_1.ApiProperty)({ required: false }),
    __metadata("design:type", String)
], ColourFilterData.prototype, "colour_code", void 0);
exports.ColourFilterData = ColourFilterData;
class CategoryFilterData {
}
__decorate([
    (0, swagger_1.ApiProperty)({ required: false }),
    __metadata("design:type", Number)
], CategoryFilterData.prototype, "categoryId", void 0);
__decorate([
    (0, swagger_1.ApiProperty)({ required: false }),
    __metadata("design:type", String)
], CategoryFilterData.prototype, "category", void 0);
exports.CategoryFilterData = CategoryFilterData;
class ProductFilterData {
}
__decorate([
    (0, swagger_1.ApiProperty)({ required: false, isArray: true }),
    __metadata("design:type", SizeFilterData)
], ProductFilterData.prototype, "size", void 0);
__decorate([
    (0, swagger_1.ApiProperty)({ required: false, isArray: true }),
    __metadata("design:type", ColourFilterData)
], ProductFilterData.prototype, "colour", void 0);
__decorate([
    (0, swagger_1.ApiProperty)({ required: false, isArray: true }),
    __metadata("design:type", CategoryFilterData)
], ProductFilterData.prototype, "category", void 0);
__decorate([
    (0, swagger_1.ApiProperty)({ required: false }),
    __metadata("design:type", Number)
], ProductFilterData.prototype, "minPrice", void 0);
__decorate([
    (0, swagger_1.ApiProperty)({ required: false }),
    __metadata("design:type", Number)
], ProductFilterData.prototype, "maxPrice", void 0);
exports.ProductFilterData = ProductFilterData;
class ProductFilterDataResponse {
}
__decorate([
    (0, swagger_1.ApiProperty)({ required: false }),
    __metadata("design:type", String)
], ProductFilterDataResponse.prototype, "message", void 0);
__decorate([
    (0, swagger_1.ApiProperty)({ required: false }),
    __metadata("design:type", ProductFilterData)
], ProductFilterDataResponse.prototype, "data", void 0);
exports.ProductFilterDataResponse = ProductFilterDataResponse;
class ProductIdArrayDto {
}
__decorate([
    (0, swagger_1.ApiProperty)({ required: false, isArray: true }),
    __metadata("design:type", Array)
], ProductIdArrayDto.prototype, "productId", void 0);
exports.ProductIdArrayDto = ProductIdArrayDto;
class SectionVisitParamDto {
}
__decorate([
    (0, swagger_1.ApiProperty)({ required: false }),
    (0, class_validator_1.IsNumber)(),
    (0, class_validator_1.IsOptional)(),
    (0, class_transformer_1.Type)(() => Number),
    (0, class_validator_1.IsNotEmpty)(),
    __metadata("design:type", Number)
], SectionVisitParamDto.prototype, "limit", void 0);
__decorate([
    (0, swagger_1.ApiProperty)({ required: false }),
    (0, class_validator_1.IsNumber)(),
    (0, class_validator_1.IsOptional)(),
    (0, class_transformer_1.Type)(() => Number),
    (0, class_validator_1.IsNotEmpty)(),
    __metadata("design:type", Number)
], SectionVisitParamDto.prototype, "offset", void 0);
__decorate([
    (0, swagger_1.ApiProperty)({ required: false }),
    (0, class_validator_1.IsNotEmpty)(),
    (0, class_validator_1.IsString)(),
    (0, class_validator_1.IsOptional)(),
    __metadata("design:type", String)
], SectionVisitParamDto.prototype, "searchName", void 0);
exports.SectionVisitParamDto = SectionVisitParamDto;
class SectionVisitDataDto {
}
__decorate([
    (0, swagger_1.ApiProperty)({ required: false }),
    __metadata("design:type", Number)
], SectionVisitDataDto.prototype, "sectionId", void 0);
__decorate([
    (0, swagger_1.ApiProperty)({ required: false }),
    __metadata("design:type", String)
], SectionVisitDataDto.prototype, "sectionName", void 0);
__decorate([
    (0, swagger_1.ApiProperty)({ required: false }),
    __metadata("design:type", Number)
], SectionVisitDataDto.prototype, "visited", void 0);
exports.SectionVisitDataDto = SectionVisitDataDto;
class SectionVisitDataResponseDto {
}
__decorate([
    (0, swagger_1.ApiProperty)({ required: false }),
    __metadata("design:type", String)
], SectionVisitDataResponseDto.prototype, "message", void 0);
__decorate([
    (0, swagger_1.ApiProperty)({ required: false }),
    __metadata("design:type", SectionVisitDataDto)
], SectionVisitDataResponseDto.prototype, "data", void 0);
exports.SectionVisitDataResponseDto = SectionVisitDataResponseDto;
//# sourceMappingURL=section.dto.js.map