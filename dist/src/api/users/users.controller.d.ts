import { UsersService } from './users.service';
import { MessageDto } from 'src/api/dto/message.dto';
import { AddressMessageDto, BeaconIdDto, SignUpDto, UserAddressCreateDto, UserAddressUpdateDto, UserPasswordUpdateDto, UserRewardUpdateDto, UserUpdateDto } from '../dto/users.dto';
import { Observable } from 'rxjs';
export declare class UsersController {
    private readonly usersService;
    constructor(usersService: UsersService);
    signUp(signUpDto: SignUpDto): Observable<MessageDto | Record<null, null>>;
    userProfileView(jwtBody: any): Observable<MessageDto | Record<null, null>>;
    userDelete(jwtBody: any): Observable<MessageDto | Record<null, null>>;
    userUpdate(jwtBody: any, body: UserUpdateDto): Observable<MessageDto | Record<null, null>>;
    userPasswordUpdate(id: number, jwtBody: any, body: UserPasswordUpdateDto): Promise<MessageDto | Record<null, null>>;
    userAddressCreate(jwtBody: any, body: UserAddressCreateDto): Observable<MessageDto | Record<null, null>>;
    userAddressUpdate(id: number, jwtBody: any, body: UserAddressUpdateDto): Observable<MessageDto | Record<null, null>>;
    userAddressFetch(id: number, jwtBody: any): Observable<AddressMessageDto | Record<null, null>>;
    userAddressDelete(id: number, jwtBody: any): Observable<MessageDto | Record<null, null>>;
    userRewardUpdate(jwtBody: any, body: UserRewardUpdateDto): Observable<MessageDto | Record<null, null>>;
    userExitUpdate(jwtBody: any, body: BeaconIdDto): Observable<MessageDto | Record<null, null>>;
}
