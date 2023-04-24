import { BeaconFetchMessageDto, BeaconPaginationQueryParam, AssignBeaconDto, BeaconMessageDto, FetchAllAssignedStoresPaginationDto, FetchAssignedStoresResponseDto, FetchVisitorsCountResponseDto, FetchSectionWiseProductsPaginationDto, FetchSectionWiseProductsResponseDto } from './../dto/store-admin.dto';
import { MessageDto } from './../dto/admin.dto';
import { DatabaseService } from 'src/database/database.service';
import { Observable } from 'rxjs';
import { AdminJwtBody } from '../dto/adminJwtBody.dto';
import { StoreAdminProfileFetchResponseDto, StoreAdminUpdateDto } from '../dto/store-admin.dto';
import { StoreHelperService } from 'src/helper/store.helper';
import { BeaconDropDownResponseDto } from '../dto/beacon.dto';
export declare class StoreAdminService {
    private readonly databaseService;
    private storeHelperService;
    constructor(databaseService: DatabaseService<any>, storeHelperService: StoreHelperService);
    storeAdminProfileUpdate(id: number, body: StoreAdminUpdateDto, jwtBody: AdminJwtBody): Observable<MessageDto | Record<null, null>>;
    fetchStoreAdminProfile(id: number, jwtBody: AdminJwtBody): Observable<StoreAdminProfileFetchResponseDto | Record<null, null>>;
    fetchAssignedStores(param: FetchAllAssignedStoresPaginationDto, id: number, jwtBody: AdminJwtBody): Observable<FetchAssignedStoresResponseDto | Record<null, null>>;
    fetchSectionWiseProducts(storeAdminId: number, storeId: number, sectionId: number, jwtBody: any, param: FetchSectionWiseProductsPaginationDto): Promise<FetchSectionWiseProductsResponseDto>;
    fetchVisitorsCount(storeId: number, sectionId: number, jwtBody: AdminJwtBody): Promise<FetchVisitorsCountResponseDto | Record<null, null>>;
    fetchBeaconUnderStore(storeAdminId: number, storeId: number, param: BeaconPaginationQueryParam, jwtBody: AdminJwtBody): Promise<BeaconFetchMessageDto>;
    fetchUnassignedBeacons(adminId: number, storeId: number, jwtBody: AdminJwtBody): Promise<BeaconDropDownResponseDto>;
    assignBeacon(storeAdminId: number, storeId: number, sectionId: number, body: AssignBeaconDto, jwtBody: any): Promise<BeaconMessageDto>;
    unAssignBeacon(storeAdminId: number, storeId: number, beaconId: number, jwtBody: any): Promise<BeaconMessageDto>;
}
