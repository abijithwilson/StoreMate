import { Pagination } from './message.dto';
export declare class StoreAdminUpdateDto {
    lastName: string;
    phone: string;
    countryId: number;
    stateId: number;
    address: string;
    image: string;
}
export declare class StoresAssignedToStoreAdmin {
    storeId: number;
    storeName: string;
}
export declare class StoreAdminProfileFetchDTO {
    adminId: number;
    firstName: string;
    lastName: string;
    email: string;
    image: string;
    phone: string;
    countryId: number;
    stateId: number;
    countryName: string;
    stateName: string;
    address: string;
    stores: StoresAssignedToStoreAdmin;
}
export declare class StoreAdminProfileFetchResponseDto {
    message: string;
    data: StoreAdminProfileFetchDTO;
}
export declare class StoresUnderStoreAdmin {
    storeId: number;
    storeName: string;
    district_name: string;
}
export declare class FetchAssignedStoresResponseDto {
    message: string;
    data: StoresUnderStoreAdmin;
    pagination: Pagination;
}
export declare class FetchAllAssignedStoresPaginationDto {
    limit: number;
    offset: number;
}
export declare class FetchSectionWiseProductsDto {
    productId: number;
    image: string;
    productName: string;
    categoryId: number;
    categoryName: string;
    price: number;
    discountPercent: number;
    skuId: number;
    skuUniqueId: string;
    count: number;
}
export declare class FetchSectionWiseProductsPaginationDto {
    limit: number;
    offset: number;
    sortField: string;
    sortOrder: string;
    filterCategory: string;
}
export declare class FetchSectionWiseProductsResponseDto {
    message: string;
    data: FetchSectionWiseProductsDto[];
    pagination: Pagination;
}
export declare class VisitorsCountDto {
    totalVisitors: number;
    activeVisitors: number;
}
export declare class FetchVisitorsCountResponseDto {
    message: string;
    data: VisitorsCountDto;
}
export declare class BeaconFetchDto {
    beacon_id: number;
    name: string;
    majorId: string;
    deviceId: string;
    minorId: number;
    sectionId: number;
    sectionName: string;
    count: number;
}
export declare class BeaconFetchMessageDto {
    message: string;
    data: BeaconFetchDto[];
    pagination: Pagination;
}
export declare class BeaconPaginationQueryParam {
    limit: number;
    offset: number;
    sectionId: number;
}
export declare class AssignBeaconDto {
    beaconId: number[];
}
export declare class UnAssignBeaconDto {
    sectionId: number;
}
export declare class BeaconIdDto {
    beaconId: number;
}
export declare class BeaconMessageDto {
    message: string;
}
export declare class StoreDashboardDto {
    totalVisitors: number;
    activeVisitors: number;
    totalBeacons: number;
}
export declare class StoreDashboardResponseDto {
    message: string;
    data: StoreDashboardDto;
}
