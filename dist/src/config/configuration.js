"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const config_1 = require("@nestjs/config");
exports.default = (0, config_1.registerAs)('config', () => ({
    environment: process.env.NODE_ENV,
    loggerLevel: process.env.LOGGER_LEVEL,
    prettyPrintLog: process.env.PRETTY_PRINT_LOG,
    port: process.env.PORT,
    pg: {
        dbHost: process.env.DB_HOST,
        dbPort: process.env.DB_PORT,
        dbName: process.env.DB_NAME,
        dbUsername: process.env.DB_USERNAME,
        dbPassword: process.env.DB_PASSWORD
    },
    jwt: {
        access_token_secret: process.env.JWT_SECRET,
        refresh_token_secret: process.env.JWT_REFRESH_SECRET,
        refresh_expire_in: process.env.JWT_REFRESH_EXPIRE_IN,
        access_expire_in: process.env.JWT_ACCESS_EXPIRE_IN,
        forgot_password_secret: process.env.JWT_FORGOT_PASSWORD_SECRET,
        forgot_password_expire_in: process.env.JWT_FORGOT_PASSWORD_EXPIRE_IN,
        admin_invitation_expire_in: process.env.JWT_FORGOT_PASSWORD_EXPIRE_IN,
        admin_invitation_secret: process.env.JWT_ADMIN_INVITATION_SECRET
    },
    mail: {
        mail_host: process.env.MAIL_HOST,
        mail_password: process.env.MAIL_PASSWORD,
        mail_from: process.env.MAIL_FROM,
        mail_port: process.env.MAIL_PORT,
        redirect_link: process.env.REDIRECT_LINK,
        admin_redirect_link: process.env.ADMIN_REDIRECT_LINK
    },
    password: {
        iteration: process.env.ITERATION,
        password_key_len: process.env.PASSWORD_KEY_LENGTH,
        password_hass_alg: process.env.PASSWORD_HASS_ALG
    },
    application_version: process.env.APPLICATION_VERSION
}));
//# sourceMappingURL=configuration.js.map