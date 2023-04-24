import {
  FetchWishlistProductsPaginationDto,
  FetchWishlistProductsDto,
  FetchWishlistProductsResponseDto,
  WishlistProductAssignDto,
  FetchProductFilterData,
  ProductFilterData,
  ProductFilterDataResponse,
  SectionVisitParamDto,
  SectionVisitDataDto,
  SectionVisitDataResponseDto
} from './../dto/section.dto';
import {
  BadRequestException,
  Injectable,
  NotFoundException,
  UnauthorizedException
} from '@nestjs/common';
import { firstValueFrom, map, Observable } from 'rxjs';
import { DatabaseService } from 'src/database/database.service';
import {
  assignProductSection,
  fetchDetailsOfAProductInASection,
  getSectionAndSectionNotListedInStoreQuery,
  assignSectionQuery,
  listStoreWiseSectionsQuery,
  ProductsNotAssignedToAnySection,
  sectionUnderStoreDropdownQuery,
  sectionWiseProductUnassignQuery,
  unAssignSection,
  fetchSectionWiseCategoryListQuery,
  fetchWishlistProductsQuery,
  fetchSectionWiseOfferListQuery,
  unAssignProductFromWishlistQuery,
  fetchProductFiltersQuery,
  fetchSectionVisitsQuery
} from '../db-queries/section.query';
import {
  FetchStoreWiseSectionsPaginationDto,
  MessageSectionDropDownList,
  SectionDropDownList,
  ProductIdDto,
  SectionMessageDto,
  SectionProductMapId,
  SectionUnderStoreQueryParam,
  StoreWiseSectionDto,
  StoreWiseSectionResponseDto,
  AssignProductSectionDto,
  AssignSectionDto,
  SectionIdDto,
  UpdateSectionDto,
  SectionQueryDto,
  SectionFetchDto,
  SectionWiseCategoriesDto,
  SectionWiseCategoriesPaginationDto,
  FetchCategoryListResponseDto,
  FetchOfferListResponseDto,
  SectionWiseOfferDto
} from '../dto/section.dto';
import { StoreHelperService } from 'src/helper/store.helper';
import {
  FetchSingleColourAndSizeSkuDetails,
  FetchSingleProductDetailsResponseDto,
  ProductFetchResponseDto
} from '../dto/product.dto';
import { UtilsService } from 'src/utils/utils.service';
import * as K from '../../shared/constants';
import { UserRoles } from '../dto/roles.dto';
import * as format from 'pg-format';
@Injectable()
export class SectionService {
  constructor(
    private readonly databaseService: DatabaseService<any>,
    private storeHelperService: StoreHelperService
  ) {}

  /**
   * Functionality to assign a new section in store
   * @param body - which contain the detail for adding new section
   * @param jwtBody  - which contain the detail of jwt token
   *  @returns a success message
   */
  assignSection(
    body: AssignSectionDto,
    storeId: number
  ): Observable<SectionMessageDto | Record<null, null>> {
    const { sectionId } = body;
    const query = assignSectionQuery(sectionId);
    return this.databaseService.rawQuery(query, [storeId], SectionIdDto).pipe(
      map(() => {
        return {
          message: 'Section assigned successfully'
        };
      })
    );
  }

  /**
   * Functionality to unassign section
   * @param sectionId - which contain the id of section to unassign
   * @param storeId - which contain the id of store
   * @param jwtBody  - which contain the detail of jwt token
   * @returns  a success message
   */
  async unAssignSection(
    sectionId: number,
    storeId: number,
    jwtBody: any
  ): Promise<SectionMessageDto> {
    const { id } = jwtBody;
    const storeStatus = await this.storeHelperService.checkStoreUnderAdmin(
      storeId,
      id
    );

    if (!storeStatus) throw new UnauthorizedException();

    const deleteStatus: SectionIdDto[] = await firstValueFrom(
      this.databaseService.rawQuery(
        unAssignSection,
        [storeId, sectionId],
        SectionIdDto
      )
    );
    if (deleteStatus.length === 0) throw new NotFoundException();
    return {
      message: 'Sucessfully deleted section'
    };
  }

  /**
   * Functionality to section the store name
   * @param sectionId - which contain the id of section to update
   * @param storeId - which contain the id of store
   * @param body - which contain the detail for update
   * @param jwtBody  - which contain the detail of jwt token
   * @returns  a success message
   */
  async updateSection(
    sectionId: number,
    storeId: number,
    jwtBody: any,
    body: UpdateSectionDto
  ): Promise<SectionMessageDto> {
    const { id } = jwtBody;
    const storeStatus = await this.storeHelperService.checkStoreUnderAdmin(
      storeId,
      id
    );

    if (!storeStatus) throw new UnauthorizedException();

    const sectionStatus = await this.storeHelperService.checkSectionUnderStore(
      storeId,
      sectionId
    );

    if (!sectionStatus) throw new NotFoundException();

    body['updatedBy'] = id;
    const { query, data } = UtilsService.generateUpdateQuery({
      tableName: K.TABLE_NAMES.SECTION,
      columnData: body,
      primaryKey: K.PRIMARY_KEYS.SECTION,
      keysToIgnore: [],
      whereCondition: `${K.PRIMARY_KEYS.SECTION}=${sectionId}`
    });

    const updateStatus: SectionIdDto[] = await firstValueFrom(
      this.databaseService.rawQuery(query, data, SectionIdDto)
    );

    if (updateStatus.length === 0) {
      throw new BadRequestException();
    }
    return {
      message: 'Sucessfully updated  section name'
    };
  }

  /**
   * For the store-admin to view store wise section list.
   * @param storeId - store id
   * @param param - limit and offset.  
     {@link param || FetchStoreWiseSectionsPaginationDto}
   * @param jwtBody - token body
   * @returns - a success message and section data.
   */

  async getStoreSectionDetails(
    storeId: number,
    param: FetchStoreWiseSectionsPaginationDto,
    jwtBody: any
  ): Promise<StoreWiseSectionResponseDto> {
    const { id, role } = jwtBody;
    const { limit, offset } = param;
    if (role === UserRoles.STORE_ADMIN) {
      const storeStatus = await this.storeHelperService.checkStoreUnderAdmin(
        storeId,
        id
      );

      if (!storeStatus) throw new UnauthorizedException();
    }
    const query = `${listStoreWiseSectionsQuery}
    ${limit ? `limit ${limit}` : ''}
    ${offset ? `offset ${offset}` : ''}`;
    const sectionList: StoreWiseSectionDto[] = await firstValueFrom(
      this.databaseService.rawQuery(query, [storeId], StoreWiseSectionDto)
    );
    return {
      message: 'Successfully fetched store wise section details',
      data: sectionList,
      pagination: {
        total: sectionList.length === 0 ? 0 : sectionList[0].count
      }
    };
  }

  /**
   * Functionality for the user to view the details of a product in a section.
   * @param sectionId - Section Id
   * @param productId - Product Id
   * @param storeId - Store Id
   * @param param - consists of filterColour and filterSize to filter Skus.
   * {@link param || FetchSingleColourAndSizeSkuDetails}
   * @returns a success message and data
   * {@link param || FetchSingleProductDetailsResponseDto}
   */
  getDetailsOfAProductInASection(
    sectionId: number,
    productId: number,
    storeId: number,
    param: FetchSingleColourAndSizeSkuDetails,
    jwtBody: any
  ): Observable<FetchSingleProductDetailsResponseDto | Record<null, null>> {
    const { filterColour, filterSize } = param;
    const { id } = jwtBody;
    let query = fetchDetailsOfAProductInASection;
    const dataValue = [sectionId, productId, storeId, id];
    let queryId = 3;
    if (filterColour) {
      queryId++;
      query = `${query} AND ms.colour_id = $${queryId}`;
      dataValue.push(filterColour);
    }
    if (filterSize) {
      queryId++;
      query = `${query} AND ms.size_id = $${queryId}`;
      dataValue.push(filterSize);
    }
    query = `${query} 
    GROUP BY mp.id,c.name
    order by mp.updated_at DESC`;
    return this.databaseService
      .rawQuery(query, dataValue, FetchSingleProductDetailsResponseDto)
      .pipe(
        map((resultData) => {
          return {
            message: 'Successfully fetched',
            data: resultData
          };
        })
      );
  }

  /**
   * Functionality to assign product to a particular section
   * @param storeId - id of store
   * @param sectionId - id of section to assign product
   * @param body - which contain the id of product to assign
   * @param jwtBody - contain details of admin
   * @returns - a success message
   */
  async assignProductToSection(
    storeId: number,
    sectionId: number,
    body: AssignProductSectionDto,
    jwtBody: any
  ): Promise<SectionMessageDto> {
    const { id } = jwtBody;
    const { productId } = body;
    const storeStatus = await this.storeHelperService.checkStoreUnderAdmin(
      storeId,
      id
    );

    if (!storeStatus) throw new UnauthorizedException();

    const sectionStatus = await this.storeHelperService.checkSectionUnderStore(
      storeId,
      sectionId
    );

    if (!sectionStatus) throw new NotFoundException();

    const query = assignProductSection(productId);
    const assignProductStatus = await firstValueFrom(
      this.databaseService.rawQuery(
        query,
        [sectionId, storeId, ...productId],
        SectionProductMapId
      )
    );

    if (assignProductStatus.length === 0) throw new NotFoundException();
    return {
      message: 'Successfully assigned product'
    };
  }

  /**
   * Functionality for store-admin to unassign products
   * from a section in a particular store.
   * @param storeId - store id
   * @param sectionId - section id
   * @param productId - product id
   * @param jwtBody - token body
   * @returns - a success message on successful operation
   */

  async sectionWiseProductUnassign(
    storeId: number,
    sectionId: number,
    productId: number,
    jwtBody: any
  ): Promise<SectionMessageDto> {
    const { id } = jwtBody;
    const storeStatus = await this.storeHelperService.checkStoreUnderAdmin(
      storeId,
      id
    );
    if (!storeStatus) throw new UnauthorizedException();
    const unassignProductStatus = await firstValueFrom(
      this.databaseService.rawQuery(
        sectionWiseProductUnassignQuery,
        [storeId, sectionId, productId],
        ProductIdDto
      )
    );

    if (unassignProductStatus.length === 0) {
      throw new NotFoundException();
    }
    return {
      message: 'Successfully unassigned product from the section'
    };
  }

  /**
   * Functionality for fetching section under store
   * @param storeId - store id
   * @param param - contains the section name for search
   * @param jwtBody - token body
   * @returns  a success message
   */

  async getStoreAssignedSectionDetails(
    storeId: number,
    param: SectionUnderStoreQueryParam,
    jwtBody: any
  ): Promise<MessageSectionDropDownList> {
    const { id } = jwtBody;
    const { sectionName } = param;
    const storeStatus = await this.storeHelperService.checkStoreUnderAdmin(
      storeId,
      id
    );

    if (!storeStatus) throw new UnauthorizedException();
    const dataValue = [storeId, sectionName ? `%${sectionName}%` : null];

    const sectionList: SectionDropDownList[] = await firstValueFrom(
      this.databaseService.rawQuery(
        sectionUnderStoreDropdownQuery,
        dataValue,
        SectionDropDownList
      )
    );

    return {
      message: 'Successfully collected',
      data: sectionList
    };
  }

  /**
   * Functionality for the store admin to view the list of products
   * not assigned to any section.
   * @param storeId - Store Id
   * @returns a success message and data
   * {@link param || ProductFetchResponseDto}
   */
  async getListOfProductsNotAssignedToAnySection(
    storeId: number,
    jwtBody: any
  ): Promise<ProductFetchResponseDto | Record<null, null>> {
    const { id } = jwtBody;
    const storeStatus = await this.storeHelperService.checkStoreUnderAdmin(
      storeId,
      id
    );
    if (!storeStatus) throw new UnauthorizedException();
    return this.databaseService
      .rawQuery(
        ProductsNotAssignedToAnySection,
        [storeId],
        ProductFetchResponseDto
      )
      .pipe(
        map((resultData) => {
          return {
            message: 'Fetched successfully',
            data: resultData
          };
        })
      );
  }

  /**
   * Functionality to Fetch section Listed by super admin or fetch
   * section not listed under store
   * @param queryParam - which contain the detail for filtering and pagination
   * @param jwtBody - contain the detail of admin
   * @returns a success message
   */
  getSectionAndSectionNotListedInStore(
    queryParam: SectionQueryDto,
    jwtBody: any
  ): Observable<SectionFetchDto | Record<null, null>> {
    const { limit, offset, sortField, sortOrder, storeId } = queryParam;
    const { role } = jwtBody;
    if (sortField) {
      if (!Object.keys(K.SECTION_SORT).includes(sortField))
        throw new BadRequestException();
    }
    const query = getSectionAndSectionNotListedInStoreQuery(
      limit,
      offset,
      sortField,
      sortOrder
    );
    if (!storeId && role === K.ROLES[1])
      throw new NotFoundException('Store ID not available');
    const dataValue = [storeId && role === K.ROLES[1] ? storeId : null];
    return this.databaseService
      .rawQuery(query, dataValue, SectionFetchDto)
      .pipe(
        map((resultData) => {
          return {
            message: 'Successfully fetched',
            data: resultData,
            pagination: {
              total: resultData.length === 0 ? 0 : resultData[0].count
            }
          };
        })
      );
  }
  /**
   * Functionality for user to list categories under a section
   * in a particular store.
   * @param storeId - store id
   * @param sectionId - section id
   * @param param - consists of limit and offset
   * {@link param || SectionWiseCategoriesPaginationDto}
   * @param jwtBody - token body
   * @returns - a success message and category list
   * {@link param || FetchCategoryListResponseDto}
   */
  async fetchSectionWiseCategoryList(
    storeId: number,
    sectionId: number,
    param: SectionWiseCategoriesPaginationDto
  ): Promise<FetchCategoryListResponseDto | Record<null, null>> {
    const { limit, offset } = param;
    const query = fetchSectionWiseCategoryListQuery(limit, offset);
    const categoryList: SectionWiseCategoriesDto[] = await firstValueFrom(
      this.databaseService.rawQuery(
        query,
        [sectionId, storeId],
        SectionWiseCategoriesDto
      )
    );
    return {
      message: 'Successfully collected',
      data: categoryList,
      pagination: {
        total: categoryList.length === 0 ? 0 : categoryList[0].count
      }
    };
  }
  /**
   * Functionality for user to view list of products in wishlist.
   * @param storeId - store id
   * @param sectionId - section id
   * @param param - sorting and filtering options
   * {@link param || FetchWishlistProductsPaginationDto}
   * @param jwtBody - token body
   * @returns - a success message and list of products.
   * {@link param || FetchWishlistProductsResponseDto}
   */
  /*eslint-disable */
  fetchWishlistProducts(
    storeId: number,
    sectionId: number,
    param: FetchWishlistProductsPaginationDto,
    jwtBody: any
  ): Observable<FetchWishlistProductsResponseDto | Record<null, null>> {
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
    let { query } = fetchWishlistProductsQuery(
      filterCategory,
      filterColour,
      filterSize
    );
    const { dataValue } = fetchWishlistProductsQuery(
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
    group by mp.id, mp.product_name, 
    mp.category_id, mc.name, dq.image,
    dq.base_price, dq.sale_price_discount_percent, 
    dq.discount_price
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
        FetchWishlistProductsDto
      )
      .pipe(
        map((result) => {
          return {
            message: 'Wishlisted products fetched successfully',
            data: result,
            pagination: {
              total: result.length === 0 ? 0 : result[0].count
            }
          };
        })
      );
  }
  /*eslint-enable */
  /**
   * Functionality for user to list offers under a section
   * in a particular store.
   * @param storeId - store id
   * @param sectionId - section id
   * @param param - consists of limit and offset
   * {@link param || SectionWiseCategoriesPaginationDto}
   * @param jwtBody - token body
   * @returns - a success message and category list
   * {@link param || FetchOfferListResponseDto}
   */
  fetchSectionWiseOfferList(
    storeId: number,
    sectionId: number,
    param: SectionWiseCategoriesPaginationDto
  ): Observable<FetchOfferListResponseDto | Record<null, null>> {
    const { limit, offset } = param;
    const query = fetchSectionWiseOfferListQuery(limit, offset);
    return this.databaseService
      .rawQuery(query, [storeId, sectionId], SectionWiseOfferDto)
      .pipe(
        map((resultData) => {
          return {
            message: 'Successfully fetched',
            data: resultData,
            pagination: {
              total: resultData.length === 0 ? 0 : resultData[0].count
            }
          };
        })
      );
  }
  /**
   * Functionality for fetching dynamic filters for
   * section wise product list.
   * @param storeId - store id
   * @param sectionId - section id
   * @param param - category filter and offer id
   * {@link param || FetchProductFilterData}
   * @returns - a success message and filter data
   * {@link param || ProductFilterDataResponse}
   */
  fetchProductFilterData(
    storeId: number,
    sectionId: number,
    param: FetchProductFilterData,
    jwtBody: any
  ): Observable<ProductFilterDataResponse | Record<null, null>> {
    const { id } = jwtBody;
    const { filterCategory, offerId, wishlist } = param;
    const { query, dataValue } = fetchProductFiltersQuery(
      filterCategory,
      wishlist
    );

    return this.databaseService
      .rawQuery(
        query,
        wishlist ?
          [storeId, sectionId, offerId, id, ...dataValue] :
          [storeId, sectionId, offerId, ...dataValue],
        ProductFilterData
      )
      .pipe(
        map((resultData) => {
          return {
            message: 'Successfully fetched product filter data',
            data: resultData
          };
        })
      );
  }

  /**
   * Functionality for assigning products to wishlist.
   * @param body - store id, section id and product id
   *  {@link param || WishlistProductAssignDto}
   * @param jwtBody - token body
   * @returns - a success messsage on insertion
   */
  async assignProductsToWishlist(
    body: WishlistProductAssignDto,
    jwtBody: any
  ): Promise<SectionMessageDto | Record<null, null>> {
    const { storeId, sectionId, productId } = body;
    const productStatus = await this.storeHelperService.checkProductUnderStore(
      storeId,
      sectionId,
      productId
    );
    if (!productStatus) throw new BadRequestException();
    const { id } = jwtBody;
    body['user_id'] = id;
    const { query, value } = UtilsService.generateInsertQuery(
      K.TABLE_NAMES.WISHLIST,
      K.PRIMARY_KEYS.WISHLIST,
      body,
      []
    );
    const finalQuery = format(query, value);
    return this.databaseService.rawQuery(finalQuery, [], ProductIdDto).pipe(
      map(() => {
        return {
          message: 'Successfully assigned products to wishlist'
        };
      })
    );
  }

  /**
   * Functionality for unassigning product from wishlist.
   * @param storeId - store id
   * @param productId - product id
   * @param jwtBody - token body
   * @returns - a success message on deletion.
   */
  async unassignProductFromWishlist(
    storeId: number,
    productId: number,
    jwtBody: any
  ): Promise<SectionMessageDto | Record<null, null>> {
    const { id } = jwtBody;
    const deleteStatus: ProductIdDto[] = await firstValueFrom(
      this.databaseService.rawQuery(
        unAssignProductFromWishlistQuery,
        [id, storeId, productId],
        SectionIdDto
      )
    );
    if (deleteStatus.length === 0) throw new NotFoundException();
    return {
      message: 'Successfully unassigned product from wishlist'
    };
  }

  /**
   * Functionality for fetching section visit data for a user.
   * @param storeId - store id
   * @param param - limit, offset & search option
   * @param jwtBody - token body
   * @returns - a success message and store visit data.
   */
  fetchSectionVisitData(
    storeId: number,
    param: SectionVisitParamDto,
    jwtBody: any
  ): Observable<SectionVisitDataResponseDto | Record<null, null>> {
    const { id } = jwtBody;
    const { limit, offset, searchName } = param;
    const query = fetchSectionVisitsQuery(limit, offset);
    return this.databaseService
      .rawQuery(query, [id, storeId, searchName], SectionVisitDataDto)
      .pipe(
        map((resultData) => {
          return {
            message: 'Successfully fetched user section visit data',
            data: resultData
          };
        })
      );
  }
}
