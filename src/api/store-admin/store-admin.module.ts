import { StoreHelperService } from 'src/helper/store.helper';
import { Module } from '@nestjs/common';
import { DatabaseModule } from 'src/database/database.module';
import { StoreAdminController } from './store-admin.controller';
import { StoreAdminService } from './store-admin.service';

@Module({
  imports: [DatabaseModule],
  controllers: [StoreAdminController],
  providers: [StoreAdminService, StoreHelperService]
})
export class StoreAdminModule {}
