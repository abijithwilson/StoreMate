import { AssigningOfferDto, BarchartSpanDto, ChartSpanTypeDto, DeleteRewardPointsDto, FetchRewardDetailsOfStoreDto, FetchStoreWiseProductsPagination, FetchStoreWiseProductsResponse, LastVisitedStoresDto, LastVisitedStoresResponseDto, LinechartSpanDto, MessageSkuUnderStore, MessageStoreFetchDto, OfferWiseProductMessageDto, StoreCountryDataResponseDto, StoreListFetchResponseDto, StoreListParamDto, StoreNameFetchDto, StoreRewardDto, StoreRewardEditDto, StoresBarchartMessageDto, StoresLinechartMessageDto, StoresPiechartMessageDto, StoreStateDataResponseDto, UnAssigningOfferDto, UpdateSkuUnderStoreDto, UserProductFilterOptionsDto } from './../dto/store.dto';
import { Observable } from 'rxjs';
import { DatabaseService } from 'src/database/database.service';
import { FetchAllStorePagination, StoreUpdateDto, StoreDto, NearbyStoreDto, SingleStoreDetailsDto } from '../dto/store.dto';
import { MessageDto } from '../dto/auth.dto';
import { AdminJwtBody } from '../dto/adminJwtBody.dto';
import { JwtBody } from '../dto/jwt.dto';
import { StoreHelperService } from 'src/helper/store.helper';
import { OfferListParamDto } from '../dto/offer.dto';
import { StoreDashboardResponseDto } from '../dto/store-admin.dto';
export declare class StoreService {
    private readonly databaseService;
    private storeHelperService;
    constructor(databaseService: DatabaseService<any>, storeHelperService: StoreHelperService);
    createStore(createBody: StoreDto, jwtBody: AdminJwtBody): Observable<MessageDto | Record<null, null>>;
    deleteStore(id: number): Observable<{
        message: string;
    }>;
    getSingleStoreDetails(id: number): Observable<SingleStoreDetailsDto | Record<null, null>>;
    getStoreDetails(param: FetchAllStorePagination): Observable<MessageDto | Record<null, null>>;
    updateStoreProfile(id: number, body: StoreUpdateDto, jwtBody: any): Observable<MessageDto | Record<null, null>>;
    getSortQueryForStoreFetch(sortDistrict: string, sortName: string): Array<string>;
    fetchStoreName(param: StoreNameFetchDto): Observable<MessageDto | Record<null, null>>;
    viewNearbyStores(jwtBody: JwtBody, param: NearbyStoreDto): Observable<MessageDto | Record<null, null>>;
    deleteRewardPoints(param: DeleteRewardPointsDto): Observable<MessageDto | Record<null, null>>;
    viewStoreRewardDetails(jwtBody: any, param: FetchRewardDetailsOfStoreDto): Observable<MessageDto | Record<null, null>>;
    insertStoreRewardPoints(createBody: StoreRewardDto, jwtBody: any): Observable<MessageDto | Record<null, null>>;
    storeWithoutRewards(): Observable<MessageDto | Record<null, null>>;
    updateSkuUnderStore(storeId: number, productId: number, jwtBody: any, body: UpdateSkuUnderStoreDto): Promise<MessageDto>;
    getSkuDetailUnderStore(storeId: number, productId: number, jwtBody: any): Promise<MessageSkuUnderStore>;
    updateStoreRewardPoints(updateBody: StoreRewardEditDto, jwtBody: any): Observable<MessageDto | Record<null, null>>;
    fetchStoreWiseProductList(storeId: number, param: FetchStoreWiseProductsPagination, jwtBody: any): Promise<FetchStoreWiseProductsResponse>;
    getProductAndSkuDetails(storeId: number, sectionId: number, param: UserProductFilterOptionsDto, jwtBody: any): Observable<MessageDto | Record<null, null>>;
    getofferDetails(id: number, param: OfferListParamDto): Observable<MessageStoreFetchDto | Record<null, null>>;
    assignOfferToStore(body: AssigningOfferDto): Observable<MessageDto | Record<null, null>>;
    unAssignOfferToStore(body: UnAssigningOfferDto): Observable<MessageDto | Record<null, null>>;
    fetchStoreList(param: StoreListParamDto): Observable<StoreListFetchResponseDto | Record<null, null>>;
    fetchStoreDashboardData(storeId: number, jwtBody: any): Promise<StoreDashboardResponseDto | Record<null, null>>;
    getStorePiechartDetails(storeId: number, param: ChartSpanTypeDto, jwtBody: any): Promise<StoresPiechartMessageDto | Record<null, null>>;
    getStoreVistorsTimeDetails(storeId: number, param: LinechartSpanDto, jwtBody: any): Promise<StoresLinechartMessageDto | Record<null, null>>;
    getStoreBarchartDetails(storeId: number, param: BarchartSpanDto, jwtBody: any): Promise<StoresBarchartMessageDto | Record<null, null>>;
    getOfferWiseProductDetails(storeId: number, sectionId: number, offerId: number, param: UserProductFilterOptionsDto, jwtBody: any): Observable<OfferWiseProductMessageDto | Record<null, null>>;
    fetchStoreCountryData(): Observable<StoreCountryDataResponseDto | Record<null, null>>;
    fetchStoreStateData(countryId: number): Observable<StoreStateDataResponseDto | Record<null, null>>;
    fetchStoreDistrictData(stateId: number): Observable<StoreStateDataResponseDto | Record<null, null>>;
    fetchLastVisitedStoresData(jwtBody: any, param: LastVisitedStoresDto): Observable<LastVisitedStoresResponseDto | Record<null, null>>;
}
