import { ApiProperty } from '@nestjs/swagger';
import { Transform, Type } from 'class-transformer';
import {
  ArrayMinSize,
  IsBooleanString,
  IsNotEmpty,
  IsNumber,
  IsOptional,
  IsString,
  Matches,
  Max,
  Min,
  ValidateNested
} from 'class-validator';
import { Pagination } from './message.dto';

export class ColourDto {
  @ApiProperty()
    id: number;
  @ApiProperty()
    name: string;
  @ApiProperty()
    colourCode: string;
}

export class CategorySizeDto {
  @ApiProperty()
    id: number;
  @ApiProperty()
    name: string;
}

export class MessageSizeDto {
  @ApiProperty()
    message: string;
  @ApiProperty({ isArray: true })
    data: CategorySizeDto;
}

export class MessageColourDto {
  @ApiProperty()
    message: string;
  @ApiProperty({ isArray: true })
    data: ColourDto;
}

export class MessageCategoryDto {
  @ApiProperty()
    message: string;
  @ApiProperty({ isArray: true })
    data: CategorySizeDto;
}

export class SkuIdDto {
  id: number;
}

export class ProductIdDTO {
  id: number;
}

export class CreateProductBodyDto {
  @ApiProperty()
  @IsString()
  @IsNotEmpty()
    productName: string;
  @ApiProperty()
  @IsString()
  @IsNotEmpty()
    description: string;
  @ApiProperty()
  @IsNumber()
  @IsNotEmpty()
    categoryId: number;
}

export class CreatedProductId {
  id: string;
}

export class ProductCreateDto {
  @ApiProperty()
    productId: number;
  @ApiProperty()
    message: string;
}

export class UpdateProductSkuDetail {
  @ApiProperty()
  @IsNumber()
  @IsOptional()
    id: number;
  @ApiProperty()
  @IsString()
  @IsOptional()
    skuUniqueId: string;
  @ApiProperty()
  @IsNumber()
  @IsNotEmpty()
    colourId: number;
  @ApiProperty()
  @IsNumber()
  @IsNotEmpty()
    sizeId: number;
  @ApiProperty()
  @IsNumber()
  @IsNotEmpty()
    price: number;
  @ApiProperty()
  @IsNumber()
  @IsNotEmpty()
  @IsOptional()
    discountPercent: number;
  @ApiProperty()
  @IsString()
  @IsNotEmpty()
    image: string;
  @ApiProperty({ type: Boolean, default: false })
  @IsNotEmpty()
  @IsBooleanString()
    defaultProduct: string;
}
export class UpdateProductSku {
  @ApiProperty()
  @IsNotEmpty()
  @IsNumber()
    productId: number;
  @ApiProperty()
  @IsNotEmpty()
  @IsNumber()
    categoryId: number;
  @ApiProperty({ isArray: true, type: UpdateProductSkuDetail })
  @ArrayMinSize(1)
    skuDetails: UpdateProductSkuDetail[];
}

export class UpdateProductDto {
  @ApiProperty({ required: false })
  @IsString()
  @IsOptional()
    productName: string;
  @ApiProperty({ required: false })
  @IsString()
  @IsOptional()
    description: string;
}

export class ProductSkuDetail {
  @ApiProperty()
  @IsNumber()
  @IsNotEmpty()
    colourId: number;
  @ApiProperty()
  @IsNumber()
  @IsNotEmpty()
    sizeId: number;
  @ApiProperty()
  @IsNumber()
  @IsNotEmpty()
    price: number;
  @ApiProperty()
  @IsNumber()
  @IsNotEmpty()
  @IsOptional()
    discountPercent: number;
  @ApiProperty()
  @IsString()
  @IsNotEmpty()
    image: string;
  @ApiProperty({ type: Boolean, default: false })
  @IsBooleanString()
    defaultProduct: string;
}
export class CreateProductSku {
  @ApiProperty()
  @IsNotEmpty()
  @IsNumber()
    productId: number;
  @ApiProperty()
  @IsNotEmpty()
  @IsNumber()
    categoryId: number;
  @ApiProperty({ isArray: true, type: ProductSkuDetail })
  @ArrayMinSize(1)
    skuDetails: ProductSkuDetail[];
}
export class SkuIdDTO {
  @ApiProperty()
    id: number;
}

export class SingleProductSKUDetails {
  @ApiProperty({ required: false })
    image: string;

  @ApiProperty({ required: false })
    colour: string;

  @ApiProperty({ required: false })
    colourId: number;

  @ApiProperty({ required: false })
    colourCode: string;

  @ApiProperty({ required: false })
    default: boolean;

  @ApiProperty({ required: false })
    size: string;

  @ApiProperty({ required: false })
    sizeId: number;

  @ApiProperty({ required: false })
    price: number;

  @ApiProperty({ required: false })
    discountPercent: number;

  @ApiProperty({ required: false })
    barcode: number;
}

export class FetchSingleProductDetails {
  @ApiProperty({ required: false })
    productId: number;

  @ApiProperty({ required: false })
    productName: string;

  @ApiProperty({ required: false })
    category: string;

  @ApiProperty({ required: false })
    categoryId: number;

  @ApiProperty({ required: false })
    description: string;

  @ApiProperty({ required: false, isArray: true })
    skus: SingleProductSKUDetails;
}

export class FetchSingleProductDetailsResponseDto {
  @ApiProperty({ required: false })
    message: string;

  @ApiProperty({ required: false })
    data: FetchSingleProductDetails;
}

export class FetchSingleColourAndSizeSkuDetails {
  @ApiProperty({ required: false })
  @IsNotEmpty()
  @IsNumber()
  @IsOptional()
  @Type(() => Number)
    filterColour: number;

  @ApiProperty({ required: false })
  @IsNotEmpty()
  @IsNumber()
  @IsOptional()
  @Type(() => Number)
    filterSize: number;
}

export class FetchAllProductsPagination {
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
  @IsNumber()
  @IsOptional()
  @Type(() => Number)
    id: number;
  @ApiProperty({ required: false })
  @IsNotEmpty()
  @IsBooleanString()
  @IsOptional()
    sortName: string;
  @ApiProperty({ required: false })
  @IsNotEmpty()
  @IsBooleanString()
  @IsOptional()
    sortPrice: string;
  @ApiProperty({ required: false })
  @IsString()
  @IsOptional()
  @IsNotEmpty()
    productName: string;
  @ApiProperty({ required: false })
  @IsString()
  @IsOptional()
  @IsNotEmpty()
    categoryName: string;
  @ApiProperty({ required: false })
  @IsNotEmpty()
  @Matches(/^[[0-9,]*[0-9]+]$/, {
    message: 'filter category is in invalid format'
  })
  @IsOptional()
    filterCategory: string;
}

export class ProductFetchDto {
  @ApiProperty({ required: false })
    id: number;
  @ApiProperty({ required: false })
    productName: string;
  @ApiProperty({ required: false })
    categoryId: number;
  @ApiProperty({ required: false })
    categoryName: string;
  @ApiProperty({ required: false })
    price: number;
  @ApiProperty({ required: false })
    discountPercent: number;
  @ApiProperty({ required: false })
    image: string;
  @ApiProperty({ required: false })
    skuUniqueId: string;
  @ApiProperty({ required: false })
    updatedBy: number;
}

export class ProductFetchResponseDto {
  @ApiProperty()
    message: string;
  @ApiProperty({ isArray: true })
    data: ProductFetchDto;
  @ApiProperty()
    pagination: Pagination;
}

export class UserProductFetchDto {
  @ApiProperty({ required: false })
    productId: number;
  @ApiProperty({ required: false })
    productName: string;
  @ApiProperty({ required: false })
    description: string;
  @ApiProperty({ required: false })
    categoryId: number;
  @ApiProperty({ required: false })
    categoryName: string;
  @ApiProperty({ required: false })
    basePrice: number;
  @ApiProperty({ required: false })
    discountPercent: number;
  @ApiProperty({ required: false })
    colourId: number;
  @ApiProperty({ required: false })
    colourName: string;
  @ApiProperty({ required: false })
    colourCode: string;
  @ApiProperty({ required: false })
    sizeId: number;
  @ApiProperty({ required: false })
    sizeName: string;
  @ApiProperty({ required: false })
    image: string;
  @ApiProperty({ required: false })
    skuId: number;
  @ApiProperty({ required: false })
    skuUniqueId: string;
  @ApiProperty({ required: false })
    barcode: string;
  @ApiProperty({ required: false })
    count: number;
}

export class UserProductFetchResponseDto {
  @ApiProperty()
    message: string;
  @ApiProperty({ isArray: true })
    data: UserProductFetchDto;
  @ApiProperty()
    pagination: Pagination;
}

export class FetchProductOffersDto {
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
    sortField: string;
  @ApiProperty({ required: false })
  @IsNotEmpty()
  @IsBooleanString()
  @IsOptional()
    sortOrder: string;
}

export class FetchProductWiseOffersDto {
  @ApiProperty({ required: false })
    offerId: number;
  @ApiProperty({ required: false })
    offerTitle: string;
  @ApiProperty({ required: false })
    discountPercent: number;
  @ApiProperty({ required: false })
    description: string;
  @ApiProperty({ required: false })
    image: string;
  @ApiProperty({ required: false })
    startDate: Date;
  @ApiProperty({ required: false })
    endDate: Date;
  @ApiProperty({ required: false })
    count: number;
}

export class FetchProductOffersResponseDto {
  @ApiProperty({ required: false })
    message: string;
  @ApiProperty({ required: false, type: FetchProductWiseOffersDto })
    data: FetchProductWiseOffersDto;
}

export class StoreWiseSingleProductSKUDetails {
  @ApiProperty({ required: false })
    image: string;

  @ApiProperty({ required: false })
    colour: string;

  @ApiProperty({ required: false })
    colourId: number;

  @ApiProperty({ required: false })
    colourCode: string;

  @ApiProperty({ required: false })
    default: boolean;

  @ApiProperty({ required: false })
    size: string;

  @ApiProperty({ required: false })
    sizeId: number;

  @ApiProperty({ required: false })
    price: number;

  @ApiProperty({ required: false })
    barcode: number;

  @ApiProperty({ required: false })
    discountPercent: number;

  @ApiProperty({ required: false })
    skuUniqueId: number;

  @ApiProperty({ required: false })
    skuId: number;

  @ApiProperty({ required: false })
    availability: boolean;
}

export class FetchStoreWiseSingleProductDetails {
  @ApiProperty({ required: false })
    productId: number;

  @ApiProperty({ required: false })
    productName: string;

  @ApiProperty({ required: false })
    category: string;

  @ApiProperty({ required: false })
    categoryId: number;

  @ApiProperty({ required: false })
    description: string;

  @ApiProperty({ required: false, isArray: true })
    skus: StoreWiseSingleProductSKUDetails;
}

export class FetchStoreWiseSingleProductDetailsResponseDto {
  @ApiProperty({ required: false })
    message: string;

  @ApiProperty({ required: false, type: FetchStoreWiseSingleProductDetails })
    data: FetchStoreWiseSingleProductDetails;
}
export class CsvProductDto {
  @ValidateNested({ each: true })
  @Type(() => BulkProductUploadDto)
  @IsNotEmpty()
    products: BulkProductUploadDto[];
}

export class BulkProductUploadDto {
  @IsNotEmpty()
  @IsString()
    product_name: string;
  @IsNotEmpty()
  @IsString()
    description: string;
  @IsNotEmpty()
  @Transform(({ value }) => parseInt(value))
  @IsNumber()
  @Min(0)
    category_id: number;
  @IsNotEmpty()
  @Transform(({ value }) => parseFloat(value))
  @IsNumber()
  @Min(0.01)
  @Max(99.99)
    sale_price_discount: number;
  @IsNotEmpty()
  @Transform(({ value }) => parseInt(value))
  @IsNumber()
  @Min(0)
    base_price: number;
  @IsNotEmpty()
  @Transform(({ value }) => parseInt(value))
  @IsNumber()
  @Min(0)
    colour_id: number;
  @IsNotEmpty()
  @Transform(({ value }) => parseInt(value))
  @IsNumber()
  @Min(0)
    size_id: number;
  @IsNotEmpty()
  @IsBooleanString()
    in_store_availability: boolean;
  @IsNotEmpty()
  @IsString()
    image: string;
  @IsNotEmpty()
  @IsBooleanString()
    default_product: boolean;
}

export class ProductListSetDto{
  id: number
}

export class SkuIdListDto{
  id: number;
}