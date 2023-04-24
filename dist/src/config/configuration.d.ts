declare const _default: (() => {
    environment: string;
    loggerLevel: string;
    prettyPrintLog: string;
    port: string;
    pg: {
        dbHost: string;
        dbPort: string;
        dbName: string;
        dbUsername: string;
        dbPassword: string;
    };
    jwt: {
        access_token_secret: string;
        refresh_token_secret: string;
        refresh_expire_in: string;
        access_expire_in: string;
        forgot_password_secret: string;
        forgot_password_expire_in: string;
        admin_invitation_expire_in: string;
        admin_invitation_secret: string;
    };
    mail: {
        mail_host: string;
        mail_password: string;
        mail_from: string;
        mail_port: string;
        redirect_link: string;
        admin_redirect_link: string;
    };
    password: {
        iteration: string;
        password_key_len: string;
        password_hass_alg: string;
    };
    application_version: string;
}) & import("@nestjs/config").ConfigFactoryKeyHost<{
    environment: string;
    loggerLevel: string;
    prettyPrintLog: string;
    port: string;
    pg: {
        dbHost: string;
        dbPort: string;
        dbName: string;
        dbUsername: string;
        dbPassword: string;
    };
    jwt: {
        access_token_secret: string;
        refresh_token_secret: string;
        refresh_expire_in: string;
        access_expire_in: string;
        forgot_password_secret: string;
        forgot_password_expire_in: string;
        admin_invitation_expire_in: string;
        admin_invitation_secret: string;
    };
    mail: {
        mail_host: string;
        mail_password: string;
        mail_from: string;
        mail_port: string;
        redirect_link: string;
        admin_redirect_link: string;
    };
    password: {
        iteration: string;
        password_key_len: string;
        password_hass_alg: string;
    };
    application_version: string;
}>;
export default _default;
