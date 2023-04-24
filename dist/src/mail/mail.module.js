"use strict";
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.MailModule = void 0;
const mailer_1 = require("@nestjs-modules/mailer");
const handlebars_adapter_1 = require("@nestjs-modules/mailer/dist/adapters/handlebars.adapter");
const common_1 = require("@nestjs/common");
const mail_service_1 = require("./mail.service");
const path_1 = require("path");
const config_1 = require("@nestjs/config");
const K = require("./../shared/constants");
let MailModule = class MailModule {
};
MailModule = __decorate([
    (0, common_1.Global)(),
    (0, common_1.Module)({
        imports: [
            mailer_1.MailerModule.forRootAsync({
                useFactory: async (configService) => ({
                    transport: {
                        host: configService.get('MAIL_HOST'),
                        secure: false,
                        auth: {
                            user: configService.get('MAIL_FROM'),
                            pass: configService.get('MAIL_PASSWORD')
                        }
                    },
                    defaults: {
                        from: `${K.APPLICATION_NAME} <${configService.get('MAIL_FROM')}>`
                    },
                    template: {
                        dir: (0, path_1.join)(__dirname, 'templates'),
                        adapter: new handlebars_adapter_1.HandlebarsAdapter(),
                        options: {
                            strict: true
                        }
                    }
                }),
                inject: [config_1.ConfigService]
            })
        ],
        providers: [mail_service_1.MailService],
        exports: [mail_service_1.MailService]
    })
], MailModule);
exports.MailModule = MailModule;
//# sourceMappingURL=mail.module.js.map