import {
  Injectable,
  NotFoundException,
  UnauthorizedException
} from '@nestjs/common';
import { map, Observable } from 'rxjs';
import { DatabaseService } from 'src/database/database.service';
import { UtilsService } from 'src/utils/utils.service';
import {
  BeaconIdDto,
  BeaconUpdateDto,
  CreateBeaconDto,
  FetchBeaconListDto,
  FetchBeaconListPaginationDto,
  FetchBeaconListResponseDto,
  StoreAndSectionOfBeaconResponseDto,
  UserVisitUpdateDTO
} from '../dto/beacon.dto';
import { MessageDto } from '../dto/message.dto';
import * as K from '../../shared/constants';
import * as format from 'pg-format';
import {
  fetchBeaconListQuery,
  getStoreAndSectionOfBeacon,
  userVisitUpdateQuery
} from '../db-queries/beacon.query';

import { UserIdDto } from '../dto/users.dto';
@Injectable()
export class BeaconService {
  constructor(private readonly databaseService: DatabaseService<any>) {}

  /**
   * Functionality to add a new beacon
   * @param body - contain the details for adding beacon
   * @param jwtBody - It consists of id, email & role of admin.
   * @returns a success message - {@link MessageDto}
   */
  createBeacon(
    body: CreateBeaconDto,
    jwtBody: any
  ): Observable<MessageDto | Record<null, null>> {
    body['updatedBy'] = jwtBody.id;
    const { query, value } = UtilsService.generateInsertQuery(
      K.TABLE_NAMES.BEACON,
      K.PRIMARY_KEYS.BEACON,
      body,
      []
    );
    const createQuery = format(query, value);

    return this.databaseService.rawQuery(createQuery, [], BeaconIdDto).pipe(
      map((result) => {
        if (result.length == 0)
          throw new Error('Error in creation of Beacon, try again..!!');
        return { message: 'Beacon created successfully' };
      })
    );
  }

  /**
   * Function is to hard delete the beacon details
   * @param id contains the id of the beacon detail
   * @returns a success message - {@link MessageDto}
   */
  deleteBeacon(id: number): Observable<MessageDto | Record<null, null>> {
    const deleteQuery = UtilsService.generateDeleteQuery({
      tableName: K.TABLE_NAMES.BEACON,
      primaryKey: K.PRIMARY_KEYS.BEACON,
      value: id
    });
    return this.databaseService
      .rawQuery(deleteQuery.query, [], BeaconIdDto)
      .pipe(
        map((result) => {
          if (result.length === 0) throw new NotFoundException();
          return { message: 'Beacon detail deleted successfully' };
        })
      );
  }

  /**
   * Functionality for super admin to update beacon details.
   * @param id - beacon id
   * @param body - beacon details for updation. {@link BeaconUpdateDto}
   * @param jwtBody - token body
   * @returns - a success message after completion. {@link MessageDto}
   */
  updateBeacon(
    id: number,
    body: BeaconUpdateDto,
    jwtBody: any
  ): Observable<MessageDto | Record<null, null>> {
    body['updatedBy'] = jwtBody.id;
    const updateQueryAndValue = UtilsService.generateUpdateQuery({
      tableName: K.TABLE_NAMES.BEACON,
      primaryKey: K.PRIMARY_KEYS.BEACON,
      keysToIgnore: K.KEYS_TO_IGNORE_IN_BEACON_UPDATE,
      whereCondition: `beacon_id = ${id}`,
      columnData: body
    });
    return this.databaseService
      .rawQuery(
        updateQueryAndValue.query,
        updateQueryAndValue.data,
        BeaconIdDto
      )
      .pipe(
        map((result) => {
          if (result.length === 0) throw new NotFoundException();
          return { message: 'Updated beacon details successfully' };
        })
      );
  }

  getSortQueryForBeaconFetch(sortName: string): Array<string> {
    const sortArray = [];
    if (sortName) {
      sortArray.push(`${K.TABLE_NAMES.BEACON}.${K.BEACON_NAME}  
      ${sortName === 'true' ? 'ASC' : 'DESC'}`);
    }
    return sortArray;
  }

  /**
   * Functionality for fetching list of registered beacons.
   * @param param - consists of parameters for sorting and filtering the list.
   * {@link param || FetchBeaconListPaginationDto}
   * @returns - a success message and list of all registered beacons.
   */
  fetchBeaconList(
    param: FetchBeaconListPaginationDto
  ): Observable<FetchBeaconListResponseDto | Record<null, null>> {
    const { filterStore, limit, offset, sortName } = param;
    let orderQuery = '';
    if (sortName) {
      const sortArray = this.getSortQueryForBeaconFetch(sortName);
      orderQuery = `ORDER BY ${sortArray.join(',')}`;
    }
    let query = fetchBeaconListQuery;
    const dataValue = [];

    if (filterStore) {
      query = `${query} WHERE s.store_id = $1`;
      dataValue.push(filterStore);
    }
    query = `${query}
    ${orderQuery ? orderQuery : 'order by m_beacon.updated_at DESC'}
    ${limit ? `limit ${limit}` : ''}
    ${offset ? `offset ${offset}` : ''}
    `;
    return this.databaseService
      .rawQuery(query, dataValue, FetchBeaconListDto)
      .pipe(
        map((resultData) => {
          return {
            message: 'Successfully fetched beacon list',
            data: resultData,
            pagination: {
              total: resultData.length === 0 ? 0 : resultData[0].count
            }
          };
        })
      );
  }

  /**
   * Functionality for identifying store and section of beacon.
   * @param id - major id of beacon.
   * @returns - a success message and store and section details
   * of beacon.  {@link StoreAndSectionOfBeaconResponseDto}
   */
  fetchStoreAndSectionOfBeacon(
    id: string
  ): Observable<StoreAndSectionOfBeaconResponseDto | Record<null, null>> {
    return this.databaseService
      .rawQuery(
        getStoreAndSectionOfBeacon,
        [id],
        StoreAndSectionOfBeaconResponseDto
      )
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
   * Functionality for Recording user entry to the
   * store/section using Beacon
   * @param body - contain details of user and majorid
   * {@link body || UserVisitUpdateDTO}
   * @returns a success message
   */
  recordUserVisit(
    body: UserVisitUpdateDTO,
    jwtBody: any
  ): Observable<MessageDto | Record<null, null>> {
    const { majorId ,userId} = body;
    if (userId !== Number(jwtBody.id)) throw new UnauthorizedException();
    return this.databaseService
      .rawQuery(userVisitUpdateQuery, [userId, majorId], UserIdDto)
      .pipe(
        map(() => {
          return {
            message: 'User visit detail update successfully'
          };
        })
      );
  }
}
