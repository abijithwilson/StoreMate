import { Pagination } from './message.dto';
export declare class CreateBeaconDto {
    name: string;
    majorId: string;
    minorId: number;
    storeId: number;
    deviceId: string;
}
export declare class BeaconIdDto {
    id: number;
}
export declare class FetchBeaconListPaginationDto {
    limit: number;
    offset: number;
    filterStore: number;
    sortName: string;
}
export declare class FetchBeaconListDto {
    name: string;
    beaconId: number;
    majorId: string;
    deviceId: string;
    minorId: number;
    storeId: number;
    storeName: string;
    sectionId: number;
    status: boolean;
}
export declare class FetchBeaconListResponseDto {
    message: string;
    data: FetchBeaconListDto;
    pagination: Pagination;
}
export declare class BeaconUpdateDto {
    name: string;
    majorId: string;
    minorId: number;
    storeId: number;
    deviceId: string;
}
export declare class StoreAndSectionOfBeaconDto {
    storeId: number;
    storeName: number;
    sectionId: number;
    sectionName: number;
}
export declare class StoreAndSectionOfBeaconResponseDto {
    message: string;
    data: StoreAndSectionOfBeaconDto;
}
export declare class BeaconDropDownDto {
    beaconId: number;
    beaconName: string;
}
export declare class BeaconDropDownResponseDto {
    message: string;
    data: BeaconDropDownDto[];
}
export declare class UserVisitUpdateDTO {
    majorId: string;
    userId: number;
}
