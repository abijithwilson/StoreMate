import { ApiProperty } from '@nestjs/swagger';
import { Type } from 'class-transformer';
import {
  ArrayMinSize,
  IsArray,
  IsBooleanString,
  IsEmail,
  IsNotEmpty,
  IsNumber,
  IsNumberString,
  IsOptional,
  IsString,
  Matches,
  Max,
  MaxLength,
  Min
} from 'class-validator';
import { Pagination } from './message.dto';

export class StoreUpdateDto {
  @ApiProperty()
  @IsString()
  @IsOptional()
    storeName: string;
  @ApiProperty()
  @IsNumber()
  @IsOptional()
  @Type(() => Number)
    stateId: number;
  @ApiProperty()
  @IsOptional()
  @Min(-180)
  @Max(180)
    longitude: number;
  @ApiProperty()
  @IsOptional()
  @Min(-90)
  @Max(90)
    latitude: number;
  @ApiProperty()
  @IsNumber()
  @IsOptional()
  @Type(() => Number)
    countryId: number;
  @ApiProperty()
  @IsString()
  @IsOptional()
    image: string;
  @ApiProperty()
  @IsString()
  @IsOptional()
    address: string;
  @ApiProperty()
  @IsNumber()
  @IsOptional()
  @Type(() => Number)
    districtId: number;
  @ApiProperty()
  @IsEmail()
  @MaxLength(255)
  @IsOptional()
    email: string;
  @ApiProperty()
  @IsString()
  @IsOptional()
    phone: string;
}
export class StoreFetchDto {
  @ApiProperty()
    storeId: number;
  @ApiProperty()
    storeName: string;
  @ApiProperty()
    districtId: number;
  @ApiProperty()
    districtName: string;
  @ApiProperty()
    stateName: string;
  @ApiProperty()
    stateId: number;
  @ApiProperty()
    countryName: string;
  @ApiProperty()
    countryId: number;
  @ApiProperty()
    longitude: number;
  @ApiProperty()
    latitude: number;
  @ApiProperty()
    image: string;
  @ApiProperty()
    address: string;
  @ApiProperty()
    email: string;
  @ApiProperty()
    phone: string;
  @ApiProperty()
    updatedBy: number;
}
export class StoreIdDto {
  @ApiProperty()
    id: string;
}
export class IdDto {
  @IsNumberString()
  @IsNotEmpty()
  @ApiProperty()
    id: number;
}
export class FetchAllStorePagination {
  @ApiProperty()
  @IsNumber()
  @IsOptional()
  @Type(() => Number)
  @IsNotEmpty()
    limit: number;
  @ApiProperty()
  @IsNumber()
  @IsOptional()
  @Type(() => Number)
  @IsNotEmpty()
    offset: number;
  @ApiProperty()
  @IsNotEmpty()
  @IsNumber()
  @IsOptional()
  @Type(() => Number)
    id: number;
  @ApiProperty()
  @IsString()
  @IsOptional()
  @IsNotEmpty()
    name: string;
  @ApiProperty()
  @IsNotEmpty()
  @IsBooleanString()
  @IsOptional()
    sortName: string;
  @ApiProperty()
  @IsNotEmpty()
  @IsBooleanString()
  @IsOptional()
    sortDistrict: string;
  @ApiProperty()
  @IsNotEmpty()
  @Matches(/^[[0-9,]*[0-9]+]$/, {
    message: 'filter district is in invalid format'
  })
  @IsOptional()
    filterDistrict: string;
  @ApiProperty()
  @IsNotEmpty()
  @Matches(/^[[0-9,]*[0-9]+]$/, {
    message: 'filter state is in invalid format'
  })
  @IsOptional()
    filterState: string;
  @ApiProperty()
  @IsNotEmpty()
  @Matches(/^[[0-9,]*[0-9]+]$/, {
    message: 'filter country is in invalid Format'
  })
  @IsOptional()
  @Matches('^[[0-9,]*[0-9]+]$')
    filterCountry: string;
}
export class StoreDto {
  @ApiProperty()
  @IsString()
  @IsOptional()
    storeName: string;
  @ApiProperty()
  @IsNumber()
  @IsOptional()
  @Type(() => Number)
    stateId: number;
  @ApiProperty()
  @IsOptional()
  @Min(-180)
  @Max(180)
    longitude: number;
  @ApiProperty()
  @IsOptional()
  @Min(-90)
  @Max(90)
    latitude: number;
  @ApiProperty()
  @IsNumber()
  @IsOptional()
  @Type(() => Number)
    countryId: number;
  @ApiProperty()
  @IsString()
  @IsOptional()
    image: string;
  @ApiProperty()
  @IsString()
  @IsOptional()
    address: string;
  @ApiProperty()
  @IsNumber()
  @IsOptional()
  @Type(() => Number)
    districtId: number;
  @ApiProperty()
  @IsEmail()
  @IsOptional()
    email: string;
  @ApiProperty()
  @IsString()
  @IsOptional()
    phone: string;
}

export class NearbyStoreDto {
  @ApiProperty({ required: true })
  @Min(-180)
  @Max(180)
    longitude: number;

  @ApiProperty({ required: true })
  @Min(-90)
  @Max(90)
    latitude: number;

  @ApiProperty({ required: false })
  @IsNumber()
  @IsOptional()
    limit: number;

  @ApiProperty({ required: false })
  @IsNumber()
  @IsOptional()
    offset: number;
}

export class NearbyStoreResultDto {
  @ApiProperty()
    store_id: number;
  @ApiProperty()
    storeName: string;
  @ApiProperty()
    latitude: number;
  @ApiProperty()
    longitude: number;
  @ApiProperty()
    distance: number;
}

export class StoreNameDto {
  @ApiProperty()
    storeName: string;
  @ApiProperty()
    storeId: number;
}

export class StoreNameFetchDto {
  @ApiProperty()
  @IsNotEmpty()
  @IsOptional()
  @IsString()
    storeName: string;
}

export class StoreAdminInviteDto {
  @ApiProperty({ required: true })
  @IsString()
  @IsNotEmpty()
    firstName: string;

  @ApiProperty({ required: true })
  @IsEmail()
  @IsNotEmpty()
    email: string;

  @ApiProperty({ required: true })
  @IsArray()
  @IsNotEmpty()
  @Type(() => Number)
    storeId: number[];
}

export class StoreAdminDetail {
  @ApiProperty()
    adminId: number;
  @ApiProperty()
    adminName: string;
}
export class SingleStoreDetailsDto {
  @ApiProperty()
    storeId: number;
  @ApiProperty()
    storeName: string;
  @ApiProperty()
    districtId: number;
  @ApiProperty()
    districtName: string;
  @ApiProperty()
    stateName: string;
  @ApiProperty()
    stateId: number;
  @ApiProperty()
    countryName: string;
  @ApiProperty()
    countryId: number;
  @ApiProperty()
    longitude: number;
  @ApiProperty()
    latitude: number;
  @ApiProperty()
    image: string;
  @ApiProperty()
    address: string;
  @ApiProperty()
    email: string;
  @ApiProperty()
    phone: string;
  @ApiProperty()
    updatedBy: number;
  @ApiProperty({ type: StoreAdminDetail, isArray: true })
    storeAdmin: StoreAdminDetail[];
  @ApiProperty()
    perVisitPoints: number;
  @ApiProperty()
    totalPoints: number;
  @ApiProperty()
    totalRemainingPoints: number;
}

export class FetchRewardDetailsOfStoreDto {
  @ApiProperty({ required: false })
  @IsNumber()
  @IsOptional()
  @Type(() => Number)
  @IsNotEmpty()
    limit: number;
  @ApiProperty({ required: false })
  @IsNumber()
  @IsOptional()
  @Type(() => Number)
  @IsNotEmpty()
    offset: number;
}

export class RewardDetailsOfStoreResponseDto {
  @ApiProperty()
    storeId: number;
  @ApiProperty()
    storeName: string;
  @ApiProperty()
    districtId: number;
  @ApiProperty()
    districtName: string;
  @ApiProperty()
    rewardId: number;
  @ApiProperty()
    totalPoints: number;
  @ApiProperty()
    perVisitPoints: number;
  @ApiProperty()
    totalRemainingPoints: number;
  @ApiProperty()
    updatedBy: number;
  @ApiProperty()
    count: number;
}

export class RewardDetailsResponseDto {
  @ApiProperty({ required: false })
    message: string;
  @ApiProperty({ isArray: true })
    data: RewardDetailsOfStoreResponseDto;
  @ApiProperty({ required: false })
    pagination: Pagination;
}

export class DeleteRewardPointsDto {
  @ApiProperty({ isArray: true, type: Number })
  @Type(() => Number)
  @ArrayMinSize(1)
  @IsNumber({}, { each: true })
    rewardId: number[];
}

export class RewardIdDto {
  rewardId: number;
}

export class StoreRewardDto {
  @ApiProperty({ required: true })
  @IsNumber()
  @IsNotEmpty()
    totalPoints: number;

  @ApiProperty({ required: true })
  @IsNumber()
  @IsNotEmpty()
    perVisitPoints: number;

  @ApiProperty({ required: true, type: Number, isArray: true })
  @IsArray()
  @IsNotEmpty()
  @Type(() => Number)
    storeId: number[];
}

export class StoreRewardEditDto {
  @ApiProperty({ required: true, type: Number, isArray: true })
  @IsArray()
  @IsNotEmpty()
  @ArrayMinSize(1)
  @Type(() => Number)
    storeId: number[];

  @ApiProperty()
  @IsNumber()
  @IsOptional()
    perVisitPoints: number;

  @ApiProperty()
  @IsNumber()
  @IsOptional()
    totalPoints: number;
}

export class StoreWithoutRewardsDto {
  @ApiProperty()
    storeId: number;
  @ApiProperty()
    storeName: string;
}

export class SkuUnderStore {
  @ApiProperty()
    id: number;
  @ApiProperty()
    colour: string;
  @ApiProperty()
    colourCode: string;
  @ApiProperty()
    size: string;
  @ApiProperty()
    basePrice: number;
  @ApiProperty()
    discountPercent: number;
  @ApiProperty()
    image: string;
  @ApiProperty()
    availabilty: string;
}

export class MessageSkuUnderStore {
  @ApiProperty()
    message: string;
  @ApiProperty({ type: SkuUnderStore, isArray: true })
    data: SkuUnderStore[];
}
export class StoreFetchResponseDto {
  @ApiProperty()
    message: string;
  @ApiProperty()
    data: StoreFetchDto;
  @ApiProperty()
    pagination: Pagination;
}

export class UpdateSkuUnderStoreDto {
  @ApiProperty({ isArray: true, type: Number })
  @IsArray()
  @IsNotEmpty()
  @Type(() => Number)
    createdSkuId: number[];
  @ApiProperty({ isArray: true, type: Number })
  @IsArray()
  @Type(() => Number)
    deletedSkuId: number[];
}
export class MessageDto {
  @ApiProperty({ required: false })
    message: string;
}
export class FetchStoreWiseProducts {
  @ApiProperty()
    productId: number;
  @ApiProperty()
    productName: string;
  @ApiProperty()
    categoryId: number;
  @ApiProperty()
    categoryName: string;
  @ApiProperty()
    image: string;
  @ApiProperty()
    skuId: number;
  @ApiProperty()
    basePrice: number;
  @ApiProperty()
    discountPercent: number;
  @ApiProperty()
    availability: string;
  @ApiProperty()
    count: number;
}

export class FetchStoreWiseProductsResponse {
  @ApiProperty()
    message: string;
  @ApiProperty({ type: FetchStoreWiseProducts, isArray: true })
    data: FetchStoreWiseProducts[];
  @ApiProperty()
    pagination: Pagination;
}

export class FetchStoreWiseProductsPagination {
  @ApiProperty()
  @IsNumber()
  @IsOptional()
  @Type(() => Number)
  @IsNotEmpty()
    limit: number;
  @ApiProperty()
  @IsNumber()
  @IsOptional()
  @Type(() => Number)
  @IsNotEmpty()
    offset: number;
  @ApiProperty({ required: false })
  @IsNotEmpty()
  @IsNumber()
  @IsOptional()
  @Type(() => Number)
    filterCategory: number;
}
export class UserProductFilterOptionsDto {
  @ApiProperty({ required: false })
  @IsNotEmpty()
  @Matches(/^[[0-9,]*[0-9]+]$/, {
    message: 'filter colour is in invalid format'
  })
  @IsOptional()
    filterColour: string;

  @ApiProperty({ required: false })
  @IsNotEmpty()
  @Matches(/^[[0-9,]*[0-9]+]$/, {
    message: 'filter size is in invalid format'
  })
  @IsOptional()
    filterSize: string;

  @ApiProperty({ required: false })
  @IsNotEmpty()
  @IsNumber()
  @IsOptional()
  @Type(() => Number)
    filterPriceHigh: number;

  @ApiProperty({ required: false })
  @IsNotEmpty()
  @IsNumber()
  @IsOptional()
  @Type(() => Number)
    filterPriceLow: number;

  @ApiProperty({ required: false })
  @IsNotEmpty()
  @Matches(/^[[0-9,]*[0-9]+]$/, {
    message: 'filter category is in invalid format'
  })
  @IsOptional()
    filterCategory: string;

  @ApiProperty({ required: false })
  @IsNotEmpty()
  @IsBooleanString()
  @IsOptional()
    sortPrice: string;

  @ApiProperty({ required: false })
  @IsOptional()
  @IsNotEmpty()
    searchName: string;

  @ApiProperty({ required: false })
  @IsNumber()
  @IsOptional()
  @Type(() => Number)
  @IsNotEmpty()
    limit: number;

  @ApiProperty({ required: false })
  @IsNumber()
  @IsOptional()
  @Type(() => Number)
  @IsNotEmpty()
    offset: number;
}

export class StoreOfferFetchDto {
  @ApiProperty()
    offerId: number;
  @ApiProperty()
    offerTitle: string;
  @ApiProperty()
    image: string;
  @ApiProperty()
    description: string;
  @ApiProperty({ type: Date, example: '2022-11-04' })
    startDate: string;
  @ApiProperty({ type: Date, example: '2022-11-04' })
    endDate: string;
  @ApiProperty({ type: Boolean })
    status: boolean;
}
export class MessageStoreFetchDto {
  @ApiProperty()
    message: string;
  @ApiProperty({ type: StoreOfferFetchDto, isArray: true })
    data: StoreOfferFetchDto;
  @ApiProperty()
    pagination: Pagination;
}

export class AssigningOfferDto {
  @ApiProperty()
  @IsNumber()
  @Type(() => Number)
  @IsNotEmpty()
    storeId: number;
  @ApiProperty()
  @IsNumber()
  @Type(() => Number)
  @IsNotEmpty()
    offerId: number;
}

export class UnAssigningOfferDto {
  @ApiProperty()
  @IsNumber()
  @Type(() => Number)
  @IsNotEmpty()
    storeId: number;
  @ApiProperty()
  @IsNumber()
  @Type(() => Number)
  @IsNotEmpty()
    offerId: number;
}

export class StoreOfferIdDto {
  id: number;
}

export class StoreListParamDto {
  @ApiProperty({ required: false })
  @IsNotEmpty()
  @IsNumber()
  @IsOptional()
  @Type(() => Number)
    filterCountry: number;
  @ApiProperty({ required: false })
  @IsNotEmpty()
  @IsNumber()
  @IsOptional()
  @Type(() => Number)
    filterState: number;
  @ApiProperty({ required: false })
  @IsNotEmpty()
  @IsNumber()
  @IsOptional()
  @Type(() => Number)
    filterDistrict: number;
}

export class StoreListFetchDto {
  @ApiProperty({ required: false })
    storeId: number;
  @ApiProperty({ required: false })
    storeName: string;
}

export class StoreListFetchResponseDto {
  @ApiProperty({ required: false })
    message: string;
  @ApiProperty({ required: false, type: StoreListFetchDto })
    data: StoreListFetchDto;
}

export class SingleBarchartDto {
  @ApiProperty({ required: false })
    timePeriod: string;
  @ApiProperty({ required: false })
    newCustomer: number;
  @ApiProperty({ required: false })
    regularCustomer: number;
}

export class StoresBarchartMessageDto {
  @ApiProperty({ required: false })
    message: string;
  @ApiProperty({ required: false, type: SingleBarchartDto, isArray: true })
    data: SingleBarchartDto;
}
export class BarchartSpanDto {
  @ApiProperty({ required: false })
  @IsNotEmpty()
  @IsString()
    span: string;
  @ApiProperty({ required: false })
  @IsNumber()
  @IsOptional()
  @Type(() => Number)
  @IsNotEmpty()
    limit: number;

  @ApiProperty({ required: false })
  @IsNumber()
  @IsOptional()
  @Type(() => Number)
  @IsNotEmpty()
    offset: number;
}

export class SingleSectionPiechartDto {
  @ApiProperty({ required: false })
    sectionId: number;
  @ApiProperty({ required: false })
    sectionName: string;
  @ApiProperty({ required: false })
    sectionCount: number;
}
export class StoresPiechartDto {
  @ApiProperty({ required: false })
    totalCount: number;
  @ApiProperty({
    required: false,
    type: SingleSectionPiechartDto,
    isArray: true
  })
    sectionPieChartDto: SingleSectionPiechartDto[];
}
export class StoresPiechartMessageDto {
  @ApiProperty({ required: false })
    message: string;
  @ApiProperty({ required: false, type: StoresPiechartDto })
    data: StoresPiechartDto;
}
export class ChartSpanTypeDto {
  @ApiProperty({ required: false })
  @IsNotEmpty()
  @IsString()
    span: string;
}

export class LinechartSpanDto {
  @ApiProperty({ required: false })
  @IsNotEmpty()
  @IsString()
    span: string;
  @ApiProperty({ required: false })
  @IsNumber()
  @IsOptional()
  @Type(() => Number)
  @IsNotEmpty()
    limit: number;

  @ApiProperty({ required: false })
  @IsNumber()
  @IsOptional()
  @Type(() => Number)
  @IsNotEmpty()
    offset: number;
}

export class SingleLinechartDto {
  @ApiProperty({ required: false })
    visitTime: string;
  @ApiProperty({ required: false })
    totalVisitor: string;
}

export class StoresLinechartMessageDto {
  @ApiProperty({ required: false })
    message: string;
  @ApiProperty({ required: false, type: SingleLinechartDto, isArray: true })
    data: SingleLinechartDto[];
}

export class OfferWiseProduct {
  @ApiProperty({ required: false })
    productId: number;
  @ApiProperty({ required: false })
    productName: string;
  @ApiProperty({ required: false })
    categoryName: string;
  @ApiProperty({ required: false })
    basePrice: number;
  @ApiProperty({ required: false })
    image: string;
  @ApiProperty({ required: false })
    count: number;
}

export class OfferWiseProductMessageDto {
  @ApiProperty({ required: false })
    message: string;
  @ApiProperty({ required: false, type: OfferWiseProduct, isArray: true })
    data: OfferWiseProduct[];
  @ApiProperty({ required: false })
    pagination: Pagination;
}

export class CountriesFilterData {
  @ApiProperty({ required: false })
    countryId: number;
  @ApiProperty({ required: false })
    country: string;
}

export class StatesFilterData {
  @ApiProperty({ required: false })
    stateId: number;
  @ApiProperty({ required: false })
    state: string;
}

export class DistrictsFilterData {
  @ApiProperty({ required: false })
    districtId: number;
  @ApiProperty({ required: false })
    district: string;
}

export class StoreCountryDataResponseDto {
  @ApiProperty({ required: false })
    message: string;
  @ApiProperty({ required: false, isArray: true })
    data: CountriesFilterData;
}

export class StoreStateDataResponseDto {
  @ApiProperty({ required: false })
    message: string;
  @ApiProperty({ required: false, isArray: true })
    data: StatesFilterData;
}

export class StoreDistrictDataResponseDto {
  @ApiProperty({ required: false })
    message: string;
  @ApiProperty({ required: false, isArray: true })
    data: DistrictsFilterData;
}

export class LastVisitedStoresDto {
  @ApiProperty({ required: false })
  @IsNumber()
  @IsOptional()
  @Type(() => Number)
  @IsNotEmpty()
    limit: number;

  @ApiProperty({ required: false })
  @IsNumber()
  @IsOptional()
  @Type(() => Number)
  @IsNotEmpty()
    offset: number;

  @ApiProperty({ required: false })
  @IsNotEmpty()
  @IsString()
  @IsOptional()
    searchName: string;
}

export class LastVisitedStores {
  @ApiProperty({ required: false })
    storeId: number;
  @ApiProperty({ required: false })
    storeName: string;
  @ApiProperty({ required: false })
    visited: number;
  @ApiProperty({ required: false })
    latitude: number;
  @ApiProperty({ required: false })
    longitude: number;
  @ApiProperty({ required: false })
    lastVisited: string;
}

export class LastVisitedStoresResponseDto {
  @ApiProperty({ required: false })
    message: string;
  @ApiProperty({ required: false })
    data: LastVisitedStores;
}
