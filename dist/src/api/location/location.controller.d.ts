import { Observable } from 'rxjs';
import { LocationService } from './location.service';
import { MessageDto } from '../dto/message.dto';
export declare class LocationController {
    private readonly locationService;
    constructor(locationService: LocationService);
    fetchCountry(): Observable<MessageDto | Record<null, null>>;
    fetchState(countryId: number): Observable<MessageDto | Record<null, null>>;
    fetchDistrict(stateId: number): Observable<MessageDto | Record<null, null>>;
}
