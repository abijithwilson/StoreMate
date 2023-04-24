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
  ApiOkResponse,
  ApiOperation,
  ApiTags,
  ApiUnauthorizedResponse
} from '@nestjs/swagger';

import { CustomValidationPipe } from 'src/pipes/validation-pipe';
import { JwtBody } from 'src/decorator/jwt.decorator';
import {
  AssignProductSectionDto,
  AssignSectionDto,
  FetchCategoryListResponseDto,
  FetchOfferListResponseDto,
  FetchProductFilterData,
  FetchStoreWiseSectionsPaginationDto,
  FetchWishlistProductsPaginationDto,
  FetchWishlistProductsResponseDto,
  MessageSectionDropDownList,
  ProductFilterDataResponse,
  SectionFetchDto,
  SectionMessageDto,
  SectionQueryDto,
  SectionUnderStoreQueryParam,
  SectionVisitDataResponseDto,
  SectionVisitParamDto,
  SectionWiseCategoriesPaginationDto,
  StoreWiseSectionResponseDto,
  UpdateSectionDto,
  WishlistProductAssignDto
} from '../dto/section.dto';
import { SectionService } from './section.service';
import * as K from '../../shared/constants';
import { Observable } from 'rxjs';

import {
  FetchSingleProductDetailsResponseDto,
  FetchSingleColourAndSizeSkuDetails,
  ProductFetchResponseDto
} from '../dto/product.dto';

import { Roles } from 'src/decorator/roles.decorator';
import { UserRoles } from '../dto/roles.dto';

@Controller('store')
@ApiTags('Section')
export class SectionController {
  constructor(private readonly sectionService: SectionService) {}

  @Post(':storeId/section')
  @Roles(UserRoles.STORE_ADMIN)
  @HttpCode(200)
  @UsePipes(new CustomValidationPipe({ transform: true }))
  @ApiBody({ type: AssignSectionDto })
  @ApiBearerAuth()
  @ApiOperation({ description: 'Assign new section to store' })
  @ApiOkResponse({
    description: K.ERROR_CODES.Created.message,
    type: SectionMessageDto
  })
  @ApiUnauthorizedResponse({ description: K.ERROR_CODES.UNAUTHORIZED.message })
  @ApiInternalServerErrorResponse({
    description: K.ERROR_CODES.DEFAULT.message
  })
  @ApiBadRequestResponse({ description: K.ERROR_CODES.BADREQUEST.message })
  assignSection(
    @Body() body: AssignSectionDto,
    @Param('storeId', ParseIntPipe) storeId: number
  ): Observable<SectionMessageDto | Record<null, null>> {
    return this.sectionService.assignSection(body, storeId);
  }

  @Delete(':storeId/section/:sectionId')
  @Roles(UserRoles.STORE_ADMIN, UserRoles.SUPER_ADMIN)
  @ApiBearerAuth()
  @ApiOperation({ description: 'Unassign section' })
  @ApiOkResponse({
    description: 'Unasssign Section deleted',
    type: SectionMessageDto
  })
  @ApiUnauthorizedResponse({
    description: K.ERROR_CODES.UNAUTHORIZED.message
  })
  @ApiInternalServerErrorResponse({
    description: K.ERROR_CODES.DEFAULT.message
  })
  @ApiBadRequestResponse({ description: 'Invalid id' })
  unAssignSection(
    @Param('sectionId', ParseIntPipe) sectionId: number,
    @Param('storeId', ParseIntPipe) storeId: number,
    @JwtBody() jwtBody
  ): Promise<SectionMessageDto> {
    return this.sectionService.unAssignSection(sectionId, storeId, jwtBody);
  }

  @Get('section')
  @Roles(UserRoles.SUPER_ADMIN, UserRoles.STORE_ADMIN)
  @ApiBearerAuth()
  @ApiOperation({
    description: `Fetch section Listed by super admin or fetch
       section not listed under store`
  })
  @ApiOkResponse({
    description: 'Successfully fetched.',
    type: SectionFetchDto
  })
  @ApiUnauthorizedResponse({
    description: K.ERROR_CODES.UNAUTHORIZED.message
  })
  @ApiInternalServerErrorResponse({
    description: K.ERROR_CODES.DEFAULT.message
  })
  @ApiBadRequestResponse({ description: K.ERROR_CODES.BADREQUEST.message })
  getSectionAndSectionNotListedInStore(
    @Query() queryParam: SectionQueryDto,
    @JwtBody() jwtBody
  ): Observable<SectionFetchDto | Record<null, null>> {
    return this.sectionService.getSectionAndSectionNotListedInStore(
      queryParam,
      jwtBody
    );
  }

  @Patch(':storeId/section/:sectionId')
  @Roles(UserRoles.STORE_ADMIN)
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
    @Param('storeId', ParseIntPipe) storeId: number,
    @Body() body: UpdateSectionDto,
    @JwtBody() jwtBody
  ): Promise<SectionMessageDto> {
    return this.sectionService.updateSection(sectionId, storeId, jwtBody, body);
  }

  @Get(':storeId/section')
  @Roles(UserRoles.STORE_ADMIN, UserRoles.SUPER_ADMIN, UserRoles.USER)
  @ApiBearerAuth()
  @ApiOperation({ description: 'Fetch store wise section list.' })
  @ApiOkResponse({
    description: 'Successfully fetched store wise section list.',
    type: StoreWiseSectionResponseDto
  })
  @ApiUnauthorizedResponse({
    description: K.ERROR_CODES.UNAUTHORIZED.message
  })
  @ApiInternalServerErrorResponse({
    description: K.ERROR_CODES.DEFAULT.message
  })
  @ApiBadRequestResponse({ description: 'Invalid id' })
  getStoreSectionDetails(
    @Param('storeId', ParseIntPipe) storeId: number,
    @Query() param: FetchStoreWiseSectionsPaginationDto,
    @JwtBody() jwtBody
  ): Promise<StoreWiseSectionResponseDto> {
    return this.sectionService.getStoreSectionDetails(storeId, param, jwtBody);
  }

  @Patch(':storeId/section/:sectionId/product/assign')
  @Roles(UserRoles.STORE_ADMIN)
  @UsePipes(new CustomValidationPipe({ transform: true }))
  @ApiBearerAuth()
  @ApiBody({ type: AssignProductSectionDto })
  @ApiOperation({ description: 'Assigning product to particular section' })
  @ApiOkResponse({
    description: 'Successfully assigned',
    type: SectionMessageDto
  })
  @ApiUnauthorizedResponse({
    description: K.ERROR_CODES.UNAUTHORIZED.message
  })
  @ApiInternalServerErrorResponse({
    description: K.ERROR_CODES.DEFAULT.message
  })
  @ApiBadRequestResponse({ description: 'Invalid id' })
  assignProductToSection(
    @Param('storeId', ParseIntPipe) storeId: number,
    @Param('sectionId', ParseIntPipe) sectionId: number,
    @Body() body: AssignProductSectionDto,
    @JwtBody() jwtBody
  ): Promise<SectionMessageDto> {
    return this.sectionService.assignProductToSection(
      storeId,
      sectionId,
      body,
      jwtBody
    );
  }

  @Get(':storeId/assigned-section')
  @Roles(UserRoles.STORE_ADMIN)
  @ApiBearerAuth()
  @ApiOperation({ description: 'Fetch store wise section list.' })
  @ApiOkResponse({
    description: 'Successfully fetched store wise section list.',
    type: MessageSectionDropDownList
  })
  @ApiUnauthorizedResponse({
    description: K.ERROR_CODES.UNAUTHORIZED.message
  })
  @ApiInternalServerErrorResponse({
    description: K.ERROR_CODES.DEFAULT.message
  })
  @ApiBadRequestResponse({ description: 'Invalid id' })
  getStoreAssignedSectionDetails(
    @Param('storeId', ParseIntPipe) storeId: number,
    @JwtBody() jwtBody,
    @Query() param: SectionUnderStoreQueryParam
  ): Promise<MessageSectionDropDownList> {
    return this.sectionService.getStoreAssignedSectionDetails(
      storeId,
      param,
      jwtBody
    );
  }

  @Get(':storeId/section/:sectionId/product/:productId')
  @Roles(UserRoles.USER)
  @ApiBearerAuth()
  @ApiOperation({ description: 'Get details of a product in a section' })
  @ApiOkResponse({
    description: 'Successfully fetched',
    type: FetchSingleProductDetailsResponseDto
  })
  @ApiUnauthorizedResponse({ description: K.ERROR_CODES.UNAUTHORIZED.message })
  @ApiInternalServerErrorResponse({
    description: K.ERROR_CODES.DEFAULT.message
  })
  @ApiBadRequestResponse({ description: K.ERROR_CODES.BADREQUEST.message })
  getDetailsOfProductInASection(
    @Param('storeId', new ParseIntPipe()) storeId: number,
    @Param('productId', new ParseIntPipe()) productId: number,
    @Param('sectionId', new ParseIntPipe()) sectionId: number,
    @Query() param: FetchSingleColourAndSizeSkuDetails,
    @JwtBody() jwtBody
  ): Observable<FetchSingleProductDetailsResponseDto | Record<null, null>> {
    return this.sectionService.getDetailsOfAProductInASection(
      sectionId,
      productId,
      storeId,
      param,
      jwtBody
    );
  }

  @Patch(':storeId/section/:sectionId/product/:productId/unassign')
  @Roles(UserRoles.STORE_ADMIN)
  @UsePipes(new CustomValidationPipe({ transform: true }))
  @ApiBearerAuth()
  @ApiOperation({ description: 'Unassign product from a section' })
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
  sectionWiseProductUnassign(
    @Param('storeId', ParseIntPipe) storeId: number,
    @Param('sectionId', ParseIntPipe) sectionId: number,
    @Param('productId', ParseIntPipe) productId: number,
    @JwtBody() jwtBody
  ): Promise<SectionMessageDto> {
    return this.sectionService.sectionWiseProductUnassign(
      storeId,
      sectionId,
      productId,
      jwtBody
    );
  }

  @Get(':storeId/unAssignedProducts')
  @Roles(UserRoles.STORE_ADMIN)
  @ApiBearerAuth()
  @ApiOperation({
    description: 'Get list of products not assigned to any section'
  })
  @ApiOkResponse({
    description: 'Successfully fetched',
    type: ProductFetchResponseDto
  })
  @ApiUnauthorizedResponse({ description: K.ERROR_CODES.UNAUTHORIZED.message })
  @ApiInternalServerErrorResponse({
    description: K.ERROR_CODES.DEFAULT.message
  })
  @ApiBadRequestResponse({ description: K.ERROR_CODES.BADREQUEST.message })
  getListOfUnAssignedProductsToAnySection(
    @Param('storeId', new ParseIntPipe()) storeId: number,
    @JwtBody() jwtBody
  ): Promise<ProductFetchResponseDto | Record<null, null>> {
    return this.sectionService.getListOfProductsNotAssignedToAnySection(
      storeId,
      jwtBody
    );
  }

  @Get(':storeId/section/:sectionId/categories')
  @Roles(UserRoles.USER)
  @ApiBearerAuth()
  @ApiOperation({
    description: 'Get list of categories in a section'
  })
  @ApiOkResponse({
    description: 'Successfully fetched categories in a section',
    type: FetchCategoryListResponseDto
  })
  @ApiUnauthorizedResponse({ description: K.ERROR_CODES.UNAUTHORIZED.message })
  @ApiInternalServerErrorResponse({
    description: K.ERROR_CODES.DEFAULT.message
  })
  @ApiBadRequestResponse({ description: K.ERROR_CODES.BADREQUEST.message })
  fetchSectionWiseCategoryList(
    @Param('storeId', new ParseIntPipe()) storeId: number,
    @Param('sectionId', new ParseIntPipe()) sectionId: number,
    @Query() param: SectionWiseCategoriesPaginationDto
  ): Promise<FetchCategoryListResponseDto | Record<null, null>> {
    return this.sectionService.fetchSectionWiseCategoryList(
      storeId,
      sectionId,
      param
    );
  }

  @Get(':storeId/section/:sectionId/offers')
  @Roles(UserRoles.USER)
  @ApiBearerAuth()
  @ApiOperation({
    description: 'Get list of offers in a section'
  })
  @ApiOkResponse({
    description: 'Successfully fetched offers in a section',
    type: FetchOfferListResponseDto
  })
  @ApiUnauthorizedResponse({ description: K.ERROR_CODES.UNAUTHORIZED.message })
  @ApiInternalServerErrorResponse({
    description: K.ERROR_CODES.DEFAULT.message
  })
  @ApiBadRequestResponse({ description: K.ERROR_CODES.BADREQUEST.message })
  fetchSectionWiseOfferList(
    @Param('storeId', new ParseIntPipe()) storeId: number,
    @Param('sectionId', new ParseIntPipe()) sectionId: number,
    @Query() param: SectionWiseCategoriesPaginationDto
  ): Observable<FetchOfferListResponseDto | Record<null, null>> {
    return this.sectionService.fetchSectionWiseOfferList(
      storeId,
      sectionId,
      param
    );
  }

  @Get(':storeId/section/:sectionId/wishlist')
  @Roles(UserRoles.USER)
  @ApiBearerAuth()
  @ApiOperation({
    description: 'Get list of products in wishlist'
  })
  @ApiOkResponse({
    description: 'Successfully fetched products in wishlist',
    type: FetchWishlistProductsResponseDto
  })
  @ApiUnauthorizedResponse({ description: K.ERROR_CODES.UNAUTHORIZED.message })
  @ApiInternalServerErrorResponse({
    description: K.ERROR_CODES.DEFAULT.message
  })
  @ApiBadRequestResponse({ description: K.ERROR_CODES.BADREQUEST.message })
  fetchWishlistProducts(
    @Param('storeId', new ParseIntPipe()) storeId: number,
    @Param('sectionId', new ParseIntPipe()) sectionId: number,
    @Query() param: FetchWishlistProductsPaginationDto,
    @JwtBody() jwtBody
  ): Observable<FetchWishlistProductsResponseDto | Record<null, null>> {
    return this.sectionService.fetchWishlistProducts(
      storeId,
      sectionId,
      param,
      jwtBody
    );
  }

  @Get(':storeId/section/:sectionId/filters')
  @Roles(UserRoles.USER)
  @ApiBearerAuth()
  @ApiOperation({
    description: 'Get filter data for product list'
  })
  @ApiOkResponse({
    description: 'Successfully fetched product filter data',
    type: ProductFilterDataResponse
  })
  @ApiUnauthorizedResponse({ description: K.ERROR_CODES.UNAUTHORIZED.message })
  @ApiInternalServerErrorResponse({
    description: K.ERROR_CODES.DEFAULT.message
  })
  @ApiBadRequestResponse({ description: K.ERROR_CODES.BADREQUEST.message })
  fetchProductFilterData(
    @Param('storeId', new ParseIntPipe()) storeId: number,
    @Param('sectionId', new ParseIntPipe()) sectionId: number,
    @Query() param: FetchProductFilterData,
    @JwtBody() jwtBody
  ): Observable<ProductFilterDataResponse | Record<null, null>> {
    return this.sectionService.fetchProductFilterData(
      storeId,
      sectionId,
      param,
      jwtBody
    );
  }

  @Post('wishlist/assign')
  @Roles(UserRoles.USER)
  @HttpCode(200)
  @UsePipes(new CustomValidationPipe({ transform: true }))
  @ApiBody({ type: WishlistProductAssignDto })
  @ApiBearerAuth()
  @ApiOperation({ description: 'Assign products to user wishlist' })
  @ApiOkResponse({
    description: K.ERROR_CODES.Created.message,
    type: SectionMessageDto
  })
  @ApiUnauthorizedResponse({ description: K.ERROR_CODES.UNAUTHORIZED.message })
  @ApiInternalServerErrorResponse({
    description: K.ERROR_CODES.DEFAULT.message
  })
  @ApiBadRequestResponse({ description: K.ERROR_CODES.BADREQUEST.message })
  assignProductsToWishlist(
    @Body() body: WishlistProductAssignDto,
    @JwtBody() jwtBody
  ): Promise<SectionMessageDto | Record<null, null>> {
    return this.sectionService.assignProductsToWishlist(body, jwtBody);
  }

  @Delete(':storeId/product/:productId/wishlist/unassign')
  @Roles(UserRoles.USER)
  @ApiBearerAuth()
  @ApiOperation({ description: 'Unassign product from wishlist' })
  @ApiOkResponse({
    description: 'Successfully unassigned product from wishlist',
    type: SectionMessageDto
  })
  @ApiUnauthorizedResponse({
    description: K.ERROR_CODES.UNAUTHORIZED.message
  })
  @ApiInternalServerErrorResponse({
    description: K.ERROR_CODES.DEFAULT.message
  })
  @ApiBadRequestResponse({ description: 'Invalid id' })
  unassignProductFromWishlist(
    @Param('storeId', ParseIntPipe) storeId: number,
    @Param('productId', ParseIntPipe) productId: number,
    @JwtBody() jwtBody
  ): Promise<SectionMessageDto | Record<null, null>> {
    return this.sectionService.unassignProductFromWishlist(
      storeId,
      productId,
      jwtBody
    );
  }

  @Get(':storeId/section/last-visited')
  @Roles(UserRoles.USER)
  @ApiBearerAuth()
  @ApiOperation({
    description: 'Get user section visit data'
  })
  @ApiOkResponse({
    description: 'Successfully fetched user section visit data',
    type: SectionVisitDataResponseDto
  })
  @ApiUnauthorizedResponse({ description: K.ERROR_CODES.UNAUTHORIZED.message })
  @ApiInternalServerErrorResponse({
    description: K.ERROR_CODES.DEFAULT.message
  })
  @ApiBadRequestResponse({ description: K.ERROR_CODES.BADREQUEST.message })
  fetchSectionVisitData(
    @Param('storeId', new ParseIntPipe()) storeId: number,
    @Query() param: SectionVisitParamDto,
    @JwtBody() jwtBody
  ): Observable<SectionVisitDataResponseDto | Record<null, null>> {
    return this.sectionService.fetchSectionVisitData(
      storeId,
      param,
      jwtBody
    );
  }
}
