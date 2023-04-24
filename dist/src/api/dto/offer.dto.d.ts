import { Pagination } from './message.dto';
export declare class OfferListParamDto {
    sortField: string;
    sortOrder: string;
    searchName: string;
    limit: number;
    offset: number;
}
export declare class OfferListDto {
    offerId: number;
    description: string;
    offerTitle: string;
    image: string;
    startDate: Date;
    endDate: Date;
}
export declare class OfferListResponseDto {
    message: string;
    data: OfferListDto[];
    pagination: Pagination;
}
