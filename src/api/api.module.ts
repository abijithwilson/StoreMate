import { StoreAdminModule } from './store-admin/store-admin.module';
import { LocationModule } from './location/location.module';
import { Module } from '@nestjs/common';
import { AdminModule } from './admin/admin.module';
import { AuthModule } from './auth/auth.module';
import { UsersModule } from './users/users.module';
import { StoreModule } from './store/store.module';
import { ProductModule } from './product/product.module';
import { BeaconModule } from './beacon/beacon.module';
import { SectionModule } from './section/section.module';
import { APP_GUARD } from '@nestjs/core';
import { PermissionCheckGuard } from 'src/guards/permission-check.guard';
@Module({
  imports: [
    AdminModule,
    AuthModule,
    LocationModule,
    UsersModule,
    StoreModule,
    StoreAdminModule,
    ProductModule,
    BeaconModule,
    SectionModule
  ],
  providers: [
    {
      provide: APP_GUARD,
      useClass: PermissionCheckGuard
    }
  ]
})
export class ApiModule {}
