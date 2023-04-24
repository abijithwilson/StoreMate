import { ApiProperty } from '@nestjs/swagger';
import { IsNotEmpty, IsNumber, IsString } from 'class-validator';

export class LocationDto {
  @ApiProperty()
  @IsNumber()
  @IsNotEmpty()
    locationId: number;
  @ApiProperty()
  @IsString()
  @IsNotEmpty()
    locationName: string;
}

export class LocationIdDto {
  @ApiProperty()
  @IsNumber()
  @IsNotEmpty()
    locationId: number;
}
