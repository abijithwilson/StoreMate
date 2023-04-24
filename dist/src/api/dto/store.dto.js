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
exports.OfferWiseProductMessageDto = exports.OfferWiseProduct = exports.StoresLinechartMessageDto = exports.SingleLinechartDto = exports.LinechartSpanDto = exports.ChartSpanTypeDto = exports.StoresPiechartMessageDto = exports.StoresPiechartDto = exports.SingleSectionPiechartDto = exports.BarchartSpanDto = exports.StoresBarchartMessageDto = exports.SingleBarchartDto = exports.StoreListFetchResponseDto = exports.StoreListFetchDto = exports.StoreListParamDto = exports.StoreOfferIdDto = exports.UnAssigningOfferDto = exports.AssigningOfferDto = exports.MessageStoreFetchDto = exports.StoreOfferFetchDto = exports.UserProductFilterOptionsDto = exports.FetchStoreWiseProductsPagination = exports.FetchStoreWiseProductsResponse = exports.FetchStoreWiseProducts = exports.MessageDto = exports.UpdateSkuUnderStoreDto = exports.StoreFetchResponseDto = exports.MessageSkuUnderStore = exports.SkuUnderStore = exports.StoreWithoutRewardsDto = exports.StoreRewardEditDto = exports.StoreRewardDto = exports.RewardIdDto = exports.DeleteRewardPointsDto = exports.RewardDetailsResponseDto = exports.RewardDetailsOfStoreResponseDto = exports.FetchRewardDetailsOfStoreDto = exports.SingleStoreDetailsDto = exports.StoreAdminDetail = exports.StoreAdminInviteDto = exports.StoreNameFetchDto = exports.StoreNameDto = exports.NearbyStoreResultDto = exports.NearbyStoreDto = exports.StoreDto = exports.FetchAllStorePagination = exports.IdDto = exports.StoreIdDto = exports.StoreFetchDto = exports.StoreUpdateDto = void 0;
exports.LastVisitedStoresResponseDto = exports.LastVisitedStores = exports.LastVisitedStoresDto = exports.StoreDistrictDataResponseDto = exports.StoreStateDataResponseDto = exports.StoreCountryDataResponseDto = exports.DistrictsFilterData = exports.StatesFilterData = exports.CountriesFilterData = void 0;
const swagger_1 = require("@nestjs/swagger");
const class_transformer_1 = require("class-transformer");
const class_validator_1 = require("class-validator");
const message_dto_1 = require("./message.dto");
class StoreUpdateDto {
}
__decorate([
    (0, swagger_1.ApiProperty)(),
    (0, class_validator_1.IsString)(),
    (0, class_validator_1.IsOptional)(),
    __metadata("design:type", String)
], StoreUpdateDto.prototype, "storeName", void 0);
__decorate([
    (0, swagger_1.ApiProperty)(),
    (0, class_validator_1.IsNumber)(),
    (0, class_validator_1.IsOptional)(),
    (0, class_transformer_1.Type)(() => Number),
    __metadata("design:type", Number)
], StoreUpdateDto.prototype, "stateId", void 0);
__decorate([
    (0, swagger_1.ApiProperty)(),
    (0, class_validator_1.IsOptional)(),
    (0, class_validator_1.Min)(-180),
    (0, class_validator_1.Max)(180),
    __metadata("design:type", Number)
], StoreUpdateDto.prototype, "longitude", void 0);
__decorate([
    (0, swagger_1.ApiProperty)(),
    (0, class_validator_1.IsOptional)(),
    (0, class_validator_1.Min)(-90),
    (0, class_validator_1.Max)(90),
    __metadata("design:type", Number)
], StoreUpdateDto.prototype, "latitude", void 0);
__decorate([
    (0, swagger_1.ApiProperty)(),
    (0, class_validator_1.IsNumber)(),
    (0, class_validator_1.IsOptional)(),
    (0, class_transformer_1.Type)(() => Number),
    __metadata("design:type", Number)
], StoreUpdateDto.prototype, "countryId", void 0);
__decorate([
    (0, swagger_1.ApiProperty)(),
    (0, class_validator_1.IsString)(),
    (0, class_validator_1.IsOptional)(),
    __metadata("design:type", String)
], StoreUpdateDto.prototype, "image", void 0);
__decorate([
    (0, swagger_1.ApiProperty)(),
    (0, class_validator_1.IsString)(),
    (0, class_validator_1.IsOptional)(),
    __metadata("design:type", String)
], StoreUpdateDto.prototype, "address", void 0);
__decorate([
    (0, swagger_1.ApiProperty)(),
    (0, class_validator_1.IsNumber)(),
    (0, class_validator_1.IsOptional)(),
    (0, class_transformer_1.Type)(() => Number),
    __metadata("design:type", Number)
], StoreUpdateDto.prototype, "districtId", void 0);
__decorate([
    (0, swagger_1.ApiProperty)(),
    (0, class_validator_1.IsEmail)(),
    (0, class_validator_1.MaxLength)(255),
    (0, class_validator_1.IsOptional)(),
    __metadata("design:type", String)
], StoreUpdateDto.prototype, "email", void 0);
__decorate([
    (0, swagger_1.ApiProperty)(),
    (0, class_validator_1.IsString)(),
    (0, class_validator_1.IsOptional)(),
    __metadata("design:type", String)
], StoreUpdateDto.prototype, "phone", void 0);
exports.StoreUpdateDto = StoreUpdateDto;
class StoreFetchDto {
}
__decorate([
    (0, swagger_1.ApiProperty)(),
    __metadata("design:type", Number)
], StoreFetchDto.prototype, "storeId", void 0);
__decorate([
    (0, swagger_1.ApiProperty)(),
    __metadata("design:type", String)
], StoreFetchDto.prototype, "storeName", void 0);
__decorate([
    (0, swagger_1.ApiProperty)(),
    __metadata("design:type", Number)
], StoreFetchDto.prototype, "districtId", void 0);
__decorate([
    (0, swagger_1.ApiProperty)(),
    __metadata("design:type", String)
], StoreFetchDto.prototype, "districtName", void 0);
__decorate([
    (0, swagger_1.ApiProperty)(),
    __metadata("design:type", String)
], StoreFetchDto.prototype, "stateName", void 0);
__decorate([
    (0, swagger_1.ApiProperty)(),
    __metadata("design:type", Number)
], StoreFetchDto.prototype, "stateId", void 0);
__decorate([
    (0, swagger_1.ApiProperty)(),
    __metadata("design:type", String)
], StoreFetchDto.prototype, "countryName", void 0);
__decorate([
    (0, swagger_1.ApiProperty)(),
    __metadata("design:type", Number)
], StoreFetchDto.prototype, "countryId", void 0);
__decorate([
    (0, swagger_1.ApiProperty)(),
    __metadata("design:type", Number)
], StoreFetchDto.prototype, "longitude", void 0);
__decorate([
    (0, swagger_1.ApiProperty)(),
    __metadata("design:type", Number)
], StoreFetchDto.prototype, "latitude", void 0);
__decorate([
    (0, swagger_1.ApiProperty)(),
    __metadata("design:type", String)
], StoreFetchDto.prototype, "image", void 0);
__decorate([
    (0, swagger_1.ApiProperty)(),
    __metadata("design:type", String)
], StoreFetchDto.prototype, "address", void 0);
__decorate([
    (0, swagger_1.ApiProperty)(),
    __metadata("design:type", String)
], StoreFetchDto.prototype, "email", void 0);
__decorate([
    (0, swagger_1.ApiProperty)(),
    __metadata("design:type", String)
], StoreFetchDto.prototype, "phone", void 0);
__decorate([
    (0, swagger_1.ApiProperty)(),
    __metadata("design:type", Number)
], StoreFetchDto.prototype, "updatedBy", void 0);
exports.StoreFetchDto = StoreFetchDto;
class StoreIdDto {
}
__decorate([
    (0, swagger_1.ApiProperty)(),
    __metadata("design:type", String)
], StoreIdDto.prototype, "id", void 0);
exports.StoreIdDto = StoreIdDto;
class IdDto {
}
__decorate([
    (0, class_validator_1.IsNumberString)(),
    (0, class_validator_1.IsNotEmpty)(),
    (0, swagger_1.ApiProperty)(),
    __metadata("design:type", Number)
], IdDto.prototype, "id", void 0);
exports.IdDto = IdDto;
class FetchAllStorePagination {
}
__decorate([
    (0, swagger_1.ApiProperty)(),
    (0, class_validator_1.IsNumber)(),
    (0, class_validator_1.IsOptional)(),
    (0, class_transformer_1.Type)(() => Number),
    (0, class_validator_1.IsNotEmpty)(),
    __metadata("design:type", Number)
], FetchAllStorePagination.prototype, "limit", void 0);
__decorate([
    (0, swagger_1.ApiProperty)(),
    (0, class_validator_1.IsNumber)(),
    (0, class_validator_1.IsOptional)(),
    (0, class_transformer_1.Type)(() => Number),
    (0, class_validator_1.IsNotEmpty)(),
    __metadata("design:type", Number)
], FetchAllStorePagination.prototype, "offset", void 0);
__decorate([
    (0, swagger_1.ApiProperty)(),
    (0, class_validator_1.IsNotEmpty)(),
    (0, class_validator_1.IsNumber)(),
    (0, class_validator_1.IsOptional)(),
    (0, class_transformer_1.Type)(() => Number),
    __metadata("design:type", Number)
], FetchAllStorePagination.prototype, "id", void 0);
__decorate([
    (0, swagger_1.ApiProperty)(),
    (0, class_validator_1.IsString)(),
    (0, class_validator_1.IsOptional)(),
    (0, class_validator_1.IsNotEmpty)(),
    __metadata("design:type", String)
], FetchAllStorePagination.prototype, "name", void 0);
__decorate([
    (0, swagger_1.ApiProperty)(),
    (0, class_validator_1.IsNotEmpty)(),
    (0, class_validator_1.IsBooleanString)(),
    (0, class_validator_1.IsOptional)(),
    __metadata("design:type", String)
], FetchAllStorePagination.prototype, "sortName", void 0);
__decorate([
    (0, swagger_1.ApiProperty)(),
    (0, class_validator_1.IsNotEmpty)(),
    (0, class_validator_1.IsBooleanString)(),
    (0, class_validator_1.IsOptional)(),
    __metadata("design:type", String)
], FetchAllStorePagination.prototype, "sortDistrict", void 0);
__decorate([
    (0, swagger_1.ApiProperty)(),
    (0, class_validator_1.IsNotEmpty)(),
    (0, class_validator_1.Matches)(/^[[0-9,]*[0-9]+]$/, {
        message: 'filter district is in invalid format'
    }),
    (0, class_validator_1.IsOptional)(),
    __metadata("design:type", String)
], FetchAllStorePagination.prototype, "filterDistrict", void 0);
__decorate([
    (0, swagger_1.ApiProperty)(),
    (0, class_validator_1.IsNotEmpty)(),
    (0, class_validator_1.Matches)(/^[[0-9,]*[0-9]+]$/, {
        message: 'filter state is in invalid format'
    }),
    (0, class_validator_1.IsOptional)(),
    __metadata("design:type", String)
], FetchAllStorePagination.prototype, "filterState", void 0);
__decorate([
    (0, swagger_1.ApiProperty)(),
    (0, class_validator_1.IsNotEmpty)(),
    (0, class_validator_1.Matches)(/^[[0-9,]*[0-9]+]$/, {
        message: 'filter country is in invalid Format'
    }),
    (0, class_validator_1.IsOptional)(),
    (0, class_validator_1.Matches)('^[[0-9,]*[0-9]+]$'),
    __metadata("design:type", String)
], FetchAllStorePagination.prototype, "filterCountry", void 0);
exports.FetchAllStorePagination = FetchAllStorePagination;
class StoreDto {
}
__decorate([
    (0, swagger_1.ApiProperty)(),
    (0, class_validator_1.IsString)(),
    (0, class_validator_1.IsOptional)(),
    __metadata("design:type", String)
], StoreDto.prototype, "storeName", void 0);
__decorate([
    (0, swagger_1.ApiProperty)(),
    (0, class_validator_1.IsNumber)(),
    (0, class_validator_1.IsOptional)(),
    (0, class_transformer_1.Type)(() => Number),
    __metadata("design:type", Number)
], StoreDto.prototype, "stateId", void 0);
__decorate([
    (0, swagger_1.ApiProperty)(),
    (0, class_validator_1.IsOptional)(),
    (0, class_validator_1.Min)(-180),
    (0, class_validator_1.Max)(180),
    __metadata("design:type", Number)
], StoreDto.prototype, "longitude", void 0);
__decorate([
    (0, swagger_1.ApiProperty)(),
    (0, class_validator_1.IsOptional)(),
    (0, class_validator_1.Min)(-90),
    (0, class_validator_1.Max)(90),
    __metadata("design:type", Number)
], StoreDto.prototype, "latitude", void 0);
__decorate([
    (0, swagger_1.ApiProperty)(),
    (0, class_validator_1.IsNumber)(),
    (0, class_validator_1.IsOptional)(),
    (0, class_transformer_1.Type)(() => Number),
    __metadata("design:type", Number)
], StoreDto.prototype, "countryId", void 0);
__decorate([
    (0, swagger_1.ApiProperty)(),
    (0, class_validator_1.IsString)(),
    (0, class_validator_1.IsOptional)(),
    __metadata("design:type", String)
], StoreDto.prototype, "image", void 0);
__decorate([
    (0, swagger_1.ApiProperty)(),
    (0, class_validator_1.IsString)(),
    (0, class_validator_1.IsOptional)(),
    __metadata("design:type", String)
], StoreDto.prototype, "address", void 0);
__decorate([
    (0, swagger_1.ApiProperty)(),
    (0, class_validator_1.IsNumber)(),
    (0, class_validator_1.IsOptional)(),
    (0, class_transformer_1.Type)(() => Number),
    __metadata("design:type", Number)
], StoreDto.prototype, "districtId", void 0);
__decorate([
    (0, swagger_1.ApiProperty)(),
    (0, class_validator_1.IsEmail)(),
    (0, class_validator_1.IsOptional)(),
    __metadata("design:type", String)
], StoreDto.prototype, "email", void 0);
__decorate([
    (0, swagger_1.ApiProperty)(),
    (0, class_validator_1.IsString)(),
    (0, class_validator_1.IsOptional)(),
    __metadata("design:type", String)
], StoreDto.prototype, "phone", void 0);
exports.StoreDto = StoreDto;
class NearbyStoreDto {
}
__decorate([
    (0, swagger_1.ApiProperty)({ required: true }),
    (0, class_validator_1.Min)(-180),
    (0, class_validator_1.Max)(180),
    __metadata("design:type", Number)
], NearbyStoreDto.prototype, "longitude", void 0);
__decorate([
    (0, swagger_1.ApiProperty)({ required: true }),
    (0, class_validator_1.Min)(-90),
    (0, class_validator_1.Max)(90),
    __metadata("design:type", Number)
], NearbyStoreDto.prototype, "latitude", void 0);
__decorate([
    (0, swagger_1.ApiProperty)({ required: false }),
    (0, class_validator_1.IsNumber)(),
    (0, class_validator_1.IsOptional)(),
    __metadata("design:type", Number)
], NearbyStoreDto.prototype, "limit", void 0);
__decorate([
    (0, swagger_1.ApiProperty)({ required: false }),
    (0, class_validator_1.IsNumber)(),
    (0, class_validator_1.IsOptional)(),
    __metadata("design:type", Number)
], NearbyStoreDto.prototype, "offset", void 0);
exports.NearbyStoreDto = NearbyStoreDto;
class NearbyStoreResultDto {
}
__decorate([
    (0, swagger_1.ApiProperty)(),
    __metadata("design:type", Number)
], NearbyStoreResultDto.prototype, "store_id", void 0);
__decorate([
    (0, swagger_1.ApiProperty)(),
    __metadata("design:type", String)
], NearbyStoreResultDto.prototype, "storeName", void 0);
__decorate([
    (0, swagger_1.ApiProperty)(),
    __metadata("design:type", Number)
], NearbyStoreResultDto.prototype, "latitude", void 0);
__decorate([
    (0, swagger_1.ApiProperty)(),
    __metadata("design:type", Number)
], NearbyStoreResultDto.prototype, "longitude", void 0);
__decorate([
    (0, swagger_1.ApiProperty)(),
    __metadata("design:type", Number)
], NearbyStoreResultDto.prototype, "distance", void 0);
exports.NearbyStoreResultDto = NearbyStoreResultDto;
class StoreNameDto {
}
__decorate([
    (0, swagger_1.ApiProperty)(),
    __metadata("design:type", String)
], StoreNameDto.prototype, "storeName", void 0);
__decorate([
    (0, swagger_1.ApiProperty)(),
    __metadata("design:type", Number)
], StoreNameDto.prototype, "storeId", void 0);
exports.StoreNameDto = StoreNameDto;
class StoreNameFetchDto {
}
__decorate([
    (0, swagger_1.ApiProperty)(),
    (0, class_validator_1.IsNotEmpty)(),
    (0, class_validator_1.IsOptional)(),
    (0, class_validator_1.IsString)(),
    __metadata("design:type", String)
], StoreNameFetchDto.prototype, "storeName", void 0);
exports.StoreNameFetchDto = StoreNameFetchDto;
class StoreAdminInviteDto {
}
__decorate([
    (0, swagger_1.ApiProperty)({ required: true }),
    (0, class_validator_1.IsString)(),
    (0, class_validator_1.IsNotEmpty)(),
    __metadata("design:type", String)
], StoreAdminInviteDto.prototype, "firstName", void 0);
__decorate([
    (0, swagger_1.ApiProperty)({ required: true }),
    (0, class_validator_1.IsEmail)(),
    (0, class_validator_1.IsNotEmpty)(),
    __metadata("design:type", String)
], StoreAdminInviteDto.prototype, "email", void 0);
__decorate([
    (0, swagger_1.ApiProperty)({ required: true }),
    (0, class_validator_1.IsArray)(),
    (0, class_validator_1.IsNotEmpty)(),
    (0, class_transformer_1.Type)(() => Number),
    __metadata("design:type", Array)
], StoreAdminInviteDto.prototype, "storeId", void 0);
exports.StoreAdminInviteDto = StoreAdminInviteDto;
class StoreAdminDetail {
}
__decorate([
    (0, swagger_1.ApiProperty)(),
    __metadata("design:type", Number)
], StoreAdminDetail.prototype, "adminId", void 0);
__decorate([
    (0, swagger_1.ApiProperty)(),
    __metadata("design:type", String)
], StoreAdminDetail.prototype, "adminName", void 0);
exports.StoreAdminDetail = StoreAdminDetail;
class SingleStoreDetailsDto {
}
__decorate([
    (0, swagger_1.ApiProperty)(),
    __metadata("design:type", Number)
], SingleStoreDetailsDto.prototype, "storeId", void 0);
__decorate([
    (0, swagger_1.ApiProperty)(),
    __metadata("design:type", String)
], SingleStoreDetailsDto.prototype, "storeName", void 0);
__decorate([
    (0, swagger_1.ApiProperty)(),
    __metadata("design:type", Number)
], SingleStoreDetailsDto.prototype, "districtId", void 0);
__decorate([
    (0, swagger_1.ApiProperty)(),
    __metadata("design:type", String)
], SingleStoreDetailsDto.prototype, "districtName", void 0);
__decorate([
    (0, swagger_1.ApiProperty)(),
    __metadata("design:type", String)
], SingleStoreDetailsDto.prototype, "stateName", void 0);
__decorate([
    (0, swagger_1.ApiProperty)(),
    __metadata("design:type", Number)
], SingleStoreDetailsDto.prototype, "stateId", void 0);
__decorate([
    (0, swagger_1.ApiProperty)(),
    __metadata("design:type", String)
], SingleStoreDetailsDto.prototype, "countryName", void 0);
__decorate([
    (0, swagger_1.ApiProperty)(),
    __metadata("design:type", Number)
], SingleStoreDetailsDto.prototype, "countryId", void 0);
__decorate([
    (0, swagger_1.ApiProperty)(),
    __metadata("design:type", Number)
], SingleStoreDetailsDto.prototype, "longitude", void 0);
__decorate([
    (0, swagger_1.ApiProperty)(),
    __metadata("design:type", Number)
], SingleStoreDetailsDto.prototype, "latitude", void 0);
__decorate([
    (0, swagger_1.ApiProperty)(),
    __metadata("design:type", String)
], SingleStoreDetailsDto.prototype, "image", void 0);
__decorate([
    (0, swagger_1.ApiProperty)(),
    __metadata("design:type", String)
], SingleStoreDetailsDto.prototype, "address", void 0);
__decorate([
    (0, swagger_1.ApiProperty)(),
    __metadata("design:type", String)
], SingleStoreDetailsDto.prototype, "email", void 0);
__decorate([
    (0, swagger_1.ApiProperty)(),
    __metadata("design:type", String)
], SingleStoreDetailsDto.prototype, "phone", void 0);
__decorate([
    (0, swagger_1.ApiProperty)(),
    __metadata("design:type", Number)
], SingleStoreDetailsDto.prototype, "updatedBy", void 0);
__decorate([
    (0, swagger_1.ApiProperty)({ type: StoreAdminDetail, isArray: true }),
    __metadata("design:type", Array)
], SingleStoreDetailsDto.prototype, "storeAdmin", void 0);
__decorate([
    (0, swagger_1.ApiProperty)(),
    __metadata("design:type", Number)
], SingleStoreDetailsDto.prototype, "perVisitPoints", void 0);
__decorate([
    (0, swagger_1.ApiProperty)(),
    __metadata("design:type", Number)
], SingleStoreDetailsDto.prototype, "totalPoints", void 0);
__decorate([
    (0, swagger_1.ApiProperty)(),
    __metadata("design:type", Number)
], SingleStoreDetailsDto.prototype, "totalRemainingPoints", void 0);
exports.SingleStoreDetailsDto = SingleStoreDetailsDto;
class FetchRewardDetailsOfStoreDto {
}
__decorate([
    (0, swagger_1.ApiProperty)({ required: false }),
    (0, class_validator_1.IsNumber)(),
    (0, class_validator_1.IsOptional)(),
    (0, class_transformer_1.Type)(() => Number),
    (0, class_validator_1.IsNotEmpty)(),
    __metadata("design:type", Number)
], FetchRewardDetailsOfStoreDto.prototype, "limit", void 0);
__decorate([
    (0, swagger_1.ApiProperty)({ required: false }),
    (0, class_validator_1.IsNumber)(),
    (0, class_validator_1.IsOptional)(),
    (0, class_transformer_1.Type)(() => Number),
    (0, class_validator_1.IsNotEmpty)(),
    __metadata("design:type", Number)
], FetchRewardDetailsOfStoreDto.prototype, "offset", void 0);
exports.FetchRewardDetailsOfStoreDto = FetchRewardDetailsOfStoreDto;
class RewardDetailsOfStoreResponseDto {
}
__decorate([
    (0, swagger_1.ApiProperty)(),
    __metadata("design:type", Number)
], RewardDetailsOfStoreResponseDto.prototype, "storeId", void 0);
__decorate([
    (0, swagger_1.ApiProperty)(),
    __metadata("design:type", String)
], RewardDetailsOfStoreResponseDto.prototype, "storeName", void 0);
__decorate([
    (0, swagger_1.ApiProperty)(),
    __metadata("design:type", Number)
], RewardDetailsOfStoreResponseDto.prototype, "districtId", void 0);
__decorate([
    (0, swagger_1.ApiProperty)(),
    __metadata("design:type", String)
], RewardDetailsOfStoreResponseDto.prototype, "districtName", void 0);
__decorate([
    (0, swagger_1.ApiProperty)(),
    __metadata("design:type", Number)
], RewardDetailsOfStoreResponseDto.prototype, "rewardId", void 0);
__decorate([
    (0, swagger_1.ApiProperty)(),
    __metadata("design:type", Number)
], RewardDetailsOfStoreResponseDto.prototype, "totalPoints", void 0);
__decorate([
    (0, swagger_1.ApiProperty)(),
    __metadata("design:type", Number)
], RewardDetailsOfStoreResponseDto.prototype, "perVisitPoints", void 0);
__decorate([
    (0, swagger_1.ApiProperty)(),
    __metadata("design:type", Number)
], RewardDetailsOfStoreResponseDto.prototype, "totalRemainingPoints", void 0);
__decorate([
    (0, swagger_1.ApiProperty)(),
    __metadata("design:type", Number)
], RewardDetailsOfStoreResponseDto.prototype, "updatedBy", void 0);
__decorate([
    (0, swagger_1.ApiProperty)(),
    __metadata("design:type", Number)
], RewardDetailsOfStoreResponseDto.prototype, "count", void 0);
exports.RewardDetailsOfStoreResponseDto = RewardDetailsOfStoreResponseDto;
class RewardDetailsResponseDto {
}
__decorate([
    (0, swagger_1.ApiProperty)({ required: false }),
    __metadata("design:type", String)
], RewardDetailsResponseDto.prototype, "message", void 0);
__decorate([
    (0, swagger_1.ApiProperty)({ isArray: true }),
    __metadata("design:type", RewardDetailsOfStoreResponseDto)
], RewardDetailsResponseDto.prototype, "data", void 0);
__decorate([
    (0, swagger_1.ApiProperty)({ required: false }),
    __metadata("design:type", message_dto_1.Pagination)
], RewardDetailsResponseDto.prototype, "pagination", void 0);
exports.RewardDetailsResponseDto = RewardDetailsResponseDto;
class DeleteRewardPointsDto {
}
__decorate([
    (0, swagger_1.ApiProperty)({ isArray: true, type: Number }),
    (0, class_transformer_1.Type)(() => Number),
    (0, class_validator_1.ArrayMinSize)(1),
    (0, class_validator_1.IsNumber)({}, { each: true }),
    __metadata("design:type", Array)
], DeleteRewardPointsDto.prototype, "rewardId", void 0);
exports.DeleteRewardPointsDto = DeleteRewardPointsDto;
class RewardIdDto {
}
exports.RewardIdDto = RewardIdDto;
class StoreRewardDto {
}
__decorate([
    (0, swagger_1.ApiProperty)({ required: true }),
    (0, class_validator_1.IsNumber)(),
    (0, class_validator_1.IsNotEmpty)(),
    __metadata("design:type", Number)
], StoreRewardDto.prototype, "totalPoints", void 0);
__decorate([
    (0, swagger_1.ApiProperty)({ required: true }),
    (0, class_validator_1.IsNumber)(),
    (0, class_validator_1.IsNotEmpty)(),
    __metadata("design:type", Number)
], StoreRewardDto.prototype, "perVisitPoints", void 0);
__decorate([
    (0, swagger_1.ApiProperty)({ required: true, type: Number, isArray: true }),
    (0, class_validator_1.IsArray)(),
    (0, class_validator_1.IsNotEmpty)(),
    (0, class_transformer_1.Type)(() => Number),
    __metadata("design:type", Array)
], StoreRewardDto.prototype, "storeId", void 0);
exports.StoreRewardDto = StoreRewardDto;
class StoreRewardEditDto {
}
__decorate([
    (0, swagger_1.ApiProperty)({ required: true, type: Number, isArray: true }),
    (0, class_validator_1.IsArray)(),
    (0, class_validator_1.IsNotEmpty)(),
    (0, class_validator_1.ArrayMinSize)(1),
    (0, class_transformer_1.Type)(() => Number),
    __metadata("design:type", Array)
], StoreRewardEditDto.prototype, "storeId", void 0);
__decorate([
    (0, swagger_1.ApiProperty)(),
    (0, class_validator_1.IsNumber)(),
    (0, class_validator_1.IsOptional)(),
    __metadata("design:type", Number)
], StoreRewardEditDto.prototype, "perVisitPoints", void 0);
__decorate([
    (0, swagger_1.ApiProperty)(),
    (0, class_validator_1.IsNumber)(),
    (0, class_validator_1.IsOptional)(),
    __metadata("design:type", Number)
], StoreRewardEditDto.prototype, "totalPoints", void 0);
exports.StoreRewardEditDto = StoreRewardEditDto;
class StoreWithoutRewardsDto {
}
__decorate([
    (0, swagger_1.ApiProperty)(),
    __metadata("design:type", Number)
], StoreWithoutRewardsDto.prototype, "storeId", void 0);
__decorate([
    (0, swagger_1.ApiProperty)(),
    __metadata("design:type", String)
], StoreWithoutRewardsDto.prototype, "storeName", void 0);
exports.StoreWithoutRewardsDto = StoreWithoutRewardsDto;
class SkuUnderStore {
}
__decorate([
    (0, swagger_1.ApiProperty)(),
    __metadata("design:type", Number)
], SkuUnderStore.prototype, "id", void 0);
__decorate([
    (0, swagger_1.ApiProperty)(),
    __metadata("design:type", String)
], SkuUnderStore.prototype, "colour", void 0);
__decorate([
    (0, swagger_1.ApiProperty)(),
    __metadata("design:type", String)
], SkuUnderStore.prototype, "colourCode", void 0);
__decorate([
    (0, swagger_1.ApiProperty)(),
    __metadata("design:type", String)
], SkuUnderStore.prototype, "size", void 0);
__decorate([
    (0, swagger_1.ApiProperty)(),
    __metadata("design:type", Number)
], SkuUnderStore.prototype, "basePrice", void 0);
__decorate([
    (0, swagger_1.ApiProperty)(),
    __metadata("design:type", Number)
], SkuUnderStore.prototype, "discountPercent", void 0);
__decorate([
    (0, swagger_1.ApiProperty)(),
    __metadata("design:type", String)
], SkuUnderStore.prototype, "image", void 0);
__decorate([
    (0, swagger_1.ApiProperty)(),
    __metadata("design:type", String)
], SkuUnderStore.prototype, "availabilty", void 0);
exports.SkuUnderStore = SkuUnderStore;
class MessageSkuUnderStore {
}
__decorate([
    (0, swagger_1.ApiProperty)(),
    __metadata("design:type", String)
], MessageSkuUnderStore.prototype, "message", void 0);
__decorate([
    (0, swagger_1.ApiProperty)({ type: SkuUnderStore, isArray: true }),
    __metadata("design:type", Array)
], MessageSkuUnderStore.prototype, "data", void 0);
exports.MessageSkuUnderStore = MessageSkuUnderStore;
class StoreFetchResponseDto {
}
__decorate([
    (0, swagger_1.ApiProperty)(),
    __metadata("design:type", String)
], StoreFetchResponseDto.prototype, "message", void 0);
__decorate([
    (0, swagger_1.ApiProperty)(),
    __metadata("design:type", StoreFetchDto)
], StoreFetchResponseDto.prototype, "data", void 0);
__decorate([
    (0, swagger_1.ApiProperty)(),
    __metadata("design:type", message_dto_1.Pagination)
], StoreFetchResponseDto.prototype, "pagination", void 0);
exports.StoreFetchResponseDto = StoreFetchResponseDto;
class UpdateSkuUnderStoreDto {
}
__decorate([
    (0, swagger_1.ApiProperty)({ isArray: true, type: Number }),
    (0, class_validator_1.IsArray)(),
    (0, class_validator_1.IsNotEmpty)(),
    (0, class_transformer_1.Type)(() => Number),
    __metadata("design:type", Array)
], UpdateSkuUnderStoreDto.prototype, "createdSkuId", void 0);
__decorate([
    (0, swagger_1.ApiProperty)({ isArray: true, type: Number }),
    (0, class_validator_1.IsArray)(),
    (0, class_transformer_1.Type)(() => Number),
    __metadata("design:type", Array)
], UpdateSkuUnderStoreDto.prototype, "deletedSkuId", void 0);
exports.UpdateSkuUnderStoreDto = UpdateSkuUnderStoreDto;
class MessageDto {
}
__decorate([
    (0, swagger_1.ApiProperty)({ required: false }),
    __metadata("design:type", String)
], MessageDto.prototype, "message", void 0);
exports.MessageDto = MessageDto;
class FetchStoreWiseProducts {
}
__decorate([
    (0, swagger_1.ApiProperty)(),
    __metadata("design:type", Number)
], FetchStoreWiseProducts.prototype, "productId", void 0);
__decorate([
    (0, swagger_1.ApiProperty)(),
    __metadata("design:type", String)
], FetchStoreWiseProducts.prototype, "productName", void 0);
__decorate([
    (0, swagger_1.ApiProperty)(),
    __metadata("design:type", Number)
], FetchStoreWiseProducts.prototype, "categoryId", void 0);
__decorate([
    (0, swagger_1.ApiProperty)(),
    __metadata("design:type", String)
], FetchStoreWiseProducts.prototype, "categoryName", void 0);
__decorate([
    (0, swagger_1.ApiProperty)(),
    __metadata("design:type", String)
], FetchStoreWiseProducts.prototype, "image", void 0);
__decorate([
    (0, swagger_1.ApiProperty)(),
    __metadata("design:type", Number)
], FetchStoreWiseProducts.prototype, "skuId", void 0);
__decorate([
    (0, swagger_1.ApiProperty)(),
    __metadata("design:type", Number)
], FetchStoreWiseProducts.prototype, "basePrice", void 0);
__decorate([
    (0, swagger_1.ApiProperty)(),
    __metadata("design:type", Number)
], FetchStoreWiseProducts.prototype, "discountPercent", void 0);
__decorate([
    (0, swagger_1.ApiProperty)(),
    __metadata("design:type", String)
], FetchStoreWiseProducts.prototype, "availability", void 0);
__decorate([
    (0, swagger_1.ApiProperty)(),
    __metadata("design:type", Number)
], FetchStoreWiseProducts.prototype, "count", void 0);
exports.FetchStoreWiseProducts = FetchStoreWiseProducts;
class FetchStoreWiseProductsResponse {
}
__decorate([
    (0, swagger_1.ApiProperty)(),
    __metadata("design:type", String)
], FetchStoreWiseProductsResponse.prototype, "message", void 0);
__decorate([
    (0, swagger_1.ApiProperty)({ type: FetchStoreWiseProducts, isArray: true }),
    __metadata("design:type", Array)
], FetchStoreWiseProductsResponse.prototype, "data", void 0);
__decorate([
    (0, swagger_1.ApiProperty)(),
    __metadata("design:type", message_dto_1.Pagination)
], FetchStoreWiseProductsResponse.prototype, "pagination", void 0);
exports.FetchStoreWiseProductsResponse = FetchStoreWiseProductsResponse;
class FetchStoreWiseProductsPagination {
}
__decorate([
    (0, swagger_1.ApiProperty)(),
    (0, class_validator_1.IsNumber)(),
    (0, class_validator_1.IsOptional)(),
    (0, class_transformer_1.Type)(() => Number),
    (0, class_validator_1.IsNotEmpty)(),
    __metadata("design:type", Number)
], FetchStoreWiseProductsPagination.prototype, "limit", void 0);
__decorate([
    (0, swagger_1.ApiProperty)(),
    (0, class_validator_1.IsNumber)(),
    (0, class_validator_1.IsOptional)(),
    (0, class_transformer_1.Type)(() => Number),
    (0, class_validator_1.IsNotEmpty)(),
    __metadata("design:type", Number)
], FetchStoreWiseProductsPagination.prototype, "offset", void 0);
__decorate([
    (0, swagger_1.ApiProperty)({ required: false }),
    (0, class_validator_1.IsNotEmpty)(),
    (0, class_validator_1.IsNumber)(),
    (0, class_validator_1.IsOptional)(),
    (0, class_transformer_1.Type)(() => Number),
    __metadata("design:type", Number)
], FetchStoreWiseProductsPagination.prototype, "filterCategory", void 0);
exports.FetchStoreWiseProductsPagination = FetchStoreWiseProductsPagination;
class UserProductFilterOptionsDto {
}
__decorate([
    (0, swagger_1.ApiProperty)({ required: false }),
    (0, class_validator_1.IsNotEmpty)(),
    (0, class_validator_1.Matches)(/^[[0-9,]*[0-9]+]$/, {
        message: 'filter colour is in invalid format'
    }),
    (0, class_validator_1.IsOptional)(),
    __metadata("design:type", String)
], UserProductFilterOptionsDto.prototype, "filterColour", void 0);
__decorate([
    (0, swagger_1.ApiProperty)({ required: false }),
    (0, class_validator_1.IsNotEmpty)(),
    (0, class_validator_1.Matches)(/^[[0-9,]*[0-9]+]$/, {
        message: 'filter size is in invalid format'
    }),
    (0, class_validator_1.IsOptional)(),
    __metadata("design:type", String)
], UserProductFilterOptionsDto.prototype, "filterSize", void 0);
__decorate([
    (0, swagger_1.ApiProperty)({ required: false }),
    (0, class_validator_1.IsNotEmpty)(),
    (0, class_validator_1.IsNumber)(),
    (0, class_validator_1.IsOptional)(),
    (0, class_transformer_1.Type)(() => Number),
    __metadata("design:type", Number)
], UserProductFilterOptionsDto.prototype, "filterPriceHigh", void 0);
__decorate([
    (0, swagger_1.ApiProperty)({ required: false }),
    (0, class_validator_1.IsNotEmpty)(),
    (0, class_validator_1.IsNumber)(),
    (0, class_validator_1.IsOptional)(),
    (0, class_transformer_1.Type)(() => Number),
    __metadata("design:type", Number)
], UserProductFilterOptionsDto.prototype, "filterPriceLow", void 0);
__decorate([
    (0, swagger_1.ApiProperty)({ required: false }),
    (0, class_validator_1.IsNotEmpty)(),
    (0, class_validator_1.Matches)(/^[[0-9,]*[0-9]+]$/, {
        message: 'filter category is in invalid format'
    }),
    (0, class_validator_1.IsOptional)(),
    __metadata("design:type", String)
], UserProductFilterOptionsDto.prototype, "filterCategory", void 0);
__decorate([
    (0, swagger_1.ApiProperty)({ required: false }),
    (0, class_validator_1.IsNotEmpty)(),
    (0, class_validator_1.IsBooleanString)(),
    (0, class_validator_1.IsOptional)(),
    __metadata("design:type", String)
], UserProductFilterOptionsDto.prototype, "sortPrice", void 0);
__decorate([
    (0, swagger_1.ApiProperty)({ required: false }),
    (0, class_validator_1.IsOptional)(),
    (0, class_validator_1.IsNotEmpty)(),
    __metadata("design:type", String)
], UserProductFilterOptionsDto.prototype, "searchName", void 0);
__decorate([
    (0, swagger_1.ApiProperty)({ required: false }),
    (0, class_validator_1.IsNumber)(),
    (0, class_validator_1.IsOptional)(),
    (0, class_transformer_1.Type)(() => Number),
    (0, class_validator_1.IsNotEmpty)(),
    __metadata("design:type", Number)
], UserProductFilterOptionsDto.prototype, "limit", void 0);
__decorate([
    (0, swagger_1.ApiProperty)({ required: false }),
    (0, class_validator_1.IsNumber)(),
    (0, class_validator_1.IsOptional)(),
    (0, class_transformer_1.Type)(() => Number),
    (0, class_validator_1.IsNotEmpty)(),
    __metadata("design:type", Number)
], UserProductFilterOptionsDto.prototype, "offset", void 0);
exports.UserProductFilterOptionsDto = UserProductFilterOptionsDto;
class StoreOfferFetchDto {
}
__decorate([
    (0, swagger_1.ApiProperty)(),
    __metadata("design:type", Number)
], StoreOfferFetchDto.prototype, "offerId", void 0);
__decorate([
    (0, swagger_1.ApiProperty)(),
    __metadata("design:type", String)
], StoreOfferFetchDto.prototype, "offerTitle", void 0);
__decorate([
    (0, swagger_1.ApiProperty)(),
    __metadata("design:type", String)
], StoreOfferFetchDto.prototype, "image", void 0);
__decorate([
    (0, swagger_1.ApiProperty)(),
    __metadata("design:type", String)
], StoreOfferFetchDto.prototype, "description", void 0);
__decorate([
    (0, swagger_1.ApiProperty)({ type: Date, example: '2022-11-04' }),
    __metadata("design:type", String)
], StoreOfferFetchDto.prototype, "startDate", void 0);
__decorate([
    (0, swagger_1.ApiProperty)({ type: Date, example: '2022-11-04' }),
    __metadata("design:type", String)
], StoreOfferFetchDto.prototype, "endDate", void 0);
__decorate([
    (0, swagger_1.ApiProperty)({ type: Boolean }),
    __metadata("design:type", Boolean)
], StoreOfferFetchDto.prototype, "status", void 0);
exports.StoreOfferFetchDto = StoreOfferFetchDto;
class MessageStoreFetchDto {
}
__decorate([
    (0, swagger_1.ApiProperty)(),
    __metadata("design:type", String)
], MessageStoreFetchDto.prototype, "message", void 0);
__decorate([
    (0, swagger_1.ApiProperty)({ type: StoreOfferFetchDto, isArray: true }),
    __metadata("design:type", StoreOfferFetchDto)
], MessageStoreFetchDto.prototype, "data", void 0);
__decorate([
    (0, swagger_1.ApiProperty)(),
    __metadata("design:type", message_dto_1.Pagination)
], MessageStoreFetchDto.prototype, "pagination", void 0);
exports.MessageStoreFetchDto = MessageStoreFetchDto;
class AssigningOfferDto {
}
__decorate([
    (0, swagger_1.ApiProperty)(),
    (0, class_validator_1.IsNumber)(),
    (0, class_transformer_1.Type)(() => Number),
    (0, class_validator_1.IsNotEmpty)(),
    __metadata("design:type", Number)
], AssigningOfferDto.prototype, "storeId", void 0);
__decorate([
    (0, swagger_1.ApiProperty)(),
    (0, class_validator_1.IsNumber)(),
    (0, class_transformer_1.Type)(() => Number),
    (0, class_validator_1.IsNotEmpty)(),
    __metadata("design:type", Number)
], AssigningOfferDto.prototype, "offerId", void 0);
exports.AssigningOfferDto = AssigningOfferDto;
class UnAssigningOfferDto {
}
__decorate([
    (0, swagger_1.ApiProperty)(),
    (0, class_validator_1.IsNumber)(),
    (0, class_transformer_1.Type)(() => Number),
    (0, class_validator_1.IsNotEmpty)(),
    __metadata("design:type", Number)
], UnAssigningOfferDto.prototype, "storeId", void 0);
__decorate([
    (0, swagger_1.ApiProperty)(),
    (0, class_validator_1.IsNumber)(),
    (0, class_transformer_1.Type)(() => Number),
    (0, class_validator_1.IsNotEmpty)(),
    __metadata("design:type", Number)
], UnAssigningOfferDto.prototype, "offerId", void 0);
exports.UnAssigningOfferDto = UnAssigningOfferDto;
class StoreOfferIdDto {
}
exports.StoreOfferIdDto = StoreOfferIdDto;
class StoreListParamDto {
}
__decorate([
    (0, swagger_1.ApiProperty)({ required: false }),
    (0, class_validator_1.IsNotEmpty)(),
    (0, class_validator_1.IsNumber)(),
    (0, class_validator_1.IsOptional)(),
    (0, class_transformer_1.Type)(() => Number),
    __metadata("design:type", Number)
], StoreListParamDto.prototype, "filterCountry", void 0);
__decorate([
    (0, swagger_1.ApiProperty)({ required: false }),
    (0, class_validator_1.IsNotEmpty)(),
    (0, class_validator_1.IsNumber)(),
    (0, class_validator_1.IsOptional)(),
    (0, class_transformer_1.Type)(() => Number),
    __metadata("design:type", Number)
], StoreListParamDto.prototype, "filterState", void 0);
__decorate([
    (0, swagger_1.ApiProperty)({ required: false }),
    (0, class_validator_1.IsNotEmpty)(),
    (0, class_validator_1.IsNumber)(),
    (0, class_validator_1.IsOptional)(),
    (0, class_transformer_1.Type)(() => Number),
    __metadata("design:type", Number)
], StoreListParamDto.prototype, "filterDistrict", void 0);
exports.StoreListParamDto = StoreListParamDto;
class StoreListFetchDto {
}
__decorate([
    (0, swagger_1.ApiProperty)({ required: false }),
    __metadata("design:type", Number)
], StoreListFetchDto.prototype, "storeId", void 0);
__decorate([
    (0, swagger_1.ApiProperty)({ required: false }),
    __metadata("design:type", String)
], StoreListFetchDto.prototype, "storeName", void 0);
exports.StoreListFetchDto = StoreListFetchDto;
class StoreListFetchResponseDto {
}
__decorate([
    (0, swagger_1.ApiProperty)({ required: false }),
    __metadata("design:type", String)
], StoreListFetchResponseDto.prototype, "message", void 0);
__decorate([
    (0, swagger_1.ApiProperty)({ required: false, type: StoreListFetchDto }),
    __metadata("design:type", StoreListFetchDto)
], StoreListFetchResponseDto.prototype, "data", void 0);
exports.StoreListFetchResponseDto = StoreListFetchResponseDto;
class SingleBarchartDto {
}
__decorate([
    (0, swagger_1.ApiProperty)({ required: false }),
    __metadata("design:type", String)
], SingleBarchartDto.prototype, "timePeriod", void 0);
__decorate([
    (0, swagger_1.ApiProperty)({ required: false }),
    __metadata("design:type", Number)
], SingleBarchartDto.prototype, "newCustomer", void 0);
__decorate([
    (0, swagger_1.ApiProperty)({ required: false }),
    __metadata("design:type", Number)
], SingleBarchartDto.prototype, "regularCustomer", void 0);
exports.SingleBarchartDto = SingleBarchartDto;
class StoresBarchartMessageDto {
}
__decorate([
    (0, swagger_1.ApiProperty)({ required: false }),
    __metadata("design:type", String)
], StoresBarchartMessageDto.prototype, "message", void 0);
__decorate([
    (0, swagger_1.ApiProperty)({ required: false, type: SingleBarchartDto, isArray: true }),
    __metadata("design:type", SingleBarchartDto)
], StoresBarchartMessageDto.prototype, "data", void 0);
exports.StoresBarchartMessageDto = StoresBarchartMessageDto;
class BarchartSpanDto {
}
__decorate([
    (0, swagger_1.ApiProperty)({ required: false }),
    (0, class_validator_1.IsNotEmpty)(),
    (0, class_validator_1.IsString)(),
    __metadata("design:type", String)
], BarchartSpanDto.prototype, "span", void 0);
__decorate([
    (0, swagger_1.ApiProperty)({ required: false }),
    (0, class_validator_1.IsNumber)(),
    (0, class_validator_1.IsOptional)(),
    (0, class_transformer_1.Type)(() => Number),
    (0, class_validator_1.IsNotEmpty)(),
    __metadata("design:type", Number)
], BarchartSpanDto.prototype, "limit", void 0);
__decorate([
    (0, swagger_1.ApiProperty)({ required: false }),
    (0, class_validator_1.IsNumber)(),
    (0, class_validator_1.IsOptional)(),
    (0, class_transformer_1.Type)(() => Number),
    (0, class_validator_1.IsNotEmpty)(),
    __metadata("design:type", Number)
], BarchartSpanDto.prototype, "offset", void 0);
exports.BarchartSpanDto = BarchartSpanDto;
class SingleSectionPiechartDto {
}
__decorate([
    (0, swagger_1.ApiProperty)({ required: false }),
    __metadata("design:type", Number)
], SingleSectionPiechartDto.prototype, "sectionId", void 0);
__decorate([
    (0, swagger_1.ApiProperty)({ required: false }),
    __metadata("design:type", String)
], SingleSectionPiechartDto.prototype, "sectionName", void 0);
__decorate([
    (0, swagger_1.ApiProperty)({ required: false }),
    __metadata("design:type", Number)
], SingleSectionPiechartDto.prototype, "sectionCount", void 0);
exports.SingleSectionPiechartDto = SingleSectionPiechartDto;
class StoresPiechartDto {
}
__decorate([
    (0, swagger_1.ApiProperty)({ required: false }),
    __metadata("design:type", Number)
], StoresPiechartDto.prototype, "totalCount", void 0);
__decorate([
    (0, swagger_1.ApiProperty)({
        required: false,
        type: SingleSectionPiechartDto,
        isArray: true
    }),
    __metadata("design:type", Array)
], StoresPiechartDto.prototype, "sectionPieChartDto", void 0);
exports.StoresPiechartDto = StoresPiechartDto;
class StoresPiechartMessageDto {
}
__decorate([
    (0, swagger_1.ApiProperty)({ required: false }),
    __metadata("design:type", String)
], StoresPiechartMessageDto.prototype, "message", void 0);
__decorate([
    (0, swagger_1.ApiProperty)({ required: false, type: StoresPiechartDto }),
    __metadata("design:type", StoresPiechartDto)
], StoresPiechartMessageDto.prototype, "data", void 0);
exports.StoresPiechartMessageDto = StoresPiechartMessageDto;
class ChartSpanTypeDto {
}
__decorate([
    (0, swagger_1.ApiProperty)({ required: false }),
    (0, class_validator_1.IsNotEmpty)(),
    (0, class_validator_1.IsString)(),
    __metadata("design:type", String)
], ChartSpanTypeDto.prototype, "span", void 0);
exports.ChartSpanTypeDto = ChartSpanTypeDto;
class LinechartSpanDto {
}
__decorate([
    (0, swagger_1.ApiProperty)({ required: false }),
    (0, class_validator_1.IsNotEmpty)(),
    (0, class_validator_1.IsString)(),
    __metadata("design:type", String)
], LinechartSpanDto.prototype, "span", void 0);
__decorate([
    (0, swagger_1.ApiProperty)({ required: false }),
    (0, class_validator_1.IsNumber)(),
    (0, class_validator_1.IsOptional)(),
    (0, class_transformer_1.Type)(() => Number),
    (0, class_validator_1.IsNotEmpty)(),
    __metadata("design:type", Number)
], LinechartSpanDto.prototype, "limit", void 0);
__decorate([
    (0, swagger_1.ApiProperty)({ required: false }),
    (0, class_validator_1.IsNumber)(),
    (0, class_validator_1.IsOptional)(),
    (0, class_transformer_1.Type)(() => Number),
    (0, class_validator_1.IsNotEmpty)(),
    __metadata("design:type", Number)
], LinechartSpanDto.prototype, "offset", void 0);
exports.LinechartSpanDto = LinechartSpanDto;
class SingleLinechartDto {
}
__decorate([
    (0, swagger_1.ApiProperty)({ required: false }),
    __metadata("design:type", String)
], SingleLinechartDto.prototype, "visitTime", void 0);
__decorate([
    (0, swagger_1.ApiProperty)({ required: false }),
    __metadata("design:type", String)
], SingleLinechartDto.prototype, "totalVisitor", void 0);
exports.SingleLinechartDto = SingleLinechartDto;
class StoresLinechartMessageDto {
}
__decorate([
    (0, swagger_1.ApiProperty)({ required: false }),
    __metadata("design:type", String)
], StoresLinechartMessageDto.prototype, "message", void 0);
__decorate([
    (0, swagger_1.ApiProperty)({ required: false, type: SingleLinechartDto, isArray: true }),
    __metadata("design:type", Array)
], StoresLinechartMessageDto.prototype, "data", void 0);
exports.StoresLinechartMessageDto = StoresLinechartMessageDto;
class OfferWiseProduct {
}
__decorate([
    (0, swagger_1.ApiProperty)({ required: false }),
    __metadata("design:type", Number)
], OfferWiseProduct.prototype, "productId", void 0);
__decorate([
    (0, swagger_1.ApiProperty)({ required: false }),
    __metadata("design:type", String)
], OfferWiseProduct.prototype, "productName", void 0);
__decorate([
    (0, swagger_1.ApiProperty)({ required: false }),
    __metadata("design:type", String)
], OfferWiseProduct.prototype, "categoryName", void 0);
__decorate([
    (0, swagger_1.ApiProperty)({ required: false }),
    __metadata("design:type", Number)
], OfferWiseProduct.prototype, "basePrice", void 0);
__decorate([
    (0, swagger_1.ApiProperty)({ required: false }),
    __metadata("design:type", String)
], OfferWiseProduct.prototype, "image", void 0);
__decorate([
    (0, swagger_1.ApiProperty)({ required: false }),
    __metadata("design:type", Number)
], OfferWiseProduct.prototype, "count", void 0);
exports.OfferWiseProduct = OfferWiseProduct;
class OfferWiseProductMessageDto {
}
__decorate([
    (0, swagger_1.ApiProperty)({ required: false }),
    __metadata("design:type", String)
], OfferWiseProductMessageDto.prototype, "message", void 0);
__decorate([
    (0, swagger_1.ApiProperty)({ required: false, type: OfferWiseProduct, isArray: true }),
    __metadata("design:type", Array)
], OfferWiseProductMessageDto.prototype, "data", void 0);
__decorate([
    (0, swagger_1.ApiProperty)({ required: false }),
    __metadata("design:type", message_dto_1.Pagination)
], OfferWiseProductMessageDto.prototype, "pagination", void 0);
exports.OfferWiseProductMessageDto = OfferWiseProductMessageDto;
class CountriesFilterData {
}
__decorate([
    (0, swagger_1.ApiProperty)({ required: false }),
    __metadata("design:type", Number)
], CountriesFilterData.prototype, "countryId", void 0);
__decorate([
    (0, swagger_1.ApiProperty)({ required: false }),
    __metadata("design:type", String)
], CountriesFilterData.prototype, "country", void 0);
exports.CountriesFilterData = CountriesFilterData;
class StatesFilterData {
}
__decorate([
    (0, swagger_1.ApiProperty)({ required: false }),
    __metadata("design:type", Number)
], StatesFilterData.prototype, "stateId", void 0);
__decorate([
    (0, swagger_1.ApiProperty)({ required: false }),
    __metadata("design:type", String)
], StatesFilterData.prototype, "state", void 0);
exports.StatesFilterData = StatesFilterData;
class DistrictsFilterData {
}
__decorate([
    (0, swagger_1.ApiProperty)({ required: false }),
    __metadata("design:type", Number)
], DistrictsFilterData.prototype, "districtId", void 0);
__decorate([
    (0, swagger_1.ApiProperty)({ required: false }),
    __metadata("design:type", String)
], DistrictsFilterData.prototype, "district", void 0);
exports.DistrictsFilterData = DistrictsFilterData;
class StoreCountryDataResponseDto {
}
__decorate([
    (0, swagger_1.ApiProperty)({ required: false }),
    __metadata("design:type", String)
], StoreCountryDataResponseDto.prototype, "message", void 0);
__decorate([
    (0, swagger_1.ApiProperty)({ required: false, isArray: true }),
    __metadata("design:type", CountriesFilterData)
], StoreCountryDataResponseDto.prototype, "data", void 0);
exports.StoreCountryDataResponseDto = StoreCountryDataResponseDto;
class StoreStateDataResponseDto {
}
__decorate([
    (0, swagger_1.ApiProperty)({ required: false }),
    __metadata("design:type", String)
], StoreStateDataResponseDto.prototype, "message", void 0);
__decorate([
    (0, swagger_1.ApiProperty)({ required: false, isArray: true }),
    __metadata("design:type", StatesFilterData)
], StoreStateDataResponseDto.prototype, "data", void 0);
exports.StoreStateDataResponseDto = StoreStateDataResponseDto;
class StoreDistrictDataResponseDto {
}
__decorate([
    (0, swagger_1.ApiProperty)({ required: false }),
    __metadata("design:type", String)
], StoreDistrictDataResponseDto.prototype, "message", void 0);
__decorate([
    (0, swagger_1.ApiProperty)({ required: false, isArray: true }),
    __metadata("design:type", DistrictsFilterData)
], StoreDistrictDataResponseDto.prototype, "data", void 0);
exports.StoreDistrictDataResponseDto = StoreDistrictDataResponseDto;
class LastVisitedStoresDto {
}
__decorate([
    (0, swagger_1.ApiProperty)({ required: false }),
    (0, class_validator_1.IsNumber)(),
    (0, class_validator_1.IsOptional)(),
    (0, class_transformer_1.Type)(() => Number),
    (0, class_validator_1.IsNotEmpty)(),
    __metadata("design:type", Number)
], LastVisitedStoresDto.prototype, "limit", void 0);
__decorate([
    (0, swagger_1.ApiProperty)({ required: false }),
    (0, class_validator_1.IsNumber)(),
    (0, class_validator_1.IsOptional)(),
    (0, class_transformer_1.Type)(() => Number),
    (0, class_validator_1.IsNotEmpty)(),
    __metadata("design:type", Number)
], LastVisitedStoresDto.prototype, "offset", void 0);
__decorate([
    (0, swagger_1.ApiProperty)({ required: false }),
    (0, class_validator_1.IsNotEmpty)(),
    (0, class_validator_1.IsString)(),
    (0, class_validator_1.IsOptional)(),
    __metadata("design:type", String)
], LastVisitedStoresDto.prototype, "searchName", void 0);
exports.LastVisitedStoresDto = LastVisitedStoresDto;
class LastVisitedStores {
}
__decorate([
    (0, swagger_1.ApiProperty)({ required: false }),
    __metadata("design:type", Number)
], LastVisitedStores.prototype, "storeId", void 0);
__decorate([
    (0, swagger_1.ApiProperty)({ required: false }),
    __metadata("design:type", String)
], LastVisitedStores.prototype, "storeName", void 0);
__decorate([
    (0, swagger_1.ApiProperty)({ required: false }),
    __metadata("design:type", Number)
], LastVisitedStores.prototype, "visited", void 0);
__decorate([
    (0, swagger_1.ApiProperty)({ required: false }),
    __metadata("design:type", Number)
], LastVisitedStores.prototype, "latitude", void 0);
__decorate([
    (0, swagger_1.ApiProperty)({ required: false }),
    __metadata("design:type", Number)
], LastVisitedStores.prototype, "longitude", void 0);
__decorate([
    (0, swagger_1.ApiProperty)({ required: false }),
    __metadata("design:type", String)
], LastVisitedStores.prototype, "lastVisited", void 0);
exports.LastVisitedStores = LastVisitedStores;
class LastVisitedStoresResponseDto {
}
__decorate([
    (0, swagger_1.ApiProperty)({ required: false }),
    __metadata("design:type", String)
], LastVisitedStoresResponseDto.prototype, "message", void 0);
__decorate([
    (0, swagger_1.ApiProperty)({ required: false }),
    __metadata("design:type", LastVisitedStores)
], LastVisitedStoresResponseDto.prototype, "data", void 0);
exports.LastVisitedStoresResponseDto = LastVisitedStoresResponseDto;
//# sourceMappingURL=store.dto.js.map