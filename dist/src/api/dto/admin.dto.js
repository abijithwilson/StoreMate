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
exports.AdminLoginDto = exports.AdminPasswordUpdateDto = exports.SingleOfferProductAssignDto = exports.SingleOfferProductListResponseDto = exports.SingleOfferProductListDto = exports.SingleOfferProductListPaginationDto = exports.OfferId = exports.CreateOffer = exports.OfferFetchMessageDto = exports.OfferFetchDto = exports.UpdateOffer = exports.StoreAdminUpdateDto = exports.DeleteStoreAdminDto = exports.MessageAdminFetchDto = exports.StoreAdminFetchDTO = exports.StoreUnderStoreAdmin = exports.FetchAllStoreAdminMessageDto = exports.FetchAllStoreAdminDetail = exports.AssignedStores = exports.FetchAllStoreAdminPaginationDTO = exports.MessageDto = exports.AdminFetchMessageDto = exports.AdminDto = exports.AdminUpdateDto = exports.AdminIdDto = void 0;
const swagger_1 = require("@nestjs/swagger");
const class_transformer_1 = require("class-transformer");
const class_validator_1 = require("class-validator");
const joi_1 = require("joi");
const message_dto_1 = require("./message.dto");
class AdminIdDto {
}
__decorate([
    (0, swagger_1.ApiProperty)(),
    __metadata("design:type", Number)
], AdminIdDto.prototype, "adminId", void 0);
exports.AdminIdDto = AdminIdDto;
class AdminUpdateDto {
}
__decorate([
    (0, swagger_1.ApiProperty)({ required: false }),
    (0, class_validator_1.IsOptional)(),
    (0, class_validator_1.IsNotEmpty)(),
    (0, class_validator_1.IsString)(),
    __metadata("design:type", String)
], AdminUpdateDto.prototype, "phone", void 0);
__decorate([
    (0, swagger_1.ApiProperty)({ required: false }),
    (0, class_validator_1.IsOptional)(),
    (0, class_validator_1.IsNotEmpty)(),
    (0, class_validator_1.IsNumber)(),
    __metadata("design:type", Number)
], AdminUpdateDto.prototype, "countryId", void 0);
__decorate([
    (0, swagger_1.ApiProperty)({ required: false }),
    (0, class_validator_1.IsOptional)(),
    (0, class_validator_1.IsNotEmpty)(),
    (0, class_validator_1.IsNumber)(),
    __metadata("design:type", Number)
], AdminUpdateDto.prototype, "stateId", void 0);
__decorate([
    (0, swagger_1.ApiProperty)({ required: false }),
    (0, class_validator_1.IsOptional)(),
    (0, class_validator_1.IsNotEmpty)(),
    (0, class_validator_1.IsString)(),
    __metadata("design:type", String)
], AdminUpdateDto.prototype, "address", void 0);
__decorate([
    (0, swagger_1.ApiProperty)({ required: false }),
    (0, class_validator_1.IsOptional)(),
    (0, class_validator_1.IsNotEmpty)(),
    (0, class_validator_1.IsString)(),
    __metadata("design:type", String)
], AdminUpdateDto.prototype, "image", void 0);
exports.AdminUpdateDto = AdminUpdateDto;
class AdminDto {
}
__decorate([
    (0, swagger_1.ApiProperty)(),
    __metadata("design:type", String)
], AdminDto.prototype, "firstName", void 0);
__decorate([
    (0, swagger_1.ApiProperty)(),
    __metadata("design:type", String)
], AdminDto.prototype, "secondName", void 0);
__decorate([
    (0, swagger_1.ApiProperty)(),
    __metadata("design:type", String)
], AdminDto.prototype, "email", void 0);
__decorate([
    (0, swagger_1.ApiProperty)(),
    __metadata("design:type", String)
], AdminDto.prototype, "roles", void 0);
__decorate([
    (0, swagger_1.ApiProperty)(),
    __metadata("design:type", String)
], AdminDto.prototype, "image", void 0);
__decorate([
    (0, swagger_1.ApiProperty)(),
    __metadata("design:type", String)
], AdminDto.prototype, "phone", void 0);
__decorate([
    (0, swagger_1.ApiProperty)(),
    __metadata("design:type", String)
], AdminDto.prototype, "country", void 0);
__decorate([
    (0, swagger_1.ApiProperty)(),
    __metadata("design:type", String)
], AdminDto.prototype, "state", void 0);
__decorate([
    (0, swagger_1.ApiProperty)(),
    __metadata("design:type", String)
], AdminDto.prototype, "address", void 0);
exports.AdminDto = AdminDto;
class AdminFetchMessageDto {
}
__decorate([
    (0, swagger_1.ApiProperty)(),
    __metadata("design:type", String)
], AdminFetchMessageDto.prototype, "message", void 0);
__decorate([
    (0, swagger_1.ApiProperty)({ type: AdminDto }),
    __metadata("design:type", AdminDto)
], AdminFetchMessageDto.prototype, "data", void 0);
exports.AdminFetchMessageDto = AdminFetchMessageDto;
class MessageDto {
}
__decorate([
    (0, swagger_1.ApiProperty)(),
    __metadata("design:type", String)
], MessageDto.prototype, "message", void 0);
exports.MessageDto = MessageDto;
class FetchAllStoreAdminPaginationDTO {
}
__decorate([
    (0, swagger_1.ApiProperty)({ required: false }),
    (0, class_validator_1.IsNumber)(),
    (0, class_validator_1.IsOptional)(),
    (0, class_transformer_1.Type)(() => Number),
    (0, class_validator_1.IsNotEmpty)(),
    __metadata("design:type", Number)
], FetchAllStoreAdminPaginationDTO.prototype, "limit", void 0);
__decorate([
    (0, swagger_1.ApiProperty)({ required: false }),
    (0, class_validator_1.IsNumber)(),
    (0, class_validator_1.IsOptional)(),
    (0, class_transformer_1.Type)(() => Number),
    (0, class_validator_1.IsNotEmpty)(),
    __metadata("design:type", Number)
], FetchAllStoreAdminPaginationDTO.prototype, "offset", void 0);
__decorate([
    (0, swagger_1.ApiProperty)({ required: false }),
    (0, class_validator_1.IsString)(),
    (0, class_validator_1.IsOptional)(),
    (0, class_validator_1.IsNotEmpty)(),
    __metadata("design:type", String)
], FetchAllStoreAdminPaginationDTO.prototype, "adminName", void 0);
__decorate([
    (0, swagger_1.ApiProperty)({ required: false }),
    (0, class_validator_1.IsString)(),
    (0, class_validator_1.IsOptional)(),
    (0, class_validator_1.IsNotEmpty)(),
    (0, swagger_1.ApiProperty)(),
    __metadata("design:type", String)
], FetchAllStoreAdminPaginationDTO.prototype, "storeName", void 0);
__decorate([
    (0, class_validator_1.IsNotEmpty)(),
    (0, swagger_1.ApiProperty)({ required: false }),
    (0, class_validator_1.Matches)(/^[[0-9,]*[0-9]+]$/, {
        message: 'filter district is in invalid format'
    }),
    (0, class_validator_1.IsOptional)(),
    __metadata("design:type", String)
], FetchAllStoreAdminPaginationDTO.prototype, "districtId", void 0);
__decorate([
    (0, class_validator_1.IsNotEmpty)(),
    (0, swagger_1.ApiProperty)({ required: false }),
    (0, class_validator_1.Matches)(/^[[0-9,]*[0-9]+]$/, {
        message: 'filter state is in invalid format'
    }),
    (0, class_validator_1.IsOptional)(),
    __metadata("design:type", String)
], FetchAllStoreAdminPaginationDTO.prototype, "stateId", void 0);
__decorate([
    (0, class_validator_1.IsNotEmpty)(),
    (0, class_validator_1.Matches)(/^[[0-9,]*[0-9]+]$/, {
        message: 'filter country is in invalid Format'
    }),
    (0, swagger_1.ApiProperty)({ required: false }),
    (0, class_validator_1.IsOptional)(),
    (0, class_validator_1.Matches)('^[[0-9,]*[0-9]+]$'),
    __metadata("design:type", String)
], FetchAllStoreAdminPaginationDTO.prototype, "countryId", void 0);
exports.FetchAllStoreAdminPaginationDTO = FetchAllStoreAdminPaginationDTO;
class AssignedStores {
}
__decorate([
    (0, swagger_1.ApiProperty)({ required: false }),
    __metadata("design:type", Number)
], AssignedStores.prototype, "storeId", void 0);
__decorate([
    (0, swagger_1.ApiProperty)({ required: false }),
    __metadata("design:type", String)
], AssignedStores.prototype, "storeName", void 0);
__decorate([
    (0, swagger_1.ApiProperty)({ required: false }),
    __metadata("design:type", Number)
], AssignedStores.prototype, "districtId", void 0);
exports.AssignedStores = AssignedStores;
class FetchAllStoreAdminDetail {
}
__decorate([
    (0, swagger_1.ApiProperty)({ required: false }),
    __metadata("design:type", Number)
], FetchAllStoreAdminDetail.prototype, "adminId", void 0);
__decorate([
    (0, swagger_1.ApiProperty)({ required: false }),
    __metadata("design:type", String)
], FetchAllStoreAdminDetail.prototype, "firstName", void 0);
__decorate([
    (0, swagger_1.ApiProperty)({ required: false }),
    __metadata("design:type", String)
], FetchAllStoreAdminDetail.prototype, "lastName", void 0);
__decorate([
    (0, swagger_1.ApiProperty)({ required: false, isArray: true, type: AssignedStores }),
    __metadata("design:type", Array)
], FetchAllStoreAdminDetail.prototype, "stores", void 0);
exports.FetchAllStoreAdminDetail = FetchAllStoreAdminDetail;
class FetchAllStoreAdminMessageDto {
}
__decorate([
    (0, swagger_1.ApiProperty)({ required: false }),
    __metadata("design:type", String)
], FetchAllStoreAdminMessageDto.prototype, "message", void 0);
__decorate([
    (0, swagger_1.ApiProperty)({ required: false }),
    __metadata("design:type", FetchAllStoreAdminDetail)
], FetchAllStoreAdminMessageDto.prototype, "data", void 0);
__decorate([
    (0, swagger_1.ApiProperty)({ required: false }),
    __metadata("design:type", message_dto_1.Pagination)
], FetchAllStoreAdminMessageDto.prototype, "pagination", void 0);
exports.FetchAllStoreAdminMessageDto = FetchAllStoreAdminMessageDto;
class StoreUnderStoreAdmin {
}
__decorate([
    (0, swagger_1.ApiProperty)({ required: false }),
    __metadata("design:type", Number)
], StoreUnderStoreAdmin.prototype, "storeId", void 0);
__decorate([
    (0, swagger_1.ApiProperty)({ required: false }),
    __metadata("design:type", String)
], StoreUnderStoreAdmin.prototype, "storeName", void 0);
exports.StoreUnderStoreAdmin = StoreUnderStoreAdmin;
class StoreAdminFetchDTO {
}
__decorate([
    (0, swagger_1.ApiProperty)({ required: false }),
    __metadata("design:type", Number)
], StoreAdminFetchDTO.prototype, "adminId", void 0);
__decorate([
    (0, swagger_1.ApiProperty)({ required: false }),
    __metadata("design:type", String)
], StoreAdminFetchDTO.prototype, "firstName", void 0);
__decorate([
    (0, swagger_1.ApiProperty)({ required: false }),
    __metadata("design:type", String)
], StoreAdminFetchDTO.prototype, "lastName", void 0);
__decorate([
    (0, swagger_1.ApiProperty)({ required: false }),
    __metadata("design:type", String)
], StoreAdminFetchDTO.prototype, "email", void 0);
__decorate([
    (0, swagger_1.ApiProperty)({ required: false }),
    __metadata("design:type", String)
], StoreAdminFetchDTO.prototype, "image", void 0);
__decorate([
    (0, swagger_1.ApiProperty)({ required: false }),
    __metadata("design:type", String)
], StoreAdminFetchDTO.prototype, "phone", void 0);
__decorate([
    (0, swagger_1.ApiProperty)({ required: false }),
    __metadata("design:type", Number)
], StoreAdminFetchDTO.prototype, "countryId", void 0);
__decorate([
    (0, swagger_1.ApiProperty)({ required: false }),
    __metadata("design:type", Number)
], StoreAdminFetchDTO.prototype, "stateId", void 0);
__decorate([
    (0, swagger_1.ApiProperty)({ required: false }),
    __metadata("design:type", String)
], StoreAdminFetchDTO.prototype, "countryName", void 0);
__decorate([
    (0, swagger_1.ApiProperty)({ required: false }),
    __metadata("design:type", String)
], StoreAdminFetchDTO.prototype, "stateName", void 0);
__decorate([
    (0, swagger_1.ApiProperty)({ required: false }),
    __metadata("design:type", String)
], StoreAdminFetchDTO.prototype, "address", void 0);
__decorate([
    (0, swagger_1.ApiProperty)({ required: false }),
    __metadata("design:type", StoreUnderStoreAdmin)
], StoreAdminFetchDTO.prototype, "stores", void 0);
exports.StoreAdminFetchDTO = StoreAdminFetchDTO;
class MessageAdminFetchDto {
}
__decorate([
    (0, swagger_1.ApiProperty)({ required: false }),
    __metadata("design:type", String)
], MessageAdminFetchDto.prototype, "message", void 0);
__decorate([
    (0, swagger_1.ApiProperty)({ required: false }),
    __metadata("design:type", StoreAdminFetchDTO)
], MessageAdminFetchDto.prototype, "data", void 0);
exports.MessageAdminFetchDto = MessageAdminFetchDto;
class DeleteStoreAdminDto {
}
__decorate([
    (0, swagger_1.ApiProperty)({ required: true, type: [Number] }),
    (0, class_transformer_1.Type)(() => Number),
    (0, class_validator_1.IsNumber)({}, { each: true }),
    __metadata("design:type", Array)
], DeleteStoreAdminDto.prototype, "storeAdminId", void 0);
exports.DeleteStoreAdminDto = DeleteStoreAdminDto;
class StoreAdminUpdateDto {
}
__decorate([
    (0, swagger_1.ApiProperty)({ required: false }),
    (0, class_validator_1.IsOptional)(),
    (0, class_validator_1.IsNotEmpty)(),
    (0, class_validator_1.IsString)(),
    __metadata("design:type", String)
], StoreAdminUpdateDto.prototype, "firstName", void 0);
__decorate([
    (0, swagger_1.ApiProperty)({ required: false }),
    (0, class_validator_1.IsOptional)(),
    (0, class_validator_1.IsNotEmpty)(),
    (0, class_validator_1.IsString)(),
    __metadata("design:type", String)
], StoreAdminUpdateDto.prototype, "lastName", void 0);
__decorate([
    (0, swagger_1.ApiProperty)({ required: false }),
    (0, class_validator_1.IsOptional)(),
    (0, class_validator_1.IsNotEmpty)(),
    (0, class_validator_1.IsString)(),
    __metadata("design:type", String)
], StoreAdminUpdateDto.prototype, "phone", void 0);
__decorate([
    (0, swagger_1.ApiProperty)({ required: false }),
    (0, class_validator_1.IsOptional)(),
    (0, class_validator_1.IsNotEmpty)(),
    (0, class_validator_1.IsNumber)(),
    __metadata("design:type", Number)
], StoreAdminUpdateDto.prototype, "countryId", void 0);
__decorate([
    (0, swagger_1.ApiProperty)({ required: false }),
    (0, class_validator_1.IsOptional)(),
    (0, class_validator_1.IsNotEmpty)(),
    (0, class_validator_1.IsNumber)(),
    __metadata("design:type", Number)
], StoreAdminUpdateDto.prototype, "stateId", void 0);
__decorate([
    (0, swagger_1.ApiProperty)({ required: false }),
    (0, class_validator_1.IsOptional)(),
    (0, class_validator_1.IsNotEmpty)(),
    (0, class_validator_1.IsString)(),
    __metadata("design:type", String)
], StoreAdminUpdateDto.prototype, "address", void 0);
__decorate([
    (0, swagger_1.ApiProperty)({ required: true, type: [Number] }),
    (0, class_validator_1.IsOptional)(),
    (0, class_transformer_1.Type)(() => Number),
    (0, class_validator_1.IsNumber)({}, { each: true }),
    __metadata("design:type", Array)
], StoreAdminUpdateDto.prototype, "assignedStoreId", void 0);
__decorate([
    (0, swagger_1.ApiProperty)({ required: true, type: [Number] }),
    (0, class_validator_1.IsOptional)(),
    (0, class_transformer_1.Type)(() => Number),
    (0, class_validator_1.IsNumber)({}, { each: true }),
    __metadata("design:type", Array)
], StoreAdminUpdateDto.prototype, "unassignedStoreId", void 0);
exports.StoreAdminUpdateDto = StoreAdminUpdateDto;
class UpdateOffer {
}
__decorate([
    (0, swagger_1.ApiProperty)(),
    (0, class_validator_1.IsOptional)(),
    (0, class_validator_1.IsNotEmpty)(),
    (0, class_validator_1.IsString)(),
    __metadata("design:type", String)
], UpdateOffer.prototype, "offerTitle", void 0);
__decorate([
    (0, swagger_1.ApiProperty)(),
    (0, class_validator_1.IsOptional)(),
    (0, class_validator_1.IsNotEmpty)(),
    (0, class_validator_1.IsString)(),
    __metadata("design:type", String)
], UpdateOffer.prototype, "image", void 0);
__decorate([
    (0, swagger_1.ApiProperty)(),
    (0, class_validator_1.IsOptional)(),
    (0, class_validator_1.IsNotEmpty)(),
    (0, class_validator_1.IsString)(),
    __metadata("design:type", String)
], UpdateOffer.prototype, "description", void 0);
__decorate([
    (0, swagger_1.ApiProperty)({ type: Date, example: '2022-11-04' }),
    (0, class_validator_1.IsISO8601)(),
    (0, class_validator_1.IsOptional)(),
    (0, class_validator_1.IsNotEmpty)(),
    __metadata("design:type", String)
], UpdateOffer.prototype, "startDate", void 0);
__decorate([
    (0, swagger_1.ApiProperty)({ type: Date, example: '2022-11-04' }),
    (0, class_validator_1.IsISO8601)(),
    (0, class_validator_1.IsOptional)(),
    (0, class_validator_1.IsNotEmpty)(),
    __metadata("design:type", String)
], UpdateOffer.prototype, "endDate", void 0);
exports.UpdateOffer = UpdateOffer;
class OfferFetchDto {
}
__decorate([
    (0, swagger_1.ApiProperty)(),
    __metadata("design:type", Number)
], OfferFetchDto.prototype, "offerId", void 0);
__decorate([
    (0, swagger_1.ApiProperty)(),
    __metadata("design:type", String)
], OfferFetchDto.prototype, "offerTitle", void 0);
__decorate([
    (0, swagger_1.ApiProperty)(),
    __metadata("design:type", String)
], OfferFetchDto.prototype, "image", void 0);
__decorate([
    (0, swagger_1.ApiProperty)(),
    __metadata("design:type", String)
], OfferFetchDto.prototype, "description", void 0);
__decorate([
    (0, swagger_1.ApiProperty)({ type: Date, example: '2022-11-04' }),
    __metadata("design:type", String)
], OfferFetchDto.prototype, "startDate", void 0);
__decorate([
    (0, swagger_1.ApiProperty)({ type: Date, example: '2022-11-04' }),
    __metadata("design:type", String)
], OfferFetchDto.prototype, "endDate", void 0);
exports.OfferFetchDto = OfferFetchDto;
class OfferFetchMessageDto {
}
__decorate([
    (0, swagger_1.ApiProperty)(),
    __metadata("design:type", String)
], OfferFetchMessageDto.prototype, "message", void 0);
__decorate([
    (0, swagger_1.ApiProperty)({ type: OfferFetchDto }),
    __metadata("design:type", OfferFetchDto)
], OfferFetchMessageDto.prototype, "data", void 0);
exports.OfferFetchMessageDto = OfferFetchMessageDto;
class CreateOffer {
}
__decorate([
    (0, swagger_1.ApiProperty)(),
    (0, class_validator_1.IsNotEmpty)(),
    (0, class_validator_1.IsString)(),
    __metadata("design:type", String)
], CreateOffer.prototype, "offerTitle", void 0);
__decorate([
    (0, swagger_1.ApiProperty)(),
    (0, class_validator_1.IsNotEmpty)(),
    (0, class_validator_1.IsString)(),
    __metadata("design:type", String)
], CreateOffer.prototype, "image", void 0);
__decorate([
    (0, swagger_1.ApiProperty)(),
    (0, class_validator_1.IsNotEmpty)(),
    (0, class_validator_1.IsString)(),
    __metadata("design:type", String)
], CreateOffer.prototype, "description", void 0);
__decorate([
    (0, swagger_1.ApiProperty)({ type: Date, example: '2022-11-04' }),
    (0, class_validator_1.IsISO8601)(),
    (0, class_validator_1.IsNotEmpty)(),
    __metadata("design:type", String)
], CreateOffer.prototype, "startDate", void 0);
__decorate([
    (0, swagger_1.ApiProperty)({ type: Date, example: '2022-11-04' }),
    (0, class_validator_1.IsISO8601)(),
    (0, class_validator_1.IsNotEmpty)(),
    __metadata("design:type", String)
], CreateOffer.prototype, "endDate", void 0);
exports.CreateOffer = CreateOffer;
class OfferId {
}
exports.OfferId = OfferId;
class SingleOfferProductListPaginationDto {
}
__decorate([
    (0, swagger_1.ApiProperty)(),
    (0, class_validator_1.IsNumber)(),
    (0, class_validator_1.IsOptional)(),
    (0, class_transformer_1.Type)(() => Number),
    (0, class_validator_1.IsNotEmpty)(),
    __metadata("design:type", Number)
], SingleOfferProductListPaginationDto.prototype, "limit", void 0);
__decorate([
    (0, swagger_1.ApiProperty)(),
    (0, class_validator_1.IsNumber)(),
    (0, class_validator_1.IsOptional)(),
    (0, class_transformer_1.Type)(() => Number),
    (0, class_validator_1.IsNotEmpty)(),
    __metadata("design:type", Number)
], SingleOfferProductListPaginationDto.prototype, "offset", void 0);
__decorate([
    (0, swagger_1.ApiProperty)(),
    (0, class_validator_1.IsNotEmpty)(),
    (0, class_validator_1.IsString)(),
    (0, class_validator_1.IsOptional)(),
    __metadata("design:type", String)
], SingleOfferProductListPaginationDto.prototype, "sortField", void 0);
__decorate([
    (0, swagger_1.ApiProperty)({ required: false }),
    (0, class_validator_1.IsNotEmpty)(),
    (0, class_validator_1.IsBooleanString)(),
    (0, class_validator_1.IsOptional)(),
    __metadata("design:type", String)
], SingleOfferProductListPaginationDto.prototype, "sortOrder", void 0);
__decorate([
    (0, swagger_1.ApiProperty)({ required: false }),
    (0, class_validator_1.IsNotEmpty)(),
    (0, class_validator_1.Matches)(/^[[0-9,]*[0-9]+]$/, {
        message: 'filter category is in invalid format'
    }),
    (0, class_validator_1.IsOptional)(),
    __metadata("design:type", String)
], SingleOfferProductListPaginationDto.prototype, "filterCategory", void 0);
__decorate([
    (0, swagger_1.ApiProperty)({ required: false, type: joi_1.boolean }),
    (0, class_validator_1.IsNotEmpty)(),
    (0, class_validator_1.IsBooleanString)(),
    (0, class_validator_1.IsOptional)(),
    __metadata("design:type", String)
], SingleOfferProductListPaginationDto.prototype, "assigned", void 0);
exports.SingleOfferProductListPaginationDto = SingleOfferProductListPaginationDto;
class SingleOfferProductListDto {
}
__decorate([
    (0, swagger_1.ApiProperty)(),
    __metadata("design:type", Number)
], SingleOfferProductListDto.prototype, "productId", void 0);
__decorate([
    (0, swagger_1.ApiProperty)(),
    __metadata("design:type", Number)
], SingleOfferProductListDto.prototype, "skuId", void 0);
__decorate([
    (0, swagger_1.ApiProperty)(),
    __metadata("design:type", String)
], SingleOfferProductListDto.prototype, "productName", void 0);
__decorate([
    (0, swagger_1.ApiProperty)(),
    __metadata("design:type", Number)
], SingleOfferProductListDto.prototype, "categoryId", void 0);
__decorate([
    (0, swagger_1.ApiProperty)(),
    __metadata("design:type", String)
], SingleOfferProductListDto.prototype, "categoryName", void 0);
__decorate([
    (0, swagger_1.ApiProperty)(),
    __metadata("design:type", String)
], SingleOfferProductListDto.prototype, "productImage", void 0);
__decorate([
    (0, swagger_1.ApiProperty)(),
    __metadata("design:type", Number)
], SingleOfferProductListDto.prototype, "basePrice", void 0);
__decorate([
    (0, swagger_1.ApiProperty)(),
    __metadata("design:type", Number)
], SingleOfferProductListDto.prototype, "discountPercent", void 0);
__decorate([
    (0, swagger_1.ApiProperty)(),
    __metadata("design:type", Number)
], SingleOfferProductListDto.prototype, "count", void 0);
exports.SingleOfferProductListDto = SingleOfferProductListDto;
class SingleOfferProductListResponseDto {
}
__decorate([
    (0, swagger_1.ApiProperty)({ required: false }),
    __metadata("design:type", String)
], SingleOfferProductListResponseDto.prototype, "message", void 0);
__decorate([
    (0, swagger_1.ApiProperty)(),
    __metadata("design:type", SingleOfferProductListDto)
], SingleOfferProductListResponseDto.prototype, "data", void 0);
__decorate([
    (0, swagger_1.ApiProperty)({ required: false }),
    __metadata("design:type", message_dto_1.Pagination)
], SingleOfferProductListResponseDto.prototype, "pagination", void 0);
exports.SingleOfferProductListResponseDto = SingleOfferProductListResponseDto;
class SingleOfferProductAssignDto {
}
__decorate([
    (0, swagger_1.ApiProperty)({ required: true }),
    (0, class_validator_1.IsNotEmpty)(),
    (0, class_validator_1.IsNumber)(),
    __metadata("design:type", Number)
], SingleOfferProductAssignDto.prototype, "offerId", void 0);
__decorate([
    (0, swagger_1.ApiProperty)({ required: true, type: [Number] }),
    (0, class_transformer_1.Type)(() => Number),
    (0, class_validator_1.IsNumber)({}, { each: true }),
    __metadata("design:type", Array)
], SingleOfferProductAssignDto.prototype, "productId", void 0);
exports.SingleOfferProductAssignDto = SingleOfferProductAssignDto;
class AdminPasswordUpdateDto {
}
__decorate([
    (0, swagger_1.ApiProperty)({ required: true }),
    (0, class_validator_1.IsString)(),
    __metadata("design:type", String)
], AdminPasswordUpdateDto.prototype, "oldPassword", void 0);
__decorate([
    (0, swagger_1.ApiProperty)({ required: true }),
    (0, class_validator_1.IsString)(),
    __metadata("design:type", String)
], AdminPasswordUpdateDto.prototype, "newPassword", void 0);
exports.AdminPasswordUpdateDto = AdminPasswordUpdateDto;
class AdminLoginDto {
}
__decorate([
    (0, swagger_1.ApiProperty)(),
    __metadata("design:type", String)
], AdminLoginDto.prototype, "adminId", void 0);
__decorate([
    (0, swagger_1.ApiProperty)(),
    __metadata("design:type", String)
], AdminLoginDto.prototype, "email", void 0);
__decorate([
    (0, swagger_1.ApiProperty)(),
    __metadata("design:type", String)
], AdminLoginDto.prototype, "password", void 0);
__decorate([
    (0, swagger_1.ApiProperty)(),
    __metadata("design:type", String)
], AdminLoginDto.prototype, "salt", void 0);
exports.AdminLoginDto = AdminLoginDto;
//# sourceMappingURL=admin.dto.js.map