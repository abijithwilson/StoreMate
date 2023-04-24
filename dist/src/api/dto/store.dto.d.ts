import { Pagination } from './message.dto';
export declare class StoreUpdateDto {
    storeName: string;
    stateId: number;
    longitude: number;
    latitude: number;
    countryId: number;
    image: string;
    address: string;
    districtId: number;
    email: string;
    phone: string;
}
export declare class StoreFetchDto {
    storeId: number;
    storeName: string;
    districtId: number;
    districtName: string;
    stateName: string;
    stateId: number;
    countryName: string;
    countryId: number;
    longitude: number;
    latitude: number;
    image: string;
    address: string;
    email: string;
    phone: string;
    updatedBy: number;
}
export declare class StoreIdDto {
    id: string;
}
export declare class IdDto {
    id: number;
}
export declare class FetchAllStorePagination {
    limit: number;
    offset: number;
    id: number;
    name: string;
    sortName: string;
    sortDistrict: string;
    filterDistrict: string;
    filterState: string;
    filterCountry: string;
}
export declare class StoreDto {
    storeName: string;
    stateId: number;
    longitude: number;
    latitude: number;
    countryId: number;
    image: string;
    address: string;
    districtId: number;
    email: string;
    phone: string;
}
export declare class NearbyStoreDto {
    longitude: number;
    latitude: number;
    limit: number;
    offset: number;
}
export declare class NearbyStoreResultDto {
    store_id: number;
    storeName: string;
    latitude: number;
    longitude: number;
    distance: number;
}
export declare class StoreNameDto {
    storeName: string;
    storeId: number;
}
export declare class StoreNameFetchDto {
    storeName: string;
}
export declare class StoreAdminInviteDto {
    firstName: string;
    email: string;
    storeId: number[];
}
export declare class StoreAdminDetail {
    adminId: number;
    adminName: string;
}
export declare class SingleStoreDetailsDto {
    storeId: number;
    storeName: string;
    districtId: number;
    districtName: string;
    stateName: string;
    stateId: number;
    countryName: string;
    countryId: number;
    longitude: number;
    latitude: number;
    image: string;
    address: string;
    email: string;
    phone: string;
    updatedBy: number;
    storeAdmin: StoreAdminDetail[];
    perVisitPoints: number;
    totalPoints: number;
    totalRemainingPoints: number;
}
export declare class FetchRewardDetailsOfStoreDto {
    limit: number;
    offset: number;
}
export declare class RewardDetailsOfStoreResponseDto {
    storeId: number;
    storeName: string;
    districtId: number;
    districtName: string;
    rewardId: number;
    totalPoints: number;
    perVisitPoints: number;
    totalRemainingPoints: number;
    updatedBy: number;
    count: number;
}
export declare class RewardDetailsResponseDto {
    message: string;
    data: RewardDetailsOfStoreResponseDto;
    pagination: Pagination;
}
export declare class DeleteRewardPointsDto {
    rewardId: number[];
}
export declare class RewardIdDto {
    rewardId: number;
}
export declare class StoreRewardDto {
    totalPoints: number;
    perVisitPoints: number;
    storeId: number[];
}
export declare class StoreRewardEditDto {
    storeId: number[];
    perVisitPoints: number;
    totalPoints: number;
}
export declare class StoreWithoutRewardsDto {
    storeId: number;
    storeName: string;
}
export declare class SkuUnderStore {
    id: number;
    colour: string;
    colourCode: string;
    size: string;
    basePrice: number;
    discountPercent: number;
    image: string;
    availabilty: string;
}
export declare class MessageSkuUnderStore {
    message: string;
    data: SkuUnderStore[];
}
export declare class StoreFetchResponseDto {
    message: string;
    data: StoreFetchDto;
    pagination: Pagination;
}
export declare class UpdateSkuUnderStoreDto {
    createdSkuId: number[];
    deletedSkuId: number[];
}
export declare class MessageDto {
    message: string;
}
export declare class FetchStoreWiseProducts {
    productId: number;
    productName: string;
    categoryId: number;
    categoryName: string;
    image: string;
    skuId: number;
    basePrice: number;
    discountPercent: number;
    availability: string;
    count: number;
}
export declare class FetchStoreWiseProductsResponse {
    message: string;
    data: FetchStoreWiseProducts[];
    pagination: Pagination;
}
export declare class FetchStoreWiseProductsPagination {
    limit: number;
    offset: number;
    filterCategory: number;
}
export declare class UserProductFilterOptionsDto {
    filterColour: string;
    filterSize: string;
    filterPriceHigh: number;
    filterPriceLow: number;
    filterCategory: string;
    sortPrice: string;
    searchName: string;
    limit: number;
    offset: number;
}
export declare class StoreOfferFetchDto {
    offerId: number;
    offerTitle: string;
    image: string;
    description: string;
    startDate: string;
    endDate: string;
    status: boolean;
}
export declare class MessageStoreFetchDto {
    message: string;
    data: StoreOfferFetchDto;
    pagination: Pagination;
}
export declare class AssigningOfferDto {
    storeId: number;
    offerId: number;
}
export declare class UnAssigningOfferDto {
    storeId: number;
    offerId: number;
}
export declare class StoreOfferIdDto {
    id: number;
}
export declare class StoreListParamDto {
    filterCountry: number;
    filterState: number;
    filterDistrict: number;
}
export declare class StoreListFetchDto {
    storeId: number;
    storeName: string;
}
export declare class StoreListFetchResponseDto {
    message: string;
    data: StoreListFetchDto;
}
export declare class SingleBarchartDto {
    timePeriod: string;
    newCustomer: number;
    regularCustomer: number;
}
export declare class StoresBarchartMessageDto {
    message: string;
    data: SingleBarchartDto;
}
export declare class BarchartSpanDto {
    span: string;
    limit: number;
    offset: number;
}
export declare class SingleSectionPiechartDto {
    sectionId: number;
    sectionName: string;
    sectionCount: number;
}
export declare class StoresPiechartDto {
    totalCount: number;
    sectionPieChartDto: SingleSectionPiechartDto[];
}
export declare class StoresPiechartMessageDto {
    message: string;
    data: StoresPiechartDto;
}
export declare class ChartSpanTypeDto {
    span: string;
}
export declare class LinechartSpanDto {
    span: string;
    limit: number;
    offset: number;
}
export declare class SingleLinechartDto {
    visitTime: string;
    totalVisitor: string;
}
export declare class StoresLinechartMessageDto {
    message: string;
    data: SingleLinechartDto[];
}
export declare class OfferWiseProduct {
    productId: number;
    productName: string;
    categoryName: string;
    basePrice: number;
    image: string;
    count: number;
}
export declare class OfferWiseProductMessageDto {
    message: string;
    data: OfferWiseProduct[];
    pagination: Pagination;
}
export declare class CountriesFilterData {
    countryId: number;
    country: string;
}
export declare class StatesFilterData {
    stateId: number;
    state: string;
}
export declare class DistrictsFilterData {
    districtId: number;
    district: string;
}
export declare class StoreCountryDataResponseDto {
    message: string;
    data: CountriesFilterData;
}
export declare class StoreStateDataResponseDto {
    message: string;
    data: StatesFilterData;
}
export declare class StoreDistrictDataResponseDto {
    message: string;
    data: DistrictsFilterData;
}
export declare class LastVisitedStoresDto {
    limit: number;
    offset: number;
    searchName: string;
}
export declare class LastVisitedStores {
    storeId: number;
    storeName: string;
    visited: number;
    latitude: number;
    longitude: number;
    lastVisited: string;
}
export declare class LastVisitedStoresResponseDto {
    message: string;
    data: LastVisitedStores;
}
