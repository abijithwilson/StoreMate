"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.pgConnectionFactory = void 0;
const common_1 = require("@nestjs/common");
const pg_1 = require("pg");
const rxjs_1 = require("rxjs");
const operators_1 = require("rxjs/operators");
const configuration_1 = require("./../config/configuration");
const POSTGRES_CONNECTION = 'postgres_connection';
exports.pgConnectionFactory = {
    provide: POSTGRES_CONNECTION,
    useFactory: async (config) => {
        const logger = new common_1.Logger('pgConnectionFactory');
        const pool = new pg_1.Pool({
            host: config.pg.dbHost,
            database: config.pg.dbName,
            port: parseInt(config.pg.dbPort, 10),
            user: config.pg.dbUsername,
            password: config.pg.dbPassword
        });
        return (0, rxjs_1.lastValueFrom)((0, rxjs_1.from)(pool.connect()).pipe((0, operators_1.retryWhen)(e => e.pipe((0, operators_1.scan)((errorCount, error) => {
            logger.warn(`Unable to connect to database. ${error.message}. Retrying ${errorCount + 1}...`);
            if (errorCount + 1 > 9) {
                throw error;
            }
            return errorCount + 1;
        }, 0), (0, operators_1.delay)(1 * 1000))), (0, operators_1.tap)(() => {
            logger.log('Connected to Postgres Database successfully!');
        })));
    },
    inject: [configuration_1.default.KEY]
};
//# sourceMappingURL=database.provider.js.map