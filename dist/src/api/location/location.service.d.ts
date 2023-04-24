import { Observable } from 'rxjs';
import { DatabaseService } from 'src/database/database.service';
import { MessageDto } from '../dto/message.dto';
export declare class LocationService {
    private readonly databaseService;
    constructor(databaseService: DatabaseService<any>);
    fetchCountry(): Observable<MessageDto | Record<null, null>>;
    fetchState(countryId: number): Observable<MessageDto | Record<null, null>>;
    fetchDistrict(stateId: number): Observable<MessageDto | Record<null, null>>;
}
