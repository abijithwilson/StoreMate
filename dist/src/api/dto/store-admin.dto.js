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
exports.StoreDashboardResponseDto = exports.StoreDashboardDto = exports.BeaconMessageDto = exports.BeaconIdDto = exports.UnAssignBeaconDto = exports.AssignBeaconDto = exports.BeaconPaginationQueryParam = exports.BeaconFetchMessageDto = exports.BeaconFetchDto = exports.FetchVisitorsCountResponseDto = exports.VisitorsCountDto = exports.FetchSectionWiseProductsResponseDto = exports.FetchSectionWiseProductsPaginationDto = exports.FetchSectionWiseProductsDto = exports.FetchAllAssignedStoresPaginationDto = exports.FetchAssignedStoresResponseDto = exports.StoresUnderStoreAdmin = exports.StoreAdminProfileFetchResponseDto = exports.StoreAdminProfileFetchDTO = exports.StoresAssignedToStoreAdmin = exports.StoreAdminUpdateDto = void 0;
const swagger_1 = require("@nestjs/swagger");
const class_transformer_1 = require("class-transformer");
const class_validator_1 = require("class-validator");
const message_dto_1 = require("./message.dto");
class StoreAdminUpdateDto {
}
__decorate([
    (0, swagger_1.ApiProperty)({ required: false }),
    (0, class_validator_1.IsOptional)(),
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
    (0, swagger_1.ApiProperty)({ required: false }),
    (0, class_validator_1.IsOptional)(),
    (0, class_validator_1.IsNotEmpty)(),
    (0, class_validator_1.IsString)(),
    __metadata("design:type", String)
], StoreAdminUpdateDto.prototype, "image", void 0);
exports.StoreAdminUpdateDto = StoreAdminUpdateDto;
class StoresAssignedToStoreAdmin {
}
__decorate([
    (0, swagger_1.ApiProperty)({ required: false }),
    __metadata("design:type", Number)
], StoresAssignedToStoreAdmin.prototype, "storeId", void 0);
__decorate([
    (0, swagger_1.ApiProperty)({ required: false }),
    __metadata("design:type", String)
], StoresAssignedToStoreAdmin.prototype, "storeName", void 0);
exports.StoresAssignedToStoreAdmin = StoresAssignedToStoreAdmin;
class StoreAdminProfileFetchDTO {
}
__decorate([
    (0, swagger_1.ApiProperty)({ required: false }),
    __metadata("design:type", Number)
], StoreAdminProfileFetchDTO.prototype, "adminId", void 0);
__decorate([
    (0, swagger_1.ApiProperty)({ required: false }),
    __metadata("design:type", String)
], StoreAdminProfileFetchDTO.prototype, "firstName", void 0);
__decorate([
    (0, swagger_1.ApiProperty)({ required: false }),
    __metadata("design:type", String)
], StoreAdminProfileFetchDTO.prototype, "lastName", void 0);
__decorate([
    (0, swagger_1.ApiProperty)({ required: false }),
    __metadata("design:type", String)
], StoreAdminProfileFetchDTO.prototype, "email", void 0);
__decorate([
    (0, swagger_1.ApiProperty)({ required: false }),
    __metadata("design:type", String)
], StoreAdminProfileFetchDTO.prototype, "image", void 0);
__decorate([
    (0, swagger_1.ApiProperty)({ required: false }),
    __metadata("design:type", String)
], StoreAdminProfileFetchDTO.prototype, "phone", void 0);
__decorate([
    (0, swagger_1.ApiProperty)({ required: false }),
    __metadata("design:type", Number)
], StoreAdminProfileFetchDTO.prototype, "countryId", void 0);
__decorate([
    (0, swagger_1.ApiProperty)({ required: false }),
    __metadata("design:type", Number)
], StoreAdminProfileFetchDTO.prototype, "stateId", void 0);
__decorate([
    (0, swagger_1.ApiProperty)({ required: false }),
    __metadata("design:type", String)
], StoreAdminProfileFetchDTO.prototype, "countryName", void 0);
__decorate([
    (0, swagger_1.ApiProperty)({ required: false }),
    __metadata("design:type", String)
], StoreAdminProfileFetchDTO.prototype, "stateName", void 0);
__decorate([
    (0, swagger_1.ApiProperty)({ required: false }),
    __metadata("design:type", String)
], StoreAdminProfileFetchDTO.prototype, "address", void 0);
__decorate([
    (0, swagger_1.ApiProperty)({ required: false, isArray: true }),
    __metadata("design:type", StoresAssignedToStoreAdmin)
], StoreAdminProfileFetchDTO.prototype, "stores", void 0);
exports.StoreAdminProfileFetchDTO = StoreAdminProfileFetchDTO;
class StoreAdminProfileFetchResponseDto {
}
__decorate([
    (0, swagger_1.ApiProperty)({ required: false }),
    __metadata("design:type", String)
], StoreAdminProfileFetchResponseDto.prototype, "message", void 0);
__decorate([
    (0, swagger_1.ApiProperty)({ required: false }),
    __metadata("design:type", StoreAdminProfileFetchDTO)
], StoreAdminProfileFetchResponseDto.prototype, "data", void 0);
exports.StoreAdminProfileFetchResponseDto = StoreAdminProfileFetchResponseDto;
class StoresUnderStoreAdmin {
}
__decorate([
    (0, swagger_1.ApiProperty)({ required: false }),
    __metadata("design:type", Number)
], StoresUnderStoreAdmin.prototype, "storeId", void 0);
__decorate([
    (0, swagger_1.ApiProperty)({ required: false }),
    __metadata("design:type", String)
], StoresUnderStoreAdmin.prototype, "storeName", void 0);
__decorate([
    (0, swagger_1.ApiProperty)({ required: false }),
    __metadata("design:type", String)
], StoresUnderStoreAdmin.prototype, "district_name", void 0);
exports.StoresUnderStoreAdmin = StoresUnderStoreAdmin;
class FetchAssignedStoresResponseDto {
}
__decorate([
    (0, swagger_1.ApiProperty)({ required: false }),
    __metadata("design:type", String)
], FetchAssignedStoresResponseDto.prototype, "message", void 0);
__decorate([
    (0, swagger_1.ApiProperty)({ required: false, isArray: true }),
    __metadata("design:type", StoresUnderStoreAdmin)
], FetchAssignedStoresResponseDto.prototype, "data", void 0);
__decorate([
    (0, swagger_1.ApiProperty)({ required: false }),
    __metadata("design:type", message_dto_1.Pagination)
], FetchAssignedStoresResponseDto.prototype, "pagination", void 0);
exports.FetchAssignedStoresResponseDto = FetchAssignedStoresResponseDto;
class FetchAllAssignedStoresPaginationDto {
}
__decorate([
    (0, swagger_1.ApiProperty)({ required: false }),
    (0, class_validator_1.IsNumber)(),
    (0, class_validator_1.IsOptional)(),
    (0, class_transformer_1.Type)(() => Number),
    (0, class_validator_1.IsNotEmpty)(),
    __metadata("design:type", Number)
], FetchAllAssignedStoresPaginationDto.prototype, "limit", void 0);
__decorate([
    (0, swagger_1.ApiProperty)({ required: false }),
    (0, class_validator_1.IsNumber)(),
    (0, class_validator_1.IsOptional)(),
    (0, class_transformer_1.Type)(() => Number),
    (0, class_validator_1.IsNotEmpty)(),
    __metadata("design:type", Number)
], FetchAllAssignedStoresPaginationDto.prototype, "offset", void 0);
exports.FetchAllAssignedStoresPaginationDto = FetchAllAssignedStoresPaginationDto;
class FetchSectionWiseProductsDto {
}
__decorate([
    (0, swagger_1.ApiProperty)({ required: false }),
    __metadata("design:type", Number)
], FetchSectionWiseProductsDto.prototype, "productId", void 0);
__decorate([
    (0, swagger_1.ApiProperty)({ required: false }),
    __metadata("design:type", String)
], FetchSectionWiseProductsDto.prototype, "image", void 0);
__decorate([
    (0, swagger_1.ApiProperty)({ required: false }),
    __metadata("design:type", String)
], FetchSectionWiseProductsDto.prototype, "productName", void 0);
__decorate([
    (0, swagger_1.ApiProperty)({ required: false }),
    __metadata("design:type", Number)
], FetchSectionWiseProductsDto.prototype, "categoryId", void 0);
__decorate([
    (0, swagger_1.ApiProperty)({ required: false }),
    __metadata("design:type", String)
], FetchSectionWiseProductsDto.prototype, "categoryName", void 0);
__decorate([
    (0, swagger_1.ApiProperty)({ required: false }),
    __metadata("design:type", Number)
], FetchSectionWiseProductsDto.prototype, "price", void 0);
__decorate([
    (0, swagger_1.ApiProperty)({ required: false }),
    __metadata("design:type", Number)
], FetchSectionWiseProductsDto.prototype, "discountPercent", void 0);
__decorate([
    (0, swagger_1.ApiProperty)({ required: false }),
    __metadata("design:type", Number)
], FetchSectionWiseProductsDto.prototype, "skuId", void 0);
__decorate([
    (0, swagger_1.ApiProperty)({ required: false }),
    __metadata("design:type", String)
], FetchSectionWiseProductsDto.prototype, "skuUniqueId", void 0);
__decorate([
    (0, swagger_1.ApiProperty)({ required: false }),
    __metadata("design:type", Number)
], FetchSectionWiseProductsDto.prototype, "count", void 0);
exports.FetchSectionWiseProductsDto = FetchSectionWiseProductsDto;
class FetchSectionWiseProductsPaginationDto {
}
__decorate([
    (0, swagger_1.ApiProperty)({ required: false }),
    (0, class_validator_1.IsNumber)(),
    (0, class_validator_1.IsOptional)(),
    (0, class_transformer_1.Type)(() => Number),
    (0, class_validator_1.IsNotEmpty)(),
    __metadata("design:type", Number)
], FetchSectionWiseProductsPaginationDto.prototype, "limit", void 0);
__decorate([
    (0, swagger_1.ApiProperty)({ required: false }),
    (0, class_validator_1.IsNumber)(),
    (0, class_validator_1.IsOptional)(),
    (0, class_transformer_1.Type)(() => Number),
    (0, class_validator_1.IsNotEmpty)(),
    __metadata("design:type", Number)
], FetchSectionWiseProductsPaginationDto.prototype, "offset", void 0);
__decorate([
    (0, swagger_1.ApiProperty)({ required: false }),
    (0, class_validator_1.IsNotEmpty)(),
    (0, class_validator_1.IsString)(),
    (0, class_validator_1.IsOptional)(),
    __metadata("design:type", String)
], FetchSectionWiseProductsPaginationDto.prototype, "sortField", void 0);
__decorate([
    (0, swagger_1.ApiProperty)({ required: false }),
    (0, class_validator_1.IsNotEmpty)(),
    (0, class_validator_1.IsBooleanString)(),
    (0, class_validator_1.IsOptional)(),
    __metadata("design:type", String)
], FetchSectionWiseProductsPaginationDto.prototype, "sortOrder", void 0);
__decorate([
    (0, swagger_1.ApiProperty)({ required: false }),
    (0, class_validator_1.IsNotEmpty)(),
    (0, class_validator_1.Matches)(/^[[0-9,]*[0-9]+]$/, {
        message: 'filter category is in invalid format'
    }),
    (0, class_validator_1.IsOptional)(),
    __metadata("design:type", String)
], FetchSectionWiseProductsPaginationDto.prototype, "filterCategory", void 0);
exports.FetchSectionWiseProductsPaginationDto = FetchSectionWiseProductsPaginationDto;
class FetchSectionWiseProductsResponseDto {
}
__decorate([
    (0, swagger_1.ApiProperty)({ required: false }),
    __metadata("design:type", String)
], FetchSectionWiseProductsResponseDto.prototype, "message", void 0);
__decorate([
    (0, swagger_1.ApiProperty)({
        required: false,
        isArray: true,
        type: FetchSectionWiseProductsDto
    }),
    __metadata("design:type", Array)
], FetchSectionWiseProductsResponseDto.prototype, "data", void 0);
__decorate([
    (0, swagger_1.ApiProperty)({ required: false }),
    __metadata("design:type", message_dto_1.Pagination)
], FetchSectionWiseProductsResponseDto.prototype, "pagination", void 0);
exports.FetchSectionWiseProductsResponseDto = FetchSectionWiseProductsResponseDto;
class VisitorsCountDto {
}
__decorate([
    (0, swagger_1.ApiProperty)({ required: false }),
    __metadata("design:type", Number)
], VisitorsCountDto.prototype, "totalVisitors", void 0);
__decorate([
    (0, swagger_1.ApiProperty)({ required: false }),
    __metadata("design:type", Number)
], VisitorsCountDto.prototype, "activeVisitors", void 0);
exports.VisitorsCountDto = VisitorsCountDto;
class FetchVisitorsCountResponseDto {
}
__decorate([
    (0, swagger_1.ApiProperty)({ required: false }),
    __metadata("design:type", String)
], FetchVisitorsCountResponseDto.prototype, "message", void 0);
__decorate([
    (0, swagger_1.ApiProperty)({ required: false, type: VisitorsCountDto }),
    __metadata("design:type", VisitorsCountDto)
], FetchVisitorsCountResponseDto.prototype, "data", void 0);
exports.FetchVisitorsCountResponseDto = FetchVisitorsCountResponseDto;
class BeaconFetchDto {
}
__decorate([
    (0, swagger_1.ApiProperty)(),
    __metadata("design:type", Number)
], BeaconFetchDto.prototype, "beacon_id", void 0);
__decorate([
    (0, swagger_1.ApiProperty)(),
    __metadata("design:type", String)
], BeaconFetchDto.prototype, "name", void 0);
__decorate([
    (0, swagger_1.ApiProperty)(),
    __metadata("design:type", String)
], BeaconFetchDto.prototype, "majorId", void 0);
__decorate([
    (0, swagger_1.ApiProperty)(),
    __metadata("design:type", String)
], BeaconFetchDto.prototype, "deviceId", void 0);
__decorate([
    (0, swagger_1.ApiProperty)(),
    __metadata("design:type", Number)
], BeaconFetchDto.prototype, "minorId", void 0);
__decorate([
    (0, swagger_1.ApiProperty)(),
    __metadata("design:type", Number)
], BeaconFetchDto.prototype, "sectionId", void 0);
__decorate([
    (0, swagger_1.ApiProperty)(),
    __metadata("design:type", String)
], BeaconFetchDto.prototype, "sectionName", void 0);
__decorate([
    (0, swagger_1.ApiProperty)(),
    __metadata("design:type", Number)
], BeaconFetchDto.prototype, "count", void 0);
exports.BeaconFetchDto = BeaconFetchDto;
class BeaconFetchMessageDto {
}
__decorate([
    (0, swagger_1.ApiProperty)(),
    __metadata("design:type", String)
], BeaconFetchMessageDto.prototype, "message", void 0);
__decorate([
    (0, swagger_1.ApiProperty)({ type: BeaconFetchDto, isArray: true }),
    __metadata("design:type", Array)
], BeaconFetchMessageDto.prototype, "data", void 0);
__decorate([
    (0, swagger_1.ApiProperty)(),
    __metadata("design:type", message_dto_1.Pagination)
], BeaconFetchMessageDto.prototype, "pagination", void 0);
exports.BeaconFetchMessageDto = BeaconFetchMessageDto;
class BeaconPaginationQueryParam {
}
__decorate([
    (0, swagger_1.ApiProperty)(),
    __metadata("design:type", Number)
], BeaconPaginationQueryParam.prototype, "limit", void 0);
__decorate([
    (0, swagger_1.ApiProperty)(),
    __metadata("design:type", Number)
], BeaconPaginationQueryParam.prototype, "offset", void 0);
__decorate([
    (0, swagger_1.ApiProperty)(),
    __metadata("design:type", Number)
], BeaconPaginationQueryParam.prototype, "sectionId", void 0);
exports.BeaconPaginationQueryParam = BeaconPaginationQueryParam;
class AssignBeaconDto {
}
__decorate([
    (0, swagger_1.ApiProperty)({ type: Number, isArray: true }),
    (0, class_validator_1.ArrayMinSize)(1),
    (0, class_validator_1.IsNotEmpty)(),
    (0, class_transformer_1.Type)(() => Number),
    __metadata("design:type", Array)
], AssignBeaconDto.prototype, "beaconId", void 0);
exports.AssignBeaconDto = AssignBeaconDto;
class UnAssignBeaconDto {
}
__decorate([
    (0, swagger_1.ApiProperty)({ required: false }),
    (0, class_validator_1.IsEmpty)(),
    __metadata("design:type", Number)
], UnAssignBeaconDto.prototype, "sectionId", void 0);
exports.UnAssignBeaconDto = UnAssignBeaconDto;
class BeaconIdDto {
}
__decorate([
    (0, swagger_1.ApiProperty)(),
    __metadata("design:type", Number)
], BeaconIdDto.prototype, "beaconId", void 0);
exports.BeaconIdDto = BeaconIdDto;
class BeaconMessageDto {
}
__decorate([
    (0, swagger_1.ApiProperty)(),
    __metadata("design:type", String)
], BeaconMessageDto.prototype, "message", void 0);
exports.BeaconMessageDto = BeaconMessageDto;
class StoreDashboardDto {
}
__decorate([
    (0, swagger_1.ApiProperty)({ required: false }),
    __metadata("design:type", Number)
], StoreDashboardDto.prototype, "totalVisitors", void 0);
__decorate([
    (0, swagger_1.ApiProperty)({ required: false }),
    __metadata("design:type", Number)
], StoreDashboardDto.prototype, "activeVisitors", void 0);
__decorate([
    (0, swagger_1.ApiProperty)({ required: false }),
    __metadata("design:type", Number)
], StoreDashboardDto.prototype, "totalBeacons", void 0);
exports.StoreDashboardDto = StoreDashboardDto;
class StoreDashboardResponseDto {
}
__decorate([
    (0, swagger_1.ApiProperty)({ required: false }),
    __metadata("design:type", String)
], StoreDashboardResponseDto.prototype, "message", void 0);
__decorate([
    (0, swagger_1.ApiProperty)({ required: false, type: StoreDashboardDto }),
    __metadata("design:type", StoreDashboardDto)
], StoreDashboardResponseDto.prototype, "data", void 0);
exports.StoreDashboardResponseDto = StoreDashboardResponseDto;
//# sourceMappingURL=store-admin.dto.js.map