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
exports.StoreAdminService = void 0;
const store_admin_dto_1 = require("./../dto/store-admin.dto");
const database_service_1 = require("../../database/database.service");
const utils_service_1 = require("./../../utils/utils.service");
const common_1 = require("@nestjs/common");
const rxjs_1 = require("rxjs");
const K = require("../../shared/constants");
const store_admin_dto_2 = require("../dto/store-admin.dto");
const store_admin_query_1 = require("../db-queries/store-admin.query");
const store_admin_query_2 = require("../db-queries/store-admin.query");
const store_helper_1 = require("../../helper/store.helper");
const beacon_dto_1 = require("../dto/beacon.dto");
const roles_dto_1 = require("../dto/roles.dto");
let StoreAdminService = class StoreAdminService {
    constructor(databaseService, storeHelperService) {
        this.databaseService = databaseService;
        this.storeHelperService = storeHelperService;
    }
    storeAdminProfileUpdate(id, body, jwtBody) {
        if (id !== Number(jwtBody.id)) {
            throw new common_1.UnauthorizedException();
        }
        body['updatedBy'] = jwtBody.id;
        const updateQueryAndValue = utils_service_1.UtilsService.generateUpdateQuery({
            tableName: K.TABLE_NAMES.ADMIN,
            primaryKey: K.PRIMARY_KEYS.ADMIN,
            keysToIgnore: [],
            whereCondition: `admin_id=${id} AND is_deleted=false`,
            columnData: body
        });
        return this.databaseService
            .rawQuery(updateQueryAndValue.query, updateQueryAndValue.data, store_admin_dto_2.StoreAdminUpdateDto)
            .pipe((0, rxjs_1.map)((result) => {
            if (result.length === 0)
                throw new common_1.NotFoundException();
            return { message: 'Updated  store admin profile successfully' };
        }));
    }
    fetchStoreAdminProfile(id, jwtBody) {
        if (id !== Number(jwtBody.id)) {
            throw new common_1.UnauthorizedException();
        }
        return this.databaseService
            .rawQuery(store_admin_query_2.fetchStoreAdminProfile, [id], store_admin_dto_2.StoreAdminProfileFetchResponseDto)
            .pipe((0, rxjs_1.map)((result) => {
            if (result.length === 0)
                throw new common_1.NotFoundException();
            return {
                message: 'Admin Profile retrieved successfully',
                data: result[0]
            };
        }));
    }
    fetchAssignedStores(param, id, jwtBody) {
        if (id != jwtBody.id) {
            throw new common_1.UnauthorizedException();
        }
        const { offset, limit } = param;
        const query = `${store_admin_query_1.fetchAssignedStores}
    ${limit ? `limit ${limit}` : ''}
    ${offset ? `offset ${offset}` : ''}`;
        return this.databaseService
            .rawQuery(query, [id], store_admin_dto_1.FetchAssignedStoresResponseDto)
            .pipe((0, rxjs_1.map)((result) => {
            if (result.length === 0)
                throw new common_1.NotFoundException();
            return {
                message: 'Assigned stores fetched successfully',
                data: result,
                pagination: {
                    total: result.length === 0 ? 0 : result[0].count
                }
            };
        }));
    }
    async fetchSectionWiseProducts(storeAdminId, storeId, sectionId, jwtBody, param) {
        const { id, role } = jwtBody;
        if (role === roles_dto_1.UserRoles.STORE_ADMIN) {
            if (id != storeAdminId)
                throw new common_1.ForbiddenException();
            const storeStatus = await this.storeHelperService.checkStoreUnderAdmin(storeId, id);
            if (!storeStatus)
                throw new common_1.UnauthorizedException();
        }
        const SectionStatus = await this.storeHelperService.checkSectionUnderStore(storeId, sectionId);
        if (!SectionStatus)
            throw new common_1.NotFoundException();
        const { limit, offset, sortField, sortOrder, filterCategory } = param;
        if (sortField) {
            if (!Object.keys(K.SECTION_PRODUCT_LIST_SORT).includes(sortField))
                throw new common_1.BadRequestException();
        }
        const { query, dataValue } = (0, store_admin_query_1.fetchSectionWiseProductsQuery)(filterCategory, sortField, sortOrder, limit, offset);
        const getSectionWiseProducts = await (0, rxjs_1.firstValueFrom)(this.databaseService.rawQuery(query, [storeId, sectionId, ...dataValue], store_admin_dto_1.FetchSectionWiseProductsDto));
        return {
            message: 'Successfully fetched section wise products',
            data: getSectionWiseProducts,
            pagination: {
                total: getSectionWiseProducts.length === 0 ?
                    0 :
                    getSectionWiseProducts[0].count
            }
        };
    }
    async fetchVisitorsCount(storeId, sectionId, jwtBody) {
        const { id, role } = jwtBody;
        if (role === roles_dto_1.UserRoles.STORE_ADMIN) {
            const storeStatus = await this.storeHelperService.checkStoreUnderAdmin(storeId, id);
            if (!storeStatus)
                throw new common_1.UnauthorizedException();
        }
        const dataValue = [storeId, sectionId];
        return this.databaseService
            .rawQuery(store_admin_query_1.fetchVisitorsCount, dataValue, store_admin_dto_1.FetchVisitorsCountResponseDto)
            .pipe((0, rxjs_1.map)((resultData) => {
            return {
                message: 'Successfully fetched',
                data: resultData[0]
            };
        }));
    }
    async fetchBeaconUnderStore(storeAdminId, storeId, param, jwtBody) {
        const { limit, offset, sectionId } = param;
        const { id, role } = jwtBody;
        if (role === roles_dto_1.UserRoles.STORE_ADMIN) {
            if (storeAdminId != id) {
                throw new common_1.UnauthorizedException();
            }
            const storeStatus = await this.storeHelperService.checkStoreUnderAdmin(storeId, id);
            if (!storeStatus)
                throw new common_1.UnauthorizedException();
        }
        const query = (0, store_admin_query_1.BeaconFetchQuery)(limit, offset);
        const beaconList = await (0, rxjs_1.firstValueFrom)(this.databaseService.rawQuery(query, [storeId, sectionId ? sectionId : null], store_admin_dto_1.BeaconFetchDto));
        return {
            message: 'Successfully fetched store wise beacon',
            data: beaconList,
            pagination: {
                total: beaconList.length === 0 ? 0 : beaconList[0].count
            }
        };
    }
    async fetchUnassignedBeacons(adminId, storeId, jwtBody) {
        const { id } = jwtBody;
        if (adminId != id)
            throw new common_1.UnauthorizedException();
        const storeStatus = await this.storeHelperService.checkStoreUnderAdmin(storeId, id);
        if (!storeStatus)
            throw new common_1.UnauthorizedException();
        const query = utils_service_1.UtilsService.generateSelectQuery({
            tableName: K.TABLE_NAMES.BEACON,
            columnData: K.SELECT_BEACON_DROPDOWN_DATA,
            whereCondition: `${K.STORE_ID}='${storeId}' AND section_id IS NULL`
        });
        const beaconListData = await (0, rxjs_1.firstValueFrom)(this.databaseService.rawQuery(query, [], beacon_dto_1.BeaconDropDownDto));
        return {
            message: 'Successfully fetched beacon details',
            data: beaconListData
        };
    }
    async assignBeacon(storeAdminId, storeId, sectionId, body, jwtBody) {
        const { id } = jwtBody;
        if (storeAdminId != id) {
            throw new common_1.ForbiddenException();
        }
        const storeStatus = await this.storeHelperService.checkStoreUnderAdmin(storeId, id);
        if (!storeStatus)
            throw new common_1.UnauthorizedException();
        const { beaconId } = body;
        const query = (0, store_admin_query_1.assignBeaconQuery)(beaconId);
        const assignBeaconStatus = await (0, rxjs_1.firstValueFrom)(this.databaseService.rawQuery(query, [sectionId, storeId, ...beaconId], store_admin_dto_1.BeaconIdDto));
        if (assignBeaconStatus.length === 0) {
            throw new common_1.BadRequestException();
        }
        return {
            message: 'Successfully assigned'
        };
    }
    async unAssignBeacon(storeAdminId, storeId, beaconId, jwtBody) {
        const { id } = jwtBody;
        if (storeAdminId != id) {
            throw new common_1.ForbiddenException();
        }
        const storeStatus = await this.storeHelperService.checkStoreUnderAdmin(storeId, id);
        if (!storeStatus)
            throw new common_1.UnauthorizedException();
        const unassignBeaconStatus = await (0, rxjs_1.firstValueFrom)(this.databaseService.rawQuery(store_admin_query_1.unAssignBeaconQuery, [beaconId, storeId], store_admin_dto_1.BeaconIdDto));
        if (unassignBeaconStatus.length === 0)
            throw new common_1.NotFoundException();
        return {
            message: 'Successfully unassigned section from beacon.'
        };
    }
};
StoreAdminService = __decorate([
    (0, common_1.Injectable)(),
    __metadata("design:paramtypes", [database_service_1.DatabaseService,
        store_helper_1.StoreHelperService])
], StoreAdminService);
exports.StoreAdminService = StoreAdminService;
//# sourceMappingURL=store-admin.service.js.map