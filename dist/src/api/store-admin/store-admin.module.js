"use strict";
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.StoreAdminModule = void 0;
const store_helper_1 = require("../../helper/store.helper");
const common_1 = require("@nestjs/common");
const database_module_1 = require("../../database/database.module");
const store_admin_controller_1 = require("./store-admin.controller");
const store_admin_service_1 = require("./store-admin.service");
let StoreAdminModule = class StoreAdminModule {
};
StoreAdminModule = __decorate([
    (0, common_1.Module)({
        imports: [database_module_1.DatabaseModule],
        controllers: [store_admin_controller_1.StoreAdminController],
        providers: [store_admin_service_1.StoreAdminService, store_helper_1.StoreHelperService]
    })
], StoreAdminModule);
exports.StoreAdminModule = StoreAdminModule;
//# sourceMappingURL=store-admin.module.js.map