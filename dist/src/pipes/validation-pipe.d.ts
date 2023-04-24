import { ArgumentMetadata, ValidationPipe, ValidationPipeOptions } from '@nestjs/common';
export declare class CustomValidationPipe extends ValidationPipe {
    private options?;
    private readonly _isWeb;
    constructor(options?: ValidationPipeOptions, isWeb?: boolean);
    transform(value: any, metadata: ArgumentMetadata): Promise<any>;
}
