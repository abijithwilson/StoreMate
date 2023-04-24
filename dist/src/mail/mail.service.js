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
exports.MailService = void 0;
const mailer_1 = require("@nestjs-modules/mailer");
const common_1 = require("@nestjs/common");
const K = require("./../shared/constants");
let MailService = class MailService {
    constructor(mailerService) {
        this.mailerService = mailerService;
    }
    async sendLinkToEmail(email, firstName, url) {
        return await this.mailerService
            .sendMail({
            to: email,
            subject: K.PASSWORD_RESET,
            template: './reset-password',
            context: {
                name: firstName,
                url: url,
                email: email
            }
        })
            .then(() => ({ message: K.EMAIL_SENT.Success }))
            .catch(() => ({ message: K.EMAIL_SENT.UnSuccess }));
    }
    async sendLinkToAdminEmail(email, firstName, url) {
        try {
            return await this.mailerService
                .sendMail({
                to: email,
                subject: K.STORE_ADMIN_INVITATION,
                template: './storeadmin-invite',
                context: {
                    name: firstName,
                    url: url
                }
            })
                .then(() => ({ message: K.EMAIL_SENT.Success, statusCode: 201 }));
        }
        catch (error) {
            error.statusCode = 400;
            throw error;
        }
    }
};
MailService = __decorate([
    (0, common_1.Injectable)(),
    __metadata("design:paramtypes", [mailer_1.MailerService])
], MailService);
exports.MailService = MailService;
//# sourceMappingURL=mail.service.js.map