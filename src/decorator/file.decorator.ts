import {
  createParamDecorator,
  ExecutionContext
} from '@nestjs/common';
import * as fs from 'fs';
import * as util from 'util';
import * as csv from 'csvtojson';
import * as stream from 'stream';
import { v4 as uuidv4 } from 'uuid';

export const File = createParamDecorator(
  async (_data: unknown, ctx: ExecutionContext) => {
    const req = ctx.switchToHttp().getRequest();
    const file = req.incomingFile;
    const filePath = `${uuidv4()}.csv`;
    const pipeline = util.promisify(stream.pipeline);
    const writeStream = fs.createWriteStream(filePath);
    await pipeline(file.file, writeStream);
    const jsonData = await csv().fromFile(filePath);
    fs.unlink(filePath, () => ({}));
    return { products: jsonData };
  }
);