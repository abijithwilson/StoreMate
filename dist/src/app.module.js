"use strict";
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.AppModule = void 0;
const common_1 = require("@nestjs/common");
const api_module_1 = require("./api/api.module");
const configuration_1 = require("./config/configuration");
const validation_1 = require("./config/validation");
const database_module_1 = require("./database/database.module");
const health_module_1 = require("./health/health.module");
const config_1 = require("@nestjs/config");
const mail_module_1 = require("./mail/mail.module");
const store_helper_1 = require("./helper/store.helper");
let AppModule = class AppModule {
};
AppModule = __decorate([
    (0, common_1.Module)({
        imports: [
            config_1.ConfigModule.forRoot({
                isGlobal: true,
                load: [configuration_1.default],
                validationSchema: validation_1.default
            }),
            database_module_1.DatabaseModule,
            mail_module_1.MailModule,
            health_module_1.HealthModule,
            api_module_1.ApiModule,
            mail_module_1.MailModule
        ],
        providers: [store_helper_1.StoreHelperService],
        exports: [store_helper_1.StoreHelperService]
    })
], AppModule);
exports.AppModule = AppModule;
//# sourceMappingURL=app.module.js.map