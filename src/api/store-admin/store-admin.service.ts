import {
  BeaconFetchDto,
  BeaconFetchMessageDto,
  BeaconPaginationQueryParam,
  AssignBeaconDto,
  BeaconMessageDto,
  FetchAllAssignedStoresPaginationDto,
  FetchAssignedStoresResponseDto,
  FetchVisitorsCountResponseDto,
  BeaconIdDto,
  FetchSectionWiseProductsDto,
  FetchSectionWiseProductsPaginationDto,
  FetchSectionWiseProductsResponseDto
} from './../dto/store-admin.dto';
import { MessageDto } from './../dto/admin.dto';
import { DatabaseService } from 'src/database/database.service';
import { UtilsService } from './../../utils/utils.service';
import {
  BadRequestException,
  ForbiddenException,
  Injectable,
  NotFoundException,
  UnauthorizedException
} from '@nestjs/common';
import { firstValueFrom, map, Observable } from 'rxjs';
import { AdminJwtBody } from '../dto/adminJwtBody.dto';
import * as K from '../../shared/constants';
import {
  StoreAdminProfileFetchResponseDto,
  StoreAdminUpdateDto
} from '../dto/store-admin.dto';
import {
  BeaconFetchQuery,
  fetchAssignedStores,
  fetchVisitorsCount,
  fetchSectionWiseProductsQuery,
  unAssignBeaconQuery,
  assignBeaconQuery
} from '../db-queries/store-admin.query';
import { fetchStoreAdminProfile } from '../db-queries/store-admin.query';
import { StoreHelperService } from 'src/helper/store.helper';
import {
  BeaconDropDownResponseDto,
  BeaconDropDownDto
} from '../dto/beacon.dto';
import { UserRoles } from '../dto/roles.dto';
@Injectable()
export class StoreAdminService {
  constructor(
    private readonly databaseService: DatabaseService<any>,
    private storeHelperService: StoreHelperService
  ) {}
  /**
   * Functionality for store admin to update own profile.
   * @param id Store admin id passed as path parameter.
   * @param body Store admin update body. {@link param || StoreAdminUpdateDto}
   * @param jwtBody {@link param || JwtBody}
   * @returns a success message if profile gets updated.
   */
  storeAdminProfileUpdate(
    id: number,
    body: StoreAdminUpdateDto,
    jwtBody: AdminJwtBody
  ): Observable<MessageDto | Record<null, null>> {
    if (id !== Number(jwtBody.id)) {
      throw new UnauthorizedException();
    }
    body['updatedBy'] = jwtBody.id;
    const updateQueryAndValue = UtilsService.generateUpdateQuery({
      tableName: K.TABLE_NAMES.ADMIN,
      primaryKey: K.PRIMARY_KEYS.ADMIN,
      keysToIgnore: [],
      whereCondition: `admin_id=${id} AND is_deleted=false`,
      columnData: body
    });
    return this.databaseService
      .rawQuery(
        updateQueryAndValue.query,
        updateQueryAndValue.data,
        StoreAdminUpdateDto
      )
      .pipe(
        map((result) => {
          if (result.length === 0) throw new NotFoundException();
          return { message: 'Updated  store admin profile successfully' };
        })
      );
  }
  /**
   * Functionality for store admin to view own profile.
   * @param id Store admin id passed as path parameter.
   * @param jwtBody Token body{@link param || JwtBody}
   * @returns Store admin profile data & a success message.
   */
  fetchStoreAdminProfile(
    id: number,
    jwtBody: AdminJwtBody
  ): Observable<StoreAdminProfileFetchResponseDto | Record<null, null>> {
    if (id !== Number(jwtBody.id)) {
      throw new UnauthorizedException();
    }
    return this.databaseService
      .rawQuery(fetchStoreAdminProfile, [id], StoreAdminProfileFetchResponseDto)
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
  /**
   * Functionality for store-admin to view the assigned stores.
   * @param param - limit & offset
   * {@link param || FetchAllAssignedStoresPaginationDto}
   * @param id - store-admin id
   * @param jwtBody - token body {@link param || AdminJwtBody}
   * @returns a success message & store data.
   * {@link param || FetchAssignedStoresResponseDto}
   */
  fetchAssignedStores(
    param: FetchAllAssignedStoresPaginationDto,
    id: number,
    jwtBody: AdminJwtBody
  ): Observable<FetchAssignedStoresResponseDto | Record<null, null>> {
    if (id != jwtBody.id) {
      throw new UnauthorizedException();
    }
    const { offset, limit } = param;
    const query = `${fetchAssignedStores}
    ${limit ? `limit ${limit}` : ''}
    ${offset ? `offset ${offset}` : ''}`;
    return this.databaseService
      .rawQuery(query, [id], FetchAssignedStoresResponseDto)
      .pipe(
        map((result) => {
          if (result.length === 0) throw new NotFoundException();
          return {
            message: 'Assigned stores fetched successfully',
            data: result,
            pagination: {
              total: result.length === 0 ? 0 : result[0].count
            }
          };
        })
      );
  }
  /**
   * Functionality for store-admin to view section wise products.
   * @param storeAdminId - store-admin id
   * @param storeId - store id
   * @param sectionId - section id
   * @param jwtBody - token body
   * @param param - consists of limit, offset, 
    sorting and filtering functionalities.
    {@link param || FetchSectionWiseProductsDto}
   * @returns - a success message and section wise product list.
   */

  async fetchSectionWiseProducts(
    storeAdminId: number,
    storeId: number,
    sectionId: number,
    jwtBody: any,
    param: FetchSectionWiseProductsPaginationDto
  ): Promise<FetchSectionWiseProductsResponseDto> {
    const { id, role } = jwtBody;
    if (role === UserRoles.STORE_ADMIN) {
      if (id != storeAdminId) throw new ForbiddenException();
      const storeStatus = await this.storeHelperService.checkStoreUnderAdmin(
        storeId,
        id
      );
      if (!storeStatus) throw new UnauthorizedException();
    }
    const SectionStatus = await this.storeHelperService.checkSectionUnderStore(
      storeId,
      sectionId
    );
    if (!SectionStatus) throw new NotFoundException();
    const { limit, offset, sortField, sortOrder, filterCategory } = param;
    if (sortField) {
      if (!Object.keys(K.SECTION_PRODUCT_LIST_SORT).includes(sortField))
        throw new BadRequestException();
    }
    const { query, dataValue } = fetchSectionWiseProductsQuery(
      filterCategory,
      sortField,
      sortOrder,
      limit,
      offset
    );
    const getSectionWiseProducts: FetchSectionWiseProductsDto[] =
      await firstValueFrom(
        this.databaseService.rawQuery(
          query,
          [storeId, sectionId, ...dataValue],
          FetchSectionWiseProductsDto
        )
      );
    return {
      message: 'Successfully fetched section wise products',
      data: getSectionWiseProducts,
      pagination: {
        total:
          getSectionWiseProducts.length === 0 ?
            0 :
            getSectionWiseProducts[0].count
      }
    };
  }

  /**
   * Functionality for store-admin to view total visitors
   * and active visitor's count.
   * @param storeId - store id
   * @param sectionId - section id
   * @param jwtBody - token body {@link param || AdminJwtBody}
   * @returns a success message & visitor's data.
   * {@link param || FetchVisitorsCountResponseDto}
   */
  async fetchVisitorsCount(
    storeId: number,
    sectionId: number,
    jwtBody: AdminJwtBody
  ): Promise<FetchVisitorsCountResponseDto | Record<null, null>> {
    const { id, role } = jwtBody;
    if (role === UserRoles.STORE_ADMIN) {
      const storeStatus = await this.storeHelperService.checkStoreUnderAdmin(
        storeId,
        id
      );
      if (!storeStatus) throw new UnauthorizedException();
    }
    const dataValue = [storeId, sectionId];
    return this.databaseService
      .rawQuery(fetchVisitorsCount, dataValue, FetchVisitorsCountResponseDto)
      .pipe(
        map((resultData) => {
          return {
            message: 'Successfully fetched',
            data: resultData[0]
          };
        })
      );
  }

  /**
   * Functionality to list the beacon under store
   * @param id - store-admin id
   * @param storeId - store id
   * @param param which contain the pagination details
   * {@link param || BeaconPaginationQueryParam}
   * @param jwtBody - token body {@link jwtBody || AdminJwtBody}
   * @returns - a list of beacon under store
   */
  async fetchBeaconUnderStore(
    storeAdminId: number,
    storeId: number,
    param: BeaconPaginationQueryParam,
    jwtBody: AdminJwtBody
  ): Promise<BeaconFetchMessageDto> {
    const { limit, offset, sectionId } = param;
    const { id, role } = jwtBody;
    if (role === UserRoles.STORE_ADMIN) {
      if (storeAdminId != id) {
        throw new UnauthorizedException();
      }
      const storeStatus = await this.storeHelperService.checkStoreUnderAdmin(
        storeId,
        id
      );
      if (!storeStatus) throw new UnauthorizedException();
    }
    const query = BeaconFetchQuery(limit, offset);
    const beaconList: BeaconFetchDto[] = await firstValueFrom(
      this.databaseService.rawQuery(
        query,
        [storeId, sectionId ? sectionId : null],
        BeaconFetchDto
      )
    );
    return {
      message: 'Successfully fetched store wise beacon',
      data: beaconList,
      pagination: {
        total: beaconList.length === 0 ? 0 : beaconList[0].count
      }
    };
  }

  /**
   * This API is to fetch beacon details of beacon
   * that is not assigned to any section in a
   * particular store
   * @param adminId Id of store-admin
   * @param storeId If of the store
   * @param jwtBody Contains payload of store admin
   * @returns A success message upon fetching data
   */
  async fetchUnassignedBeacons(
    adminId: number,
    storeId: number,
    jwtBody: AdminJwtBody
  ): Promise<BeaconDropDownResponseDto> {
    const { id } = jwtBody;

    if (adminId != id) throw new UnauthorizedException();

    const storeStatus = await this.storeHelperService.checkStoreUnderAdmin(
      storeId,
      id
    );
    if (!storeStatus) throw new UnauthorizedException();
    const query = UtilsService.generateSelectQuery({
      tableName: K.TABLE_NAMES.BEACON,
      columnData: K.SELECT_BEACON_DROPDOWN_DATA,
      whereCondition: `${K.STORE_ID}='${storeId}' AND section_id IS NULL`
    });

    const beaconListData: BeaconDropDownDto[] = await firstValueFrom(
      this.databaseService.rawQuery(query, [], BeaconDropDownDto)
    );
    return {
      message: 'Successfully fetched beacon details',
      data: beaconListData
    };
  }
  /**
   * Functionality for store-admin to assign a beacon
     to a section in a particular store.
   * @param storeAdminId - id of store-admin
   * @param storeId - store id
   * @param beaconId - beacon id
   * @param body - consists of section id {@link param || AssignBeaconDto}
   * @param jwtBody - token body
   * @returns - a success message
   */
  async assignBeacon(
    storeAdminId: number,
    storeId: number,
    sectionId: number,
    body: AssignBeaconDto,
    jwtBody: any
  ): Promise<BeaconMessageDto> {
    const { id } = jwtBody;
    if (storeAdminId != id) {
      throw new ForbiddenException();
    }
    const storeStatus = await this.storeHelperService.checkStoreUnderAdmin(
      storeId,
      id
    );
    if (!storeStatus) throw new UnauthorizedException();
    const { beaconId } = body;
    const query = assignBeaconQuery(beaconId);
    const assignBeaconStatus = await firstValueFrom(
      this.databaseService.rawQuery(
        query,
        [sectionId, storeId, ...beaconId],
        BeaconIdDto
      )
    );

    if (assignBeaconStatus.length === 0) {
      throw new BadRequestException();
    }
    return {
      message: 'Successfully assigned'
    };
  }

  /**
   * Functionality for store-admin to unassign beacon
     from a section in a particular store.
   * @param storeAdminId - store-admin id
   * @param storeId - store id
   * @param beaconId - beacon id
   * @param jwtBody - token body
   * @returns - a success message
   */

  async unAssignBeacon(
    storeAdminId: number,
    storeId: number,
    beaconId: number,
    jwtBody: any
  ): Promise<BeaconMessageDto> {
    const { id } = jwtBody;
    if (storeAdminId != id) {
      throw new ForbiddenException();
    }
    const storeStatus = await this.storeHelperService.checkStoreUnderAdmin(
      storeId,
      id
    );
    if (!storeStatus) throw new UnauthorizedException();
    const unassignBeaconStatus = await firstValueFrom(
      this.databaseService.rawQuery(
        unAssignBeaconQuery,
        [beaconId, storeId],
        BeaconIdDto
      )
    );
    if (unassignBeaconStatus.length === 0) throw new NotFoundException();
    return {
      message: 'Successfully unassigned section from beacon.'
    };
  }
}
