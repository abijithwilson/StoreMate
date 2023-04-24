import { Pagination } from './message.dto';
export declare class StoreSectionIdDto {
    storeId: string;
}
export declare class FetchStoreWiseSectionsPaginationDto {
    limit: number;
    offset: number;
}
export declare class StoreWiseSectionDto {
    sectionName: string;
    sectionId: number;
    noOfBeacons: number;
    count: number;
}
export declare class StoreWiseSectionResponseDto {
    message: string;
    data: StoreWiseSectionDto[];
    pagination: Pagination;
}
export declare class CreateSectionDto {
    sectionName: string;
}
export declare class UpdateSectionDto {
    sectionName: string;
}
export declare class SectionIdDto {
    id: number;
}
export declare class SectionMessageDto {
    message: string;
}
export declare class SectionUnderStoreQueryParam {
    sectionName: string;
}
export declare class SectionDropDownList {
    sectionId: number;
    sectionName: string;
}
export declare class MessageSectionDropDownList {
    message: string;
    data: SectionDropDownList[];
}
export declare class SectionProductMapId {
    id: number;
}
export declare class ProductIdDto {
    productId: number;
}
export declare class SectionFetchDto {
    message: string;
    data: SectionDropDownList[];
    pagination: Pagination;
}
export declare class SectionQueryDto {
    limit: number;
    offset: number;
    storeId: number;
    sortField: string;
    sortOrder: string;
}
export declare class AssignSectionDto {
    sectionId: number[];
}
export declare class AssignProductSectionDto {
    productId: number[];
}
export declare class SectionWiseCategoriesPaginationDto {
    limit: number;
    offset: number;
}
export declare class SectionWiseCategoriesDto {
    categoryId: number;
    categoryName: string;
    categoryImage: string;
    count: number;
}
export declare class FetchCategoryListResponseDto {
    message: string;
    data: SectionWiseCategoriesDto[];
}
export declare class SectionWiseOfferDto {
    offerId: number;
    image: string;
    offerTitle: string;
    description: string;
    count: number;
}
export declare class FetchOfferListResponseDto {
    message: string;
    data: SectionWiseOfferDto[];
    pagination: Pagination;
}
export declare class FetchWishlistProductsPaginationDto {
    limit: number;
    offset: number;
    filterPriceHigh: number;
    filterPriceLow: number;
    sortPrice: string;
    searchName: string;
    filterColour: string;
    filterSize: string;
    filterCategory: string;
}
export declare class FetchWishlistProductsDto {
    productId: number;
    productName: string;
    categoryId: number;
    categoryName: string;
    price: number;
    discountPercent: number;
    image: string;
    count: number;
}
export declare class FetchWishlistProductsResponseDto {
    messsage: string;
    data: FetchWishlistProductsDto;
    pagination: Pagination;
}
export declare class WishlistProductAssignDto {
    storeId: number;
    sectionId: number;
    productId: number;
}
export declare class FetchProductFilterData {
    filterCategory: string;
    offerId: number;
    wishlist: string;
}
export declare class SizeFilterData {
    sizeId: number;
    size: string;
}
export declare class ColourFilterData {
    colourId: number;
    colour: string;
    colour_code: string;
}
export declare class CategoryFilterData {
    categoryId: number;
    category: string;
}
export declare class ProductFilterData {
    size: SizeFilterData;
    colour: ColourFilterData;
    category: CategoryFilterData;
    minPrice: number;
    maxPrice: number;
}
export declare class ProductFilterDataResponse {
    message: string;
    data: ProductFilterData;
}
export declare class ProductIdArrayDto {
    productId: number[];
}
export declare class SectionVisitParamDto {
    limit: number;
    offset: number;
    searchName: string;
}
export declare class SectionVisitDataDto {
    sectionId: number;
    sectionName: string;
    visited: number;
}
export declare class SectionVisitDataResponseDto {
    message: string;
    data: SectionVisitDataDto;
}
