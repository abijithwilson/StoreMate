import { LocationDto } from './../dto/location.dto';
import { map, Observable } from 'rxjs';
import { Injectable } from '@nestjs/common';
import { DatabaseService } from 'src/database/database.service';
import { MessageDto } from '../dto/message.dto';
import { UtilsService } from 'src/utils/utils.service';
import * as K from '../../shared/constants';

@Injectable()
export class LocationService {
  constructor(private readonly databaseService: DatabaseService<any>) {}
  fetchCountry(): Observable<MessageDto | Record<null, null>> {
    const query = UtilsService.generateSelectQuery({
      tableName: K.TABLE_NAMES.COUNTRY,
      columnData: K.SELECT_COUNTRY_COLUMN_DATA
    });
    return this.databaseService.rawQuery(query, [], LocationDto).pipe(
      map((result) => {
        return {
          message: 'Country collected successfully',
          data: result
        };
      })
    );
  }

  fetchState(countryId: number): Observable<MessageDto | Record<null, null>> {
    const query = UtilsService.generateSelectQuery({
      tableName: K.TABLE_NAMES.STATE,
      columnData: K.SELECT_STATE_COLUMN_DATA,
      whereCondition: `${K.PRIMARY_KEYS.COUNTRY} = ${countryId}`
    });
    return this.databaseService.rawQuery(query, [], LocationDto).pipe(
      map((result) => {
        return {
          message: 'State collected successfully',
          data: result
        };
      })
    );
  }

  fetchDistrict(stateId: number): Observable<MessageDto | Record<null, null>> {
    const query = UtilsService.generateSelectQuery({
      tableName: K.TABLE_NAMES.DISTRICT,
      columnData: K.SELECT_DISTRICT_COLUMN_DATA,
      whereCondition: `${K.PRIMARY_KEYS.STATE} = ${stateId}`
    });
    return this.databaseService.rawQuery(query, [], LocationDto).pipe(
      map((result) => {
        return {
          message: 'District collected successfully',
          data: result
        };
      })
    );
  }
}
