import { ApiProperty } from '@nestjs/swagger';
import { Type } from 'class-transformer';
import {
  IsAlphanumeric,
  IsBooleanString,
  IsNotEmpty,
  IsNumber,
  IsOptional,
  IsString
} from 'class-validator';
import { Pagination } from './message.dto';

export class CreateBeaconDto {
  @ApiProperty()
  @IsNotEmpty()
  @IsString()
    name: string;
  @ApiProperty()
  @IsNotEmpty()
  @IsString()
    majorId: string;
  @ApiProperty()
  @IsNotEmpty()
  @IsNumber()
    minorId: number;
  @ApiProperty()
  @IsNotEmpty()
  @IsNumber()
    storeId: number;
  @ApiProperty()
  @IsNotEmpty()
  @IsString()
    deviceId: string;
}

export class BeaconIdDto {
  @ApiProperty()
    id: number;
}

export class FetchBeaconListPaginationDto {
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
    filterStore: number;

  @ApiProperty({ required: false })
  @IsNotEmpty()
  @IsBooleanString()
  @IsOptional()
    sortName: string;
}

export class FetchBeaconListDto {
  @ApiProperty({ required: false })
    name: string;

  @ApiProperty({ required: false })
    beaconId: number;

  @ApiProperty({ required: false })
    majorId: string;

  @ApiProperty({ required: false })
    deviceId: string;

  @ApiProperty({ required: false })
    minorId: number;

  @ApiProperty({ required: false })
    storeId: number;

  @ApiProperty({ required: false })
    storeName: string;

  @ApiProperty({ required: false })
    sectionId: number;

  @ApiProperty({ required: false })
    status: boolean;
}

export class FetchBeaconListResponseDto {
  @ApiProperty({ required: false })
    message: string;

  @ApiProperty({ required: false })
    data: FetchBeaconListDto;

  @ApiProperty({ required: false })
    pagination: Pagination;
}

export class BeaconUpdateDto {
  @ApiProperty({ required: false })
  @IsOptional()
  @IsNotEmpty()
  @IsString()
    name: string;

  @ApiProperty({ required: false })
  @IsOptional()
  @IsNotEmpty()
  @IsString()
    majorId: string;

  @ApiProperty({ required: false })
  @IsOptional()
  @IsNotEmpty()
  @IsNumber()
    minorId: number;

  @ApiProperty({ required: false })
  @IsOptional()
  @IsNotEmpty()
  @IsNumber()
    storeId: number;

  @ApiProperty({ required: false })
  @IsOptional()
  @IsNotEmpty()
  @IsString()
    deviceId: string;
}

export class StoreAndSectionOfBeaconDto {
  @ApiProperty()
    storeId: number;

  @ApiProperty()
    storeName: number;

  @ApiProperty()
    sectionId: number;

  @ApiProperty()
    sectionName: number;
}

export class StoreAndSectionOfBeaconResponseDto {
  @ApiProperty()
    message: string;

  @ApiProperty({ required: false, type: StoreAndSectionOfBeaconDto })
    data: StoreAndSectionOfBeaconDto;
}

export class BeaconDropDownDto {
  @ApiProperty()
    beaconId: number;
  @ApiProperty()
    beaconName: string;
}

export class BeaconDropDownResponseDto {
  @ApiProperty()
    message: string;
  @ApiProperty()
    data: BeaconDropDownDto[];
}

export class UserVisitUpdateDTO {
  @ApiProperty({ required: false })
  @IsAlphanumeric()
  @IsOptional()
    majorId: string;
  @ApiProperty()
  @IsNotEmpty()
  @IsNumber()
    userId: number;
}
