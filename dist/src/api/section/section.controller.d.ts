import { AssignProductSectionDto, AssignSectionDto, FetchCategoryListResponseDto, FetchOfferListResponseDto, FetchProductFilterData, FetchStoreWiseSectionsPaginationDto, FetchWishlistProductsPaginationDto, FetchWishlistProductsResponseDto, MessageSectionDropDownList, ProductFilterDataResponse, SectionFetchDto, SectionMessageDto, SectionQueryDto, SectionUnderStoreQueryParam, SectionVisitDataResponseDto, SectionVisitParamDto, SectionWiseCategoriesPaginationDto, StoreWiseSectionResponseDto, UpdateSectionDto, WishlistProductAssignDto } from '../dto/section.dto';
import { SectionService } from './section.service';
import { Observable } from 'rxjs';
import { FetchSingleProductDetailsResponseDto, FetchSingleColourAndSizeSkuDetails, ProductFetchResponseDto } from '../dto/product.dto';
export declare class SectionController {
    private readonly sectionService;
    constructor(sectionService: SectionService);
    assignSection(body: AssignSectionDto, storeId: number): Observable<SectionMessageDto | Record<null, null>>;
    unAssignSection(sectionId: number, storeId: number, jwtBody: any): Promise<SectionMessageDto>;
    getSectionAndSectionNotListedInStore(queryParam: SectionQueryDto, jwtBody: any): Observable<SectionFetchDto | Record<null, null>>;
    updateSection(sectionId: number, storeId: number, body: UpdateSectionDto, jwtBody: any): Promise<SectionMessageDto>;
    getStoreSectionDetails(storeId: number, param: FetchStoreWiseSectionsPaginationDto, jwtBody: any): Promise<StoreWiseSectionResponseDto>;
    assignProductToSection(storeId: number, sectionId: number, body: AssignProductSectionDto, jwtBody: any): Promise<SectionMessageDto>;
    getStoreAssignedSectionDetails(storeId: number, jwtBody: any, param: SectionUnderStoreQueryParam): Promise<MessageSectionDropDownList>;
    getDetailsOfProductInASection(storeId: number, productId: number, sectionId: number, param: FetchSingleColourAndSizeSkuDetails, jwtBody: any): Observable<FetchSingleProductDetailsResponseDto | Record<null, null>>;
    sectionWiseProductUnassign(storeId: number, sectionId: number, productId: number, jwtBody: any): Promise<SectionMessageDto>;
    getListOfUnAssignedProductsToAnySection(storeId: number, jwtBody: any): Promise<ProductFetchResponseDto | Record<null, null>>;
    fetchSectionWiseCategoryList(storeId: number, sectionId: number, param: SectionWiseCategoriesPaginationDto): Promise<FetchCategoryListResponseDto | Record<null, null>>;
    fetchSectionWiseOfferList(storeId: number, sectionId: number, param: SectionWiseCategoriesPaginationDto): Observable<FetchOfferListResponseDto | Record<null, null>>;
    fetchWishlistProducts(storeId: number, sectionId: number, param: FetchWishlistProductsPaginationDto, jwtBody: any): Observable<FetchWishlistProductsResponseDto | Record<null, null>>;
    fetchProductFilterData(storeId: number, sectionId: number, param: FetchProductFilterData, jwtBody: any): Observable<ProductFilterDataResponse | Record<null, null>>;
    assignProductsToWishlist(body: WishlistProductAssignDto, jwtBody: any): Promise<SectionMessageDto | Record<null, null>>;
    unassignProductFromWishlist(storeId: number, productId: number, jwtBody: any): Promise<SectionMessageDto | Record<null, null>>;
    fetchSectionVisitData(storeId: number, param: SectionVisitParamDto, jwtBody: any): Observable<SectionVisitDataResponseDto | Record<null, null>>;
}
