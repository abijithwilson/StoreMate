import { map } from 'rxjs/operators';
import {
  BadRequestException,
  ForbiddenException,
  HttpException,
  HttpStatus,
  Inject,
  Injectable,
  NotFoundException,
  UnauthorizedException
} from '@nestjs/common';
import {
  DeleteUserStatus,
  SignUpDto,
  UserUpdateDto,
  UserProfileViewDto,
  UserAddressUpdateDto,
  UserPasswordUpdateDto,
  UserAddressCreateDto,
  UserAddressIdDto,
  AddressDetailDto,
  AddressMessageDto,
  UserRewardUpdateDto,
  UserIdDto,
  BeaconIdDto
} from '../dto/users.dto';
import { firstValueFrom, Observable } from 'rxjs';
import { MessageDto } from 'src/api/dto/message.dto';
import * as pbkdf2 from 'pbkdf2';
import * as format from 'pg-format';
import * as K from '../../shared/constants';
import { randomBytes } from 'crypto';
import { DatabaseService } from 'src/database/database.service';
import { UtilsService } from 'src/utils/utils.service';
import { ConfigService } from '@nestjs/config';
import { ConfigType } from '@nestjs/config';
import { JwtBody } from '../dto/jwt.dto';
import configuration from 'src/config/configuration';
import { LoginUserDto } from '../dto/auth.dto';
import {
  fetchAddressDetailQuery,
  updateUserRewardQuery,
  userExitQuery
} from '../db-queries/users.query';

@Injectable()
export class UsersService {
  constructor(
    private readonly databaseService: DatabaseService<any>,
    private readonly configService: ConfigService,
    @Inject(configuration.KEY) private config: ConfigType<typeof configuration>
  ) {}

  signUp(signUpBody: SignUpDto): Observable<MessageDto | Record<null, null>> {
    const { password } = signUpBody;

    const salt = randomBytes(128).toString('base64');

    const iteration: number = parseInt(this.configService.get('ITERATION'));
    const passKeyLen: number = parseInt(
      this.configService.get('PASSWORD_KEY_LENGTH')
    );
    const derivedKey = pbkdf2
      .pbkdf2Sync(password, salt, iteration, passKeyLen)
      .toString('base64');

    signUpBody['password'] = derivedKey;
    signUpBody['salt'] = salt;

    const query = UtilsService.generateInsertQuery(
      K.TABLE_NAMES.USER,
      K.PRIMARY_KEYS.USER,
      signUpBody,
      K.KEYS_TO_IGNORE_IN_USER_INSERT
    );

    const userInsertQuery = format(query.query, query.value);

    return this.databaseService.rawQuery(userInsertQuery, [], SignUpDto).pipe(
      map((result) => {
        if (result.length == 0)
          throw new Error('Error in insertion of user, try again..!!');
        return { message: 'User inserted successfully' };
      })
    );
  }

  /**
   * Function is to hard delete user using id from jwt body
   * @param jwtBody -which contain regarding the user {@link jwtBody || JwtBody}
   * @returns a success message - {@link MessageDto}
   */

  userDelete(jwtBody: JwtBody): Observable<MessageDto | Record<null, null>> {
    const { id } = jwtBody;
    const deleteQuery = UtilsService.generateDeleteQuery({
      primaryKey: K.PRIMARY_KEYS.USER,
      tableName: K.TABLE_NAMES.USER,
      value: id
    });

    return this.databaseService
      .rawQuery(deleteQuery.query, [], DeleteUserStatus)
      .pipe(
        map(() => {
          return { message: 'User deleted successfully' };
        })
      );
  }

  /**
   * Function is to update user profile using id from jwt body
   * @param jwtBody -which contain regarding the user {@link jwtBody || JwtBody}
   * @param body - which contain the body for user
   * update {@link body || UserUpdateDto}
   * @returns a success message - {@link MessageDto}
   */
  userUpdate(
    jwtBody: JwtBody,
    body: UserUpdateDto
  ): Observable<MessageDto | Record<null, null>> {
    const { id } = jwtBody;
    body['updatedBy'] = id;
    const queryAndValue = UtilsService.generateUpdateQuery({
      tableName: K.TABLE_NAMES.USER,
      primaryKey: K.PRIMARY_KEYS.USER,
      keysToIgnore: [],
      whereCondition: `${K.PRIMARY_KEYS.USER}=${id}`,
      columnData: body
    });

    return this.databaseService
      .rawQuery(queryAndValue.query, queryAndValue.data, SignUpDto)
      .pipe(
        map(() => {
          return { message: 'User updated successfully' };
        })
      );
  }

  /**
   * Function is to fetch the details of a user
   * @param jwtBody contains payload that have user details
   * @returns returns a success message after fetching the details
   */
  userProfileView(
    jwtBody: JwtBody
  ): Observable<MessageDto | Record<null, null>> {
    const { id } = jwtBody;
    const query = UtilsService.generateSelectQuery({
      tableName: K.TABLE_NAMES.USER,
      columnData: K.USER_PROFILE_VIEW_COLOUMN_DATA,
      whereCondition: `${K.PRIMARY_KEYS.USER}='${id}'`
    });
    return this.databaseService.rawQuery(query, [], UserProfileViewDto).pipe(
      map((result) => {
        return {
          message: 'User details fetched successfully',
          data: result[0]
        };
      })
    );
  }

  /**
   *Function is to update the password of the user after login
   * @param userId id of the user as path param
   * @param jwtBody jwt that contains payload of the user
   * @param body which contain the body for
   * user password update {@link body || UserPasswordUpdateDto}
   * @returns returns a success message
   */

  async userPasswordUpdate(
    userId: number,
    jwtBody: JwtBody,
    body: UserPasswordUpdateDto
  ): Promise<MessageDto | Record<null, null>> {
    const { id, email } = jwtBody;
    if (id != userId) throw new UnauthorizedException();
    const { oldPassword, newPassword } = body;
    if (oldPassword === newPassword) throw new BadRequestException();
    const iteration: number = parseInt(this.config.password.iteration);
    const passKeyLen: number = parseInt(this.config.password.password_key_len);
    const newSalt = randomBytes(128).toString('base64');
    const newPasswordDerivedKey = pbkdf2
      .pbkdf2Sync(newPassword, newSalt, iteration, passKeyLen)
      .toString('base64');

    body['password'] = newPasswordDerivedKey;
    body['salt'] = newSalt;
    body['updatedBy'] = id;

    const selectQuery = UtilsService.generateSelectQuery({
      tableName: K.TABLE_NAMES.USER,
      columnData: K.SELECT_LOGIN_COLUMN_DATA,
      whereCondition: `${K.EMAIL}='${email}'`
    });

    const user: LoginUserDto[] = await firstValueFrom(
      this.databaseService.rawQuery(selectQuery, [], LoginUserDto)
    );

    const { password, salt } = user[0];
    const oldPasswordDerivedKey = pbkdf2
      .pbkdf2Sync(oldPassword, salt, iteration, passKeyLen)
      .toString('base64');

    if (password !== oldPasswordDerivedKey) throw new ForbiddenException();

    const query = UtilsService.generateUpdateQuery({
      tableName: K.TABLE_NAMES.USER,
      primaryKey: K.PRIMARY_KEYS.USER,
      columnData: body,
      keysToIgnore: ['oldPassword', 'newPassword'],
      whereCondition: `${K.EMAIL}='${email}'`
    });

    return this.databaseService
      .rawQuery(query.query, query.data, UserPasswordUpdateDto)
      .pipe(
        map(() => {
          return { message: 'User password updated successfully' };
        })
      );
  }

  /**
   * Function is to edit the address of a user
   * @param jwtBody contains payload that have user details
   * @param id id of the user whose address is updated.
   * @param body which contain the body for
   * user address update {@link body || UserAddressUpdateDto}
   *@returns A success message after update
   */
  userAddressUpdate(
    jwtBody: any,
    body: UserAddressUpdateDto,
    userId: number
  ): Observable<MessageDto | Record<null, null>> {
    const { id } = jwtBody;
    if (id != userId) throw new UnauthorizedException();
    const { query, data } = UtilsService.generateUpdateQuery({
      tableName: K.TABLE_NAMES.ADDRESS,
      primaryKey: K.PRIMARY_KEYS.ADDRESS,
      keysToIgnore: [],
      whereCondition: `${K.FOREIGN_KEYS.ADDRESS.USER}=${userId}`,
      columnData: body
    });
    return this.databaseService
      .rawQuery(query, data, UserAddressUpdateDto)
      .pipe(
        map(() => {
          return { message: 'User address updated successfully' };
        })
      );
  }

  /**
   * This API is to add address of the user
   * @param jwtBody contains payload that have user details
   * @param body which contain the body for
   * user address creation {@link body || UserAddressCreateDto}
   * @returns A success message after creation of address
   */

  userAddressCreate(
    jwtBody: any,
    body: UserAddressCreateDto
  ): Observable<MessageDto | Record<null, null>> {
    const { id } = jwtBody;
    body['updatedBy'] = id;
    body['user_id'] = id;
    const query = UtilsService.generateInsertQuery(
      K.TABLE_NAMES.ADDRESS,
      K.PRIMARY_KEYS.ADDRESS,
      body,
      []
    );
    const userAddressInsertQuery = format(query.query, query.value);
    return this.databaseService
      .rawQuery(userAddressInsertQuery, [], UserAddressCreateDto)
      .pipe(
        map((result) => {
          if (result.length === 0)
            throw new Error('Error in insertion of address, try again..!!');
          return { message: 'Address inserted successfully' };
        })
      );
  }

  /**
   * Functionality to fetch user address
   * @param id which contain the id of user to fetch the address
   * @param jwtBody which contain the detail inside jwt token
   * @returns a success message when fetched {@link result || AddressDetailDto}
   */
  userAddressFetch(
    id: number,
    jwtBody: any
  ): Observable<AddressMessageDto | Record<null, null>> {
    if (id !== Number(jwtBody.id)) throw new UnauthorizedException();
    return this.databaseService
      .rawQuery(fetchAddressDetailQuery, [id], AddressDetailDto)
      .pipe(
        map((result) => {
          if (result.length === 0) throw new NotFoundException();
          return { message: 'Address fetched successfully', data: result[0] };
        })
      );
  }

  /**
   * Functionality to delete user address
   * @param id which contain the id of user to delete the address
   * @param jwtBody which contain the detail inside jwt token
   * @returns a success message
   */
  userAddressDelete(
    id: number,
    jwtBody: any
  ): Observable<MessageDto | Record<null, null>> {
    if (id !== Number(jwtBody.id)) throw new UnauthorizedException();
    const deleteQuery = UtilsService.generateDeleteQuery({
      tableName: K.TABLE_NAMES.ADDRESS,
      primaryKey: K.FOREIGN_KEYS.ADDRESS.USER,
      value: id
    });
    return this.databaseService
      .rawQuery(deleteQuery.query, [], UserAddressIdDto)
      .pipe(
        map((result) => {
          if (result.length === 0) throw new NotFoundException();
          return { message: 'Address deleted successfully' };
        })
      );
  }

  /**
   * This API is used to update the reward point of user
   * when user enters the store
   * @param jwtBody contains payload of the user
   * @param body contains the majorId of the beacon
   * @returns returns a success message on update
   */
  userRewardUpdate(
    jwtBody: any,
    body: UserRewardUpdateDto
  ): Observable<MessageDto | Record<null, null>> {
    const { id } = jwtBody;
    const { majorId } = body;
    return this.databaseService
      .rawQuery(updateUserRewardQuery, [majorId, id], UserIdDto)
      .pipe(
        map((result) => {
          if (result.length === 0)
            throw new HttpException(
              {
                message: 'Reward already updated'
              },
              HttpStatus.PARTIAL_CONTENT
            );
          return {
            message: 'Reward updated successfully'
          };
        })
      );
  }

  /**
   * API for updating user exit status once away from
   * beacon range.
   * @param jwtBody - token body
   * @param body - consists of beacon device_id
   * @returns - a success message
   */
  userExitUpdate(
    jwtBody: any,
    body: BeaconIdDto
  ): Observable<MessageDto | Record<null, null>> {
    const { id } = jwtBody;
    const { deviceId } = body;
    return this.databaseService.rawQuery(
      userExitQuery, [deviceId, id], MessageDto
    ).pipe(
      map((result) => {
        if (result.length === 0) throw new NotFoundException();
        return { message: 'User data updated successfully' };
      })
    )
  }
}
