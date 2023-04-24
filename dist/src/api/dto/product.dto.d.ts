import { Pagination } from './message.dto';
export declare class ColourDto {
    id: number;
    name: string;
    colourCode: string;
}
export declare class CategorySizeDto {
    id: number;
    name: string;
}
export declare class MessageSizeDto {
    message: string;
    data: CategorySizeDto;
}
export declare class MessageColourDto {
    message: string;
    data: ColourDto;
}
export declare class MessageCategoryDto {
    message: string;
    data: CategorySizeDto;
}
export declare class SkuIdDto {
    id: number;
}
export declare class ProductIdDTO {
    id: number;
}
export declare class CreateProductBodyDto {
    productName: string;
    description: string;
    categoryId: number;
}
export declare class CreatedProductId {
    id: string;
}
export declare class ProductCreateDto {
    productId: number;
    message: string;
}
export declare class UpdateProductSkuDetail {
    id: number;
    skuUniqueId: string;
    colourId: number;
    sizeId: number;
    price: number;
    discountPercent: number;
    image: string;
    defaultProduct: string;
}
export declare class UpdateProductSku {
    productId: number;
    categoryId: number;
    skuDetails: UpdateProductSkuDetail[];
}
export declare class UpdateProductDto {
    productName: string;
    description: string;
}
export declare class ProductSkuDetail {
    colourId: number;
    sizeId: number;
    price: number;
    discountPercent: number;
    image: string;
    defaultProduct: string;
}
export declare class CreateProductSku {
    productId: number;
    categoryId: number;
    skuDetails: ProductSkuDetail[];
}
export declare class SkuIdDTO {
    id: number;
}
export declare class SingleProductSKUDetails {
    image: string;
    colour: string;
    colourId: number;
    colourCode: string;
    default: boolean;
    size: string;
    sizeId: number;
    price: number;
    discountPercent: number;
    barcode: number;
}
export declare class FetchSingleProductDetails {
    productId: number;
    productName: string;
    category: string;
    categoryId: number;
    description: string;
    skus: SingleProductSKUDetails;
}
export declare class FetchSingleProductDetailsResponseDto {
    message: string;
    data: FetchSingleProductDetails;
}
export declare class FetchSingleColourAndSizeSkuDetails {
    filterColour: number;
    filterSize: number;
}
export declare class FetchAllProductsPagination {
    limit: number;
    offset: number;
    id: number;
    sortName: string;
    sortPrice: string;
    productName: string;
    categoryName: string;
    filterCategory: string;
}
export declare class ProductFetchDto {
    id: number;
    productName: string;
    categoryId: number;
    categoryName: string;
    price: number;
    discountPercent: number;
    image: string;
    skuUniqueId: string;
    updatedBy: number;
}
export declare class ProductFetchResponseDto {
    message: string;
    data: ProductFetchDto;
    pagination: Pagination;
}
export declare class UserProductFetchDto {
    productId: number;
    productName: string;
    description: string;
    categoryId: number;
    categoryName: string;
    basePrice: number;
    discountPercent: number;
    colourId: number;
    colourName: string;
    colourCode: string;
    sizeId: number;
    sizeName: string;
    image: string;
    skuId: number;
    skuUniqueId: string;
    barcode: string;
    count: number;
}
export declare class UserProductFetchResponseDto {
    message: string;
    data: UserProductFetchDto;
    pagination: Pagination;
}
export declare class FetchProductOffersDto {
    limit: number;
    offset: number;
    sortField: string;
    sortOrder: string;
}
export declare class FetchProductWiseOffersDto {
    offerId: number;
    offerTitle: string;
    discountPercent: number;
    description: string;
    image: string;
    startDate: Date;
    endDate: Date;
    count: number;
}
export declare class FetchProductOffersResponseDto {
    message: string;
    data: FetchProductWiseOffersDto;
}
export declare class StoreWiseSingleProductSKUDetails {
    image: string;
    colour: string;
    colourId: number;
    colourCode: string;
    default: boolean;
    size: string;
    sizeId: number;
    price: number;
    barcode: number;
    discountPercent: number;
    skuUniqueId: number;
    skuId: number;
    availability: boolean;
}
export declare class FetchStoreWiseSingleProductDetails {
    productId: number;
    productName: string;
    category: string;
    categoryId: number;
    description: string;
    skus: StoreWiseSingleProductSKUDetails;
}
export declare class FetchStoreWiseSingleProductDetailsResponseDto {
    message: string;
    data: FetchStoreWiseSingleProductDetails;
}
export declare class CsvProductDto {
    products: BulkProductUploadDto[];
}
export declare class BulkProductUploadDto {
    product_name: string;
    description: string;
    category_id: number;
    sale_price_discount: number;
    base_price: number;
    colour_id: number;
    size_id: number;
    in_store_availability: boolean;
    image: string;
    default_product: boolean;
}
export declare class ProductListSetDto {
    id: number;
}
export declare class SkuIdListDto {
    id: number;
}
