import {
  SingleOfferProductListResponseDto,
  SingleOfferProductListPaginationDto,
  SingleOfferProductAssignDto,
  AdminPasswordUpdateDto
} from './../dto/admin.dto';
import { StoreAdminInviteDto } from './../dto/store.dto';
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
import { CustomValidationPipe } from 'src/pipes/validation-pipe';
import * as K from '../../shared/constants';
import {
  AdminUpdateDto,
  DeleteStoreAdminDto,
  FetchAllStoreAdminPaginationDTO,
  StoreAdminUpdateDto,
  MessageAdminFetchDto,
  AdminFetchMessageDto,
  FetchAllStoreAdminMessageDto,
  UpdateOffer,
  OfferFetchMessageDto,
  CreateOffer
} from '../dto/admin.dto';
import { MessageDto } from '../dto/message.dto';
import { AdminService } from './admin.service';
import { OfferListParamDto, OfferListResponseDto } from '../dto/offer.dto';
import {
  CreateSectionDto,
  SectionMessageDto,
  UpdateSectionDto
} from '../dto/section.dto';
import { UserRoles } from '../dto/roles.dto';
import { Roles } from 'src/decorator/roles.decorator';

@ApiTags('Admin')
@Controller('admin')
export class AdminController {
  constructor(private adminService: AdminService) {}

  @Patch('profile/:id')
  @Roles(UserRoles.SUPER_ADMIN)
  @UsePipes(new CustomValidationPipe({ transform: true }))
  @HttpCode(200)
  @ApiBody({ type: AdminUpdateDto })
  @ApiBearerAuth()
  @ApiOperation({ description: 'Update profile for admin' })
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
  adminProfileUpdate(
    @Param('id', ParseIntPipe) id: number,
    @Body() body: AdminUpdateDto,
    @JwtBody() jwtBody
  ): Observable<MessageDto | Record<null, null>> {
    return this.adminService.adminProfileUpdate(id, body, jwtBody);
  }

  @Get('profile/:id')
  @Roles(UserRoles.SUPER_ADMIN)
  @ApiBearerAuth()
  @ApiOperation({ description: 'View profile for admin' })
  @ApiOkResponse({
    description: 'Successfully fetched',
    type: AdminFetchMessageDto
  })
  @ApiUnauthorizedResponse({ description: K.ERROR_CODES.UNAUTHORIZED.message })
  @ApiNotFoundResponse({ description: 'Id not found' })
  @ApiInternalServerErrorResponse({
    description: K.ERROR_CODES.DEFAULT.message
  })
  @ApiBadRequestResponse({ description: 'Invalid Id' })
  fetchAdminProfile(
    @Param('id', new ParseIntPipe()) id: number
  ): Observable<MessageDto | Record<null, null>> {
    return this.adminService.fetchAdminProfile(id);
  }

  @Get('store-admin')
  @Roles(UserRoles.SUPER_ADMIN)
  @ApiBearerAuth()
  @ApiOperation({ description: 'Get all store admin details' })
  @UsePipes(new CustomValidationPipe())
  @ApiOkResponse({
    description: 'Successfully collected',
    type: FetchAllStoreAdminMessageDto
  })
  @ApiUnauthorizedResponse({ description: K.ERROR_CODES.UNAUTHORIZED.message })
  @ApiInternalServerErrorResponse({
    description: K.ERROR_CODES.DEFAULT.message
  })
  @ApiBadRequestResponse({ description: K.ERROR_CODES.BADREQUEST.message })
  getAllStoreAdminDetails(
    @Query() param: FetchAllStoreAdminPaginationDTO
  ): Observable<MessageDto | Record<null, null>> {
    return this.adminService.getAllStoreAdminDetails(param);
  }

  @Post('store-admin')
  @Roles(UserRoles.SUPER_ADMIN)
  @ApiOperation({ description: 'Invite store admin' })
  @ApiOkResponse({ description: 'Successfully invited', type: MessageDto })
  @ApiUnauthorizedResponse({ description: K.ERROR_CODES.UNAUTHORIZED.message })
  @ApiInternalServerErrorResponse({
    description: K.ERROR_CODES.DEFAULT.message
  })
  @ApiBadRequestResponse({ description: 'Invalid Id' })
  inviteStoreAdmin(
    @Body() inviteBody: StoreAdminInviteDto,
    @JwtBody() jwtBody
  ) {
    return this.adminService.inviteStoreAdmin(inviteBody, jwtBody);
  }

  @Patch('store-admin/profile/:id')
  @Roles(UserRoles.SUPER_ADMIN)
  @HttpCode(200)
  @ApiBody({ type: StoreAdminUpdateDto })
  @ApiBearerAuth()
  @ApiOperation({ description: 'Update profile for store-admin' })
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
    @JwtBody() jwtBody
  ): Observable<MessageDto | Record<null, null>> {
    return this.adminService.storeAdminProfileUpdate(id, body, jwtBody);
  }

  @Get('store-admin/profile/:id')
  @Roles(UserRoles.SUPER_ADMIN)
  @ApiBearerAuth()
  @ApiOperation({ description: 'View profile for store admin' })
  @ApiOkResponse({
    description: 'Successfully Fetched',
    type: MessageAdminFetchDto
  })
  @ApiUnauthorizedResponse({ description: K.ERROR_CODES.UNAUTHORIZED.message })
  @ApiNotFoundResponse({ description: 'Id not found' })
  @ApiInternalServerErrorResponse({
    description: K.ERROR_CODES.DEFAULT.message
  })
  @ApiBadRequestResponse({ description: 'Invalid Id' })
  fetchStoreAdminProfile(
    @Param('id', new ParseIntPipe()) id: number
  ): Observable<MessageAdminFetchDto | Record<null, null>> {
    return this.adminService.fetchStoreAdminProfile(id);
  }

  @Delete('store-admin')
  @Roles(UserRoles.SUPER_ADMIN)
  @ApiBearerAuth()
  @ApiOperation({ description: 'Bulk delete store admin details' })
  @UsePipes(new CustomValidationPipe())
  @ApiOkResponse({
    description: 'Successfully deleted',
    type: MessageDto
  })
  @ApiUnauthorizedResponse({ description: K.ERROR_CODES.UNAUTHORIZED.message })
  @ApiInternalServerErrorResponse({
    description: K.ERROR_CODES.DEFAULT.message
  })
  @ApiBadRequestResponse({ description: K.ERROR_CODES.BADREQUEST.message })
  deleteStoreAdminDetails(
    @Body() param: DeleteStoreAdminDto
  ): Observable<MessageDto | Record<null, null>> {
    return this.adminService.deleteStoreAdminDetails(param);
  }

  @Patch('offer/:id')
  @Roles(UserRoles.SUPER_ADMIN)
  @UsePipes(new CustomValidationPipe())
  @ApiOperation({ description: 'To edit offer' })
  @ApiBody({ type: UpdateOffer })
  @ApiOkResponse({
    description: K.ERROR_CODES.UPDATED.message,
    type: MessageDto
  })
  @ApiUnauthorizedResponse({ description: K.ERROR_CODES.UNAUTHORIZED.message })
  @ApiInternalServerErrorResponse({
    description: K.ERROR_CODES.DEFAULT.message
  })
  @ApiBadRequestResponse({ description: K.ERROR_CODES.BADREQUEST.message })
  updateOfferDetails(
    @Body() body: UpdateOffer,
    @Param('id', new ParseIntPipe()) id: number,
    @JwtBody() jwtBody
  ): Observable<MessageDto | Record<null, null>> {
    return this.adminService.updateOfferDetails(body, id, jwtBody);
  }

  @Get('offer/:id')
  @Roles(UserRoles.SUPER_ADMIN, UserRoles.STORE_ADMIN)
  @ApiBearerAuth()
  @ApiOperation({ description: 'Functionality for fetching offer detail' })
  @UsePipes(new CustomValidationPipe())
  @ApiOkResponse({
    description: 'Successfully Collected offer Details',
    type: OfferFetchMessageDto
  })
  @ApiUnauthorizedResponse({ description: K.ERROR_CODES.UNAUTHORIZED.message })
  @ApiInternalServerErrorResponse({
    description: K.ERROR_CODES.DEFAULT.message
  })
  @ApiBadRequestResponse({ description: K.ERROR_CODES.BADREQUEST.message })
  getofferDetails(
    @Param('id', new ParseIntPipe()) id: number
  ): Observable<OfferFetchMessageDto | Record<null, null>> {
    return this.adminService.getofferDetails(id);
  }

  @Post('offer')
  @Roles(UserRoles.SUPER_ADMIN)
  @UsePipes(new CustomValidationPipe())
  @ApiOperation({ description: 'To create offer' })
  @ApiBody({ type: CreateOffer })
  @ApiOkResponse({
    description: K.ERROR_CODES.Created.message,
    type: MessageDto
  })
  @ApiUnauthorizedResponse({ description: K.ERROR_CODES.UNAUTHORIZED.message })
  @ApiInternalServerErrorResponse({
    description: K.ERROR_CODES.DEFAULT.message
  })
  @ApiBadRequestResponse({ description: K.ERROR_CODES.BADREQUEST.message })
  createOfferDtails(
    @Body() body: CreateOffer,
    @JwtBody() jwtBody
  ): Observable<MessageDto | Record<null, null>> {
    return this.adminService.createOfferDtails(body, jwtBody);
  }

  @Delete('offer/:id')
  @Roles(UserRoles.SUPER_ADMIN)
  @ApiBearerAuth()
  @ApiOperation({ description: 'Functionality for deleting offer' })
  @UsePipes(new CustomValidationPipe())
  @ApiOkResponse({
    description: K.ERROR_CODES.DELETE.message,
    type: MessageDto
  })
  @ApiUnauthorizedResponse({ description: K.ERROR_CODES.UNAUTHORIZED.message })
  @ApiInternalServerErrorResponse({
    description: K.ERROR_CODES.DEFAULT.message
  })
  @ApiBadRequestResponse({ description: K.ERROR_CODES.BADREQUEST.message })
  deleteOffer(
    @Param('id', new ParseIntPipe()) id: number
  ): Observable<MessageDto | Record<null, null>> {
    return this.adminService.deleteOffer(id);
  }

  @Get('offer')
  @Roles(UserRoles.SUPER_ADMIN)
  @ApiBearerAuth()
  @ApiOperation({ description: 'View offers list for store admin' })
  @ApiOkResponse({
    description: 'Successfully Fetched',
    type: OfferListResponseDto
  })
  @ApiUnauthorizedResponse({ description: K.ERROR_CODES.UNAUTHORIZED.message })
  @ApiInternalServerErrorResponse({
    description: K.ERROR_CODES.DEFAULT.message
  })
  @ApiBadRequestResponse({ description: K.ERROR_CODES.BADREQUEST.message })
  fetchOfferList(
    @Query() queryParam: OfferListParamDto
  ): Observable<OfferListResponseDto | Record<null, null>> {
    return this.adminService.fetchOfferList(queryParam);
  }

  @Post('section')
  @Roles(UserRoles.SUPER_ADMIN)
  @HttpCode(200)
  @UsePipes(new CustomValidationPipe({ transform: true }))
  @ApiBody({ type: CreateSectionDto })
  @ApiBearerAuth()
  @ApiOperation({ description: 'Create new Section' })
  @ApiOkResponse({
    description: K.ERROR_CODES.Created.message,
    type: SectionMessageDto
  })
  @ApiUnauthorizedResponse({ description: K.ERROR_CODES.UNAUTHORIZED.message })
  @ApiInternalServerErrorResponse({
    description: K.ERROR_CODES.DEFAULT.message
  })
  @ApiBadRequestResponse({ description: K.ERROR_CODES.BADREQUEST.message })
  createSection(
    @Body() body: CreateSectionDto,
    @JwtBody() jwtBody
  ): Observable<SectionMessageDto | Record<null, null>> {
    return this.adminService.createSection(body, jwtBody);
  }

  @Delete('section/:sectionId')
  @Roles(UserRoles.SUPER_ADMIN)
  @ApiBearerAuth()
  @ApiOperation({ description: 'Delete section' })
  @ApiOkResponse({
    description: 'Successfully deleted',
    type: SectionMessageDto
  })
  @ApiUnauthorizedResponse({
    description: K.ERROR_CODES.UNAUTHORIZED.message
  })
  @ApiInternalServerErrorResponse({
    description: K.ERROR_CODES.DEFAULT.message
  })
  @ApiBadRequestResponse({ description: 'Invalid id' })
  deleteSection(
    @Param('sectionId', ParseIntPipe) sectionId: number
  ): Observable<SectionMessageDto | Record<null, null>> {
    return this.adminService.deleteSection(sectionId);
  }

  @Patch('section/:sectionId')
  @Roles(UserRoles.SUPER_ADMIN)
  @UsePipes(new CustomValidationPipe({ transform: true }))
  @ApiBearerAuth()
  @ApiOperation({ description: 'Update section' })
  @ApiBody({ type: UpdateSectionDto })
  @ApiOkResponse({
    description: K.ERROR_CODES.UPDATED.message,
    type: SectionMessageDto
  })
  @ApiUnauthorizedResponse({
    description: K.ERROR_CODES.UNAUTHORIZED.message
  })
  @ApiInternalServerErrorResponse({
    description: K.ERROR_CODES.DEFAULT.message
  })
  @ApiBadRequestResponse({ description: 'Invalid id' })
  updateSection(
    @Param('sectionId', ParseIntPipe) sectionId: number,
    @Body() body: UpdateSectionDto,
    @JwtBody() jwtBody
  ): Observable<SectionMessageDto | Record<null, null>> {
    return this.adminService.updateSection(sectionId, jwtBody, body);
  }

  @Get('offer/:offerId/product')
  @Roles(UserRoles.SUPER_ADMIN, UserRoles.STORE_ADMIN)
  @ApiBearerAuth()
  @ApiOperation({ description: 'View products under a single offer' })
  @ApiOkResponse({
    description: 'Successfully fetched single offer product list',
    type: SingleOfferProductListResponseDto
  })
  @ApiUnauthorizedResponse({ description: K.ERROR_CODES.UNAUTHORIZED.message })
  @ApiInternalServerErrorResponse({
    description: K.ERROR_CODES.DEFAULT.message
  })
  @ApiBadRequestResponse({ description: K.ERROR_CODES.BADREQUEST.message })
  singleOfferProductList(
    @Param('offerId', new ParseIntPipe()) offerId: number,
    @Query() param: SingleOfferProductListPaginationDto
  ): Observable<SingleOfferProductListResponseDto | Record<null, null>> {
    return this.adminService.singleOfferProductList(offerId, param);
  }

  @Post('offer/product')
  @Roles(UserRoles.SUPER_ADMIN)
  @UsePipes(new CustomValidationPipe())
  @ApiOperation({ description: 'Assign offer to products' })
  @ApiBody({ type: SingleOfferProductAssignDto })
  @ApiOkResponse({
    description: K.ERROR_CODES.Created.message,
    type: MessageDto
  })
  @ApiUnauthorizedResponse({ description: K.ERROR_CODES.UNAUTHORIZED.message })
  @ApiInternalServerErrorResponse({
    description: K.ERROR_CODES.DEFAULT.message
  })
  @ApiBadRequestResponse({ description: K.ERROR_CODES.BADREQUEST.message })
  singleOfferProductAssign(
    @Body() body: SingleOfferProductAssignDto
  ): Observable<MessageDto | Record<null, null>> {
    return this.adminService.singleOfferProductAssign(body);
  }

  @Delete('offer/:offerId/product/:productId')
  @Roles(UserRoles.SUPER_ADMIN)
  @UsePipes(new CustomValidationPipe())
  @ApiOperation({ description: 'Unassign product from an offer' })
  @ApiOkResponse({
    description: 'Successfully unassigned product',
    type: MessageDto
  })
  @ApiUnauthorizedResponse({ description: K.ERROR_CODES.UNAUTHORIZED.message })
  @ApiInternalServerErrorResponse({
    description: K.ERROR_CODES.DEFAULT.message
  })
  @ApiBadRequestResponse({ description: K.ERROR_CODES.BADREQUEST.message })
  singleOfferProductUnassign(
    @Param('offerId', new ParseIntPipe()) offerId: number,
    @Param('productId', new ParseIntPipe()) productId: number
  ): Observable<MessageDto | Record<null, null>> {
    return this.adminService.singleOfferProductUnassign(offerId, productId);
  }

  @Patch(':adminId/update-password')
  @Roles(UserRoles.STORE_ADMIN, UserRoles.SUPER_ADMIN)
  @UsePipes(new CustomValidationPipe({ transform: true }))
  @HttpCode(200)
  @ApiBearerAuth()
  @ApiBody({ type: AdminPasswordUpdateDto })
  @ApiOperation({ description: 'Update password for admin' })
  @ApiOkResponse({
    description: K.ERROR_CODES.UPDATED.message,
    type: MessageDto
  })
  @ApiUnauthorizedResponse({ description: K.ERROR_CODES.UNAUTHORIZED.message })
  @ApiInternalServerErrorResponse({
    description: K.ERROR_CODES.DEFAULT.message
  })
  adminPasswordUpdate(
    @Param('adminId', ParseIntPipe) adminId: number,
    @JwtBody() jwtBody,
    @Body() body: AdminPasswordUpdateDto
  ): Promise<MessageDto | Record<null, null>> {
    return this.adminService.adminPasswordUpdate(adminId, jwtBody, body);
  }
}
