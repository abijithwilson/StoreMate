import { ApiProperty } from '@nestjs/swagger';
import { Type } from 'class-transformer';
import {
  IsBooleanString,
  IsNotEmpty,
  IsNumber,
  IsOptional
} from 'class-validator';
import { Pagination } from './message.dto';

export class OfferListParamDto {
  @ApiProperty({ required: false })
  @IsOptional()
  @IsBooleanString()
    sortField: string;

  @ApiProperty({ required: false })
  @IsOptional()
  @IsBooleanString()
    sortOrder: string;

  @ApiProperty({ required: false })
  @IsOptional()
  @IsNotEmpty()
    searchName: string;

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

export class OfferListDto {
  @ApiProperty()
    offerId: number;
  @ApiProperty()
    description: string;
  @ApiProperty()
    offerTitle: string;
  @ApiProperty()
    image: string;
  @ApiProperty()
    startDate: Date;
  @ApiProperty()
    endDate: Date;
}

export class OfferListResponseDto {
  @ApiProperty()
    message: string;
  @ApiProperty({ isArray: true, type: OfferListDto })
    data: OfferListDto[];
  @ApiProperty()
    pagination: Pagination;
}
