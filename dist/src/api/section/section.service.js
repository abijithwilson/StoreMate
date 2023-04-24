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
exports.SectionService = void 0;
const section_dto_1 = require("./../dto/section.dto");
const common_1 = require("@nestjs/common");
const rxjs_1 = require("rxjs");
const database_service_1 = require("../../database/database.service");
const section_query_1 = require("../db-queries/section.query");
const section_dto_2 = require("../dto/section.dto");
const store_helper_1 = require("../../helper/store.helper");
const product_dto_1 = require("../dto/product.dto");
const utils_service_1 = require("../../utils/utils.service");
const K = require("../../shared/constants");
const roles_dto_1 = require("../dto/roles.dto");
const format = require("pg-format");
let SectionService = class SectionService {
    constructor(databaseService, storeHelperService) {
        this.databaseService = databaseService;
        this.storeHelperService = storeHelperService;
    }
    assignSection(body, storeId) {
        const { sectionId } = body;
        const query = (0, section_query_1.assignSectionQuery)(sectionId);
        return this.databaseService.rawQuery(query, [storeId], section_dto_2.SectionIdDto).pipe((0, rxjs_1.map)(() => {
            return {
                message: 'Section assigned successfully'
            };
        }));
    }
    async unAssignSection(sectionId, storeId, jwtBody) {
        const { id } = jwtBody;
        const storeStatus = await this.storeHelperService.checkStoreUnderAdmin(storeId, id);
        if (!storeStatus)
            throw new common_1.UnauthorizedException();
        const deleteStatus = await (0, rxjs_1.firstValueFrom)(this.databaseService.rawQuery(section_query_1.unAssignSection, [storeId, sectionId], section_dto_2.SectionIdDto));
        if (deleteStatus.length === 0)
            throw new common_1.NotFoundException();
        return {
            message: 'Sucessfully deleted section'
        };
    }
    async updateSection(sectionId, storeId, jwtBody, body) {
        const { id } = jwtBody;
        const storeStatus = await this.storeHelperService.checkStoreUnderAdmin(storeId, id);
        if (!storeStatus)
            throw new common_1.UnauthorizedException();
        const sectionStatus = await this.storeHelperService.checkSectionUnderStore(storeId, sectionId);
        if (!sectionStatus)
            throw new common_1.NotFoundException();
        body['updatedBy'] = id;
        const { query, data } = utils_service_1.UtilsService.generateUpdateQuery({
            tableName: K.TABLE_NAMES.SECTION,
            columnData: body,
            primaryKey: K.PRIMARY_KEYS.SECTION,
            keysToIgnore: [],
            whereCondition: `${K.PRIMARY_KEYS.SECTION}=${sectionId}`
        });
        const updateStatus = await (0, rxjs_1.firstValueFrom)(this.databaseService.rawQuery(query, data, section_dto_2.SectionIdDto));
        if (updateStatus.length === 0) {
            throw new common_1.BadRequestException();
        }
        return {
            message: 'Sucessfully updated  section name'
        };
    }
    async getStoreSectionDetails(storeId, param, jwtBody) {
        const { id, role } = jwtBody;
        const { limit, offset } = param;
        if (role === roles_dto_1.UserRoles.STORE_ADMIN) {
            const storeStatus = await this.storeHelperService.checkStoreUnderAdmin(storeId, id);
            if (!storeStatus)
                throw new common_1.UnauthorizedException();
        }
        const query = `${section_query_1.listStoreWiseSectionsQuery}
    ${limit ? `limit ${limit}` : ''}
    ${offset ? `offset ${offset}` : ''}`;
        const sectionList = await (0, rxjs_1.firstValueFrom)(this.databaseService.rawQuery(query, [storeId], section_dto_2.StoreWiseSectionDto));
        return {
            message: 'Successfully fetched store wise section details',
            data: sectionList,
            pagination: {
                total: sectionList.length === 0 ? 0 : sectionList[0].count
            }
        };
    }
    getDetailsOfAProductInASection(sectionId, productId, storeId, param, jwtBody) {
        const { filterColour, filterSize } = param;
        const { id } = jwtBody;
        let query = section_query_1.fetchDetailsOfAProductInASection;
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
            .rawQuery(query, dataValue, product_dto_1.FetchSingleProductDetailsResponseDto)
            .pipe((0, rxjs_1.map)((resultData) => {
            return {
                message: 'Successfully fetched',
                data: resultData
            };
        }));
    }
    async assignProductToSection(storeId, sectionId, body, jwtBody) {
        const { id } = jwtBody;
        const { productId } = body;
        const storeStatus = await this.storeHelperService.checkStoreUnderAdmin(storeId, id);
        if (!storeStatus)
            throw new common_1.UnauthorizedException();
        const sectionStatus = await this.storeHelperService.checkSectionUnderStore(storeId, sectionId);
        if (!sectionStatus)
            throw new common_1.NotFoundException();
        const query = (0, section_query_1.assignProductSection)(productId);
        const assignProductStatus = await (0, rxjs_1.firstValueFrom)(this.databaseService.rawQuery(query, [sectionId, storeId, ...productId], section_dto_2.SectionProductMapId));
        if (assignProductStatus.length === 0)
            throw new common_1.NotFoundException();
        return {
            message: 'Successfully assigned product'
        };
    }
    async sectionWiseProductUnassign(storeId, sectionId, productId, jwtBody) {
        const { id } = jwtBody;
        const storeStatus = await this.storeHelperService.checkStoreUnderAdmin(storeId, id);
        if (!storeStatus)
            throw new common_1.UnauthorizedException();
        const unassignProductStatus = await (0, rxjs_1.firstValueFrom)(this.databaseService.rawQuery(section_query_1.sectionWiseProductUnassignQuery, [storeId, sectionId, productId], section_dto_2.ProductIdDto));
        if (unassignProductStatus.length === 0) {
            throw new common_1.NotFoundException();
        }
        return {
            message: 'Successfully unassigned product from the section'
        };
    }
    async getStoreAssignedSectionDetails(storeId, param, jwtBody) {
        const { id } = jwtBody;
        const { sectionName } = param;
        const storeStatus = await this.storeHelperService.checkStoreUnderAdmin(storeId, id);
        if (!storeStatus)
            throw new common_1.UnauthorizedException();
        const dataValue = [storeId, sectionName ? `%${sectionName}%` : null];
        const sectionList = await (0, rxjs_1.firstValueFrom)(this.databaseService.rawQuery(section_query_1.sectionUnderStoreDropdownQuery, dataValue, section_dto_2.SectionDropDownList));
        return {
            message: 'Successfully collected',
            data: sectionList
        };
    }
    async getListOfProductsNotAssignedToAnySection(storeId, jwtBody) {
        const { id } = jwtBody;
        const storeStatus = await this.storeHelperService.checkStoreUnderAdmin(storeId, id);
        if (!storeStatus)
            throw new common_1.UnauthorizedException();
        return this.databaseService
            .rawQuery(section_query_1.ProductsNotAssignedToAnySection, [storeId], product_dto_1.ProductFetchResponseDto)
            .pipe((0, rxjs_1.map)((resultData) => {
            return {
                message: 'Fetched successfully',
                data: resultData
            };
        }));
    }
    getSectionAndSectionNotListedInStore(queryParam, jwtBody) {
        const { limit, offset, sortField, sortOrder, storeId } = queryParam;
        const { role } = jwtBody;
        if (sortField) {
            if (!Object.keys(K.SECTION_SORT).includes(sortField))
                throw new common_1.BadRequestException();
        }
        const query = (0, section_query_1.getSectionAndSectionNotListedInStoreQuery)(limit, offset, sortField, sortOrder);
        if (!storeId && role === K.ROLES[1])
            throw new common_1.NotFoundException('Store ID not available');
        const dataValue = [storeId && role === K.ROLES[1] ? storeId : null];
        return this.databaseService
            .rawQuery(query, dataValue, section_dto_2.SectionFetchDto)
            .pipe((0, rxjs_1.map)((resultData) => {
            return {
                message: 'Successfully fetched',
                data: resultData,
                pagination: {
                    total: resultData.length === 0 ? 0 : resultData[0].count
                }
            };
        }));
    }
    async fetchSectionWiseCategoryList(storeId, sectionId, param) {
        const { limit, offset } = param;
        const query = (0, section_query_1.fetchSectionWiseCategoryListQuery)(limit, offset);
        const categoryList = await (0, rxjs_1.firstValueFrom)(this.databaseService.rawQuery(query, [sectionId, storeId], section_dto_2.SectionWiseCategoriesDto));
        return {
            message: 'Successfully collected',
            data: categoryList,
            pagination: {
                total: categoryList.length === 0 ? 0 : categoryList[0].count
            }
        };
    }
    fetchWishlistProducts(storeId, sectionId, param, jwtBody) {
        const { searchName, sortPrice, filterCategory, filterSize, filterColour, filterPriceHigh, filterPriceLow, limit, offset } = param;
        const { id } = jwtBody;
        let { query } = (0, section_query_1.fetchWishlistProductsQuery)(filterCategory, filterColour, filterSize);
        const { dataValue } = (0, section_query_1.fetchWishlistProductsQuery)(filterCategory, filterColour, filterSize);
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
    ${sortPrice
            ? `ORDER BY discount_price ${sortPrice === 'true' ? 'ASC' : 'DESC'}`
            : 'ORDER BY mp.updated_at'}
       ${limit ? `limit ${limit}` : ''}
       ${offset ? `offset ${offset}` : ''}`;
        const searchValue = searchName ? `%${searchName}%` : null;
        return this.databaseService
            .rawQuery(query, [storeId, sectionId, id, searchValue, ...dataValue], section_dto_1.FetchWishlistProductsDto)
            .pipe((0, rxjs_1.map)((result) => {
            return {
                message: 'Wishlisted products fetched successfully',
                data: result,
                pagination: {
                    total: result.length === 0 ? 0 : result[0].count
                }
            };
        }));
    }
    fetchSectionWiseOfferList(storeId, sectionId, param) {
        const { limit, offset } = param;
        const query = (0, section_query_1.fetchSectionWiseOfferListQuery)(limit, offset);
        return this.databaseService
            .rawQuery(query, [storeId, sectionId], section_dto_2.SectionWiseOfferDto)
            .pipe((0, rxjs_1.map)((resultData) => {
            return {
                message: 'Successfully fetched',
                data: resultData,
                pagination: {
                    total: resultData.length === 0 ? 0 : resultData[0].count
                }
            };
        }));
    }
    fetchProductFilterData(storeId, sectionId, param, jwtBody) {
        const { id } = jwtBody;
        const { filterCategory, offerId, wishlist } = param;
        const { query, dataValue } = (0, section_query_1.fetchProductFiltersQuery)(filterCategory, wishlist);
        return this.databaseService
            .rawQuery(query, wishlist ?
            [storeId, sectionId, offerId, id, ...dataValue] :
            [storeId, sectionId, offerId, ...dataValue], section_dto_1.ProductFilterData)
            .pipe((0, rxjs_1.map)((resultData) => {
            return {
                message: 'Successfully fetched product filter data',
                data: resultData
            };
        }));
    }
    async assignProductsToWishlist(body, jwtBody) {
        const { storeId, sectionId, productId } = body;
        const productStatus = await this.storeHelperService.checkProductUnderStore(storeId, sectionId, productId);
        if (!productStatus)
            throw new common_1.BadRequestException();
        const { id } = jwtBody;
        body['user_id'] = id;
        const { query, value } = utils_service_1.UtilsService.generateInsertQuery(K.TABLE_NAMES.WISHLIST, K.PRIMARY_KEYS.WISHLIST, body, []);
        const finalQuery = format(query, value);
        return this.databaseService.rawQuery(finalQuery, [], section_dto_2.ProductIdDto).pipe((0, rxjs_1.map)(() => {
            return {
                message: 'Successfully assigned products to wishlist'
            };
        }));
    }
    async unassignProductFromWishlist(storeId, productId, jwtBody) {
        const { id } = jwtBody;
        const deleteStatus = await (0, rxjs_1.firstValueFrom)(this.databaseService.rawQuery(section_query_1.unAssignProductFromWishlistQuery, [id, storeId, productId], section_dto_2.SectionIdDto));
        if (deleteStatus.length === 0)
            throw new common_1.NotFoundException();
        return {
            message: 'Successfully unassigned product from wishlist'
        };
    }
    fetchSectionVisitData(storeId, param, jwtBody) {
        const { id } = jwtBody;
        const { limit, offset, searchName } = param;
        const query = (0, section_query_1.fetchSectionVisitsQuery)(limit, offset);
        return this.databaseService
            .rawQuery(query, [id, storeId, searchName], section_dto_1.SectionVisitDataDto)
            .pipe((0, rxjs_1.map)((resultData) => {
            return {
                message: 'Successfully fetched user section visit data',
                data: resultData
            };
        }));
    }
};
SectionService = __decorate([
    (0, common_1.Injectable)(),
    __metadata("design:paramtypes", [database_service_1.DatabaseService,
        store_helper_1.StoreHelperService])
], SectionService);
exports.SectionService = SectionService;
//# sourceMappingURL=section.service.js.map