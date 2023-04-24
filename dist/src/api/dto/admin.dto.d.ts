import { Pagination } from './message.dto';
export declare class AdminIdDto {
    adminId: number;
}
export declare class AdminUpdateDto {
    phone: string;
    countryId: number;
    stateId: number;
    address: string;
    image: string;
}
export declare class AdminDto {
    firstName: string;
    secondName: string;
    email: string;
    roles: string;
    image: string;
    phone: string;
    country: string;
    state: string;
    address: string;
}
export declare class AdminFetchMessageDto {
    message: string;
    data: AdminDto;
}
export declare class MessageDto {
    message: string;
}
export declare class FetchAllStoreAdminPaginationDTO {
    limit: number;
    offset: number;
    adminName: string;
    storeName: string;
    districtId: string;
    stateId: string;
    countryId: string;
}
export declare class AssignedStores {
    storeId: number;
    storeName: string;
    districtId: number;
}
export declare class FetchAllStoreAdminDetail {
    adminId: number;
    firstName: string;
    lastName: string;
    stores: AssignedStores[];
}
export declare class FetchAllStoreAdminMessageDto {
    message: string;
    data: FetchAllStoreAdminDetail;
    pagination: Pagination;
}
export declare class StoreUnderStoreAdmin {
    storeId: number;
    storeName: string;
}
export declare class StoreAdminFetchDTO {
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
    stores: StoreUnderStoreAdmin;
}
export declare class MessageAdminFetchDto {
    message: string;
    data: StoreAdminFetchDTO;
}
export declare class DeleteStoreAdminDto {
    storeAdminId: number[];
}
export declare class StoreAdminUpdateDto {
    firstName: string;
    lastName: string;
    phone: string;
    countryId: number;
    stateId: number;
    address: string;
    assignedStoreId: number[];
    unassignedStoreId: number[];
}
export declare class UpdateOffer {
    offerTitle: string;
    image: string;
    description: string;
    startDate: string;
    endDate: string;
}
export declare class OfferFetchDto {
    offerId: number;
    offerTitle: string;
    image: string;
    description: string;
    startDate: string;
    endDate: string;
}
export declare class OfferFetchMessageDto {
    message: string;
    data: OfferFetchDto;
}
export declare class CreateOffer {
    offerTitle: string;
    image: string;
    description: string;
    startDate: string;
    endDate: string;
}
export declare class OfferId {
    offerId: number;
}
export declare class SingleOfferProductListPaginationDto {
    limit: number;
    offset: number;
    sortField: string;
    sortOrder: string;
    filterCategory: string;
    assigned: string;
}
export declare class SingleOfferProductListDto {
    productId: number;
    skuId: number;
    productName: string;
    categoryId: number;
    categoryName: string;
    productImage: string;
    basePrice: number;
    discountPercent: number;
    count: number;
}
export declare class SingleOfferProductListResponseDto {
    message: string;
    data: SingleOfferProductListDto;
    pagination: Pagination;
}
export declare class SingleOfferProductAssignDto {
    offerId: number;
    productId: number[];
}
export declare class AdminPasswordUpdateDto {
    oldPassword: string;
    newPassword: string;
}
export declare class AdminLoginDto {
    adminId: string;
    email: string;
    password: string;
    salt: string;
}
