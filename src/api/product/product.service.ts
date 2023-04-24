import {
  FetchStoreWiseSingleProductDetails,
  FetchStoreWiseSingleProductDetailsResponseDto,
  ProductListSetDto,
  SkuIdListDto,
  StoreWiseSingleProductSKUDetails
} from './../dto/product.dto';
import {
  BadRequestException,
  Injectable,
  NotFoundException,
  UnauthorizedException
} from '@nestjs/common';
import { map, Observable, firstValueFrom } from 'rxjs';
import { DatabaseService } from 'src/database/database.service';
import { UtilsService } from 'src/utils/utils.service';
import { MessageDto } from '../dto/admin.dto';
import * as K from '../../shared/constants';
import {
  CreateProductBodyDto,
  ProductCreateDto,
  CreatedProductId,
  MessageCategoryDto,
  MessageSizeDto,
  MessageColourDto,
  SkuIdDto,
  ProductIdDTO,
  UpdateProductDto,
  CreateProductSku,
  SkuIdDTO,
  FetchSingleProductDetailsResponseDto,
  UpdateProductSku,
  FetchAllProductsPagination,
  ProductFetchDto,
  FetchSingleColourAndSizeSkuDetails,
  FetchProductOffersDto,
  FetchProductWiseOffersDto,
  FetchProductOffersResponseDto,
  CsvProductDto
} from '../dto/product.dto';
import {
  createProductSku,
  deleteProductQuery,
  updateProductSku,
  fetchSingleProductSkuDetailsQuery,
  listAllProductsQuery,
  fetchProductOffersQuery,
  bulkProductUploadQuery,
  fetchStoreWiseProductSkusQuery,
  fetchProductWiseOffersQuery,
  skuFetchQuery,
  skuUpdateQuery
} from '../db-queries/product.query';
import * as format from 'pg-format';
import { UserRoles } from '../dto/roles.dto';
import { StoreHelperService } from 'src/helper/store.helper';
import { SectionIdDto } from '../dto/section.dto';
@Injectable()
export class ProductService {
  constructor(
    private readonly databaseService: DatabaseService<any>,
    private storeHelperService: StoreHelperService
  ) {}

  /**
   * Function is to fetch all colours of the product
   * @returns a success message - {@link MessageColourDto}
   */
  fetchProductcolour(): Observable<MessageDto | Record<null, null>> {
    const query = UtilsService.generateSelectQuery({
      tableName: K.TABLE_NAMES.PRODUCT_COLOUR,
      columnData: K.SELECT_COLOUR_COLUMN_DATA,
      orderCondtion: 'ORDER BY name'
    });
    return this.databaseService.rawQuery(query, [], MessageColourDto).pipe(
      map((result) => {
        return {
          message: 'Fetched all available colours of the product',
          data: result.length === 0 ? [] : result
        };
      })
    );
  }

  /**
   * Function is to fetch all sizes of the product
   * @returns a success message - {@link MessageSizeDto}
   */
  fetchProductSize(): Observable<MessageDto | Record<null, null>> {
    const query = UtilsService.generateSelectQuery({
      tableName: K.TABLE_NAMES.PRODUCT_SIZE,
      columnData: K.SELECT_SIZE_COLUMN_DATA,
      orderCondtion: 'ORDER BY id'
    });
    return this.databaseService.rawQuery(query, [], MessageSizeDto).pipe(
      map((result) => {
        return {
          message: 'Fetched all available sizes of the product',
          data: result.length === 0 ? [] : result
        };
      })
    );
  }

  /**
   * Function is to fetch all category of the product
   * @returns a success message - {@link MessageDto}
   */
  fetchProductCategory(): Observable<MessageDto | Record<null, null>> {
    const query = UtilsService.generateSelectQuery({
      tableName: K.TABLE_NAMES.PRODUCT_CATEGORY,
      columnData: K.SELECT_CATEGORY_COLUMN_DATA,
      orderCondtion: 'ORDER BY name'
    });
    return this.databaseService.rawQuery(query, [], MessageCategoryDto).pipe(
      map((result) => {
        return {
          message: 'Fetched all available category of the product',
          data: result.length === 0 ? [] : result
        };
      })
    );
  }

  /**
   * Function is to delete the sku details
   * @param id contains the id of the sku detail
   * @returns a success message - {@link MessageDto}
   */
  deleteSkuDetails(id: number) {
    const deleteQuery = UtilsService.generateDeleteQuery({
      tableName: K.TABLE_NAMES.PRODUCT_SKU,
      primaryKey: K.PRIMARY_KEYS.PRODUCT_SKU,
      value: id
    });
    return this.databaseService.rawQuery(deleteQuery.query, [], SkuIdDto).pipe(
      map((result) => {
        if (result.length === 0) throw new NotFoundException();
        return { message: 'SKU detail deleted successfully' };
      })
    );
  }

  /**
   * Function is to delete product and it's SKU`s
   * @param id - id of the product to be deleted
   * @returns a success message - {@link MessageDto}
   */
  deleteProduct(id: number): Observable<MessageDto | Record<null, null>> {
    return this.databaseService
      .rawQuery(deleteProductQuery, [id], ProductIdDTO)
      .pipe(
        map((result) => {
          if (result.length === 0) throw new NotFoundException();
          return { message: 'Product detail deleted successfully' };
        })
      );
  }

  /**
   *
   * @param body - which contain the detail of the
   *  product {@link body || CreateProductDto}
   * @param jwtBody - which contain the detail of jwt token
   * @returns a success message, if product created successfully
   */
  createProduct(
    body: CreateProductBodyDto,
    jwtBody: any
  ): Observable<ProductCreateDto | Record<null, null>> {
    body['updatedBy'] = jwtBody.id;
    const queryAndValue = UtilsService.generateInsertQuery(
      K.TABLE_NAMES.PRODUCT,
      K.PRIMARY_KEYS.PRODUCT,
      body,
      []
    );
    const finalQuery = format(queryAndValue.query, queryAndValue.value);
    return this.databaseService.rawQuery(finalQuery, [], CreatedProductId).pipe(
      map((result) => {
        return {
          message: 'Products inserted successfully',
          productId: result[0].id
        };
      })
    );
  }

  /**
   * This API is to update product details
   * @param id id of the product
   * @param body Body which contains details to update
   * @param jwtBody token containing payload of super admin
   * @returns returns a success message upon updation
   */

  editProductDetails(
    id: number,
    body: UpdateProductDto,
    jwtBody: any
  ): Observable<MessageDto | Record<null, null>> {
    body['updatedBy'] = jwtBody.id;
    const updateQueryAndValue = UtilsService.generateUpdateQuery({
      tableName: K.TABLE_NAMES.PRODUCT,
      primaryKey: K.PRIMARY_KEYS.PRODUCT,
      keysToIgnore: [],
      whereCondition: `${K.PRIMARY_KEYS.PRODUCT}=${id}`,
      columnData: body
    });
    return this.databaseService
      .rawQuery(
        updateQueryAndValue.query,
        updateQueryAndValue.data,
        UpdateProductDto
      )
      .pipe(
        map(() => {
          return { message: 'Updated store detail successfully' };
        })
      );
  }

  /**
   * Functionality to add SKU details of the product
   * @param body  which contain the array of SKU detail
   * {@link body || CreateProductSku}
   * @param jwtBody - which contain the detail of jwt token
   * @returns a success message, if SKU created successfully
   */
  createSkuDetails(
    body: CreateProductSku,
    jwtBody: any
  ): Observable<MessageDto | Record<null, null>> {
    const { productId, skuDetails, categoryId } = body;
    const { id } = jwtBody;

    const skuValueArray = [];
    for (const sku of skuDetails) {
      const {
        colourId,
        sizeId,
        price,
        discountPercent,
        image,
        defaultProduct
      } = sku;
      const value = `('${productId}-${categoryId}-${colourId}-${sizeId}',
      ${colourId},${sizeId},${price},
      ${discountPercent},'${image}',${defaultProduct},
        cast(
          concat
          ('9',(select nextval('barcode_sequence_id')),'5') as bigint),
          ${id})`;
      skuValueArray.push(value);
    }
    const skuValue = skuValueArray.join(',');
    const finalQuery = createProductSku(skuValue);
    return this.databaseService
      .rawQuery(finalQuery, [productId], SkuIdDTO)
      .pipe(
        map(() => {
          return {
            message: 'SKU detail inserted sucessfully'
          };
        })
      );
  }

  /**
   * Functionality to update SKU detail
   * @param body which contain the detail of SKU
   * {@link body || UpdateProductSku}
   * @param jwtBody - which contain the detail of jwt token
   * @returns a success message, if SKU updated successfully
   */
  updateSkuDetails(
    body: UpdateProductSku,
    jwtBody: any
  ): Observable<MessageDto | Record<null, null>> {
    const { productId, categoryId, skuDetails } = body;
    const skuValueArray = [];
    for (const sku of skuDetails) {
      const {
        id,
        skuUniqueId,
        colourId,
        sizeId,
        price,
        discountPercent,
        image,
        defaultProduct
      } = sku;
      // eslint-disable-next-line
      const value = `(${id ? id : "(select nextval('m_sku_table_id_seq'))"},${
        skuUniqueId ? `'${skuUniqueId}'` : null
      },
      ${colourId},${sizeId},${price},
      ${discountPercent},'${image}',${defaultProduct},
        cast(
          concat
          ('9',(select nextval('barcode_sequence_id')),'5') as bigint),
          ${jwtBody.id},${productId},${categoryId})`;
      skuValueArray.push(value);
    }
    const skuValue = skuValueArray.join(',');
    const finalQuery = updateProductSku(skuValue);
    return this.databaseService.rawQuery(finalQuery, [], CreatedProductId).pipe(
      map(() => {
        return {
          message: 'SKU updated successfully'
        };
      })
    );
  }

  /**
   * Functionality for the super admin to view the details of a single product.
   * @param id - Product Id
   * @param param - consists of filterColour and filterSize to filter Skus.
   * {@link param || FetchSingleColourSkuDetails}
   * @returns a success message and data
   * {@link param || FetchSingleProductDetailsResponseDto}
   */
  getSingleProductSkuDetails(
    id: number,
    param: FetchSingleColourAndSizeSkuDetails
  ): Observable<FetchSingleProductDetailsResponseDto | Record<null, null>> {
    const { filterColour, filterSize } = param;
    let query = fetchSingleProductSkuDetailsQuery;
    const dataValue = [id];
    let queryId = 1;
    if (filterColour) {
      queryId = queryId + 1;
      query = `${query} AND ms.colour_id = $${queryId}`;
      dataValue.push(filterColour);
    }
    if (filterSize) {
      queryId = queryId + 1;
      query = `${query} AND ms.size_id = $${queryId}`;
      dataValue.push(filterSize);
    }
    query = `${query} GROUP BY m_product.id,c.name`;
    return this.databaseService
      .rawQuery(query, dataValue, FetchSingleProductDetailsResponseDto)
      .pipe(
        map((resultData) => {
          return {
            message: 'Single Product SKU details fetched successfully.',
            data: resultData
          };
        })
      );
  }

  /**
   * Function to generate query for sorting.
   * @param sortPrice
   * @param sortName
   * @returns an array
   */
  getSortQueryForProductFetch(
    sortPrice: string,
    sortName: string
  ): Array<string> {
    const sortArray = [];

    if (sortPrice) {
      sortArray.push(
        `${K.TABLE_NAMES.PRODUCT_SKU}.${K.SALE_PRICE} 
        ${sortPrice === 'true' ? 'ASC' : 'DESC'}`
      );
    }

    if (sortName) {
      sortArray.push(`${K.TABLE_NAMES.PRODUCT}.${K.PRODUCT_NAME}  
      ${sortName === 'true' ? 'ASC' : 'DESC'}`);
    }

    return sortArray;
  }

  /**
   * Functionality for fetching list of all available products.
   * @param param - Parameters for customizing product list.
   * {@link param || FetchAllProductsPagination}
   * @returns a product list. {@link param || ProductFetchDto}
   */
  getAllProductDetails(param: FetchAllProductsPagination) {
    const {
      limit,
      offset,
      id,
      sortName,
      sortPrice,
      productName,
      categoryName,
      filterCategory
    } = param;
    let orderSql = '';
    if (sortPrice || sortName) {
      const sortArray = this.getSortQueryForProductFetch(sortPrice, sortName);
      orderSql = `ORDER BY ${sortArray.join(',')}`;
    }

    let query = `${listAllProductsQuery}
    ${filterCategory ? 'AND category_id IN (%L)' : ''}
    ${orderSql ? orderSql : 'order by m_product.updated_at DESC'}
          ${limit ? `limit ${limit}` : ''}
          ${offset ? `offset ${offset}` : ''}
     `;
    const dataValue = [
      productName ? `%${productName}%` : null,
      id ? `%${id}%` : null,
      categoryName ? `%${categoryName}%` : null
    ];
    if (filterCategory) {
      const category = JSON.parse(filterCategory);
      query = format(query, category);
    }
    return this.databaseService
      .rawQuery(query, dataValue, ProductFetchDto)
      .pipe(
        map((resultData) => {
          return {
            message: 'Product detail Fetched successfully',
            data: resultData,
            pagination: {
              total: resultData.length === 0 ? 0 : resultData[0].count
            }
          };
        })
      );
  }

  fetchProductOffers(
    productId: number,
    storeId,
    param: FetchProductOffersDto
  ): Observable<FetchProductOffersResponseDto | Record<null, null>> {
    const { limit, offset, sortField, sortOrder } = param;
    if (sortField) {
      if (!Object.keys(K.OFFER_LIST_SORT).includes(sortField))
        throw new BadRequestException();
    }
    const query = fetchProductOffersQuery(sortField, sortOrder, limit, offset);
    return this.databaseService
      .rawQuery(query, [productId, storeId], FetchProductWiseOffersDto)
      .pipe(
        map((resultData) => {
          return {
            message: 'Product offers fetched sucessfully',
            data: resultData,
            pagination: {
              total: resultData.length === 0 ? 0 : resultData[0].count
            }
          };
        })
      );
  }
  /**
   * Functionality for store-admin to view store wise skus of a single product.
   * @param productId - product id
   * @param storeId - store id
   * @param jwtBody - token body
   * @param param - colour and size filter
   * {@link param || FetchSingleColourAndSizeSkuDetails}
   * @returns - a success message and product data
   * {@link param || FetchStoreWiseSingleProductDetailsResponseDto}
   */
  async fetchStoreWiseProductSkus(
    productId: number,
    storeId: number,
    jwtBody: any,
    param: FetchSingleColourAndSizeSkuDetails
  ): Promise<
    FetchStoreWiseSingleProductDetailsResponseDto | Record<null, null>
  > {
    const { id, role } = jwtBody;
    if (role === UserRoles.STORE_ADMIN) {
      const status = await this.storeHelperService.checkStoreUnderAdmin(
        storeId,
        id
      );
      if (!status) throw new UnauthorizedException();
      const { filterColour, filterSize } = param;
      const fetchProductSkus: StoreWiseSingleProductSKUDetails[] =
        await firstValueFrom(
          this.databaseService.rawQuery(
            fetchStoreWiseProductSkusQuery,
            [storeId, productId, filterColour, filterSize],
            FetchStoreWiseSingleProductDetails
          )
        );
      if (fetchProductSkus.length === 0) throw new NotFoundException();
      return {
        message: 'Succesfully fetched single product details',
        data: [fetchProductSkus[0]]
      };
    }
  }

  /**
   * Functionality for bulk upload of product and respective SKUs via csv.
   * @param file - csv file format for upload{@link param || CsvProductDto}
   * @param jwtBody - token body
   * @returns - a success message on insertion
   */
  /* eslint-disable */
  async productBulkUpload(
    file: CsvProductDto,
    jwtBody: any
  ): Promise<MessageDto> {
    const { id } = jwtBody;
    const productList = file.products;
    const defaultCheck = (productList) => {
      const countArr = {};
      for (const sku of productList) {
        const productName = sku['product_name'];
        if (sku['default_product'] == 'true') {
          if (countArr[productName] == undefined) countArr[productName] = 0;
          countArr[productName] += 1;
          if (countArr[productName] > 1) return productName;
        }
      }
      return '-1';
    };
    const defaultStatus = defaultCheck(productList);
    if (defaultStatus != '-1') {
      throw new BadRequestException({
        message: [
          `${defaultStatus} is having multiple true  values for default_product`
        ],
        statusCode: 400
      });
    }
    const productListSet = new Set();
    productList.forEach((element) => {
      productListSet.add(element.product_name);
    });
    const idSet = await firstValueFrom(
      this.databaseService.rawQuery(
        skuFetchQuery([...productListSet]),
        [],
        ProductListSetDto
      )
    );
    if (idSet.length !== 0) {
      const idList = [];
      idSet.forEach((element) => {
        idList.push(element.id);
      });
      await firstValueFrom(
        this.databaseService.rawQuery(skuUpdateQuery(idList), [], SkuIdListDto)
      );
    }
    const queryLoop = bulkProductUploadQuery(file, id);
    try {
      this.databaseService.rawQuery('BEGIN;', [], SectionIdDto);
      for (let i = 0; i < queryLoop.length; i++) {
        await firstValueFrom(
          this.databaseService.rawQuery(queryLoop[i], [], SectionIdDto)
        );
      }
      this.databaseService.rawQuery('COMMIT;', [], SectionIdDto);
      return {
        message: 'Successfully Inserted'
      };
    } catch (error) {
      this.databaseService.rawQuery('ROLLBACK;', [], SectionIdDto);
      return error;
    }
  }
  /* eslint-enable */

  fetchProductWiseOffers(
    productId: number,
    param: FetchProductOffersDto
  ): Observable<FetchProductOffersResponseDto | Record<null, null>> {
    const { limit, offset, sortField, sortOrder } = param;
    if (sortField) {
      if (!Object.keys(K.OFFER_LIST_SORT).includes(sortField))
        throw new BadRequestException();
    }
    const query = fetchProductWiseOffersQuery(
      sortField,
      sortOrder,
      limit,
      offset
    );
    return this.databaseService
      .rawQuery(query, [productId], FetchProductWiseOffersDto)
      .pipe(
        map((resultData) => {
          return {
            message: 'Product offers fetched sucessfully',
            data: resultData,
            pagination: {
              total: resultData.length === 0 ? 0 : resultData[0].count
            }
          };
        })
      );
  }
}
