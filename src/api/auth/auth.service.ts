import { AdminTypeDto } from './../dto/auth.dto';
import {
  Inject,
  Injectable,
  NotFoundException,
  UnauthorizedException
} from '@nestjs/common';
import { JwtService } from '@nestjs/jwt';
import {
  AdminForgotPasswordDTO,
  AdminDetailDto,
  MessageDto,
  IdDto,
  LoginDto,
  LoginResponseDto,
  LoginAdminDto,
  LoginUserDto,
  LoginUserBodyDto,
  UserDetailDto,
  UserForgotPasswordDTO
} from '../dto/auth.dto';
import { firstValueFrom, map, Observable } from 'rxjs';
import { DatabaseService } from 'src/database/database.service';
import { MailService } from 'src/mail/mail.service';
import { randomBytes } from 'crypto';
import { ConfigService } from '@nestjs/config';
import * as pbkdf2 from 'pbkdf2';
import { UtilsService } from 'src/utils/utils.service';
import { loginAdminQuery } from '../db-queries/auth.query';
import { ConfigType } from '@nestjs/config';
import * as K from '../../shared/constants';
import configuration from 'src/config/configuration';

@Injectable()
export class AuthService {
  constructor(
    private readonly jwtService: JwtService,
    private configService: ConfigService,
    @Inject(configuration.KEY) private config: ConfigType<typeof configuration>,
    private readonly databaseService: DatabaseService<any>,
    private mailService: MailService
  ) {}

  async adminLogin(pass, body: LoginDto): Promise<LoginResponseDto> {
    const { email } = body;

    const admin: LoginAdminDto[] = await firstValueFrom(
      this.databaseService.rawQuery(loginAdminQuery, [email], LoginAdminDto)
    );

    if (admin.length === 0) {
      throw new NotFoundException();
    }

    const { salt, password, roleName, adminId } = admin[0];
    const iteration: number = this.configService.get<number>('ITERATION');
    const passKeyLen: number = this.configService.get<number>(
      'PASSWORD_KEY_LENGTH'
    );
    const derivedKey = pbkdf2
      .pbkdf2Sync(pass, salt, iteration, passKeyLen)
      .toString('base64');

    if (password != derivedKey) {
      throw new UnauthorizedException();
    }

    const payload = { username: email, role: roleName, id: `${adminId}` };

    return {
      bearer_token: this.jwtService.sign(payload, {
        expiresIn: this.configService.get<string>('JWT_ACCESS_EXPIRE_IN')
      }),
      refresh_token: this.jwtService.sign(payload, {
        expiresIn: this.configService.get<string>('JWT_REFRESH_EXPIRE_IN'),
        secret: this.configService.get<string>('JWT_REFRESH_SECRET')
      })
    };
  }

  refreshToken(user: any) {
    return {
      bearer_token: this.jwtService.sign(user, {
        expiresIn: this.configService.get<string>('JWT_ACCESS_EXPIRE_IN')
      })
    };
  }

  async validateUser(body: LoginUserBodyDto): Promise<LoginResponseDto> {
    const { email } = body;

    const query = UtilsService.generateSelectQuery({
      tableName: K.TABLE_NAMES.USER,
      columnData: K.SELECT_LOGIN_COLUMN_DATA,
      whereCondition: `${K.EMAIL}='${email}'`
    });

    const user: LoginUserDto[] = await firstValueFrom(
      this.databaseService.rawQuery(query, [], LoginUserDto)
    );

    if (user.length === 0) {
      throw new NotFoundException();
    }

    const { salt, password, id } = user[0];
    const iteration: number = this.configService.get<number>('ITERATION');
    const passKeyLen: number = this.configService.get<number>(
      'PASSWORD_KEY_LENGTH'
    );
    const derivedKey = pbkdf2
      .pbkdf2Sync(body.password, salt, iteration, passKeyLen)
      .toString('base64');

    if (password !== derivedKey) {
      throw new UnauthorizedException();
    }

    const payload = { username: email, id: `${id}`, role: K.USER };

    return {
      bearer_token: this.jwtService.sign(payload, {
        expiresIn: this.configService.get<string>('JWT_ACCESS_EXPIRE_IN')
      }),

      refresh_token: this.jwtService.sign(payload, {
        expiresIn: this.configService.get<string>('JWT_REFRESH_EXPIRE_IN'),
        secret: this.configService.get<string>('JWT_REFRESH_SECRET')
      })
    };
  }

  userRefreshToken(user: any) {
    return {
      bearer_token: this.jwtService.sign(user, {
        expiresIn: this.configService.get<string>('JWT_ACCESS_EXPIRE_IN')
      })
    };
  }

  async adminForgotPassword(body: AdminForgotPasswordDTO): Promise<MessageDto> {
    const { email } = body;
    const query = UtilsService.generateSelectQuery({
      tableName: K.TABLE_NAMES.ADMIN,
      columnData: ['first_name', 'admin_id'],
      whereCondition: `email='${email}'`
    });
    const admin: AdminDetailDto[] = await firstValueFrom(
      this.databaseService.rawQuery(query, [], AdminDetailDto)
    );

    if (admin.length === 0) throw new NotFoundException();

    const { firstName, adminId } = admin[0];
    const payload = { username: email, userId: adminId };
    const jwtToken = this.jwtService.sign(payload, {
      expiresIn: this.configService.get<string>(
        'JWT_FORGOT_PASSWORD_EXPIRE_IN'
      ),
      secret: this.configService.get<string>('JWT_FORGOT_PASSWORD_SECRET')
    });
    const url =
      this.config.mail.redirect_link +
      '?type=' +
      K.USERTYPE.ADMIN +
      '&token=' +
      jwtToken;
    return await this.mailService.sendLinkToEmail(email, firstName, url);
  }
  /**
   * Function for admin to reset password.
   * @param admintypebody - Consists of admin type to identify store admin
   * initial password setup. {@link param || AdminTypeDto}
   * @param password - Consists of password & confirm password in request
   * header. {@link param || AdminResetPasswordDTO}
   * @param password - consists of password & confirm password in
   * auth header.
   * @param resetBody
   * @returns a success message that the password was updated.
   */
  adminResetPassword(
    adminTypeBody: AdminTypeDto,
    password: any,
    resetBody: any
  ): Observable<MessageDto | Record<null, null>> {
    const iteration: number = this.configService.get<number>('ITERATION');
    const passKeyLen: number = this.configService.get<number>(
      'PASSWORD_KEY_LENGTH'
    );
    const salt = randomBytes(128).toString('base64');
    const derivedKey = pbkdf2
      .pbkdf2Sync(password, salt, iteration, passKeyLen)
      .toString('base64');
    const body = {};
    body['password'] = derivedKey;
    body['salt'] = salt;
    body['updatedBy'] = resetBody.id;
    const { adminType } = adminTypeBody;
    if (adminType === 3) {
      body['isActive'] = true;
    }
    const query = UtilsService.generateUpdateQuery({
      tableName: K.TABLE_NAMES.ADMIN,
      primaryKey: K.PRIMARY_KEYS.ADMIN,
      columnData: body,
      keysToIgnore: ['confirmPassword'],
      whereCondition: `email='${resetBody.email}'`
    });
    return this.databaseService.rawQuery(query.query, query.data, IdDto).pipe(
      map((result) => {
        if (result.length == 0) throw new NotFoundException();
        return { message: 'Password updated successfully' };
      })
    );
  }

  async userForgotPassword(body: UserForgotPasswordDTO): Promise<MessageDto> {
    const { email } = body;
    const query = UtilsService.generateSelectQuery({
      tableName: K.TABLE_NAMES.USER,
      columnData: ['first_name', 'id'],
      whereCondition: `${K.EMAIL}='${email}'`
    });
    const user: UserDetailDto[] = await firstValueFrom(
      this.databaseService.rawQuery(query, [], UserDetailDto)
    );

    if (user.length === 0) throw new NotFoundException();
    const { firstName, userId } = user[0];
    const payload = { username: email, userId: userId };
    const jwtToken = this.jwtService.sign(payload, {
      expiresIn: this.config.jwt.forgot_password_expire_in,
      secret: this.config.jwt.forgot_password_secret
    });

    const url =
      this.config.mail.redirect_link +
      '?type=' +
      K.USERTYPE.USER +
      '&token=' +
      jwtToken;
    return await this.mailService.sendLinkToEmail(email, firstName, url);
  }

  userResetPassword(
    password: any,
    resetBody: any
  ): Observable<MessageDto | Record<null, null>> {
    const iteration: number = parseInt(this.config.password.iteration);
    const passKeyLen: number = parseInt(this.config.password.password_key_len);
    const salt = randomBytes(128).toString('base64');
    const derivedKey = pbkdf2
      .pbkdf2Sync(password, salt, iteration, passKeyLen)
      .toString('base64');
    const body = {};
    body['password'] = derivedKey;
    body['salt'] = salt;
    body['updatedBy'] = resetBody.id;
    const query = UtilsService.generateUpdateQuery({
      tableName: K.TABLE_NAMES.USER,
      primaryKey: K.PRIMARY_KEYS.USER,
      columnData: body,
      keysToIgnore: ['confirmPassword'],
      whereCondition: `email='${resetBody.email}'`
    });
    return this.databaseService.rawQuery(query.query, query.data, IdDto).pipe(
      map((result) => {
        if (result.length == 0) throw new NotFoundException();
        return { message: 'Password updated successfully' };
      })
    );
  }
}
