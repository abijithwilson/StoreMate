import { ERROR_CODES } from 'src/shared/constants';
import {
  ArgumentMetadata,
  HttpException,
  HttpStatus,
  ValidationPipe,
  ValidationPipeOptions
} from '@nestjs/common';

export class CustomValidationPipe extends ValidationPipe {
  private readonly _isWeb: boolean;

  constructor(private options?: ValidationPipeOptions, isWeb = false) {
    super();
    this._isWeb = isWeb;
  }

  async transform(value: any, metadata: ArgumentMetadata): Promise<any> {
    this.validatorOptions = {
      ...this.validatorOptions,
      skipMissingProperties: false,
      whitelist: true,
      forbidNonWhitelisted: false,
      ...this.options
    };
    try {
      const result = await super.transform(value, metadata);
      return result;
    } catch (error) {
      let errorResponse = {};

      if (this._isWeb) {
        errorResponse = {
          code: -1,
          message: error.response.message.filter((x) => x)
        };
      } else {
        errorResponse = {
          statusCode: ERROR_CODES.BADREQUEST.statusCode,
          message: error.response.message
        };
      }

      throw new HttpException(errorResponse, HttpStatus.BAD_REQUEST);
    }
  }
}
