import { SignUpDto, UserUpdateDto, UserAddressUpdateDto, UserPasswordUpdateDto, UserAddressCreateDto, AddressMessageDto, UserRewardUpdateDto, BeaconIdDto } from '../dto/users.dto';
import { Observable } from 'rxjs';
import { MessageDto } from 'src/api/dto/message.dto';
import { DatabaseService } from 'src/database/database.service';
import { ConfigService } from '@nestjs/config';
import { ConfigType } from '@nestjs/config';
import { JwtBody } from '../dto/jwt.dto';
import configuration from 'src/config/configuration';
export declare class UsersService {
    private readonly databaseService;
    private readonly configService;
    private config;
    constructor(databaseService: DatabaseService<any>, configService: ConfigService, config: ConfigType<typeof configuration>);
    signUp(signUpBody: SignUpDto): Observable<MessageDto | Record<null, null>>;
    userDelete(jwtBody: JwtBody): Observable<MessageDto | Record<null, null>>;
    userUpdate(jwtBody: JwtBody, body: UserUpdateDto): Observable<MessageDto | Record<null, null>>;
    userProfileView(jwtBody: JwtBody): Observable<MessageDto | Record<null, null>>;
    userPasswordUpdate(userId: number, jwtBody: JwtBody, body: UserPasswordUpdateDto): Promise<MessageDto | Record<null, null>>;
    userAddressUpdate(jwtBody: any, body: UserAddressUpdateDto, userId: number): Observable<MessageDto | Record<null, null>>;
    userAddressCreate(jwtBody: any, body: UserAddressCreateDto): Observable<MessageDto | Record<null, null>>;
    userAddressFetch(id: number, jwtBody: any): Observable<AddressMessageDto | Record<null, null>>;
    userAddressDelete(id: number, jwtBody: any): Observable<MessageDto | Record<null, null>>;
    userRewardUpdate(jwtBody: any, body: UserRewardUpdateDto): Observable<MessageDto | Record<null, null>>;
    userExitUpdate(jwtBody: any, body: BeaconIdDto): Observable<MessageDto | Record<null, null>>;
}
