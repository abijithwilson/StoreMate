import { BeaconFetchMessageDto, BeaconPaginationQueryParam, AssignBeaconDto, BeaconMessageDto, FetchAllAssignedStoresPaginationDto, FetchAssignedStoresResponseDto, FetchVisitorsCountResponseDto, FetchSectionWiseProductsPaginationDto, FetchSectionWiseProductsResponseDto } from './../dto/store-admin.dto';
import { AdminJwtBody } from './../dto/adminJwtBody.dto';
import { Observable } from 'rxjs';
import { StoreAdminProfileFetchResponseDto, StoreAdminUpdateDto } from '../dto/store-admin.dto';
import { StoreAdminService } from './store-admin.service';
import { MessageDto } from '../dto/message.dto';
import { BeaconDropDownResponseDto } from '../dto/beacon.dto';
export declare class StoreAdminController {
    private storeAdminService;
    constructor(storeAdminService: StoreAdminService);
    storeAdminProfileUpdate(id: number, body: StoreAdminUpdateDto, jwtBody: AdminJwtBody): Observable<MessageDto | Record<null, null>>;
    fetchStoreAdminProfile(id: number, jwtBody: AdminJwtBody): Observable<StoreAdminProfileFetchResponseDto | Record<null, null>>;
    fetchAssignedStores(param: FetchAllAssignedStoresPaginationDto, id: number, jwtBody: AdminJwtBody): Observable<FetchAssignedStoresResponseDto | Record<null, null>>;
    fetchBeaconUnderStore(storeAdminId: number, storeId: number, jwtBody: AdminJwtBody, param: BeaconPaginationQueryParam): Promise<BeaconFetchMessageDto>;
    fetchUnassignedBeacons(id: number, storeId: number, jwtBody: AdminJwtBody): Promise<BeaconDropDownResponseDto>;
    assignBeacon(storeAdminId: number, storeId: number, sectionId: number, body: AssignBeaconDto, jwtBody: any): Promise<BeaconMessageDto>;
    unAssignBeacon(storeAdminId: number, storeId: number, beaconId: number, jwtBody: any): Promise<BeaconMessageDto>;
    fetchSectionWiseProducts(storeAdminId: number, storeId: number, sectionId: number, jwtBody: any, param: FetchSectionWiseProductsPaginationDto): Promise<FetchSectionWiseProductsResponseDto>;
    fetchVisitorsCount(storeId: number, sectionId: number, jwtBody: AdminJwtBody): Promise<FetchVisitorsCountResponseDto | Record<null, null>>;
}
