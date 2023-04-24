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
exports.StoreService = void 0;
const stores_query_1 = require("./../db-queries/stores.query");
const store_dto_1 = require("./../dto/store.dto");
const common_1 = require("@nestjs/common");
const rxjs_1 = require("rxjs");
const database_service_1 = require("../../database/database.service");
const utils_service_1 = require("../../utils/utils.service");
const stores_query_2 = require("../db-queries/stores.query");
const store_dto_2 = require("../dto/store.dto");
const K = require("../../shared/constants");
const auth_dto_1 = require("../dto/auth.dto");
const format = require("pg-format");
const store_helper_1 = require("../../helper/store.helper");
const product_dto_1 = require("../dto/product.dto");
const store_admin_dto_1 = require("../dto/store-admin.dto");
const roles_dto_1 = require("../dto/roles.dto");
const store_admin_query_1 = require("../db-queries/store-admin.query");
let StoreService = class StoreService {
    constructor(databaseService, storeHelperService) {
        this.databaseService = databaseService;
        this.storeHelperService = storeHelperService;
    }
    createStore(createBody, jwtBody) {
        createBody['updatedBy'] = jwtBody.id;
        const createQueryAndValue = utils_service_1.UtilsService.generateInsertQuery(K.TABLE_NAMES.STORE, K.PRIMARY_KEYS.STORE, createBody, []);
        const createQuery = format(createQueryAndValue.query, createQueryAndValue.value);
        return this.databaseService.rawQuery(createQuery, [], store_dto_2.StoreDto).pipe((0, rxjs_1.map)((result) => {
            if (result.length == 0)
                throw new Error('Error in creation of store, try again..!!');
            return { message: 'store created successfully' };
        }));
    }
    deleteStore(id) {
        const deleteQuery = utils_service_1.UtilsService.generateSoftDeleteQuery({
            tableName: K.TABLE_NAMES.STORE,
            primaryKey: K.PRIMARY_KEYS.STORE,
            value: id
        });
        return this.databaseService
            .rawQuery(deleteQuery.query, [], store_dto_2.StoreIdDto)
            .pipe((0, rxjs_1.map)((result) => {
            if (result.length == 0)
                throw new common_1.NotFoundException();
            return { message: 'store deleted successfully' };
        }));
    }
    getSingleStoreDetails(id) {
        return this.databaseService
            .rawQuery(stores_query_2.listSingleStoreQuery, [id], store_dto_2.SingleStoreDetailsDto)
            .pipe((0, rxjs_1.map)((result) => {
            if (result.length == 0)
                throw new common_1.NotFoundException();
            return {
                message: 'Store details fetched successfully',
                data: result
            };
        }));
    }
    getStoreDetails(param) {
        const { offset, limit, name, sortName, sortDistrict, id, filterCountry, filterDistrict, filterState } = param;
        let orderSql = '';
        if (sortDistrict || sortName) {
            const sortArray = this.getSortQueryForStoreFetch(sortDistrict, sortName);
            orderSql = `ORDER BY ${sortArray.join(',')}`;
        }
        const query = ` ${stores_query_2.listAllStoresQuery} 
    AND ($1::text is null or store_name LIKE '%${name}%' ) AND 
    ($2::text is null or CAST(store_id AS TEXT) LIKE '%${id}%')      
    AND ($3::text is null or countries.country_id IN (${filterCountry ? JSON.parse(filterCountry).join(',') : null}))  
    AND ($4::text is null or states.state_id IN (${filterState ? JSON.parse(filterState).join(',') : null})) 
    AND ($5::text is null or districts.district_id IN (${filterDistrict ? JSON.parse(filterDistrict).join(',') : null})) ${sortDistrict || sortName ? orderSql : 'order by m_store.updated_at DESC'}
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
        return this.databaseService.rawQuery(query, dataValue, store_dto_2.StoreFetchDto).pipe((0, rxjs_1.map)((resultData) => {
            return {
                message: 'Store detail Fetched successfully',
                data: resultData,
                pagination: {
                    total: resultData.length === 0 ? 0 : resultData[0].count
                }
            };
        }));
    }
    updateStoreProfile(id, body, jwtBody) {
        body['updatedBy'] = jwtBody.id;
        const updateQueryAndValue = utils_service_1.UtilsService.generateUpdateQuery({
            tableName: K.TABLE_NAMES.STORE,
            primaryKey: K.PRIMARY_KEYS.STORE,
            keysToIgnore: [K.PRIMARY_KEYS.STORE],
            whereCondition: `${K.PRIMARY_KEYS.STORE}=${id}`,
            columnData: body
        });
        return this.databaseService
            .rawQuery(updateQueryAndValue.query, updateQueryAndValue.data, store_dto_2.StoreIdDto)
            .pipe((0, rxjs_1.map)(() => {
            return { message: 'Updated store detail successfully' };
        }));
    }
    getSortQueryForStoreFetch(sortDistrict, sortName) {
        const sortArray = [];
        if (sortDistrict) {
            sortArray.push(`${K.TABLE_NAMES.DISTRICT}.${K.DISTRICT_NAME} 
        ${sortDistrict === 'true' ? 'ASC' : 'DESC'}`);
        }
        if (sortName) {
            sortArray.push(`${K.STORE_NAME}  
      ${sortName === 'true' ? 'ASC' : 'DESC'}`);
        }
        return sortArray;
    }
    fetchStoreName(param) {
        const { storeName } = param;
        const { query, dataValue } = (0, stores_query_1.storeNameQuery)(storeName);
        return this.databaseService.rawQuery(query, dataValue, store_dto_1.StoreNameDto);
    }
    viewNearbyStores(jwtBody, param) {
        const { longitude, latitude, limit, offset } = param;
        const query = `${(0, stores_query_2.nearbyStoresQuery)(latitude, longitude)} 
    ${limit ? `limit ${limit}` : ''}
    ${offset ? `offset ${offset}` : ''}`;
        return this.databaseService.rawQuery(query, [], store_dto_2.NearbyStoreResultDto).pipe((0, rxjs_1.map)((resultData) => {
            return {
                message: 'Nearby stores fetched successfully',
                data: resultData,
                pagination: {
                    total: resultData.length
                }
            };
        }));
    }
    deleteRewardPoints(param) {
        const { rewardId } = param;
        const query = utils_service_1.UtilsService.generateBulkDeleteQuery({
            tableName: K.TABLE_NAMES.REWARD,
            primaryKey: K.PRIMARY_KEYS.REWARD,
            value: rewardId
        });
        return this.databaseService.rawQuery(query, [], store_dto_1.RewardIdDto).pipe((0, rxjs_1.map)((result) => {
            return {
                message: result.length === rewardId.length ?
                    'Deleted all entries successfully' :
                    'Partial deletion occured'
            };
        }));
    }
    viewStoreRewardDetails(jwtBody, param) {
        const { limit, offset } = param;
        const query = `${stores_query_2.rewardDetailsFetchQuery} 
    ${limit ? `limit ${limit}` : ''}
    ${offset ? `offset ${offset}` : ''}`;
        return this.databaseService
            .rawQuery(query, [], store_dto_1.RewardDetailsOfStoreResponseDto)
            .pipe((0, rxjs_1.map)((resultData) => {
            return {
                message: 'Store reward details fetched successfully',
                data: resultData,
                pagination: {
                    total: resultData.length === 0 ? 0 : resultData[0].count
                }
            };
        }));
    }
    insertStoreRewardPoints(createBody, jwtBody) {
        const { id } = jwtBody;
        const { totalPoints, perVisitPoints, storeId } = createBody;
        if (totalPoints <= perVisitPoints) {
            throw new common_1.BadRequestException();
        }
        const assignedStoreIdValues = storeId ? storeId.join() : '';
        const rewardPointQuery = (0, stores_query_2.insertStoreRewardPointsQuery)(assignedStoreIdValues);
        return this.databaseService
            .rawQuery(rewardPointQuery, [perVisitPoints, totalPoints, id], store_dto_1.StoreRewardDto)
            .pipe((0, rxjs_1.map)(() => {
            return { message: 'Inserted reward points successfully' };
        }));
    }
    storeWithoutRewards() {
        const query = stores_query_2.fetchStoreWithoutRewardQuery;
        return this.databaseService
            .rawQuery(query, [], store_dto_1.StoreWithoutRewardsDto)
            .pipe((0, rxjs_1.map)((resultData) => {
            return {
                message: 'Fetched store details successfully',
                data: resultData
            };
        }));
    }
    async updateSkuUnderStore(storeId, productId, jwtBody, body) {
        const { deletedSkuId, createdSkuId } = body;
        const { id } = jwtBody;
        const storeStatus = await this.storeHelperService.checkStoreUnderAdmin(storeId, id);
        if (!storeStatus)
            throw new common_1.UnauthorizedException();
        if (deletedSkuId.length !== 0) {
            const query = (0, stores_query_2.DeleteSkuUnderStore)(deletedSkuId);
            const deleteStatus = await (0, rxjs_1.firstValueFrom)(this.databaseService.rawQuery(query, deletedSkuId, store_dto_2.StoreIdDto));
            if (deleteStatus.length === 0)
                throw new common_1.NotFoundException();
        }
        if (createdSkuId.length !== 0) {
            const query = (0, stores_query_2.insertSkuUnderStore)(createdSkuId);
            const instertStatus = await (0, rxjs_1.firstValueFrom)(this.databaseService.rawQuery(query, [storeId, productId], store_dto_2.StoreIdDto));
            if (instertStatus.length === 0)
                throw new common_1.BadRequestException();
        }
        return {
            message: 'Successfully updated'
        };
    }
    async getSkuDetailUnderStore(storeId, productId, jwtBody) {
        const { id } = jwtBody;
        const status = await this.storeHelperService.checkStoreUnderAdmin(storeId, id);
        if (!status)
            throw new common_1.UnauthorizedException();
        const getAllSku = await (0, rxjs_1.firstValueFrom)(this.databaseService.rawQuery(stores_query_2.skuUnderStoreAndProductQuery, [productId, storeId], store_dto_1.SkuUnderStore));
        return {
            message: 'Successfully collected',
            data: getAllSku
        };
    }
    updateStoreRewardPoints(updateBody, jwtBody) {
        const { storeId, totalPoints, perVisitPoints } = updateBody;
        if (totalPoints <= perVisitPoints) {
            throw new common_1.BadRequestException();
        }
        const { id } = jwtBody;
        const dataValue = [totalPoints, perVisitPoints, id, ...storeId];
        const query = (0, stores_query_2.StoreRewardUpdateQuery)(storeId);
        return this.databaseService
            .rawQuery(query, dataValue, store_dto_1.StoreRewardEditDto)
            .pipe((0, rxjs_1.map)(() => {
            return {
                message: 'Updated store reward details successfully'
            };
        }));
    }
    async fetchStoreWiseProductList(storeId, param, jwtBody) {
        const { id } = jwtBody;
        const { limit, offset, filterCategory } = param;
        const dataValue = [storeId];
        let query = stores_query_1.fetchStoreWiseProductListQuery;
        if (filterCategory) {
            query = `${query} and mp.category_id = $2`;
            dataValue.push(filterCategory);
        }
        query = `${query} order by mp.updated_by DESC`;
        query = `${query}
    ${limit ? `limit ${limit}` : ''}
    ${offset ? `offset ${offset}` : ''}
    `;
        const status = await this.storeHelperService.checkStoreUnderAdmin(storeId, id);
        if (!status)
            throw new common_1.UnauthorizedException();
        const getAllProducts = await (0, rxjs_1.firstValueFrom)(this.databaseService.rawQuery(query, dataValue, store_dto_1.FetchStoreWiseProducts));
        return {
            message: 'Successfully collected',
            data: getAllProducts,
            pagination: {
                total: getAllProducts.length === 0 ? 0 : getAllProducts[0].count
            }
        };
    }
    getProductAndSkuDetails(storeId, sectionId, param, jwtBody) {
        const { searchName, sortPrice, filterCategory, filterSize, filterColour, filterPriceHigh, filterPriceLow, limit, offset } = param;
        const { id } = jwtBody;
        let { query } = (0, stores_query_1.userProductFetchQuery)(filterCategory, filterColour, filterSize);
        const { dataValue } = (0, stores_query_1.userProductFetchQuery)(filterCategory, filterColour, filterSize);
        if (filterPriceHigh && filterPriceLow) {
            query = `${query} AND 
      (select (base_price - (sale_price_discount_percent * base_price)/100)
      from m_sku_table where product_id=mp.id and default_product=true)
       BETWEEN ${filterPriceLow} AND ${filterPriceHigh}`;
        }
        query = `${query} 
    group by mp.id, mp.product_name, mp.category_id, mc.name
    ${sortPrice
            ? `ORDER BY discount_price ${sortPrice === 'true' ? 'ASC' : 'DESC'}`
            : 'ORDER BY mp.updated_at'}
       ${limit ? `limit ${limit}` : ''}
       ${offset ? `offset ${offset}` : ''}`;
        const searchValue = searchName ? `%${searchName}%` : null;
        return this.databaseService
            .rawQuery(query, [storeId, sectionId, id, searchValue, ...dataValue], product_dto_1.UserProductFetchDto)
            .pipe((0, rxjs_1.map)((resultData) => {
            return {
                message: 'Fetched product details successfully',
                data: resultData,
                pagination: {
                    total: resultData.length === 0 ? 0 : resultData[0].count
                }
            };
        }));
    }
    getofferDetails(id, param) {
        const { sortField, sortOrder, searchName, limit, offset } = param;
        if (sortField) {
            if (!Object.keys(K.OFFER_LIST_SORT).includes(sortField))
                throw new common_1.BadRequestException();
        }
        const dataValue = [id, searchName ? `%${searchName}%` : null];
        const query = (0, stores_query_1.storeOfferFetchDetailQuery)(sortField, sortOrder, limit, offset);
        return this.databaseService
            .rawQuery(query, dataValue, store_dto_1.MessageStoreFetchDto)
            .pipe((0, rxjs_1.map)((resultData) => {
            return {
                message: 'Fetched offer details successfully',
                data: resultData,
                pagination: {
                    total: resultData.length === 0 ? 0 : resultData[0].count
                }
            };
        }));
    }
    assignOfferToStore(body) {
        const { query, value } = utils_service_1.UtilsService.generateInsertQuery(K.TABLE_NAMES.STORE_OFFER_MAP, K.PRIMARY_KEYS.STORE_OFFER_MAP, body, []);
        const finalQuery = format(query, value);
        return this.databaseService.rawQuery(finalQuery, [], auth_dto_1.MessageDto).pipe((0, rxjs_1.map)(() => {
            return {
                message: 'Offer assigned Successfully'
            };
        }));
    }
    unAssignOfferToStore(body) {
        const { storeId, offerId } = body;
        return this.databaseService
            .rawQuery(stores_query_1.unAssigninofferQuery, [storeId, offerId], store_dto_1.StoreOfferIdDto)
            .pipe((0, rxjs_1.map)((result) => {
            if (result.length === 0)
                throw new common_1.NotFoundException();
            return {
                message: 'Offer unassigned Successfully'
            };
        }));
    }
    fetchStoreList(param) {
        const { filterCountry, filterState, filterDistrict } = param;
        return this.databaseService
            .rawQuery(stores_query_1.fetchStoresQuery, [filterCountry, filterState, filterDistrict], store_dto_1.StoreListFetchDto)
            .pipe((0, rxjs_1.map)((result) => {
            return {
                message: 'Store list fetched successfully',
                data: result
            };
        }));
    }
    async fetchStoreDashboardData(storeId, jwtBody) {
        const { id, role } = jwtBody;
        if (role === roles_dto_1.UserRoles.STORE_ADMIN) {
            const status = await this.storeHelperService.checkStoreUnderAdmin(storeId, id);
            if (!status)
                throw new common_1.UnauthorizedException();
        }
        const storeDashData = await (0, rxjs_1.firstValueFrom)(this.databaseService.rawQuery(store_admin_query_1.fetchStoreDashboardDataQuery, [storeId], store_admin_dto_1.StoreDashboardDto));
        if (storeDashData.length === 0)
            throw new common_1.NotFoundException();
        return {
            message: 'Successfully fetched store dashboard data',
            data: storeDashData[0]
        };
    }
    async getStorePiechartDetails(storeId, param, jwtBody) {
        const { id, role } = jwtBody;
        const { span } = param;
        if (role === roles_dto_1.UserRoles.STORE_ADMIN) {
            const status = await this.storeHelperService.checkStoreUnderAdmin(storeId, id);
            if (!status)
                throw new common_1.UnauthorizedException();
        }
        if (span) {
            if (!Object.keys(K.SPAN_TYPE).includes(span))
                throw new common_1.BadRequestException();
        }
        const query = (0, stores_query_1.storeSectionPiechartQuery)(span);
        const data = await (0, rxjs_1.firstValueFrom)(this.databaseService.rawQuery(query, [storeId], store_dto_1.StoresPiechartDto));
        return {
            message: 'Sucessfully fetched',
            data: data.length !== 0 ? data[0] : []
        };
    }
    async getStoreVistorsTimeDetails(storeId, param, jwtBody) {
        const { id, role } = jwtBody;
        const { span, limit, offset } = param;
        if (role === roles_dto_1.UserRoles.STORE_ADMIN) {
            const status = await this.storeHelperService.checkStoreUnderAdmin(storeId, id);
            if (!status)
                throw new common_1.UnauthorizedException();
        }
        if (span) {
            if (!Object.keys(K.SPAN_TYPE).includes(span))
                throw new common_1.BadRequestException();
        }
        const query = (0, stores_query_1.vistorsLineGraphQuery)(span, limit, offset);
        const data = await (0, rxjs_1.firstValueFrom)(this.databaseService.rawQuery(query, [storeId], store_dto_1.SingleLinechartDto));
        return {
            message: 'Sucessfully fetched',
            data: data.length !== 0 ? data : []
        };
    }
    async getStoreBarchartDetails(storeId, param, jwtBody) {
        const { id, role } = jwtBody;
        const { span, limit, offset } = param;
        if (role === roles_dto_1.UserRoles.STORE_ADMIN) {
            const status = await this.storeHelperService.checkStoreUnderAdmin(storeId, id);
            if (!status)
                throw new common_1.UnauthorizedException();
        }
        if (span) {
            if (!Object.keys(K.SPAN_TYPE).includes(span))
                throw new common_1.BadRequestException();
        }
        const query = (0, stores_query_1.storeSectionBarchartQuery)(span, limit, offset);
        const data = await (0, rxjs_1.firstValueFrom)(this.databaseService.rawQuery(query, [storeId], store_dto_1.SingleBarchartDto));
        return {
            message: 'Sucessfully fetched',
            data: data.length !== 0 ? data : []
        };
    }
    getOfferWiseProductDetails(storeId, sectionId, offerId, param, jwtBody) {
        const { id } = jwtBody;
        const { searchName, filterCategory, filterSize, filterColour, filterPriceHigh, filterPriceLow, sortPrice, limit, offset } = param;
        let { query } = (0, stores_query_1.offerWiseProductFetchQuery)(filterCategory, filterColour, filterSize);
        const { dataValue } = (0, stores_query_1.offerWiseProductFetchQuery)(filterCategory, filterColour, filterSize);
        const searchValue = searchName ? `%${searchName}%` : null;
        if (filterPriceHigh && filterPriceLow) {
            query = `${query} AND 
      (select (base_price - (sale_price_discount_percent * base_price)/100)
      from m_sku_table where product_id=mp.id and default_product=true)
       BETWEEN ${filterPriceLow} AND ${filterPriceHigh}`;
        }
        query = `${query} 
    group by mp.id ,mp.product_name ,mp.category_id ,mc."name" 
    ${sortPrice
            ? `ORDER BY discount_price ${sortPrice === 'true' ? 'ASC' : 'DESC'}`
            : 'ORDER BY mp.updated_at'}
       ${limit ? `limit ${limit}` : ''}
       ${offset ? `offset ${offset}` : ''}`;
        return this.databaseService
            .rawQuery(query, [storeId, offerId, sectionId, id, searchValue, ...dataValue], store_dto_1.OfferWiseProduct)
            .pipe((0, rxjs_1.map)((result) => {
            return {
                message: 'Product list fetched successfully',
                data: result,
                pagination: {
                    total: result.length === 0 ? 0 : result[0].count
                }
            };
        }));
    }
    fetchStoreCountryData() {
        return this.databaseService
            .rawQuery(stores_query_1.storeCountryFetchQuery, [], store_dto_1.CountriesFilterData)
            .pipe((0, rxjs_1.map)((resultData) => {
            return {
                message: 'Successfully fetched store country data',
                data: resultData
            };
        }));
    }
    fetchStoreStateData(countryId) {
        return this.databaseService
            .rawQuery(stores_query_1.storeStateFetchQuery, [countryId], store_dto_1.StatesFilterData)
            .pipe((0, rxjs_1.map)((resultData) => {
            return {
                message: 'Successfully fetched store state data',
                data: resultData
            };
        }));
    }
    fetchStoreDistrictData(stateId) {
        return this.databaseService
            .rawQuery(stores_query_1.storeDistrictFetchQuery, [stateId], store_dto_1.DistrictsFilterData)
            .pipe((0, rxjs_1.map)((resultData) => {
            return {
                message: 'Successfully fetched store district data',
                data: resultData
            };
        }));
    }
    fetchLastVisitedStoresData(jwtBody, param) {
        const { id } = jwtBody;
        const { limit, offset, searchName } = param;
        const query = (0, stores_query_1.fetchLastVisitedStoresQuery)(limit, offset);
        return this.databaseService
            .rawQuery(query, [id, searchName], store_dto_1.LastVisitedStores)
            .pipe((0, rxjs_1.map)((resultData) => {
            return {
                message: 'Successfully fetched last visited store details',
                data: resultData
            };
        }));
    }
};
StoreService = __decorate([
    (0, common_1.Injectable)(),
    __metadata("design:paramtypes", [database_service_1.DatabaseService,
        store_helper_1.StoreHelperService])
], StoreService);
exports.StoreService = StoreService;
//# sourceMappingURL=store.service.js.map