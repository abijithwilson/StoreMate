"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const common_1 = require("@nestjs/common");
const config_1 = require("@nestjs/config");
const core_1 = require("@nestjs/core");
const platform_fastify_1 = require("@nestjs/platform-fastify");
const swagger_1 = require("@nestjs/swagger");
const app_module_1 = require("./app.module");
const param_guard_1 = require("./guards/param.guard");
const request_logger_1 = require("./middlewares/request-logger");
const constants_1 = require("./shared/constants/constants");
const custom_logger_service_1 = require("./shared/custom-logger/custom-logger.service");
const utils_service_1 = require("./utils/utils.service");
const package_json_1 = require("../package.json");
const fastify_multipart_1 = require("fastify-multipart");
async function bootstrap() {
    const logger = new custom_logger_service_1.CustomLogger('main');
    const app = await core_1.NestFactory.create(app_module_1.AppModule, new platform_fastify_1.FastifyAdapter({ bodyLimit: constants_1.MAX_JSON_REQUEST_SIZE }));
    app.useLogger(logger);
    (0, request_logger_1.useRequestLogging)(app);
    const config = app.get(config_1.ConfigService);
    const prefix = '/storemate/' + config.get('config.application_version');
    app.setGlobalPrefix(prefix);
    app.useGlobalGuards(new param_guard_1.ParamGuard());
    app.enableVersioning({
        type: common_1.VersioningType.URI
    });
    const port = config.get('config.port');
    const env = config.get('config.environment');
    if (process.env.NODE_ENV !== 'production') {
        app.enableCors({
            origin: true,
            methods: 'GET,HEAD,PUT,PATCH,POST,DELETE,OPTIONS',
            credentials: true
        });
    }
    if (process.env.SWAGGER_SERVER === 'true') {
        const options = new swagger_1.DocumentBuilder()
            .setTitle(utils_service_1.UtilsService.convertStringToSentenceCase(package_json_1.name.replace(/-/gi, ' ')))
            .setDescription(`${package_json_1.description}\nRunning on ${process.env.NODE_ENV} Mode`)
            .setVersion(package_json_1.version)
            .addServer(`http://${process.env.LOCALHOST}:${process.env.PORT}`, 'Local Dev Server')
            .addServer(`http://${process.env.DEV_SERVER_URL}:${process.env.PORT}`, 'Project Dev Server')
            .addBearerAuth({ type: 'http', scheme: 'bearer', bearerFormat: 'JWT' })
            .build();
        const document = swagger_1.SwaggerModule.createDocument(app, options);
        swagger_1.SwaggerModule.setup('api-docs', app, document);
    }
    app.register(fastify_multipart_1.default);
    await app.listen(port, '0.0.0.0');
    logger.log(`Listening on port ${port}, running in ${env} environment`);
}
bootstrap();
//# sourceMappingURL=main.js.map