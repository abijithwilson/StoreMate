"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.File = void 0;
const common_1 = require("@nestjs/common");
const fs = require("fs");
const util = require("util");
const csv = require("csvtojson");
const stream = require("stream");
const uuid_1 = require("uuid");
exports.File = (0, common_1.createParamDecorator)(async (_data, ctx) => {
    const req = ctx.switchToHttp().getRequest();
    const file = req.incomingFile;
    const filePath = `${(0, uuid_1.v4)()}.csv`;
    const pipeline = util.promisify(stream.pipeline);
    const writeStream = fs.createWriteStream(filePath);
    await pipeline(file.file, writeStream);
    const jsonData = await csv().fromFile(filePath);
    fs.unlink(filePath, () => ({}));
    return { products: jsonData };
});
//# sourceMappingURL=file.decorator.js.map