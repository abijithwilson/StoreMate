import { Module } from '@nestjs/common';
import { ApiModule } from './api/api.module';
import configuration from './config/configuration';
import validationSchema from './config/validation';
import { DatabaseModule } from './database/database.module';
import { HealthModule } from './health/health.module';
import { ConfigModule } from '@nestjs/config';
import { MailModule } from './mail/mail.module';
import { StoreHelperService } from './helper/store.helper';

@Module({
  imports: [
    ConfigModule.forRoot({
      isGlobal: true,
      load: [configuration],
      validationSchema
    }),
    DatabaseModule,
    MailModule,
    HealthModule,
    ApiModule,
    MailModule
  ],
  providers: [StoreHelperService],
  exports: [StoreHelperService]
})
export class AppModule {}
