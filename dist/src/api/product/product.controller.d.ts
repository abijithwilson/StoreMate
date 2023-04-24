import { ProductService } from './product.service';
import { CreateProductBodyDto, CreateProductSku, FetchSingleProductDetailsResponseDto, ProductCreateDto, UpdateProductSku, UpdateProductDto, FetchAllProductsPagination, FetchSingleColourAndSizeSkuDetails, FetchProductOffersResponseDto, FetchProductOffersDto, FetchStoreWiseSingleProductDetailsResponseDto, CsvProductDto } from '../dto/product.dto';
import { Observable } from 'rxjs';
import { MessageDto } from '../dto/admin.dto';
export declare class ProductController {
    private readonly productService;
    constructor(productService: ProductService);
    fetchProductSize(): Observable<MessageDto | Record<null, null>>;
    fetchProductcolour(): Observable<MessageDto | Record<null, null>>;
    fetchProductCategory(): Observable<MessageDto | Record<null, null>>;
    deleteProduct(id: number): Observable<MessageDto | Record<null, null>>;
    deleteSkuDetails(id: number): Observable<{
        message: string;
    }>;
    editProductDetails(id: number, body: UpdateProductDto, jwtBody: any): Observable<MessageDto | Record<null, null>>;
    createProduct(body: CreateProductBodyDto, jwtBody: any): Observable<ProductCreateDto | Record<null, null>>;
    updateSkuDetails(body: UpdateProductSku, jwtBody: any): Observable<MessageDto | Record<null, null>>;
    createSkuDetails(body: CreateProductSku, jwtBody: any): Observable<MessageDto | Record<null, null>>;
    getSingleProductSkuDetails(id: number, param: FetchSingleColourAndSizeSkuDetails): Observable<FetchSingleProductDetailsResponseDto | Record<null, null>>;
    getStoreDetails(param: FetchAllProductsPagination): Observable<MessageDto | Record<null, null>>;
    getStoreAdminSingleProductSkuDetails(productId: number, storeId: number, jwtBody: any, param: FetchSingleColourAndSizeSkuDetails): Promise<FetchStoreWiseSingleProductDetailsResponseDto | Record<null, null>>;
    fetchProductOffers(productId: number, storeId: number, param: FetchProductOffersDto): Observable<FetchProductOffersResponseDto | Record<null, null>>;
    productBulkUpload(file: CsvProductDto, jwtBody: any): Promise<MessageDto>;
    fetchProductWiseOffers(productId: number, param: FetchProductOffersDto): Observable<FetchProductOffersResponseDto | Record<null, null>>;
}
