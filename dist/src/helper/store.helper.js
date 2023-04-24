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
exports.StoreHelperService = void 0;
const common_1 = require("@nestjs/common");
const rxjs_1 = require("rxjs");
const section_dto_1 = require("../api/dto/section.dto");
const database_service_1 = require("../database/database.service");
const utils_service_1 = require("../utils/utils.service");
const K = require("../shared/constants");
let StoreHelperService = class StoreHelperService {
    constructor(databaseService) {
        this.databaseService = databaseService;
    }
    async checkStoreUnderAdmin(storeId, id) {
        const checkStoreUnderAdminQuery = utils_service_1.UtilsService.generateSelectQuery({
            tableName: K.TABLE_NAMES.STORE_ADMIN_MAP,
            whereCondition: `store_id =${storeId} AND admin_id= ${id}`,
            columnData: K.SELECT_STORE_UNDER_ADMIN
        });
        const checkStoreUnderAdmin = await (0, rxjs_1.firstValueFrom)(this.databaseService.rawQuery(checkStoreUnderAdminQuery, [], section_dto_1.StoreSectionIdDto));
        if (checkStoreUnderAdmin.length === 0) {
            return false;
        }
        return true;
    }
    async checkSectionUnderStore(storeId, sectionId) {
        const checkSectionUnderStoreQuery = utils_service_1.UtilsService.generateSelectQuery({
            tableName: K.TABLE_NAMES.SECTION_STORE_MAP,
            whereCondition: `store_id =${storeId} AND section_id = ${sectionId}`,
            columnData: K.SELECT_SECTION_UNDER_STORE
        });
        const checkSectionUnderStore = await (0, rxjs_1.firstValueFrom)(this.databaseService.rawQuery(checkSectionUnderStoreQuery, [], section_dto_1.SectionIdDto));
        if (checkSectionUnderStore.length === 0) {
            return false;
        }
        return true;
    }
    async checkProductUnderStore(storeId, sectionId, productId) {
        const checkProductUnderStoreQuery = utils_service_1.UtilsService.generateSelectQuery({
            tableName: K.TABLE_NAMES.SECTION_PRODUCT_MAP,
            whereCondition: `store_id = ${storeId} AND section_id = ${sectionId}
      AND product_id = ${productId}`,
            columnData: K.SELECT_PRODUCT_UNDER_STORE
        });
        const checkProductUnderStore = await (0, rxjs_1.firstValueFrom)(this.databaseService.rawQuery(checkProductUnderStoreQuery, [], section_dto_1.ProductIdDto));
        if (checkProductUnderStore.length === 0) {
            return false;
        }
        return true;
    }
};
StoreHelperService = __decorate([
    (0, common_1.Injectable)(),
    __metadata("design:paramtypes", [database_service_1.DatabaseService])
], StoreHelperService);
exports.StoreHelperService = StoreHelperService;
//# sourceMappingURL=store.helper.js.map