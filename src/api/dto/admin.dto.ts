import { ApiProperty } from '@nestjs/swagger';
import { Type } from 'class-transformer';
import {
  IsNumber,
  IsNotEmpty,
  IsOptional,
  IsString,
  Matches,
  IsISO8601,
  IsBooleanString
} from 'class-validator';
import { boolean } from 'joi';
import { Pagination } from './message.dto';

export class AdminIdDto {
  @ApiProperty()
    adminId: number;
}
export class AdminUpdateDto {
  @ApiProperty({ required: false })
  @IsOptional()
  @IsNotEmpty()
  @IsString()
    phone: string;
  @ApiProperty({ required: false })
  @IsOptional()
  @IsNotEmpty()
  @IsNumber()
    countryId: number;
  @ApiProperty({ required: false })
  @IsOptional()
  @IsNotEmpty()
  @IsNumber()
    stateId: number;
  @ApiProperty({ required: false })
  @IsOptional()
  @IsNotEmpty()
  @IsString()
    address: string;
  @ApiProperty({ required: false })
  @IsOptional()
  @IsNotEmpty()
  @IsString()
    image: string;
}

export class AdminDto {
  @ApiProperty()
    firstName: string;
  @ApiProperty()
    secondName: string;
  @ApiProperty()
    email: string;
  @ApiProperty()
    roles: string;
  @ApiProperty()
    image: string;
  @ApiProperty()
    phone: string;
  @ApiProperty()
    country: string;
  @ApiProperty()
    state: string;
  @ApiProperty()
    address: string;
}

export class AdminFetchMessageDto {
  @ApiProperty()
    message: string;
  @ApiProperty({ type: AdminDto })
    data: AdminDto;
}

export class MessageDto {
  @ApiProperty()
    message: string;
}
export class FetchAllStoreAdminPaginationDTO {
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
  @IsString()
  @IsOptional()
  @IsNotEmpty()
    adminName: string;
  @ApiProperty({ required: false })
  @IsString()
  @IsOptional()
  @IsNotEmpty()
  @ApiProperty()
    storeName: string;
  @IsNotEmpty()
  @ApiProperty({ required: false })
  @Matches(/^[[0-9,]*[0-9]+]$/, {
    message: 'filter district is in invalid format'
  })
  @IsOptional()
    districtId: string;
  @IsNotEmpty()
  @ApiProperty({ required: false })
  @Matches(/^[[0-9,]*[0-9]+]$/, {
    message: 'filter state is in invalid format'
  })
  @IsOptional()
    stateId: string;
  @IsNotEmpty()
  @Matches(/^[[0-9,]*[0-9]+]$/, {
    message: 'filter country is in invalid Format'
  })
  @ApiProperty({ required: false })
  @IsOptional()
  @Matches('^[[0-9,]*[0-9]+]$')
    countryId: string;
}

export class AssignedStores {
  @ApiProperty({ required: false })
    storeId: number;
  @ApiProperty({ required: false })
    storeName: string;
  @ApiProperty({ required: false })
    districtId: number;
}

export class FetchAllStoreAdminDetail {
  @ApiProperty({ required: false })
    adminId: number;
  @ApiProperty({ required: false })
    firstName: string;
  @ApiProperty({ required: false })
    lastName: string;
  @ApiProperty({ required: false, isArray: true, type: AssignedStores })
    stores: AssignedStores[];
}

export class FetchAllStoreAdminMessageDto {
  @ApiProperty({ required: false })
    message: string;
  @ApiProperty({ required: false })
    data: FetchAllStoreAdminDetail;
  @ApiProperty({ required: false })
    pagination: Pagination;
}

export class StoreUnderStoreAdmin {
  @ApiProperty({ required: false })
    storeId: number;
  @ApiProperty({ required: false })
    storeName: string;
}

export class StoreAdminFetchDTO {
  @ApiProperty({ required: false })
    adminId: number;
  @ApiProperty({ required: false })
    firstName: string;
  @ApiProperty({ required: false })
    lastName: string;
  @ApiProperty({ required: false })
    email: string;
  @ApiProperty({ required: false })
    image: string;
  @ApiProperty({ required: false })
    phone: string;
  @ApiProperty({ required: false })
    countryId: number;
  @ApiProperty({ required: false })
    stateId: number;
  @ApiProperty({ required: false })
    countryName: string;
  @ApiProperty({ required: false })
    stateName: string;
  @ApiProperty({ required: false })
    address: string;
  @ApiProperty({ required: false })
    stores: StoreUnderStoreAdmin;
}

export class MessageAdminFetchDto {
  @ApiProperty({ required: false })
    message: string;
  @ApiProperty({ required: false })
    data: StoreAdminFetchDTO;
}
export class DeleteStoreAdminDto {
  @ApiProperty({ required: true, type: [Number] })
  @Type(() => Number)
  @IsNumber({}, { each: true })
    storeAdminId: number[];
}

export class StoreAdminUpdateDto {
  @ApiProperty({ required: false })
  @IsOptional()
  @IsNotEmpty()
  @IsString()
    firstName: string;

  @ApiProperty({ required: false })
  @IsOptional()
  @IsNotEmpty()
  @IsString()
    lastName: string;
    
  @ApiProperty({ required: false })
  @IsOptional()
  @IsNotEmpty()
  @IsString()
    phone: string;

  @ApiProperty({ required: false })
  @IsOptional()
  @IsNotEmpty()
  @IsNumber()
    countryId: number;

  @ApiProperty({ required: false })
  @IsOptional()
  @IsNotEmpty()
  @IsNumber()
    stateId: number;

  @ApiProperty({ required: false })
  @IsOptional()
  @IsNotEmpty()
  @IsString()
    address: string;

  @ApiProperty({ required: true, type: [Number] })
  @IsOptional()
  @Type(() => Number)
  @IsNumber({}, { each: true })
    assignedStoreId: number[];

  @ApiProperty({ required: true, type: [Number] })
  @IsOptional()
  @Type(() => Number)
  @IsNumber({}, { each: true })
    unassignedStoreId: number[];
}

export class UpdateOffer {
  @ApiProperty()
  @IsOptional()
  @IsNotEmpty()
  @IsString()
    offerTitle: string;
  @ApiProperty()
  @IsOptional()
  @IsNotEmpty()
  @IsString()
    image: string;
  @ApiProperty()
  @IsOptional()
  @IsNotEmpty()
  @IsString()
    description: string;
  @ApiProperty({ type: Date, example: '2022-11-04' })
  @IsISO8601()
  @IsOptional()
  @IsNotEmpty()
    startDate: string;
  @ApiProperty({ type: Date, example: '2022-11-04' })
  @IsISO8601()
  @IsOptional()
  @IsNotEmpty()
    endDate: string;
}

export class OfferFetchDto {
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
}

export class OfferFetchMessageDto {
  @ApiProperty()
    message: string;
  @ApiProperty({ type: OfferFetchDto })
    data: OfferFetchDto;
}
export class CreateOffer {
  @ApiProperty()
  @IsNotEmpty()
  @IsString()
    offerTitle: string;
  @ApiProperty()
  @IsNotEmpty()
  @IsString()
    image: string;
  @ApiProperty()
  @IsNotEmpty()
  @IsString()
    description: string;
  @ApiProperty({ type: Date, example: '2022-11-04' })
  @IsISO8601()
  @IsNotEmpty()
    startDate: string;
  @ApiProperty({ type: Date, example: '2022-11-04' })
  @IsISO8601()
  @IsNotEmpty()
    endDate: string;
}
export class OfferId {
  offerId: number;
}

export class SingleOfferProductListPaginationDto {
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
  @IsString()
  @IsOptional()
    sortField: string;
  @ApiProperty({ required: false })
  @IsNotEmpty()
  @IsBooleanString()
  @IsOptional()
    sortOrder: string;
  @ApiProperty({ required: false })
  @IsNotEmpty()
  @Matches(/^[[0-9,]*[0-9]+]$/, {
    message: 'filter category is in invalid format'
  })
  @IsOptional()
    filterCategory: string;
  @ApiProperty({ required: false, type: boolean })
  @IsNotEmpty()
  @IsBooleanString()
  @IsOptional()
    assigned: string;
}

export class SingleOfferProductListDto {
  @ApiProperty()
    productId: number;
  @ApiProperty()
    skuId: number;
  @ApiProperty()
    productName: string;
  @ApiProperty()
    categoryId: number;
  @ApiProperty()
    categoryName: string;
  @ApiProperty()
    productImage: string;
  @ApiProperty()
    basePrice: number;
  @ApiProperty()
    discountPercent: number;
  @ApiProperty()
    count: number;
}

export class SingleOfferProductListResponseDto {
  @ApiProperty({ required: false })
    message: string;

  @ApiProperty()
    data: SingleOfferProductListDto;

  @ApiProperty({ required: false })
    pagination: Pagination;
}

export class SingleOfferProductAssignDto {
  @ApiProperty({ required: true })
  @IsNotEmpty()
  @IsNumber()
    offerId: number;
  @ApiProperty({ required: true, type: [Number] })
  @Type(() => Number)
  @IsNumber({}, { each: true })
    productId: number[];
}

export class AdminPasswordUpdateDto {
  @ApiProperty({ required: true })
  @IsString()
    oldPassword: string;

  @ApiProperty({ required: true })
  @IsString()
    newPassword: string;
}

export class AdminLoginDto {
  @ApiProperty()
    adminId: string;
  @ApiProperty()
    email: string;
  @ApiProperty()
    password: string;
  @ApiProperty()
    salt: string;
}
