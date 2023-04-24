import { ApiProperty } from '@nestjs/swagger';
import { Transform } from 'class-transformer';
import {
  IsEmail,
  IsISO8601,
  IsNotEmpty,
  IsNumber,
  IsOptional,
  IsPostalCode,
  IsString
} from 'class-validator';
import { Match } from 'src/decorator/match.decorator';

export class SignUpDto {
  @ApiProperty()
  @IsString()
  @IsNotEmpty()
    firstName: string;
  @ApiProperty()
  @IsString()
    lastName: string;
  @ApiProperty()
  @IsNotEmpty()
  @IsEmail()
  @Transform((email) => email.value.toLowerCase())
    email: string;
  @ApiProperty()
  @IsISO8601()
    dob: Date;
  @ApiProperty()
  @IsString()
  @IsNotEmpty()
    password: string;
  @ApiProperty()
  @IsString()
  @IsNotEmpty()
  @Match('password')
    confirmPassword: string;
}

export class DeleteUserStatus {
  @ApiProperty()
    status: string;
}

export class UserUpdateDto {
  @ApiProperty({ required: false })
  @IsString()
  @IsOptional()
    firstName: string;
  @ApiProperty({ required: false })
  @IsString()
  @IsOptional()
    lastName: string;
  @ApiProperty({ required: false })
  @IsString()
  @IsOptional()
    phone: string;
  @ApiProperty({ required: false })
  @IsString()
  @IsOptional()
    image: string;
  @ApiProperty({ required: false })
  @IsISO8601()
  @IsOptional()
    dob: string;
}

export class UserProfileViewDto {
  @ApiProperty()
    id: number;
  @ApiProperty()
    firstName: string;
  @ApiProperty()
    lastName: string;
  @ApiProperty()
    email: string;
  @ApiProperty()
    dob: Date;
  @ApiProperty()
    phone: string;
  @ApiProperty()
    rewardPointsEarned: number;
  @ApiProperty()
    image: string;
}

export class UserPasswordUpdateDto {
  @ApiProperty({ required: true })
  @IsString()
    oldPassword: string;

  @ApiProperty({ required: true })
  @IsString()
    newPassword: string;
}

export class UserAddressUpdateDto {
  @ApiProperty({ required: true })
  @IsString()
  @IsOptional()
    address: string;
  @ApiProperty({ required: true })
  @IsNumber()
  @IsOptional()
    countryId: number;
  @ApiProperty({ required: true })
  @IsNumber()
  @IsOptional()
    stateId: number;
  @ApiProperty({ required: true })
  @IsNumber()
  @IsOptional()
    districtId: number;
  @ApiProperty({ required: true })
  @IsString()
  @IsOptional()
    locality: string;
  @ApiProperty({ required: true })
  @IsPostalCode('IN')
  @IsOptional()
    pincode: string;
}

export class UserAddressCreateDto {
  @ApiProperty({ required: true })
  @IsString()
    address: string;
  @ApiProperty({ required: true })
  @IsNumber()
    countryId: number;
  @ApiProperty({ required: true })
  @IsNumber()
    stateId: number;
  @ApiProperty({ required: true })
  @IsNumber()
    districtId: number;
  @ApiProperty({ required: true })
  @IsString()
    locality: string;
  @ApiProperty({ required: true })
  @IsPostalCode('IN')
    pincode: string;
}

export class UserAddressIdDto {
  id: number;
}

export class AddressDetailDto {
  @ApiProperty()
    id: number;
  @ApiProperty()
    address: string;
  @ApiProperty()
    countryId: number;
  @ApiProperty()
    countryName: string;
  @ApiProperty()
    stateId: number;
  @ApiProperty()
    stateName: string;
  @ApiProperty()
    districtId: number;
  @ApiProperty()
    districtName: string;
  @ApiProperty()
    locality: string;
  @ApiProperty()
    pincode: number;
  @ApiProperty()
    userId: number;
}

export class AddressMessageDto {
  @ApiProperty()
    message: string;
  @ApiProperty()
    data: AddressDetailDto;
}

export class UserRewardUpdateDto {
  @ApiProperty()
  @IsString()
  @IsNotEmpty()
    majorId: string;
}

export class UserIdDto {
  @ApiProperty()
  @IsNumber()
  @IsNotEmpty()
    id: number;
}

export class BeaconIdDto{
  @ApiProperty()
  @IsString()
  @IsNotEmpty()
    deviceId: string;
}