import { Observable } from 'rxjs';
import { DatabaseService } from 'src/database/database.service';
import { BeaconUpdateDto, CreateBeaconDto, FetchBeaconListPaginationDto, FetchBeaconListResponseDto, StoreAndSectionOfBeaconResponseDto, UserVisitUpdateDTO } from '../dto/beacon.dto';
import { MessageDto } from '../dto/message.dto';
export declare class BeaconService {
    private readonly databaseService;
    constructor(databaseService: DatabaseService<any>);
    createBeacon(body: CreateBeaconDto, jwtBody: any): Observable<MessageDto | Record<null, null>>;
    deleteBeacon(id: number): Observable<MessageDto | Record<null, null>>;
    updateBeacon(id: number, body: BeaconUpdateDto, jwtBody: any): Observable<MessageDto | Record<null, null>>;
    getSortQueryForBeaconFetch(sortName: string): Array<string>;
    fetchBeaconList(param: FetchBeaconListPaginationDto): Observable<FetchBeaconListResponseDto | Record<null, null>>;
    fetchStoreAndSectionOfBeacon(id: string): Observable<StoreAndSectionOfBeaconResponseDto | Record<null, null>>;
    recordUserVisit(body: UserVisitUpdateDTO, jwtBody: any): Observable<MessageDto | Record<null, null>>;
}
