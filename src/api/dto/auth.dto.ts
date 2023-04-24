import { ApiProperty } from '@nestjs/swagger';
import { Transform } from 'class-transformer';
import {
  IsEmail,
  IsNotEmpty,
  IsNumber,
  IsOptional,
  IsString
} from 'class-validator';
import { Match } from 'src/decorator/match.decorator';
export class LoginResponseDto {
  @ApiProperty({ example: 'bearer token' })
    bearer_token: string;
  @ApiProperty({ example: 'refresh token' })
  @IsOptional()
    refresh_token: string;
}

export class LoginDto {
  @ApiProperty({ example: 'owanshaji@gmail.com' })
  @IsString()
  @IsNotEmpty()
  @IsEmail()
  @Transform((email) => email.value.toLowerCase())
    email: string;
}

export class LoginUserBodyDto {
  @ApiProperty()
  @IsString()
  @IsNotEmpty()
  @IsEmail()
  @Transform((email) => email.value.toLowerCase())
    email: string;
  @ApiProperty()
  @IsString()
  @IsNotEmpty()
    password: string;
}

export class LoginAdminDto {
  @ApiProperty()
    adminId: string;
  @ApiProperty()
    email: string;
  @ApiProperty()
    password: string;
  @ApiProperty()
    salt: string;
  @ApiProperty()
    roles: string;
  @ApiProperty()
    roleName: string;
}

export class AdminForgotPasswordDTO {
  @ApiProperty({ required: true, example: 'owanshaji@gmail.com' })
  @IsString()
  @IsNotEmpty()
  @IsEmail()
  @Transform((email) => email.value.toLowerCase())
    email: string;
}

export class UserForgotPasswordDTO {
  @ApiProperty()
  @IsString()
  @IsNotEmpty()
  @IsEmail()
  @Transform((email) => email.value.toLowerCase())
    email: string;
}

export class PasswordDto {
  @ApiProperty({ example: 'haai' })
  @IsString()
  @IsNotEmpty()
    password: string;
  @ApiProperty()
  @IsString()
  @IsNotEmpty()
  @Match('password')
    confirmPassword: string;
}

export class AdminResetPasswordDTO {
  @ApiProperty({ required: true })
  @IsString()
  @IsNotEmpty()
    password: string;
  @ApiProperty({ required: true })
  @IsString()
  @IsNotEmpty()
    confirmPassword: string;
}

export class AdminDetailDto {
  @ApiProperty()
    firstName: string;
  @ApiProperty()
    adminId: string;
  @ApiProperty()
    email: string;
  @ApiProperty()
    pass: string;
  @ApiProperty()
    salt: string;
  @ApiProperty()
    roles: string;
  @ApiProperty()
    roleName: string;
}

export class UserDetailDto {
  @ApiProperty()
    firstName: string;
  @ApiProperty()
    userId: string;
}

export class LoginUserDto {
  @ApiProperty()
    id: string;
  @ApiProperty()
    email: string;
  @ApiProperty()
    password: string;
  @ApiProperty()
    salt: string;
}

export class MessageDto {
  @ApiProperty()
    message: string;
}
export class IdDto {
  @ApiProperty()
    id: string;
}
export class AdminTypeDto {
  @ApiProperty({ required: false })
  @IsNumber()
  @IsOptional()
    adminType: number;
}

export class RefreshResponseDto {
  @ApiProperty({ example: 'bearer token' })
    bearer_token: string;
}
