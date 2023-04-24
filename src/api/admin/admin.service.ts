import {
  SingleOfferProductListPaginationDto,
  SingleOfferProductListDto,
  SingleOfferProductListResponseDto,
  SingleOfferProductAssignDto,
  AdminPasswordUpdateDto,
  AdminLoginDto
} from './../dto/admin.dto';
import {
  deleteOfferQuery,
  deleteSectionQuery,
  singleOfferProductAssignQuery,
  singleOfferProductListQuery,
  singleOfferProductUnassignQuery,
  storeAdminInviteQuery
} from './../db-queries/admin.query';
import { MailService } from 'src/mail/mail.service';
import { StoreAdminInviteDto } from './../dto/store.dto';
import {
  BadRequestException,
  Inject,
  Injectable,
  NotFoundException,
  UnauthorizedException
} from '@nestjs/common';
import { map, Observable, firstValueFrom } from 'rxjs';
import { DatabaseService } from 'src/database/database.service';
import { AdminJwtBody } from '../dto/adminJwtBody.dto';
import {
  AdminDto,
  AdminIdDto,
  AdminUpdateDto,
  CreateOffer,
  DeleteStoreAdminDto,
  FetchAllStoreAdminDetail,
  FetchAllStoreAdminPaginationDTO,
  MessageAdminFetchDto,
  MessageDto,
  OfferFetchDto,
  OfferFetchMessageDto,
  OfferId,
  StoreAdminUpdateDto,
  UpdateOffer
} from '../dto/admin.dto';
import { UtilsService } from 'src/utils/utils.service';
import * as K from '../../shared/constants';
import { KEYS_TO_IGNORE_IN_ADMIN_UPDATE } from '../../shared/constants';
import {
  deleteStoreAdminQuery,
  fetchAdminProfile,
  listAllStoreAdminQuery,
  statementQuery,
  StoreAdminProfileUpdateQuery,
  StoreAdminProfileFetchQuery,
  AssignedStoresQuery,
  DeleteStoresQuery
} from '../db-queries/admin.query';
import { ConfigService, ConfigType } from '@nestjs/config';
import { JwtService } from '@nestjs/jwt';
import configuration from 'src/config/configuration';
import * as format from 'pg-format';
import { OfferListDto, OfferListParamDto } from '../dto/offer.dto';
import { offerListingQuery } from '../db-queries/offer.query';
import {
  CreateSectionDto,
  SectionIdDto,
  SectionMessageDto,
  UpdateSectionDto
} from '../dto/section.dto';
import { JwtBody } from '../dto/jwt.dto';
import { randomBytes } from 'crypto';
import * as pbkdf2 from 'pbkdf2';
import { LoginUserDto } from '../dto/auth.dto';

@Injectable()
export class AdminService {
  ConfigService: any;
  constructor(
    private readonly databaseService: DatabaseService<any>,
    private readonly configService: ConfigService,
    private jwtService: JwtService,
    private mailService: MailService,
    @Inject(configuration.KEY) private config: ConfigType<typeof configuration>
  ) {}

  adminProfileUpdate(
    id: number,
    body: AdminUpdateDto,
    jwtBody: AdminJwtBody
  ): Observable<MessageDto | Record<null, null>> {
    body['updatedBy'] = jwtBody.id;
    const updateQueryAndValue = UtilsService.generateUpdateQuery({
      tableName: K.TABLE_NAMES.ADMIN,
      primaryKey: K.PRIMARY_KEYS.ADMIN,
      keysToIgnore: KEYS_TO_IGNORE_IN_ADMIN_UPDATE,
      whereCondition: `admin_id=${id} AND is_deleted = false`,
      columnData: body
    });
    return this.databaseService
      .rawQuery(updateQueryAndValue.query, updateQueryAndValue.data, AdminIdDto)
      .pipe(
        map((result) => {
          if (result.length === 0) throw new NotFoundException();
          return { message: 'Updated admin detail successfully' };
        })
      );
  }
  fetchAdminProfile(id: number): Observable<MessageDto | Record<null, null>> {
    return this.databaseService
      .rawQuery(fetchAdminProfile, [id], AdminDto)
      .pipe(
        map((result) => {
          if (result.length === 0) throw new NotFoundException();
          return {
            message: 'Admin Profile retrieved successfully',
            data: result[0]
          };
        })
      );
  }

  getAllStoreAdminDetails(
    param: FetchAllStoreAdminPaginationDTO
  ): Observable<MessageDto | Record<null, null>> {
    const {
      offset,
      limit,
      storeName,
      adminName,
      countryId,
      districtId,
      stateId
    } = param;

    const { query, dataValue } = listAllStoreAdminQuery(
      adminName,
      storeName,
      countryId,
      stateId,
      districtId,
      limit,
      offset
    );
    return this.databaseService
      .rawQuery(query, dataValue, FetchAllStoreAdminDetail)
      .pipe(
        map((resultData) => {
          return {
            message: 'Store admin detail Fetched successfully',
            data: resultData,
            pagination: {
              total: resultData.length === 0 ? 0 : resultData[0].count
            }
          };
        })
      );
  }

  fetchStoreAdminProfile(
    id: number
  ): Observable<MessageAdminFetchDto | Record<null, null>> {
    return this.databaseService
      .rawQuery(StoreAdminProfileFetchQuery, [id], AdminIdDto)
      .pipe(
        map((result) => {
          if (result.length != 0) {
            return {
              message: 'Store admin profile retrieved successfully',
              data: result[0]
            };
          } else {
            throw new NotFoundException();
          }
        })
      );
  }

  /**
   * Function is to bulk delete store admin
   * @param param - array of store admin id {@link param || DeleteStoreAdminDto}
   * @returns a success message - {@link MessageDto}
   */
  deleteStoreAdminDetails(
    param: DeleteStoreAdminDto
  ): Observable<MessageDto | Record<null, null>> {
    const { storeAdminId } = param;
    const valueString = `${storeAdminId.join(',')}`;
    const query = deleteStoreAdminQuery(valueString);
    return this.databaseService.rawQuery(query, [], AdminIdDto).pipe(
      map((result) => {
        return {
          message:
            result.length === storeAdminId.length ?
              'Deleted all entries successfully' :
              'Partial deletion occured'
        };
      })
    );
  }

  /**
   * Function is to update the details of store-admin by super admin
   * @param id  id of store-admin whose details are updated
   * @param body the body in which data to be updated are received
   * {@link body || StoreAdminUpdateDto}
   * @param jwtBody the payload present in jwt token
   * @returns a success message - {@link MessageDto}
   */
  storeAdminProfileUpdate(id: number, body: StoreAdminUpdateDto, jwtBody: any) {
    body['updatedBy'] = jwtBody.id;
    const {
      firstName,
      lastName,
      phone,
      countryId,
      stateId,
      address,
      assignedStoreId,
      unassignedStoreId
    } = body;

    const assignedStoreIdValues = assignedStoreId ? assignedStoreId.join() : '';
    const unAssignedStoreIdValues = unassignedStoreId ?
      unassignedStoreId.join() :
      null;

    let updateProfileQuery = StoreAdminProfileUpdateQuery;

    if (
      assignedStoreId != null &&
      assignedStoreId.length > 0 &&
      unassignedStoreId != null &&
      unassignedStoreId.length > 0
    ) {
      updateProfileQuery += `, ${AssignedStoresQuery(assignedStoreIdValues)}
        , ${DeleteStoresQuery(unAssignedStoreIdValues)}
         ${statementQuery}`;
    } else if (assignedStoreId != null && assignedStoreId.length > 0) {
      updateProfileQuery += `, ${AssignedStoresQuery(assignedStoreIdValues)}
          ${statementQuery}`;
    } else if (unassignedStoreId != null && unassignedStoreId.length > 0) {
      updateProfileQuery += ` , ${DeleteStoresQuery(unAssignedStoreIdValues)} 
            ${statementQuery}`;
    } else {
      updateProfileQuery += `${statementQuery}`;
    }

    return this.databaseService
      .rawQuery(
        updateProfileQuery,
        [
          id,
          phone,
          countryId,
          stateId,
          address,
          jwtBody.id,
          firstName,
          lastName
        ],
        StoreAdminUpdateDto
      )
      .pipe(
        map(() => {
          return { message: 'Updated admin detail successfully' };
        })
      );
  }

  /**
   * Function to invite a store-admin
   * @param inviteBody - It consists of firstName, email & array of storeIds
   * {@link param || StoreAdminInviteDto}
   * @param jwtBody - It consists of id, email & role of admin.
   * {@link param || AdminJwtBody}
   * @returns a success message, if mail sent successfully
   */
  async inviteStoreAdmin(
    inviteBody: StoreAdminInviteDto,
    jwtBody: AdminJwtBody
  ) {
    const { firstName, email, storeId } = inviteBody;
    const assignedStoreIdValues = storeId.join();
    const insertQuery = storeAdminInviteQuery(assignedStoreIdValues);
    const adminInviteQuery = await firstValueFrom(
      this.databaseService
        .rawQuery(
          insertQuery,
          [firstName, email, jwtBody.id],
          StoreAdminInviteDto
        )
        .pipe(
          map((resultData) => {
            return {
              data: resultData
            };
          })
        )
    );
    const adminId = adminInviteQuery.data[0].adminId;
    const payload = { username: email, userId: adminId };
    const jwtToken = this.jwtService.sign(payload, {
      expiresIn: this.config.jwt.admin_invitation_expire_in,
      secret: this.config.jwt.forgot_password_secret
    });
    // eslint-disable-next-line
    const url = `${this.config.mail.admin_redirect_link}?type=${K.USERTYPE.STORE_ADMIN}&name=${firstName}&token=${jwtToken}`;
    return this.mailService.sendLinkToAdminEmail(email, firstName, url);
  }

  /**
   * Functionality to fetch the offer details
   * @param id - Id of the offer
   * @returns offer details - {@link OfferFetchMessageDto}
   */
  getofferDetails(
    id: number
  ): Observable<OfferFetchMessageDto | Record<null, null>> {
    const query = UtilsService.generateSelectQuery({
      tableName: K.TABLE_NAMES.OFFER,
      columnData: K.SELECT_OFFER_DETAILS,
      whereCondition: `offer_id=${id} and is_deleted=false`
    });
    return this.databaseService.rawQuery(query, [], OfferFetchDto).pipe(
      map((result) => {
        if (result.length === 0) throw new NotFoundException();
        return {
          message: 'Offer Detail fetched Successfully',
          data: result[0]
        };
      })
    );
  }

  /**
   * Functionality to update offer details
   * @param body - contain detail for updating the offer {@link UpdateOffer}
   * @param id  - Id of the offer
   * @param jwtBody - contain detail of admin
   * @returns returns a success meessage
   */
  updateOfferDetails(
    body: UpdateOffer,
    id: number,
    jwtBody: any
  ): Observable<MessageDto | Record<null, null>> {
    body['updatedBy'] = jwtBody.id;
    const { query, data } = UtilsService.generateUpdateQuery({
      tableName: K.TABLE_NAMES.OFFER,
      primaryKey: K.PRIMARY_KEYS.OFFER,
      columnData: body,
      whereCondition: `offer_id=${id}`,
      keysToIgnore: []
    });
    return this.databaseService.rawQuery(query, data, OfferId).pipe(
      map((result) => {
        if (result.length === 0) throw new NotFoundException();
        return {
          message: 'Offer Detail updated Successfully'
        };
      })
    );
  }

  /**
   * Functionality for creating offer
   * @param body - which contain detail for creating offer
   * @param jwtBody - contain admin details
   * @returns a success message when created
   */
  createOfferDtails(
    body: CreateOffer,
    jwtBody: any
  ): Observable<MessageDto | Record<null, null>> {
    const { id } = jwtBody;
    body['updatedBy'] = id;
    const { query, value } = UtilsService.generateInsertQuery(
      K.TABLE_NAMES.OFFER,
      K.PRIMARY_KEYS.OFFER,
      body,
      []
    );
    const finalQuery = format(query, value);
    return this.databaseService.rawQuery(finalQuery, [], OfferId).pipe(
      map(() => {
        return { message: 'Created offer successfully' };
      })
    );
  }

  /**
   * Functionality for delete offer
   * @param id - contain id of offer to delete
   * @returns a success message when deleted
   */
  deleteOffer(id: number): Observable<MessageDto | Record<null, null>> {
    return this.databaseService.rawQuery(deleteOfferQuery, [id], OfferId).pipe(
      map(() => {
        return { message: 'Deleted offer successfully' };
      })
    );
  }

  /**
   * This API is to fetch the details of offer
   * @param body Body containing the data from request as query params
   * @returns Returns a success message on fetching
   */
  fetchOfferList(
    body: OfferListParamDto
  ): Observable<MessageDto | Record<null, null>> {
    const { sortField, sortOrder, searchName, limit, offset } = body;
    if (sortField) {
      if (!Object.keys(K.OFFER_LIST_SORT).includes(sortField))
        throw new BadRequestException();
    }
    const query = offerListingQuery(sortField, sortOrder, limit, offset);
    const dataValue = [searchName ? `%${searchName}%` : null];

    return this.databaseService.rawQuery(query, dataValue, OfferListDto).pipe(
      map((resultData) => {
        return {
          message: 'Offer Details fetched successfully',
          data: resultData,
          pagination: {
            total: resultData.length === 0 ? 0 : resultData[0].count
          }
        };
      })
    );
  }

  /**
   * Functionality for updating section
   * @param sectionId - id of section
   * @param jwtBody - contain detail of admin
   * @param body - contain detail for update
   * @returns a success message when updated
   */
  updateSection(
    sectionId: number,
    jwtBody: any,
    body: UpdateSectionDto
  ): Observable<Record<null, null> | SectionMessageDto> {
    const { id } = jwtBody;
    body['updatedBy'] = id;
    const { query, data } = UtilsService.generateUpdateQuery({
      tableName: K.TABLE_NAMES.SECTION,
      columnData: body,
      primaryKey: K.PRIMARY_KEYS.SECTION,
      keysToIgnore: [],
      whereCondition: `section_id=${sectionId} and is_deleted = false`
    });
    return this.databaseService.rawQuery(query, data, SectionIdDto).pipe(
      map((result) => {
        if (result.length === 0) throw new NotFoundException();
        return {
          message: 'Updated Successfully'
        };
      })
    );
  }

  /**
   * Functionality to delete section
   * @param sectionId - id of section
   * @returns a success message when deleted
   */
  deleteSection(
    sectionId: number
  ): Observable<Record<null, null> | SectionMessageDto> {
    return this.databaseService
      .rawQuery(deleteSectionQuery, [sectionId], SectionIdDto)
      .pipe(
        map((result) => {
          if (result.length === 0) throw new NotFoundException();
          return {
            message: 'Deleted Successfully'
          };
        })
      );
  }

  /**
   * Functionality for creating section
   * @param body - contain detail for creating section
   * @param jwtBody - contain detail of admin
   * @returns a success message when created
   */
  createSection(
    body: CreateSectionDto,
    jwtBody: any
  ): Observable<Record<null, null> | SectionMessageDto> {
    const { id } = jwtBody;
    body['updatedBy'] = id;
    const { query, value } = UtilsService.generateInsertQuery(
      K.TABLE_NAMES.SECTION,
      K.PRIMARY_KEYS.SECTION,
      body,
      []
    );
    const finalQuery = format(query, value);
    return this.databaseService.rawQuery(finalQuery, [], SectionIdDto).pipe(
      map(() => {
        return {
          message: 'Created Successfully'
        };
      })
    );
  }
  /**
   * Functionality for fetching products under a particular offer.
   * @param offerId - offer id
   * @param param - consists of limit, offset, sorting
   * and filtering options. {@link param || SingleOfferProductListPaginationDto}
   * @returns - a success message and data.
   * {@link param || SingleOfferProductListResponseDto}
   */
  singleOfferProductList(
    offerId: number,
    param: SingleOfferProductListPaginationDto
  ): Observable<SingleOfferProductListResponseDto | Record<null, null>> {
    const { limit, offset, sortField, sortOrder, filterCategory, assigned } =
      param;
    if (sortField) {
      if (!Object.keys(K.SECTION_PRODUCT_LIST_SORT).includes(sortField))
        throw new BadRequestException();
    }
    const { query, dataValue } = singleOfferProductListQuery(
      limit,
      offset,
      sortField,
      sortOrder,
      filterCategory,
      assigned
    );
    return this.databaseService
      .rawQuery(query, [offerId, ...dataValue], SingleOfferProductListDto)
      .pipe(
        map((resultData) => {
          return {
            message: 'Single offer product list fetched successfully',
            data: resultData,
            pagination: {
              total: resultData.length === 0 ? 0 : resultData[0].count
            }
          };
        })
      );
  }

  /**
   * Functionality for super admin to assign
   * a single offer to product(s).
   * @param body - offer id and array of product id
   * {@link param || SingleOfferProductAssignDto}
   * @returns - a success message once assigned
   */
  singleOfferProductAssign(
    body: SingleOfferProductAssignDto
  ): Observable<MessageDto | Record<null, null>> {
    const { offerId, productId } = body;
    const assignedProductIdValues = productId.join();
    const query = singleOfferProductAssignQuery(assignedProductIdValues);
    return this.databaseService.rawQuery(query, [offerId], MessageDto).pipe(
      map(() => {
        return { message: 'Offer assigned successfully' };
      })
    );
  }

  /**
   * Functionality for super admin to unassign single product
   * from an offer.
   * @param offerId - offer id
   * @param productId - product id
   * @returns a success message on deletion.
   */

  singleOfferProductUnassign(offerId: number, productId: number) {
    return this.databaseService
      .rawQuery(
        singleOfferProductUnassignQuery,
        [offerId, productId],
        MessageDto
      )
      .pipe(
        map((data) => {
          if (data.length === 0) throw new NotFoundException();
          return { message: 'Offer unassigned successfully' };
        })
      );
  }

  async adminPasswordUpdate(
    adminId: number,
    jwtBody: JwtBody,
    body: AdminPasswordUpdateDto
  ): Promise<MessageDto | Record<null, null>> {
    const { id, email } = jwtBody;
    if (id != adminId) throw new UnauthorizedException();
    const { oldPassword, newPassword } = body;
    if (oldPassword === newPassword) throw new BadRequestException();
    const iteration: number = parseInt(this.config.password.iteration);
    const passKeyLen: number = parseInt(this.config.password.password_key_len);
    const newSalt = randomBytes(128).toString('base64');
    const newPasswordDerivedKey = pbkdf2
      .pbkdf2Sync(newPassword, newSalt, iteration, passKeyLen)
      .toString('base64');

    body['password'] = newPasswordDerivedKey;
    body['salt'] = newSalt;
    body['updatedBy'] = id;

    const selectQuery = UtilsService.generateSelectQuery({
      tableName: K.TABLE_NAMES.ADMIN,
      columnData: K.SELECT_ADMIN_COLUMN_DATA,
      whereCondition: `${K.EMAIL}='${email}'`
    });

    const admin: AdminLoginDto[] = await firstValueFrom(
      this.databaseService.rawQuery(selectQuery, [], LoginUserDto)
    );

    const { password, salt } = admin[0];
    const oldPasswordDerivedKey = pbkdf2
      .pbkdf2Sync(oldPassword, salt, iteration, passKeyLen)
      .toString('base64');

    if (password !== oldPasswordDerivedKey) throw new UnauthorizedException();

    const query = UtilsService.generateUpdateQuery({
      tableName: K.TABLE_NAMES.ADMIN,
      primaryKey: K.PRIMARY_KEYS.ADMIN,
      columnData: body,
      keysToIgnore: ['oldPassword', 'newPassword'],
      whereCondition: `${K.EMAIL}='${email}'`
    });

    return this.databaseService
      .rawQuery(query.query, query.data, AdminPasswordUpdateDto)
      .pipe(
        map(() => {
          return { message: 'Admin password updated successfully' };
        })
      );
  }
}
