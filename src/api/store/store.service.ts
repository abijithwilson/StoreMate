import {
  fetchLastVisitedStoresQuery,
  fetchStoresQuery,
  fetchStoreWiseProductListQuery,
  offerWiseProductFetchQuery,
  storeCountryFetchQuery,
  storeDistrictFetchQuery,
  storeNameQuery,
  storeOfferFetchDetailQuery,
  storeSectionBarchartQuery,
  storeSectionPiechartQuery,
  storeStateFetchQuery,
  unAssigninofferQuery,
  userProductFetchQuery,
  vistorsLineGraphQuery
} from './../db-queries/stores.query';
import {
  AssigningOfferDto,
  BarchartSpanDto,
  ChartSpanTypeDto,
  CountriesFilterData,
  DeleteRewardPointsDto,
  DistrictsFilterData,
  FetchRewardDetailsOfStoreDto,
  FetchStoreWiseProducts,
  FetchStoreWiseProductsPagination,
  FetchStoreWiseProductsResponse,
  LastVisitedStores,
  LastVisitedStoresDto,
  LastVisitedStoresResponseDto,
  LinechartSpanDto,
  MessageSkuUnderStore,
  MessageStoreFetchDto,
  OfferWiseProduct,
  OfferWiseProductMessageDto,
  RewardDetailsOfStoreResponseDto,
  RewardIdDto,
  SingleBarchartDto,
  SingleLinechartDto,
  SkuUnderStore,
  StatesFilterData,
  StoreCountryDataResponseDto,
  StoreListFetchDto,
  StoreListFetchResponseDto,
  StoreListParamDto,
  StoreNameDto,
  StoreNameFetchDto,
  StoreOfferIdDto,
  StoreRewardDto,
  StoreRewardEditDto,
  StoresBarchartMessageDto,
  StoresLinechartMessageDto,
  StoresPiechartDto,
  StoresPiechartMessageDto,
  StoreStateDataResponseDto,
  StoreWithoutRewardsDto,
  UnAssigningOfferDto,
  UpdateSkuUnderStoreDto,
  UserProductFilterOptionsDto
} from './../dto/store.dto';
import {
  BadRequestException,
  Injectable,
  NotFoundException,
  UnauthorizedException
} from '@nestjs/common';
import { map, Observable, firstValueFrom } from 'rxjs';
import { DatabaseService } from 'src/database/database.service';
import { UtilsService } from 'src/utils/utils.service';
import {
  fetchStoreWithoutRewardQuery,
  insertStoreRewardPointsQuery,
  listAllStoresQuery,
  listSingleStoreQuery,
  nearbyStoresQuery,
  rewardDetailsFetchQuery,
  StoreRewardUpdateQuery,
  skuUnderStoreAndProductQuery,
  DeleteSkuUnderStore,
  insertSkuUnderStore
} from '../db-queries/stores.query';
import {
  FetchAllStorePagination,
  StoreIdDto,
  StoreFetchDto,
  StoreUpdateDto,
  StoreDto,
  NearbyStoreDto,
  NearbyStoreResultDto,
  SingleStoreDetailsDto
} from '../dto/store.dto';
import * as K from '../../shared/constants';
import { MessageDto } from '../dto/auth.dto';
import { AdminJwtBody } from '../dto/adminJwtBody.dto';
import * as format from 'pg-format';
import { JwtBody } from '../dto/jwt.dto';
import { StoreHelperService } from 'src/helper/store.helper';
import { UserProductFetchDto } from '../dto/product.dto';
import { OfferListParamDto } from '../dto/offer.dto';
import {
  StoreDashboardDto,
  StoreDashboardResponseDto
} from '../dto/store-admin.dto';
import { UserRoles } from '../dto/roles.dto';
import { fetchStoreDashboardDataQuery } from '../db-queries/store-admin.query';

@Injectable()
export class StoreService {
  constructor(
    private readonly databaseService: DatabaseService<any>,
    private storeHelperService: StoreHelperService
  ) {}

  createStore(
    createBody: StoreDto,
    jwtBody: AdminJwtBody
  ): Observable<MessageDto | Record<null, null>> {
    createBody['updatedBy'] = jwtBody.id;
    const createQueryAndValue = UtilsService.generateInsertQuery(
      K.TABLE_NAMES.STORE,
      K.PRIMARY_KEYS.STORE,
      createBody,
      []
    );

    const createQuery = format(
      createQueryAndValue.query,
      createQueryAndValue.value
    );

    return this.databaseService.rawQuery(createQuery, [], StoreDto).pipe(
      map((result) => {
        if (result.length == 0)
          throw new Error('Error in creation of store, try again..!!');
        return { message: 'store created successfully' };
      })
    );
  }

  deleteStore(id: number) {
    const deleteQuery = UtilsService.generateSoftDeleteQuery({
      tableName: K.TABLE_NAMES.STORE,
      primaryKey: K.PRIMARY_KEYS.STORE,
      value: id
    });
    return this.databaseService
      .rawQuery(deleteQuery.query, [], StoreIdDto)
      .pipe(
        map((result) => {
          if (result.length == 0) throw new NotFoundException();
          return { message: 'store deleted successfully' };
        })
      );
  }

  /**
   * Fetch the detail of single store
   * @param id - id of store
   * @returns - store details
   */
  getSingleStoreDetails(
    id: number
  ): Observable<SingleStoreDetailsDto | Record<null, null>> {
    return this.databaseService
      .rawQuery(listSingleStoreQuery, [id], SingleStoreDetailsDto)
      .pipe(
        map((result) => {
          if (result.length == 0) throw new NotFoundException();
          return {
            message: 'Store details fetched successfully',
            data: result
          };
        })
      );
  }

  getStoreDetails(
    param: FetchAllStorePagination
  ): Observable<MessageDto | Record<null, null>> {
    const {
      offset,
      limit,
      name,
      sortName,
      sortDistrict,
      id,
      filterCountry,
      filterDistrict,
      filterState
    } = param;
    let orderSql = '';
    if (sortDistrict || sortName) {
      const sortArray = this.getSortQueryForStoreFetch(sortDistrict, sortName);
      orderSql = `ORDER BY ${sortArray.join(',')}`;
    }
    const query = ` ${listAllStoresQuery} 
    AND ($1::text is null or store_name LIKE '%${name}%' ) AND 
    ($2::text is null or CAST(store_id AS TEXT) LIKE '%${id}%')      
    AND ($3::text is null or countries.country_id IN (${
  filterCountry ? JSON.parse(filterCountry).join(',') : null
}))  
    AND ($4::text is null or states.state_id IN (${
  filterState ? JSON.parse(filterState).join(',') : null
})) 
    AND ($5::text is null or districts.district_id IN (${
  filterDistrict ? JSON.parse(filterDistrict).join(',') : null
})) ${
  sortDistrict || sortName ? orderSql : 'order by m_store.updated_at DESC'
}
    ${limit ? `limit ${limit}` : ''}
    ${offset ? `offset ${offset}` : ''}
    `;
    const dataValue = [
      name ? name : null,
      id ? id : null,
      filterCountry ? filterCountry : null,
      filterState ? filterState : null,
      filterDistrict ? filterDistrict : null
    ];
    return this.databaseService.rawQuery(query, dataValue, StoreFetchDto).pipe(
      map((resultData) => {
        return {
          message: 'Store detail Fetched successfully',
          data: resultData,
          pagination: {
            total: resultData.length === 0 ? 0 : resultData[0].count
          }
        };
      })
    );
  }

  updateStoreProfile(
    id: number,
    body: StoreUpdateDto,
    jwtBody: any
  ): Observable<MessageDto | Record<null, null>> {
    body['updatedBy'] = jwtBody.id;
    const updateQueryAndValue = UtilsService.generateUpdateQuery({
      tableName: K.TABLE_NAMES.STORE,
      primaryKey: K.PRIMARY_KEYS.STORE,
      keysToIgnore: [K.PRIMARY_KEYS.STORE],
      whereCondition: `${K.PRIMARY_KEYS.STORE}=${id}`,
      columnData: body
    });
    return this.databaseService
      .rawQuery(updateQueryAndValue.query, updateQueryAndValue.data, StoreIdDto)
      .pipe(
        map(() => {
          return { message: 'Updated store detail successfully' };
        })
      );
  }

  getSortQueryForStoreFetch(
    sortDistrict: string,
    sortName: string
  ): Array<string> {
    const sortArray = [];

    if (sortDistrict) {
      sortArray.push(
        `${K.TABLE_NAMES.DISTRICT}.${K.DISTRICT_NAME} 
        ${sortDistrict === 'true' ? 'ASC' : 'DESC'}`
      );
    }

    if (sortName) {
      sortArray.push(`${K.STORE_NAME}  
      ${sortName === 'true' ? 'ASC' : 'DESC'}`);
    }

    return sortArray;
  }

  fetchStoreName(
    param: StoreNameFetchDto
  ): Observable<MessageDto | Record<null, null>> {
    const { storeName } = param;
    const { query, dataValue } = storeNameQuery(storeName);
    return this.databaseService.rawQuery(query, dataValue, StoreNameDto);
  }

  /**
   * The function is to fetch the nearby stores of a user
   * @param jwtBody the payload present in jwt token
   * @param param The body containing data required for fetching
   * {@link param || NearbyStoreDto}
   * @returns Success message along with fetched stores data
   */

  viewNearbyStores(
    jwtBody: JwtBody,
    param: NearbyStoreDto
  ): Observable<MessageDto | Record<null, null>> {
    const { longitude, latitude, limit, offset } = param;

    const query = `${nearbyStoresQuery(latitude, longitude)} 
    ${limit ? `limit ${limit}` : ''}
    ${offset ? `offset ${offset}` : ''}`;

    return this.databaseService.rawQuery(query, [], NearbyStoreResultDto).pipe(
      map((resultData) => {
        return {
          message: 'Nearby stores fetched successfully',
          data: resultData,
          pagination: {
            total: resultData.length
          }
        };
      })
    );
  }

  /**
   * Function is to bulk delete reward
   * @param param - contain array of rewardId to delete
   *  {@link param || NearbyStoreDto}
   * @returns - success message
   */
  deleteRewardPoints(
    param: DeleteRewardPointsDto
  ): Observable<MessageDto | Record<null, null>> {
    const { rewardId } = param;
    const query = UtilsService.generateBulkDeleteQuery({
      tableName: K.TABLE_NAMES.REWARD,
      primaryKey: K.PRIMARY_KEYS.REWARD,
      value: rewardId
    });
    return this.databaseService.rawQuery(query, [], RewardIdDto).pipe(
      map((result) => {
        return {
          message:
            result.length === rewardId.length ?
              'Deleted all entries successfully' :
              'Partial deletion occured'
        };
      })
    );
  }

  /**
   *
   * @param jwtBody contains the payload details of super admin
   * @param param contains offset or limit for pagination
   * @returns returns fetched data along with success message
   */
  viewStoreRewardDetails(
    jwtBody: any,
    param: FetchRewardDetailsOfStoreDto
  ): Observable<MessageDto | Record<null, null>> {
    const { limit, offset } = param;
    const query = `${rewardDetailsFetchQuery} 
    ${limit ? `limit ${limit}` : ''}
    ${offset ? `offset ${offset}` : ''}`;

    return this.databaseService
      .rawQuery(query, [], RewardDetailsOfStoreResponseDto)
      .pipe(
        map((resultData) => {
          return {
            message: 'Store reward details fetched successfully',
            data: resultData,
            pagination: {
              total: resultData.length === 0 ? 0 : resultData[0].count
            }
          };
        })
      );
  }

  /**
   *
   * @param createBody Request body which contains the data to be inserted
   * @param jwtBody Contains the payload that includes details of super admin
   * @returns A success message after insertion of data
   */

  insertStoreRewardPoints(
    createBody: StoreRewardDto,
    jwtBody: any
  ): Observable<MessageDto | Record<null, null>> {
    const { id } = jwtBody;
    const { totalPoints, perVisitPoints, storeId } = createBody;
    if (totalPoints <= perVisitPoints) {
      throw new BadRequestException();
    }
    const assignedStoreIdValues = storeId ? storeId.join() : '';
    const rewardPointQuery = insertStoreRewardPointsQuery(
      assignedStoreIdValues
    );

    return this.databaseService
      .rawQuery(
        rewardPointQuery,
        [perVisitPoints, totalPoints, id],
        StoreRewardDto
      )
      .pipe(
        map(() => {
          return { message: 'Inserted reward points successfully' };
        })
      );
  }

  /**
   * This API is to fetch store id and name of
   * stores with no assigned reward point details
   * @returns returns fetched store details
   */

  storeWithoutRewards(): Observable<MessageDto | Record<null, null>> {
    const query = fetchStoreWithoutRewardQuery;
    return this.databaseService
      .rawQuery(query, [], StoreWithoutRewardsDto)
      .pipe(
        map((resultData) => {
          return {
            message: 'Fetched store details successfully',
            data: resultData
          };
        })
      );
  }

  /**
   * Function is to insert and delete sku from store
   * @param storeId - Id of the store to update the SKU
   * @param productId - Id of the product
   * @param jwtBody -Contains the payload that includes details of super admin
   * @param body - which contain the detail for updating sku
   * @returns returns success message
   */

  async updateSkuUnderStore(
    storeId: number,
    productId: number,
    jwtBody: any,
    body: UpdateSkuUnderStoreDto
  ): Promise<MessageDto> {
    const { deletedSkuId, createdSkuId } = body;
    const { id } = jwtBody;
    const storeStatus = await this.storeHelperService.checkStoreUnderAdmin(
      storeId,
      id
    );

    if (!storeStatus) throw new UnauthorizedException();

    if (deletedSkuId.length !== 0) {
      const query = DeleteSkuUnderStore(deletedSkuId);
      const deleteStatus: StoreIdDto[] = await firstValueFrom(
        this.databaseService.rawQuery(query, deletedSkuId, StoreIdDto)
      );
      if (deleteStatus.length === 0) throw new NotFoundException();
    }
    if (createdSkuId.length !== 0) {
      const query = insertSkuUnderStore(createdSkuId);
      const instertStatus: StoreIdDto[] = await firstValueFrom(
        this.databaseService.rawQuery(query, [storeId, productId], StoreIdDto)
      );
      if (instertStatus.length === 0) throw new BadRequestException();
    }
    return {
      message: 'Successfully updated'
    };
  }

  /**
   * Function is to fetch all SKU listed under store
   * for a particular product and also the SKU not
   *  listed in the store
   * @param storeId - Id of the store to fetch the listed SKU
   * @param productId - Id of the product
   * @param jwtBody -Contains the payload that includes details of super admin
   * @returns returns fetched store details
   */
  async getSkuDetailUnderStore(
    storeId: number,
    productId: number,
    jwtBody: any
  ): Promise<MessageSkuUnderStore> {
    const { id } = jwtBody;
    const status = await this.storeHelperService.checkStoreUnderAdmin(
      storeId,
      id
    );

    if (!status) throw new UnauthorizedException();
    const getAllSku: SkuUnderStore[] = await firstValueFrom(
      this.databaseService.rawQuery(
        skuUnderStoreAndProductQuery,
        [productId, storeId],
        SkuUnderStore
      )
    );

    return {
      message: 'Successfully collected',
      data: getAllSku
    };
  }

  /**
   * This API is to update reward details of multiple/single store
   * @param updateBody The body which contains data to update
   * @param jwtBody Contains the payload that includes details of super admin
   * @returns A success message upon update
   */
  updateStoreRewardPoints(
    updateBody: StoreRewardEditDto,
    jwtBody: any
  ): Observable<MessageDto | Record<null, null>> {
    const { storeId, totalPoints, perVisitPoints } = updateBody;
    if (totalPoints <= perVisitPoints) {
      throw new BadRequestException();
    }
    const { id } = jwtBody;
    const dataValue = [totalPoints, perVisitPoints, id, ...storeId];
    const query = StoreRewardUpdateQuery(storeId);
    return this.databaseService
      .rawQuery(query, dataValue, StoreRewardEditDto)
      .pipe(
        map(() => {
          return {
            message: 'Updated store reward details successfully'
          };
        })
      );
  }

  /**
   * Functionality for fetching store wise products list.
   * @param storeId - Id of the particular store.
   * @param param - consists of limit, offset and option for filtering category.
   * {@link param || FetchStoreWiseProductsPagination}
   * @param jwtBody - token body
   * @returns - a success message and product list.
   */

  async fetchStoreWiseProductList(
    storeId: number,
    param: FetchStoreWiseProductsPagination,
    jwtBody: any
  ): Promise<FetchStoreWiseProductsResponse> {
    const { id } = jwtBody;
    const { limit, offset, filterCategory } = param;
    const dataValue = [storeId];
    let query = fetchStoreWiseProductListQuery;
    if (filterCategory) {
      query = `${query} and mp.category_id = $2`;
      dataValue.push(filterCategory);
    }
    query = `${query} order by mp.updated_by DESC`;
    query = `${query}
    ${limit ? `limit ${limit}` : ''}
    ${offset ? `offset ${offset}` : ''}
    `;
    const status = await this.storeHelperService.checkStoreUnderAdmin(
      storeId,
      id
    );
    if (!status) throw new UnauthorizedException();
    const getAllProducts: FetchStoreWiseProducts[] = await firstValueFrom(
      this.databaseService.rawQuery(query, dataValue, FetchStoreWiseProducts)
    );
    return {
      message: 'Successfully collected',
      data: getAllProducts,
      pagination: {
        total: getAllProducts.length === 0 ? 0 : getAllProducts[0].count
      }
    };
  }

  /**
   * This API is used to fetch the product details for user.
   * @param storeId Id of store as path param
   * @param sectionId If of section as path param
   * @param param Body containing details to filter and sort data
   * @returns Fetch the product details for user
   */
  /* eslint-disable */
  getProductAndSkuDetails(
    storeId: number,
    sectionId: number,
    param: UserProductFilterOptionsDto,
    jwtBody: any
  ): Observable<MessageDto | Record<null, null>> {
    const {
      searchName,
      sortPrice,
      filterCategory,
      filterSize,
      filterColour,
      filterPriceHigh,
      filterPriceLow,
      limit,
      offset
    } = param;
    const { id } = jwtBody;
    let { query } = userProductFetchQuery(
      filterCategory,
      filterColour,
      filterSize
    );
    const { dataValue } = userProductFetchQuery(
      filterCategory,
      filterColour,
      filterSize
    );
    if (filterPriceHigh && filterPriceLow) {
      query = `${query} AND 
      (select (base_price - (sale_price_discount_percent * base_price)/100)
      from m_sku_table where product_id=mp.id and default_product=true)
       BETWEEN ${filterPriceLow} AND ${filterPriceHigh}`;
    }
    query = `${query} 
    group by mp.id, mp.product_name, mp.category_id, mc.name
    ${
      sortPrice
        ? `ORDER BY discount_price ${sortPrice === 'true' ? 'ASC' : 'DESC'}`
        : 'ORDER BY mp.updated_at'
    }
       ${limit ? `limit ${limit}` : ''}
       ${offset ? `offset ${offset}` : ''}`;
    const searchValue = searchName ? `%${searchName}%` : null;
    return this.databaseService
      .rawQuery(
        query,
        [storeId, sectionId, id, searchValue, ...dataValue],
        UserProductFetchDto
      )
      .pipe(
        map((resultData) => {
          return {
            message: 'Fetched product details successfully',
            data: resultData,
            pagination: {
              total: resultData.length === 0 ? 0 : resultData[0].count
            }
          };
        })
      );
  }
  /* eslint-enable */
  getofferDetails(
    id: number,
    param: OfferListParamDto
  ): Observable<MessageStoreFetchDto | Record<null, null>> {
    const { sortField, sortOrder, searchName, limit, offset } = param;
    if (sortField) {
      if (!Object.keys(K.OFFER_LIST_SORT).includes(sortField))
        throw new BadRequestException();
    }
    const dataValue = [id, searchName ? `%${searchName}%` : null];
    const query = storeOfferFetchDetailQuery(
      sortField,
      sortOrder,
      limit,
      offset
    );

    return this.databaseService
      .rawQuery(query, dataValue, MessageStoreFetchDto)
      .pipe(
        map((resultData) => {
          return {
            message: 'Fetched offer details successfully',
            data: resultData,
            pagination: {
              total: resultData.length === 0 ? 0 : resultData[0].count
            }
          };
        })
      );
  }

  /**
   * Functionality for assigning offer to store
   * @param body - contains the id of offer and store
   * @returns - a success message
   */
  assignOfferToStore(
    body: AssigningOfferDto
  ): Observable<MessageDto | Record<null, null>> {
    const { query, value } = UtilsService.generateInsertQuery(
      K.TABLE_NAMES.STORE_OFFER_MAP,
      K.PRIMARY_KEYS.STORE_OFFER_MAP,
      body,
      []
    );

    const finalQuery = format(query, value);
    return this.databaseService.rawQuery(finalQuery, [], MessageDto).pipe(
      map(() => {
        return {
          message: 'Offer assigned Successfully'
        };
      })
    );
  }

  /**
   * Functionality for unassigning offer to store
   * @param body - contains the id of offer and store
   * @returns - a success message
   */
  unAssignOfferToStore(
    body: UnAssigningOfferDto
  ): Observable<MessageDto | Record<null, null>> {
    const { storeId, offerId } = body;
    return this.databaseService
      .rawQuery(unAssigninofferQuery, [storeId, offerId], StoreOfferIdDto)
      .pipe(
        map((result) => {
          if (result.length === 0) throw new NotFoundException();
          return {
            message: 'Offer unassigned Successfully'
          };
        })
      );
  }

  /**
   * Functionality for store-admin to fetch store list
   * based on country, state and district.
   * @param param -  filter options for country, state and
   * district.{@link param || StoreListParamDto}
   * @param jwtBody - token body
   * @returns - a success message and store list.
   */
  fetchStoreList(
    param: StoreListParamDto
  ): Observable<StoreListFetchResponseDto | Record<null, null>> {
    const { filterCountry, filterState, filterDistrict } = param;
    return this.databaseService
      .rawQuery(
        fetchStoresQuery,
        [filterCountry, filterState, filterDistrict],
        StoreListFetchDto
      )
      .pipe(
        map((result) => {
          return {
            message: 'Store list fetched successfully',
            data: result
          };
        })
      );
  }

  /**
   * Functionality for fetching store dashboard data.
   * @param storeId - store id
   * @param jwtBody - token body
   * @returns - a success message and data
   * {@link param || StoreDashboardResponseDto}
   */
  async fetchStoreDashboardData(
    storeId: number,
    jwtBody: any
  ): Promise<StoreDashboardResponseDto | Record<null, null>> {
    const { id, role } = jwtBody;
    if (role === UserRoles.STORE_ADMIN) {
      const status = await this.storeHelperService.checkStoreUnderAdmin(
        storeId,
        id
      );
      if (!status) throw new UnauthorizedException();
    }
    const storeDashData: StoreDashboardDto[] = await firstValueFrom(
      this.databaseService.rawQuery(
        fetchStoreDashboardDataQuery,
        [storeId],
        StoreDashboardDto
      )
    );
    if (storeDashData.length === 0) throw new NotFoundException();
    return {
      message: 'Successfully fetched store dashboard data',
      data: storeDashData[0]
    };
  }

  /**
   * Functionality for fetching section-wise data for generating pie chart
   * @param storeId - id of the store {@link param || BarchartTypeDto}
   * @param param - which contain the span detail for pie chart
   * @param jwtBody - which contain detail of admin
   * @returns a success message with the data
   */
  async getStorePiechartDetails(
    storeId: number,
    param: ChartSpanTypeDto,
    jwtBody: any
  ): Promise<StoresPiechartMessageDto | Record<null, null>> {
    const { id, role } = jwtBody;

    const { span } = param;
    if (role === UserRoles.STORE_ADMIN) {
      const status = await this.storeHelperService.checkStoreUnderAdmin(
        storeId,
        id
      );
      if (!status) throw new UnauthorizedException();
    }

    if (span) {
      if (!Object.keys(K.SPAN_TYPE).includes(span))
        throw new BadRequestException();
    }

    const query = storeSectionPiechartQuery(span);
    const data: StoresPiechartDto[] = await firstValueFrom(
      this.databaseService.rawQuery(query, [storeId], StoresPiechartDto)
    );
    return {
      message: 'Sucessfully fetched',
      data: data.length !== 0 ? data[0] : []
    };
  }

  /**
   * Functionality for fetching the vistors count according to time
   * @param storeId - id of the store
   * @param param - contail detail of pagination and span
   * @param jwtBody - contain detail of admin
   * @returns - return a sucess message
   */
  async getStoreVistorsTimeDetails(
    storeId: number,
    param: LinechartSpanDto,
    jwtBody: any
  ): Promise<StoresLinechartMessageDto | Record<null, null>> {
    const { id, role } = jwtBody;
    const { span, limit, offset } = param;
    if (role === UserRoles.STORE_ADMIN) {
      const status = await this.storeHelperService.checkStoreUnderAdmin(
        storeId,
        id
      );
      if (!status) throw new UnauthorizedException();
    }

    if (span) {
      if (!Object.keys(K.SPAN_TYPE).includes(span))
        throw new BadRequestException();
    }
    const query = vistorsLineGraphQuery(span, limit, offset);
    const data: SingleLinechartDto[] = await firstValueFrom(
      this.databaseService.rawQuery(query, [storeId], SingleLinechartDto)
    );
    return {
      message: 'Sucessfully fetched',
      data: data.length !== 0 ? data : []
    };
  }

  /**
   * Functionality for fetching detail for bar chart
   * @param storeId id of the store
   * @param param - conatin the detail of span {@link param || BarchartTypeDto}
   * @param jwtBody - conatin the detail of admin
   * @returns - a list of data for bar chart
   */
  async getStoreBarchartDetails(
    storeId: number,
    param: BarchartSpanDto,
    jwtBody: any
  ): Promise<StoresBarchartMessageDto | Record<null, null>> {
    const { id, role } = jwtBody;
    const { span, limit, offset } = param;
    if (role === UserRoles.STORE_ADMIN) {
      const status = await this.storeHelperService.checkStoreUnderAdmin(
        storeId,
        id
      );
      if (!status) throw new UnauthorizedException();
    }

    if (span) {
      if (!Object.keys(K.SPAN_TYPE).includes(span))
        throw new BadRequestException();
    }

    const query = storeSectionBarchartQuery(span, limit, offset);
    const data: SingleBarchartDto[] = await firstValueFrom(
      this.databaseService.rawQuery(query, [storeId], SingleBarchartDto)
    );
    return {
      message: 'Sucessfully fetched',
      data: data.length !== 0 ? data : []
    };
  }

  /**
   * This API is used to fetch the product details under offer.
   * @param storeId Id of store as path param
   * @param sectionId Id of section as path param
   * @param offerId Id of offer as path param
   * @param param Body containing details to filter and sort data
   * @returns Fetch the product details for user
   */
  /* eslint-disable */
  getOfferWiseProductDetails(
    storeId: number,
    sectionId: number,
    offerId: number,
    param: UserProductFilterOptionsDto,
    jwtBody: any
  ): Observable<OfferWiseProductMessageDto | Record<null, null>> {
    const { id } = jwtBody;
    const {
      searchName,
      filterCategory,
      filterSize,
      filterColour,
      filterPriceHigh,
      filterPriceLow,
      sortPrice,
      limit,
      offset
    } = param;
    let { query } = offerWiseProductFetchQuery(
      filterCategory,
      filterColour,
      filterSize
    );
    const { dataValue } = offerWiseProductFetchQuery(
      filterCategory,
      filterColour,
      filterSize
    );
    const searchValue = searchName ? `%${searchName}%` : null;
    if (filterPriceHigh && filterPriceLow) {
      query = `${query} AND 
      (select (base_price - (sale_price_discount_percent * base_price)/100)
      from m_sku_table where product_id=mp.id and default_product=true)
       BETWEEN ${filterPriceLow} AND ${filterPriceHigh}`;
    }
    query = `${query} 
    group by mp.id ,mp.product_name ,mp.category_id ,mc."name" 
    ${
      sortPrice
        ? `ORDER BY discount_price ${sortPrice === 'true' ? 'ASC' : 'DESC'}`
        : 'ORDER BY mp.updated_at'
    }
       ${limit ? `limit ${limit}` : ''}
       ${offset ? `offset ${offset}` : ''}`;
    return this.databaseService
      .rawQuery(
        query,
        [storeId, offerId, sectionId, id, searchValue, ...dataValue],
        OfferWiseProduct
      )
      .pipe(
        map((result) => {
          return {
            message: 'Product list fetched successfully',
            data: result,
            pagination: {
              total: result.length === 0 ? 0 : result[0].count
            }
          };
        })
      );
  }
  /* eslint-enable */

  /**
   * Funcationality for fetching country, state and district based on
   * available stores.
   * @returns - a success message and location data
   */

  fetchStoreCountryData(): Observable<
    StoreCountryDataResponseDto | Record<null, null>
    > {
    return this.databaseService
      .rawQuery(storeCountryFetchQuery, [], CountriesFilterData)
      .pipe(
        map((resultData) => {
          return {
            message: 'Successfully fetched store country data',
            data: resultData
          };
        })
      );
  }

  fetchStoreStateData(
    countryId: number
  ): Observable<StoreStateDataResponseDto | Record<null, null>> {
    return this.databaseService
      .rawQuery(storeStateFetchQuery, [countryId], StatesFilterData)
      .pipe(
        map((resultData) => {
          return {
            message: 'Successfully fetched store state data',
            data: resultData
          };
        })
      );
  }

  fetchStoreDistrictData(
    stateId: number
  ): Observable<StoreStateDataResponseDto | Record<null, null>> {
    return this.databaseService
      .rawQuery(storeDistrictFetchQuery, [stateId], DistrictsFilterData)
      .pipe(
        map((resultData) => {
          return {
            message: 'Successfully fetched store district data',
            data: resultData
          };
        })
      );
  }
  /**
   * Functionality for fetching last visited store details
   * @param jwtBody - token body
   * @param param - consists of limit, offset & search option
   * @returns - a success message and store visit data
   */
  fetchLastVisitedStoresData(
    jwtBody: any,
    param: LastVisitedStoresDto
  ): Observable<LastVisitedStoresResponseDto | Record<null, null>> {
    const { id } = jwtBody;
    const { limit, offset, searchName } = param;
    const query = fetchLastVisitedStoresQuery(limit, offset);
    return this.databaseService
      .rawQuery(query, [id, searchName], LastVisitedStores)
      .pipe(
        map((resultData) => {
          return {
            message: 'Successfully fetched last visited store details',
            data: resultData
          };
        })
      );
  }
}
