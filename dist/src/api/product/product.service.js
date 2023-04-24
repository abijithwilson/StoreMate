"use strict";
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __metadata = (this && this.__metadata) || function (k, v) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.ProductService = void 0;
const product_dto_1 = require("./../dto/product.dto");
const common_1 = require("@nestjs/common");
const rxjs_1 = require("rxjs");
const database_service_1 = require("../../database/database.service");
const utils_service_1 = require("../../utils/utils.service");
const K = require("../../shared/constants");
const product_dto_2 = require("../dto/product.dto");
const product_query_1 = require("../db-queries/product.query");
const format = require("pg-format");
const roles_dto_1 = require("../dto/roles.dto");
const store_helper_1 = require("../../helper/store.helper");
const section_dto_1 = require("../dto/section.dto");
let ProductService = class ProductService {
    constructor(databaseService, storeHelperService) {
        this.databaseService = databaseService;
        this.storeHelperService = storeHelperService;
    }
    fetchProductcolour() {
        const query = utils_service_1.UtilsService.generateSelectQuery({
            tableName: K.TABLE_NAMES.PRODUCT_COLOUR,
            columnData: K.SELECT_COLOUR_COLUMN_DATA,
            orderCondtion: 'ORDER BY name'
        });
        return this.databaseService.rawQuery(query, [], product_dto_2.MessageColourDto).pipe((0, rxjs_1.map)((result) => {
            return {
                message: 'Fetched all available colours of the product',
                data: result.length === 0 ? [] : result
            };
        }));
    }
    fetchProductSize() {
        const query = utils_service_1.UtilsService.generateSelectQuery({
            tableName: K.TABLE_NAMES.PRODUCT_SIZE,
            columnData: K.SELECT_SIZE_COLUMN_DATA,
            orderCondtion: 'ORDER BY id'
        });
        return this.databaseService.rawQuery(query, [], product_dto_2.MessageSizeDto).pipe((0, rxjs_1.map)((result) => {
            return {
                message: 'Fetched all available sizes of the product',
                data: result.length === 0 ? [] : result
            };
        }));
    }
    fetchProductCategory() {
        const query = utils_service_1.UtilsService.generateSelectQuery({
            tableName: K.TABLE_NAMES.PRODUCT_CATEGORY,
            columnData: K.SELECT_CATEGORY_COLUMN_DATA,
            orderCondtion: 'ORDER BY name'
        });
        return this.databaseService.rawQuery(query, [], product_dto_2.MessageCategoryDto).pipe((0, rxjs_1.map)((result) => {
            return {
                message: 'Fetched all available category of the product',
                data: result.length === 0 ? [] : result
            };
        }));
    }
    deleteSkuDetails(id) {
        const deleteQuery = utils_service_1.UtilsService.generateDeleteQuery({
            tableName: K.TABLE_NAMES.PRODUCT_SKU,
            primaryKey: K.PRIMARY_KEYS.PRODUCT_SKU,
            value: id
        });
        return this.databaseService.rawQuery(deleteQuery.query, [], product_dto_2.SkuIdDto).pipe((0, rxjs_1.map)((result) => {
            if (result.length === 0)
                throw new common_1.NotFoundException();
            return { message: 'SKU detail deleted successfully' };
        }));
    }
    deleteProduct(id) {
        return this.databaseService
            .rawQuery(product_query_1.deleteProductQuery, [id], product_dto_2.ProductIdDTO)
            .pipe((0, rxjs_1.map)((result) => {
            if (result.length === 0)
                throw new common_1.NotFoundException();
            return { message: 'Product detail deleted successfully' };
        }));
    }
    createProduct(body, jwtBody) {
        body['updatedBy'] = jwtBody.id;
        const queryAndValue = utils_service_1.UtilsService.generateInsertQuery(K.TABLE_NAMES.PRODUCT, K.PRIMARY_KEYS.PRODUCT, body, []);
        const finalQuery = format(queryAndValue.query, queryAndValue.value);
        return this.databaseService.rawQuery(finalQuery, [], product_dto_2.CreatedProductId).pipe((0, rxjs_1.map)((result) => {
            return {
                message: 'Products inserted successfully',
                productId: result[0].id
            };
        }));
    }
    editProductDetails(id, body, jwtBody) {
        body['updatedBy'] = jwtBody.id;
        const updateQueryAndValue = utils_service_1.UtilsService.generateUpdateQuery({
            tableName: K.TABLE_NAMES.PRODUCT,
            primaryKey: K.PRIMARY_KEYS.PRODUCT,
            keysToIgnore: [],
            whereCondition: `${K.PRIMARY_KEYS.PRODUCT}=${id}`,
            columnData: body
        });
        return this.databaseService
            .rawQuery(updateQueryAndValue.query, updateQueryAndValue.data, product_dto_2.UpdateProductDto)
            .pipe((0, rxjs_1.map)(() => {
            return { message: 'Updated store detail successfully' };
        }));
    }
    createSkuDetails(body, jwtBody) {
        const { productId, skuDetails, categoryId } = body;
        const { id } = jwtBody;
        const skuValueArray = [];
        for (const sku of skuDetails) {
            const { colourId, sizeId, price, discountPercent, image, defaultProduct } = sku;
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
        const finalQuery = (0, product_query_1.createProductSku)(skuValue);
        return this.databaseService
            .rawQuery(finalQuery, [productId], product_dto_2.SkuIdDTO)
            .pipe((0, rxjs_1.map)(() => {
            return {
                message: 'SKU detail inserted sucessfully'
            };
        }));
    }
    updateSkuDetails(body, jwtBody) {
        const { productId, categoryId, skuDetails } = body;
        const skuValueArray = [];
        for (const sku of skuDetails) {
            const { id, skuUniqueId, colourId, sizeId, price, discountPercent, image, defaultProduct } = sku;
            const value = `(${id ? id : "(select nextval('m_sku_table_id_seq'))"},${skuUniqueId ? `'${skuUniqueId}'` : null},
      ${colourId},${sizeId},${price},
      ${discountPercent},'${image}',${defaultProduct},
        cast(
          concat
          ('9',(select nextval('barcode_sequence_id')),'5') as bigint),
          ${jwtBody.id},${productId},${categoryId})`;
            skuValueArray.push(value);
        }
        const skuValue = skuValueArray.join(',');
        const finalQuery = (0, product_query_1.updateProductSku)(skuValue);
        return this.databaseService.rawQuery(finalQuery, [], product_dto_2.CreatedProductId).pipe((0, rxjs_1.map)(() => {
            return {
                message: 'SKU updated successfully'
            };
        }));
    }
    getSingleProductSkuDetails(id, param) {
        const { filterColour, filterSize } = param;
        let query = product_query_1.fetchSingleProductSkuDetailsQuery;
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
            .rawQuery(query, dataValue, product_dto_2.FetchSingleProductDetailsResponseDto)
            .pipe((0, rxjs_1.map)((resultData) => {
            return {
                message: 'Single Product SKU details fetched successfully.',
                data: resultData
            };
        }));
    }
    getSortQueryForProductFetch(sortPrice, sortName) {
        const sortArray = [];
        if (sortPrice) {
            sortArray.push(`${K.TABLE_NAMES.PRODUCT_SKU}.${K.SALE_PRICE} 
        ${sortPrice === 'true' ? 'ASC' : 'DESC'}`);
        }
        if (sortName) {
            sortArray.push(`${K.TABLE_NAMES.PRODUCT}.${K.PRODUCT_NAME}  
      ${sortName === 'true' ? 'ASC' : 'DESC'}`);
        }
        return sortArray;
    }
    getAllProductDetails(param) {
        const { limit, offset, id, sortName, sortPrice, productName, categoryName, filterCategory } = param;
        let orderSql = '';
        if (sortPrice || sortName) {
            const sortArray = this.getSortQueryForProductFetch(sortPrice, sortName);
            orderSql = `ORDER BY ${sortArray.join(',')}`;
        }
        let query = `${product_query_1.listAllProductsQuery}
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
            .rawQuery(query, dataValue, product_dto_2.ProductFetchDto)
            .pipe((0, rxjs_1.map)((resultData) => {
            return {
                message: 'Product detail Fetched successfully',
                data: resultData,
                pagination: {
                    total: resultData.length === 0 ? 0 : resultData[0].count
                }
            };
        }));
    }
    fetchProductOffers(productId, storeId, param) {
        const { limit, offset, sortField, sortOrder } = param;
        if (sortField) {
            if (!Object.keys(K.OFFER_LIST_SORT).includes(sortField))
                throw new common_1.BadRequestException();
        }
        const query = (0, product_query_1.fetchProductOffersQuery)(sortField, sortOrder, limit, offset);
        return this.databaseService
            .rawQuery(query, [productId, storeId], product_dto_2.FetchProductWiseOffersDto)
            .pipe((0, rxjs_1.map)((resultData) => {
            return {
                message: 'Product offers fetched sucessfully',
                data: resultData,
                pagination: {
                    total: resultData.length === 0 ? 0 : resultData[0].count
                }
            };
        }));
    }
    async fetchStoreWiseProductSkus(productId, storeId, jwtBody, param) {
        const { id, role } = jwtBody;
        if (role === roles_dto_1.UserRoles.STORE_ADMIN) {
            const status = await this.storeHelperService.checkStoreUnderAdmin(storeId, id);
            if (!status)
                throw new common_1.UnauthorizedException();
            const { filterColour, filterSize } = param;
            const fetchProductSkus = await (0, rxjs_1.firstValueFrom)(this.databaseService.rawQuery(product_query_1.fetchStoreWiseProductSkusQuery, [storeId, productId, filterColour, filterSize], product_dto_1.FetchStoreWiseSingleProductDetails));
            if (fetchProductSkus.length === 0)
                throw new common_1.NotFoundException();
            return {
                message: 'Succesfully fetched single product details',
                data: [fetchProductSkus[0]]
            };
        }
    }
    async productBulkUpload(file, jwtBody) {
        const { id } = jwtBody;
        const productList = file.products;
        const defaultCheck = (productList) => {
            const countArr = {};
            for (const sku of productList) {
                const productName = sku['product_name'];
                if (sku['default_product'] == 'true') {
                    if (countArr[productName] == undefined)
                        countArr[productName] = 0;
                    countArr[productName] += 1;
                    if (countArr[productName] > 1)
                        return productName;
                }
            }
            return '-1';
        };
        const defaultStatus = defaultCheck(productList);
        if (defaultStatus != '-1') {
            throw new common_1.BadRequestException({
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
        const idSet = await (0, rxjs_1.firstValueFrom)(this.databaseService.rawQuery((0, product_query_1.skuFetchQuery)([...productListSet]), [], product_dto_1.ProductListSetDto));
        if (idSet.length !== 0) {
            const idList = [];
            idSet.forEach((element) => {
                idList.push(element.id);
            });
            await (0, rxjs_1.firstValueFrom)(this.databaseService.rawQuery((0, product_query_1.skuUpdateQuery)(idList), [], product_dto_1.SkuIdListDto));
        }
        const queryLoop = (0, product_query_1.bulkProductUploadQuery)(file, id);
        try {
            this.databaseService.rawQuery('BEGIN;', [], section_dto_1.SectionIdDto);
            for (let i = 0; i < queryLoop.length; i++) {
                await (0, rxjs_1.firstValueFrom)(this.databaseService.rawQuery(queryLoop[i], [], section_dto_1.SectionIdDto));
            }
            this.databaseService.rawQuery('COMMIT;', [], section_dto_1.SectionIdDto);
            return {
                message: 'Successfully Inserted'
            };
        }
        catch (error) {
            this.databaseService.rawQuery('ROLLBACK;', [], section_dto_1.SectionIdDto);
            return error;
        }
    }
    fetchProductWiseOffers(productId, param) {
        const { limit, offset, sortField, sortOrder } = param;
        if (sortField) {
            if (!Object.keys(K.OFFER_LIST_SORT).includes(sortField))
                throw new common_1.BadRequestException();
        }
        const query = (0, product_query_1.fetchProductWiseOffersQuery)(sortField, sortOrder, limit, offset);
        return this.databaseService
            .rawQuery(query, [productId], product_dto_2.FetchProductWiseOffersDto)
            .pipe((0, rxjs_1.map)((resultData) => {
            return {
                message: 'Product offers fetched sucessfully',
                data: resultData,
                pagination: {
                    total: resultData.length === 0 ? 0 : resultData[0].count
                }
            };
        }));
    }
};
ProductService = __decorate([
    (0, common_1.Injectable)(),
    __metadata("design:paramtypes", [database_service_1.DatabaseService,
        store_helper_1.StoreHelperService])
], ProductService);
exports.ProductService = ProductService;
//# sourceMappingURL=product.service.js.map