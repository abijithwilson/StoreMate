import { BeaconUpdateDto, CreateBeaconDto, FetchBeaconListPaginationDto, FetchBeaconListResponseDto, StoreAndSectionOfBeaconResponseDto, UserVisitUpdateDTO } from '../dto/beacon.dto';
import { BeaconService } from './beacon.service';
import { Observable } from 'rxjs';
import { MessageDto } from '../dto/message.dto';
export declare class BeaconController {
    private readonly beaconService;
    constructor(beaconService: BeaconService);
    createBeacon(body: CreateBeaconDto, jwtBody: any): Observable<MessageDto | Record<null, null>>;
    deleteBeacon(id: number): Observable<MessageDto | Record<null, null>>;
    updateBeacon(id: number, body: BeaconUpdateDto, jwtBody: any): Observable<MessageDto | Record<null, null>>;
    fetchBeaconList(param: FetchBeaconListPaginationDto): Observable<FetchBeaconListResponseDto | Record<null, null>>;
    identifySectionAndStore(id: string): Observable<StoreAndSectionOfBeaconResponseDto | Record<null, null>>;
    recordUserVisit(body: UserVisitUpdateDTO, jwtBody: any): Observable<MessageDto | Record<null, null>>;
}
