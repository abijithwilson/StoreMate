import { AdminTypeDto, RefreshResponseDto } from './../dto/auth.dto';
import {
  Controller,
  Post,
  Request,
  HttpCode,
  UsePipes,
  Body,
  UseGuards
} from '@nestjs/common';
import {
  ApiBadRequestResponse,
  ApiBearerAuth,
  ApiBody,
  ApiHeader,
  ApiInternalServerErrorResponse,
  ApiNotFoundResponse,
  ApiOkResponse,
  ApiOperation,
  ApiTags,
  ApiUnauthorizedResponse
} from '@nestjs/swagger';
import { Observable } from 'rxjs';

import { Password } from 'src/decorator/password.decorator';
import { ResetBody } from 'src/decorator/reset-body.decorator';
import JwtRefreshGuard from 'src/guards/jwt-refresh.guard';
import JwtUserRefreshGuard from 'src/guards/jwt-user-refresh.guard';
import { PasswordResetGuard } from 'src/guards/password-reset.quard';
import { CustomValidationPipe } from 'src/pipes/validation-pipe';
import * as K from '../../shared/constants';

import {
  AdminForgotPasswordDTO,
  AdminResetPasswordDTO,
  LoginDto,
  LoginResponseDto,
  LoginUserBodyDto,
  MessageDto,
  UserForgotPasswordDTO
} from '../dto/auth.dto';
import { AuthService } from './auth.service';
import { Public } from 'src/guards/public.guard';

@ApiTags('Auth')
@Controller('auth')
export class AuthController {
  constructor(private authService: AuthService) {}

  @Post('/user/login')
  @UsePipes(new CustomValidationPipe({ transform: true }))
  @HttpCode(200)
  @HttpCode(200)
  @ApiBearerAuth()
  @ApiBody({ type: LoginUserBodyDto })
  @ApiOperation({ description: 'User login' })
  @ApiOkResponse({
    description: K.ERROR_CODES.Login.message,
    type: LoginResponseDto
  })
  @ApiUnauthorizedResponse({ description: K.ERROR_CODES.UNAUTHORIZED.message })
  @ApiInternalServerErrorResponse({
    description: K.ERROR_CODES.DEFAULT.message
  })
  @Public()
  login(@Body() body: LoginUserBodyDto): Promise<LoginResponseDto> {
    return this.authService.validateUser(body);
  }

  @Post('/admin/login')
  @UsePipes(new CustomValidationPipe({ transform: true }))
  @HttpCode(200)
  @ApiBody({ type: LoginDto })
  @ApiOperation({ description: 'Login for admin' })
  @ApiHeader({
    name: 'authorizations',
    description: 'Contain Password for login'
  })
  @ApiOkResponse({
    description: K.ERROR_CODES.Login.message,
    type: LoginResponseDto
  })
  @ApiBadRequestResponse({ description: 'Invalid email/password' })
  @ApiUnauthorizedResponse({ description: K.ERROR_CODES.UNAUTHORISED.message })
  @ApiNotFoundResponse({ description: 'Email not found' })
  @ApiInternalServerErrorResponse({
    description: K.ERROR_CODES.DEFAULT.message
  })
  @Public()
  adminLogin(
    @Password() password,
    @Body() body: LoginDto
  ): Promise<LoginResponseDto> {
    return this.authService.adminLogin(password, body);
  }

  @Post('/admin/refresh')
  @UseGuards(JwtRefreshGuard)
  @ApiBearerAuth()
  @ApiOperation({ description: 'To generate bearer token' })
  @ApiOkResponse({
    description: 'Generated bearer token',
    type: RefreshResponseDto
  })
  @ApiInternalServerErrorResponse({
    description: K.ERROR_CODES.DEFAULT.message
  })
  @Public()
  refreshToken(@Request() req) {
    return this.authService.refreshToken(req.user);
  }

  @Post('/admin/forgotpassword')
  @HttpCode(200)
  @UsePipes(new CustomValidationPipe({ transform: true }))
  @ApiBody({ type: AdminForgotPasswordDTO })
  @ApiOperation({ description: 'To send forgot link to Admin' })
  @ApiOkResponse({ description: 'Email send successfully', type: MessageDto })
  @ApiBadRequestResponse({ description: 'Invalid email' })
  @ApiNotFoundResponse({ description: K.ERROR_CODES.Email.message })
  @ApiInternalServerErrorResponse({
    description: K.ERROR_CODES.DEFAULT.message
  })
  @Public()
  adminForgotPassword(
    @Body() body: AdminForgotPasswordDTO
  ): Promise<MessageDto> {
    return this.authService.adminForgotPassword(body);
  }

  @Post('/admin/resetpassword')
  @UseGuards(PasswordResetGuard)
  @HttpCode(200)
  @UsePipes(new CustomValidationPipe())
  @ApiBody({ type: AdminResetPasswordDTO })
  @ApiOperation({ description: 'To update new password' })
  @ApiOkResponse({
    description: 'Password inserted successfully',
    type: MessageDto
  })
  @ApiHeader({
    name: 'authorizations',
    description: 'Contain password and confirm password for login'
  })
  @ApiBadRequestResponse({ description: 'Password mismatch' })
  @ApiBearerAuth()
  @ApiInternalServerErrorResponse({
    description: K.ERROR_CODES.DEFAULT.message
  })
  @Public()
  adminResetPassword(
    @Body() adminTypeBody: AdminTypeDto,
    @Password() password: AdminResetPasswordDTO,
    @ResetBody() resetBody: any
  ): Observable<MessageDto | Record<null, null>> {
    return this.authService.adminResetPassword(
      adminTypeBody,
      password,
      resetBody
    );
  }

  @Post('/user/forgotpassword')
  @HttpCode(200)
  @UsePipes(new CustomValidationPipe({ transform: true }))
  @HttpCode(200)
  @ApiBody({ type: UserForgotPasswordDTO })
  @ApiOperation({ description: 'To send forgot link to User' })
  @ApiOkResponse({ description: 'Email send successfully', type: MessageDto })
  @ApiBadRequestResponse({ description: 'Invalid email' })
  @ApiNotFoundResponse({ description: K.ERROR_CODES.Email.message })
  @ApiInternalServerErrorResponse({
    description: K.ERROR_CODES.DEFAULT.message
  })
  @Public()
  userForgotPassword(@Body() body: UserForgotPasswordDTO): Promise<MessageDto> {
    return this.authService.userForgotPassword(body);
  }

  @Post('/user/resetpassword')
  @UseGuards(PasswordResetGuard)
  @HttpCode(200)
  @UsePipes(new CustomValidationPipe({ transform: true }))
  @ApiBody({ type: AdminResetPasswordDTO })
  @ApiOperation({ description: 'To Update new password' })
  @ApiOkResponse({
    description: 'Password inserted successfully',
    type: MessageDto
  })
  @ApiHeader({
    name: 'authorizations',
    description: 'Contain Password and confirm password for login'
  })
  @ApiBadRequestResponse({ description: 'Password Mismatch' })
  @ApiBearerAuth()
  @ApiInternalServerErrorResponse({
    description: K.ERROR_CODES.DEFAULT.message
  })
  @Public()
  userResetPassword(
    @Password() password: any,
    @ResetBody() body: any
  ): Observable<MessageDto | Record<null, null>> {
    return this.authService.userResetPassword(password, body);
  }

  @Post('/user/refresh')
  @UseGuards(JwtUserRefreshGuard)
  @HttpCode(200)
  @ApiBearerAuth()
  @ApiOperation({ description: 'To generate bearer token' })
  @ApiOkResponse({
    description: 'Generated bearer token',
    type: RefreshResponseDto
  })
  @ApiInternalServerErrorResponse({
    description: K.ERROR_CODES.DEFAULT.message
  })
  @Public()
  userRefreshToken(@Request() req) {
    return this.authService.refreshToken(req.user);
  }
}
