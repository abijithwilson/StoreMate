import { ApiProperty } from '@nestjs/swagger';
import { Type } from 'class-transformer';
import {
  ArrayMinSize,
  IsBooleanString,
  IsNotEmpty,
  IsNumber,
  IsOptional,
  IsString,
  Matches
} from 'class-validator';
import { boolean } from 'joi';
import { Pagination } from './message.dto';

export class StoreSectionIdDto {
  storeId: string;
}

export class FetchStoreWiseSectionsPaginationDto {
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

export class StoreWiseSectionDto {
  @ApiProperty({ required: false })
    sectionName: string;

  @ApiProperty({ required: false })
    sectionId: number;

  @ApiProperty({ required: false })
    noOfBeacons: number;

  @ApiProperty({ required: false })
    count: number;
}

export class StoreWiseSectionResponseDto {
  @ApiProperty({ required: false })
    message: string;

  @ApiProperty({ required: false, type: StoreWiseSectionDto, isArray: true })
    data: StoreWiseSectionDto[];

  @ApiProperty({ required: false })
    pagination: Pagination;
}

export class CreateSectionDto {
  @ApiProperty()
  @IsString()
  @IsNotEmpty()
    sectionName: string;
}

export class UpdateSectionDto {
  @ApiProperty()
  @IsString()
  @IsNotEmpty()
    sectionName: string;
}
export class SectionIdDto {
  id: number;
}

export class SectionMessageDto {
  @ApiProperty()
    message: string;
}

export class SectionUnderStoreQueryParam {
  @ApiProperty()
    sectionName: string;
}

export class SectionDropDownList {
  @ApiProperty()
    sectionId: number;
  @ApiProperty()
    sectionName: string;
}

export class MessageSectionDropDownList {
  @ApiProperty()
    message: string;
  @ApiProperty({ type: SectionDropDownList, isArray: true })
    data: SectionDropDownList[];
}

export class SectionProductMapId {
  id: number;
}

export class ProductIdDto {
  @ApiProperty()
    productId: number;
}

export class SectionFetchDto {
  @ApiProperty({ required: false })
    message: string;

  @ApiProperty({ required: false, type: SectionDropDownList, isArray: true })
    data: SectionDropDownList[];

  @ApiProperty({ required: false })
    pagination: Pagination;
}

export class SectionQueryDto {
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
  @IsNumber()
  @IsOptional()
  @Type(() => Number)
  @IsNotEmpty()
    storeId: number;
  @ApiProperty()
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
export class AssignSectionDto {
  @ApiProperty({ type: Number, isArray: true })
  @IsNotEmpty()
  @ArrayMinSize(1)
    sectionId: number[];
}
export class AssignProductSectionDto {
  @ApiProperty({ type: Number, isArray: true })
  @ArrayMinSize(1)
  @IsNotEmpty()
  @Type(() => Number)
    productId: number[];
}

export class SectionWiseCategoriesPaginationDto {
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

export class SectionWiseCategoriesDto {
  @ApiProperty({ required: false })
    categoryId: number;
  @ApiProperty({ required: false })
    categoryName: string;
  @ApiProperty({ required: false })
    categoryImage: string;
  @ApiProperty({ required: false })
    count: number;
}

export class FetchCategoryListResponseDto {
  @ApiProperty({ required: false })
    message: string;

  @ApiProperty({
    required: false,
    type: SectionWiseCategoriesDto,
    isArray: true
  })
    data: SectionWiseCategoriesDto[];
}

export class SectionWiseOfferDto {
  @ApiProperty({ required: false })
    offerId: number;
  @ApiProperty({ required: false })
    image: string;
  @ApiProperty({ required: false })
    offerTitle: string;
  @ApiProperty({ required: false })
    description: string;
  @ApiProperty({ required: false })
    count: number;
}

export class FetchOfferListResponseDto {
  @ApiProperty({ required: false })
    message: string;
  @ApiProperty({ required: false, type: SectionWiseOfferDto, isArray: true })
    data: SectionWiseOfferDto[];
  @ApiProperty({ required: false })
    pagination: Pagination;
}

export class FetchWishlistProductsPaginationDto {
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
    filterPriceHigh: number;

  @ApiProperty({ required: false })
  @IsNotEmpty()
  @IsNumber()
  @IsOptional()
  @Type(() => Number)
    filterPriceLow: number;

  @ApiProperty({ required: false })
  @IsNotEmpty()
  @IsBooleanString()
  @IsOptional()
    sortPrice: string;

  @ApiProperty({ required: false })
  @IsOptional()
  @IsNotEmpty()
    searchName: string;

  @ApiProperty({ required: false, type: Number, isArray: true })
  @IsNotEmpty()
  @Matches(/^[[0-9,]*[0-9]+]$/, {
    message: 'filter colour is in invalid format'
  })
  @IsOptional()
    filterColour: string;

  @ApiProperty({ required: false, type: Number, isArray: true })
  @IsNotEmpty()
  @Matches(/^[[0-9,]*[0-9]+]$/, {
    message: 'filter size is in invalid format'
  })
  @IsOptional()
    filterSize: string;

  @ApiProperty({ required: false })
  @IsNotEmpty()
  @Matches(/^[[0-9,]*[0-9]+]$/, {
    message: 'filter category is in invalid format'
  })
  @IsOptional()
    filterCategory: string;
}

export class FetchWishlistProductsDto {
  @ApiProperty({ required: false })
    productId: number;

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
    count: number;
}

export class FetchWishlistProductsResponseDto {
  @ApiProperty({ required: false })
    messsage: string;

  @ApiProperty({ required: false, type: FetchWishlistProductsDto })
    data: FetchWishlistProductsDto;

  @ApiProperty({ required: false })
    pagination: Pagination;
}

export class WishlistProductAssignDto {
  @ApiProperty({ required: false })
  @IsOptional()
  @IsNotEmpty()
  @IsNumber()
    storeId: number;

  @ApiProperty({ required: false })
  @IsOptional()
  @IsNotEmpty()
  @IsNumber()
    sectionId: number;

  @ApiProperty({ required: false })
  @IsOptional()
  @IsNotEmpty()
  @IsNumber()
    productId: number;
}

export class FetchProductFilterData {
  @ApiProperty({ required: false, type: Number, isArray: true })
  @IsNotEmpty()
  @Matches(/^[[0-9,]*[0-9]+]$/, {
    message: 'filter category is in invalid format'
  })
  @IsOptional()
    filterCategory: string;
  @ApiProperty({ required: false })
  @IsNumber()
  @IsOptional()
  @Type(() => Number)
  @IsNotEmpty()
    offerId: number;
  @ApiProperty({required: false, type: boolean})
  @IsNotEmpty()
  @IsBooleanString()
  @IsOptional()
    wishlist: string;
}

export class SizeFilterData {
  @ApiProperty({ required: false })
    sizeId: number;
  @ApiProperty({ required: false })
    size: string;
}

export class ColourFilterData {
  @ApiProperty({ required: false })
    colourId: number;
  @ApiProperty({ required: false })
    colour: string;
  @ApiProperty({ required: false })
    colour_code: string;
}

export class CategoryFilterData {
  @ApiProperty({ required: false })
    categoryId: number;
  @ApiProperty({ required: false })
    category: string;
}

export class ProductFilterData {
  @ApiProperty({ required: false, isArray: true })
    size: SizeFilterData;
  @ApiProperty({ required: false, isArray: true })
    colour: ColourFilterData;
  @ApiProperty({ required: false, isArray: true })
    category: CategoryFilterData;
  @ApiProperty({ required: false })
    minPrice: number;
  @ApiProperty({ required: false })
    maxPrice: number;
}

export class ProductFilterDataResponse {
  @ApiProperty({ required: false })
    message: string;
  @ApiProperty({ required: false })
    data: ProductFilterData;
}

export class ProductIdArrayDto {
  @ApiProperty({ required: false, isArray: true })
    productId: number[];
}

export class SectionVisitParamDto {
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

export class SectionVisitDataDto{
  @ApiProperty({ required: false })
    sectionId: number;
  @ApiProperty({ required: false })
    sectionName: string;
  @ApiProperty({ required: false })
    visited: number;
}

export class SectionVisitDataResponseDto{
  @ApiProperty({ required: false })
    message: string;
  @ApiProperty({ required: false })
    data: SectionVisitDataDto;
}