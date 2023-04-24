"use strict";
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.ApiModule = void 0;
const store_admin_module_1 = require("./store-admin/store-admin.module");
const location_module_1 = require("./location/location.module");
const common_1 = require("@nestjs/common");
const admin_module_1 = require("./admin/admin.module");
const auth_module_1 = require("./auth/auth.module");
const users_module_1 = require("./users/users.module");
const store_module_1 = require("./store/store.module");
const product_module_1 = require("./product/product.module");
const beacon_module_1 = require("./beacon/beacon.module");
const section_module_1 = require("./section/section.module");
const core_1 = require("@nestjs/core");
const permission_check_guard_1 = require("../guards/permission-check.guard");
let ApiModule = class ApiModule {
};
ApiModule = __decorate([
    (0, common_1.Module)({
        imports: [
            admin_module_1.AdminModule,
            auth_module_1.AuthModule,
            location_module_1.LocationModule,
            users_module_1.UsersModule,
            store_module_1.StoreModule,
            store_admin_module_1.StoreAdminModule,
            product_module_1.ProductModule,
            beacon_module_1.BeaconModule,
            section_module_1.SectionModule
        ],
        providers: [
            {
                provide: core_1.APP_GUARD,
                useClass: permission_check_guard_1.PermissionCheckGuard
            }
        ]
    })
], ApiModule);
exports.ApiModule = ApiModule;
//# sourceMappingURL=api.module.js.map