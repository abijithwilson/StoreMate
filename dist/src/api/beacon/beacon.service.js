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
exports.BeaconService = void 0;
const common_1 = require("@nestjs/common");
const rxjs_1 = require("rxjs");
const database_service_1 = require("../../database/database.service");
const utils_service_1 = require("../../utils/utils.service");
const beacon_dto_1 = require("../dto/beacon.dto");
const K = require("../../shared/constants");
const format = require("pg-format");
const beacon_query_1 = require("../db-queries/beacon.query");
const users_dto_1 = require("../dto/users.dto");
let BeaconService = class BeaconService {
    constructor(databaseService) {
        this.databaseService = databaseService;
    }
    createBeacon(body, jwtBody) {
        body['updatedBy'] = jwtBody.id;
        const { query, value } = utils_service_1.UtilsService.generateInsertQuery(K.TABLE_NAMES.BEACON, K.PRIMARY_KEYS.BEACON, body, []);
        const createQuery = format(query, value);
        return this.databaseService.rawQuery(createQuery, [], beacon_dto_1.BeaconIdDto).pipe((0, rxjs_1.map)((result) => {
            if (result.length == 0)
                throw new Error('Error in creation of Beacon, try again..!!');
            return { message: 'Beacon created successfully' };
        }));
    }
    deleteBeacon(id) {
        const deleteQuery = utils_service_1.UtilsService.generateDeleteQuery({
            tableName: K.TABLE_NAMES.BEACON,
            primaryKey: K.PRIMARY_KEYS.BEACON,
            value: id
        });
        return this.databaseService
            .rawQuery(deleteQuery.query, [], beacon_dto_1.BeaconIdDto)
            .pipe((0, rxjs_1.map)((result) => {
            if (result.length === 0)
                throw new common_1.NotFoundException();
            return { message: 'Beacon detail deleted successfully' };
        }));
    }
    updateBeacon(id, body, jwtBody) {
        body['updatedBy'] = jwtBody.id;
        const updateQueryAndValue = utils_service_1.UtilsService.generateUpdateQuery({
            tableName: K.TABLE_NAMES.BEACON,
            primaryKey: K.PRIMARY_KEYS.BEACON,
            keysToIgnore: K.KEYS_TO_IGNORE_IN_BEACON_UPDATE,
            whereCondition: `beacon_id = ${id}`,
            columnData: body
        });
        return this.databaseService
            .rawQuery(updateQueryAndValue.query, updateQueryAndValue.data, beacon_dto_1.BeaconIdDto)
            .pipe((0, rxjs_1.map)((result) => {
            if (result.length === 0)
                throw new common_1.NotFoundException();
            return { message: 'Updated beacon details successfully' };
        }));
    }
    getSortQueryForBeaconFetch(sortName) {
        const sortArray = [];
        if (sortName) {
            sortArray.push(`${K.TABLE_NAMES.BEACON}.${K.BEACON_NAME}  
      ${sortName === 'true' ? 'ASC' : 'DESC'}`);
        }
        return sortArray;
    }
    fetchBeaconList(param) {
        const { filterStore, limit, offset, sortName } = param;
        let orderQuery = '';
        if (sortName) {
            const sortArray = this.getSortQueryForBeaconFetch(sortName);
            orderQuery = `ORDER BY ${sortArray.join(',')}`;
        }
        let query = beacon_query_1.fetchBeaconListQuery;
        const dataValue = [];
        if (filterStore) {
            query = `${query} WHERE s.store_id = $1`;
            dataValue.push(filterStore);
        }
        query = `${query}
    ${orderQuery ? orderQuery : 'order by m_beacon.updated_at DESC'}
    ${limit ? `limit ${limit}` : ''}
    ${offset ? `offset ${offset}` : ''}
    `;
        return this.databaseService
            .rawQuery(query, dataValue, beacon_dto_1.FetchBeaconListDto)
            .pipe((0, rxjs_1.map)((resultData) => {
            return {
                message: 'Successfully fetched beacon list',
                data: resultData,
                pagination: {
                    total: resultData.length === 0 ? 0 : resultData[0].count
                }
            };
        }));
    }
    fetchStoreAndSectionOfBeacon(id) {
        return this.databaseService
            .rawQuery(beacon_query_1.getStoreAndSectionOfBeacon, [id], beacon_dto_1.StoreAndSectionOfBeaconResponseDto)
            .pipe((0, rxjs_1.map)((resultData) => {
            return {
                message: 'Successfully fetched',
                data: resultData[0]
            };
        }));
    }
    recordUserVisit(body, jwtBody) {
        const { majorId, userId } = body;
        if (userId !== Number(jwtBody.id))
            throw new common_1.UnauthorizedException();
        return this.databaseService
            .rawQuery(beacon_query_1.userVisitUpdateQuery, [userId, majorId], users_dto_1.UserIdDto)
            .pipe((0, rxjs_1.map)(() => {
            return {
                message: 'User visit detail update successfully'
            };
        }));
    }
};
BeaconService = __decorate([
    (0, common_1.Injectable)(),
    __metadata("design:paramtypes", [database_service_1.DatabaseService])
], BeaconService);
exports.BeaconService = BeaconService;
//# sourceMappingURL=beacon.service.js.map