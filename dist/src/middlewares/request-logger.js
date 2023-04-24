"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.useRequestLogging = void 0;
const morgan = require("morgan");
const custom_logger_service_1 = require("../shared/custom-logger/custom-logger.service");
function useRequestLogging(app) {
    const logger = new custom_logger_service_1.CustomLogger('Http');
    app.use(morgan(':remote-addr - :remote-user ":method :url HTTP/:http-version"' +
        ':status :res[content-length] ":referrer" ":user-agent"    ', {
        skip: req => {
            return (process.env.NODE_ENV === 'production' || req.url === '/status.html');
        },
        stream: {
            write: (message) => logger.log(message.replace('\n', ''))
        }
    }));
}
exports.useRequestLogging = useRequestLogging;
//# sourceMappingURL=request-logger.js.map