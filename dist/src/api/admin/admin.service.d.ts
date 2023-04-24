import { SingleOfferProductListPaginationDto, SingleOfferProductListResponseDto, SingleOfferProductAssignDto, AdminPasswordUpdateDto } from './../dto/admin.dto';
import { MailService } from 'src/mail/mail.service';
import { StoreAdminInviteDto } from './../dto/store.dto';
import { Observable } from 'rxjs';
import { DatabaseService } from 'src/database/database.service';
import { AdminJwtBody } from '../dto/adminJwtBody.dto';
import { AdminUpdateDto, CreateOffer, DeleteStoreAdminDto, FetchAllStoreAdminPaginationDTO, MessageAdminFetchDto, MessageDto, OfferFetchMessageDto, StoreAdminUpdateDto, UpdateOffer } from '../dto/admin.dto';
import { ConfigService, ConfigType } from '@nestjs/config';
import { JwtService } from '@nestjs/jwt';
import configuration from 'src/config/configuration';
import { OfferListParamDto } from '../dto/offer.dto';
import { CreateSectionDto, SectionMessageDto, UpdateSectionDto } from '../dto/section.dto';
import { JwtBody } from '../dto/jwt.dto';
export declare class AdminService {
    private readonly databaseService;
    private readonly configService;
    private jwtService;
    private mailService;
    private config;
    ConfigService: any;
    constructor(databaseService: DatabaseService<any>, configService: ConfigService, jwtService: JwtService, mailService: MailService, config: ConfigType<typeof configuration>);
    adminProfileUpdate(id: number, body: AdminUpdateDto, jwtBody: AdminJwtBody): Observable<MessageDto | Record<null, null>>;
    fetchAdminProfile(id: number): Observable<MessageDto | Record<null, null>>;
    getAllStoreAdminDetails(param: FetchAllStoreAdminPaginationDTO): Observable<MessageDto | Record<null, null>>;
    fetchStoreAdminProfile(id: number): Observable<MessageAdminFetchDto | Record<null, null>>;
    deleteStoreAdminDetails(param: DeleteStoreAdminDto): Observable<MessageDto | Record<null, null>>;
    storeAdminProfileUpdate(id: number, body: StoreAdminUpdateDto, jwtBody: any): Observable<{
        message: string;
    }>;
    inviteStoreAdmin(inviteBody: StoreAdminInviteDto, jwtBody: AdminJwtBody): Promise<import("../dto/auth.dto").MessageDto>;
    getofferDetails(id: number): Observable<OfferFetchMessageDto | Record<null, null>>;
    updateOfferDetails(body: UpdateOffer, id: number, jwtBody: any): Observable<MessageDto | Record<null, null>>;
    createOfferDtails(body: CreateOffer, jwtBody: any): Observable<MessageDto | Record<null, null>>;
    deleteOffer(id: number): Observable<MessageDto | Record<null, null>>;
    fetchOfferList(body: OfferListParamDto): Observable<MessageDto | Record<null, null>>;
    updateSection(sectionId: number, jwtBody: any, body: UpdateSectionDto): Observable<Record<null, null> | SectionMessageDto>;
    deleteSection(sectionId: number): Observable<Record<null, null> | SectionMessageDto>;
    createSection(body: CreateSectionDto, jwtBody: any): Observable<Record<null, null> | SectionMessageDto>;
    singleOfferProductList(offerId: number, param: SingleOfferProductListPaginationDto): Observable<SingleOfferProductListResponseDto | Record<null, null>>;
    singleOfferProductAssign(body: SingleOfferProductAssignDto): Observable<MessageDto | Record<null, null>>;
    singleOfferProductUnassign(offerId: number, productId: number): Observable<{
        message: string;
    }>;
    adminPasswordUpdate(adminId: number, jwtBody: JwtBody, body: AdminPasswordUpdateDto): Promise<MessageDto | Record<null, null>>;
}
