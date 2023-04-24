import {
  AssigningOfferDto,
  BarchartSpanDto,
  ChartSpanTypeDto,
  DeleteRewardPointsDto,
  FetchRewardDetailsOfStoreDto,
  FetchStoreWiseProductsPagination,
  FetchStoreWiseProductsResponse,
  LinechartSpanDto,
  MessageDto,
  MessageSkuUnderStore,
  MessageStoreFetchDto,
  NearbyStoreResultDto,
  OfferWiseProductMessageDto,
  RewardDetailsResponseDto,
  SingleStoreDetailsDto,
  StoreFetchResponseDto,
  StoreStateDataResponseDto,
  StoreListFetchResponseDto,
  StoreListParamDto,
  StoreNameFetchDto,
  StoreRewardDto,
  StoreRewardEditDto,
  StoresBarchartMessageDto,
  StoresLinechartMessageDto,
  StoresPiechartMessageDto,
  StoreWithoutRewardsDto,
  UnAssigningOfferDto,
  UpdateSkuUnderStoreDto,
  UserProductFilterOptionsDto,
  StoreCountryDataResponseDto,
  StoreDistrictDataResponseDto,
  LastVisitedStoresResponseDto,
  LastVisitedStoresDto
} from './../dto/store.dto';
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
import { CustomValidationPipe } from 'src/pipes/validation-pipe';
import {
  FetchAllStorePagination,
  NearbyStoreDto,
  StoreDto,
  StoreUpdateDto
} from '../dto/store.dto';
import { StoreService } from './store.service';
import { JwtBody } from 'src/decorator/jwt.decorator';
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
import * as K from '../../shared/constants';
import { Observable } from 'rxjs';
import { UserProductFetchResponseDto } from '../dto/product.dto';
import { Roles } from 'src/decorator/roles.decorator';
import { UserRoles } from '../dto/roles.dto';
import { Public } from 'src/guards/public.guard';
import { OfferListParamDto } from '../dto/offer.dto';
import { StoreDashboardResponseDto } from '../dto/store-admin.dto';

@ApiTags('Stores')
@Controller('store')
export class StoreController {
  constructor(private readonly storeService: StoreService) {}

  @Post()
  @Roles(UserRoles.SUPER_ADMIN)
  @ApiBearerAuth()
  @ApiOperation({ description: 'Create store' })
  @ApiOkResponse({ description: 'Successfully created', type: MessageDto })
  @ApiUnauthorizedResponse({ description: K.ERROR_CODES.UNAUTHORIZED.message })
  @ApiInternalServerErrorResponse({
    description: K.ERROR_CODES.DEFAULT.message
  })
  @ApiBadRequestResponse({ description: 'Invalid data' })
  createStore(
    @Body() createBody: StoreDto,
    @JwtBody() jwtBody
  ): Observable<MessageDto | Record<null, null>> {
    return this.storeService.createStore(createBody, jwtBody);
  }

  @Roles(UserRoles.SUPER_ADMIN)
  @ApiBearerAuth()
  @ApiOperation({ description: 'Delete store' })
  @ApiOkResponse({ description: 'Successfully deleted', type: MessageDto })
  @ApiUnauthorizedResponse({
    description: K.ERROR_CODES.UNAUTHORIZED.message
  })
  @ApiInternalServerErrorResponse({
    description: K.ERROR_CODES.DEFAULT.message
  })
  @ApiBadRequestResponse({ description: 'Invalid id' })
  @ApiNotFoundResponse({ description: 'Store not found' })
  @Delete(':id')
  deleteStore(@Param('id', ParseIntPipe) id: number) {
    return this.storeService.deleteStore(id);
  }

  @Get('single-store/:id')
  @Roles(UserRoles.SUPER_ADMIN, UserRoles.STORE_ADMIN)
  @ApiBearerAuth()
  @ApiOperation({ description: 'Get single store details' })
  @UsePipes(new CustomValidationPipe())
  @ApiOkResponse({
    description: 'Successfully collected',
    type: SingleStoreDetailsDto
  })
  @ApiUnauthorizedResponse({ description: K.ERROR_CODES.UNAUTHORIZED.message })
  @ApiInternalServerErrorResponse({
    description: K.ERROR_CODES.DEFAULT.message
  })
  @ApiBadRequestResponse({ description: K.ERROR_CODES.BADREQUEST.message })
  getSingleStoreDetails(
    @Param('id', ParseIntPipe) id: number
  ): Observable<SingleStoreDetailsDto | Record<null, null>> {
    return this.storeService.getSingleStoreDetails(id);
  }

  @Get()
  @Roles(UserRoles.SUPER_ADMIN)
  @ApiBearerAuth()
  @ApiOperation({ description: 'Get all store details' })
  @UsePipes(new CustomValidationPipe())
  @ApiOkResponse({
    description: 'Successfully collected',
    type: StoreFetchResponseDto
  })
  @ApiUnauthorizedResponse({ description: K.ERROR_CODES.UNAUTHORIZED.message })
  @ApiInternalServerErrorResponse({
    description: K.ERROR_CODES.DEFAULT.message
  })
  @ApiBadRequestResponse({ description: K.ERROR_CODES.BADREQUEST.message })
  getStoreDetails(
    @Query() param: FetchAllStorePagination
  ): Observable<MessageDto | Record<null, null>> {
    return this.storeService.getStoreDetails(param);
  }

  @Patch('profile/:id')
  @Roles(UserRoles.SUPER_ADMIN)
  @UsePipes(new CustomValidationPipe())
  @ApiBearerAuth()
  @ApiOperation({ description: 'Update store details' })
  @ApiBody({ type: StoreUpdateDto })
  @ApiOkResponse({ description: 'Successfully updated', type: MessageDto })
  @ApiUnauthorizedResponse({ description: K.ERROR_CODES.UNAUTHORIZED.message })
  @ApiInternalServerErrorResponse({
    description: K.ERROR_CODES.DEFAULT.message
  })
  @ApiBadRequestResponse({ description: K.INVALID_ID })
  updateStoreProfile(
    @Param('id', ParseIntPipe) id: number,
    @Body() body: StoreUpdateDto,
    @JwtBody() jwtBody
  ): Observable<MessageDto | Record<null, null>> {
    return this.storeService.updateStoreProfile(id, body, jwtBody);
  }

  @Get('store-name')
  @ApiOperation({ description: 'Fetch store names' })
  @ApiBody({ type: StoreNameFetchDto })
  @UsePipes(new CustomValidationPipe())
  @ApiOkResponse({ description: 'Successfully fetched', type: MessageDto })
  @ApiInternalServerErrorResponse({
    description: K.ERROR_CODES.DEFAULT.message
  })
  @Public()
  fetchStoreName(
    @Query() param: StoreNameFetchDto
  ): Observable<MessageDto | Record<null, null>> {
    return this.storeService.fetchStoreName(param);
  }

  @Get('nearby-stores')
  @Roles(UserRoles.USER)
  @HttpCode(200)
  @ApiBearerAuth()
  @ApiOperation({ description: 'View nearby-stores of user' })
  @ApiOkResponse({
    description: 'Store details collected successfully',
    type: NearbyStoreResultDto
  })
  @ApiUnauthorizedResponse({ description: K.ERROR_CODES.UNAUTHORIZED.message })
  @ApiNotFoundResponse({ description: 'Id not found' })
  @ApiInternalServerErrorResponse({
    description: K.ERROR_CODES.DEFAULT.message
  })
  viewNearbyStores(
    @JwtBody() jwtBody,
    @Query() param: NearbyStoreDto
  ): Observable<MessageDto | Record<null, null>> {
    return this.storeService.viewNearbyStores(jwtBody, param);
  }

  @Delete('reward-points')
  @Roles(UserRoles.SUPER_ADMIN)
  @ApiBearerAuth()
  @ApiOperation({ description: 'Bulk delete reward-points details' })
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
  deleteRewardPoints(
    @Body() param: DeleteRewardPointsDto
  ): Observable<MessageDto | Record<null, null>> {
    return this.storeService.deleteRewardPoints(param);
  }

  @Get('reward-points')
  @Roles(UserRoles.SUPER_ADMIN)
  @HttpCode(200)
  @ApiBearerAuth()
  @ApiOperation({ description: 'View reward details of store' })
  @ApiOkResponse({
    description: 'Store reward details collected successfully',
    type: RewardDetailsResponseDto
  })
  @ApiUnauthorizedResponse({ description: K.ERROR_CODES.UNAUTHORIZED.message })
  @ApiNotFoundResponse({ description: 'Id not found' })
  @ApiInternalServerErrorResponse({
    description: K.ERROR_CODES.DEFAULT.message
  })
  viewStoreRewardDetails(
    @JwtBody() jwtBody,
    @Query() param: FetchRewardDetailsOfStoreDto
  ): Observable<MessageDto | Record<null, null>> {
    return this.storeService.viewStoreRewardDetails(jwtBody, param);
  }

  @Post('reward-points')
  @Roles(UserRoles.SUPER_ADMIN)
  @ApiBearerAuth()
  @ApiOperation({ description: 'Assign store reward points' })
  @ApiOkResponse({ description: 'Successfully assigned', type: MessageDto })
  @ApiUnauthorizedResponse({ description: K.ERROR_CODES.UNAUTHORIZED.message })
  @ApiInternalServerErrorResponse({
    description: K.ERROR_CODES.DEFAULT.message
  })
  @ApiBadRequestResponse({ description: 'Invalid data' })
  insertStoreRewardPoints(
    @Body() createBody: StoreRewardDto,
    @JwtBody() jwtBody
  ): Observable<MessageDto | Record<null, null>> {
    return this.storeService.insertStoreRewardPoints(createBody, jwtBody);
  }

  @Patch('reward-points')
  @Roles(UserRoles.SUPER_ADMIN)
  @ApiBearerAuth()
  @ApiOperation({ description: 'Update store reward points' })
  @ApiOkResponse({ description: 'Successfully updated', type: MessageDto })
  @ApiUnauthorizedResponse({ description: K.ERROR_CODES.UNAUTHORIZED.message })
  @ApiInternalServerErrorResponse({
    description: K.ERROR_CODES.DEFAULT.message
  })
  @ApiBadRequestResponse({ description: 'Invalid data' })
  updateStoreRewardPoints(
    @Body() updateBody: StoreRewardEditDto,
    @JwtBody() jwtBody
  ): Observable<MessageDto | Record<null, null>> {
    return this.storeService.updateStoreRewardPoints(updateBody, jwtBody);
  }

  @Get('reward-points/drop-down')
  @Roles(UserRoles.SUPER_ADMIN)
  @ApiBearerAuth()
  @ApiOperation({ description: 'Get names of store without rewards' })
  @UsePipes(new CustomValidationPipe())
  @ApiOkResponse({
    description: 'Successfully collected',
    type: StoreWithoutRewardsDto
  })
  @ApiUnauthorizedResponse({ description: K.ERROR_CODES.UNAUTHORIZED.message })
  @ApiInternalServerErrorResponse({
    description: K.ERROR_CODES.DEFAULT.message
  })
  @ApiBadRequestResponse({ description: K.ERROR_CODES.BADREQUEST.message })
  storeWithoutRewards(): Observable<MessageDto | Record<null, null>> {
    return this.storeService.storeWithoutRewards();
  }

  @Patch(':storeId/product/:productId/sku')
  @Roles(UserRoles.STORE_ADMIN)
  @ApiBearerAuth()
  @ApiOperation({ description: 'Update SKU for Store' })
  @UsePipes(new CustomValidationPipe())
  @ApiBody({ type: UpdateSkuUnderStoreDto })
  @ApiOkResponse({
    description: K.ERROR_CODES.UPDATED.message
  })
  @ApiUnauthorizedResponse({ description: K.ERROR_CODES.UNAUTHORIZED.message })
  @ApiInternalServerErrorResponse({
    description: K.ERROR_CODES.DEFAULT.message
  })
  @ApiBadRequestResponse({ description: K.ERROR_CODES.BADREQUEST.message })
  updateSkuUnderStore(
    @Param('storeId', ParseIntPipe) storeId: number,
    @Param('productId', ParseIntPipe) productId: number,
    @JwtBody() jwtBody,
    @Body() body: UpdateSkuUnderStoreDto
  ): Promise<MessageDto> {
    return this.storeService.updateSkuUnderStore(
      storeId,
      productId,
      jwtBody,
      body
    );
  }

  @Get(':storeId/product/:productId/sku')
  @Roles(UserRoles.STORE_ADMIN)
  @ApiBearerAuth()
  @ApiOperation({ description: 'Get all SKU' })
  @UsePipes(new CustomValidationPipe())
  @ApiOkResponse({
    description: 'Successfully collected',
    type: MessageSkuUnderStore
  })
  @ApiUnauthorizedResponse({ description: K.ERROR_CODES.UNAUTHORIZED.message })
  @ApiInternalServerErrorResponse({
    description: K.ERROR_CODES.DEFAULT.message
  })
  @ApiBadRequestResponse({ description: K.ERROR_CODES.BADREQUEST.message })
  getSkuDetailUnderStore(
    @Param('storeId', ParseIntPipe) storeId: number,
    @Param('productId', ParseIntPipe) productId: number,
    @JwtBody() jwtBody
  ): Promise<MessageSkuUnderStore> {
    return this.storeService.getSkuDetailUnderStore(
      storeId,
      productId,
      jwtBody
    );
  }

  @Get(':storeId/product')
  @Roles(UserRoles.STORE_ADMIN)
  @ApiBearerAuth()
  @ApiOperation({ description: 'Get all products' })
  @UsePipes(new CustomValidationPipe())
  @ApiOkResponse({
    description: 'Successfully collected',
    type: FetchStoreWiseProductsResponse
  })
  @ApiUnauthorizedResponse({ description: K.ERROR_CODES.UNAUTHORIZED.message })
  @ApiInternalServerErrorResponse({
    description: K.ERROR_CODES.DEFAULT.message
  })
  @ApiBadRequestResponse({ description: K.ERROR_CODES.BADREQUEST.message })
  fetchStoreWiseProductList(
    @Param('storeId', ParseIntPipe) storeId: number,
    @Query() param: FetchStoreWiseProductsPagination,
    @JwtBody() jwtBody
  ): Promise<FetchStoreWiseProductsResponse> {
    return this.storeService.fetchStoreWiseProductList(storeId, param, jwtBody);
  }

  @Get(':storeid/section/:sectionid/products')
  @Roles(UserRoles.USER)
  @ApiBearerAuth()
  @ApiOperation({ description: 'Get product details' })
  @ApiOkResponse({
    description: 'Successfully fetched product details',
    type: UserProductFetchResponseDto
  })
  @ApiUnauthorizedResponse({ description: K.ERROR_CODES.UNAUTHORIZED.message })
  @ApiInternalServerErrorResponse({
    description: K.ERROR_CODES.DEFAULT.message
  })
  @ApiBadRequestResponse({ description: K.ERROR_CODES.BADREQUEST.message })
  getProductAndSkuDetails(
    @Param('storeid', new ParseIntPipe()) storeId: number,
    @Param('sectionid', new ParseIntPipe()) sectionId: number,
    @Query() param: UserProductFilterOptionsDto,
    @JwtBody() jwtBody
  ): Observable<UserProductFetchResponseDto | Record<null, null>> {
    return this.storeService.getProductAndSkuDetails(
      storeId,
      sectionId,
      param,
      jwtBody
    );
  }

  @Post('offer')
  @Roles(UserRoles.STORE_ADMIN)
  @UsePipes(new CustomValidationPipe())
  @ApiBearerAuth()
  @ApiOperation({ description: 'Assigning offer to store' })
  @ApiBody({ type: AssigningOfferDto })
  @ApiOkResponse({ description: 'Successfully assigned', type: MessageDto })
  @ApiUnauthorizedResponse({ description: K.ERROR_CODES.UNAUTHORIZED.message })
  @ApiInternalServerErrorResponse({
    description: K.ERROR_CODES.DEFAULT.message
  })
  @ApiBadRequestResponse({ description: K.ERROR_CODES.BADREQUEST.message })
  assignOfferToStore(
    @Body() body: AssigningOfferDto
  ): Observable<MessageDto | Record<null, null>> {
    return this.storeService.assignOfferToStore(body);
  }

  @Delete('offer')
  @Roles(UserRoles.STORE_ADMIN)
  @UsePipes(new CustomValidationPipe())
  @ApiBearerAuth()
  @ApiOperation({ description: 'Unassigning offer to store' })
  @ApiBody({ type: UnAssigningOfferDto })
  @ApiOkResponse({ description: 'Successfully uassigned', type: MessageDto })
  @ApiUnauthorizedResponse({ description: K.ERROR_CODES.UNAUTHORIZED.message })
  @ApiInternalServerErrorResponse({
    description: K.ERROR_CODES.DEFAULT.message
  })
  @ApiBadRequestResponse({ description: K.ERROR_CODES.BADREQUEST.message })
  unAssignOfferToStore(
    @Body() body: UnAssigningOfferDto
  ): Observable<MessageDto | Record<null, null>> {
    return this.storeService.unAssignOfferToStore(body);
  }

  @Get('location')
  @Roles(UserRoles.SUPER_ADMIN)
  @ApiBearerAuth()
  @ApiOperation({ description: 'Get store list' })
  @ApiOkResponse({
    description: 'Successfully fetched store list',
    type: StoreListFetchResponseDto
  })
  @ApiUnauthorizedResponse({ description: K.ERROR_CODES.UNAUTHORIZED.message })
  @ApiInternalServerErrorResponse({
    description: K.ERROR_CODES.DEFAULT.message
  })
  @ApiBadRequestResponse({ description: K.ERROR_CODES.BADREQUEST.message })
  fetchStoreList(
    @Query() param: StoreListParamDto
  ): Observable<StoreListFetchResponseDto | Record<null, null>> {
    return this.storeService.fetchStoreList(param);
  }

  @Get(':storeId/offer')
  @Roles(UserRoles.STORE_ADMIN)
  @ApiBearerAuth()
  @ApiOperation({
    description: 'Functionality for fetching offer detail under store'
  })
  @UsePipes(new CustomValidationPipe())
  @ApiOkResponse({
    description: 'Successfully Collected offer Details',
    type: MessageStoreFetchDto
  })
  @ApiUnauthorizedResponse({ description: K.ERROR_CODES.UNAUTHORIZED.message })
  @ApiInternalServerErrorResponse({
    description: K.ERROR_CODES.DEFAULT.message
  })
  @ApiBadRequestResponse({ description: K.ERROR_CODES.BADREQUEST.message })
  getofferDetails(
    @Query() param: OfferListParamDto,
    @Param('storeId', new ParseIntPipe()) storeId: number
  ): Observable<MessageStoreFetchDto | Record<null, null>> {
    return this.storeService.getofferDetails(storeId, param);
  }

  @Roles(UserRoles.STORE_ADMIN, UserRoles.SUPER_ADMIN)
  @Get(':storeId/dashboard')
  @ApiBearerAuth()
  @ApiOperation({
    description: 'View store dashboard data'
  })
  @ApiOkResponse({
    description: 'Successfully fetched store dashboard data',
    type: StoreDashboardResponseDto
  })
  @ApiUnauthorizedResponse({ description: K.ERROR_CODES.UNAUTHORIZED.message })
  @ApiNotFoundResponse({ description: 'Id not found' })
  @ApiInternalServerErrorResponse({
    description: K.ERROR_CODES.DEFAULT.message
  })
  @ApiBadRequestResponse({ description: 'Invalid Id' })
  fetchStoreDashboardData(
    @Param('storeId', new ParseIntPipe()) storeId: number,
    @JwtBody() jwtBody: any
  ): Promise<StoreDashboardResponseDto | Record<null, null>> {
    return this.storeService.fetchStoreDashboardData(storeId, jwtBody);
  }

  @Get(':storeId/dashboard-piechart')
  @Roles(UserRoles.SUPER_ADMIN, UserRoles.STORE_ADMIN)
  @ApiBearerAuth()
  @ApiOperation({
    description:
      'API for fetching detail for pie chart to display section wise visit'
  })
  @UsePipes(new CustomValidationPipe())
  @ApiOkResponse({
    description: 'Successfully collected',
    type: StoresPiechartMessageDto
  })
  @ApiUnauthorizedResponse({ description: K.ERROR_CODES.UNAUTHORIZED.message })
  @ApiInternalServerErrorResponse({
    description: K.ERROR_CODES.DEFAULT.message
  })
  @ApiBadRequestResponse({ description: K.ERROR_CODES.BADREQUEST.message })
  getStorePiechartDetails(
    @Param('storeId', ParseIntPipe) storeId: number,
    @Query() param: ChartSpanTypeDto,
    @JwtBody() jwtBody
  ): Promise<StoresPiechartMessageDto | Record<null, null>> {
    return this.storeService.getStorePiechartDetails(storeId, param, jwtBody);
  }

  @Get(':storeId/dashboard-barchart')
  @Roles(UserRoles.SUPER_ADMIN, UserRoles.STORE_ADMIN)
  @ApiBearerAuth()
  @ApiOperation({
    description: `API for fetching detail for bar chart to
       display regular and new customer`
  })
  @UsePipes(new CustomValidationPipe())
  @ApiOkResponse({
    description: 'Successfully collected',
    type: StoresBarchartMessageDto
  })
  @ApiUnauthorizedResponse({ description: K.ERROR_CODES.UNAUTHORIZED.message })
  @ApiInternalServerErrorResponse({
    description: K.ERROR_CODES.DEFAULT.message
  })
  @ApiBadRequestResponse({ description: K.ERROR_CODES.BADREQUEST.message })
  getStoreBarchartDetails(
    @Param('storeId', ParseIntPipe) storeId: number,
    @Query() param: BarchartSpanDto,
    @JwtBody() jwtBody
  ): Promise<StoresBarchartMessageDto | Record<null, null>> {
    return this.storeService.getStoreBarchartDetails(storeId, param, jwtBody);
  }

  @Get(':storeId/dashboard-linegraph')
  @Roles(UserRoles.SUPER_ADMIN, UserRoles.STORE_ADMIN)
  @ApiBearerAuth()
  @ApiOperation({
    description: `API for fetching detail for line graph to display
       visitors count based on time.`
  })
  @UsePipes(new CustomValidationPipe())
  @ApiOkResponse({
    description: 'Successfully collected',
    type: StoresLinechartMessageDto
  })
  @ApiUnauthorizedResponse({ description: K.ERROR_CODES.UNAUTHORIZED.message })
  @ApiInternalServerErrorResponse({
    description: K.ERROR_CODES.DEFAULT.message
  })
  @ApiBadRequestResponse({ description: K.ERROR_CODES.BADREQUEST.message })
  getStoreVistorsTimeDetails(
    @Param('storeId', ParseIntPipe) storeId: number,
    @Query() param: LinechartSpanDto,
    @JwtBody() jwtBody
  ): Promise<StoresLinechartMessageDto | Record<null, null>> {
    return this.storeService.getStoreVistorsTimeDetails(
      storeId,
      param,
      jwtBody
    );
  }

  @Get(':storeid/section/:sectionid/offer/:offerId/products')
  @Roles(UserRoles.USER)
  @ApiBearerAuth()
  @UsePipes(new CustomValidationPipe())
  @ApiOperation({ description: 'Get offer wise product details' })
  @ApiOkResponse({
    description: 'Successfully fetched product details',
    type: OfferWiseProductMessageDto
  })
  @ApiUnauthorizedResponse({ description: K.ERROR_CODES.UNAUTHORIZED.message })
  @ApiInternalServerErrorResponse({
    description: K.ERROR_CODES.DEFAULT.message
  })
  @ApiBadRequestResponse({ description: K.ERROR_CODES.BADREQUEST.message })
  getOfferWiseProductDetails(
    @Param('storeid', new ParseIntPipe()) storeId: number,
    @Param('sectionid', new ParseIntPipe()) sectionId: number,
    @Param('offerId', new ParseIntPipe()) offerId: number,
    @Query() param: UserProductFilterOptionsDto,
    @JwtBody() jwtBody
  ): Observable<OfferWiseProductMessageDto | Record<null, null>> {
    return this.storeService.getOfferWiseProductDetails(
      storeId,
      sectionId,
      offerId,
      param,
      jwtBody
    );
  }

  @Get('countries')
  @Roles(UserRoles.USER, UserRoles.STORE_ADMIN, UserRoles.SUPER_ADMIN)
  @ApiBearerAuth()
  @ApiOperation({
    description: 'Get country data for filtering stores'
  })
  @ApiOkResponse({
    description: 'Successfully fetched country data for filtering stores',
    type: StoreCountryDataResponseDto
  })
  @ApiUnauthorizedResponse({ description: K.ERROR_CODES.UNAUTHORIZED.message })
  @ApiInternalServerErrorResponse({
    description: K.ERROR_CODES.DEFAULT.message
  })
  @ApiBadRequestResponse({ description: K.ERROR_CODES.BADREQUEST.message })
  fetchProductFilterData(): Observable<
  StoreCountryDataResponseDto | Record<null, null>
  > {
    return this.storeService.fetchStoreCountryData();
  }

  @Get('country/:countryId/states')
  @Roles(UserRoles.USER, UserRoles.STORE_ADMIN, UserRoles.SUPER_ADMIN)
  @ApiBearerAuth()
  @ApiOperation({
    description: 'Get state data for filtering stores'
  })
  @ApiOkResponse({
    description: 'Successfully fetched state data for filtering stores',
    type: StoreStateDataResponseDto
  })
  @ApiUnauthorizedResponse({ description: K.ERROR_CODES.UNAUTHORIZED.message })
  @ApiInternalServerErrorResponse({
    description: K.ERROR_CODES.DEFAULT.message
  })
  @ApiBadRequestResponse({ description: K.ERROR_CODES.BADREQUEST.message })
  fetchStoreStateData(
    @Param('countryId', new ParseIntPipe()) countryId: number
  ): Observable<
  StoreStateDataResponseDto | Record<null, null>
    > {
    return this.storeService.fetchStoreStateData(countryId);
  }

  @Get('state/:stateId/districts')
  @Roles(UserRoles.USER, UserRoles.STORE_ADMIN, UserRoles.SUPER_ADMIN)
  @ApiBearerAuth()
  @ApiOperation({
    description: 'Get district data for filtering stores'
  })
  @ApiOkResponse({
    description: 'Successfully fetched district data for filtering stores',
    type: StoreDistrictDataResponseDto
  })
  @ApiUnauthorizedResponse({ description: K.ERROR_CODES.UNAUTHORIZED.message })
  @ApiInternalServerErrorResponse({
    description: K.ERROR_CODES.DEFAULT.message
  })
  @ApiBadRequestResponse({ description: K.ERROR_CODES.BADREQUEST.message })
  fetchStoreDistrictData(
    @Param('stateId', new ParseIntPipe()) stateId: number
  ): Observable<
  StoreDistrictDataResponseDto | Record<null, null>
    > {
    return this.storeService.fetchStoreDistrictData(stateId);
  }

  @Get('last-visited')
  @Roles(UserRoles.USER)
  @ApiBearerAuth()
  @UsePipes(new CustomValidationPipe())
  @ApiOperation({ description: 'Get last visited store details' })
  @ApiOkResponse({
    description: 'Successfully fetched last visited store details',
    type: LastVisitedStoresResponseDto
  })
  @ApiUnauthorizedResponse({ description: K.ERROR_CODES.UNAUTHORIZED.message })
  @ApiInternalServerErrorResponse({
    description: K.ERROR_CODES.DEFAULT.message
  })
  @ApiBadRequestResponse({ description: K.ERROR_CODES.BADREQUEST.message })
  fetchLastVisitedStoresData(
    @JwtBody() jwtBody,
    @Query() param: LastVisitedStoresDto,
  ): Observable<LastVisitedStoresResponseDto | Record<null, null>> {
    return this.storeService.fetchLastVisitedStoresData(
      jwtBody, 
      param
    );
  }
}
