import { Module } from '@nestjs/common';
import { CustomLogger } from './custom-logger.service';

@Module({
  imports: [],
  providers: [CustomLogger],
  exports: [CustomLogger]
})
export class CustomLoggerModule {}
