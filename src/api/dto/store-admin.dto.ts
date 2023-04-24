import { ApiProperty } from '@nestjs/swagger';
import { Type } from 'class-transformer';
import {
  ArrayMinSize,
  IsBooleanString,
  IsEmpty,
  IsNotEmpty,
  IsNumber,
  IsOptional,
  IsString,
  Matches
} from 'class-validator';
import { Pagination } from './message.dto';

export class StoreAdminUpdateDto {
  @ApiProperty({ required: false })
  @IsOptional()
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
  @ApiProperty({ required: false })
  @IsOptional()
  @IsNotEmpty()
  @IsString()
    image: string;
}

export class StoresAssignedToStoreAdmin {
  @ApiProperty({ required: false })
    storeId: number;
  @ApiProperty({ required: false })
    storeName: string;
}

export class StoreAdminProfileFetchDTO {
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
  @ApiProperty({ required: false, isArray: true })
    stores: StoresAssignedToStoreAdmin;
}

export class StoreAdminProfileFetchResponseDto {
  @ApiProperty({ required: false })
    message: string;
  @ApiProperty({ required: false })
    data: StoreAdminProfileFetchDTO;
}

export class StoresUnderStoreAdmin {
  @ApiProperty({ required: false })
    storeId: number;
  @ApiProperty({ required: false })
    storeName: string;
  @ApiProperty({ required: false })
    district_name: string;
}

export class FetchAssignedStoresResponseDto {
  @ApiProperty({ required: false })
    message: string;
  @ApiProperty({ required: false, isArray: true })
    data: StoresUnderStoreAdmin;
  @ApiProperty({ required: false })
    pagination: Pagination;
}

export class FetchAllAssignedStoresPaginationDto {
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

export class FetchSectionWiseProductsDto {
  @ApiProperty({ required: false })
    productId: number;

  @ApiProperty({ required: false })
    image: string;

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
    skuId: number;

  @ApiProperty({ required: false })
    skuUniqueId: string;

  @ApiProperty({ required: false })
    count: number;
}

export class FetchSectionWiseProductsPaginationDto {
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

  @ApiProperty({ required: false })
  @IsNotEmpty()
  @Matches(/^[[0-9,]*[0-9]+]$/, {
    message: 'filter category is in invalid format'
  })
  @IsOptional()
    filterCategory: string;
}

export class FetchSectionWiseProductsResponseDto {
  @ApiProperty({ required: false })
    message: string;

  @ApiProperty({
    required: false,
    isArray: true,
    type: FetchSectionWiseProductsDto
  })
    data: FetchSectionWiseProductsDto[];

  @ApiProperty({ required: false })
    pagination: Pagination;
}

export class VisitorsCountDto {
  @ApiProperty({ required: false })
    totalVisitors: number;
  @ApiProperty({ required: false })
    activeVisitors: number;
}

export class FetchVisitorsCountResponseDto {
  @ApiProperty({ required: false })
    message: string;
  @ApiProperty({ required: false, type: VisitorsCountDto })
    data: VisitorsCountDto;
}

export class BeaconFetchDto {
  @ApiProperty()
    beacon_id: number;
  @ApiProperty()
    name: string;
  @ApiProperty()
    majorId: string;
  @ApiProperty()
    deviceId: string;
  @ApiProperty()
    minorId: number;
  @ApiProperty()
    sectionId: number;
  @ApiProperty()
    sectionName: string;
  @ApiProperty()
    count: number;
}
export class BeaconFetchMessageDto {
  @ApiProperty()
    message: string;
  @ApiProperty({ type: BeaconFetchDto, isArray: true })
    data: BeaconFetchDto[];
  @ApiProperty()
    pagination: Pagination;
}

export class BeaconPaginationQueryParam {
  @ApiProperty()
    limit: number;
  @ApiProperty()
    offset: number;
  @ApiProperty()
    sectionId: number;
}

export class AssignBeaconDto {
  @ApiProperty({ type: Number, isArray: true })
  @ArrayMinSize(1)
  @IsNotEmpty()
  @Type(() => Number)
    beaconId: number[];
}

export class UnAssignBeaconDto {
  @ApiProperty({ required: false })
  @IsEmpty()
    sectionId: number;
}

export class BeaconIdDto {
  @ApiProperty()
    beaconId: number;
}

export class BeaconMessageDto {
  @ApiProperty()
    message: string;
}

export class StoreDashboardDto {
  @ApiProperty({ required: false })
    totalVisitors: number;
  @ApiProperty({ required: false })
    activeVisitors: number;
  @ApiProperty({ required: false })
    totalBeacons: number;
}

export class StoreDashboardResponseDto {
  @ApiProperty({ required: false })
    message: string;
  @ApiProperty({ required: false, type: StoreDashboardDto })
    data: StoreDashboardDto;
}
