import { FetchWishlistProductsPaginationDto, FetchWishlistProductsResponseDto, WishlistProductAssignDto, FetchProductFilterData, ProductFilterDataResponse, SectionVisitParamDto, SectionVisitDataResponseDto } from './../dto/section.dto';
import { Observable } from 'rxjs';
import { DatabaseService } from 'src/database/database.service';
import { FetchStoreWiseSectionsPaginationDto, MessageSectionDropDownList, SectionMessageDto, SectionUnderStoreQueryParam, StoreWiseSectionResponseDto, AssignProductSectionDto, AssignSectionDto, UpdateSectionDto, SectionQueryDto, SectionFetchDto, SectionWiseCategoriesPaginationDto, FetchCategoryListResponseDto, FetchOfferListResponseDto } from '../dto/section.dto';
import { StoreHelperService } from 'src/helper/store.helper';
import { FetchSingleColourAndSizeSkuDetails, FetchSingleProductDetailsResponseDto, ProductFetchResponseDto } from '../dto/product.dto';
export declare class SectionService {
    private readonly databaseService;
    private storeHelperService;
    constructor(databaseService: DatabaseService<any>, storeHelperService: StoreHelperService);
    assignSection(body: AssignSectionDto, storeId: number): Observable<SectionMessageDto | Record<null, null>>;
    unAssignSection(sectionId: number, storeId: number, jwtBody: any): Promise<SectionMessageDto>;
    updateSection(sectionId: number, storeId: number, jwtBody: any, body: UpdateSectionDto): Promise<SectionMessageDto>;
    getStoreSectionDetails(storeId: number, param: FetchStoreWiseSectionsPaginationDto, jwtBody: any): Promise<StoreWiseSectionResponseDto>;
    getDetailsOfAProductInASection(sectionId: number, productId: number, storeId: number, param: FetchSingleColourAndSizeSkuDetails, jwtBody: any): Observable<FetchSingleProductDetailsResponseDto | Record<null, null>>;
    assignProductToSection(storeId: number, sectionId: number, body: AssignProductSectionDto, jwtBody: any): Promise<SectionMessageDto>;
    sectionWiseProductUnassign(storeId: number, sectionId: number, productId: number, jwtBody: any): Promise<SectionMessageDto>;
    getStoreAssignedSectionDetails(storeId: number, param: SectionUnderStoreQueryParam, jwtBody: any): Promise<MessageSectionDropDownList>;
    getListOfProductsNotAssignedToAnySection(storeId: number, jwtBody: any): Promise<ProductFetchResponseDto | Record<null, null>>;
    getSectionAndSectionNotListedInStore(queryParam: SectionQueryDto, jwtBody: any): Observable<SectionFetchDto | Record<null, null>>;
    fetchSectionWiseCategoryList(storeId: number, sectionId: number, param: SectionWiseCategoriesPaginationDto): Promise<FetchCategoryListResponseDto | Record<null, null>>;
    fetchWishlistProducts(storeId: number, sectionId: number, param: FetchWishlistProductsPaginationDto, jwtBody: any): Observable<FetchWishlistProductsResponseDto | Record<null, null>>;
    fetchSectionWiseOfferList(storeId: number, sectionId: number, param: SectionWiseCategoriesPaginationDto): Observable<FetchOfferListResponseDto | Record<null, null>>;
    fetchProductFilterData(storeId: number, sectionId: number, param: FetchProductFilterData, jwtBody: any): Observable<ProductFilterDataResponse | Record<null, null>>;
    assignProductsToWishlist(body: WishlistProductAssignDto, jwtBody: any): Promise<SectionMessageDto | Record<null, null>>;
    unassignProductFromWishlist(storeId: number, productId: number, jwtBody: any): Promise<SectionMessageDto | Record<null, null>>;
    fetchSectionVisitData(storeId: number, param: SectionVisitParamDto, jwtBody: any): Observable<SectionVisitDataResponseDto | Record<null, null>>;
}
