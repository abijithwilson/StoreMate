import { StoreHelperService } from 'src/helper/store.helper';
import { Module } from '@nestjs/common';
import { DatabaseModule } from 'src/database/database.module';
import { StoreController } from './store.controller';
import { StoreService } from './store.service';

@Module({
  imports: [DatabaseModule],
  controllers: [StoreController],
  providers: [StoreService, StoreHelperService]
})
export class StoreModule {}
