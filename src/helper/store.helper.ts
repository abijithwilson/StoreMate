import { Injectable } from '@nestjs/common';
import { firstValueFrom } from 'rxjs';
import {
  ProductIdDto,
  SectionIdDto,
  StoreSectionIdDto
} from 'src/api/dto/section.dto';
import { StoreIdDto } from 'src/api/dto/store.dto';
import { DatabaseService } from 'src/database/database.service';
import { UtilsService } from 'src/utils/utils.service';
import * as K from '../shared/constants';

@Injectable()
export class StoreHelperService {
  constructor(private readonly databaseService: DatabaseService<any>) {}

  /**
   * To check whether store is under the admin
   * @param storeId - which contain the id of store
   * @param id - which contain the id of store admin
   * @returns a success message
   */
  async checkStoreUnderAdmin(storeId, id) {
    const checkStoreUnderAdminQuery = UtilsService.generateSelectQuery({
      tableName: K.TABLE_NAMES.STORE_ADMIN_MAP,
      whereCondition: `store_id =${storeId} AND admin_id= ${id}`,
      columnData: K.SELECT_STORE_UNDER_ADMIN
    });
    const checkStoreUnderAdmin: StoreIdDto[] = await firstValueFrom(
      this.databaseService.rawQuery(
        checkStoreUnderAdminQuery,
        [],
        StoreSectionIdDto
      )
    );
    if (checkStoreUnderAdmin.length === 0) {
      return false;
    }
    return true;
  }

  /**
   *  To check whether section is under the store
   * @param storeId - which contain the id of store
   * @param sectionId - which contain the id of store admin
   * @returns a success message
   */
  async checkSectionUnderStore(storeId, sectionId) {
    const checkSectionUnderStoreQuery = UtilsService.generateSelectQuery({
      tableName: K.TABLE_NAMES.SECTION_STORE_MAP,
      whereCondition: `store_id =${storeId} AND section_id = ${sectionId}`,
      columnData: K.SELECT_SECTION_UNDER_STORE
    });
    const checkSectionUnderStore: StoreIdDto[] = await firstValueFrom(
      this.databaseService.rawQuery(
        checkSectionUnderStoreQuery,
        [],
        SectionIdDto
      )
    );
    if (checkSectionUnderStore.length === 0) {
      return false;
    }
    return true;
  }

  async checkProductUnderStore(storeId, sectionId, productId) {
    const checkProductUnderStoreQuery = UtilsService.generateSelectQuery({
      tableName: K.TABLE_NAMES.SECTION_PRODUCT_MAP,
      whereCondition: `store_id = ${storeId} AND section_id = ${sectionId}
      AND product_id = ${productId}`,
      columnData: K.SELECT_PRODUCT_UNDER_STORE
    });
    const checkProductUnderStore: ProductIdDto[] = await firstValueFrom(
      this.databaseService.rawQuery(
        checkProductUnderStoreQuery,
        [],
        ProductIdDto
      )
    );
    if (checkProductUnderStore.length === 0) {
      return false;
    }
    return true;
  }
}
