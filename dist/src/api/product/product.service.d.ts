import { FetchStoreWiseSingleProductDetailsResponseDto } from './../dto/product.dto';
import { Observable } from 'rxjs';
import { DatabaseService } from 'src/database/database.service';
import { MessageDto } from '../dto/admin.dto';
import { CreateProductBodyDto, ProductCreateDto, UpdateProductDto, CreateProductSku, FetchSingleProductDetailsResponseDto, UpdateProductSku, FetchAllProductsPagination, FetchSingleColourAndSizeSkuDetails, FetchProductOffersDto, FetchProductOffersResponseDto, CsvProductDto } from '../dto/product.dto';
import { StoreHelperService } from 'src/helper/store.helper';
export declare class ProductService {
    private readonly databaseService;
    private storeHelperService;
    constructor(databaseService: DatabaseService<any>, storeHelperService: StoreHelperService);
    fetchProductcolour(): Observable<MessageDto | Record<null, null>>;
    fetchProductSize(): Observable<MessageDto | Record<null, null>>;
    fetchProductCategory(): Observable<MessageDto | Record<null, null>>;
    deleteSkuDetails(id: number): Observable<{
        message: string;
    }>;
    deleteProduct(id: number): Observable<MessageDto | Record<null, null>>;
    createProduct(body: CreateProductBodyDto, jwtBody: any): Observable<ProductCreateDto | Record<null, null>>;
    editProductDetails(id: number, body: UpdateProductDto, jwtBody: any): Observable<MessageDto | Record<null, null>>;
    createSkuDetails(body: CreateProductSku, jwtBody: any): Observable<MessageDto | Record<null, null>>;
    updateSkuDetails(body: UpdateProductSku, jwtBody: any): Observable<MessageDto | Record<null, null>>;
    getSingleProductSkuDetails(id: number, param: FetchSingleColourAndSizeSkuDetails): Observable<FetchSingleProductDetailsResponseDto | Record<null, null>>;
    getSortQueryForProductFetch(sortPrice: string, sortName: string): Array<string>;
    getAllProductDetails(param: FetchAllProductsPagination): Observable<{
        message: string;
        data: any[];
        pagination: {
            total: any;
        };
    }>;
    fetchProductOffers(productId: number, storeId: any, param: FetchProductOffersDto): Observable<FetchProductOffersResponseDto | Record<null, null>>;
    fetchStoreWiseProductSkus(productId: number, storeId: number, jwtBody: any, param: FetchSingleColourAndSizeSkuDetails): Promise<FetchStoreWiseSingleProductDetailsResponseDto | Record<null, null>>;
    productBulkUpload(file: CsvProductDto, jwtBody: any): Promise<MessageDto>;
    fetchProductWiseOffers(productId: number, param: FetchProductOffersDto): Observable<FetchProductOffersResponseDto | Record<null, null>>;
}
