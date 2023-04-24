import { Module } from '@nestjs/common';
import { PassportModule } from '@nestjs/passport';
import { AuthService } from './auth.service';
import { JwtModule } from '@nestjs/jwt';
import { DatabaseModule } from 'src/database/database.module';
import { AuthController } from './auth.controller';
import { MailService } from 'src/mail/mail.service';
import { ConfigModule, ConfigService } from '@nestjs/config';
import { JwtPasswordResetStatergy } from './password-reset.strategy';
import { JwtRefreshStrategy } from './jwt-refresh.statergy';
import { JwtUserRefreshStrategy } from './jwt-user-refresh.statergy';
import { JwtTokenCheckStrategy } from './permission-check.strategy';

@Module({
  imports: [
    PassportModule,
    JwtModule.registerAsync({
      useFactory: async (configService: ConfigService) => ({
        secret: configService.get<string>('JWT_SECRET')
      }),
      inject: [ConfigService]
    }),
    DatabaseModule,
    ConfigModule
  ],

  controllers: [AuthController],
  providers: [
    AuthService,
    MailService,
    JwtRefreshStrategy,
    JwtPasswordResetStatergy,
    JwtUserRefreshStrategy,
    JwtTokenCheckStrategy
  ],
  exports: [AuthModule]
})
export class AuthModule {}
