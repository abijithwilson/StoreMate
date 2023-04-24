import { Module } from '@nestjs/common';
import { DatabaseModule } from 'src/database/database.module';
import { CustomLoggerModule } from './custom-logger/custom-logger.module';


@Module({
  imports: [DatabaseModule, CustomLoggerModule],
  providers: [],
  exports: [DatabaseModule, CustomLoggerModule]
})
export class SharedModule {}
