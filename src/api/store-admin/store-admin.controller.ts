import {
  BeaconFetchMessageDto,
  BeaconPaginationQueryParam,
  AssignBeaconDto,
  BeaconMessageDto,
  FetchAllAssignedStoresPaginationDto,
  FetchAssignedStoresResponseDto,
  FetchVisitorsCountResponseDto,
  FetchSectionWiseProductsPaginationDto,
  FetchSectionWiseProductsResponseDto
} from './../dto/store-admin.dto';
import { AdminJwtBody } from './../dto/adminJwtBody.dto';
import {
  Body,
  Controller,
  Get,
  HttpCode,
  Param,
  ParseIntPipe,
  Patch,
  Query,
  UsePipes
} from '@nestjs/common';
import {
  ApiBadRequestResponse,
  ApiBearerAuth,
  ApiBody,
  ApiInternalServerErrorResponse,
  ApiNotFoundResponse,
  ApiOkResponse,
  ApiOperation,
  ApiTags,
  ApiUnauthorizedResponse
} from '@nestjs/swagger';
import { Observable } from 'rxjs';
import { JwtBody } from 'src/decorator/jwt.decorator';
import {
  StoreAdminProfileFetchResponseDto,
  StoreAdminUpdateDto
} from '../dto/store-admin.dto';
import { StoreAdminService } from './store-admin.service';
import { MessageDto } from '../dto/message.dto';
import { CustomValidationPipe } from 'src/pipes/validation-pipe';
import * as K from '../../shared/constants';
import { BeaconDropDownResponseDto } from '../dto/beacon.dto';
import { Roles } from 'src/decorator/roles.decorator';
import { UserRoles } from '../dto/roles.dto';

@ApiTags('Store-admin')
@Controller('store-admin')
export class StoreAdminController {
  constructor(private storeAdminService: StoreAdminService) {}

  @Roles(UserRoles.STORE_ADMIN)
  @Patch('profile/:id')
  @UsePipes(new CustomValidationPipe({ transform: true }))
  @HttpCode(200)
  @ApiBody({ type: StoreAdminUpdateDto })
  @ApiBearerAuth()
  @ApiOperation({ description: 'Profile update by store admin' })
  @ApiOkResponse({
    description: K.ERROR_CODES.UPDATED.message,
    type: MessageDto
  })
  @ApiUnauthorizedResponse({ description: K.ERROR_CODES.UNAUTHORIZED.message })
  @ApiNotFoundResponse({ description: 'Id not found' })
  @ApiInternalServerErrorResponse({
    description: K.ERROR_CODES.DEFAULT.message
  })
  @ApiBadRequestResponse({ description: 'Invalid Id' })
  storeAdminProfileUpdate(
    @Param('id', ParseIntPipe) id: number,
    @Body() body: StoreAdminUpdateDto,
    @JwtBody() jwtBody: AdminJwtBody
  ): Observable<MessageDto | Record<null, null>> {
    return this.storeAdminService.storeAdminProfileUpdate(id, body, jwtBody);
  }

  @Roles(UserRoles.STORE_ADMIN)
  @Get(':id/profile')
  @ApiBearerAuth()
  @ApiOperation({ description: 'View profile for store admin' })
  @ApiOkResponse({
    description: 'Successfully fetched store admin profile',
    type: StoreAdminProfileFetchResponseDto
  })
  @ApiUnauthorizedResponse({ description: K.ERROR_CODES.UNAUTHORIZED.message })
  @ApiNotFoundResponse({ description: 'Id not found' })
  @ApiInternalServerErrorResponse({
    description: K.ERROR_CODES.DEFAULT.message
  })
  @ApiBadRequestResponse({ description: 'Invalid Id' })
  fetchStoreAdminProfile(
    @Param('id', new ParseIntPipe()) id: number,
    @JwtBody() jwtBody: AdminJwtBody
  ): Observable<StoreAdminProfileFetchResponseDto | Record<null, null>> {
    return this.storeAdminService.fetchStoreAdminProfile(id, jwtBody);
  }

  @Roles(UserRoles.STORE_ADMIN)
  @Get(':id/stores')
  @ApiBearerAuth()
  @ApiOperation({ description: 'View stores assigned to store admin' })
  @ApiOkResponse({
    description: 'Successfully fetched stores assigned to store admin',
    type: FetchAssignedStoresResponseDto
  })
  @ApiUnauthorizedResponse({ description: K.ERROR_CODES.UNAUTHORIZED.message })
  @ApiNotFoundResponse({ description: 'Id not found' })
  @ApiInternalServerErrorResponse({
    description: K.ERROR_CODES.DEFAULT.message
  })
  @ApiBadRequestResponse({ description: 'Invalid Id' })
  fetchAssignedStores(
    @Query() param: FetchAllAssignedStoresPaginationDto,
    @Param('id', new ParseIntPipe()) id: number,
    @JwtBody() jwtBody: AdminJwtBody
  ): Observable<FetchAssignedStoresResponseDto | Record<null, null>> {
    return this.storeAdminService.fetchAssignedStores(param, id, jwtBody);
  }

  @Roles(UserRoles.STORE_ADMIN, UserRoles.SUPER_ADMIN)
  @Get(':storeAdminId/store/:storeId/beacon')
  @ApiBearerAuth()
  @ApiOperation({ description: 'View beacon under store' })
  @ApiOkResponse({
    description: 'Successfully fetched beacon under store',
    type: BeaconFetchMessageDto
  })
  @ApiUnauthorizedResponse({ description: K.ERROR_CODES.UNAUTHORIZED.message })
  @ApiInternalServerErrorResponse({
    description: K.ERROR_CODES.DEFAULT.message
  })
  @ApiBadRequestResponse({ description: 'Invalid Id' })
  fetchBeaconUnderStore(
    @Param('storeAdminId', new ParseIntPipe()) storeAdminId: number,
    @Param('storeId', new ParseIntPipe()) storeId: number,
    @JwtBody() jwtBody: AdminJwtBody,
    @Query() param: BeaconPaginationQueryParam
  ): Promise<BeaconFetchMessageDto> {
    return this.storeAdminService.fetchBeaconUnderStore(
      storeAdminId,
      storeId,
      param,
      jwtBody
    );
  }

  @Roles(UserRoles.STORE_ADMIN)
  @Get(':id/store/:storeId/unassigned-beacons')
  @ApiBearerAuth()
  @ApiOperation({ description: 'Fetch unassigned beacons for drop-down' })
  @ApiOkResponse({
    description: 'Successfully fetched unassigned beacons details',
    type: FetchAssignedStoresResponseDto
  })
  @ApiUnauthorizedResponse({ description: K.ERROR_CODES.UNAUTHORIZED.message })
  @ApiNotFoundResponse({ description: 'Id not found' })
  @ApiInternalServerErrorResponse({
    description: K.ERROR_CODES.DEFAULT.message
  })
  @ApiBadRequestResponse({ description: 'Invalid Id' })
  fetchUnassignedBeacons(
    @Param('id', new ParseIntPipe()) id: number,
    @Param('storeId', new ParseIntPipe()) storeId: number,
    @JwtBody() jwtBody: AdminJwtBody
  ): Promise<BeaconDropDownResponseDto> {
    return this.storeAdminService.fetchUnassignedBeacons(id, storeId, jwtBody);
  }

  @Patch(':storeAdminId/store/:storeId/section/:sectionId/beacon/assign')
  @Roles(UserRoles.STORE_ADMIN)
  @UsePipes(new CustomValidationPipe({ transform: true }))
  @ApiBearerAuth()
  @ApiOperation({ description: 'Assign beacon from a section' })
  @ApiBody({ type: AssignBeaconDto })
  @ApiOkResponse({
    description: K.ERROR_CODES.UPDATED.message,
    type: BeaconMessageDto
  })
  @ApiUnauthorizedResponse({
    description: K.ERROR_CODES.UNAUTHORIZED.message
  })
  @ApiInternalServerErrorResponse({
    description: K.ERROR_CODES.DEFAULT.message
  })
  @ApiBadRequestResponse({ description: 'Invalid id' })
  assignBeacon(
    @Param('storeAdminId', ParseIntPipe) storeAdminId: number,
    @Param('storeId', ParseIntPipe) storeId: number,
    @Param('sectionId', ParseIntPipe) sectionId: number,
    @Body() body: AssignBeaconDto,
    @JwtBody() jwtBody
  ): Promise<BeaconMessageDto> {
    return this.storeAdminService.assignBeacon(
      storeAdminId,
      storeId,
      sectionId,
      body,
      jwtBody
    );
  }

  @Patch(':storeAdminId/store/:storeId/beacon/:beaconId/unassign')
  @Roles(UserRoles.STORE_ADMIN)
  @UsePipes(new CustomValidationPipe({ transform: true }))
  @ApiBearerAuth()
  @ApiOperation({ description: 'Unassign beacon from a section' })
  @ApiOkResponse({
    description: K.ERROR_CODES.UPDATED.message,
    type: BeaconMessageDto
  })
  @ApiUnauthorizedResponse({
    description: K.ERROR_CODES.UNAUTHORIZED.message
  })
  @ApiInternalServerErrorResponse({
    description: K.ERROR_CODES.DEFAULT.message
  })
  unAssignBeacon(
    @Param('storeAdminId', ParseIntPipe) storeAdminId: number,
    @Param('storeId', ParseIntPipe) storeId: number,
    @Param('beaconId', ParseIntPipe) beaconId: number,
    @JwtBody() jwtBody
  ): Promise<BeaconMessageDto> {
    return this.storeAdminService.unAssignBeacon(
      storeAdminId,
      storeId,
      beaconId,
      jwtBody
    );
  }

  @Get(':storeAdminId/store/:storeId/section/:sectionId/product')
  @Roles(UserRoles.STORE_ADMIN, UserRoles.SUPER_ADMIN)
  @ApiBearerAuth()
  @ApiOperation({ description: 'Get section wise products in a store' })
  @UsePipes(new CustomValidationPipe())
  @ApiOkResponse({
    description: 'Successfully collected section wise products',
    type: FetchSectionWiseProductsResponseDto
  })
  @ApiUnauthorizedResponse({ description: K.ERROR_CODES.UNAUTHORIZED.message })
  @ApiInternalServerErrorResponse({
    description: K.ERROR_CODES.DEFAULT.message
  })
  @ApiBadRequestResponse({ description: K.ERROR_CODES.BADREQUEST.message })
  fetchSectionWiseProducts(
    @Param('storeAdminId', ParseIntPipe) storeAdminId: number,
    @Param('storeId', ParseIntPipe) storeId: number,
    @Param('sectionId', ParseIntPipe) sectionId: number,
    @JwtBody() jwtBody: any,
    @Query() param: FetchSectionWiseProductsPaginationDto
  ): Promise<FetchSectionWiseProductsResponseDto> {
    return this.storeAdminService.fetchSectionWiseProducts(
      storeAdminId,
      storeId,
      sectionId,
      jwtBody,
      param
    );
  }

  @Roles(UserRoles.STORE_ADMIN, UserRoles.SUPER_ADMIN)
  @Get('store/:storeId/section/:sectionId/dashboard')
  @ApiBearerAuth()
  @ApiOperation({
    description: 'View total and active number of visitors to a store'
  })
  @ApiOkResponse({
    description:
      'Successfully fetched total and active number of visitors to a store',
    type: FetchVisitorsCountResponseDto
  })
  @ApiUnauthorizedResponse({ description: K.ERROR_CODES.UNAUTHORIZED.message })
  @ApiNotFoundResponse({ description: 'Id not found' })
  @ApiInternalServerErrorResponse({
    description: K.ERROR_CODES.DEFAULT.message
  })
  @ApiBadRequestResponse({ description: 'Invalid Id' })
  fetchVisitorsCount(
    @Param('storeId', new ParseIntPipe()) storeId: number,
    @Param('sectionId', new ParseIntPipe()) sectionId: number,
    @JwtBody() jwtBody: AdminJwtBody
  ): Promise<FetchVisitorsCountResponseDto | Record<null, null>> {
    return this.storeAdminService.fetchVisitorsCount(
      storeId,
      sectionId,
      jwtBody
    );
  }
}
