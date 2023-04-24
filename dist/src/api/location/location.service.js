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
exports.LocationService = void 0;
const location_dto_1 = require("./../dto/location.dto");
const rxjs_1 = require("rxjs");
const common_1 = require("@nestjs/common");
const database_service_1 = require("../../database/database.service");
const utils_service_1 = require("../../utils/utils.service");
const K = require("../../shared/constants");
let LocationService = class LocationService {
    constructor(databaseService) {
        this.databaseService = databaseService;
    }
    fetchCountry() {
        const query = utils_service_1.UtilsService.generateSelectQuery({
            tableName: K.TABLE_NAMES.COUNTRY,
            columnData: K.SELECT_COUNTRY_COLUMN_DATA
        });
        return this.databaseService.rawQuery(query, [], location_dto_1.LocationDto).pipe((0, rxjs_1.map)((result) => {
            return {
                message: 'Country collected successfully',
                data: result
            };
        }));
    }
    fetchState(countryId) {
        const query = utils_service_1.UtilsService.generateSelectQuery({
            tableName: K.TABLE_NAMES.STATE,
            columnData: K.SELECT_STATE_COLUMN_DATA,
            whereCondition: `${K.PRIMARY_KEYS.COUNTRY} = ${countryId}`
        });
        return this.databaseService.rawQuery(query, [], location_dto_1.LocationDto).pipe((0, rxjs_1.map)((result) => {
            return {
                message: 'State collected successfully',
                data: result
            };
        }));
    }
    fetchDistrict(stateId) {
        const query = utils_service_1.UtilsService.generateSelectQuery({
            tableName: K.TABLE_NAMES.DISTRICT,
            columnData: K.SELECT_DISTRICT_COLUMN_DATA,
            whereCondition: `${K.PRIMARY_KEYS.STATE} = ${stateId}`
        });
        return this.databaseService.rawQuery(query, [], location_dto_1.LocationDto).pipe((0, rxjs_1.map)((result) => {
            return {
                message: 'District collected successfully',
                data: result
            };
        }));
    }
};
LocationService = __decorate([
    (0, common_1.Injectable)(),
    __metadata("design:paramtypes", [database_service_1.DatabaseService])
], LocationService);
exports.LocationService = LocationService;
//# sourceMappingURL=location.service.js.map