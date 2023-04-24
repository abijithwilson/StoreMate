import { UsersService } from './users.service';
import {
  Body,
  Controller,
  Delete,
  Get,
  HttpCode,
  Param,
  ParseIntPipe,
  Patch,
  Post,
  UsePipes
} from '@nestjs/common';
import { MessageDto } from 'src/api/dto/message.dto';
import {
  AddressMessageDto,
  BeaconIdDto,
  SignUpDto,
  UserAddressCreateDto,
  UserAddressUpdateDto,
  UserPasswordUpdateDto,
  UserProfileViewDto,
  UserRewardUpdateDto,
  UserUpdateDto
} from '../dto/users.dto';
import { Observable } from 'rxjs';
import { CustomValidationPipe } from 'src/pipes/validation-pipe';
import { JwtBody } from 'src/decorator/jwt.decorator';
import {
  ApiBearerAuth,
  ApiBody,
  ApiInternalServerErrorResponse,
  ApiNotFoundResponse,
  ApiOkResponse,
  ApiOperation,
  ApiTags,
  ApiUnauthorizedResponse
} from '@nestjs/swagger';
import * as K from '../../shared/constants';
import { UserRoles } from '../dto/roles.dto';
import { Roles } from 'src/decorator/roles.decorator';
import { Public } from 'src/guards/public.guard';
@ApiTags('User')
@Controller('user')
export class UsersController {
  constructor(private readonly usersService: UsersService) {}

  @Post('register')
  @UsePipes(new CustomValidationPipe({ transform: true }))
  @HttpCode(200)
  @ApiBearerAuth()
  @ApiOperation({ description: 'Register profile of a new user' })
  @ApiOkResponse({
    description: 'User details registered successfully',
    type: MessageDto
  })
  @ApiUnauthorizedResponse({ description: K.ERROR_CODES.UNAUTHORIZED.message })
  @ApiNotFoundResponse({ description: 'Id not found' })
  @ApiInternalServerErrorResponse({
    description: K.ERROR_CODES.DEFAULT.message
  })
  @Public()
  signUp(
    @Body() signUpDto: SignUpDto
  ): Observable<MessageDto | Record<null, null>> {
    return this.usersService.signUp(signUpDto);
  }

  @Get('profile')
  @Roles(UserRoles.USER)
  @HttpCode(200)
  @ApiBearerAuth()
  @ApiOperation({ description: 'View profile of the user' })
  @ApiOkResponse({
    description: 'User details collected successfully',
    type: UserProfileViewDto
  })
  @ApiUnauthorizedResponse({ description: K.ERROR_CODES.UNAUTHORIZED.message })
  @ApiNotFoundResponse({ description: 'Id not found' })
  @ApiInternalServerErrorResponse({
    description: K.ERROR_CODES.DEFAULT.message
  })
  userProfileView(
    @JwtBody() jwtBody
  ): Observable<MessageDto | Record<null, null>> {
    return this.usersService.userProfileView(jwtBody);
  }

  @Delete('profile')
  @Roles(UserRoles.USER)
  @HttpCode(200)
  @ApiBearerAuth()
  @ApiOperation({ description: 'Delete profile for user' })
  @ApiOkResponse({
    description: K.ERROR_CODES.DELETE.message,
    type: MessageDto
  })
  @ApiUnauthorizedResponse({ description: K.ERROR_CODES.UNAUTHORIZED.message })
  @ApiNotFoundResponse({ description: 'Id not found' })
  @ApiInternalServerErrorResponse({
    description: K.ERROR_CODES.DEFAULT.message
  })
  userDelete(@JwtBody() jwtBody): Observable<MessageDto | Record<null, null>> {
    return this.usersService.userDelete(jwtBody);
  }

  @Patch('profile')
  @Roles(UserRoles.USER)
  @UsePipes(new CustomValidationPipe({ transform: true }))
  @HttpCode(200)
  @ApiBearerAuth()
  @ApiBody({ type: UserUpdateDto })
  @ApiOperation({ description: 'Update profile for user' })
  @ApiOkResponse({
    description: K.ERROR_CODES.DELETE.message,
    type: MessageDto
  })
  @ApiUnauthorizedResponse({ description: K.ERROR_CODES.UNAUTHORIZED.message })
  @ApiInternalServerErrorResponse({
    description: K.ERROR_CODES.DEFAULT.message
  })
  userUpdate(
    @JwtBody() jwtBody,
    @Body() body: UserUpdateDto
  ): Observable<MessageDto | Record<null, null>> {
    return this.usersService.userUpdate(jwtBody, body);
  }

  @Patch(':id/update-password')
  @Roles(UserRoles.USER)
  @UsePipes(new CustomValidationPipe({ transform: true }))
  @HttpCode(200)
  @ApiBearerAuth()
  @ApiBody({ type: UserPasswordUpdateDto })
  @ApiOperation({ description: 'Update password for user' })
  @ApiOkResponse({
    description: K.ERROR_CODES.UPDATED.message,
    type: MessageDto
  })
  @ApiUnauthorizedResponse({ description: K.ERROR_CODES.UNAUTHORIZED.message })
  @ApiInternalServerErrorResponse({
    description: K.ERROR_CODES.DEFAULT.message
  })
  userPasswordUpdate(
    @Param('id', ParseIntPipe) id: number,
    @JwtBody() jwtBody,
    @Body() body: UserPasswordUpdateDto
  ): Promise<MessageDto | Record<null, null>> {
    return this.usersService.userPasswordUpdate(id, jwtBody, body);
  }

  @Post('address')
  @Roles(UserRoles.USER)
  @UsePipes(new CustomValidationPipe({ transform: true }))
  @HttpCode(200)
  @ApiBearerAuth()
  @ApiBody({ type: UserAddressCreateDto })
  @ApiOperation({ description: 'Create address for user' })
  @ApiOkResponse({
    description: K.ERROR_CODES.Created.message,
    type: MessageDto
  })
  @ApiUnauthorizedResponse({ description: K.ERROR_CODES.UNAUTHORIZED.message })
  @ApiInternalServerErrorResponse({
    description: K.ERROR_CODES.DEFAULT.message
  })
  userAddressCreate(
    @JwtBody() jwtBody,
    @Body() body: UserAddressCreateDto
  ): Observable<MessageDto | Record<null, null>> {
    return this.usersService.userAddressCreate(jwtBody, body);
  }

  @Patch(':id/address')
  @Roles(UserRoles.USER)
  @UsePipes(new CustomValidationPipe({ transform: true }))
  @HttpCode(200)
  @ApiBearerAuth()
  @ApiBody({ type: UserAddressUpdateDto })
  @ApiOperation({ description: 'Update address for user' })
  @ApiOkResponse({
    description: K.ERROR_CODES.UPDATED.message,
    type: MessageDto
  })
  @ApiUnauthorizedResponse({ description: K.ERROR_CODES.UNAUTHORIZED.message })
  @ApiInternalServerErrorResponse({
    description: K.ERROR_CODES.DEFAULT.message
  })
  userAddressUpdate(
    @Param('id', ParseIntPipe) id: number,
    @JwtBody() jwtBody,
    @Body() body: UserAddressUpdateDto
  ): Observable<MessageDto | Record<null, null>> {
    return this.usersService.userAddressUpdate(jwtBody, body, id);
  }

  @Get(':id/address')
  @Roles(UserRoles.USER)
  @UsePipes(new CustomValidationPipe({ transform: true }))
  @HttpCode(200)
  @ApiBearerAuth()
  @ApiOperation({ description: 'Fetch address for user' })
  @ApiOkResponse({
    description: K.ERROR_CODES.OK.message,
    type: AddressMessageDto
  })
  @ApiUnauthorizedResponse({ description: K.ERROR_CODES.UNAUTHORIZED.message })
  @ApiInternalServerErrorResponse({
    description: K.ERROR_CODES.DEFAULT.message
  })
  userAddressFetch(
    @Param('id', ParseIntPipe) id: number,
    @JwtBody() jwtBody
  ): Observable<AddressMessageDto | Record<null, null>> {
    return this.usersService.userAddressFetch(id, jwtBody);
  }

  @Delete(':id/address')
  @Roles(UserRoles.USER)
  @UsePipes(new CustomValidationPipe({ transform: true }))
  @HttpCode(200)
  @ApiBearerAuth()
  @ApiOperation({ description: 'Delete address of user' })
  @ApiOkResponse({
    description: K.ERROR_CODES.DELETE.message,
    type: MessageDto
  })
  @ApiUnauthorizedResponse({ description: K.ERROR_CODES.UNAUTHORIZED.message })
  @ApiInternalServerErrorResponse({
    description: K.ERROR_CODES.DEFAULT.message
  })
  userAddressDelete(
    @Param('id', ParseIntPipe) id: number,
    @JwtBody() jwtBody
  ): Observable<MessageDto | Record<null, null>> {
    return this.usersService.userAddressDelete(id, jwtBody);
  }

  @Patch('reward')
  @Roles(UserRoles.USER)
  @UsePipes(new CustomValidationPipe({ transform: true }))
  @ApiBearerAuth()
  @ApiBody({ type: UserRewardUpdateDto })
  @ApiOperation({ description: 'Update reward for user' })
  @ApiOkResponse({
    description: K.ERROR_CODES.UPDATED.message,
    type: MessageDto
  })
  @ApiUnauthorizedResponse({ description: K.ERROR_CODES.UNAUTHORIZED.message })
  @ApiInternalServerErrorResponse({
    description: K.ERROR_CODES.DEFAULT.message
  })
  userRewardUpdate(
    @JwtBody() jwtBody,
    @Body() body: UserRewardUpdateDto
  ): Observable<MessageDto | Record<null, null>> {
    return this.usersService.userRewardUpdate(jwtBody, body);
  }

  @Patch('exit')
  @Roles(UserRoles.USER)
  @UsePipes(new CustomValidationPipe({ transform: true }))
  @ApiBearerAuth()
  @ApiBody({ type: BeaconIdDto })
  @ApiOperation({ description: 'Update user visit status' })
  @ApiOkResponse({
    description: K.ERROR_CODES.UPDATED.message,
    type: MessageDto
  })
  @ApiUnauthorizedResponse({ description: K.ERROR_CODES.UNAUTHORIZED.message })
  @ApiInternalServerErrorResponse({
    description: K.ERROR_CODES.DEFAULT.message
  })
  userExitUpdate(
    @JwtBody() jwtBody,
    @Body() body: BeaconIdDto
  ): Observable<MessageDto | Record<null, null>> {
    return this.usersService.userExitUpdate(jwtBody, body);
  }
}
